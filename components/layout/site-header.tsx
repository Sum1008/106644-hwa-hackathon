import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { CartButton } from "@/components/layout/cart-button";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-sand-200/70 bg-cream-50/90 shadow-[0_8px_30px_-24px_rgba(36,36,36,0.45)] backdrop-blur-xl">
      <Container className="flex min-h-16 items-center justify-between gap-3 py-2 sm:min-h-20 sm:py-0">
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
          <ButtonLink href="/shop" size="sm" className="px-3 sm:px-4">
            Shop
          </ButtonLink>
        </div>
      </Container>

      <nav
        className="overflow-x-auto border-t border-sand-200/60 md:hidden"
        aria-label="Mobile navigation"
      >
        <Container className="flex min-w-max items-center gap-6 py-2.5">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[10px] font-bold uppercase tracking-[0.14em] text-charcoal-600 transition-colors hover:text-teal-700"
            >
              {item.label}
            </Link>
          ))}
        </Container>
      </nav>
    </header>
  );
}
