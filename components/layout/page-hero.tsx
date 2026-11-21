import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-sand-200 bg-cream-100/60 py-14 sm:py-20">
      <Container>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl break-words font-display text-[2.25rem] font-bold leading-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal-600">
          {intro}
        </p>
        {children}
      </Container>
    </section>
  );
}
