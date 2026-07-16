import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { CinematicBackground } from "@/components/CinematicBackground";
import { projects, type Domain } from "@/data/projects";
import { usePageMeta } from "@/hooks/use-page-meta";

const categories: ("All" | Domain)[] = [
  "All",
  "AI Systems",
  "Mobility & Marketplaces",
  "Industrial & Vision",
  "Avionics & Embedded",
  "Leadership",
];

// Cinematic background variant paired to each domain
const bgFor = (cat: Domain): "mesh" | "flow" | "grid" => {
  switch (cat) {
    case "AI Systems":
      return "mesh";
    case "Mobility & Marketplaces":
      return "flow";
    case "Industrial & Vision":
    case "Avionics & Embedded":
      return "grid";
    default:
      return "mesh";
  }
};

const pad = (n: number) => String(n).padStart(2, "0");

const Work = () => {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  usePageMeta(
    "Projects — Utpal Das",
    "Selected projects by Utpal Das: agentic AI platforms, Europe's largest car marketplace apps, industrial vision, and safety-critical avionics.",
    "/work",
  );

  const visible =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <Layout showEchelonFooter>
      {/* Header */}
      <section className="container-wide pt-16 md:pt-24 pb-4">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Archive · {visible.length} chapters
        </p>
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight">
          Projects
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          A running index of the work — from agentic platforms and local LLMs
          today, back through mobility marketplaces, industrial vision, and
          safety-critical avionics.
        </p>
      </section>

      {/* Category Filters */}
      <section className="container-wide pt-6 pb-10">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={`cursor-pointer px-4 py-2 text-xs uppercase tracking-widest border transition-colors duration-200 ${
                active === cat
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-separator text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Numbered chapters */}
      <section key={active} className="pb-24">
        {visible.map((project, i) => (
          <article
            key={project.id}
            className="relative overflow-hidden border-t border-separator cinematic-grain"
          >
            <CinematicBackground
              variant={bgFor(project.category)}
              intensity={0.4}
            />

            <div className="container-wide relative z-10 grid grid-cols-1 gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-24">
              {/* Left column — chapter number + meta */}
              <div className="md:col-span-4 lg:col-span-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
                  Chapter {pad(i + 1)} / {pad(visible.length)}
                </p>
                <p className="mt-4 font-display text-7xl font-bold leading-none text-foreground/90 md:text-8xl lg:text-9xl">
                  {pad(i + 1)}
                </p>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {project.category}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {project.year}
                </p>

                {project.companies.length > 0 && (
                  <ul className="mt-6 space-y-1 text-sm">
                    {project.companies.map((c) => (
                      <li key={c.name} className="text-foreground/80">
                        {c.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Right column — title, description, media */}
              <div className="md:col-span-8 lg:col-span-9">
                <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                  <Link
                    to={`/work/${project.id}`}
                    className="transition-colors hover:text-accent"
                  >
                    {project.title}
                  </Link>
                </h2>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-separator px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <Link
                    to={`/work/${project.id}`}
                    className="group inline-flex items-center gap-2 border-b border-accent/60 pb-1 text-xs uppercase tracking-[0.25em] text-foreground transition-colors hover:text-accent"
                  >
                    Read chapter
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Live link
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>

                {/* Cover media */}
                <div className="mt-10 aspect-[16/9] w-full overflow-hidden border border-separator">
                  <img
                    src={project.coverImage}
                    alt=""
                    className="h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </Layout>
  );
};

export default Work;
