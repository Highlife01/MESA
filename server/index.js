import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.API_PORT || 8787);
const DB_FILE = process.env.MESA_DB_FILE || path.join(__dirname, 'data.json');
const IS_PROD = process.env.NODE_ENV === 'production';
const sessions = new Map();
const attempts = new Map();

const now = () => new Date().toISOString();
const id = (prefix) => `${prefix}_${crypto.randomBytes(8).toString('hex')}`;
const publicToken = () => `mch_${crypto.randomBytes(16).toString('hex')}`;
const hash = (value) => crypto.createHash('sha256').update(String(value)).digest('hex');
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };
const hashPassword = (value) => { const salt = crypto.randomBytes(16); const derived = crypto.scryptSync(String(value), salt, 64, SCRYPT_OPTIONS); return `scrypt$${salt.toString('base64')}$${derived.toString('base64')}`; };
const verifyPassword = (value, stored) => { try { const [, salt64, derived64] = String(stored).split('$'); const actual = crypto.scryptSync(String(value), Buffer.from(salt64, 'base64'), 64, SCRYPT_OPTIONS); return crypto.timingSafeEqual(actual, Buffer.from(derived64, 'base64')); } catch { return false; } };
const json = (res, status, body, extra = {}) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', ...extra }); res.end(JSON.stringify(body)); };
const error = (res, status, message, code = 'REQUEST_FAILED') => json(res, status, { error: { code, message } });

const seed = {
  users: [
    { id: 'usr_super_admin', email: process.env.MESA_ADMIN_EMAIL || 'admin@mesaismak.local', passwordHash: hashPassword(process.env.MESA_ADMIN_PASSWORD || 'change-me-now'), name: 'MESA Genel Koordinatör', role: 'super_admin', tenantId: 'mesa', active: true },
    { id: 'usr_customer_admin', email: 'filo@abc-insaat.local', passwordHash: hashPassword('demo-customer'), name: 'Ahmet Kaya', role: 'customer_admin', tenantId: 'tenant_abc', active: true },
    { id: 'usr_dispatcher', email: 'operasyon@mesaismak.local', passwordHash: hashPassword('demo-dispatcher'), name: 'Operasyon Koordinatörü', role: 'dispatcher', tenantId: 'mesa', active: true },
    { id: 'usr_technician', email: 'teknisyen@mesaismak.local', passwordHash: hashPassword('demo-technician'), name: 'Mehmet Usta', role: 'technician', tenantId: 'mesa', active: true }
  ],
  tenants: [
    { id: 'mesa', name: 'MESA İş Makineleri', type: 'provider' },
    { id: 'tenant_abc', name: 'ABC İnşaat Ltd. Şti.', type: 'customer' }
  ],
  machines: [
    { id: 'MCH-01-ABC-32', publicToken: 'mch_8f4c21a7', tenantId: 'tenant_abc', brand: 'JCB', model: '3CX Eco', year: 2021, serialNumber: 'JCB3CX21A00482', currentHours: 8421, site: 'Seyhan OSB Şantiyesi', status: 'service', nextMaintenanceHours: 8500, lastServiceAt: '2026-09-12', locationVisibility: 'site_only', qrRevokedAt: null },
    { id: 'MCH-01-ABC-14', publicToken: 'mch_3c91bd20', tenantId: 'tenant_abc', brand: 'Manitou', model: 'MT 1440', year: 2020, serialNumber: 'MT1440X2020A91', currentHours: 9920, site: 'Ceyhan Taş Ocağı', status: 'maintenance_due', nextMaintenanceHours: 10000, lastServiceAt: '2026-08-19', locationVisibility: 'site_only', qrRevokedAt: null },
    { id: 'MCH-01-ABC-20', publicToken: 'mch_5a27ef11', tenantId: 'tenant_abc', brand: 'CAT', model: '320D2', year: 2022, serialNumber: 'CAT320D2KZ8841', currentHours: 6150, site: 'Kozan Mermer Sahası', status: 'active', nextMaintenanceHours: 6500, lastServiceAt: '2026-08-04', locationVisibility: 'site_only', qrRevokedAt: null }
  ],
  workOrders: [
    { id: 'MS-128', machineId: 'MCH-01-ABC-32', tenantId: 'tenant_abc', title: 'Powershift 2. viteste sarsıntı', status: 'waiting_approval', priority: 'high', assignedTo: 'usr_technician', issue: 'Powershift 2. viteste sarsıntı', createdAt: '2026-09-12T08:40:00.000Z', updatedAt: '2026-09-13T10:00:00.000Z', requiredEvidence: { cause: true, action: true, parts: true, tests: true, meter: true, beforeAfterPhotos: true, customerSignature: true } }
  ],
  workOrderEvents: [
    { id: id('evt'), workOrderId: 'MS-128', fromStatus: 'received', toStatus: 'triaged', actorId: 'usr_dispatcher', occurredAt: '2026-09-12T08:50:00.000Z', note: 'Ön teşhis başlatıldı.' },
    { id: id('evt'), workOrderId: 'MS-128', fromStatus: 'triaged', toStatus: 'assigned', actorId: 'usr_dispatcher', occurredAt: '2026-09-12T09:10:00.000Z', note: 'Mehmet Usta atandı.' },
    { id: id('evt'), workOrderId: 'MS-128', fromStatus: 'assigned', toStatus: 'waiting_approval', actorId: 'usr_technician', occurredAt: '2026-09-13T10:00:00.000Z', note: 'Basınç testi tamamlandı; parça onayı bekleniyor.' }
  ],
  evidence: [],
  parts: [
    { id: 'part_filter_cat', sku: 'CAT-1R-1808', name: 'CAT Hidrolik Basınç Filtresi', stock: 18, minStock: 5, unitPrice: 2450, warrantyMonths: 12 },
    { id: 'part_jcb_kit', sku: 'JCB-PS-320', name: 'JCB Powershift Kavrama Seti', stock: 3, minStock: 2, unitPrice: 18750, warrantyMonths: 12 }
  ],
  inventoryMovements: [],
  audit: []
};

function loadDb() {
  try { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); } catch { fs.mkdirSync(path.dirname(DB_FILE), { recursive: true }); fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2)); return structuredClone(seed); }
}
let db = loadDb();
function saveDb() { fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2)); }
function audit(actor, action, resource, resourceId, metadata = {}) { db.audit.unshift({ id: id('audit'), actorId: actor?.id || 'anonymous', actorRole: actor?.role || 'public', action, resource, resourceId, metadata, createdAt: now() }); saveDb(); }
function readBody(req) { return new Promise((resolve, reject) => { let raw = ''; req.on('data', chunk => { raw += chunk; if (raw.length > 1024 * 1024) req.destroy(); }); req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch { reject(new Error('INVALID_JSON')); } }); req.on('error', reject); }); }
function bearer(req) { const match = String(req.headers.authorization || '').match(/^Bearer\s+(.+)$/i); return match?.[1] || ''; }
function actor(req) { const session = sessions.get(bearer(req)); if (!session || session.expiresAt < Date.now()) return null; return db.users.find(user => user.id === session.userId && user.active) || null; }
function requireAuth(req, res, roles = []) { const user = actor(req); if (!user) { error(res, 401, 'Oturum gerekli.', 'AUTH_REQUIRED'); return null; } if (roles.length && !roles.includes(user.role) && user.role !== 'super_admin') { error(res, 403, 'Bu işlem için rol yetkiniz yok.', 'FORBIDDEN'); return null; } return user; }
function sameTenant(user, record) { return user.role === 'super_admin' || user.tenantId === record.tenantId || (user.tenantId === 'mesa' && record.tenantId === 'tenant_abc'); }
function sanitizeMachine(machine, detailed = false) { const base = { id: machine.id, publicToken: machine.publicToken, assetCode: machine.id, brand: machine.brand, model: machine.model, year: machine.year, currentHours: machine.currentHours, site: machine.site, status: machine.status, nextMaintenanceHours: machine.nextMaintenanceHours, lastServiceAt: machine.lastServiceAt }; return detailed ? { ...base, serialNumber: machine.serialNumber, locationVisibility: machine.locationVisibility, qrRevokedAt: machine.qrRevokedAt } : base; }
function validTransition(from, to) { const allowed = { received: ['triaged', 'cancelled'], triaged: ['scheduled', 'assigned', 'cancelled'], scheduled: ['assigned', 'cancelled'], assigned: ['en_route', 'cancelled'], en_route: ['on_site', 'cancelled'], on_site: ['waiting_parts', 'waiting_approval', 'testing', 'cancelled'], waiting_parts: ['on_site', 'waiting_approval', 'cancelled'], waiting_approval: ['testing', 'cancelled'], testing: ['completed', 'on_site'], completed: ['customer_approved', 'invoiced'], customer_approved: ['invoiced'] }; return allowed[from]?.includes(to); }
function evidenceComplete(workOrder) { const list = db.evidence.filter(item => item.workOrderId === workOrder.id); const types = new Set(list.map(item => item.type)); return ['cause', 'action', 'parts', 'tests', 'meter', 'beforeAfterPhotos', 'customerSignature'].every(type => types.has(type)); }
function sendOptions(res) { res.writeHead(204, { 'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*', 'Access-Control-Allow-Headers': 'Content-Type, Authorization', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS', 'Access-Control-Max-Age': '86400' }); res.end(); }

async function router(req, res) {
  const origin = process.env.CORS_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', origin); res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS'); res.setHeader('X-Content-Type-Options', 'nosniff'); res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin'); res.setHeader('Content-Security-Policy', "default-src 'self'; frame-ancestors 'none'; base-uri 'self'");
  if (req.method === 'OPTIONS') return sendOptions(res);
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`); const pathname = url.pathname; const method = req.method;
  try {
    if (method === 'GET' && pathname === '/api/health') return json(res, 200, { ok: true, service: 'mesa-operations-api', time: now() });
    if (method === 'POST' && pathname === '/api/auth/login') {
      const body = await readBody(req); const key = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'); const count = attempts.get(key) || 0; if (count >= 10) return error(res, 429, 'Çok fazla deneme. Daha sonra tekrar deneyin.', 'RATE_LIMITED');
      const user = db.users.find(item => item.email.toLowerCase() === String(body.email || '').trim().toLowerCase() && item.active); if (!user || !verifyPassword(body.password || '', user.passwordHash)) { attempts.set(key, count + 1); audit(null, 'login_failed', 'user', user?.id || 'unknown'); return error(res, 401, 'E-posta veya şifre hatalı.', 'INVALID_CREDENTIALS'); }
      const token = crypto.randomBytes(32).toString('hex'); sessions.set(token, { userId: user.id, mfaPending: true, expiresAt: Date.now() + 15 * 60 * 1000 }); audit(user, 'login_password_verified', 'user', user.id); return json(res, 200, { mfaRequired: true, challenge: token.slice(0, 6), sessionToken: token, message: 'MFA doğrulaması gerekli. Demo kodu 123456.' });
    }
    if (method === 'POST' && pathname === '/api/auth/mfa/verify') {
      const body = await readBody(req); const session = sessions.get(body.sessionToken); if (!session || !session.mfaPending || String(body.code) !== '123456') return error(res, 401, 'MFA kodu geçersiz.', 'INVALID_MFA'); session.mfaPending = false; session.expiresAt = Date.now() + 8 * 60 * 60 * 1000; const user = db.users.find(item => item.id === session.userId); audit(user, 'login_completed', 'user', user.id); return json(res, 200, { token: body.sessionToken, user: { id: user.id, name: user.name, email: user.email, role: user.role, tenantId: user.tenantId } });
    }
    if (method === 'POST' && pathname === '/api/auth/logout') { const user = actor(req); sessions.delete(bearer(req)); if (user) audit(user, 'logout', 'user', user.id); return json(res, 200, { ok: true }); }

    const publicMatch = pathname.match(/^\/api\/public\/machines\/([^/]+)\/summary$/); if (method === 'GET' && publicMatch) { const machine = db.machines.find(item => item.publicToken === publicMatch[1] && !item.qrRevokedAt); if (!machine) return error(res, 404, 'Makine pasaportu bulunamadı.', 'QR_NOT_FOUND'); audit(null, 'qr_scan', 'machine', machine.id); return json(res, 200, { machine: sanitizeMachine(machine), publicPolicy: { financialData: false, phone: false, fullSerial: false, privateNotes: false } }); }
    const requestMatch = pathname.match(/^\/api\/public\/machines\/([^/]+)\/service-requests$/); if (method === 'POST' && requestMatch) { const machine = db.machines.find(item => item.publicToken === requestMatch[1] && !item.qrRevokedAt); if (!machine) return error(res, 404, 'Makine pasaportu bulunamadı.', 'QR_NOT_FOUND'); const body = await readBody(req); if (!body.description || String(body.description).trim().length < 8) return error(res, 422, 'Arıza açıklaması en az 8 karakter olmalıdır.', 'VALIDATION_ERROR'); const workOrder = { id: `MS-${crypto.randomInt(1000, 9999)}`, machineId: machine.id, tenantId: machine.tenantId, title: String(body.description).trim().slice(0, 120), issue: String(body.description).trim(), status: 'received', priority: body.priority === 'critical' ? 'critical' : 'normal', createdAt: now(), updatedAt: now(), assignedTo: null, requiredEvidence: { cause: true, action: true, parts: true, tests: true, meter: true, beforeAfterPhotos: true, customerSignature: true } }; db.workOrders.unshift(workOrder); db.workOrderEvents.unshift({ id: id('evt'), workOrderId: workOrder.id, fromStatus: null, toStatus: 'received', actorId: 'public', occurredAt: now(), note: 'QR kamu formundan oluşturuldu.' }); audit(null, 'public_service_request', 'workOrder', workOrder.id, { machineId: machine.id }); saveDb(); return json(res, 201, { workOrder: { id: workOrder.id, status: workOrder.status, machineId: workOrder.machineId } }); }

    if (method === 'GET' && pathname === '/api/me') { const user = requireAuth(req, res); if (!user) return; return json(res, 200, { user: { id: user.id, name: user.name, email: user.email, role: user.role, tenantId: user.tenantId } }); }
    if (method === 'GET' && pathname === '/api/portal/machines') { const user = requireAuth(req, res, ['customer_admin', 'customer_viewer', 'manager']); if (!user) return; const machines = db.machines.filter(item => sameTenant(user, item)); return json(res, 200, { machines: machines.map(item => sanitizeMachine(item, true)) }); }
    const historyMatch = pathname.match(/^\/api\/portal\/machines\/([^/]+)\/history$/); if (method === 'GET' && historyMatch) { const user = requireAuth(req, res, ['customer_admin', 'customer_viewer', 'manager']); if (!user) return; const machine = db.machines.find(item => item.id === historyMatch[1]); if (!machine || !sameTenant(user, machine)) return error(res, 404, 'Makine bulunamadı.', 'NOT_FOUND'); const orders = db.workOrders.filter(item => item.machineId === machine.id && sameTenant(user, item)).map(order => ({ ...order, events: db.workOrderEvents.filter(event => event.workOrderId === order.id), evidence: user.role === 'customer_viewer' ? [] : db.evidence.filter(item => item.workOrderId === order.id) })); audit(user, 'view_machine_history', 'machine', machine.id); return json(res, 200, { machine: sanitizeMachine(machine, true), workOrders: orders }); }

    if (method === 'GET' && pathname === '/api/work-orders') { const user = requireAuth(req, res, ['dispatcher', 'technician', 'manager']); if (!user) return; const orders = db.workOrders.filter(order => sameTenant(user, order) && (user.role !== 'technician' || order.assignedTo === user.id)); return json(res, 200, { workOrders: orders }); }
    const transitionMatch = pathname.match(/^\/api\/work-orders\/([^/]+)\/transitions$/); if (method === 'POST' && transitionMatch) { const user = requireAuth(req, res, ['dispatcher', 'technician', 'manager']); if (!user) return; const order = db.workOrders.find(item => item.id === transitionMatch[1]); if (!order || !sameTenant(user, order) || (user.role === 'technician' && order.assignedTo !== user.id)) return error(res, 404, 'İş emri bulunamadı.', 'NOT_FOUND'); const body = await readBody(req); if (!validTransition(order.status, body.status)) return error(res, 422, `${order.status} durumundan ${body.status} durumuna geçişe izin yok.`, 'INVALID_TRANSITION'); if (body.status === 'completed' && !evidenceComplete(order)) return error(res, 422, 'İş emri kanıt seti tamamlanmadan kapatılamaz.', 'EVIDENCE_INCOMPLETE'); const previous = order.status; order.status = body.status; order.updatedAt = now(); db.workOrderEvents.unshift({ id: id('evt'), workOrderId: order.id, fromStatus: previous, toStatus: body.status, actorId: user.id, occurredAt: now(), note: body.note || '' }); audit(user, 'work_order_transition', 'workOrder', order.id, { from: previous, to: body.status }); saveDb(); return json(res, 200, { workOrder: order }); }
    const evidenceMatch = pathname.match(/^\/api\/work-orders\/([^/]+)\/evidence$/); if (method === 'POST' && evidenceMatch) { const user = requireAuth(req, res, ['dispatcher', 'technician', 'manager']); if (!user) return; const order = db.workOrders.find(item => item.id === evidenceMatch[1]); if (!order || !sameTenant(user, order) || (user.role === 'technician' && order.assignedTo !== user.id)) return error(res, 404, 'İş emri bulunamadı.', 'NOT_FOUND'); const body = await readBody(req); const allowed = ['cause', 'action', 'parts', 'tests', 'meter', 'beforeAfterPhotos', 'customerSignature']; if (!allowed.includes(body.type) || !body.value) return error(res, 422, 'Kanıt tipi ve değeri zorunludur.', 'VALIDATION_ERROR'); const item = { id: id('evidence'), workOrderId: order.id, type: body.type, value: String(body.value).slice(0, 2000), uploadedBy: user.id, createdAt: now() }; db.evidence.push(item); audit(user, 'evidence_added', 'workOrder', order.id, { type: item.type }); saveDb(); return json(res, 201, { evidence: item, complete: evidenceComplete(order) }); }
    if (method === 'GET' && pathname === '/api/inventory/parts') { const user = requireAuth(req, res, ['warehouse', 'dispatcher', 'manager', 'finance']); if (!user) return; return json(res, 200, { parts: db.parts }); }
    const inventoryMatch = pathname.match(/^\/api\/inventory\/parts\/([^/]+)\/movements$/); if (method === 'POST' && inventoryMatch) { const user = requireAuth(req, res, ['warehouse', 'manager']); if (!user) return; const part = db.parts.find(item => item.id === inventoryMatch[1]); if (!part) return error(res, 404, 'Parça bulunamadı.', 'NOT_FOUND'); const body = await readBody(req); const quantity = Number(body.quantity); if (!Number.isInteger(quantity) || quantity === 0) return error(res, 422, 'Geçerli bir miktar girin.', 'VALIDATION_ERROR'); if (part.stock + quantity < 0) return error(res, 409, 'Stok yetersiz.', 'INSUFFICIENT_STOCK'); part.stock += quantity; const movement = { id: id('movement'), partId: part.id, quantity, type: body.type || (quantity > 0 ? 'receipt' : 'consumption'), workOrderId: body.workOrderId || null, actorId: user.id, createdAt: now() }; db.inventoryMovements.unshift(movement); audit(user, 'inventory_movement', 'part', part.id, { quantity, type: movement.type }); saveDb(); return json(res, 201, { part, movement }); }
    const rotateMatch = pathname.match(/^\/api\/admin\/machines\/([^/]+)\/qr\/rotate$/); if (method === 'POST' && rotateMatch) { const user = requireAuth(req, res, ['manager']); if (!user) return; const machine = db.machines.find(item => item.id === rotateMatch[1]); if (!machine) return error(res, 404, 'Makine bulunamadı.', 'NOT_FOUND'); const previous = machine.publicToken; machine.publicToken = publicToken(); machine.qrRevokedAt = null; audit(user, 'qr_token_rotated', 'machine', machine.id, { previousToken: previous, newToken: machine.publicToken }); saveDb(); return json(res, 200, { machine: sanitizeMachine(machine, true), revokedToken: previous }); }
    if (method === 'GET' && pathname === '/api/admin/audit') { const user = requireAuth(req, res, ['manager', 'finance']); if (!user) return; return json(res, 200, { events: db.audit.slice(0, 200) }); }
    return error(res, 404, 'Endpoint bulunamadı.', 'NOT_FOUND');
  } catch (caught) { if (caught?.message === 'INVALID_JSON') return error(res, 400, 'Geçersiz JSON gövdesi.', 'INVALID_JSON'); console.error(caught); return error(res, 500, IS_PROD ? 'Sunucu hatası.' : caught.message, 'INTERNAL_ERROR'); }
}

const server = http.createServer((req, res) => router(req, res));
if (process.argv[1] === fileURLToPath(import.meta.url)) server.listen(PORT, '0.0.0.0', () => console.log(`MESA API listening on http://0.0.0.0:${PORT}`));
export { server, db, router };
