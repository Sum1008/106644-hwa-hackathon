import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about Sniffari orders, delivery, scent levels, refills, returns, and tracking.",
};

const groups = [
  {
    title: "Orders & delivery",
    items: [
      {
        question: "How do I place an order?",
        answer:
          "Add a kit or add-on to your cart, go to checkout, fill in your delivery details, and place the order. You do not need an account. Payment is collected when the parcel arrives.",
      },
      {
        question: "Do I pay online?",
        answer:
          "No. Sniffari is Pay on Delivery. You can pay the courier in cash or UPI at the door. We never ask for card or UPI details over the phone or on this site.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "We dispatch within 2–3 working days, and most deliveries land in 3–7 working days after that. Your confirmation page shows the current estimate for your order.",
      },
      {
        question: "Do you deliver everywhere in India?",
        answer:
          "We deliver to serviceable pin codes across India, and delivery is free on every order. If your pin code is not serviceable, we’ll let you know before dispatch.",
      },
    ],
  },
  {
    title: "The game & product",
    items: [
      {
        question: "What’s included in a kit?",
        answer:
          "The Starter Kit has one hub, three scent pods, three wall plates, and three food scent vials. The Explore Kit has one hub, six pods, six wall plates, three food scents, and a Detective scent pack.",
      },
      {
        question: "What are the three levels?",
        answer:
          "Beginner gives a sound cue plus scent. Tracker is scent only, so your dog follows the nose. Detective has every pod puff a scent, but only the target scent releases a reward, so decoys have to be sniffed out.",
      },
      {
        question: "Which kit should I buy?",
        answer:
          "Start with the Starter Kit if you’re trying it for the first time or live in a smaller flat. Go for the Explore Kit if you want six rooms of trail and the Detective level from day one.",
      },
      {
        question: "How do scent refills work?",
        answer:
          "Each refill pack holds three vials. A vial gives you up to 30 hunts before it runs out. Swap scents between rounds so the trail never stays the same for long.",
      },
      {
        question: "Do I need an app?",
        answer:
          "No. The hub coordinates the pods on its own. There is no app to install, no account to create, and no subscription to manage.",
      },
    ],
  },
  {
    title: "Tracking & support",
    items: [
      {
        question: "How do I track my order?",
        answer:
          "Use the tracking page with the order ID from your confirmation page and the email you used at checkout. Your order ID starts with SNF-, and your tracking ID starts with TRK-.",
      },
      {
        question: "What if my order hasn’t arrived?",
        answer:
          "Give us seven working days from dispatch, then contact us with your order ID. If something went wrong with the delivery, we’ll make it right.",
      },
      {
        question: "Can I return something?",
        answer:
          "Yes. Unused items in their original packaging can be returned within 30 days of delivery. Read the full shipping and returns policy before sending anything back.",
      },
      {
        question: "Something arrived damaged",
        answer:
          "Send us a photo along with your order ID through the contact page and we’ll arrange a replacement or a refund for you.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Questions, answered"
        title="Everything you might want to ask."
        intro="If your question isn’t here, send it to us through the contact page — we answer every one, usually within a day or two."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="space-y-12">
            {groups.map((group) => (
              <div key={group.title}>
                <h2 className="font-display text-2xl font-bold sm:text-3xl">
                  {group.title}
                </h2>
                <div className="mt-6 grid gap-4">
                  {group.items.map((item) => (
                    <details
                      key={item.question}
                      className="group rounded-3xl border border-sand-200 bg-cream-50 px-6 py-5 shadow-soft"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-charcoal-900 marker:hidden">
                        {item.question}
                        <ChevronDown
                          className="h-4 w-4 shrink-0 text-teal-700 transition-transform duration-200 group-open:rotate-180"
                          aria-hidden="true"
                        />
                      </summary>
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-charcoal-600">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-5 rounded-4xl border border-sand-200 bg-teal-50/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h2 className="font-display text-2xl font-bold">
                Still stuck on something?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-charcoal-600">
                Send us a message with your order ID if you have one. We’ll get
                back to you within one to two working days.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-teal-700 px-5 text-sm font-semibold text-cream-50 shadow-soft transition-colors hover:bg-teal-800"
            >
              Contact us
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
