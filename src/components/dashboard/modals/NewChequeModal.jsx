import React from 'react';
import { Wallet, X, Check } from 'lucide-react';

export function NewChequeModal({ isOpen, onClose, form, setForm, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl text-slate-900">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-red-600" />
            <h3 className="font-black text-base text-slate-900">Portföye Yeni Çek Girişi</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="py-4 space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-600 font-bold mb-1">Keşideci Firma / Müşteri *</label>
            <input
              type="text"
              required
              placeholder="Örn: Kaya Hafriyat & Madencilik Ltd."
              value={form.drawer}
              onChange={e => setForm({ ...form, drawer: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Çek Numarası</label>
              <input
                type="text"
                placeholder="CK-99001"
                value={form.id}
                onChange={e => setForm({ ...form, id: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 font-mono transition"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Banka / Şube</label>
              <input
                type="text"
                placeholder="Garanti BBVA - Adana Çarşı"
                value={form.bank}
                onChange={e => setForm({ ...form, bank: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Vade Tarihi *</label>
              <input
                type="date"
                required
                value={form.dueDate}
                onChange={e => setForm({ ...form, dueDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Çek Tutarı (₺) *</label>
              <input
                type="number"
                required
                placeholder="150000"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 font-mono font-bold transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">İlgili İş Makinası & Açıklama</label>
            <input
              type="text"
              placeholder="Örn: CAT 320D Pompa Revizyonu ve Yedek Parça Bedeli"
              value={form.desc}
              onChange={e => setForm({ ...form, desc: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
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
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-red-600/30 transition"
            >
              <Check className="w-4 h-4" />
              <span>Çeki Portföye Kaydet</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
