import React, { useState } from 'react';
import { QrCode, X, Eye, Printer, RefreshCw, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Link } from '../../../router/Router';
import { useOperational } from '../../../context/OperationalContext';

export function MachineQrModal({ isOpen, onClose, form, setForm }) {
  if (!isOpen) return null;

  const { machines, rotateMachineToken, showToast } = useOperational();
  const [selectedMachineId, setSelectedMachineId] = useState(form.machineId || machines[0]?.id || 'MCH-01-ABC-32');
  const [rotating, setRotating] = useState(false);

  const currentMachine = machines.find(m => m.id === selectedMachineId) || machines[0] || {
    id: 'MCH-01-ABC-32',
    token: 'mch_8f4c21a7',
    name: 'JCB 3CX Eco Kazıcı Yükleyici',
    site: 'Seyhan OSB Şantiyesi, Adana',
    hours: 8421
  };

  const publicToken = currentMachine.token || form.token || 'mch_8f4c21a7';
  const publicUrl = typeof window !== 'undefined' ? `${window.location.origin}/m/${publicToken}` : `https://www.mesaismakineleri.com.tr/m/${publicToken}`;

  const handleRotate = () => {
    if (!window.confirm(`${currentMachine.name} için QR token yenilenecektir. Eski basılı QR etiketleri güvenlik nedeniyle geçersiz kılınacaktır. Onaylıyor musunuz?`)) {
      return;
    }
    setRotating(true);
    setTimeout(() => {
      const updated = rotateMachineToken(currentMachine.id);
      setRotating(false);
      if (updated && setForm) {
        setForm(prev => ({ ...prev, token: updated.token }));
      }
    }, 400);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-4xl w-full shadow-2xl text-slate-900 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shadow-sm">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900">
                Endüstriyel QR Makine Pasaportu & Etiket Merkezi
              </h3>
              <p className="text-xs text-slate-500">
                Şantiye makinelerine yapıştırılan tahmin edilemez, döngüsel (rotasyonlu) güvenli QR kimliği
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Machine Selection & Token Controls (6 cols) */}
          <div className="lg:col-span-6 space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">İş Makinesini Seç:</label>
              <select
                value={selectedMachineId}
                onChange={(e) => setSelectedMachineId(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-red-500 transition"
              >
                {machines.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.id} — {m.name} ({m.customerName || m.site})
                  </option>
                ))}
              </select>
            </div>

            {/* Token Security Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-bold">Aktif Kriptografik Token:</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-900 text-amber-400 font-mono font-bold text-xs">
                  {publicToken}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Son Rotasyon:</span>
                <span>{currentMachine.qrRotatedAt ? new Date(currentMachine.qrRotatedAt).toLocaleString('tr-TR') : 'İlk Üretim'}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleRotate}
                  disabled={rotating}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition disabled:opacity-50 shadow-sm"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${rotating ? 'animate-spin' : ''}`} />
                  <span>{rotating ? 'Yenileniyor...' : 'QR Token\'ı Yenile (Rotate Token)'}</span>
                </button>
              </div>
            </div>

            {/* Info Notice */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Üretim Güvenliği Güvencesi</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-900/80">
                Basılı QR etiket asla müşteri telefon numarası, fiyat veya tam şasi içermez. Kamuya açık okutulduğunda yalnızca onaylı servis durumunu açar.
              </p>
            </div>

            <div className="text-[11px] text-slate-500 space-y-1">
              <p><strong>Yönlendirme URL:</strong> <span className="font-mono text-slate-700 break-all">{publicUrl}</span></p>
              <p><strong>Makine Sahası:</strong> {currentMachine.site}</p>
            </div>
          </div>

          {/* Printable Equipment Sticker Preview (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-2 w-full text-center">
              Endüstriyel Vinil Etiket Baskı Önizlemesi (10x15 cm)
            </span>

            {/* Print Sticker Frame */}
            <div 
              id="printable-machine-qr-sticker"
              className="w-full max-w-sm bg-white border-4 border-slate-950 rounded-2xl p-5 shadow-xl text-slate-950 text-center space-y-3 relative overflow-hidden"
            >
              {/* Header Header */}
              <div className="bg-red-600 text-white p-2.5 rounded-xl text-center space-y-0.5 shadow-sm">
                <div className="flex items-center justify-center gap-1.5 font-black text-xs tracking-wider uppercase">
                  <span>MESA İŞ MAKİNALARI SERVİSİ</span>
                </div>
                <p className="text-[9px] font-mono tracking-widest text-red-100">
                  7/24 MOBİL TELEMATİK & AKILLI MAKİNE KİMLİĞİ
                </p>
              </div>

              {/* QR Vector Pattern */}
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
                  <text x="50" y="54" fill="white" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">MESA</text>
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
                <span className="font-mono text-[10px] font-black text-red-600 mt-1">
                  TOKEN: {publicToken}
                </span>
              </div>

              {/* Machine Passport Details */}
              <div className="text-[11px] text-left space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-950 truncate">{currentMachine.name}</div>
                <div className="text-slate-600 font-mono text-[10px]">MAKİNE KODU: {currentMachine.id}</div>
                <div className="text-slate-600 truncate">{currentMachine.site}</div>
                <div className="text-emerald-700 font-bold text-[10px]">
                  Çalışma Saati: {currentMachine.hours?.toLocaleString('tr-TR')} Saat
                </div>
              </div>

              {/* Emergency Hotline */}
              <div className="pt-1 border-t border-slate-100">
                <div className="text-[11px] font-black text-red-600 font-mono">
                  7/24 ACİL SERVİS: 0534 407 55 85
                </div>
                <span className="text-[9px] text-slate-500 block mt-0.5">
                  Akıllı telefon kamerası ile okutarak güvenli makine pasaportunu açın
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
              to={`/m/${publicToken}`}
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition border border-slate-200"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Güvenli Görünümü Aç</span>
            </Link>

            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-red-600/30 transition"
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
