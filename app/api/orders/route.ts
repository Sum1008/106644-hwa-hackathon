import {
  CORS_HEADERS,
  errorResponse,
  getClientIp,
  jsonResponse,
  readJson,
} from "@/lib/api";
import {
  generateOrderId,
  generateTrackingId,
  getEstimatedDelivery,
} from "@/lib/order-id";
import {
  getIdempotentOrderId,
  getOrder,
  saveOrder,
} from "@/lib/orders";
import { buildOrderItems } from "@/lib/pricing";
import { rateLimit } from "@/lib/rate-limit";
import { createOrderSchema } from "@/lib/validation";
import type { Order } from "@/types/commerce";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`orders:${ip}`, 30, 60_000);

  if (!limit.allowed) {
    return errorResponse(
      429,
      "rate_limited",
      "Too many order attempts. Please wait a minute and try again.",
    );
  }

  let payload: unknown;
  try {
    payload = await readJson(request);
  } catch {
    return errorResponse(400, "invalid_json", "Send a valid JSON body.");
  }

  const parsed = createOrderSchema.safeParse(payload);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "body";
      if (!fields[key]) fields[key] = issue.message;
    }
    return errorResponse(
      422,
      "validation_failed",
      "Please check the highlighted fields.",
      fields,
    );
  }

  const data = parsed.data;

  if (data.website) {
    return errorResponse(
      400,
      "spam_detected",
      "This request could not be processed.",
    );
  }

  try {
    if (data.clientOrderId) {
      const existingId = await getIdempotentOrderId(data.clientOrderId);
      if (existingId) {
        const existing = await getOrder(existingId);
        if (existing) {
          return jsonResponse({ order: existing, idempotent: true });
        }
      }
    }

    const { items, subtotal } = buildOrderItems(data.items);
    const now = new Date();

    const order: Order = {
      id: generateOrderId(now),
      trackingId: generateTrackingId(),
      clientOrderId: data.clientOrderId,
      createdAt: now.toISOString(),
      status: "confirmed",
      customer: data.customer,
      shipping: data.shipping,
      items,
      subtotal,
      shippingFee: 0,
      discount: 0,
      total: subtotal,
      currency: "INR",
      payment: { method: "cod", status: "pending" },
      estimatedDelivery: getEstimatedDelivery(now),
      tracking: [
        {
          status: "confirmed",
          at: now.toISOString(),
          note: "Order received. We’ll pack it next.",
        },
      ],
      notes: data.notes,
    };

    await saveOrder(order);
    return jsonResponse({ order }, { status: 201 });
  } catch (error) {
    console.error(
      "Order creation failed.",
      error instanceof Error ? error.message : error,
    );
    return errorResponse(
      400,
      "order_failed",
      error instanceof Error
        ? error.message
        : "We couldn’t place this order.",
    );
  }
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
