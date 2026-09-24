import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { AUDIT_EVENT_NAME } from '../lib/security';

const OperationalContext = createContext();

const safeGetStorage = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const safeSetStorage = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`[MESA Storage] Failed to persist ${key}:`, e);
  }
};

// ============ INITIAL DATASETS ============

export const DEFAULT_MACHINES = [
  {
    id: 'MCH-01-ABC-32',
    token: 'mch_8f4c21a7',
    name: 'JCB 3CX Eco Kazıcı Yükleyici',
    brand: 'JCB',
    model: '3CX Eco',
    year: '2021',
    hours: 8421,
    site: 'Seyhan OSB Şantiyesi, Adana',
    status: 'Serviste',
    statusTone: 'amber',
    customerId: 'cust_abc_insaat',
    customerName: 'ABC İnşaat Ltd. Şti.',
    customerPhone: '0532 555 0128',
    serial: 'JCB3CX21A00482',
    chassis: 'JCB3CX00482REV',
    nextMaintenance: '8.500 saat bakımı · 79 saat kaldı',
    nextHoursThreshold: 8500,
    lastService: '12.09.2026',
    activeWorkOrder: 'MS-5102',
    issue: 'Powershift 2. viteste sarsıntı ve çekiş düşüklüğü',
    qrRotatedAt: null,
    timeline: [
      { date: '12.09.2026', time: '11:15', title: 'Servis Çağrısı Alındı', text: 'Ön teşhis kaydı oluşturuldu ve Ahmet Usta sahaya sevk edildi.', state: 'Devam Ediyor', actor: 'Süper Admin' },
      { date: '12.09.2026', time: '12:40', title: 'Basınç Ölçümü & Teşhis', text: 'Şanzıman selenoid basınç testleri tamamlandı, selenoid bobin arızası tespit edildi.', state: 'Şantiyede', actor: 'Ahmet Usta' },
      { date: '13.09.2026', time: '09:30', title: 'Parça Montajı & Test', text: 'JCB OEM Şanzıman Filtresi ve Selenoid Bobini takıldı, vites geçişleri test edildi.', state: 'Aksiyon Bekliyor', actor: 'Ahmet Usta' }
    ]
  },
  {
    id: 'MCH-01-ABC-14',
    token: 'mch_3c91bd20',
    name: 'Manitou MT 1440 Telehandler',
    brand: 'Manitou',
    model: 'MT 1440 Easy',
    year: '2020',
    hours: 9920,
    site: 'Ceyhan Taş Ocağı Şantiyesi',
    status: 'Bakım yaklaşıyor',
    statusTone: 'red',
    customerId: 'cust_abc_insaat',
    customerName: 'ABC İnşaat Ltd. Şti.',
    customerPhone: '0532 555 0128',
    serial: 'MT1440X2020A91',
    chassis: 'MAN1440A91REV',
    nextMaintenance: '10.000 saat ana bakımı · 80 saat kaldı',
    nextHoursThreshold: 10000,
    lastService: '19.08.2026',
    activeWorkOrder: null,
    issue: null,
    qrRotatedAt: null,
    timeline: [
      { date: '19.08.2026', time: '14:00', title: 'Periyodik 9.500 Saat Bakımı', text: 'Hidrolik filtreler, bom zincirleri ve yük momenti sensörleri kalibre edildi.', state: 'Tamamlandı', actor: 'Mehmet Usta' },
      { date: '19.08.2026', time: '16:30', title: '10.000 Saat Bakım Hatırlatıcısı', text: 'Ana revizyon eşiği için telematik uyarısı planlandı.', state: 'Planlandı', actor: 'Sistem' }
    ]
  },
  {
    id: 'MCH-01-ABC-20',
    token: 'mch_5a27ef11',
    name: 'CAT 320D2 Paletli Ekskavatör',
    brand: 'CAT',
    model: '320D2 GC',
    year: '2022',
    hours: 6150,
    site: 'Kozan Mermer Sahası',
    status: 'Aktif sahada',
    statusTone: 'emerald',
    customerId: 'cust_abc_insaat',
    customerName: 'ABC İnşaat Ltd. Şti.',
    customerPhone: '0532 555 0128',
    serial: 'CAT320D2KZ8841',
    chassis: 'CAT320D2KZ8841',
    nextMaintenance: '6.500 saat bakımı · 350 saat kaldı',
    nextHoursThreshold: 6500,
    lastService: '04.08.2026',
    activeWorkOrder: null,
    issue: null,
    qrRotatedAt: null,
    timeline: [
      { date: '04.08.2026', time: '10:00', title: '6.000 Saat Periyodik Bakım', text: 'Motor yağı, hidrolik dönüş filtreleri ve cer yağları yenilendi.', state: 'Tamamlandı', actor: 'Can Usta' }
    ]
  },
  {
    id: 'MCH-01-KY-82',
    token: 'mch_e1a4d90b',
    name: 'CAT 320D Paletli Ekskavatör (Ağır Hizmet)',
    brand: 'CAT',
    model: '320D Heavy',
    year: '2021',
    hours: 4850,
    site: 'Ceyhan Taş Ocağı Şantiyesi',
    status: 'Serviste',
    statusTone: 'amber',
    customerId: 'cust_kaya_hafriyat',
    customerName: 'Kaya Hafriyat & Madencilik Ltd.',
    customerPhone: '0533 444 5566',
    serial: 'CAT0320DV99841',
    chassis: 'CAT0320DV99841',
    nextMaintenance: '5.000 saat ana bakımı · 150 saat kaldı',
    nextHoursThreshold: 5000,
    lastService: '14.09.2026',
    activeWorkOrder: 'MS-8294',
    issue: 'Hidrolik ana pompa aşırı ısınıyor / Bom yavaşlıyor',
    qrRotatedAt: null,
    timeline: [
      { date: '23.09.2026', time: '14:20', title: 'Acil Çağrı Alındı', text: 'Pompa aşırı ısınma bildirimi ile mobil ekip yola çıktı.', state: 'Yolda', actor: 'Süper Admin' }
    ]
  },
  {
    id: 'MCH-01-HM-22',
    token: 'mch_7b29f03c',
    name: 'Hidromek HMK 220LC Paletli Ekskavatör',
    brand: 'Hidromek',
    model: 'HMK 220LC GEN',
    year: '2023',
    hours: 7200,
    site: 'Kozan Taş Ocağı',
    status: 'Müsait',
    statusTone: 'emerald',
    customerId: 'cust_ozdemir_maden',
    customerName: 'Özdemir Madencilik A.Ş.',
    customerPhone: '0533 888 1234',
    serial: 'HMK220LC23K101',
    chassis: 'HMK220LC23K101',
    nextMaintenance: '7.500 saat bakımı · 300 saat kaldı',
    nextHoursThreshold: 7500,
    lastService: '14.08.2026',
    activeWorkOrder: null,
    issue: null,
    qrRotatedAt: null,
    timeline: [
      { date: '14.08.2026', time: '15:30', title: 'Boom Silindir Revizyonu', text: 'Keçe takımı değişti, basınç testi 380 bar olarak onaylandı.', state: 'Tamamlandı', actor: 'Mehmet Usta' }
    ]
  }
];

const DEFAULT_LIVE_JOBS = [
  {
    id: 'MS-8294',
    code: 'MS-8294',
    customer: 'Kaya Hafriyat & Madencilik Ltd.',
    customerId: 'cust_kaya_hafriyat',
    phone: '0533 444 5566',
    machine: 'CAT 320D Paletli Ekskavatör',
    machineId: 'MCH-01-KY-82',
    issue: 'Hidrolik ana pompa aşırı ısınıyor / Bom yavaşlıyor',
    location: 'Ceyhan Taş Ocağı Şantiyesi',
    status: 'Mobil Ekip Yolda',
    stepIndex: 2,
    assignedTechnician: 'Mehmet Usta (Baş Teknisyen)',
    vehicle: '01 MSA 01 (Ford Transit 4x4)',
    techDistance: '4.2 km',
    etaMinutes: 14,
    createdAt: '14:20',
    partsUsed: ['CAT Hidrolik Basınç Filtresi', 'Pilot Valf O-Ring Kiti'],
    cost: 18500,
    meterHours: 4850,
    supervisorSignature: null,
    technicianSignature: null,
    evidence: [
      {
        id: 'ev_01',
        title: 'Pompa Basınç Manometresi',
        category: 'Basınç Testi',
        notes: 'Giriş basıncı 180 bar (nominal 350 bar altında).',
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        timestamp: '23.09.2026 14:45'
      }
    ]
  },
  {
    id: 'MS-5102',
    code: 'MS-5102',
    customer: 'ABC İnşaat Ltd. Şti.',
    customerId: 'cust_abc_insaat',
    phone: '0532 555 0128',
    machine: 'JCB 3CX Eco Kazıcı Yükleyici',
    machineId: 'MCH-01-ABC-32',
    issue: 'Powershift 2. viteste sarsıntı ve çekiş düşüklüğü',
    location: 'Seyhan OSB Şantiyesi, Adana',
    status: 'Şantiyede',
    stepIndex: 3,
    assignedTechnician: 'Ahmet Usta (Hidrolik Uzmanı)',
    vehicle: '01 MSA 02 (Iveco Daily)',
    techDistance: '0.0 km (Şantiyede)',
    etaMinutes: 0,
    createdAt: '11:15',
    partsUsed: ['JCB Şanzıman Filtresi', 'Selenoid Bobini'],
    cost: 12400,
    meterHours: 8421,
    supervisorSignature: null,
    technicianSignature: null,
    evidence: [
      {
        id: 'ev_02',
        title: 'Powershift Valf Bloğu',
        category: 'Yapılan İşlem',
        notes: '2. vites selenoid bobini yanık tespit edildi, OEM parça ile değiştirildi.',
        url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
        timestamp: '23.09.2026 12:10'
      }
    ]
  },
  {
    id: 'MS-3071',
    code: 'MS-3071',
    customer: 'Özdemir Madencilik A.Ş.',
    customerId: 'cust_ozdemir_maden',
    phone: '0533 888 1234',
    machine: 'Hidromek HMK 220LC',
    machineId: 'MCH-01-HM-22',
    issue: 'Boom silindir keçesi patlak, yağ kaçağı mevcut',
    location: 'Kozan Taş Ocağı',
    status: 'Tamamlandı',
    stepIndex: 5,
    assignedTechnician: 'Can Usta (Saha Teknisyeni)',
    vehicle: '01 MSA 03 (Renault Master)',
    techDistance: '0.0 km',
    etaMinutes: 0,
    createdAt: '09:45',
    partsUsed: ['Hidromek Boom Silindir Keçe Takımı', 'Hidrolik Yağ 20L'],
    cost: 8750,
    meterHours: 7200,
    supervisorSignature: 'data:image/png;base64,completed',
    technicianSignature: 'data:image/png;base64,completed',
    evidence: [
      {
        id: 'ev_03',
        title: 'Silindir Keçe Revizyonu',
        category: 'Değişen Parça',
        notes: 'Parker yüksek basınç keçe grubu montajı tamamlandı, kaçak testi yapıldı.',
        url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80',
        timestamp: '23.09.2026 11:30'
      }
    ]
  }
];

const DEFAULT_INVENTORY_ITEMS = [
  { id: 'part_cat_filter', name: 'CAT Hidrolik Basınç Filtresi (OEM)', oem: 'CAT-1R-0716', stock: 14, minStock: 5, price: 2450, unit: 'Adet', category: 'Filtre' },
  { id: 'part_jcb_trans_filter', name: 'JCB Powershift Şanzıman Filtresi', oem: 'JCB-581-18070', stock: 8, minStock: 4, price: 3200, unit: 'Adet', category: 'Filtre' },
  { id: 'part_solenoid_valve', name: 'Parker 24V Oransal Selenoid Bobini', oem: 'PRK-24V-091', stock: 12, minStock: 3, price: 4600, unit: 'Adet', category: 'Valf & Elektrik' },
  { id: 'part_hydraulic_hose_4sp', name: 'Parker 4SP Hidrolik Hortum (500 Bar)', oem: 'PRK-4SP-34', stock: 35, minStock: 10, price: 1850, unit: 'Metre', category: 'Hortum' },
  { id: 'part_seal_kit_hmk', name: 'Hidromek Boom Silindir Keçe Kiti (Kastas)', oem: 'KST-HMK-140', stock: 6, minStock: 2, price: 3800, unit: 'Takım', category: 'Keçe Grubu' },
  { id: 'part_hydraulic_oil_46', name: 'Shell Tellus S2 V 46 Hidrolik Yağ (20L)', oem: 'SHL-TL-46', stock: 24, minStock: 8, price: 2900, unit: 'Teneke', category: 'Yağ & Sıvı' }
];

const DEFAULT_INVENTORY_MOVEMENTS = [
  { id: 'mov_01', partId: 'part_cat_filter', partName: 'CAT Hidrolik Basınç Filtresi (OEM)', type: 'consumption', qty: 1, workOrderCode: 'MS-8294', actor: 'Mehmet Usta', timestamp: '2026-09-23 14:35', note: 'İş emri saha sarfiyatı' },
  { id: 'mov_02', partId: 'part_solenoid_valve', partName: 'Parker 24V Oransal Selenoid Bobini', type: 'consumption', qty: 1, workOrderCode: 'MS-5102', actor: 'Ahmet Usta', timestamp: '2026-09-23 12:15', note: 'Powershift 2. vites selenoid değişimi' },
  { id: 'mov_03', partId: 'part_hydraulic_hose_4sp', partName: 'Parker 4SP Hidrolik Hortum (500 Bar)', type: 'restock', qty: 20, workOrderCode: '-', actor: 'Ali Bey (Depo)', timestamp: '2026-09-23 09:00', note: 'Tedarikçi merkez sevkiyat girişi' }
];

const DEFAULT_AUDIT_LOGS = [
  { id: 'aud_01', timestamp: '2026-09-23 17:00:15', actorName: 'Cebrail Kara', actorRole: 'super_admin', actionType: 'AUTH_LOGIN', details: 'Süper Admin güvenli oturum açtı.', resourceType: 'auth', resourceId: 'usr_super_admin' },
  { id: 'aud_02', timestamp: '2026-09-23 14:20:00', actorName: 'Süper Admin', actorRole: 'super_admin', actionType: 'WORK_ORDER_CREATED', details: 'MS-8294 nolu acil arıza iş emri oluşturuldu ve Mehmet Usta atandı.', resourceType: 'work_order', resourceId: 'MS-8294' },
  { id: 'aud_03', timestamp: '2026-09-23 12:15:20', actorName: 'Ahmet Usta', actorRole: 'technician', actionType: 'INVENTORY_CONSUMED', details: 'MS-5102 iş emrinde 1 adet Selenoid Bobini tüketildi.', resourceType: 'inventory', resourceId: 'part_solenoid_valve' },
  { id: 'aud_04', timestamp: '2026-09-23 11:30:10', actorName: 'Can Usta', actorRole: 'technician', actionType: 'WORK_ORDER_COMPLETED', details: 'MS-3071 iş emri müşteri dijital imzasıyla kapatıldı.', resourceType: 'work_order', resourceId: 'MS-3071' }
];

const DEFAULT_PARTS_ORDERS = [
  {
    orderCode: 'SP-4201',
    customerName: 'Ahmet Yılmaz',
    companyName: 'Kaya Hafriyat & Madencilik',
    phone: '0533 444 5566',
    taxNo: '1234567890',
    items: [
      { id: 'p1', name: 'CAT Hidrolik Basınç Filtresi', quantity: 3, price: 2450 },
      { id: 'p2', name: 'Pilot Valf O-Ring Kiti', quantity: 2, price: 850 }
    ],
    total: 9050,
    address: 'Ceyhan Taş Ocağı Şantiyesi, Adana',
    notes: 'Acil kargo talep edildi',
    status: 'Hazırlanıyor',
    createdAt: new Date().toISOString()
  }
];

export const OperationalProvider = ({ children }) => {
  // 1. Machines Fleet State
  const [machines, setMachines] = useState(() => safeGetStorage('mesa_machines', DEFAULT_MACHINES));
  const [revokedTokens, setRevokedTokens] = useState(() => safeGetStorage('mesa_revoked_tokens', []));

  // 2. Live Active Jobs Queue
  const [liveJobs, setLiveJobs] = useState(() => safeGetStorage('mesa_live_jobs', DEFAULT_LIVE_JOBS));

  // 3. Inventory & Double-Entry Movements
  const [inventoryItems, setInventoryItems] = useState(() => safeGetStorage('mesa_inventory_items', DEFAULT_INVENTORY_ITEMS));
  const [inventoryMovements, setInventoryMovements] = useState(() => safeGetStorage('mesa_inventory_movements', DEFAULT_INVENTORY_MOVEMENTS));

  // 4. Audit Log
  const [auditLogs, setAuditLogs] = useState(() => safeGetStorage('mesa_audit_logs', DEFAULT_AUDIT_LOGS));

  // 5. Cart for B2B Spare Parts
  const [cart, setCart] = useState(() => safeGetStorage('mesa_cart', []));

  // 6. B2B Parts Orders
  const [partsOrders, setPartsOrders] = useState(() => safeGetStorage('mesa_parts_orders', DEFAULT_PARTS_ORDERS));

  // 7. Global Toast Notification
  const [activeToast, setActiveToast] = useState(null);

  // Security module audit bridge: lib/security.js olaylarını state zincirine aktar
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const handler = (event) => {
      if (event.detail) setAuditLogs(prev => [event.detail, ...prev].slice(0, 500));
    };
    window.addEventListener(AUDIT_EVENT_NAME, handler);
    return () => window.removeEventListener(AUDIT_EVENT_NAME, handler);
  }, []);

  // Sync to Storage
  useEffect(() => safeSetStorage('mesa_machines', machines), [machines]);
  useEffect(() => safeSetStorage('mesa_revoked_tokens', revokedTokens), [revokedTokens]);
  useEffect(() => safeSetStorage('mesa_live_jobs', liveJobs), [liveJobs]);
  useEffect(() => safeSetStorage('mesa_inventory_items', inventoryItems), [inventoryItems]);
  useEffect(() => safeSetStorage('mesa_inventory_movements', inventoryMovements), [inventoryMovements]);
  useEffect(() => safeSetStorage('mesa_audit_logs', auditLogs), [auditLogs]);
  useEffect(() => safeSetStorage('mesa_cart', cart), [cart]);
  useEffect(() => safeSetStorage('mesa_parts_orders', partsOrders), [partsOrders]);

  // Toast Helper
  const showToast = (msg, type = 'success') => {
    setActiveToast({ message: msg, type, id: Date.now() });
    setTimeout(() => setActiveToast(null), 4500);
  };

  // Add Immutable Audit Record
  const addAuditLog = (entry) => {
    const newLog = {
      id: 'aud_' + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleString('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      actorName: entry.actorName || 'Sistem',
      actorRole: entry.actorRole || 'system',
      actionType: entry.actionType || 'INFO',
      details: entry.details || '',
      resourceType: entry.resourceType || 'general',
      resourceId: entry.resourceId || '-'
    };
    setAuditLogs(prev => [newLog, ...prev]);
    return newLog;
  };

  // ============ MACHINE & QR TOKEN MANAGEMENT ============

  // Rotate a machine's QR token (Cryptographically invalidating old, generating fresh)
  const rotateMachineToken = (machineId, actorName = 'Süper Admin') => {
    const machine = machines.find(m => m.id === machineId);
    if (!machine) return null;

    const oldToken = machine.token;
    const randomHex = Math.random().toString(36).substring(2, 10);
    const newToken = `mch_${randomHex}`;

    // Mark old token revoked
    setRevokedTokens(prev => [...new Set([...prev, oldToken])]);

    // Update machine
    const updated = {
      ...machine,
      token: newToken,
      qrRotatedAt: new Date().toISOString()
    };

    setMachines(prev => prev.map(m => m.id === machineId ? updated : m));

    // Audit log
    addAuditLog({
      actorName,
      actorRole: 'super_admin',
      actionType: 'QR_TOKEN_ROTATED',
      details: `${machine.name} (${machine.id}) için QR token yenilendi. Eski token (${oldToken}) geçersiz kılındı, yeni token: ${newToken}`,
      resourceType: 'machine',
      resourceId: machine.id
    });

    showToast(`QR Token Başarıyla Yenilendi: ${machine.id}`);
    return updated;
  };

  // Lookup machine by QR token
  const getMachineByToken = (token) => {
    if (!token) return { valid: false, reason: 'not_found' };
    if (revokedTokens.includes(token)) {
      return { valid: false, reason: 'revoked' };
    }
    const machine = machines.find(m => m.token === token);
    if (!machine) return { valid: false, reason: 'not_found' };
    return { valid: true, machine };
  };

  // Record meter hours
  const recordMeterReading = (machineId, hours, actorName = 'Teknisyen') => {
    const numericHours = Number(hours);
    if (isNaN(numericHours) || numericHours <= 0) return;

    setMachines(prev => prev.map(m => {
      if (m.id === machineId) {
        return {
          ...m,
          hours: numericHours,
          lastService: new Date().toLocaleDateString('tr-TR')
        };
      }
      return m;
    }));

    addAuditLog({
      actorName,
      actorRole: 'technician',
      actionType: 'METER_READING',
      details: `${machineId} makinesinin çalışma saati ${numericHours.toLocaleString('tr-TR')} saat olarak güncellendi.`,
      resourceType: 'machine',
      resourceId: machineId
    });

    showToast(`${machineId} sayacı güncellendi: ${numericHours} saat`);
  };

  // ============ WORK ORDERS & EVIDENCE ============

  // Add photo/test evidence to a work order
  const addWorkOrderEvidence = (orderCode, evidenceData, actorName = 'Teknisyen') => {
    const newEvidence = {
      id: 'ev_' + Date.now(),
      title: evidenceData.title || 'Saha Müdahale Fotoğrafı',
      category: evidenceData.category || 'Yapılan İşlem',
      notes: evidenceData.notes || '',
      url: evidenceData.url || '',
      timestamp: new Date().toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    setLiveJobs(prev => prev.map(job => {
      if (job.code === orderCode || job.id === orderCode) {
        return {
          ...job,
          evidence: [...(job.evidence || []), newEvidence]
        };
      }
      return job;
    }));

    addAuditLog({
      actorName,
      actorRole: 'technician',
      actionType: 'EVIDENCE_UPLOADED',
      details: `${orderCode} nolu iş emrine yeni servis kanıtı (${newEvidence.category} - ${newEvidence.title}) eklendi.`,
      resourceType: 'work_order',
      resourceId: orderCode
    });

    showToast(`Servis kanıtı başarıyla kaydedildi: ${newEvidence.title}`);
    return newEvidence;
  };

  // Create Emergency Request
  const createEmergencyJob = (jobData) => {
    const newCode = 'MS-' + Math.floor(1000 + Math.random() * 9000);
    const newJob = {
      id: newCode,
      code: newCode,
      customer: jobData.customer || 'Şantiye Yetkilisi',
      customerId: jobData.customerId || 'cust_generic',
      phone: jobData.phone || '0534 407 55 85',
      machine: jobData.machine || 'İş Makinası',
      machineId: jobData.machineId || 'MCH-01-GEN',
      issue: jobData.issue || 'Arıza Tespiti',
      location: jobData.location || 'Adana / Çukurova',
      status: 'Mobil Ekip Yolda',
      stepIndex: 1,
      assignedTechnician: jobData.assignedTechnician || 'Mehmet Usta (Nöbetçi Filo)',
      vehicle: jobData.vehicle || '01 MSA 01 (Mobil Servis)',
      techDistance: '8.5 km',
      etaMinutes: jobData.etaMinutes || 24,
      createdAt: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      partsUsed: [],
      cost: 0,
      meterHours: jobData.meterHours || 0,
      supervisorSignature: null,
      technicianSignature: null,
      evidence: []
    };

    setLiveJobs(prev => [newJob, ...prev]);

    // Update related machine status if applicable
    if (jobData.machineId) {
      setMachines(prev => prev.map(m => m.id === jobData.machineId ? { ...m, status: 'Serviste', activeWorkOrder: newCode } : m));
    }

    addAuditLog({
      actorName: 'Süper Admin',
      actorRole: 'super_admin',
      actionType: 'WORK_ORDER_CREATED',
      details: `${newCode} nolu arıza bildirimi alındı. Makine: ${newJob.machine}, Şantiye: ${newJob.location}`,
      resourceType: 'work_order',
      resourceId: newCode
    });

    showToast(`Yeni Arıza Çağrısı Alındı: ${newJob.id} - ${newJob.customer}`);
    return newJob;
  };

  // State Machine transition for Work Order (with completion gate enforcement)
  const transitionWorkOrderStatus = (idOrCode, newStatus, meta = {}) => {
    const actor = meta.actor || 'Teknisyen';
    const note = meta.note || `Durum: ${newStatus}`;

    const job = liveJobs.find(j => j.id === idOrCode || j.code === idOrCode);

    // ── COMPLETION GATE (Kabul testi: iş emri kanıt + imza + sayaç olmadan kapatılamaz) ──
    if (job && newStatus === 'Tamamlandı') {
      const hasEvidence = (job.evidence || []).length > 0;
      const hasSignature = Boolean(job.supervisorSignature);
      const hasMeter = Boolean(job.meterHours && Number(job.meterHours) > 0);
      const missing = [];
      if (!hasEvidence) missing.push('servis kanıtı (fotoğraf/ölçüm)');
      if (!hasSignature) missing.push('müşteri dijital imzası');
      if (!hasMeter) missing.push('son sayaç saati');
      if (missing.length > 0) {
        addAuditLog({
          actorName: actor,
          actorRole: meta.actorRole || 'technician',
          actionType: 'COMPLETION_BLOCKED',
          details: `${idOrCode} iş emri kapatılamadı. Eksik zorunlu alanlar: ${missing.join(', ')}.`,
          resourceType: 'work_order',
          resourceId: idOrCode
        });
        showToast(`İş emri kapatılamadı — eksik: ${missing.join(', ')}`, 'error');
        return { success: false, reason: 'incomplete', missing };
      }
    }

    setLiveJobs(prev => prev.map(j => {
      if (j.id === idOrCode || j.code === idOrCode) {
        return {
          ...j,
          status: newStatus,
          stepIndex: meta.stepIndex !== undefined ? meta.stepIndex : j.stepIndex,
          meterHours: meta.meterHours || j.meterHours,
          statusHistory: [...(j.statusHistory || []), {
            fromStatus: j.status,
            toStatus: newStatus,
            actorId: actor,
            occurredAt: new Date().toISOString(),
            note,
            location: meta.location || j.location || null
          }]
        };
      }
      return j;
    }));

    // If completed, update machine status too
    if (newStatus === 'Tamamlandı' && job && job.machineId) {
      setMachines(prev => prev.map(m => m.id === job.machineId ? { ...m, status: 'Aktif sahada', activeWorkOrder: null } : m));
    }

    addAuditLog({
      actorName: actor,
      actorRole: meta.actorRole || 'technician',
      actionType: 'STATUS_TRANSITION',
      details: `${idOrCode} iş emri durumu "${job?.status || '?'}" → "${newStatus}" olarak güncellendi. Not: ${note}`,
      resourceType: 'work_order',
      resourceId: idOrCode
    });

    showToast(`${idOrCode} durumu güncellendi: ${newStatus}`);
    return { success: true };
  };

  const updateOrderStatus = (idOrCode, newStatus, stepIndex) => {
    transitionWorkOrderStatus(idOrCode, newStatus, { stepIndex });
  };

  // Record Signature
  const recordSignature = (idOrCode, sigData, actorName = 'Teknisyen') => {
    setLiveJobs(prev => prev.map(job => {
      if (job.id === idOrCode || job.code === idOrCode) {
        return {
          ...job,
          supervisorSignature: sigData?.signatureDataUrl || job.supervisorSignature,
          signerName: sigData?.signerName || job.signerName,
          signerRole: sigData?.signerRole || job.signerRole,
          technicianNotes: sigData?.technicianNotes || job.technicianNotes,
          status: 'Tamamlandı',
          stepIndex: 5
        };
      }
      return job;
    }));

    addAuditLog({
      actorName,
      actorRole: 'technician',
      actionType: 'CUSTOMER_SIGNATURE',
      details: `${idOrCode} iş emri için ${sigData?.signerName || 'Şantiye Yetkilisi'} dijital imza attı ve iş teslim edildi.`,
      resourceType: 'work_order',
      resourceId: idOrCode
    });

    showToast(`${idOrCode} nolu iş emri dijital olarak imzalandı ve kapatıldı!`);
  };

  // Delete Job
  const deleteJob = (idOrCode) => {
    setLiveJobs(prev => prev.filter(job => job.id !== idOrCode && job.code !== idOrCode));
    addAuditLog({
      actorName: 'Süper Admin',
      actorRole: 'super_admin',
      actionType: 'WORK_ORDER_DELETED',
      details: `${idOrCode} nolu iş emri silindi.`,
      resourceType: 'work_order',
      resourceId: idOrCode
    });
    showToast(`${idOrCode} nolu iş emri sistemden silindi.`);
  };

  // ============ DOUBLE-ENTRY INVENTORY MOVEMENTS ============

  const recordInventoryMovement = ({ partId, partName, type, qty, workOrderCode, actor, note }) => {
    const numericQty = Math.max(1, Number(qty) || 1);

    // Update part stock
    setInventoryItems(prev => prev.map(item => {
      if (item.id === partId || item.name === partName) {
        const delta = type === 'consumption' ? -numericQty : numericQty;
        return {
          ...item,
          stock: Math.max(0, item.stock + delta)
        };
      }
      return item;
    }));

    // Record Movement in ledger
    const movement = {
      id: 'mov_' + Date.now(),
      partId,
      partName,
      type, // 'consumption' | 'restock' | 'reservation' | 'return'
      qty: numericQty,
      workOrderCode: workOrderCode || '-',
      actor: actor || 'Teknisyen',
      timestamp: new Date().toLocaleString('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      note: note || ''
    };

    setInventoryMovements(prev => [movement, ...prev]);

    // If consumed in a job, append to job's partsUsed
    if (workOrderCode && workOrderCode !== '-') {
      setLiveJobs(prev => prev.map(job => {
        if (job.code === workOrderCode || job.id === workOrderCode) {
          const existing = job.partsUsed || [];
          return {
            ...job,
            partsUsed: [...existing, `${partName} (${numericQty} Adet)`]
          };
        }
        return job;
      }));
    }

    addAuditLog({
      actorName: actor || 'Teknisyen',
      actorRole: 'technician',
      actionType: 'INVENTORY_MOVEMENT',
      details: `${partName} için stok hareketi (${type === 'consumption' ? 'SARFİYAT' : 'GİRİŞ'}): ${numericQty} Adet. İş Emri: ${workOrderCode}`,
      resourceType: 'inventory',
      resourceId: partId
    });

    showToast(`Stok Hareketi İşlendi: ${partName} (${numericQty} Adet)`);
    return movement;
  };

  // ============ CART & SPARE PARTS ============

  const addToCart = (part, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === part.id);
      if (existing) {
        return prev.map(item => item.id === part.id ? { ...item, quantity: (item.quantity || item.qty || 0) + qty } : item);
      }
      return [...prev, { ...part, quantity: qty }];
    });
    showToast(`${part.name} sepete eklendi.`);
  };

  const removeFromCart = (partId) => {
    setCart(prev => prev.filter(item => item.id !== partId));
  };

  const updateCartQty = (partId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(partId);
      return;
    }
    setCart(prev => prev.map(item => item.id === partId ? { ...item, quantity: newQty } : item));
  };

  const clearCart = () => setCart([]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || item.qty || 0), 0);
  }, [cart]);

  const createPartsOrder = (orderData) => {
    const orderCode = 'SP-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      orderCode,
      customerName: orderData.customerName || '',
      companyName: orderData.companyName || '',
      phone: orderData.phone || '',
      taxNo: orderData.taxNo || '',
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        oem: item.oem || '',
        quantity: item.quantity || item.qty || 1,
        price: item.price || 0
      })),
      total: cartTotal,
      address: orderData.address || '',
      notes: orderData.notes || '',
      status: 'Onay Bekliyor',
      createdAt: new Date().toISOString()
    };

    setPartsOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast(`Sipariş ${orderCode} başarıyla oluşturuldu!`);
    return newOrder;
  };

  const deletePartsOrder = (orderCode) => {
    setPartsOrders(prev => prev.filter(o => o.orderCode !== orderCode));
    showToast(`${orderCode} nolu sipariş silindi.`);
  };

  const updatePartsOrderStatus = (orderCode, newStatus) => {
    setPartsOrders(prev => prev.map(o => o.orderCode === orderCode ? { ...o, status: newStatus } : o));
    showToast(`${orderCode} nolu sipariş durumu güncellendi: ${newStatus}`);
  };

  const unreadAlertsCount = useMemo(() => {
    return liveJobs.filter(j => j.status !== 'Tamamlandı').length;
  }, [liveJobs]);

  return (
    <OperationalContext.Provider
      value={{
        // Machines & QR Tokens
        machines,
        rotateMachineToken,
        getMachineByToken,
        recordMeterReading,
        revokedTokens,

        // Work Orders & Jobs
        liveJobs,
        activeOrders: liveJobs,
        createEmergencyJob,
        addEmergencyOrder: createEmergencyJob,
        updateJobStatus: transitionWorkOrderStatus,
        updateOrderStatus,
        transitionWorkOrderStatus,
        addWorkOrderEvidence,
        recordSignature,
        deleteJob,
        unreadAlertsCount,

        // Inventory & Double-Entry Ledger
        inventoryItems,
        inventoryMovements,
        recordInventoryMovement,

        // Audit Logs
        auditLogs,
        addAuditLog,

        // Cart & Parts Orders
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        cartTotal,
        partsOrders,
        createPartsOrder,
        deletePartsOrder,
        updatePartsOrderStatus,

        // Toast
        showToast
      }}
    >
      {children}

      {/* Global Alert Toast */}
      {activeToast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 border-2 border-amber-500 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 max-w-sm">
          <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
          <div className="text-xs font-bold leading-tight">
            {typeof activeToast === 'string' ? activeToast : activeToast.message}
          </div>
        </div>
      )}
    </OperationalContext.Provider>
  );
};

export const useOperational = () => {
  const context = useContext(OperationalContext);
  if (!context) {
    throw new Error('useOperational must be used within an OperationalProvider');
  }
  return context;
};
