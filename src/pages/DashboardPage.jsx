import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from '../router/Router';
import { SEO } from '../components/SEO';
import { useOperational } from '../context/OperationalContext';
import { useAuth } from '../context/AuthContext';
import {
  Activity, Users, Truck, Clock, Wrench, ShieldCheck,
  MapPin, Phone, AlertCircle, CheckCircle2, ChevronRight,
  TrendingUp, Bell, Search, Filter, ShoppingBag, PenTool,
  BarChart3, ArrowUpRight, ArrowDownRight, RefreshCcw,
  Zap, Eye, Calendar, Package, ChevronDown, X,
  Fuel, Thermometer, Gauge, AlertTriangle, Settings,
  Timer, Target, Award, Layers, Crown, Trash2, Download,
  UserPlus, LogOut, Lock, Radio, MessageSquare, Printer, Check, Plus,
  Wallet, Banknote, CreditCard, Landmark, ArrowDownLeft, Receipt, Copy, FileText, QrCode
} from 'lucide-react';

// ── Mini Sparkline Chart (pure SVG) ──
function Sparkline({ data, color = '#ef4444', height = 32, width = 80 }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  const gradId = `sg-${color.replace('#','')}-${Math.floor(Math.random()*1000)}`;

  return (
    <svg width={width} height={height} className="shrink-0">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#${gradId})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Animated Counter ──
function AnimatedCounter({ value, suffix = '', prefix = '' }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const target = typeof value === 'number' ? value : parseFloat(value) || 0;
    const duration = 1000;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target * 10) / 10);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);

  return <span>{prefix}{Number.isInteger(value) ? Math.round(display) : display.toFixed(1)}{suffix}</span>;
}

// ── Donut Chart (SVG) ──
function DonutChart({ segments, size = 110, strokeWidth = 14 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  let cumulativePercent = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />
      {segments.map((seg, i) => {
        const pct = seg.value / total;
        const offset = circumference * (1 - pct);
        const rotation = cumulativePercent * 360 - 90;
        cumulativePercent += pct;
        return (
          <circle
            key={i}
            cx={size/2}
            cy={size/2}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(${rotation} ${size/2} ${size/2})`}
            style={{ transition: 'stroke-dashoffset 0.8s ease' }}
          />
        );
      })}
      <text x={size/2} y={size/2 - 4} textAnchor="middle" className="fill-slate-900 text-lg font-black">{total}</text>
      <text x={size/2} y={size/2 + 12} textAnchor="middle" className="fill-slate-500 text-[9px] font-bold">TOPLAM</text>
    </svg>
  );
}

// ── Live Clock ──
function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <span className="font-mono text-xs text-slate-500 font-semibold">
      {time.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  );
}

export function DashboardPage() {
  const { 
    activeOrders, partsOrders, updateOrderStatus, updatePartsOrderStatus, unreadAlertsCount, 
    liveJobs, createEmergencyJob, deleteJob, deletePartsOrder, showToast 
  } = useOperational();
  const { user, isSuperAdmin, logout } = useAuth();

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

  // In-app delete confirmation modal
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(null); // { type: 'job'|'part'|'cheque', id: string, title: string }

  // ═════════════════════════════════════════════════════════════════════
  // MESA İŞ MAKİNALARI — MUHASEBE & FİNANS MODÜLÜ (ACCOUNTING & FINANCE)
  // ═════════════════════════════════════════════════════════════════════
  const [financeSubTab, setFinanceSubTab] = useState('cheques'); // 'cheques' | 'cash' | 'receivables' | 'banks'
  const [chequeFilter, setChequeFilter] = useState('Tümü');
  const [chequeSearch, setChequeSearch] = useState('');

  // 1. Alınan Çekler Portföyü (Cheques received for heavy equipment overhaul & spare parts)
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

  // 2. Kasa & Nakit Defteri (Cash ledger for on-site cash collections, parts sales, fuel/expenses)
  const [baseCash] = useState(420000);
  const [cashTransactions, setCashTransactions] = useState([
    { id: 'NK-101', date: '13.09.2026 10:45', type: 'in', category: 'Şantiye Peşin Tahsilat', client: 'Bozkurt Hafriyat', amount: 28500, desc: 'CAT 428F Mobil 500 Bar hortum pres ve yağ değişimi' },
    { id: 'NK-102', date: '13.09.2026 09:15', type: 'out', category: 'Saha Mazot Gideri', client: '01 MSA 01 & 02 Filo', amount: 6400, desc: 'Mobil servis araçları haftalık akaryakıt ikmali (Ceyhan - Seyhan)' },
    { id: 'NK-103', date: '12.09.2026 16:30', type: 'in', category: 'OEM Yedek Parça Satış', client: 'Güneş İnşaat', amount: 14200, desc: 'JCB Orijinal Filtre Kiti & Basınç Valfi' },
    { id: 'NK-104', date: '12.09.2026 14:00', type: 'out', category: 'Atölye Sarf Malzeme', client: 'Seyhan Oksijen & Gazaltı', amount: 3800, desc: 'Seyyar kaynak ve seyyar borwerk torna sarfiyatı' },
    { id: 'NK-105', date: '12.09.2026 11:20', type: 'in', category: 'Diagnostik Teşhis Ücreti', client: 'Çukurova Maden Ltd.', amount: 8500, desc: 'Komatsu PC200 Komtrax elektronik diagnostik ve arıza tespit bedeli' },
    { id: 'NK-106', date: '11.09.2026 15:40', type: 'in', category: 'Şantiye Peşin Tahsilat', client: 'Baraj İnşaat Ltd.', amount: 19800, desc: 'Manitou MT-X 1440 Teleskopik Bom Silindir Tamiri' }
  ]);

  // 3. Banka Hesapları (Mesa corporate bank accounts)
  const [bankAccounts] = useState([
    { id: 'garanti', name: 'Garanti BBVA - Adana Çarşı Şubesi', type: 'Ticari TL Hesabı', iban: 'TR42 0006 2000 1234 5678 9000 01', balance: 1450000 },
    { id: 'ziraat', name: 'Ziraat Bankası - Seyhan Şubesi', type: 'Kurumsal TL Hesabı', iban: 'TR18 0001 0000 9876 5432 1000 02', balance: 980500 },
    { id: 'isbank', name: 'Türkiye İş Bankası - Adana Şubesi', type: 'Şirket Ana Hesabı', iban: 'TR85 0006 4000 5555 4444 3333 03', balance: 640000 },
    { id: 'akbank', name: 'Akbank - Adana Ticari Şube', type: 'B2B POS & Tahsilat Hesabı', iban: 'TR29 0004 6000 2222 1111 0000 04', balance: 350000 }
  ]);

  // 4. Cari Alacaklar & Tahsilat Takibi (Receivables from machinery repair and parts contracts)
  const [receivables, setReceivables] = useState([
    { id: 'CR-01', client: 'Kaya Hafriyat & Madencilik', machine: 'CAT 320D Paletli Ekskavatör', totalBilled: 125000, collected: 82500, balance: 42500, dueDate: '2026-09-20', status: 'Normal' },
    { id: 'CR-02', client: 'ABC İnşaat Ltd. Şti.', machine: 'JCB 3CX Eco Kazıcı Yükleyici', totalBilled: 64000, collected: 45600, balance: 18400, dueDate: '2026-09-15', status: 'Vadesi Yaklaştı' },
    { id: 'CR-03', client: 'Özdemir Madencilik A.Ş.', machine: 'Hidromek HMK 220LC', totalBilled: 148000, collected: 80000, balance: 68000, dueDate: '2026-09-02', status: 'Vadesi Geçti' },
    { id: 'CR-04', client: 'Toroslar Altyapı & Asfalt', machine: 'Volvo EC210D Ekskavatör', totalBilled: 89000, collected: 59800, balance: 29200, dueDate: '2026-09-30', status: 'Normal' },
    { id: 'CR-05', client: 'Ceyhan Taş Kırma İşletmesi', machine: 'Komatsu PC300-8 Ağır Ekskavatör', totalBilled: 195000, collected: 140000, balance: 55000, dueDate: '2026-10-15', status: 'Normal' },
  ]);

  // Modals for accounting
  const [newChequeModalOpen, setNewChequeModalOpen] = useState(false);
  const [newChequeForm, setNewChequeForm] = useState({
    id: '',
    drawer: '',
    bank: 'Garanti BBVA',
    dueDate: '',
    amount: '',
    machine: 'CAT 320D Paletli Ekskavatör',
    desc: ''
  });

  const [newCashModalOpen, setNewCashModalOpen] = useState(false);
  const [newCashForm, setNewCashForm] = useState({
    type: 'in',
    category: 'Şantiye Peşin Tahsilat',
    client: '',
    amount: '',
    desc: ''
  });

  const [collectReceivableModal, setCollectReceivableModal] = useState(null); // receivable object
  const [collectAmount, setCollectAmount] = useState('');
  const [collectMethod, setCollectMethod] = useState('nakit'); // 'nakit' | 'banka' | 'cek'

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

  const grandTotalAssets = totalCashBalance + totalBankBalances + totalPortfolioCheques;

  // New technician form
  const [newTechForm, setNewTechForm] = useState({ 
    name: '', 
    vehicle: '', 
    specialty: 'Hidrolik & Bom Tamiri', 
    phone: '0534 407 55 85', 
    location: 'Adana Merkez' 
  });
  const [extraTechs, setExtraTechs] = useState([]);

  // Smart Machine QR Code Sticker State
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrForm, setQrForm] = useState({
    machine: 'CAT 320D Paletli Ekskavatör',
    chassis: 'CAT0320DV99841',
    customer: 'Kaya Hafriyat & Madencilik Ltd.',
    location: 'Ceyhan Taş Ocağı Şantiyesi',
    oilHours: '4.850 Saat (Gelecek: 5.000 Saat)',
    serviceCode: 'MS-8294',
    tech: 'Mehmet Usta (0534 407 55 85)'
  });

  // Telemetry fleet dataset
  const fleetVehicles = [
    { id: '01 MSA 01', type: 'Ford Transit 4x4', tech: 'Mehmet Usta', status: 'Sahada', fuel: 72, temp: 88, location: 'Ceyhan Taş Ocağı', speed: 0, lastPing: '2dk önce', phone: '0534 407 55 85' },
    { id: '01 MSA 02', type: 'Iveco Daily Yüksek Tavan', tech: 'Ahmet Usta', status: 'Sahada', fuel: 45, temp: 91, location: 'Seyhan Metal Sanayi', speed: 0, lastPing: '1dk önce', phone: '0534 407 55 85' },
    { id: '01 MSA 03', type: 'Renault Master Mobil Atölye', tech: 'Can Usta', status: 'Merkeze Dönüyor', fuel: 38, temp: 82, location: 'Kozan ➝ Adana D400', speed: 65, lastPing: '30sn önce', phone: '0534 407 55 85' },
    { id: '01 MSA 04', type: 'Ford Transit 350L', tech: 'Hasan Usta', status: 'Müsait', fuel: 92, temp: 72, location: 'Merkez Garaj (Seyhan)', speed: 0, lastPing: '5dk önce', phone: '0534 407 55 85' },
    { id: '01 MSA 05', type: 'MAN TGE 4x4 Ağır Servis', tech: 'Burak Usta', status: 'Müsait', fuel: 85, temp: 70, location: 'Merkez Garaj (Seyhan)', speed: 0, lastPing: '3dk önce', phone: '0534 407 55 85' },
  ];

  // Super Admin Export Function
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

  // Add Technician
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

  // Broadcast Emergency
  const handleBroadcastEmergency = () => {
    setEmergencyModalOpen(false);
    if (showToast) showToast(`🚨 SÜPER ADMİN: Acil Çağrı 18 Mobil Servis Aracına İletildi!`);
  };

  // Create Quick Job
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
      customer: '',
      phone: '',
      machine: 'CAT 320D Paletli Ekskavatör',
      issue: '',
      location: 'Adana / Seyhan OSB',
      tech: 'Mehmet Usta (Baş Teknisyen)',
      vehicle: '01 MSA 01 (Ford Transit 4x4)',
      eta: 25
    });
    setSelectedJobModal(created);
  };

  // Accounting: Add New Cheque
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

  // Accounting: Add Cash Transaction
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

  // Accounting: Collect Receivable
  const handleCollectReceivable = (e) => {
    e.preventDefault();
    if (!collectReceivableModal || !collectAmount) return;
    const amt = Number(collectAmount);
    if (amt <= 0) return;

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

    // If cash, add to cash transactions
    if (collectMethod === 'nakit') {
      setCashTransactions(prev => [{
        id: `NK-${Math.floor(100 + Math.random() * 900)}`,
        date: new Date().toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        type: 'in',
        category: 'Cari Hesap Tahsilatı',
        client: collectReceivableModal.client,
        amount: amt,
        desc: `${collectReceivableModal.machine} servis alacağı nakit tahsilatı`
      }, ...prev]);
    }

    setCollectReceivableModal(null);
    setCollectAmount('');
    if (showToast) showToast(`${collectReceivableModal.client} firmasından ₺${amt.toLocaleString('tr-TR')} tahsil edildi!`);
  };

  // Execute Delete
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

  // Derived Stats
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

  // Filtered & Searched Orders
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

  // Filtered Cheques
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

      {/* ═══════════ TOP COMMAND BAR (Clean White Frosted) ═══════════ */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand & Status */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-md shadow-red-600/30 border border-red-500/40">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-black text-slate-900 tracking-wider flex items-center gap-1.5">
                    <span>MESA ERP</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-50 text-red-600 font-mono border border-red-200">v2.5</span>
                  </h1>
                  <span className="text-[10px] text-slate-500 font-medium">Saha Telematik & Finans Merkezi</span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">CANLI SİSTEM</span>
              </div>
              <LiveClock />
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2.5">
              {/* Search */}
              <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 gap-2 w-60 focus-within:bg-white focus-within:border-red-500 transition-colors">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="İş emri, müşteri, araç ara..."
                  className="bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-none w-full font-medium"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-700">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Alert Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowAlerts(!showAlerts)}
                  className="relative p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 transition-colors"
                  title="Bildirimler"
                >
                  <Bell className="w-4 h-4" />
                  {unreadAlertsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center animate-pulse border-2 border-white">
                      {unreadAlertsCount}
                    </span>
                  )}
                </button>

                {showAlerts && (
                  <div className="absolute right-0 mt-2 w-84 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fadeIn">
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                      <span className="text-xs font-black text-slate-900 flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                        Bekleyen Saha Görevleri
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">{alertJobs.length} kayıt</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                      {alertJobs.length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-500">Bekleyen uyarı yok. Tüm görevler tamamlandı.</div>
                      ) : alertJobs.map(job => (
                        <button
                          key={job.id || job.code}
                          onClick={() => { 
                            setActiveTab('operations'); 
                            setSelectedJobModal(job); 
                            setShowAlerts(false); 
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors block group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-black text-red-600 group-hover:text-red-700">{job.id || job.code}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">{job.status}</span>
                          </div>
                          <div className="text-xs font-bold text-slate-900 mt-1 truncate">{job.customer}</div>
                          <div className="text-[10px] text-slate-500 truncate mt-0.5">{job.machine} • {job.location}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Super Admin Badge */}
              <div className="hidden lg:flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-3 py-1.5 rounded-xl text-xs font-black">
                <Crown className="w-3.5 h-3.5 text-red-600" />
                <span>ROOT: {user?.name || 'Süper Admin'}</span>
              </div>

              {/* Teknisyen Portal Link */}
              <Link
                to="/teknisyen"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-bold rounded-xl transition-colors"
                title="Saha Teknisyen Terminali"
              >
                <PenTool className="w-3.5 h-3.5 text-red-600" />
                <span>Teknisyen</span>
              </Link>

              {/* Quick Action: New Emergency Job Modal Trigger */}
              <button
                onClick={() => setNewJobModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-black rounded-xl transition shadow-md shadow-red-600/30 border border-red-500/50"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Yeni İş Emri</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* ═══════════ SUPER ADMIN COMMAND BANNER ═══════════ */}
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
                  <span className="font-mono text-red-600 font-bold">{user?.email || 'cebrailkara@gmail.com'}</span> • 18 mobil servis aracı, iş makinası revizyonları, çek ve kasa muhasebesi tam senkronize.
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

        {/* ═══════════ KPI CARDS (Bright & High Contrast) ═══════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Active Jobs */}
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

          {/* Nakit Kasa Bakiye */}
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

          {/* Portföydeki Çekler */}
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

          {/* Banka Mevduatları */}
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

        {/* ═══════════ TAB NAVIGATION ═══════════ */}
        <div className="flex items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-2xl w-fit flex-wrap shadow-sm">
          {[
            { id: 'operations', label: 'Saha Operasyonları', icon: Activity, count: activeOrders.length },
            { id: 'finance', label: 'Muhasebe & Finans', icon: Wallet, highlight: true, count: cheques.filter(c => c.status !== 'Tahsil Edildi').length },
            { id: 'fleet', label: 'Filo Telematik', icon: Truck, count: fleetVehicles.length + extraTechs.length },
            { id: 'parts', label: 'Yedek Parça Siparişleri', icon: Package, count: partsOrders.length },
            { id: 'admin', label: 'Süper Admin Yönetimi', icon: Crown },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  activeTab === tab.id ? 'bg-black/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ═══════════ TAB: OPERATIONS ═══════════ */}
        {activeTab === 'operations' && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left: Orders List */}
            <div className="xl:col-span-8 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              {/* Filter & Subheader */}
              <div className="p-5 border-b border-slate-100 bg-slate-50/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-red-600" />
                      Canlı Saha Görevleri
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {filteredOrders.length} iş emri listeleniyor • Detay ve yönetim için karta tıklayınız
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {['Tümü', 'Mobil Ekip Yolda', 'Şantiyede', 'Tamamlandı'].map(st => (
                      <button
                        key={st}
                        onClick={() => setFilterStatus(st)}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-200 ${
                          filterStatus === st
                            ? 'bg-red-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Cards */}
              <div className="divide-y divide-slate-100">
                {filteredOrders.length === 0 ? (
                  <div className="p-12 text-center">
                    <CheckCircle2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-500">Bu filtreye uygun iş emri bulunamadı.</p>
                  </div>
                ) : (
                  filteredOrders.map(order => {
                    const statusStyle = getStatusStyle(order.status);
                    const nextStatus = getNextStatus(order.status);
                    const nextLabel = getNextStatusLabel(order.status);

                    return (
                      <div
                        key={order.id || order.code}
                        className="p-4 sm:p-5 hover:bg-slate-50 transition-colors cursor-pointer group"
                        onClick={() => setSelectedJobModal(order)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          {/* Left Info */}
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            {/* Status Pill */}
                            <div className={`w-10 h-10 rounded-xl ${statusStyle.bg} ${statusStyle.border} border flex items-center justify-center shrink-0 mt-0.5`}>
                              <span className={`w-2.5 h-2.5 rounded-full ${statusStyle.dot} ${order.status !== 'Tamamlandı' ? 'animate-pulse' : ''}`} />
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono font-black text-red-600 text-xs">{order.id || order.code}</span>
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border`}>
                                  {order.status}
                                </span>
                                {order.etaMinutes > 0 && order.status !== 'Tamamlandı' && (
                                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-slate-400" /> ETA {order.etaMinutes} dk
                                  </span>
                                )}
                              </div>
                              <h4 className="text-sm font-bold text-slate-900 mt-1 truncate group-hover:text-red-600 transition-colors">
                                {order.customer}
                              </h4>
                              <p className="text-[11px] text-slate-600 truncate">{order.machine}</p>
                              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-500">
                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-red-600" />{order.location}</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" />{order.createdAt}</span>
                              </div>
                            </div>
                          </div>

                          {/* Right Actions */}
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <div className="flex items-center gap-2">
                              {order.cost > 0 && (
                                <span className="font-mono text-xs font-bold text-slate-900">
                                  ₺{order.cost.toLocaleString('tr-TR')}
                                </span>
                              )}
                              {isSuperAdmin && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteConfirmModal({
                                      type: 'job',
                                      id: order.id || order.code,
                                      title: `${order.id || order.code} - ${order.customer}`
                                    });
                                  }}
                                  className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition"
                                  title="İş Emrini Sil"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>

                            {nextStatus && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateOrderStatus(order.id || order.code, nextStatus);
                                }}
                                className="px-3 py-1.5 bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 rounded-lg text-[10px] font-bold transition-all duration-200 whitespace-nowrap border border-slate-200"
                              >
                                {nextLabel} →
                              </button>
                            )}

                            {order.status === 'Tamamlandı' && (
                              <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px] font-bold">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Kapatıldı
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right: Sidebar Widgets */}
            <div className="xl:col-span-4 space-y-6">
              {/* Job Distribution Donut */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center justify-between">
                  <span>İş Emri Dağılımı</span>
                  <Activity className="w-3.5 h-3.5 text-red-600" />
                </h4>
                <div className="flex items-center gap-6">
                  <DonutChart
                    size={110}
                    strokeWidth={14}
                    segments={[
                      { value: activeOrders.filter(o => o.status === 'Tamamlandı').length, color: '#10b981' },
                      { value: activeOrders.filter(o => ['Şantiyede','Teşhiste','Onarımda'].includes(o.status)).length, color: '#3b82f6' },
                      { value: activeOrders.filter(o => ['Mobil Ekip Yolda','Atandı'].includes(o.status)).length, color: '#f59e0b' },
                    ]}
                  />
                  <div className="space-y-2 text-[11px] flex-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-slate-600">Tamamlandı</span>
                      <span className="text-slate-900 font-bold ml-auto">{activeOrders.filter(o => o.status === 'Tamamlandı').length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <span className="text-slate-600">Sahada Aktif</span>
                      <span className="text-slate-900 font-bold ml-auto">{activeOrders.filter(o => ['Şantiyede','Teşhiste','Onarımda'].includes(o.status)).length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="text-slate-600">Yolda / Sevk</span>
                      <span className="text-slate-900 font-bold ml-auto">{activeOrders.filter(o => ['Mobil Ekip Yolda','Atandı'].includes(o.status)).length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-sm">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Hızlı Aksiyonlar</h4>
                
                {/* Instant Job Dispatch */}
                <button
                  onClick={() => setNewJobModalOpen(true)}
                  className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-red-50/70 border border-red-200 hover:bg-red-100/70 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Acil Görev Oluştur</span>
                    <span className="text-[10px] text-slate-500">Hızlı şantiye sevk formu</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-red-600 transition-colors" />
                </button>

                <button
                  onClick={() => { setActiveTab('finance'); setFinanceSubTab('cheques'); }}
                  className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-blue-50/70 border border-blue-200 hover:bg-blue-100/70 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Çek & Kasa İşlemleri</span>
                    <span className="text-[10px] text-slate-500">Alınan çekler ve nakit bakiye</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-blue-600 transition-colors" />
                </button>

                <Link to="/servis-takip" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Servis Takip Paneli</span>
                    <span className="text-[10px] text-slate-500">Müşteri canlı izleme ekranı</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-purple-600 transition-colors" />
                </Link>

                <Link to="/yedek-parca" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Parça Sipariş Ver</span>
                    <span className="text-[10px] text-slate-500">B2B OEM yedek parça kataloğu</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-emerald-600 transition-colors" />
                </Link>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Operasyon Metrikleri</h4>
                <div className="space-y-3">
                  {[
                    { label: 'SLA Uyum Oranı', value: 98.2, color: 'bg-emerald-500' },
                    { label: 'İlk Seferde Çözüm', value: 94.5, color: 'bg-blue-500' },
                    { label: 'Müşteri Memnuniyeti', value: 97.8, color: 'bg-red-500' },
                    { label: 'Araç Kullanılabilirlik', value: 92.0, color: 'bg-purple-500' },
                  ].map((metric, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="text-slate-600">{metric.label}</span>
                        <span className="text-slate-900 font-bold font-mono">%{metric.value}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${metric.color} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════
            TAB: MUHASEBE & FİNANS (ACCOUNTING, CHEQUES, CASH, RECEIVABLES)
        ═════════════════════════════════════════════════════════════════ */}
        {activeTab === 'finance' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Finance Hero Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Kasa Nakit */}
              <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kasa (Nakit)</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                    <Banknote className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  ₺{totalCashBalance.toLocaleString('tr-TR')}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                  <span className="text-emerald-700 font-bold">+₺51.200 Giriş</span>
                  <span className="text-red-700 font-bold">-₺10.200 Çıkış</span>
                </div>
              </div>

              {/* Portföydeki Çekler */}
              <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Alınan Çekler</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                    <Wallet className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  ₺{totalChequesCombined.toLocaleString('tr-TR')}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                  <span>Portföyde: ₺{totalPortfolioCheques.toLocaleString('tr-TR')}</span>
                  <span className="text-amber-700 font-bold">Tahsilde: ₺{totalInCollectionCheques.toLocaleString('tr-TR')}</span>
                </div>
              </div>

              {/* Banka Hesapları */}
              <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Banka Mevduatı</span>
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200">
                    <Landmark className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  ₺{totalBankBalances.toLocaleString('tr-TR')}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                  <span>4 Ticari Hesap</span>
                  <span className="text-emerald-700 font-bold">256-Bit E-Banka</span>
                </div>
              </div>

              {/* Cari Alacaklar */}
              <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cari Alacaklar</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                    <Receipt className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  ₺{totalReceivables.toLocaleString('tr-TR')}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                  <span>5 Şantiye / Firma</span>
                  <span className="text-red-700 font-bold">1 Vadesi Geçti</span>
                </div>
              </div>
            </div>

            {/* Finance Sub Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'cheques', label: 'Alınan Çekler Portföyü', count: cheques.length },
                  { id: 'cash', label: 'Nakit Kasa Defteri', count: cashTransactions.length },
                  { id: 'receivables', label: 'Cari Hesaplar & Tahsilat', count: receivables.length },
                  { id: 'banks', label: 'Banka Hesapları & IBAN', count: bankAccounts.length },
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setFinanceSubTab(sub.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                      financeSubTab === sub.id
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span>{sub.label}</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      financeSubTab === sub.id ? 'bg-black/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {sub.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Sub-actions */}
              <div className="flex items-center gap-2">
                {financeSubTab === 'cheques' && (
                  <button
                    onClick={() => setNewChequeModalOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Yeni Çek Girişi</span>
                  </button>
                )}
                {financeSubTab === 'cash' && (
                  <button
                    onClick={() => setNewCashModalOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Nakit İşlem Ekle</span>
                  </button>
                )}
              </div>
            </div>

            {/* ── SUBTAB 1: ALINAN ÇEKLER PORTFÖYÜ ── */}
            {financeSubTab === 'cheques' && (
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                {/* Cheques Header & Filters */}
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/60">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      {['Tümü', 'Portföyde', 'Tahsilde', 'Tahsil Edildi'].map(st => (
                        <button
                          key={st}
                          onClick={() => setChequeFilter(st)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                            chequeFilter === st
                              ? 'bg-red-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 gap-2 w-64 focus-within:border-red-500">
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={chequeSearch}
                      onChange={e => setChequeSearch(e.target.value)}
                      placeholder="Keşideci, çek no, banka ara..."
                      className="bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-none w-full"
                    />
                  </div>
                </div>

                {/* Cheques Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-4">Çek No</th>
                        <th className="p-4">Keşideci Firma & Makina</th>
                        <th className="p-4">Banka & Şube</th>
                        <th className="p-4">Vade Tarihi</th>
                        <th className="p-4">Tutar (₺)</th>
                        <th className="p-4">Durum</th>
                        <th className="p-4 text-right">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCheques.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-slate-400">
                            Filtreye uygun çek kaydı bulunamadı.
                          </td>
                        </tr>
                      ) : (
                        filteredCheques.map(c => (
                          <tr key={c.id} className="hover:bg-slate-50/80 transition">
                            <td className="p-4 font-mono font-bold text-red-600">{c.id}</td>
                            <td className="p-4">
                              <strong className="block text-slate-900 text-xs font-bold">{c.drawer}</strong>
                              <span className="text-[11px] text-slate-500">{c.machine} • {c.desc}</span>
                            </td>
                            <td className="p-4 text-slate-700 font-medium">{c.bank}</td>
                            <td className="p-4 font-mono text-slate-900 font-semibold">{c.dueDate}</td>
                            <td className="p-4 font-mono font-black text-slate-900 text-sm">
                              ₺{c.amount.toLocaleString('tr-TR')}
                            </td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                                c.status === 'Tahsil Edildi' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                c.status === 'Tahsilde' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                'bg-blue-50 text-blue-700 border border-blue-200'
                              }`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {c.status === 'Portföyde' && (
                                  <button
                                    onClick={() => {
                                      setCheques(prev => prev.map(item => item.id === c.id ? { ...item, status: 'Tahsilde' } : item));
                                      if (showToast) showToast(`${c.id} nolu çek bankaya tahsile verildi!`);
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-[11px] border border-amber-200 transition"
                                    title="Bankaya Tahsile Gönder"
                                  >
                                    Tahsile Ver
                                  </button>
                                )}
                                {c.status !== 'Tahsil Edildi' && (
                                  <button
                                    onClick={() => {
                                      setCheques(prev => prev.map(item => item.id === c.id ? { ...item, status: 'Tahsil Edildi' } : item));
                                      if (showToast) showToast(`${c.id} nolu çek başarıyla tahsil edildi!`);
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] border border-emerald-200 transition"
                                    title="Çeki Tahsil Edildi Olarak İşle"
                                  >
                                    Tahsil Et
                                  </button>
                                )}
                                {isSuperAdmin && (
                                  <button
                                    onClick={() => setDeleteConfirmModal({ type: 'cheque', id: c.id, title: `${c.id} - ${c.drawer}` })}
                                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition"
                                    title="Çeki Sil"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── SUBTAB 2: KASA & NAKİT DEFTERİ ── */}
            {financeSubTab === 'cash' && (
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-emerald-600" />
                      Günlük Kasa Hareketleri & Şantiye Tahsilatları
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Mevcut Nakit Kasa: ₺{totalCashBalance.toLocaleString('tr-TR')}</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-4">Fiş / No</th>
                        <th className="p-4">Tarih</th>
                        <th className="p-4">Kategori & Açıklama</th>
                        <th className="p-4">İlgili Firma / Şantiye</th>
                        <th className="p-4">İşlem Türü</th>
                        <th className="p-4 text-right">Tutar (₺)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {cashTransactions.map(tx => (
                        <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                          <td className="p-4 font-mono font-bold text-slate-500">{tx.id}</td>
                          <td className="p-4 font-mono text-slate-600">{tx.date}</td>
                          <td className="p-4">
                            <strong className="block text-slate-900 text-xs">{tx.category}</strong>
                            <span className="text-[11px] text-slate-500">{tx.desc}</span>
                          </td>
                          <td className="p-4 text-slate-800 font-medium">{tx.client}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              tx.type === 'in' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                              {tx.type === 'in' ? '+ Giriş (Tahsilat)' : '- Çıkış (Gider)'}
                            </span>
                          </td>
                          <td className={`p-4 text-right font-mono font-black text-sm ${
                            tx.type === 'in' ? 'text-emerald-700' : 'text-red-700'
                          }`}>
                            {tx.type === 'in' ? '+' : '-'}₺{tx.amount.toLocaleString('tr-TR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── SUBTAB 3: CARİ HESAPLAR & TAHSİLAT MATRİSİ ── */}
            {financeSubTab === 'receivables' && (
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-amber-600" />
                      Müşteri Cari Alacakları & Tahsilat Matrisi
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Toplam Açık Alacak: ₺{totalReceivables.toLocaleString('tr-TR')}</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-4">Müşteri / Firma</th>
                        <th className="p-4">İş Makinası / Servis</th>
                        <th className="p-4">Faturalanan</th>
                        <th className="p-4">Tahsil Edilen</th>
                        <th className="p-4">Kalan Bakiye</th>
                        <th className="p-4">Vade Tarihi</th>
                        <th className="p-4">Durum</th>
                        <th className="p-4 text-right">İşlem</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {receivables.map(r => (
                        <tr key={r.id} className="hover:bg-slate-50/80 transition">
                          <td className="p-4">
                            <strong className="block text-slate-900 text-xs">{r.client}</strong>
                            <span className="text-[10px] text-slate-400 font-mono">{r.id}</span>
                          </td>
                          <td className="p-4 text-slate-700 font-medium">{r.machine}</td>
                          <td className="p-4 font-mono text-slate-600 font-bold">₺{r.totalBilled.toLocaleString('tr-TR')}</td>
                          <td className="p-4 font-mono text-emerald-700 font-bold">₺{r.collected.toLocaleString('tr-TR')}</td>
                          <td className="p-4 font-mono text-slate-900 font-black text-sm">
                            {r.balance > 0 ? `₺${r.balance.toLocaleString('tr-TR')}` : '0 ₺ (Kapandı)'}
                          </td>
                          <td className="p-4 font-mono text-slate-600">{r.dueDate}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                              r.status === 'Vadesi Geçti' ? 'bg-red-50 text-red-700 border border-red-200' :
                              r.status === 'Vadesi Yaklaştı' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                              r.status === 'Tamamlandı' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            {r.balance > 0 && (
                              <button
                                onClick={() => {
                                  setCollectReceivableModal(r);
                                  setCollectAmount(r.balance.toString());
                                }}
                                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-sm"
                              >
                                Tahsilat Al
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── SUBTAB 4: BANKA HESAPLARI & IBAN BİLGİLERİ ── */}
            {financeSubTab === 'banks' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bankAccounts.map(bank => (
                  <div key={bank.id} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200">
                            <Landmark className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">{bank.name}</h4>
                            <span className="text-[11px] text-slate-500">{bank.type}</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Aktif
                        </span>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 my-4 flex items-center justify-between">
                        <div className="min-w-0 pr-2">
                          <span className="text-[10px] text-slate-500 block font-bold uppercase">IBAN NUMARASI</span>
                          <span className="font-mono text-xs text-slate-900 font-bold tracking-wide truncate block">{bank.iban}</span>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(bank.iban);
                            if (showToast) showToast(`${bank.name} IBAN kopyalandı!`);
                          }}
                          className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition shrink-0 shadow-sm"
                          title="IBAN Kopyala"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">Hesap Bakiyesi:</span>
                      <span className="font-mono text-lg font-black text-emerald-700">
                        ₺{bank.balance.toLocaleString('tr-TR')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══════════ TAB: FLEET TELEMATICS ═══════════ */}
        {activeTab === 'fleet' && (
          <div className="space-y-6">
            {/* Fleet Summary Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 p-4 rounded-2xl text-center shadow-sm">
                <span className="text-2xl font-black text-slate-900 font-mono">{fleetVehicles.length + extraTechs.length}</span>
                <span className="text-[10px] text-slate-500 block mt-1 font-semibold">Toplam Servis Aracı</span>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-2xl text-center shadow-sm">
                <span className="text-2xl font-black text-red-600 font-mono">
                  {fleetVehicles.filter(v => v.status === 'Sahada').length}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1 font-semibold">Sahada Müdahalede</span>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-2xl text-center shadow-sm">
                <span className="text-2xl font-black text-emerald-600 font-mono">
                  {fleetVehicles.filter(v => v.status === 'Müsait').length + extraTechs.filter(v => v.status === 'Müsait').length}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1 font-semibold">Nöbetçi / Müsait</span>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-2xl text-center shadow-sm">
                <span className="text-2xl font-black text-blue-600 font-mono">
                  {fleetVehicles.filter(v => v.status === 'Merkeze Dönüyor').length}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1 font-semibold">Dönüş Yolunda</span>
              </div>
            </div>

            {/* Fleet Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {[...fleetVehicles, ...extraTechs].map(vehicle => {
                const isActive = vehicle.status === 'Sahada';
                const isMoving = vehicle.speed > 0;
                return (
                  <div 
                    key={vehicle.id} 
                    className={`bg-white border rounded-2xl p-5 transition-all duration-300 shadow-sm ${
                      isActive ? 'border-red-300 shadow-md shadow-red-500/10' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-slate-900 text-sm">{vehicle.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            isActive ? 'bg-red-50 text-red-700 border border-red-200'
                            : vehicle.status === 'Müsait' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}>
                            {vehicle.status}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 block mt-0.5">{vehicle.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-red-500 animate-pulse' : 'bg-slate-400'}`} />
                        {vehicle.lastPing}
                      </div>
                    </div>

                    {/* Technician */}
                    <div className="flex items-center justify-between gap-2 mb-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-red-600 font-black text-xs border border-slate-200">
                          {vehicle.tech.split(' ')[0][0]}
                        </div>
                        <div>
                          <span className="text-slate-900 font-bold block leading-none">{vehicle.tech}</span>
                          <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-red-600" /> {vehicle.location}
                            {isMoving && <span className="text-blue-600 ml-1">• {vehicle.speed} km/h</span>}
                          </span>
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/905344075585?text=${encodeURIComponent(`Sayın ${vehicle.tech}, MESA ERP Operasyon Merkezi yeni görev talimatı:`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition flex items-center gap-1 text-[11px] font-bold"
                        title="WhatsApp Talimat Gönder"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Talimat</span>
                      </a>
                    </div>

                    {/* Telemetry Gauges */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                        <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1.5">
                          <span className="flex items-center gap-1"><Fuel className="w-3 h-3 text-slate-400" /> Yakıt</span>
                          <span className={`font-bold ${vehicle.fuel > 50 ? 'text-emerald-700' : vehicle.fuel > 25 ? 'text-amber-700' : 'text-red-700'}`}>
                            %{vehicle.fuel}
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${vehicle.fuel > 50 ? 'bg-emerald-500' : vehicle.fuel > 25 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${vehicle.fuel}%` }}
                          />
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                        <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1.5">
                          <span className="flex items-center gap-1"><Thermometer className="w-3 h-3 text-slate-400" /> Motor</span>
                          <span className={`font-bold ${vehicle.temp < 90 ? 'text-emerald-700' : vehicle.temp < 100 ? 'text-amber-700' : 'text-red-700'}`}>
                            {vehicle.temp}°C
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${vehicle.temp < 90 ? 'bg-emerald-500' : vehicle.temp < 100 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${Math.min(vehicle.temp, 120) / 1.2}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══════════ TAB: PARTS ORDERS ═══════════ */}
        {activeTab === 'parts' && (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/60">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Package className="w-4 h-4 text-emerald-600" />
                  B2B Orijinal Yedek Parça Siparişleri
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{partsOrders.length} aktif sipariş kayıtlı</p>
              </div>
              <Link
                to="/yedek-parca"
                className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Parça Kataloğu</span>
              </Link>
            </div>

            {partsOrders.length === 0 ? (
              <div className="p-12 text-center">
                <Package className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-500">Henüz yedek parça siparişi oluşturulmadı.</p>
                <Link to="/yedek-parca" className="text-xs text-red-600 hover:underline mt-2 inline-block font-bold">Parça Kataloğunu İncele →</Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-4">Sipariş Kodu</th>
                      <th className="p-4">Firma / Müşteri</th>
                      <th className="p-4">Sipariş Kalemleri</th>
                      <th className="p-4">Tutar</th>
                      <th className="p-4">Sevk Adresi</th>
                      <th className="p-4">Durum</th>
                      {isSuperAdmin && <th className="p-4 text-right">İşlem</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {partsOrders.map((po, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 font-mono font-bold text-red-600">{po.orderCode}</td>
                        <td className="p-4">
                          <strong className="block text-slate-900 text-xs">{po.companyName || po.customerName}</strong>
                          <span className="text-[10px] text-slate-500">{po.phone}</span>
                        </td>
                        <td className="p-4">
                          {po.items.map((it, i) => (
                            <span key={i} className="block text-[11px] text-slate-700">
                              {it.name} <span className="text-slate-400 font-mono">×{it.quantity}</span>
                            </span>
                          ))}
                        </td>
                        <td className="p-4 font-mono font-bold text-slate-900 text-sm">
                          ₺{po.total.toLocaleString('tr-TR')}
                        </td>
                        <td className="p-4 max-w-[200px] truncate text-slate-500 text-[11px]">{po.address}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                              po.status === 'Teslim Edildi' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              po.status === 'Kargoya Verildi' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                              'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {po.status}
                            </span>
                            {isSuperAdmin && (
                              <button
                                onClick={() => {
                                  const nextStatus = po.status === 'Hazırlanıyor' ? 'Kargoya Verildi' :
                                    po.status === 'Kargoya Verildi' ? 'Teslim Edildi' : 'Hazırlanıyor';
                                  updatePartsOrderStatus(po.orderCode, nextStatus);
                                }}
                                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-[10px] transition"
                                title="Durumu İlerlet"
                              >
                                ➔
                              </button>
                            )}
                          </div>
                        </td>
                        {isSuperAdmin && (
                          <td className="p-4 text-right">
                            <button
                              onClick={() => {
                                setDeleteConfirmModal({
                                  type: 'part',
                                  id: po.orderCode,
                                  title: `Sipariş ${po.orderCode}`
                                });
                              }}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition"
                              title="Siparişi Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ═══════════ TAB: SUPER ADMIN MANAGEMENT ═══════════ */}
        {activeTab === 'admin' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Profile Card */}
              <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-red-600/30 shrink-0 border border-red-500/40">
                    <Crown className="w-8 h-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-slate-900 truncate">{user?.name || 'Cebrail Kara'}</h3>
                      <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-black uppercase">ROOT</span>
                    </div>
                    <p className="text-xs text-red-600 font-mono mt-0.5">{user?.email || 'cebrailkara@gmail.com'}</p>
                    <p className="text-xs text-slate-500 mt-1">Süper Admin & Saha Operasyonları Genel Koordinatörü</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 space-y-2.5 text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Telefon Hattı:</span>
                    <a href="tel:05344075585" className="text-red-600 font-mono font-bold hover:underline">0534 407 55 85</a>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Yetki Seviyesi:</span>
                    <span className="text-emerald-700 font-bold">Tam Yetki (CRUD + Telematik + Muhasebe)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Güvenlik Doğrulaması:</span>
                    <span className="text-slate-900 font-mono">256-Bit SSL Şifreli</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Sistem Durumu:</span>
                    <span className="text-emerald-700 font-mono">Aktif (Root Oturum)</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3">
                  <button
                    onClick={handleExportJson}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-red-600/30 transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>ERP & Finans Yedeği İndir (JSON)</span>
                  </button>
                  <button
                    onClick={logout}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 text-xs font-bold transition border border-slate-200"
                    title="Oturumu Kapat"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add Technician Form */}
              <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <UserPlus className="w-5 h-5 text-red-600" />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">Yeni Usta / Servis Aracı Ekle</h3>
                </div>
                <form onSubmit={handleAddTechnician} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Teknisyen / Usta Adı *</label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Salih Usta"
                      value={newTechForm.name}
                      onChange={e => setNewTechForm({ ...newTechForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Mobil Servis Aracı & Plaka *</label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Ford Transit 4x4 (01 MSA 06)"
                      value={newTechForm.vehicle}
                      onChange={e => setNewTechForm({ ...newTechForm, vehicle: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Uzmanlık Alanı</label>
                    <select
                      value={newTechForm.specialty}
                      onChange={e => setNewTechForm({ ...newTechForm, specialty: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
                    >
                      <option>Hidrolik & Bom Tamiri</option>
                      <option>Powershift Şanzıman & Diferansiyel</option>
                      <option>Motor & Common Rail Enjektör</option>
                      <option>Elektronik & ECU Teşhis</option>
                      <option>Mobil Torna & Şantiye Kaynak</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Görev Bölgesi</label>
                    <input
                      type="text"
                      placeholder="Örn: Ceyhan & Yumurtalık Sahası"
                      value={newTechForm.location}
                      onChange={e => setNewTechForm({ ...newTechForm, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-red-600/30 transition active:scale-98"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Ustayı Filo Sistemine Kaydet</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>

            {/* Registered Technicians List */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Kayıtlı Saha Filosu & Teknisyenler ({fleetVehicles.length + extraTechs.length} Araç)
                </h3>
                <span className="text-xs text-red-600 font-mono font-bold">18 Nöbetçi Mobil Atölye</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...fleetVehicles, ...extraTechs].map((v, idx) => (
                  <div key={idx} className="bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-slate-300 p-4 rounded-2xl flex items-start justify-between gap-3 transition shadow-xs hover:shadow-md">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black text-red-600">{v.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          v.status === 'Sahada' ? 'bg-red-100 text-red-700' :
                          v.status === 'Müsait' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {v.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mt-1">{v.tech}</h4>
                      <p className="text-[11px] text-slate-500 truncate">{v.type}</p>
                      <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-2">
                        <span>📍 {v.location}</span>
                        <span>⛽ %{v.fuel}</span>
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/905344075585?text=Merhaba%20${encodeURIComponent(v.tech)},%20MESA%20ERP%20gorev%20talimati.`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 transition"
                      title="WhatsApp Talimat Gönder"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ═══════════ JOB DETAIL & ACTION MODAL ═══════════ */}
      {selectedJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-2xl w-full shadow-2xl text-slate-900 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-lg font-black text-red-600">{selectedJobModal.id || selectedJobModal.code}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusStyle(selectedJobModal.status).bg} ${getStatusStyle(selectedJobModal.status).text} border ${getStatusStyle(selectedJobModal.status).border}`}>
                    {selectedJobModal.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">{selectedJobModal.customer}</h3>
              </div>
              <button
                onClick={() => setSelectedJobModal(null)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Workflow Timeline */}
            <div className="py-4 border-b border-slate-100">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Görev İlerleme Durumu</span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-center text-[10px]">
                {['Atandı', 'Mobil Ekip Yolda', 'Şantiyede', 'Teşhiste', 'Onarımda', 'Tamamlandı'].map((st, idx) => {
                  const isActive = selectedJobModal.status === st;
                  const isPast = ['Atandı', 'Mobil Ekip Yolda', 'Şantiyede', 'Teşhiste', 'Onarımda', 'Tamamlandı'].indexOf(selectedJobModal.status) >= idx;
                  return (
                    <div 
                      key={st}
                      className={`p-2 rounded-xl font-bold border transition-colors ${
                        isActive ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30' :
                        isPast ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        'bg-slate-50 text-slate-400 border-slate-200'
                      }`}
                    >
                      {st}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Details Grid */}
            <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <span className="text-slate-500 block text-[10px] mb-1 font-bold uppercase">Makina & Arıza Tanımı</span>
                <span className="text-slate-900 font-bold block">{selectedJobModal.machine}</span>
                <span className="text-slate-600 block mt-1">{selectedJobModal.issue}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <span className="text-slate-500 block text-[10px] mb-1 font-bold uppercase">Şantiye & İletişim</span>
                <span className="text-slate-900 font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  {selectedJobModal.location}
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <a
                    href={`tel:${selectedJobModal.phone || '05344075585'}`}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1 text-[11px] border border-slate-200"
                  >
                    <Phone className="w-3 h-3 text-red-600" />
                    <span>Ara ({selectedJobModal.phone || '0534 407 55 85'})</span>
                  </a>
                  <a
                    href={`https://wa.me/905344075585?text=${encodeURIComponent(`MESA Servis: ${selectedJobModal.id || selectedJobModal.code} nolu servis durumu hakkında bildirim.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold flex items-center gap-1 text-[11px] border border-emerald-200"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <span className="text-slate-500 block text-[10px] mb-1 font-bold uppercase">Görevli Usta & Araç</span>
                <span className="text-slate-900 font-bold block">{selectedJobModal.assignedTechnician}</span>
                <span className="text-slate-500 block">{selectedJobModal.vehicle}</span>
                {selectedJobModal.techDistance && (
                  <span className="text-red-600 block font-mono text-[11px] mt-1">Mesafe: {selectedJobModal.techDistance}</span>
                )}
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <span className="text-slate-500 block text-[10px] mb-1 font-bold uppercase">Maliyet & Parça Kaydı</span>
                <span className="text-lg font-black text-emerald-700 font-mono block">
                  ₺{(selectedJobModal.cost || 0).toLocaleString('tr-TR')}
                </span>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {(selectedJobModal.partsUsed || []).length > 0 ? (
                    selectedJobModal.partsUsed.map((p, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200 text-[10px]">{p}</span>
                    ))
                  ) : (
                    <span className="text-slate-400 text-[11px]">Henüz parça girilmedi</span>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition border border-slate-200"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Yazdır / Rapor</span>
                </button>

                {isSuperAdmin && (
                  <button
                    onClick={() => {
                      setDeleteConfirmModal({
                        type: 'job',
                        id: selectedJobModal.id || selectedJobModal.code,
                        title: `${selectedJobModal.id || selectedJobModal.code} - ${selectedJobModal.customer}`
                      });
                    }}
                    className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1.5 transition border border-red-200"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Sil</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {getNextStatus(selectedJobModal.status) && (
                  <button
                    onClick={() => {
                      const next = getNextStatus(selectedJobModal.status);
                      updateOrderStatus(selectedJobModal.id || selectedJobModal.code, next);
                      setSelectedJobModal({ ...selectedJobModal, status: next });
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-600/30 transition"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{getNextStatusLabel(selectedJobModal.status)}</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedJobModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition border border-slate-200"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ QUICK NEW JOB MODAL ═══════════ */}
      {newJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl text-slate-900">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-red-600" />
                <h3 className="font-black text-base text-slate-900">Hızlı Saha Görevi / İş Emri Aç</h3>
              </div>
              <button onClick={() => setNewJobModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Müşteri / Firma Adı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Akdeniz İnşaat A.Ş."
                  value={newJobForm.customer}
                  onChange={e => setNewJobForm({ ...newJobForm, customer: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">İletişim Telefonu</label>
                  <input
                    type="text"
                    placeholder="0532 000 00 00"
                    value={newJobForm.phone}
                    onChange={e => setNewJobForm({ ...newJobForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Şantiye Konumu</label>
                  <input
                    type="text"
                    value={newJobForm.location}
                    onChange={e => setNewJobForm({ ...newJobForm, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Makina Modeli</label>
                <select
                  value={newJobForm.machine}
                  onChange={e => setNewJobForm({ ...newJobForm, machine: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
                >
                  <option>CAT 320D Paletli Ekskavatör</option>
                  <option>CAT 428F Bekoloder</option>
                  <option>JCB 3CX Eco Kazıcı Yükleyici</option>
                  <option>JCB 540-140 Telehandler</option>
                  <option>Hidromek HMK 102B Alpha</option>
                  <option>Hidromek HMK 220LC Ekskavatör</option>
                  <option>Komatsu PC200-8 Ekskavatör</option>
                  <option>Volvo EC210D Paletli Ekskavatör</option>
                  <option>Manitou MT-X 1440 Telehandler</option>
                  <option>Bobcat S530 Mini Yükleyici</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Arıza Belirtisi / Talep *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Örn: Bom hidrolik basıncı düşüyor, kule dönüşte kilitlenme var..."
                  value={newJobForm.issue}
                  onChange={e => setNewJobForm({ ...newJobForm, issue: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 resize-none transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Atanacak Teknisyen</label>
                  <select
                    value={newJobForm.tech}
                    onChange={e => setNewJobForm({ ...newJobForm, tech: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
                  >
                    {[...fleetVehicles, ...extraTechs].map(v => (
                      <option key={v.id} value={`${v.tech} (${v.type})`}>
                        {v.tech} - {v.id}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Tahmini Varış (ETA dk)</label>
                  <input
                    type="number"
                    min="5"
                    max="120"
                    value={newJobForm.eta}
                    onChange={e => setNewJobForm({ ...newJobForm, eta: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setNewJobModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition border border-slate-200"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-red-600/30 transition"
                >
                  <Zap className="w-4 h-4" />
                  <span>Görevi Başlat & Sevk Et</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════ NEW CHEQUE MODAL ═══════════ */}
      {newChequeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl text-slate-900">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-red-600" />
                <h3 className="font-black text-base text-slate-900">Portföye Yeni Çek Girişi</h3>
              </div>
              <button onClick={() => setNewChequeModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCheque} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Keşideci Firma / Müşteri *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Kaya Hafriyat & Madencilik Ltd."
                  value={newChequeForm.drawer}
                  onChange={e => setNewChequeForm({ ...newChequeForm, drawer: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Çek Numarası</label>
                  <input
                    type="text"
                    placeholder="CK-99001"
                    value={newChequeForm.id}
                    onChange={e => setNewChequeForm({ ...newChequeForm, id: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 font-mono transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Banka / Şube</label>
                  <input
                    type="text"
                    placeholder="Garanti BBVA - Adana Çarşı"
                    value={newChequeForm.bank}
                    onChange={e => setNewChequeForm({ ...newChequeForm, bank: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Vade Tarihi *</label>
                  <input
                    type="date"
                    required
                    value={newChequeForm.dueDate}
                    onChange={e => setNewChequeForm({ ...newChequeForm, dueDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Çek Tutarı (₺) *</label>
                  <input
                    type="number"
                    required
                    placeholder="150000"
                    value={newChequeForm.amount}
                    onChange={e => setNewChequeForm({ ...newChequeForm, amount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 font-mono font-bold transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">İlgili İş Makinası & Açıklama</label>
                <input
                  type="text"
                  placeholder="Örn: CAT 320D Pompa Revizyonu ve Yedek Parça Bedeli"
                  value={newChequeForm.desc}
                  onChange={e => setNewChequeForm({ ...newChequeForm, desc: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setNewChequeModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition border border-slate-200"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-red-600/30 transition"
                >
                  <Check className="w-4 h-4" />
                  <span>Çeki Portföye Kaydet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════ NEW CASH TRANSACTION MODAL ═══════════ */}
      {newCashModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl text-slate-900">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Banknote className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-base text-slate-900">Kasa Nakit İşlemi Ekle</h3>
              </div>
              <button onClick={() => setNewCashModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCash} className="py-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setNewCashForm({ ...newCashForm, type: 'in' })}
                  className={`py-2.5 rounded-xl font-bold border transition ${
                    newCashForm.type === 'in' 
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30' 
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  + Nakit Giriş (Tahsilat)
                </button>
                <button
                  type="button"
                  onClick={() => setNewCashForm({ ...newCashForm, type: 'out' })}
                  className={`py-2.5 rounded-xl font-bold border transition ${
                    newCashForm.type === 'out' 
                      ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30' 
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  - Nakit Çıkış (Gider)
                </button>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Firma / Şantiye / Alıcı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Bozkurt Hafriyat / Mobil Araç Mazot"
                  value={newCashForm.client}
                  onChange={e => setNewCashForm({ ...newCashForm, client: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Kategori</label>
                  <select
                    value={newCashForm.category}
                    onChange={e => setNewCashForm({ ...newCashForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-emerald-500 transition"
                  >
                    <option>Şantiye Peşin Tahsilat</option>
                    <option>OEM Yedek Parça Satış</option>
                    <option>Diagnostik Teşhis Ücreti</option>
                    <option>Saha Mazot Gideri</option>
                    <option>Atölye Sarf Malzeme</option>
                    <option>Personel / Usta Harcırahı</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Tutar (₺) *</label>
                  <input
                    type="number"
                    required
                    placeholder="25000"
                    value={newCashForm.amount}
                    onChange={e => setNewCashForm({ ...newCashForm, amount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-emerald-500 font-mono font-bold transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Açıklama</label>
                <input
                  type="text"
                  placeholder="Örn: 500 Bar Hortum Pres ve Yağ Değişimi Bedeli"
                  value={newCashForm.desc}
                  onChange={e => setNewCashForm({ ...newCashForm, desc: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setNewCashModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition border border-slate-200"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-emerald-600/30 transition"
                >
                  <Check className="w-4 h-4" />
                  <span>İşlemi Kasaya Kaydet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════ COLLECT RECEIVABLE MODAL ═══════════ */}
      {collectReceivableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl text-slate-900">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-base text-slate-900">Cari Tahsilat Kaydı</h3>
              </div>
              <button onClick={() => setCollectReceivableModal(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCollectReceivable} className="py-4 space-y-3.5 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <strong className="block text-slate-900 text-sm">{collectReceivableModal.client}</strong>
                <span className="text-slate-500 block mt-0.5">{collectReceivableModal.machine}</span>
                <span className="text-amber-600 block font-mono font-bold mt-1">Kalan Alacak: ₺{collectReceivableModal.balance.toLocaleString('tr-TR')}</span>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Tahsilat Yöntemi</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'nakit', label: 'Nakit Kasa' },
                    { id: 'banka', label: 'Banka Havale' },
                    { id: 'cek', label: 'Vadeli Çek' }
                  ].map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setCollectMethod(m.id)}
                      className={`py-2 rounded-xl font-bold border text-center transition ${
                        collectMethod === m.id 
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm' 
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Tahsil Edilen Tutar (₺) *</label>
                <input
                  type="number"
                  required
                  value={collectAmount}
                  onChange={e => setCollectAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-emerald-500 font-mono font-bold text-base transition"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCollectReceivableModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition border border-slate-200"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-emerald-600/30 transition"
                >
                  <Check className="w-4 h-4" />
                  <span>Tahsilatı Onayla</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════ DELETE CONFIRMATION MODAL ═══════════ */}
      {deleteConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl text-slate-900">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-100">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-center text-slate-900">Kalıcı Olarak Silinsin Mi?</h3>
            <p className="text-xs text-slate-600 text-center mt-2 mb-6 leading-relaxed">
              <strong className="text-slate-900 font-mono">{deleteConfirmModal.title}</strong> kaydını sistemden kalıcı olarak silmek üzeresiniz. Bu işlem geri alınamaz.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDeleteConfirmModal(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition border border-slate-200"
              >
                Vazgeç
              </button>
              <button
                onClick={handleExecuteDelete}
                className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs flex items-center justify-center gap-1.5 transition shadow-md shadow-red-600/30"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Evet, Sil</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ SMART MACHINE QR CODE STICKER MODAL ═══════════ */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl text-slate-900 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">Şantiye İş Makinası Akıllı QR Etiketi</h3>
                  <p className="text-xs text-slate-500">Makinanın kabinine veya bomuna yapıştırılacak dijital servis pasaportu</p>
                </div>
              </div>
              <button 
                onClick={() => setQrModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Form Settings */}
              <div className="lg:col-span-6 space-y-3.5 text-xs">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
                  Etiket Bilgilerini Düzenle
                </span>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">İş Makinası Modeli</label>
                  <input
                    type="text"
                    value={qrForm.machine}
                    onChange={e => setQrForm({ ...qrForm, machine: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-amber-500 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Şasi / Seri No</label>
                    <input
                      type="text"
                      value={qrForm.chassis}
                      onChange={e => setQrForm({ ...qrForm, chassis: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:bg-white focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Servis / Takip Kodu</label>
                    <input
                      type="text"
                      value={qrForm.serviceCode}
                      onChange={e => setQrForm({ ...qrForm, serviceCode: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono font-bold focus:bg-white focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Müşteri / Şantiye Sahibi</label>
                  <input
                    type="text"
                    value={qrForm.customer}
                    onChange={e => setQrForm({ ...qrForm, customer: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-amber-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Şantiye Konumu</label>
                  <input
                    type="text"
                    value={qrForm.location}
                    onChange={e => setQrForm({ ...qrForm, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-amber-500 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Son Bakım & Yağ Saati</label>
                    <input
                      type="text"
                      value={qrForm.oilHours}
                      onChange={e => setQrForm({ ...qrForm, oilHours: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Sorumlu Usta / Hat</label>
                    <input
                      type="text"
                      value={qrForm.tech}
                      onChange={e => setQrForm({ ...qrForm, tech: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Printable Equipment Sticker Preview */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-2 w-full text-center">
                  Baskı Önizlemesi (10x15 cm Su Geçirmez Etiket)
                </span>

                <div 
                  id="printable-machine-qr-sticker"
                  className="w-full max-w-sm bg-white border-4 border-slate-950 rounded-2xl p-5 shadow-lg text-slate-950 text-center space-y-3 relative overflow-hidden"
                >
                  {/* Industrial Top Header */}
                  <div className="bg-red-600 text-white p-2 rounded-xl text-center space-y-0.5">
                    <div className="flex items-center justify-center gap-1.5 font-black text-xs tracking-wider uppercase">
                      <span>MESA İŞ MAKİNALARI</span>
                    </div>
                    <p className="text-[9px] font-mono tracking-widest text-red-100">7/24 TELEMATİK & MOBİL SAHA SERVİSİ</p>
                  </div>

                  {/* QR Vector Pattern Preview */}
                  <div className="bg-white p-3 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center mx-auto">
                    <svg className="w-32 h-32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" fill="white" />
                      {/* Standard QR Finder Patterns (Top-Left, Top-Right, Bottom-Left) */}
                      <rect x="5" y="5" width="26" height="26" fill="black" />
                      <rect x="9" y="9" width="18" height="18" fill="white" />
                      <rect x="13" y="13" width="10" height="10" fill="black" />

                      <rect x="69" y="5" width="26" height="26" fill="black" />
                      <rect x="73" y="9" width="18" height="18" fill="white" />
                      <rect x="77" y="13" width="10" height="10" fill="black" />

                      <rect x="5" y="69" width="26" height="26" fill="black" />
                      <rect x="9" y="73" width="18" height="18" fill="white" />
                      <rect x="13" y="77" width="10" height="10" fill="black" />

                      {/* Data Pattern Simulation */}
                      <rect x="36" y="8" width="5" height="5" fill="black" />
                      <rect x="46" y="8" width="5" height="5" fill="black" />
                      <rect x="56" y="8" width="5" height="5" fill="black" />
                      <rect x="36" y="18" width="5" height="5" fill="black" />
                      <rect x="46" y="24" width="5" height="5" fill="black" />
                      <rect x="56" y="18" width="5" height="5" fill="black" />
                      <rect x="8" y="36" width="5" height="5" fill="black" />
                      <rect x="18" y="46" width="5" height="5" fill="black" />
                      <rect x="24" y="36" width="5" height="5" fill="black" />
                      <rect x="36" y="36" width="28" height="28" fill="#dc2626" rx="4" />
                      <text x="50" y="54" fill="white" fontSize="14" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">MESA</text>
                      <rect x="68" y="36" width="5" height="5" fill="black" />
                      <rect x="78" y="46" width="5" height="5" fill="black" />
                      <rect x="88" y="36" width="5" height="5" fill="black" />
                      <rect x="36" y="68" width="5" height="5" fill="black" />
                      <rect x="46" y="76" width="5" height="5" fill="black" />
                      <rect x="56" y="68" width="5" height="5" fill="black" />
                      <rect x="68" y="68" width="5" height="5" fill="black" />
                      <rect x="78" y="76" width="5" height="5" fill="black" />
                      <rect x="88" y="88" width="5" height="5" fill="black" />
                    </svg>
                    <span className="font-mono text-xs font-black text-red-600 mt-1">KOD: {qrForm.serviceCode}</span>
                  </div>

                  {/* Machine Passport Details */}
                  <div className="text-[11px] text-left space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <div className="font-bold text-slate-950 truncate">{qrForm.machine}</div>
                    <div className="text-slate-600 font-mono text-[10px]">ŞASİ: {qrForm.chassis}</div>
                    <div className="text-slate-600 truncate">{qrForm.customer} • {qrForm.location}</div>
                    <div className="text-emerald-700 font-bold text-[10px]">Çalışma Saati: {qrForm.oilHours}</div>
                  </div>

                  {/* Footer Hotline */}
                  <div className="pt-1">
                    <div className="text-[10px] font-black text-red-600">
                      7/24 ACİL SERVİS: 0534 407 55 85
                    </div>
                    <span className="text-[9px] text-slate-500 block">
                      Akıllı telefon kamerası ile okutarak servis geçmişini görüntüleyin
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setQrModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
              >
                Kapat
              </button>

              <div className="flex items-center gap-2">
                <Link
                  to={`/servis-takip?kod=${qrForm.serviceCode}`}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition border border-slate-200"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Takip Ekranında İncele</span>
                </Link>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-amber-600/30 transition"
                >
                  <Printer className="w-4 h-4" />
                  <span>QR Etiketi Yazdır (Kabin / Bom)</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ═══════════ EMERGENCY FLEET ALARM BROADCAST MODAL ═══════════ */}
      {emergencyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl text-slate-900">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-red-600">
                <Radio className="w-5 h-5 animate-pulse" />
                <h3 className="font-black text-base text-slate-900">Tüm Filoya Acil Çağrı Alarmı</h3>
              </div>
              <button
                onClick={() => setEmergencyModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Bu mesaj Çukurova havzasındaki 18 nöbetçi mobil servis aracının tabletlerine ve saha teknisyenlerine anında acil durum uyarısı olarak iletilecektir.
            </p>
            <textarea
              rows={3}
              value={emergencyAlertText}
              onChange={e => setEmergencyAlertText(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-red-500 transition resize-none mb-4"
            />
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setEmergencyModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                İptal
              </button>
              <button
                onClick={handleBroadcastEmergency}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-red-600/30 transition"
              >
                <Radio className="w-4 h-4" />
                <span>Alarmı Yayınla</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

