import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getProfile from "./tools/get-profile";
import listProjects from "./tools/list-projects";
import getProject from "./tools/get-project";
import listCompanies from "./tools/list-companies";
import listRecommendations from "./tools/list-recommendations";

// Managed Supabase OAuth issuer must be the direct supabase.co host (not the
// .lovable.cloud proxy). Built from the project ref at build time.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "utpal-das-portfolio",
  title: "Utpal Das — Portfolio",
  version: "0.2.0",
  instructions:
    "Authenticated MCP server for Utpal Das's portfolio. Sign-in required. Read-only tools: get_profile, list_projects, get_project, list_companies, list_recommendations.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getProfile, listProjects, getProject, listCompanies, listRecommendations],
});
