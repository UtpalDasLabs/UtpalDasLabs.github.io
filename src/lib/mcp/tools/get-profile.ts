import { defineTool } from "@lovable.dev/mcp-js";
import profile from "../../../../content/profile.json" with { type: "json" };
import site from "../../../../content/site.json" with { type: "json" };

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description:
    "Get Utpal Das's public profile: name, headline, bio, location, and links (LinkedIn, GitHub, email).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ profile, site }, null, 2) }],
    structuredContent: { profile, site },
  }),
});
