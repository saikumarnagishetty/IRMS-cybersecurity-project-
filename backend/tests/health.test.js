import test from "node:test";
import assert from "node:assert/strict";

test("health endpoint is reachable without an authentication token", async () => {
  process.env.NODE_ENV = "test";
  const { server } = await import("../server.js");
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  try {
    const { port } = server.address();
    const response = await fetch(`http://127.0.0.1:${port}/api/health`);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.status, "ok");
    assert.ok(["connected", "disconnected"].includes(body.database));
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
