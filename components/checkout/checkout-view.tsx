"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Loader2,
  LockKeyhole,
  Truck,
} from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/cn";
import {
  formatINR,
  getCartSubtotal,
  resolveCartLines,
} from "@/lib/pricing";
import {
  checkoutFormSchema,
  type CheckoutFormValues,
} from "@/lib/validation";

const inputClass =
  "mt-1.5 h-11 w-full rounded-2xl border border-sand-300 bg-cream-50 px-3.5 text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20";
const labelClass =
  "block text-xs font-semibold uppercase tracking-wide text-charcoal-600";
const errorClass = "mt-1 text-xs font-medium text-coral-600";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className={errorClass} role="alert">
      {message}
    </p>
  );
}

export function CheckoutView() {
  const router = useRouter();
  const { lines, isHydrated, itemCount, clearCart } = useCart();
  const resolved = resolveCartLines(lines);
  const subtotal = getCartSubtotal(resolved);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const clientOrderId = useRef<string | null>(null);

  useEffect(() => {
    if (!clientOrderId.current) {
      clientOrderId.current = crypto.randomUUID();
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
  });

  async function onSubmit(values: CheckoutFormValues) {
    setSubmitError(null);
    if (!clientOrderId.current) {
      clientOrderId.current = crypto.randomUUID();
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientOrderId: clientOrderId.current,
          items: lines.map((line) => ({
            productId: line.productId,
            variantId: line.variantId,
            quantity: line.quantity,
          })),
          customer: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
          },
          shipping: {
            addressLine1: values.addressLine1,
            addressLine2: values.addressLine2 || undefined,
            city: values.city,
            state: values.state,
            pincode: values.pincode,
            country: "India",
          },
          paymentMethod: "cod",
          notes: values.notes || undefined,
          website: "",
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        order?: { id: string };
        error?: { message?: string };
      } | null;

      if (!response.ok || !payload?.order?.id) {
        setSubmitError(
          payload?.error?.message ??
            "We couldn’t place your order. Please check your details and try again.",
        );
        return;
      }

      setIsRedirecting(true);
      clearCart();
      router.push(`/order/${payload.order.id}?placed=1`);
    } catch {
      setIsRedirecting(false);
      setSubmitError(
        "We couldn’t reach the checkout. Please check your connection and try again.",
      );
    }
  }

  if (isRedirecting) {
    return (
      <div className="rounded-4xl border border-sand-200 bg-cream-50 p-8 text-center shadow-soft sm:p-14">
        <h2 className="font-display text-2xl font-bold">
          Your order is placed.
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-charcoal-600">
          Taking you to your order confirmation…
        </p>
        <Loader2
          className="mx-auto mt-6 h-6 w-6 animate-spin text-teal-700"
          aria-hidden="true"
        />
      </div>
    );
  }

  if (isHydrated && resolved.length === 0) {
    return (
      <div className="rounded-4xl border border-sand-200 bg-cream-50 p-8 text-center shadow-soft sm:p-14">
        <h2 className="font-display text-2xl font-bold">
          There’s nothing to check out yet.
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-charcoal-600">
          Add a kit or a refill to your cart, then come back here.
        </p>
        <ButtonLink href="/shop" size="lg" className="mt-6">
          Shop the range
        </ButtonLink>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start"
    >
      <div className="space-y-6">
        <section className="rounded-3xl border border-sand-200 bg-cream-50 p-6 shadow-soft sm:p-8">
          <h2 className="font-display text-xl font-bold">Contact</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className={labelClass}>
                First name
              </label>
              <input
                id="firstName"
                autoComplete="given-name"
                className={inputClass}
                aria-invalid={Boolean(errors.firstName)}
                {...register("firstName")}
              />
              <FieldError message={errors.firstName?.message} />
            </div>
            <div>
              <label htmlFor="lastName" className={labelClass}>
                Last name
              </label>
              <input
                id="lastName"
                autoComplete="family-name"
                className={inputClass}
                aria-invalid={Boolean(errors.lastName)}
                {...register("lastName")}
              />
              <FieldError message={errors.lastName?.message} />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                className={inputClass}
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />
              <FieldError message={errors.email?.message} />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+91 98765 43210"
                className={inputClass}
                aria-invalid={Boolean(errors.phone)}
                {...register("phone")}
              />
              <FieldError message={errors.phone?.message} />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-sand-200 bg-cream-50 p-6 shadow-soft sm:p-8">
          <h2 className="font-display text-xl font-bold">Delivery address</h2>
          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="addressLine1" className={labelClass}>
                Address
              </label>
              <input
                id="addressLine1"
                autoComplete="address-line1"
                className={inputClass}
                aria-invalid={Boolean(errors.addressLine1)}
                {...register("addressLine1")}
              />
              <FieldError message={errors.addressLine1?.message} />
            </div>
            <div>
              <label htmlFor="addressLine2" className={labelClass}>
                Apartment, floor, landmark (optional)
              </label>
              <input
                id="addressLine2"
                autoComplete="address-line2"
                className={inputClass}
                {...register("addressLine2")}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="city" className={labelClass}>
                  City
                </label>
                <input
                  id="city"
                  autoComplete="address-level2"
                  className={inputClass}
                  aria-invalid={Boolean(errors.city)}
                  {...register("city")}
                />
                <FieldError message={errors.city?.message} />
              </div>
              <div>
                <label htmlFor="state" className={labelClass}>
                  State
                </label>
                <input
                  id="state"
                  autoComplete="address-level1"
                  className={inputClass}
                  aria-invalid={Boolean(errors.state)}
                  {...register("state")}
                />
                <FieldError message={errors.state?.message} />
              </div>
              <div>
                <label htmlFor="pincode" className={labelClass}>
                  Pincode
                </label>
                <input
                  id="pincode"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  maxLength={6}
                  className={inputClass}
                  aria-invalid={Boolean(errors.pincode)}
                  {...register("pincode")}
                />
                <FieldError message={errors.pincode?.message} />
              </div>
              <div>
                <span className={labelClass}>Country</span>
                <p className="mt-1.5 flex h-11 items-center rounded-2xl border border-sand-200 bg-cream-100/60 px-3.5 text-sm text-charcoal-600">
                  India
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-sand-200 bg-cream-50 p-6 shadow-soft sm:p-8">
          <h2 className="font-display text-xl font-bold">Payment</h2>
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-teal-700 bg-teal-50 p-4">
            <Truck
              className="mt-0.5 h-5 w-5 shrink-0 text-teal-700"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-semibold">Pay on Delivery</p>
              <p className="mt-1 text-xs leading-relaxed text-charcoal-600">
                Pay cash or UPI when your order arrives. No card needed.
              </p>
            </div>
            <span className="ml-auto shrink-0 rounded-full bg-teal-700 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-cream-50">
              Selected
            </span>
          </div>

          <div className="mt-5">
            <label htmlFor="notes" className={labelClass}>
              Order notes (optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              className={cn(inputClass, "h-auto py-3")}
              placeholder="Gate code, delivery instructions, or a note for us."
              {...register("notes")}
            />
            <FieldError message={errors.notes?.message} />
          </div>
        </section>
      </div>

      <aside className="rounded-3xl border border-sand-200 bg-cream-50 p-6 shadow-soft lg:sticky lg:top-24">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-bold">Your order</h2>
          <Link
            href="/cart"
            className="text-xs font-semibold text-teal-700 hover:underline"
          >
            Edit
          </Link>
        </div>

        {isHydrated ? (
          <ul className="mt-5 space-y-4">
            {resolved.map((line) => (
              <li
                key={`${line.product.id}-${line.variantId ?? ""}`}
                className="flex gap-3"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-cream-100">
                  <Image
                    src={line.image}
                    alt={line.product.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{line.product.name}</p>
                  {line.variantLabel ? (
                    <p className="text-xs text-charcoal-400">
                      {line.variantLabel}
                    </p>
                  ) : null}
                  <p className="text-xs text-charcoal-400">
                    Qty {line.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold">
                  {formatINR(line.lineTotal)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 text-sm text-charcoal-400">
            Loading your cart items…
          </p>
        )}

        <dl className="mt-5 space-y-3 border-t border-sand-200 pt-4 text-sm">
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

        {submitError ? (
          <p
            className="mt-4 rounded-2xl bg-coral-100 p-3 text-xs font-medium text-coral-600"
            role="alert"
          >
            {submitError}
          </p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          className="mt-5 w-full"
          disabled={isSubmitting || !isHydrated}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Placing order…
            </>
          ) : !isHydrated ? (
            "Loading checkout…"
          ) : (
            <>
              Place order · {formatINR(subtotal)}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-charcoal-400">
          <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
          Your details are only used for this order.
        </p>
        <p className="mt-2 text-center text-xs text-charcoal-400">
          By placing an order you agree to our terms.
        </p>
      </aside>
    </form>
  );
}
