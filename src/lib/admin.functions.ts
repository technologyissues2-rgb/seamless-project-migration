import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

/**
 * Admin server functions. Every handler verifies the caller's role through the
 * security-definer has_role() database function — never through client-supplied
 * data. Row Level Security enforces the same rules at the database.
 */

async function requireAdmin(context: { supabase: Awaited<unknown>; userId: string }) {
  const { data: isAdmin, error } = await (context.supabase as any).rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error || !isAdmin) throw new Error("Forbidden: administrator access required");
}

export const adminCheck = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    try {
      await requireAdmin(context);
      return { isAdmin: true as const };
    } catch {
      return { isAdmin: false as const };
    }
  });

export interface SurveyRecord {
  id: string;
  created_at: string;
  age_range: string;
  gender: string | null;
  education_level: string | null;
  employment_status: string | null;
  awareness_level: string | null;
  health_impact_physical: number | null;
  health_impact_mental: number | null;
  socioeconomic_education: number | null;
  socioeconomic_employment: number | null;
  socioeconomic_family: number | null;
  socioeconomic_finance: number | null;
  observed_effects: string[] | null;
  services_awareness: string | null;
  barriers: string[] | null;
  suggestions: string | null;
}

export const listSurveyResponses = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ data: SurveyRecord[] | null; error?: string }> => {
    try {
      await requireAdmin(context);
    } catch {
      return { data: null, error: "Administrator access required." };
    }
    const { data, error } = await (context.supabase as any)
      .from("survey_responses")
      .select(
        `id, created_at, age_range, gender, education_level, employment_status,
         awareness_level, health_impact_physical, health_impact_mental,
         socioeconomic_education, socioeconomic_employment, socioeconomic_family,
         socioeconomic_finance, observed_effects, services_awareness, barriers, suggestions`,
      )
      .order("created_at", { ascending: false })
      .limit(2000);
    if (error) {
      console.error("[listSurveyResponses] failed", error);
      return { data: null, error: "Could not load survey records." };
    }
    return { data: data as SurveyRecord[] };
  });

export const exportSurveyCsv = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ csv: string | null; error?: string }> => {
    try {
      await requireAdmin(context);
    } catch {
      return { csv: null, error: "Administrator access required." };
    }
    const { data, error } = await (context.supabase as any)
      .from("survey_responses")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[exportSurveyCsv] failed", error);
      return { csv: null, error: "Could not export survey data." };
    }
    const rows = (data ?? []) as Record<string, unknown>[];
    if (rows.length === 0) return { csv: "" };

    const headers = Object.keys(rows[0]!).filter((h) => h !== "anon_token");
    const escape = (v: unknown) => {
      if (v === null || v === undefined) return "";
      const s = Array.isArray(v) ? v.join("; ") : String(v);
      return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
    };
    const lines = [
      headers.join(","),
      ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
    ];
    return { csv: lines.join("\n") };
  });

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  objectives: string;
  publication_status: string;
  created_at: string;
  updated_at: string;
}

export const listAllProjects = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ data: ResearchProject[] | null; error?: string }> => {
    try {
      await requireAdmin(context);
    } catch {
      return { data: null, error: "Administrator access required." };
    }
    const { data, error } = await (context.supabase as any)
      .from("research_projects")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) {
      console.error("[listAllProjects] failed", error);
      return { data: null, error: "Could not load research projects." };
    }
    return { data: data as ResearchProject[] };
  });

const projectInput = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(300),
  description: z.string().max(5000).default(""),
  objectives: z.string().max(5000).default(""),
  publication_status: z.enum(["draft", "published"]).default("draft"),
});

export const upsertProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => projectInput.parse(input))
  .handler(async ({ context, data }): Promise<{ ok: boolean; error?: string }> => {
    try {
      await requireAdmin(context);
    } catch {
      return { ok: false, error: "Administrator access required." };
    }
    const values = { ...data, updated_at: new Date().toISOString() };
    const { error } = await (context.supabase as any)
      .from("research_projects")
      .upsert(values);
    if (error) {
      console.error("[upsertProject] failed", error);
      return { ok: false, error: "Could not save the project." };
    }
    return { ok: true };
  });

export interface ResearchResource {
  id: string;
  title: string;
  description: string;
  category: string;
  source_url: string;
  publication_status: string;
  created_at: string;
  updated_at: string;
}

export const listAllResources = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ data: ResearchResource[] | null; error?: string }> => {
    try {
      await requireAdmin(context);
    } catch {
      return { data: null, error: "Administrator access required." };
    }
    const { data, error } = await (context.supabase as any)
      .from("research_resources")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) {
      console.error("[listAllResources] failed", error);
      return { data: null, error: "Could not load research resources." };
    }
    return { data: data as ResearchResource[] };
  });

const resourceInput = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(300),
  description: z.string().max(2000).default(""),
  category: z.enum(["prevention", "treatment", "education", "helpline", "policy", "other"]),
  source_url: z.string().url(),
  publication_status: z.enum(["draft", "published"]).default("draft"),
});

export const upsertResource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => resourceInput.parse(input))
  .handler(async ({ context, data }): Promise<{ ok: boolean; error?: string }> => {
    try {
      await requireAdmin(context);
    } catch {
      return { ok: false, error: "Administrator access required." };
    }
    const values = { ...data, updated_at: new Date().toISOString() };
    const { error } = await (context.supabase as any)
      .from("research_resources")
      .upsert(values);
    if (error) {
      console.error("[upsertResource] failed", error);
      return { ok: false, error: "Could not save the resource." };
    }
    return { ok: true };
  });

export const deleteResource = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }): Promise<{ ok: boolean; error?: string }> => {
    try {
      await requireAdmin(context);
    } catch {
      return { ok: false, error: "Administrator access required." };
    }
    const { error } = await (context.supabase as any)
      .from("research_resources")
      .delete()
      .eq("id", data.id);
    if (error) {
      console.error("[deleteResource] failed", error);
      return { ok: false, error: "Could not delete the resource." };
    }
    return { ok: true };
  });
