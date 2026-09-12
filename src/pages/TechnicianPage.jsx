import React, { useState, useEffect } from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { useOperational } from '../context/OperationalContext';
import { DigitalSignatureModal } from '../components/DigitalSignatureModal';
import { partsCatalogData } from '../data/partsCatalogData';
import { 
  Navigation, Phone, CheckCircle2, Clock, Wrench, 
  ShieldCheck, ArrowLeft, Play, Pause, FileCheck, MapPin, User, Plus
} from 'lucide-react';

export function TechnicianPage() {
  const { activeOrders, updateOrderStatus, recordSignature } = useOperational();
  const [selectedOrderId, setSelectedOrderId] = useState(activeOrders[0]?.id || 1);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(1440); // default mock timer
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [usedParts, setUsedParts] = useState([
    { name: 'Parker 4SP Hidrolik Hortum (500 Bar)', qty: 2 },
    { name: 'O-Ring & Sızdırmazlık Keçe Takımı', qty: 1 }
  ]);

  const activeOrder = activeOrders.find(o => o.id === selectedOrderId) || activeOrders[0] || {
    id: 1,
    code: 'MS-2026-00128',
    customer: 'ABC İnşaat Ltd.',
    machine: 'JCB 3CX Kazıcı Yükleyici',
    location: 'Seyhan OSB Şantiyesi, Adana',
    issue: 'Hidrolik bom kaldırmıyor, kule kilitlenme',
    status: 'Şantiyede'
  };

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSaveSignature = (sigData) => {
    recordSignature(activeOrder.code, sigData);
    updateOrderStatus(activeOrder.code, 'Tamamlandı');
    setIsTimerRunning(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-3 sm:p-6 py-12">
      <SEO 
        title="Saha Teknisyen Mobil Portalı (PWA) | MESA"
        description="Mesa İş Makinaları saha ustaları iş emri, navigasyon, yedek parça kaydı ve dijital imza ekranı."
        canonical="/teknisyen"
      />

      <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold px-3 py-1 rounded-full">
            Saha Teknisyen Mobil Terminali
          </span>
          <Link to="/panel" className="text-xs text-slate-400 hover:text-white font-semibold flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ERP Panel</span>
          </Link>
        </div>

        {/* Order Selector */}
        {activeOrders.length > 1 && (
          <div>
            <label className="text-xs text-slate-400 block mb-1">Müdahale Edilen İş Emrini Seç:</label>
            <select
              value={selectedOrderId}
              onChange={(e) => setSelectedOrderId(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-amber-500"
            >
              {activeOrders.map(o => (
                <option key={o.id} value={o.id}>
                  {o.code} - {o.customer} ({o.machine})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Active Task Card */}
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Aktif İş Emri</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-500 text-slate-950">
              {activeOrder.status}
            </span>
          </div>

          <h2 className="text-2xl font-black text-amber-400 font-mono">{activeOrder.code}</h2>
          <p className="text-base font-bold text-white">{activeOrder.customer} • {activeOrder.machine}</p>
          
          <div className="flex items-center gap-1.5 text-xs text-slate-300 pt-1">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{activeOrder.location}</span>
          </div>

          <div className="text-xs text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 mt-2">
            <strong className="text-slate-300 block mb-0.5">Bildirilen Arıza / Semptom:</strong>
            {activeOrder.issue}
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <a 
            href={`https://maps.google.com/?q=${encodeURIComponent(activeOrder.location)}`}
            target="_blank" 
            rel="noreferrer" 
            className="bg-slate-900 hover:bg-slate-800 text-slate-200 p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition border border-slate-800"
          >
            <Navigation className="w-4 h-4 text-emerald-400" /> 
            <span>Navigasyon</span>
          </a>
          <a 
            href="tel:05335293674" 
            className="bg-slate-900 hover:bg-slate-800 text-slate-200 p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition border border-slate-800"
          >
            <Phone className="w-4 h-4 text-blue-400" /> 
            <span>Müşteriyi Ara</span>
          </a>
        </div>

        {/* Live Work Timer */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Saha Müdahale Süresi</span>
            <span className="text-xl font-black font-mono text-white">{formatTimer(secondsElapsed)}</span>
          </div>

          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
              isTimerRunning 
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isTimerRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Duraklat</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Sayacı Başlat</span>
              </>
            )}
          </button>
        </div>

        {/* Used Spare Parts Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300">Kullanılan Yedek Parçalar ({usedParts.length})</span>
            <button
              onClick={() => {
                const partName = prompt('Kullanılan parçayı giriniz:');
                if (partName) setUsedParts([...usedParts, { name: partName, qty: 1 }]);
              }}
              className="text-amber-400 hover:underline font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Parça Ekle
            </button>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3 space-y-1.5 text-xs">
            {usedParts.map((p, i) => (
              <div key={i} className="flex items-center justify-between text-slate-300">
                <span>{p.name}</span>
                <span className="font-mono font-bold text-amber-400">{p.qty} Adet</span>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Signature & Finish Service CTA */}
        <div className="space-y-3 pt-2">
          {activeOrder.status === 'Tamamlandı' ? (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 shrink-0" />
              <div>
                <strong className="block text-white font-bold">Servis Başarıyla Teslim Edildi!</strong>
                <span>Dijital müşteri imzası alındı ve iş emri resmi olarak kapatıldı.</span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsSignatureModalOpen(true)}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-transform active:scale-95"
            >
              <FileCheck className="w-5 h-5" />
              <span>Müşteri İmzası Al & İşi Kapat (Dijital Tutanak)</span>
            </button>
          )}

          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              12 Ay / 2.000 Saat Mesa Garantisi
            </span>
            <span>Konum: Çukurova / Seyhan OSB</span>
          </div>
        </div>

      </div>

      {/* Digital Signature Modal Component */}
      <DigitalSignatureModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        orderData={activeOrder}
        onSaveSignature={handleSaveSignature}
      />

    </div>
  );
}
