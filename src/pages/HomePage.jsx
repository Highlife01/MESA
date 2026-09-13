import React, { useState } from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { 
  Wrench, Truck, Activity, ShieldAlert, Phone, 
  MapPin, Clock, CheckCircle2, ChevronRight, Star, ArrowRight, ArrowUpRight,
  ShieldCheck, Zap, Layers, ChevronDown, Check, Cpu, Sparkles, Navigation
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { guidesData } from '../data/guidesData';
import { brandsData } from '../data/brandsData';
import { GoogleReviewsWidget } from '../components/GoogleReviewsWidget';

export function HomePage() {
  const [openFaq, setOpenFaq] = useState(null);

  const homeFaqs = [
    {
      q: 'Arıza bildirimi yaptıktan sonra ekibiniz ne kadar sürede şantiyeye ulaşır?',
      a: 'Adana merkez, Seyhan, Yüreğir ve Çukurova ilçelerinde ortalama varış süremiz 30 dakikadır. Ceyhan, Kozan, Tarsus ve Osmaniye şantiyeleri için ise 45-60 dakika içerisinde tam donanımlı mobil servis aracımızla yerinde oluyoruz.'
    },
    {
      q: 'Hangi marka ve model iş makinelerine teknik servis sağlıyorsunuz?',
      a: 'Caterpillar (CAT), JCB, Hidromek, Komatsu, Volvo, Manitou, Merlo, Bobcat, Hitachi ve Liebherr başta olmak üzere paletli/lastikli tüm ekskavatör, loder, kazıcı yükleyici ve telehandler makinelerine orijinal arıza tespit yazılımlarıyla hizmet veriyoruz.'
    },
    {
      q: 'Şantiye ortamında hangi işlemler yerinde yapılabilir?',
      a: 'Araçlarımızda 500 Bar hidrolik hortum presi, 15 kVA jeneratör, gazaltı kaynak, yağ dolum üniteleri ve diagnostik cihazlar bulunmaktadır. Yerinde hortum imalatı, pompa arıza tespiti, motor elektronik kalibrasyonu, elektrik tesisat tamiri ve periyodik filtre-yağ bakımları doğrudan şantiyenizde yapılır.'
    },
    {
      q: 'Yapılan tamir ve revizyon işlemlerinde garanti süresi nedir?',
      a: 'Mesa bünyesinde revize edilen tüm hidrolik pompalar, şanzımanlar, diferansiyeller ve motorlar 12 ay veya 2000 çalışma saati yazılı resmi servis garantimiz altındadır.'
    }
  ];

  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    'name': 'MESA İş Makinaları Teknik Servis & Hidrolik Sistemler',
    'image': 'https://mesaismakinalari.com.tr/images/mesa-excavator-hero.png',
    'description': 'Türkiye genelinde 18 mobil araçla 7/24 yerinde iş makinası tamiri, hidrolik pompa, teleskopik yükleyici, şanzıman ve motor revizyon servisi.',
    'areaServed': ['Türkiye'],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Seyhan OSB, Şantiyeler Yolu No: 48',
      'addressLocality': 'Seyhan',
      'addressRegion': 'Adana',
      'postalCode': '01000',
      'addressCountry': 'TR'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 37.0000,
      'longitude': 35.3213
    },
    'url': 'https://mesaismak.web.app',
    'telephone': '+905335293674',
    'priceRange': '₺₺',
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        'opens': '00:00',
        'closes': '23:59'
      }
    ]
  };

  // Helper to pick the best authentic photography for service cards
  const getServicePhoto = (service) => {
    if (service.slug === 'hidrolik-sistem-tamiri' || service.id === 'hidrolik-sistem-tamiri') {
      return '/images/mesa-workshop.png';
    }
    if (service.slug === 'is-makinasi-tamiri' || service.id === 'is-makinasi-tamiri') {
      return '/images/mesa-excavator-hero.png';
    }
    return service.heroImage || '/images/mesa-workshop.png';
  };

  return (
    <div className="min-h-screen bg-[#f6f5f1] text-[#171918]">
      <SEO 
        title="MESA İş Makinaları | Teknik Servis & Hidrolik Sistemler"
        description="Adana ve Çukurova genelinde 18 mobil araçla 7/24 yerinde iş makinası tamiri, hidrolik pompa, teleskopik sistem, ekskavatör ve forklift tamiri."
        canonical="/"
        schema={jsonLdSchema}
      />

      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION: High-Impact Industrial Aesthetic
          Featuring: /images/mesa-excavator-hero.png
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#171918] text-white min-h-[580px] lg:min-h-[660px] flex items-center">
        {/* Background Excavator Hero Image (Optimized 16:9 Right-Winged) */}
        <div 
          className="absolute inset-0 bg-cover bg-center lg:bg-right bg-no-repeat pointer-events-none opacity-85 lg:opacity-100"
          style={{ backgroundImage: `url('/images/mesa-excavator-hero.png')` }}
          role="img"
          aria-label="Mesa İş Makinaları paletli ekskavatör şantiye çalışması"
        />

        {/* Sophisticated Multi-Stop Dark Anthracite Gradients for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#171918]/95 via-[#171918]/85 to-[#171918] lg:hidden" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#171918] via-[#171918]/90 via-55% to-transparent" />
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#171918]/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#171918] to-transparent pointer-events-none" />

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left 7 Columns: Core Value Proposition & Primary Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Emergency Status Pill */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#f6c600]/15 border border-[#f6c600]/40 text-[#f6c600] text-xs font-black tracking-wider uppercase backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#f6c600] animate-ping" />
                <span>TÜRKİYE GENELİ 7/24 MOBİL SERVİS AĞI</span>
              </div>

              {/* Dominant Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                ŞANTİYENİZ DURMASIN <br />
                <span className="text-[#f6c600]">
                  TÜM TÜRKİYE'DE GÜCÜNÜZ SAHADA KALSIN.
                </span>
              </h1>

              {/* Subtitle & Value Proposition */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Ekskavatör, loder, bekoloder ve teleskopik yükleyiciler için <strong className="text-white font-bold">18 tam donanımlı mobil araçla</strong> Türkiye'nin her bölgesine <strong className="text-[#f6c600] font-bold">yerinde müdahale</strong>, 500 Bar seyyar hortum presi ve 12 ay resmi servis garantisi.
              </p>

              {/* Primary Call-to-Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-2">
                
                {/* 1. Request Service (Solid Yellow Brand Button) */}
                <Link 
                  to="/ariza-bildir"
                  className="px-8 py-4 rounded-xl bg-[#f6c600] hover:bg-[#e5b900] text-[#171918] font-black text-sm shadow-xl shadow-[#f6c600]/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <ShieldAlert className="w-5 h-5 text-[#171918]" />
                  <span>7/24 Acil Arıza Bildir</span>
                  <ArrowUpRight className="w-4 h-4 text-[#171918]" />
                </Link>

                {/* 2. Direct Call Dispatcher */}
                <a 
                  href="tel:05335293674"
                  className="px-7 py-4 rounded-xl bg-[#171918]/80 hover:bg-[#232725] border border-white/20 text-white font-bold text-sm flex items-center justify-center gap-2.5 transition backdrop-blur-md"
                >
                  <Phone className="w-4 h-4 text-[#f6c600]" />
                  <span>0533 529 36 74 Usta Çağır</span>
                </a>

                {/* 3. Service Tracking */}
                <Link
                  to="/servis-takip"
                  className="px-5 py-4 rounded-xl border border-[#f6c600]/30 text-white/90 hover:text-white hover:bg-white/5 font-semibold text-sm flex items-center justify-center gap-1.5 transition"
                >
                  <span>Servis Takibi</span>
                  <ArrowRight className="w-4 h-4 text-[#f6c600]" />
                </Link>
              </div>

              {/* Quick AI Fault Code Lookup Pill */}
              <div className="pt-1 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-[#f6c600] font-bold">
                  <Cpu className="w-3.5 h-3.5" /> DTC Arıza Kodu:
                </span>
                <span>Makinenizin ekranındaki hata kodunu hemen çözün</span>
                <Link to="/ariza-kodu-cozucu" className="text-[#f6c600] hover:underline font-bold inline-flex items-center">
                  Çözücüye Git <ArrowRight className="w-3 h-3 ml-0.5" />
                </Link>
              </div>

              {/* Trust Indicators Strip */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#f6c600]">18+</div>
                  <div className="text-xs text-slate-400 font-medium">Donanımlı Mobil Araç</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#f6c600]">30 Dk</div>
                  <div className="text-xs text-slate-400 font-medium">Ortalama Varış Süresi</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#f6c600]">450 Bar</div>
                  <div className="text-xs text-slate-400 font-medium">Dinamik Test Tezgahı</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#f6c600]">12 Ay</div>
                  <div className="text-xs text-slate-400 font-medium">Yazılı Servis Garantisi</div>
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Live Field Dispatch Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#171918]/90 border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#f6c600]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <div>
                    <span className="text-[10px] font-bold text-[#f6c600] uppercase tracking-wider block">CANLI SAHA TELEMETRİ</span>
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <span>Nöbetçi Mobil Ekipler</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">18/18 Aktif</span>
                    </h3>
                  </div>
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-[#f6c600]/20 text-[#f6c600] flex items-center justify-center font-bold shrink-0">
                        01
                      </div>
                      <div>
                        <div className="font-bold text-white">Seyhan & Yüreğir Hattı</div>
                        <div className="text-slate-400 text-[11px]">Mobil Ekip 01 (Ford Transit 4x4 • Mehmet Usta)</div>
                      </div>
                    </div>
                    <span className="text-emerald-400 font-bold shrink-0">Müsait • 14 Dk</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-[#f6c600]/20 text-[#f6c600] flex items-center justify-center font-bold shrink-0">
                        02
                      </div>
                      <div>
                        <div className="font-bold text-white">Ceyhan & Yumurtalık Sanayi</div>
                        <div className="text-slate-400 text-[11px]">Mobil Ekip 02 (Iveco Daily • Ahmet Usta)</div>
                      </div>
                    </div>
                    <span className="text-amber-400 font-bold shrink-0">Görevde • Şantiyede</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-[#f6c600]/20 text-[#f6c600] flex items-center justify-center font-bold shrink-0">
                        03
                      </div>
                      <div>
                        <div className="font-bold text-white">Tarsus & Mersin Liman Hattı</div>
                        <div className="text-slate-400 text-[11px]">Mobil Ekip 03 (Renault Master • Can Usta)</div>
                      </div>
                    </div>
                    <span className="text-emerald-400 font-bold shrink-0">Müsait • 20 Dk</span>
                  </div>
                </div>

                {/* Direct Emergency Call Button Inside Card */}
                <div className="mt-5 pt-4 border-t border-white/10">
                  <a 
                    href="tel:05335293674" 
                    className="w-full py-3 rounded-xl bg-[#f6c600] hover:bg-[#e5b900] text-[#171918] font-black text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-[#f6c600]/20"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Hemen En Yakın Mobil Servisi Çağır (0533 529 36 74)</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. SUPPORTED BRANDS STRIP (OEM DIAGNOSTICS & SPARES)
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#1c1f1d] text-white py-8 border-y border-white/10" id="markalar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-bold text-[#f6c600] tracking-widest uppercase block">DÜNYA STANDARTLARINDA TEŞHİS</span>
              <h2 className="text-lg font-black text-white">Yetkili Seviyede Desteklenen İş Makinası Markaları</h2>
            </div>
            <Link 
              to="/markalar"
              className="text-xs font-bold text-[#f6c600] hover:underline flex items-center gap-1 self-start md:self-auto"
            >
              <span>Tüm Markaları İncele</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {brandsData.slice(0, 6).map(brand => (
              <div 
                key={brand.name}
                className="p-3.5 rounded-xl bg-[#171918] border border-white/10 hover:border-[#f6c600]/40 transition-all flex flex-col justify-between space-y-1.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">{brand.origin}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <h3 className="text-sm font-black text-white group-hover:text-[#f6c600] transition-colors">{brand.name}</h3>
                <p className="text-[10px] text-slate-400 line-clamp-1">
                  {brand.specialty}
                </p>
                <div className="text-[9px] text-[#f6c600]/90 font-mono pt-1 border-t border-white/5">
                  {brand.diagnostics}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. THREE-STEP RAPID SERVICE PROCESS (HIZLI ÇÖZÜM SÜRECİ)
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#e4e3db] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#171918] tracking-widest uppercase block mb-1">HIZLI ÇÖZÜM DÖNGÜSÜ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#171918] tracking-tight">Arızadan Sahaya 3 Adımda Kesintisiz Çözüm</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="relative p-6 rounded-2xl bg-[#f6f5f1] border border-[#deded5] hover:border-[#f6c600] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#f6c600] text-[#171918] font-black text-xl flex items-center justify-center shadow-md mb-4 group-hover:scale-105 transition-transform">
                01
              </div>
              <h3 className="font-black text-base text-[#171918] mb-2">Arıza Bildirimi & GPS Konum</h3>
              <p className="text-xs text-[#555850] leading-relaxed">
                Web üzerinden veya <strong className="text-[#171918]">0533 529 36 74</strong> hattımızdan arıza kodunu ve şantiye konumunuzu iletin.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-2xl bg-[#f6f5f1] border border-[#deded5] hover:border-[#f6c600] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#f6c600] text-[#171918] font-black text-xl flex items-center justify-center shadow-md mb-4 group-hover:scale-105 transition-transform">
                02
              </div>
              <h3 className="font-black text-base text-[#171918] mb-2">En Yakın Mobil Ekip Yolda</h3>
              <p className="text-xs text-[#555850] leading-relaxed">
                GPS rotalama ile Çukurova genelindeki 18 donanımlı servis aracımızdan en yakını 30 dakikada şantiyenize ulaşır.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-2xl bg-[#f6f5f1] border border-[#deded5] hover:border-[#f6c600] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#f6c600] text-[#171918] font-black text-xl flex items-center justify-center shadow-md mb-4 group-hover:scale-105 transition-transform">
                03
              </div>
              <h3 className="font-black text-base text-[#171918] mb-2">Yerinde Onarım & Test Raporu</h3>
              <p className="text-xs text-[#555850] leading-relaxed">
                Yerinde hortum presleme, valf ayarı ve pompa yük testleri tamamlanır; dijital imzalı 12 ay garantili protokol teslim edilir.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. CORE SERVICES GRID (PHOTO-RICH SERVICE CARDS)
          Featuring /images/mesa-workshop.png & Real Equipment Photos
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto" id="hizmetler">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-[#816200] tracking-widest uppercase block">UZMANLIK ALANLARIMIZ</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#171918] tracking-tight mt-1">
              Garantili Ağır İş Makinası Hizmetleri
            </h2>
            <p className="text-sm text-[#555850] mt-2 max-w-xl">
              Paletli ekskavatörden bekolodere, hidrolik ana pompadan cer dişlisine kadar komple mekanik revizyon çözümleri.
            </p>
          </div>

          <Link 
            to="/hizmetler"
            className="inline-flex items-center text-sm font-bold text-[#171918] hover:text-[#816200] group"
          >
            <span>Tüm Hizmet Kataloğunu İncele</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.slice(0, 8).map(service => (
            <div 
              key={service.slug}
              className="bg-white rounded-2xl border border-[#deded5] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#f6c600] transition-all duration-300 flex flex-col group"
            >
              {/* Photo Area */}
              <div className="h-48 relative overflow-hidden bg-[#171918]">
                <img 
                  src={getServicePhoto(service)} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171918] via-transparent to-transparent opacity-85" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#171918]/90 backdrop-blur text-[10px] font-bold text-[#f6c600] border border-white/10">
                  {service.category}
                </span>
                <span className="absolute bottom-3 right-3 text-[11px] font-bold bg-[#f6c600] text-[#171918] px-2 py-0.5 rounded">
                  {service.duration}
                </span>
              </div>

              {/* Text Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-black text-[#171918] group-hover:text-[#816200] transition leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#555850] mt-2 line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e4e3db] flex items-center justify-between text-xs">
                  <span className="text-[#555850] font-medium text-[11px]">
                    🛡️ {service.warranty}
                  </span>
                  <Link 
                    to={`/hizmetler/${service.slug}`}
                    className="font-bold text-[#171918] hover:text-[#816200] flex items-center group-hover:underline"
                  >
                    Detay →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. WORKSHOP & ON-SITE TECHNICAL CAPABILITIES (ATÖLYE SHOWCASE)
          Featuring /images/mesa-workshop.png
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-[#171918] text-white rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left 6 Cols: Photo of Workshop Hydraulic Repair */}
            <div className="lg:col-span-6 relative h-72 lg:h-[460px] overflow-hidden">
              <img 
                src="/images/mesa-workshop.png" 
                alt="Mesa İş Makinaları Atölye ve Hidrolik Pompa Revizyonu"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#171918] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171918] via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 text-[11px] font-semibold text-[#f6c600]">
                🔧 Seyhan Merkez Atölyesi • Hidrolik Test Standı
              </div>
            </div>

            {/* Right 6 Cols: Technical Capabilities & Fleet Specs */}
            <div className="lg:col-span-6 p-8 sm:p-12 space-y-5">
              <span className="px-3 py-1 rounded-full bg-[#f6c600]/15 text-[#f6c600] text-xs font-black tracking-wider uppercase border border-[#f6c600]/30">
                MERKEZ ATÖLYE & SAHA DONANIMI
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                Mühendislik Hassasiyetiyle <br />
                <span className="text-[#f6c600]">12 Ay Garantili Revizyon</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Adana Seyhan OSB merkez atölyemizde 10 ton gezer vinç, 450 Bar dinamik hidrolik test standı ve seyyar borwerk delik honlama tezgahları ile ağır iş makinelerinizi sıfır toleransla yeniliyoruz.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-white">
                  <Check className="w-4 h-4 text-[#f6c600] shrink-0" />
                  <span>500 Bar Mobil Hortum Presi</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-white">
                  <Check className="w-4 h-4 text-[#f6c600] shrink-0" />
                  <span>15 kVA Bağımsız Dizel Jeneratör</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-white">
                  <Check className="w-4 h-4 text-[#f6c600] shrink-0" />
                  <span>450 Bar Dinamik Akış Test Standı</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-white">
                  <Check className="w-4 h-4 text-[#f6c600] shrink-0" />
                  <span>Seyyar Borwerk Delik Honlama</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  to="/filo"
                  className="px-6 py-3.5 rounded-xl bg-[#f6c600] hover:bg-[#e5b900] text-[#171918] font-black text-xs inline-flex items-center gap-2 transition"
                >
                  <Truck className="w-4 h-4 text-[#171918]" />
                  <span>18 Mobil Servis Aracını İncele</span>
                </Link>
                <Link
                  to="/hakkimizda"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 inline-flex items-center gap-2 transition"
                >
                  <span>Atölyemizi Tanıyın →</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. TECHNICAL GUIDES & KNOWLEDGE BASE
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#171918] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#f6c600] tracking-wider uppercase block mb-1">
                MESA BİLGİ BANKASI & MÜHENDİSLİK KILAVUZLARI
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Şantiye ve Makine <span className="text-[#f6c600]">Teknik Rehberleri</span>
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                Hidrolik pompa ömrünü uzatan ISO 4406 yağ kirliliği standartları, DPF rejenerasyonu ve saat kademeli periyodik bakım stratejileri.
              </p>
            </div>
            <Link
              to="/rehberler"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-[#f6c600] font-bold text-xs border border-white/10 transition-all shrink-0 self-start md:self-end"
            >
              <span>Tüm Rehberleri Oku</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guidesData.slice(0, 3).map((g) => (
              <article
                key={g.id}
                className="bg-[#1c1f1d] border border-white/10 rounded-2xl p-6 hover:border-[#f6c600]/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f6c600]/10 text-[#f6c600] font-semibold border border-[#f6c600]/20 text-[11px]">
                      {g.category}
                    </span>
                    <span className="text-[11px]">{g.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#f6c600] transition-colors mb-2 line-clamp-2">
                    {g.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {g.shortDesc}
                  </p>
                </div>
                <Link
                  to={`/rehberler/${g.slug}`}
                  className="text-xs font-semibold text-[#f6c600] hover:underline inline-flex items-center gap-1 mt-auto"
                >
                  <span>Detaylı İncele</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. CUSTOMER TESTIMONIALS & REAL PROOF
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#f6f5f1] border-t border-[#deded5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#816200] tracking-widest uppercase block">GÜVEN VE MEMNUNİYET</span>
            <h2 className="text-3xl font-black text-[#171918] tracking-tight mt-1">
              Şantiye Şefleri ve Müteahhitler Ne Diyor?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#deded5] shadow-xs space-y-4">
              <div className="flex text-[#f6c600] space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#f6c600]" />)}
              </div>
              <p className="text-xs text-[#555850] leading-relaxed italic">
                "Ceyhan boru hattı şantiyemizde CAT 336 ekskavatörümüzün ana hidrolik pompası kilitlenmişti. Mesa mobil ekibi 40 dakikada geldi, arızalı pompayı söküp kendi atölyelerinde aynı gün içinde test tezgahında revize ederek teslim etti. İşimiz aksamadı."
              </p>
              <div className="border-t border-[#e4e3db] pt-3">
                <div className="text-xs font-black text-[#171918]">Ahmet K.</div>
                <div className="text-[11px] text-[#7a7c74]">Makineler Şefi • Ceyhan Enerji Projesi</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#deded5] shadow-xs space-y-4">
              <div className="flex text-[#f6c600] space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#f6c600]" />)}
              </div>
              <p className="text-xs text-[#555850] leading-relaxed italic">
                "Manitou MT 1840 telehandlerımızın bom açma zinciri kopmuştu ve yükte kalmıştı. Gece saat 22:30'da aradık, nöbetçi usta ekibiyle gelip 3 saatte emniyet kalibrasyonlarıyla birlikte işi bitirdi. Harika bir ekip."
              </p>
              <div className="border-t border-[#e4e3db] pt-3">
                <div className="text-xs font-black text-[#171918]">Mehmet T.</div>
                <div className="text-[11px] text-[#7a7c74]">Proje Müdürü • Mersin Konut Şantiyesi</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#deded5] shadow-xs space-y-4">
              <div className="flex text-[#f6c600] space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#f6c600]" />)}
              </div>
              <p className="text-xs text-[#555850] leading-relaxed italic">
                "8 adet JCB 3CX bekoloderimizin tüm periyodik filtre-yağ bakımlarını ve şanzıman revizyonlarını Mesa yapıyor. Online müşteri panelinden tüm geçmiş servis fişlerini ve parça maliyetlerini görebilmek müthiş kolaylık."
              </p>
              <div className="border-t border-[#e4e3db] pt-3">
                <div className="text-xs font-black text-[#171918]">Hakan Ç.</div>
                <div className="text-[11px] text-[#7a7c74]">Filo Yöneticisi • Çukurova Hafriyat Ltd.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. GOOGLE REVIEWS LIVE WIDGET
      ───────────────────────────────────────────────────────────── */}
      <div className="my-16">
        <GoogleReviewsWidget />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          9. FAQ ACCORDION SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto" id="sss">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#816200] tracking-widest uppercase block">MERAK EDİLENLER</span>
          <h2 className="text-3xl font-black text-[#171918] tracking-tight mt-1">
            Sıkça Sorulan Sorular
          </h2>
        </div>

        <div className="space-y-3">
          {homeFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-[#deded5] overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between font-bold text-sm text-[#171918] hover:text-[#816200] transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#816200]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-xs text-[#555850] leading-relaxed border-t border-[#e4e3db] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. BOTTOM EMERGENCY CALL BANNER
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#171918] text-white py-14 px-4 sm:px-6 text-center border-t border-white/10">
        <div className="max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            Şantiyede Acil Bir Durum mu Var?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Hemen bizi arayın veya online servis talebi oluşturun, nöbetçi ustamız 2 dakika içinde sizinle irtibata geçsin.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a 
              href="tel:05335293674" 
              className="px-7 py-3.5 rounded-xl bg-[#f6c600] hover:bg-[#e5b900] text-[#171918] font-black text-xs shadow-lg transition flex items-center space-x-2"
            >
              <Phone className="w-4 h-4 text-[#171918]" />
              <span>0533 529 36 74 Hemen Ara</span>
            </a>
            <Link 
              to="/ariza-bildir"
              className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/20 transition"
            >
              Online Arıza Formu Doldur →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
