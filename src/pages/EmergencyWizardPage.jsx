import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from '../router/Router';
import { SEO } from '../components/SEO';
import { useOperational } from '../context/OperationalContext';
import { 
  ShieldAlert, Wrench, MapPin, Camera, Mic, 
  CheckCircle2, ArrowRight, ArrowLeft, Phone, Clock, Truck, Send
} from 'lucide-react';

export function EmergencyWizardPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { addEmergencyOrder } = useOperational();

  const [step, setStep] = useState(1);
  const [successOrder, setSuccessOrder] = useState(null);
  const [validationError, setValidationError] = useState('');

  const [formData, setFormData] = useState({
    brand: 'Caterpillar (CAT)',
    machineType: 'Paletli Ekskavatör',
    modelYear: '2021',
    issueCategory: 'Hidrolik Basınç Düşüklüğü / Pompa',
    priority: 'Acil (Şantiye Durdu)',
    location: 'Seyhan OSB, Adana',
    customerName: '',
    phone: '',
    notes: ''
  });

  // Pre-populate if query parameters are present
  useEffect(() => {
    if (search) {
      const params = new URLSearchParams(search);
      const queryBrand = params.get('brand');
      const queryCode = params.get('code');
      const queryDesc = params.get('desc');

      setFormData(prev => ({
        ...prev,
        brand: queryBrand || prev.brand,
        issueCategory: queryCode ? `${queryCode} - ${queryDesc || 'DTC Arızası'}` : prev.issueCategory,
        notes: queryCode ? `DTC Arıza Kodu: ${queryCode}` : prev.notes
      }));
    }
  }, [search]);

  const handleFinish = (e) => {
    e.preventDefault();
    setValidationError('');
    if (!formData.customerName || !formData.phone) {
      setValidationError('Lütfen Yetkili Adı ve Telefon Numarası alanlarını eksiksiz doldurunuz.');
      return;
    }

    const newOrder = addEmergencyOrder({
      customer: formData.customerName,
      phone: formData.phone,
      machine: `${formData.brand} ${formData.machineType}`,
      location: formData.location,
      issue: `${formData.issueCategory} (${formData.priority}) - ${formData.notes || ''}`
    });

    setSuccessOrder(newOrder);
  };

  const getWhatsAppDispatchLink = (order) => {
    if (!order) return '';
    const msg = `*MESA 7/24 ACİL İŞ MAKİNASI ÇAĞRISI*%0A%0A*Takip No:* ${order.code}%0A*Firma/Yetkili:* ${order.customer}%0A*Telefon:* ${order.phone}%0A*Makine:* ${order.machine}%0A*Şantiye:* ${order.location}%0A*Arıza:* ${order.issue}%0A%0AAcil seyyar servis aracının yönlendirilmesini talep ediyorum.`;
    return `https://wa.me/905344075585?text=${msg}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12">
      <SEO 
        title="7/24 Acil Arıza Bildirim Sihirbazı | MESA Mobil Servis"
        description="Şantiyenizdeki iş makinası arızasını 1 dakikada bildirin, en yakın nöbetçi mobil ekibimiz 30 dakikada yanınızda olsun."
        canonical="/ariza-bildir"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-red-600">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">Acil Arıza Bildir</span>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-600 border border-red-500/20 text-xs font-black uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> 7/24 Seyyar Acil Müdahale
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Şantiye Acil Servis Çağrısı
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg mx-auto">
            Ortalama 30 dakikada tam donanımlı mobil araçlarımız, 500 bar hortum presimiz ve tecrübeli ustalarımızla sahadayız.
          </p>
        </div>

        {!successOrder ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            
            {/* Steps Progress */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-6 text-xs font-bold">
              <span className={step >= 1 ? 'text-red-600 font-black' : 'text-slate-400'}>1. Makine Bilgisi</span>
              <span className="text-slate-300">→</span>
              <span className={step >= 2 ? 'text-red-600 font-black' : 'text-slate-400'}>2. Arıza Tanımı</span>
              <span className="text-slate-300">→</span>
              <span className={step >= 3 ? 'text-red-600 font-black' : 'text-slate-400'}>3. Şantiye Konumu</span>
              <span className="text-slate-300">→</span>
              <span className={step >= 4 ? 'text-red-600 font-black' : 'text-slate-400'}>4. İletişim & Çağrı</span>
            </div>

            {/* Step 1: Makine */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <h3 className="text-base font-black text-slate-900">1. Makine ve Marka Bilgisi</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Makine Markası</label>
                    <select
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:bg-white focus:border-red-500"
                    >
                      <option>Caterpillar (CAT)</option>
                      <option>Komatsu</option>
                      <option>JCB</option>
                      <option>Hidromek</option>
                      <option>Volvo CE</option>
                      <option>Hitachi</option>
                      <option>Manitou / Merlo</option>
                      <option>Bobcat</option>
                      <option>Liebherr</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Makine Türü</label>
                    <select
                      value={formData.machineType}
                      onChange={(e) => setFormData({...formData, machineType: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:bg-white focus:border-red-500"
                    >
                      <option>Paletli Ekskavatör</option>
                      <option>Lastikli Ekskavatör</option>
                      <option>Kazıcı Yükleyici (Beko Loder)</option>
                      <option>Tekerlekli Loder</option>
                      <option>Teleskopik Yükleyici (Telehandler)</option>
                      <option>Dozer & Greyder</option>
                      <option>Mini Ekskavatör</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-red-600/20"
                  >
                    <span>İlerle: Arıza Bilgisi</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Arıza */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <h3 className="text-base font-black text-slate-900">2. Arıza Belirtisi ve Aciliyet</h3>
                
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Arıza Kategorisi / Parça</label>
                    <input
                      type="text"
                      value={formData.issueCategory}
                      onChange={(e) => setFormData({...formData, issueCategory: e.target.value})}
                      placeholder="Örn: Bom kaldırmıyor, hortum patladı, siyah duman..."
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Öncelik Seviyesi</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:bg-white focus:border-red-500"
                    >
                      <option>Acil (Şantiye Durdu - Hemen Müdahale)</option>
                      <option>Yüksek (Makine Güçten Düştü)</option>
                      <option>Normal (Periyodik Bakım / Filtre Değişimi)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200"
                  >
                    Geri
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-red-600/20"
                  >
                    <span>İlerle: Konum</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Konum */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <h3 className="text-base font-black text-slate-900">3. Şantiye Lokasyonu</h3>
                
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Şantiye / İlçe Adresi *</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="Örn: Seyhan OSB 12. Cadde veya Ceyhan Enerji Bölgesi..."
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-red-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 text-[11px]">
                    💡 Mobil servis araçlarımız Adana (Seyhan, Yüreğir, Çukurova, Sarıçam, Ceyhan, Kozan) ve Mersin, Tarsus, Osmaniye, Hatay şantiyelerine kesintisiz çıkış yapmaktadır.
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200"
                  >
                    Geri
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-red-600/20"
                  >
                    <span>İlerle: İletişim</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: İletişim */}
            {step === 4 && (
              <form onSubmit={handleFinish} className="space-y-4 animate-in fade-in duration-150">
                <h3 className="text-base font-black text-slate-900">4. Şantiye Sorumlusu İletişim</h3>

                {validationError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-center gap-2 animate-shake">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Yetkili / Şantiye Şefi Ad Soyad *</label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                      placeholder="Örn: Mehmet Usta / Ahmet Bey"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Telefon Numarası *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="05XX XXX XX XX"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1 text-xs">Ek Açıklama / Usta Notu</label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Ekstra takım veya özel hortum ölçüsü gerekiyorsa belirtiniz..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-red-500"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200"
                  >
                    Geri
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs rounded-xl flex items-center gap-2 shadow-xl shadow-red-600/30 transition-transform active:scale-95"
                  >
                    <Wrench className="w-4 h-4" />
                    <span>Nöbetçi Mobil Ekibi Hemen Çağır</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        ) : (
          /* Success Screen */
          <div className="bg-white border border-emerald-500/40 rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold block">Çağrınız Merkez Ekibimize Ulaştı</span>
              <h2 className="text-3xl font-mono font-black text-red-600 mt-1">{successOrder.code}</h2>
              <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                En yakın seyyar mobil servis aracımız şantiyenize yönlendirildi. Tahmini varış süresi: <strong>25-35 Dakika</strong>.
              </p>
            </div>

            <div className="max-w-sm mx-auto space-y-3 pt-2">
              <a
                href={getWhatsAppDispatchLink(successOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>WhatsApp ile Konum Gönder & Hızlandır</span>
              </a>

              <Link
                to={`/servis-takip?code=${successOrder.code}`}
                className="block w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors border border-slate-200"
              >
                Canlı Servis Aracını Haritada İzle
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
