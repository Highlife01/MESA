import React, { useState, useMemo } from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { partsCatalogData } from '../data/partsCatalogData';
import { useOperational } from '../context/OperationalContext';
import { 
  Search, ShoppingCart, CheckCircle2, ShieldCheck, Truck, 
  Trash2, Plus, Minus, Send, Phone, ArrowRight, X, PackageCheck 
} from 'lucide-react';

export function PartsShopPage() {
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateCartQty, 
    clearCart, 
    cartTotal,
    createPartsOrder 
  } = useOperational();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderCompletedData, setOrderCompletedData] = useState(null);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [taxNo, setTaxNo] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const categories = [
    'Tümü',
    'Hidrolik & Pompa',
    'Orijinal Filtre',
    'Motor & Enjektör',
    'Kırıcı Uç & Diyafram',
    'Yağ & Kimyasal',
    'Şanzıman & Keçe'
  ];

  const filteredParts = useMemo(() => {
    return partsCatalogData.filter(part => {
      const matchesSearch = 
        !searchQuery ||
        part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.oemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.compatibleBrands.some(b => b.toLowerCase().includes(searchQuery.toLowerCase())) ||
        part.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'Tümü' || part.category.toLowerCase().includes(selectedCategory.toLowerCase().slice(0, 5));

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !phone || !address) {
      alert('Lütfen Ad Soyad, Telefon ve Teslimat Şantiyesi alanlarını doldurunuz.');
      return;
    }

    const newOrder = createPartsOrder({
      customerName,
      companyName,
      phone,
      taxNo,
      address,
      notes
    });

    setOrderCompletedData(newOrder);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  const getWhatsAppMessage = (order) => {
    if (!order) return '';
    const itemsText = order.items.map(i => `- ${i.name} (OEM: ${i.oemCode}) x ${i.quantity} = ${(i.price * i.quantity).toLocaleString('tr-TR')} TL`).join('%0A');
    const msg = `*MESA İŞ MAKİNALARI YEDEK PARÇA SİPARİŞİ*%0A%0A*Sipariş No:* ${order.orderCode}%0A*Firma/Müşteri:* ${order.companyName || order.customerName}%0A*Telefon:* ${order.phone}%0A*Teslimat:* ${order.address}%0A%0A*Parçalar:*%0A${itemsText}%0A%0A*Toplam Tutar:* ${order.total.toLocaleString('tr-TR')} TL (KDV Hariç)%0A%0ASiparişi onaylıyorum, kargo/sevkiyat durumunu bildiriniz.`;
    return `https://wa.me/905344075585?text=${msg}`;
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-12">
      <SEO 
        title="Orijinal İş Makinası Yedek Parça Satış & B2B Depo | CAT, Komatsu, JCB, Hidromek"
        description="Orijinal OEM filtreler, Parker 500 Bar hidrolik hortumlar, ana pompalar, Montabert kırıcı diyaframları ve Mobil hidrolik yağları. Adana merkez depodan aynı gün teslimat."
        canonical="/yedek-parca"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-amber-400">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-amber-400 font-bold">Yedek Parça B2B Mağaza</span>
        </div>

        {/* Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/30 uppercase tracking-wider mb-2">
              <PackageCheck className="w-3.5 h-3.5" /> Adana Merkez Depo - 24 Saatte Şantiyede
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Orijinal <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Yedek Parça & B2B</span>
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl">
              CAT, JCB, Komatsu, Hidromek ve Volvo makineleriniz için sertifikalı hidrolik pompalar, OEM filtreler, 500 Bar hortumlar ve montaj desteği.
            </p>
          </div>

          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-xl shadow-amber-500/20 transition-transform active:scale-95 shrink-0"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Sepetim ({cart.reduce((acc, i) => acc + i.quantity, 0)})</span>
            {cart.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-slate-950 text-amber-400 rounded-full text-xs font-mono">
                {cartTotal.toLocaleString('tr-TR')} ₺
              </span>
            )}
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="OEM Parça No, Marka veya Parça Adı ile Ara (Örn: 1R-0716, Parker, 708-2L-00300, Filtre...)"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === c
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map((part) => (
            <div
              key={part.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-3xl p-6 transition-all duration-200 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-xl bg-slate-950 font-mono text-xs font-bold text-amber-400 border border-slate-800">
                    OEM: {part.oemCode}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    {part.stockStatus}
                  </span>
                </div>

                <h3 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">
                  {part.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {part.shortDesc}
                </p>

                {/* Compatibility Tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {part.compatibleBrands.map((b, i) => (
                    <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-medium">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Birim Fiyat (KDV Hariç)</span>
                  <span className="text-xl font-black text-amber-400 font-mono">
                    {part.price.toLocaleString('tr-TR')} ₺
                  </span>
                </div>

                <button
                  onClick={() => addToCart(part)}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center gap-1.5 active:scale-95"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Sepete Ekle</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Cart Drawer / Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between p-6 shadow-2xl animate-in slide-in-from-right duration-200">
            
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-black text-white">Sipariş Sepetim</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <PackageCheck className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-400">Sepetiniz şu an boş.</p>
                  <span className="text-xs text-slate-500">Parça kataloğundan dilediğiniz OEM ürünü ekleyin.</span>
                </div>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                        <span className="text-[10px] text-amber-400 font-mono block">OEM: {item.oemCode}</span>
                        <span className="text-xs font-black text-slate-300 font-mono mt-0.5 block">
                          {(item.price * item.quantity).toLocaleString('tr-TR')} ₺
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateCartQty(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQty(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-6 h-6 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30 ml-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-slate-800 pt-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Ara Toplam (KDV Hariç):</span>
                  <span className="font-mono text-white">{cartTotal.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Hesaplanan KDV (%20):</span>
                  <span className="font-mono text-white">{(cartTotal * 0.2).toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex items-center justify-between text-sm font-black text-white pt-2 border-t border-slate-800/80">
                  <span>Genel Toplam:</span>
                  <span className="font-mono text-amber-400 text-lg">{(cartTotal * 1.2).toLocaleString('tr-TR')} ₺</span>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-transform active:scale-95"
                >
                  <span>Siparişi Tamamla</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl my-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white">Hızlı B2B Sipariş Formu</h3>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Yetkili Ad Soyad *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Örn: Ali Kaya"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Telefon Numarası *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05XX XXX XX XX"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Firma Adı (Opsiyonel)</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="ABC Hafriyat Ltd."
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Vergi No / Dairesi</label>
                  <input
                    type="text"
                    value={taxNo}
                    onChange={(e) => setTaxNo(e.target.value)}
                    placeholder="E-Fatura için"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Teslimat Şantiyesi / Adres *</label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Örn: Ceyhan Enerji İhtisas Bölgesi Şantiyesi, Adana"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Sipariş Notu</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Acil kargo veya mobil ekiple montaj talebi..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-500"
                />
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300 text-[11px] flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Adana ve Çukurova geneline seyyar servis araçlarımızla veya aynı gün ambar/kargo ile teslim edilir.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20"
              >
                Siparişi Onayla & Gönder
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Order Completed Confirmation Modal */}
      {orderCompletedData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-emerald-500/40 w-full max-w-md rounded-3xl p-6 sm:p-8 space-y-5 text-center shadow-2xl my-auto animate-in zoom-in-95 duration-150">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs text-slate-400 block uppercase font-bold">Siparişiniz Alındı</span>
              <h3 className="text-2xl font-mono font-black text-amber-400 mt-1">{orderCompletedData.orderCode}</h3>
              <p className="text-xs text-slate-300 mt-2">
                Parça siparişiniz depomuzda hazırlanıyor. Servis takip ekranından kodunuz ile durumu canlı izleyebilirsiniz.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={getWhatsAppMessage(orderCompletedData)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>WhatsApp ile Hızlı Teyit Et</span>
              </a>

              <Link
                to={`/servis-takip?code=${orderCompletedData.orderCode}`}
                className="block w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors"
              >
                Canlı Sipariş Takibine Git
              </Link>

              <button
                onClick={() => setOrderCompletedData(null)}
                className="text-xs text-slate-400 hover:text-white pt-2"
              >
                Alışverişe Devam Et
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
