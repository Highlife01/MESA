import React from 'react';
import { 
  BarChart3, Search, X, Bell, AlertTriangle, Crown, PenTool, Zap 
} from 'lucide-react';
import { Link } from '../../router/Router';
import { LiveClock } from './widgets/LiveClock';

export function DashboardHeader({
  searchQuery,
  setSearchQuery,
  showAlerts,
  setShowAlerts,
  unreadAlertsCount,
  alertJobs = [],
  user,
  setActiveTab,
  setSelectedJobModal,
  setNewJobModalOpen
}) {
  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand & Status */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-md shadow-red-600/30 border border-red-500/40">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-black text-slate-900 tracking-wider flex items-center gap-1.5">
                  <span>MESA ERP</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-50 text-red-600 font-mono border border-red-200">v2.5</span>
                </h1>
                <span className="text-[10px] text-slate-500 font-medium">Saha Telematik & Finans Merkezi</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">CANLI SİSTEM</span>
            </div>
            <LiveClock />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5">
            {/* Search */}
            <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 gap-2 w-60 focus-within:bg-white focus-within:border-red-500 transition-colors">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="İş emri, müşteri, araç ara..."
                className="bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-none w-full font-medium"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-700">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Alert Bell */}
            <div className="relative">
              <button
                onClick={() => setShowAlerts(!showAlerts)}
                className="relative p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 transition-colors"
                title="Bildirimler"
              >
                <Bell className="w-4 h-4" />
                {unreadAlertsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center animate-pulse border-2 border-white">
                    {unreadAlertsCount}
                  </span>
                )}
              </button>

              {showAlerts && (
                <div className="absolute right-0 mt-2 w-84 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fadeIn">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <span className="text-xs font-black text-slate-900 flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                      Bekleyen Saha Görevleri
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{alertJobs.length} kayıt</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {alertJobs.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-500">Bekleyen uyarı yok. Tüm görevler tamamlandı.</div>
                    ) : alertJobs.map(job => (
                      <button
                        key={job.id || job.code}
                        onClick={() => { 
                          setActiveTab('operations'); 
                          setSelectedJobModal(job); 
                          setShowAlerts(false); 
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors block group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-black text-red-600 group-hover:text-red-700">{job.id || job.code}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">{job.status}</span>
                        </div>
                        <div className="text-xs font-bold text-slate-900 mt-1 truncate">{job.customer}</div>
                        <div className="text-[10px] text-slate-500 truncate mt-0.5">{job.machine} • {job.location}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Super Admin Badge */}
            <div className="hidden lg:flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-3 py-1.5 rounded-xl text-xs font-black">
              <Crown className="w-3.5 h-3.5 text-red-600" />
              <span>ROOT: {user?.name || 'Süper Admin'}</span>
            </div>

            {/* Teknisyen Portal Link */}
            <Link
              to="/teknisyen"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-bold rounded-xl transition-colors"
              title="Saha Teknisyen Terminali"
            >
              <PenTool className="w-3.5 h-3.5 text-red-600" />
              <span>Teknisyen</span>
            </Link>

            {/* Quick Action: New Emergency Job Modal Trigger */}
            <button
              onClick={() => setNewJobModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-black rounded-xl transition shadow-md shadow-red-600/30 border border-red-500/50"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Yeni İş Emri</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
