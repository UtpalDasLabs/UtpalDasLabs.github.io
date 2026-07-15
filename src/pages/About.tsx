import { useState } from "react";
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
import { recommendations, featuredRecommendations } from "@/data/recommendations";

const About = () => {
  const [showAllRecs, setShowAllRecs] = useState(false);
  const visibleRecs = showAllRecs ? recommendations : featuredRecommendations;

  return (
    <Layout showEchelonFooter>
      <section className="container-wide py-16 md:py-24">
        <div className="max-w-3xl space-y-16">
          {/* Intro */}
          <div>
            <h1 className="text-display mb-8 animate-fade-in-up">About</h1>

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

          {/* Recommendations */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <h2 className="text-label mb-6">
              Recommendations{" "}
              <span className="text-muted-foreground normal-case tracking-normal">
                — from LinkedIn
              </span>
            </h2>
            <div className="space-y-8">
              {visibleRecs.map((rec) => (
                <figure key={rec.author} className="border-l-2 border-accent pl-6">
                  <blockquote className="text-lg md:text-xl leading-relaxed text-muted-foreground italic">
                    "{rec.quote}"
                  </blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="text-foreground">{rec.author}</span>
                    <span className="text-muted-foreground"> — {rec.role}</span>
                    <span className="block text-muted-foreground mt-1">{rec.context}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowAllRecs((v) => !v)}
              className="mt-10 text-sm uppercase tracking-widest border border-border px-6 py-3 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
            >
              {showAllRecs
                ? "Show featured only"
                : `Show all ${recommendations.length} recommendations`}
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
