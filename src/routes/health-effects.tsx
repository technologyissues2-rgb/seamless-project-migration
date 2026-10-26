import { Link } from "@tanstack/react-router";
import { ArrowRight, Info } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/site/page-hero";
import { healthEffectsSections } from "@/lib/research-content";

export const Route = createFileRoute("/health-effects")({
  head: () => ({
    meta: [
      { title: "Health Effects | Youth Wellbeing Research" },
      {
        name: "description",
        content:
          "How substance abuse affects young people's physical health, mental wellbeing, addiction risk, education, and access to treatment — explained respectfully and without stigma.",
      },
      { property: "og:title", content: "Health Effects | Youth Wellbeing Research" },
      {
        property: "og:description",
        content:
          "Physical health, mental wellbeing, addiction, and access to treatment — the health-related effects of substance abuse among youths.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HealthEffectsPage,
});

function HealthEffectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Health Effects"
        title="Health-related effects of substance abuse"
        intro="Substances affect developing bodies and minds in ways that reach far beyond the moment of use. These effects vary between individuals and circumstances — they are not a verdict on any person."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {healthEffectsSections.map((section) => (
            <Card key={section.title} className="rounded-2xl border-border/60 shadow-sm">
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {section.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {section.body}
                </p>
                <ul className="mt-4 space-y-2">
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm leading-relaxed text-foreground/85">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-teal/30 bg-teal-soft/50 p-5">
          <Info className="mt-0.5 size-5 shrink-0 text-teal-deep" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-foreground/90">
            This page is for research and education only — it is not medical advice, and
            it cannot diagnose anything. If you are worried about your own or someone
            else's substance use, speak to a qualified health worker, or visit our{" "}
            <Link to="/resources" className="font-semibold text-teal-deep underline underline-offset-4">
              support resources
            </Link>
            .
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-secondary/60 p-8">
          <div>
            <h2 className="font-display text-2xl font-semibold">Share your perspective</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The anonymous survey asks how these effects show up in your community.
            </p>
          </div>
          <Button asChild className="bg-teal text-teal-foreground hover:bg-teal-deep">
            <Link to="/survey">
              Take the Survey
              <ArrowRight className="ml-1 size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
