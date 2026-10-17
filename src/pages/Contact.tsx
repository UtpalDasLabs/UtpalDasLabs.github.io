import { Layout } from "@/components/Layout";
import { Mail, Linkedin, Github } from "lucide-react";
import { socialIcon } from "@/components/SocialIcons";
import { siteCopy } from "@/data/site";
import { usePageMeta } from "@/hooks/use-page-meta";
import { track } from "@/lib/analytics";

const contactCover = "/covers/ai-b.svg";

const iconClass = "text-muted-foreground group-hover:text-accent transition-colors shrink-0";

const Contact = () => {
  usePageMeta(
    "Contact — Utpal Das",
    "Get in touch with Utpal Das — AI strategy, local LLMs, agentic systems. Based in Berlin, Germany.",
    "/contact",
  );
  return (
    <Layout showEchelonFooter>
      <section className="container-wide py-16 md:py-24 min-h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-12">
            <div>
              <h1 className="mb-6 animate-fade-in-up font-display text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-6xl lg:text-7xl">
                Let's build<br />something.
              </h1>
              <p className="text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Interested in AI strategy, local LLMs, or agentic systems? Let's talk.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <a
                href={`mailto:${siteCopy.contactEmail}`}
                onClick={() => track("contact_intent", { method: "email", from: "contact" })}
                className="flex items-center gap-4 text-lg hover-highlight group"
              >
                <Mail size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                <span>{siteCopy.contactEmail}</span>
              </a>

              <a
                href={siteCopy.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("contact_intent", { method: "linkedin", from: "contact" })}
                className="flex items-center gap-4 text-lg hover-highlight group"
              >
                <Linkedin size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                <span>linkedin.com/in/iamdasutpal</span>
              </a>

              <a
                href={siteCopy.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("outbound_click", { dest: "github", from: "contact" })}
                className="flex items-center gap-4 text-lg hover-highlight group"
              >
                <Github size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                <span>github.com/UtpalDasLabs</span>
              </a>

              {siteCopy.socials?.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("outbound_click", { dest: s.name.toLowerCase(), from: "contact" })}
                  className="flex items-center gap-4 text-lg hover-highlight group"
                >
                  {socialIcon(s.name, 20, iconClass)}
                  <span>{s.label}</span>
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <p className="text-label mb-2">Based in</p>
              <p className="text-lg">{siteCopy.location}</p>
            </div>

            {/* Perks */}
            {siteCopy.perks && siteCopy.perks.length > 0 && (
              <div className="animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
                <p className="text-label mb-3">Perks</p>
                <div className="space-y-4">
                  {siteCopy.perks.map((p) => (
                    <a
                      key={p.name}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track("outbound_click", { dest: p.name.toLowerCase(), from: "contact_perks" })}
                      className="block group"
                    >
                      <span className="text-lg hover-highlight">{p.label}</span>
                      <span className="mt-1 block max-w-md text-sm text-muted-foreground">
                        {p.description}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Image */}
          <div className="hidden lg:block">
            <div className="aspect-[4/5] bg-secondary overflow-hidden">
              <img
                src={contactCover}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
