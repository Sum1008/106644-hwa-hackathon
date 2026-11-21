import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/shop", label: "Shop all" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#levels", label: "Levels" },
    ],
  },
  {
    title: "The range",
    links: [
      { href: "/products/starter-kit", label: "Starter Kit" },
      { href: "/products/explore-kit", label: "Explorer Kit" },
      { href: "/products/extra-pod", label: "Extra Pod" },
      { href: "/products/scent-refill-pack", label: "Scent Refills" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/track", label: "Track order" },
      { href: "/contact", label: "Contact us" },
      { href: "/faq", label: "FAQ" },
      { href: "/cart", label: "Your cart" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms & conditions" },
      { href: "/shipping-policy", label: "Shipping & returns" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-sand-200 bg-charcoal-900 text-cream-50">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-50/65">
              {site.description}
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-100">
              {site.tagline}
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream-50/40">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream-50/65 transition-colors hover:text-teal-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream-50/10 pt-6 text-xs text-cream-50/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sniffari. A happier home alone.</p>
          <p>Designed for curious noses.</p>
        </div>
      </Container>
    </footer>
  );
}
