// Runs after the normal build. For every page in routes.mjs it writes a
// ready-made HTML file (with that page's own title, description and text)
// and generates sitemap.xml.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROUTES, SITE_URL } from "./routes.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "dist/public");
const serverEntry = path.join(root, "dist/server/entry-server.js");

const template = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
// Untouched copy used for any address that isn't pre-rendered (e.g. /consent)
fs.writeFileSync(path.join(outDir, "spa.html"), template);
let render = null;
try {
  ({ render } = await import(pathToFileURL(serverEntry).href));
} catch (err) {
  // Never break the deploy: pages still work exactly as before without pre-rendering
  console.warn(`pre-rendering skipped: ${err.message}`);
}

// Tags the page renderer provides itself, removed from the template to avoid duplicates
const stripDefaults = (html) =>
  html
    .replace(/<title>[\s\S]*?<\/title>\s*/, "")
    .replace(/<meta name="description"[^>]*>\s*/, "")
    .replace(/<meta property="og:(title|description|type|image)"[^>]*>\s*/g, "")
    .replace(/<meta name="twitter:(title|description|image)"[^>]*>\s*/g, "");

let failures = 0;
for (const route of render ? ROUTES : []) {
  try {
    const { html, head } = render(route.path);
    if (!head.includes("<title")) throw new Error("no <title> rendered");
    const page = stripDefaults(template)
      .replace("</head>", `    ${head}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
    const file = route.path === "/" ? "index.html" : `${route.path.slice(1)}.html`;
    fs.mkdirSync(path.dirname(path.join(outDir, file)), { recursive: true });
    fs.writeFileSync(path.join(outDir, file), page);
    console.log(`prerendered ${route.path} -> ${file}`);
  } catch (err) {
    // Never break the deploy: the page still works as before without pre-rendering
    failures++;
    console.warn(`could not prerender ${route.path}: ${err.message}`);
  }
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${SITE_URL}${r.path === "/" ? "/" : r.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${r.priority}</priority>
  </url>`,
).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap);
console.log(`sitemap.xml written (${ROUTES.length} pages)${failures ? `, ${failures} page(s) not prerendered` : ""}`);
