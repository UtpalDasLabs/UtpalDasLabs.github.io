// Build-time static pre-rendering (SSG).
//
// After `vite build` (client) and `vite build --ssr` (renderer), this writes
// one fully rendered HTML file per public route into dist/, so search engines
// and AI answer engines receive the complete text — case studies, the AI
// blueprint, the Labs tear-downs — instead of an empty <div id="root">.
//
// It then asserts that the homepage really contains that evidence and fails
// the build loudly if it doesn't (PRD §7.1), and regenerates sitemap.xml.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");
const SITE = "https://utpaldas.com";

const template = readFileSync(join(dist, "index.html"), "utf8");
const { render, routes } = await import(pathToFileURL(join(ssrDir, "entry-server.js")).href);

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function fill(html, { title, description, path }, { noindex = false } = {}) {
  let out = html;
  if (title) {
    out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
    out = out.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
    out = out.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
  }
  if (description) {
    out = out.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`);
    out = out.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`);
    out = out.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(description)}$2`);
  }
  if (path) {
    const url = SITE + path;
    out = out.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
    out = out.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  }
  if (noindex) out = out.replace("</head>", '  <meta name="robots" content="noindex" />\n  </head>');
  return out;
}

// Bare client-rendered shell for routes that are never pre-rendered
// (/login, Lovable OAuth consent). vercel.json rewrites those paths here.
writeFileSync(join(dist, "app.html"), fill(template.replace("<!--app-html-->", ""), {}, { noindex: true }));

let count = 0;
for (const route of routes) {
  const { html, meta } = render(route);
  const page = fill(template.replace("<!--app-html-->", html), { ...meta, path: meta.path ?? route });
  const file = route === "/" ? join(dist, "index.html") : join(dist, route.slice(1), "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page);
  count++;
}

// 404 page (GitHub Pages serves 404.html; Vercel falls back to it for unknown paths)
{
  const { html, meta } = render("/__not-found__");
  writeFileSync(join(dist, "404.html"), fill(template.replace("<!--app-html-->", html), meta, { noindex: true }));
}

// ---- Acceptance gate: the homepage HTML must carry the evidence ----------
const home = readFileSync(join(dist, "index.html"), "utf8");
const homeData = JSON.parse(readFileSync(join(root, "content", "home.json"), "utf8"));
const decode = (s) =>
  s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const text = decode(home);
const must = [
  "CUBONIC",
  homeData.thesis.blueprintTitle,
  ...homeData.thesis.stages.map((s) => s.body),
  ...homeData.projects.caseStudies.flatMap((c) => [c.headline, c.tradeoff.decision]),
  ...homeData.labs.teardowns.flatMap((t) => [t.name, ...t.points.map((p) => p.body)]),
  '"@graph"',
];
const missing = must.filter((m) => !text.includes(m));
if (missing.length) {
  console.error("✗ prerender: homepage HTML is missing required content:");
  for (const m of missing) console.error("  - " + m.slice(0, 90));
  process.exit(1);
}

// ---- Sitemap ---------------------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  routes.map((r) => `  <url>\n    <loc>${SITE}${r === "/" ? "/" : r}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join("\n") +
  "\n</urlset>\n";
writeFileSync(join(dist, "sitemap.xml"), sitemap);

rmSync(ssrDir, { recursive: true, force: true });
console.log(`✓ prerender: ${count} routes + 404 written; homepage evidence verified (${must.length} checks)`);
