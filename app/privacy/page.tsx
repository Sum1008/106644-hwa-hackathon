import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Sniffari collects, uses, stores, and protects the information you share with us.",
};

const updated = "21 November 2026";

const sections = [
  {
    title: "What we collect",
    body: [
      "When you place an order we collect the details you type into checkout: your name, email address, phone number, and delivery address. We also record what you ordered, the order value, and the status of the order.",
      "When you contact us we keep the message you send us, along with the name, email, phone number, and order ID you include so we can answer you properly.",
      "Your cart is stored in your own browser using local storage. It never leaves your device unless you place an order.",
    ],
  },
  {
    title: "What we don’t collect",
    body: [
      "Sniffari is Pay on Delivery, so we never ask for card numbers, CVVs, or banking passwords. If anyone contacts you claiming to be from Sniffari and asks for those details, it is not us — please contact us instead.",
      "We do not run advertising trackers on this site, and we do not build advertising profiles of visitors.",
    ],
  },
  {
    title: "How we use your information",
    body: [
      "We use your details to process and deliver your order, to share dispatch and delivery updates with you, to answer your questions, and to handle returns or refunds.",
      "We use your email address for order-related messages about Sniffari. We do not sell your details, and we do not share them with third parties for marketing.",
    ],
  },
  {
    title: "Where your data is stored",
    body: [
      "Order records and contact messages are stored in Vercel Blob, our database for order history. Access is limited to the people who need it to run the shop and support your order.",
      "Your cart, your order ID, and your tracking ID are kept in your browser’s local storage so the site works properly. Clearing your browser data removes them from your device.",
    ],
  },
  {
    title: "How long we keep it",
    body: [
      "We keep order records for as long as we need them for support, returns, and accounting — usually a few years. Contact messages are kept for a shorter period, unless they are part of an ongoing order or dispute.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You can ask us to correct or delete the personal details we hold about you. Write to us and we’ll action it, except where we are required to keep records for legal or accounting reasons.",
      "You can also clear the cart and any locally stored order details at any time by clearing your browser’s site data.",
    ],
  },
  {
    title: "Children",
    body: [
      "Sniffari is a product for adults buying for their dogs. We don’t knowingly collect information from children, and orders placed for a child should be placed by an adult.",
    ],
  },
  {
    title: "Changes to this policy",
    body: [
      "If we update this policy, we’ll change the date at the top of this page. Continuing to use the site after an update means the updated policy applies to new orders.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy Policy"
        intro="We keep the data we need to send your order and support it after delivery — and not much more."
      >
        <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-charcoal-400">
          Last updated {updated}
        </p>
      </PageHero>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <aside className="rounded-3xl border border-sand-200 bg-cream-50 p-6 shadow-soft lg:sticky lg:top-24">
              <h2 className="font-display text-lg font-bold">In this policy</h2>
              <ol className="mt-4 space-y-2 text-sm text-charcoal-600">
                {sections.map((section) => (
                  <li key={section.title}>{section.title}</li>
                ))}
              </ol>
              <p className="mt-5 border-t border-sand-200 pt-4 text-xs text-charcoal-400">
                Questions about your data?{" "}
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
                  Sniffari, in one line
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                  Sniffari is a hub-and-pod scent hunt for dogs, designed for
                  apartments. We sell our own products, ship across India, and
                  collect cash or UPI at the door. See the{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-teal-700 underline underline-offset-4"
                  >
                    terms
                  </Link>{" "}
                  and the{" "}
                  <Link
                    href="/shipping-policy"
                    className="font-semibold text-teal-700 underline underline-offset-4"
                  >
                    shipping & returns policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
