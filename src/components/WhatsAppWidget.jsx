import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export function WhatsAppWidget() {
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // 0534 407 55 85
  const PHONE = '905344075585';
  const FORMATTED_PHONE = '0534 407 55 85';
  const MESSAGE = 'Merhaba, MESA İş Makinaları acil servis ve teknik destek hakkında bilgi almak istiyorum.';

  const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setShowBubble(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleDismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowBubble(false);
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start font-sans select-none">
      {/* Chat Preview Bubble */}
      {showBubble && !dismissed && (
        <div className="mb-3 w-72 max-w-[calc(100vw-3rem)] animate-fadeInUp">
          <div className="bg-slate-900 text-white rounded-2xl rounded-bl-sm shadow-2xl p-4 relative border border-emerald-500/30 backdrop-blur-md">
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center hover:bg-slate-700 hover:text-white transition shadow-lg"
              aria-label="Kapat"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            
            <div className="flex items-center gap-2.5 mb-2.5 pb-2.5 border-b border-slate-800">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-md">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse"></span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white tracking-tight">MESA Destek</span>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Çevrimiçi
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono block">{FORMATTED_PHONE}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Merhaba! 🚜 İş makinası arıza, mobil usta veya yedek parça desteği için WhatsApp üzerinden anında yazabilirsiniz.
            </p>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 transition transform active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>WhatsApp'tan Hemen Yazın</span>
            </a>
          </div>
          {/* Tail */}
          <div className="w-3 h-3 bg-slate-900 rotate-45 -mt-1.5 ml-5 border-b border-r border-emerald-500/30" />
        </div>
      )}

      {/* WhatsApp FAB Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-700 hover:from-emerald-400 hover:to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-emerald-300/40 animate-pulseGlow"
        aria-label="WhatsApp İletişim: 0534 407 55 85"
        title="WhatsApp: 0534 407 55 85"
      >
        {/* Tooltip on hover */}
        <span className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900/95 text-white text-xs font-bold rounded-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl border border-slate-800 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          WhatsApp: {FORMATTED_PHONE}
        </span>

        {/* WhatsApp SVG Icon */}
        <svg className="w-7 h-7 text-white drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
