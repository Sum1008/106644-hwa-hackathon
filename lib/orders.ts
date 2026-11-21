import { get, put } from "@vercel/blob";
import { hasBlobStorage } from "@/lib/storage";
import type { Order } from "@/types/commerce";

const memoryOrders = new Map<string, Order>();
const memoryIdempotency = new Map<string, string>();

export { hasBlobStorage };

async function readJsonBlob<T>(pathname: string): Promise<T | null> {
  const result = await get(pathname, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200 || !result.stream) return null;
  const text = await new Response(result.stream).text();
  return JSON.parse(text) as T;
}

export async function saveOrder(order: Order) {
  if (hasBlobStorage()) {
    try {
      await put(`orders/${order.id}.json`, JSON.stringify(order), {
        access: "private",
        addRandomSuffix: false,
        allowOverwrite: false,
        contentType: "application/json",
        cacheControlMaxAge: 60,
      });

      if (order.clientOrderId) {
        await put(
          `idempotency/${order.clientOrderId}.json`,
          JSON.stringify({ orderId: order.id }),
          {
            access: "private",
            addRandomSuffix: false,
            allowOverwrite: false,
            contentType: "application/json",
            cacheControlMaxAge: 60,
          },
        );
      }

      return;
    } catch (error) {
      console.error(
        "Blob order write failed; using memory fallback.",
        error instanceof Error ? error.message : error,
      );
    }
  }

  memoryOrders.set(order.id, order);
  if (order.clientOrderId) {
    memoryIdempotency.set(order.clientOrderId, order.id);
  }
}

export async function getOrder(id: string): Promise<Order | null> {
  if (hasBlobStorage()) {
    try {
      const order = await readJsonBlob<Order>(`orders/${id}.json`);
      if (order) return order;
    } catch (error) {
      console.error(
        "Blob order read failed; checking memory.",
        error instanceof Error ? error.message : error,
      );
    }
  }

  return memoryOrders.get(id) ?? null;
}

export async function getIdempotentOrderId(
  clientOrderId: string,
): Promise<string | null> {
  if (hasBlobStorage()) {
    try {
      const record = await readJsonBlob<{ orderId: string }>(
        `idempotency/${clientOrderId}.json`,
      );
      if (record?.orderId) return record.orderId;
    } catch (error) {
      console.error(
        "Blob idempotency read failed; checking memory.",
        error instanceof Error ? error.message : error,
      );
    }
  }

  return memoryIdempotency.get(clientOrderId) ?? null;
}
