// Homepage copy ("The Evidence Engine") lives in /content/home.json
// (editable via Pages CMS). Components read it through these types only.
import raw from "../../content/home.json";
import { recommendations, type Recommendation } from "./recommendations";

export interface CaseStudy {
  id: string;
  tag: string;
  meta: string;
  headline: string;
  matrix: { domain: string; constraints: string; scope: string; outcome: string };
  tradeoff: { context: string; decision: string; result: string };
  related: string[];
}

export interface Teardown {
  id: string;
  name: string;
  kind: string;
  status: string;
  url: string;
  repoUrl: string;
  summary: string;
  points: { title: string; code: string; body: string }[];
}

export interface Intent {
  id: string;
  label: string;
  audience: string;
  summary: string;
  subject: string;
  cta: string;
}

export const home = raw;
export const caseStudies: CaseStudy[] = raw.projects.caseStudies;
export const teardowns: Teardown[] = raw.labs.teardowns;
export const intents: Intent[] = raw.contact.intents;

export const endorsements: (Recommendation & { standard: string })[] =
  raw.principles.endorsements.flatMap((e) => {
    const r = recommendations.find((x) => x.author === e.author);
    return r ? [{ ...r, standard: e.standard }] : [];
  });
