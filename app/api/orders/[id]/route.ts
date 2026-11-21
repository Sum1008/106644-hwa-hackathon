import {
  CORS_HEADERS,
  errorResponse,
  getClientIp,
  jsonResponse,
} from "@/lib/api";
import { getOrder } from "@/lib/orders";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const ip = getClientIp(request);
  const limit = rateLimit(`track:${ip}`, 60, 60_000);

  if (!limit.allowed) {
    return errorResponse(
      429,
      "rate_limited",
      "Too many lookups. Please wait a minute and try again.",
    );
  }

  const email = new URL(request.url).searchParams
    .get("email")
    ?.trim()
    .toLowerCase();

  if (!email) {
    return errorResponse(
      400,
      "email_required",
      "Add the email used for the order.",
    );
  }

  const order = await getOrder(id);
  if (!order || order.customer.email.toLowerCase() !== email) {
    return errorResponse(
      404,
      "not_found",
      "We couldn’t find an order with that ID and email.",
    );
  }

  return jsonResponse({ order });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
