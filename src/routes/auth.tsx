import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, LogIn } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Committee Sign In — Trade Square Society" },
      {
        name: "description",
        content:
          "Secure sign-in for authorised Trade Square Premises Cooperative Society Ltd. committee administrators to manage event listings.",
      },
      { property: "og:title", content: "Committee Sign In — Trade Square Society" },
      {
        property: "og:description",
        content: "Authorised administrators of Trade Square Society sign in here to manage events.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/events" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Signed in");
    navigate({ to: "/admin/events" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-sky px-4 pt-28 pb-16">
      <Reveal>
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-soft">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky text-primary">
            <Lock size={20} />
          </span>
          <h1 className="mt-5 text-2xl font-extrabold">Committee Sign In</h1>
          <span className="gold-rule mt-4 block" />
          <p className="mt-4 text-sm text-muted-foreground">
            Restricted area for authorised Society administrators. Members and visitors do not need
            to sign in.
          </p>

          <form onSubmit={submit} className="mt-7 space-y-4">
            <div>
              <label htmlFor="email" className="text-xs font-bold tracking-widest text-muted-foreground">
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-xs font-bold tracking-widest text-muted-foreground"
              >
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              <LogIn size={16} /> {busy ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </Reveal>
    </div>
  );
}
