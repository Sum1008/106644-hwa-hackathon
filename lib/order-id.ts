const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateOrderId(now = new Date()) {
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const bytes = crypto.getRandomValues(new Uint8Array(5));
  const suffix = Array.from(
    bytes,
    (byte) => ALPHABET[byte % ALPHABET.length],
  ).join("");

  return `SNF-${year}${month}${day}-${suffix}`;
}

export function generateTrackingId() {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  const suffix = Array.from(
    bytes,
    (byte) => ALPHABET[byte % ALPHABET.length],
  ).join("");

  return `TRK-${suffix}`;
}

export function getEstimatedDelivery(now = new Date()) {
  const date = new Date(now);
  date.setDate(date.getDate() + 5);
  return date.toISOString().slice(0, 10);
}
