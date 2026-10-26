import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardCheck, Info, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/site/page-hero";
import { submitSurvey } from "@/lib/survey.functions";
import {
  AGE_RANGES,
  AWARENESS_LEVELS,
  BARRIERS,
  EDUCATION_LEVELS,
  EMPLOYMENT_STATUSES,
  GENDERS,
  LIKERT_LABELS,
  OBSERVED_EFFECTS,
  SERVICES_AWARENESS,
  VALUE_LABELS,
  type SurveyFormValues,
} from "@/lib/survey-schema";

export const Route = createFileRoute("/survey")({
  head: () => ({
    meta: [
      { title: "Anonymous Survey | Youth Wellbeing Research" },
      {
        name: "description",
        content:
          "Share your perspective in a completely anonymous survey about the health and socio-economic effects of substance abuse among young people. No name, email, or phone number is ever collected.",
      },
      { property: "og:title", content: "Anonymous Survey | Youth Wellbeing Research" },
      {
        property: "og:description",
        content:
          "A 5–7 minute anonymous survey: your community, perceived impacts, and what support is missing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SurveyPage,
});

const STEPS = ["About you", "Perceived impact", "Effects & support", "Your voice"] as const;

const IMPACT_FIELDS = [
  { key: "healthImpactPhysical", label: "Physical health (e.g. injury, illness, addiction risk)" },
  { key: "healthImpactMental", label: "Mental health and wellbeing" },
  { key: "socioEducation", label: "Education (school or studies)" },
  { key: "socioEmployment", label: "Employment and job prospects" },
  { key: "socioFamily", label: "Family relationships and home life" },
  { key: "socioFinances", label: "Household finances" },
] as const satisfies ReadonlyArray<{ key: keyof SurveyFormValues; label: string }>;

type ImpactKey = (typeof IMPACT_FIELDS)[number]["key"];

const ANON_TOKEN_KEY = "ywp_anon_token";

function getAnonToken(): string {
  try {
    const existing = window.localStorage.getItem(ANON_TOKEN_KEY);
    if (existing && existing.length >= 10 && existing.length <= 64) return existing;
    const token = (crypto.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`);
    window.localStorage.setItem(ANON_TOKEN_KEY, token);
    return token;
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
  }
}

function ChoiceGroup({
  legend,
  name,
  options,
  value,
  onChange,
  allowBlank = false,
}: {
  legend: string;
  name: string;
  options: readonly string[];
  value: string | null;
  onChange: (next: string) => void;
  allowBlank?: boolean;
}) {
  const shown = allowBlank && !options.includes("prefer_not_to_say") ? options : options;
  return (
    <fieldset className="mt-6">
      <legend className="font-display text-lg font-semibold text-foreground">{legend}</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {shown.map((option) => (
          <label
            key={option}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition-colors ${
              value === option
                ? "border-teal bg-teal-soft/60 text-foreground"
                : "border-border/70 bg-card hover:bg-accent"
            }`}
          >
            <input
              type="radio"
              name={name}
              className="size-4 accent-[var(--teal-deep)]"
              checked={value === option}
              onChange={() => onChange(option)}
            />
            <span>{VALUE_LABELS[option] ?? option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function LikertRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | null;
  onChange: (n: number) => void;
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-card p-4">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`${LABELS[n]} (${n})`}
            onClick={() => onChange(n)}
            className={`flex h-10 w-10 flex-col items-center justify-center rounded-lg border text-sm font-semibold transition-colors ${
              value === n
                ? "border-teal-deep bg-teal text-teal-foreground"
                : "border-border bg-background hover:bg-accent"
            }`}
          >
            {n}
          </button>
        ))}
        <span className="ml-2 text-xs text-muted-foreground">
          {value ? LABELS[value] : "1 = no impact · 5 = severe impact"}
        </span>
      </div>
    </div>
  );
}

const LABELS = LIKERT_LABELS;

function CheckGroup({
  legend,
  options,
  selected,
  onToggle,
  hint,
}: {
  legend: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  selected: string[];
  onToggle: (value: string) => void;
  hint?: string;
}) {
  return (
    <fieldset className="mt-6">
      <legend className="font-display text-lg font-semibold text-foreground">{legend}</legend>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm transition-colors ${
              selected.includes(option.value)
                ? "border-teal bg-teal-soft/60 text-foreground"
                : "border-border/70 bg-card hover:bg-accent"
            }`}
          >
            <Checkbox
              checked={selected.includes(option.value)}
              onCheckedChange={() => onToggle(option.value)}
              className="mt-0.5"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "done"; referenceCode: string }
  | { status: "duplicate" }
  | { status: "error"; message: string };

function SurveyPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Partial<SurveyFormValues>>({});
  const [observedEffects, setObservedEffects] = useState<string[]>([]);
  const [barriers, setBarriers] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [suggestions, setSuggestions] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const [stepError, setStepError] = useState<string | null>(null);

  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  function validateStep(current: number): string | null {
    if (current === 0) {
      if (!form.ageRange || !form.gender || !form.educationLevel || !form.employmentStatus) {
        return "Please answer every question on this step.";
      }
    }
    if (current === 1) {
      const missing = IMPACT_FIELDS.some(({ key }) => !form[key]);
      if (missing) return "Please rate every area before continuing.";
    }
    if (current === 2) {
      if (!form.awarenessLevel || !form.servicesAwareness) {
        return "Please answer both questions on this step.";
      }
    }
    return null;
  }

  function next() {
    const error = validateStep(step);
    if (error) {
      setStepError(error);
      return;
    }
    setStepError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setStepError(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    if (!consent) {
      setStepError("Please confirm the consent statement to submit.");
      return;
    }
    setStepError(null);
    setSubmitState({ status: "submitting" });
    const payload = {
      ...(form as SurveyFormValues),
      observedEffects,
      barriers,
      suggestions,
      consent: true as const,
      anonToken: getAnonToken(),
    };
    const result = await submitSurvey({ data: payload });
    if (result.ok && result.referenceCode) {
      setSubmitState({ status: "done", referenceCode: result.referenceCode });
    } else if (result.duplicate) {
      setSubmitState({ status: "duplicate" });
    } else {
      setSubmitState({ status: "error", message: result.error ?? "Something went wrong." });
    }
  }

  if (submitState.status === "done") {
    return (
      <>
        <PageHero
          eyebrow="Thank you"
          title="Your response has been recorded"
          intro="Your answers are now part of the research dataset. They were stored anonymously — no name, email, or contact details were collected."
        />
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <Card className="rounded-2xl border-border/60 shadow-sm">
            <CardContent className="p-8 text-center">
              <PartyPopper className="mx-auto size-10 text-teal-deep" aria-hidden="true" />
              <p className="mt-4 text-sm text-muted-foreground">Your reference code</p>
              <p className="font-display text-3xl font-semibold text-foreground">
                {submitState.referenceCode}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Keep this code if you want to reference your submission. It cannot be linked
                back to you.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild className="bg-teal text-teal-foreground hover:bg-teal-deep">
                  <Link to="/findings">
                    View live findings
                    <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/resources">Find support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </>
    );
  }

  if (submitState.status === "duplicate") {
    return (
      <>
        <PageHero
          eyebrow="Already submitted"
          title="A response from this device is already recorded"
          intro="We keep the survey one-response-per-device so the findings stay honest. If you believe this is a mistake, you can continue exploring the research instead."
        />
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-teal text-teal-foreground hover:bg-teal-deep">
              <Link to="/findings">View findings</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Back to home</Link>
            </Button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Anonymous survey"
        title="Share your perspective — anonymously"
        intro="About 5–7 minutes. We never ask for your name, email, phone number, or address. You can stop before submitting at any time."
      >
        <div className="flex items-center gap-3 text-sm text-navy-foreground/80">
          <Info className="size-4" aria-hidden="true" />
          Your answers are stored with a random code that cannot be linked back to you.
        </div>
      </PageHero>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* Progress */}
        <ol className="flex flex-wrap items-center gap-2 text-xs font-medium" aria-label="Survey progress">
          {STEPS.map((label, index) => (
            <li
              key={label}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 ${
                index === step
                  ? "border-teal-deep bg-teal-soft text-foreground"
                  : index < step
                    ? "border-teal/40 bg-background text-muted-foreground"
                    : "border-border/70 bg-background text-muted-foreground/70"
              }`}
            >
              {index < step ? (
                <CheckCircle2 className="size-3.5 text-teal-deep" aria-hidden="true" />
              ) : (
                <span className="tabular-nums">{index + 1}</span>
              )}
              {label}
            </li>
          ))}
        </ol>

        <Card className="mt-6 rounded-2xl border-border/60 shadow-sm">
          <CardContent className="p-6 sm:p-8">
            {step === 0 && (
              <div>
                <h2 className="font-display text-2xl font-semibold">About you</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  These questions help group the findings. None of them identify you.
                </p>
                <ChoiceGroup
                  legend="How old are you?"
                  name="ageRange"
                  options={AGE_RANGES}
                  value={form.ageRange ?? null}
                  onChange={(v) => setForm((f) => ({ ...f, ageRange: v as SurveyFormValues["ageRange"] }))}
                />
                <ChoiceGroup
                  legend="Gender"
                  name="gender"
                  options={GENDERS}
                  value={form.gender ?? null}
                  onChange={(v) => setForm((f) => ({ ...f, gender: v as SurveyFormValues["gender"] }))}
                />
                <ChoiceGroup
                  legend="Highest education level"
                  name="educationLevel"
                  options={EDUCATION_LEVELS}
                  value={form.educationLevel ?? null}
                  onChange={(v) =>
                    setForm((f) => ({ ...f, educationLevel: v as SurveyFormValues["educationLevel"] }))
                  }
                />
                <ChoiceGroup
                  legend="Current employment status"
                  name="employmentStatus"
                  options={EMPLOYMENT_STATUSES}
                  value={form.employmentStatus ?? null}
                  onChange={(v) =>
                    setForm((f) => ({ ...f, employmentStatus: v as SurveyFormValues["employmentStatus"] }))
                  }
                />
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl font-semibold">Perceived impact</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  How strongly, in your view, has substance abuse affected each of these areas
                  among young people around you?
                </p>
                <div className="mt-4 space-y-3">
                  {IMPACT_FIELDS.map(({ key, label }) => (
                    <LikertRow
                      key={key}
                      label={label}
                      value={(form[key] as number | undefined) ?? null}
                      onChange={(n) => setForm((f) => ({ ...f, [key]: n }))}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-display text-2xl font-semibold">Effects &amp; support</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tick everything you have observed among young people around you.
                </p>
                <CheckGroup
                  legend="Observed effects"
                  hint="Optional — tick what applies in your community."
                  options={OBSERVED_EFFECTS}
                  selected={observedEffects}
                  onToggle={(v) => setObservedEffects((list) => toggle(list, v))}
                />
                <ChoiceGroup
                  legend="How aware are you of substance abuse issues among youths?"
                  name="awarenessLevel"
                  options={AWARENESS_LEVELS}
                  value={form.awarenessLevel ?? null}
                  onChange={(v) =>
                    setForm((f) => ({ ...f, awarenessLevel: v as SurveyFormValues["awarenessLevel"] }))
                  }
                />
                <ChoiceGroup
                  legend="How much do you know about support services in your area?"
                  name="servicesAwareness"
                  options={SERVICES_AWARENESS}
                  value={form.servicesAwareness ?? null}
                  onChange={(v) =>
                    setForm((f) => ({ ...f, servicesAwareness: v as SurveyFormValues["servicesAwareness"] }))
                  }
                />
                <CheckGroup
                  legend="What stops people from getting help?"
                  hint="Optional — tick what applies in your community."
                  options={BARRIERS}
                  selected={barriers}
                  onToggle={(v) => setBarriers((list) => toggle(list, v))}
                />
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-display text-2xl font-semibold">Your voice &amp; consent</h2>
                <div className="mt-4">
                  <Label htmlFor="suggestions" className="text-sm font-medium">
                    Anything you would like to add?{" "}
                    <span className="font-normal text-muted-foreground">(optional)</span>
                  </Label>
                  <Textarea
                    id="suggestions"
                    className="mt-2 min-h-28"
                    maxLength={2000}
                    placeholder="Ideas for prevention, what support should look like, or anything we did not ask about."
                    value={suggestions}
                    onChange={(e) => setSuggestions(e.target.value)}
                  />
                  <p className="mt-1 text-right text-xs text-muted-foreground">
                    {suggestions.length}/2000
                  </p>
                </div>
                <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-teal/40 bg-teal-soft/50 p-4 text-sm">
                  <Checkbox
                    checked={consent}
                    onCheckedChange={(v) => setConsent(v === true)}
                    className="mt-0.5"
                  />
                  <span>
                    I have read the{" "}
                    <Link to="/privacy" className="font-semibold text-teal-deep underline underline-offset-4">
                      privacy notice
                    </Link>{" "}
                    and I consent to my anonymous answers being used for this research.
                  </span>
                </label>
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border/60 bg-secondary/50 p-4">
                  <ClipboardCheck className="mt-0.5 size-5 shrink-0 text-teal-deep" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-foreground/90">
                    Ready to submit? Your answers are sent once, stored anonymously, and cannot
                    be edited afterwards. Review your answers by going back through the steps.
                  </p>
                </div>
              </div>
            )}

            {stepError ? (
              <p className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {stepError}
              </p>
            ) : null}

            {submitState.status === "error" ? (
              <p className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {submitState.message}
              </p>
            ) : null}

            <div className="mt-8 flex items-center justify-between gap-3">
              <Button variant="outline" onClick={back} disabled={step === 0}>
                <ArrowLeft className="mr-1 size-4" aria-hidden="true" />
                Back
              </Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={next} className="bg-teal text-teal-foreground hover:bg-teal-deep">
                  Continue
                  <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={submitState.status === "submitting"}
                  className="bg-teal text-teal-foreground shadow-lg shadow-teal-deep/30 hover:bg-teal-deep"
                >
                  {submitState.status === "submitting" ? "Submitting…" : "Submit anonymously"}
                  <CheckCircle2 className="ml-1 size-4" aria-hidden="true" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Questions about the research? Read the{" "}
          <Link to="/about" className="font-semibold text-teal-deep underline underline-offset-4">
            study background
          </Link>{" "}
          or the{" "}
          <Link to="/privacy" className="font-semibold text-teal-deep underline underline-offset-4">
            privacy notice
          </Link>
          .
        </p>
      </section>
    </>
  );
}

// Input is kept so the exported type stays accurate; untracked.
export type { SurveyFormValues };

// Keep the Input import used if a future step needs free text.
void Input;
