import { Layout } from "@/components/Layout";
import { Mail, Linkedin, Github } from "lucide-react";
import contactCover from "@/assets/covers/ai-b.svg";
import { usePageMeta } from "@/hooks/use-page-meta";

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
              <h1 className="text-display mb-6 animate-fade-in-up">
                Let's build<br />something.
              </h1>
              <p className="text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Interested in AI strategy, local LLMs, or agentic systems? Let's talk.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <a
                href="mailto:utpal.inbox@hotmail.com"
                className="flex items-center gap-4 text-lg hover-highlight group"
              >
                <Mail size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                <span>utpal.inbox@hotmail.com</span>
              </a>

              <a
                href="https://www.linkedin.com/in/iamdasutpal/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-lg hover-highlight group"
              >
                <Linkedin size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                <span>linkedin.com/in/iamdasutpal</span>
              </a>

              <a
                href="https://github.com/UtpalDasLabs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-lg hover-highlight group"
              >
                <Github size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                <span>github.com/UtpalDasLabs</span>
              </a>
            </div>

            {/* Location */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <p className="text-label mb-2">Based in</p>
              <p className="text-lg">Berlin, Germany</p>
            </div>
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
