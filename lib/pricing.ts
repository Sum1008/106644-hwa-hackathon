import { getProductById, getVariant } from "@/lib/products";
import type { CartLine, OrderItem, Product } from "@/types/commerce";

export const MAX_LINE_QUANTITY = 10;
export const SHIPPING_FEE = 0;

export function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export interface ResolvedCartLine {
  product: Product;
  variantId?: string;
  variantLabel?: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  image: string;
}

export function getCartLineKey(
  line: Pick<CartLine, "productId" | "variantId">,
) {
  return `${line.productId}::${line.variantId ?? ""}`;
}

export function resolveCartLines(lines: CartLine[]): ResolvedCartLine[] {
  const resolved: ResolvedCartLine[] = [];

  for (const line of lines) {
    const product = getProductById(line.productId);
    if (!product || product.stock === "out_of_stock") continue;

    const variant = getVariant(product, line.variantId);
    if (product.variants?.length && !variant) continue;

    const quantity = Math.max(
      1,
      Math.min(MAX_LINE_QUANTITY, Math.floor(Number(line.quantity) || 1)),
    );
    const unitPrice = product.price + (variant?.priceDelta ?? 0);

    resolved.push({
      product,
      variantId: variant?.id,
      variantLabel: variant?.label,
      unitPrice,
      quantity,
      lineTotal: unitPrice * quantity,
      image: product.images[0]?.src ?? "/images/pod.webp",
    });
  }

  return resolved;
}

export function getCartSubtotal(lines: ResolvedCartLine[]) {
  return lines.reduce((sum, line) => sum + line.lineTotal, 0);
}

export function getCartItemCount(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function calculateTotals(subtotal: number) {
  const shippingFee = SHIPPING_FEE;
  return {
    subtotal,
    shippingFee,
    total: subtotal + shippingFee,
  };
}

export function buildOrderItems(lines: CartLine[]): {
  items: OrderItem[];
  subtotal: number;
} {
  const items: OrderItem[] = [];

  for (const line of lines) {
    const product = getProductById(line.productId);
    if (!product) {
      throw new Error(`We couldn’t find ${line.productId} in the catalogue.`);
    }
    if (product.stock === "out_of_stock") {
      throw new Error(`${product.name} is out of stock.`);
    }

    const variant = getVariant(product, line.variantId);
    if (product.variants?.length && !variant) {
      throw new Error(`Choose a valid option for ${product.name}.`);
    }

    const unitPrice = product.price + (variant?.priceDelta ?? 0);
    items.push({
      productId: product.id,
      variantId: variant?.id,
      name: product.name,
      variantLabel: variant?.label,
      unitPrice,
      quantity: line.quantity,
      lineTotal: unitPrice * line.quantity,
      image: product.images[0]?.src ?? "/images/pod.webp",
    });
  }

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  return { items, subtotal };
}
