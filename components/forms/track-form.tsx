"use client";

import { useState } from "react";
import { Loader2, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";
import { formatINR } from "@/lib/pricing";

interface TrackedOrder {
  id: string;
  trackingId: string;
  status: string;
  createdAt: string;
  estimatedDelivery: string;
  total: number;
  items: { name: string; quantity: number; variantLabel?: string }[];
  shipping: { city: string; state: string };
  tracking: { status: string; at: string; note: string }[];
}

const inputClass =
  "mt-1.5 h-11 w-full rounded-2xl border border-sand-300 bg-cream-50 px-3.5 text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20";
const labelClass =
  "block text-xs font-semibold uppercase tracking-wide text-charcoal-600";

export function TrackForm({
  defaultOrderId,
  defaultEmail,
}: {
  defaultOrderId?: string;
  defaultEmail?: string;
}) {
  const [orderId, setOrderId] = useState(defaultOrderId ?? "");
  const [email, setEmail] = useState(defaultEmail ?? "");
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function lookup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setOrder(null);
    setLoading(true);

    try {
      const response = await fetch(
        `/api/orders/${encodeURIComponent(orderId.trim())}?email=${encodeURIComponent(email.trim())}`,
        { cache: "no-store" },
      );
      const payload = (await response.json().catch(() => null)) as {
        order?: TrackedOrder;
        error?: { message?: string };
      } | null;

      if (!response.ok || !payload?.order) {
        setError(payload?.error?.message ?? "We couldn’t find that order.");
        return;
      }

      setOrder(payload.order);
    } catch {
      setError("We couldn’t reach the tracking service. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={lookup}
        className="rounded-3xl border border-sand-200 bg-cream-50 p-5 shadow-soft sm:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <div>
            <label htmlFor="orderId" className={labelClass}>
              Order ID
            </label>
            <input
              id="orderId"
              value={orderId}
              onChange={(event) => setOrderId(event.target.value)}
              placeholder="SNF-261121-ABCDE"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="trackEmail" className={labelClass}>
              Email
            </label>
            <input
              id="trackEmail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className={inputClass}
              required
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Looking…
              </>
            ) : (
              <>
                <PackageSearch className="h-4 w-4" aria-hidden="true" />
                Track
              </>
            )}
          </Button>
        </div>

        {error ? (
          <p
            className="mt-4 rounded-2xl bg-coral-100 p-3 text-xs font-medium text-coral-600"
            role="alert"
          >
            {error}
          </p>
        ) : null}
      </form>

      {order ? (
        <div className="rounded-3xl border border-sand-200 bg-cream-50 p-6 shadow-soft sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">
                Order
              </p>
              <p className="mt-1 font-display text-2xl font-bold">{order.id}</p>
              <p className="mt-1 text-xs text-charcoal-400">
                {order.trackingId ? (
                  <>
                    Tracking ID{" "}
                    <span className="font-semibold text-teal-800">
                      {order.trackingId}
                    </span>
                  </>
                ) : (
                  "Tracking ID available on your order receipt"
                )}
              </p>
              <p className="mt-1 text-xs text-charcoal-400">
                Placed {formatDate(order.createdAt)} · delivering to{" "}
                {order.shipping.city}, {order.shipping.state}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold capitalize text-teal-800">
                {order.status}
              </span>
              <p className="mt-2 font-display text-xl font-bold text-teal-800">
                {formatINR(order.total)}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-cream-100/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">
              Estimated delivery
            </p>
            <p className="mt-1 text-sm font-semibold">
              {formatDate(order.estimatedDelivery)}
            </p>
          </div>

          <ul className="mt-5 space-y-2 text-sm text-charcoal-600">
            {order.items.map((item, index) => (
              <li
                key={`${item.name}-${index}`}
                className="flex justify-between gap-4 border-b border-sand-200 pb-2 last:border-0"
              >
                <span>
                  {item.name}
                  {item.variantLabel ? ` — ${item.variantLabel}` : ""}
                </span>
                <span className="shrink-0 font-medium">× {item.quantity}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-6 font-display text-lg font-bold">Progress</h2>
          <ol className="mt-4 space-y-4">
            {order.tracking.map((event, index) => (
              <li key={`${event.status}-${event.at}`} className="flex gap-3">
                <span
                  className={cn(
                    "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                    index === 0
                      ? "bg-teal-700 text-cream-50"
                      : "bg-teal-50 text-teal-700",
                  )}
                >
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold capitalize">
                    {event.status}
                  </p>
                  <p className="text-xs text-charcoal-400">
                    {formatDate(event.at)}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-600">
                    {event.note}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
