import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { surveyFormSchema } from "./survey-schema";

/**
 * Server-side Supabase client using the publishable key. Anonymous survey
 * inserts are authorized by a restricted RLS insert policy; anonymous visitors
 * can never read individual submissions. Runs only inside handlers.
 */
function createPublicSupabaseClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;

  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

export const surveySubmissionSchema = surveyFormSchema.extend({
  consent: z.literal(true),
  anonToken: z.string().min(10).max(64),
});

export type SurveySubmission = z.infer<typeof surveySubmissionSchema>;

export interface SubmitSurveyResult {
  ok: boolean;
  duplicate?: boolean;
  referenceCode?: string;
  error?: string;
}

export const submitSurvey = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const parsed = surveySubmissionSchema.safeParse(input);
    if (!parsed.success) {
      throw new Error("Please review the highlighted answers and try again.");
    }
    return parsed.data;
  })
  .handler(async ({ data }): Promise<SubmitSurveyResult> => {
    const supabase = createPublicSupabaseClient();

    const { data: inserted, error } = await supabase
      .from("survey_responses")
      .insert({
        consent: true,
        age_range: data.ageRange,
        gender: data.gender,
        education_level: data.educationLevel,
        employment_status: data.employmentStatus,
        awareness_level: data.awarenessLevel,
        health_impact_physical: data.healthImpactPhysical,
        health_impact_mental: data.healthImpactMental,
        socioeconomic_education: data.socioEducation,
        socioeconomic_employment: data.socioEmployment,
        socioeconomic_family: data.socioFamily,
        socioeconomic_finance: data.socioFinances,
        observed_effects: data.observedEffects,
        services_awareness: data.servicesAwareness,
        barriers: data.barriers,
        suggestions: data.suggestions ? data.suggestions : null,
        anon_token: data.anonToken,
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") {
        return { ok: false, duplicate: true, error: "duplicate" };
      }
      console.error("[submitSurvey] insert failed", error);
      return {
        ok: false,
        error: "The survey could not be submitted right now. Please try again shortly.",
      };
    }

    return { ok: true, referenceCode: inserted.id.slice(0, 8).toUpperCase() };
  });

export interface SurveyAggregates {
  total_responses: number;
  by_age_range: Record<string, number>;
  mean_scores: Record<string, number>;
  awareness_distribution: Record<string, number>;
  observed_effects: Record<string, number>;
  responses_by_month: { month: string; n: number }[];
  generated_at: string;
}

export interface AggregatesResult {
  data: SurveyAggregates | null;
  error?: string;
}

export const getSurveyAggregates = createServerFn({ method: "GET" }).handler(
  async (): Promise<AggregatesResult> => {
    try {
      const supabase = createPublicSupabaseClient();
      const { data, error } = await supabase.rpc("get_survey_aggregates");
      if (error || !data) {
        console.error("[getSurveyAggregates] rpc failed", error);
        return { data: null, error: "Aggregate statistics are temporarily unavailable." };
      }
      return { data: data as unknown as SurveyAggregates };
    } catch (e) {
      console.error("[getSurveyAggregates] unexpected", e);
      return { data: null, error: "Aggregate statistics are temporarily unavailable." };
    }
  },
);

export interface PublishedResource {
  id: string;
  title: string;
  description: string;
  category: string;
  source_url: string;
}

export const listPublishedResources = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ data: PublishedResource[] | null; error?: string }> => {
    try {
      const supabase = createPublicSupabaseClient();
      const { data, error } = await supabase
        .from("research_resources")
        .select("id, title, description, category, source_url")
        .eq("publication_status", "published")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("[listPublishedResources] failed", error);
        return { data: null, error: "The resource directory is temporarily unavailable." };
      }
      return { data: (data ?? []) as PublishedResource[] };
    } catch (e) {
      console.error("[listPublishedResources] unexpected", e);
      return { data: null, error: "The resource directory is temporarily unavailable." };
    }
  },
);
