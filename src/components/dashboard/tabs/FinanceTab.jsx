import React from 'react';
import { 
  Banknote, Wallet, Landmark, Receipt, Plus, Search, 
  Trash2, Copy 
} from 'lucide-react';

export function FinanceTab({
  financeSubTab,
  setFinanceSubTab,
  totalCashBalance,
  totalPortfolioCheques,
  totalInCollectionCheques,
  totalChequesCombined,
  totalBankBalances,
  totalReceivables,
  cheques,
  setCheques,
  filteredCheques,
  chequeFilter,
  setChequeFilter,
  chequeSearch,
  setChequeSearch,
  cashTransactions,
  receivables,
  bankAccounts,
  setNewChequeModalOpen,
  setNewCashModalOpen,
  setCollectReceivableModal,
  setCollectAmount,
  setDeleteConfirmModal,
  isSuperAdmin,
  showToast,
  onCollectCheque
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Finance Hero Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Kasa Nakit */}
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kasa (Nakit)</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <Banknote className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            ₺{totalCashBalance.toLocaleString('tr-TR')}
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
            <span className="text-emerald-700 font-bold">+₺51.200 Giriş</span>
            <span className="text-red-700 font-bold">-₺10.200 Çıkış</span>
          </div>
        </div>

        {/* Portföydeki Çekler */}
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Alınan Çekler</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            ₺{totalChequesCombined.toLocaleString('tr-TR')}
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
            <span>Portföyde: ₺{totalPortfolioCheques.toLocaleString('tr-TR')}</span>
            <span className="text-amber-700 font-bold">Tahsilde: ₺{totalInCollectionCheques.toLocaleString('tr-TR')}</span>
          </div>
        </div>

        {/* Banka Hesapları */}
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Banka Mevduatı</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200">
              <Landmark className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            ₺{totalBankBalances.toLocaleString('tr-TR')}
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
            <span>4 Ticari Hesap</span>
            <span className="text-emerald-700 font-bold">256-Bit E-Banka</span>
          </div>
        </div>

        {/* Cari Alacaklar */}
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cari Alacaklar</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            ₺{totalReceivables.toLocaleString('tr-TR')}
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
            <span>5 Şantiye / Firma</span>
            <span className="text-red-700 font-bold">1 Vadesi Geçti</span>
          </div>
        </div>
      </div>

      {/* Finance Sub Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: 'cheques', label: 'Alınan Çekler Portföyü', count: cheques.length },
            { id: 'cash', label: 'Nakit Kasa Defteri', count: cashTransactions.length },
            { id: 'receivables', label: 'Cari Hesaplar & Tahsilat', count: receivables.length },
            { id: 'banks', label: 'Banka Hesapları & IBAN', count: bankAccounts.length },
          ].map(sub => (
            <button
              key={sub.id}
              onClick={() => setFinanceSubTab(sub.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                financeSubTab === sub.id
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{sub.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                financeSubTab === sub.id ? 'bg-black/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {sub.count}
              </span>
            </button>
          ))}
        </div>

        {/* Sub-actions */}
        <div className="flex items-center gap-2">
          {financeSubTab === 'cheques' && (
            <button
              onClick={() => setNewChequeModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Yeni Çek Girişi</span>
            </button>
          )}
          {financeSubTab === 'cash' && (
            <button
              onClick={() => setNewCashModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nakit İşlem Ekle</span>
            </button>
          )}
        </div>
      </div>

      {/* ── SUBTAB 1: ALINAN ÇEKLER PORTFÖYÜ ── */}
      {financeSubTab === 'cheques' && (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          {/* Cheques Header & Filters */}
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/60">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {['Tümü', 'Portföyde', 'Tahsilde', 'Tahsil Edildi'].map(st => (
                  <button
                    key={st}
                    onClick={() => setChequeFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      chequeFilter === st
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 gap-2 w-64 focus-within:border-red-500">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={chequeSearch}
                onChange={e => setChequeSearch(e.target.value)}
                placeholder="Keşideci, çek no, banka ara..."
                className="bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-none w-full"
              />
            </div>
          </div>

          {/* Cheques Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Çek No</th>
                  <th className="p-4">Keşideci Firma & Makina</th>
                  <th className="p-4">Banka & Şube</th>
                  <th className="p-4">Vade Tarihi</th>
                  <th className="p-4">Tutar (₺)</th>
                  <th className="p-4">Durum</th>
                  <th className="p-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCheques.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">
                      Filtreye uygun çek kaydı bulunamadı.
                    </td>
                  </tr>
                ) : (
                  filteredCheques.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-4 font-mono font-bold text-red-600">{c.id}</td>
                      <td className="p-4">
                        <strong className="block text-slate-900 text-xs font-bold">{c.drawer}</strong>
                        <span className="text-[11px] text-slate-500">{c.machine} • {c.desc}</span>
                      </td>
                      <td className="p-4 text-slate-700 font-medium">{c.bank}</td>
                      <td className="p-4 font-mono text-slate-900 font-semibold">{c.dueDate}</td>
                      <td className="p-4 font-mono font-black text-slate-900 text-sm">
                        ₺{c.amount.toLocaleString('tr-TR')}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                          c.status === 'Tahsil Edildi' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          c.status === 'Tahsilde' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {c.status === 'Portföyde' && (
                            <button
                              onClick={() => {
                                setCheques(prev => prev.map(item => item.id === c.id ? { ...item, status: 'Tahsilde' } : item));
                                if (showToast) showToast(`${c.id} nolu çek bankaya tahsile verildi!`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-[11px] border border-amber-200 transition"
                              title="Bankaya Tahsile Gönder"
                            >
                              Tahsile Ver
                            </button>
                          )}
                          {c.status !== 'Tahsil Edildi' && (
                            <button
                              onClick={() => {
                                if (onCollectCheque) {
                                  onCollectCheque(c);
                                } else {
                                  setCheques(prev => prev.map(item => item.id === c.id ? { ...item, status: 'Tahsil Edildi' } : item));
                                  if (showToast) showToast(`${c.id} nolu çek başarıyla tahsil edildi!`);
                                }
                              }}
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] border border-emerald-200 transition"
                              title="Çeki Tahsil Edildi Olarak İşle (Banka Hesabına Aktar)"
                            >
                              Tahsil Et
                            </button>
                          )}
                          {isSuperAdmin && (
                            <button
                              onClick={() => setDeleteConfirmModal({ type: 'cheque', id: c.id, title: `${c.id} - ${c.drawer}` })}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition"
                              title="Çeki Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── SUBTAB 2: KASA & NAKİT DEFTERİ ── */}
      {financeSubTab === 'cash' && (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Banknote className="w-4 h-4 text-emerald-600" />
                Günlük Kasa Hareketleri & Şantiye Tahsilatları
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Mevcut Nakit Kasa: ₺{totalCashBalance.toLocaleString('tr-TR')}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Fiş / No</th>
                  <th className="p-4">Tarih</th>
                  <th className="p-4">Kategori & Açıklama</th>
                  <th className="p-4">İlgili Firma / Şantiye</th>
                  <th className="p-4">İşlem Türü</th>
                  <th className="p-4 text-right">Tutar (₺)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cashTransactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 font-mono font-bold text-slate-500">{tx.id}</td>
                    <td className="p-4 font-mono text-slate-600">{tx.date}</td>
                    <td className="p-4">
                      <strong className="block text-slate-900 text-xs">{tx.category}</strong>
                      <span className="text-[11px] text-slate-500">{tx.desc}</span>
                    </td>
                    <td className="p-4 text-slate-800 font-medium">{tx.client}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        tx.type === 'in' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {tx.type === 'in' ? '+ Giriş (Tahsilat)' : '- Çıkış (Gider)'}
                      </span>
                    </td>
                    <td className={`p-4 text-right font-mono font-black text-sm ${
                      tx.type === 'in' ? 'text-emerald-700' : 'text-red-700'
                    }`}>
                      {tx.type === 'in' ? '+' : '-'}₺{tx.amount.toLocaleString('tr-TR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── SUBTAB 3: CARİ HESAPLAR & TAHSİLAT MATRİSİ ── */}
      {financeSubTab === 'receivables' && (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Receipt className="w-4 h-4 text-amber-600" />
                Müşteri Cari Alacakları & Tahsilat Matrisi
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Toplam Açık Alacak: ₺{totalReceivables.toLocaleString('tr-TR')}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Müşteri / Firma</th>
                  <th className="p-4">İş Makinası / Servis</th>
                  <th className="p-4">Faturalanan</th>
                  <th className="p-4">Tahsil Edilen</th>
                  <th className="p-4">Kalan Bakiye</th>
                  <th className="p-4">Vade Tarihi</th>
                  <th className="p-4">Durum</th>
                  <th className="p-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {receivables.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4">
                      <strong className="block text-slate-900 text-xs">{r.client}</strong>
                      <span className="text-[10px] text-slate-400 font-mono">{r.id}</span>
                    </td>
                    <td className="p-4 text-slate-700 font-medium">{r.machine}</td>
                    <td className="p-4 font-mono text-slate-600 font-bold">₺{r.totalBilled.toLocaleString('tr-TR')}</td>
                    <td className="p-4 font-mono text-emerald-700 font-bold">₺{r.collected.toLocaleString('tr-TR')}</td>
                    <td className="p-4 font-mono text-slate-900 font-black text-sm">
                      {r.balance > 0 ? `₺${r.balance.toLocaleString('tr-TR')}` : '0 ₺ (Kapandı)'}
                    </td>
                    <td className="p-4 font-mono text-slate-600">{r.dueDate}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                        r.status === 'Vadesi Geçti' ? 'bg-red-50 text-red-700 border border-red-200' :
                        r.status === 'Vadesi Yaklaştı' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        r.status === 'Tamamlandı' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {r.balance > 0 && (
                        <button
                          onClick={() => {
                            setCollectReceivableModal(r);
                            setCollectAmount(r.balance.toString());
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-sm"
                        >
                          Tahsilat Al
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── SUBTAB 4: BANKA HESAPLARI & IBAN BİLGİLERİ ── */}
      {financeSubTab === 'banks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bankAccounts.map(bank => (
            <div key={bank.id} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{bank.name}</h4>
                      <span className="text-[11px] text-slate-500">{bank.type}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Aktif
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 my-4 flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] text-slate-500 block font-bold uppercase">IBAN NUMARASI</span>
                    <span className="font-mono text-xs text-slate-900 font-bold tracking-wide truncate block">{bank.iban}</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(bank.iban);
                      if (showToast) showToast(`${bank.name} IBAN kopyalandı!`);
                    }}
                    className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition shrink-0 shadow-sm"
                    title="IBAN Kopyala"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Hesap Bakiyesi:</span>
                <span className="font-mono text-lg font-black text-emerald-700">
                  ₺{bank.balance.toLocaleString('tr-TR')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
