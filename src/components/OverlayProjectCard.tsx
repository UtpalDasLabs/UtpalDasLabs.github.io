import { Link } from "react-router-dom";
import type { Project } from "@/data/projects";
import { CoverMedia } from "@/components/CoverMedia";
import { TypographicCover } from "@/components/TypographicCover";

interface OverlayProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function OverlayProjectCard({ project, index, featured }: OverlayProjectCardProps) {
  return (
    <Link
      to={`/work/${project.id}`}
      data-cursor-label="View"
      aria-label={`${project.title} — case study`}
      className={`group relative block overflow-hidden border border-separator transition-colors duration-300 hover:border-accent animate-fade-in-up aspect-[4/3] ${
        featured ? "md:col-span-2 md:aspect-[21/9]" : "md:aspect-[16/10]"
      }`}
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
    >
      {/* Media fills the card */}
      <div className="absolute inset-0">
        {project.coverVideo ? (
          <CoverMedia
            project={project}
            className="h-full w-full object-cover object-top opacity-80 transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : project.coverHeadline ? (
          <TypographicCover
            headline={project.coverHeadline}
            caption={project.coverCaption ?? ""}
            className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <img
            src={project.coverImage}
            alt=""
            className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.04]"
            loading={index > 3 ? "lazy" : "eager"}
          />
        )}
      </div>

      {/* Gradient so overlaid text stays legible over any frame */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10" />

      {/* Top row — index + company */}
      <div className="relative z-10 flex items-start justify-between p-4 md:p-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          {pad(index + 1)}
        </span>
        {project.companies[0]?.logo && (
          <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-white/90 p-[3px]">
            <img
              src={project.companies[0].logo}
              alt=""
              className="max-h-full max-w-full object-contain"
            />
          </span>
        )}
      </div>

      {/* Bottom block — title, meta, tags. Description is always visible
          (line-clamped), never hover-gated: touch devices have no hover,
          and gating it there meant most cards showed no substance on mobile. */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          {project.category} · {project.year}
        </p>
        <h3
          className={`font-display font-semibold leading-tight text-foreground transition-colors group-hover:text-accent ${
            featured ? "text-xl md:text-3xl" : "text-base md:text-xl"
          }`}
        >
          {project.title}
        </h3>

        <p
          className={`mt-1.5 text-foreground/80 ${
            featured ? "text-sm md:text-base line-clamp-2 md:line-clamp-3" : "text-xs md:text-sm line-clamp-2"
          }`}
        >
          {project.description}
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {project.tags.slice(0, featured ? 4 : 2).map((tag) => (
            <span
              key={tag}
              className="border border-foreground/25 px-2 py-0.5 text-[9px] uppercase tracking-widest text-foreground/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
