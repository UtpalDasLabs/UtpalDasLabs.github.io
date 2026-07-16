import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { CinematicBackground } from "@/components/CinematicBackground";
import { usePageMeta } from "@/hooks/use-page-meta";

const firstName = "UTPAL";
const lastName = "DAS";

const Index = () => {
  usePageMeta(
    "Utpal Das — Father, Builder, Problem Solver",
    "Utpal Das — Head of Digital Solutions @ CUBONIC, Berlin. AI strategy, local LLMs, and agentic solutions. 18+ years turning emerging tech into real products.",
    "/",
  );

  return (
    <Layout hideFooter noPadding>
      <section className="relative h-screen min-h-[720px] w-full overflow-hidden bg-background cinematic-grain cinematic-vignette">
        {/* Animated background */}
        <CinematicBackground variant="mesh" />

        {/* Chapter counter — top left */}
        <div className="pointer-events-none absolute left-6 top-24 z-20 md:left-12 md:top-28">
          <p className="font-mono text-xs tracking-[0.3em] text-foreground/60">
            01 / 06 · INTRO
          </p>
        </div>

        {/* Micro-tagline — top right */}
        <div className="pointer-events-none absolute right-6 top-24 z-20 hidden md:block md:right-12 md:top-28">
          <p className="text-right font-mono text-xs tracking-[0.3em] text-foreground/60">
            BERLIN · 2026
          </p>
        </div>

        {/* Kinetic name reveal — centered */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
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
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/70 md:text-xs">
                Father · Builder · Problem Solver
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

        {/* Bio — bottom left */}
        <div
          className="absolute bottom-10 left-6 z-10 max-w-xs animate-fade-in-up opacity-0 md:bottom-14 md:left-12 md:max-w-sm"
          style={{ animationDelay: "1.4s", animationFillMode: "forwards" }}
        >
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            Head of Digital Solutions · CUBONIC
          </p>
          <p className="text-sm leading-relaxed text-foreground/80 md:text-base">
            Designing at the seam where humans keep the judgment and models
            keep the toil. 18+ years turning frontier tech into products people
            actually trust.
          </p>
        </div>

        {/* CTA — bottom right */}
        <div
          className="absolute bottom-10 right-6 z-10 flex flex-col items-end gap-4 animate-fade-in-up opacity-0 md:bottom-14 md:right-12"
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
      </section>

      {/* Second panel — pull quote (title-sequence handoff) */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-background px-6 py-24 cinematic-grain">
        <CinematicBackground variant="flow" intensity={0.55} />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-accent">
            02 / 06 · MANIFESTO
          </p>
          <blockquote className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            <span className="text-foreground">Humans keep the judgment.</span>{" "}
            <span className="text-foreground/60">Models keep the toil.</span>{" "}
            <span className="text-foreground">The interface earns trust</span>{" "}
            <span className="text-accent">through delight.</span>
          </blockquote>
          <p className="mt-10 text-sm text-muted-foreground">
            — the working thesis behind everything below.
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
    </Layout>
  );
};

export default Index;
