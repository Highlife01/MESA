import React from 'react';
import { SEO } from '../components/SEO';
import { Link } from '../router/Router';
import { ShieldCheck, Award, Clock, Users, Wrench, CheckCircle2, ChevronRight, MapPin, Building, Activity, Layers } from 'lucide-react';

export const AboutPage = () => {
  const milestones = [
    { year: '2008', title: 'Adana\'da Kuruluş', desc: 'Mesa İş Makinaları, Seyhan sanayi merkezinde paletli ekskavatör ve bekoloder hidrolik revizyon atölyesi olarak faaliyete başladı.' },
    { year: '2013', title: 'Mobil Filo Yatırımı', desc: 'Çukurova taş ocakları ve otoyol projelerine yerinde 7/24 hizmet sunmak için ilk 5 tam donanımlı gezici servis aracı hizmete alındı.' },
    { year: '2017', title: '450 Bar Test İstasyonu & Entegre Tesis', desc: 'Kawasaki ve Rexroth hidrolik pompaları fabrika şartlarında yük altında test edebilen 450 bar dinamik test standı devreye girdi.' },
    { year: '2021', title: 'ERP & Dijital Servis Takip Ağı', desc: 'Müşterilerimizin makine servis süreçlerini canlı izleyebildiği ve iş emirlerinin dijitalleştiği bulut ERP altyapısına geçildi.' },
    { year: '2026', title: '5 Mobil Filo & Çukurova Liderliği', desc: 'Adana, Mersin, Hatay ve Osmaniye genelinde 5 mobil araç, 35 sertifikalı teknisyen ve yıllık 800+ revizyon kapasitesi.' }
  ];

  const certifications = [
    { name: 'ISO 9001:2015', desc: 'Kalite Yönetim Sistemi Uluslararası Akreditasyonu' },
    { name: 'ISO 45001:2018', desc: 'İş Sağlığı ve Güvenliği Şantiye Standartları' },
    { name: 'ISO 14001:2015', desc: 'Çevre ve Atık Yağ Yönetim Güvencesi' },
    { name: 'TSE Hizmet Yeterlilik', desc: 'Ağır İş Makinaları Yetkili Özel Servis Belgesi' }
  ];

  const facilityStats = [
    { label: 'Entegre Kapalı Alan', value: '2.500 m²', icon: Building },
    { label: 'Tavan Vinci Kapasitesi', value: '10 Ton Gezer Vinç', icon: Layers },
    { label: 'Dinamik Test Tezgahı', value: '450 Bar / 400 L/Dk', icon: Activity },
    { label: 'Aktif Mobil Servis Aracı', value: '5 Donanımlı Filo', icon: Wrench }
  ];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <SEO
        title="Kurumsal ve Atölye Altyapımız | Mesa İş Makinaları"
        description="2008'den bu yana Adana ve Çukurova genelinde 2.500 m² kapalı atölye, 10 ton vinç, 450 bar test standı ve 5 mobil servis aracıyla hizmet veren lider iş makinası revizyon merkezi."
        canonical="/hakkimizda"
        keywords="mesa iş makinaları hakkında, adana iş makinası servisi kurumsal, iş makinası atölyesi adana, hidrolik test standı, mobil servis filosu"
      />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4 text-amber-600" /> 18+ Yıllık Ağır Sanayi Tecrübesi
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Şantiyelerin Durmayan Gücü: <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600">Mesa İş Makinaları</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              2008 yılında Adana'da temelleri atılan Mesa İş Makinaları; ekskavatör, bekoloder, loder, dozer ve telehandler sınıfı ağır iş makinelerinin hidrolik, mekanik ve elektronik revizyonunda Türkiye'nin en yetkin özel servis merkezlerinden biridir.
            </p>
          </div>
        </div>
      </section>

      {/* Facility Highlights Grid */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {facilityStats.map((stat, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 shrink-0">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Mission & Values */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Sıfır Toleransla Revizyon, <br />
              <span className="text-red-600">Garantili Şantiye Performansı</span>
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Ağır iş makinelerinde bir parçanın 0.02 mm tolerans dışı olması; sahada yüzlerce bar hidrolik basınç altında kavitasyona, yağ ısınmasına ve erken kilitlenmeye yol açar. Mesa İş Makinaları olarak atölyemize giren her hidrolik pompayı, şanzımanı ve motoru sadece onarmakla kalmıyor; OEM fabrika test standartlarında basınç ve debi testlerine tabi tutuyoruz.
            </p>
            <p className="text-slate-500 leading-relaxed text-sm">
              Çukurova Bölgesi'nin zorlu sıcak iklim koşullarını, taş ocağı ve maden tozunu çok iyi biliyoruz. Bu nedenle revizyonlarımızda yüksek sıcaklığa ve basınca dayanıklı Viton sızdırmazlık keçeleri ve Tier-1 onaylı orijinal yedek parçalar kullanıyoruz.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <h4 className="text-slate-900 font-bold text-sm mb-1">12 Ay / 2000 Saat Garanti</h4>
                <p className="text-xs text-slate-500">Atölye revizyonlarımız resmi garanti belgesi ve test raporuyla teslim edilir.</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <h4 className="text-slate-900 font-bold text-sm mb-1">45 Dk Şantiye İntikali</h4>
                <p className="text-xs text-slate-500">Nöbetçi mobil acil ekiplerimizle Çukurova'nın her noktasına rekor sürede ulaşıyoruz.</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
              alt="Mesa İş Makinaları Atölye"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-slate-200 shadow-lg">
              <div className="text-red-600 font-bold text-sm mb-1">Adana Merkez Entegre Servis Tesisi</div>
              <div className="text-xs text-slate-600">Yeşiloba Mah. 46167. Sokak No: 19/A, 2.500 m² Kapalı Alan & 450 Bar Dinamik Hidrolik İstasyonu</div>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-slate-100/70 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Gelişim Yolculuğumuz</h2>
            <p className="text-slate-500 text-sm">2008'den günümüze kesintisiz yatırım, teknoloji ve güven.</p>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:w-0.5 before:bg-slate-300">
            {milestones.map((m, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row items-start ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-red-500 text-red-600 font-extrabold text-sm shadow-md z-10 shrink-0 self-start ml-0 md:ml-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                  {m.year}
                </div>
                <div className={`ml-20 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-14 md:text-right' : 'md:pl-14'}`}>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-red-500/40 transition-colors shadow-xs">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{m.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Kalite & Güvenlik Belgelerimiz</h2>
          <p className="text-slate-500 text-sm">Uluslararası standartlarda servis güvencesi.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((c, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 text-center hover:border-amber-500/50 transition-all shadow-xs">
              <Award className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <h4 className="text-slate-900 font-bold text-base mb-1">{c.name}</h4>
              <p className="text-xs text-slate-500">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
