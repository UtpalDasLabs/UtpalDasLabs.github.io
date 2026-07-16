import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ThumbsUp } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ExperienceJourney } from "@/components/ExperienceJourney";
import { skillGroups, topEndorsed } from "@/data/profile";
import { recommendations } from "@/data/recommendations";
import { usePageMeta } from "@/hooks/use-page-meta";

const taglineWords = ["Father", "Builder", "Problem Solver"];

// The 10 skills a hiring manager should see first; counts fold in LinkedIn endorsements.
const coreSkills = [
  "AI Strategy",
  "Local LLMs",
  "Agentic Systems",
  "Product Strategy",
  "Product Management",
  "Go-to-Market Strategy",
  "Online Marketplaces",
  "Leadership",
  "C++",
  "Python",
];

const endorsementCount = (skill: string) =>
  topEndorsed.find((e) => e.name === skill)?.count;

const remainingSkills = [
  ...new Set([
    ...skillGroups.flatMap((g) => g.skills),
    ...topEndorsed.map((e) => e.name),
  ]),
].filter((s) => !coreSkills.includes(s));

const About = () => {
  const [showAllSkills, setShowAllSkills] = useState(false);
  usePageMeta(
    "About — Utpal Das",
    "Utpal Das — Head of Digital Solutions at CUBONIC, Berlin. 18+ years across product leadership, AI strategy, mobility, industrial vision, and avionics.",
    "/about",
  );

  return (
    <Layout showEchelonFooter>
      <section className="container-wide py-16 md:py-24">
        <div className="max-w-3xl space-y-16">
          {/* Intro */}
          <div>
            <h1 className="text-display mb-4 animate-fade-in-up">About</h1>

            {/* Tagline */}
            <p className="mb-10 font-display text-xl md:text-2xl font-semibold tracking-wide" aria-label="Father, Builder, Problem Solver">
              {taglineWords.map((word, i) => (
                <span key={word}>
                  <span
                    className={`inline-block animate-fade-in-up ${
                      i === taglineWords.length - 1 ? "underline-sweep text-foreground" : "text-foreground/90"
                    }`}
                    style={{ animationDelay: `${0.15 + i * 0.15}s` }}
                  >
                    {word}
                  </span>
                  {i < taglineWords.length - 1 && (
                    <span aria-hidden="true" className="mx-3 text-accent">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </p>

            <div
              className="space-y-6 text-lg md:text-xl leading-relaxed text-muted-foreground animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <p>
                Hi, I'm <span className="text-foreground">Utpal</span> — Head of Digital
                Solutions at <span className="text-foreground">CUBONIC</span> in Berlin,
                where I lead AI strategy, local LLM deployments, and agentic solutions.
              </p>
              <p>
                I've spent 18+ years across software engineering, product management,
                and new product introduction — from safety-critical avionics and
                industrial metrology to Europe's largest car marketplace. These days I
                focus on turning frontier AI into pragmatic systems: private by design,
                useful in production, and aligned with real business outcomes.
              </p>
              <p>
                Outside of work you'll find me chasing future mobility, robotics,
                machine vision, and the intersection of math, physics, and applied ML.
              </p>
            </div>
          </div>

          {/* Experience — the journey */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <ExperienceJourney />
          </div>

          {/* Kind Words teaser — social proof right after the arc */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/kind-words"
              className="group block border border-separator p-8 transition-colors duration-300 hover:border-accent"
            >
              <h2 className="text-label mb-4">Kind Words</h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {recommendations.length} recommendations from CPTOs, CFOs, and product
                leaders I've worked with — Cazoo, Cluno, AutoScout24, TCS.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-accent">
                Read them
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          </div>

          {/* What I work with — one compact strip */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
            <h2 className="text-label mb-2">What I work with</h2>
            <p className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <ThumbsUp size={14} aria-hidden="true" className="text-accent" />
              <span>
                <span className="text-accent">×N</span> = endorsed N times by colleagues on{" "}
                <a
                  href="https://www.linkedin.com/in/iamdasutpal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </span>
            </p>
            <div className="flex flex-wrap gap-3">
              {coreSkills.map((skill) => {
                const count = endorsementCount(skill);
                return (
                  <span key={skill} className="text-sm border border-border px-4 py-2">
                    {skill}
                    {count && <span className="text-accent"> ×{count}</span>}
                  </span>
                );
              })}
              {showAllSkills &&
                remainingSkills.map((skill) => {
                  const count = endorsementCount(skill);
                  return (
                    <span
                      key={skill}
                      className="text-sm border border-border/60 px-4 py-2 text-muted-foreground"
                    >
                      {skill}
                      {count && <span className="text-accent"> ×{count}</span>}
                    </span>
                  );
                })}
              <button
                type="button"
                onClick={() => setShowAllSkills((v) => !v)}
                aria-expanded={showAllSkills}
                className="cursor-pointer text-sm border border-separator px-4 py-2 text-muted-foreground uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
              >
                {showAllSkills ? "Less" : `+ ${remainingSkills.length} more`}
              </button>
            </div>
          </div>

          {/* Background — one compact grid, one line each */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-label mb-6">Background</h2>
            <dl className="grid grid-cols-1 gap-x-12 gap-y-5 text-sm md:grid-cols-2">
              <div className="border-t border-separator pt-4">
                <dt className="mb-1 uppercase tracking-widest text-muted-foreground text-xs">Languages</dt>
                <dd>
                  English, Hindi &amp; Assamese <span className="text-muted-foreground">· native-level</span> — German{" "}
                  <span className="text-muted-foreground">· professional</span> — Japanese{" "}
                  <span className="text-muted-foreground">· basic</span>
                </dd>
              </div>
              <div className="border-t border-separator pt-4">
                <dt className="mb-1 uppercase tracking-widest text-muted-foreground text-xs">Education</dt>
                <dd>
                  B.Tech, Electrical &amp; Electronics — Amrita Vishwa Vidyapeetham{" "}
                  <span className="text-muted-foreground">(2008)</span>
                </dd>
              </div>
              <div className="border-t border-separator pt-4">
                <dt className="mb-1 uppercase tracking-widest text-muted-foreground text-xs">Certifications &amp; Honors</dt>
                <dd>
                  FANUC Robotics <span className="text-muted-foreground">· DMIS CMM (ZEISS Academy)</span> —
                  Microsoft MVP Award <span className="text-muted-foreground">· TCS Service &amp; Commitment Award</span>
                </dd>
              </div>
              <div className="border-t border-separator pt-4">
                <dt className="mb-1 uppercase tracking-widest text-muted-foreground text-xs">Beyond work</dt>
                <dd>
                  Greenpeace <span className="text-muted-foreground">· environment</span> — WWF{" "}
                  <span className="text-muted-foreground">· wildlife</span> — national-level basketball,
                  cricket &amp; hammer throw <span className="text-muted-foreground">· 4× U-19 athletics champion</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
