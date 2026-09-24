import React, { useState } from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { 
  Wrench, Truck, Activity, ShieldAlert, Phone, 
  MapPin, Clock, CheckCircle2, ChevronRight, Star, ArrowRight, ArrowUpRight,
  ShieldCheck, Zap, Layers, ChevronDown, Check, Cpu, Sparkles, Navigation, Gauge, Shield
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { guidesData } from '../data/guidesData';
import { activeCitiesData } from '../data/citiesData';
import { GoogleReviewsWidget } from '../components/GoogleReviewsWidget';
import BrandMarquee from '../components/BrandMarquee';
import { SITE_CONFIG } from '../config/siteConfig';

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
    'name': SITE_CONFIG.legalName,
    'alternateName': SITE_CONFIG.siteName,
    'image': SITE_CONFIG.logo,
    'description': 'Türkiye genelinde 81 ilde şantiyede yerinde mobil iş makinası tamiri, hidrolik pompa, teleskopik yükleyici, şanzıman ve motor revizyon servisi.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': SITE_CONFIG.headquarters.street,
      'addressLocality': SITE_CONFIG.headquarters.district,
      'addressRegion': SITE_CONFIG.headquarters.city,
      'postalCode': SITE_CONFIG.headquarters.postalCode,
      'addressCountry': 'TR'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': SITE_CONFIG.headquarters.latitude,
      'longitude': SITE_CONFIG.headquarters.longitude
    },
    'url': SITE_CONFIG.siteUrl,
    'telephone': SITE_CONFIG.phoneRaw,
    'email': SITE_CONFIG.email,
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

  const getServicePhoto = (service) => {
    if (service.slug === 'hidrolik-sistem-tamiri' || service.id === 'hidrolik-sistem-tamiri') {
      return '/images/service-hydraulics.jpg';
    }
    if (service.slug === 'is-makinasi-tamiri' || service.id === 'is-makinasi-tamiri') {
      return '/images/mesa-excavator-hero.png';
    }
    return service.heroImage || '/images/mesa-workshop.png';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-600 selection:text-white">
      <SEO 
        title="MESA İş Makinaları | Türkiye Geneli Teknik Servis & Hidrolik"
        description="Türkiye genelinde şantiyede 7/24 yerinde mobil iş makinası tamiri, hidrolik sistem revizyonu, ekskavatör, forklift ve teleskopik yükleyici teknik servisi. 7/24 Acil Çağrı: 0533 529 36 74."
        keywords="iş makinaları servisi, türkiye geneli iş makinası tamiri, mobil iş makinası servisi, hidrolik servis, hidrolik sistem tamiri, iş makinası bakım onarım, ekskavatör servisi, forklift servisi, teleskopik yükleyici servisi"
        canonical="/"
        schema={jsonLdSchema}
      />

      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION: Bright, Powerful & Trustworthy Engineering
          Featuring: /images/mesa-excavator-hero.png
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 min-h-[600px] lg:min-h-[680px] flex items-center border-b border-slate-200">
        
        {/* Background Excavator in Quarry with clean illumination */}
        <div 
          className="absolute inset-0 bg-cover bg-center lg:bg-right bg-no-repeat pointer-events-none opacity-25 lg:opacity-35"
          style={{ backgroundImage: `url('/images/mesa-excavator-hero.png')` }}
          role="img"
          aria-label="Mesa İş Makinaları ağır paletli ekskavatör"
        />

        {/* Clean Light Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-slate-50 lg:hidden" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-white via-white/90 via-60% to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left 7 Cols: Typography, Crisp Contrast & Red CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Emergency Radar Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold tracking-wider uppercase shadow-xs">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                <span>TÜRKİYE GENELİ 7/24 MOBİL TEKNİK SERVİS & HİDROLİK</span>
              </div>

              {/* Dominant Headline with H1 */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-slate-900">
                <span>Türkiye Geneli</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-500">
                  İş Makinaları Teknik Servis
                </span>
              </h1>

              {/* Value Proposition */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Ekskavatör, loder, bekoloder ve teleskopik yükleyiciler için <strong className="text-slate-900 font-bold">5 tam donanımlı mobil araçla</strong> yerinde müdahale, 500 Bar hidrolik hortum presi ve <strong className="text-red-600 font-bold">12 ay resmi servis garantisi</strong>.
              </p>

              {/* Action Buttons: Red Primary & Steel Secondary */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-2">
                
                {/* 1. Request Service (Signature MESA Red) */}
                <Link 
                  to="/ariza-bildir"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm shadow-xl shadow-red-600/30 border border-red-500 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <ShieldAlert className="w-5 h-5 text-white" />
                  <span>7/24 Acil Arıza Bildir</span>
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </Link>

                {/* 2. Direct Call (Crisp White Card) */}
                <a 
                  href="tel:05335293674"
                  className="px-7 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-900 font-bold text-sm flex items-center justify-center gap-2.5 transition shadow-xs"
                >
                  <Phone className="w-4 h-4 text-red-600" />
                  <span>0533 529 36 74 Usta Çağır</span>
                </a>

                {/* 3. Tracking */}
                <Link
                  to="/servis-takip"
                  className="px-5 py-4 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 font-semibold text-sm flex items-center justify-center gap-1.5 transition shadow-xs"
                >
                  <span>Servis Takibi</span>
                  <ArrowRight className="w-4 h-4 text-red-600" />
                </Link>
              </div>

              {/* DTC Fault Diagnostic Banner */}
              <div className="pt-1 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-600">
                <span className="flex items-center gap-1 text-red-600 font-bold">
                  <Cpu className="w-3.5 h-3.5" /> DTC Arıza Kodu:
                </span>
                <span>Makinenizin arıza kodunu anında çözün</span>
                <Link to="/ariza-kodu-cozucu" className="text-red-600 hover:text-red-700 hover:underline font-bold inline-flex items-center">
                  Çözücüye Git <ArrowRight className="w-3 h-3 ml-0.5" />
                </Link>
              </div>

              {/* Stats */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center lg:text-left">
                <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200 shadow-xs">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">18+</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Donanımlı Mobil Araç</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200 shadow-xs">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">30 Dk</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Ortalama Varış Süresi</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200 shadow-xs">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">450 Bar</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Dinamik Test Tezgahı</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200 shadow-xs">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">12 Ay</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Yazılı Servis Garantisi</div>
                </div>
              </div>

            </div>

            {/* Right 5 Cols: Live Telemetry Panel */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xl backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                  <div>
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest block">CANLI SAHA TELEMETRİ</span>
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <span>Nöbetçi Mobil Ekipler</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">5/5 Aktif</span>
                    </h3>
                  </div>
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-white text-slate-800 border border-slate-200 flex items-center justify-center font-bold shadow-xs shrink-0">
                        01
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Seyhan & Yüreğir Hattı</div>
                        <div className="text-slate-500 text-[11px]">Mobil Ekip 01 (Ford Transit 4x4 • Mehmet Usta)</div>
                      </div>
                    </div>
                    <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold shrink-0 text-[11px]">Müsait • 14 Dk</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-white text-slate-800 border border-slate-200 flex items-center justify-center font-bold shadow-xs shrink-0">
                        02
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Ceyhan & Yumurtalık Sanayi</div>
                        <div className="text-slate-500 text-[11px]">Mobil Ekip 02 (Iveco Daily • Ahmet Usta)</div>
                      </div>
                    </div>
                    <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-bold shrink-0 text-[11px]">Görevde • Şantiyede</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-white text-slate-800 border border-slate-200 flex items-center justify-center font-bold shadow-xs shrink-0">
                        03
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Tarsus & Mersin Liman Hattı</div>
                        <div className="text-slate-500 text-[11px]">Mobil Ekip 03 (Renault Master • Can Usta)</div>
                      </div>
                    </div>
                    <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold shrink-0 text-[11px]">Müsait • 20 Dk</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <a 
                    href="tel:05335293674" 
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-red-600/25"
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
          2. SUPPORTED BRANDS: Bidirectional Infinite Marquee
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-slate-50/60 via-white to-slate-50/40 py-14 border-b border-slate-200 overflow-hidden" id="markalar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200/80 text-[11px] font-black text-red-700 tracking-wider uppercase mb-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                DÜNYA STANDARTLARINDA TEŞHİS & ÖZEL SERVİS
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Yetkili Seviyede Desteklenen İş Makinası Markaları</h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Orijinal lisanslı teşhis adaptörleri, ağır hizmet revizyonu ve garantili OEM yedek parça desteği sunduğumuz küresel markalar
              </p>
            </div>
            <Link 
              to="/markalar"
              className="text-xs font-bold text-white flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 self-start md:self-auto transition shadow-md shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/30 shrink-0"
            >
              <span>Tüm Markaları İncele</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Dual-Row Bidirectional Marquee */}
        <BrandMarquee />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. THREE-STEP SERVICE CYCLE: Precision & Clarity
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-red-600 tracking-widest uppercase block mb-1">HIZLI ÇÖZÜM SÜRECİ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Arızadan Sahaya 3 Adımda Kesintisiz Çözüm
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="relative p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-red-400 shadow-xs hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-red-600/25 mb-4 group-hover:scale-105 transition-transform">
                01
              </div>
              <h3 className="font-black text-base text-slate-900 mb-2">Arıza Bildirimi & GPS Konum</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Web üzerinden veya <strong className="text-slate-900">0533 529 36 74</strong> hattımızdan makinenizin marka, model ve şantiye konumunu iletin.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-red-400 shadow-xs hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-red-600/25 mb-4 group-hover:scale-105 transition-transform">
                02
              </div>
              <h3 className="font-black text-base text-slate-900 mb-2">En Yakın Mobil Ekip Yolda</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                GPS rotalama ile bölgedeki 5 donanımlı servis aracımızdan en yakını ortalama 30 dakikada şantiyenize ulaşır.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-red-400 shadow-xs hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-red-600/25 mb-4 group-hover:scale-105 transition-transform">
                03
              </div>
              <h3 className="font-black text-base text-slate-900 mb-2">Yerinde Onarım & Test Raporu</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yerinde hortum presleme, valf kalibrasyonu ve pompa testleri yapılır; dijital imzalı 12 ay garantili protokol teslim edilir.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. CORE SERVICES: Real Photography & Crisp White Cards
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto" id="hizmetler">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-red-600 tracking-widest uppercase block">UZMANLIK ALANLARIMIZ</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Garantili Ağır İş Makinası Hizmetleri
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Paletli ekskavatörden bekolodere, hidrolik ana pompadan cer dişlisine kadar komple mekanik revizyon çözümleri.
            </p>
          </div>

          <Link 
            to="/hizmetler"
            className="inline-flex items-center text-sm font-bold text-slate-700 hover:text-red-600 group transition"
          >
            <span>Tüm Hizmet Kataloğunu İncele</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform text-red-600" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.slice(0, 8).map(service => (
            <div 
              key={service.slug}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-red-400 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Service Thumbnail */}
              <div className="h-48 relative overflow-hidden bg-slate-100">
                <img 
                  src={getServicePhoto(service)} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/mesa-workshop.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-80" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur text-[10px] font-bold text-slate-800 border border-slate-200 shadow-xs">
                  {service.category}
                </span>
                <span className="absolute bottom-3 right-3 text-[11px] font-bold bg-red-600 text-white px-2 py-0.5 rounded shadow">
                  {service.duration}
                </span>
              </div>

              {/* Service Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-black text-slate-900 group-hover:text-red-600 transition leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium text-[11px]">
                    🛡️ {service.warranty}
                  </span>
                  <Link 
                    to={`/hizmetler/${service.slug}`}
                    className="font-bold text-red-600 hover:text-red-700 flex items-center group-hover:underline"
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
          5. WORKSHOP & TECHNICAL CAPABILITIES SHOWCASE
          Featuring /images/mesa-workshop.png
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#10141e] to-[#0c0f17] text-white rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Workshop Photo */}
            <div className="lg:col-span-6 relative h-72 lg:h-[480px] overflow-hidden">
              <img 
                src="/images/mesa-workshop.png" 
                alt="Mesa İş Makinaları Atölye ve Hidrolik Pompa Revizyonu"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/mesa-excavator-hero.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#10141e] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10141e] via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] font-semibold text-slate-300">
                🔧 Seyhan Merkez Atölyesi • Hidrolik Test Standı
              </div>
            </div>

            {/* Technical Specs & Capabilities */}
            <div className="lg:col-span-6 p-8 sm:p-12 space-y-5">
              <span className="px-3 py-1 rounded-full bg-red-950/60 text-red-400 text-xs font-black tracking-wider uppercase border border-red-500/30">
                MERKEZ ATÖLYE & SAHA DONANIMI
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                Mühendislik Hassasiyetiyle <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-400">
                  12 Ay Garantili Revizyon
                </span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Adana Seyhan OSB merkez atölyemizde 10 ton gezer vinç, 450 Bar dinamik hidrolik test standı ve seyyar borwerk delik honlama tezgahları ile ağır iş makinelerinizi sıfır toleransla yeniliyoruz.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-200">
                  <Check className="w-4 h-4 text-red-500 shrink-0" />
                  <span>500 Bar Seyyar Hortum Presi</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-200">
                  <Check className="w-4 h-4 text-red-500 shrink-0" />
                  <span>15 kVA Bağımsız Dizel Jeneratör</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-200">
                  <Check className="w-4 h-4 text-red-500 shrink-0" />
                  <span>450 Bar Dinamik Akış Test Standı</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-200">
                  <Check className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Seyyar Borwerk Delik Honlama</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  to="/filo"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs inline-flex items-center gap-2 transition shadow-lg shadow-red-900/30"
                >
                  <Truck className="w-4 h-4" />
                  <span>5 Mobil Servis Aracını İncele</span>
                </Link>
                <Link
                  to="/hakkimizda"
                  className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 inline-flex items-center gap-2 transition"
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
      <section className="py-20 bg-slate-50 text-slate-900 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-red-600 tracking-wider uppercase block mb-1">
                MESA BİLGİ BANKASI & MÜHENDİSLİK KILAVUZLARI
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                Şantiye ve Makine <span className="text-red-600">Teknik Rehberleri</span>
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl">
                Hidrolik pompa ömrünü uzatan ISO 4406 yağ kirliliği standartları, DPF rejenerasyonu ve saat kademeli periyodik bakım stratejileri.
              </p>
            </div>
            <Link
              to="/rehberler"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-900 font-bold text-xs border border-slate-300 shadow-xs transition-all shrink-0 self-start md:self-end"
            >
              <span>Tüm Rehberleri Oku</span>
              <ArrowRight className="w-4 h-4 text-red-600" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guidesData.slice(0, 3).map((g) => (
              <article
                key={g.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:border-red-400 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200 text-[11px]">
                      {g.category}
                    </span>
                    <span className="text-[11px] font-medium">{g.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors mb-2 line-clamp-2">
                    {g.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {g.shortDesc}
                  </p>
                </div>
                <Link
                  to={`/rehberler/${g.slug}`}
                  className="text-xs font-semibold text-red-600 hover:underline inline-flex items-center gap-1 mt-auto"
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
          6.5 TÜRKİYE GENELİ HİZMET BÖLGELERİ & 12 ŞEHİR KART GRİDİ
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider mb-3">
                <Truck className="w-3.5 h-3.5" /> 81 İl Mobil Saha Ağı
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Türkiye Geneli Hizmet Bölgeleri
              </h2>
              <p className="text-sm text-slate-300 mt-2 max-w-2xl">
                İstanbul'dan Diyarbakır'a; limanlar, organize sanayi havzaları ve mega altyapı şantiyelerine seyyar hidrolik pres donanımlı mobil araçlarımızla yerinde teknik servis sağlıyoruz.
              </p>
            </div>

            <Link
              to="/sehirler"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-lg shadow-red-600/25 transition-all active:scale-95 shrink-0 self-start md:self-end"
            >
              <span>Tüm Hizmet Bölgeleri</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {activeCitiesData.map((city) => (
              <Link
                key={city.id}
                to={`/sehirler/${city.slug}`}
                className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="font-mono font-bold px-2 py-0.5 rounded bg-red-600/30 text-red-300 border border-red-500/30">
                      {city.plate}
                    </span>
                    <span className="text-slate-400 font-medium">
                      {city.regionName}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-white group-hover:text-red-400 transition-colors">
                    {city.name} Servisi
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {city.industryContext}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-red-400 group-hover:text-red-300">
                  <span>Saha Detayları</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. TESTIMONIALS
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-red-600 tracking-widest uppercase block">GÜVEN VE MEMNUNİYET</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Şantiye Şefleri ve Müteahhitler Ne Diyor?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50/90 p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex text-amber-500 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "Ceyhan boru hattı şantiyemizde CAT 336 ekskavatörümüzün ana hidrolik pompası kilitlenmişti. Mesa mobil ekibi 40 dakikada geldi, arızalı pompayı söküp kendi atölyelerinde aynı gün içinde test tezgahında revize ederek teslim etti. İşimiz aksamadı."
              </p>
              <div className="border-t border-slate-200 pt-3">
                <div className="text-xs font-black text-slate-900">Ahmet K.</div>
                <div className="text-[11px] text-slate-500 font-medium">Makineler Şefi • Ceyhan Enerji Projesi</div>
              </div>
            </div>

            <div className="bg-slate-50/90 p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex text-amber-500 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "Manitou MT 1840 telehandlerımızın bom açma zinciri kopmuştu ve yükte kalmıştı. Gece saat 22:30'da aradık, nöbetçi usta ekibiyle gelip 3 saatte emniyet kalibrasyonlarıyla birlikte işi bitirdi. Harika bir ekip."
              </p>
              <div className="border-t border-slate-200 pt-3">
                <div className="text-xs font-black text-slate-900">Mehmet T.</div>
                <div className="text-[11px] text-slate-500 font-medium">Proje Müdürü • Mersin Konut Şantiyesi</div>
              </div>
            </div>

            <div className="bg-slate-50/90 p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex text-amber-500 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "8 adet JCB 3CX bekoloderimizin tüm periyodik filtre-yağ bakımlarını ve şanzıman revizyonlarını Mesa yapıyor. Online müşteri panelinden tüm geçmiş servis fişlerini ve parça maliyetlerini görebilmek müthiş kolaylık."
              </p>
              <div className="border-t border-slate-200 pt-3">
                <div className="text-xs font-black text-slate-900">Hakan Ç.</div>
                <div className="text-[11px] text-slate-500 font-medium">Filo Yöneticisi • Çukurova Hafriyat Ltd.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. GOOGLE REVIEWS WIDGET
      ───────────────────────────────────────────────────────────── */}
      <div className="my-16">
        <GoogleReviewsWidget />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          9. FAQ ACCORDION SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto" id="sss">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-red-600 tracking-widest uppercase block">MERAK EDİLENLER</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
            Sıkça Sorulan Sorular
          </h2>
        </div>

        <div className="space-y-3">
          {homeFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition hover:border-slate-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between font-bold text-sm text-slate-800 hover:text-red-600 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-red-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. BOTTOM EMERGENCY CALL BANNER: Energetic Red
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white py-14 px-4 sm:px-6 text-center shadow-xl">
        <div className="max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Şantiyede Acil Bir Durum mu Var?
          </h3>
          <p className="text-red-100 text-xs sm:text-sm max-w-xl mx-auto">
            Hemen bizi arayın veya online servis talebi oluşturun, nöbetçi ustamız 2 dakika içinde sizinle irtibata geçsin.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a 
              href="tel:05335293674" 
              className="px-7 py-3.5 rounded-xl bg-white hover:bg-red-50 text-red-700 font-black text-xs shadow-lg transition flex items-center space-x-2"
            >
              <Phone className="w-4 h-4 text-red-700" />
              <span>0533 529 36 74 Hemen Ara</span>
            </a>
            <Link 
              to="/ariza-bildir"
              className="px-7 py-3.5 rounded-xl bg-red-800/80 hover:bg-red-800 text-white font-bold text-xs border border-red-400/40 transition shadow-sm"
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
