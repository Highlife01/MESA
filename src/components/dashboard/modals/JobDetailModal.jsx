import React from 'react';
import { X, MapPin, Phone, MessageSquare, Printer, Trash2, Check } from 'lucide-react';

export function JobDetailModal({ 
  job, 
  onClose, 
  isSuperAdmin, 
  onDeleteRequest, 
  onStatusUpdate, 
  getStatusStyle, 
  getNextStatus, 
  getNextStatusLabel 
}) {
  if (!job) return null;

  const style = getStatusStyle(job.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-2xl w-full shadow-2xl text-slate-900 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-lg font-black text-red-600">{job.id || job.code}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${style.bg} ${style.text} border ${style.border}`}>
                {job.status}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">{job.customer}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workflow Timeline */}
        <div className="py-4 border-b border-slate-100">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Görev İlerleme Durumu</span>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-center text-[10px]">
            {['Atandı', 'Mobil Ekip Yolda', 'Şantiyede', 'Teşhiste', 'Onarımda', 'Tamamlandı'].map((st, idx) => {
              const isActive = job.status === st;
              const isPast = ['Atandı', 'Mobil Ekip Yolda', 'Şantiyede', 'Teşhiste', 'Onarımda', 'Tamamlandı'].indexOf(job.status) >= idx;
              return (
                <div 
                  key={st}
                  className={`p-2 rounded-xl font-bold border transition-colors ${
                    isActive ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/30' :
                    isPast ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    'bg-slate-50 text-slate-400 border-slate-200'
                  }`}
                >
                  {st}
                </div>
              );
            })}
          </div>
        </div>

        {/* Details Grid */}
        <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] mb-1 font-bold uppercase">Makina & Arıza Tanımı</span>
            <span className="text-slate-900 font-bold block">{job.machine}</span>
            <span className="text-slate-600 block mt-1">{job.issue}</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] mb-1 font-bold uppercase">Şantiye & İletişim</span>
            <span className="text-slate-900 font-bold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              {job.location}
            </span>
            <div className="flex items-center gap-2 mt-2">
              <a
                href={`tel:${job.phone || '05344075585'}`}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1 text-[11px] border border-slate-200"
              >
                <Phone className="w-3 h-3 text-red-600" />
                <span>Ara ({job.phone || '0534 407 55 85'})</span>
              </a>
              <a
                href={`https://wa.me/905344075585?text=${encodeURIComponent(`MESA Servis: ${job.id || job.code} nolu servis durumu hakkında bildirim.`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold flex items-center gap-1 text-[11px] border border-emerald-200"
              >
                <MessageSquare className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] mb-1 font-bold uppercase">Görevli Usta & Araç</span>
            <span className="text-slate-900 font-bold block">{job.assignedTechnician}</span>
            <span className="text-slate-500 block">{job.vehicle}</span>
            {job.techDistance && (
              <span className="text-red-600 block font-mono text-[11px] mt-1">Mesafe: {job.techDistance}</span>
            )}
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <span className="text-slate-500 block text-[10px] mb-1 font-bold uppercase">Maliyet & Parça Kaydı</span>
            <span className="text-lg font-black text-emerald-700 font-mono block">
              ₺{(job.cost || 0).toLocaleString('tr-TR')}
            </span>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {(job.partsUsed || []).length > 0 ? (
                job.partsUsed.map((p, i) => (
                  <span key={i} className="px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200 text-[10px]">{p}</span>
                ))
              ) : (
                <span className="text-slate-400 text-[11px]">Henüz parça girilmedi</span>
              )}
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition border border-slate-200"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Yazdır / Rapor</span>
            </button>

            {isSuperAdmin && (
              <button
                onClick={() => onDeleteRequest(job)}
                className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1.5 transition border border-red-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Sil</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {getNextStatus(job.status) && (
              <button
                onClick={() => {
                  const next = getNextStatus(job.status);
                  onStatusUpdate(job.id || job.code, next);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-600/30 transition"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{getNextStatusLabel(job.status)}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition border border-slate-200"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
