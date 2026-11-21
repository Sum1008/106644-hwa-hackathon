import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#levels", label: "Levels" },
      { href: "/#products", label: "The range" },
    ],
  },
  {
    title: "The range",
    links: [
      { href: "/#products", label: "Starter Kit" },
      { href: "/#products", label: "Explore Kit" },
      { href: "/#products", label: "Scents & add-ons" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-sand-200 bg-cream-100/60">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-charcoal-600">
              {site.description}
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
              {site.tagline}
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-400">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-charcoal-600 transition-colors hover:text-teal-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-sand-200 pt-6 text-xs text-charcoal-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sniffari. A happier home alone.</p>
          <p>Designed for curious noses.</p>
        </div>
      </Container>
    </footer>
  );
}
