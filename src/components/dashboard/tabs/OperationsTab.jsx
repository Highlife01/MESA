import React from 'react';
import { 
  Zap, Activity, Clock, MapPin, Trash2, CheckCircle2, 
  ChevronRight, Wallet, Eye, Package 
} from 'lucide-react';
import { Link } from '../../../router/Router';
import { DonutChart } from '../widgets/DonutChart';

export function OperationsTab({
  filteredOrders,
  activeOrders,
  filterStatus,
  setFilterStatus,
  stats,
  getStatusStyle,
  getNextStatus,
  getNextStatusLabel,
  setSelectedJobModal,
  setDeleteConfirmModal,
  updateOrderStatus,
  setNewJobModalOpen,
  setActiveTab,
  setFinanceSubTab,
  isSuperAdmin
}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-fadeIn">
      {/* Left: Orders List */}
      <div className="xl:col-span-8 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        {/* Filter & Subheader */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-red-600" />
                Canlı Saha Görevleri
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {filteredOrders.length} iş emri listeleniyor • Detay ve yönetim için karta tıklayınız
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {['Tümü', 'Mobil Ekip Yolda', 'Şantiyede', 'Tamamlandı'].map(st => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-200 ${
                    filterStatus === st
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Order Cards */}
        <div className="divide-y divide-slate-100">
          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <CheckCircle2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-500">Bu filtreye uygun iş emri bulunamadı.</p>
            </div>
          ) : (
            filteredOrders.map(order => {
              const statusStyle = getStatusStyle(order.status);
              const nextStatus = getNextStatus(order.status);
              const nextLabel = getNextStatusLabel(order.status);

              return (
                <div
                  key={order.id || order.code}
                  className="p-4 sm:p-5 hover:bg-slate-50 transition-colors cursor-pointer group"
                  onClick={() => setSelectedJobModal(order)}
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left Info */}
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className={`w-10 h-10 rounded-xl ${statusStyle.bg} ${statusStyle.border} border flex items-center justify-center shrink-0 mt-0.5`}>
                        <span className={`w-2.5 h-2.5 rounded-full ${statusStyle.dot} ${order.status !== 'Tamamlandı' ? 'animate-pulse' : ''}`} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-black text-red-600 text-xs">{order.id || order.code}</span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border`}>
                            {order.status}
                          </span>
                          {order.etaMinutes > 0 && order.status !== 'Tamamlandı' && (
                            <span className="text-[10px] text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" /> ETA {order.etaMinutes} dk
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mt-1 truncate group-hover:text-red-600 transition-colors">
                          {order.customer}
                        </h4>
                        <p className="text-[11px] text-slate-600 truncate">{order.machine}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-500">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-red-600" />{order.location}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" />{order.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-2">
                        {order.cost > 0 && (
                          <span className="font-mono text-xs font-bold text-slate-900">
                            ₺{order.cost.toLocaleString('tr-TR')}
                          </span>
                        )}
                        {isSuperAdmin && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirmModal({
                                type: 'job',
                                id: order.id || order.code,
                                title: `${order.id || order.code} - ${order.customer}`
                              });
                            }}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition"
                            title="İş Emrini Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {nextStatus && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateOrderStatus(order.id || order.code, nextStatus);
                          }}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 rounded-lg text-[10px] font-bold transition-all duration-200 whitespace-nowrap border border-slate-200"
                        >
                          {nextLabel} →
                        </button>
                      )}

                      {order.status === 'Tamamlandı' && (
                        <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Kapatıldı
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Right: Sidebar Widgets */}
      <div className="xl:col-span-4 space-y-6">
        {/* Job Distribution Donut */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>İş Emri Dağılımı</span>
            <Activity className="w-3.5 h-3.5 text-red-600" />
          </h4>
          <div className="flex items-center gap-6">
            <DonutChart
              size={110}
              strokeWidth={14}
              segments={[
                { value: activeOrders.filter(o => o.status === 'Tamamlandı').length, color: '#10b981' },
                { value: activeOrders.filter(o => ['Şantiyede','Teşhiste','Onarımda'].includes(o.status)).length, color: '#3b82f6' },
                { value: activeOrders.filter(o => ['Mobil Ekip Yolda','Atandı'].includes(o.status)).length, color: '#f59e0b' },
              ]}
            />
            <div className="space-y-2 text-[11px] flex-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-600">Tamamlandı</span>
                <span className="text-slate-900 font-bold ml-auto">{activeOrders.filter(o => o.status === 'Tamamlandı').length}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-slate-600">Sahada Aktif</span>
                <span className="text-slate-900 font-bold ml-auto">{activeOrders.filter(o => ['Şantiyede','Teşhiste','Onarımda'].includes(o.status)).length}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-slate-600">Yolda / Sevk</span>
                <span className="text-slate-900 font-bold ml-auto">{activeOrders.filter(o => ['Mobil Ekip Yolda','Atandı'].includes(o.status)).length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-sm">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Hızlı Aksiyonlar</h4>
          
          <button
            onClick={() => setNewJobModalOpen(true)}
            className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-red-50/70 border border-red-200 hover:bg-red-100/70 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Acil Görev Oluştur</span>
              <span className="text-[10px] text-slate-500">Hızlı şantiye sevk formu</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-red-600 transition-colors" />
          </button>

          <button
            onClick={() => { setActiveTab('finance'); setFinanceSubTab('cheques'); }}
            className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-blue-50/70 border border-blue-200 hover:bg-blue-100/70 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Çek & Kasa İşlemleri</span>
              <span className="text-[10px] text-slate-500">Alınan çekler ve nakit bakiye</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-blue-600 transition-colors" />
          </button>

          <Link to="/servis-takip" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors group">
            <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Servis Takip Paneli</span>
              <span className="text-[10px] text-slate-500">Müşteri canlı izleme ekranı</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-purple-600 transition-colors" />
          </Link>

          <Link to="/yedek-parca" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors group">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Parça Sipariş Ver</span>
              <span className="text-[10px] text-slate-500">B2B OEM yedek parça kataloğu</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-emerald-600 transition-colors" />
          </Link>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Operasyon Metrikleri</h4>
          <div className="space-y-3">
            {[
              { label: 'SLA Uyum Oranı', value: 98.2, color: 'bg-emerald-500' },
              { label: 'İlk Seferde Çözüm', value: 94.5, color: 'bg-blue-500' },
              { label: 'Müşteri Memnuniyeti', value: 97.8, color: 'bg-red-500' },
              { label: 'Araç Kullanılabilirlik', value: 92.0, color: 'bg-purple-500' },
            ].map((metric, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="text-slate-600">{metric.label}</span>
                  <span className="text-slate-900 font-bold font-mono">%{metric.value}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${metric.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
