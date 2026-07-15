import { Layout } from "@/components/Layout";

const focusAreas = [
  "CUBONIC — Head of Digital Solutions",
  "Local & Private LLMs",
  "Agentic AI Systems",
  "AI Strategy & Governance",
  "Digital Transformation",
];

const About = () => {
  return (
    <Layout showEchelonFooter>
      <section className="container-wide py-16 md:py-24">
        <div className="max-w-3xl space-y-12">
          {/* Content */}
          <div>
            <h1 className="text-display mb-8 animate-fade-in-up">About</h1>

            <div className="space-y-6 text-lg md:text-xl leading-relaxed text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <p>
                <span className="text-foreground">Utpal Das</span> is Head of Digital Solutions
                at <span className="text-foreground">CUBONIC</span> in Berlin, leading AI strategy,
                local LLM deployments, and agentic solutions for the mobility and
                industrial space.
              </p>
              <p>
                With 18+ years across engineering, product, and general management, I focus on
                turning frontier AI into pragmatic systems — private by design, useful in
                production, and aligned with real business outcomes.
              </p>
              <p>
                Interests span future mobility, robotics, machine vision, and the
                intersection of math, physics, and applied ML.
              </p>
            </div>
          </div>

          {/* Focus */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-label mb-6">Currently</h2>
            <ul className="space-y-3">
              {focusAreas.map((item) => (
                <li key={item} className="text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-label mb-6">Expertise</h2>
            <div className="flex flex-wrap gap-3">
              {["AI Strategy", "Local LLMs", "Agentic AI", "Product Leadership", "Digital Transformation", "Machine Vision", "Robotics"].map((area) => (
                <span
                  key={area}
                  className="text-sm border border-border px-4 py-2"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
