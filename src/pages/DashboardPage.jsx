import React, { useState } from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { useOperational } from '../context/OperationalContext';
import { 
  Activity, Users, Truck, Clock, Wrench, ShieldCheck, 
  MapPin, Phone, AlertCircle, CheckCircle2, ChevronRight,
  TrendingUp, Bell, Search, Filter, ShoppingBag, PenTool
} from 'lucide-react';

export function DashboardPage() {
  const { activeOrders, partsOrders, updateOrderStatus, unreadAlertsCount } = useOperational();
  const [filterStatus, setFilterStatus] = useState('Tümü');

  const filteredOrders = activeOrders.filter(o => {
    if (filterStatus === 'Tümü') return true;
    return o.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-8">
      <SEO 
        title="MESA ERP & Telematik Canlı Operasyon Merkezi"
        description="Mesa İş Makinaları 7/24 filo yönetimi, telematik arıza takip ve saha servis yönetim merkezi."
        canonical="/panel"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">Canlı Operasyon Aktif</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              MESA Telematik & ERP Kontrol Paneli
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/teknisyen"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition border border-slate-700 flex items-center gap-1.5"
            >
              <PenTool className="w-3.5 h-3.5 text-amber-400" />
              <span>Teknisyen Terminali</span>
            </Link>
            <Link
              to="/ariza-bildir"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Yeni Acil Görev Başlat</span>
            </Link>
          </div>
        </div>

        {/* Live KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Aktif Saha Görevleri</span>
              <Activity className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-3xl font-black text-white font-mono">{activeOrders.length}</span>
            <span className="text-[11px] text-amber-400 block mt-1">3 Mobil Araç Sahada</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>B2B Parça Siparişleri</span>
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-3xl font-black text-white font-mono">{partsOrders.length}</span>
            <span className="text-[11px] text-emerald-400 block mt-1">Adana Merkez Depo</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Ort. Müdahale Süresi</span>
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-3xl font-black text-white font-mono">28 Dk</span>
            <span className="text-[11px] text-blue-400 block mt-1">Çukurova Geneli</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Tamamlanma Oranı</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-3xl font-black text-white font-mono">%99.4</span>
            <span className="text-[11px] text-slate-400 block mt-1">12 Ay Yazılı Garanti</span>
          </div>
        </div>

        {/* Live Emergency Orders Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-black text-white">Canlı Acil Müdahale & Saha Görevleri</h3>
              <p className="text-xs text-slate-400">Şantiyelerden gelen canlı çağrılar ve anlık müdahale durumları</p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 text-xs">
              {['Tümü', 'Mobil Ekip Yolda', 'Şantiyede', 'Tamamlandı'].map(st => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                    filterStatus === st ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3.5 rounded-l-xl">İş Emri</th>
                  <th className="p-3.5">Müşteri & Makine</th>
                  <th className="p-3.5">Lokasyon</th>
                  <th className="p-3.5">Bildirilen Arıza</th>
                  <th className="p-3.5">Durum</th>
                  <th className="p-3.5 rounded-r-xl text-right">Aksiyon</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3.5 font-mono font-bold text-amber-400">{order.code}</td>
                    <td className="p-3.5">
                      <strong className="block text-white">{order.customer}</strong>
                      <span className="text-slate-400 text-[11px]">{order.machine}</span>
                    </td>
                    <td className="p-3.5 text-slate-300">{order.location}</td>
                    <td className="p-3.5 max-w-xs truncate text-slate-300">{order.issue}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        order.status === 'Tamamlandı'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : order.status === 'Şantiyede'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      {order.status !== 'Tamamlandı' ? (
                        <button
                          onClick={() => updateOrderStatus(order.code, order.status === 'Mobil Ekip Yolda' ? 'Şantiyede' : 'Tamamlandı')}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-bold"
                        >
                          {order.status === 'Mobil Ekip Yolda' ? 'Şantiyeye Vardı' : 'Tamamla'}
                        </button>
                      ) : (
                        <span className="text-emerald-400 font-semibold text-[11px]">Teslim Edildi ✓</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* B2B Parts Orders Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-lg font-black text-white">B2B Orijinal Yedek Parça Siparişleri</h3>
            <p className="text-xs text-slate-400">Şantiyelerden verilen OEM filtre, pompa ve hortum talepleri</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Sipariş No</th>
                  <th className="p-3.5">Firma / Müşteri</th>
                  <th className="p-3.5">İçerik</th>
                  <th className="p-3.5">Toplam Tutar</th>
                  <th className="p-3.5">Teslimat Adresi</th>
                  <th className="p-3.5 rounded-r-xl">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {partsOrders.map((po, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition">
                    <td className="p-3.5 font-mono font-bold text-amber-400">{po.orderCode}</td>
                    <td className="p-3.5">
                      <strong className="block text-white">{po.companyName || po.customerName}</strong>
                      <span className="text-slate-400 text-[11px]">{po.phone}</span>
                    </td>
                    <td className="p-3.5">
                      {po.items.map((it, i) => (
                        <span key={i} className="block text-[11px]">
                          {it.name} (x{it.quantity})
                        </span>
                      ))}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-white">
                      {po.total.toLocaleString('tr-TR')} ₺
                    </td>
                    <td className="p-3.5 max-w-xs truncate text-slate-400">{po.address}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {po.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
