import { defineTool } from "@lovable.dev/mcp-js";
import recommendations from "../../../../content/recommendations.json" with { type: "json" };

export default defineTool({
  name: "list_recommendations",
  title: "List recommendations",
  description: "List public recommendations and endorsements for Utpal Das.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(recommendations, null, 2) }],
    structuredContent: recommendations as Record<string, unknown>,
  }),
});
