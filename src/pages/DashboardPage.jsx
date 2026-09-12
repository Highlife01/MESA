import React, { useState, useMemo, useEffect } from 'react';
import { Link } from '../router/Router';
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
  UserPlus, LogOut, Lock, Radio
} from 'lucide-react';

// ── Mini Sparkline Chart (pure SVG) ──
function Sparkline({ data, color = '#f59e0b', height = 32, width = 80 }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="shrink-0">
      <defs>
        <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#sg-${color.replace('#','')})`}
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
    const duration = 1200;
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
function DonutChart({ segments, size = 100, strokeWidth = 12 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  let cumulativePercent = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#1e293b" strokeWidth={strokeWidth} />
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
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        );
      })}
      <text x={size/2} y={size/2 - 6} textAnchor="middle" className="fill-white text-lg font-black">{total}</text>
      <text x={size/2} y={size/2 + 10} textAnchor="middle" className="fill-slate-400 text-[9px] font-medium">TOPLAM</text>
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
    <span className="font-mono text-xs text-slate-400">
      {time.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  );
}


export function DashboardPage() {
  const { 
    activeOrders, partsOrders, updateOrderStatus, unreadAlertsCount, 
    liveJobs, deleteJob, deletePartsOrder, showToast 
  } = useOperational();
  const { user, isSuperAdmin, logout } = useAuth();

  const [filterStatus, setFilterStatus] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showAlerts, setShowAlerts] = useState(false);
  const [activeTab, setActiveTab] = useState('operations');
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [emergencyAlertText, setEmergencyAlertText] = useState('Tüm nöbetçi mobil ekipler: Çukurova havzası acil müdahale seviye-1 aktif.');
  const [newTechForm, setNewTechForm] = useState({ name: '', vehicle: '', specialty: 'Hidrolik & Bom Tamiri', phone: '0534 407 55 85', location: 'Adana' });
  const [extraTechs, setExtraTechs] = useState([]);

  // Super Admin Export Function
  const handleExportJson = () => {
    const backupData = {
      exportTimestamp: new Date().toISOString(),
      superAdmin: {
        name: user?.name || 'Cebrail Kara',
        email: user?.email || 'cebrailkara@gmail.com',
        role: 'Süper Admin (Root)'
      },
      activeOrders,
      partsOrders,
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
    if (showToast) showToast('ERP Sistem Veritabanı JSON Olarak İndirildi!');
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
    setNewTechForm({ name: '', vehicle: '', specialty: 'Hidrolik & Bom Tamiri', phone: '0534 407 55 85', location: 'Adana' });
    if (showToast) showToast(`Yeni Usta ${newT.tech} Filoya Başarıyla Eklendi!`);
  };

  const handleBroadcastEmergency = () => {
    setEmergencyModalOpen(false);
    if (showToast) showToast(`🚨 SÜPER ADMİN: Acil Çağrı 18 Mobil Servis Aracına İletildi!`);
  };

  // ── Derived Stats ──
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

  // ── Filtered & Searched Orders ──
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

  // ── Mock telemetry data ──
  const fleetVehicles = [
    { id: '01 MSA 01', type: 'Ford Transit 4x4', tech: 'Mehmet Usta', status: 'Sahada', fuel: 72, temp: 88, location: 'Ceyhan', speed: 0, lastPing: '2dk önce' },
    { id: '01 MSA 02', type: 'Iveco Daily', tech: 'Ahmet Usta', status: 'Sahada', fuel: 45, temp: 91, location: 'Seyhan OSB', speed: 0, lastPing: '1dk önce' },
    { id: '01 MSA 03', type: 'Renault Master', tech: 'Can Usta', status: 'Merkeze Dönüyor', fuel: 38, temp: 82, location: 'Kozan ➝ Adana', speed: 65, lastPing: '30sn önce' },
    { id: '01 MSA 04', type: 'Ford Transit', tech: 'Hasan Usta', status: 'Müsait', fuel: 92, temp: 72, location: 'Merkez Garaj', speed: 0, lastPing: '5dk önce' },
    { id: '01 MSA 05', type: 'MAN TGE', tech: 'Burak Usta', status: 'Müsait', fuel: 85, temp: 70, location: 'Merkez Garaj', speed: 0, lastPing: '3dk önce' },
  ];

  const sparkData = {
    jobs: [3, 5, 4, 7, 6, 8, 5, 9, 7, 6, 8, stats.active],
    revenue: [12, 18, 15, 22, 28, 19, 31, 24, 38, 29, 35, stats.totalRevenue / 1000],
    eta: [35, 32, 28, 30, 27, 25, 31, 28, 26, 29, 28, stats.avgEta],
    completion: [92, 94, 96, 95, 97, 98, 96, 99, 97, 98, 99, stats.completionRate]
  };

  const statusColors = {
    'Mobil Ekip Yolda': { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30', dot: 'bg-amber-400' },
    'Şantiyede': { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30', dot: 'bg-blue-400' },
    'Teşhiste': { bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-500/30', dot: 'bg-purple-400' },
    'Onarımda': { bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-orange-500/30', dot: 'bg-orange-400' },
    'Tamamlandı': { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
    'Atandı': { bg: 'bg-cyan-500/15', text: 'text-cyan-400', border: 'border-cyan-500/30', dot: 'bg-cyan-400' },
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

  return (
    <div className="min-h-screen bg-[#060912] text-slate-100">
      <SEO
        title="MESA ERP & Telematik Canlı Operasyon Merkezi"
        description="Mesa İş Makinaları 7/24 filo yönetimi, telematik arıza takip ve saha servis yönetim merkezi."
        canonical="/panel"
      />

      {/* ═══════════ TOP COMMAND BAR ═══════════ */}
      <div className="sticky top-0 z-40 bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-slate-800/60">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left — Title & Status */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <BarChart3 className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <h1 className="text-sm font-black text-white tracking-tight leading-none">MESA ERP</h1>
                  <span className="text-[10px] text-slate-500 font-medium">Operasyon Merkezi</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Canlı</span>
              </div>
              <LiveClock />
            </div>

            {/* Right — Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="hidden md:flex items-center bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-1.5 gap-2 w-56 focus-within:border-amber-500/50 transition-colors">
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="İş emri, müşteri ara..."
                  className="bg-transparent text-xs text-white placeholder:text-slate-600 outline-none w-full"
                />
              </div>

              {/* Alert Bell */}
              <button
                onClick={() => setShowAlerts(!showAlerts)}
                className="relative p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <Bell className="w-4 h-4 text-slate-400" />
                {unreadAlertsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center min-w-[18px] h-[18px]">
                    {unreadAlertsCount}
                  </span>
                )}
              </button>

              {isSuperAdmin ? (
                <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-xl text-xs font-black">
                  <Crown className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Süper Admin: {user?.name || 'Cebrail Kara'}</span>
                  <span className="md:hidden">Admin</span>
                </div>
              ) : (
                <Link
                  to="/admin"
                  className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-amber-400 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
                  title="Süper Admin Girişi (cebrailkara@gmail.com)"
                >
                  <Lock className="w-3 h-3 text-slate-500" />
                  <span>Admin Girişi</span>
                </Link>
              )}

              <Link
                to="/teknisyen"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors"
              >
                <PenTool className="w-3.5 h-3.5 text-amber-400" />
                <span>Teknisyen</span>
              </Link>

              <Link
                to="/ariza-bildir"
                className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl transition shadow-lg shadow-amber-500/20"
              >
                <Zap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Acil Görev</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* ═══════════ SUPER ADMIN STATUS BANNER ═══════════ */}
        {isSuperAdmin ? (
          <div className="bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-slate-900/60 border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl shadow-amber-500/10 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-black text-xl shadow-xl shadow-amber-500/20 shrink-0">
                  <Crown className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-black text-white tracking-tight">
                      Süper Admin: {user?.name || 'Cebrail Kara'}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-sm">
                      ROOT / TAM YETKİ
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Aktif Oturum
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    <span className="font-mono text-amber-300 font-bold">{user?.email || 'cebrailkara@gmail.com'}</span> • İş emri silme, yeni teknisyen atama, filo telematik ve ERP sistem yönetimi aktif.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                <button
                  onClick={() => setEmergencyModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/40 text-red-400 text-xs font-bold flex items-center gap-2 transition"
                  title="Tüm filoya acil çağrı gönder"
                >
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>Filo Alarmı</span>
                </button>

                <button
                  onClick={handleExportJson}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500/50 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-2 transition"
                  title="Sistem ERP veritabanı yedeğini JSON olarak indir"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verileri İndir (JSON)</span>
                </button>

                <button
                  onClick={logout}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/40 text-slate-400 hover:text-red-400 text-xs font-bold flex items-center gap-1.5 transition ml-auto lg:ml-0"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Çıkış Yap</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Sınırlı Görünüm (Demo Modu)</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  İş emri silme, yeni usta/teknisyen atama ve telematik verilerini dışa aktarmak için Süper Admin hesabı ile giriş yapınız.
                </p>
              </div>
            </div>
            <Link
              to="/admin"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition shrink-0"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Süper Admin Girişi (cebrailkara@gmail.com)</span>
            </Link>
          </div>
        )}

        {/* ═══════════ KPI CARDS ═══════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Active Jobs */}
          <div className="group bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800/80 p-5 rounded-2xl hover:border-amber-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Aktif Saha Görevleri</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Activity className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-3xl font-black text-white font-mono block leading-none">
                  <AnimatedCounter value={stats.active} />
                </span>
                <span className="text-[10px] text-amber-400 font-semibold mt-1 block flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> {stats.total} toplam iş emri
                </span>
              </div>
              <Sparkline data={sparkData.jobs} color="#f59e0b" />
            </div>
          </div>

          {/* Revenue */}
          <div className="group bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800/80 p-5 rounded-2xl hover:border-emerald-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Toplam Ciro</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-3xl font-black text-white font-mono block leading-none">
                  {(stats.totalRevenue / 1000).toFixed(0)}K
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold mt-1 block flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> ₺{stats.totalRevenue.toLocaleString('tr-TR')}
                </span>
              </div>
              <Sparkline data={sparkData.revenue} color="#10b981" />
            </div>
          </div>

          {/* Avg ETA */}
          <div className="group bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800/80 p-5 rounded-2xl hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Ort. Müdahale Süresi</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Timer className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-3xl font-black text-white font-mono block leading-none">
                  <AnimatedCounter value={28} suffix=" dk" />
                </span>
                <span className="text-[10px] text-blue-400 font-semibold mt-1 block flex items-center gap-1">
                  <ArrowDownRight className="w-3 h-3" /> Hedef: 30 dk
                </span>
              </div>
              <Sparkline data={sparkData.eta} color="#3b82f6" />
            </div>
          </div>

          {/* Completion Rate */}
          <div className="group bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800/80 p-5 rounded-2xl hover:border-purple-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tamamlanma Oranı</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Target className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-3xl font-black text-white font-mono block leading-none">
                  %<AnimatedCounter value={99.4} />
                </span>
                <span className="text-[10px] text-purple-400 font-semibold mt-1 block flex items-center gap-1">
                  <Award className="w-3 h-3" /> 12 Ay Yazılı Garanti
                </span>
              </div>
              <Sparkline data={sparkData.completion} color="#a855f7" />
            </div>
          </div>
        </div>

        {/* ═══════════ TAB NAVIGATION ═══════════ */}
        <div className="flex items-center gap-1 p-1 bg-slate-900/60 border border-slate-800/60 rounded-2xl w-fit flex-wrap">
          {[
            { id: 'operations', label: 'Saha Operasyonları', icon: Activity },
            { id: 'fleet', label: 'Filo Telematik', icon: Truck },
            { id: 'parts', label: 'Yedek Parça Siparişleri', icon: Package },
            { id: 'admin', label: 'Süper Admin Yönetimi', icon: Crown, highlight: isSuperAdmin },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ═══════════ TAB: OPERATIONS ═══════════ */}
        {activeTab === 'operations' && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left — Orders Table */}
            <div className="xl:col-span-8 bg-slate-900/60 border border-slate-800/60 rounded-2xl overflow-hidden">
              {/* Table Header */}
              <div className="p-5 border-b border-slate-800/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      Canlı Saha Görevleri
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{filteredOrders.length} iş emri görüntüleniyor</p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {['Tümü', 'Mobil Ekip Yolda', 'Şantiyede', 'Tamamlandı'].map(st => (
                      <button
                        key={st}
                        onClick={() => setFilterStatus(st)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 ${
                          filterStatus === st
                            ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                            : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Cards (Mobile-friendly) */}
              <div className="divide-y divide-slate-800/40">
                {filteredOrders.length === 0 ? (
                  <div className="p-12 text-center">
                    <CheckCircle2 className="w-10 h-10 text-slate-700 mx-auto mb-3" />
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
                        className="p-4 sm:p-5 hover:bg-slate-800/20 transition-colors cursor-pointer group"
                        onClick={() => setSelectedJob(selectedJob?.id === order.id ? null : order)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          {/* Left Info */}
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            {/* Status Dot */}
                            <div className={`w-10 h-10 rounded-xl ${statusStyle.bg} ${statusStyle.border} border flex items-center justify-center shrink-0 mt-0.5`}>
                              <span className={`w-2.5 h-2.5 rounded-full ${statusStyle.dot} ${order.status !== 'Tamamlandı' ? 'animate-pulse' : ''}`} />
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono font-black text-amber-400 text-xs">{order.id || order.code}</span>
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border`}>
                                  {order.status}
                                </span>
                                {order.etaMinutes > 0 && order.status !== 'Tamamlandı' && (
                                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> ETA {order.etaMinutes} dk
                                  </span>
                                )}
                              </div>
                              <h4 className="text-sm font-bold text-white mt-1 truncate">{order.customer}</h4>
                              <p className="text-[11px] text-slate-400 truncate">{order.machine}</p>
                              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-500">
                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{order.location}</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{order.createdAt}</span>
                              </div>
                            </div>
                          </div>

                          {/* Right Actions */}
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <div className="flex items-center gap-2">
                              {order.cost > 0 && (
                                <span className="font-mono text-xs font-bold text-white">
                                  ₺{order.cost.toLocaleString('tr-TR')}
                                </span>
                              )}
                              {isSuperAdmin && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (window.confirm(`${order.id || order.code} nolu iş emrini kalıcı olarak silmek istiyor musunuz?`)) {
                                      deleteJob(order.id || order.code);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 border border-red-500/30 transition"
                                  title="Süper Admin: İş Emrini Sil"
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
                                className="px-3 py-1.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 rounded-lg text-[10px] font-bold transition-all duration-200 whitespace-nowrap"
                              >
                                {nextLabel} →
                              </button>
                            )}
                            {order.status === 'Tamamlandı' && (
                              <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold">
                                <CheckCircle2 className="w-3 h-3" /> Kapatıldı
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Expanded Detail */}
                        {selectedJob?.id === order.id && (
                          <div className="mt-4 pt-4 border-t border-slate-800/40 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px] animate-fadeIn">
                            <div>
                              <span className="text-slate-500 block mb-1">Teknisyen</span>
                              <span className="text-white font-semibold">{order.assignedTechnician}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block mb-1">Araç</span>
                              <span className="text-white font-semibold">{order.vehicle}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block mb-1">Mesafe</span>
                              <span className="text-white font-semibold">{order.techDistance}</span>
                            </div>
                            <div className="sm:col-span-2">
                              <span className="text-slate-500 block mb-1">Arıza Açıklaması</span>
                              <span className="text-white font-semibold">{order.issue}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block mb-1">Kullanılan Parçalar</span>
                              <div className="flex flex-wrap gap-1 mt-0.5">
                                {(order.partsUsed || []).length > 0 ? order.partsUsed.map((p, i) => (
                                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">{p}</span>
                                )) : (
                                  <span className="text-slate-600">—</span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right — Sidebar Widgets */}
            <div className="xl:col-span-4 space-y-6">
              {/* Job Distribution Donut */}
              <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">İş Emri Dağılımı</h4>
                <div className="flex items-center gap-6">
                  <DonutChart
                    size={110}
                    strokeWidth={14}
                    segments={[
                      { value: activeOrders.filter(o => o.status === 'Tamamlandı').length, color: '#10b981' },
                      { value: activeOrders.filter(o => o.status === 'Şantiyede' || o.status === 'Teşhiste' || o.status === 'Onarımda').length, color: '#3b82f6' },
                      { value: activeOrders.filter(o => o.status === 'Mobil Ekip Yolda' || o.status === 'Atandı').length, color: '#f59e0b' },
                    ]}
                  />
                  <div className="space-y-2 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-slate-400">Tamamlandı</span>
                      <span className="text-white font-bold ml-auto">{activeOrders.filter(o => o.status === 'Tamamlandı').length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <span className="text-slate-400">Sahada Aktif</span>
                      <span className="text-white font-bold ml-auto">{activeOrders.filter(o => ['Şantiyede','Teşhiste','Onarımda'].includes(o.status)).length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="text-slate-400">Yolda / Atandı</span>
                      <span className="text-white font-bold ml-auto">{activeOrders.filter(o => ['Mobil Ekip Yolda','Atandı'].includes(o.status)).length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Hızlı Aksiyonlar</h4>
                <Link to="/ariza-bildir" className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Acil Görev Oluştur</span>
                    <span className="text-[10px] text-slate-500">7/24 Şantiye müdahale çağrısı</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 ml-auto group-hover:text-amber-400 transition-colors" />
                </Link>

                <Link to="/servis-takip" className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-800 hover:bg-slate-800 transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Servis Takip Paneli</span>
                    <span className="text-[10px] text-slate-500">Müşteri canlı izleme ekranı</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 ml-auto group-hover:text-blue-400 transition-colors" />
                </Link>

                <Link to="/yedek-parca" className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-800 hover:bg-slate-800 transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                    <Package className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Parça Sipariş Ver</span>
                    <span className="text-[10px] text-slate-500">B2B OEM yedek parça kataloğu</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 ml-auto group-hover:text-emerald-400 transition-colors" />
                </Link>

                <Link to="/ariza-kodu-cozucu" className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-800 hover:bg-slate-800 transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center">
                    <Layers className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">DTC Arıza Çözücü</span>
                    <span className="text-[10px] text-slate-500">AI destekli diagnostik motor</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 ml-auto group-hover:text-purple-400 transition-colors" />
                </Link>
              </div>

              {/* Performance Metrics */}
              <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Performans Metrikleri</h4>
                <div className="space-y-3">
                  {[
                    { label: 'SLA Uyum Oranı', value: 98.2, color: 'bg-emerald-500' },
                    { label: 'İlk Seferde Çözüm', value: 94.5, color: 'bg-blue-500' },
                    { label: 'Müşteri Memnuniyeti', value: 97.8, color: 'bg-amber-500' },
                    { label: 'Araç Kullanılabilirlik', value: 88.0, color: 'bg-purple-500' },
                  ].map((metric, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="text-slate-400">{metric.label}</span>
                        <span className="text-white font-bold font-mono">%{metric.value}</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
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

        {/* ═══════════ TAB: FLEET TELEMATICS ═══════════ */}
        {activeTab === 'fleet' && (
          <div className="space-y-6">
            {/* Fleet Summary Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-4 text-center">
                <span className="text-2xl font-black text-white font-mono">{fleetVehicles.length}</span>
                <span className="text-[10px] text-slate-500 block mt-1">Toplam Araç</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-4 text-center">
                <span className="text-2xl font-black text-amber-400 font-mono">{fleetVehicles.filter(v => v.status === 'Sahada').length}</span>
                <span className="text-[10px] text-slate-500 block mt-1">Sahada Aktif</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-4 text-center">
                <span className="text-2xl font-black text-emerald-400 font-mono">{fleetVehicles.filter(v => v.status === 'Müsait').length}</span>
                <span className="text-[10px] text-slate-500 block mt-1">Müsait</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-4 text-center">
                <span className="text-2xl font-black text-blue-400 font-mono">{fleetVehicles.filter(v => v.status === 'Merkeze Dönüyor').length}</span>
                <span className="text-[10px] text-slate-500 block mt-1">Dönüş Yolunda</span>
              </div>
            </div>

            {/* Fleet Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {fleetVehicles.map(vehicle => {
                const isActive = vehicle.status === 'Sahada';
                const isMoving = vehicle.speed > 0;
                return (
                  <div key={vehicle.id} className={`bg-slate-900/60 border rounded-2xl p-5 transition-all duration-300 ${isActive ? 'border-amber-500/30 hover:border-amber-500/50' : 'border-slate-800/60 hover:border-slate-700'}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-white text-sm">{vehicle.id}</span>
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                            isActive ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : vehicle.status === 'Müsait' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                          }`}>
                            {vehicle.status}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 block mt-0.5">{vehicle.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-amber-400 animate-pulse' : 'bg-slate-600'}`} />
                        {vehicle.lastPing}
                      </div>
                    </div>

                    {/* Technician */}
                    <div className="flex items-center gap-2 mb-4 text-xs">
                      <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-[10px]">
                        {vehicle.tech.split(' ')[0][0]}
                      </div>
                      <div>
                        <span className="text-white font-semibold block leading-none">{vehicle.tech}</span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {vehicle.location}
                          {isMoving && <span className="text-blue-400 ml-1">• {vehicle.speed} km/h</span>}
                        </span>
                      </div>
                    </div>

                    {/* Telemetry Gauges */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-950/60 rounded-xl p-3">
                        <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1.5">
                          <span className="flex items-center gap-1"><Fuel className="w-3 h-3" /> Yakıt</span>
                          <span className={`font-bold ${vehicle.fuel > 50 ? 'text-emerald-400' : vehicle.fuel > 25 ? 'text-amber-400' : 'text-red-400'}`}>
                            %{vehicle.fuel}
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${vehicle.fuel > 50 ? 'bg-emerald-500' : vehicle.fuel > 25 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${vehicle.fuel}%` }}
                          />
                        </div>
                      </div>
                      <div className="bg-slate-950/60 rounded-xl p-3">
                        <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1.5">
                          <span className="flex items-center gap-1"><Thermometer className="w-3 h-3" /> Motor</span>
                          <span className={`font-bold ${vehicle.temp < 90 ? 'text-emerald-400' : vehicle.temp < 100 ? 'text-amber-400' : 'text-red-400'}`}>
                            {vehicle.temp}°C
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
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
          <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Package className="w-4 h-4 text-emerald-400" />
                  B2B Orijinal Yedek Parça Siparişleri
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{partsOrders.length} aktif sipariş</p>
              </div>
              <Link
                to="/yedek-parca"
                className="px-4 py-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-xl hover:bg-emerald-500/25 transition-colors flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Parça Kataloğu
              </Link>
            </div>

            {partsOrders.length === 0 ? (
              <div className="p-12 text-center">
                <Package className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-500">Henüz yedek parça siparişi oluşturulmadı.</p>
                <Link to="/yedek-parca" className="text-xs text-amber-400 hover:underline mt-2 inline-block">Parça Kataloğunu İncele →</Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/60 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-800/60">
                    <tr>
                      <th className="p-4">Sipariş</th>
                      <th className="p-4">Firma / Müşteri</th>
                      <th className="p-4">İçerik</th>
                      <th className="p-4">Toplam</th>
                      <th className="p-4">Adres</th>
                      <th className="p-4">Durum</th>
                      {isSuperAdmin && <th className="p-4 text-right">İşlem</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {partsOrders.map((po, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                        <td className="p-4 font-mono font-bold text-amber-400">{po.orderCode}</td>
                        <td className="p-4">
                          <strong className="block text-white text-xs">{po.companyName || po.customerName}</strong>
                          <span className="text-[10px] text-slate-500">{po.phone}</span>
                        </td>
                        <td className="p-4">
                          {po.items.map((it, i) => (
                            <span key={i} className="block text-[11px]">
                              {it.name} <span className="text-slate-600">×{it.quantity}</span>
                            </span>
                          ))}
                        </td>
                        <td className="p-4 font-mono font-bold text-white">
                          ₺{po.total.toLocaleString('tr-TR')}
                        </td>
                        <td className="p-4 max-w-[200px] truncate text-slate-500 text-[11px]">{po.address}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            {po.status}
                          </span>
                        </td>
                        {isSuperAdmin && (
                          <td className="p-4 text-right">
                            <button
                              onClick={() => {
                                if (window.confirm(`${po.orderCode} nolu siparişi silmek istediğinize emin misiniz?`)) {
                                  deletePartsOrder(po.orderCode);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition"
                              title="Süper Admin: Siparişi Sil"
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
            {/* Super Admin Status Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Profile Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/20 border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black text-2xl shadow-xl shadow-amber-500/20 shrink-0">
                    <Crown className="w-9 h-9" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-white truncate">{user?.name || 'Cebrail Kara'}</h3>
                      <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[10px] font-black uppercase">ROOT</span>
                    </div>
                    <p className="text-xs text-amber-300 font-mono mt-0.5">{user?.email || 'cebrailkara@gmail.com'}</p>
                    <p className="text-xs text-slate-400 mt-1">Süper Admin & Saha Operasyonları Genel Koordinatörü</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800 space-y-2.5 text-xs">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Telefon Hattı:</span>
                    <a href="tel:05344075585" className="text-amber-400 font-mono font-bold hover:underline">0534 407 55 85</a>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Yetki Seviyesi:</span>
                    <span className="text-emerald-400 font-bold">Tam Yetki (CRUD + Telematik)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Güvenlik Durumu:</span>
                    <span className="text-white font-mono">256-Bit SSL Şifreli</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Oturum:</span>
                    <span className="text-slate-300 font-mono">Aktif (Yerel Oturum)</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800 flex items-center gap-3">
                  <button
                    onClick={handleExportJson}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>ERP Yedeği İndir (JSON)</span>
                  </button>
                  {isSuperAdmin && (
                    <button
                      onClick={logout}
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-400 text-xs font-bold transition"
                      title="Oturumu Kapat"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Add Technician Form */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <UserPlus className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm font-black text-white uppercase tracking-wide">Yeni Usta / Servis Aracı Ekle</h3>
                </div>
                <form onSubmit={handleAddTechnician} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Teknisyen / Usta Adı *</label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Salih Usta"
                      value={newTechForm.name}
                      onChange={e => setNewTechForm({ ...newTechForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Mobil Servis Aracı & Plaka *</label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Ford Transit 4x4 (01 MSA 06)"
                      value={newTechForm.vehicle}
                      onChange={e => setNewTechForm({ ...newTechForm, vehicle: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Uzmanlık Alanı</label>
                    <select
                      value={newTechForm.specialty}
                      onChange={e => setNewTechForm({ ...newTechForm, specialty: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                    >
                      <option>Hidrolik & Bom Tamiri</option>
                      <option>Powershift Şanzıman & Diferansiyel</option>
                      <option>Motor & Common Rail Enjektör</option>
                      <option>Elektronik & ECU Teşhis</option>
                      <option>Mobil Torna & Şantiye Kaynak</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Görev Bölgesi</label>
                    <input
                      type="text"
                      placeholder="Örn: Ceyhan & Yumurtalık Sahası"
                      value={newTechForm.location}
                      onChange={e => setNewTechForm({ ...newTechForm, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-98"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Ustayı Filo Sistemine Kaydet</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>

            {/* Registered Technicians List */}
            <div className="bg-slate-900/60 border border-slate-800/60 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Kayıtlı Saha Filosu & Teknisyenler ({fleetVehicles.length + extraTechs.length} Araç)
                </h3>
                <span className="text-xs text-amber-400 font-mono font-bold">18 Nöbetçi Mobil Atölye</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...fleetVehicles, ...extraTechs].map((v, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800/80 p-4 rounded-2xl flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black text-amber-400">{v.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          v.status === 'Sahada' ? 'bg-amber-500/15 text-amber-400' :
                          v.status === 'Müsait' ? 'bg-emerald-500/15 text-emerald-400' :
                          'bg-blue-500/15 text-blue-400'
                        }`}>
                          {v.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1">{v.tech}</h4>
                      <p className="text-[11px] text-slate-400 truncate">{v.type}</p>
                      <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-2">
                        <span>📍 {v.location}</span>
                        <span>⛽ %{v.fuel}</span>
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/905344075585?text=Merhaba%20${encodeURIComponent(v.tech)},%20gorev%20talimati.`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition"
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

      {/* ═══════════ EMERGENCY FLEET MODAL ═══════════ */}
      {emergencyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border-2 border-red-500/60 rounded-3xl p-6 max-w-lg w-full shadow-2xl text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-red-400">
                <Radio className="w-5 h-5 animate-pulse" />
                <h3 className="font-black text-base">Tüm Filoya Acil Çağrı Alarmı</h3>
              </div>
              <button
                onClick={() => setEmergencyModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              Bu mesaj Çukurova havzasındaki 18 nöbetçi mobil servis aracının tabletlerine ve saha teknisyenlerine anında acil durum uyarısı olarak iletilecektir.
            </p>
            <textarea
              rows={3}
              value={emergencyAlertText}
              onChange={e => setEmergencyAlertText(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500 transition resize-none mb-4"
            />
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setEmergencyModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                İptal
              </button>
              <button
                onClick={handleBroadcastEmergency}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-red-600/30 transition"
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
