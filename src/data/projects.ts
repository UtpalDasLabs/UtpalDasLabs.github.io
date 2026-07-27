// Content lives in /content/*.json (editable via Pages CMS).
// This module adds types and resolves company references.
import projectsRaw from "../../content/projects.json";
import companiesRaw from "../../content/companies.json";

export type Domain =
  | "AI Systems"
  | "Mobility & Marketplaces"
  | "Industrial & Vision"
  | "Avionics & Embedded"
  | "Leadership";

export interface Company {
  key?: string;
  name: string;
  url?: string;
  logo?: string;
}

export const companies: Record<string, Company> = Object.fromEntries(
  companiesRaw.companies.map((c) => [
    c.key,
    { ...c, url: c.url ?? undefined, logo: c.logo ?? undefined },
  ]),
);

/** A headline number, pulled out of the prose so it's scannable in seconds. */
export interface Metric {
  value: string;
  label: string;
  note?: string;
}

export interface Project {
  id: string;
  title: string;
  category: Domain;
  tags: string[];
  year: string;
  companies: Company[];
  description: string;
  story?: string[];
  link?: string;
  /** ---- Case-study fields. All optional: a project with none of them
   *  renders as the original compact layout. Populated for flagships. ---- */
  /** One-sentence value proposition, shown under the hero title. */
  oneLiner?: string;
  /** What Utpal himself owned — the first thing a hiring manager looks for. */
  role?: string;
  team?: string;
  scale?: string;
  period?: string;
  stack?: string[];
  metrics?: Metric[];
  problem?: string;
  approach?: string[];
  outcome?: string;
  /** Author name in recommendations.json — renders a pull-quote as proof. */
  recommendationRef?: string;
  coverImage: string;
  coverVideo?: string;
  /** Real frame extracted from coverVideo — used as the <video poster> and
   *  as the fallback image, so a reused abstract SVG never shows before
   *  playback starts or for reduced-motion users. */
  coverPoster?: string;
  /** Bold word/phrase shown on a typographic cover, for projects with no
   *  video and a generic/reused SVG cover. Only set on a handful of
   *  projects — most cards use coverImage/coverVideo instead. */
  coverHeadline?: string;
  coverCaption?: string;
}

/** The optional case-study fields as they appear in the raw JSON. */
type CaseStudyFields = Pick<
  Project,
  | "oneLiner"
  | "role"
  | "team"
  | "scale"
  | "period"
  | "stack"
  | "metrics"
  | "problem"
  | "approach"
  | "outcome"
  | "recommendationRef"
>;

export const projects: Project[] = projectsRaw.projects.map((p) => ({
  ...p,
  category: p.category as Domain,
  companies: (p.companies ?? [])
    .map((key) => companies[key])
    .filter(Boolean),
  link: p.link ?? undefined,
  coverVideo: p.coverVideo ?? undefined,
  coverPoster: (p as { coverPoster?: string }).coverPoster ?? undefined,
  story: (p as { story?: string[] }).story ?? undefined,
  coverHeadline: (p as { coverHeadline?: string }).coverHeadline ?? undefined,
  coverCaption: (p as { coverCaption?: string }).coverCaption ?? undefined,
  // Case-study fields — absent on projects still using the compact layout.
  // Listed explicitly (rather than spread) so the mapped `companies` above
  // isn't overwritten by the raw string keys.
  ...(() => {
    // Only the case-study fields — narrowed via `unknown` because the raw JSON
    // shape differs from Project (companies are string keys there).
    const c = p as unknown as CaseStudyFields;
    return {
      oneLiner: c.oneLiner,
      role: c.role,
      team: c.team,
      scale: c.scale,
      period: c.period,
      stack: c.stack,
      metrics: c.metrics,
      problem: c.problem,
      approach: c.approach,
      outcome: c.outcome,
      recommendationRef: c.recommendationRef,
    };
  })(),
}));
