import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, PackageSearch, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Sniffari about orders, products, returns, or anything else. We reply within one to two working days.",
};

const details = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@sniffari.in",
    note: "We reply within 1–2 working days",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    note: "Mon–Sat, 10am to 6pm IST",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "Indiranagar, Bengaluru 560038",
    note: "Karnataka, India",
  },
  {
    icon: PackageSearch,
    label: "Order status",
    value: "Use the tracking page",
    note: "Order ID + email from checkout",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Talk to us"
        title="We’re a small team. We read every message."
        intro="Questions about a kit, a scent pack, or an order that’s on its way? Send us a note and we’ll sort it out. For a live order status, the tracking page is the fastest route."
      />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-4">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="flex gap-4 rounded-3xl border border-sand-200 bg-cream-50 p-5 shadow-soft"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                  <detail.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">
                    {detail.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-charcoal-900">
                    {detail.label === "Order status" ? (
                      <Link
                        href="/track"
                        className="text-teal-700 underline underline-offset-4"
                      >
                        {detail.value}
                      </Link>
                    ) : (
                      detail.value
                    )}
                  </p>
                  <p className="mt-1 text-xs text-charcoal-600">{detail.note}</p>
                </div>
              </div>
            ))}

            <div className="flex items-start gap-3 rounded-3xl border border-sand-200 bg-teal-50/60 p-5">
              <Clock
                className="mt-0.5 h-4 w-4 shrink-0 text-teal-700"
                aria-hidden="true"
              />
              <p className="text-xs leading-relaxed text-charcoal-600">
                We answer order questions fastest when you include your order ID
                — it’s the code on your confirmation page, starting with
                <span className="font-semibold text-charcoal-900"> SNF-</span>.
              </p>
            </div>
          </div>

          <ContactForm />
        </Container>
      </section>
    </>
  );
}
