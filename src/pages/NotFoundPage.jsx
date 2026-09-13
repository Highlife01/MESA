import React from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { Home, Wrench, Phone, ArrowLeft, Search, ShieldAlert } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4">
      <SEO
        title="404 — Sayfa Bulunamadı"
        description="Aradığınız sayfa bulunamadı. Mesa İş Makinaları ana sayfasına dönün."
        canonical="/404"
      />

      <div className="text-center max-w-lg mx-auto">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-[120px] sm:text-[160px] font-black text-slate-200 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-3xl bg-red-50 border-2 border-red-200 flex items-center justify-center animate-float shadow-lg">
              <Wrench className="w-10 h-10 text-red-600" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
          Bu Sayfa <span className="text-red-600">Arızalı</span> Görünüyor!
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-8">
          Aradığınız sayfa taşınmış, kaldırılmış veya hiç var olmamış olabilir. 
          Tıpkı sahada arızalanan bir makine gibi — hemen müdahale edelim! 🛠️
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-red-600/20"
          >
            <Home className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>

          <Link
            to="/hizmetler"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition border border-slate-200 shadow-xs"
          >
            <Search className="w-4 h-4 text-red-600" />
            <span>Hizmetleri İncele</span>
          </Link>

          <Link
            to="/ariza-bildir"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold text-sm flex items-center justify-center gap-2 transition"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Arıza Bildir</span>
          </Link>
        </div>

        {/* Emergency Contact */}
        <div className="mt-10 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-500 mb-3">Acil destek için bizi arayın:</p>
          <a
            href="tel:05335293674"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-red-500/30 text-red-600 font-bold text-sm transition shadow-xs"
          >
            <Phone className="w-4 h-4" />
            <span>0533 529 36 74</span>
          </a>
        </div>
      </div>
    </div>
  );
}
