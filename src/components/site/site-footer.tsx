import { Link } from "@tanstack/react-router";
import { HeartPulse, Mail } from "lucide-react";

const QUICK_LINKS = [
  { to: "/about", label: "About the Research" },
  { to: "/health-effects", label: "Health Effects" },
  { to: "/socio-economic-effects", label: "Socio-Economic Effects" },
  { to: "/findings", label: "Research Findings" },
  { to: "/survey", label: "Take the Survey" },
] as const;

const MORE_LINKS = [
  { to: "/resources", label: "Prevention & Resources" },
  { to: "/references", label: "References" },
  { to: "/privacy", label: "Privacy & Ethics" },
  { to: "/login", label: "Admin Login" },
] as const;

export function SiteFooter() {
  return (
    <footer className="band-navy text-navy-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-teal text-teal-foreground">
              <HeartPulse className="size-5" aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-semibold">
              Youth Wellbeing Research
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-foreground/75">
            Healthier Youth. Stronger Communities. An independent research initiative
            studying the socio-economic and health-related effects of substance abuse
            among young people.
          </p>
          <p className="mt-4 flex items-start gap-2 text-sm text-navy-foreground/75">
            <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              Contact: research@youthwellbeing.example
              <span className="block text-xs text-navy-foreground/50">
                (placeholder — the study team replaces this with its verified address)
              </span>
            </span>
          </p>
        </div>

        <nav aria-label="Footer quick links">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-teal">
            Research
          </h2>
          <ul className="mt-4 space-y-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-navy-foreground/75 transition-colors hover:text-navy-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer secondary links">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-teal">
            More
          </h2>
          <ul className="mt-4 space-y-2.5">
            {MORE_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-navy-foreground/75 transition-colors hover:text-navy-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
          <p className="text-xs leading-relaxed text-navy-foreground/60">
            This platform is for research and education only. It does not provide
            medical diagnosis, treatment, or emergency care — if you or someone you
            know is in immediate danger, contact your local emergency services. Figures
            marked "sample" are demonstration data until verified research results are
            published.
          </p>
          <p className="mt-3 text-xs text-navy-foreground/50">
            © {new Date().getFullYear()} Youth Wellbeing Research. Survey responses are
            anonymous and used for research purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
