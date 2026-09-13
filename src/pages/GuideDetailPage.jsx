import React from 'react';
import { useParams, Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { guidesData } from '../data/guidesData';
import { servicesData } from '../data/servicesData';
import { Clock, Calendar, ArrowLeft, ArrowRight, CheckCircle2, PhoneCall, Share2, BookOpen, Wrench, ShieldCheck } from 'lucide-react';

export const GuideDetailPage = () => {
  const { slug } = useParams();
  const guide = guidesData.find(g => g.slug === slug) || guidesData[0];
  const relatedService = servicesData.find(s => s.slug === guide.relatedServiceSlug);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <SEO
        title={`${guide.title} | Mesa İş Makinaları Teknik Rehber`}
        description={guide.shortDesc}
        canonical={`/rehberler/${guide.slug}`}
        keywords={guide.tags.join(', ')}
      />

      {/* Breadcrumb & Navigation Header */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-500">
          <Link to="/rehberler" className="inline-flex items-center gap-1.5 text-red-600 hover:underline font-bold">
            <ArrowLeft className="w-3.5 h-3.5" /> Tüm Teknik Rehberlere Dön
          </Link>
          <span className="hidden sm:inline bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700 font-semibold border border-slate-200">
            {guide.category}
          </span>
        </div>
      </div>

      {/* Guide Header */}
      <header className="relative py-14 bg-gradient-to-b from-white to-slate-100 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
            <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 font-bold border border-red-200">
              {guide.category}
            </span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {guide.readTime}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {guide.publishDate}</span>
            <span>Yazar: <strong className="text-slate-800">{guide.author}</strong></span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            {guide.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed font-normal bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            {guide.summary}
          </p>
        </div>
      </header>

      {/* Guide Main Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl overflow-hidden mb-10 border border-slate-200 max-h-96 shadow-md">
          <img
            src={guide.heroImage}
            alt={guide.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Sections */}
        <div className="space-y-10">
          {guide.content.map((sec, idx) => (
            <section key={idx} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-red-600 rounded-full inline-block" />
                {sec.sectionTitle}
              </h2>

              {sec.text && (
                <p className="text-slate-600 leading-relaxed text-base mb-6">
                  {sec.text}
                </p>
              )}

              {sec.checklist && (
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h3 className="text-sm font-bold text-red-600 uppercase tracking-wider mb-2">Uygulanması Gereken Kritik Adımlar:</h3>
                  {sec.checklist.map((item, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700 leading-normal">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Related Service Banner */}
        {relatedService && (
          <div className="mt-12 bg-gradient-to-br from-red-50 via-white to-amber-50 border border-red-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">İlgili Mesa Servis Hizmeti</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">{relatedService.title}</h3>
                <p className="text-sm text-slate-600 max-w-xl">{relatedService.shortDesc}</p>
              </div>
              <Link
                to={`/hizmetler/${relatedService.slug}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm transition-all shrink-0 self-start sm:self-center shadow-lg shadow-red-600/20"
              >
                <span>Hizmet Detayı & Fiyat</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Emergency Call Box */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div>
            <h4 className="text-slate-900 font-bold text-base">Yerinde Arıza Tespiti ve Mobil Servis</h4>
            <p className="text-xs text-slate-500">Çukurova genelinde 45 dakikada sahaya intikal ediyoruz.</p>
          </div>
          <a
            href="tel:05335293674"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs border border-slate-200 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-red-600" />
            0533 529 36 74
          </a>
        </div>
      </div>
    </div>
  );
};
