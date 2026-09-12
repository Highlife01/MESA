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
    <div className="bg-[#0B0F19] text-slate-100 min-h-screen">
      <SEO
        title={`${guide.title} | Mesa İş Makinaları Teknik Rehber`}
        description={guide.shortDesc}
        canonical={`/rehberler/${guide.slug}`}
        keywords={guide.tags.join(', ')}
      />

      {/* Breadcrumb & Navigation Header */}
      <div className="bg-slate-950/80 border-b border-slate-800 py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-400">
          <Link to="/rehberler" className="inline-flex items-center gap-1.5 text-amber-400 hover:underline font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" /> Tüm Teknik Rehberlere Dön
          </Link>
          <span className="hidden sm:inline bg-slate-800 px-2.5 py-1 rounded text-slate-300 font-medium">
            {guide.category}
          </span>
        </div>
      </div>

      {/* Guide Header */}
      <header className="relative py-14 bg-gradient-to-b from-slate-900 to-[#0B0F19] border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-4">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
              {guide.category}
            </span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {guide.readTime}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {guide.publishDate}</span>
            <span>Yazar: <strong className="text-slate-200">{guide.author}</strong></span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {guide.title}
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed font-normal bg-slate-900/60 p-5 rounded-xl border border-slate-800/80">
            {guide.summary}
          </p>
        </div>
      </header>

      {/* Guide Main Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl overflow-hidden mb-10 border border-slate-800 max-h-96">
          <img
            src={guide.heroImage}
            alt={guide.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Sections */}
        <div className="space-y-10">
          {guide.content.map((sec, idx) => (
            <section key={idx} className="bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-amber-500 rounded-full inline-block" />
                {sec.sectionTitle}
              </h2>

              {sec.text && (
                <p className="text-slate-300 leading-relaxed text-base mb-6">
                  {sec.text}
                </p>
              )}

              {sec.checklist && (
                <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
                  <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">Uygulanması Gereken Kritik Adımlar:</h3>
                  {sec.checklist.map((item, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300 leading-normal">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Related Service Banner */}
        {relatedService && (
          <div className="mt-12 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">İlgili Mesa Servis Hizmeti</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">{relatedService.title}</h3>
                <p className="text-sm text-slate-400 max-w-xl">{relatedService.shortDesc}</p>
              </div>
              <Link
                to={`/hizmetler/${relatedService.slug}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shrink-0 self-start sm:self-center shadow-lg shadow-amber-500/20"
              >
                <span>Hizmet Detayı & Fiyat</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Emergency Call Box */}
        <div className="mt-8 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-white font-bold text-base">Yerinde Arıza Tespiti ve Mobil Servis</h4>
            <p className="text-xs text-slate-400">Çukurova genelinde 45 dakikada sahaya intikal ediyoruz.</p>
          </div>
          <a
            href="tel:05335293674"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" />
            0533 529 36 74
          </a>
        </div>
      </div>
    </div>
  );
};
