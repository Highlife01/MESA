import React, { useState } from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { 
  Wrench, Truck, ShieldAlert, Phone, MessageSquare, MapPin, Navigation, 
  Clock, CheckCircle2, AlertTriangle, User, Building2, FileText, DollarSign, 
  Package, Calendar, Users, BarChart3, Globe, Settings, ChevronRight, 
  Search, Plus, Filter, Camera, Mic, Volume2, ArrowRight, Check, X, 
  CreditCard, PieChart, Activity, QrCode, Send, Eye, Edit, Trash2, Layers,
  Bell, HelpCircle, ArrowUpRight, Zap, RefreshCw, Printer, ShieldCheck, ArrowLeft
} from 'lucide-react';

export function DashboardPage() {
  const [serviceRequests, setServiceRequests] = useState([
    { id: 'MS-2026-00128', customer: 'ABC İnşaat', machine: 'JCB 3CX', issue: 'Hidrolik kaldırmıyor', location: 'Seyhan / Adana', lat: 37.0, lng: 35.32, priority: 'Acil', status: 'Yeni', time: '14:42', phone: '0532 555 0128', hours: '8421 saat', assignedTo: null },
    { id: 'MS-2026-00129', customer: 'Kaya Hafriyat', machine: 'CAT 428F', issue: 'Motor arızası / Hararet', location: 'Ceyhan / Adana', lat: 37.02, lng: 35.81, priority: 'Normal', status: 'Atandı', time: '13:10', phone: '0533 444 5566', hours: '6120 saat', assignedTo: 'Mehmet Usta' },
    { id: 'MS-2026-00130', customer: 'Çukurova Beton', machine: 'Manitou MT1440', issue: 'Teleskopik bom sıkıştı', location: 'Yüreğir / Adana', lat: 36.98, lng: 35.35, priority: 'Acil', status: 'Serviste', time: '11:25', phone: '0542 111 2233', hours: '4200 saat', assignedTo: 'Ahmet Usta' }
  ]);

  const [technicians, setTechnicians] = useState([
    { id: 1, name: 'Mehmet Usta', status: 'Boş', distance: '6.4 km', vehicle: '01 MSA 01', phone: '0505 123 4567', lat: 37.05, lng: 35.30 },
    { id: 2, name: 'Ahmet Usta', status: 'Serviste', distance: '3.1 km', vehicle: '01 MSA 02', phone: '0505 987 6543', lat: 36.99, lng: 35.34 },
    { id: 3, name: 'Hasan Usta', status: 'Boş', distance: '12.8 km', vehicle: '01 MSA 03', phone: '0505 456 7890', lat: 37.10, lng: 35.20 }
  ]);

  const [vehicles, setVehicles] = useState([
    { plate: '01 MSA 01', model: 'Ford Transit', km: '142.800', driver: 'Mehmet Yılmaz', status: 'Serviste', location: 'Ceyhan', fuel: '%54', lat: 37.02, lng: 35.81 },
    { plate: '01 MSA 02', model: 'Ford Transit', km: '98.400', driver: 'Ahmet Demir', status: 'Boş', location: 'Merkez Atölye', fuel: '%82', lat: 37.00, lng: 35.32 },
    { plate: '01 MSA 03', model: 'Renault Master', km: '210.500', driver: 'Can Polat', status: 'Yolda', location: 'Tarsus', fuel: '%25', lat: 36.92, lng: 34.88 }
  ]);

  const [inventory, setInventory] = useState([
    { id: 1, name: 'JCB Hidrolik Filtre', brand: 'JCB', oem: '32/925682', shelf: 'Raf A-3', minStock: 5, currentStock: 3, buy: 1200, sell: 1850 },
    { id: 2, name: 'Hidrolik Hortum 1 inch', brand: 'Parker', oem: 'PRK-882', shelf: 'Raf B-1', minStock: 20, currentStock: 12, buy: 2500, sell: 4500 },
    { id: 3, name: 'Hidrolik Yağ 46 Numara', brand: 'Mobil', oem: 'MOBIL-46', shelf: 'Varil 2', minStock: 100, currentStock: 60, buy: 2000, sell: 3200 },
    { id: 4, name: 'CAT Enjektör', brand: 'Caterpillar', oem: 'CAT-224', shelf: 'Raf C-4', minStock: 4, currentStock: 6, buy: 14000, sell: 19500 }
  ]);

  const [customers, setCustomers] = useState([
    { id: 1, name: 'ABC İnşaat Ltd. Şti.', contact: 'Ahmet Kaya', phone: '0532 555 0128', email: 'info@abcinsaat.com', address: 'Seyhan OSB Adana', totalServices: 32, revenue: 786000, collected: 621000, balance: 165000 },
    { id: 2, name: 'Kaya Hafriyat', contact: 'Mehmet Kaya', phone: '0533 444 5566', email: 'kayahafriyat@gmail.com', address: 'Ceyhan Yolu 12. Km', totalServices: 14, revenue: 310000, collected: 310000, balance: 0 },
    { id: 3, name: 'Çukurova Beton', contact: 'Hakan Çelik', phone: '0542 111 2233', email: 'hakan@cukurovabeton.com', address: 'Yüreğir Sanayi Sitesi', totalServices: 19, revenue: 520000, collected: 450000, balance: 70000 }
  ]);

  const [inboxMessages, setInboxMessages] = useState([
    { id: 1, type: 'Arıza', channel: 'Web', sender: 'ABC İnşaat', text: 'JCB 3CX hidrolik kaldırmıyor acil destek.', time: '14:42', status: 'Okunmadı' },
    { id: 2, type: 'WhatsApp', channel: 'WhatsApp', sender: 'Kaya Hafriyat', text: 'Usta yarın periyodik bakım için gelebilir misiniz?', time: '13:15', status: 'Okundu' },
    { id: 3, type: 'Teklif', channel: 'Portal', sender: 'Çukurova Beton', text: 'Manitou şanzıman revizyonu fiyat teklifi istiyoruz.', time: '10:04', status: 'Atandı' }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, text: '⚡ Yeni Acil Servis Talebi: ABC İnşaat (JCB 3CX) - 11 km', time: '2 dk önce', read: false },
    { id: 2, text: '🚐 01 MESA 03 aracının bakımı 800 km sonra.', time: '15 dk önce', read: false }
  ]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <SEO 
        title="ERP Yönetim Paneli | Servis & Saha Kontrol"
        description="Mesa İş Makinaları teknik servis yönetimi, saha filo GPS takibi, iş emirleri ve stok kontrol ERP paneli."
        canonical="/panel"
      />
      <ManagementDashboard
        serviceRequests={serviceRequests}
        setServiceRequests={setServiceRequests}
        technicians={technicians}
        vehicles={vehicles}
        inventory={inventory}
        customers={customers}
        inboxMessages={inboxMessages}
        notifications={notifications}
        onSwitchToWeb={() => window.location.href = '/'}
      />
    </div>
  );
}

function ManagementDashboard({ serviceRequests, setServiceRequests, technicians, vehicles, inventory, customers, inboxMessages, notifications, onSwitchToWeb }) {
  const [activeSubMenu, setActiveSubMenu] = useState('overview'); // 'overview', 'ariza-merkezi', 'servisler', 'harita', 'araclar', 'makineler', 'crm', 'stok', 'muhasebe', 'inbox', 'raporlar'

  return (
    <div className="flex-1 flex bg-slate-100 text-slate-800 min-h-screen">
      {/* Sidebar Menu */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden lg:flex shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-500 text-white font-black p-1.5 rounded-lg text-sm shadow-xs">MESA</span>
            <span className="font-extrabold text-slate-900 text-sm tracking-tight">ERP CONTROL</span>
          </div>
          <button onClick={onSwitchToWeb} title="Web Sitesine Dön" className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer">
            <Globe className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 text-xs font-semibold">
          <SidebarItem active={activeSubMenu === 'overview'} onClick={() => setActiveSubMenu('overview')} icon={<HomeIcon className="w-4 h-4" />} label="Dashboard" />
          <SidebarItem active={activeSubMenu === 'ariza-merkezi'} onClick={() => setActiveSubMenu('ariza-merkezi')} icon={<ShieldAlert className="w-4 h-4 text-red-600" />} label="Arıza Merkezi" badge="4" />
          <SidebarItem active={activeSubMenu === 'servisler'} onClick={() => setActiveSubMenu('servisler')} icon={<Wrench className="w-4 h-4" />} label="Servis Yönetimi" />
          <SidebarItem active={activeSubMenu === 'harita'} onClick={() => setActiveSubMenu('harita')} icon={<MapPin className="w-4 h-4 text-emerald-600" />} label="Canlı Harita" />
          <SidebarItem active={activeSubMenu === 'araclar'} onClick={() => setActiveSubMenu('araclar')} icon={<Truck className="w-4 h-4" />} label="Servis Araçları" />
          <SidebarItem active={activeSubMenu === 'makineler'} onClick={() => setActiveSubMenu('makineler')} icon={<Layers className="w-4 h-4" />} label="İş Makineleri & QR" />
          <SidebarItem active={activeSubMenu === 'crm'} onClick={() => setActiveSubMenu('crm')} icon={<Users className="w-4 h-4" />} label="Müşteriler / CRM" />
          <SidebarItem active={activeSubMenu === 'stok'} onClick={() => setActiveSubMenu('stok')} icon={<Package className="w-4 h-4 text-amber-600" />} label="Ana Depo & Araç Stok" />
          <SidebarItem active={activeSubMenu === 'muhasebe'} onClick={() => setActiveSubMenu('muhasebe')} icon={<DollarSign className="w-4 h-4 text-emerald-600" />} label="Muhasebe & Cari" />
          <SidebarItem active={activeSubMenu === 'inbox'} onClick={() => setActiveSubMenu('inbox')} icon={<MessageSquare className="w-4 h-4 text-blue-600" />} label="MESA Inbox (WhatsApp)" badge="3" />
          <SidebarItem active={activeSubMenu === 'raporlar'} onClick={() => setActiveSubMenu('raporlar')} icon={<BarChart3 className="w-4 h-4" />} label="Raporlama Merkezi" />
        </div>

        <div className="p-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between bg-slate-50/50">
          <span className="font-semibold">Yönetici: Ozan MESA</span>
          <Settings className="w-4 h-4 hover:text-slate-950 cursor-pointer" />
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center space-x-3">
            <span className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
              {activeSubMenu === 'overview' && 'MESA Control Center & Canlı Operasyon'}
              {activeSubMenu === 'ariza-merkezi' && 'Arıza Bildirimleri & Akıllı Atama'}
              {activeSubMenu === 'servisler' && 'Servis Yönetimi & İş Emirleri'}
              {activeSubMenu === 'harita' && 'Canlı Filo & Saha Haritası'}
              {activeSubMenu === 'araclar' && 'Servis Araçları & GPS Takibi'}
              {activeSubMenu === 'makineler' && 'İş Makineleri Kartları & QR Etiketler'}
              {activeSubMenu === 'crm' && 'Müşteri CRM & Cari Hesaplar'}
              {activeSubMenu === 'stok' && 'Ana Depo & Servis Aracı Envanteri'}
              {activeSubMenu === 'muhasebe' && 'Muhasebe & Finansal Akış'}
              {activeSubMenu === 'inbox' && 'MESA Inbox (Web + WhatsApp + Portal)'}
              {activeSubMenu === 'raporlar' && 'Yönetici Raporlama & KPI Merkezi'}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono font-semibold">
              <span className="text-emerald-700">12 Eylül 2026</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-700">14:50</span>
            </div>

            <div className="relative">
              <button onClick={() => alert("Bildirimler: 2 acil servis atama bekliyor.")} className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200 relative transition cursor-pointer">
                <Bell className="w-4 h-4 text-amber-600" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-xs">4</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Views */}
        <div className="p-6 flex-1 space-y-6">
          {activeSubMenu === 'overview' && (
            <>
              {/* Smart Alerts Banner */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4.5 flex flex-col space-y-2 text-xs text-amber-900 shadow-xs">
                <div className="font-extrabold flex items-center text-amber-950">
                  <AlertTriangle className="w-4 h-4 mr-2 text-amber-600" /> AKILLI SİSTEM UYARILARI & KRİTİK BİLDİRİMLER
                </div>
                <ul className="list-disc list-inside space-y-1 text-amber-900/90 font-medium">
                  <li>🔴 2 acil servis henüz personele atanmadı (ABC İnşaat & Çukurova Beton).</li>
                  <li>⚠️ 01 MESA 03 aracının bakımı 800 km sonra yapılmalı.</li>
                  <li>⚠️ ABC İnşaat'ın 165.000 TL bakiyesi 18 gündür ödenmedi.</li>
                  <li>🔴 Hidrolik filtre stoğu (Mevcut: 3) minimum seviyenin altında!</li>
                </ul>
              </div>

              {/* Top Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <DashboardCard title="Aktif Servis" value="8" color="text-amber-600" icon={<Wrench className="w-5 h-5 text-amber-500" />} />
                <DashboardCard title="Yeni Arıza" value="4" color="text-red-600" icon={<ShieldAlert className="w-5 h-5 text-red-500" />} />
                <DashboardCard title="Yoldaki Ekip" value="3" color="text-blue-600" icon={<Truck className="w-5 h-5 text-blue-500" />} />
                <DashboardCard title="Parça Bekliyor" value="2" color="text-purple-600" icon={<Package className="w-5 h-5 text-purple-500" />} />
                <DashboardCard title="Bugünkü Ciro" value="₺185.250" color="text-emerald-700" icon={<DollarSign className="w-5 h-5 text-emerald-600" />} />
                <DashboardCard title="Bekleyen Tahsilat" value="₺420.800" color="text-amber-800" icon={<CreditCard className="w-5 h-5 text-amber-600" />} />
              </div>

              {/* Canlı Harita ve Son Arızalar */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-extrabold text-sm text-slate-900 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-emerald-600" /> CANLI SERVİS HARİTASI & FİLO KONUMLARI
                    </h3>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold font-mono">GPS Aktif</span>
                  </div>

                  {/* Simulated Map Container */}
                  <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 h-72 sm:h-96 relative overflow-hidden flex items-center justify-center shadow-inner">
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]"></div>
                    
                    {/* Simulated Map Markers */}
                    <div className="absolute top-1/4 left-1/3 bg-red-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg flex items-center animate-bounce">
                      🔴 ABC İnşaat (JCB 3CX)
                    </div>
                    <div className="absolute bottom-1/3 right-1/4 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg flex items-center">
                      🔵 Mehmet Usta (01 MSA 01)
                    </div>
                    <div className="absolute top-1/2 right-1/3 bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg flex items-center">
                      🟢 Ahmet Usta (Boş)
                    </div>

                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur border border-slate-200 p-3.5 rounded-2xl text-xs space-y-1.5 shadow-md">
                      <div className="flex items-center space-x-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span><span className="font-semibold text-slate-700">Boş Araçlar (3)</span></div>
                      <div className="flex items-center space-x-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span><span className="font-semibold text-slate-700">Servise Giden (4)</span></div>
                      <div className="flex items-center space-x-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span><span className="font-semibold text-slate-700">Acil Arızalar (2)</span></div>
                    </div>
                  </div>
                </div>

                {/* Son Arızalar */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col shadow-xs">
                  <h3 className="font-extrabold text-sm text-slate-900 mb-4 flex items-center justify-between">
                    <span>SON ARIZALAR</span>
                    <button onClick={() => setActiveSubMenu('ariza-merkezi')} className="text-xs text-amber-600 hover:underline font-bold cursor-pointer">Tümünü Gör</button>
                  </h3>

                  <div className="space-y-3.5 flex-1 overflow-y-auto">
                    {serviceRequests.map((req, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl hover:border-amber-400 transition shadow-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-amber-700 text-xs">{req.customer}</span>
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${req.priority === 'Acil' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'}`}>{req.priority}</span>
                        </div>
                        <p className="text-xs text-slate-900 font-bold mb-1">{req.machine} • {req.issue}</p>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200/70 pt-2 font-medium">
                          <span>📍 {req.location}</span>
                          <button 
                            onClick={() => setActiveSubMenu('ariza-merkezi')}
                            className="text-amber-600 font-bold hover:underline cursor-pointer"
                          >
                            Ata &raquo;
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSubMenu === 'ariza-merkezi' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-lg text-slate-900">🚨 Arıza Bildirimleri & Sevk Merkezi</h3>
                <button onClick={() => alert("Yeni Manuel Arıza Formu açıldı.")} className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center shadow-sm transition cursor-pointer">
                  <Plus className="w-4 h-4 mr-1.5" /> Manuel Arıza Gir
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                    <tr>
                      <th className="p-4">Kayıt No</th>
                      <th className="p-4">Müşteri</th>
                      <th className="p-4">Makine</th>
                      <th className="p-4">Arıza / Şikayet</th>
                      <th className="p-4">Konum</th>
                      <th className="p-4">Öncelik</th>
                      <th className="p-4">Atanan Ekip</th>
                      <th className="p-4">Durum</th>
                      <th className="p-4 text-right">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {serviceRequests.map((r, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="p-4 font-mono font-bold text-amber-700">{r.id}</td>
                        <td className="p-4 font-bold text-slate-900">{r.customer}</td>
                        <td className="p-4 text-slate-700">{r.machine}</td>
                        <td className="p-4 text-slate-700">{r.issue}</td>
                        <td className="p-4 text-slate-500">{r.location}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full font-bold ${r.priority === 'Acil' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>{r.priority}</span>
                        </td>
                        <td className="p-4 font-bold text-amber-800">{r.assignedTo || 'Atanmadı'}</td>
                        <td className="p-4">
                          <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-bold">{r.status}</span>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => alert(`Akıllı Servis Atama: ${r.id} için Mehmet Usta (6.4 km, 01 MSA 01) atandı!`)}
                            className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition cursor-pointer"
                          >
                            Servis Ata
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSubMenu === 'servisler' && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900">🔧 Servis Yönetimi & İş Emirleri</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
                  <span className="text-xs text-slate-500 font-semibold block mb-1">Aktif İş Emri</span>
                  <h4 className="text-xl font-black text-amber-600">#MESA-2026-00128</h4>
                  <p className="text-xs font-bold text-slate-800 mt-2">ABC İnşaat • JCB 3CX (8.421 saat)</p>
                  <p className="text-xs text-slate-600 mt-1">Şikayet: Bom kaldırmıyor.</p>
                  <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between text-xs items-center">
                    <span className="text-emerald-700 font-bold">Teknisyen: Mehmet Usta</span>
                    <button onClick={() => alert("İş Emri Detayı açıldı.")} className="text-amber-600 font-bold hover:underline cursor-pointer">Detay &raquo;</button>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
                  <span className="text-xs text-slate-500 font-semibold block mb-1">Parça & İşçilik Özeti</span>
                  <h4 className="text-xl font-black text-slate-900">₺16.700 + KDV</h4>
                  <p className="text-xs font-bold text-slate-800 mt-2">Hidrolik Hortum (2 adet) + Yağ</p>
                  <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between text-xs items-center">
                    <span className="text-purple-700 font-bold">Müşteri Onayı: Alındı ✓</span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-semibold block mb-1">PDF Servis Raporu</span>
                    <h4 className="text-lg font-bold text-slate-900">Otomatik WhatsApp Raporu</h4>
                    <p className="text-xs text-slate-600 mt-1">Servis sonrası fotoğraf ve imzalı PDF iletildi.</p>
                  </div>
                  <button onClick={() => alert("MESA Teknik Servis Raporu PDF olarak indirildi ve WhatsApp üzerinden müşteriye gönderildi.")} className="mt-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs shadow-sm transition cursor-pointer">
                    PDF Raporu İndir & Gönder
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSubMenu === 'harita' && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900">📍 Canlı Saha & Araç Takip Haritası</h3>
              <div className="bg-white border border-slate-200 rounded-3xl p-6 h-[500px] flex flex-col items-center justify-center relative overflow-hidden shadow-xs">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]"></div>
                <div className="text-center space-y-3 z-10">
                  <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto text-2xl font-bold animate-pulse shadow-inner">
                    🗺️
                  </div>
                  <h4 className="text-xl font-black text-slate-900">GPS Harita Modülü Aktif</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto font-medium">Adana bölgesi genelinde 18 mobil servis aracının anlık konumları, rölanti süreleri ve güzergâh geçmişleri harita üzerinde takip edilmektedir.</p>
                </div>
              </div>
            </div>
          )}

          {activeSubMenu === 'araclar' && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900">🚚 Servis Araçları & Envanterleri</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {vehicles.map((v, i) => (
                  <div key={i} className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-extrabold text-amber-700 text-sm bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">{v.plate}</span>
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold">{v.status}</span>
                    </div>
                    <p className="text-xs text-slate-800 font-bold">{v.model} • Şoför: {v.driver}</p>
                    <div className="text-xs text-slate-600 space-y-1 font-medium">
                      <div>Kilometre: <span className="text-slate-900 font-bold">{v.km} km</span></div>
                      <div>Konum: <span className="text-slate-900 font-bold">{v.location}</span></div>
                      <div>Yakıt Seviyesi: <span className="text-amber-700 font-bold">{v.fuel}</span></div>
                    </div>
                    <button onClick={() => alert(`Araç İçi Envanter: ${v.plate} aracında 12 adet hidrolik hortum, 48 rekor, 60 lt yağ mevcuttur.`)} className="w-full bg-slate-100 hover:bg-slate-200 text-xs text-slate-800 font-bold py-2.5 rounded-xl transition cursor-pointer">
                      Araç İçi Parça Stoğu Göster
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubMenu === 'makineler' && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900">🚜 Müşteri İş Makineleri Kartları & QR Kod</h3>
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Makine ID: #00285 — JCB 3CX (ABC İnşaat)</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Model: 2021 • Çalışma: 8.421 saat • Seri No: JCB3CX88921</p>
                  </div>
                  <button onClick={() => alert("MESA QR Etiketi Yazdırılıyor...")} className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center shadow-sm transition cursor-pointer">
                    <QrCode className="w-4 h-4 mr-2" /> QR Etiket Yazdır
                  </button>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <span className="text-xs font-bold text-slate-700 block mb-3">Servis Geçmişi:</span>
                  <div className="space-y-2.5 text-xs">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex justify-between items-center">
                      <span className="text-amber-800 font-bold">12.09.2026 - Hidrolik Pompa Değişimi</span>
                      <span className="text-slate-500 font-medium">Mehmet Usta (59.000 TL)</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex justify-between items-center">
                      <span className="text-amber-800 font-bold">18.06.2026 - Diferansiyel Bakımı</span>
                      <span className="text-slate-500 font-medium">Ahmet Usta (24.500 TL)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubMenu === 'crm' && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900">👥 Müşteri CRM & Cari Hesaplar</h3>
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                    <tr>
                      <th className="p-4">Firma Adı</th>
                      <th className="p-4">Yetkili</th>
                      <th className="p-4">Telefon</th>
                      <th className="p-4">Toplam Servis</th>
                      <th className="p-4">Toplam Ciro</th>
                      <th className="p-4">Açık Bakiye</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {customers.map((c, i) => (
                      <tr key={i} className="hover:bg-slate-50/80">
                        <td className="p-4 font-bold text-slate-900">{c.name}</td>
                        <td className="p-4 text-slate-700">{c.contact}</td>
                        <td className="p-4 text-slate-500">{c.phone}</td>
                        <td className="p-4 text-amber-700 font-bold">{c.totalServices} adet</td>
                        <td className="p-4 font-bold text-slate-900">₺{c.revenue.toLocaleString()}</td>
                        <td className="p-4 text-red-600 font-extrabold">₺{c.balance.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSubMenu === 'stok' && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900">📦 Ana Depo & Parça Yönetimi</h3>
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                    <tr>
                      <th className="p-4">Ürün Adı</th>
                      <th className="p-4">Marka</th>
                      <th className="p-4">OEM Kodu</th>
                      <th className="p-4">Raf</th>
                      <th className="p-4">Mevcut / Min</th>
                      <th className="p-4">Satış Fiyatı</th>
                      <th className="p-4">Durum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {inventory.map((item, i) => (
                      <tr key={i} className="hover:bg-slate-50/80">
                        <td className="p-4 font-bold text-slate-900">{item.name}</td>
                        <td className="p-4 text-slate-700">{item.brand}</td>
                        <td className="p-4 font-mono text-slate-500">{item.oem}</td>
                        <td className="p-4 text-slate-700">{item.shelf}</td>
                        <td className="p-4 font-bold text-amber-700">{item.currentStock} / {item.minStock}</td>
                        <td className="p-4 font-bold text-slate-900">₺{item.sell.toLocaleString()}</td>
                        <td className="p-4">
                          {item.currentStock <= item.minStock ? (
                            <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-bold">🔴 KRİTİK STOK</span>
                          ) : (
                            <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold">Yeterli</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSubMenu === 'muhasebe' && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900">💳 Muhasebe & Kasa / Banka Modülü</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
                  <span className="text-xs text-slate-500 font-semibold block">Bugünkü Tahsilat</span>
                  <h4 className="text-2xl font-black text-emerald-700 mt-1">₺142.000</h4>
                  <p className="text-xs text-slate-500 mt-2 font-medium">Merkez Kasa + POS</p>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
                  <span className="text-xs text-slate-500 font-semibold block">Bugünkü Giderler</span>
                  <h4 className="text-2xl font-black text-red-600 mt-1">₺47.800</h4>
                  <p className="text-xs text-slate-500 mt-2 font-medium">Yedek parça & akaryakıt</p>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
                  <span className="text-xs text-slate-500 font-semibold block">Net Nakit Akışı</span>
                  <h4 className="text-2xl font-black text-amber-700 mt-1">+₺94.200</h4>
                  <p className="text-xs text-slate-500 mt-2 font-medium">Günlük net bakiye</p>
                </div>
              </div>
            </div>
          )}

          {activeSubMenu === 'inbox' && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900">💬 MESA Inbox (Web Formu + WhatsApp + Portal)</h3>
              <div className="bg-white border border-slate-200 rounded-3xl divide-y divide-slate-100 shadow-xs overflow-hidden">
                {inboxMessages.map((m, i) => (
                  <div key={i} className="p-5 flex items-center justify-between hover:bg-slate-50 transition">
                    <div>
                      <div className="flex items-center space-x-2.5 mb-1.5">
                        <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full">{m.channel}</span>
                        <span className="font-extrabold text-slate-900 text-xs">{m.sender}</span>
                        <span className="text-slate-400 text-[10px] font-semibold">{m.time}</span>
                      </div>
                      <p className="text-xs text-slate-700 font-medium">{m.text}</p>
                    </div>
                    <button onClick={() => alert(`Mesaj yanıtlandı: ${m.sender}`)} className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-xs transition cursor-pointer">
                      Cevapla &raquo;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubMenu === 'raporlar' && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900">📊 Yönetici Raporlama & KPI Merkezi</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
                  <h4 className="font-extrabold text-slate-900 text-sm mb-4">Teknisyen Performans KPI</h4>
                  <div className="space-y-3 text-xs text-slate-700 font-semibold">
                    <div className="flex justify-between pb-2 border-b border-slate-100"><span>Mehmet Usta:</span><span className="text-emerald-700 font-bold">18 Tamamlanan Servis (Ort. 42 dk)</span></div>
                    <div className="flex justify-between"><span>Ahmet Usta:</span><span className="text-amber-700 font-bold">14 Tamamlanan Servis (Ort. 51 dk)</span></div>
                  </div>
                </div>
                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
                  <h4 className="font-extrabold text-slate-900 text-sm mb-4">En Çok Arıza Veren Modeller</h4>
                  <div className="space-y-3 text-xs text-slate-700 font-semibold">
                    <div className="flex justify-between pb-2 border-b border-slate-100"><span>JCB 3CX Hidrolik:</span><span className="text-red-600 font-bold">34 Arıza</span></div>
                    <div className="flex justify-between"><span>CAT 428F Motor:</span><span className="text-amber-700 font-bold">19 Arıza</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function DashboardCard({ title, value, color, icon }) {
  return (
    <div className="bg-white border border-slate-200 p-5 rounded-3xl flex flex-col justify-between shadow-xs hover:shadow-md transition">
      <div className="flex items-center justify-between text-slate-500 mb-2">
        <span className="text-xs font-bold">{title}</span>
        {icon}
      </div>
      <div className={`text-xl sm:text-2xl font-black ${color}`}>{value}</div>
    </div>
  );
}

function SidebarItem({ active, onClick, icon, label, badge }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition cursor-pointer ${active ? 'bg-amber-500 text-white font-bold shadow-md shadow-amber-500/25' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
    >
      <div className="flex items-center space-x-3">
        {icon}
        <span>{label}</span>
      </div>
      {badge && (
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${active ? 'bg-white text-amber-700 shadow-xs' : 'bg-red-600 text-white'}`}>{badge}</span>
      )}
    </button>
  );
}

function HomeIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  );
}

// ==========================================
// 7. TEKNİSYEN MOBİL EKRANI / PWA (Açık Tema)
// ==========================================
