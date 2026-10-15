import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { CinematicBackground } from "@/components/CinematicBackground";
import { HeroVideo } from "@/components/HeroVideo";
import { usePageMeta } from "@/hooks/use-page-meta";
import { track } from "@/lib/analytics";

import { siteCopy } from "@/data/site";
import portrait from "@/assets/utpal-portrait.jpg.asset.json";

const Index = () => {
  usePageMeta(
    "Utpal Das — Father, Builder, Problem Solver",
    "Utpal Das — Head of Digital Solutions @ CUBONIC, Berlin. AI strategy, local LLMs, and agentic solutions. 18+ years turning emerging tech into real products.",
    "/",
  );

  return (
    <Layout hideFooter noPadding>
      {/* V4 hero: the name, positioning and both CTAs are visible immediately —
          the moving background stays as garnish and never gates content.
          Animations here are short fades only. */}
      <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-background cinematic-grain cinematic-vignette">
        <HeroVideo />
        {/* Real portrait — right side on desktop, softly blended into the background */}
        <img
          src={portrait.url}
          alt="Utpal Das"
          className="pointer-events-none absolute bottom-0 right-0 z-[5] hidden h-[88%] w-auto object-cover opacity-90 md:block animate-fade-in"
          style={{
            maskImage: "linear-gradient(to left, black 55%, transparent), linear-gradient(to top, transparent, black 25%)",
            WebkitMaskImage: "linear-gradient(to left, black 55%, transparent 100%)",
          }}
        />

        {/* Top strip — chapter counter left, micro-tagline right */}
        <div className="pointer-events-none relative z-20 flex items-start justify-between px-6 pt-24 md:px-12 md:pt-28">
          <p className="over-video font-mono text-xs tracking-[0.3em] text-foreground/75">
            01 / 03 · INTRO
          </p>
          <p className="over-video hidden text-right font-mono text-xs tracking-[0.3em] text-foreground/75 md:block">
            BERLIN · 2026
          </p>
        </div>

        {/* Name + tagline — present in the first paint */}
        <div className="over-video relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
          <p
            className="mb-5 font-mono text-[10px] uppercase tracking-[0.35em] text-accent md:text-xs animate-fade-in"
            style={{ animationDelay: "0.15s" }}
          >
            {siteCopy.heroRole}
          </p>
          <h1
            className="font-display text-7xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-8xl md:text-9xl lg:text-[10rem] animate-fade-in"
            style={{ animationDelay: "0.05s" }}
          >
            Utpal Das
          </h1>
          <div
            className="mt-6 flex items-center gap-3 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <span className="h-px w-8 bg-accent md:w-14" />
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/90 md:text-xs">
              {siteCopy.tagline}
            </span>
            <span className="h-px w-8 bg-accent md:w-14" />
          </div>
        </div>

        {/* Bottom strip — bio, proof line and both CTAs, all immediately
            visible. Stacks on mobile, splits left/right from md up. */}
        <div className="relative z-10 flex flex-col gap-8 px-6 pb-10 md:flex-row md:items-end md:justify-between md:px-12 md:pb-14">
          <div className="over-video max-w-sm">
            <p className="text-sm leading-relaxed text-foreground/85 md:text-base">
              {siteCopy.heroBio}
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">
              18+ years · avionics → machine vision → marketplaces → agentic AI
            </p>
          </div>

          <div className="over-video flex flex-col items-start gap-4 md:items-end">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/work"
                onClick={() => track("cta_click", { label: "explore_selected_work", from: "home_hero" })}
                className="group inline-flex items-center gap-3 border border-accent/60 bg-background/40 px-5 py-3 text-xs uppercase tracking-[0.25em] text-foreground backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-accent/10"
              >
                <span>Explore selected work</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                to="/contact"
                onClick={() => track("cta_click", { label: "lets_talk", from: "home_hero" })}
                className="inline-flex items-center gap-3 border border-foreground/30 px-5 py-3 text-xs uppercase tracking-[0.25em] text-foreground backdrop-blur-sm transition-colors duration-300 hover:border-foreground"
              >
                <span>Let's talk</span>
              </Link>
            </div>
            <div className="flex items-center gap-2 text-foreground/50">
              <ArrowDown size={14} className="animate-scroll-hint" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                or keep scrolling
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Second panel — manifesto */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-background px-6 py-24 cinematic-grain">
        <CinematicBackground variant="flow" intensity={0.55} />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-accent">
            02 / 03 · MANIFESTO
          </p>
          <blockquote className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            <span className="text-foreground">{siteCopy.manifestoLead}</span>{" "}
            <span className="text-foreground/60">{siteCopy.manifestoMiddle}</span>{" "}
            <span className="text-foreground">{siteCopy.manifestoEnd}</span>{" "}
            <span className="text-accent">{siteCopy.manifestoAccent}</span>
          </blockquote>
          <p className="mt-10 text-sm text-muted-foreground">
            {siteCopy.manifestoFootnote}
          </p>
          <Link
            to="/work"
            onClick={() => track("cta_click", { label: "enter_archive", from: "home_manifesto" })}
            className="mt-12 inline-flex items-center gap-3 border-b border-accent/60 pb-1 text-sm uppercase tracking-[0.25em] text-foreground transition-colors hover:text-accent"
          >
            Enter the archive
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {/* Third panel — a note on agent accountability. The full thesis lives
          at /notes/agent-accountability; the homepage only teases it. */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden border-t border-separator bg-background px-6 py-24 cinematic-grain cinematic-vignette">
        <CinematicBackground variant="grid" intensity={0.4} />
        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-accent">
            03 / 03 · NOTES
          </p>
          <blockquote className="font-display text-2xl font-semibold leading-snug tracking-tight md:text-4xl lg:text-5xl">
            <span className="text-foreground/85">{siteCopy.dreamLine}</span>{" "}
            <span className="text-accent">{siteCopy.dreamAccent}</span>
          </blockquote>
          <div className="mt-10 flex flex-col items-start gap-6">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              An agent with real credentials takes real actions. What's missing
              isn't smarter models — it's the accountability plumbing: scoped
              permissions, action logs, revocation, and a way to correct what
              went wrong. I wrote down where I think this goes.
            </p>
            <Link
              to="/notes/agent-accountability"
              onClick={() => track("cta_click", { label: "read_the_note", from: "home_notes" })}
              className="inline-flex items-center gap-3 border-b border-accent/60 pb-1 text-sm uppercase tracking-[0.25em] text-foreground transition-colors hover:text-accent"
            >
              Read the note
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
