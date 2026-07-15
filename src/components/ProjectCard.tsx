import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { CompanyChip } from "@/components/CompanyChip";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article
      className="group flex flex-col border border-separator bg-card transition-all duration-300 hover:border-accent hover:-translate-y-1 animate-fade-in-up"
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
    >
      <Link
        to={`/work/${project.id}`}
        className="flex flex-1 flex-col"
        aria-label={`${project.title} — case study`}
      >
        <div className="aspect-[3/2] overflow-hidden">
          <img
            src={project.coverImage}
            alt={`${project.title} cover artwork`}
            width={600}
            height={400}
            loading={index > 3 ? "lazy" : "eager"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {project.companies.map((c) => (
              <CompanyChip key={c.name} company={c} />
            ))}
          </div>

          <h3 className="font-display text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
            {project.title}
          </h3>

          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3 pt-3">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-separator px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="whitespace-nowrap text-xs uppercase tracking-widest text-muted-foreground">
              {project.year}
            </span>
          </div>
        </div>
      </Link>

      {(project.link || project.companies.some((c) => c.url)) && (
        <div className="flex items-center gap-5 border-t border-separator px-6 py-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
            >
              Visit project <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
          {!project.link && project.companies[0]?.url && (
            <a
              href={project.companies[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
            >
              {project.companies[0].name} <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </article>
  );
}
