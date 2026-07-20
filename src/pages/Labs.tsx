import { ArrowUpRight, Github } from "lucide-react";
import { Layout } from "@/components/Layout";
import { CinematicBackground } from "@/components/CinematicBackground";
import { labsIntro, labsTools, type LabsTool } from "@/data/labs";
import { usePageMeta } from "@/hooks/use-page-meta";

const gridPanelStyle = {
  backgroundImage:
    "linear-gradient(hsl(var(--accent) / 0.14) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent) / 0.14) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

function ToolCard({ tool }: { tool: LabsTool }) {
  const live = tool.status === "live" && !!tool.url;
  return (
    <article className="group grid grid-cols-1 overflow-hidden border border-separator transition-colors duration-300 hover:border-accent lg:grid-cols-[1.05fr_1fr]">
      {/* Cover panel — bold headline on an engineering grid */}
      <div
        className="flex min-h-[220px] flex-col justify-center gap-3 bg-[#0a0a0a] px-6 py-10 md:px-8"
        style={gridPanelStyle}
      >
        <p className="font-display text-3xl font-bold leading-none tracking-tight text-accent md:text-4xl lg:text-5xl">
          {tool.coverHeadline}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
          {tool.coverCaption}
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5 p-6 md:p-8">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] ${
              live ? "text-accent" : "text-muted-foreground"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                live ? "animate-pulse bg-accent" : "bg-muted-foreground"
              }`}
            />
            {live ? "Live" : "In progress"}
          </span>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {tool.name}
          </h2>
          <p className="mt-1 text-base text-foreground/80 md:text-lg">{tool.tagline}</p>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{tool.description}</p>

        <div className="flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="border border-border px-2.5 py-1 text-[10px] uppercase tracking-widest text-foreground/70"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-2">
          {live ? (
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-3 border border-accent/60 bg-accent/10 px-6 py-3 text-sm uppercase tracking-[0.25em] text-foreground transition-all duration-300 hover:accent-glow hover:bg-accent/20"
            >
              <span>Launch {tool.name}</span>
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
              />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Coming soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

const Labs = () => {
  usePageMeta(
    "Labs — Utpal Das",
    "Free, browser-first tools built under UtpalDasLabs — private by design, no sign-up, nothing uploaded. Starting with Retailor, an AI CV tailoring tool.",
    "/labs",
  );

  return (
    <Layout showEchelonFooter>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-separator cinematic-grain">
        <CinematicBackground variant="mesh" intensity={0.4} />
        <div className="container-wide relative z-10 py-16 md:py-24">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {labsIntro.eyebrow}
          </p>
          <h1 className="font-display text-6xl font-bold tracking-tight md:text-8xl lg:text-9xl">
            {labsIntro.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {labsIntro.lead}
          </p>
          <a
            href={labsIntro.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-foreground transition-colors hover:text-accent"
          >
            <Github size={16} aria-hidden="true" />
            <span>UtpalDasLabs on GitHub</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* Tools */}
      <section className="container-wide py-16 md:py-24">
        <div className="flex flex-col gap-6 md:gap-8">
          {labsTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}

          {/* Growth teaser — honest placeholder, no invented tools */}
          <div className="flex flex-col items-start gap-2 border border-dashed border-separator p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              More in the workshop
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              New browser-first tools land here as they're built — same rules every time:
              free to use, private by design, nothing uploaded. Check back, or watch the
              GitHub org for releases.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Labs;
