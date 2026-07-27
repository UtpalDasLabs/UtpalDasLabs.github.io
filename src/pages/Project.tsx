import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { projects, type Domain } from "@/data/projects";
import { recommendations } from "@/data/recommendations";
import { CoverMedia } from "@/components/CoverMedia";
import { CinematicBackground } from "@/components/CinematicBackground";
import { usePageMeta } from "@/hooks/use-page-meta";
import { track } from "@/lib/analytics";

// Same domain-to-variant pairing the Work page used
const bgFor = (cat: Domain): "mesh" | "flow" | "grid" => {
  switch (cat) {
    case "AI Systems":
      return "mesh";
    case "Mobility & Marketplaces":
      return "flow";
    default:
      return "grid";
  }
};

const Project = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  usePageMeta(
    project ? `${project.title} — Utpal Das` : "Projects — Utpal Das",
    project ? project.description.slice(0, 155) : "Projects by Utpal Das.",
    project ? `/work/${project.id}` : "/work",
  );

  useEffect(() => {
    if (project) track("project_view", { id: project.id, category: project.category });
  }, [project]);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  // Some entries store the link without a protocol (e.g. "www.cubonic.de");
  // normalise so the anchor always resolves to an absolute URL.
  const liveUrl = project.link
    ? project.link.startsWith("http")
      ? project.link
      : `https://${project.link}`
    : null;

  const endorsement = project.recommendationRef
    ? recommendations.find((r) => r.author === project.recommendationRef)
    : undefined;

  // A case study leads with the hook; plain projects lead with the info grid.
  const hasHook = Boolean(project.oneLiner || project.metrics?.length);

  return (
    <Layout noPadding headerRevealMode showEchelonFooter>
      {/* Hero — real footage when we have it; otherwise the animated
          domain background instead of a sparse static SVG blown up
          to full screen */}
      {/* Title and meta sit in normal flow (flex column) rather than stacked
          absolute overlays, so a long title can never run into the tag row
          on small screens. */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden cinematic-grain cinematic-vignette">
        {project.coverVideo || project.coverPoster ? (
          <CoverMedia
            project={project}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <CinematicBackground variant={bgFor(project.category)} intensity={0.7} />
        )}
        <div className="absolute inset-0 bg-background/50" />

        {/* Centered Title */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-4 pt-20 md:pt-24">
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-foreground text-center animate-fade-in">
            {project.title}
          </h1>
        </div>

        {/* Bottom Info */}
        <div className="relative z-10 container-wide pb-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            {/* Date */}
            <div className="text-label">
              {project.year}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-end gap-2 md:gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] md:text-xs uppercase tracking-widest px-3 py-1 border border-foreground/30 text-foreground/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Case-study layer 1: the hook ----
          One-line value prop plus the headline numbers, so a hiring manager
          gets the outcome in seconds instead of mining it out of the prose.
          Only renders for projects that carry this data. */}
      {hasHook && (
        <section id="project-content" className="border-b border-separator bg-background">
          <div className="container-wide py-12 md:py-16">
            {project.oneLiner && (
              <p className="max-w-4xl font-display text-2xl font-semibold leading-snug tracking-tight text-foreground md:text-3xl lg:text-4xl">
                {project.oneLiner}
              </p>
            )}
            {!!project.metrics?.length && (
              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:mt-12 md:grid-cols-4 md:gap-8">
                {project.metrics.map((m) => (
                  <div key={m.label} className="border-t-2 border-accent pt-4">
                    <dt className="sr-only">{m.label}</dt>
                    <dd>
                      <span className="block font-display text-4xl font-bold leading-none tracking-tight text-accent md:text-5xl lg:text-6xl">
                        {m.value}
                      </span>
                      <span className="mt-3 block text-sm text-foreground md:text-base">
                        {m.label}
                      </span>
                      {m.note && (
                        <span className="mt-1 block text-xs text-muted-foreground">
                          {m.note}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>
      )}

      {/* Project Info. Carries the scroll anchor only when there's no hook
          above it, so a case study lands on its headline metrics instead of
          scrolling straight past them. */}
      <section
        id={hasHook ? undefined : "project-content"}
        className="container-wide py-16 md:py-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
          {/* Details */}
          <div className="space-y-8">
            <div>
              <p className="text-label mb-2">Client</p>
              <div className="flex flex-col gap-1">
                {project.companies.map((c) =>
                  c.url ? (
                    <a
                      key={c.name}
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover-highlight inline-flex items-center gap-2"
                    >
                      {c.logo && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-white/90 p-[2px]">
                          <img src={c.logo} alt="" className="max-h-full max-w-full object-contain" />
                        </span>
                      )}
                      {c.name}
                    </a>
                  ) : (
                    <span key={c.name}>{c.name}</span>
                  ),
                )}
              </div>
            </div>
            {/* Role first — the thing a hiring manager scans for. */}
            {project.role && (
              <div>
                <p className="text-label mb-2">My role</p>
                <p className="text-foreground">{project.role}</p>
              </div>
            )}
            {project.team && (
              <div>
                <p className="text-label mb-2">Team</p>
                <p>{project.team}</p>
              </div>
            )}
            {project.scale && (
              <div>
                <p className="text-label mb-2">Scale</p>
                <p>{project.scale}</p>
              </div>
            )}
            <div>
              <p className="text-label mb-2">Year</p>
              <p>{project.period ?? project.year}</p>
            </div>
            {!!project.stack?.length && (
              <div>
                <p className="text-label mb-2">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="border border-separator px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p className="text-label mb-2">Categories</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm border border-separator px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description + Story */}
          <div className="md:col-span-2 space-y-8">
            {/* On a full case study the description is redundant — the hero
                one-liner, problem and approach already cover it, and its
                metrics are shown as headline numbers above. It still serves
                the project card on the Projects grid. */}
            {!project.problem && (
              <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            )}

            {/* Live-app CTA — only for projects with a usable public link */}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  track("tool_launch", { tool: project.id, from: "project" });
                  track("outbound_click", { dest: project.id });
                }}
                className="group inline-flex items-center gap-3 border border-accent/60 bg-accent/10 px-6 py-3 text-sm uppercase tracking-[0.25em] text-foreground transition-all duration-300 hover:accent-glow hover:bg-accent/20"
              >
                <span>Launch app</span>
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            )}

            {/* ---- Case-study layer 2: the fast read ----
                Problem → Approach → Outcome, for a founder or customer who
                wants the substance in a minute without the full narrative. */}
            {project.problem && (
              <div>
                <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  The problem
                </h2>
                <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
                  {project.problem}
                </p>
              </div>
            )}

            {!!project.approach?.length && (
              <div>
                <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  What I built
                </h2>
                <ul className="space-y-3">
                  {project.approach.map((item) => (
                    <li key={item} className="flex gap-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.outcome && (
              <div className="border border-separator p-6 md:p-8">
                <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  The outcome
                </h2>
                <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
                  {project.outcome}
                </p>
              </div>
            )}

            {project.story && project.story.length > 0 && (
              <div className="space-y-6 border-l-2 border-accent/60 pl-6 md:pl-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  The story
                </p>
                {project.story.map((paragraph, i) => (
                  <p
                    key={i}
                    className={`leading-relaxed text-foreground/85 ${
                      i === 0 ? "text-lg md:text-xl" : "text-base md:text-lg"
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---- Case-study layer 4: proof ----
          A recommendation from someone who was actually there, shown at the
          moment of interest rather than stranded on the Kind Words page. */}
      {endorsement && (
        <section className="border-t border-separator">
          <div className="container-wide py-16 md:py-20">
            <figure className="mx-auto max-w-4xl">
              <blockquote className="font-display text-xl font-semibold leading-snug tracking-tight text-foreground md:text-2xl lg:text-3xl">
                <span aria-hidden="true" className="text-accent">“</span>
                {endorsement.quote}
                <span aria-hidden="true" className="text-accent">”</span>
              </blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">
                <span className="text-foreground">{endorsement.author}</span>
                {endorsement.role && <> · {endorsement.role}</>}
              </figcaption>
              <Link
                to="/kind-words"
                className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-accent"
              >
                More kind words
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </figure>
          </div>
        </section>
      )}

      {/* Back Link */}
      <section className="container-wide pb-24">
        <Link
          to="/work"
          className="inline-flex items-center gap-3 text-muted-foreground hover-highlight group"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to projects</span>
        </Link>
      </section>
    </Layout>
  );
};

export default Project;
