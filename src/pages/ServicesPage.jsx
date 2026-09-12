import React, { useState } from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { 
  Wrench, Activity, Truck, Navigation, Layers, Zap, 
  ShieldAlert, CheckCircle2, Phone, ArrowRight, Filter, ShieldCheck
} from 'lucide-react';
import { servicesData } from '../data/servicesData';

export function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const categories = ['Tümü', 'Mekanik & Revizyon', 'Hidrolik', 'Özel Ekipman', 'Acil Müdahale', 'Aktarma Organları', 'Motor & Yakıt', 'Bakım Programı'];

  const filteredServices = selectedCategory === 'Tümü'
    ? servicesData
    : servicesData.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <SEO 
        title="İş Makinası Tamiri & Hidrolik Servis Hizmetlerimiz"
        description="Ekskavatör, loder, bekoloder, Manitou telehandler, hidrolik pompa, şanzıman ve motor revizyon hizmetlerimiz. 12 ay garantili orijinal servis."
        canonical="/hizmetler"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-amber-600">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">Hizmetlerimiz</span>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-amber-600 tracking-wider uppercase block">KAPSAMLI TEKNİK ÇÖZÜMLER</span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-1">
            İş Makinası & Hidrolik Servis Hizmetleri
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Adana ve Çukurova bölgesinde ağır iş makineleri için yerinde arıza tespiti, 450 Bar test standı ile hidrolik pompa revizyonu, teleskopik bom onarımı ve garantili mekanik tamir.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat 
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <div 
              key={service.slug}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col group"
            >
              <div className="h-48 relative overflow-hidden bg-slate-900">
                <img 
                  src={service.heroImage} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-md bg-slate-950/80 backdrop-blur text-xs font-bold text-amber-400 border border-slate-800">
                  {service.category}
                </span>
                <span className="absolute bottom-3 right-3 text-xs font-bold bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-md">
                  ⏱️ {service.duration}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    {service.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-center text-[11px] text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 shrink-0" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-bold flex items-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 mr-1" />
                    {service.warranty}
                  </span>
                  <Link 
                    to={`/hizmetler/${service.slug}`}
                    className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold transition flex items-center space-x-1"
                  >
                    <span>İncele</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Call Box */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-950 text-white p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">ÖZEL TEKNİK DANIŞMANLIK</span>
            <h3 className="text-2xl font-black">Makinenizin Arızası Listede Yok mu?</h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Başmühendis ve usta kadromuzla görüşerek arıza kodlarınızı iletebilir, ücretsiz teknik danışmanlık ve yerinde keşif talep edebilirsiniz.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a 
              href="tel:05335293674" 
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-lg transition flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>0533 529 36 74 Usta ile Görüş</span>
            </a>
            <Link 
              to="/iletisim"
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition"
            >
              İletişim Formu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
