import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ProjectCard } from "@/components/ProjectCard";
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

const Work = () => {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  usePageMeta(
    "Projects — Utpal Das",
    "Selected projects by Utpal Das: agentic AI platforms, Europe's largest car marketplace apps, industrial vision, and safety-critical avionics.",
    "/work",
  );

  const visible = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <Layout showEchelonFooter>
      {/* Header */}
      <section className="container-wide pt-16 md:pt-24 pb-10 md:pb-12">
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight">
          Projects
        </h1>
      </section>

      {/* Category Filters */}
      <section className="container-wide pb-10">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
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

      {/* Card Grid */}
      <section className="container-wide pb-24">
        <div key={active} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {visible.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Work;
