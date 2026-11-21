import { put } from "@vercel/blob";
import { hasBlobStorage } from "@/lib/storage";
import type { ContactMessage } from "@/types/commerce";

const memoryMessages: ContactMessage[] = [];

export async function saveMessage(message: ContactMessage) {
  if (hasBlobStorage()) {
    try {
      await put(`messages/${message.id}.json`, JSON.stringify(message), {
        access: "private",
        addRandomSuffix: false,
        allowOverwrite: false,
        contentType: "application/json",
        cacheControlMaxAge: 60,
      });
      return;
    } catch (error) {
      console.error(
        "Blob message write failed; using memory fallback.",
        error instanceof Error ? error.message : error,
      );
    }
  }

  memoryMessages.push(message);
}
