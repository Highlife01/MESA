import React, { useState } from 'react';
import { 
  MapPin, MessageSquare, Fuel, Thermometer, Gauge, Search, Phone 
} from 'lucide-react';

export function FleetTab({ fleetVehicles = [], extraTechs = [] }) {
  const allVehicles = [...fleetVehicles, ...extraTechs];
  const [fleetFilter, setFleetFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVehicles = allVehicles.filter(v => {
    const matchesFilter = fleetFilter === 'all' || v.status === fleetFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      v.id.toLowerCase().includes(q) || 
      v.tech.toLowerCase().includes(q) || 
      v.location.toLowerCase().includes(q) ||
      v.type.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Fleet Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button
          onClick={() => setFleetFilter('all')}
          className={`border p-4 rounded-2xl text-center transition shadow-sm cursor-pointer ${
            fleetFilter === 'all' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className={`text-2xl font-black font-mono ${fleetFilter === 'all' ? 'text-white' : 'text-slate-900'}`}>
            {allVehicles.length}
          </span>
          <span className={`text-[10px] block mt-1 font-bold ${fleetFilter === 'all' ? 'text-slate-300' : 'text-slate-500'}`}>
            Tüm Mobil Filo
          </span>
        </button>

        <button
          onClick={() => setFleetFilter('Sahada')}
          className={`border p-4 rounded-2xl text-center transition shadow-sm cursor-pointer ${
            fleetFilter === 'Sahada' ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className={`text-2xl font-black font-mono ${fleetFilter === 'Sahada' ? 'text-white' : 'text-red-600'}`}>
            {allVehicles.filter(v => v.status === 'Sahada').length}
          </span>
          <span className={`text-[10px] block mt-1 font-bold ${fleetFilter === 'Sahada' ? 'text-white' : 'text-slate-500'}`}>
            Sahada Müdahalede
          </span>
        </button>

        <button
          onClick={() => setFleetFilter('Müsait')}
          className={`border p-4 rounded-2xl text-center transition shadow-sm cursor-pointer ${
            fleetFilter === 'Müsait' ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className={`text-2xl font-black font-mono ${fleetFilter === 'Müsait' ? 'text-white' : 'text-emerald-600'}`}>
            {allVehicles.filter(v => v.status === 'Müsait').length}
          </span>
          <span className={`text-[10px] block mt-1 font-bold ${fleetFilter === 'Müsait' ? 'text-white' : 'text-slate-500'}`}>
            Nöbetçi / Müsait
          </span>
        </button>

        <button
          onClick={() => setFleetFilter('Merkeze Dönüyor')}
          className={`border p-4 rounded-2xl text-center transition shadow-sm cursor-pointer ${
            fleetFilter === 'Merkeze Dönüyor' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className={`text-2xl font-black font-mono ${fleetFilter === 'Merkeze Dönüyor' ? 'text-white' : 'text-blue-600'}`}>
            {allVehicles.filter(v => v.status === 'Merkeze Dönüyor').length}
          </span>
          <span className={`text-[10px] block mt-1 font-bold ${fleetFilter === 'Merkeze Dönüyor' ? 'text-white' : 'text-slate-500'}`}>
            Dönüş Yolunda
          </span>
        </button>
      </div>

      {/* Fleet Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Plaka, usta adı veya konum ara..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-red-500 transition"
          />
        </div>
        <div className="text-[11px] text-slate-500 font-semibold self-end sm:self-center">
          Gösterilen: <strong>{filteredVehicles.length}</strong> / {allVehicles.length} araç
        </div>
      </div>

      {/* Fleet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredVehicles.map(vehicle => {
          const isActive = vehicle.status === 'Sahada';
          const isMoving = vehicle.speed > 0;
          return (
            <div 
              key={vehicle.id} 
              className={`bg-white border rounded-2xl p-5 transition-all duration-300 shadow-sm ${
                isActive ? 'border-red-300 shadow-md shadow-red-500/10' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-slate-900 text-sm">{vehicle.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      isActive ? 'bg-red-50 text-red-700 border border-red-200'
                      : vehicle.status === 'Müsait' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {vehicle.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">{vehicle.type}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-red-500 animate-pulse' : 'bg-slate-400'}`} />
                  {vehicle.lastPing}
                </div>
              </div>

              {/* Technician */}
              <div className="flex items-center justify-between gap-2 mb-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-red-600 font-black text-xs border border-slate-200">
                    {vehicle.tech.split(' ')[0][0]}
                  </div>
                  <div>
                    <span className="text-slate-900 font-bold block leading-none">{vehicle.tech}</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-red-600" /> {vehicle.location}
                      {isMoving && <span className="text-blue-600 ml-1">• {vehicle.speed} km/h</span>}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${vehicle.phone ? vehicle.phone.replace(/\s+/g, '') : '05335293674'}`}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition flex items-center gap-1 text-[11px] font-bold"
                    title="Ustayla Telefonla Görüş"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-600" />
                  </a>
                  <a
                    href={`https://wa.me/${vehicle.phone ? '90' + vehicle.phone.replace(/[^0-9]/g, '').slice(-10) : '905335293674'}?text=${encodeURIComponent(`Sayın ${vehicle.tech}, MESA ERP Operasyon Merkezi yeni görev talimatı:`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition flex items-center gap-1 text-[11px] font-bold"
                    title="WhatsApp Talimat Gönder"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Talimat</span>
                  </a>
                </div>
              </div>

              {/* Telemetry Gauges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1.5">
                    <span className="flex items-center gap-1"><Fuel className="w-3 h-3 text-slate-400" /> Yakıt</span>
                    <span className={`font-bold ${vehicle.fuel > 50 ? 'text-emerald-700' : vehicle.fuel > 25 ? 'text-amber-700' : 'text-red-700'}`}>
                      %{vehicle.fuel}
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${vehicle.fuel > 50 ? 'bg-emerald-500' : vehicle.fuel > 25 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${vehicle.fuel}%` }}
                    />
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1.5">
                    <span className="flex items-center gap-1"><Thermometer className="w-3 h-3 text-slate-400" /> Motor</span>
                    <span className={`font-bold ${vehicle.temp < 90 ? 'text-emerald-700' : vehicle.temp < 100 ? 'text-amber-700' : 'text-red-700'}`}>
                      {vehicle.temp}°C
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${vehicle.temp < 90 ? 'bg-emerald-500' : vehicle.temp < 100 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(vehicle.temp, 120) / 1.2}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
