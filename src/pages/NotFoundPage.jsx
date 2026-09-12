import React from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { Home, Wrench, Phone, ArrowLeft, Search, ShieldAlert } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex items-center justify-center px-4">
      <SEO
        title="404 — Sayfa Bulunamadı"
        description="Aradığınız sayfa bulunamadı. Mesa İş Makinaları ana sayfasına dönün."
        canonical="/404"
      />

      <div className="text-center max-w-lg mx-auto">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-[120px] sm:text-[160px] font-black text-slate-800/30 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center animate-float">
              <Wrench className="w-10 h-10 text-amber-400" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl sm:text-3xl font-black text-white mb-3">
          Bu Sayfa <span className="text-amber-400">Arızalı</span> Görünüyor!
        </h1>
        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed mb-8">
          Aradığınız sayfa taşınmış, kaldırılmış veya hiç var olmamış olabilir. 
          Tıpkı sahada arızalanan bir makine gibi — hemen müdahale edelim! 🛠️
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20"
          >
            <Home className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>

          <Link
            to="/hizmetler"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition border border-slate-700"
          >
            <Search className="w-4 h-4 text-amber-400" />
            <span>Hizmetleri İncele</span>
          </Link>

          <Link
            to="/ariza-bildir"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 font-bold text-sm flex items-center justify-center gap-2 transition"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Arıza Bildir</span>
          </Link>
        </div>

        {/* Emergency Contact */}
        <div className="mt-10 pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-500 mb-3">Acil destek için bizi arayın:</p>
          <a
            href="tel:05335293674"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/30 text-amber-400 font-bold text-sm transition"
          >
            <Phone className="w-4 h-4" />
            <span>0533 529 36 74</span>
          </a>
        </div>
      </div>
    </div>
  );
}
