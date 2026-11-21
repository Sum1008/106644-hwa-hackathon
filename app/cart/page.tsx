import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your Sniffari kits, pods, and scent refills.",
};

export default function CartPage() {
  return (
    <section className="py-9 sm:py-16">
      <Container>
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
            Your trail
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium leading-tight tracking-[-0.03em] sm:text-5xl">
            Your cart.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-charcoal-600">
            Check your pods and scents, then head to checkout.
          </p>
        </div>

        <div className="mt-7 sm:mt-10">
          <CartView />
        </div>
      </Container>
    </section>
  );
}
