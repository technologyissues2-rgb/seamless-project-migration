import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, LogIn, ShieldCheck, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { adminCheck } from "@/lib/admin.functions";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Researcher Sign In | Youth Wellbeing Research" },
      {
        name: "description",
        content:
          "Sign-in area for the research team. Survey participants do not need an account — the public survey is completely anonymous.",
      },
      { property: "og:title", content: "Researcher Sign In | Youth Wellbeing Research" },
      {
        property: "og:description",
        content: "Sign-in area for the research team. The public survey needs no account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function afterSignIn() {
    const result = await adminCheck();
    if (result.isAdmin) {
      toast.success("Welcome back");
      await navigate({ to: "/admin" });
    } else {
      setNotice(
        "You are signed in, but this account does not have researcher access. Ask the study lead to grant administrator access.",
      );
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setNotice(null);

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) {
        setNotice(error.message);
        return;
      }
      await afterSignIn();
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setBusy(false);
      if (error) {
        setNotice(error.message);
        return;
      }
      setNotice(
        "Account created. Check your inbox for a confirmation link, then sign in here — access is granted only after the study lead approves the account.",
      );
    }
  }

  return (
    <section className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
      <Card className="rounded-2xl border-border/60 shadow-sm">
        <CardContent className="p-8">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-teal text-teal-foreground shadow-sm">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h1 className="font-display text-xl font-semibold text-foreground">
                {mode === "signin" ? "Researcher sign in" : "Create a researcher account"}
              </h1>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Youth Wellbeing Research
              </p>
            </div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.org"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "signin" ? "Your password" : "At least 8 characters"}
              />
            </div>
            <Button
              type="submit"
              disabled={busy}
              className="w-full bg-teal text-teal-foreground hover:bg-teal-deep"
            >
              {busy ? (
                <Loader2 className="mr-1 size-4 animate-spin" aria-hidden="true" />
              ) : mode === "signin" ? (
                <LogIn className="mr-1 size-4" aria-hidden="true" />
              ) : (
                <UserPlus className="mr-1 size-4" aria-hidden="true" />
              )}
              {mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            {mode === "signin" ? "New to the team? " : "Already have an account? "}
            <button
              type="button"
              className="font-semibold text-teal-deep underline underline-offset-4"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setNotice(null);
              }}
            >
              {mode === "signin" ? "Create an account" : "Sign in instead"}
            </button>
          </p>

          {notice ? (
            <p className="mt-4 rounded-lg border border-teal/40 bg-teal-soft/50 px-4 py-3 text-sm leading-relaxed text-foreground/90">
              {notice}
            </p>
          ) : null}
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Survey participants don't need an account — the{" "}
        <Link to="/survey" className="font-semibold text-teal-deep underline underline-offset-4">
          public survey
        </Link>{" "}
        is anonymous.
      </p>
    </section>
  );
}
