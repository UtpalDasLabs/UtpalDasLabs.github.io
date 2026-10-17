// Build-time renderer used by scripts/prerender.mjs (never shipped to browsers).
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./AppRoutes";
import { collectedMeta, resetMeta } from "./hooks/use-page-meta";
import { projects } from "./data/projects";

export const routes = [
  "/",
  "/work",
  ...projects.map((p) => `/work/${p.id}`),
  "/labs",
  "/about",
  "/kind-words",
  "/contact",
  "/notes/agent-accountability",
];

export function render(url: string) {
  resetMeta();
  const html = renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  );
  return { html, meta: { ...collectedMeta } };
}
