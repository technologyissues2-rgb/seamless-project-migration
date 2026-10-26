import { z } from "zod";

/** Shared, client-safe survey schema and option metadata. */

export const AGE_RANGES = ["18-24", "25-34", "35-44", "45+"] as const;
export const GENDERS = ["female", "male", "other", "prefer_not_to_say"] as const;
export const EDUCATION_LEVELS = [
  "secondary",
  "vocational",
  "undergraduate",
  "postgraduate",
  "other",
  "prefer_not_to_say",
] as const;
export const EMPLOYMENT_STATUSES = [
  "student",
  "employed",
  "unemployed",
  "self_employed",
  "prefer_not_to_say",
] as const;
export const AWARENESS_LEVELS = [
  "not_aware",
  "slightly_aware",
  "moderately_aware",
  "very_aware",
] as const;
export const SERVICES_AWARENESS = ["none", "some", "several", "unsure"] as const;

export const surveyFormSchema = z.object({
  ageRange: z.enum(AGE_RANGES),
  gender: z.enum(GENDERS),
  educationLevel: z.enum(EDUCATION_LEVELS),
  employmentStatus: z.enum(EMPLOYMENT_STATUSES),
  awarenessLevel: z.enum(AWARENESS_LEVELS),
  healthImpactPhysical: z.number().int().min(1).max(5),
  healthImpactMental: z.number().int().min(1).max(5),
  socioEducation: z.number().int().min(1).max(5),
  socioEmployment: z.number().int().min(1).max(5),
  socioFamily: z.number().int().min(1).max(5),
  socioFinances: z.number().int().min(1).max(5),
  observedEffects: z.array(z.string().max(60)).max(20),
  servicesAwareness: z.enum(SERVICES_AWARENESS),
  barriers: z.array(z.string().max(60)).max(20),
  suggestions: z.string().max(2000),
});

export type SurveyFormValues = z.infer<typeof surveyFormSchema>;

export const OBSERVED_EFFECTS = [
  { value: "school_dropout", label: "Education disrupted or dropout" },
  { value: "job_loss", label: "Job loss or lost income" },
  { value: "family_conflict", label: "Family conflict or breakdown" },
  { value: "debt", label: "Household debt or financial strain" },
  { value: "crime_safety", label: "Community safety concerns" },
  { value: "stigma", label: "Stigma and social isolation" },
  { value: "mental_health", label: "Mental health decline" },
  { value: "physical_health", label: "Physical health decline" },
] as const;

export const BARRIERS = [
  { value: "stigma", label: "Stigma or fear of judgement" },
  { value: "cost", label: "Cost of services" },
  { value: "distance", label: "Distance or transport" },
  { value: "dont_know_where", label: "Don't know where to go" },
  { value: "no_service", label: "No nearby services" },
  { value: "trust", label: "Distrust of providers" },
  { value: "time", label: "Time or scheduling" },
] as const;

export const LIKERT_LABELS: Record<number, string> = {
  1: "No impact",
  2: "Slight impact",
  3: "Moderate impact",
  4: "High impact",
  5: "Severe impact",
};

export const VALUE_LABELS: Record<string, string> = {
  "18-24": "18–24 years",
  "25-34": "25–34 years",
  "35-44": "35–44 years",
  "45+": "45 years or older",
  female: "Female",
  male: "Male",
  other: "Other",
  prefer_not_to_say: "Prefer not to say",
  secondary: "Secondary school",
  vocational: "Vocational training",
  undergraduate: "Undergraduate",
  postgraduate: "Postgraduate",
  student: "Student",
  employed: "Employed",
  unemployed: "Unemployed",
  self_employed: "Self-employed",
  not_aware: "Not aware",
  slightly_aware: "Slightly aware",
  moderately_aware: "Moderately aware",
  very_aware: "Very aware",
  none: "None",
  some: "Some",
  several: "Several",
  unsure: "Unsure",
};
