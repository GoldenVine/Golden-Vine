// Emails a copy of each completed consent form PDF to the studio's storage
// inbox, using a Gmail account and an app password.
//
// Settings (Netlify → Project configuration → Environment variables):
//   GMAIL_USER              the Gmail address that sends the email
//   GMAIL_APP_PASSWORD      a 16-letter Google "app password" for that account
//   CONSENT_ARCHIVE_EMAIL   where the PDFs go (optional, defaults to GMAIL_USER)
//
// Built for more than one form: send formType "piercing" or "tattoo".
import nodemailer from "nodemailer";

interface HandlerEvent {
  httpMethod: string;
  headers: Record<string, string | undefined>;
  body: string | null;
  isBase64Encoded?: boolean;
}

interface HandlerResponse {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
}

const FORM_LABELS: Record<string, string> = {
  piercing: "Piercing consent form",
  tattoo: "Tattoo consent form",
};

// Netlify accepts request bodies up to about 6 MB; leave headroom.
const MAX_PDF_BYTES = 4.5 * 1024 * 1024;

const ALLOWED_HOSTS = [
  /^(www\.)?goldenvinepiercing\.co\.uk$/,
  /^([a-z0-9-]+--)?goldenvine\.netlify\.app$/,
  /^localhost(:\d+)?$/,
];

function json(statusCode: number, body: Record<string, unknown>): HandlerResponse {
  return { statusCode, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) };
}

function hostAllowed(headers: HandlerEvent["headers"]) {
  const source = headers.origin || headers.referer || "";
  try {
    return ALLOWED_HOSTS.some((pattern) => pattern.test(new URL(source).host));
  } catch {
    return false;
  }
}

function safeFileName(name: string) {
  const cleaned = name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  return cleaned.toLowerCase().endsWith(".pdf") ? cleaned : `${cleaned || "consent-form"}.pdf`;
}

export const handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  if (!hostAllowed(event.headers)) return json(403, { error: "Not allowed" });

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  const to = process.env.CONSENT_ARCHIVE_EMAIL || user;
  if (!user || !pass || !to) return json(503, { error: "Studio email copy is not set up yet" });

  let payload: {
    formType?: string;
    clientName?: string;
    submittedAt?: string;
    fileName?: string;
    pdfBase64?: string;
    botField?: string;
  };
  try {
    const raw = event.isBase64Encoded ? Buffer.from(event.body || "", "base64").toString("utf8") : event.body || "";
    payload = JSON.parse(raw);
  } catch {
    return json(400, { error: "Invalid request" });
  }

  // Spam trap: real visitors never fill this hidden field.
  if (payload.botField) return json(200, { ok: true });

  const pdfBase64 = (payload.pdfBase64 || "").replace(/^data:[^,]+,/, "");
  const pdf = Buffer.from(pdfBase64, "base64");
  if (!pdf.length || pdf.subarray(0, 5).toString() !== "%PDF-") return json(400, { error: "No PDF received" });
  if (pdf.length > MAX_PDF_BYTES) return json(413, { error: "PDF too large" });

  const formLabel = FORM_LABELS[payload.formType || "piercing"] || "Consent form";
  const clientName = (payload.clientName || "Unknown client").slice(0, 120);
  const submittedAt =
    (payload.submittedAt || "").slice(0, 60) ||
    new Date().toLocaleString("en-GB", { timeZone: "Europe/London" });

  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });

  try {
    await transporter.sendMail({
      from: `Golden Vine Consent Forms <${user}>`,
      to,
      subject: `${formLabel} – ${clientName} – ${submittedAt}`,
      text: `${formLabel} completed by ${clientName} on ${submittedAt}.\n\nThe completed form is attached as a PDF.`,
      attachments: [
        { filename: safeFileName(payload.fileName || "consent-form.pdf"), content: pdf, contentType: "application/pdf" },
      ],
    });
  } catch (error) {
    console.error("Consent archive email failed", error);
    return json(502, { error: "The studio copy could not be emailed" });
  }

  return json(200, { ok: true });
};
