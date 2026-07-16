import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import projectsData from "../../../../content/projects.json" with { type: "json" };

const projects = (projectsData as { projects: Array<{ id: string }> }).projects;

export default defineTool({
  name: "get_project",
  title: "Get project",
  description: "Get the full case study for a project by id, including the narrative story sections.",
  inputSchema: {
    id: z.string().min(1).describe("Project id, e.g. 'autoscout24-apps' or 'agentic-platform'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const project = projects.find((p) => p.id === id);
    if (!project) {
      return {
        content: [{ type: "text", text: `No project found with id '${id}'.` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(project, null, 2) }],
      structuredContent: { project },
    };
  },
});
