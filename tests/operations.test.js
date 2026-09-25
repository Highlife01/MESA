import { describe, expect, it } from 'vitest';
import { partsCatalogData } from '../src/data/partsCatalogData';
import {
  CART_STORAGE_KEY, assertOperationRole, buildEmergencyJob, buildPartsOrder,
  createRecordCode, jobStatusPatch, parseSavedCart, readSavedCart, saveCart, signaturePatch,
} from '../src/lib/operations';

const customer = { customer: 'Test Yetkili', phone: '05330000000', machine: 'CAT 320', issue: 'Pompa arızası', location: 'Adana' };
const buyer = { customerName: 'Test Yetkili', phone: '05330000000', address: 'Adana' };

describe('durable operation models', () => {
  it('creates an unassigned request without fabricated progress, ETA, contact or authority', () => {
    const job = buildEmergencyJob({ ...customer, status: 'Tamamlandı', ownerUid: 'other', cost: 500 }, 'owner', 'MS-code', 'now');
    expect(job).toMatchObject({ ownerUid: 'owner', status: 'Talep Alındı', stepIndex: 0, cost: 0 });
    expect(job.assignedTechnician).toBeNull();
    expect(job.etaMinutes).toBeNull();
    expect(job.supervisorSignature).toBeNull();
    expect(() => buildEmergencyJob({ ...customer, phone: ' ' }, 'owner', 'MS-code', 'now')).toThrow('Telefon');
  });

  it('uses full crypto UUIDs and refuses insecure randomness', () => {
    const uuid = '7a5c9b80-ea7b-467f-8d7b-e6c33769596b';
    expect(createRecordCode('MS', { randomUUID: () => uuid })).toBe(`MS-${uuid.toUpperCase()}`);
    expect(() => createRecordCode('MS', {})).toThrow('HTTPS');
  });

  it('restores quantities with canonical catalog prices and strips untrusted persisted fields', () => {
    const [part] = partsCatalogData;
    const [restored] = parseSavedCart(JSON.stringify([{ id: part.id, quantity: 3, price: 1, name: 'Fake', ownerUid: 'other' }]));
    expect(restored.price).toBe(part.price);
    expect(restored.name).toBe(part.name);
    expect(restored.quantity).toBe(3);
    expect(restored.ownerUid).toBeUndefined();
  });

  it.each(['{}', 'null', '[null]', '[{"id":"unknown","quantity":1}]', '[{"id":"PRT-101","quantity":-1}]', '[{"id":"PRT-101","quantity":1.5}]'])('rejects malformed cart storage: %s', serialized => {
    expect(() => parseSavedCart(serialized)).toThrow();
  });

  it('survives corrupted or unavailable browser storage', () => {
    expect(readSavedCart({ getItem: () => '{broken' })).toMatchObject({ cart: [], error: expect.any(String) });
    expect(readSavedCart({ getItem: () => { throw new Error('Blocked'); } }).error).toContain('okunamadı');
    expect(saveCart([], { setItem: () => { throw new Error('Quota'); } })).toBe(false);
    const values = new Map();
    const storage = { setItem: (key, value) => values.set(key, value), getItem: key => values.get(key) };
    expect(saveCart([{ ...partsCatalogData[0], quantity: 2 }], storage)).toBe(true);
    expect(JSON.parse(values.get(CART_STORAGE_KEY))).toEqual([{ id: 'PRT-101', quantity: 2 }]);
    expect(readSavedCart(storage).cart[0].quantity).toBe(2);
  });

  it('recalculates orders from known products and rejects empty or invalid quantities', () => {
    const order = buildPartsOrder({ ...buyer, total: 1, status: 'Teslim Edildi' }, [{ id: 'PRT-101', quantity: 2, price: 1 }], 'owner', 'SP-code', 'now');
    expect(order.total).toBe(partsCatalogData[0].price * 2);
    expect(order.status).toBe('Onay Bekliyor');
    expect(order.ownerUid).toBe('owner');
    expect(() => buildPartsOrder(buyer, [], 'owner', 'SP-code', 'now')).toThrow();
    expect(() => buildPartsOrder(buyer, [{ id: 'PRT-101', quantity: 1000 }], 'owner', 'SP-code', 'now')).toThrow();
  });

  it('keeps progress consistent and completes signatures and used parts in a single patch', () => {
    expect(jobStatusPatch('Şantiyede')).toEqual({ status: 'Şantiyede', stepIndex: 3 });
    expect(() => jobStatusPatch('Şantiyede', 5)).toThrow();
    expect(() => jobStatusPatch('unrecognized')).toThrow();
    const patch = signaturePatch({ signerName: 'Yetkili', signatureDataUrl: 'data:image/png;base64,YWJj', partsUsed: [{ name: 'Filtre', qty: 2 }] });
    expect(patch).toMatchObject({ status: 'Tamamlandı', stepIndex: 5, signerName: 'Yetkili', partsUsed: [{ name: 'Filtre', qty: 2 }] });
    expect(() => signaturePatch({ signerName: 'Yetkili', signatureDataUrl: 'data:text/html;base64,YWJj' })).toThrow();
    expect(() => signaturePatch({ signerName: 'Yetkili', signatureDataUrl: 'data:image/png;base64,YWJj', partsUsed: [{ name: 'Filtre', qty: -1 }] })).toThrow();
  });

  it('requires staff for mutations and admin for deletion', () => {
    expect(() => assertOperationRole(false, false)).toThrow('yetkiniz');
    expect(() => assertOperationRole(true, false, true)).toThrow('yetkiniz');
    expect(() => assertOperationRole(true, false)).not.toThrow();
    expect(() => assertOperationRole(true, true, true)).not.toThrow();
  });
});
