const allowedTypes = new Set([
  "image/png", "image/jpeg", "application/pdf", "text/plain", "application/json"
]);

export function detectEvidenceMime(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length === 0) return null;
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return "image/png";
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return "image/jpeg";
  if (buffer.length >= 5 && buffer.subarray(0, 5).toString("ascii") === "%PDF-") return "application/pdf";

  // Text formats have no reliable magic bytes. Require valid UTF-8 and reject binary control bytes.
  let text;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(buffer);
  } catch {
    return null;
  }
  if (text.includes("\0")) return null;
  const trimmed = text.trim();
  if (!trimmed) return "text/plain";
  try {
    JSON.parse(trimmed);
    return "application/json";
  } catch {
    return /^[\t\n\r\x20-\x7e\u00a0-\uffff]*$/.test(text) ? "text/plain" : null;
  }
}

export function validateEvidenceBuffer(buffer, claimedMime) {
  if (!allowedTypes.has(claimedMime)) return { valid: false, reason: "File type is not allowed" };
  const detectedMime = detectEvidenceMime(buffer);
  if (!detectedMime) return { valid: false, reason: "File content is empty, binary, or invalid" };
  if (detectedMime !== claimedMime) return { valid: false, reason: "File content does not match its declared type" };
  return { valid: true, detectedMime };
}
