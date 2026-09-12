import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Building, ShieldCheck, AlertCircle } from 'lucide-react';

export const ContactPage = () => {
  const [formState, setFormState] = useState({ name: '', phone: '', company: '', machineType: '', location: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const branches = [
    {
      city: 'Adana Merkez Atölye (HQ)',
      address: 'Yeşiloba Mah. Metal Sanayi Sitesi 46023 Sok. No: 18/A, Seyhan / ADANA',
      phone: '0533 529 36 74',
      type: '2.500 m² Ana Revizyon Tesisi & 450 Bar Test İstasyonu'
    },
    {
      city: 'Mersin Liman & Serbest Bölge Noktası',
      address: 'Akdeniz Mah. Liman Yolu Caddesi Lojistik Sanayi Bölgesi, MERSİN',
      phone: '0533 529 36 74',
      type: 'Gezici Mobil Müdahale & Liman Ekipmanları Servisi'
    },
    {
      city: 'Hatay İskenderun Demir-Çelik Üssü',
      address: 'İskenderun Organize Sanayi Bölgesi Girişi, İskenderun / HATAY',
      phone: '0533 529 36 74',
      type: 'Ağır Hizmet Ekskavatör & Kırıcı Mobil Desteği'
    },
    {
      city: 'Osmaniye Organize Sanayi (OOSB)',
      address: 'Toprakkale OSB 4. Cadde No: 12, OSMANİYE',
      phone: '0533 529 36 74',
      type: '7/24 Şantiye ve Taş Ocağı Hızlı Servis İstasyonu'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#0B0F19] text-slate-100 min-h-screen">
      <SEO
        title="İletişim ve Şantiye Servis Talebi | Mesa İş Makinaları"
        description="Mesa İş Makinaları Adana merkez atölyesi, Mersin, Hatay ve Osmaniye servis irtibat noktaları. 7/24 Acil Çağrı Hattı: 0533 529 36 74."
        canonical="/iletisim"
        keywords="mesa iş makinaları iletişim, adana iş makinası servisi telefon, şantiye acil servis iletişim, yeşiloba metal sanayi mesa"
      />

      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-slate-900 via-[#0B0F19] to-[#0B0F19] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Phone className="w-4 h-4" /> 7/24 Kesintisiz İletişim & Randevu
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Bize Ulaşın, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Hemen Çözelim</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            İster şantiyenize acil mobil servis çağırın, ister atölye revizyonu için teknik teklif alın. Ekiplerimiz 7/24 hizmetinizdedir.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Form Side */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-white mb-2">Servis & Teklif Talep Formu</h2>
            <p className="text-sm text-slate-400 mb-8">Bilgilerinizi bırakın, servis koordinatörümüz 10 dakika içinde sizi arasın.</p>

            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">Talebiniz Alındı!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                  Teknik koordinatörümüz makinenizin durumu ve konumunuz için en geç 10 dakika içinde sizinle iletişime geçecektir.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                >
                  Yeni Form Doldur
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Yetkili Adı Soyadı *</label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Ahmet Yılmaz"
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Telefon Numarası *</label>
                    <input
                      type="tel"
                      required
                      placeholder="05XX XXX XX XX"
                      value={formState.phone}
                      onChange={(e) => setFormState({...formState, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Firma / Şantiye Adı</label>
                    <input
                      type="text"
                      placeholder="Örn: Özdemir Madencilik A.Ş."
                      value={formState.company}
                      onChange={(e) => setFormState({...formState, company: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Makine Modeli & Tipi *</label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: CAT 320D / JCB 3CX / HMK 220"
                      value={formState.machineType}
                      onChange={(e) => setFormState({...formState, machineType: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Şantiye Lokasyonu (İl / İlçe) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Adana / Ceyhan Enerji İhtisas Bölgesi"
                    value={formState.location}
                    onChange={(e) => setFormState({...formState, location: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Arıza Tanımı veya Talep Detayı *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Makinenin arıza belirtilerini, verdiği hata kodunu veya istenen revizyonu belirtiniz..."
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Teknik Servis Talebini Gönder</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & Quick Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-8">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">Acil Çağrı Merkezi</span>
              <h3 className="text-2xl font-black text-white mb-2">7/24 Kesintisiz Hat</h3>
              <p className="text-slate-300 text-sm mb-6">Maden, taş ocağı ve yol şantiyelerinde acil duruşlar için nöbetçi usta hattımız:</p>
              <a
                href="tel:05335293674"
                className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-lg shadow-lg shadow-amber-500/20 transition-all w-full justify-center"
              >
                <Phone className="w-5 h-5" /> 0533 529 36 74
              </a>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-6">
              <h3 className="text-lg font-bold text-white mb-4">Genel İletişim</h3>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Merkez Atölye</div>
                  <div className="text-sm font-semibold text-white">Yeşiloba Mah. Metal Sanayi Sitesi, Seyhan / ADANA</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">E-Posta Adresleri</div>
                  <div className="text-sm font-semibold text-white">servis@mesais.com / info@mesais.com</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Çalışma Saatleri</div>
                  <div className="text-sm font-semibold text-white">Atölye: 08:00 - 19:00 | Mobil Servis: 7/24 Kesintisiz</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Regional Branches */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8">Bölgesel Hizmet & İrtibat Ağımız</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {branches.map((b, idx) => (
              <div key={idx} className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                  <Building className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-sm mb-1">{b.city}</h4>
                <p className="text-xs text-slate-400 mb-3">{b.address}</p>
                <div className="text-[11px] text-amber-400/90 font-medium bg-slate-950 p-2 rounded-lg border border-slate-800">
                  {b.type}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
