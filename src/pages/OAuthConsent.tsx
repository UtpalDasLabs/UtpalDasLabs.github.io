import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";

// Beta typed wrapper for supabase.auth.oauth
type OAuthClient = { name?: string; redirect_uri?: string };
type AuthorizationDetails = {
  client?: OAuthClient;
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthResult<T> = { data: T | null; error: { message: string } | null };
type OAuthNs = {
  getAuthorizationDetails: (id: string) => Promise<OAuthResult<AuthorizationDetails>>;
  approveAuthorization: (id: string) => Promise<OAuthResult<AuthorizationDetails>>;
  denyAuthorization: (id: string) => Promise<OAuthResult<AuthorizationDetails>>;
};
const oauth = (supabase.auth as unknown as { oauth: OAuthNs }).oauth;

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError("Missing authorization_id");
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/login?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      return setError(error.message);
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      return setError("No redirect returned by the authorization server.");
    }
    window.location.href = target;
  }

  return (
    <Layout>
      <section className="container-wide py-24 md:py-32 min-h-[calc(100vh-200px)] flex items-center">
        <div className="max-w-lg mx-auto w-full space-y-8">
          {error && <p className="text-destructive">Could not load this authorization request: {error}</p>}
          {!error && !details && <p className="text-muted-foreground">Loading…</p>}
          {!error && details && (
            <>
              <div>
                <h1 className="text-display mb-4">
                  Connect {details.client?.name ?? "an app"}
                </h1>
                <p className="text-muted-foreground">
                  This lets {details.client?.name ?? "the client"} use this portfolio's MCP tools while you are signed in.
                </p>
              </div>
              <div className="rounded-lg border border-separator p-4 space-y-2 text-sm">
                <div className="text-muted-foreground">Requested access</div>
                <div>Read your profile, projects, companies, and recommendations via MCP.</div>
                {details.scope && (
                  <div className="text-xs text-muted-foreground pt-2 border-t border-separator">
                    Scopes: <span className="font-mono">{details.scope}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  disabled={busy}
                  onClick={() => decide(true)}
                  className="flex-1 px-6 py-3 rounded-lg bg-foreground text-background font-medium hover:opacity-90 disabled:opacity-50"
                >
                  Approve
                </button>
                <button
                  disabled={busy}
                  onClick={() => decide(false)}
                  className="flex-1 px-6 py-3 rounded-lg border border-separator font-medium hover:bg-muted disabled:opacity-50"
                >
                  Deny
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
