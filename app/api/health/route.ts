import { CORS_HEADERS, jsonResponse } from "@/lib/api";
import { hasBlobStorage } from "@/lib/orders";
import { products } from "@/lib/products";

export const dynamic = "force-dynamic";

export function GET() {
  return jsonResponse({
    ok: true,
    service: "sniffari",
    storage: hasBlobStorage() ? "blob" : "memory",
    products: products.length,
    time: new Date().toISOString(),
  });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
