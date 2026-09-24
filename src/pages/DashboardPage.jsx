import React, { useState, useMemo } from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { useOperational } from '../context/OperationalContext';
import { useAuth } from '../context/AuthContext';
import {
  Activity, Truck, Package, Crown, Radio, QrCode, Download, LogOut,
  Banknote, Wallet, Landmark, Receipt, ArrowUpRight, ShieldCheck, Lock
} from 'lucide-react';

// Subcomponents & Widgets
import { Sparkline } from '../components/dashboard/widgets/Sparkline';
import { AnimatedCounter } from '../components/dashboard/widgets/AnimatedCounter';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { OperationsTab } from '../components/dashboard/tabs/OperationsTab';
import { FinanceTab } from '../components/dashboard/tabs/FinanceTab';
import { FleetTab } from '../components/dashboard/tabs/FleetTab';
import { PartsTab } from '../components/dashboard/tabs/PartsTab';
import { AdminTab } from '../components/dashboard/tabs/AdminTab';
import { AuditTab } from '../components/dashboard/tabs/AuditTab';

// Modals
import { EmergencyBroadcastModal } from '../components/dashboard/modals/EmergencyBroadcastModal';
import { NewJobModal } from '../components/dashboard/modals/NewJobModal';
import { JobDetailModal } from '../components/dashboard/modals/JobDetailModal';
import { DeleteConfirmModal } from '../components/dashboard/modals/DeleteConfirmModal';
import { NewChequeModal } from '../components/dashboard/modals/NewChequeModal';
import { NewCashModal } from '../components/dashboard/modals/NewCashModal';
import { CollectReceivableModal } from '../components/dashboard/modals/CollectReceivableModal';
import { MachineQrModal } from '../components/dashboard/modals/MachineQrModal';

export function DashboardPage() {
  const {
    activeOrders, partsOrders, updateOrderStatus, updatePartsOrderStatus, unreadAlertsCount,
    liveJobs, createEmergencyJob, deleteJob, deletePartsOrder, showToast, auditLogs
  } = useOperational();
  const { user, isSuperAdmin, isFinance, hasPermission, logout } = useAuth();

  // Route Guard: Deny unauthenticated access
  if (!user || !isSuperAdmin) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-slate-100">
        <SEO
          title="Erişim Kısıtlandı | MESA ERP"
          description="MESA ERP Operasyon Merkezi için Süper Admin girişi zorunludur."
        />
        <div className="max-w-md w-full bg-white border border-red-200 rounded-3xl p-8 text-center shadow-xl animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-5 border border-red-200">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Erişim Kısıtlandı</h2>
          <p className="text-xs text-slate-600 mt-2 mb-6 leading-relaxed">
            MESA Telematik & ERP Operasyon Merkezi yalnızca yetkili Süper Admin oturumuyla görüntülenebilir.
          </p>
          <Link
            to="/admin"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 transition-all border border-red-500/40"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Süper Admin Girişine Git</span>
          </Link>
        </div>
      </div>
    );
  }

  // Interactive UI States
  const [filterStatus, setFilterStatus] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobModal, setSelectedJobModal] = useState(null);
  const [showAlerts, setShowAlerts] = useState(false);
  const [activeTab, setActiveTab] = useState('operations'); // 'operations' | 'finance' | 'fleet' | 'parts' | 'admin'
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [emergencyAlertText, setEmergencyAlertText] = useState('Tüm nöbetçi mobil ekipler: Çukurova havzası acil müdahale seviye-1 aktif.');

  // Quick Job Creation State
  const [newJobModalOpen, setNewJobModalOpen] = useState(false);
  const [newJobForm, setNewJobForm] = useState({
    customer: '',
    phone: '',
    machine: 'CAT 320D Paletli Ekskavatör',
    issue: '',
    location: 'Adana / Seyhan OSB',
    tech: 'Mehmet Usta (Baş Teknisyen)',
    vehicle: '01 MSA 01 (Ford Transit 4x4)',
    eta: 25
  });

  // Delete confirmation modal
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(null);

  // Accounting & Finance State
  const [financeSubTab, setFinanceSubTab] = useState('cheques');
  const [chequeFilter, setChequeFilter] = useState('Tümü');
  const [chequeSearch, setChequeSearch] = useState('');

  const [cheques, setCheques] = useState([
    {
      id: 'CK-90421',
      drawer: 'Kaya Hafriyat & Taş Ocağı Ltd.',
      bank: 'Garanti BBVA - Adana Çarşı',
      dueDate: '2026-09-25',
      amount: 245000,
      status: 'Portföyde',
      machine: 'CAT 320D Paletli Ekskavatör',
      desc: 'Ana hidrolik pompa revizyonu ve cer redüktör dişli seti'
    },
    {
      id: 'CK-88120',
      drawer: 'Çukurova Beton & Agrega A.Ş.',
      bank: 'Ziraat Bankası - Ceyhan',
      dueDate: '2026-10-05',
      amount: 185000,
      status: 'Tahsilde',
      machine: 'JCB 3CX Eco Kazıcı Yükleyici',
      desc: 'Powershift şanzıman revizyonu ve kavrama diskleri'
    },
    {
      id: 'CK-76412',
      drawer: 'Özdemir Madencilik A.Ş.',
      bank: 'İş Bankası - Seyhan',
      dueDate: '2026-10-20',
      amount: 350000,
      status: 'Portföyde',
      machine: 'Hidromek HMK 220LC',
      desc: 'Isuzu motor rektifiye ve bom silindir borwerk revizyonu'
    },
    {
      id: 'CK-65239',
      drawer: 'Toroslar Altyapı & Yol İnşaat',
      bank: 'Akbank - Adana Ticari Şube',
      dueDate: '2026-09-20',
      amount: 420000,
      status: 'Portföyde',
      machine: 'Volvo EC210D Ekskavatör',
      desc: 'Dağıtıcı hidrolik kumanda bloğu ve pilot selenoid takımı'
    },
    {
      id: 'CK-54190',
      drawer: 'Seyhan Kum & Çakıl İşletmesi',
      bank: 'Halkbank - Yüreğir',
      dueDate: '2026-09-05',
      amount: 160000,
      status: 'Tahsil Edildi',
      machine: 'Bobcat S530 Mini Yükleyici',
      desc: 'Tandem hidrostatik yürüyüş pompası ve zincir kutusu bakımı'
    },
    {
      id: 'CK-43288',
      drawer: 'Akdeniz Mermer & Taş Sanayi',
      bank: 'Yapı Kredi - Mersin Serbest Bölge',
      dueDate: '2026-11-10',
      amount: 480000,
      status: 'Portföyde',
      machine: 'Liebherr R934 Maden Makinası',
      desc: 'Kule dönüş redüktörü ve hidrolik piston grubu revizyonu'
    }
  ]);

  const [baseCash] = useState(420000);
  const [cashTransactions, setCashTransactions] = useState([
    { id: 'NK-101', date: '13.09.2026 10:45', type: 'in', category: 'Şantiye Peşin Tahsilat', client: 'Bozkurt Hafriyat', amount: 28500, desc: 'CAT 428F Mobil 500 Bar hortum pres ve yağ değişimi' },
    { id: 'NK-102', date: '13.09.2026 09:15', type: 'out', category: 'Saha Mazot Gideri', client: '01 MSA 01 & 02 Filo', amount: 6400, desc: 'Mobil servis araçları haftalık akaryakıt ikmali (Ceyhan - Seyhan)' },
    { id: 'NK-103', date: '12.09.2026 16:30', type: 'in', category: 'OEM Yedek Parça Satış', client: 'Güneş İnşaat', amount: 14200, desc: 'JCB Orijinal Filtre Kiti & Basınç Valfi' },
    { id: 'NK-104', date: '12.09.2026 14:00', type: 'out', category: 'Atölye Sarf Malzeme', client: 'Seyhan Oksijen & Gazaltı', amount: 3800, desc: 'Seyyar kaynak ve seyyar borwerk torna sarfiyatı' },
    { id: 'NK-105', date: '12.09.2026 11:20', type: 'in', category: 'Diagnostik Teşhis Ücreti', client: 'Çukurova Maden Ltd.', amount: 8500, desc: 'Komatsu PC200 Komtrax elektronik diagnostik ve arıza tespit bedeli' },
    { id: 'NK-106', date: '11.09.2026 15:40', type: 'in', category: 'Şantiye Peşin Tahsilat', client: 'Baraj İnşaat Ltd.', amount: 19800, desc: 'Manitou MT-X 1440 Teleskopik Bom Silindir Tamiri' }
  ]);

  const [bankAccounts] = useState([
    { id: 'garanti', name: 'Garanti BBVA - Adana Çarşı Şubesi', type: 'Ticari TL Hesabı', iban: 'TR42 0006 2000 1234 5678 9000 01', balance: 1450000 },
    { id: 'ziraat', name: 'Ziraat Bankası - Seyhan Şubesi', type: 'Kurumsal TL Hesabı', iban: 'TR18 0001 0000 9876 5432 1000 02', balance: 980500 },
    { id: 'isbank', name: 'Türkiye İş Bankası - Adana Şubesi', type: 'Şirket Ana Hesabı', iban: 'TR85 0006 4000 5555 4444 3333 03', balance: 640000 },
    { id: 'akbank', name: 'Akbank - Adana Ticari Şube', type: 'B2B POS & Tahsilat Hesabı', iban: 'TR29 0004 6000 2222 1111 0000 04', balance: 350000 }
  ]);

  const [receivables, setReceivables] = useState([
    { id: 'CR-01', client: 'Kaya Hafriyat & Madencilik', machine: 'CAT 320D Paletli Ekskavatör', totalBilled: 125000, collected: 82500, balance: 42500, dueDate: '2026-09-20', status: 'Normal' },
    { id: 'CR-02', client: 'ABC İnşaat Ltd. Şti.', machine: 'JCB 3CX Eco Kazıcı Yükleyici', totalBilled: 64000, collected: 45600, balance: 18400, dueDate: '2026-09-15', status: 'Vadesi Yaklaştı' },
    { id: 'CR-03', client: 'Özdemir Madencilik A.Ş.', machine: 'Hidromek HMK 220LC', totalBilled: 148000, collected: 80000, balance: 68000, dueDate: '2026-09-02', status: 'Vadesi Geçti' },
    { id: 'CR-04', client: 'Toroslar Altyapı & Asfalt', machine: 'Volvo EC210D Ekskavatör', totalBilled: 89000, collected: 59800, balance: 29200, dueDate: '2026-09-30', status: 'Normal' },
    { id: 'CR-05', client: 'Ceyhan Taş Kırma İşletmesi', machine: 'Komatsu PC300-8 Ağır Ekskavatör', totalBilled: 195000, collected: 140000, balance: 55000, dueDate: '2026-10-15', status: 'Normal' },
  ]);

  const [newChequeModalOpen, setNewChequeModalOpen] = useState(false);
  const [newChequeForm, setNewChequeForm] = useState({
    id: '', drawer: '', bank: 'Garanti BBVA', dueDate: '', amount: '',
    machine: 'CAT 320D Paletli Ekskavatör', desc: ''
  });

  const [newCashModalOpen, setNewCashModalOpen] = useState(false);
  const [newCashForm, setNewCashForm] = useState({
    type: 'in', category: 'Şantiye Peşin Tahsilat', client: '', amount: '', desc: ''
  });

  const [collectReceivableModal, setCollectReceivableModal] = useState(null);
  const [collectAmount, setCollectAmount] = useState('');
  const [collectMethod, setCollectMethod] = useState('nakit');

  // Computed Financial Totals
  const totalCashBalance = useMemo(() => {
    const net = cashTransactions.reduce((acc, tx) => acc + (tx.type === 'in' ? tx.amount : -tx.amount), 0);
    return baseCash + net;
  }, [baseCash, cashTransactions]);

  const totalPortfolioCheques = useMemo(() => {
    return cheques.filter(c => c.status === 'Portföyde').reduce((sum, c) => sum + c.amount, 0);
  }, [cheques]);

  const totalInCollectionCheques = useMemo(() => {
    return cheques.filter(c => c.status === 'Tahsilde').reduce((sum, c) => sum + c.amount, 0);
  }, [cheques]);

  const totalChequesCombined = totalPortfolioCheques + totalInCollectionCheques;

  const totalBankBalances = useMemo(() => {
    return bankAccounts.reduce((sum, b) => sum + b.balance, 0);
  }, [bankAccounts]);

  const totalReceivables = useMemo(() => {
    return receivables.reduce((sum, r) => sum + r.balance, 0);
  }, [receivables]);

  // Technicians & Telemetry Fleet Dataset
  const [newTechForm, setNewTechForm] = useState({
    name: '', vehicle: '', specialty: 'Hidrolik & Bom Tamiri', phone: '0534 407 55 85', location: 'Adana Merkez'
  });
  const [extraTechs, setExtraTechs] = useState([]);

  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrForm, setQrForm] = useState({
    machine: 'CAT 320D Paletli Ekskavatör',
    token: 'mch_8f4c21a7',
    chassis: 'CAT0320DV99841',
    customer: 'Kaya Hafriyat & Madencilik Ltd.',
    location: 'Ceyhan Taş Ocağı Şantiyesi',
    oilHours: '4.850 Saat (Gelecek: 5.000 Saat)',
    serviceCode: 'MS-8294',
    tech: 'Mehmet Usta (0534 407 55 85)'
  });

  const fleetVehicles = [
    { id: '01 MSA 01', type: 'Ford Transit 4x4', tech: 'Mehmet Usta', status: 'Sahada', fuel: 72, temp: 88, location: 'Ceyhan Taş Ocağı', speed: 0, lastPing: '2dk önce', phone: '0534 407 55 85' },
    { id: '01 MSA 02', type: 'Iveco Daily Yüksek Tavan', tech: 'Ahmet Usta', status: 'Sahada', fuel: 45, temp: 91, location: 'Seyhan Metal Sanayi', speed: 0, lastPing: '1dk önce', phone: '0534 407 55 85' },
    { id: '01 MSA 03', type: 'Renault Master Mobil Atölye', tech: 'Can Usta', status: 'Merkeze Dönüyor', fuel: 38, temp: 82, location: 'Kozan ➝ Adana D400', speed: 65, lastPing: '30sn önce', phone: '0534 407 55 85' },
    { id: '01 MSA 04', type: 'Ford Transit 350L', tech: 'Hasan Usta', status: 'Müsait', fuel: 92, temp: 72, location: 'Merkez Garaj (Seyhan)', speed: 0, lastPing: '5dk önce', phone: '0534 407 55 85' },
    { id: '01 MSA 05', type: 'MAN TGE 4x4 Ağır Servis', tech: 'Burak Usta', status: 'Müsait', fuel: 85, temp: 70, location: 'Merkez Garaj (Seyhan)', speed: 0, lastPing: '3dk önce', phone: '0534 407 55 85' },
  ];

  // Actions & Handlers
  const handleExportJson = () => {
    const backupData = {
      exportTimestamp: new Date().toISOString(),
      superAdmin: {
        name: user?.name || 'Yönetici',
        email: user?.email || 'cebrailkara@gmail.com',
        role: 'Süper Admin (Root)'
      },
      activeOrders,
      partsOrders,
      finance: {
        cashBalance: totalCashBalance,
        portfolioChequesTotal: totalPortfolioCheques,
        bankBalancesTotal: totalBankBalances,
        receivablesTotal: totalReceivables,
        cheques,
        cashTransactions,
        receivables
      },
      telematicsVehicles: [...fleetVehicles, ...extraTechs],
      systemMetrics: stats
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `mesa_erp_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    if (showToast) showToast('ERP & Muhasebe Veritabanı JSON Olarak İndirildi!');
  };

  const handleAddTechnician = (e) => {
    e.preventDefault();
    if (!newTechForm.name || !newTechForm.vehicle) return;
    const newT = {
      id: `01 MSA 0${6 + extraTechs.length}`,
      type: newTechForm.vehicle,
      tech: newTechForm.name,
      status: 'Müsait',
      fuel: 100,
      temp: 76,
      location: newTechForm.location || 'Adana Merkez',
      speed: 0,
      lastPing: 'Şimdi',
      phone: newTechForm.phone,
      specialty: newTechForm.specialty
    };
    setExtraTechs(prev => [newT, ...prev]);
    setNewTechForm({ name: '', vehicle: '', specialty: 'Hidrolik & Bom Tamiri', phone: '0534 407 55 85', location: 'Adana Merkez' });
    if (showToast) showToast(`Yeni Usta ${newT.tech} Filoya Başarıyla Eklendi!`);
  };

  const handleBroadcastEmergency = () => {
    setEmergencyModalOpen(false);
    if (showToast) showToast(`🚨 SÜPER ADMİN: Acil Çağrı Mobil Servis Araçlarına İletildi!`);
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!newJobForm.customer || !newJobForm.issue) {
      if (showToast) showToast('Lütfen müşteri adı ve arıza açıklamasını doldurunuz.', 'error');
      return;
    }
    const created = createEmergencyJob({
      customer: newJobForm.customer,
      phone: newJobForm.phone || '0533 000 0000',
      machine: newJobForm.machine,
      issue: newJobForm.issue,
      location: newJobForm.location,
      assignedTechnician: newJobForm.tech,
      vehicle: newJobForm.vehicle,
      etaMinutes: Number(newJobForm.eta) || 25
    });
    setNewJobModalOpen(false);
    setNewJobForm({
      customer: '', phone: '', machine: 'CAT 320D Paletli Ekskavatör',
      issue: '', location: 'Adana / Seyhan OSB', tech: 'Mehmet Usta (Baş Teknisyen)',
      vehicle: '01 MSA 01 (Ford Transit 4x4)', eta: 25
    });
    setSelectedJobModal(created);
  };

  const handleAddCheque = (e) => {
    e.preventDefault();
    if (!newChequeForm.drawer || !newChequeForm.amount || !newChequeForm.dueDate) {
      if (showToast) showToast('Lütfen keşideci firma, vade tarihi ve tutarı giriniz.', 'error');
      return;
    }
    const checkId = newChequeForm.id || `CK-${Math.floor(10000 + Math.random() * 90000)}`;
    const newC = {
      id: checkId,
      drawer: newChequeForm.drawer,
      bank: newChequeForm.bank,
      dueDate: newChequeForm.dueDate,
      amount: Number(newChequeForm.amount),
      status: 'Portföyde',
      machine: newChequeForm.machine,
      desc: newChequeForm.desc || 'Ağır iş makinası revizyon ve parça bedeli'
    };
    setCheques(prev => [newC, ...prev]);
    setNewChequeModalOpen(false);
    setNewChequeForm({ id: '', drawer: '', bank: 'Garanti BBVA', dueDate: '', amount: '', machine: 'CAT 320D Paletli Ekskavatör', desc: '' });
    if (showToast) showToast(`₺${newC.amount.toLocaleString('tr-TR')} tutarlı çek portföye eklendi!`);
  };

  const handleAddCash = (e) => {
    e.preventDefault();
    if (!newCashForm.amount || !newCashForm.client) {
      if (showToast) showToast('Lütfen firma ve tutarı giriniz.', 'error');
      return;
    }
    const newTx = {
      id: `NK-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      type: newCashForm.type,
      category: newCashForm.category,
      client: newCashForm.client,
      amount: Number(newCashForm.amount),
      desc: newCashForm.desc || 'Nakit işlem kaydı'
    };
    setCashTransactions(prev => [newTx, ...prev]);
    setNewCashModalOpen(false);
    setNewCashForm({ type: 'in', category: 'Şantiye Peşin Tahsilat', client: '', amount: '', desc: '' });
    if (showToast) showToast(`₺${newTx.amount.toLocaleString('tr-TR')} nakit ${newTx.type === 'in' ? 'girişi' : 'çıkışı'} işlendi!`);
  };

  const handleCollectReceivable = (e) => {
    e.preventDefault();
    if (!collectReceivableModal || !collectAmount) return;
    const amt = Number(collectAmount);
    if (amt <= 0) return;

    // 1. Credit: Customer receivable decreases
    setReceivables(prev => prev.map(r => {
      if (r.id === collectReceivableModal.id) {
        const newBal = Math.max(0, r.balance - amt);
        return {
          ...r,
          collected: r.collected + amt,
          balance: newBal,
          status: newBal === 0 ? 'Tamamlandı' : r.status
        };
      }
      return r;
    }));

    // 2. Debit: Double-Entry ledger balancing based on payment method
    if (collectMethod === 'nakit') {
      // Debit: Nakit Kasa Girişi
      setCashTransactions(prev => [{
        id: `NK-${Math.floor(100 + Math.random() * 900)}`,
        date: new Date().toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        type: 'in',
        category: 'Cari Hesap Tahsilatı',
        client: collectReceivableModal.client,
        amount: amt,
        desc: `${collectReceivableModal.machine} servis alacağı nakit tahsilatı`
      }, ...prev]);
    } else if (collectMethod === 'banka') {
      // Debit: Banka Hesabı (Garanti BBVA Ticari Hesabına Giriş)
      setBankAccounts(prev => prev.map((acc, idx) => {
        if (idx === 0) {
          return { ...acc, balance: acc.balance + amt };
        }
        return acc;
      }));
    } else if (collectMethod === 'cek') {
      // Debit: Alınan Çekler Portföyü (30 gün vadeli çek girişi)
      const d = new Date();
      d.setDate(d.getDate() + 30);
      const newCheque = {
        id: `CK-${Math.floor(10000 + Math.random() * 90000)}`,
        drawer: collectReceivableModal.client,
        bank: 'Garanti BBVA',
        dueDate: d.toISOString().split('T')[0],
        amount: amt,
        status: 'Portföyde',
        machine: collectReceivableModal.machine,
        desc: `Cari Alacak Tahsilat Çeki (${collectReceivableModal.client})`
      };
      setCheques(prev => [newCheque, ...prev]);
    }

    setCollectReceivableModal(null);
    setCollectAmount('');
    if (showToast) {
      showToast(`${collectReceivableModal.client} firmasından ₺${amt.toLocaleString('tr-TR')} tahsil edildi (${collectMethod === 'nakit' ? 'Kasa Girişi' : collectMethod === 'banka' ? 'Banka Hesabı' : 'Portföy Çeki'})!`);
    }
  };

  const handleCollectCheque = (cheque) => {
    // 1. Mark cheque as collected
    setCheques(prev => prev.map(item => item.id === cheque.id ? { ...item, status: 'Tahsil Edildi' } : item));
    // 2. Debit: Add to Bank Account (Garanti BBVA)
    setBankAccounts(prev => prev.map((acc, idx) => {
      if (idx === 0) {
        return { ...acc, balance: acc.balance + cheque.amount };
      }
      return acc;
    }));
    if (showToast) {
      showToast(`${cheque.id} nolu çek tahsil edildi ve banka hesabına ₺${cheque.amount.toLocaleString('tr-TR')} aktarıldı!`);
    }
  };

  const handleExecuteDelete = () => {
    if (!deleteConfirmModal) return;
    if (deleteConfirmModal.type === 'job') {
      deleteJob(deleteConfirmModal.id);
      if (selectedJobModal?.id === deleteConfirmModal.id || selectedJobModal?.code === deleteConfirmModal.id) {
        setSelectedJobModal(null);
      }
    } else if (deleteConfirmModal.type === 'part') {
      deletePartsOrder(deleteConfirmModal.id);
    } else if (deleteConfirmModal.type === 'cheque') {
      setCheques(prev => prev.filter(c => c.id !== deleteConfirmModal.id));
      if (showToast) showToast(`${deleteConfirmModal.id} nolu çek sistemden silindi.`);
    }
    setDeleteConfirmModal(null);
  };

  // Stats & Filters
  const stats = useMemo(() => {
    const completed = activeOrders.filter(o => o.status === 'Tamamlandı');
    const active = activeOrders.filter(o => o.status !== 'Tamamlandı');
    const totalRevenue = activeOrders.reduce((sum, o) => sum + (o.cost || 0), 0);
    const avgEta = active.length > 0
      ? Math.round(active.reduce((sum, o) => sum + (o.etaMinutes || 0), 0) / active.length)
      : 0;
    return {
      total: activeOrders.length,
      active: active.length,
      completed: completed.length,
      completionRate: activeOrders.length > 0 ? Math.round((completed.length / activeOrders.length) * 100) : 0,
      totalRevenue,
      avgEta,
      partsOrderCount: partsOrders.length,
      partsRevenue: partsOrders.reduce((sum, po) => sum + (po.total || 0), 0)
    };
  }, [activeOrders, partsOrders]);

  const filteredOrders = useMemo(() => {
    return activeOrders.filter(o => {
      const matchStatus = filterStatus === 'Tümü' || o.status === filterStatus;
      const matchSearch = !searchQuery ||
        (o.id || o.code || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (o.customer || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (o.machine || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (o.location || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [activeOrders, filterStatus, searchQuery]);

  const filteredCheques = useMemo(() => {
    return cheques.filter(c => {
      const matchStatus = chequeFilter === 'Tümü' || c.status === chequeFilter;
      const matchSearch = !chequeSearch ||
        c.id.toLowerCase().includes(chequeSearch.toLowerCase()) ||
        c.drawer.toLowerCase().includes(chequeSearch.toLowerCase()) ||
        c.bank.toLowerCase().includes(chequeSearch.toLowerCase()) ||
        c.machine.toLowerCase().includes(chequeSearch.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [cheques, chequeFilter, chequeSearch]);

  const sparkData = {
    jobs: [3, 5, 4, 7, 6, 8, 5, 9, 7, 6, 8, stats.active],
    revenue: [12, 18, 15, 22, 28, 19, 31, 24, 38, 29, 35, stats.totalRevenue / 1000],
    eta: [35, 32, 28, 30, 27, 25, 31, 28, 26, 29, 28, stats.avgEta],
    completion: [92, 94, 96, 95, 97, 98, 96, 99, 97, 98, 99, stats.completionRate]
  };

  const statusColors = {
    'Mobil Ekip Yolda': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', dot: 'bg-amber-500' },
    'Şantiyede': { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200', dot: 'bg-blue-600' },
    'Teşhiste': { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200', dot: 'bg-purple-600' },
    'Onarımda': { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200', dot: 'bg-orange-600' },
    'Tamamlandı': { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200', dot: 'bg-emerald-600' },
    'Atandı': { bg: 'bg-cyan-50', text: 'text-cyan-800', border: 'border-cyan-200', dot: 'bg-cyan-600' },
  };

  const getStatusStyle = (status) => statusColors[status] || statusColors['Atandı'];

  const getNextStatus = (currentStatus) => {
    const flow = {
      'Atandı': 'Mobil Ekip Yolda',
      'Mobil Ekip Yolda': 'Şantiyede',
      'Şantiyede': 'Teşhiste',
      'Teşhiste': 'Onarımda',
      'Onarımda': 'Tamamlandı'
    };
    return flow[currentStatus] || null;
  };

  const getNextStatusLabel = (currentStatus) => {
    const labels = {
      'Atandı': 'Ekibi Yola Çıkar',
      'Mobil Ekip Yolda': 'Şantiyeye Vardı',
      'Şantiyede': 'Teşhise Başla',
      'Teşhiste': 'Onarıma Geç',
      'Onarımda': 'Tamamla & Kapat'
    };
    return labels[currentStatus] || null;
  };

  const alertJobs = liveJobs.filter(j => j.status !== 'Tamamlandı');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-red-600 selection:text-white">
      <SEO
        title="MESA ERP & Telematik Canlı Operasyon Merkezi"
        description="Mesa İş Makinaları 7/24 filo yönetimi, telematik arıza takip ve saha servis yönetim merkezi."
        canonical="/panel"
      />

      {/* Top Header */}
      <DashboardHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showAlerts={showAlerts}
        setShowAlerts={setShowAlerts}
        unreadAlertsCount={unreadAlertsCount}
        alertJobs={alertJobs}
        user={user}
        setActiveTab={setActiveTab}
        setSelectedJobModal={setSelectedJobModal}
        setNewJobModalOpen={setNewJobModalOpen}
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Super Admin Command Banner */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-56 h-56 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-red-600/20 shrink-0 border border-red-500/30">
                <Crown className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">
                    Süper Admin: {user?.name || 'Cebrail Kara'}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                    ROOT / TAM YETKİ
                  </span>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Aktif Oturum
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  <span className="font-mono text-red-600 font-bold">{user?.email || 'cebrailkara@gmail.com'}</span> • Mobil filo, iş makinası revizyonları, çek ve kasa muhasebesi tam senkronize.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              <button
                onClick={() => setEmergencyModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2 transition shadow-sm"
                title="Tüm filoya acil çağrı gönder"
              >
                <Radio className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                <span>Filo Alarmı</span>
              </button>

              <button
                onClick={() => setQrModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-2 transition shadow-xs"
                title="Şantiye makinasına yapıştırılacak akıllı QR kabin/bom etiketi üret"
              >
                <QrCode className="w-3.5 h-3.5 text-amber-600" />
                <span>Makina QR Etiketi</span>
              </button>

              <button
                onClick={handleExportJson}
                className="px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold flex items-center gap-2 transition"
                title="Sistem ERP ve Muhasebe veritabanı yedeğini JSON olarak indir"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Verileri İndir (JSON)</span>
              </button>

              <button
                onClick={logout}
                className="px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 hover:bg-red-50 hover:border-red-200 text-slate-600 hover:text-red-600 text-xs font-bold flex items-center gap-1.5 transition ml-auto lg:ml-0"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Çıkış</span>
              </button>
            </div>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="group bg-white border border-slate-200 p-5 rounded-2xl hover:border-red-500/50 hover:shadow-md transition-all duration-300 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Aktif Saha Görevleri</span>
              <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-3xl font-black text-slate-900 font-mono block leading-none">
                  <AnimatedCounter value={stats.active} />
                </span>
                <span className="text-[10px] text-red-600 font-semibold mt-1 block flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> {stats.total} toplam iş emri
                </span>
              </div>
              <Sparkline data={sparkData.jobs} color="#dc2626" />
            </div>
          </div>

          <div className="group bg-white border border-slate-200 p-5 rounded-2xl hover:border-emerald-500/50 hover:shadow-md transition-all duration-300 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nakit Kasa Bakiyesi</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Banknote className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-3xl font-black text-slate-900 font-mono block leading-none">
                  ₺{(totalCashBalance / 1000).toFixed(1)}K
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold mt-1 block flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> ₺{totalCashBalance.toLocaleString('tr-TR')}
                </span>
              </div>
              <Sparkline data={[240, 290, 310, 340, 380, 410, totalCashBalance / 1000]} color="#16a34a" />
            </div>
          </div>

          <div className="group bg-white border border-slate-200 p-5 rounded-2xl hover:border-blue-500/50 hover:shadow-md transition-all duration-300 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Alınan Çekler</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-3xl font-black text-slate-900 font-mono block leading-none">
                  ₺{(totalChequesCombined / 1000).toFixed(0)}K
                </span>
                <span className="text-[10px] text-blue-600 font-semibold mt-1 block flex items-center gap-1">
                  <Receipt className="w-3 h-3" /> {cheques.filter(c => c.status !== 'Tahsil Edildi').length} aktif vadeli çek
                </span>
              </div>
              <Sparkline data={[800, 1100, 950, 1400, 1680, totalChequesCombined / 1000]} color="#2563eb" />
            </div>
          </div>

          <div className="group bg-white border border-slate-200 p-5 rounded-2xl hover:border-purple-500/50 hover:shadow-md transition-all duration-300 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Banka Mevduatları</span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                <Landmark className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-3xl font-black text-slate-900 font-mono block leading-none">
                  ₺{(totalBankBalances / 1000000).toFixed(2)}M
                </span>
                <span className="text-[10px] text-purple-600 font-semibold mt-1 block flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> 4 Ticari Kurumsal Hesap
                </span>
              </div>
              <Sparkline data={[2.1, 2.5, 2.8, 3.1, 3.3, totalBankBalances / 1000000]} color="#9333ea" />
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-2xl w-fit flex-wrap shadow-sm">
          {[
            { id: 'operations', label: 'Saha Operasyonları', icon: Activity, count: activeOrders.length },
            { id: 'finance', label: 'Muhasebe & Finans', icon: Wallet, highlight: true, count: cheques.filter(c => c.status !== 'Tahsil Edildi').length, restricted: !isFinance },
            { id: 'fleet', label: 'Filo Telematik', icon: Truck, count: fleetVehicles.length + extraTechs.length },
            { id: 'parts', label: 'Yedek Parça Siparişleri', icon: Package, count: partsOrders.length },
            { id: 'audit', label: 'Denetim Merkezi', icon: ShieldCheck, count: auditLogs.length },
            { id: 'admin', label: 'Süper Admin Yönetimi', icon: Crown },
          ].filter(tab => !tab.restricted).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${activeTab === tab.id
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-600/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${activeTab === tab.id ? 'bg-black/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: Operations */}
        {activeTab === 'operations' && (
          <OperationsTab
            filteredOrders={filteredOrders}
            activeOrders={activeOrders}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            stats={stats}
            getStatusStyle={getStatusStyle}
            getNextStatus={getNextStatus}
            getNextStatusLabel={getNextStatusLabel}
            setSelectedJobModal={setSelectedJobModal}
            setDeleteConfirmModal={setDeleteConfirmModal}
            updateOrderStatus={updateOrderStatus}
            setNewJobModalOpen={setNewJobModalOpen}
            setActiveTab={setActiveTab}
            setFinanceSubTab={setFinanceSubTab}
            isSuperAdmin={isSuperAdmin}
          />
        )}

        {/* Tab 2: Finance */}
        {activeTab === 'finance' && (
          <FinanceTab
            financeSubTab={financeSubTab}
            setFinanceSubTab={setFinanceSubTab}
            totalCashBalance={totalCashBalance}
            totalPortfolioCheques={totalPortfolioCheques}
            totalInCollectionCheques={totalInCollectionCheques}
            totalChequesCombined={totalChequesCombined}
            totalBankBalances={totalBankBalances}
            totalReceivables={totalReceivables}
            cheques={cheques}
            setCheques={setCheques}
            filteredCheques={filteredCheques}
            chequeFilter={chequeFilter}
            setChequeFilter={setChequeFilter}
            chequeSearch={chequeSearch}
            setChequeSearch={setChequeSearch}
            cashTransactions={cashTransactions}
            receivables={receivables}
            bankAccounts={bankAccounts}
            setNewChequeModalOpen={setNewChequeModalOpen}
            setNewCashModalOpen={setNewCashModalOpen}
            setCollectReceivableModal={setCollectReceivableModal}
            setCollectAmount={setCollectAmount}
            setDeleteConfirmModal={setDeleteConfirmModal}
            isSuperAdmin={isSuperAdmin}
            showToast={showToast}
            onCollectCheque={handleCollectCheque}
          />
        )}

        {/* Tab 3: Fleet */}
        {activeTab === 'fleet' && (
          <FleetTab
            fleetVehicles={fleetVehicles}
            extraTechs={extraTechs}
          />
        )}

        {/* Tab 4: Parts */}
        {activeTab === 'parts' && (
          <PartsTab
            partsOrders={partsOrders}
            isSuperAdmin={isSuperAdmin}
            updatePartsOrderStatus={updatePartsOrderStatus}
            setDeleteConfirmModal={setDeleteConfirmModal}
          />
        )}

        {/* Tab 5: Audit Center (append-only security log) */}
        {activeTab === 'audit' && <AuditTab />}

        {/* Tab 6: Admin */}
        {activeTab === 'admin' && (
          <AdminTab
            user={user}
            logout={logout}
            handleExportJson={handleExportJson}
            newTechForm={newTechForm}
            setNewTechForm={setNewTechForm}
            handleAddTechnician={handleAddTechnician}
            fleetVehicles={fleetVehicles}
            extraTechs={extraTechs}
          />
        )}
      </div>

      {/* Global Dashboard Modals */}
      <JobDetailModal
        job={selectedJobModal}
        onClose={() => setSelectedJobModal(null)}
        isSuperAdmin={isSuperAdmin}
        onDeleteRequest={(j) => setDeleteConfirmModal({
          type: 'job',
          id: j.id || j.code,
          title: `${j.id || j.code} - ${j.customer}`
        })}
        onStatusUpdate={(id, next) => {
          updateOrderStatus(id, next);
          setSelectedJobModal(prev => prev ? { ...prev, status: next } : null);
        }}
        getStatusStyle={getStatusStyle}
        getNextStatus={getNextStatus}
        getNextStatusLabel={getNextStatusLabel}
      />

      <NewJobModal
        isOpen={newJobModalOpen}
        onClose={() => setNewJobModalOpen(false)}
        form={newJobForm}
        setForm={setNewJobForm}
        onSubmit={handleCreateJob}
        technicians={[...fleetVehicles, ...extraTechs]}
      />

      <NewChequeModal
        isOpen={newChequeModalOpen}
        onClose={() => setNewChequeModalOpen(false)}
        form={newChequeForm}
        setForm={setNewChequeForm}
        onSubmit={handleAddCheque}
      />

      <NewCashModal
        isOpen={newCashModalOpen}
        onClose={() => setNewCashModalOpen(false)}
        form={newCashForm}
        setForm={setNewCashForm}
        onSubmit={handleAddCash}
      />

      <CollectReceivableModal
        receivable={collectReceivableModal}
        onClose={() => setCollectReceivableModal(null)}
        collectAmount={collectAmount}
        setCollectAmount={setCollectAmount}
        collectMethod={collectMethod}
        setCollectMethod={setCollectMethod}
        onSubmit={handleCollectReceivable}
      />

      <DeleteConfirmModal
        modalData={deleteConfirmModal}
        onClose={() => setDeleteConfirmModal(null)}
        onConfirm={handleExecuteDelete}
      />

      <MachineQrModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        form={qrForm}
        setForm={setQrForm}
      />

      <EmergencyBroadcastModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        alertText={emergencyAlertText}
        setAlertText={setEmergencyAlertText}
        onBroadcast={handleBroadcastEmergency}
      />
    </div>
  );
}
