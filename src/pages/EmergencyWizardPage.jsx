import React, { useState } from 'react';
import { Link, useNavigate } from '../router/Router';
import { SEO } from '../components/SEO';
import { 
  ShieldAlert, Wrench, MapPin, Camera, Mic, 
  CheckCircle2, ArrowRight, ArrowLeft, Phone, Clock, Truck
} from 'lucide-react';

export function EmergencyWizardPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [successCode, setSuccessCode] = useState(null);

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

  const handleFinish = (e) => {
    e.preventDefault();
    const generatedCode = `MS-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setSuccessCode(generatedCode);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <SEO 
        title="7/24 Acil Arıza Bildirim Sihirbazı"
        description="Şantiyenizdeki iş makinası arızasını 1 dakikada bildirin, en yakın nöbetçi mobil ekibimiz 30 dakikada yanınızda olsun."
        canonical="/ariza-bildir"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-amber-600">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">Acil Arıza Bildir</span>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 text-xs font-black uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-2" />
            7/24 DİJİTAL SAHA ACİL SEVK
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Acil Servis Bildirim Sihirbazı
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Makinenizin bilgilerini girin, en yakın donanımlı mobil servis aracımız derhal şantiyenize sevk edilsin.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {successCode ? (
            /* Success Screen */
            <div className="p-8 sm:p-14 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">BİLDİRİMİNİZ BAŞARIYLA ALINDI</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  En Yakın Ekip Şantiyenize Yönlendirildi!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  Talebiniz nöbetçi usta şefimize iletildi. Nöbetçi servisimiz 2 dakika içinde <strong>{formData.phone || 'telefon numaranızdan'}</strong> sizi arayarak tahmini varış süresini teyit edecektir.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 max-w-sm mx-auto">
                <div className="text-xs text-amber-800 font-medium">CANLI SERVİS TAKİP KODUNUZ</div>
                <div className="text-2xl font-black text-slate-950 font-mono tracking-wider mt-1">{successCode}</div>
                <div className="text-[11px] text-amber-700 mt-1">Bu kodu canlı takip sayfasından sorgulayabilirsiniz.</div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => navigate('/servis-takip')}
                  className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs flex items-center space-x-2 transition"
                >
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span>Canlı Servis Takibine Git</span>
                </button>

                <a 
                  href="tel:05325550128"
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center space-x-2 transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>0532 555 01 28 Usta ile Konuş</span>
                </a>
              </div>
            </div>
          ) : (
            /* Multi-step Form */
            <div>
              {/* Steps Progress */}
              <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-xs text-white border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${step >= 1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800'}`}>1</span>
                  <span className={step === 1 ? 'font-bold text-amber-400' : 'text-slate-400 hidden sm:inline'}>Makine Bilgisi</span>
                </div>
                <div className="w-8 sm:w-12 h-0.5 bg-slate-800" />

                <div className="flex items-center space-x-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${step >= 2 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800'}`}>2</span>
                  <span className={step === 2 ? 'font-bold text-amber-400' : 'text-slate-400 hidden sm:inline'}>Arıza Detayı</span>
                </div>
                <div className="w-8 sm:w-12 h-0.5 bg-slate-800" />

                <div className="flex items-center space-x-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${step >= 3 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800'}`}>3</span>
                  <span className={step === 3 ? 'font-bold text-amber-400' : 'text-slate-400 hidden sm:inline'}>Şantiye Konumu</span>
                </div>
              </div>

              <form onSubmit={step === 3 ? handleFinish : (e) => { e.preventDefault(); setStep(step + 1); }} className="p-6 sm:p-10 space-y-6">
                {/* Step 1: Machine details */}
                {step === 1 && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2">
                      1. Adım: Arızalı Makine Bilgileri
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Makine Markası *</label>
                        <select 
                          value={formData.brand}
                          onChange={e => setFormData({...formData, brand: e.target.value})}
                          className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                        >
                          <option>Caterpillar (CAT)</option>
                          <option>JCB</option>
                          <option>Hidromek</option>
                          <option>Komatsu</option>
                          <option>Volvo</option>
                          <option>Manitou</option>
                          <option>Merlo</option>
                          <option>Bobcat</option>
                          <option>Liebherr</option>
                          <option>Hitachi</option>
                          <option>Diğer Marka</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Makine Türü / Ekipman *</label>
                        <select 
                          value={formData.machineType}
                          onChange={e => setFormData({...formData, machineType: e.target.value})}
                          className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                        >
                          <option>Paletli Ekskavatör</option>
                          <option>Lastikli Ekskavatör</option>
                          <option>Kazıcı Yükleyici (Beko Loder)</option>
                          <option>Teleskopik Yükleyici (Telehandler)</option>
                          <option>Lastikli Loder</option>
                          <option>Mini Ekskavatör / Bobcat</option>
                          <option>Greyder / Dozer</option>
                          <option>Mobil Vinç / Kırıcı</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Model / Seri No (Varsa)</label>
                        <input 
                          type="text" 
                          placeholder="Örn: 320D2, 3CX, MT 1440"
                          value={formData.modelYear}
                          onChange={e => setFormData({...formData, modelYear: e.target.value})}
                          className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Aciliyet Seviyesi</label>
                        <select 
                          value={formData.priority}
                          onChange={e => setFormData({...formData, priority: e.target.value})}
                          className="w-full p-3 rounded-xl bg-amber-50 border border-amber-300 font-bold text-amber-900"
                        >
                          <option>Acil (Şantiye Durdu - Hemen Çıkış)</option>
                          <option>Normal (Bugün İçerisinde)</option>
                          <option>Planlı Randevu (İleri Tarih)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Issue details */}
                {step === 2 && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2">
                      2. Adım: Arıza Belirtisi ve Şikayet
                    </h3>

                    <div className="text-xs space-y-4">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Ana Arıza Kategorisi *</label>
                        <select 
                          value={formData.issueCategory}
                          onChange={e => setFormData({...formData, issueCategory: e.target.value})}
                          className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                        >
                          <option>Hidrolik Basınç Düşüklüğü / Pompa</option>
                          <option>Hidrolik Hortum Patlaması (Pres Gerekli)</option>
                          <option>Silindir / Piston Yağ Kaçağı</option>
                          <option>Motor Çalışmıyor / Stop Ediyor</option>
                          <option>Şanzıman / Vites Vuruntusu & Yürümüyor</option>
                          <option>Teleskopik Bom Açmıyor / Zincir Sorunu</option>
                          <option>Elektrik & Beyin (ECU) Arıza Kodu</option>
                          <option>Periyodik Bakım & Filtre Değişimi</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Arıza Detayları / Görülen Belirtiler</label>
                        <textarea 
                          rows={3}
                          placeholder="Makine ısınınca kule dönmüyor, ekranda E-12 arıza kodu veriyor..."
                          value={formData.notes}
                          onChange={e => setFormData({...formData, notes: e.target.value})}
                          className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200"
                        />
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 flex items-center justify-around text-center">
                        <div className="cursor-pointer p-2 hover:text-amber-600 transition">
                          <Camera className="w-6 h-6 mx-auto text-slate-400 mb-1" />
                          <span className="text-[11px] font-bold">Arıza Fotoğrafı Ekle</span>
                        </div>
                        <div className="cursor-pointer p-2 hover:text-amber-600 transition">
                          <Mic className="w-6 h-6 mx-auto text-slate-400 mb-1" />
                          <span className="text-[11px] font-bold">Sesli Açıklama Bırak</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Location and Contact */}
                {step === 3 && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2">
                      3. Adım: Şantiye Konumu ve Yetkili Bilgisi
                    </h3>

                    <div className="text-xs space-y-4">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Şantiye / Konum Adresi *</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            required
                            placeholder="Örn: Ceyhan Yolu 12. Km, Misis Köprüsü Şantiyesi"
                            value={formData.location}
                            onChange={e => setFormData({...formData, location: e.target.value})}
                            className="w-full p-3 pl-10 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                          />
                          <MapPin className="w-4 h-4 text-amber-600 absolute left-3 top-3.5" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Yetkili Adı Soyadı *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Ahmet Kaya"
                            value={formData.customerName}
                            onChange={e => setFormData({...formData, customerName: e.target.value})}
                            className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Yetkili Telefon Numarası *</label>
                          <input 
                            type="tel" 
                            required
                            placeholder="0532 555 01 28"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                            className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200"
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 flex items-start space-x-3">
                        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="text-[11px] leading-relaxed font-medium">
                          Onayınızla birlikte en yakın gezici servis aracımız konumunuza doğru yola çıkarılacak ve operatörümüz size telefonla onay verecektir.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Buttons */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center space-x-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                      <span>Geri</span>
                    </button>
                  ) : <div />}

                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 flex items-center space-x-1.5 transition"
                  >
                    <span>{step === 3 ? 'Arıza Bildirimini Onayla & Ekip Çıkar' : 'Devam Et'}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
