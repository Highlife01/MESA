import React, { useState } from 'react';
import { Package, ShoppingBag, Trash2, ArrowDownRight, ArrowUpRight, ShieldCheck, Plus, Search } from 'lucide-react';
import { Link } from '../../../router/Router';
import { useOperational } from '../../../context/OperationalContext';

export function PartsTab({
  partsOrders = [],
  isSuperAdmin,
  updatePartsOrderStatus,
  setDeleteConfirmModal
}) {
  const { inventoryItems, inventoryMovements, recordInventoryMovement, showToast } = useOperational();
  const [activeSubTab, setActiveSubTab] = useState('orders'); // 'orders' | 'inventory' | 'movements'
  const [movementSearch, setMovementSearch] = useState('');

  // Quick Restock Handler
  const handleQuickRestock = (part) => {
    const qtyStr = prompt(`${part.name} için eklenecek stok adedini giriniz:`, '5');
    if (!qtyStr || isNaN(Number(qtyStr))) return;
    recordInventoryMovement({
      partId: part.id,
      partName: part.name,
      type: 'restock',
      qty: Number(qtyStr),
      workOrderCode: '-',
      actor: 'Depo Sorumlusu',
      note: 'Merkez depo sevkiyat girişi'
    });
  };

  const filteredMovements = inventoryMovements.filter(m => {
    const q = movementSearch.toLowerCase().trim();
    if (!q) return true;
    return m.partName?.toLowerCase().includes(q) ||
      m.workOrderCode?.toLowerCase().includes(q) ||
      m.actor?.toLowerCase().includes(q) ||
      m.type?.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Subtab Switcher */}
      <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl w-fit shadow-xs">
        <button
          onClick={() => setActiveSubTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'orders'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <span>B2B Siparişler ({partsOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('inventory')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'inventory'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <span>Envanter & Stok Durumu ({inventoryItems.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('movements')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'movements'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <span>Çift Taraflı Stok Hareketleri ({inventoryMovements.length})</span>
        </button>
      </div>

      {/* SubTab 1: B2B Orders */}
      {activeSubTab === 'orders' && (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
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
                                title: `Sipariş: ${po.orderCode}`,
                                desc: `${po.companyName || po.customerName} firmasına ait ₺${po.total.toLocaleString('tr-TR')} tutarındaki sipariş silinecektir.`
                              });
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-400 transition"
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
      )}

      {/* SubTab 2: Inventory Stock */}
      {activeSubTab === 'inventory' && (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
            <div>
              <h3 className="text-base font-black text-slate-900">Merkez Depo Envanter Durumu</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Kritik stok seviyesi kontrolü ve hızlı giriş</p>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Toplam <strong>{inventoryItems.reduce((acc, i) => acc + i.stock, 0)}</strong> Parça
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Parça Adı</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">OEM Kod</th>
                  <th className="p-4">Mevcut Stok</th>
                  <th className="p-4">Kritik Eşik</th>
                  <th className="p-4">Birim Fiyat</th>
                  <th className="p-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inventoryItems.map(item => {
                  const isLow = item.stock <= item.minStock;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-4 font-bold text-slate-900">{item.name}</td>
                      <td className="p-4 text-slate-500">{item.category}</td>
                      <td className="p-4 font-mono text-[11px] text-slate-600">{item.oem}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full font-mono font-bold text-xs ${
                          isLow ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {item.stock} {item.unit}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-slate-500">{item.minStock} {item.unit}</td>
                      <td className="p-4 font-mono font-bold text-slate-900">₺{item.price.toLocaleString('tr-TR')}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleQuickRestock(item)}
                          className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition inline-flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Giriş</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SubTab 3: Double-Entry Movement Ledger */}
      {activeSubTab === 'movements' && (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm space-y-4">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/60">
            <div>
              <h3 className="text-base font-black text-slate-900">Çift Taraflı Stok Hareketleri Defteri (Ledger)</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Saha sarfiyatları, iş emri montajları ve tedarikçi girişleri</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Parça veya iş emri ara..."
                value={movementSearch}
                onChange={e => setMovementSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Tarih</th>
                  <th className="p-4">Hareket Tipi</th>
                  <th className="p-4">Parça Adı</th>
                  <th className="p-4">Miktar</th>
                  <th className="p-4">İş Emri</th>
                  <th className="p-4">İşlemi Yapan</th>
                  <th className="p-4">Açıklama</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMovements.map(m => {
                  const isOut = m.type === 'consumption';
                  return (
                    <tr key={m.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">{m.timestamp}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                          isOut ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {isOut ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                          <span>{isOut ? 'Sarfiyat (Çıkış)' : 'Giriş (İkmal)'}</span>
                        </span>
                      </td>
                      <td className="p-4 font-bold text-slate-900">{m.partName}</td>
                      <td className="p-4 font-mono font-bold text-slate-900">
                        {isOut ? `-${m.qty}` : `+${m.qty}`} Adet
                      </td>
                      <td className="p-4 font-mono font-bold text-red-600">{m.workOrderCode}</td>
                      <td className="p-4 text-slate-700 font-semibold">{m.actor}</td>
                      <td className="p-4 text-slate-500 text-[11px]">{m.note || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
