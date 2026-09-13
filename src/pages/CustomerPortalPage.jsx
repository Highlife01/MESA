import React from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { Building2, Wrench, FileText, CheckCircle2, Clock, AlertTriangle, ArrowLeft, Phone } from 'lucide-react';

export function CustomerPortalPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8 flex flex-col">
      <SEO 
        title="Müşteri B2B Portalı | Makine & Cari Takip"
        description="Mesa İş Makinaları kurumsal müşteri portalı. Kayıtlı makinelerin periyodik bakım durumları, geçmiş servis fişleri ve cari hesap dökümü."
        canonical="/musteri-portali"
      />

      <div className="max-w-7xl mx-auto w-full space-y-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 bg-white px-6 py-5 rounded-3xl shadow-xs">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                B2B Müşteri Girişi
              </span>
              <span className="text-xs text-slate-400">• ABC İnşaat Ltd. Şti.</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-1">Hoş Geldiniz, Ahmet Kaya</h1>
          </div>

          <div className="flex items-center space-x-3">
            <Link 
              to="/ariza-bildir"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-2xl text-xs transition shadow-xs"
            >
              + Yeni Arıza Bildir
            </Link>
            <Link 
              to="/" 
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Ana Sayfaya Dön
            </Link>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs">
            <span className="text-xs text-slate-500 font-semibold">Kayıtlı Filo</span>
            <h4 className="text-2xl font-black text-slate-900 mt-1">12 Makine</h4>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs">
            <span className="text-xs text-slate-500 font-semibold">Aktif Sahada Serviste</span>
            <h4 className="text-2xl font-black text-amber-600 mt-1">1 Adet</h4>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs">
            <span className="text-xs text-slate-500 font-semibold">Toplam Servis Geçmişi</span>
            <h4 className="text-2xl font-black text-slate-900 mt-1">32 İş Emri</h4>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs">
            <span className="text-xs text-slate-500 font-semibold">Güncel Cari Bakiye</span>
            <h4 className="text-2xl font-black text-slate-900 mt-1">₺165.000</h4>
          </div>
        </div>

        {/* Machines and Work Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Machines (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
              Kayıtlı Makineler & Bakım Takvimi
            </h3>

            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-sm">JCB 3CX (2021)</span>
                    <span className="text-[11px] font-mono text-slate-400">#01-ABC-32</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Çalışma Saati: 8.421 Saat • Son Bakım: 12.09.2026
                  </p>
                </div>
                <span className="bg-amber-100 text-amber-900 text-xs px-3 py-1 rounded-full font-bold self-start sm:self-auto">
                  Serviste (MS-128)
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-sm">Manitou MT 1440 Telehandler</span>
                    <span className="text-[11px] font-mono text-slate-400">#01-ABC-14</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Çalışma Saati: 9.920 Saat • ⚠️ 10.000 Saat Ana Bakımı Yaklaşıyor
                  </p>
                </div>
                <button 
                  onClick={() => alert("Periyodik bakım randevusu talebiniz alındı.")} 
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition self-start sm:self-auto"
                >
                  Bakım Çağır
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-sm">CAT 320D2 Paletli Ekskavatör</span>
                    <span className="text-[11px] font-mono text-slate-400">#01-ABC-20</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Çalışma Saati: 6.150 Saat • Yağ & Filtre Durumu Uygun
                  </p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold self-start sm:self-auto">
                  Aktif Sahada
                </span>
              </div>
            </div>
          </div>

          {/* Past Invoices and Reports (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
              Son Servis Fişleri & Raporlar
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">CAT 320 Ana Pompa Revizyonu</div>
                  <div className="text-[11px] text-slate-500">28 Ağustos 2026 • 450 Bar Test Raporlu</div>
                </div>
                <button onClick={() => alert("PDF Servis Fişi İndiriliyor...")} className="text-amber-600 font-bold hover:underline">
                  PDF İndir
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">JCB 3CX 500 Saat Periyodik Bakım</div>
                  <div className="text-[11px] text-slate-500">14 Ağustos 2026 • Orijinal Filtreler</div>
                </div>
                <button onClick={() => alert("PDF Servis Fişi İndiriliyor...")} className="text-amber-600 font-bold hover:underline">
                  PDF İndir
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Manitou Teleskopik Bom Zincir Değişimi</div>
                  <div className="text-[11px] text-slate-500">02 Temmuz 2026 • Moment Kalibrasyonlu</div>
                </div>
                <button onClick={() => alert("PDF Servis Fişi İndiriliyor...")} className="text-amber-600 font-bold hover:underline">
                  PDF İndir
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 mt-4">
              <span className="text-xs font-bold text-amber-400 block">Muhasebe & Cari İletişim</span>
              <p className="text-[11px] text-slate-300">
                Mutabakat ve e-fatura sorgulamaları için doğrudan muhasebe departmanımıza ulaşabilirsiniz:
              </p>
              <div className="text-xs font-bold text-amber-300">
                0322 350 00 00 • info@mesaismakinalari.com.tr
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
