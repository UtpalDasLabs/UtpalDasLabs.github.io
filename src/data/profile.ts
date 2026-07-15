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
      "Owned the native apps of Europe's largest car marketplace — iOS & Android search, listing and selling experiences serving millions of users across 2M+ vehicle listings.",
  },
  {
    company: "Cazoo",
    title: "Senior Product Manager",
    location: "Munich, Germany",
    start: "Jul 2021",
    end: "Aug 2022",
    summary:
      "After Cazoo's acquisition of Cluno, responsible for product across asset financing and car production.",
  },
  {
    company: "Cluno",
    title: "Senior Product Manager",
    location: "Munich, Germany",
    start: "Feb 2019",
    end: "Aug 2022",
    summary:
      "Led cross-functional teams building the Cluno Partner Platform, digital handover app, purchasing, operations, remarketing, and the Cluno iOS & Android apps for Germany's car-subscription pioneer.",
  },
  {
    company: "MERZ Group",
    title: "Head of Software / Product Development",
    location: "Aalen, Germany",
    start: "Sep 2015",
    end: "Jan 2019",
    summary:
      "Led three departments: atline inspection (application engineering & system testing), optical metrology systems (consulting & application engineering), and software development (architecture, GUI design, development and sales).",
  },
  {
    company: "MERZ Group",
    title: "Engineering Lead",
    location: "Aalen, Germany",
    start: "May 2013",
    end: "Sep 2015",
    summary:
      "Built CAD reverse-engineering application software (C++/C#/.NET, WPF) for metrology, and engineered automated inspection systems combining computer vision and robotics.",
  },
  {
    company: "Tata Consultancy Services",
    title: "IT Analyst",
    location: "India",
    start: "Sep 2008",
    end: "May 2013",
    summary:
      "Software developer — C++ (native & managed), C#/.NET, CAD software development on the ACIS kernel, point-cloud processing, visualization & modeling, and product GUIs in WPF.",
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
      "Android",
      "iOS",
      "SDLC",
      "Agile Project Management",
      "Software Project Management",
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
];

export const honors = [
  { title: "Service & Commitment Award", issued: "Sep 2011" },
];

export const volunteering = [
  { org: "Greenpeace", role: "Volunteer & Member", cause: "Environment", since: "2009" },
  { org: "WWF", role: "Volunteer", cause: "Animal rights", since: "" },
];
