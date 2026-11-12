// Sends the client their aftercare email after they complete a consent form,
// from the studio's own address (contact@goldenvinepiercing.co.uk, hosted by
// IONOS). Replaces the old EmailJS setup.
//
// Settings (Netlify → Project configuration → Environment variables):
//   STUDIO_EMAIL           the address emails come from and replies go to
//   STUDIO_EMAIL_PASSWORD  that mailbox's password
//   STUDIO_SMTP_HOST       optional, defaults to smtp.ionos.co.uk
import nodemailer from "nodemailer";
import { AFTERCARE_EMAILS } from "../lib/aftercare";

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

const ALLOWED_HOSTS = [
  /^(www\.)?goldenvinepiercing\.co\.uk$/,
  /^([a-z0-9-]+--)?goldenvine\.netlify\.app$/,
  /^localhost(:\d+)?$/,
];

const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]+$/;

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

export const handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  if (!hostAllowed(event.headers)) return json(403, { error: "Not allowed" });

  const from = process.env.STUDIO_EMAIL;
  const pass = process.env.STUDIO_EMAIL_PASSWORD;
  const host = process.env.STUDIO_SMTP_HOST || "smtp.ionos.co.uk";
  if (!from || !pass) return json(503, { error: "Aftercare email is not set up yet" });

  let payload: { formType?: string; email?: string; name?: string; botField?: string };
  try {
    const raw = event.isBase64Encoded ? Buffer.from(event.body || "", "base64").toString("utf8") : event.body || "";
    payload = JSON.parse(raw);
  } catch {
    return json(400, { error: "Invalid request" });
  }

  // Spam trap: real visitors never fill this hidden field.
  if (payload.botField) return json(200, { ok: true });

  const to = (payload.email || "").trim();
  if (!EMAIL_PATTERN.test(to) || to.length > 254) return json(400, { error: "Invalid email address" });

  const email = AFTERCARE_EMAILS[payload.formType || "piercing"] || AFTERCARE_EMAILS.piercing;
  const name = (payload.name || "").replace(/[\r\n<>"]/g, "").trim().slice(0, 120);

  const transporter = nodemailer.createTransport({ host, port: 465, secure: true, auth: { user: from, pass } });

  try {
    await transporter.sendMail({
      from: `Golden Vine <${from}>`,
      replyTo: from,
      to: name ? { name, address: to } : to,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });
  } catch (error) {
    console.error("Aftercare email failed", error);
    // Report only the error type (e.g. EAUTH = wrong password), never details.
    const code = (error as { code?: string }).code || "UNKNOWN";
    return json(502, { error: "The aftercare email could not be sent", code });
  }

  return json(200, { ok: true });
};
