import { createFileRoute } from "@tanstack/react-router";
import { BookMarked, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/site/page-hero";
import { references } from "@/lib/research-content";

export const Route = createFileRoute("/references")({
  head: () => ({
    meta: [
      { title: "References | Youth Wellbeing Research" },
      {
        name: "description",
        content:
          "Credible academic and public-health sources informing this research, including WHO and UNODC publications.",
      },
      { property: "og:title", content: "References | Youth Wellbeing Research" },
      {
        property: "og:description",
        content:
          "Credible public-health sources: WHO, UNODC, UNICEF, and CDC publications on substance abuse and youth wellbeing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReferencesPage,
});

function ReferencesPage() {
  return (
    <>
      <PageHero
        eyebrow="References"
        title="Sources and further reading"
        intro="This study is grounded in established public-health literature. The sources below are credible institutional publications — we link only to organisations, and we do not fabricate citations or publication details."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {references.map((ref) => (
            <Card key={ref.url} className="rounded-2xl border-border/60 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <BookMarked className="mt-1 size-5 shrink-0 text-teal-deep" aria-hidden="true" />
                  <div>
                    <h2 className="font-display text-lg font-semibold text-foreground">
                      {ref.title}
                    </h2>
                    <p className="text-sm font-medium text-teal-deep">{ref.organization}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {ref.note}
                    </p>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 break-all text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                    >
                      {ref.url}
                      <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-10 text-center text-xs leading-relaxed text-muted-foreground">
          Links point to the organisations' own pages; please verify the current
          publication details on each organisation's website when citing. Figures shown
          on this platform marked "sample" are demonstration data and must not be cited
          as findings.
        </p>
      </section>
    </>
  );
}
