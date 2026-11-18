import test from "node:test";
import assert from "node:assert/strict";
import { allow } from "../middleware/auth.js";

function invoke(role, allowed) {
  const req = { user: { role } };
  const res = { statusCode: 200, body: null, status(code) { this.statusCode = code; return this; }, json(body) { this.body = body; return this; } };
  let nextCalled = false;
  allow(...allowed)(req, res, () => { nextCalled = true; });
  return { res, nextCalled };
}

test("role middleware permits explicitly allowed roles", () => {
  const result = invoke("Incident Manager", ["Admin", "Incident Manager"]);
  assert.equal(result.nextCalled, true);
  assert.equal(result.res.statusCode, 200);
});

test("role middleware rejects roles not in the allow-list", () => {
  const result = invoke("Viewer", ["Admin", "Analyst"]);
  assert.equal(result.nextCalled, false);
  assert.equal(result.res.statusCode, 403);
  assert.equal(result.res.body.message, "Insufficient permissions");
});
