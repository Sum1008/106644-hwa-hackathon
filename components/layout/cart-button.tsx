"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function CartButton() {
  const { itemCount, isHydrated } = useCart();
  const label =
    isHydrated && itemCount > 0
      ? `Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`
      : "Cart";

  return (
    <Link
      href="/cart"
      aria-label={label}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-charcoal-900/15 bg-cream-50 text-charcoal-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-700/40 hover:bg-teal-50 hover:shadow-soft"
    >
      <ShoppingBag className="h-5 w-5" aria-hidden="true" />
      {isHydrated && itemCount > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-coral-500 px-1 text-[11px] font-bold text-charcoal-900 shadow-sm ring-2 ring-cream-50">
          {itemCount}
        </span>
      ) : null}
    </Link>
  );
}
