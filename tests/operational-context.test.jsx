import React from 'react';
import { act, cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  state: { firebaseUser: { uid: 'owner' }, loading: false, isStaff: false, isSuperAdmin: false },
  listeners: [],
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  session: vi.fn(),
}));
vi.mock('../src/context/AuthContext', () => ({ useAuth: () => mocks.state }));
vi.mock('../src/lib/firebase', () => ({ db: {}, isFirebaseConfigured: true, ensureSession: mocks.session }));
vi.mock('firebase/firestore', () => ({
  collection: (_, name) => ({ name }),
  doc: (_, name, id) => ({ name, id }),
  query: (source, constraint) => ({ ...source, constraint }),
  where: (field, operator, value) => ({ field, operator, value }),
  onSnapshot: (source, options, next, error) => {
    const unsubscribe = vi.fn();
    mocks.listeners.push({ source, next, error, unsubscribe });
    return unsubscribe;
  },
  setDoc: mocks.setDoc,
  updateDoc: mocks.updateDoc,
  deleteDoc: mocks.deleteDoc,
  serverTimestamp: () => 'server-timestamp',
  runTransaction: vi.fn(),
}));

import { OperationalProvider, useOperational } from '../src/context/OperationalContext';
import { CART_STORAGE_KEY } from '../src/lib/operations';

let operations;
function Probe() { operations = useOperational(); return null; }
const mount = () => render(<OperationalProvider><Probe /></OperationalProvider>);
const snapshot = (records = [], metadata = {}) => ({
  metadata: { fromCache: false, hasPendingWrites: false, ...metadata },
  docs: records.map(record => ({ data: () => ({ ...record, createdAt: { toDate: () => new Date('2026-09-01') } }) })),
});

beforeEach(() => {
  mocks.state = { firebaseUser: { uid: 'owner' }, loading: false, isStaff: false, isSuperAdmin: false };
  mocks.listeners.length = 0;
  mocks.setDoc.mockReset();
  mocks.setDoc.mockResolvedValue(undefined);
  mocks.updateDoc.mockReset();
  mocks.deleteDoc.mockReset();
  mocks.session.mockReset();
  mocks.session.mockResolvedValue({ uid: 'owner' });
  const values = new Map();
  vi.stubGlobal('localStorage', {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    clear: () => values.clear(),
  });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe('operation provider persistence and access', () => {
  it('queries only the current customer records and hides data on identity change', async () => {
    const view = mount();
    expect(mocks.listeners).toHaveLength(2);
    expect(mocks.listeners[0].source.constraint).toEqual({ field: 'ownerUid', operator: '==', value: 'owner' });
    const oldListener = mocks.listeners[0];
    act(() => {
      mocks.listeners[0].next(snapshot([{ id: 'private', status: 'Talep Alındı' }]));
      mocks.listeners[1].next(snapshot());
    });
    expect(operations.liveJobs[0].id).toBe('private');
    mocks.state = { ...mocks.state, firebaseUser: { uid: 'other' } };
    view.rerender(<OperationalProvider><Probe /></OperationalProvider>);
    expect(operations.liveJobs).toEqual([]);
    expect(oldListener.unsubscribe).toHaveBeenCalled();
    act(() => oldListener.next(snapshot([{ id: 'stale-private' }])));
    expect(operations.liveJobs).toEqual([]);
    expect(mocks.listeners.at(-1).source.constraint.value).toBe('other');
  });

  it('shows only server-confirmed snapshots and clears both collections on permission loss', () => {
    mount();
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
    localStorage.setItem(CART_STORAGE_KEY, '[{"id":"PRT-101","quantity":2}]');
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
    expect(JSON.parse(localStorage.getItem(CART_STORAGE_KEY))).toEqual([{ id: 'PRT-101', quantity: 2 }]);
    expect(operations.partsOrders).toEqual([]);
  });

  it('waits for write acknowledgement before completing an order and clearing submitted quantities', async () => {
    localStorage.setItem(CART_STORAGE_KEY, '[{"id":"PRT-101","quantity":2}]');
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

  it('blocks customer mutations before sending them to Firestore', async () => {
    mount();
    await act(async () => {
      await expect(operations.updateJobStatus('private', 'Tamamlandı')).rejects.toThrow('yetkiniz');
      await expect(operations.deleteJob('private')).rejects.toThrow('yetkiniz');
    });
    expect(mocks.updateDoc).not.toHaveBeenCalled();
    expect(mocks.deleteDoc).not.toHaveBeenCalled();
  });

  it('uses unrestricted collection queries only for verified staff', () => {
    mocks.state = { ...mocks.state, isStaff: true };
    mount();
    expect(mocks.listeners[0].source).toEqual({ name: 'mesaJobs' });
    expect(mocks.listeners[1].source).toEqual({ name: 'mesaPartsOrders' });
  });
});
