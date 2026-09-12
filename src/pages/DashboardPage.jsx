import React, { useState, useMemo } from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { 
  Wrench, Truck, ShieldAlert, Phone, MessageSquare, MapPin, Navigation, 
  Clock, CheckCircle2, AlertTriangle, User, Building2, FileText, DollarSign, 
  Package, Calendar, Users, BarChart3, Globe, Settings, ChevronRight, 
  Search, Plus, Filter, Camera, ArrowRight, Check, X, 
  CreditCard, PieChart, Activity, QrCode, Send, Eye, Edit, Trash2, Layers,
  Bell, HelpCircle, ArrowUpRight, Zap, RefreshCw, Printer, ShieldCheck, ArrowLeft,
  Smartphone, Fuel, Gauge, CheckSquare, Download, Hash, Sliders, ChevronDown
} from 'lucide-react';

export function DashboardPage() {
  // -------------------------------------------------------------
  // 1. MASTER STATE
  // -------------------------------------------------------------
  const [activeTab, setActiveTab] = useState('overview');
  const [globalSearch, setGlobalSearch] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Service Requests
  const [serviceRequests, setServiceRequests] = useState([
    { id: 'MS-2026-00128', customer: 'ABC İnşaat Ltd.', machine: 'JCB 3CX Eco', issue: 'Hidrolik ana basınç düşüklüğü / Bom kalkmıyor', location: 'Seyhan / Adana', priority: 'Acil', status: 'Yeni', time: '14:42', phone: '0532 555 0128', hours: '8.420 saat', assignedTo: null, cost: 18500, parts: ['JCB Hidrolik Filtre (x2)', 'Basınç Valfi'] },
    { id: 'MS-2026-00129', customer: 'Kaya Hafriyat & Madencilik', machine: 'CAT 320D Paletli', issue: 'Motor hararet / Karter üflemesi', location: 'Ceyhan Taş Ocağı', priority: 'Kritik', status: 'Atandı', time: '13:10', phone: '0533 444 5566', hours: '6.120 saat', assignedTo: 'Mehmet Usta', cost: 34200, parts: ['CAT C7.1 Enjektör (x1)', 'Termostat Seti'] },
    { id: 'MS-2026-00130', customer: 'Çukurova Hazır Beton', machine: 'Manitou MT-X 1440', issue: 'Teleskopik bom açma zinciri takılması', location: 'Yüreğir Şantiye', priority: 'Acil', status: 'Serviste', time: '11:25', phone: '0542 111 2233', hours: '4.200 saat', assignedTo: 'Ahmet Usta', cost: 12800, parts: ['Bom Kaydırıcı Pabuç', 'Azot Gazı'] },
    { id: 'MS-2026-00131', customer: 'Toros Agrega Sanayi', machine: 'Komatsu PC300-8', issue: 'Kule dönüş freni tutmuyor / Ses var', location: 'İskenderun Liman', priority: 'Normal', status: 'Parça Bekliyor', time: '09:40', phone: '0530 999 8877', hours: '11.500 saat', assignedTo: 'Hasan Usta', cost: 45000, parts: ['Floating Keçe', 'Kule Fren Balatası'] },
    { id: 'MS-2026-00132', customer: 'Özdemir Altyapı A.Ş.', machine: 'Hidromek HMK 102B', issue: 'Powershift şanzıman 2. vitese geçmiyor', location: 'Tarsus Otoyol', priority: 'Normal', status: 'Tamamlandı', time: '08:15', phone: '0535 222 3344', hours: '5.900 saat', assignedTo: 'Ali Usta', cost: 22400, parts: ['Selenoid Bobin Takımı', 'Şanzıman Yağı'] }
  ]);

  // Technicians
  const [technicians, setTechnicians] = useState([
    { id: 1, name: 'Mehmet Usta (Baş Teknisyen)', status: 'Serviste', distance: '4.2 km', vehicle: '01 MSA 01', phone: '0505 123 4567', currentJob: 'CAT 320D Hararet Teşhisi', completedJobs: 342, rating: 4.9 },
    { id: 2, name: 'Ahmet Usta (Hidrolik Uzmanı)', status: 'Serviste', distance: '2.8 km', vehicle: '01 MSA 02', phone: '0505 987 6543', currentJob: 'Manitou MT1440 Bom Zinciri', completedJobs: 418, rating: 5.0 },
    { id: 3, name: 'Hasan Usta (Motor & Şanzıman)', status: 'Yolda', distance: '14.5 km', vehicle: '01 MSA 03', phone: '0505 456 7890', currentJob: 'Komatsu PC300 Kule İncelemesi', completedJobs: 289, rating: 4.8 },
    { id: 4, name: 'Ali Usta (Elektronik & Diagnostik)', status: 'Boşta (Atölye)', distance: '0.0 km', vehicle: '01 MSA 04', phone: '0505 333 4455', currentJob: 'Atölye Test Standı Kalibrasyonu', completedJobs: 512, rating: 4.9 }
  ]);

  // Vehicles (18 Fleet)
  const [vehicles, setVehicles] = useState([
    { plate: '01 MSA 01', model: 'Ford Transit 4x4', km: 142800, driver: 'Mehmet Usta', status: 'Görevde', location: 'Ceyhan Taş Ocağı', fuel: 65, equipment: 'Finn-Power P20 Hortum Presi, Kaeser Vidalı Kompresör', speed: '62 km/s' },
    { plate: '01 MSA 02', model: 'Iveco Daily Yüksek Tavan', km: 98400, driver: 'Ahmet Usta', status: 'Görevde', location: 'Yüreğir Şantiye', fuel: 82, equipment: 'Jeneratörlü Gazaltı Kaynak, 600 Bar Manometre Test Kiti', speed: '0 km/s (Sabit)' },
    { plate: '01 MSA 03', model: 'Isuzu D-Max 4x4 Arazi', km: 210500, driver: 'Hasan Usta', status: 'Yolda', location: 'İskenderun Liman Yolu', fuel: 40, equipment: 'Seyyar Borwerk Tezgahı, CAT ET Diagnostik Laptop', speed: '74 km/s' },
    { plate: '01 MSA 04', model: 'Renault Master Panelvan', km: 64200, driver: 'Ali Usta', status: 'Atölyede Hazır', location: 'Adana Merkez Atölye', fuel: 95, equipment: 'Fluke Osiloskop, CAN-Bus Analizörü, BGA Lehim İstasyonu', speed: '0 km/s (Atölye)' },
    { plate: '01 MSA 05', model: 'Isuzu NPR Vinçli Kurtarıcı', km: 184000, driver: 'Can Polat', status: 'Atölyede Hazır', location: 'Adana Merkez Atölye', fuel: 70, equipment: '3.5 Ton Hidrolik Katlanır Vinç, Kayar Kasa Platformu', speed: '0 km/s (Atölye)' },
    { plate: '01 MSA 06', model: 'Ford Transit Hızlı Müdahale', km: 112000, driver: 'Murat Usta', status: 'Görevde', location: 'Tarsus Otoyol Şantiyesi', fuel: 55, equipment: 'Mobil Yağlama Ünitesi, H-Diag Teşhis Arayüzü', speed: '48 km/s' }
  ]);

  // Inventory
  const [inventory, setInventory] = useState([
    { id: 1, name: 'JCB Orijinal Hidrolik Dönüş Filtresi', brand: 'JCB', oem: '32/925682', shelf: 'Raf A-3', minStock: 5, currentStock: 3, buy: 1250, sell: 1950 },
    { id: 2, name: '4SP 4 Telli Spiral Hidrolik Hortum 1"', brand: 'Parker', oem: 'PRK-882', shelf: 'Hortum Askı B-1', minStock: 50, currentStock: 28, buy: 450, sell: 850 },
    { id: 3, name: 'ISO VG 46 Ağır Hizmet Hidrolik Yağı (Varil)', brand: 'Mobil DTE 25', oem: 'MOB-VG46', shelf: 'Yağ Deposu V-2', minStock: 8, currentStock: 4, buy: 14500, sell: 19800 },
    { id: 4, name: 'CAT C7.1 Common-Rail Enjektör', brand: 'Caterpillar', oem: 'CAT-387-9433', shelf: 'Kilitli Kasa C-1', minStock: 4, currentStock: 6, buy: 16500, sell: 23500 },
    { id: 5, name: 'Komatsu PC200 Cer Redüktör Floating Keçe', brand: 'Komatsu', oem: 'KM-203-27-41120', shelf: 'Raf D-2', minStock: 6, currentStock: 2, buy: 3400, sell: 5200 },
    { id: 6, name: 'Montabert SC-36 Kırıcı Azot Diyafram Membranı', brand: 'Montabert', oem: 'MTB-862214', shelf: 'Raf E-1', minStock: 3, currentStock: 5, buy: 4800, sell: 7200 }
  ]);

  // Customers & B2B
  const [customers, setCustomers] = useState([
    { id: 1, name: 'ABC İnşaat Ltd. Şti.', contact: 'Ahmet Kaya', phone: '0532 555 0128', email: 'ahmet@abcinsaat.com', address: 'Seyhan OSB 12. Cadde Adana', machinesCount: 8, totalServices: 32, revenue: 786000, collected: 621000, balance: 165000 },
    { id: 2, name: 'Kaya Hafriyat & Madencilik', contact: 'Mehmet Kaya', phone: '0533 444 5566', email: 'kayahafriyat@gmail.com', address: 'Ceyhan E-90 Karayolu Üzeri', machinesCount: 14, totalServices: 44, revenue: 940000, collected: 940000, balance: 0 },
    { id: 3, name: 'Çukurova Hazır Beton A.Ş.', contact: 'Hakan Çelik', phone: '0542 111 2233', email: 'hakan@cukurovabeton.com', address: 'Yüreğir Sanayi Bölgesi', machinesCount: 19, totalServices: 58, revenue: 1420000, collected: 1350000, balance: 70000 },
    { id: 4, name: 'Toros Agrega Taş Ocakları', contact: 'Mustafa Erdem', phone: '0530 999 8877', email: 'erdem@torosagrega.com', address: 'İskenderun Demirçelik Mevkii', machinesCount: 11, totalServices: 26, revenue: 630000, collected: 445000, balance: 185000 }
  ]);

  // Machines Database with QR
  const [machines, setMachines] = useState([
    { id: 'MCH-01', customer: 'ABC İnşaat Ltd.', brand: 'JCB', model: '3CX Eco Kazıcı Yükleyici', serial: 'JCB3CX-TR-882194', year: 2022, hours: '8.420 saat', status: 'Serviste', lastService: '12.09.2026' },
    { id: 'MCH-02', customer: 'Kaya Hafriyat', brand: 'Caterpillar', model: '320D Paletli Ekskavatör', serial: 'CAT320D-C7-940122', year: 2020, hours: '6.120 saat', status: 'Serviste', lastService: '12.09.2026' },
    { id: 'MCH-03', customer: 'Çukurova Hazır Beton', brand: 'Manitou', model: 'MT-X 1440 Telehandler', serial: 'MAN-MTX1440-552', year: 2023, hours: '4.200 saat', status: 'Serviste', lastService: '12.09.2026' },
    { id: 'MCH-04', customer: 'Toros Agrega', brand: 'Komatsu', model: 'PC300-8 Ağır Ekskavatör', serial: 'KM-PC300-88402', year: 2019, hours: '11.500 saat', status: 'Bekliyor', lastService: '12.09.2026' },
    { id: 'MCH-05', customer: 'Özdemir Altyapı', brand: 'Hidromek', model: 'HMK 102B Alpha Bekoloder', serial: 'HMK-102B-2021-09', year: 2021, hours: '5.900 saat', status: 'Aktif / Çalışıyor', lastService: '12.09.2026' }
  ]);

  // Inbox & Chat Messages
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Ahmet Kaya (ABC İnşaat)', channel: 'WhatsApp Acil', text: 'Usta JCB 3CX kepçeyi kaldırmıyor, hararet göstergesi yanıp sönüyor. Ceyhan şantiyesindeyiz acil!', time: '14:42', replied: true },
    { id: 2, sender: 'Mehmet Kaya (Kaya Hafriyat)', channel: 'Web Formu', text: 'CAT 320D ekskavatör için 2000 saatlik ağır periyodik bakım randevusu almak istiyoruz.', time: '13:15', replied: false },
    { id: 3, sender: 'Hakan Çelik (Çukurova Beton)', channel: 'Müşteri Portalı', text: 'Geçen haftaki Manitou telehandler fatura dökümünü muhasebe mailimize iletebilir misiniz?', time: '10:04', replied: true }
  ]);
  const [replyText, setReplyText] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Yeni Acil Servis Çağrısı: ABC İnşaat (JCB 3CX)', time: '5 dk önce', read: false },
    { id: 2, text: 'Stok Uyarısı: JCB Hidrolik Filtre kritik seviyenin altında (Mevcut: 3)', time: '20 dk önce', read: false },
    { id: 3, text: 'Mobil Filo 01 MSA 01 Ceyhan şantiyesine vardı (GPS)', time: '40 dk önce', read: true }
  ]);

  // -------------------------------------------------------------
  // 2. MODAL CONTROLS
  // -------------------------------------------------------------
  const [newRequestModal, setNewRequestModal] = useState(false);
  const [assignModal, setAssignModal] = useState(null);
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [newPartModal, setNewPartModal] = useState(false);
  const [newCustomerModal, setNewCustomerModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(null); // customer object
  const [paymentAmount, setPaymentAmount] = useState('');
  const [printOrderModal, setPrintOrderModal] = useState(null); // order object
  const [qrModal, setQrModal] = useState(null); // machine object

  // Form Data
  const [newReqForm, setNewReqForm] = useState({ customer: '', machine: '', issue: '', location: '', priority: 'Acil', phone: '' });
  const [newPartForm, setNewPartForm] = useState({ name: '', brand: '', oem: '', shelf: '', currentStock: 10, minStock: 5, buy: 1000, sell: 1500 });
  const [newCustForm, setNewCustForm] = useState({ name: '', contact: '', phone: '', email: '', address: '', machinesCount: 1 });

  // -------------------------------------------------------------
  // 3. ACTION HANDLERS
  // -------------------------------------------------------------
  const handleCreateRequest = (e) => {
    e.preventDefault();
    const id = 'MS-2026-' + Math.floor(10000 + Math.random() * 90000);
    const item = {
      id,
      customer: newReqForm.customer || 'Şantiye Müşterisi',
      machine: newReqForm.machine || 'İş Makinası',
      issue: newReqForm.issue || 'Arıza Tespiti',
      location: newReqForm.location || 'Adana Merkez',
      priority: newReqForm.priority,
      status: 'Yeni',
      time: 'Az Önce',
      phone: newReqForm.phone || '0533 000 0000',
      hours: '0 saat',
      assignedTo: null,
      cost: 15000,
      parts: ['Tespit Kiti']
    };
    setServiceRequests([item, ...serviceRequests]);
    setNotifications([{ id: Date.now(), text: `Yeni Arıza Kaydı: ${item.customer} (${item.machine})`, time: 'Şimdi', read: false }, ...notifications]);
    setNewRequestModal(false);
    setNewReqForm({ customer: '', machine: '', issue: '', location: '', priority: 'Acil', phone: '' });
  };

  const handleAssignTechnician = () => {
    if (!assignModal || !selectedTechnician) return;
    setServiceRequests(serviceRequests.map(r => r.id === assignModal.id ? { ...r, assignedTo: selectedTechnician, status: 'Atandı' } : r));
    setNotifications([{ id: Date.now(), text: `${assignModal.id} iş emri ${selectedTechnician} personeline atandı.`, time: 'Şimdi', read: false }, ...notifications]);
    setAssignModal(null);
    setSelectedTechnician('');
  };

  const handleStatusChange = (id, newStatus) => {
    setServiceRequests(serviceRequests.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const handleDeleteRequest = (id) => {
    if (confirm('Bu iş emrini silmek istediğinize emin misiniz?')) {
      setServiceRequests(serviceRequests.filter(r => r.id !== id));
    }
  };

  const handleAddPart = (e) => {
    e.preventDefault();
    const newPart = {
      id: inventory.length + 1,
      name: newPartForm.name,
      brand: newPartForm.brand,
      oem: newPartForm.oem,
      shelf: newPartForm.shelf,
      currentStock: Number(newPartForm.currentStock),
      minStock: Number(newPartForm.minStock),
      buy: Number(newPartForm.buy),
      sell: Number(newPartForm.sell)
    };
    setInventory([...inventory, newPart]);
    setNewPartModal(false);
    setNewPartForm({ name: '', brand: '', oem: '', shelf: '', currentStock: 10, minStock: 5, buy: 1000, sell: 1500 });
  };

  const handleStockAdjust = (id, delta) => {
    setInventory(inventory.map(p => {
      if (p.id === id) {
        const updated = Math.max(0, p.currentStock + delta);
        return { ...p, currentStock: updated };
      }
      return p;
    }));
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const newCust = {
      id: customers.length + 1,
      name: newCustForm.name,
      contact: newCustForm.contact,
      phone: newCustForm.phone,
      email: newCustForm.email,
      address: newCustForm.address,
      machinesCount: Number(newCustForm.machinesCount),
      totalServices: 0,
      revenue: 0,
      collected: 0,
      balance: 0
    };
    setCustomers([...customers, newCust]);
    setNewCustomerModal(false);
    setNewCustForm({ name: '', contact: '', phone: '', email: '', address: '', machinesCount: 1 });
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    if (!paymentModal || !paymentAmount) return;
    const pay = Number(paymentAmount);
    setCustomers(customers.map(c => {
      if (c.id === paymentModal.id) {
        const newCollected = c.collected + pay;
        const newBalance = Math.max(0, c.balance - pay);
        return { ...c, collected: newCollected, balance: newBalance };
      }
      return c;
    }));
    setPaymentModal(null);
    setPaymentAmount('');
    alert(`₺${pay.toLocaleString('tr-TR')} tutarındaki tahsilat başarıyla cariye işlendi.`);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setMessages(messages.map(m => m.id === selectedMessage.id ? { ...m, replied: true } : m));
    alert(`Yanıtınız "${selectedMessage.sender}" adlı kişiye başarıyla iletildi: ${replyText}`);
    setReplyText('');
  };

  const handleExportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Is Emri,Musteri,Makine,Ariza,Oncelik,Durum,Usta,Tutar\n"
      + serviceRequests.map(r => `${r.id},${r.customer},${r.machine},"${r.issue}",${r.priority},${r.status},${r.assignedTo || 'Atanmadi'},${r.cost}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "mesa_servis_is_emirleri.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // -------------------------------------------------------------
  // 4. COMPUTED METRICS
  // -------------------------------------------------------------
  const totalRevenue = useMemo(() => customers.reduce((acc, c) => acc + c.revenue, 0), [customers]);
  const totalCollected = useMemo(() => customers.reduce((acc, c) => acc + c.collected, 0), [customers]);
  const totalBalance = useMemo(() => customers.reduce((acc, c) => acc + c.balance, 0), [customers]);
  const activeJobsCount = serviceRequests.filter(s => s.status !== 'Tamamlandı').length;
  const criticalStockCount = inventory.filter(p => p.currentStock <= p.minStock).length;

  // Filtered lists by global search
  const filteredRequests = serviceRequests.filter(r => 
    r.customer.toLowerCase().includes(globalSearch.toLowerCase()) ||
    r.machine.toLowerCase().includes(globalSearch.toLowerCase()) ||
    r.id.toLowerCase().includes(globalSearch.toLowerCase()) ||
    r.location.toLowerCase().includes(globalSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <SEO
        title="Mesa ERP & Saha Operasyon Kontrol Merkezi | Adana"
        description="Mesa İş Makinaları 7/24 ERP Saha Yönetimi, Mobil Filo GPS Takibi, İş Emirleri, Cari Muhasebe ve Stok Otomasyonu."
        canonical="/panel"
      />

      {/* TOP HEADER */}
      <header className="bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-xs font-bold transition-colors">
            <ArrowLeft className="w-4 h-4" /> Web Sitesine Dön
          </Link>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-md shadow-amber-500/20">
              MESA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-white tracking-wide">ERP CONTROL</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold border border-emerald-500/20">
                  ● CANLI TELEMATİK
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3">
          {/* Global Search */}
          <div className="relative hidden md:block w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="İş emri, müşteri veya plaka ara..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 relative transition-colors"
              title="Bildirimler"
            >
              <Bell className="w-4 h-4 text-amber-400" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 space-y-3 z-50">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-white">Sistem Bildirimleri</span>
                  <button
                    onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                    className="text-[10px] text-amber-400 hover:underline"
                  >
                    Tümünü Okundu Say
                  </button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className={`p-2.5 rounded-xl text-xs ${n.read ? 'bg-slate-950/40 text-slate-400' : 'bg-amber-500/10 border border-amber-500/20 text-white font-medium'}`}>
                      <div>{n.text}</div>
                      <div className="text-[10px] text-slate-500 mt-1">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* New Request CTA */}
          <button
            onClick={() => setNewRequestModal(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Yeni Arıza / İş Emri</span>
          </button>
        </div>
      </header>

      {/* WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0">
          <div className="p-3.5 space-y-1 overflow-y-auto flex-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">Operasyon & Saha</div>
            
            <NavBtn active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<Activity className="w-4 h-4" />} label="Genel Bakış (KPI)" />
            <NavBtn active={activeTab === 'ariza-merkezi'} onClick={() => setActiveTab('ariza-merkezi')} icon={<ShieldAlert className="w-4 h-4 text-red-400" />} label="Arıza & Sevk Masası" badge={serviceRequests.filter(s => s.status === 'Yeni').length} />
            <NavBtn active={activeTab === 'servisler'} onClick={() => setActiveTab('servisler')} icon={<Wrench className="w-4 h-4 text-amber-400" />} label="Aktif İş Emirleri" badge={activeJobsCount} />
            <NavBtn active={activeTab === 'harita'} onClick={() => setActiveTab('harita')} icon={<MapPin className="w-4 h-4 text-emerald-400" />} label="Canlı GPS & Radar" />
            <NavBtn active={activeTab === 'araclar'} onClick={() => setActiveTab('araclar')} icon={<Truck className="w-4 h-4 text-blue-400" />} label="18 Mobil Filo" />
            <NavBtn active={activeTab === 'makineler'} onClick={() => setActiveTab('makineler')} icon={<QrCode className="w-4 h-4 text-cyan-400" />} label="İş Makineleri & QR" />

            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mt-5 mb-2">Ticari & İletişim</div>
            <NavBtn active={activeTab === 'crm'} onClick={() => setActiveTab('crm')} icon={<Users className="w-4 h-4 text-indigo-400" />} label="Cari Müşteriler (B2B)" />
            <NavBtn active={activeTab === 'stok'} onClick={() => setActiveTab('stok')} icon={<Package className="w-4 h-4 text-amber-500" />} label="Yedek Parça Stoğu" badge={criticalStockCount > 0 ? `${criticalStockCount} Kritik` : null} />
            <NavBtn active={activeTab === 'muhasebe'} onClick={() => setActiveTab('muhasebe')} icon={<DollarSign className="w-4 h-4 text-emerald-400" />} label="Cari Tahsilat & Fatura" />
            <NavBtn active={activeTab === 'inbox'} onClick={() => setActiveTab('inbox')} icon={<MessageSquare className="w-4 h-4 text-sky-400" />} label="Mesa Inbox & WhatsApp" badge={messages.filter(m => !m.replied).length} />
            <NavBtn active={activeTab === 'raporlar'} onClick={() => setActiveTab('raporlar')} icon={<BarChart3 className="w-4 h-4 text-purple-400" />} label="Verimlilik Raporu" />
          </div>

          <div className="p-3.5 border-t border-slate-800 text-xs text-slate-400 bg-slate-900/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-slate-300">Yönetici: Ozan MESA</span>
            </div>
            <button onClick={handleExportData} className="text-amber-400 hover:text-amber-300 p-1" title="Tüm Veriyi İndir (CSV)">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* MAIN DISPLAY VIEW */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* VIEW 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Alert Ribbon */}
              <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-white font-bold text-xs uppercase tracking-wider">CANLI SAHA UYARISI:</span>
                    <span className="text-xs text-slate-300 ml-2">
                      ABC İnşaat (JCB 3CX) için hidrolik arızası atama bekliyor. Mobil Filo 01 MSA 01 Ceyhan hattında serbest kaldı.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('ariza-merkezi')}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shrink-0 hover:bg-amber-400 transition-colors"
                >
                  Hemen Ata
                </button>
              </div>

              {/* 6 Key Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <KPICard title="Aktif İş Emri" value={activeJobsCount} icon={<Wrench className="w-5 h-5 text-amber-400" />} sub="5 şantiyede" />
                <KPICard title="Yeni Çağrı" value={serviceRequests.filter(s => s.status === 'Yeni').length} icon={<ShieldAlert className="w-5 h-5 text-red-400" />} sub="Acil sevk bekliyor" highlight />
                <KPICard title="Yoldaki Filo" value="3 Araç" icon={<Truck className="w-5 h-5 text-blue-400" />} sub="GPS 28 dk varış" />
                <KPICard title="Kritik Parça" value={`${criticalStockCount} Kalem`} icon={<Package className="w-5 h-5 text-purple-400" />} sub="Min. stok altı" />
                <KPICard title="Toplam Ciro" value={`₺${(totalRevenue / 1000).toFixed(0)}K`} icon={<DollarSign className="w-5 h-5 text-emerald-400" />} sub="Cari faturalandırılan" />
                <KPICard title="Bekleyen Tahsilat" value={`₺${(totalBalance / 1000).toFixed(0)}K`} icon={<CreditCard className="w-5 h-5 text-amber-400" />} sub="4 firmada açık" />
              </div>

              {/* GPS Map & Quick Jobs Split */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Radar Simulation */}
                <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-400" /> Çukurova Anlık Filo & Şantiye Konumları
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">Adana, Mersin, Tarsus, Ceyhan ve İskenderun uydudan canlı radar</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('harita')}
                      className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                    >
                      Tam Ekran Radar <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex-1 min-h-[340px] bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-6">
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />

                    {/* Interactive Marker 1 */}
                    <div
                      onClick={() => alert("ABC İnşaat: JCB 3CX Kepçe arızası. Usta ataması bekleniyor.")}
                      className="absolute top-1/4 left-1/4 p-3 rounded-2xl bg-slate-900/90 border border-red-500/60 text-xs shadow-2xl flex items-center gap-2.5 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                      <div>
                        <div className="font-bold text-red-400">ABC İnşaat (JCB 3CX)</div>
                        <div className="text-[10px] text-slate-400">Seyhan OSB - Acil Hidrolik Basınç Kaybı</div>
                      </div>
                    </div>

                    {/* Interactive Marker 2 */}
                    <div
                      onClick={() => alert("01 MSA 01 - Ford Transit: Mehmet Usta sürüşte. Hız: 68 km/s. Finn-Power pres araçta hazır.")}
                      className="absolute bottom-1/3 right-1/4 p-3 rounded-2xl bg-slate-900/90 border border-amber-500/60 text-xs shadow-2xl flex items-center gap-2.5 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <Truck className="w-4 h-4 text-amber-400" />
                      <div>
                        <div className="font-bold text-white">01 MSA 01 (Mehmet Usta)</div>
                        <div className="text-[10px] text-slate-400">Ceyhan Taş Ocağı Yolu - Hız: 68 km/s</div>
                      </div>
                    </div>

                    {/* Interactive Marker 3 */}
                    <div
                      onClick={() => alert("01 MSA 02 - Iveco Daily: Ahmet Usta Yüreğir şantiyesinde onarım yapıyor.")}
                      className="absolute top-1/2 right-1/3 p-3 rounded-2xl bg-slate-900/90 border border-emerald-500/60 text-xs shadow-2xl flex items-center gap-2.5 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="font-bold text-emerald-400">01 MSA 02 (Ahmet Usta)</div>
                        <div className="text-[10px] text-slate-400">Yüreğir Şantiye - Bom Zinciri Onarımı</div>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-[11px] space-y-1">
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" /> 6 Araç Boşta / Müdahaleye Hazır
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-amber-400" /> 9 Araç Şantiyede Görevde
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-red-400" /> 3 Araç Acil İntikalde
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Action Jobs */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-white">Canlı İş Emirleri</h3>
                      <button onClick={() => setActiveTab('servisler')} className="text-xs text-amber-400 hover:underline font-semibold">
                        Tümü ({serviceRequests.length})
                      </button>
                    </div>

                    <div className="space-y-3 max-h-[300px] overflow-y-auto">
                      {serviceRequests.slice(0, 4).map((r) => (
                        <div key={r.id} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-white">{r.customer}</span>
                            <span className="font-mono text-amber-400 font-bold">{r.id}</span>
                          </div>
                          <div className="text-xs text-slate-300">{r.machine} — {r.issue}</div>
                          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800/80">
                            <span>{r.location}</span>
                            <span className="text-emerald-400 font-semibold">{r.assignedTo || 'Atama Bekliyor'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setNewRequestModal(true)}
                    className="w-full mt-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <Plus className="w-4 h-4" /> Yeni Arıza Bildirimi Oluştur
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* VIEW 2: ARIZA & SEVK MASASI */}
          {activeTab === 'ariza-merkezi' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Arıza Bildirimleri & Akıllı Sevk Masası</h2>
                  <p className="text-xs text-slate-400 mt-1">Canlı çağrılar, usta görevlendirmesi ve aşama takibi</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleExportData}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" /> Excel (CSV)
                  </button>
                  <button
                    onClick={() => setNewRequestModal(true)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Manuel Arıza Gir
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                      <tr>
                        <th className="p-4">Kayıt No</th>
                        <th className="p-4">Müşteri</th>
                        <th className="p-4">İş Makinası</th>
                        <th className="p-4">Arıza / Şikayet</th>
                        <th className="p-4">Konum</th>
                        <th className="p-4">Öncelik</th>
                        <th className="p-4">Aşama / Durum</th>
                        <th className="p-4">Atanan Usta</th>
                        <th className="p-4 text-right">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {filteredRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 font-mono font-bold text-amber-400">{req.id}</td>
                          <td className="p-4 font-bold text-white">{req.customer}</td>
                          <td className="p-4 text-slate-200 font-medium">{req.machine}</td>
                          <td className="p-4 max-w-xs truncate text-slate-400">{req.issue}</td>
                          <td className="p-4 text-slate-300">{req.location}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                              req.priority === 'Kritik' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                              req.priority === 'Acil' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                              'bg-slate-800 text-slate-300'
                            }`}>
                              {req.priority}
                            </span>
                          </td>
                          <td className="p-4">
                            <select
                              value={req.status}
                              onChange={(e) => handleStatusChange(req.id, e.target.value)}
                              className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-2.5 py-1 focus:outline-none focus:border-amber-500 cursor-pointer"
                            >
                              <option value="Yeni">Yeni</option>
                              <option value="Atandı">Atandı</option>
                              <option value="Yolda">Yolda</option>
                              <option value="Serviste">Serviste</option>
                              <option value="Parça Bekliyor">Parça Bekliyor</option>
                              <option value="Tamamlandı">Tamamlandı</option>
                            </select>
                          </td>
                          <td className="p-4">
                            {req.assignedTo ? (
                              <span className="text-emerald-400 font-semibold">{req.assignedTo}</span>
                            ) : (
                              <button
                                onClick={() => setAssignModal(req)}
                                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-bold border border-amber-500/30"
                              >
                                + Usta Ata
                              </button>
                            )}
                          </td>
                          <td className="p-4 text-right space-x-1.5">
                            <button
                              onClick={() => setPrintOrderModal(req)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                              title="İş Emri Formu"
                            >
                              <FileText className="w-3.5 h-3.5 text-amber-400" />
                            </button>
                            <a
                              href={`tel:${req.phone}`}
                              className="inline-flex p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                              title="Telefon"
                            >
                              <Phone className="w-3.5 h-3.5 text-emerald-400" />
                            </a>
                            <button
                              onClick={() => handleDeleteRequest(req.id)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                              title="Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: AKTİF İŞ EMİRLERİ */}
          {activeTab === 'servisler' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">İş Emirleri & Sahada Tamamlanan Bakımlar</h2>
                  <p className="text-xs text-slate-400 mt-1">Harcanan parçalar, tahmini maliyet ve usta onayları</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceRequests.map((s) => (
                  <div key={s.id} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-black text-amber-400">{s.id}</span>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                          s.status === 'Tamamlandı' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {s.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-white">{s.customer}</h3>
                        <div className="text-xs text-amber-400 font-semibold">{s.machine} ({s.hours})</div>
                        <p className="text-xs text-slate-400 mt-1.5">{s.issue}</p>
                      </div>

                      <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1 text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Konum:</span> <span className="text-slate-200 font-medium">{s.location}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Sorumlu Usta:</span> <span className="text-emerald-400 font-bold">{s.assignedTo || 'Atanmadı'}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Kullanılan Parça:</span> <span className="text-slate-300 truncate max-w-[140px]">{s.parts ? s.parts.join(', ') : 'Bekliyor'}</span>
                        </div>
                        <div className="flex justify-between text-slate-400 border-t border-slate-800 pt-1.5">
                          <span>Tahmini Tutar:</span> <span className="text-white font-black">₺{s.cost.toLocaleString('tr-TR')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                      <button
                        onClick={() => setPrintOrderModal(s)}
                        className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-400" /> Servis Raporu
                      </button>
                      <button
                        onClick={() => handleStatusChange(s.id, 'Tamamlandı')}
                        className="p-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 transition-colors"
                        title="İş Emrini Tamamla & Kapat"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 4: HARİTA */}
          {activeTab === 'harita' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Canlı GPS & Radar Takip Sistemi</h2>
                  <p className="text-xs text-slate-400 mt-1">18 Gezici Mobil Servis Aracının Hız, Yakıt ve Lokasyon Verisi</p>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
                <div className="h-[580px] bg-slate-950 rounded-2xl border border-slate-800 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]" />

                  {/* Multiple Live Markers */}
                  {vehicles.slice(0, 4).map((v, i) => (
                    <div
                      key={v.plate}
                      onClick={() => alert(`${v.plate} - ${v.model}\nŞoför: ${v.driver}\nKonum: ${v.location}\nDonanım: ${v.equipment}`)}
                      style={{
                        top: `${25 + i * 18}%`,
                        left: `${20 + i * 20}%`
                      }}
                      className="absolute p-3 rounded-2xl bg-slate-900/95 border border-amber-500 text-xs shadow-2xl flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <Truck className="w-5 h-5 text-amber-400 shrink-0" />
                      <div>
                        <div className="font-extrabold text-white">{v.plate} — {v.model}</div>
                        <div className="text-[11px] text-slate-400">Şoför: {v.driver} | {v.location}</div>
                        <div className="text-[10px] text-emerald-400 font-mono">Hız: {v.speed} | Yakıt: %{v.fuel}</div>
                      </div>
                    </div>
                  ))}

                  <div className="absolute top-6 right-6 bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-slate-800 text-xs space-y-2">
                    <div className="font-bold text-white mb-2">Çukurova Bölge Özeti</div>
                    <div className="flex justify-between gap-6 text-slate-300"><span>Adana Merkez:</span> <strong className="text-white">6 Araç</strong></div>
                    <div className="flex justify-between gap-6 text-slate-300"><span>Ceyhan & Tarsus:</span> <strong className="text-white">5 Araç</strong></div>
                    <div className="flex justify-between gap-6 text-slate-300"><span>İskenderun Liman:</span> <strong className="text-white">4 Araç</strong></div>
                    <div className="flex justify-between gap-6 text-slate-300"><span>Osmaniye OSB:</span> <strong className="text-white">3 Araç</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 5: ARAÇLAR */}
          {activeTab === 'araclar' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">18 Donanımlı Mobil Servis Filosu</h2>
                  <p className="text-xs text-slate-400 mt-1">Araç içi sabit Kaeser/Finn-Power envanterleri, kilometre ve sürücü takibi</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((v) => (
                  <div key={v.plate} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-black text-xs font-mono">{v.plate}</span>
                      <span className="text-xs font-bold text-emerald-400">{v.status}</span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white">{v.model}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Sorumlu Usta: <strong className="text-slate-200">{v.driver}</strong></p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                      <div>
                        <span className="text-slate-500 text-[10px] block">Mevcut KM:</span>
                        <strong className="text-slate-200">{v.km.toLocaleString('tr-TR')} km</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">Yakıt:</span>
                        <strong className="text-emerald-400 font-mono">%{v.fuel}</strong>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">Araç İçi Donanım:</span>
                      <p className="text-xs text-slate-400 leading-relaxed">{v.equipment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 6: İŞ MAKİNELERİ & QR KOD */}
          {activeTab === 'makineler' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Kayıtlı İş Makineleri & QR Etiketler</h2>
                  <p className="text-xs text-slate-400 mt-1">Şantiyelerdeki makinelerin şasi numarası, çalışma saati ve servis karnesi</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {machines.map((m) => (
                  <div key={m.id} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-amber-400">{m.id}</span>
                      <span className="text-xs font-semibold text-slate-300">{m.year} Model</span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white">{m.model}</h3>
                      <div className="text-xs text-slate-400">Sahibi: <strong className="text-slate-200">{m.customer}</strong></div>
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>Şasi No:</span> <span className="font-mono text-slate-200">{m.serial}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Çalışma Saati:</span> <span className="text-amber-400 font-bold">{m.hours}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Son Servis:</span> <span className="text-slate-300">{m.lastService}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setQrModal(m)}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <QrCode className="w-4 h-4" /> QR Servis Etiketini Göster
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 7: CRM & CARİ MÜŞTERİLER */}
          {activeTab === 'crm' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Müşteri CRM & Cari Hesaplar</h2>
                  <p className="text-xs text-slate-400 mt-1">Kurumsal şantiyelerin bakiye, fatura ve tahsilat takibi</p>
                </div>
                <button
                  onClick={() => setNewCustomerModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" /> Yeni Müşteri Tanımla
                </button>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                      <tr>
                        <th className="p-4">Firma Adı</th>
                        <th className="p-4">Yetkili & Tel</th>
                        <th className="p-4">Makine</th>
                        <th className="p-4">Toplam Ciro</th>
                        <th className="p-4">Tahsil Edilen</th>
                        <th className="p-4">Açık Bakiye</th>
                        <th className="p-4 text-right">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {customers.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 font-bold text-white">{c.name}</td>
                          <td className="p-4">
                            <div>{c.contact}</div>
                            <div className="text-[11px] text-slate-500">{c.phone}</div>
                          </td>
                          <td className="p-4 font-semibold text-slate-200">{c.machinesCount} Makine</td>
                          <td className="p-4 font-medium text-slate-300">₺{c.revenue.toLocaleString('tr-TR')}</td>
                          <td className="p-4 text-emerald-400 font-semibold">₺{c.collected.toLocaleString('tr-TR')}</td>
                          <td className="p-4 font-black text-red-400">
                            {c.balance > 0 ? `₺${c.balance.toLocaleString('tr-TR')}` : '₺0 (Tamamlandı)'}
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => setPaymentModal(c)}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-bold"
                            >
                              + Tahsilat Al
                            </button>
                            <button
                              onClick={() => alert(`${c.name} firmasının son 12 aylık cari hesap ekstresi indirildi.`)}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold"
                            >
                              Ekstre
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 8: YEDEK PARÇA STOK */}
          {activeTab === 'stok' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Yedek Parça Stoğu & Depo Envanteri</h2>
                  <p className="text-xs text-slate-400 mt-1">Orijinal OEM filtreler, hidrolik hortumlar, pompalar ve enjektörler</p>
                </div>
                <button
                  onClick={() => setNewPartModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" /> Yeni Parça Tanımla
                </button>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                      <tr>
                        <th className="p-4">Parça Adı</th>
                        <th className="p-4">Marka & OEM Kod</th>
                        <th className="p-4">Raf Konumu</th>
                        <th className="p-4">Mevcut Stok</th>
                        <th className="p-4">Min. Stok</th>
                        <th className="p-4">Alış Fiyatı</th>
                        <th className="p-4">Satış Fiyatı</th>
                        <th className="p-4">Hızlı Stok Giriş/Çıkış</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {inventory.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 font-bold text-white">{p.name}</td>
                          <td className="p-4 font-mono text-slate-400">{p.brand} — {p.oem}</td>
                          <td className="p-4 text-slate-300">{p.shelf}</td>
                          <td className="p-4">
                            <span className={`font-black text-sm ${p.currentStock <= p.minStock ? 'text-red-400' : 'text-white'}`}>
                              {p.currentStock} Adet
                            </span>
                          </td>
                          <td className="p-4 text-slate-400">{p.minStock} Adet</td>
                          <td className="p-4 text-slate-400">₺{p.buy.toLocaleString('tr-TR')}</td>
                          <td className="p-4 text-emerald-400 font-bold">₺{p.sell.toLocaleString('tr-TR')}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleStockAdjust(p.id, -1)}
                                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center text-sm"
                                title="1 Adet Düşür"
                              >
                                -
                              </button>
                              <button
                                onClick={() => handleStockAdjust(p.id, 1)}
                                className="w-7 h-7 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-bold flex items-center justify-center text-sm border border-amber-500/30"
                                title="1 Adet Ekle"
                              >
                                +
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 9: MUHASEBE & FİNANSAL AKIŞ */}
          {activeTab === 'muhasebe' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white">Finansal Akış & Cari Tahsilat Matrisi</h2>
                <p className="text-xs text-slate-400 mt-1">Ciro, vadesi geçmiş alacaklar ve şantiye tahsilatları</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
                  <span className="text-xs text-slate-400 font-medium">Toplam Faturalandırılan Tutar</span>
                  <div className="text-3xl font-black text-white mt-2">₺{totalRevenue.toLocaleString('tr-TR')}</div>
                  <div className="text-xs text-emerald-400 mt-2 font-semibold">Tüm cari hesaplar dahil</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
                  <span className="text-xs text-slate-400 font-medium">Başarıyla Tahsil Edilen</span>
                  <div className="text-3xl font-black text-emerald-400 mt-2">₺{totalCollected.toLocaleString('tr-TR')}</div>
                  <div className="text-xs text-slate-400 mt-2">%{((totalCollected / totalRevenue) * 100).toFixed(1)} Tahsilat Başarısı</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
                  <span className="text-xs text-slate-400 font-medium">Açık Cari Bakiye</span>
                  <div className="text-3xl font-black text-red-400 mt-2">₺{totalBalance.toLocaleString('tr-TR')}</div>
                  <div className="text-xs text-amber-400 mt-2">Takipteki alacaklar</div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
                <h3 className="text-base font-bold text-white mb-4">Son Tahsilat & Fatura Hareketleri</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div>
                      <strong className="text-white">Çukurova Hazır Beton A.Ş.</strong>
                      <div className="text-[11px] text-slate-400">Manitou şanzıman revizyonu peşin havalesi</div>
                    </div>
                    <span className="text-emerald-400 font-black">+₺70.000 (Havale)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div>
                      <strong className="text-white">Kaya Hafriyat & Madencilik</strong>
                      <div className="text-[11px] text-slate-400">CAT 320D silindir kapağı ve enjektör faturası</div>
                    </div>
                    <span className="text-emerald-400 font-black">+₺34.200 (EFT)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 10: INBOX & WHATSAPP */}
          {activeTab === 'inbox' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white">Mesa Çok Kanallı İletişim Merkezi</h2>
                <p className="text-xs text-slate-400 mt-1">Web Acil Bildirimleri, WhatsApp ve Müşteri Portalı canlı mesajlaşma</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden min-h-[500px]">
                {/* Messages List */}
                <div className="lg:col-span-5 border-r border-slate-800 p-4 space-y-2 overflow-y-auto">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMessage(m)}
                      className={`p-3.5 rounded-2xl cursor-pointer transition-all ${
                        selectedMessage.id === m.id
                          ? 'bg-amber-500/20 border border-amber-500/40 text-white'
                          : 'bg-slate-950 hover:bg-slate-800/60 text-slate-300 border border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs">{m.sender}</span>
                        <span className="text-[10px] text-slate-500">{m.time}</span>
                      </div>
                      <div className="text-xs text-amber-400 font-semibold mb-1">[{m.channel}]</div>
                      <p className="text-xs text-slate-400 line-clamp-2">{m.text}</p>
                    </div>
                  ))}
                </div>

                {/* Message Detail & Reply */}
                <div className="lg:col-span-7 p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-white">{selectedMessage.sender}</h3>
                        <span className="text-xs text-amber-400">{selectedMessage.channel} üzerinden gönderildi</span>
                      </div>
                      <span className="text-xs text-slate-400">{selectedMessage.time}</span>
                    </div>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-sm text-slate-200 leading-relaxed">
                      {selectedMessage.text}
                    </div>
                  </div>

                  <form onSubmit={handleSendMessage} className="mt-6 space-y-3">
                    <textarea
                      rows={3}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Şantiye yetkilisine doğrudan yanıt veya usta varış bilgisi yazın..."
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500 resize-none"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Yanıtı Gönder (SMS & WhatsApp)</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 11: VERİMLİLİK & SLA RAPORLARI */}
          {activeTab === 'raporlar' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Yönetici SLA & Saha Verimlilik Analizi</h2>
                  <p className="text-xs text-slate-400 mt-1">2026 yılı saha intikal süreleri ve teknisyen performans metrikleri</p>
                </div>
                <button
                  onClick={handleExportData}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Raporu İndir
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 text-center">
                  <div className="text-4xl font-black text-amber-400 mb-2">%98.4</div>
                  <div className="text-sm font-bold text-white">İlk Müdahalede Çözüm</div>
                  <div className="text-xs text-slate-400 mt-1">Arızaların şantiyede aynı gün bitirilme oranı</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 text-center">
                  <div className="text-4xl font-black text-emerald-400 mb-2">41 Dk</div>
                  <div className="text-sm font-bold text-white">Ortalama İntikal Süresi</div>
                  <div className="text-xs text-slate-400 mt-1">Çukurova geneli şantiye varış ortalaması</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 text-center">
                  <div className="text-4xl font-black text-blue-400 mb-2">4.820+</div>
                  <div className="text-sm font-bold text-white">Kayıtlı Revizyon</div>
                  <div className="text-xs text-slate-400 mt-1">Sistemde başarıyla kapanan iş emri sayısı</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 text-center">
                  <div className="text-4xl font-black text-purple-400 mb-2">★ 4.94</div>
                  <div className="text-sm font-bold text-white">Müşteri Memnuniyeti</div>
                  <div className="text-xs text-slate-400 mt-1">500+ şantiye şefi anketi sonucu</div>
                </div>
              </div>

              {/* Technician Efficiency Table */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
                <h3 className="text-base font-bold text-white mb-4">Saha Personeli & Usta Performans Matrisi</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                      <tr>
                        <th className="p-3">Teknisyen</th>
                        <th className="p-3">Uzmanlık Alanı</th>
                        <th className="p-3">Araç Kodu</th>
                        <th className="p-3">Bitirilen İş</th>
                        <th className="p-3">Müşteri Puanı</th>
                        <th className="p-3">Durum</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {technicians.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-800/40">
                          <td className="p-3 font-bold text-white">{t.name}</td>
                          <td className="p-3 text-slate-400">{t.currentJob}</td>
                          <td className="p-3 font-mono text-amber-400">{t.vehicle}</td>
                          <td className="p-3 font-bold text-slate-200">{t.completedJobs} Servis</td>
                          <td className="p-3 font-bold text-amber-400">★ {t.rating}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* --------------------------------------------------------- */}
      {/* 5. INTERACTIVE POPUP MODALS                               */}
      {/* --------------------------------------------------------- */}

      {/* MODAL 1: YENİ ARIZA / İŞ EMRİ */}
      {newRequestModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Yeni Manuel Arıza / İş Emri Girişi</h3>
              <button onClick={() => setNewRequestModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Müşteri / Şantiye Adı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Toroslar Taş Ocağı Ltd."
                  value={newReqForm.customer}
                  onChange={(e) => setNewReqForm({...newReqForm, customer: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Makine Modeli *</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: CAT 320D / JCB 3CX"
                    value={newReqForm.machine}
                    onChange={(e) => setNewReqForm({...newReqForm, machine: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Öncelik Seviyesi</label>
                  <select
                    value={newReqForm.priority}
                    onChange={(e) => setNewReqForm({...newReqForm, priority: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option value="Kritik">Kritik (Şantiye Durdu)</option>
                    <option value="Acil">Acil (Aynı Gün)</option>
                    <option value="Normal">Normal (Planlı)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Şantiye Konumu *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Ceyhan E-90 Otoyol Ayrımı"
                  value={newReqForm.location}
                  onChange={(e) => setNewReqForm({...newReqForm, location: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Arıza Belirtisi / Talep Detayı *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Makinenin verdiği arıza kodu, hidrolik sızıntı veya motor sorunu..."
                  value={newReqForm.issue}
                  onChange={(e) => setNewReqForm({...newReqForm, issue: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNewRequestModal(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20"
                >
                  İş Emrini Başlat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: USTA ATAMA */}
      {assignModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">İş Emrine Usta Sevk Et</h3>
              <button onClick={() => setAssignModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-1">
              <div className="font-bold text-amber-400">{assignModal.customer}</div>
              <div className="text-white">{assignModal.machine} — {assignModal.issue}</div>
              <div className="text-slate-500">Konum: {assignModal.location}</div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Nöbetçi Usta Seçin:</label>
              <div className="space-y-2">
                {technicians.map((t) => (
                  <label
                    key={t.id}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedTechnician === t.name
                        ? 'bg-amber-500/20 border-amber-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="technician"
                        value={t.name}
                        checked={selectedTechnician === t.name}
                        onChange={() => setSelectedTechnician(t.name)}
                        className="text-amber-500"
                      />
                      <span className="text-xs">{t.name}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">{t.vehicle}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setAssignModal(null)}
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Vazgeç
              </button>
              <button
                disabled={!selectedTechnician}
                onClick={handleAssignTechnician}
                className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20"
              >
                Ustaya Görev Ata
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: TAHSİLAT EKLE */}
      {paymentModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Cari Tahsilat Girişi</h3>
              <button onClick={() => setPaymentModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-1">
              <div className="font-bold text-white text-sm">{paymentModal.name}</div>
              <div className="text-slate-400">Mevcut Açık Bakiye: <strong className="text-red-400">₺{paymentModal.balance.toLocaleString('tr-TR')}</strong></div>
            </div>

            <form onSubmit={handleAddPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tahsil Edilen Tutar (₺) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  max={paymentModal.balance || 9999999}
                  placeholder="Örn: 50000"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPaymentModal(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20"
                >
                  Tahsilatı Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: YENİ MÜŞTERİ */}
      {newCustomerModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Yeni Kurumsal Cari Müşteri</h3>
              <button onClick={() => setNewCustomerModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Firma Ünvanı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Çukurova Taş Kırma A.Ş."
                  value={newCustForm.name}
                  onChange={(e) => setNewCustForm({...newCustForm, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Yetkili Kişi *</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Ali Yılmaz"
                    value={newCustForm.contact}
                    onChange={(e) => setNewCustForm({...newCustForm, contact: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Telefon *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0532 XXX XX XX"
                    value={newCustForm.phone}
                    onChange={(e) => setNewCustForm({...newCustForm, phone: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Şantiye / Merkez Adresi</label>
                <input
                  type="text"
                  placeholder="Örn: Ceyhan Yolu 15. Km Adana"
                  value={newCustForm.address}
                  onChange={(e) => setNewCustForm({...newCustForm, address: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNewCustomerModal(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
                >
                  Müşteriyi Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: YENİ PARÇA */}
      {newPartModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Yeni Yedek Parça Tanımla</h3>
              <button onClick={() => setNewPartModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPart} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Parça Adı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Rexroth A8VO Pompa Piston Seti"
                  value={newPartForm.name}
                  onChange={(e) => setNewPartForm({...newPartForm, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Marka</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Bosch Rexroth"
                    value={newPartForm.brand}
                    onChange={(e) => setNewPartForm({...newPartForm, brand: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">OEM Kod</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: RX-A8VO-99"
                    value={newPartForm.oem}
                    onChange={(e) => setNewPartForm({...newPartForm, oem: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mevcut Stok</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={newPartForm.currentStock}
                    onChange={(e) => setNewPartForm({...newPartForm, currentStock: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Satış Fiyatı (₺)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={newPartForm.sell}
                    onChange={(e) => setNewPartForm({...newPartForm, sell: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNewPartModal(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
                >
                  Stoka Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 6: İŞ EMRİ YAZDIRMA */}
      {printOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-black text-amber-400">{printOrderModal.id}</span>
                <span className="text-xs text-white font-bold">Resmi Servis Formu</span>
              </div>
              <button onClick={() => setPrintOrderModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs space-y-3 font-mono">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">MÜŞTERİ:</span>
                <span className="text-white font-bold">{printOrderModal.customer}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">MAKİNE:</span>
                <span className="text-white font-bold">{printOrderModal.machine} ({printOrderModal.hours})</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">ARIZA TANIMI:</span>
                <span className="text-slate-300">{printOrderModal.issue}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">LOKASYON:</span>
                <span className="text-slate-300">{printOrderModal.location}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">SORUMLU USTA:</span>
                <span className="text-emerald-400 font-bold">{printOrderModal.assignedTo || 'Atama Bekliyor'}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500">SERVİS TUTARI:</span>
                <span className="text-amber-400 font-black text-sm">₺{printOrderModal.cost.toLocaleString('tr-TR')}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setPrintOrderModal(null)}
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Kapat
              </button>
              <button
                onClick={() => { window.print(); }}
                className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20"
              >
                <Printer className="w-4 h-4" /> Yazdır / PDF Al
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 7: QR KOD ETİKETİ */}
      {qrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Mesa QR Etiketi</span>
              <button onClick={() => setQrModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl inline-block shadow-inner">
              <QrCode className="w-40 h-40 text-slate-950 mx-auto" />
            </div>

            <div>
              <div className="font-extrabold text-white text-base">{qrModal.model}</div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">{qrModal.serial}</div>
              <div className="text-xs text-amber-400 font-bold mt-2">Şantiyede QR Okutulunca Anında Servis Açılır</div>
            </div>

            <button
              onClick={() => { window.print(); }}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Printer className="w-4 h-4" /> Etiketi Yazdır
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

// -------------------------------------------------------------
// SUB-COMPONENTS
// -------------------------------------------------------------
function NavBtn({ active, onClick, icon, label, badge }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
        active
          ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
          : 'text-slate-400 hover:text-white hover:bg-slate-900'
      }`}
    >
      <div className="flex items-center gap-2.5">
        {icon}
        <span>{label}</span>
      </div>
      {badge !== undefined && badge !== null && (
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
          active ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function KPICard({ title, value, icon, sub, highlight }) {
  return (
    <div className={`p-4 rounded-2xl border transition-all ${
      highlight
        ? 'bg-red-500/10 border-red-500/30 shadow-lg shadow-red-500/5'
        : 'bg-slate-900/60 border-slate-800'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-400 font-medium">{title}</span>
        {icon}
      </div>
      <div className="text-2xl font-black text-white">{value}</div>
      <div className="text-[11px] text-slate-500 mt-1">{sub}</div>
    </div>
  );
}
