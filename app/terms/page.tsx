import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that apply when you order Sniffari products, from pricing and delivery to returns and liability.",
};

const updated = "21 November 2026";

const sections = [
  {
    title: "About these terms",
    body: [
      "These terms apply to every order placed through sniffari.in and its checkout. By placing an order you agree to them, along with our privacy policy and shipping & returns policy.",
      "Sniffari is operated as a direct-to-consumer brand selling dog enrichment products. In these terms, “we”, “us”, and “our” mean Sniffari, and “you” means the person placing the order.",
    ],
  },
  {
    title: "Orders and acceptance",
    body: [
      "An order is a request to buy. It becomes a contract when we confirm dispatch. If we cannot fulfil an order — for example if a product is damaged, out of stock, or your pin code is not serviceable — we’ll let you know and refund anything collected.",
      "We may decline an order where we suspect fraud, where details are clearly wrong, or where the order is for resale rather than personal use.",
    ],
  },
  {
    title: "Pricing and payment",
    body: [
      "All prices are in Indian rupees and include applicable taxes. Delivery is free on every order within India.",
      "Sniffari is Pay on Delivery. Payment is made to the courier when the parcel is handed over. If a parcel is returned undelivered, any amount paid at delivery may be refunded to the original payment method after the parcel reaches us.",
    ],
  },
  {
    title: "Product information",
    body: [
      "We describe products, contents, dimensions, and materials as accurately as we can. Screens and photos can shift colour slightly, and images may show the product with props that aren’t included.",
      "Scent refills, pods, hubs, and stands are designed to work together as described. Using components outside their intended use isn’t covered by the product guarantee.",
    ],
  },
  {
    title: "Delivery",
    body: [
      "Delivery timelines are estimates and can be affected by courier networks, weather, and serviceability. Orders are usually dispatched within 2–3 working days, with delivery expected in 3–7 working days after that.",
      "If a parcel is delayed beyond a reasonable period, contact us with your order ID and we’ll investigate with the courier.",
    ],
  },
  {
    title: "Returns and refunds",
    body: [
      "Unused items in their original packaging can be returned within 30 days of delivery. Start a return through the contact page and include your order ID.",
      "Refund amounts depend on what’s returned: a full refund for complete unused kits, and a partial refund for opened or used items. Opened scent vials and used pod treats can’t be returned, because they can’t be resold safely.",
      "Refunds are processed to the original payment method within 7–10 working days of the returned item reaching us.",
    ],
  },
  {
    title: "Acceptable use",
    body: [
      "Sniffari is for enrichment under a responsible owner’s supervision. Don’t leave a dog unsupervised with a pod, keep scent vials away from children and pets, and don’t use the product as a substitute for exercise, training, or veterinary care.",
    ],
  },
  {
    title: "Liability",
    body: [
      "We’re responsible for delivering products that match their description and for handling your order with reasonable care. We’re not liable for indirect or consequential losses, including lost profits, to the extent the law allows.",
      "Nothing in these terms limits your statutory rights as a consumer under Indian law.",
    ],
  },
  {
    title: "Changes and governing law",
    body: [
      "We may update these terms; the date at the top of this page shows the current version. Terms in place when you place an order govern that order.",
      "These terms are governed by the laws of India, and the courts at Bengaluru, Karnataka have jurisdiction.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="Terms & Conditions"
        intro="The plain-English rules for ordering from Sniffari — what you’re buying, what you pay, and what happens if something goes wrong."
      >
        <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-charcoal-400">
          Last updated {updated}
        </p>
      </PageHero>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <aside className="rounded-3xl border border-sand-200 bg-cream-50 p-6 shadow-soft lg:sticky lg:top-24">
              <h2 className="font-display text-lg font-bold">In these terms</h2>
              <ol className="mt-4 space-y-2 text-sm text-charcoal-600">
                {sections.map((section) => (
                  <li key={section.title}>{section.title}</li>
                ))}
              </ol>
              <p className="mt-5 border-t border-sand-200 pt-4 text-xs text-charcoal-400">
                Questions?{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-teal-700 underline underline-offset-4"
                >
                  Contact us
                </Link>
                .
              </p>
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
                  Related reading
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-charcoal-600">
                  <li>
                    <Link
                      href="/shipping-policy"
                      className="font-semibold text-teal-700 underline underline-offset-4"
                    >
                      Shipping & returns policy
                    </Link>{" "}
                    — dispatch times, delivery estimates, and how returns work.
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="font-semibold text-teal-700 underline underline-offset-4"
                    >
                      Privacy policy
                    </Link>{" "}
                    — what we collect and how we handle it.
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="font-semibold text-teal-700 underline underline-offset-4"
                    >
                      FAQ
                    </Link>{" "}
                    — quick answers on products, levels, and orders.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
