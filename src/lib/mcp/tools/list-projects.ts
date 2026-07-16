import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import projectsData from "../../../../content/projects.json" with { type: "json" };

type Project = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  year: string;
  companies: string[];
  description: string;
  story?: string[];
  link: string | null;
  coverImage?: string;
  coverVideo?: string | null;
};

const projects = (projectsData as { projects: Project[] }).projects;

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description:
    "List Utpal Das's portfolio projects. Optionally filter by category, tag, or company. Returns summaries — use get_project for full case-study stories.",
  inputSchema: {
    category: z.string().optional().describe("Filter by category (e.g. 'AI Systems', 'Mobility & Marketplaces')."),
    tag: z.string().optional().describe("Filter by a tag (case-insensitive)."),
    company: z.string().optional().describe("Filter by a company id (e.g. 'cubonic', 'autoscout24', 'cluno')."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, tag, company }) => {
    let items = projects;
    if (category) items = items.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    if (tag) items = items.filter((p) => p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
    if (company) items = items.filter((p) => p.companies.includes(company));
    const summaries = items.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      year: p.year,
      companies: p.companies,
      tags: p.tags,
      description: p.description,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(summaries, null, 2) }],
      structuredContent: { count: summaries.length, projects: summaries },
    };
  },
});
