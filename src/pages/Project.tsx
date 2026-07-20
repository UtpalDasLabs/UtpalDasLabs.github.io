import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { projects, type Domain } from "@/data/projects";
import { CoverMedia } from "@/components/CoverMedia";
import { CinematicBackground } from "@/components/CinematicBackground";
import { usePageMeta } from "@/hooks/use-page-meta";

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

      {/* Project Info — navigation lands here (see ScrollManager) so readers
          start on the content and can scroll up to the hero if they want. */}
      <section id="project-content" className="container-wide py-16 md:py-24">
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
            <div>
              <p className="text-label mb-2">Year</p>
              <p>{project.year}</p>
            </div>
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
            <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            {/* Live-app CTA — only for projects with a usable public link */}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
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
