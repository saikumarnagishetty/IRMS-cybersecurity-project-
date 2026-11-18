import test from "node:test";
import assert from "node:assert/strict";
import { validateEvidenceBuffer, detectEvidenceMime } from "../utils/evidence.js";

test("recognizes PNG, JPEG and PDF signatures", () => {
  assert.equal(detectEvidenceMime(Buffer.from([137,80,78,71,13,10,26,10])), "image/png");
  assert.equal(detectEvidenceMime(Buffer.from([0xff,0xd8,0xff,0xe0])), "image/jpeg");
  assert.equal(detectEvidenceMime(Buffer.from("%PDF-1.7")), "application/pdf");
});

test("accepts valid UTF-8 text and JSON", () => {
  assert.equal(validateEvidenceBuffer(Buffer.from("incident notes"), "text/plain").valid, true);
  assert.equal(validateEvidenceBuffer(Buffer.from('{"event":"alert"}'), "application/json").valid, true);
});

test("rejects spoofed MIME types and binary content", () => {
  assert.equal(validateEvidenceBuffer(Buffer.from("%PDF-1.7"), "image/png").valid, false);
  assert.equal(validateEvidenceBuffer(Buffer.from([0,1,2,3]), "text/plain").valid, false);
  assert.equal(validateEvidenceBuffer(Buffer.from("hello"), "application/x-msdownload").valid, false);
});

test("rejects malformed JSON declared as JSON", () => {
  assert.equal(validateEvidenceBuffer(Buffer.from("{not-json"), "application/json").valid, false);
});
