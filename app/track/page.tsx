import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { TrackForm } from "@/components/forms/track-form";

export const metadata: Metadata = {
  title: "Track order",
  description:
    "Track your Sniffari order with your order ID and the email used at checkout.",
};

export default async function TrackPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; email?: string }>;
}) {
  const { order, email } = await searchParams;

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">
            Where’s my trail?
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Track your order.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-charcoal-600">
            Enter your order ID and the email you used at checkout. We’ll show
            you the tracking ID, the latest status, and the delivery estimate.
          </p>
        </div>

        <div className="mt-10 max-w-3xl">
          <TrackForm defaultOrderId={order} defaultEmail={email} />
        </div>
      </Container>
    </section>
  );
}
