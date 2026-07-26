// Dependency-free content-integrity check.
// Runs in the build (before tsc/vite) so a malformed content/*.json edit —
// e.g. via the Pages CMS — fails fast instead of shipping a broken page.
// Guards the JSON → typed-data contract in src/data/*.ts.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const err = (msg) => errors.push(msg);

const read = (name) => {
  try {
    return JSON.parse(readFileSync(join(root, "content", name), "utf8"));
  } catch (e) {
    err(`content/${name}: cannot read or parse (${e.message})`);
    return null;
  }
};

const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;

const PROJECT_CATEGORIES = new Set([
  "AI Systems",
  "Mobility & Marketplaces",
  "Industrial & Vision",
  "Avionics & Embedded",
  "Leadership",
]);

// --- projects.json ---
const projects = read("projects.json");
if (projects) {
  const list = projects.projects;
  if (!Array.isArray(list) || list.length === 0) {
    err("projects.json: `projects` must be a non-empty array");
  } else {
    const ids = new Set();
    for (const [i, p] of list.entries()) {
      const at = `projects[${i}]${p?.id ? ` (${p.id})` : ""}`;
      for (const f of ["id", "title", "category", "year", "description"]) {
        if (!isNonEmptyString(p?.[f])) err(`${at}: missing/empty "${f}"`);
      }
      if (p?.id) {
        if (ids.has(p.id)) err(`${at}: duplicate id`);
        ids.add(p.id);
      }
      if (p?.category && !PROJECT_CATEGORIES.has(p.category)) {
        err(`${at}: unknown category "${p.category}"`);
      }
      if (p?.tags && !Array.isArray(p.tags)) err(`${at}: "tags" must be an array`);
    }
  }
}

// --- labs.json ---
const labs = read("labs.json");
if (labs) {
  if (!labs.intro || !isNonEmptyString(labs.intro.title)) {
    err("labs.json: missing intro.title");
  }
  if (!Array.isArray(labs.tools)) {
    err("labs.json: `tools` must be an array");
  } else {
    const ids = new Set();
    for (const [i, t] of labs.tools.entries()) {
      const at = `labs.tools[${i}]${t?.id ? ` (${t.id})` : ""}`;
      for (const f of ["id", "name", "tagline", "description", "coverHeadline"]) {
        if (!isNonEmptyString(t?.[f])) err(`${at}: missing/empty "${f}"`);
      }
      if (t?.id) {
        if (ids.has(t.id)) err(`${at}: duplicate id`);
        ids.add(t.id);
      }
      const status = t?.status ?? "live";
      if (!["live", "soon"].includes(status)) err(`${at}: status must be "live" or "soon"`);
      if (status === "live" && !isNonEmptyString(t?.url)) {
        err(`${at}: a "live" tool must have a "url" to launch`);
      }
    }
  }
}

// --- profile.json ---
const profile = read("profile.json");
if (profile && !Array.isArray(profile.positions)) {
  err("profile.json: `positions` must be an array");
}

// --- recommendations.json ---
const recs = read("recommendations.json");
if (recs) {
  const list = Array.isArray(recs) ? recs : recs.recommendations;
  if (!Array.isArray(list)) err("recommendations.json: expected an array of recommendations");
}

if (errors.length) {
  console.error(`\n✗ content check failed (${errors.length}):`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error("");
  process.exit(1);
}
console.log("✓ content check passed");
