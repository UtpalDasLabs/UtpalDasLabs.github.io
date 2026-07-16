// Sourced from LinkedIn data export (June 2026). Professional data only.

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

export const headline =
  "Head of Digital Solutions at CUBONIC | 18+ Years in Digital Platforms, Marketplaces, Connected Products, Cloud, Mobility & Product GTM/Strategy";

export const positions: Position[] = [
  {
    company: "CUBONIC",
    title: "Head of Digital Solutions",
    location: "Berlin, Germany",
    start: "Feb 2024",
    end: null,
    summary:
      "Leading digital transformation across the business — AI strategy, local & private LLM deployments, agentic solutions, and the digital backbone for future mobility products.",
  },
  {
    company: "HirePlusPlus",
    title: "Advisory Board Member",
    location: "Berlin, Germany",
    start: "Aug 2023",
    end: "Jul 2024",
    summary:
      "Advising on product strategy and go-to-market for an HR-tech platform.",
  },
  {
    company: "AutoScout24",
    title: "Head of Product / Head of Apps",
    location: "Munich, Germany",
    start: "Aug 2022",
    end: "Jan 2024",
    summary:
      "Owned vision, strategy and roadmap for the native apps of Europe's largest car marketplace — iOS, Android and all white-label apps (AutoTrader, Gebrauchtwagen.de) — leading 4 senior PMs and 24 engineers. Grew organic user acquisition 30% across European markets, doubled app engagement, improved conversion 23%, and lifted app advertising & media revenue 10%.",
  },
  {
    company: "Cazoo",
    title: "Senior Product Manager",
    location: "Munich, Germany",
    start: "Jul 2021",
    end: "Aug 2022",
    summary:
      "After Cazoo's acquisition of Cluno, responsible for product across asset financing, fleet management and car production. Grew subscription revenue 30% and vehicle contribution margin 50%; helped launch the Cazoo retail proposition across 5 European markets and was part of the product leadership team when Cazoo listed on the NYSE in 2021.",
  },
  {
    company: "Cluno",
    title: "Senior Product Manager",
    location: "Munich, Germany",
    start: "Feb 2019",
    end: "Aug 2022",
    summary:
      "Owned the end-to-end digital transformation of Germany's car-subscription pioneer — partner platform connecting 131 dealerships plus logistics, refurbisher and assessor partners, digital handover, damage reporting, OCR fine handling, automated invoicing, and the Cluno iOS & Android apps. Cut operating costs ~25% through lean, automated operations.",
  },
  {
    company: "MERZ Group",
    title: "Head of Software / Product Development",
    location: "Aalen, Germany",
    start: "Sep 2015",
    end: "Jan 2019",
    summary:
      "Led 7 software teams building computer-vision products for Carl Zeiss IMT — industrial metrology and car-body measurement — while consulting on manufacturing quality at Porsche, Daimler, VW, Volvo and Ford plants. Architected the core point-cloud processing product, ran business development from first contact to closed deal, and received a Microsoft MVP award.",
  },
  {
    company: "MERZ Group",
    title: "Engineering Lead",
    location: "Aalen, Germany",
    start: "May 2013",
    end: "Sep 2015",
    summary:
      "Built ZEISS Reverse Engineering (C++/C#/WPF on the ACIS kernel) — CAD reverse engineering and tool correction for mould making — and engineered robot-based automated inspection combining optical sensors with FANUC, KUKA and ABB robots.",
  },
  {
    company: "Tata Consultancy Services",
    title: "IT Analyst",
    location: "India",
    start: "Sep 2008",
    end: "May 2013",
    summary:
      "Embedded systems and CAD software across regulated industries: avionics for the SARAS aircraft programme at National Aerospace Laboratories (DO-178B), sensor firmware for Anderson-Negele, assembly-level V&V for Meggitt flight displays — then technical lead building ZEISS Reverse Engineering from scratch, the product that took me to Germany.",
  },
];

export const education: EducationEntry[] = [
  {
    school: "Amrita Vishwa Vidyapeetham",
    degree: "Bachelor of Technology (B.Tech.), Electrical & Electronics Engineering",
    period: "2004 — 2008",
    activities: "Indian Society of Electrical and Electronics Engineers, IEEE Seminar",
  },
  {
    school: "Kendriya Vidyalaya",
    degree: "XII (CBSE)",
    period: "1992 — 2004",
    activities:
      "Debate team, elocution, house prefect, science exhibitions, cultural & arts committee, regional and national level sports",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Product & Leadership",
    skills: [
      "Product Management",
      "Product Strategy",
      "Product Vision",
      "Product Discovery",
      "Go-to-Market Strategy",
      "Digital Strategy",
      "Leadership",
      "Team Management",
      "Coaching & Mentoring",
      "Change Management",
      "Revenue & Profit Growth",
    ],
  },
  {
    label: "AI & Emerging Tech",
    skills: [
      "AI Strategy",
      "Local LLMs",
      "Artificial Intelligence (AI)",
      "Agentic Systems",
      "Solution Architecture",
      "Robotics",
      "Augmented Reality",
      "Embedded Systems",
    ],
  },
  {
    label: "Domains",
    skills: [
      "Online Marketplaces",
      "E-Commerce",
      "SaaS",
      "B2B & B2C",
      "Supply Chain Management",
      "Lean Operations",
      "User Experience (UX)",
    ],
  },
  {
    label: "Engineering",
    skills: [
      "C++",
      "C#",
      "Python",
      "TypeScript",
      "Qt",
      "OpenCV & Point Clouds",
      "Android",
      "iOS",
      "Salesforce",
      "Tableau & Amplitude",
      "SDLC",
      "Agile Project Management",
    ],
  },
];

// Top endorsed skills from LinkedIn (endorsement counts)
export const topEndorsed: EndorsedSkill[] = [
  { name: "C++", count: 24 },
  { name: ".NET", count: 20 },
  { name: "C", count: 12 },
  { name: "Product Management", count: 10 },
  { name: "Requirements Analysis", count: 9 },
  { name: "Software Development", count: 9 },
  { name: "Software Project Management", count: 7 },
  { name: "Coaching & Mentoring", count: 6 },
  { name: "Analytical Skills", count: 6 },
];

export const languages = [
  { name: "English", level: "Full professional proficiency" },
  { name: "Assamese", level: "Native" },
  { name: "Hindi", level: "Full professional proficiency" },
  { name: "German", level: "Professional working proficiency" },
  { name: "Japanese", level: "Elementary proficiency" },
];

export const certifications = [
  {
    name: ".NET 4.0 & WPF",
    authority: "PC College, Stuttgart, Germany",
    year: "2011",
  },
  {
    name: "FANUC Robot Handling and Dual Check Safety",
    authority: "FANUC Robotics Deutschland GmbH",
    year: "2015",
  },
  {
    name: "DMIS CMM Programming",
    authority: "ZEISS Academy, Germany",
    year: "2018",
  },
];

export const honors = [
  { title: "Microsoft MVP Award", issued: "Merz Technologies" },
  { title: "Service & Commitment Award", issued: "TCS, 2011" },
];

export const volunteering = [
  { org: "Greenpeace", role: "Volunteer & Member", cause: "Environment", since: "2009" },
  { org: "WWF", role: "Volunteer", cause: "Animal rights", since: "" },
];
