import { defineMcp } from "@lovable.dev/mcp-js";
import getProfile from "./tools/get-profile";
import listProjects from "./tools/list-projects";
import getProject from "./tools/get-project";
import listCompanies from "./tools/list-companies";
import listRecommendations from "./tools/list-recommendations";

export default defineMcp({
  name: "utpal-das-portfolio",
  title: "Utpal Das — Portfolio",
  version: "0.1.0",
  instructions:
    "Public MCP server for Utpal Das's portfolio. Use these read-only tools to answer questions about his profile, projects, past companies, and recommendations. Start with get_profile for identity/contact, list_projects to browse work, get_project for a full case study, and list_companies / list_recommendations for career context.",
  tools: [getProfile, listProjects, getProject, listCompanies, listRecommendations],
});
