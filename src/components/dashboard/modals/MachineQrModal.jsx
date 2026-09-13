import React from 'react';
import { QrCode, X, Eye, Printer } from 'lucide-react';
import { Link } from '../../../router/Router';

export function MachineQrModal({ isOpen, onClose, form, setForm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl text-slate-900 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-slate-900">Şantiye İş Makinası Akıllı QR Etiketi</h3>
              <p className="text-xs text-slate-500">Makinanın kabinine veya bomuna yapıştırılacak dijital servis pasaportu</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Settings */}
          <div className="lg:col-span-6 space-y-3.5 text-xs">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
              Etiket Bilgilerini Düzenle
            </span>

            <div>
              <label className="block text-slate-600 font-bold mb-1">İş Makinası Modeli</label>
              <input
                type="text"
                value={form.machine}
                onChange={e => setForm({ ...form, machine: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Şasi / Seri No</label>
                <input
                  type="text"
                  value={form.chassis}
                  onChange={e => setForm({ ...form, chassis: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:bg-white focus:outline-none focus:border-amber-500 transition"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Servis / Takip Kodu</label>
                <input
                  type="text"
                  value={form.serviceCode}
                  onChange={e => setForm({ ...form, serviceCode: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono font-bold focus:bg-white focus:outline-none focus:border-amber-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Müşteri / Şantiye Sahibi</label>
              <input
                type="text"
                value={form.customer}
                onChange={e => setForm({ ...form, customer: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-bold mb-1">Şantiye Konumu</label>
              <input
                type="text"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Son Bakım & Yağ Saati</label>
                <input
                  type="text"
                  value={form.oilHours}
                  onChange={e => setForm({ ...form, oilHours: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-amber-500 transition"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Sorumlu Usta / Hat</label>
                <input
                  type="text"
                  value={form.tech}
                  onChange={e => setForm({ ...form, tech: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-amber-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Printable Equipment Sticker Preview */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-2 w-full text-center">
              Baskı Önizlemesi (10x15 cm Su Geçirmez Etiket)
            </span>

            <div 
              id="printable-machine-qr-sticker"
              className="w-full max-w-sm bg-white border-4 border-slate-950 rounded-2xl p-5 shadow-lg text-slate-950 text-center space-y-3 relative overflow-hidden"
            >
              <div className="bg-red-600 text-white p-2 rounded-xl text-center space-y-0.5">
                <div className="flex items-center justify-center gap-1.5 font-black text-xs tracking-wider uppercase">
                  <span>MESA İŞ MAKİNALARI</span>
                </div>
                <p className="text-[9px] font-mono tracking-widest text-red-100">7/24 TELEMATİK & MOBİL SAHA SERVİSİ</p>
              </div>

              {/* QR Vector Pattern Preview */}
              <div className="bg-white p-3 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center mx-auto">
                <svg className="w-32 h-32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" fill="white" />
                  <rect x="5" y="5" width="26" height="26" fill="black" />
                  <rect x="9" y="9" width="18" height="18" fill="white" />
                  <rect x="13" y="13" width="10" height="10" fill="black" />

                  <rect x="69" y="5" width="26" height="26" fill="black" />
                  <rect x="73" y="9" width="18" height="18" fill="white" />
                  <rect x="77" y="13" width="10" height="10" fill="black" />

                  <rect x="5" y="69" width="26" height="26" fill="black" />
                  <rect x="9" y="73" width="18" height="18" fill="white" />
                  <rect x="13" y="77" width="10" height="10" fill="black" />

                  <rect x="36" y="8" width="5" height="5" fill="black" />
                  <rect x="46" y="8" width="5" height="5" fill="black" />
                  <rect x="56" y="8" width="5" height="5" fill="black" />
                  <rect x="36" y="18" width="5" height="5" fill="black" />
                  <rect x="46" y="24" width="5" height="5" fill="black" />
                  <rect x="56" y="18" width="5" height="5" fill="black" />
                  <rect x="8" y="36" width="5" height="5" fill="black" />
                  <rect x="18" y="46" width="5" height="5" fill="black" />
                  <rect x="24" y="36" width="5" height="5" fill="black" />
                  <rect x="36" y="36" width="28" height="28" fill="#dc2626" rx="4" />
                  <text x="50" y="54" fill="white" fontSize="14" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">MESA</text>
                  <rect x="68" y="36" width="5" height="5" fill="black" />
                  <rect x="78" y="46" width="5" height="5" fill="black" />
                  <rect x="88" y="36" width="5" height="5" fill="black" />
                  <rect x="36" y="68" width="5" height="5" fill="black" />
                  <rect x="46" y="76" width="5" height="5" fill="black" />
                  <rect x="56" y="68" width="5" height="5" fill="black" />
                  <rect x="68" y="68" width="5" height="5" fill="black" />
                  <rect x="78" y="76" width="5" height="5" fill="black" />
                  <rect x="88" y="88" width="5" height="5" fill="black" />
                </svg>
                <span className="font-mono text-xs font-black text-red-600 mt-1">KOD: {form.serviceCode}</span>
              </div>

              {/* Machine Passport Details */}
              <div className="text-[11px] text-left space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-950 truncate">{form.machine}</div>
                <div className="text-slate-600 font-mono text-[10px]">ŞASİ: {form.chassis}</div>
                <div className="text-slate-600 truncate">{form.customer} • {form.location}</div>
                <div className="text-emerald-700 font-bold text-[10px]">Çalışma Saati: {form.oilHours}</div>
              </div>

              <div className="pt-1">
                <div className="text-[10px] font-black text-red-600">
                  7/24 ACİL SERVİS: 0534 407 55 85
                </div>
                <span className="text-[9px] text-slate-500 block">
                  Akıllı telefon kamerası ile okutarak servis geçmişini görüntüleyin
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
          >
            Kapat
          </button>

          <div className="flex items-center gap-2">
            <Link
              to={`/servis-takip?kod=${form.serviceCode}`}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition border border-slate-200"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Takip Ekranında İncele</span>
            </Link>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-amber-600/30 transition"
            >
              <Printer className="w-4 h-4" />
              <span>QR Etiketi Yazdır (Kabin / Bom)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
