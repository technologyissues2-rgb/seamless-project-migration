import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { HeartPulse, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/health-effects", label: "Health Effects" },
  { to: "/socio-economic-effects", label: "Socio-Economic" },
  { to: "/findings", label: "Findings" },
  { to: "/resources", label: "Resources" },
] as const;

function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="Youth Wellbeing Research — home"
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-teal text-teal-foreground shadow-sm">
        <HeartPulse className="size-5" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-[15px] font-semibold text-foreground">
          Youth Wellbeing Research
        </span>
        <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Healthier Youth. Stronger Communities.
        </span>
      </span>
    </Link>
  );
}

function isActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <BrandMark />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                isActive(pathname, link.to)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild className="bg-teal text-teal-foreground hover:bg-teal-deep">
            <Link to="/survey">Take Survey</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button asChild size="sm" className="bg-teal text-teal-foreground hover:bg-teal-deep">
            <Link to="/survey">Take Survey</Link>
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open navigation menu">
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <div className="mt-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive(pathname, link.to)
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="my-2 border-t border-border" />
                <Link
                  to="/references"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  References
                </Link>
                <Link
                  to="/privacy"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Privacy
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Login
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
