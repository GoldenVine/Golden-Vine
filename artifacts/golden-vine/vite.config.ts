import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "node:fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

const netlifyConsentFormPlugin = {
  name: "netlify-consent-form",
  closeBundle() {
    const outputDirectory = path.resolve(import.meta.dirname, "dist/public");
    const fields = [
      "referrals", "practitioner", "guestPractitionerName", "fullName",
      "dateOfBirth", "address", "postcode", "phone", "email", "piercingArea",
      "legalAgeDeclaration", "guardianName", "guardianRelationship",
      "guardianPhone", "guardianEmail", "bloodborne", "eating",
      "intoxication", "pregnancy", "medicalConditions",
      "medicalConditionsAcknowledged", "allergies", "latex", "chlorhexidine",
      "iodine", "aluminium", "risks", "release", "questions", "aftercare",
      "changes", "document", "photography", "downsizing",
    ];
    const inputs = fields.map((name) => `<input name="${name}" />`).join("\n");
    const html = `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Golden Vine consent form registration</title></head>
  <body>
    <form name="consent" method="POST" data-netlify="true" netlify-honeypot="bot-field" hidden>
      <input type="hidden" name="form-name" value="consent" />
      <input name="bot-field" />
      ${inputs}
      <input type="file" name="signature" />
      <input type="file" name="id-photo" multiple />
    </form>
  </body>
</html>`;
    fs.writeFileSync(path.join(outputDirectory, "netlify-consent-form.html"), html);
  },
};

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    netlifyConsentFormPlugin,
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
