import React, { useState } from 'react';
import { MapPin, Check, AlertCircle, Loader2 } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export function LocationShareButton({ onLocationAcquired, className = '' }) {
  const [loading, setLoading] = useState(false);
  const [acquired, setAcquired] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Cihazınızda GPS konum servisi desteklenmiyor.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoading(false);
        setAcquired(true);
        const { latitude, longitude } = position.coords;
        const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
        
        if (onLocationAcquired) {
          onLocationAcquired({ latitude, longitude, mapsLink });
        } else {
          // Open directly in WhatsApp if no callback
          const msg = encodeURIComponent(`Merhaba MESA Servis, iş makinam arızalandı. Acil mobil servis talep ediyorum. Şantiye Konumum: ${mapsLink}`);
          window.open(`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${msg}`, '_blank');
        }
      },
      (error) => {
        setLoading(false);
        let msg = 'Konum alınamadı. Lütfen konum izinlerini kontrol edin.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Konum izni reddedildi. Şantiye adresini manuel yazabilirsiniz.';
        }
        setErrorMsg(msg);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <button
        type="button"
        onClick={handleGetLocation}
        disabled={loading}
        className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition shadow-xs ${
          acquired 
            ? 'bg-emerald-600 text-white border border-emerald-500' 
            : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700'
        }`}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
        ) : acquired ? (
          <Check className="w-4 h-4 text-emerald-300" />
        ) : (
          <MapPin className="w-4 h-4 text-amber-400" />
        )}
        <span>{acquired ? 'Şantiye GPS Konumu Eklendi' : 'Şantiye GPS Konumumu Gönder'}</span>
      </button>

      {errorMsg && (
        <span className="text-[11px] text-rose-600 mt-1 flex items-center gap-1 font-medium">
          <AlertCircle className="w-3.5 h-3.5" />
          {errorMsg}
        </span>
      )}
    </div>
  );
}
