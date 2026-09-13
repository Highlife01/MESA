import React, { useState, useEffect } from 'react';
import { Link, useLocation } from '../router/Router';
import { SEO } from '../components/SEO';
import { useOperational } from '../context/OperationalContext';
import { 
  Search, Truck, CheckCircle2, Clock, MapPin, 
  Phone, User, Wrench, ShieldCheck, AlertCircle, FileCheck, AlertTriangle, MessageSquare, ArrowLeft
} from 'lucide-react';

export function ServiceTrackingPage() {
  const { search } = useLocation();
  const { activeOrders, partsOrders } = useOperational();
  
  const [trackingInput, setTrackingInput] = useState('');
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [searchedCode, setSearchedCode] = useState('');

  useEffect(() => {
    // Check URL parameters
    const params = new URLSearchParams(search);
    const queryCode = params.get('code');
    if (queryCode) {
      setTrackingInput(queryCode);
      findRecord(queryCode);
    }
  }, [search, activeOrders, partsOrders]);

  const findRecord = (code) => {
    const clean = (code || '').trim().toUpperCase();
    if (!clean) return;

    setSearchedCode(clean);
    
    // Check active emergency tickets by code or id
    const matchedEmergency = activeOrders.find(o => 
      (o.code && o.code.toUpperCase() === clean) || 
      (o.id && o.id.toUpperCase() === clean)
    );

    if (matchedEmergency) {
      setIsNotFound(false);
      setCurrentRecord({
        type: 'servis',
        code: matchedEmergency.code || matchedEmergency.id,
        customer: matchedEmergency.customer,
        machine: matchedEmergency.machine,
        location: matchedEmergency.location,
        issue: matchedEmergency.issue,
        status: matchedEmergency.status,
        technician: matchedEmergency.assignedTechnician || 'Mehmet Usta (Baş Teknisyen)',
        vehicle: matchedEmergency.vehicle || '01 MSA 01 (Ford Transit Mobil Atölye)',
        eta: matchedEmergency.status === 'Tamamlandı' ? 'Teslim Edildi' : `${matchedEmergency.etaMinutes || 20} Dakika`,
        stage: matchedEmergency.status === 'Tamamlandı' ? 4 : 
               matchedEmergency.status === 'Onarımda' || matchedEmergency.status === 'Teşhiste' || matchedEmergency.status === 'Şantiyede' ? 3 : 2,
        hasSignature: matchedEmergency.status === 'Tamamlandı' || !!matchedEmergency.supervisorSignature
      });
      return;
    }

    // Check parts orders
    const matchedParts = partsOrders.find(p => p.orderCode && p.orderCode.toUpperCase() === clean);
    if (matchedParts) {
      setIsNotFound(false);
      setCurrentRecord({
        type: 'parca',
        code: matchedParts.orderCode,
        customer: matchedParts.companyName || matchedParts.customerName,
        machine: 'B2B Orijinal Parça Sevkiyatı',
        location: matchedParts.address,
        issue: matchedParts.items.map(i => `${i.name} (x${i.quantity})`).join(', '),
        status: matchedParts.status,
        technician: 'Lojistik & Depo Sorumlusu',
        vehicle: 'Adana Merkez Depo Sevkiyat Aracı',
        eta: matchedParts.status === 'Teslim Edildi' ? 'Teslim Edildi' : 'Aynı Gün Sevkiyat',
        stage: matchedParts.status === 'Teslim Edildi' ? 4 : matchedParts.status === 'Kargoya Verildi' ? 3 : 2,
        hasSignature: false
      });
      return;
    }

    // Security Fix (P0): Never return mock data on invalid code!
    setCurrentRecord(null);
    setIsNotFound(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;
    findRecord(trackingInput);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12">
      <SEO 
        title="Canlı Servis & Mobil Araç Takip Ekranı | MESA"
        description="Mesa İş Makinaları takip kodunuz ile servis aracınızın şantiyenize varışını ve arıza onarım aşamalarını canlı izleyin."
        canonical="/servis-takip"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-red-600">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-red-600 font-bold">Canlı Servis Takip</span>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-red-600 tracking-wider uppercase block">CANLI SAHA TAKİP SİSTEMİ</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Servis & Parça Durumu Sorgulama
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto">
            Size SMS veya WhatsApp ile iletilen <strong>MS-XXXX</strong> servis kodunuzu veya <strong>SP-XXXX</strong> yedek parça sipariş kodunuzu giriniz.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm mb-8">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="Takip Kodu Girin (Örn: MS-8294 veya SP-4201)"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 font-mono font-bold uppercase tracking-wider"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs rounded-2xl transition-all shadow-md shadow-red-600/25 shrink-0"
            >
              Sorgula
            </button>
          </form>

          {/* Quick Code suggestions for demo */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs text-slate-500">
            <span className="text-[11px]">Kayıtlı Örnek Kodlar:</span>
            {activeOrders.slice(0, 3).map(o => (
              <button
                key={o.id || o.code}
                type="button"
                onClick={() => {
                  const c = o.code || o.id;
                  setTrackingInput(c);
                  findRecord(c);
                }}
                className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 transition font-semibold"
              >
                {o.code || o.id}
              </button>
            ))}
          </div>
        </div>

        {/* ── NOT FOUND STATE (P0 SECURITY RESOLUTION) ── */}
        {isNotFound && (
          <div className="bg-white border-2 border-red-200 rounded-3xl p-8 text-center space-y-4 shadow-md animate-fadeIn mb-8">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-200">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-red-600 block mb-1">
                KAYIT BULUNAMADI
              </span>
              <h3 className="text-xl font-black text-slate-900">
                "{searchedCode}" Koduna Ait Kayıt Bulunamadı
              </h3>
              <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                Girdiğiniz kod sistemimizde eşleşmedi. Lütfen servis talebiniz sonrası tarafınıza iletilen takip numarasını kontrol ediniz.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="tel:05344075585"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-black flex items-center justify-center gap-2 shadow-md shadow-red-600/25 transition"
              >
                <Phone className="w-4 h-4" />
                <span>7/24 Acil Çağrı: 0534 407 55 85</span>
              </a>
              <a
                href={`https://wa.me/905344075585?text=${encodeURIComponent(`Merhaba, ${searchedCode} nolu servis takibim hakkında bilgi almak istiyorum.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Destek</span>
              </a>
            </div>
          </div>
        )}

        {/* ── TRACKING DETAILS CARD (AUTHENTIC MATCH) ── */}
        {currentRecord && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm animate-fadeIn">
            
            {/* Top Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-500 block font-medium">Takip Edilen Kayıt</span>
                <h3 className="text-2xl font-mono font-black text-red-600 mt-0.5">{currentRecord.code}</h3>
                <span className="text-xs text-slate-700 font-semibold">{currentRecord.customer} • {currentRecord.machine}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block">Tahmini Varış / Durum</span>
                  <span className="text-base font-black text-emerald-700 font-mono">{currentRecord.eta}</span>
                </div>
                <span className="px-3.5 py-1.5 rounded-xl bg-red-600 text-white font-black text-xs shadow-md shadow-red-600/25">
                  {currentRecord.status}
                </span>
              </div>
            </div>

            {/* Stages Stepper */}
            <div className="py-2">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4">Süreç Aşamaları:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                {[
                  { title: 'Talep Alındı', desc: 'Merkez onayladı' },
                  { title: 'Ekip Yola Çıktı', desc: 'Seyir halinde' },
                  { title: 'Sahada Müdahale', desc: 'Dinamik arıza testi' },
                  { title: 'İş Emri Teslimi', desc: 'Dijital tutanak & imza' }
                ].map((st, i) => {
                  const stepIndex = i + 1;
                  const isDone = currentRecord.stage >= stepIndex;
                  const isCurrent = currentRecord.stage === stepIndex;

                  return (
                    <div 
                      key={i} 
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isCurrent 
                          ? 'bg-red-50 border-red-500 text-red-700 shadow-sm' 
                          : isDone 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold">0{stepIndex}</span>
                        {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      </div>
                      <span className="font-bold block text-slate-900">{st.title}</span>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">{st.desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Field Technician & Vehicle Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Atanan Baş Teknisyen</span>
                  <strong className="text-slate-900 font-bold">{currentRecord.technician}</strong>
                  <a href="tel:05344075585" className="text-red-600 block hover:underline font-mono font-medium mt-0.5">0534 407 55 85</a>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Mobil Servis Aracı</span>
                  <strong className="text-slate-900 font-bold">{currentRecord.vehicle}</strong>
                  <span className="text-slate-500 block text-[11px]">500 Bar Hortum Presi & Jeneratör</span>
                </div>
              </div>
            </div>

            {/* Digital Protocol Delivery Notice */}
            {currentRecord.hasSignature && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-3">
                <FileCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <strong className="block text-emerald-950 font-bold">Saha Teslim Tutanağı İmzalandı & Onaylandı</strong>
                  <span>Servis işlemi başarıyla tamamlanmış olup 12 ay veya 2.000 saat resmi Mesa garantisi kapsamındadır.</span>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
