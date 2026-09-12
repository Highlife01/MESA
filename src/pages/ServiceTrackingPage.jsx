import React, { useState, useEffect } from 'react';
import { Link, useLocation } from '../router/Router';
import { SEO } from '../components/SEO';
import { useOperational } from '../context/OperationalContext';
import { 
  Search, Truck, CheckCircle2, Clock, MapPin, 
  Phone, User, Wrench, ShieldCheck, AlertCircle, FileCheck
} from 'lucide-react';

export function ServiceTrackingPage() {
  const { search } = useLocation();
  const { activeOrders, partsOrders } = useOperational();
  
  const [trackingInput, setTrackingInput] = useState('MS-2026-00128');
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    // Check URL parameters
    const params = new URLSearchParams(search);
    const queryCode = params.get('code');
    const targetCode = queryCode || trackingInput;
    setTrackingInput(targetCode);
    findRecord(targetCode);
  }, [search]);

  const findRecord = (code) => {
    const clean = code.trim().toUpperCase();
    
    // Check active emergency tickets
    const matchedEmergency = activeOrders.find(o => o.code.toUpperCase() === clean);
    if (matchedEmergency) {
      setCurrentRecord({
        type: 'servis',
        code: matchedEmergency.code,
        customer: matchedEmergency.customer,
        machine: matchedEmergency.machine,
        location: matchedEmergency.location,
        issue: matchedEmergency.issue,
        status: matchedEmergency.status,
        technician: 'Mehmet Usta (Baş Teknisyen)',
        vehicle: '01 MSA 01 (Ford Transit Mobil Atölye)',
        eta: matchedEmergency.status === 'Tamamlandı' ? 'Teslim Edildi' : '18 Dakika',
        stage: matchedEmergency.status === 'Tamamlandı' ? 4 : matchedEmergency.status === 'Şantiyede' ? 3 : 2,
        hasSignature: matchedEmergency.status === 'Tamamlandı'
      });
      return;
    }

    // Check parts orders
    const matchedParts = partsOrders.find(p => p.orderCode.toUpperCase() === clean);
    if (matchedParts) {
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
        eta: 'Aynı Gün Sevkiyat',
        stage: 2,
        hasSignature: false
      });
      return;
    }

    // Default fallback mock
    setCurrentRecord({
      type: 'servis',
      code: clean,
      customer: 'ABC İnşaat Ltd. Şti.',
      machine: 'JCB 3CX Kazıcı Yükleyici (2022)',
      location: 'Seyhan OSB Şantiyesi, Adana',
      issue: 'Hidrolik bom kaldırmıyor, kule kilitlenme',
      status: 'Mobil Ekip Yolda',
      technician: 'Mehmet Usta (Baş Teknisyen)',
      vehicle: '01 MSA 01 (Ford Transit Mobil Atölye)',
      eta: '18 Dakika',
      stage: 2,
      hasSignature: false
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;
    findRecord(trackingInput);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-12">
      <SEO 
        title="Canlı Servis & Mobil Araç Takip Ekranı | MESA"
        description="Mesa İş Makinaları takip kodunuz ile servis aracınızın şantiyenize gelişini ve arıza onarım aşamalarını canlı izleyin."
        canonical="/servis-takip"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-amber-400">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-amber-400 font-bold">Canlı Servis Takip</span>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-amber-400 tracking-wider uppercase block">CANLI SAHA TAKİP SİSTEMİ</span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            Servis & Parça Durumu Sorgulama
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Size SMS veya WhatsApp ile iletilen <strong>MS-2026-XXXXX</strong> veya <strong>PARCA-2026-XXXX</strong> kodunu giriniz.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-slate-900 p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-xl mb-8">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="Takip Kodu Girin (Örn: MS-2026-00128)"
                className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono font-bold"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-2xl transition-all shadow-lg shadow-amber-500/20 shrink-0"
            >
              Sorgula
            </button>
          </form>
        </div>

        {/* Tracking Details Card */}
        {currentRecord && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Top Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Takip Edilen Kayıt</span>
                <h3 className="text-2xl font-mono font-black text-amber-400 mt-0.5">{currentRecord.code}</h3>
                <span className="text-xs text-slate-300 font-semibold">{currentRecord.customer} • {currentRecord.machine}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Tahmini Varış / Durum</span>
                  <span className="text-base font-black text-emerald-400 font-mono">{currentRecord.eta}</span>
                </div>
                <span className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs">
                  {currentRecord.status}
                </span>
              </div>
            </div>

            {/* Stages Stepper */}
            <div className="py-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Süreç Aşamaları:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                {[
                  { title: 'Talep Alındı', desc: 'Merkez onayladı' },
                  { title: 'Ekip Yola Çıktı', desc: 'Seyir halinde' },
                  { title: 'Sahada Müdahale', desc: 'Dinamik basınç testi' },
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
                          ? 'bg-amber-500/10 border-amber-500 text-amber-400' 
                          : isDone 
                            ? 'bg-slate-950 border-emerald-500/40 text-emerald-400' 
                            : 'bg-slate-950/40 border-slate-800 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold">0{stepIndex}</span>
                        {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <span className="font-bold block text-white">{st.title}</span>
                      <span className="text-[11px] text-slate-400 mt-0.5 block">{st.desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Field Technician & Vehicle Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Atanan Baş Teknisyen</span>
                  <strong className="text-white font-bold">{currentRecord.technician}</strong>
                  <a href="tel:05335293674" className="text-amber-400 block hover:underline font-medium mt-0.5">0533 529 36 74</a>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Mobil Servis Aracı</span>
                  <strong className="text-white font-bold">{currentRecord.vehicle}</strong>
                  <span className="text-slate-400 block text-[11px]">500 Bar Hortum Presi & Jeneratör</span>
                </div>
              </div>
            </div>

            {/* Digital Protocol Delivery Notice */}
            {currentRecord.hasSignature && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs flex items-center gap-3">
                <FileCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <strong className="block text-white font-bold">Saha Teslim Tutanağı İmzalandı & Onaylandı</strong>
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
