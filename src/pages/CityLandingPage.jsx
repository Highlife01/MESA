import React, { useState, useMemo } from 'react';
import { useParams, Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { SITE_CONFIG } from '../config/siteConfig';
import { getCityBySlug, activeCitiesData } from '../data/citiesData';
import { LocationShareButton } from '../components/LocationShareButton';
import { 
  Wrench, ShieldCheck, Clock, MapPin, Phone, MessageSquare, 
  ChevronRight, ArrowRight, HelpCircle, CheckCircle2, 
  Settings, Truck, AlertTriangle, FileText, Camera, Navigation
} from 'lucide-react';

export function CityLandingPage() {
  const { slug } = useParams();
  const [openFaq, setOpenFaq] = useState(null);

  // Slug çözümleme
  const currentCity = useMemo(() => {
    if (slug) {
      const found = getCityBySlug(slug);
      if (found) return found;
    }
    // Fallback: window.location üzerinden pathname çözümleme
    if (typeof window !== 'undefined') {
      const pathParts = window.location.pathname.replace(/^\//, '').split('/');
      const pageSlug = pathParts[pathParts.length - 1];
      const found = getCityBySlug(pageSlug);
      if (found) return found;
    }
    return activeCitiesData[0]; // Varsayılan İstanbul
  }, [slug]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const canonicalUrl = `/sehirler/${currentCity.slug}`;

  // Google E-E-A-T uyumlu Schema (Sahte ofis yok, Service + BreadcrumbList + FAQPage)
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_CONFIG.siteUrl}${canonicalUrl}#service`,
        'name': `${currentCity.name} İş Makinaları Teknik Servisi`,
        'serviceType': 'Ağır İş Makinaları Mobil Tamir, Bakım ve Hidrolik Revizyon',
        'description': currentCity.seoDescription,
        'provider': {
          '@type': 'LocalBusiness',
          '@id': `${SITE_CONFIG.siteUrl}/#organization`,
          'name': SITE_CONFIG.legalName,
          'telephone': SITE_CONFIG.phoneRaw,
          'email': SITE_CONFIG.email,
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': SITE_CONFIG.headquarters.street,
            'addressLocality': SITE_CONFIG.headquarters.district,
            'addressRegion': SITE_CONFIG.headquarters.city,
            'postalCode': SITE_CONFIG.headquarters.postalCode,
            'addressCountry': 'TR'
          }
        },
        'areaServed': {
          '@type': 'AdministrativeArea',
          'name': `${currentCity.name}, Turkey`
        },
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': `${currentCity.name} Teknik Hizmetler`,
          'itemListElement': currentCity.servicedMachinery.map((item, idx) => ({
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': `${currentCity.name} ${item} Servisi`
            }
          }))
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_CONFIG.siteUrl}${canonicalUrl}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Ana Sayfa',
            'item': SITE_CONFIG.siteUrl
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Hizmet Bölgeleri',
            'item': `${SITE_CONFIG.siteUrl}/sehirler`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': `${currentCity.name} İş Makinaları Servisi`,
            'item': `${SITE_CONFIG.siteUrl}${canonicalUrl}`
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_CONFIG.siteUrl}${canonicalUrl}#faq`,
        'mainEntity': currentCity.faq.map(item => ({
          '@type': 'Question',
          'name': item.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.a
          }
        }))
      }
    ]
  };

  const breadcrumbs = [
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Hizmet Bölgeleri', url: '/sehirler' },
    { name: `${currentCity.name} İş Makinaları Servisi`, url: canonicalUrl }
  ];

  const serviceRequestUrl = `/ariza-bildir?city=${encodeURIComponent(currentCity.name)}`;
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(currentCity.name + ' iş makinası teknik servis ve arıza müdahalesi için iletişime geçiyorum.')}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-600 selection:text-white">
      <SEO
        title={currentCity.seoTitle}
        description={currentCity.seoDescription}
        canonical={canonicalUrl}
        jsonLd={structuredData}
        breadcrumbs={breadcrumbs}
        geo={{
          region: `TR-${currentCity.plate}`,
          placename: `${currentCity.name}, Turkey`
        }}
      />

      {/* Breadcrumb Bar */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center text-xs font-medium text-slate-600 overflow-x-auto whitespace-nowrap gap-2">
          <Link to="/" className="hover:text-red-600 transition-colors">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <Link to="/sehirler" className="hover:text-red-600 transition-colors">Hizmet Bölgeleri</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="text-slate-900 font-bold">{currentCity.name} İş Makinaları Servisi</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>{currentCity.regionName} • {currentCity.name} Mobil Saha Servisi</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
              {currentCity.h1}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed font-normal">
              {currentCity.intro}
            </p>

            {/* 3 Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <Link
                to={serviceRequestUrl}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm flex items-center gap-2 shadow-xl shadow-red-600/25 transition-all duration-200 active:scale-95"
              >
                <Wrench className="w-4 h-4" />
                <span>SERVİS TALEBİ OLUŞTUR</span>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-emerald-600/25 transition-all duration-200 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WHATSAPP'TAN ULAŞ</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm flex items-center gap-2 border border-white/10 transition-colors duration-200"
              >
                <Phone className="w-4 h-4 text-red-400" />
                <span>ARA: {SITE_CONFIG.phone}</span>
              </a>
            </div>

            {/* Key Trust Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>12 Ay Garanti</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Mobil Donanımlı Filo</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Clock className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Hızlı Saha Müdahalesi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Şehir Ekonomik & Endüstriyel Bağlamı */}
      <section className="py-12 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-4xl">
              <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Bölgesel Şantiye ve Sanayi Karakteristiği</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {currentCity.name} Bölgesi İş Makinası ve Saha İhtiyaçları
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {currentCity.industryContext} Türkiye genelinde faaliyet gösteren mobil servis organizasyonumuz, {currentCity.name} ve çevre ilçelerindeki şantiyelerin iş gücü kaybını önlemek amacıyla seyyar müdahale araçlarıyla donatılmıştır.
              </p>
            </div>
            <div className="flex-shrink-0">
              <LocationShareButton className="text-xs" />
            </div>
          </div>
        </div>
      </section>

      {/* 1. H2: Mobil İş Makinası Servisi */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
              <Truck className="w-3.5 h-3.5" /> Şantiyede Yerinde Müdahale
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {currentCity.name} Mobil İş Makinası Servisi
            </h2>
            <p className="text-base text-slate-700 leading-relaxed">
              {currentCity.mobileServiceText} Şantiye sahasında arızalanan ekskavatör, loder veya forklifti çekiciye yükleyip atölyeye götürme maliyetini ortadan kaldırıyoruz.
            </p>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Sahada Arıza Tespiti:</strong> Elektronik test cihazları ile şantiye ortamında canlı sensör verileri okunur ve mekanik arızalar anında saptanır.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Yerinde Hidrolik Hortum Presi:</strong> Seyyar aracımızdaki 500 Bar hidrolik hortum presimizle patlayan hortumlar şantiyede birkaç dakikada imal edilir.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>GPS Konum İletme:</strong> Tek tıkla canlı şantiye konumunuzu ileterek nöbetçi ekibimizin en kestirme rotadan ulaşmasını sağlayabilirsiniz.</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/mobil-teknik-servis"
                className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 underline"
              >
                Mobil teknik servis hakkında detaylı bilgi alın <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl" />
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-red-500" />
              <span>{currentCity.name} Şantiye Konumu Bildir</span>
            </h3>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Arızalanan makinenizin yanından canlı GPS koordinatınızı iletin, servis talep formunuza otomatik olarak aktaralım.
            </p>
            <div className="space-y-4">
              <LocationShareButton className="w-full justify-center" />
              <Link
                to={serviceRequestUrl}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <span>Doğrudan Servis Formunu Aç</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. H2: Hidrolik Arıza ve Onarım */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3">
              <Settings className="w-3.5 h-3.5" /> Yüksek Basınç & Hidrolik Güç
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
              Hidrolik Arıza ve Onarım Hizmetleri
            </h2>
            <p className="text-base text-slate-700 leading-relaxed">
              {currentCity.hydraulicText} Ağır iş makinelerinde gücün kalbi hidrolik sistemdir. Basınç düşüklüğü, kumanda valfi sızıntıları, hidrolik kaçak ve silindir bozulmalarında garantili onarım uyguluyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-black">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-base">Ana Hidrolik Pompa & Motor</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kawasaki, Rexroth, Parker ve Danfoss pistonlu pompaların debi ve kavitasyon sorunları giderilir, rotary grupları revize edilir.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-base">Hidrolik Silindir & Kaçak Tamiri</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bom, arm ve kova silindirlerindeki çizilmeler honlanır; yüksek basınca dayanıklı OEM keçe takımları sıfır kaçak garantisiyle takılır.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-base">Kumanda Bloğu & Basınç Ayarı</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ana kontrol valfleri, oransal bobinler ve pilot emniyet valflerinin basınç kalibrasyonları dijital manometrelerle sahada yapılır.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center sm:text-left">
            <Link
              to="/hidrolik-servis"
              className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 underline"
            >
              Kapsamlı hidrolik servis hizmetlerimizi inceleyebilirsiniz <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. H2: Servis Verilen İş Makinası Türleri */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold mb-3">
            <Wrench className="w-3.5 h-3.5" /> Kapsamlı Makina Parkı Desteği
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
            Servis Verilen İş Makinası Türleri
          </h2>
          <p className="text-base text-slate-700 leading-relaxed">
            {currentCity.name} ve çevresinde şantiye, hafriyat, liman, maden ve fabrika alanlarında kullanılan tüm ağır makina gruplarına orijinal teşhis ve yedek parça desteği sağlıyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-red-300 transition-all group">
            <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-red-600 transition-colors">
              Paletli & Lastikli Ekskavatörler
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Kule dönüş motoru, yürüyüş cer dişlileri, bom silindirleri ve motor revizyonu.
            </p>
            <Link to="/ekskavator-servisi" className="text-xs font-bold text-red-600 hover:underline inline-flex items-center gap-1">
              Ekskavatör servisi detayları <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-red-300 transition-all group">
            <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-red-600 transition-colors">
              Fabrika & Liman Forkliftleri
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Dizel ve akülü istif makineleri, asansör rulmanları, tilt silindirleri ve şanzıman.
            </p>
            <Link to="/forklift-servisi" className="text-xs font-bold text-red-600 hover:underline inline-flex items-center gap-1">
              Forklift servisi detayları <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-red-300 transition-all group">
            <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-red-600 transition-colors">
              Teleskopik Yükleyiciler (Telehandler)
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Manitou, Merlo ve JCB Loadall bom uzatma zincirleri, oransal joystickler ve denge ayakları.
            </p>
            <Link to="/teleskopik-yukleyici-servisi" className="text-xs font-bold text-red-600 hover:underline inline-flex items-center gap-1">
              Teleskopik yükleyici servisi detayları <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-red-300 transition-all group">
            <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-red-600 transition-colors">
              Tekerlekli Loderler & Kaya Kepçeleri
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Belden kırma mafsal boşlukları, tork konvertör, şanzıman ve cer revizyonları.
            </p>
            <Link to="/is-makinasi-tamiri" className="text-xs font-bold text-red-600 hover:underline inline-flex items-center gap-1">
              İş makinası tamiri hizmetleri <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-red-300 transition-all group">
            <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-red-600 transition-colors">
              Kazıcı Yükleyiciler (Bekoloder)
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              JCB 3CX/4CX, Hidromek HMK 102B, CAT 428 şanzıman, diferansiyel kilit ve hidrolik valf tamirleri.
            </p>
            <Link to="/is-makinalari-servisi" className="text-xs font-bold text-red-600 hover:underline inline-flex items-center gap-1">
              İş makinaları teknik servisi <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-red-300 transition-all group">
            <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-red-600 transition-colors">
              Ağır Tonaj Kırıcı Ataşmanları
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Taş kırma çekiçleri, akümülatör azot gazı dolumu, piston honlama ve alt-üst burç değişimi.
            </p>
            <Link to="/hizmetler" className="text-xs font-bold text-red-600 hover:underline inline-flex items-center gap-1">
              Tüm teknik hizmetleri gör <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. H2: İş Makinası Arıza Tespiti & 5. H2: Bakım ve Onarım */}
      <section className="py-16 bg-white border-y border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Arıza Tespiti */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
              <AlertTriangle className="w-3.5 h-3.5" /> Elektronik & Mekanik Teşhis
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              İş Makinası Arıza Tespiti Süreci
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Rastgele parça değiştirme yöntemlerini reddediyoruz. Sahaya sevk edilen ekibimiz, lisanslı elektronik test cihazları (Caterpillar ET, JCB ServiceMaster, Volvo Tech Tool) ile makinenin kontrol ünitesine bağlanarak aktif ve geçmiş arıza kodlarını (DTC) analiz eder.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2 font-medium">✓ Elektronik beyin ve sensör canlı değer kontrolü</li>
              <li className="flex items-center gap-2 font-medium">✓ Dijital manometre ile ana pompa tepe basınç testi</li>
              <li className="flex items-center gap-2 font-medium">✓ Motor silindir kompresyon ve enjektör geri dönüş testi</li>
            </ul>
            <div className="pt-2">
              <Link to="/is-makinasi-ariza-tespiti" className="text-xs font-bold text-red-600 hover:underline inline-flex items-center gap-1">
                İş makinası arıza tespiti adımlarını inceleyin <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bakım ve Onarım */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Koruyucu Bakım Anlayışı
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Bakım ve Onarım Hizmetleri
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Düzenli periyodik bakım, yüksek maliyetli arızaların ve şantiye duruşlarının %85'ini önler. 250, 500 ve 1.000 çalışma saati bakımlarında OEM kalitesinde filtreler, orijinal motor yağları ve hidrolik sıvılar kullanılmaktadır.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2 font-medium">✓ Motor, şanzıman ve cer yağ analizleri</li>
              <li className="flex items-center gap-2 font-medium">✓ Hidrolik filtre değişimi ve mikron seviyesi temizlik</li>
              <li className="flex items-center gap-2 font-medium">✓ 12 ay veya 2.000 çalışma saati yazılı servis garantisi</li>
            </ul>
            <div className="pt-2">
              <Link to="/is-makinasi-bakim" className="text-xs font-bold text-red-600 hover:underline inline-flex items-center gap-1">
                İş makinası bakım hizmetlerimiz hakkında bilgi alın <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. H2: Servis Talebi Nasıl Oluşturulur? (6 Adım) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold mb-3">
            <FileText className="w-3.5 h-3.5" /> Hızlı ve Kolay Süreç
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {currentCity.name} İçin Servis Talebi Nasıl Oluşturulur?
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Makinanız arızalandığında aşağıdaki 6 adımı takip ederek dakikalar içinde servis çağrısı açabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 font-black text-xs mx-auto flex items-center justify-center">1</div>
            <h3 className="font-bold text-xs text-slate-900">Makina Türünü Belirt</h3>
            <p className="text-[11px] text-slate-500">Ekskavatör, loder, forklift vb.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 font-black text-xs mx-auto flex items-center justify-center">2</div>
            <h3 className="font-bold text-xs text-slate-900">Marka/Modeli Paylaş</h3>
            <p className="text-[11px] text-slate-500">CAT 320, JCB 3CX, Manitou vb.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 font-black text-xs mx-auto flex items-center justify-center">3</div>
            <h3 className="font-bold text-xs text-slate-900">Arızayı Açıkla</h3>
            <p className="text-[11px] text-slate-500">Hortum patladı, bom kalkmıyor vb.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 font-black text-xs mx-auto flex items-center justify-center">4</div>
            <h3 className="font-bold text-xs text-slate-900">Fotoğraf Ekle</h3>
            <p className="text-[11px] text-slate-500">Etiket veya arıza görseli</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 font-black text-xs mx-auto flex items-center justify-center">5</div>
            <h3 className="font-bold text-xs text-slate-900">Konum Gönder</h3>
            <p className="text-[11px] text-slate-500">Canlı GPS koordinatı paylaş</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-black text-xs mx-auto flex items-center justify-center">6</div>
            <h3 className="font-bold text-xs text-slate-900">Servis Talebi Oluştur</h3>
            <p className="text-[11px] text-slate-500">Mobil araç şantiyenize sevk edilir</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to={serviceRequestUrl}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-600/20 transition-all active:scale-95"
          >
            <span>{currentCity.name} İçin Hemen Servis Talebi Başlat</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 7. H2: Sık Sorulan Sorular (FAQ) */}
      <section className="py-16 bg-slate-100/60 border-t border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold mb-3">
              <HelpCircle className="w-3.5 h-3.5" /> Merak Edilenler
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {currentCity.name} İş Makinaları Servisi Sık Sorulan Sorular
            </h2>
          </div>

          <div className="space-y-3">
            {currentCity.faq.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-red-600 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronRight
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-90 text-red-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Şehirler Arası Dahili Bağlantılar (Nearby Cities) */}
      <section className="py-12 bg-white border-t border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Çevre ve İlgili Servis Bölgelerimiz</h3>
              <p className="text-xs text-slate-500">MESA İş Makinaları'nın bölgedeki diğer aktif mobil servis güzergahları:</p>
            </div>
            <Link
              to="/sehirler"
              className="text-xs font-bold text-red-600 hover:text-red-700 underline inline-flex items-center gap-1"
            >
              Tüm Hizmet Bölgelerini Gör <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            {currentCity.nearbyCities.map((nearby, idx) => (
              <Link
                key={idx}
                to={`/sehirler/${nearby.slug}`}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 border border-slate-200 text-xs font-bold text-slate-700 transition flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>{nearby.name} İş Makinaları Servisi</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Floating/Fixed CTA Banner */}
      <section className="bg-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-black">{currentCity.name} Genelinde Şantiye Arızanız mı Var?</h3>
            <p className="text-xs text-slate-400 mt-1">Mobil teknik ekiplerimiz seyyar hortum presi ve elektronik arıza teşhis cihazlarıyla sahaya çıkışa hazır.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={serviceRequestUrl}
              className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black shadow-lg shadow-red-600/30 transition"
            >
              SERVİS TALEBİ OLUŞTUR
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/10 transition"
            >
              ARA: {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
