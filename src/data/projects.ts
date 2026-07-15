import aiA from "@/assets/covers/ai-a.svg";
import aiB from "@/assets/covers/ai-b.svg";
import mobilityA from "@/assets/covers/mobility-a.svg";
import mobilityB from "@/assets/covers/mobility-b.svg";
import engineeringA from "@/assets/covers/engineering-a.svg";
import avionicsA from "@/assets/covers/avionics-a.svg";
import leadershipA from "@/assets/covers/leadership-a.svg";

import cubonicLogo from "@/assets/logos/cubonic.png";
import autoscout24Logo from "@/assets/logos/autoscout24.png";
import zeissLogo from "@/assets/logos/zeiss.png";
import tcsLogo from "@/assets/logos/tcs.png";
import cazooLogo from "@/assets/logos/cazoo.png";
import extend3dLogo from "@/assets/logos/extend3d.svg";
import negeleLogo from "@/assets/logos/anderson-negele.png";

export type Domain =
  | "AI Systems"
  | "Mobility & Marketplaces"
  | "Industrial & Vision"
  | "Avionics & Embedded"
  | "Leadership";

export interface Company {
  name: string;
  url?: string;
  logo?: string;
}

export const companies = {
  cubonic: { name: "CUBONIC", url: "https://cubonic.de", logo: cubonicLogo },
  autoscout24: { name: "AutoScout24", url: "https://www.autoscout24.de", logo: autoscout24Logo },
  cazoo: { name: "Cazoo", url: "https://www.cazoo.co.uk", logo: cazooLogo },
  cluno: { name: "Cluno", url: "https://www.cazoo.co.uk" },
  zeissImt: { name: "Carl Zeiss IMT GmbH", url: "https://www.zeiss.com/metrology", logo: zeissLogo },
  tcs: { name: "Tata Consultancy Services", url: "https://www.tcs.com", logo: tcsLogo },
  extend3d: { name: "Extend3D", url: "https://www.extend3d.com", logo: extend3dLogo },
  nal: { name: "National Aerospace Laboratories", url: "https://www.nal.res.in" },
  meggitt: { name: "Meggitt", url: "https://www.meggitt.com" },
  negele: { name: "Anderson-Negele", url: "https://www.anderson-negele.com", logo: negeleLogo },
  hireplusplus: { name: "HirePlusPlus", url: "https://hireplusplus.com" },
  labs: { name: "UtpalDasLabs", url: "https://github.com/UtpalDasLabs" },
} satisfies Record<string, Company>;

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
  images: string[];
}

// Recent CUBONIC/AI work + real project history from LinkedIn (2005–present).
export const projects: Project[] = [
  {
    id: "agentic-platform",
    title: "Agentic AI Platform",
    category: "AI Systems",
    tags: ["AGENTIC AI", "LLM ORCHESTRATION"],
    year: "2025",
    companies: [companies.cubonic],
    description:
      "An internal platform for building multi-agent workflows on top of local and hosted LLMs — tool use, memory, guardrails, and human-in-the-loop review for mobility and operations teams.",
    coverImage: aiA,
    images: [aiA],
  },
  {
    id: "autoscout24-apps",
    title: "AutoScout24 Mobile Apps",
    category: "Mobility & Marketplaces",
    tags: ["IOS & ANDROID", "MARKETPLACE"],
    year: "2022–2024",
    companies: [companies.autoscout24],
    description:
      "Head of Product for the native apps of Europe's largest car marketplace — search, favorites, price-drop alerts, dealer contact, and selling flows across 2M+ vehicle listings. Led app product strategy with international offices and drove the roadmap for millions of monthly users.",
    link: "https://www.autoscout24.de/",
    coverImage: mobilityA,
    images: [mobilityA],
  },
  {
    id: "local-llm-stack",
    title: "Local LLM Stack",
    category: "AI Systems",
    tags: ["LOCAL LLMS", "PRIVACY"],
    year: "2025",
    companies: [companies.cubonic],
    description:
      "Private, on-prem LLM deployment stack for regulated data — model routing, quantization, evaluation harness, and observability, so sensitive workloads never leave the perimeter.",
    coverImage: aiB,
    images: [aiB],
  },
  {
    id: "cluno-partner-platform",
    title: "Partner Platform Digital Ecosystem",
    category: "Mobility & Marketplaces",
    tags: ["B2B PLATFORM", "OPERATIONS"],
    year: "2019–2022",
    companies: [companies.cluno],
    description:
      "Built the partner portal that moved supplier collaboration from manual to digital for Germany's car-subscription pioneer — purchasing, operations, and remarketing flows that let a lean operations team scale a growing fleet.",
    coverImage: mobilityB,
    images: [mobilityB],
  },
  {
    id: "apollo-ar-projection",
    title: "Apollo AR Video Projection",
    category: "Industrial & Vision",
    tags: ["AUGMENTED REALITY", "INDUSTRY 4.0"],
    year: "2017–2018",
    companies: [companies.extend3d],
    description:
      "Architect and scrum master for a Qt-based augmented-reality video projection and machine-vision system for Industry 4.0, targeting the automotive industry — a CGM-based CAD system for interacting with CAD data directly on the shop floor.",
    link: "https://www.extend3d.com/de/produkt/werklicht-video/",
    coverImage: engineeringA,
    images: [engineeringA],
  },
  {
    id: "asset-financing",
    title: "Asset Financing System",
    category: "Mobility & Marketplaces",
    tags: ["FINTECH", "AUTOMOTIVE"],
    year: "2021–2022",
    companies: [companies.cazoo],
    description:
      "After Cazoo's acquisition of Cluno, led product for asset financing and car production — the systems that financed and tracked the fleet behind the subscription business.",
    coverImage: mobilityB,
    images: [mobilityB],
  },
  {
    id: "eicas-avionics",
    title: "Avionics & Safety-Critical Systems",
    category: "Avionics & Embedded",
    tags: ["AVIONICS", "SAFETY-CRITICAL"],
    year: "2008–2011",
    companies: [companies.nal, companies.meggitt, companies.negele],
    description:
      "Engine Indication and Crew Alert System (EICAS) software for the pilot's primary multi-function display at National Aerospace Laboratories; assembly-level verification & validation of Meggitt's secondary flight display; and sensor firmware for food & pharma industry systems.",
    coverImage: avionicsA,
    images: [avionicsA],
  },
  {
    id: "ai-strategy",
    title: "AI Strategy & Governance",
    category: "AI Systems",
    tags: ["AI STRATEGY", "LEADERSHIP"],
    year: "2024",
    companies: [companies.cubonic],
    description:
      "A pragmatic AI operating model: opportunity mapping, capability roadmap, risk & governance framework, and vendor vs. build decisions — turning executive intent into shipped systems.",
    coverImage: aiA,
    images: [aiA],
  },
  {
    id: "digital-handover",
    title: "Digital Handover & Damage Reporting",
    category: "Mobility & Marketplaces",
    tags: ["MOBILE APPS", "OPERATIONS"],
    year: "2019–2022",
    companies: [companies.cluno],
    description:
      "The app-based car handover experience and iOS/Android damage-reporting flows for the Cluno subscription fleet — digitizing what used to be paper checklists at physical handover points.",
    link: "https://apps.apple.com/de/app/cluno-auto-abo/id1434401969",
    coverImage: mobilityA,
    images: [mobilityA],
  },
  {
    id: "operations-automation",
    title: "Operations & Logistics Automation",
    category: "Mobility & Marketplaces",
    tags: ["SUPPLY CHAIN", "AUTOMATION"],
    year: "2019–2021",
    companies: [companies.cluno, companies.cazoo],
    description:
      "A family of internal systems that made lean operations possible: S&OP process automation, supply-chain & logistics automation, mid-mile planning, OCR-based fine handling, and the Glide Intake app for VIN-scan car check-in.",
    coverImage: mobilityB,
    images: [mobilityB],
  },
  {
    id: "zeiss-measurement-cell",
    title: "Optical Measurement Cell",
    category: "Industrial & Vision",
    tags: ["METROLOGY", "ROBOTICS"],
    year: "2016–2017",
    companies: [companies.zeissImt],
    description:
      "Software release manager and application engineer for an automated optical measurement and inspection cell — robot-driven metrology for production lines.",
    link: "https://pages.zeiss.com/RIM_AIBox_Info.html",
    coverImage: engineeringA,
    images: [engineeringA],
  },
  {
    id: "cad-reverse-engineering",
    title: "CAD Reverse Engineering Suite",
    category: "Industrial & Vision",
    tags: ["CAD", "COMPUTER VISION"],
    year: "2011–2017",
    companies: [companies.zeissImt],
    description:
      "Five years building CAD reverse-engineering application software for Carl Zeiss — C++/C#/.NET and WPF, point-cloud processing on the ACIS kernel — followed by Merz CAD Workmate, a cross-platform CAD application with AR/VR device support.",
    coverImage: engineeringA,
    images: [engineeringA],
  },
  {
    id: "product-leadership",
    title: "Product & Engineering Leadership",
    category: "Leadership",
    tags: ["LEADERSHIP", "TEAMS"],
    year: "2013–present",
    companies: [companies.zeissImt, companies.cluno, companies.cazoo, companies.autoscout24, companies.cubonic],
    description:
      "Building and leading cross-functional teams across engineering, product, and design — from three departments at MERZ to app teams at AutoScout24 — hiring, delivery cadence, and a bias toward shipping useful software over slideware.",
    coverImage: leadershipA,
    images: [leadershipA],
  },
  {
    id: "personal-labs",
    title: "UtpalDasLabs",
    category: "AI Systems",
    tags: ["LABS", "EXPERIMENTS"],
    year: "Ongoing",
    companies: [companies.labs],
    description:
      "A workshop for agentic systems, small models, and mobility-adjacent tinkering. Most repos are private while incubating — expect select open-source releases over time.",
    link: "https://github.com/UtpalDasLabs",
    coverImage: aiB,
    images: [aiB],
  },
];
