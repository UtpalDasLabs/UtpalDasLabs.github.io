// Content lives in /content/labs.json (editable via Pages CMS).
// The Labs page showcases live, browser-first tools built under UtpalDasLabs.
import labsRaw from "../../content/labs.json";

export interface LabsTool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  /** Live app URL. Absent while a tool is still "soon". */
  url?: string;
  status: "live" | "soon";
  coverHeadline: string;
  coverCaption: string;
}

export interface LabsIntro {
  eyebrow: string;
  title: string;
  lead: string;
  githubUrl: string;
}

export const labsIntro: LabsIntro = labsRaw.intro;
export const labsTools: LabsTool[] = labsRaw.tools.map((t) => ({
  ...t,
  status: (t.status as "live" | "soon") ?? "live",
  url: (t as { url?: string }).url ?? undefined,
}));
