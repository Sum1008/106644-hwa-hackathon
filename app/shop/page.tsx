import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop Sniffari kits, extra pods, weighted floor stands, and refill scents. Free delivery across India with Pay on Delivery.",
};

export default function ShopPage() {
  return (
    <>
      <section className="border-b border-sand-200 bg-cream-100/60 py-14 sm:py-20">
        <Container>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
            The Sniffari range
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            A scent trail for every home.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal-600">
            Start with a kit, add rooms as you go, and keep the trail new with
            refill scents. Every order is delivered free across India and paid
            on delivery.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-charcoal-600">
            <span className="rounded-full bg-cream-50 px-3 py-1.5">
              Free delivery
            </span>
            <span className="rounded-full bg-cream-50 px-3 py-1.5">
              Pay on Delivery
            </span>
            <span className="rounded-full bg-cream-50 px-3 py-1.5">
              30-day returns
            </span>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 rounded-4xl border border-sand-200 bg-teal-50/60 p-6 sm:p-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold">
                  Not sure where to start?
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-charcoal-600">
                  The Starter Kit gives you three pods, three food scents, and
                  both beginner levels. Add rooms and scents later.
                </p>
              </div>
              <ButtonLink href="/products/starter-kit">
                See the Starter Kit
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
