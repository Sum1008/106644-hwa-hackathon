import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/checkout-view";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Sniffari order with Pay on Delivery.",
};

export default function CheckoutPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
            Almost there
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Checkout.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-charcoal-600">
            Add your delivery details and pay when your Sniffari order arrives.
          </p>
        </div>

        <div className="mt-10">
          <CheckoutView />
        </div>
      </Container>
    </section>
  );
}
