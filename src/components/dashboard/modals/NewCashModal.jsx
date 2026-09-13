import React from 'react';
import { Banknote, X, Check } from 'lucide-react';

export function NewCashModal({ isOpen, onClose, form, setForm, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl text-slate-900">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Banknote className="w-5 h-5 text-emerald-600" />
            <h3 className="font-black text-base text-slate-900">Kasa Nakit İşlemi Ekle</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="py-4 space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setForm({ ...form, type: 'in' })}
              className={`py-2.5 rounded-xl font-bold border transition ${
                form.type === 'in' 
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30' 
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              + Nakit Giriş (Tahsilat)
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, type: 'out' })}
              className={`py-2.5 rounded-xl font-bold border transition ${
                form.type === 'out' 
                  ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30' 
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              - Nakit Çıkış (Gider)
            </button>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Firma / Şantiye / Alıcı *</label>
            <input
              type="text"
              required
              placeholder="Örn: Bozkurt Hafriyat / Mobil Araç Mazot"
              value={form.client}
              onChange={e => setForm({ ...form, client: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Kategori</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-emerald-500 transition"
              >
                <option>Şantiye Peşin Tahsilat</option>
                <option>OEM Yedek Parça Satış</option>
                <option>Diagnostik Teşhis Ücreti</option>
                <option>Saha Mazot Gideri</option>
                <option>Atölye Sarf Malzeme</option>
                <option>Personel / Usta Harcırahı</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Tutar (₺) *</label>
              <input
                type="number"
                required
                placeholder="25000"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-emerald-500 font-mono font-bold transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Açıklama</label>
            <input
              type="text"
              placeholder="Örn: 500 Bar Hortum Pres ve Yağ Değişimi Bedeli"
              value={form.desc}
              onChange={e => setForm({ ...form, desc: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-emerald-500 transition"
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
              <span>İşlemi Kasaya Kaydet</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
