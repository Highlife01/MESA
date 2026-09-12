import React, { useState } from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { guidesData } from '../data/guidesData';
import { BookOpen, Search, Clock, Calendar, ArrowRight, ShieldCheck, Wrench, ChevronRight } from 'lucide-react';

export const GuidesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const categories = ['Tümü', 'Hidrolik Bakım', 'Koruyucu Bakım', 'Motor & Emisyon', 'Mekanik & Yürüyüş', 'Ekspertiz & Rapor', 'Sıvı & Yağlama'];

  const filteredGuides = guidesData.filter(g => {
    const matchesCategory = selectedCategory === 'Tümü' || g.category === selectedCategory;
    const matchesSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          g.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          g.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#0B0F19] text-slate-100 min-h-screen">
      <SEO
        title="Teknik Rehberler ve Bilgi Bankası | Mesa İş Makinaları"
        description="Ağır iş makinaları için hidrolik sistem bakımı, ISO 4406 yağ analizi, DPF rejenerasyonu, periyodik bakım çizelgeleri ve ekspertiz kılavuzları."
        canonical="/rehberler"
        keywords="iş makinası bakımı, hidrolik yağ kirliliği ISO 4406, DPF temizliği, ekskavatör kule boşluğu, telehandler zincir ayarı, Adana iş makinası rehberi"
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-slate-900 via-[#0B0F19] to-[#0B0F19] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <BookOpen className="w-4 h-4" /> Mesa Teknik Bilgi Bankası & Makaleler
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              İş Makinaları <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Teknik Rehberleri</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Şantiyelerinizde arıza duruş sürelerini minimize etmek, parça ömrünü uzatmak ve doğru koruyucu bakım stratejilerini uygulamak için mühendislerimiz tarafından hazırlanan kapsamlı kılavuzlar.
            </p>

            {/* Search Input */}
            <div className="relative max-w-xl mx-auto">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Konu, arıza tipi veya anahtar kelime arayın (Örn: ISO 4406, DPF, Kule)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills & Guides Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-thin scrollbar-thumb-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide) => (
            <article
              key={guide.id}
              className="group bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex flex-col hover:shadow-2xl hover:shadow-amber-500/5 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={guide.heroImage}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-amber-400 text-xs font-semibold">
                  {guide.category}
                </span>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-400" /> {guide.readTime}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {guide.publishDate}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 mb-3 leading-snug">
                  {guide.title}
                </h2>
                <p className="text-sm text-slate-400 line-clamp-3 mb-4 flex-1 leading-relaxed">
                  {guide.shortDesc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {guide.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/rehberler/${guide.slug}`}
                  className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-semibold text-xs transition-all border border-slate-700/60"
                >
                  <span>Rehberi İncele</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-base mb-2">Aramanıza uygun teknik rehber bulunamadı.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('Tümü'); }}
              className="text-amber-400 hover:underline text-sm font-semibold"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </section>

      {/* Support Box */}
      <section className="py-12 bg-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/30 rounded-2xl p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Şantiyenizde Çözemediğiniz Karmaşık Bir Arıza mı Var?</h3>
              <p className="text-slate-400 text-sm max-w-2xl">
                Rehberlerimizde yer alan konular ve daha fazlası için 7/24 nöbetçi mobil teşhis ekibimiz ve diagnostik mühendislerimizle iletişime geçebilirsiniz.
              </p>
            </div>
            <a
              href="tel:05335293674"
              className="mt-4 sm:mt-0 inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all whitespace-nowrap"
            >
              0533 529 36 74 Ara
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
