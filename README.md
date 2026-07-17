# dasutpal — Portfolio of Utpal Das

Personal portfolio site for **Utpal Das** — Head of Digital Solutions at CUBONIC, Berlin.
18+ years across digital platforms, marketplaces, connected products, and product strategy.

**Live:** https://utpaldaslabs.github.io/

## Editing content (no code)

Content is managed with [Pages CMS](https://pagescms.org) — sign in with GitHub at
**https://app.pagescms.org**, pick this repo, and edit through forms. Every save
commits here and redeploys automatically (~2 min).

Editable collections (`.pages.yml` defines the forms):

| Collection | File | What's in it |
|---|---|---|
| Site & Hero Copy | `content/site.json` | Hero name, tagline, bio, manifesto, contact details |
| Projects | `content/projects.json` | Case studies — title, description, tags, cover image/video |
| Recommendations | `content/recommendations.json` | LinkedIn recommendations shown on Kind Words |
| Profile | `content/profile.json` | Positions, skills, education, languages, certifications |
| Companies | `content/companies.json` | Company names, logos and links referenced by projects |

Media (covers, logos, videos) lives in `public/` and can be uploaded through the CMS.

The `src/data/*.ts` modules are thin typed loaders over those JSON files — components
never read JSON directly, so types stay enforced at build time.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- Lenis smooth scroll, custom cursor + blueprint reveal layer, canvas backgrounds
- React Router (SPA with GitHub Pages 404 fallback)

## Development

```sh
npm install
npm run dev        # http://localhost:8080
npm run build      # production build to dist/
```

## Deployment

Pushes to `main` deploy automatically to GitHub Pages via
`.github/workflows/deploy.yml`, served at the root user site.

---

Originally scaffolded with Lovable; finished with Claude Code.
