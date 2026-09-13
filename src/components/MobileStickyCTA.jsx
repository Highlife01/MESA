import React from 'react';
import { Link } from '../router/Router';
import { Phone, MessageCircle, Wrench } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export function MobileStickyCTA() {
  return (
    <aside aria-label="Acil mobil iletişim çubuğu" className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-between gap-2 md:hidden shadow-lg">
      {/* 1. ARA */}
      <a
        href={`tel:${SITE_CONFIG.phoneRaw}`}
        className="flex-1 py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-black text-xs flex items-center justify-center gap-1.5 transition border border-slate-200"
      >
        <Phone className="w-3.5 h-3.5 text-red-600" />
        <span>ARA</span>
      </a>

      {/* 2. WHATSAPP */}
      <a
        href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent('Merhaba MESA Servis, şantiyemdeki iş makinası için acil servis desteği istiyorum.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
      >
        <MessageCircle className="w-3.5 h-3.5 text-white" />
        <span>WHATSAPP</span>
      </a>

      {/* 3. SERVİS ÇAĞIR */}
      <Link
        to="/ariza-bildir"
        className="flex-[1.2] py-2.5 px-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs flex items-center justify-center gap-1.5 transition shadow-md shadow-red-600/30 border border-red-500"
      >
        <Wrench className="w-3.5 h-3.5 text-white" />
        <span>SERVİS ÇAĞIR</span>
      </Link>
    </aside>
  );
}

export default MobileStickyCTA;
