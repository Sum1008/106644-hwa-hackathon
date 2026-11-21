import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-sand-200/70 bg-cream-50/85 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <Logo priority />

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-charcoal-600 transition-colors hover:text-teal-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <ButtonLink href="/#products" size="sm">
          Shop kits
        </ButtonLink>
      </Container>
    </header>
  );
}
