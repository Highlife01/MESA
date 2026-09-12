import React, { useState } from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { 
  Search, Truck, CheckCircle2, Clock, MapPin, 
  Phone, User, Wrench, ShieldCheck, AlertCircle
} from 'lucide-react';

export function ServiceTrackingPage() {
  const [trackingCode, setTrackingCode] = useState('MS-2026-00128');
  const [searchedData, setSearchedData] = useState({
    code: 'MS-2026-00128',
    customer: 'ABC İnşaat Ltd. Şti.',
    machine: 'JCB 3CX Kazıcı Yükleyici (2022)',
    location: 'Seyhan Barajı Şantiyesi, Adana',
    issue: 'Hidrolik bom kaldırmıyor, kule dönüşte kilitlenme',
    status: 'Yolda', // 'Alındı', 'Yolda', 'Şantiyede', 'Tamamlandı'
    assignedTechnician: 'Mehmet Usta (Baş Teknisyen)',
    technicianPhone: '0505 123 45 67',
    vehiclePlate: '01 MSA 01 (Ford Transit Mobil Atölye)',
    estimatedArrival: '18 Dakika',
    currentStage: 2,
    stages: [
      { id: 1, title: 'Arıza Talebi Alındı', time: '14:15', done: true, desc: 'Merkez sevk sorumlusu tarafından incelendi ve onaylandı.' },
      { id: 2, title: 'Mobil Ekip Yola Çıktı', time: '14:28', done: true, current: true, desc: '01 MSA 01 plakalı donanımlı araç şantiyenize doğru seyir halinde.' },
      { id: 3, title: 'Şantiyede Teşhis & Müdahale', time: '--:--', done: false, desc: 'Dinamik basınç testi ve yerinde hidrolik revizyon yapılacak.' },
      { id: 4, title: 'Test Edildi & Rapor Teslimi', time: '--:--', done: false, desc: 'Çalışır halde şantiye şefine teslim ve dijital imza onayı.' }
    ]
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;
    // Keep or generate mock based on search
    setSearchedData(prev => ({
      ...prev,
      code: trackingCode.toUpperCase(),
      status: 'Yolda'
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <SEO 
        title="Canlı Servis & Mobil Araç Takip Ekranı"
        description="Mesa İş Makinaları takip kodunuz ile servis aracınızın şantiyenize gelişini ve arıza onarım aşamalarını canlı izleyin."
        canonical="/servis-takip"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-amber-600">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">Servis Takip</span>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-amber-600 tracking-wider uppercase block">CANLI SAHA TAKİP</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Canlı Servis Durumu Sorgulama
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Size SMS veya WhatsApp ile iletilen <strong>MS-2026-XXXXX</strong> kodunu girerek mobil ekibin durumunu takip edebilirsiniz.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-lg mb-10">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input 
                type="text" 
                value={trackingCode}
                onChange={e => setTrackingCode(e.target.value)}
                placeholder="Örn: MS-2026-00128"
                className="w-full p-3.5 pl-10 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 uppercase focus:outline-hidden focus:border-amber-500 font-mono tracking-wider"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
            </div>

            <button 
              type="submit"
              className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md transition"
            >
              Durumu Sorgula
            </button>
          </form>

          <div className="mt-3 flex items-center space-x-2 text-[11px] text-slate-500">
            <span>Hızlı Örnek Kodlar:</span>
            <button onClick={() => setTrackingCode('MS-2026-00128')} className="text-amber-600 font-mono font-bold hover:underline">MS-2026-00128</button>
            <span>•</span>
            <button onClick={() => setTrackingCode('MS-2026-00129')} className="text-amber-600 font-mono font-bold hover:underline">MS-2026-00129</button>
          </div>
        </div>

        {/* Result Tracking Display */}
        {searchedData && (
          <div className="space-y-6">
            {/* Top Status Card */}
            <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-amber-400">{searchedData.code}</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      Canlı Takip Aktif
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-white mt-1">{searchedData.machine}</h2>
                  <div className="text-xs text-slate-400 flex items-center mt-1">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    <span>{searchedData.location}</span>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-right sm:min-w-[180px]">
                  <span className="text-[11px] text-slate-400 block font-medium">Tahmini Varış Süresi</span>
                  <span className="text-2xl font-black text-amber-400 font-mono">{searchedData.estimatedArrival}</span>
                </div>
              </div>

              {/* Technician & Vehicle Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 text-xs">
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Atanmış Usta</div>
                    <div className="font-bold text-white">{searchedData.assignedTechnician}</div>
                    <a href={`tel:${searchedData.technicianPhone}`} className="text-amber-400 text-[11px] hover:underline font-bold">
                      {searchedData.technicianPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Mobil Servis Aracı</div>
                    <div className="font-bold text-white">{searchedData.vehiclePlate}</div>
                    <span className="text-emerald-400 text-[11px] font-bold">GPS Canlı Seyir Halinde</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stages Timeline */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">
                Saha Operasyon Aşamaları
              </h3>

              <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {searchedData.stages.map((st) => (
                  <div key={st.id} className="relative">
                    {/* Bullet */}
                    <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      st.done 
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' 
                        : st.current
                        ? 'bg-amber-500 text-slate-950 animate-pulse'
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      {st.done ? '✓' : st.id}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className={`text-sm font-black ${st.current ? 'text-amber-600' : st.done ? 'text-slate-900' : 'text-slate-400'}`}>
                          {st.title}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-400">({st.time})</span>
                        {st.current && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                            Şu Anki Durum
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
