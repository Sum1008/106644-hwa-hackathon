import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Shipping & Returns Policy",
  description:
    "How Sniffari dispatches and delivers across India, what delivery costs, and how returns and refunds work.",
};

const updated = "21 November 2026";

const deliveryRows = [
  { label: "Dispatch time", value: "Within 2–3 working days of ordering" },
  { label: "Delivery estimate", value: "3–7 working days after dispatch" },
  { label: "Delivery cost", value: "Free across India" },
  { label: "Payment", value: "Pay on Delivery — cash or UPI at the door" },
  { label: "Serviceable areas", value: "Serviceable pin codes across India" },
  { label: "Order updates", value: "Live status on the tracking page" },
];

const sections = [
  {
    title: "How we ship",
    body: [
      "Orders are packed by hand in Bengaluru and handed to our courier partner. You receive a tracking ID with your order, and the live status of the parcel is on our tracking page — enter your order ID and the email you used at checkout.",
      "We ship to residential and business addresses on serviceable pin codes. If your pin code isn’t serviceable, we’ll contact you before dispatch and cancel the order with a full refund of anything paid.",
    ],
  },
  {
    title: "Delivery timelines",
    body: [
      "Timelines are estimates in working days, and they start from dispatch rather than from the moment you order. Metro addresses usually land at the faster end of the range, and remote or PIN-code-restricted areas at the slower end.",
      "Delays can happen for reasons outside our control — courier backlogs, weather, holidays, and address issues. If an order hasn’t moved for several days, contact us with your order ID and we’ll chase the courier for you.",
    ],
  },
  {
    title: "Delivery attempts",
    body: [
      "If the courier can’t reach you, they’ll attempt delivery again. Undelivered parcels are returned to us, and any amount paid at delivery is refunded once the parcel is back with us.",
    ],
  },
  {
    title: "Damage or missing items",
    body: [
      "If a parcel arrives damaged or something is missing from the box, contact us within 48 hours of delivery with your order ID and a photo. We’ll arrange a replacement or a refund for the affected item.",
    ],
  },
  {
    title: "Returns",
    body: [
      "Unused items in their original packaging can be returned within 30 days of delivery. Start a return through the contact page and include your order ID so we can arrange a pickup or share a shipping address.",
      "For hygiene and safety, opened scent vials and any pod that has been used with treats can’t be returned, because they can’t be resold. If a kit arrives with a fault in a component, that component is replaced or refunded — that isn’t counted against your return.",
    ],
  },
  {
    title: "Refunds",
    body: [
      "Refunds are processed to the original payment method once the returned item reaches us and has been checked. Most refunds reach you within 7–10 working days of that point.",
      "A complete unused kit is refunded in full. If a kit has been opened and some parts are missing or used, the refund reflects the value of what can be resold.",
    ],
  },
  {
    title: "Cancellations",
    body: [
      "You can cancel an order any time before it is dispatched — contact us with your order ID. After dispatch, the order follows the returns process instead.",
    ],
  },
];

export default function ShippingPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Shipping"
        title="Shipping & Returns Policy"
        intro="How your order leaves our shelf and reaches your door, what delivery costs, and what happens if you need to send something back."
      >
        <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-charcoal-400">
          Last updated {updated}
        </p>
      </PageHero>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <aside className="rounded-3xl border border-sand-200 bg-cream-50 p-6 shadow-soft lg:sticky lg:top-24">
              <h2 className="font-display text-lg font-bold">At a glance</h2>
              <dl className="mt-4 space-y-3 text-sm">
                {deliveryRows.map((row) => (
                  <div key={row.label}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">
                      {row.label}
                    </dt>
                    <dd className="mt-0.5 text-charcoal-700">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/track"
                className="mt-5 inline-flex text-xs font-semibold text-teal-700 underline underline-offset-4"
              >
                Track an order
              </Link>
            </aside>

            <div className="space-y-10">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="font-display text-2xl font-bold">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-sm leading-relaxed text-charcoal-600">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}

              <div className="rounded-3xl border border-sand-200 bg-teal-50/60 p-6">
                <h2 className="font-display text-lg font-bold">
                  Need something resolved?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                  Send us your order ID through the{" "}
                  <Link
                    href="/contact"
                    className="font-semibold text-teal-700 underline underline-offset-4"
                  >
                    contact page
                  </Link>{" "}
                  and we’ll reply within one to two working days. The{" "}
                  <Link
                    href="/faq"
                    className="font-semibold text-teal-700 underline underline-offset-4"
                  >
                    FAQ
                  </Link>{" "}
                  covers the most common questions.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
