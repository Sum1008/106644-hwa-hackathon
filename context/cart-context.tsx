"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductById, getVariant } from "@/lib/products";
import { MAX_LINE_QUANTITY, getCartLineKey } from "@/lib/pricing";
import type { CartLine } from "@/types/commerce";

const STORAGE_KEY = "sniffari_cart_v1";

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  isHydrated: boolean;
  addItem: (productId: string, quantity?: number, variantId?: string) => void;
  updateQuantity: (
    productId: string,
    variantId: string | undefined,
    quantity: number,
  ) => void;
  removeItem: (productId: string, variantId?: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function normalizeLine(line: CartLine): CartLine | null {
  if (!line || typeof line.productId !== "string") return null;

  const product = getProductById(line.productId);
  if (!product) return null;

  let variantId = line.variantId;
  if (product.variants?.length) {
    const variant = getVariant(product, variantId);
    if (!variant) return null;
    variantId = variant.id;
  } else {
    variantId = undefined;
  }

  const quantity = Math.max(
    1,
    Math.min(MAX_LINE_QUANTITY, Math.floor(Number(line.quantity) || 1)),
  );

  return { productId: product.id, variantId, quantity };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setLines(
            parsed
              .map((line) => normalizeLine(line as CartLine))
              .filter((line): line is CartLine => Boolean(line)),
          );
        }
      }
    } catch {
      // Malformed storage is ignored and replaced on the next write.
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage can be unavailable in private browsing.
    }
  }, [lines, isHydrated]);

  const addItem = useCallback(
    (productId: string, quantity = 1, variantId?: string) => {
      const product = getProductById(productId);
      if (!product) return;

      let resolvedVariantId = variantId;
      if (product.variants?.length) {
        const variant = getVariant(product, variantId) ?? product.variants[0];
        resolvedVariantId = variant.id;
      } else {
        resolvedVariantId = undefined;
      }

      const safeQuantity = Math.max(
        1,
        Math.min(MAX_LINE_QUANTITY, Math.floor(quantity)),
      );
      const key = getCartLineKey({
        productId,
        variantId: resolvedVariantId,
      });

      setLines((current) => {
        const existing = current.find(
          (line) => getCartLineKey(line) === key,
        );

        if (existing) {
          return current.map((line) =>
            getCartLineKey(line) === key
              ? {
                  ...line,
                  quantity: Math.min(
                    MAX_LINE_QUANTITY,
                    line.quantity + safeQuantity,
                  ),
                }
              : line,
          );
        }

        return [
          ...current,
          {
            productId,
            variantId: resolvedVariantId,
            quantity: safeQuantity,
          },
        ];
      });
    },
    [],
  );

  const updateQuantity = useCallback(
    (productId: string, variantId: string | undefined, quantity: number) => {
      const key = getCartLineKey({ productId, variantId });
      setLines((current) =>
        current.map((line) =>
          getCartLineKey(line) === key
            ? {
                ...line,
                quantity: Math.max(
                  1,
                  Math.min(MAX_LINE_QUANTITY, Math.floor(quantity)),
                ),
              }
            : line,
        ),
      );
    },
    [],
  );

  const removeItem = useCallback(
    (productId: string, variantId?: string) => {
      const key = getCartLineKey({ productId, variantId });
      setLines((current) =>
        current.filter((line) => getCartLineKey(line) !== key),
      );
    },
    [],
  );

  const clearCart = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      itemCount,
      isHydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [
      lines,
      itemCount,
      isHydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
