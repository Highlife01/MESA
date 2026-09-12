import React, { createContext, useContext, useState, useEffect } from 'react';

const OperationalContext = createContext();

export const OperationalProvider = ({ children }) => {
  // Live Active Jobs Queue (Synchronized across site, wizard, tracker, technician and ERP)
  const [liveJobs, setLiveJobs] = useState(() => {
    const saved = localStorage.getItem('mesa_live_jobs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'MS-8294',
        customer: 'Kaya Hafriyat & Madencilik',
        phone: '0533 444 5566',
        machine: 'CAT 320D Paletli Ekskavatör',
        issue: 'Hidrolik ana pompa aşırı ısınıyor / Bom yavaşlıyor',
        location: 'Ceyhan Taş Ocağı Şantiyesi',
        status: 'Yolda', // 'Yeni', 'Atandı', 'Yolda', 'Teşhiste', 'Onarımda', 'Tamamlandı'
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
        customer: 'ABC İnşaat Ltd.',
        phone: '0532 555 0128',
        machine: 'JCB 3CX Eco Kazıcı Yükleyici',
        issue: 'Powershift 2. viteste sarsıntı ve çekiş düşüklüğü',
        location: 'Seyhan Metal Sanayi',
        status: 'Teşhiste',
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
      }
    ];
  });

  // Cart for B2B Spare Parts
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('mesa_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  // Live Toast Notifications
  const [activeToast, setActiveToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('mesa_live_jobs', JSON.stringify(liveJobs));
  }, [liveJobs]);

  useEffect(() => {
    localStorage.setItem('mesa_cart', JSON.stringify(cart));
  }, [cart]);

  // Create new Emergency Request from Wizard
  const createEmergencyJob = (jobData) => {
    const newCode = 'MS-' + Math.floor(1000 + Math.random() * 9000);
    const newJob = {
      id: newCode,
      customer: jobData.customer || 'Şantiye Yetkilisi',
      phone: jobData.phone || '0533 000 0000',
      machine: jobData.machine || 'İş Makinası',
      issue: jobData.issue || 'Arıza Tespiti',
      location: jobData.location || 'Adana / Çukurova',
      status: 'Atandı',
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

    setLiveJobs([newJob, ...liveJobs]);
    showToast(`Yeni Arıza Çağrısı Alındı: ${newJob.id} - ${newJob.customer}`);
    return newCode;
  };

  // Update Job Status
  const updateJobStatus = (id, newStatus, stepIndex) => {
    setLiveJobs(liveJobs.map(job => {
      if (job.id === id) {
        return { ...job, status: newStatus, stepIndex: stepIndex !== undefined ? stepIndex : job.stepIndex };
      }
      return job;
    }));
    showToast(`${id} nolu iş emri durumu güncellendi: ${newStatus}`);
  };

  // Sign Job Order Digitally
  const signJobOrder = (id, supSig, techSig) => {
    setLiveJobs(liveJobs.map(job => {
      if (job.id === id) {
        return {
          ...job,
          supervisorSignature: supSig || job.supervisorSignature,
          technicianSignature: techSig || job.technicianSignature,
          status: 'Tamamlandı',
          stepIndex: 4
        };
      }
      return job;
    }));
    showToast(`${id} nolu iş emri dijital olarak imzalandı ve kapatıldı!`);
  };

  // Cart Functions
  const addToCart = (part, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === part.id);
      if (existing) {
        return prev.map(item => item.id === part.id ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { ...part, qty }];
    });
    showToast(`${part.name} sepete eklendi.`);
  };

  const removeFromCart = (partId) => {
    setCart(prev => prev.filter(item => item.id !== partId));
  };

  const clearCart = () => setCart([]);

  const showToast = (msg) => {
    setActiveToast(msg);
    setTimeout(() => setActiveToast(null), 4500);
  };

  return (
    <OperationalContext.Provider value={{
      liveJobs,
      createEmergencyJob,
      updateJobStatus,
      signJobOrder,
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      showToast
    }}>
      {children}

      {/* Global Alert Toast */}
      {activeToast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 border-2 border-amber-500 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 max-w-sm">
          <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
          <div className="text-xs font-bold leading-tight">{activeToast}</div>
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
