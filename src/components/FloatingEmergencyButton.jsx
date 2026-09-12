import React from 'react';
import { Phone, MessageSquare, ShieldAlert } from 'lucide-react';
import { Link } from '../router/Router';

export function FloatingEmergencyButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {/* Quick WhatsApp */}
      <a 
        href="https://wa.me/905325550128?text=Merhaba%20Mesa%20İş%20Makinaları,%20acil%20servis%20ve%20ariza%20desteği%20almak%20istiyorum."
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-110 transition-all duration-200 group"
        title="WhatsApp Acil Destek"
        aria-label="WhatsApp Acil Destek"
      >
        <MessageSquare className="w-6 h-6" />
      </a>

      {/* Quick Direct Call */}
      <a 
        href="tel:05325550128"
        className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 hover:scale-110 transition-all duration-200"
        title="7/24 Acil Usta Çağır"
        aria-label="7/24 Acil Usta Çağır"
      >
        <Phone className="w-6 h-6 animate-pulse" />
      </a>

      {/* Online Wizard Pill */}
      <Link
        to="/ariza-bildir"
        className="hidden sm:flex items-center space-x-2 px-4 py-2.5 rounded-full bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold shadow-2xl border border-slate-800 hover:border-amber-500 transition-all group"
      >
        <ShieldAlert className="w-4 h-4 text-amber-500 animate-pulse" />
        <span>Arıza Bildir</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping ml-1" />
      </Link>
    </div>
  );
}
