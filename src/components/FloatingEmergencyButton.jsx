import React, { useState } from 'react';
import { Link } from '../router/Router';
import { Phone, MessageCircle, Wrench, X, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FloatingEmergencyButton = () => {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Sub action menu */}
      {open && (
        <div className="mb-3 flex flex-col items-end space-y-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Link
            to="/ariza-bildir"
            onClick={() => setOpen(false)}
            className="flex items-center space-x-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-2xl shadow-xl font-extrabold text-xs transition transform hover:-translate-x-1"
          >
            <ShieldAlert className="w-4 h-4 text-slate-950" />
            <span>{t('emergencyCall')}</span>
          </Link>

          <a
            href="https://wa.me/905335293674?text=Merhaba%2C%20acil%20servis%20ve%20ar%C4%B1za%20tespiti%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-2xl shadow-xl font-bold text-xs transition transform hover:-translate-x-1"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>{t('whatsappHelp')}</span>
          </a>

          <a
            href="tel:05335293674"
            className="flex items-center space-x-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 px-4 py-2.5 rounded-2xl shadow-xl font-bold text-xs transition transform hover:-translate-x-1"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>{t('callNow')}</span>
          </a>
        </div>
      )}

      {/* Main trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/30 transition transform hover:scale-105 cursor-pointer focus:outline-none border-2 border-amber-300/40"
        aria-label="Acil Yardım Menüsü"
      >
        {open ? <X className="w-6 h-6" /> : <Wrench className="w-6 h-6" />}
      </button>
    </div>
  );
};
