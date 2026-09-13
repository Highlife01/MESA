import React from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { regionsData } from '../data/regionsData';
import { MapPin, Clock, Phone, ArrowRight, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export function RegionalHubPage() {
  const breadcrumbs = [
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Hizmet Bölgelerimiz', url: '/hizmet-bolgeleri' }
  ];

  const regionsSchema = {
    '@type': 'Service',
    'name': 'MESA İş Makinaları Bölgesel Servis Ağı',
    'serviceType': 'Mobil İş Makinası Servisi',
    'provider': {
      '@type': 'LocalBusiness',
      'name': SITE_CONFIG.legalName,
      'telephone': SITE_CONFIG.phoneRaw
    },
    'areaServed': regionsData.map(r => ({
      '@type': 'AdministrativeArea',
      'name': r.name
    })),
    'description': 'Türkiye’nin 7 coğrafi bölgesinde ağır iş makineleri mobil servis ve şantiye müdahale organizasyonu.'
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-600 selection:text-white">
      <SEO 
        title="Hizmet Bölgelerimiz (7 Coğrafi Bölge) | MESA İş Makinaları"
        description="MESA İş Makinaları Türkiye'nin 7 bölgesinde mobilize teknik servis araçlarıyla şantiyelerde 7/24 yerinde iş makinası tamiri ve hidrolik servis desteği sağlamaktadır."
        canonical="/hizmet-bolgeleri"
        keywords="iş makinası servis bölgeleri, türkiye geneli iş makinası servisi, akdeniz mobil servis, marmara hidrolik servis, ege iş makinası servisi"
        schema={regionsSchema}
        breadcrumbs={breadcrumbs}
      />

      {/* ── Breadcrumb Bar ── */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
            <Link to="/" className="hover:text-red-600 transition">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Hizmet Bölgelerimiz</span>
          </nav>
        </div>
      </div>

      {/* ── Header ── */}
      <section className="bg-gradient-to-br from-white via-slate-50 to-slate-100 py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Truck className="w-3.5 h-3.5" /> 7 Bölge Ulusal Lojistik Hub
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Türkiye Genelinde <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600">Bölgesel Servis Ağı</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Adana merkez atölyemizden tüm Türkiye’ye ve 7 coğrafi bölgedeki şantiyelere sevk edilen mobil servis filomuz ile arızalara en kısa sürede yerinde müdahale ediyoruz.
          </p>
        </div>
      </section>

      {/* ── Regions Grid ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionsData.map((region) => (
              <div
                key={region.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-bold">
                      {region.shortName}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      <Clock className="w-3 h-3" />
                      {region.dispatchTime.replace('Mobil Servis Sevkiyatı: ', '')}
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-slate-900 mb-2">
                    {region.name}
                  </h2>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {region.description}
                  </p>

                  <div className="space-y-1 mb-4 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Öne Çıkan Sektörler:</span>
                    {region.focusSectors.map((sector, i) => (
                      <div key={i} className="text-xs text-slate-700 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span>{sector}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Kapsamdaki İller:</span>
                    <div className="flex flex-wrap gap-1">
                      {region.cities.map((c, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-50 border border-slate-100 text-slate-700">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href="tel:05335293674"
                    className="text-xs font-bold text-slate-900 hover:text-red-600 flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-red-600" />
                    <span>0533 529 36 74</span>
                  </a>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(`Merhaba, ${region.name} bölgesindeki şantiyem için mobil servis talebinde bulunmak istiyorum.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <span>Servis İste</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ulusal Çağrı ── */}
      <section className="bg-slate-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h2 className="text-2xl font-black">Şantiyeniz Hangi İlde Olursa Olsun Yanınızdayız</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Türkiye genelinde 5 mobil servis aracıyla yerinde hidrolik hortum presi, mekanik onarım ve diagnostik arıza tespiti.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/turkiye-is-makinalari-servisi"
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 transition"
            >
              <span>Türkiye Geneli Servis Detayları</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegionalHubPage;
