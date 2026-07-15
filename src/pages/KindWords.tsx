import { useState } from "react";
import { Layout } from "@/components/Layout";
import { KindWordCard } from "@/components/KindWordCard";
import { recommendations } from "@/data/recommendations";
import { usePageMeta } from "@/hooks/use-page-meta";

const companyFilters = ["All", "Cazoo", "Cluno", "AutoScout24", "TCS"] as const;

const KindWords = () => {
  const [active, setActive] = useState<(typeof companyFilters)[number]>("All");
  usePageMeta(
    "Kind Words — Utpal Das",
    "What CPTOs, CFOs, and product leaders say about working with Utpal Das — 12 LinkedIn recommendations from Cazoo, Cluno, AutoScout24, and TCS.",
    "/kind-words",
  );

  const visible =
    active === "All" ? recommendations : recommendations.filter((r) => r.company === active);
  const companyCount = new Set(recommendations.map((r) => r.company)).size;

  return (
    <Layout showEchelonFooter>
      <section className="container-wide pt-16 md:pt-24 pb-10">
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight animate-fade-in-up">
          Kind Words
        </h1>
        <p
          className="mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          {recommendations.length} recommendations · colleagues and leaders across{" "}
          {companyCount} companies · 2013—2023. All written on LinkedIn, reproduced verbatim.
        </p>
      </section>

      {/* Company Filters */}
      <section className="container-wide pb-10">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter recommendations by company">
          {companyFilters.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={`cursor-pointer px-4 py-2 text-xs uppercase tracking-widest border transition-colors duration-200 ${
                active === c
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-separator text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Quote Wall */}
      <section className="container-wide pb-24">
        <div key={active} className="columns-1 gap-6 md:columns-2 lg:columns-3">
          {visible.map((rec, index) => (
            <KindWordCard key={rec.author} rec={rec} index={index} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default KindWords;
