import React from 'react';
import { Radio, X } from 'lucide-react';

export function EmergencyBroadcastModal({ isOpen, onClose, alertText, setAlertText, onBroadcast }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl text-slate-900">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-red-600">
            <Radio className="w-5 h-5 animate-pulse" />
            <h3 className="font-black text-base text-slate-900">Tüm Filoya Acil Çağrı Alarmı</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Bu mesaj sahadaki mobil servis araçlarının tabletlerine ve nöbetçi teknisyenlere anında acil durum uyarısı olarak iletilecektir.
        </p>
        <textarea
          rows={3}
          value={alertText}
          onChange={e => setAlertText(e.target.value)}
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-red-500 transition resize-none mb-4"
        />
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            İptal
          </button>
          <button
            onClick={onBroadcast}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-red-600/30 transition"
          >
            <Radio className="w-4 h-4" />
            <span>Alarmı Yayınla</span>
          </button>
        </div>
      </div>
    </div>
  );
}
