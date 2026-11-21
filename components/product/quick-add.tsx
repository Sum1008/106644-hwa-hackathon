"use client";

import { Plus } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/context/toast-context";
import type { Product } from "@/types/commerce";

export function QuickAdd({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toast } = useToast();

  if (product.variants?.length) {
    return (
      <ButtonLink
        href={`/products/${product.slug}`}
        size="sm"
        variant="secondary"
      >
        Choose scent
      </ButtonLink>
    );
  }

  return (
    <Button
      size="sm"
      onClick={() => {
        addItem(product.id);
        toast({
          message: `${product.name} added to cart`,
          href: "/cart",
          label: "View cart",
        });
      }}
    >
      <Plus className="h-4 w-4" aria-hidden="true" />
      Add
    </Button>
  );
}
