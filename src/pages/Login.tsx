import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

function safeNext(raw: string | null): string {
  if (!raw) return "/";
  try {
    // Only allow same-origin relative paths.
    if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
    return raw;
  } catch {
    return "/";
  }
}

export default function Login() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const next = safeNext(params.get("next"));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If already signed in, bounce to next.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate(next, { replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate(next, { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, next]);

  async function signIn() {
    setBusy(true);
    setError(null);
    const redirectUri = `${window.location.origin}/login?next=${encodeURIComponent(next)}`;
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: redirectUri });
    if (result.error) {
      setError(result.error.message ?? "Sign-in failed");
      setBusy(false);
    }
  }

  return (
    <Layout>
      <section className="container-wide py-24 md:py-32 min-h-[calc(100vh-200px)] flex items-center">
        <div className="max-w-md mx-auto w-full space-y-8 text-center">
          <div>
            <h1 className="text-display mb-4">Sign in</h1>
            <p className="text-muted-foreground">
              Access to this portfolio's agent tools and private content requires sign-in.
            </p>
          </div>
          <button
            onClick={signIn}
            disabled={busy}
            className="w-full px-6 py-3 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {busy ? "Redirecting…" : "Continue with Google"}
          </button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </section>
    </Layout>
  );
}
