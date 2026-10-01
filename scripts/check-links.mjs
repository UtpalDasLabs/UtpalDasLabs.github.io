// Dependency-free external-link checker.
//
// The portfolio links out to company sites, product pages and the live Labs
// tools. Those rot quietly — a company folds, a campaign page is retired, a
// repo flips to private — and a dead link on a portfolio reads as carelessness.
// This checks every external URL in content/*.json and reports what is broken.
//
// Run locally with `npm run check:links`, but note it needs outbound network;
// in a sandbox without egress every link will look dead. CI is the place it
// gives a trustworthy answer (.github/workflows/check-links.yml).
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = join(root, "content");
const TIMEOUT_MS = 20000;
const UA =
  "Mozilla/5.0 (compatible; UtpalDasLabsLinkCheck/1.0; +https://utpaldaslabs.github.io)";

// Collect every absolute URL in the content files, remembering where it came from.
const found = new Map(); // url -> Set<file>
for (const file of readdirSync(contentDir).filter((f) => f.endsWith(".json"))) {
  const text = readFileSync(join(contentDir, file), "utf8");
  for (const m of text.matchAll(/"(https?:\/\/[^"\s]+)"/g)) {
    if (!found.has(m[1])) found.set(m[1], new Set());
    found.get(m[1]).add(file);
  }
}

const check = async (url) => {
  // Some hosts reject HEAD outright, so fall back to a GET before judging.
  for (const method of ["HEAD", "GET"]) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method,
        redirect: "follow",
        signal: ctrl.signal,
        headers: { "user-agent": UA, accept: "*/*" },
      });
      clearTimeout(timer);
      if (res.status === 405 || res.status === 501) continue; // method not allowed → retry as GET
      return { ok: res.ok, status: res.status, finalUrl: res.url };
    } catch (e) {
      clearTimeout(timer);
      if (method === "GET") {
        return { ok: false, status: 0, error: e.name === "AbortError" ? "timeout" : e.message };
      }
    }
  }
  return { ok: false, status: 0, error: "unreachable" };
};

const urls = [...found.keys()].sort();
console.log(`Checking ${urls.length} external links from content/*.json\n`);

const results = await Promise.all(
  urls.map(async (url) => ({ url, ...(await check(url)) })),
);

const broken = [];
for (const r of results) {
  const where = [...found.get(r.url)].join(", ");
  if (r.ok) {
    const moved = r.finalUrl && r.finalUrl.replace(/\/$/, "") !== r.url.replace(/\/$/, "");
    console.log(`  ok   ${r.status}  ${r.url}${moved ? `\n         → redirects to ${r.finalUrl}` : ""}`);
  } else {
    broken.push({ ...r, where });
    console.log(`  DEAD ${r.status || "---"}  ${r.url}  (${r.error ?? "http error"})  [${where}]`);
  }
}

if (broken.length) {
  console.error(`\n✗ ${broken.length} broken link(s):`);
  for (const b of broken) {
    console.error(`  - ${b.url}  [${b.where}]  ${b.status || b.error}`);
  }
  process.exit(1);
}
console.log(`\n✓ all ${urls.length} links reachable`);
