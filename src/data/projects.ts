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

export interface Project {
  id: string;
  title: string;
  category: Domain;
  tags: string[];
  year: string;
  companies: Company[];
  description: string;
  link?: string;
  coverImage: string;
  coverVideo?: string;
  images: string[];
}

export const projects: Project[] = projectsRaw.projects.map((p) => ({
  ...p,
  category: p.category as Domain,
  companies: (p.companies ?? [])
    .map((key) => companies[key])
    .filter(Boolean),
  link: p.link ?? undefined,
  coverVideo: p.coverVideo ?? undefined,
  images: [p.coverImage],
}));
