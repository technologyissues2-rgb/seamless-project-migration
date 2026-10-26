import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, intro, children }: PageHeroProps) {
  return (
    <section className="band-navy text-navy-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-[2.6rem]">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-foreground/80 sm:text-lg">
          {intro}
        </p>
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </section>
  );
}
