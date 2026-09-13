import React from 'react';
import { Receipt, X, Check } from 'lucide-react';

export function CollectReceivableModal({ 
  receivable, 
  onClose, 
  collectAmount, 
  setCollectAmount, 
  collectMethod, 
  setCollectMethod, 
  onSubmit 
}) {
  if (!receivable) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl text-slate-900">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-600" />
            <h3 className="font-black text-base text-slate-900">Cari Tahsilat Kaydı</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="py-4 space-y-3.5 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <strong className="block text-slate-900 text-sm">{receivable.client}</strong>
            <span className="text-slate-500 block mt-0.5">{receivable.machine}</span>
            <span className="text-amber-600 block font-mono font-bold mt-1">
              Kalan Alacak: ₺{receivable.balance.toLocaleString('tr-TR')}
            </span>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Tahsilat Yöntemi</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'nakit', label: 'Nakit Kasa' },
                { id: 'banka', label: 'Banka Havale' },
                { id: 'cek', label: 'Vadeli Çek' }
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setCollectMethod(m.id)}
                  className={`py-2 rounded-xl font-bold border text-center transition ${
                    collectMethod === m.id 
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm' 
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Tahsil Edilen Tutar (₺) *</label>
            <input
              type="number"
              required
              value={collectAmount}
              onChange={e => setCollectAmount(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono font-bold text-base focus:bg-white focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition border border-slate-200"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-emerald-600/30 transition"
            >
              <Check className="w-4 h-4" />
              <span>Tahsilatı Onayla</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
