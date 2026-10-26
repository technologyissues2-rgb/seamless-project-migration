import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ExternalLink, LifeBuoy, PhoneCall } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { listPublishedResources } from "@/lib/survey.functions";
import { preventionStrategies } from "@/lib/research-content";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Prevention & Resources | Youth Wellbeing Research" },
      {
        name: "description",
        content:
          "Evidence-based prevention strategies, guidance for young people and families, and verified help resources for substance abuse support.",
      },
      { property: "og:title", content: "Prevention & Resources | Youth Wellbeing Research" },
      {
        property: "og:description",
        content:
          "Prevention strategies, youth support, family guidance, and verified help resources.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: () => listPublishedResources(),
  component: ResourcesPage,
});

const CATEGORY_LABELS: Record<string, string> = {
  prevention: "Prevention",
  treatment: "Treatment",
  education: "Education",
  helpline: "Helpline",
  policy: "Policy",
  other: "Other",
};

function ResourcesPage() {
  const loaderData = Route.useLoaderData();
  const resources = loaderData.data ?? [];

  return (
    <>
      <PageHero
        eyebrow="Prevention & Resources"
        title="Prevention, support, and verified help"
        intro="Substance abuse is preventable and treatable. This page collects evidence-based prevention approaches and verified resources for young people, families, and communities."
      />

      {/* Emergency note */}
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
          <PhoneCall className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-foreground/90">
            <strong>In an emergency</strong> — if someone is unconscious, overdosing, or
            in immediate danger — contact your local emergency number right away. This
            website is not an emergency service.
          </p>
        </div>
      </section>

      {/* Prevention strategies */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6" aria-labelledby="prevention-heading">
        <h2 id="prevention-heading" className="font-display text-2xl font-semibold">
          Prevention strategies that work
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Based on international standards from the WHO and UNODC, effective prevention
          starts early, involves families and schools, and avoids fear-and-shame tactics.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {preventionStrategies.map((section) => (
            <Card key={section.title} className="rounded-2xl border-border/60 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {section.title}
                </h3>
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
      </section>

      {/* Verified resources directory */}
      <section className="bg-secondary/50 py-14" aria-labelledby="directory-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="directory-heading" className="flex items-center gap-2 font-display text-2xl font-semibold">
            <LifeBuoy className="size-6 text-teal-deep" aria-hidden="true" />
            Verified resources directory
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Resources listed here are reviewed and published by the research team. Every
            entry links to its verified source organisation.
          </p>

          {loaderData.error ? (
            <p className="mt-8 rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-muted-foreground">
              {loaderData.error}
            </p>
          ) : resources.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
              <BookOpen className="mx-auto size-8 text-muted-foreground/60" aria-hidden="true" />
              <h3 className="mt-3 font-display text-lg font-semibold">No published resources yet</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                The research team is reviewing the first batch of verified resources.
                Until then, the prevention strategies above reflect published
                international guidance.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource) => (
                <Card key={resource.id} className="flex flex-col rounded-2xl border-border/60 shadow-sm">
                  <CardContent className="flex flex-1 flex-col p-6">
                    <Badge variant="secondary" className="w-fit">
                      {CATEGORY_LABELS[resource.category] ?? resource.category}
                    </Badge>
                    <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                      {resource.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {resource.description}
                    </p>
                    <a
                      href={resource.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-deep hover:underline underline-offset-4"
                    >
                      Visit source
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-secondary/60 p-8">
          <div>
            <h2 className="font-display text-2xl font-semibold">Your experience can help others</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Survey responses guide where prevention and support are needed most.
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
