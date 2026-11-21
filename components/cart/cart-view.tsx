"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { formatINR, getCartSubtotal, resolveCartLines } from "@/lib/pricing";

export function CartView() {
  const { lines, isHydrated, itemCount, updateQuantity, removeItem } =
    useCart();
  const resolved = resolveCartLines(lines);
  const subtotal = getCartSubtotal(resolved);

  if (!isHydrated) {
    return (
      <div className="rounded-4xl border border-sand-200 bg-cream-50 p-10 text-center text-sm text-charcoal-400">
        Loading your cart…
      </div>
    );
  }

  if (resolved.length === 0) {
    return (
      <div className="rounded-4xl border border-sand-200 bg-cream-50 p-8 text-center shadow-soft sm:p-14">
        <h2 className="font-display text-2xl font-bold">Your cart is empty.</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-charcoal-600">
          Start with a kit and give your dog a trail to follow.
        </p>
        <ButtonLink href="/shop" size="lg" className="mt-6">
          Shop the range
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
      <ul className="space-y-4">
        {resolved.map((line) => {
          const key = `${line.product.id}-${line.variantId ?? ""}`;
          return (
            <li
              key={key}
              className="flex gap-3 rounded-3xl border border-sand-200 bg-cream-50 p-3 shadow-soft sm:gap-4 sm:p-5"
            >
              <Link
                href={`/products/${line.product.slug}`}
                className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-cream-100 sm:h-28 sm:w-28"
              >
                <Image
                  src={line.image}
                  alt={line.product.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold">
                      <Link
                        href={`/products/${line.product.slug}`}
                        className="hover:text-teal-700"
                      >
                        {line.product.name}
                      </Link>
                    </h3>
                    {line.variantLabel ? (
                      <p className="text-xs text-charcoal-400">
                        {line.variantLabel}
                      </p>
                    ) : null}
                    <p className="mt-1 text-xs text-charcoal-600">
                      {formatINR(line.unitPrice)} each
                    </p>
                  </div>
                  <p className="whitespace-nowrap font-display text-lg font-bold text-teal-800 sm:pt-0.5">
                    {formatINR(line.lineTotal)}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                  <div className="inline-flex h-9 items-center rounded-full border border-charcoal-900/15">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          line.product.id,
                          line.variantId,
                          line.quantity - 1,
                        )
                      }
                      aria-label={`Decrease ${line.product.name} quantity`}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal-700 hover:bg-charcoal-900/5"
                    >
                      <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <span className="w-7 text-center text-sm font-semibold">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          line.product.id,
                          line.variantId,
                          line.quantity + 1,
                        )
                      }
                      aria-label={`Increase ${line.product.name} quantity`}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal-700 hover:bg-charcoal-900/5"
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeItem(line.product.id, line.variantId)
                    }
                    className="inline-flex items-center gap-1 text-xs font-medium text-charcoal-400 transition-colors hover:text-coral-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <aside className="rounded-3xl border border-sand-200 bg-cream-50 p-5 shadow-soft sm:p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-xl font-bold">Order summary</h2>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-charcoal-600">
              Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
            </dt>
            <dd className="font-semibold">{formatINR(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-charcoal-600">Delivery</dt>
            <dd className="font-semibold text-teal-700">Free</dd>
          </div>
          <div className="flex justify-between border-t border-sand-200 pt-3 text-base">
            <dt className="font-semibold">Total</dt>
            <dd className="font-display text-xl font-bold text-teal-800">
              {formatINR(subtotal)}
            </dd>
          </div>
        </dl>

        <ButtonLink href="/checkout" size="lg" className="mt-6 w-full">
          Checkout
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
        <ButtonLink
          href="/shop"
          variant="ghost"
          size="sm"
          className="mt-2 w-full"
        >
          Continue shopping
        </ButtonLink>
        <p className="mt-4 text-center text-xs text-charcoal-400">
          Pay on Delivery · Free delivery across India
        </p>
      </aside>
    </div>
  );
}
