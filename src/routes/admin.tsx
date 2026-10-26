import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, Loader2, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  adminCheck,
  deleteResource,
  exportSurveyCsv,
  listAllProjects,
  listAllResources,
  listSurveyResponses,
  upsertProject,
  upsertResource,
  type ResearchProject,
  type ResearchResource,
  type SurveyRecord,
} from "@/lib/admin.functions";
import { AgeDistributionChart, ImpactScoresChart, CategoryBarsChart } from "@/components/charts/survey-charts";
import { VALUE_LABELS } from "@/lib/survey-schema";
import { getSurveyAggregates } from "@/lib/survey.functions";
import { SampleBadge } from "@/components/site/sample-badge";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const result = await adminCheck();
    if (!result.isAdmin) {
      throw redirect({ to: "/login" });
    }
  },
  head: () => ({
    meta: [
      { title: "Research Dashboard | Youth Wellbeing Research" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const EFFECT_LABELS: Record<string, string> = {
  school_dropout: "Education disrupted",
  job_loss: "Job loss",
  family_conflict: "Family conflict",
  debt: "Household debt",
  crime_safety: "Safety concerns",
  stigma: "Stigma",
  mental_health: "Mental health",
  physical_health: "Physical health",
};

const CATEGORY_LABELS: Record<string, string> = {
  prevention: "Prevention",
  treatment: "Treatment",
  education: "Education",
  helpline: "Helpline",
  policy: "Policy",
  other: "Other",
};

const RESOURCE_CATEGORIES = ["prevention", "treatment", "education", "helpline", "policy", "other"] as const;

function sliceData(map: Record<string, number>, labels?: Record<string, string>) {
  return Object.entries(map)
    .map(([key, value]) => ({ label: labels?.[key] ?? key, value }))
    .sort((a, b) => b.value - a.value);
}

const IMPACT_KEYS = [
  { key: "health_impact_physical", label: "Physical health" },
  { key: "health_impact_mental", label: "Mental health" },
  { key: "socioeconomic_education", label: "Education" },
  { key: "socioeconomic_employment", label: "Employment" },
  { key: "socioeconomic_family", label: "Family" },
  { key: "socioeconomic_finance", label: "Finances" },
] as const;

function AdminPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-deep">
            Research team
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold">Research dashboard</h1>
        </div>
        <SampleBadge label="Live research data" />
      </div>

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="responses">Survey responses</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="responses" className="mt-6">
          <ResponsesTab />
        </TabsContent>
        <TabsContent value="projects" className="mt-6">
          <ProjectsTab />
        </TabsContent>
        <TabsContent value="resources" className="mt-6">
          <ResourcesTab />
        </TabsContent>
      </Tabs>
    </section>
  );
}

function OverviewTab() {
  const [aggregates, setAggregates] = useState<Awaited<ReturnType<typeof getSurveyAggregates>>["data"]>(null);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    getSurveyAggregates().then((result) => {
      if (result.error || !result.data) setError(result.error ?? "Could not load statistics.");
      else setAggregates(result.data);
    });
  }, []);

  async function downloadCsv() {
    setExporting(true);
    const result = await exportSurveyCsv();
    setExporting(false);
    if (result.error || result.csv === null) {
      toast.error(result.error ?? "Export failed.");
      return;
    }
    if (result.csv === "") {
      toast.info("There are no responses to export yet.");
      return;
    }
    const blob = new Blob([result.csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `survey-responses-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV downloaded");
  }

  if (error) {
    return <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>;
  }
  if (!aggregates) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Loading statistics…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-display text-2xl font-semibold text-foreground">
            {aggregates.total_responses}
          </span>{" "}
          anonymous responses collected
        </p>
        <Button variant="outline" onClick={downloadCsv} disabled={exporting}>
          {exporting ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Download className="size-4" aria-hidden="true" />
          )}
          Export CSV
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-semibold">Respondents by age group</h3>
            <AgeDistributionChart data={sliceData(aggregates.by_age_range)} />
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-semibold">Mean perceived impact</h3>
            <ImpactScoresChart
              data={IMPACT_KEYS.filter(({ key }) => aggregates.mean_scores[key] != null).map(
                ({ key, label }) => ({ label, value: Number(aggregates.mean_scores[key]) }),
              )}
            />
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-semibold">Observed effects</h3>
            <CategoryBarsChart data={sliceData(aggregates.observed_effects, EFFECT_LABELS)} />
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-semibold">Awareness levels</h3>
            <CategoryBarsChart
              data={sliceData(aggregates.awareness_distribution, VALUE_LABELS)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ResponsesTab() {
  const [data, setData] = useState<SurveyRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listSurveyResponses().then((result) => {
      if (result.error || !result.data) setError(result.error ?? "Could not load records.");
      else setData(result.data);
    });
  }, []);

  if (error) {
    return <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>;
  }
  if (!data) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Loading responses…
      </div>
    );
  }
  if (data.length === 0) {
    return (
      <p className="rounded-xl border border-border/60 bg-secondary/50 px-4 py-6 text-center text-sm text-muted-foreground">
        No survey responses yet. Share the{" "}
        <Link to="/survey" className="font-semibold text-teal-deep underline underline-offset-4">
          survey link
        </Link>{" "}
        to start collecting.
      </p>
    );
  }

  return (
    <Card className="rounded-2xl border-border/60 shadow-sm">
      <CardContent className="p-0">
        <div className="max-h-[70vh] overflow-auto rounded-2xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Employment</TableHead>
                <TableHead>Awareness</TableHead>
                <TableHead>Physical</TableHead>
                <TableHead>Mental</TableHead>
                <TableHead>Observed effects</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="whitespace-nowrap text-xs">
                    {new Date(row.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{row.age_range}</TableCell>
                  <TableCell className="text-xs">{VALUE_LABELS[row.gender ?? ""] ?? "—"}</TableCell>
                  <TableCell className="text-xs">{VALUE_LABELS[row.employment_status ?? ""] ?? "—"}</TableCell>
                  <TableCell className="text-xs">{VALUE_LABELS[row.awareness_level ?? ""] ?? "—"}</TableCell>
                  <TableCell>{row.health_impact_physical ?? "—"}</TableCell>
                  <TableCell>{row.health_impact_mental ?? "—"}</TableCell>
                  <TableCell className="max-w-48 text-xs text-muted-foreground">
                    {(row.observed_effects ?? []).map((e) => EFFECT_LABELS[e] ?? e).join(", ") || "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="border-t border-border/60 px-4 py-3 text-xs text-muted-foreground">
          Showing the {Math.min(data.length, 2000)} most recent responses. Identifying fields are
          never collected; the anonymous token is excluded from exports.
        </p>
      </CardContent>
    </Card>
  );
}

function ProjectsTab() {
  const [projects, setProjects] = useState<ResearchProject[] | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [objectives, setObjectives] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [saving, setSaving] = useState(false);

  async function reload() {
    const result = await listAllProjects();
    if (result.data) setProjects(result.data);
  }

  useEffect(() => {
    reload();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const result = await upsertProject({ data: { title, description, objectives, publication_status: status } });
    setSaving(false);
    if (result.ok) {
      toast.success("Project saved");
      setTitle("");
      setDescription("");
      setObjectives("");
      setStatus("draft");
      await reload();
    } else {
      toast.error(result.error ?? "Save failed");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <Card className="rounded-2xl border-border/60 shadow-sm">
        <CardContent className="p-6">
          <h3 className="font-display text-lg font-semibold">Add a research project</h3>
          <form className="mt-4 space-y-4" onSubmit={handleSave}>
            <div className="space-y-1.5">
              <Label htmlFor="project-title">Title</Label>
              <Input id="project-title" required maxLength={300} value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="project-description">Description</Label>
              <Textarea id="project-description" maxLength={5000} className="min-h-24" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="project-objectives">Objectives</Label>
              <Textarea id="project-objectives" maxLength={5000} className="min-h-24" value={objectives} onChange={(e) => setObjectives(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Publication status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as "draft" | "published")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft — hidden from the public</SelectItem>
                  <SelectItem value="published">Published — visible on the site</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={saving} className="bg-teal text-teal-foreground hover:bg-teal-deep">
              {saving ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
              Save project
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/60 shadow-sm">
        <CardContent className="p-6">
          <h3 className="font-display text-lg font-semibold">Existing projects</h3>
          {!projects ? (
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Loading…
            </div>
          ) : projects.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No projects yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {projects.map((project) => (
                <li key={project.id} className="rounded-xl border border-border/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-foreground">{project.title}</p>
                    <Badge variant={project.publication_status === "published" ? "default" : "outline"}>
                      {project.publication_status}
                    </Badge>
                  </div>
                  {project.description ? (
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ResourcesTab() {
  const [resources, setResources] = useState<ResearchResource[] | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("prevention");
  const [sourceUrl, setSourceUrl] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [saving, setSaving] = useState(false);

  async function reload() {
    const result = await listAllResources();
    if (result.data) setResources(result.data);
  }

  useEffect(() => {
    reload();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const result = await upsertResource({
      data: { title, description, category, source_url: sourceUrl, publication_status: status },
    });
    setSaving(false);
    if (result.ok) {
      toast.success("Resource saved");
      setTitle("");
      setDescription("");
      setSourceUrl("");
      setStatus("draft");
      await reload();
    } else {
      toast.error(result.error ?? "Save failed");
    }
  }

  async function handleDelete(id: string) {
    const result = await deleteResource({ data: { id } });
    if (result.ok) {
      toast.success("Resource deleted");
      await reload();
    } else {
      toast.error(result.error ?? "Delete failed");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <Card className="rounded-2xl border-border/60 shadow-sm">
        <CardContent className="p-6">
          <h3 className="font-display text-lg font-semibold">Add a support resource</h3>
          <form className="mt-4 space-y-4" onSubmit={handleSave}>
            <div className="space-y-1.5">
              <Label htmlFor="resource-title">Title</Label>
              <Input id="resource-title" required maxLength={300} value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="resource-description">Description</Label>
              <Textarea id="resource-description" maxLength={2000} className="min-h-20" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {RESOURCE_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {CATEGORY_LABELS[c]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Publication status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as "draft" | "published")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="resource-url">Source URL</Label>
              <Input
                id="resource-url"
                type="url"
                required
                placeholder="https://example.org/help"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={saving} className="bg-teal text-teal-foreground hover:bg-teal-deep">
              {saving ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
              Save resource
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/60 shadow-sm">
        <CardContent className="p-6">
          <h3 className="font-display text-lg font-semibold">All resources</h3>
          {!resources ? (
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Loading…
            </div>
          ) : resources.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No resources yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {resources.map((resource) => (
                <li key={resource.id} className="rounded-xl border border-border/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-foreground">{resource.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {CATEGORY_LABELS[resource.category] ?? resource.category} ·{" "}
                        <a
                          href={resource.source_url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="underline underline-offset-2"
                        >
                          {resource.source_url}
                        </a>
                      </p>
                      {resource.description ? (
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{resource.description}</p>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <Badge variant={resource.publication_status === "published" ? "default" : "outline"}>
                        {resource.publication_status}
                      </Badge>
                      <Button variant="ghost" size="icon" aria-label={`Delete ${resource.title}`} onClick={() => handleDelete(resource.id)}>
                        <Trash2 className="size-4 text-destructive" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-teal-deep" aria-hidden="true" />
            Published resources appear on the public Prevention &amp; Resources page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
