import React, { useState } from 'react';
import { Link, useParams } from '../router/Router';
import { SEO } from '../components/SEO';
import { 
  Wrench, CheckCircle2, AlertTriangle, ShieldCheck, 
  Phone, MessageSquare, Clock, ArrowRight, ChevronDown, Check, ShieldAlert
} from 'lucide-react';
import { servicesData } from '../data/servicesData';

export function ServiceDetailPage({ explicitSlug }) {
  const { slug: paramSlug } = useParams();
  const [openFaq, setOpenFaq] = useState(null);

  const rawPath = typeof window !== 'undefined' ? window.location.pathname.replace(/^\//, '').split('/')[0] : '';
  const effectiveSlug = explicitSlug || paramSlug || rawPath;
  const service = servicesData.find(s => s.slug === effectiveSlug || s.id === effectiveSlug);

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 py-24 text-center px-4">
        <h1 className="text-2xl font-black text-slate-800">Aradığınız Hizmet Sayfası Bulunamadı</h1>
        <p className="text-sm text-slate-500 mt-2">Hizmet yayından kaldırılmış veya bağlantı adresi değişmiş olabilir.</p>
        <Link 
          to="/hizmetler"
          className="mt-6 inline-block px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
        >
          ← Tüm Hizmetlerimize Dön
        </Link>
      </div>
    );
  }

  const otherServices = servicesData.filter(s => s.slug !== slug).slice(0, 4);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : `/hizmetler/${service.slug}`;
  const canonicalUrl = currentPath.startsWith('/hizmetler/') ? currentPath : (currentPath.length > 1 ? currentPath : `/hizmetler/${service.slug}`);

  const serviceJsonLd = {
    '@type': 'Service',
    'name': service.title,
    'serviceType': service.category,
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'MESA İş Makinaları',
      'telephone': '+905335293674'
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'Turkey'
    },
    'description': service.shortDesc
  };

  // Add FAQ Schema if available
  const faqSchema = service.faqs && service.faqs.length > 0 ? {
    '@type': 'FAQPage',
    'mainEntity': service.faqs.map(f => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.a
      }
    }))
  } : null;

  const breadcrumbsList = [
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Hizmetlerimiz', url: '/hizmetler' },
    { name: service.title, url: canonicalUrl }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <SEO 
        title={`${service.title} | Türkiye MESA Servisi`}
        description={`${service.shortDesc} Türkiye genelinde 7/24 yerinde teknik müdahale, ${service.warranty}. 0533 529 36 74.`}
        canonical={canonicalUrl}
        schema={faqSchema ? [serviceJsonLd, faqSchema] : serviceJsonLd}
        breadcrumbs={breadcrumbsList}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-amber-600">Ana Sayfa</Link>
          <span>/</span>
          <Link to="/hizmetler" className="hover:text-amber-600">Hizmetlerimiz</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate">{service.title}</span>
        </div>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white mb-10 shadow-xl">
          <img 
            src={service.heroImage || '/images/mesa-workshop.png'} 
            alt={service.title}
            className="w-full h-72 sm:h-96 object-cover opacity-35"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/mesa-workshop.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          <div className="absolute bottom-0 left-0 p-6 sm:p-10 max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-md bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider mb-3">
              {service.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              {service.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              {service.shortDesc}
            </p>
          </div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Detailed Description */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                Teknik Servis ve Onarım Süreci
              </h2>
              <div className="text-sm text-slate-700 leading-relaxed space-y-3 whitespace-pre-line font-normal">
                {service.content}
              </div>
            </div>

            {/* Highlights Checklist */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" />
                Hizmet Kapsamımız & Neler Yapıyoruz?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {service.highlights.map((h, i) => (
                  <div key={i} className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Symptoms / Issues */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center">
                <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
                Sık Karşılaşılan Arıza Belirtileri
              </h2>
              <p className="text-xs text-slate-500">
                Makinenizde aşağıdaki belirtilerden herhangi biri varsa daha büyük mekanik hasarlar oluşmadan hemen ekibimizle iletişime geçin:
              </p>
              <div className="space-y-2 pt-1">
                {service.commonIssues.map((issue, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs font-bold text-amber-950">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <span>{issue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                  Bu Hizmet Hakkında Sık Sorulan Sorular
                </h2>
                <div className="space-y-3 pt-2">
                  {service.faqs.map((faq, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          className="w-full text-left px-5 py-3.5 flex items-center justify-between font-bold text-xs text-slate-800 hover:text-amber-600 transition"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-amber-600' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Summary Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5 sticky top-24">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">SERVİS ÖZETİ</span>
                <h3 className="text-lg font-black text-slate-900 mt-1">{service.title}</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500">Ortalama Süre:</span>
                  <span className="font-bold text-slate-900">{service.duration}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500">Garanti:</span>
                  <span className="font-bold text-emerald-600">{service.warranty}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500">Hizmet Türü:</span>
                  <span className="font-bold text-slate-900">Yerinde Saha / Atölye</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500">Kapsama:</span>
                  <span className="font-bold text-slate-900">Çukurova Bölgesi (Adana, Mersin, vb.)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a 
                  href="tel:05335293674"
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-amber-500/20"
                >
                  <Phone className="w-4 h-4" />
                  <span>0533 529 36 74 Hemen Ara</span>
                </a>

                <a 
                  href={`https://wa.me/905344075585?text=Merhaba,%20${encodeURIComponent(service.title)}%20hakkinda%20bilgi%20ve%20servis%20talep%20etmek%20istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-emerald-600/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp ile Fiyat & Bilgi Al</span>
                </a>

                <Link
                  to="/ariza-bildir"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-2 transition"
                >
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>Online Servis Formu Doldur</span>
                </Link>
              </div>

              {/* Other Services Link */}
              <div className="pt-4 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  İlgili Diğer Hizmetler
                </div>
                <div className="space-y-1.5">
                  {otherServices.map(os => (
                    <Link
                      key={os.slug}
                      to={`/hizmetler/${os.slug}`}
                      className="block py-1 text-xs text-slate-700 hover:text-amber-600 truncate transition font-medium"
                    >
                      • {os.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
