import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Briefcase,
  CheckCircle2,
  ClipboardList,
  HeartPulse,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SampleBadge } from "@/components/site/sample-badge";
import {
  AgeDistributionChart,
  ImpactScoresChart,
} from "@/components/charts/survey-charts";
import {
  mainObjective,
  problemStatement,
  researchBackground,
  researchQuestions,
  significance,
  specificObjectives,
} from "@/lib/research-content";
import heroImage from "@/assets/hero.jpg";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Youth Wellbeing Research | Socio-Economic & Health Effects of Substance Abuse Among Youths",
      },
      {
        name: "description",
        content:
          "Explore how substance abuse affects the health, education, families, and economic opportunities of young people. Take the anonymous research survey and read the findings.",
      },
      { property: "og:title", content: "Youth Wellbeing Research | Substance Abuse Effects on Youths" },
      {
        property: "og:description",
        content:
          "Understanding the real impact. Building a healthier future. Anonymous research survey, findings, and prevention resources.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FEATURE_CARDS = [
  {
    icon: Activity,
    title: "Health Effects",
    description:
      "Physical health, mental wellbeing, addiction, and long-term risks — what the evidence shows and why it matters.",
    to: "/health-effects",
  },
  {
    icon: Briefcase,
    title: "Socio-Economic Effects",
    description:
      "Education, family relationships, employment, and financial stability — the wider ripple effects on young lives.",
    to: "/socio-economic-effects",
  },
  {
    icon: BarChart3,
    title: "Research Findings",
    description:
      "Survey analytics, interactive charts, and research insights drawn from anonymous community responses.",
    to: "/findings",
  },
  {
    icon: ShieldCheck,
    title: "Prevention & Support",
    description:
      "Prevention strategies, treatment pathways, and verified community resources for young people and families.",
    to: "/resources",
  },
] as const;

const SAMPLE_STATS = [
  { label: "Survey responses collected", value: "1,248", note: "Sample figure" },
  { label: "Mean perceived health impact", value: "4.1 / 5", note: "Sample figure" },
  { label: "Mean perceived socio-economic impact", value: "3.8 / 5", note: "Sample figure" },
  { label: "Youth reached by outreach", value: "3,200+", note: "Sample figure" },
];

const SAMPLE_AGE_DATA = [
  { label: "18–24", value: 46 },
  { label: "25–34", value: 32 },
  { label: "35–44", value: 14 },
  { label: "45+", value: 8 },
];

const SAMPLE_IMPACT_DATA = [
  { label: "Mental health", value: 4.3 },
  { label: "Physical health", value: 4.1 },
  { label: "Education", value: 3.9 },
  { label: "Finances", value: 3.7 },
  { label: "Employment", value: 3.6 },
  { label: "Family", value: 3.4 },
];

function Index() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="A diverse group of young adults in a supportive group discussion"
          className="absolute inset-0 -z-10 size-full object-cover"
          width={1920}
          height={1088}
        />
        <div className="absolute inset-0 -z-10 hero-shade" />
        <div className="mx-auto max-w-6xl px-4 py-24 text-navy-foreground sm:px-6 md:py-32">
          <Badge className="border-none bg-teal/20 text-teal-foreground ring-1 ring-teal/40">
            <ClipboardList className="mr-1 size-3.5" aria-hidden="true" />
            Ongoing research study · Anonymous survey
          </Badge>
          <h1 className="reveal mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.12] sm:text-5xl md:text-[3.4rem]">
            Socio-Economic and{" "}
            <span className="text-teal">Health-Related</span> Effects of Substance
            Abuse Among{" "}
            <span className="text-teal">Youths</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-foreground/85 sm:text-lg">
            Understanding the real impact. Building a healthier future. Explore how
            substance abuse affects the health, education, families, and economic
            opportunities of young people.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-teal text-teal-foreground shadow-lg shadow-teal-deep/30 hover:bg-teal-deep"
            >
              <Link to="/about">
                Explore the Research
                <ArrowRight className="ml-1 size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 text-navy-foreground backdrop-blur hover:bg-white/20 hover:text-navy-foreground"
            >
              <Link to="/survey">Take the Survey</Link>
            </Button>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-navy-foreground/70">
            <Lock className="size-4" aria-hidden="true" />
            Anonymous, voluntary, and confidential — no names, emails, or addresses.
          </p>
        </div>
      </section>

      {/* ============ FEATURE CARDS ============ */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">
          What this platform covers
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_CARDS.map((card) => (
            <Link key={card.title} to={card.to} className="group">
              <Card className="h-full rounded-2xl border-border/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-lg hover:shadow-teal/10">
                <CardContent className="p-6">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-teal-soft text-teal-deep transition-colors group-hover:bg-teal group-hover:text-teal-foreground">
                    <card.icon className="size-5.5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-deep">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ RESEARCH OVERVIEW ============ */}
      <section className="bg-secondary/50 py-20" aria-labelledby="overview-heading">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-deep">
              Research overview
            </p>
            <h2
              id="overview-heading"
              className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground"
            >
              Why this study matters
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {mainObjective}
            </p>
            <Button asChild className="mt-6">
              <Link to="/about">
                Read the full study design
                <ArrowRight className="ml-1 size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="space-y-5">
            {[
              { title: "Background", body: researchBackground },
              { title: "Problem statement", body: problemStatement },
              { title: "Significance of the study", body: significance },
            ].map((block) => (
              <Card key={block.title} className="rounded-2xl border-border/60 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {block.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {block.body}
                  </p>
                </CardContent>
              </Card>
            ))}
            <Card className="rounded-2xl border-teal/30 bg-teal-soft/50 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Research questions
                </h3>
                <ul className="mt-3 space-y-2">
                  {researchQuestions.map((q) => (
                    <li key={q} className="flex gap-2 text-sm leading-relaxed text-foreground/85">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-deep" aria-hidden="true" />
                      {q}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-border/60 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Specific objectives
                </h3>
                <ul className="mt-3 space-y-2">
                  {specificObjectives.map((o) => (
                    <li key={o} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-deep" aria-hidden="true" />
                      {o}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ============ STATISTICS (SAMPLE) ============ */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="stats-heading">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-deep">
              Research dashboard
            </p>
            <h2
              id="stats-heading"
              className="mt-3 font-display text-3xl font-semibold text-foreground"
            >
              The data behind the study
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              The figures below are demonstration data so you can see how live findings
              will appear. Verified survey results will replace them as responses come
              in.
            </p>
          </div>
          <SampleBadge label="Sample data — not real findings" />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SAMPLE_STATS.map((stat) => (
            <Card key={stat.label} className="rounded-2xl border-border/60 shadow-sm">
              <CardContent className="p-5">
                <p className="font-display text-3xl font-semibold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{stat.label}</p>
                <p className="mt-2 text-xs text-muted-foreground">{stat.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">
                Respondents by age group
              </h3>
              <p className="mb-4 mt-1 text-xs text-muted-foreground">Sample distribution</p>
              <AgeDistributionChart data={SAMPLE_AGE_DATA} />
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">
                Mean perceived impact by life domain
              </h3>
              <p className="mb-4 mt-1 text-xs text-muted-foreground">
                1 = no impact · 5 = severe impact · sample scores
              </p>
              <ImpactScoresChart data={SAMPLE_IMPACT_DATA} />
            </CardContent>
          </Card>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Want the real picture?{" "}
          <Link to="/survey" className="font-semibold text-teal-deep underline underline-offset-4">
            Take the anonymous survey
          </Link>{" "}
          or view the live{" "}
          <Link to="/findings" className="font-semibold text-teal-deep underline underline-offset-4">
            research findings
          </Link>
          .
        </p>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6" aria-labelledby="cta-heading">
        <div className="band-navy relative overflow-hidden rounded-3xl px-6 py-14 text-center text-navy-foreground sm:px-12">
          <HeartPulse
            className="pointer-events-none absolute -right-8 -top-8 size-48 text-teal/10"
            aria-hidden="true"
          />
          <h2 id="cta-heading" className="font-display text-3xl font-semibold sm:text-4xl">
            Your voice shapes this research
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-navy-foreground/80 sm:text-base">
            The survey is completely anonymous — we never ask for your name, email,
            phone number, or address. It takes about 5–7 minutes, and you can stop
            before submitting at any time.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-teal text-teal-foreground shadow-lg shadow-teal-deep/30 hover:bg-teal-deep"
            >
              <Link to="/survey">
                Take the Survey
                <ArrowRight className="ml-1 size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-navy-foreground hover:bg-white/10 hover:text-navy-foreground"
            >
              <Link to="/privacy">Read the privacy notice</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
