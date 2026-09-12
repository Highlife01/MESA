import React, { useState } from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { Navigation, Phone, CheckCircle2, Clock, Wrench, ShieldCheck, ArrowLeft } from 'lucide-react';

export function TechnicianPage() {
  const [servisStarted, setServisStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(null);

  const startService = () => {
    setServisStarted(true);
    setStartTime(new Date().toLocaleTimeString());
  };

  const endService = () => {
    setServisStarted(false);
    setElapsed("2 saat 24 dakika");
    alert("Servis başarıyla tamamlandı! İş emri ve fotoğraflı rapor sisteme kaydedildi.");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 py-12">
      <SEO 
        title="Saha Teknisyen Mobil Portalı (PWA)"
        description="Mesa İş Makinaları saha ustaları iş emri, navigasyon ve servis tamamlama ekranı."
        canonical="/teknisyen"
      />

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full">
            Teknisyen Mobil PWA
          </span>
          <Link to="/panel" className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Panel'e Dön
          </Link>
        </div>

        <div>
          <span className="text-xs text-slate-400 font-semibold block">Aktif Atanmış Görev</span>
          <h2 className="text-2xl font-black text-amber-600 mt-1 font-mono">MS-2026-00128</h2>
          <p className="text-base font-bold text-slate-900 mt-1">ABC İnşaat • JCB 3CX</p>
          <p className="text-xs text-slate-600 mt-0.5 font-medium flex items-center">
            <span>Seyhan OSB Şantiyesi</span>
            <span className="mx-1.5">•</span>
            <span className="text-emerald-600 font-bold">6.4 km mesafede</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noreferrer" 
            className="bg-slate-50 hover:bg-slate-100 text-slate-800 p-3.5 rounded-2xl text-xs font-bold flex items-center justify-center transition border border-slate-200"
          >
            <Navigation className="w-4 h-4 mr-1.5 text-emerald-600" /> 
            <span>Yol Tarifi</span>
          </a>
          <a 
            href="tel:05325550128" 
            className="bg-slate-50 hover:bg-slate-100 text-slate-800 p-3.5 rounded-2xl text-xs font-bold flex items-center justify-center transition border border-slate-200"
          >
            <Phone className="w-4 h-4 mr-1.5 text-amber-600" /> 
            <span>Müşteriyi Ara</span>
          </a>
        </div>

        {!servisStarted ? (
          <button 
            onClick={startService}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl text-sm shadow-lg shadow-emerald-600/25 transition cursor-pointer"
          >
            SERVİSE BAŞLA ⚡
          </button>
        ) : (
          <div className="space-y-3.5">
            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl text-center text-xs text-emerald-800 font-semibold">
              Servis Başlangıcı: <span className="font-bold text-slate-900">{startTime}</span>
            </div>

            <button 
              onClick={endService}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 rounded-2xl text-sm shadow-lg shadow-red-600/30 transition cursor-pointer"
            >
              SERVİSİ BİTİR (RAPORLA) 🏁
            </button>
          </div>
        )}

        {elapsed && (
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1.5 font-medium">
            <div className="flex justify-between font-bold text-amber-700">
              <span>Toplam Çalışma:</span>
              <span>{elapsed}</span>
            </div>
            <div className="flex justify-between">
              <span>Kullanılan Parça Maliyeti:</span>
              <span>₺9.200</span>
            </div>
            <div className="flex justify-between">
              <span>İşçilik + Mobil Sevk:</span>
              <span>₺7.500</span>
            </div>
          </div>
        )}

        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between font-medium">
          <span>Giriş Yapan: <strong>Mehmet Usta (01 MSA 01)</strong></span>
          <span className="text-emerald-700 font-bold flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
            Çevrimiçi
          </span>
        </div>
      </div>
    </div>
  );
}
