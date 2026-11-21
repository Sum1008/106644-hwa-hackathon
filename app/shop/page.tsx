import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";
import { Reveal } from "@/components/ui/reveal";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop Sniffari kits, extra pods, weighted floor stands, and refill scents. Free delivery across India with Pay on Delivery.",
};

export default function ShopPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-sand-200 bg-cream-100/60 py-14 sm:py-24">
        <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-coral-100/55 blur-3xl" />
        <Container className="relative">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-teal-700">
              The Sniffari range
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-[2.75rem] font-medium leading-[0.98] tracking-[-0.045em] sm:text-6xl">
              A scent trail for every home.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-charcoal-600">
              Start with a kit, add rooms as you go, and keep the trail new with
              refill scents. Every order is delivered free across India and paid
              on delivery.
            </p>
            <div className="mt-7 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-charcoal-600">
              <span className="rounded-full border border-sand-200 bg-cream-50 px-3.5 py-2">
                Free delivery
              </span>
              <span className="rounded-full border border-sand-200 bg-cream-50 px-3.5 py-2">
                Pay on Delivery
              </span>
              <span className="rounded-full border border-sand-200 bg-cream-50 px-3.5 py-2">
                30-day returns
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-14 sm:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <Reveal key={product.id} delay={(index % 3) * 90}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 rounded-[1.75rem] border border-sand-200 bg-teal-50/60 p-7 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700">
                  A considered beginning
                </p>
                <h2 className="mt-3 font-display text-3xl font-medium tracking-[-0.025em]">
                  Not sure where to start?
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-charcoal-600">
                  The Starter Kit gives you three pods, three food scents, and
                  both beginner levels. Add rooms and scents later.
                </p>
              </div>
              <ButtonLink href="/products/starter-kit" className="shrink-0">
                See the Starter Kit
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
