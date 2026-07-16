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
  zeissSmt: { name: "Carl Zeiss SMT", url: "https://www.zeiss.com/semiconductor-manufacturing-technology/home.html", logo: zeissLogo },
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
      "Head of Product for the native apps of Europe's largest car marketplace — search, favorites, price-drop alerts, dealer contact and selling flows across 2M+ listings, plus the AutoTrader and Gebrauchtwagen.de white-label apps. Led 4 senior PMs and 24 engineers; grew organic user acquisition 30% across European markets, doubled engagement, improved conversion 23% and lifted app advertising revenue 10%.",
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
      "One platform connecting Cluno with its whole partner ecosystem — 131 dealerships, logistics carriers, refurbishers and vehicle assessors across Germany. Order confirmation, scheduling, digital handover protocols, invoicing and vehicle-health reporting replaced email-and-spreadsheet workflows, letting a lean operations team run a growing subscription fleet. Cluno was later acquired by Cazoo.",
    coverImage: mobilityB,
    images: [mobilityB],
  },
  {
    id: "apollo-ar-projection",
    title: "Werklicht 3D — AR Projection",
    category: "Industrial & Vision",
    tags: ["AUGMENTED REALITY", "INDUSTRY 4.0"],
    year: "2017–2018",
    companies: [companies.extend3d],
    description:
      "Architect and scrum master for Extend3D's Werklicht laser/video projection system — augmented reality that projects CAD data directly onto physical parts on the automotive shop floor. Qt, C++ and the CGM modeler kernel, including a 3D data framework importing GOM, Polyworks and SpaceClaim formats.",
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
      "After Cazoo's acquisition of Cluno, led product for asset financing, fleet management and car production — the systems that financed and tracked the subscription fleet. Contributed to a 30% rise in subscription revenue and a 50% improvement in vehicle contribution margin, and supported the Cazoo retail launch across 5 European markets.",
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
      "Engine Indication and Crew Alert System for the pilot's primary display of NAL's SARAS aircraft — flight management, GPS position, fuel indication and ground-maintenance modules in C++ under DO-178B; assembly-level V&V of the TI DSP code in Meggitt's secondary flight display; and C firmware for Anderson-Negele food & pharma sensor systems.",
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
      "A three-step digital protocol replacing paper checklists for every vehicle transaction — home delivery, pick-up, drop-off and collection — with real-time handover status in Salesforce, plus in-app damage reporting with dynamic questionnaires, photos and location sharing feeding straight into insurance and repair workflows.",
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
      "The systems behind lean operations: a work-order management system mapping every job and invoice line item across logistics, maintenance, repair and inspection; OCR-based fine handling from scanned police notices to customer invoice; automated monthly invoicing; on-demand vehicle-health reports; S&OP and mid-mile planning; and the Glide Intake app for VIN-scan check-in.",
    coverImage: mobilityB,
    images: [mobilityB],
  },
  {
    id: "zeiss-measurement-cell",
    title: "AI Box — Automated Inspection Cell",
    category: "Industrial & Vision",
    tags: ["METROLOGY", "ROBOTICS"],
    year: "2016–2017",
    companies: [companies.zeissImt],
    description:
      "Robot-mounted optical measurement cell inspecting car-body parts next to the production line for Carl Zeiss IMT. Product owner, application engineer and software release manager from hardware & software requirements to release — piloted at Porsche Weissach and Daimler Sindelfingen, with cells in Germany, Shanghai and Detroit.",
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
      "ZEISS Reverse Engineering — CAD reverse engineering and tool correction for mould making, built on point-cloud processing and BRep modelling (ACIS kernel). Technical lead from the first line of code at TCS, then owner through requirements, architecture, release, sales and support at MERZ for Carl Zeiss IMT. Followed by Merz CAD Workmate, an in-house CAD app later ported to Android and Microsoft HoloLens for holographic on-part reverse engineering.",
    coverImage: engineeringA,
    images: [engineeringA],
  },
  {
    id: "ct-defect-detection",
    title: "ML Defect Detection for CT Scans",
    category: "Industrial & Vision",
    tags: ["MACHINE LEARNING", "METROLOGY"],
    year: "2017–2018",
    companies: [companies.zeissSmt],
    description:
      "Machine-learning defect detection (Caffe) for computed-tomography scans of EUV mirror frames in semiconductor manufacturing — volumetric scan import, defect classification by probability, type, size and rest-wall thickness, and a trainable master/user workflow. Project lead from requirement definition and technical design through delivery.",
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
