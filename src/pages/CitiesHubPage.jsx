import React, { useState } from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { SITE_CONFIG } from '../config/siteConfig';
import { getActiveCities } from '../data/citiesData';
import { regionsData } from '../data/regionsData';
import { 
  MapPin, Truck, Wrench, ShieldCheck, ArrowRight, 
  Search, Phone, MessageSquare, ChevronRight, CheckCircle2, Clock 
} from 'lucide-react';

export function CitiesHubPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const activeCities = getActiveCities();

  const filteredCities = activeCities.filter(city => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
                          city.name.toLowerCase().includes(q) ||
                          city.plate.includes(q) ||
                          city.industryContext.toLowerCase().includes(q);
    const matchesRegion = selectedRegion === 'all' || city.regionId === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const regionsWithActiveCities = regionsData.filter(reg => 
    activeCities.some(c => c.regionId === reg.id)
  );

  const canonicalUrl = '/sehirler';

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_CONFIG.siteUrl}${canonicalUrl}#service`,
        'name': 'Türkiye Geneli 81 İl İş Makinaları Servis Bölgeleri',
        'serviceType': 'Mobil İş Makinası ve Hidrolik Servis Ağı',
        'description': 'MESA İş Makinaları Türkiye genelinde 81 ilin tamamında ve 7 coğrafi bölgede tam donanımlı mobil araçlarla 7/24 yerinde teknik servis sunmaktadır.',
        'provider': {
          '@type': 'LocalBusiness',
          '@id': `${SITE_CONFIG.siteUrl}#organization`,
          'name': SITE_CONFIG.legalName,
          'telephone': SITE_CONFIG.phoneRaw,
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
          '@type': 'Country',
          'name': 'Turkey'
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
            'item': `${SITE_CONFIG.siteUrl}${canonicalUrl}`
          }
        ]
      }
    ]
  };

  const breadcrumbs = [
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Hizmet Bölgeleri', url: canonicalUrl }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-600 selection:text-white">
      <SEO
        title="Türkiye Geneli 81 İl İş Makinaları Servis Ağımız | MESA"
        description="MESA İş Makinaları Türkiye'nin 81 ilinde Marmara'dan Güneydoğu'ya 7/24 donanımlı mobil araçlar, yerinde hidrolik revizyon ve acil şantiye müdahale desteği sağlar."
        canonical={canonicalUrl}
        jsonLd={structuredData}
        breadcrumbs={breadcrumbs}
      />

      {/* Breadcrumb Bar */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center text-xs font-medium text-slate-600 overflow-x-auto whitespace-nowrap gap-2">
          <Link to="/" className="hover:text-red-600 transition-colors">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="text-slate-900 font-bold">Hizmet Bölgeleri</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider mb-4">
            <Truck className="w-3.5 h-3.5" />
            <span>Türkiye Çapında Mobil Teknik Müdahale</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
            Türkiye Geneli İş Makinaları Servis Bölgeleri
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-8">
            MESA İş Makinaları, şantiyelerinizde ve fabrikalarınızda meydana gelen arızalara seyyar hidrolik pres, elektronik teşhis cihazı ve donanımlı mobil araçlarıyla yerinde müdahale eder. Türkiye genelinde hizmet ağımızı keşfedin.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/turkiye-is-makinalari-servisi"
              className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-600/20 transition active:scale-95"
            >
              <span>Ulusal Servis Vizyonumuzu İnceleyin</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/ariza-bildir"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/10 transition"
            >
              Hemen Arıza Bildir
            </Link>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-8 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 sticky top-0 z-30 shadow-xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Region Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedRegion('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedRegion === 'all'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>Tüm İller</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedRegion === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {activeCities.length}
              </span>
            </button>
            {regionsWithActiveCities.map(reg => {
              const regCount = activeCities.filter(c => c.regionId === reg.id).length;
              return (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedRegion === reg.id
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{reg.shortName}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedRegion === reg.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {regCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="İl adı, plaka (01, 34) veya sanayi ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-red-500 focus:bg-white transition"
            />
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city) => {
            const cityUrl = `/sehirler/${city.slug}`;
            return (
              <div
                key={city.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-red-400 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 font-mono font-black text-xs">
                      Plaka: {city.plate}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {city.regionName}
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-slate-900 group-hover:text-red-600 transition-colors mb-1.5">
                    {city.name} İş Makinaları Servisi
                  </h2>

                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 w-fit mb-3">
                    <Clock className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Tahmini İntikal: {
                      city.regionId === 'akdeniz' ? '30 - 45 dk' :
                      city.regionId === 'marmara' ? '1 - 2 saat' :
                      city.regionId === 'ic-anadolu' ? '1,5 - 2,5 saat' :
                      city.regionId === 'ege' ? '2 - 3 saat' : '2 - 4 saat'
                    }</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {city.intro}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-slate-100 mb-6">
                    <div className="text-[11px] font-bold text-slate-700">Öne Çıkan Saha Hizmetleri:</div>
                    <ul className="text-[11px] text-slate-500 space-y-1">
                      {city.servicedMachinery.slice(0, 3).map((m, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 truncate">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-2">
                  <Link
                    to={cityUrl}
                    className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Sayfayı İncele</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to={`/ariza-bildir?city=${encodeURIComponent(city.name)}`}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 text-[11px] font-bold transition"
                  >
                    Servis Çağır
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCities.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-slate-500 text-sm font-medium">Aradığınız kriterlere uygun şehir bulunamadı.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedRegion('all'); }}
              className="mt-3 text-xs font-bold text-red-600 hover:underline"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </section>

      {/* Nationwide Service Notice */}
      <section className="py-12 bg-slate-100/80 border-t border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h3 className="text-lg font-black text-slate-900">
            Listenizde Olmayan Bir Şehirde mi Şantiyeniz Var?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            MESA İş Makinaları, 5 tam donanımlı mobil araçlık filosu ve merkez atölyesi koordinasyonuyla Türkiye'nin 81 ilindeki baraj, otoyol, maden ve inşaat projelerine yerinde mobil servis desteği ulaştırmaktadır.
          </p>
          <div className="pt-2">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>Acil Mobil Koordinasyon: {SITE_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
