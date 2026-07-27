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

// Collected while scanning projects, resolved against recommendations below.
const recommendationRefs = [];

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

      // Optional case-study fields: validate shape when present.
      if (p?.metrics !== undefined) {
        if (!Array.isArray(p.metrics)) {
          err(`${at}: "metrics" must be an array`);
        } else {
          for (const [j, m] of p.metrics.entries()) {
            if (!isNonEmptyString(m?.value) || !isNonEmptyString(m?.label)) {
              err(`${at}: metrics[${j}] needs a non-empty "value" and "label"`);
            }
          }
          if (p.metrics.length > 4) {
            err(`${at}: ${p.metrics.length} metrics — keep it to 4 so the row stays scannable`);
          }
        }
      }
      for (const f of ["approach", "stack"]) {
        if (p?.[f] !== undefined && !Array.isArray(p[f])) {
          err(`${at}: "${f}" must be an array`);
        }
      }
      // A recommendationRef must resolve to a real recommendation author.
      if (p?.recommendationRef !== undefined) {
        if (!isNonEmptyString(p.recommendationRef)) {
          err(`${at}: "recommendationRef" must be a non-empty string`);
        } else {
          recommendationRefs.push([at, p.recommendationRef]);
        }
      }
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
  if (!Array.isArray(list)) {
    err("recommendations.json: expected an array of recommendations");
  } else {
    // Every project's recommendationRef must name a real author, otherwise the
    // pull-quote silently disappears from the case study.
    const authors = new Set(list.map((r) => r?.author).filter(Boolean));
    for (const [at, ref] of recommendationRefs) {
      if (!authors.has(ref)) {
        err(`${at}: recommendationRef "${ref}" matches no author in recommendations.json`);
      }
    }
  }
}

if (errors.length) {
  console.error(`\n✗ content check failed (${errors.length}):`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error("");
  process.exit(1);
}
console.log("✓ content check passed");
