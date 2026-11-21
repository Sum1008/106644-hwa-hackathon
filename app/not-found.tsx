import { PawPrint } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-teal-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-coral-100/70 blur-3xl" />
      <Container className="relative flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-700">
          <PawPrint className="h-7 w-7" />
        </span>
        <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
          404 · Trail lost
        </p>
        <h1 className="mt-3 max-w-xl text-4xl leading-tight sm:text-5xl">
          This trail went cold.
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal-600">
          The page you were following is not here. Head back home and pick up a
          fresh scent.
        </p>
        <ButtonLink href="/" size="lg" className="mt-8">
          Back to Sniffari
        </ButtonLink>
      </Container>
    </section>
  );
}
