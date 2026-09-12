import React, { useState } from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { 
  Wrench, Truck, Activity, ShieldAlert, Phone, MessageSquare, 
  MapPin, Clock, CheckCircle2, ChevronRight, Star, ArrowRight,
  ShieldCheck, Zap, Layers, HelpCircle, ChevronDown, Check, Compass
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
    'name': 'Mesa İş Makinaları Teknik Servis',
    'image': 'https://mesaismak.web.app/og-image.jpg',
    'description': 'Adana ve Çukurova genelinde 7/24 acil mobil iş makinası tamiri, hidrolik pompa, teleskopik yükleyici, şanzıman ve motor revizyon servisi.',
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
    'telephone': '+905325550128',
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEO 
        title="7/24 Mobil İş Makinası & Hidrolik Servisi | Adana"
        description="Adana ve Çukurova genelinde 18 mobil araçla 7/24 yerinde iş makinası tamiri. JCB, CAT, Hidromek, Manitou hidrolik pompa, hortum pres, şanzıman ve motor revizyonu."
        canonical="/"
        schema={jsonLdSchema}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Background glow & mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>ADANA & ÇUKUROVA 7/24 ACİL MOBİL SERVİS</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none">
                ŞANTİYENİZ DURMASIN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400">
                  İŞ MAKİNANIZ SAHADA KALSIN!
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Ekskavatör, loder, bekoloder ve teleskopik yükleyiciler için <strong className="text-white font-bold">18 tam donanımlı mobil araçla</strong> şantiyenizde <strong className="text-amber-400 font-bold">30 dakikada yerinde müdahale</strong>, 450 Bar hidrolik test ünitesi ve 12 ay garantili revizyon.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link 
                  to="/ariza-bildir"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center space-x-2 transition transform hover:-translate-y-0.5"
                >
                  <ShieldAlert className="w-5 h-5 text-slate-950" />
                  <span>7/24 Acil Arıza Bildir</span>
                </Link>

                <a 
                  href="tel:05325550128"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm flex items-center justify-center space-x-2 transition backdrop-blur"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>0532 555 01 28 Usta Çağır</span>
                </a>

                <Link
                  to="/servis-takip"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 font-bold text-sm flex items-center justify-center space-x-2 transition"
                >
                  <span>Servis Takibi</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">18+</div>
                  <div className="text-xs text-slate-400 font-medium">Donanımlı Servis Aracı</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">30 Dk</div>
                  <div className="text-xs text-slate-400 font-medium">Ortalama Varış Süresi</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">2.500+</div>
                  <div className="text-xs text-slate-400 font-medium">Tamamlanan Onarım</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">12 Ay</div>
                  <div className="text-xs text-slate-400 font-medium">Resmi Servis Garantisi</div>
                </div>
              </div>
            </div>

            {/* Right Col: Hero Interactive Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />

                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">CANLI SAHA DURUMU</span>
                    <h3 className="text-lg font-black text-white">Nöbetçi Mobil Ekipler</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5" />
                    Aktif Görevde
                  </span>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                        01
                      </div>
                      <div>
                        <div className="font-bold text-white">Seyhan / Çukurova Bölgesi</div>
                        <div className="text-slate-400 text-[11px]">Mobil Ekip 02 (Ford Transit • Usta: Ahmet D.)</div>
                      </div>
                    </div>
                    <span className="text-emerald-400 font-bold">Müsait • 10 Dk</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                        02
                      </div>
                      <div>
                        <div className="font-bold text-white">Ceyhan Yolu & Yumurtalık</div>
                        <div className="text-slate-400 text-[11px]">Mobil Ekip 01 (Ford Transit • Usta: Mehmet Y.)</div>
                      </div>
                    </div>
                    <span className="text-amber-400 font-bold">Şantiyede Görevde</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                        03
                      </div>
                      <div>
                        <div className="font-bold text-white">Tarsus & Mersin OSB Hattı</div>
                        <div className="text-slate-400 text-[11px]">Mobil Ekip 03 (Renault Master • Usta: Can P.)</div>
                      </div>
                    </div>
                    <span className="text-emerald-400 font-bold">Müsait • 20 Dk</span>
                  </div>
                </div>

                {/* Direct Emergency Call Button */}
                <div className="mt-6 pt-5 border-t border-slate-800/80">
                  <a 
                    href="tel:05325550128" 
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-amber-500/20"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Hemen En Yakın Mobil Servisi Çağır (0532 555 01 28)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Step Emergency Bar */}
      <section className="bg-white border-y border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-amber-600 tracking-wider uppercase block">HIZLI ÇÖZÜM SÜRECİ</span>
            <h2 className="text-2xl font-black text-slate-900">Arızadan Sahaya 3 Adımda Çözüm</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative flex items-start space-x-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                1
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900 mb-1">Arıza Bildirimi & Konum</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Web üzerinden veya telefonla makinenizin markasını, modelini ve şantiye konumunuzu iletin.
                </p>
              </div>
            </div>

            <div className="relative flex items-start space-x-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                2
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900 mb-1">En Yakın Mobil Ekip Yolda</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  GPS takip sistemiyle şantiyenize en yakın 18 servis aracımızdan biri anında rotaya girer.
                </p>
              </div>
            </div>

            <div className="relative flex items-start space-x-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                3
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900 mb-1">Yerinde Onarım & Test</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Şantiyenizde arıza giderilir, basınç ve yük testleri yapılır, dijital servis formu teslim edilir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto" id="hizmetler">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-600 tracking-wider uppercase block">UZMANLIK ALANLARIMIZ</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Garantili Ağır İş Makinası Hizmetleri
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Tüm mekanik revizyon, hidrolik test ve şantiye mobil servis ihtiyaçlarınız için tek çatı altında profesyonel çözümler.
            </p>
          </div>

          <Link 
            to="/hizmetler"
            className="inline-flex items-center text-sm font-bold text-amber-600 hover:text-amber-700 group"
          >
            <span>Tüm Hizmet Kataloğunu İncele</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map(service => (
            <div 
              key={service.slug}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col group"
            >
              <div className="h-44 relative overflow-hidden bg-slate-900">
                <img 
                  src={service.heroImage} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur text-[11px] font-bold text-amber-400 border border-slate-800">
                  {service.category}
                </span>
                <span className="absolute bottom-3 right-3 text-xs font-bold text-white bg-amber-500/90 text-slate-950 px-2 py-0.5 rounded">
                  {service.duration}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-black text-slate-900 group-hover:text-amber-600 transition">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">
                    🛡️ {service.warranty}
                  </span>
                  <Link 
                    to={`/hizmetler/${service.slug}`}
                    className="font-bold text-amber-600 hover:text-amber-700 flex items-center group-hover:underline"
                  >
                    Detay →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brands Supported Section */}
      <section className="bg-slate-950 text-white py-20 border-y border-slate-800" id="markalar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-amber-400 tracking-wider uppercase block">DÜNYA STANDARTLARINDA TEŞHİS</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-1">
              Desteklenen İş Makinası Markaları
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Resmi lisanslı diagnostik arıza tespit cihazları ve orijinal kalibreli yedek parçalar ile tüm markalarda yetkili servis seviyesinde müdahale.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {brandsData.map(brand => (
              <div 
                key={brand.name}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 transition flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">{brand.origin}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <h3 className="text-base font-black text-white mt-1">{brand.name}</h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {brand.specialty}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono">
                  {brand.diagnostics}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link 
              to="/markalar"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 font-bold text-xs transition"
            >
              <span>Tüm Markaların Diagnostik Detaylarını Gör →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Fleet & On-site Equipment Showcase */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-8 sm:p-12 text-slate-950 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="px-3 py-1 rounded-full bg-slate-950/10 text-slate-950 text-xs font-black tracking-wider uppercase">
                ŞANTİYEDE TAM DONANIMLI MOBİL ATÖLYE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                18 Adet Özel Donanımlı Mobil Servis Aracı Filomuz
              </h2>
              <p className="text-slate-900 text-sm font-medium leading-relaxed max-w-xl">
                Aracın içinde 500 Bar mobil hidrolik hortum presi, 15 kVA dizel jeneratör, yüksek basınçlı hava kompresörü, gazaltı & elektrod kaynak makineleri ve yağ analiz cihazları bulunur. Şantiyede çözülmeyecek arıza bırakmıyoruz.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-950">
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>500 Bar Seyyar Hortum Presi</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-950">
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>15 kVA Bağımsız Jeneratör</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-950">
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>Yerinde Pompa & Basınç Testi</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-950">
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>Tüm Markalara Lisanslı Diagnostik</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/filo"
                  className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs shadow-lg inline-flex items-center space-x-2 transition"
                >
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span>Filomuzun Teknik Donanımını İncele →</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-xl border border-slate-900 space-y-4">
                <div className="text-xs font-bold text-amber-400 uppercase">HİZMET KAPSAMA HARİTASI</div>
                <h4 className="text-lg font-black">Çukurova & Akdeniz Bölgesi</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Adana Seyhan, Çukurova, Yüreğir, Sarıçam, Ceyhan, Kozan, Yumurtalık ile Mersin Limanı, Tarsus OSB, Osmaniye Organize Sanayi ve İskenderun demir-çelik sahalarına günlük düzenli ring servislerimiz vardır.
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-bold flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Şu Anda 12 Şantiyede Canlı Saha Operasyonu Yürütülüyor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
        {/* Technical Guides & Knowledge Base Spotlight */}
        <section className="py-20 bg-slate-900/60 border-t border-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-bold text-amber-400 tracking-wider uppercase block mb-1">
                  MESA BİLGİ BANKASI & MÜHENDİSLİK KILAVUZLARI
                </span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  Şantiye ve Makine <span className="text-amber-400">Teknik Rehberleri</span>
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                  Hidrolik pompa ömrünü uzatan ISO 4406 yağ kirliliği standartları, DPF rejenerasyonu ve saat kademeli periyodik bakım stratejileri.
                </p>
              </div>
              <Link
                to="/rehberler"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs border border-slate-700 transition-all shrink-0 self-start md:self-end"
              >
                <span>Tüm Rehberleri Oku</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guidesData.slice(0, 3).map((g) => (
                <article
                  key={g.id}
                  className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
                        {g.category}
                      </span>
                      <span>{g.readTime}</span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors mb-2 line-clamp-2">
                      {g.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                      {g.shortDesc}
                    </p>
                  </div>
                  <Link
                    to={`/rehberler/${g.slug}`}
                    className="text-xs font-semibold text-amber-400 hover:underline inline-flex items-center gap-1 mt-auto"
                  >
                    <span>Detaylı İncele</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Testimonials & Real Proof */}
      <section className="py-20 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-amber-600 tracking-wider uppercase block">GÜVEN VE MEMNUNİYET</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Şantiye Şefleri ve Müteahhitler Ne Diyor?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex text-amber-500 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "Ceyhan boru hattı şantiyemizde CAT 336 ekskavatörümüzün ana hidrolik pompası kilitlenmişti. Mesa mobil ekibi 40 dakikada geldi, arızalı pompayı söküp kendi atölyelerinde aynı gün içinde test tezgahında revize ederek teslim etti. İşimiz aksamadı."
              </p>
              <div className="border-t border-slate-100 pt-3">
                <div className="text-xs font-black text-slate-900">Ahmet K.</div>
                <div className="text-[11px] text-slate-500">Makineler Şefi • Ceyhan Enerji Projesi</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex text-amber-500 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "Manitou MT 1840 telehandlerımızın bom açma zinciri kopmuştu ve yükte kalmıştı. Gece saat 22:30'da aradık, nöbetçi usta ekibiyle gelip 3 saatte emniyet kalibrasyonlarıyla birlikte işi bitirdi. Harika bir ekip."
              </p>
              <div className="border-t border-slate-100 pt-3">
                <div className="text-xs font-black text-slate-900">Mehmet T.</div>
                <div className="text-[11px] text-slate-500">Proje Müdürü • Mersin Konut Şantiyesi</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex text-amber-500 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "8 adet JCB 3CX bekoloderimizin tüm periyodik filtre-yağ bakımlarını ve şanzıman revizyonlarını Mesa yapıyor. Online müşteri panelinden tüm geçmiş servis fişlerini ve parça maliyetlerini görebilmek müthiş kolaylık."
              </p>
              <div className="border-t border-slate-100 pt-3">
                <div className="text-xs font-black text-slate-900">Hakan Ç.</div>
                <div className="text-[11px] text-slate-500">Filo Yöneticisi • Çukurova Hafriyat Ltd.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Live Widget */}
        <div className="my-16">
          <GoogleReviewsWidget />
        </div>

        {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto" id="sss">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-amber-600 tracking-wider uppercase block">MERAK EDİLENLER</span>
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
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between font-bold text-sm text-slate-900 hover:text-amber-600 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-amber-600' : ''}`} />
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

      {/* Bottom Emergency Banner */}
      <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            Şantiyede Acil Bir Durum mu Var?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Hemen bizi arayın veya online arıza bildirim formunu doldurun, nöbetçi ustamız 2 dakika içinde sizinle irtibata geçsin.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a 
              href="tel:05325550128" 
              className="px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-lg transition flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>0532 555 01 28 Hemen Ara</span>
            </a>
            <Link 
              to="/ariza-bildir"
              className="px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition"
            >
              Online Arıza Formu Doldur →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
