import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, ArrowRight, Filter } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHero } from "@/components/site/page-hero";
import { SampleBadge } from "@/components/site/sample-badge";
import {
  AgeDistributionChart,
  CategoryBarsChart,
  ImpactScoresChart,
} from "@/components/charts/survey-charts";
import { getSurveyAggregates } from "@/lib/survey.functions";
import { researchLimitations } from "@/lib/research-content";

export const Route = createFileRoute("/findings")({
  head: () => ({
    meta: [
      { title: "Research Findings | Youth Wellbeing Research" },
      {
        name: "description",
        content:
          "Aggregate findings from the anonymous youth survey: perceived health and socio-economic impacts, awareness levels, and demographic summaries.",
      },
      { property: "og:title", content: "Research Findings | Youth Wellbeing Research" },
      {
        property: "og:description",
        content:
          "Aggregate survey analytics: perceived impacts on health, education, work, family, and finances.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: () => getSurveyAggregates(),
  component: FindingsPage,
});

/** Below this many responses, live figures are not shown publicly. */
const MIN_LIVE_RESPONSES = 8;

const AGE_LABELS: Record<string, string> = {
  "18-24": "18–24",
  "25-34": "25–34",
  "35-44": "35–44",
  "45+": "45+",
};

const AWARENESS_LABELS: Record<string, string> = {
  not_aware: "Not aware",
  slightly_aware: "Slightly aware",
  moderately_aware: "Moderately aware",
  very_aware: "Very aware",
};

const EFFECT_LABELS: Record<string, string> = {
  school_dropout: "School dropout",
  job_loss: "Job loss",
  family_conflict: "Family conflict",
  debt: "Household debt",
  crime_safety: "Community safety concerns",
  stigma: "Stigma and isolation",
  mental_health: "Mental health decline",
  physical_health: "Physical health decline",
};

const SAMPLE_MEAN_SCORES: Record<string, number> = {
  health_impact_mental: 4.3,
  health_impact_physical: 4.1,
  socioeconomic_education: 3.9,
  socioeconomic_finance: 3.7,
  socioeconomic_employment: 3.6,
  socioeconomic_family: 3.4,
};

const SAMPLE_AGE: Record<string, number> = {
  "18-24": 46,
  "25-34": 32,
  "35-44": 14,
  "45+": 8,
};

const SAMPLE_AWARENESS: Record<string, number> = {
  very_aware: 41,
  moderately_aware: 35,
  slightly_aware: 18,
  not_aware: 6,
};

const SAMPLE_EFFECTS: Record<string, number> = {
  mental_health: 62,
  family_conflict: 51,
  physical_health: 47,
  school_dropout: 38,
  job_loss: 33,
  debt: 29,
  stigma: 26,
  crime_safety: 21,
};

type DomainTab = "all" | "health" | "socio";

const DOMAIN_KEYS: Record<DomainTab, string[]> = {
  all: [],
  health: ["health_impact_physical", "health_impact_mental"],
  socio: [
    "socioeconomic_education",
    "socioeconomic_employment",
    "socioeconomic_family",
    "socioeconomic_finance",
  ],
};

const SCORE_LABELS: Record<string, string> = {
  health_impact_physical: "Physical health",
  health_impact_mental: "Mental health",
  socioeconomic_education: "Education",
  socioeconomic_employment: "Employment",
  socioeconomic_family: "Family",
  socioeconomic_finance: "Finances",
};

function FindingsPage() {
  const loaderData = Route.useLoaderData();
  const [domain, setDomain] = useState<DomainTab>("all");

  const live = loaderData.data;
  const isLive = !!live && live.total_responses >= MIN_LIVE_RESPONSES;

  const meanScores = isLive ? (live!.mean_scores ?? {}) : SAMPLE_MEAN_SCORES;
  const ageDist = isLive ? (live!.by_age_range ?? {}) : SAMPLE_AGE;
  const awareness = isLive ? (live!.awareness_distribution ?? {}) : SAMPLE_AWARENESS;
  const effects = isLive ? (live!.observed_effects ?? {}) : SAMPLE_EFFECTS;

  const scoreEntries = Object.entries(meanScores)
    .filter(([key]) => DOMAIN_KEYS[domain].length === 0 || DOMAIN_KEYS[domain].includes(key))
    .map(([key, value]) => ({ label: SCORE_LABELS[key] ?? key, value: Number(value) }))
    .sort((a, b) => b.value - a.value);

  const ageData = Object.entries(ageDist)
    .filter(([key]) => AGE_LABELS[key])
    .map(([key, value]) => ({ label: AGE_LABELS[key] ?? key, value: Number(value) }));

  const awarenessData = Object.entries(awareness)
    .filter(([key]) => AWARENESS_LABELS[key])
    .map(([key, value]) => ({ label: AWARENESS_LABELS[key] ?? key, value: Number(value) }));

  const effectData = Object.entries(effects)
    .filter(([key]) => EFFECT_LABELS[key])
    .map(([key, value]) => ({ label: EFFECT_LABELS[key], value: Number(value) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  return (
    <>
      <PageHero
        eyebrow="Research Findings"
        title="What the survey shows"
        intro="Aggregate results from anonymous community responses. Only combined statistics are published — individual submissions are never shown."
      >
        {!isLive ? (
          <SampleBadge label="Sample data — until verified responses reach the reporting threshold" />
        ) : (
          <p className="text-sm font-medium text-teal">
            Live aggregate data · {live!.total_responses} anonymous responses
          </p>
        )}
      </PageHero>

      {loaderData.error && !live ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Card className="rounded-2xl border-destructive/30 shadow-sm">
            <CardContent className="flex items-start gap-3 p-6">
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">{loaderData.error}</p>
            </CardContent>
          </Card>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
            <Filter className="size-5 text-teal-deep" aria-hidden="true" />
            Perceived impact by life domain
          </h2>
          <Tabs value={domain} onValueChange={(v) => setDomain(v as DomainTab)}>
            <TabsList>
              <TabsTrigger value="all">All domains</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
              <TabsTrigger value="socio">Socio-economic</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Card className="mt-6 rounded-2xl border-border/60 shadow-sm">
          <CardContent className="p-6">
            {scoreEntries.length > 0 ? (
              <ImpactScoresChart data={scoreEntries} />
            ) : (
              <p className="py-12 text-center text-sm text-muted-foreground">
                No impact data in this category yet.
              </p>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              Mean perceived impact, 1 = no impact · 5 = severe impact.
            </p>
          </CardContent>
        </Card>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-display text-lg font-semibold">Respondents by age group</h3>
              {ageData.length > 0 ? (
                <AgeDistributionChart data={ageData} />
              ) : (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  No demographic data yet.
                </p>
              )}
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-display text-lg font-semibold">Awareness of substance abuse effects</h3>
              {awarenessData.length > 0 ? (
                <CategoryBarsChart data={awarenessData} />
              ) : (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  No awareness data yet.
                </p>
              )}
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-border/60 shadow-sm lg:col-span-2">
            <CardContent className="p-6">
              <h3 className="font-display text-lg font-semibold">Most reported observed effects</h3>
              {effectData.length > 0 ? (
                <>
                  <ul className="mt-4 space-y-3">
                    {effectData.map((effect) => {
                      const max = effectData[0]?.value || 1;
                      return (
                        <li key={effect.label} className="flex items-center gap-3">
                          <span className="w-56 shrink-0 text-sm font-medium text-foreground">
                            {effect.label}
                          </span>
                          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-teal transition-all"
                              style={{ width: `${Math.round((effect.value / max) * 100)}%` }}
                            />
                          </div>
                          <span className="w-16 text-right text-sm text-muted-foreground">
                            {effect.value} resp.
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Share of respondents who reported observing this effect.
                  </p>
                </>
              ) : (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  No observed-effect data yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-secondary/50 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold">How to read these findings</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              These are perception data from an anonymous, self-selected sample — not
              clinical measurements. They show what respondents in the community observe
              and believe, which is valuable for shaping prevention and support, but
              individual experiences vary widely.
            </p>
            <Button asChild className="mt-6 bg-teal text-teal-foreground hover:bg-teal-deep">
              <Link to="/survey">
                Add your voice — take the survey
                <ArrowRight className="ml-1 size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold">Research limitations</h2>
            <ul className="mt-4 space-y-2.5">
              {researchLimitations.map((l) => (
                <li key={l} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-deep" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
