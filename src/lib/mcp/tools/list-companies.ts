import { defineTool } from "@lovable.dev/mcp-js";
import companies from "../../../../content/companies.json" with { type: "json" };

export default defineTool({
  name: "list_companies",
  title: "List companies",
  description: "List the companies Utpal has worked with, including role summaries where available.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(companies, null, 2) }],
    structuredContent: companies as Record<string, unknown>,
  }),
});
