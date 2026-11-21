import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  Home,
  PackageCheck,
  Truck,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PrintButton } from "@/components/order/print-button";
import { formatDate } from "@/lib/format";
import { getOrder } from "@/lib/orders";
import { formatINR } from "@/lib/pricing";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ placed?: string }>;
}) {
  const { id } = await params;
  const { placed } = await searchParams;
  const order = await getOrder(id);
  if (!order) notFound();

  const placedNow = placed === "1";

  return (
    <>
      <section className="border-b border-sand-200 bg-cream-100/60 py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl">
            {placedNow ? (
              <p className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-teal-800">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                Order placed
              </p>
            ) : null}
            <h1 className="mt-4 break-words font-display text-[2.25rem] font-bold leading-tight sm:text-5xl">
              {placedNow
                ? `Thank you, ${order.customer.firstName}.`
                : `Order ${order.id}`}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-charcoal-600">
              {placedNow
                ? "Your Sniffari order is confirmed. We’ll pack it, and your tracking ID below shows the status as the parcel moves."
                : "Here are the details we have for this order."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-charcoal-600">
              <span className="rounded-full bg-cream-50 px-3 py-1.5 font-semibold">
                Order {order.id}
              </span>
              {order.trackingId ? (
                <span className="rounded-full bg-teal-50 px-3 py-1.5 font-semibold text-teal-800">
                  Tracking {order.trackingId}
                </span>
              ) : null}
              <span className="rounded-full bg-cream-50 px-3 py-1.5">
                Placed {formatDate(order.createdAt)}
              </span>
              <span className="rounded-full bg-cream-50 px-3 py-1.5">
                Estimated delivery {formatDate(order.estimatedDelivery)}
              </span>
            </div>
            <div className="mt-6 flex flex-col gap-3 print:hidden sm:flex-row sm:flex-wrap">
              <ButtonLink href="/shop" className="w-full sm:w-auto">
                Continue shopping
              </ButtonLink>
              <PrintButton />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="space-y-6">
            <div className="rounded-3xl border border-sand-200 bg-cream-50 p-5 shadow-soft sm:p-8">
              <h2 className="font-display text-xl font-bold">Items</h2>
              <ul className="mt-5 space-y-4">
                {order.items.map((item) => (
                  <li
                    key={`${item.productId}-${item.variantId ?? ""}`}
                    className="flex min-w-0 gap-3 sm:gap-4"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-cream-100 sm:h-16 sm:w-16">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{item.name}</p>
                      {item.variantLabel ? (
                        <p className="text-xs text-charcoal-400">
                          {item.variantLabel}
                        </p>
                      ) : null}
                      <p className="text-xs text-charcoal-400">
                        Qty {item.quantity} · {formatINR(item.unitPrice)} each
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold">
                      {formatINR(item.lineTotal)}
                    </p>
                  </li>
                ))}
              </ul>

              <dl className="mt-6 space-y-3 border-t border-sand-200 pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-charcoal-600">Subtotal</dt>
                  <dd className="font-semibold">{formatINR(order.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-charcoal-600">Delivery</dt>
                  <dd className="font-semibold text-teal-700">Free</dd>
                </div>
                <div className="flex justify-between border-t border-sand-200 pt-3 text-base">
                  <dt className="font-semibold">Total</dt>
                  <dd className="font-display text-xl font-bold text-teal-800">
                    {formatINR(order.total)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-sand-200 bg-cream-50 p-6 shadow-soft">
                <h2 className="font-display text-lg font-bold">
                  Delivering to
                </h2>
                <address className="mt-3 space-y-1 text-sm not-italic leading-relaxed text-charcoal-600">
                  <p className="font-semibold text-charcoal-900">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                  <p>{order.shipping.addressLine1}</p>
                  {order.shipping.addressLine2 ? (
                    <p>{order.shipping.addressLine2}</p>
                  ) : null}
                  <p>
                    {order.shipping.city}, {order.shipping.state}{" "}
                    {order.shipping.pincode}
                  </p>
                  <p>{order.shipping.country}</p>
                  <p className="pt-2">{order.customer.phone}</p>
                  <p>{order.customer.email}</p>
                </address>
              </div>

              <div className="rounded-3xl border border-sand-200 bg-cream-50 p-6 shadow-soft">
                <h2 className="font-display text-lg font-bold">
                  Payment & tracking
                </h2>
                <div className="mt-3 space-y-3 text-sm text-charcoal-600">
                  <p className="flex items-center gap-2">
                    <Truck
                      className="h-4 w-4 text-teal-700"
                      aria-hidden="true"
                    />
                    Pay on Delivery
                  </p>
                  <p className="flex items-center gap-2">
                    <PackageCheck
                      className="h-4 w-4 text-teal-700"
                      aria-hidden="true"
                    />
                    Status: <span className="capitalize">{order.status}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Home
                      className="h-4 w-4 text-teal-700"
                      aria-hidden="true"
                    />
                    Estimated {formatDate(order.estimatedDelivery)}
                  </p>
                </div>
                <p className="mt-4 text-xs text-charcoal-400">
                  Track this order any time with your order ID and email.
                </p>
                <Link
                  href={`/track?order=${order.id}&email=${encodeURIComponent(order.customer.email)}`}
                  className="mt-3 inline-flex text-xs font-semibold text-teal-700 hover:underline print:hidden"
                >
                  Open tracking
                </Link>
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-sand-200 bg-cream-50 p-6 shadow-soft print:hidden">
            <h2 className="font-display text-xl font-bold">
              What happens next
            </h2>
            <ol className="mt-5 space-y-4">
              {[
                {
                  title: "We pack your order",
                  body: "Pods, hub, and scents are checked and packed by hand.",
                },
                {
                  title: "It gets a tracking ID",
                  body: order.trackingId
                    ? `Your tracking ID ${order.trackingId} follows the parcel from our shelf to your door.`
                    : "Your tracking ID follows the parcel from our shelf to your door.",
                },
                {
                  title: "Pay on delivery",
                  body: "Pay cash or UPI when the parcel arrives.",
                },
              ].map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-cream-50">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{step.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-charcoal-600">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-6 border-t border-sand-200 pt-4">
              <p className="text-xs text-charcoal-400">
                Need help? Keep your order ID and tracking ID handy, then use the
                tracking page.
              </p>
              <ButtonLink
                href="/track"
                variant="secondary"
                size="sm"
                className="mt-3 w-full"
              >
                Track an order
              </ButtonLink>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
