// Content lives in /content/recommendations.json (editable via Pages CMS).
import raw from "../../content/recommendations.json";

export interface Recommendation {
  author: string;
  role: string;
  context: string;
  company: string; // where we worked together (for filtering)
  quote: string;
  featured: boolean;
}

export const recommendations: Recommendation[] = raw.recommendations;

export const featuredRecommendations = recommendations.filter((r) => r.featured);
