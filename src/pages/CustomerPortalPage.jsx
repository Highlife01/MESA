import React, { useMemo, useState } from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { useOperational } from '../context/OperationalContext';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft, ArrowUpRight, Bell, CalendarClock, CheckCircle2, ChevronRight,
  Clock3, Download, FileText, Filter, LockKeyhole, LogOut, Mail, MapPin,
  MessageSquare, PackageCheck, Phone, QrCode, Search, ShieldCheck, Truck,
  UserRound, Wrench, X, Sparkles, Check
} from 'lucide-react';

const PORTAL_SESSION_KEY = 'mesa_customer_portal_session';

const statusStyles = {
  amber: 'bg-amber-50 text-amber-800 border-amber-200',
  red: 'bg-red-50 text-red-700 border-red-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200'
};

function CustomerLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim() || code.trim().length < 4) {
      setError('Kurumsal e-posta ve en az 4 haneli doğrulama kodu gereklidir.');
      return;
    }
    const sessionData = {
      company: 'ABC İnşaat Ltd. Şti.',
      email: email.trim(),
      customerId: 'cust_abc_insaat',
      loginAt: new Date().toISOString()
    };
    sessionStorage.setItem(PORTAL_SESSION_KEY, JSON.stringify(sessionData));
    onLogin(true);
  };

  const handleQuickDemo = () => {
    setEmail('abcoinsaat@gmail.com');
    setCode('2026');
    const sessionData = {
      company: 'ABC İnşaat Ltd. Şti.',
      email: 'abcoinsaat@gmail.com',
      customerId: 'cust_abc_insaat',
      loginAt: new Date().toISOString()
    };
    sessionStorage.setItem(PORTAL_SESSION_KEY, JSON.stringify(sessionData));
    onLogin(true);
  };

  return (
    <div className="min-h-[85vh] bg-slate-100 flex items-center justify-center px-4 py-12">
      <SEO title="Güvenli Müşteri Portalı | MESA" description="MESA kurumsal müşteri servis ve filo portalı." canonical="/musteri-portali" />
      <div className="w-full max-w-md bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-slate-950 p-8 text-white relative overflow-hidden">
          <div className="absolute -right-12 -top-16 w-44 h-44 rounded-full bg-red-600/20 blur-3xl" />
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center mb-5 shadow-lg shadow-red-600/30">
              <LockKeyhole className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-red-300">MESA SECURE ACCESS</span>
            <h1 className="text-2xl font-black mt-2">Kurumsal Servis Portalı</h1>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Filo, telematik sayaçları ve doğrulanmış iş emirlerini yalnızca yetkili kurumsal hesabınızla görüntüleyin.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div className="flex gap-2.5 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs leading-relaxed">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Finans, telefon ve tam şasi bilgileri yetkisiz veya QR erişiminde gösterilmez.</span>
          </div>

          <label className="block">
            <span className="text-xs font-bold text-slate-700">Kurumsal E-Posta</span>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                placeholder="filo@abcoinsaat.com"
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-red-500 text-sm"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-xs font-bold text-slate-700">Tek Kullanımlık Doğrulama Kodu / Şifre</span>
            <input
              value={code}
              onChange={e => setCode(e.target.value)}
              type="password"
              placeholder="••••••"
              className="w-full mt-1.5 px-3 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-red-500 text-sm tracking-[0.2em]"
            />
          </label>

          {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

          <button className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm shadow-lg shadow-red-600/20 transition active:scale-[.98]">
            Güvenli Giriş Yap
          </button>

          {/* Quick Demo Access Button */}
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>ABC İnşaat Olarak Hızlı Giriş (Demo)</span>
          </button>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2">
            <span>SSO / 2FA Hazır</span>
            <a href="mailto:servis@mesaismakineleri.com.tr" className="font-bold hover:text-red-600">
              Yeni Erişim Talep Et
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CustomerPortalPage() {
  const { machines, liveJobs, transitionWorkOrderStatus, showToast, addAuditLog } = useOperational();
  const { user, isCustomer, isSuperAdmin } = useAuth();

  // ── TENANT KİMLİĞİ: oturum sahibinin gerçek tenant'ı (kabul testi: müşteri A ↔ müşteri B izolasyonu) ──
  const sessionTenantId = useMemo(() => {
    if (user?.tenantId) return user.tenantId;
    if (isSuperAdmin) return null; // Süper admin tüm tenant'ları görebilir
    try {
      const raw = sessionStorage.getItem(PORTAL_SESSION_KEY);
      return raw ? (JSON.parse(raw).customerId || 'cust_abc_insaat') : null;
    } catch {
      return null;
    }
  }, [user, isSuperAdmin]);

  const [authenticated, setAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false;
    return Boolean(window.sessionStorage.getItem(PORTAL_SESSION_KEY)) || isCustomer || isSuperAdmin;
  });

  // Filter machines by tenant (Tenant Isolation — IDOR koruması frontend katmanı)
  const customerMachines = useMemo(() => {
    if (isSuperAdmin) return machines;
    if (!sessionTenantId) return [];
    return machines.filter(m => m.customerId === sessionTenantId);
  }, [machines, sessionTenantId, isSuperAdmin]);

  const [activeMachine, setActiveMachine] = useState(customerMachines[0] || machines[0]);
  const [query, setQuery] = useState('');
  const [historyFilter, setHistoryFilter] = useState('Tümü');
  const [showNotifications, setShowNotifications] = useState(true);

  // Sync active machine if list changes
  React.useEffect(() => {
    if (customerMachines.length > 0 && !customerMachines.some(m => m.id === activeMachine?.id)) {
      setActiveMachine(customerMachines[0]);
    }
  }, [customerMachines]);

  // Customer work orders from liveJobs (tenant kapsamlı)
  const customerJobs = useMemo(() => {
    if (isSuperAdmin) return liveJobs;
    if (!sessionTenantId) return [];
    return liveJobs.filter(j => j.customerId === sessionTenantId);
  }, [liveJobs, sessionTenantId, isSuperAdmin]);

  const visibleHistory = useMemo(() => {
    return customerJobs.filter(item => {
      const matchesFilter = historyFilter === 'Tümü' || item.status === historyFilter;
      const haystack = `${item.machine} ${item.issue || ''} ${item.code || item.id}`.toLowerCase();
      return matchesFilter && haystack.includes(query.toLowerCase());
    });
  }, [customerJobs, historyFilter, query]);

  if (!authenticated) {
    return <CustomerLogin onLogin={setAuthenticated} />;
  }

  const logout = () => {
    sessionStorage.removeItem(PORTAL_SESSION_KEY);
    setAuthenticated(false);
  };

  // One-click approve pending service quotation
  const handleApproveQuote = (jobCode) => {
    transitionWorkOrderStatus(jobCode, 'Müşteri Onayladı - Parça Montajı', {
      note: 'Müşteri kurumsal portal üzerinden teklif ve parça montajını onayladı.',
      actor: user?.name || 'Müşteri Yetkilisi',
      actorRole: 'customer_admin'
    });
    showToast(`${jobCode} nolu servis teklifi başarıyla onaylandı.`);
  };

  // Download Fleet Report
  const handleDownloadReport = () => {
    const report = {
      company: 'ABC İnşaat Ltd. Şti.',
      generatedAt: new Date().toISOString(),
      fleetSize: customerMachines.length,
      machines: customerMachines.map(m => ({
        code: m.id,
        name: m.name,
        hours: m.hours,
        site: m.site,
        status: m.status,
        lastService: m.lastService,
        nextMaintenance: m.nextMaintenance
      })),
      serviceHistory: customerJobs
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ABC_Insaat_Filo_Raporu_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('ABC İnşaat filo ve bakım raporu indirildi.');
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8">
      <SEO
        title="Kurumsal Müşteri Portalı | MESA Filo Servis"
        description="Yetkili müşteri makine, sayaç, servis geçmişi ve teklif onay portalı."
        canonical="/musteri-portali"
      />

      <div className="max-w-[1440px] mx-auto space-y-6">

        {/* Header */}
        <header className="bg-slate-950 rounded-[2rem] px-5 sm:px-8 py-5 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-xl border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center font-black text-xl shadow-lg shadow-red-600/30">
              M
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-red-300">
                  Yetkili B2B Müşteri
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  MFA Oturumu Aktif
                </span>
              </div>
              <h1 className="text-xl font-black mt-1">ABC İnşaat Ltd. Şti.</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Filo Yöneticisi: Ahmet Kaya • Kayıtlı Şantiye Sayısı: 3 Bölge
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadReport}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold transition flex items-center gap-2"
              title="Filo raporunu JSON olarak indir"
            >
              <Download className="w-4 h-4 text-slate-300" />
              <span>Filo Raporu İndir</span>
            </button>

            <Link
              to="/ariza-bildir"
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition flex items-center gap-2 shadow-md shadow-amber-400/20"
            >
              <Wrench className="w-4 h-4" />
              <span>Yeni Servis Talebi</span>
            </Link>

            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-red-600 text-xs font-bold transition flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Çıkış</span>
            </button>
          </div>
        </header>

        {/* Action Required Banner */}
        {showNotifications && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-200/60 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-amber-800" />
              </div>
              <div>
                <strong>1 Servis Talebi İçin Onay Bekleniyor:</strong> MS-5102 (JCB 3CX Eco) Powershift selenoid değişimi için teknisyen onayınızı bekliyor.
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => handleApproveQuote('MS-5102')}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs flex items-center gap-1 transition shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Teklifi Onayla</span>
              </button>
              <button onClick={() => setShowNotifications(false)} className="p-1 hover:text-amber-950">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Metric label="Kayıtlı Makine" value={customerMachines.length} detail="3 Marka · 3 Şantiye" icon={Truck} tone="red" />
          <Metric label="Aktif Serviste" value={customerMachines.filter(m => m.status === 'Serviste').length} detail="1 İş Emri Devam Ediyor" icon={Wrench} tone="amber" />
          <Metric label="Bakım Uyumu" value="96%" detail="Filonuz hedef üzerinde" icon={CalendarClock} tone="emerald" />
          <Metric label="Servis SLA" value="100%" detail="Ortalama müdahale 28 dk" icon={ShieldCheck} tone="blue" />
        </div>

        {/* Machine Fleet & Selected Passport Card */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          {/* Machines List (7 cols) */}
          <section className="xl:col-span-7 bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase tracking-[0.18em] font-black text-red-600">
                  FİLO YÖNETİMİ
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-0.5">Kayıtlı İş Makineleriniz</h2>
              </div>
              <span className="text-xs text-slate-500 font-medium">ABC İnşaat Filosu</span>
            </div>

            <div className="space-y-3">
              {customerMachines.map(machine => (
                <button
                  key={machine.id}
                  onClick={() => setActiveMachine(machine)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${activeMachine?.id === machine.id
                      ? 'border-red-500 bg-red-50/40 shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm text-slate-900">{machine.name}</strong>
                          <span className="text-[10px] font-mono text-slate-400">{machine.id}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {machine.brand} • {machine.year} • {machine.hours?.toLocaleString('tr-TR')} Saat
                        </p>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-red-600" />
                          <span>{machine.site}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                      <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${statusStyles[machine.statusTone] || statusStyles.amber}`}>
                        {machine.status}
                      </span>
                      {machine.activeWorkOrder ? (
                        <span className="text-[10px] text-amber-700 font-bold font-mono">
                          {machine.activeWorkOrder}
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">
                          Son Bakım: {machine.lastService}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Selected Machine Detail Card (5 cols) */}
          {activeMachine && (
            <aside className="xl:col-span-5 bg-slate-950 rounded-3xl p-6 sm:p-7 text-white relative overflow-hidden shadow-xl border border-slate-800">
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-red-600/20 blur-3xl rounded-full pointer-events-none" />

              <div className="relative space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.18em] font-black text-red-300">
                      SEÇİLİ MAKİNE KÜNYESİ
                    </span>
                    <h3 className="text-2xl font-black mt-1 text-white">{activeMachine.name}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {activeMachine.id} • Şasi: {activeMachine.serial}
                    </p>
                  </div>
                  <Link
                    to={`/m/${activeMachine.token}`}
                    target="_blank"
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
                    title="Bu makinenin güvenli kamu QR görünümünü aç"
                  >
                    <QrCode className="w-5 h-5 text-amber-400" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <DarkStat label="Çalışma Saati" value={`${activeMachine.hours?.toLocaleString('tr-TR')} Saat`} />
                  <DarkStat label="Son Servis" value={activeMachine.lastService} />
                  <DarkStat label="Periyot Eşiği" value={activeMachine.nextMaintenance} />
                  <DarkStat label="Şantiye" value={activeMachine.site?.split(',')[0]} />
                </div>

                {/* Maintenance Progress */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                    <CalendarClock className="w-4 h-4" />
                    <span>Periyodik Bakım Sayacı</span>
                  </div>
                  <p className="text-xs font-bold text-white">{activeMachine.nextMaintenance}</p>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[82%] bg-gradient-to-r from-amber-400 to-red-500 rounded-full" />
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Telematik sayaç verisi 15 dk önce güncellendi.
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link
                    to={`/m/${activeMachine.token}`}
                    target="_blank"
                    className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-center text-xs font-black text-white transition flex items-center justify-center gap-1.5"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Makine Pasaportunu Aç</span>
                  </Link>
                  <a
                    href="tel:05344075585"
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
                    title="Usta hattını ara"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                  </a>
                </div>
              </div>
            </aside>
          )}

        </div>

        {/* Work Orders and Historical Records */}
        <section className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] font-black text-red-600">
                DENETLENEBİLİR SERVİS KAYITLARI
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-0.5">
                İş Emirleri & Yapılan İşlemler
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="İş emri, makine veya usta ara..."
                  className="pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-red-500"
                />
              </div>

              {['Tümü', 'Şantiyede', 'Tamamlandı'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setHistoryFilter(filter)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${historyFilter === filter
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                    }`}
                >
                  <Filter className="w-3 h-3 inline mr-1" />
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {visibleHistory.map(item => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="w-24 shrink-0">
                  <span className="text-xs font-black text-slate-900 block font-mono">{item.code || item.id}</span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{item.createdAt || 'Bugün'}</span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <strong className="text-sm text-slate-900 block truncate">{item.machine}</strong>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Sorumlu: {item.assignedTechnician} • Şantiye: {item.location}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Arıza / İşlem: {item.issue}
                  </p>
                </div>

                <span className="px-2.5 py-1 rounded-full border text-[10px] font-bold self-start lg:self-auto bg-amber-50 text-amber-800 border-amber-200">
                  {item.status}
                </span>

                {item.supervisorSignature ? (
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>İmzalandı & Teslim</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleApproveQuote(item.code || item.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1"
                  >
                    <span>Onayla</span>
                  </button>
                )}
              </div>
            ))}

            {visibleHistory.length === 0 && (
              <div className="py-8 text-center text-xs text-slate-500">
                Filtreye uyan servis kaydı bulunamadı.
              </div>
            )}
          </div>
        </section>

        {/* Quick Help Bottom CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickAction
            icon={MessageSquare}
            title="Saha Koordinasyon Hattı"
            detail="Nöbetçi usta ile doğrudan görüşün"
            href="tel:05344075585"
          />
          <QuickAction
            icon={PackageCheck}
            title="Orijinal Parça Tedariği"
            detail="Filtre, hortum ve keçe grupları"
            href="/yedek-parca"
          />
          <QuickAction
            icon={UserRound}
            title="Kullanıcı & Şantiye Yetkileri"
            detail="Yeni şantiye şefi tanımlayın"
            href="mailto:servis@mesaismakineleri.com.tr"
          />
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <Link to="/" className="flex items-center gap-1 hover:text-slate-900 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Ana Sayfaya Dön</span>
          </Link>
          <span className="flex items-center gap-1 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>MESA 256-Bit SSL Tenant Korumalı Müşteri Portalı</span>
          </span>
        </div>

      </div>
    </div>
  );
}

function Metric({ label, value, detail, icon: Icon, tone }) {
  const tones = {
    red: 'bg-red-50 text-red-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600'
  };
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500">{label}</span>
        <span className={`w-8 h-8 rounded-xl flex items-center justify-center ${tones[tone]}`}>
          <Icon className="w-4 h-4" />
        </span>
      </div>
      <div className="text-2xl font-black text-slate-900 mt-2">{value}</div>
      <p className="text-[11px] text-slate-500 mt-1">{detail}</p>
    </div>
  );
}

function DarkStat({ label, value }) {
  return (
    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{label}</p>
      <p className="text-xs font-bold text-white mt-1 truncate">{value}</p>
    </div>
  );
}

function QuickAction({ icon: Icon, title, detail, href }) {
  return (
    <a
      href={href}
      className="bg-white border border-slate-200 rounded-3xl p-5 hover:border-red-300 hover:shadow-md transition flex items-center gap-4 shadow-xs"
    >
      <span className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5" />
      </span>
      <span className="min-w-0 flex-1">
        <strong className="text-xs text-slate-900 block font-bold truncate">{title}</strong>
        <span className="text-[11px] text-slate-500 mt-0.5 block truncate">{detail}</span>
      </span>
      <ArrowUpRight className="w-4 h-4 text-slate-400 shrink-0" />
    </a>
  );
}
