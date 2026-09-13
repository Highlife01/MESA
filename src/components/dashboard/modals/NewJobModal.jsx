import React from 'react';
import { Zap, X } from 'lucide-react';

export function NewJobModal({ isOpen, onClose, form, setForm, onSubmit, technicians = [] }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl text-slate-900">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-red-600" />
            <h3 className="font-black text-base text-slate-900">Hızlı Saha Görevi / İş Emri Aç</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="py-4 space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-600 font-bold mb-1">Müşteri / Firma Adı *</label>
            <input
              type="text"
              required
              placeholder="Örn: Akdeniz İnşaat A.Ş."
              value={form.customer}
              onChange={e => setForm({ ...form, customer: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-bold mb-1">İletişim Telefonu</label>
              <input
                type="text"
                placeholder="0532 000 00 00"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Şantiye Konumu</label>
              <input
                type="text"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Makina Modeli</label>
            <select
              value={form.machine}
              onChange={e => setForm({ ...form, machine: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
            >
              <option>CAT 320D Paletli Ekskavatör</option>
              <option>CAT 428F Bekoloder</option>
              <option>JCB 3CX Eco Kazıcı Yükleyici</option>
              <option>JCB 540-140 Telehandler</option>
              <option>Hidromek HMK 102B Alpha</option>
              <option>Hidromek HMK 220LC Ekskavatör</option>
              <option>Komatsu PC200-8 Ekskavatör</option>
              <option>Volvo EC210D Paletli Ekskavatör</option>
              <option>Manitou MT-X 1440 Telehandler</option>
              <option>Bobcat S530 Mini Yükleyici</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Arıza Belirtisi / Talep *</label>
            <textarea
              rows={2}
              required
              placeholder="Örn: Bom hidrolik basıncı düşüyor, kule dönüşte kilitlenme var..."
              value={form.issue}
              onChange={e => setForm({ ...form, issue: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 resize-none transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Atanacak Teknisyen</label>
              <select
                value={form.tech}
                onChange={e => setForm({ ...form, tech: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
              >
                {technicians.map(v => (
                  <option key={v.id} value={`${v.tech} (${v.type})`}>
                    {v.tech} - {v.id}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Tahmini Varış (ETA dk)</label>
              <input
                type="number"
                min="5"
                max="120"
                value={form.eta}
                onChange={e => setForm({ ...form, eta: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
              />
            </div>
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
              <Zap className="w-4 h-4" />
              <span>Görevi Başlat & Sevk Et</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
