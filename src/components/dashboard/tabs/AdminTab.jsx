import React from 'react';
import { Crown, Download, LogOut, UserPlus, Phone } from 'lucide-react';

export function AdminTab({
  user,
  logout,
  handleExportJson,
  newTechForm,
  setNewTechForm,
  handleAddTechnician,
  fleetVehicles = [],
  extraTechs = []
}) {
  const allVehicles = [...fleetVehicles, ...extraTechs];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-red-600/30 shrink-0 border border-red-500/40">
              <Crown className="w-8 h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900 truncate">{user?.name || 'Cebrail Kara'}</h3>
                <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-black uppercase">ROOT</span>
              </div>
              <p className="text-xs text-red-600 font-mono mt-0.5">{user?.email || 'cebrailkara@gmail.com'}</p>
              <p className="text-xs text-slate-500 mt-1">Süper Admin & Saha Operasyonları Genel Koordinatörü</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 space-y-2.5 text-xs">
            <div className="flex justify-between items-center text-slate-600">
              <span>Telefon Hattı:</span>
              <a href="tel:05344075585" className="text-red-600 font-mono font-bold hover:underline">0534 407 55 85</a>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Yetki Seviyesi:</span>
              <span className="text-emerald-700 font-bold">Tam Yetki (CRUD + Telematik + Muhasebe)</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Güvenlik Doğrulaması:</span>
              <span className="text-slate-900 font-mono">256-Bit SSL Şifreli</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Sistem Durumu:</span>
              <span className="text-emerald-700 font-mono">Aktif (Root Oturum)</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3">
            <button
              onClick={handleExportJson}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-red-600/30 transition"
            >
              <Download className="w-4 h-4" />
              <span>ERP & Finans Yedeği İndir (JSON)</span>
            </button>
            <button
              onClick={logout}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 text-xs font-bold transition border border-slate-200"
              title="Oturumu Kapat"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Add Technician Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <UserPlus className="w-5 h-5 text-red-600" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">Yeni Usta / Servis Aracı Ekle</h3>
          </div>
          <form onSubmit={handleAddTechnician} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Teknisyen / Usta Adı *</label>
              <input
                type="text"
                required
                placeholder="Örn: Salih Usta"
                value={newTechForm.name}
                onChange={e => setNewTechForm({ ...newTechForm, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Mobil Servis Aracı & Plaka *</label>
              <input
                type="text"
                required
                placeholder="Örn: Ford Transit 4x4 (01 MSA 06)"
                value={newTechForm.vehicle}
                onChange={e => setNewTechForm({ ...newTechForm, vehicle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Uzmanlık Alanı</label>
              <select
                value={newTechForm.specialty}
                onChange={e => setNewTechForm({ ...newTechForm, specialty: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
              >
                <option>Hidrolik & Bom Tamiri</option>
                <option>Powershift Şanzıman & Diferansiyel</option>
                <option>Motor & Common Rail Enjektör</option>
                <option>Elektronik & ECU Teşhis</option>
                <option>Mobil Torna & Şantiye Kaynak</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Görev Bölgesi</label>
              <input
                type="text"
                placeholder="Örn: Ceyhan & Yumurtalık Sahası"
                value={newTechForm.location}
                onChange={e => setNewTechForm({ ...newTechForm, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500 transition"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-red-600/30 transition active:scale-98"
              >
                <UserPlus className="w-4 h-4" />
                <span>Ustayı Filo Sistemine Kaydet</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Registered Technicians List */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            Kayıtlı Saha Filosu & Teknisyenler ({allVehicles.length} Araç)
          </h3>
          <span className="text-xs text-red-600 font-mono font-bold">Nöbetçi Mobil Filo</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allVehicles.map((v, idx) => (
            <div key={idx} className="bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-slate-300 p-4 rounded-2xl flex items-start justify-between gap-3 transition shadow-xs hover:shadow-md">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-red-600">{v.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    v.status === 'Sahada' ? 'bg-red-100 text-red-700' :
                    v.status === 'Müsait' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {v.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-1">{v.tech}</h4>
                <p className="text-[11px] text-slate-500 truncate">{v.type}</p>
                <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-2">
                  <span>📍 {v.location}</span>
                  <span>⛽ %{v.fuel}</span>
                </div>
              </div>
              <a
                href={`https://wa.me/905344075585?text=Merhaba%20${encodeURIComponent(v.tech)},%20MESA%20ERP%20gorev%20talimati.`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 transition"
                title="WhatsApp Talimat Gönder"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
