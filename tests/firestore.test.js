import { readFileSync } from 'node:fs';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, setLogLevel, Timestamp, updateDoc, where } from 'firebase/firestore';
import { buildEmergencyJob, buildPartsOrder } from '../src/lib/operations';
import { partsCatalogData } from '../src/data/partsCatalogData';

const jobId = 'MS-7A5C9B80-EA7B-467F-8D7B-E6C33769596B';
const otherJobId = 'MS-2B5C9B80-EA7B-467F-8D7B-E6C33769596B';
const orderId = 'SP-7A5C9B80-EA7B-467F-8D7B-E6C33769596B';
const details = { customer: 'Test Yetkili', phone: '05330000000', machine: 'CAT 320', issue: 'Pompa', location: 'Adana' };
const buyer = { customerName: 'Test Yetkili', phone: '05330000000', address: 'Adana' };
setLogLevel('silent');
const job = (ownerUid = 'owner', id = jobId) => ({
  ...buildEmergencyJob(details, ownerUid, id, serverTimestamp()), updatedAt: serverTimestamp(),
});
const order = (items = [{ id: 'PRT-101', quantity: 2 }]) => buildPartsOrder(buyer, items, 'owner', orderId, serverTimestamp());

describe.skipIf(!process.env.FIRESTORE_EMULATOR_HOST)('Firestore authorization (local emulator only)', () => {
  let environment;
  let owner;
  let outsider;
  let technician;
  let admin;
  let publicDb;
  beforeAll(async () => {
    const [host, port] = process.env.FIRESTORE_EMULATOR_HOST.split(':');
    environment = await initializeTestEnvironment({
      projectId: 'demo-mesa',
      firestore: { host, port: Number(port), rules: readFileSync(new URL('../firestore.rules', import.meta.url), 'utf8') },
    });
    owner = environment.authenticatedContext('owner').firestore();
    outsider = environment.authenticatedContext('other').firestore();
    technician = environment.authenticatedContext('technician', { mesaRole: 'technician' }).firestore();
    admin = environment.authenticatedContext('admin', { mesaRole: 'admin' }).firestore();
    publicDb = environment.unauthenticatedContext().firestore();
  });
  beforeEach(async () => {
    await environment.clearFirestore();
    await environment.withSecurityRulesDisabled(async context => {
      const database = context.firestore();
      await setDoc(doc(database, 'mesaJobs', jobId), job());
      await setDoc(doc(database, 'mesaJobs', otherJobId), job('other', otherJobId));
      await setDoc(doc(database, 'mesaPartsOrders', orderId), order());
    });
  });
  afterAll(async () => { await environment?.cleanup(); });

  it('allows each customer to read their own records and only scoped list queries', async () => {
    await assertSucceeds(getDoc(doc(owner, 'mesaJobs', jobId)));
    await assertSucceeds(getDocs(query(collection(owner, 'mesaJobs'), where('ownerUid', '==', 'owner'))));
    await assertSucceeds(getDoc(doc(owner, 'mesaPartsOrders', orderId)));
    await assertFails(getDocs(collection(owner, 'mesaJobs')));
    await assertFails(getDoc(doc(outsider, 'mesaJobs', jobId)));
    await assertFails(getDoc(doc(outsider, 'mesaPartsOrders', orderId)));
    await assertFails(getDoc(doc(publicDb, 'mesaJobs', jobId)));
  });

  it('permits scoped staff roles and rejects unrelated admin claims', async () => {
    await assertSucceeds(getDocs(collection(technician, 'mesaJobs')));
    await assertSucceeds(getDocs(collection(admin, 'mesaPartsOrders')));
    const unrelatedAdmin = environment.authenticatedContext('unrelated', { admin: true, role: 'admin' }).firestore();
    await assertFails(getDocs(collection(unrelatedAdmin, 'mesaJobs')));
  });

  it('accepts honest owned requests but blocks injected status, owner, fields and timestamps', async () => {
    await environment.clearFirestore();
    await assertSucceeds(setDoc(doc(owner, 'mesaJobs', jobId), job()));
    for (const patch of [
      { ownerUid: 'someone-else' }, { status: 'Tamamlandı', stepIndex: 5 }, { assignedTechnician: 'Fake' },
      { customer: '' }, { unexpected: true }, { createdAt: Timestamp.fromDate(new Date('2020-01-01')) },
      { phone: 'x'.repeat(41) }, { supervisorSignature: 'data:image/png;base64,YWJj' },
    ]) {
      await environment.clearFirestore();
      await assertFails(setDoc(doc(owner, 'mesaJobs', jobId), { ...job(), ...patch }));
    }
    await assertFails(setDoc(doc(publicDb, 'mesaJobs', jobId), job()));
  });

  it('prevents customers from changing or deleting even their own records', async () => {
    await assertFails(updateDoc(doc(owner, 'mesaJobs', jobId), { status: 'Tamamlandı', stepIndex: 5, updatedAt: serverTimestamp() }));
    await assertFails(deleteDoc(doc(owner, 'mesaJobs', jobId)));
    await assertFails(updateDoc(doc(owner, 'mesaPartsOrders', orderId), { status: 'Teslim Edildi', updatedAt: serverTimestamp() }));
    await assertFails(deleteDoc(doc(owner, 'mesaPartsOrders', orderId)));
  });

  it('permits staff progress while keeping ownership, identity and customer data immutable', async () => {
    const reference = doc(technician, 'mesaJobs', jobId);
    await assertSucceeds(updateDoc(reference, { status: 'Şantiyede', stepIndex: 3, updatedAt: serverTimestamp() }));
    for (const patch of [{ ownerUid: 'technician' }, { code: otherJobId }, { customer: 'Changed' }, { createdAt: serverTimestamp() }, { status: 'Şantiyede', stepIndex: 5 }, { arbitrary: true }]) {
      await assertFails(updateDoc(reference, { ...patch, updatedAt: serverTimestamp() }));
    }
    await assertFails(deleteDoc(reference));
    await assertSucceeds(deleteDoc(doc(admin, 'mesaJobs', jobId)));
  });

  it('stores signature and completion atomically and prevents signature replacement', async () => {
    const reference = doc(technician, 'mesaJobs', jobId);
    const signature = { supervisorSignature: 'data:image/png;base64,YWJj', signerName: 'Yetkili', partsUsed: [{ name: 'Filtre', qty: 2 }], updatedAt: serverTimestamp() };
    await assertFails(updateDoc(reference, signature));
    await assertSucceeds(updateDoc(reference, { ...signature, status: 'Tamamlandı', stepIndex: 5 }));
    const saved = (await getDoc(reference)).data();
    expect(saved.status).toBe('Tamamlandı');
    expect(saved.partsUsed).toEqual([{ name: 'Filtre', qty: 2 }]);
    await assertFails(updateDoc(reference, { supervisorSignature: 'data:image/png;base64,ZGVm', updatedAt: serverTimestamp() }));
    await assertFails(updateDoc(reference, { partsUsed: [], updatedAt: serverTimestamp() }));
  });

  it('accepts every catalog price and rejects fake totals, prices, unknown products and quantities', async () => {
    await environment.clearFirestore();
    await assertSucceeds(setDoc(doc(owner, 'mesaPartsOrders', orderId), order(partsCatalogData.map(part => ({ id: part.id, quantity: 1 })))));
    for (const patch of [
      { total: 1 }, { status: 'Teslim Edildi' }, { ownerUid: 'other' }, { arbitrary: true },
      { items: [{ ...order().items[0], quantity: -1 }] },
      { items: [{ ...order().items[0], price: 1 }], total: 2 },
      { items: [{ ...order().items[0], id: 'unknown' }] },
      { items: [] },
      { items: Array.from({ length: 21 }, () => order().items[0]) },
    ]) {
      await environment.clearFirestore();
      await assertFails(setDoc(doc(owner, 'mesaPartsOrders', orderId), { ...order(), ...patch }));
    }
  });

  it('validates every row at the cart and used-parts boundaries without exceeding rule evaluation limits', async () => {
    await environment.clearFirestore();
    const bulkOrder = order();
    bulkOrder.items = Array.from({ length: 8 }, () => ({ ...bulkOrder.items[0] }));
    bulkOrder.total = 8 * 3700;
    await assertSucceeds(setDoc(doc(owner, 'mesaPartsOrders', orderId), bulkOrder));
    await environment.clearFirestore();
    bulkOrder.items[7].quantity = -1;
    await assertFails(setDoc(doc(owner, 'mesaPartsOrders', orderId), bulkOrder));
    await setDoc(doc(owner, 'mesaJobs', jobId), job());
    await assertSucceeds(updateDoc(doc(technician, 'mesaJobs', jobId), {
      partsUsed: Array.from({ length: 20 }, () => ({ name: 'Filtre', qty: 1 })), updatedAt: serverTimestamp(),
    }));
  });

  it('permits only admins to update order progress or delete orders, with totals immutable', async () => {
    await assertFails(updateDoc(doc(technician, 'mesaPartsOrders', orderId), { status: 'Hazırlanıyor', updatedAt: serverTimestamp() }));
    await assertSucceeds(updateDoc(doc(admin, 'mesaPartsOrders', orderId), { status: 'Hazırlanıyor', updatedAt: serverTimestamp() }));
    await assertFails(updateDoc(doc(admin, 'mesaPartsOrders', orderId), { total: 1, updatedAt: serverTimestamp() }));
    await assertFails(deleteDoc(doc(technician, 'mesaPartsOrders', orderId)));
    await assertSucceeds(deleteDoc(doc(admin, 'mesaPartsOrders', orderId)));
  });

  it('does not grant access to unrelated collections', async () => {
    await assertFails(setDoc(doc(admin, 'otherSite', 'record'), { value: 'test' }));
    await assertFails(getDocs(collection(admin, 'otherSite')));
  });
});
