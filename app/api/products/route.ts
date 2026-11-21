import { CORS_HEADERS, jsonResponse } from "@/lib/api";
import { products } from "@/lib/products";

export const dynamic = "force-dynamic";

export function GET() {
  return jsonResponse({ products, count: products.length });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
