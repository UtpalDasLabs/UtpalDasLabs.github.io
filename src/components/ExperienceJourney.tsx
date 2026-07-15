import { positions, type Position } from "@/data/profile";
import { companies, type Company } from "@/data/projects";
import { useInView } from "@/hooks/use-in-view";

// Map employers to logo chips where we have official assets.
const companyByName: Record<string, Company> = {
  CUBONIC: companies.cubonic,
  HirePlusPlus: companies.hireplusplus,
  AutoScout24: companies.autoscout24,
  Cazoo: companies.cazoo,
  Cluno: companies.cluno,
  "Tata Consultancy Services": companies.tcs,
};

interface Chapter {
  label: string;
  title: string;
  note: string;
  match: (p: Position) => boolean;
}

// The journey reads forward: 2008 → present.
const chapters: Chapter[] = [
  {
    label: "Chapter 01",
    title: "The Engineer",
    note: "India → Germany · C++, CAD kernels, machine vision",
    match: (p) =>
      p.company === "Tata Consultancy Services" ||
      (p.company === "MERZ Group" && p.title === "Engineering Lead"),
  },
  {
    label: "Chapter 02",
    title: "The Product Leader",
    note: "Metrology floors → car subscriptions → Europe's largest car marketplace",
    match: (p) =>
      (p.company === "MERZ Group" && p.title !== "Engineering Lead") ||
      ["Cluno", "Cazoo", "AutoScout24"].includes(p.company),
  },
  {
    label: "Chapter 03",
    title: "The AI Builder",
    note: "Advisory boards, local LLMs, agentic systems",
    match: (p) => ["HirePlusPlus", "CUBONIC"].includes(p.company),
  },
];

function JourneyNode({ position, isCurrent }: { position: Position; isCurrent: boolean }) {
  const { ref, inView } = useInView<HTMLLIElement>();
  const company = companyByName[position.company];

  return (
    <li
      ref={ref}
      className={`relative pl-10 pb-12 transition-all duration-500 ease-out md:pl-14 ${
        inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
      }`}
    >
      {/* Node dot on the route line */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-1.5 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 transition-colors duration-500 ${
          inView ? "border-accent bg-background" : "border-separator bg-background"
        }`}
      >
        {isCurrent && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />}
      </span>

      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-xs tracking-widest text-accent">
            {position.start} — {position.end ?? "PRESENT"}
          </span>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            {position.location}
          </span>
        </div>

        <h3 className="mt-1 text-lg md:text-xl text-foreground">
          {position.title}{" "}
          <span className="text-muted-foreground">
            ·{" "}
            {company?.logo && (
              <span className="mx-1 inline-flex h-5 w-5 translate-y-1 items-center justify-center rounded-sm bg-white/90 p-[2px]">
                <img src={company.logo} alt="" className="max-h-full max-w-full object-contain" />
              </span>
            )}
            {position.company}
          </span>
        </h3>

        <p className="mt-1 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {position.summary}
        </p>
      </div>
    </li>
  );
}

export function ExperienceJourney() {
  const journey = [...positions].reverse(); // 2008 first

  return (
    <div>
      <h2 className="text-label mb-2">The Journey</h2>
      <p className="mb-10 text-sm text-muted-foreground">2008 → present · India → Germany</p>

      <div className="space-y-4">
        {chapters.map((chapter) => {
          const stops = journey.filter(chapter.match);
          if (stops.length === 0) return null;
          return (
            <section key={chapter.title} aria-label={`${chapter.label}: ${chapter.title}`}>
              <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-mono text-xs tracking-widest text-muted-foreground">
                  {chapter.label}
                </span>
                <h3 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                  {chapter.title}
                </h3>
                <span className="text-sm text-muted-foreground">{chapter.note}</span>
              </div>

              {/* Route line */}
              <ol className="relative ml-2 border-l-2 border-separator">
                {/* accent overlay line grows per-node via node dots; keep base subtle */}
                {stops.map((p) => (
                  <JourneyNode
                    key={`${p.company}-${p.title}`}
                    position={p}
                    isCurrent={p.end === null}
                  />
                ))}
              </ol>
            </section>
          );
        })}
      </div>
    </div>
  );
}
