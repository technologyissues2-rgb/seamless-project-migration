import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, FileText, Lock, RefreshCcw, ShieldCheck, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/site/page-hero";
import { researchLimitations } from "@/lib/research-content";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy & Research Ethics | Youth Wellbeing Research" },
      {
        name: "description",
        content:
          "Privacy policy, consent information, data retention, and research limitations for the anonymous youth substance-abuse survey.",
      },
      { property: "og:title", content: "Privacy & Research Ethics | Youth Wellbeing Research" },
      {
        property: "og:description",
        content:
          "What we collect, what we never collect, how long we keep it, and your rights as a survey participant.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

const NEVER_COLLECTED = [
  "Names or nicknames",
  "Email addresses or phone numbers",
  "Home addresses or exact locations",
  "IP addresses or device fingerprints",
  "Any information about identifiable illegal activity",
];

const COLLECTED = [
  "Your chosen age range (18–24, 25–34, 35–44, 45+)",
  "Optional, broad demographic categories (gender, education, employment)",
  "Your anonymous answers about awareness and perceived effects",
  "Optional suggestions for supporting young people",
];

function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy & Ethics"
        title="Privacy policy and research ethics"
        intro="This survey is anonymous and voluntary. This page explains exactly what we collect, what we never collect, how long we keep it, and the ethical rules the study follows."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-2xl border-teal/30 bg-teal-soft/40 shadow-sm">
            <CardContent className="p-6">
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
                <CheckCircle2 className="size-5 text-teal-deep" aria-hidden="true" />
                What we collect
              </h2>
              <ul className="mt-4 space-y-2">
                {COLLECTED.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground/85">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-deep" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Sensitive questions are optional and default to "prefer not to say". You
                may skip anything you are not comfortable answering.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardContent className="p-6">
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
                <XCircle className="size-5 text-destructive" aria-hidden="true" />
                What we never collect
              </h2>
              <ul className="mt-4 space-y-2">
                {NEVER_COLLECTED.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-destructive" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                To prevent duplicate submissions we store a random, non-identifying token
                in your browser only — it cannot be linked back to you.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardContent className="p-6">
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
                <RefreshCcw className="size-5 text-teal-deep" aria-hidden="true" />
                Consent, withdrawal, and retention
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <li>
                  Participation is voluntary. You can close the survey at any time before
                  submitting — nothing is saved until you press Submit.
                </li>
                <li>
                  After submission, responses cannot be individually withdrawn because
                  they are anonymous — there is no way to identify which response is
                  yours.
                </li>
                <li>
                  Responses are retained only for the duration of the research programme
                  and are analysed in aggregate. Only authorised research administrators
                  can view individual records, and only for research purposes.
                </li>
                <li>
                  Every participant receives a unique, non-identifying reference code to
                  confirm their submission was recorded.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardContent className="p-6">
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
                <ShieldCheck className="size-5 text-teal-deep" aria-hidden="true" />
                Who can see responses
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <li>
                  Public visitors can never read individual submissions — the database
                  rejects such requests by design.
                </li>
                <li>
                  Authorised administrators access records only after server-side
                  verification of their role, for research analysis and data quality.
                </li>
                <li>
                  Published findings are aggregate-only statistics.
                </li>
                <li>
                  The platform is for research and education — not medical diagnosis or
                  emergency care.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 rounded-2xl border-border/60 bg-secondary/50 shadow-sm">
          <CardContent className="p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
              <FileText className="size-5 text-teal-deep" aria-hidden="true" />
              Research limitations
            </h2>
            <ul className="mt-4 space-y-2">
              {researchLimitations.map((l) => (
                <li key={l} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-deep" />
                  {l}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-secondary/60 p-8">
          <div>
            <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
              <Lock className="size-5 text-teal-deep" aria-hidden="true" />
              Ready to take part?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The consent screen inside the survey repeats all of this before any question.
            </p>
          </div>
          <Button asChild className="bg-teal text-teal-foreground hover:bg-teal-deep">
            <Link to="/survey">
              Take the Survey
              <ArrowRight className="ml-1 size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Questions about this research? Contact the study team at research@youthwellbeing.example
          (placeholder — replaced by the study's verified address).
        </p>
      </section>
    </>
  );
}
