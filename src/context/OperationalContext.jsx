import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

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

const DEFAULT_LIVE_JOBS = [
  {
    id: 'MS-8294',
    code: 'MS-8294',
    customer: 'Kaya Hafriyat & Madencilik',
    phone: '0533 444 5566',
    machine: 'CAT 320D Paletli Ekskavatör',
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
    supervisorSignature: null,
    technicianSignature: null
  },
  {
    id: 'MS-5102',
    code: 'MS-5102',
    customer: 'ABC İnşaat Ltd.',
    phone: '0532 555 0128',
    machine: 'JCB 3CX Eco Kazıcı Yükleyici',
    issue: 'Powershift 2. viteste sarsıntı ve çekiş düşüklüğü',
    location: 'Seyhan Metal Sanayi',
    status: 'Şantiyede',
    stepIndex: 3,
    assignedTechnician: 'Ahmet Usta (Hidrolik Uzmanı)',
    vehicle: '01 MSA 02 (Iveco Daily Yüksek Tavan)',
    techDistance: '0.0 km (Şantiyede)',
    etaMinutes: 0,
    createdAt: '11:15',
    partsUsed: ['JCB Şanzıman Filtresi', 'Selenoid Bobini'],
    cost: 12400,
    supervisorSignature: null,
    technicianSignature: null
  },
  {
    id: 'MS-3071',
    code: 'MS-3071',
    customer: 'Özdemir Madencilik A.Ş.',
    phone: '0533 888 1234',
    machine: 'Hidromek HMK 220LC',
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
    supervisorSignature: 'data:image/png;base64,completed',
    technicianSignature: 'data:image/png;base64,completed'
  }
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
  // Live Active Jobs Queue (Synchronized across site, wizard, tracker, technician, ERP and LocalStorage)
  const [liveJobs, setLiveJobs] = useState(() => safeGetStorage('mesa_live_jobs', DEFAULT_LIVE_JOBS));

  // Cart for B2B Spare Parts (Persisted across refreshes)
  const [cart, setCart] = useState(() => safeGetStorage('mesa_cart', []));

  // B2B Parts Orders (completed orders persisted)
  const [partsOrders, setPartsOrders] = useState(() => safeGetStorage('mesa_parts_orders', DEFAULT_PARTS_ORDERS));

  // Sync to LocalStorage on state change
  useEffect(() => {
    safeSetStorage('mesa_live_jobs', liveJobs);
  }, [liveJobs]);

  useEffect(() => {
    safeSetStorage('mesa_cart', cart);
  }, [cart]);

  useEffect(() => {
    safeSetStorage('mesa_parts_orders', partsOrders);
  }, [partsOrders]);

  // Live Toast Notifications
  const [activeToast, setActiveToast] = useState(null);

  // ============ ALIASES for Dashboard compatibility ============
  // Dashboard expects `activeOrders` — alias to liveJobs
  const activeOrders = liveJobs;

  // Unread alerts count (jobs that aren't completed)
  const unreadAlertsCount = useMemo(() => {
    return liveJobs.filter(j => j.status !== 'Tamamlandı').length;
  }, [liveJobs]);

  // ============ EMERGENCY JOBS ============

  // Create new Emergency Request from Wizard
  const createEmergencyJob = (jobData) => {
    const newCode = 'MS-' + Math.floor(1000 + Math.random() * 9000);
    const newJob = {
      id: newCode,
      code: newCode,
      customer: jobData.customer || 'Şantiye Yetkilisi',
      phone: jobData.phone || '0533 000 0000',
      machine: jobData.machine || 'İş Makinası',
      issue: jobData.issue || 'Arıza Tespiti',
      location: jobData.location || 'Adana / Çukurova',
      status: 'Mobil Ekip Yolda',
      stepIndex: 1,
      assignedTechnician: 'Mehmet Usta (Nöbetçi Filo)',
      vehicle: '01 MSA 01 (Mobil Servis)',
      techDistance: '8.5 km',
      etaMinutes: 24,
      createdAt: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      partsUsed: [],
      cost: 0,
      supervisorSignature: null,
      technicianSignature: null
    };

    setLiveJobs(prev => [newJob, ...prev]);
    showToast(`Yeni Arıza Çağrısı Alındı: ${newJob.id} - ${newJob.customer}`);
    return newJob;
  };

  // Alias for EmergencyWizardPage compatibility
  const addEmergencyOrder = (jobData) => {
    return createEmergencyJob(jobData);
  };

  // Update Job Status (supports both `id` and `code` lookup)
  const updateJobStatus = (idOrCode, newStatus, stepIndex) => {
    setLiveJobs(prev => prev.map(job => {
      if (job.id === idOrCode || job.code === idOrCode) {
        return { ...job, status: newStatus, stepIndex: stepIndex !== undefined ? stepIndex : job.stepIndex };
      }
      return job;
    }));
    showToast(`${idOrCode} nolu iş emri durumu güncellendi: ${newStatus}`);
  };

  // Alias for Dashboard compatibility
  const updateOrderStatus = updateJobStatus;

  // Sign Job Order Digitally (both supervisor and technician signatures)
  const signJobOrder = (id, supSig, techSig) => {
    setLiveJobs(prev => prev.map(job => {
      if (job.id === id || job.code === id) {
        return {
          ...job,
          supervisorSignature: supSig || job.supervisorSignature,
          technicianSignature: techSig || job.technicianSignature,
          status: 'Tamamlandı',
          stepIndex: 5
        };
      }
      return job;
    }));
    showToast(`${id} nolu iş emri dijital olarak imzalandı ve kapatıldı!`);
  };

  // Record customer/site-authority signature captured on the Technician terminal
  const recordSignature = (idOrCode, sigData) => {
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
    showToast(`${idOrCode} nolu iş emri dijital olarak imzalandı ve kapatıldı!`);
  };

  // Delete Job Order (Super Admin only)
  const deleteJob = (idOrCode) => {
    setLiveJobs(prev => prev.filter(job => job.id !== idOrCode && job.code !== idOrCode));
    showToast(`${idOrCode} nolu iş emri sistemden silindi.`);
  };

  // Delete Parts Order (Super Admin only)
  const deletePartsOrder = (orderCode) => {
    setPartsOrders(prev => prev.filter(o => o.orderCode !== orderCode));
    showToast(`${orderCode} nolu yedek parça siparişi silindi.`);
  };

  // Update Parts Order Status (Super Admin)
  const updatePartsOrderStatus = (orderCode, newStatus) => {
    setPartsOrders(prev => prev.map(o => {
      if (o.orderCode === orderCode) {
        return { ...o, status: newStatus };
      }
      return o;
    }));
    showToast(`${orderCode} nolu sipariş durumu güncellendi: ${newStatus}`);
  };

  // ============ CART FUNCTIONS ============

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
    setCart(prev => prev.map(item =>
      item.id === partId ? { ...item, quantity: newQty } : item
    ));
  };

  const clearCart = () => setCart([]);

  // Computed cart total
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || item.qty || 0), 0);
  }, [cart]);

  // Create B2B Parts Order
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

  // ============ TOAST ============

  const showToast = (msg, type = 'success') => {
    setActiveToast({ message: msg, type, id: Date.now() });
    setTimeout(() => setActiveToast(null), 4500);
  };

  return (
    <OperationalContext.Provider value={{
      // Jobs / Orders
      liveJobs,
      activeOrders,
      createEmergencyJob,
      addEmergencyOrder,
      updateJobStatus,
      updateOrderStatus,
      deleteJob,
      deletePartsOrder,
      signJobOrder,
      recordSignature,
      unreadAlertsCount,
      // Cart
      cart,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      cartTotal,
      // B2B Parts Orders
      partsOrders,
      createPartsOrder,
      updatePartsOrderStatus,
      // Toast
      showToast
    }}>
      {children}

      {/* Global Alert Toast */}
      {activeToast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 border-2 border-amber-500 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 max-w-sm">
          <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
          <div className="text-xs font-bold leading-tight">{typeof activeToast === 'string' ? activeToast : activeToast.message}</div>
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
