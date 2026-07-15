import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import {
  positions,
  education,
  skillGroups,
  topEndorsed,
  languages,
  certifications,
  volunteering,
} from "@/data/profile";
import { recommendations } from "@/data/recommendations";
import { usePageMeta } from "@/hooks/use-page-meta";

const taglineWords = ["Father", "Builder", "Problem Solver"];

const About = () => {
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
                <span className="text-foreground">Utpal Das</span> is Head of Digital
                Solutions at <span className="text-foreground">CUBONIC</span> in Berlin,
                leading AI strategy, local LLM deployments, and agentic solutions.
              </p>
              <p>
                18+ years across software engineering, product management, and new
                product introduction — from safety-critical avionics and industrial
                metrology to Europe's largest car marketplace. I focus on turning
                frontier AI into pragmatic systems: private by design, useful in
                production, and aligned with real business outcomes.
              </p>
              <p>
                Interests span future mobility, robotics, machine vision, and the
                intersection of math, physics, and applied ML.
              </p>
            </div>
          </div>

          {/* Experience */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-label mb-6">Experience</h2>
            <div className="space-y-8">
              {positions.map((item) => (
                <div key={`${item.company}-${item.title}`} className="border-t border-separator pt-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1 md:gap-6 mb-2">
                    <h3 className="text-lg md:text-xl text-foreground">
                      {item.title} · <span className="text-muted-foreground">{item.company}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground whitespace-nowrap">
                      {item.start} — {item.end ?? "Present"}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{item.location}</p>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-label mb-6">Skills</h2>
            <div className="space-y-8">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-sm text-muted-foreground mb-3 uppercase tracking-widest">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {group.skills.map((skill) => (
                      <span key={skill} className="text-sm border border-border px-4 py-2">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-sm text-muted-foreground mb-3 uppercase tracking-widest">
                Most endorsed on LinkedIn
              </p>
              <div className="flex flex-wrap gap-3">
                {topEndorsed.map((s) => (
                  <span
                    key={s.name}
                    className="text-sm border border-accent/40 px-4 py-2"
                  >
                    {s.name} <span className="text-accent">×{s.count}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
            <h2 className="text-label mb-6">Education</h2>
            <div className="space-y-8">
              {education.map((item) => (
                <div key={item.school} className="border-t border-separator pt-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1 md:gap-6 mb-2">
                    <h3 className="text-lg md:text-xl text-foreground">{item.school}</h3>
                    <p className="text-sm text-muted-foreground whitespace-nowrap">{item.period}</p>
                  </div>
                  <p className="text-base text-muted-foreground">{item.degree}</p>
                  {item.activities && (
                    <p className="text-sm text-muted-foreground mt-2">{item.activities}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Languages & Certifications */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div>
              <h2 className="text-label mb-6">Languages</h2>
              <ul className="space-y-3">
                {languages.map((lang) => (
                  <li key={lang.name} className="flex justify-between gap-4 border-t border-separator pt-3">
                    <span>{lang.name}</span>
                    <span className="text-sm text-muted-foreground text-right">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-label mb-6">Certifications & Honors</h2>
              <ul className="space-y-3">
                {certifications.map((cert) => (
                  <li key={cert.name} className="border-t border-separator pt-3">
                    <p>{cert.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {cert.authority} · {cert.year}
                    </p>
                  </li>
                ))}
                <li className="border-t border-separator pt-3">
                  <p>Service &amp; Commitment Award</p>
                  <p className="text-sm text-muted-foreground">Tata Consultancy Services · 2011</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Volunteering */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
            <h2 className="text-label mb-6">Volunteering</h2>
            <div className="flex flex-wrap gap-3">
              {volunteering.map((v) => (
                <span key={v.org} className="text-sm border border-border px-4 py-2">
                  {v.org} · {v.cause}
                </span>
              ))}
            </div>
          </div>

          {/* Kind Words teaser */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
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
        </div>
      </section>
    </Layout>
  );
};

export default About;
