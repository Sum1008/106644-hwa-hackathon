"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/context/toast-context";
import { cn } from "@/lib/cn";
import { MAX_LINE_QUANTITY, formatINR } from "@/lib/pricing";
import type { Product } from "@/types/commerce";

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [variantId, setVariantId] = useState<string | undefined>(
    product.variants?.[0]?.id,
  );
  const [error, setError] = useState<string | null>(null);

  function handleAdd(goToCheckout: boolean) {
    if (product.variants?.length && !variantId) {
      setError("Choose a scent first.");
      return;
    }

    setError(null);
    addItem(product.id, quantity, variantId);

    if (goToCheckout) {
      router.push("/checkout");
      return;
    }

    const variant = product.variants?.find((item) => item.id === variantId);
    toast({
      message: `${product.name}${variant ? ` · ${variant.label}` : ""}`,
      image: product.images[0]?.src,
      href: "/cart",
      label: "View cart",
    });
  }

  return (
    <div className="space-y-5">
      {product.variants?.length ? (
        <fieldset>
          <legend className="text-sm font-semibold text-charcoal-900">
            Choose a scent
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {product.variants.map((variant) => {
              const selected = variantId === variant.id;
              return (
                <label
                  key={variant.id}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-3 text-sm transition-colors",
                    selected
                      ? "border-teal-700 bg-teal-50 text-teal-800"
                      : "border-sand-200 bg-cream-50 text-charcoal-700 hover:border-teal-700/40",
                  )}
                >
                  <input
                    type="radio"
                    name="variant"
                    value={variant.id}
                    checked={selected}
                    onChange={() => setVariantId(variant.id)}
                    className="sr-only"
                  />
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-medium">{variant.label}</span>
                    {variant.priceDelta ? (
                      <span className="text-xs">
                        {formatINR(product.price + variant.priceDelta)}
                      </span>
                    ) : null}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <div className="grid grid-cols-2 items-stretch gap-3 sm:flex sm:flex-wrap sm:items-center">
        <div className="col-span-2 inline-flex h-12 w-full items-center justify-between rounded-full border border-charcoal-900/15 bg-cream-50 sm:w-auto sm:justify-start">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            aria-label="Decrease quantity"
            className="flex h-12 w-11 items-center justify-center rounded-full text-charcoal-700 transition-colors hover:bg-charcoal-900/5"
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
          <span
            className="w-8 text-center text-sm font-semibold"
            aria-live="polite"
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() =>
              setQuantity((value) => Math.min(MAX_LINE_QUANTITY, value + 1))
            }
            aria-label="Increase quantity"
            className="flex h-12 w-11 items-center justify-center rounded-full text-charcoal-700 transition-colors hover:bg-charcoal-900/5"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <Button
          onClick={() => handleAdd(false)}
          size="lg"
          className="w-full min-w-0 px-3 sm:flex-none sm:px-7"
        >
          Add to cart
        </Button>
        <Button
          onClick={() => handleAdd(true)}
          size="lg"
          variant="coral"
          className="w-full min-w-0 px-3 sm:flex-none sm:px-7"
        >
          Buy now
        </Button>
      </div>

      {error ? (
        <p className="text-sm font-medium text-coral-600" role="alert">
          {error}
        </p>
      ) : null}

      <p className="text-xs text-charcoal-400">
        Free delivery across India · Pay on Delivery
      </p>
    </div>
  );
}
