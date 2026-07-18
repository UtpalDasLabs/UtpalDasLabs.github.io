import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { CinematicBackground } from "@/components/CinematicBackground";
import { HeroVideo } from "@/components/HeroVideo";
import { usePageMeta } from "@/hooks/use-page-meta";

import { siteCopy } from "@/data/site";

const firstName = siteCopy.heroFirstName;
const lastName = siteCopy.heroLastName;

const Index = () => {
  usePageMeta(
    "Utpal Das — Father, Builder, Problem Solver",
    "Utpal Das — Head of Digital Solutions @ CUBONIC, Berlin. AI strategy, local LLMs, and agentic solutions. 18+ years turning emerging tech into real products.",
    "/",
  );

  return (
    <Layout hideFooter noPadding>
      {/* The hero lays out in normal flow (flex column) instead of absolute
          overlays: on phones the name, bio and CTA stack, so text can never
          land on top of other text. From md up the bottom strip splits into
          the original bio-left / CTA-right composition. */}
      <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-background cinematic-grain cinematic-vignette">
        {/* Career-arc footage behind everything */}
        <HeroVideo />

        {/* Top strip — chapter counter left, micro-tagline right */}
        <div className="pointer-events-none relative z-20 flex items-start justify-between px-6 pt-24 md:px-12 md:pt-28">
          <p className="over-video font-mono text-xs tracking-[0.3em] text-foreground/75">
            01 / 03 · INTRO
          </p>
          <p className="over-video hidden text-right font-mono text-xs tracking-[0.3em] text-foreground/75 md:block">
            BERLIN · 2026
          </p>
        </div>

        {/* Kinetic name reveal — centered in the flexible middle */}
        <div className="over-video relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-10">
          <div className="flex flex-col items-center gap-2 md:gap-4">
            {/* First name */}
            <h1 className="text-center font-display text-6xl font-bold leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem]">
              {firstName.split("").map((ch, i) => (
                <span
                  key={`f-${i}`}
                  className="kinetic-letter"
                  style={{ animationDelay: `${0.15 + i * 0.08}s` }}
                >
                  {ch}
                </span>
              ))}
            </h1>

            {/* Tagline mid-strip */}
            <div
              className="kinetic-letter flex items-center gap-3 py-1"
              style={{ animationDelay: "0.7s" }}
            >
              <span className="h-px w-8 bg-accent md:w-14" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/90 md:text-xs">
                {siteCopy.tagline}
              </span>
              <span className="h-px w-8 bg-accent md:w-14" />
            </div>

            {/* Last name */}
            <h1 className="text-center font-display text-6xl font-bold leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem]">
              {lastName.split("").map((ch, i) => (
                <span
                  key={`l-${i}`}
                  className="kinetic-letter text-accent"
                  style={{ animationDelay: `${0.85 + i * 0.08}s` }}
                >
                  {ch}
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* Bottom strip — bio and CTA stack on mobile, split left/right from md up */}
        <div className="relative z-10 flex flex-col gap-8 px-6 pb-10 md:flex-row md:items-end md:justify-between md:px-12 md:pb-14">
          <div
            className="over-video max-w-sm animate-fade-in-up opacity-0"
            style={{ animationDelay: "1.4s", animationFillMode: "forwards" }}
          >
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              {siteCopy.heroRole}
            </p>
            <p className="text-sm leading-relaxed text-foreground/80 md:text-base">
              {siteCopy.heroBio}
            </p>
          </div>

          <div
            className="over-video flex flex-col items-start gap-4 animate-fade-in-up opacity-0 md:items-end"
            style={{ animationDelay: "1.6s", animationFillMode: "forwards" }}
          >
            <Link
              to="/work"
              className="group inline-flex items-center gap-3 border border-accent/60 bg-background/40 px-5 py-3 text-xs uppercase tracking-[0.25em] text-foreground backdrop-blur-sm transition-all duration-300 hover:accent-glow hover:bg-accent/10"
            >
              <span>See the work</span>
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
            <div className="flex items-center gap-2 text-foreground/50">
              <ArrowDown size={14} className="animate-scroll-hint" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                or keep scrolling
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Second panel — pull quote (title-sequence handoff) */}
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
            className="mt-12 inline-flex items-center gap-3 border-b border-accent/60 pb-1 text-sm uppercase tracking-[0.25em] text-foreground transition-colors hover:text-accent"
          >
            Enter the archive
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {/* Third panel — the dream */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden border-t border-separator bg-background px-6 py-24 cinematic-grain cinematic-vignette">
        <CinematicBackground variant="grid" intensity={0.4} />
        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-accent">
            03 / 03 · {siteCopy.dreamLabel}
          </p>
          <blockquote className="font-display text-2xl font-semibold leading-snug tracking-tight md:text-4xl lg:text-5xl">
            <span className="text-foreground/85">{siteCopy.dreamLine}</span>{" "}
            <span className="text-accent">{siteCopy.dreamAccent}</span>
          </blockquote>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The next decade of AI isn't about smarter models. It's about accountable ones —
            good agents, bad agents, and the systems that catch, correct, and release them.
            That's the problem I'm obsessed with.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
