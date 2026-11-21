import {
  CORS_HEADERS,
  errorResponse,
  getClientIp,
  jsonResponse,
  readJson,
} from "@/lib/api";
import { saveMessage } from "@/lib/messages";
import { rateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validation";
import type { ContactMessage } from "@/types/commerce";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`contact:${ip}`, 15, 60_000);

  if (!limit.allowed) {
    return errorResponse(
      429,
      "rate_limited",
      "Too many messages sent. Please wait a minute and try again.",
    );
  }

  let payload: unknown;
  try {
    payload = await readJson(request);
  } catch {
    return errorResponse(400, "invalid_json", "Send a valid JSON body.");
  }

  const parsed = contactSchema.safeParse(payload);
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

  const now = new Date();
  const message: ContactMessage = {
    id: `MSG-${now.getTime().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`,
    createdAt: now.toISOString(),
    name: data.name,
    email: data.email,
    phone: data.phone || undefined,
    topic: data.topic,
    orderId: data.orderId || undefined,
    message: data.message,
  };

  await saveMessage(message);

  return jsonResponse(
    {
      ok: true,
      messageId: message.id,
      receivedAt: message.createdAt,
    },
    { status: 201 },
  );
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
