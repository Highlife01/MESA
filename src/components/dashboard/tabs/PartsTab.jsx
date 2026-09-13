import React from 'react';
import { Package, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from '../../../router/Router';

export function PartsTab({
  partsOrders = [],
  isSuperAdmin,
  updatePartsOrderStatus,
  setDeleteConfirmModal
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm animate-fadeIn">
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/60">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Package className="w-4 h-4 text-emerald-600" />
            B2B Orijinal Yedek Parça Siparişleri
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">{partsOrders.length} aktif sipariş kayıtlı</p>
        </div>
        <Link
          to="/yedek-parca"
          className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Parça Kataloğu</span>
        </Link>
      </div>

      {partsOrders.length === 0 ? (
        <div className="p-12 text-center">
          <Package className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-500">Henüz yedek parça siparişi oluşturulmadı.</p>
          <Link to="/yedek-parca" className="text-xs text-red-600 hover:underline mt-2 inline-block font-bold">
            Parça Kataloğunu İncele →
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Sipariş Kodu</th>
                <th className="p-4">Firma / Müşteri</th>
                <th className="p-4">Sipariş Kalemleri</th>
                <th className="p-4">Tutar</th>
                <th className="p-4">Sevk Adresi</th>
                <th className="p-4">Durum</th>
                {isSuperAdmin && <th className="p-4 text-right">İşlem</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {partsOrders.map((po, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-red-600">{po.orderCode}</td>
                  <td className="p-4">
                    <strong className="block text-slate-900 text-xs">{po.companyName || po.customerName}</strong>
                    <span className="text-[10px] text-slate-500">{po.phone}</span>
                  </td>
                  <td className="p-4">
                    {po.items.map((it, i) => (
                      <span key={i} className="block text-[11px] text-slate-700">
                        {it.name} <span className="text-slate-400 font-mono">×{it.quantity}</span>
                      </span>
                    ))}
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-900 text-sm">
                    ₺{po.total.toLocaleString('tr-TR')}
                  </td>
                  <td className="p-4 max-w-[200px] truncate text-slate-500 text-[11px]">{po.address}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                        po.status === 'Teslim Edildi' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        po.status === 'Kargoya Verildi' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {po.status}
                      </span>
                      {isSuperAdmin && (
                        <button
                          onClick={() => {
                            const nextStatus = po.status === 'Hazırlanıyor' ? 'Kargoya Verildi' :
                              po.status === 'Kargoya Verildi' ? 'Teslim Edildi' : 'Hazırlanıyor';
                            updatePartsOrderStatus(po.orderCode, nextStatus);
                          }}
                          className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-[10px] transition"
                          title="Durumu İlerlet"
                        >
                          ➔
                        </button>
                      )}
                    </div>
                  </td>
                  {isSuperAdmin && (
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setDeleteConfirmModal({
                            type: 'part',
                            id: po.orderCode,
                            title: `Sipariş ${po.orderCode}`
                          });
                        }}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition"
                        title="Siparişi Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
