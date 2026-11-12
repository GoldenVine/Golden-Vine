// Build-time renderer: turns each page into ready-made HTML so search engines
// and AI assistants can read the content without running JavaScript.
import { renderToString } from "react-dom/server";
import App from "./App";

export function render(url: string) {
  const helmetContext: { helmet?: any } = {};
  const html = renderToString(<App ssrPath={url} helmetContext={helmetContext} />);
  const h = helmetContext.helmet;
  const head = h
    ? [h.title.toString(), h.meta.toString(), h.link.toString(), h.script.toString()].join("\n    ")
    : "";
  return { html, head };
}
