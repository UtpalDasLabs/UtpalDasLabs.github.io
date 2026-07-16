## What's great about andrewcunliffe.ai

A quick teardown so we're aligned on what to steal (respectfully):

**1. Signature intro sequence**
- A slow "01 / 04 INTRO" counter with the name unfurling letter-by-letter (`ANDREW … CUNLIFFE`, "Since — 2014" tucked between).
- A single confident line: *"Designer & agent choreographer building interfaces where AI empowers human intelligence."*
- Playful anti-rule copy: *"Above the fold was always a dumb rule."* — invites the scroll.

**2. Cinematic background media (the part you loved)**
- Full-bleed silent looping video / WebGL clips behind hero + between sections.
- Muted color grade, slow motion, grain overlay — feels like a title sequence, not a stock reel.
- Media pins while text scrolls over it (scroll-jacked "chapters").

**3. Numbered case-study chapters**
- Each project is a full-height chapter with a big `01 · 02 · 03` marker, title, one-sentence pitch, and 2–3 device/screen mockups.
- "Confidential preview — sign in to view" gating for NDA work — a clever way to show breadth without leaking.
- Before/After toggle for redesign work (Oddlot, Nexus).

**4. Sidebar "Currently" card**
- Portrait + three lines: role, side project, community thing. Grounds the person.

**5. Micro-personality**
- Pull-quotes in the designer's own voice ("I don't take myself that seriously but admit that sounds cool.").
- Tiny location/date stamp ("Marin County · 2026").

---

## What to incorporate into your site

Mapped to your existing structure (Home / Work / About / Kind Words / Contact):

### A. Cinematic hero — replace the parallax image grid
- Full-viewport silent looping background: your choice of
  - abstract AI/agent visuals (particles, flowing graphs, neural mesh), or
  - Berlin cityscape B-roll, or
  - screen-recording montage of your work (LLMs, dashboards, agents in action).
- Grain + subtle vignette overlay so text stays legible.
- Kinetic name reveal: `UTPAL` … `DAS` with "Since — 2007" (or your start year) between.
- One-liner: *"Head of Digital Solutions. Turning agents into products humans trust."*
- Chapter counter top-left: `01 / 06 · INTRO`.

### B. Scroll-driven chapter structure for /work
- Convert Projects into 6 numbered chapters (Agentic AI, Local LLM Stack, AI Strategy, Mobility, RAG Knowledge, UtpalDasLabs).
- Each chapter: sticky background video/still + overlaid title, pitch, KPIs, mockups.
- Add a **Confidential** variant for CUBONIC internal work: blurred preview + "Request access" button that opens contact.

### C. "Currently" card on About
- Portrait + three chips: `Head of Digital Solutions — CUBONIC`, `Founder — UtpalDasLabs`, `Local LLM & Agent tinkerer`.
- Location/date stamp: `Berlin · 2026`.

### D. Signature quote strip
- One handwritten-style pull-quote per page in your voice (e.g., *"Humans keep the judgment. Models keep the toil."* — adapted to your POV).

### E. Before/After module
- Perfect for CUBONIC digital transformation stories: a slider showing legacy workflow → AI-augmented workflow.

### F. Footer keeps the marquee, add contact CTA
- Big `LET'S BUILD SOMETHING →` block above the `@IAMDASUTPAL` marquee, linking to contact.

---

## Technical approach (for when you say go)

- **Background media:** `<video autoplay muted loop playsinline>` with a poster image fallback + `prefers-reduced-motion` swap to a static frame. If we want fancier: a lightweight Three.js/R3F shader for the hero only.
- **Scroll choreography:** Framer Motion (`useScroll` + sticky sections) — no scroll-jack library needed. Reduced-motion friendly.
- **Chapter counter:** small fixed top-left indicator that updates as sections cross the viewport.
- **Assets to source:** 3–5 short (6–10s) 1080p loops, ~2–4 MB each after compression, or generate them (I can prompt image/video gen when ready).
- **Perf guardrails:** lazy-load videos below the fold, serve `.webm` + `.mp4`, cap total hero payload ≈ 3 MB.

---

## Open questions before I build

1. **Background media flavor** — abstract AI visuals, Berlin/travel B-roll, your own screen recordings, or a mix?
2. **Do we keep the current yellow accent** (`--accent: 66 100% 50%`) or shift to something more cinematic (cold cyan, warm amber)?
3. **Confidential case studies** — do you want the "sign in / request access" gate, or just replace with public thematic write-ups?
4. **Scope for round one** — start with just the Home hero + one numbered chapter as a proof, or overhaul Home + Work together?

Answer these and I'll switch to build mode.