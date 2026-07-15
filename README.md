# dasutpal — Portfolio of Utpal Das

Personal portfolio site for **Utpal Das** — Head of Digital Solutions at CUBONIC, Berlin.
18+ years across digital platforms, marketplaces, connected products, and product strategy.

**Live:** https://utpaldaslabs.github.io/dasutpal/

## Content

All career data (positions, projects, skills, recommendations, education) is sourced
from the public LinkedIn profile and lives as typed data in:

- `src/data/profile.ts` — positions, education, skills, languages, certifications
- `src/data/recommendations.ts` — LinkedIn recommendations (featured + full set)
- `src/data/projects.ts` — project case studies, 2005–present

Project covers are hand-built abstract SVGs themed per domain (AI systems,
mobility & marketplaces, industrial & vision, avionics & embedded, leadership)
in `src/assets/covers/`.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- React Router (SPA with GitHub Pages 404 fallback)

## Development

```sh
npm install
npm run dev        # http://localhost:8080
npm run build      # production build to dist/
```

## Deployment

Pushes to `main` deploy automatically to GitHub Pages via
`.github/workflows/deploy.yml`. The production build uses base path `/dasutpal/`.

---

Originally scaffolded with Lovable; finished with Claude Code.
