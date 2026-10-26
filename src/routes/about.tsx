import { Link } from "@tanstack/react-router";
import { ArrowRight, Target, HelpCircle, Lightbulb } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/site/page-hero";
import { CheckCircle2 } from "lucide-react";
import {
  mainObjective,
  problemStatement,
  researchBackground,
  researchQuestions,
  significance,
  specificObjectives,
  researchLimitations,
} from "@/lib/research-content";
import supportImage from "@/assets/support.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About the Research | Youth Wellbeing Research",
      },
      {
        name: "description",
        content:
          "Background, problem statement, objectives, research questions, and significance of the study on the socio-economic and health-related effects of substance abuse among youths.",
      },
      { property: "og:title", content: "About the Research | Youth Wellbeing Research" },
      {
        property: "og:description",
        content:
          "The design behind the study: background, objectives, research questions, and significance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="About the research"
        intro="A structured, anonymous study of how substance abuse shapes the health, education, family life, and economic opportunities of young people aged 18 and above."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <Card className="rounded-2xl border-border/60 shadow-sm">
              <CardContent className="p-6">
                <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
                  <Lightbulb className="size-5 text-teal-deep" aria-hidden="true" />
                  Background
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {researchBackground}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/60 shadow-sm">
              <CardContent className="p-6">
                <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
                  <HelpCircle className="size-5 text-teal-deep" aria-hidden="true" />
                  Problem statement
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {problemStatement}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-teal/30 bg-teal-soft/40 shadow-sm">
              <CardContent className="p-6">
                <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
                  <Target className="size-5 text-teal-deep" aria-hidden="true" />
                  Main objective
                </h2>
                <p className="mt-3 text-sm font-medium leading-relaxed text-foreground">
                  {mainObjective}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/60 shadow-sm">
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-semibold">Specific objectives</h2>
                <ul className="mt-4 space-y-2.5">
                  {specificObjectives.map((o) => (
                    <li key={o} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-deep" aria-hidden="true" />
                      {o}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/60 shadow-sm">
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-semibold">Research questions</h2>
                <ol className="mt-4 space-y-2.5">
                  {researchQuestions.map((q, i) => (
                    <li key={q} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-soft text-xs font-bold text-teal-deep">
                        {i + 1}
                      </span>
                      {q}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/60 shadow-sm">
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-semibold">Significance of the study</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{significance}</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/60 bg-secondary/50 shadow-sm">
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-semibold">Methodology in brief</h2>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-deep" aria-hidden="true" />
                    Anonymous structured questionnaire for respondents aged 18 and above
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-deep" aria-hidden="true" />
                    Closed Likert-scale items plus optional open-text suggestions
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-deep" aria-hidden="true" />
                    Aggregate-only reporting; no individual responses are published
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-deep" aria-hidden="true" />
                    Voluntary participation with withdrawal at any point before submission
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6">
            <img
              src={supportImage}
              alt="Two young adults in supportive conversation outdoors"
              className="w-full rounded-2xl object-cover shadow-md"
              width={1408}
              height={1008}
              loading="lazy"
            />
            <Card className="rounded-2xl border-border/60 bg-secondary/50 shadow-sm">
              <CardContent className="p-6">
                <h2 className="font-display text-lg font-semibold">Research limitations</h2>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {researchLimitations.map((l) => (
                    <li key={l} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-deep" />
                      {l}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-teal/30 bg-teal-soft/40 shadow-sm">
              <CardContent className="p-6">
                <h2 className="font-display text-lg font-semibold">Take part</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  The survey is anonymous and takes 5–7 minutes. Your responses directly
                  shape the findings.
                </p>
                <Button asChild className="mt-4 bg-teal text-teal-foreground hover:bg-teal-deep">
                  <Link to="/survey">
                    Take the Survey
                    <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </>
  );
}
