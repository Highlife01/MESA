import React from 'react';
import { act, cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  state: { isStaff: false, isSuperAdmin: false },
  user: { uid: 'owner' },
  tokenListener: null,
  listeners: [],
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  session: vi.fn(),
}));

vi.mock('../src/context/AuthContext', () => ({ useAuth: () => mocks.state }));
vi.mock('../src/lib/cloud', () => {
  const cloud = {
    db: {},
    auth: {},
    ensureSession: (...args) => mocks.session(...args),
    onIdTokenChanged: (_, callback) => {
      mocks.tokenListener = callback;
      callback(mocks.user);
      return () => { mocks.tokenListener = null; };
    },
    fs: {
      collection: (_, name) => ({ name }),
      doc: (_, name, id) => ({ name, id }),
      query: (source, constraint) => ({ ...source, constraint }),
      where: (field, operator, value) => ({ field, operator, value }),
      onSnapshot: (source, options, next, error) => {
        const unsubscribe = vi.fn();
        mocks.listeners.push({ source, next, error, unsubscribe });
        return unsubscribe;
      },
      setDoc: (...args) => mocks.setDoc(...args),
      updateDoc: (...args) => mocks.updateDoc(...args),
      deleteDoc: (...args) => mocks.deleteDoc(...args),
      serverTimestamp: () => 'server-timestamp',
    },
  };
  return { cloudConfigured: true, loadCloud: () => Promise.resolve(cloud) };
});

import { OperationalProvider, useOperational } from '../src/context/OperationalContext';
import { CART_STORAGE_KEY } from '../src/lib/operations';

let operations;
function Probe() { operations = useOperational(); return null; }
const mount = () => render(<OperationalProvider><Probe /></OperationalProvider>);
const connected = async (count = 2) => {
  await act(async () => { await operations.ensureCloud(); });
  await waitFor(() => expect(mocks.listeners).toHaveLength(count));
};
const snapshot = (records = [], metadata = {}) => ({
  metadata: { fromCache: false, hasPendingWrites: false, ...metadata },
  docs: records.map(record => ({ data: () => ({ ...record, createdAt: { toDate: () => new Date('2026-09-01') } }) })),
});

beforeEach(() => {
  mocks.state = { isStaff: false, isSuperAdmin: false };
  mocks.user = { uid: 'owner' };
  mocks.tokenListener = null;
  mocks.listeners.length = 0;
  mocks.setDoc.mockReset();
  mocks.setDoc.mockResolvedValue(undefined);
  mocks.updateDoc.mockReset();
  mocks.deleteDoc.mockReset();
  mocks.session.mockReset();
  mocks.session.mockResolvedValue({ uid: 'owner' });
  const values = new Map();
  vi.stubGlobal('sessionStorage', {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: key => values.delete(key),
    clear: () => values.clear(),
  });
  vi.stubGlobal('localStorage', {
    getItem: () => { throw new Error('localStorage must not be used'); },
    setItem: () => { throw new Error('localStorage must not be used'); },
    removeItem: () => { throw new Error('localStorage must not be used'); },
  });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe('operation provider persistence and access', () => {
  it('starts without demo data when cloud is configured', () => {
    mount();
    expect(operations.liveJobs).toEqual([]);
    expect(operations.partsOrders).toEqual([]);
  });

  it('queries only the current customer records and hides data on identity change', async () => {
    mount();
    await connected();
    expect(mocks.listeners[0].source.constraint).toEqual({ field: 'ownerUid', operator: '==', value: 'owner' });
    const oldListener = mocks.listeners[0];
    act(() => {
      oldListener.next(snapshot([{ id: 'private', status: 'Talep Alındı' }]));
      mocks.listeners[1].next(snapshot());
    });
    expect(operations.liveJobs[0].id).toBe('private');
    act(() => mocks.tokenListener({ uid: 'other' }));
    expect(operations.liveJobs).toEqual([]);
    expect(oldListener.unsubscribe).toHaveBeenCalled();
    act(() => oldListener.next(snapshot([{ id: 'stale-private' }])));
    expect(operations.liveJobs).toEqual([]);
    await connected(4);
    expect(mocks.listeners.at(-1).source.constraint.value).toBe('other');
  });

  it('shows only server-confirmed snapshots and clears both collections on permission loss', async () => {
    mount();
    await connected();
    act(() => mocks.listeners[0].next(snapshot([{ id: 'pending' }], { hasPendingWrites: true })));
    expect(operations.liveJobs).toEqual([]);
    act(() => mocks.listeners[0].next(snapshot([{ id: 'cached' }], { fromCache: true })));
    expect(operations.liveJobs).toEqual([]);
    act(() => {
      mocks.listeners[0].next(snapshot([{ id: 'saved' }]));
      mocks.listeners[1].next(snapshot([{ orderCode: 'saved-order' }]));
    });
    expect(operations.liveJobs).toHaveLength(1);
    act(() => mocks.listeners[0].error({ code: 'permission-denied' }));
    expect(operations.liveJobs).toEqual([]);
    expect(operations.partsOrders).toEqual([]);
    expect(operations.dataError).toContain('yetkiniz');
    expect(mocks.listeners[1].unsubscribe).toHaveBeenCalled();
    act(() => mocks.listeners[1].next(snapshot([{ orderCode: 'late-order' }])));
    expect(operations.partsOrders).toEqual([]);
  });

  it('restores a cart after remount and retains it when a write fails', async () => {
    sessionStorage.setItem(CART_STORAGE_KEY, '[{"id":"PRT-101","quantity":2}]');
    mount();
    expect(operations.cart[0].quantity).toBe(2);
    mocks.setDoc.mockRejectedValue({ code: 'permission-denied' });
    let error;
    await act(async () => {
      try {
        await operations.createPartsOrder({ customerName: 'Yetkili', phone: '05330000000', address: 'Adana' });
      } catch (failure) { error = failure; }
    });
    expect(error.message).toContain('yetkiniz');
    expect(operations.cart[0].quantity).toBe(2);
    expect(JSON.parse(sessionStorage.getItem(CART_STORAGE_KEY))).toEqual([{ id: 'PRT-101', quantity: 2 }]);
    expect(operations.partsOrders).toEqual([]);
  });

  it('waits for write acknowledgement before completing an order and clearing submitted quantities', async () => {
    sessionStorage.setItem(CART_STORAGE_KEY, '[{"id":"PRT-101","quantity":2}]');
    let acknowledge;
    mocks.setDoc.mockImplementation(() => new Promise(resolve => { acknowledge = resolve; }));
    mount();
    let submission;
    let saved;
    act(() => {
      submission = operations.createPartsOrder({ customerName: 'Yetkili', phone: '05330000000', address: 'Adana' }).then(result => { saved = result; });
    });
    await waitFor(() => expect(mocks.setDoc).toHaveBeenCalled());
    expect(saved).toBeUndefined();
    expect(operations.cart[0].quantity).toBe(2);
    act(() => operations.addToCart({ id: 'PRT-101', name: 'Filtre' }, 1));
    await act(async () => { acknowledge(); await submission; });
    expect(saved.ownerUid).toBe('owner');
    expect(saved.status).toBe('Onay Bekliyor');
    expect(saved.total).toBe(3700);
    expect(operations.cart[0].quantity).toBe(1);
    expect(mocks.setDoc.mock.calls[0][1].createdAt).toBe('server-timestamp');
  });

  it('creates an emergency job owned by the signed-in session', async () => {
    mount();
    let job;
    await act(async () => {
      job = await operations.createEmergencyJob({
        customer: 'Yetkili', phone: '05330000000', machine: 'CAT 320', issue: 'Pompa', location: 'Adana',
      });
    });
    expect(job.ownerUid).toBe('owner');
    expect(job.code).toMatch(/^MS-[0-9A-F-]{36}$/);
    expect(mocks.setDoc.mock.calls[0][0]).toEqual({ name: 'mesaJobs', id: job.code });
    expect(mocks.setDoc.mock.calls[0][1].status).toBe('Talep Alındı');
  });

  it('blocks customer mutations before sending them to Firestore', async () => {
    mount();
    await act(async () => {
      await expect(operations.updateJobStatus('private', 'Tamamlandı')).rejects.toThrow('yetkiniz');
      await expect(operations.deleteJob('private')).rejects.toThrow('yetkiniz');
      await expect(operations.updatePartsOrderStatus('SP-1', 'Hazırlanıyor')).rejects.toThrow('yetkiniz');
    });
    expect(mocks.updateDoc).not.toHaveBeenCalled();
    expect(mocks.deleteDoc).not.toHaveBeenCalled();
  });

  it('uses unrestricted collection queries only for verified staff', async () => {
    mocks.state = { ...mocks.state, isStaff: true };
    mount();
    await connected();
    expect(mocks.listeners[0].source).toEqual({ name: 'mesaJobs' });
    expect(mocks.listeners[1].source).toEqual({ name: 'mesaPartsOrders' });
  });

  it('lets staff advance a job status through Firestore', async () => {
    mocks.state = { ...mocks.state, isStaff: true };
    mount();
    await connected();
    act(() => {
      mocks.listeners[0].next(snapshot([{ id: 'MS-1', code: 'MS-1', status: 'Talep Alındı', stepIndex: 0 }]));
      mocks.listeners[1].next(snapshot());
    });
    await act(async () => { await operations.updateOrderStatus('MS-1', 'Atandı'); });
    expect(mocks.updateDoc).toHaveBeenCalledWith(
      { name: 'mesaJobs', id: 'MS-1' },
      { status: 'Atandı', stepIndex: 1, updatedAt: 'server-timestamp' },
    );
  });
});
