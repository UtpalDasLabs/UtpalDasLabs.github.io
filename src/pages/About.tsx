import { Layout } from "@/components/Layout";

const experience = [
  {
    role: "Head of Digital Solutions",
    company: "CUBONIC",
    period: "Feb 2024 — Present",
    location: "Berlin, Germany",
    summary:
      "Leading digital transformation, AI strategy, local LLM deployments, and agentic solutions across the business.",
  },
  {
    role: "Earlier Roles",
    company: "Engineering · Product · General Management",
    period: "2007 — 2024",
    location: "India · Germany",
    summary:
      "18+ years across software engineering, product leadership, and general management — mobility, e-commerce, and emerging technology.",
  },
];

const skills = [
  "AI Strategy",
  "Local & Private LLMs",
  "Agentic AI",
  "LLM Orchestration",
  "RAG Systems",
  "Digital Transformation",
  "Product Leadership",
  "Engineering Management",
  "Machine Vision",
  "Robotics",
  "Future Mobility",
  "Cloud Architecture",
  "Python",
  "TypeScript",
];

const recommendations = [
  {
    quote:
      "Add a recommendation quote here — paste directly from LinkedIn.",
    author: "Name Surname",
    role: "Title, Company",
  },
  {
    quote:
      "Second recommendation quote goes here. Keep it 2–4 sentences for balance.",
    author: "Name Surname",
    role: "Title, Company",
  },
];

const About = () => {
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
                With 18+ years across engineering, product, and general management,
                I focus on turning frontier AI into pragmatic systems — private by
                design, useful in production, and aligned with real business outcomes.
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
              {experience.map((item) => (
                <div key={item.role} className="border-t border-separator pt-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1 md:gap-6 mb-2">
                    <h3 className="text-lg md:text-xl text-foreground">
                      {item.role} · <span className="text-muted-foreground">{item.company}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground whitespace-nowrap">{item.period}</p>
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
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-sm border border-border px-4 py-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-label mb-6">Recommendations</h2>
            <div className="space-y-8">
              {recommendations.map((rec, i) => (
                <figure key={i} className="border-l-2 border-accent pl-6">
                  <blockquote className="text-lg md:text-xl leading-relaxed text-muted-foreground italic">
                    "{rec.quote}"
                  </blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="text-foreground">{rec.author}</span>
                    <span className="text-muted-foreground"> — {rec.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
