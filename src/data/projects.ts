import neonPortrait from "@/assets/neon-portrait.jpg";
import lightSilhouette from "@/assets/light-silhouette.jpg";
import tarotCards from "@/assets/tarot-cards.jpg";
import prismaticPortrait from "@/assets/prismatic-portrait.jpg";
import digitalWaves from "@/assets/digital-waves.jpg";
import abstractPaint from "@/assets/abstract-paint.jpg";
import abstractLayers from "@/assets/abstract-layers.jpg";
import fluidArt from "@/assets/fluid-art.jpg";

export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  year: string;
  client: string;
  description: string;
  coverImage: string;
  images: string[];
}

// Focus areas & initiatives — reshape freely with real case-study details.
export const projects: Project[] = [
  {
    id: "agentic-platform",
    title: "Agentic AI Platform",
    category: "AI Systems",
    tags: ["AGENTIC AI", "LLM ORCHESTRATION"],
    year: "2025",
    client: "CUBONIC",
    description:
      "An internal platform for building multi-agent workflows on top of local and hosted LLMs — tool use, memory, guardrails, and human-in-the-loop review for mobility and operations teams.",
    coverImage: digitalWaves,
    images: [digitalWaves],
  },
  {
    id: "local-llm-stack",
    title: "Local LLM Stack",
    category: "AI Infrastructure",
    tags: ["LOCAL LLMS", "PRIVACY"],
    year: "2025",
    client: "CUBONIC",
    description:
      "Private, on-prem LLM deployment stack for regulated data — model routing, quantization, evaluation harness, and observability, so sensitive workloads never leave the perimeter.",
    coverImage: prismaticPortrait,
    images: [prismaticPortrait],
  },
  {
    id: "ai-strategy",
    title: "AI Strategy & Governance",
    category: "Advisory",
    tags: ["AI STRATEGY", "LEADERSHIP"],
    year: "2024",
    client: "CUBONIC",
    description:
      "A pragmatic AI operating model: opportunity mapping, capability roadmap, risk & governance framework, and vendor vs. build decisions — turning executive intent into shipped systems.",
    coverImage: neonPortrait,
    images: [neonPortrait],
  },
  {
    id: "mobility-digital",
    title: "Mobility Digital Solutions",
    category: "Product",
    tags: ["MOBILITY", "DIGITAL TRANSFORMATION"],
    year: "2024",
    client: "CUBONIC",
    description:
      "Digital backbone for future mobility products — telemetry pipelines, fleet-facing tools, and AI-assisted workflows connecting hardware, operations, and customers.",
    coverImage: lightSilhouette,
    images: [lightSilhouette],
  },
  {
    id: "rag-knowledge",
    title: "Enterprise RAG Knowledge",
    category: "AI Systems",
    tags: ["RAG", "KNOWLEDGE"],
    year: "2024",
    client: "Internal",
    description:
      "Retrieval-augmented knowledge assistant over engineering docs, standards, and past decisions — accurate citations, access control, and evaluation on real user questions.",
    coverImage: abstractLayers,
    images: [abstractLayers],
  },
  {
    id: "machine-vision",
    title: "Machine Vision Prototypes",
    category: "R&D",
    tags: ["COMPUTER VISION", "ROBOTICS"],
    year: "2023",
    client: "R&D",
    description:
      "Prototype vision pipelines for inspection and autonomy — from data capture and labeling to model training, edge deployment, and closed-loop evaluation.",
    coverImage: tarotCards,
    images: [tarotCards],
  },
  {
    id: "product-leadership",
    title: "Product & Engineering Leadership",
    category: "Leadership",
    tags: ["LEADERSHIP", "TEAMS"],
    year: "2018–2024",
    client: "Multiple",
    description:
      "Building and leading cross-functional teams across engineering, product, and design — hiring, delivery cadence, and a bias toward shipping useful software over slideware.",
    coverImage: abstractPaint,
    images: [abstractPaint],
  },
  {
    id: "personal-labs",
    title: "UtpalDasLabs",
    category: "Open Source & Experiments",
    tags: ["LABS", "EXPERIMENTS"],
    year: "Ongoing",
    client: "Personal",
    description:
      "A workshop for agentic systems, small models, and mobility-adjacent tinkering. Most repos are private while incubating — expect select open-source releases over time.",
    coverImage: fluidArt,
    images: [fluidArt],
  },
];
