// Content lives in /content/profile.json (editable via Pages CMS).
import profile from "../../content/profile.json";

export interface Position {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string | null; // null = present
  summary: string;
}

export interface EducationEntry {
  school: string;
  degree: string;
  period: string;
  activities?: string;
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface EndorsedSkill {
  name: string;
  count: number;
}

export const headline: string = profile.headline;
export const positions: Position[] = profile.positions as Position[];
export const education: EducationEntry[] = profile.education as EducationEntry[];
export const skillGroups: SkillGroup[] = profile.skillGroups;
export const topEndorsed: EndorsedSkill[] = profile.topEndorsed;
export const languages = profile.languages;
export const certifications = profile.certifications;
export const honors = profile.honors;
export const volunteering = profile.volunteering;
