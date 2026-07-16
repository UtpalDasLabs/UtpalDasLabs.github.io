# Incorporate the podcast-style interview into the portfolio

The transcript is a long, chronological "case study interview" that pulls out things a static CV can't — the *why* behind each project, leadership moments, culture-shock lessons, and a personal operating system. Here's what's worth lifting and where it should live.

## 1. A new "Philosophy" strip on the About page

Three pillars the user explicitly named as the foundation of how he operates:

> **Transparency → Trust → Positivity.**
> "These are the three pillars I stand and deliver on."

Plus two signature lines that keep resurfacing:

- **"Problem-obsessed, not solution-obsessed."** — engineer's job is to save cost or save time; every product he ships is measured against those two.
- **"MLP, not MVP — Most Lovable Product."** — from the Cluno era; ship small, but ship something people love, because love = trust.

Placement: short section under the intro on `/about`, before the "Currently" card. Three tiles for the pillars, then a pull-quote for MLP.

## 2. Project stories rewritten as mini case studies

Right now each project card is a thematic blurb. The interview gives us the *actual narrative arc* for the real projects, in chronological order. I'd rewrite the `description` fields in `content/projects.json` (and add a `story` field for the detail page) using this material:

| Project | Story beat to add |
|---|---|
| **Avionics / Cockpit displays (NAL, TCS, Meggitt)** | First job out of college; software that had to fly. Then six months reviewing UK-written code for McCabe complexity — "boring but sharpened my eye for what should be broken down." |
| **Anderson food & pharma sensor** | Solo, one-man-army embedded project (2010). Microcontroller as a mini-router — I²C to display, Wi-Fi to subscribers, RS-232 out. First time owning something end-to-end. |
| **Zeiss Reverse Engineering (TCS → Merz)** | Traveled to Germany at 25 to inherit Prof. Deets' point-cloud-to-surface algorithm; wrote first line of a new CAD system. Later hired 12–25 engineers, then rebuilt the whole thing from scratch when he owned it directly at Merz. **Lesson:** "Judge people by their work, not their words" — from working with Germans. |
| **Zeiss AIBOX (headlight/robot inspection)** | Traveled to Porsche/Daimler; got FANUC-certified; integrated cameras onto robots on production lines. Ran "LAN parties" across geographies to debug — "leading people to solve a problem, and we failed as a team, succeeded as a team." |
| **Zeiss Caligo DMS (laser projection)** | The turning point where he stopped being a software person and became a product person. First time customers exposed pain instead of requirements; empathy → solutioning. |
| **Extend3D** | First time working *with* a startup as effectively their outsourced CTO/CPO. 3D-to-2D projection onto physical objects. |
| **Fraunhofer CT defect detection** | His **first AI project, 2017** — training a neural net on CT voxel data to catch tiny defects in pipes that a human took a week to find. Pre-Transformer. Kicked off the dream of "write English, get code." |
| **Cluno** | Built the entire operating engine of a car-subscription company: partner portal, Schufa checks, billing, insurance, refurb, remarketing, logistics, digital handover, plus iOS + Android customer apps. Coined **MLP over MVP.** Two intertwined journeys — customer lifecycle + vehicle lifecycle — as one business engine. Moved the needle on revenue, CAC, and unit economics. |
| **Cazoo (post-acquisition)** | Cluno acquired by Cazoo; Munich becomes European HQ. Reporting to the Cazoo CPO through the IPO. Built asset financing, first/mid/last-mile vehicle logistics across DE/FR/ES. "Flying a rocket ship while it's being built." |
| **CUBONIC (current) / AI + agents** | Head of Digital Solutions; agentic AI, local LLMs. The future-facing dream he named on tape: **"correctional facilities for bad agents"** — governments building agent-accountability systems. Bold, memorable, and uniquely his. |

## 3. New "Signature quotes" that can pepper the site

Pulled verbatim, ready to use as marquee/pull-quote content:

- "I'm a builder at heart, engineer at heart — but I've learned the art of product management by empathizing."
- "Never do more for less price." *(private, per user's request — do NOT publish)*
- "My adrenaline rush and dopamine boost are directly linked with problem-solving."
- "Flying a rocket ship while it's being built."
- "We failed as a team. We succeeded as a team."
- "I don't trust words. I trust work."
- "Save cost. Save time. That's what an engineer does."

I'd slot 2–3 of these into the existing marquee/footer and one big one under the manifesto on Home.

## 4. A new "Dream" / manifesto note on Home

The **agent-accountability** vision is a genuinely differentiating hook for an AI leader's portfolio. Add a short second-paragraph note under the current manifesto, something like:

> "One day, governments will build correctional facilities for bad agents. I'd like to build them."

Positions him as an AI *thinker*, not just an operator.

## Technical scope

- Edit `content/site.json` — add pillars + a second manifesto line.
- Edit `content/projects.json` — rewrite `description`s and add an optional `story` field for the detail page.
- Update `src/pages/Project.tsx` to render the `story` (multi-paragraph narrative) if present.
- Add a small `Philosophy` section component on `/about`.
- Add 2–3 new quotes to the footer marquee.

**No new dependencies, no schema changes beyond one optional field.** Everything is content + one component.

## What I'd like to confirm before building

1. Publish the **"correctional facilities for bad agents"** vision on the home page, or keep it in About / Currently only?
2. Confirmed private (never publish): the "Never do more for less price" pay story from the Merz head-of-software period.
3. Rewrite the existing thematic project cards into these **real chronological projects** (Zeiss, Extend3D, Cluno, Cazoo, CUBONIC, Fraunhofer)? That's a bigger content shift than just adding stories to the existing thematic ones.
