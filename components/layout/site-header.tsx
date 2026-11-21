import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { CartButton } from "@/components/layout/cart-button";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-sand-200/70 bg-cream-50/90 shadow-[0_8px_30px_-24px_rgba(36,36,36,0.45)] backdrop-blur-xl">
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
              className="text-xs font-bold uppercase tracking-[0.13em] text-charcoal-600 transition-colors hover:text-teal-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <CartButton />
          <ButtonLink href="/shop" size="sm" className="hidden sm:inline-flex">
            Shop kits
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}
