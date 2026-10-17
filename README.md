# dasutpal — Portfolio of Utpal Das

Personal portfolio site for **Utpal Das** — Head of Digital Solutions at CUBONIC, Berlin.
18+ years across digital platforms, marketplaces, connected products, and product strategy.

**Live:** https://utpaldas.com/ (the old `utpaldaslabs.github.io` URL redirects there)

## Editing content (no code)

Content is managed with [Pages CMS](https://pagescms.org) — sign in with GitHub at
**https://app.pagescms.org**, pick this repo, and edit through forms. Every save
commits here and redeploys automatically (~2 min).

Editable collections (`.pages.yml` defines the forms):

| Collection | File | What's in it |
|---|---|---|
| Site & Hero Copy | `content/site.json` | Name, tagline, bio, pillars, contact details |
| Homepage (Evidence Engine) | `content/home.json` | Hero, manifesto, AI thesis + blueprint, 4 flagship case studies, 5 Labs tear-downs, endorsements, contact paths |
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
- Instrument Serif / Inter / JetBrains Mono, self-hosted in `public/fonts/` (no Google request)
- React Router, **statically pre-rendered at build time** (`src/entry-server.tsx` + `scripts/prerender.mjs`):
  every public route ships as full HTML and hydrates in the browser. The build fails if the homepage HTML
  is missing the case studies, the blueprint or the Labs tear-downs.
- Native scrolling only; drawers/tabs are keyboard-accessible and respect `prefers-reduced-motion`
- Google Analytics loads only after explicit consent (`src/lib/analytics.ts`)

## Development

```sh
npm install
npm run dev        # http://localhost:8080
npm run build      # content check → typecheck → client build → SSR build → pre-render into dist/
```

## Deployment

`utpaldas.com` is served by Vercel (`vercel.json`): pull requests get preview deployments and
pushes to `main` go live. GitHub Pages (`.github/workflows/deploy.yml`) still builds the old
`utpaldaslabs.github.io` address, which redirects to `utpaldas.com`.

---

Originally scaffolded with Lovable; finished with Claude Code.
