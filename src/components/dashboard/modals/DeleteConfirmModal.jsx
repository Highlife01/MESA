import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

export function DeleteConfirmModal({ modalData, onClose, onConfirm }) {
  if (!modalData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl text-slate-900">
        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-100">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-black text-center text-slate-900">Kalıcı Olarak Silinsin Mi?</h3>
        <p className="text-xs text-slate-600 text-center mt-2 mb-6 leading-relaxed">
          <strong className="text-slate-900 font-mono">{modalData.title}</strong> kaydını sistemden kalıcı olarak silmek üzeresiniz. Bu işlem geri alınamaz.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition border border-slate-200"
          >
            Vazgeç
          </button>
          <button
            onClick={onConfirm}
            className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs flex items-center justify-center gap-1.5 transition shadow-md shadow-red-600/30"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Evet, Sil</span>
          </button>
        </div>
      </div>
    </div>
  );
}
