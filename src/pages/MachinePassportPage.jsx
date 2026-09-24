import React from 'react';
import { Link, useParams } from '../router/Router';
import { SEO } from '../components/SEO';
import { useOperational } from '../context/OperationalContext';
import { 
  AlertTriangle, ArrowLeft, CalendarClock, CheckCircle2, Clock3, 
  LockKeyhole, MapPin, Phone, QrCode, ShieldCheck, Wrench, ShieldAlert,
  ChevronRight, RefreshCw, Activity, Cpu
} from 'lucide-react';

export function MachinePassportPage() {
  const { token } = useParams();
  const { getMachineByToken, liveJobs } = useOperational();

  const queryResult = getMachineByToken(token);

  // If token is revoked / expired
  if (!queryResult.valid && queryResult.reason === 'revoked') {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-8 flex items-center justify-center">
        <SEO 
          title="QR Token Geçersiz | MESA Güvenli Pasaport"
          description="Bu QR kodunun geçerlilik süresi dolmuş veya güvenlik nedeniyle yenilenmiştir."
        />
        <div className="max-w-md w-full bg-slate-950 border border-red-500/40 rounded-3xl p-8 text-center shadow-2xl space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <span className="px-3 py-1 rounded-full bg-red-950/80 text-red-400 border border-red-800 text-[10px] font-black uppercase tracking-wider">
            Token Geçersiz Kılındı
          </span>
          <h1 className="text-xl font-black text-white">QR Etiketi Yenilendi</h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Bu makineye ait QR erişim anahtarı şirket yöneticisi tarafından güvenlik nedeniyle yenilenmiştir.
            Lütfen makine kabinindeki en güncel QR etiketi okutunuz.
          </p>
          <div className="pt-4 border-t border-slate-800 space-y-2.5">
            <a
              href="tel:05344075585"
              className="w-full py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Phone className="w-4 h-4" />
              <span>7/24 Teknik Servis: 0534 407 55 85</span>
            </a>
            <Link
              to="/musteri-portali"
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition"
            >
              <LockKeyhole className="w-4 h-4" />
              <span>Yetkili Müşteri Portalı Girişi</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If token not found
  if (!queryResult.valid) {
    return (
      <div className="min-h-screen bg-slate-100 p-4 sm:p-8 flex items-center justify-center">
        <SEO title="Makine Pasaportu Bulunamadı | MESA" description="Kayıtlı makine pasaportu bulunamadı." />
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-xl space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-black text-slate-900">Kayıtlı Pasaport Bulunamadı</h1>
          <p className="text-xs text-slate-600">
            Taranan QR token sistemimizde kayıtlı bir iş makinesiyle eşleşmedi.
          </p>
          <Link
            to="/"
            className="inline-block py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const machine = queryResult.machine;

  // Mask sensitive chassis
  const maskedChassis = machine.chassis
    ? `${machine.chassis.slice(0, 4)}••••${machine.chassis.slice(-3)}`
    : '••••••';

  // Status Styling
  const statusStyles = {
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    red: 'bg-red-500/10 text-red-400 border-red-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  };

  const statusBadge = statusStyles[machine.statusTone] || statusStyles.amber;

  // Active Job for this machine
  const activeJob = liveJobs.find(j => j.machineId === machine.id || j.code === machine.activeWorkOrder);

  // Meter Progress Calculation
  const nextTarget = machine.nextHoursThreshold || (Math.ceil(machine.hours / 500) * 500);
  const remainingHours = Math.max(0, nextTarget - machine.hours);
  const progressPercent = Math.min(100, Math.max(0, ((500 - remainingHours) / 500) * 100));

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8">
      <SEO
        title={`${machine.name} Dijital Pasaportu | MESA 7/24`}
        description={`MESA Akıllı Makine Pasaportu: ${machine.name} bakım durumu, sayaç saati ve kamuya açık servis özeti.`}
        canonical={`/m/${machine.token}`}
      />

      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-white rounded-3xl border border-slate-200 shadow-sm px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white flex items-center justify-center shadow-lg shadow-red-600/30 border border-red-500/30">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-black text-red-600">
                MESA SMART MACHINE PASSPORT
              </div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                Doğrulanmış Dijital Makine Kimliği
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/musteri-portali"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition border border-slate-200"
            >
              <LockKeyhole className="w-3.5 h-3.5" />
              <span>Yetkili Girişi</span>
            </Link>
            <Link
              to="/"
              className="text-xs font-bold text-slate-500 hover:text-red-600 flex items-center gap-1 p-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Çıkış</span>
            </Link>
          </div>
        </header>

        {/* Hero Card with Dark Telematics Theme */}
        <div className="bg-slate-950 rounded-[2rem] p-6 sm:p-9 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Machine Info */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`px-3 py-1 rounded-full border text-xs font-bold ${statusBadge}`}>
                  {machine.status}
                </span>
                <span className="text-xs text-slate-400 font-mono bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                  {machine.id}
                </span>
                <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <Activity className="w-3 h-3 animate-pulse" />
                  Telematik Aktif
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black mt-4 tracking-tight">
                {machine.name}
              </h2>
              <p className="text-slate-300 text-xs mt-1.5 flex items-center gap-2">
                <span>{machine.brand}</span>
                <span>•</span>
                <span>Model Yılı: {machine.year}</span>
                <span>•</span>
                <span className="font-mono text-slate-400">Şasi: {maskedChassis}</span>
              </p>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Sayaç Saati</span>
                  <span className="text-sm font-black text-white mt-1 block font-mono">
                    {machine.hours.toLocaleString('tr-TR')} Saat
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Son Bakım</span>
                  <span className="text-sm font-bold text-white mt-1 block">
                    {machine.lastService}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Şantiye Sahası</span>
                  <span className="text-sm font-bold text-white mt-1 block truncate" title={machine.site}>
                    {machine.site.split(',')[0]}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Periyot</span>
                  <span className="text-sm font-bold text-amber-400 mt-1 block truncate">
                    {remainingHours} Saat Kaldı
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Security Badge */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-black">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>MESA QR Güvenlik Koruması</span>
              </div>
              <p className="text-xs font-bold text-slate-200 mt-3">
                Bu sayfa sahada makineyi kullanan operatör ve yetkililer için kamuya açık güvenlik özetidir.
              </p>
              <ul className="text-[11px] text-slate-300 mt-3 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Şasi numarası, müşteri telefonu ve finansal tutarlar gizlidir.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Kriptografik token rotasyonu desteklenir; kopyalanamaz.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Geçmiş servis raporları ve teklifler için yetkili müşteri girişi zorunludur.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Timeline & Service Events (8 cols) */}
          <section className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase tracking-[0.18em] font-black text-red-600">
                  SERVİS VE BAKIM GÜNLÜĞÜ
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  Doğrulanmış Müdahale Zaman Çizelgesi
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <Clock3 className="w-3.5 h-3.5" />
                {machine.timeline?.length || 0} Olay
              </span>
            </div>

            {/* Active Service Notification (if in service) */}
            {activeJob && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
                <Wrench className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold mb-0.5">
                    Aktif Servis Müdahalesi: {activeJob.code} ({activeJob.status})
                  </strong>
                  <span>Sorumlu Teknisyen: {activeJob.assignedTechnician} • Bildirilen: {activeJob.issue}</span>
                </div>
              </div>
            )}

            {/* Timeline entries */}
            <div className="relative space-y-6 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
              {machine.timeline && machine.timeline.map((entry, index) => (
                <div key={index} className="relative pl-10">
                  <div className={`absolute left-0 top-0 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center ${
                    index === 0 && machine.statusTone === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}>
                    {index === 0 && machine.statusTone === 'amber' ? (
                      <Clock3 className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                    <div>
                      <p className="text-sm font-black text-slate-900">{entry.title}</p>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{entry.text}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                      {entry.date} {entry.time ? `• ${entry.time}` : ''}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-700">
                      {entry.state}
                    </span>
                    {entry.actor && (
                      <span className="text-[10px] text-slate-400">
                        Yetkili: {entry.actor}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right Column: Maintenance Countdown & Actions (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Maintenance Countdown Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                <CalendarClock className="w-5 h-5 text-red-600" />
                <span>Periyodik Bakım Eşiği</span>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                  <span className="text-slate-600">Bakım Hedefi: {nextTarget} Saat</span>
                  <span className="text-red-600 font-mono font-black">{remainingHours} Saat Kaldı</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                Hidrolik filtreler ve motor yağ değişim eşiği yaklaştığında MESA telematik sistemi filo yöneticisine otomatik bakım randevusu önerir.
              </p>
            </div>

            {/* Quick Emergency Request CTA */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-950 font-black text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Makinada Arıza mı Var?</span>
              </div>
              <p className="text-xs text-amber-900/80 leading-relaxed">
                Bu makine için anında mobil servis kaydı açabilirsiniz. Makine kodu ve konumu forma otomatik aktarılır.
              </p>
              <Link
                to={`/ariza-bildir?machine=${encodeURIComponent(machine.name)}&machineId=${machine.id}`}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition shadow-md shadow-amber-500/20"
              >
                <Wrench className="w-4 h-4" />
                <span>7/24 Servis Çağrısı Başlat</span>
              </Link>
            </div>

            {/* Emergency Hotline */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-3 border border-slate-800">
              <div className="flex items-center gap-2 font-black text-sm text-red-400">
                <Phone className="w-4 h-4" />
                <span>7/24 Acil Çağrı & Usta Hattı</span>
              </div>
              <p className="text-xs text-slate-300">
                Şantiye acil duruşlarında doğrudan seyyar servis koordinasyon merkezimizi arayabilirsiniz.
              </p>
              <a
                href="tel:05344075585"
                className="block text-base font-black text-amber-400 hover:text-amber-300 font-mono tracking-wider pt-1"
              >
                0534 407 55 85
              </a>
            </div>

          </aside>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 px-2">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-red-600" />
            <span>Kayıtlı Konum: {machine.site}</span>
          </span>
          <Link
            to="/musteri-portali"
            className="flex items-center gap-1.5 font-bold text-slate-700 hover:text-red-600 transition"
          >
            <LockKeyhole className="w-3.5 h-3.5 text-amber-600" />
            <span>Tüm Servis Fişleri ve Raporlar İçin Yetkili Girişi Yap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
