import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, ShieldAlert, Download, Filter, Search, Clock, 
  Key, RefreshCw, FileText, Package, UserCheck, AlertTriangle 
} from 'lucide-react';
import { useOperational } from '../../../context/OperationalContext';

export function AuditTab() {
  const { auditLogs, showToast } = useOperational();
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = useMemo(() => {
    return auditLogs.filter(log => {
      const matchesFilter = 
        filterType === 'ALL' ||
        (filterType === 'AUTH' && log.actionType.includes('AUTH')) ||
        (filterType === 'QR' && log.actionType.includes('QR')) ||
        (filterType === 'WORK_ORDER' && (log.actionType.includes('WORK_ORDER') || log.actionType.includes('STATUS') || log.actionType.includes('EVIDENCE'))) ||
        (filterType === 'INVENTORY' && log.actionType.includes('INVENTORY'));

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        log.actorName?.toLowerCase().includes(q) ||
        log.details?.toLowerCase().includes(q) ||
        log.actionType?.toLowerCase().includes(q) ||
        log.resourceId?.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [auditLogs, filterType, searchQuery]);

  const handleExportAudit = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `mesa_security_audit_log_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    showToast('Güvenlik denetim günlüğü JSON olarak indirildi.');
  };

  const getActionBadge = (actionType) => {
    if (actionType.includes('AUTH')) {
      return { label: 'Kimlik Doğrulama', color: 'bg-blue-50 text-blue-700 border-blue-200' };
    }
    if (actionType.includes('QR')) {
      return { label: 'QR Token Rotasyonu', color: 'bg-purple-50 text-purple-700 border-purple-200' };
    }
    if (actionType.includes('EVIDENCE')) {
      return { label: 'Servis Kanıtı', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    }
    if (actionType.includes('STATUS') || actionType.includes('WORK_ORDER')) {
      return { label: 'İş Emri Olayı', color: 'bg-amber-50 text-amber-800 border-amber-200' };
    }
    if (actionType.includes('INVENTORY')) {
      return { label: 'Stok Hareketi', color: 'bg-red-50 text-red-700 border-red-200' };
    }
    return { label: actionType, color: 'bg-slate-50 text-slate-700 border-slate-200' };
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white">Güvenlik & Denetim Kayıt Merkezi (Audit Trail)</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                Değiştirilemez Günlük
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Token rotasyonları, teknisyen kanıt yüklemeleri, stok sarfiyatları ve oturum hareketleri.
            </p>
          </div>
        </div>

        <button
          onClick={handleExportAudit}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition border border-white/10 self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>Denetim Raporunu İndir (JSON)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Kullanıcı adı, işlem veya kod ara..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-red-500 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'ALL', label: 'Tüm Olaylar' },
            { id: 'QR', label: 'QR Rotasyonları' },
            { id: 'WORK_ORDER', label: 'İş Emirleri & Kanıtlar' },
            { id: 'INVENTORY', label: 'Stok Hareketleri' },
            { id: 'AUTH', label: 'Oturumlar' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                filterType === f.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
          <span>Toplam <strong>{filteredLogs.length}</strong> Denetim Kaydı</span>
          <span className="font-mono text-[11px]">UTC+03:00 Adana TR</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredLogs.map(log => {
            const badge = getActionBadge(log.actionType);
            return (
              <div key={log.id} className="p-4 sm:p-5 hover:bg-slate-50/80 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${badge.color}`}>
                      {badge.label}
                    </span>
                    <strong className="text-slate-900 font-bold">{log.actorName}</strong>
                    <span className="text-[10px] text-slate-400 font-mono">({log.actorRole})</span>
                    <span className="text-[10px] text-slate-400">• {log.timestamp}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed pt-0.5">
                    {log.details}
                  </p>
                </div>

                {log.resourceId && log.resourceId !== '-' && (
                  <div className="sm:text-right shrink-0">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Hedef Kaynak:</span>
                    <span className="font-mono font-bold text-red-600 text-xs bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 inline-block mt-0.5">
                      {log.resourceId}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {filteredLogs.length === 0 && (
            <div className="p-12 text-center text-xs text-slate-500">
              Kriterlere uygun güvenlik denetim kaydı bulunamadı.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
