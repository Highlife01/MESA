import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const dbFile = path.join(os.tmpdir(), `mesa-api-test-${process.pid}.json`);
process.env.MESA_DB_FILE = dbFile;
const { server } = await import('./index.js');
const port = 8788;
const base = `http://127.0.0.1:${port}`;
const request = async (urlPath, options = {}) => {
  const response = await fetch(`${base}${urlPath}`, { headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options });
  return { status: response.status, body: await response.json() };
};

await new Promise(resolve => server.listen(port, '127.0.0.1', resolve));
try {
  let result = await request('/api/health'); assert.equal(result.status, 200); assert.equal(result.body.ok, true);
  result = await request('/api/public/machines/mch_8f4c21a7/summary'); assert.equal(result.status, 200); assert.equal(result.body.machine.id, 'MCH-01-ABC-32'); assert.equal(result.body.publicPolicy.financialData, false);
  result = await request('/api/portal/machines'); assert.equal(result.status, 401);
  result = await request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email: 'filo@abc-insaat.local', password: 'demo-customer' }) }); assert.equal(result.status, 200); assert.equal(result.body.mfaRequired, true);
  const pending = result.body.sessionToken;
  result = await request('/api/auth/mfa/verify', { method: 'POST', body: JSON.stringify({ sessionToken: pending, code: '123456' }) }); assert.equal(result.status, 200); const token = result.body.token;
  result = await request('/api/portal/machines', { headers: { Authorization: `Bearer ${token}` } }); assert.equal(result.status, 200); assert.equal(result.body.machines.length, 3);
  result = await request('/api/portal/machines/MCH-01-ABC-32/history', { headers: { Authorization: `Bearer ${token}` } }); assert.equal(result.status, 200); assert.equal(result.body.workOrders.some(order => order.id === 'MS-128'), true);
  result = await request('/api/public/machines/mch_8f4c21a7/service-requests', { method: 'POST', body: JSON.stringify({ description: 'Hidrolik yağ kaçağı ve performans düşüşü bildirimi' }) }); assert.equal(result.status, 201);
  console.log('MESA API acceptance tests passed');
} finally {
  await new Promise(resolve => server.close(resolve));
  try { fs.rmSync(dbFile, { force: true }); } catch {}
}
