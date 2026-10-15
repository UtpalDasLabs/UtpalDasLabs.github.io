import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { usePageMeta } from "@/hooks/use-page-meta";
import { track } from "@/lib/analytics";

// A short standing essay: the agent-accountability thesis, phrased in
// grounded language and labeled as an idea, not a shipped product.
const Note = () => {
  usePageMeta(
    "Where do bad agents go? — Notes — Utpal Das",
    "A working thesis by Utpal Das on agent accountability: scoped permissions, action logs, revocation, and correction paths for AI agents that act on our behalf.",
    "/notes/agent-accountability",
  );

  return (
    <Layout showEchelonFooter>
      <article className="container-wide py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Notes · An idea, not a shipped product
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Where do bad agents go?
          </h1>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Berlin · 2026 · a working thesis, updated as I learn
          </p>

          <div className="mt-12 space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              <span className="text-foreground">
                An agent with real credentials takes real actions.
              </span>{" "}
              It books, buys, emails, deploys, and commits on someone's behalf.
              When ordinary software misbehaves, we know what to do: roll it
              back, patch it, take it offline. An autonomous agent that acts
              for you needs somewhere to go when it gets it wrong — and right
              now, there is no "somewhere".
            </p>
            <p>
              What's missing isn't smarter models. It's the accountability
              plumbing underneath them: a clear scope of what an agent may do,
              a record of what it actually did, a fast way to revoke its
              authority, and a path to correct the damage.
            </p>
            <p>
              I keep calling the end state{" "}
              <span className="text-foreground">
                "correctional facilities for bad agents"
              </span>
              . Less metaphor, more checklist: sandboxed runtimes, permission
              budgets, complete action logs, credential revocation, incident
              review, and re-certification before an agent is released back
              into productive work. Not punishment — correction.
            </p>
            <p>
              If I were building toward it, the first pieces are unglamorous:
              an audit trail every agent action is accountable to, budgets that
              cap what an agent can spend or touch, a kill switch that actually
              works, and a post-incident review that reads like a product
              surface rather than a postmortem nobody reads.
            </p>
            <p>
              That's the problem I'm pointing my next decade at — at work, and
              in public. If you're building in the same space, or you need
              someone who takes agentic systems seriously in production, I'd
              like to hear from you.
            </p>
          </div>

          <div className="mt-14 border-t border-separator pt-8">
            <Link
              to="/contact"
              onClick={() => track("cta_click", { label: "lets_talk", from: "note_agents" })}
              className="inline-flex items-center gap-3 border-b border-accent/60 pb-1 text-sm uppercase tracking-[0.25em] text-foreground transition-colors hover:text-accent"
            >
              Let's talk
              <ArrowUpRight size={14} />
            </Link>
            <Link
              to="/"
              className="mt-6 block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Back to the start
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Note;
