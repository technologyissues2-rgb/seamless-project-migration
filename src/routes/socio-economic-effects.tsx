import { Link } from "@tanstack/react-router";
import { ArrowRight, Info } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/site/page-hero";
import { socioEffectsSections } from "@/lib/research-content";

export const Route = createFileRoute("/socio-economic-effects")({
  head: () => ({
    meta: [
      { title: "Socio-Economic Effects | Youth Wellbeing Research" },
      {
        name: "description",
        content:
          "How substance abuse affects family relationships, education, employment, household finances, community safety, and social stigma among young people.",
      },
      {
        property: "og:title",
        content: "Socio-Economic Effects | Youth Wellbeing Research",
      },
      {
        property: "og:description",
        content:
          "Family, education, employment, finances, community safety, and stigma — the wider effects of substance abuse on young lives.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SocioEffectsPage,
});

function SocioEffectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Socio-Economic Effects"
        title="Socio-economic effects of substance abuse"
        intro="The costs of substance abuse are not only medical. They ripple through classrooms, households, workplaces, and whole communities — and they vary between individuals and circumstances."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {socioEffectsSections.map((section) => (
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
            Socio-economic effects interact with health effects: lost schooling lowers
            earnings, financial stress strains health and families, and stigma blocks
            help-seeking. Support that addresses both together works best — see our{" "}
            <Link to="/resources" className="font-semibold text-teal-deep underline underline-offset-4">
              prevention and support resources
            </Link>
            .
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-secondary/60 p-8">
          <div>
            <h2 className="font-display text-2xl font-semibold">Help build the evidence</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Anonymous responses on education, work, family, and finances shape this study.
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
