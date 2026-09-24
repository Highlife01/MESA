import React from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { ShieldCheck, Phone, CheckCircle2, ArrowRight, Cpu, Wrench } from 'lucide-react';
import { brandsData } from '../data/brandsData';
import { BrandLogo } from '../components/BrandLogos';

export function BrandsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <SEO 
        title="Desteklenen İş Makinası Markaları & Diagnostik Teşhis"
        description="JCB, Caterpillar (CAT), Hidromek, Komatsu, Volvo, Manitou, Merlo ve Bobcat iş makinelerine yetkili seviyesinde lisanslı diagnostik ve garantili tamir servisi."
        canonical="/markalar"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-amber-600">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">Markalar</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-amber-600 tracking-wider uppercase block">DÜNYA DEVLERİ İÇİN UZMANLIK</span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-1">
            Desteklenen İş Makinası Markaları
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Mesa bünyesinde her markanın özel protokollerini okuyabilen lisanslı diagnostik arıza tespit cihazları, kabloları ve OEM servis yazılımları mevcuttur.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {brandsData.map(brand => (
            <div 
              key={brand.name}
              className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 gap-3">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-36 sm:w-44 bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200/80 rounded-2xl flex items-center justify-center p-2.5 shrink-0 shadow-xs">
                      <BrandLogo brandId={brand.id} className="h-8 sm:h-9 w-auto max-w-[130px] shrink-0 object-contain" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">{brand.origin}</span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">{brand.name}</h3>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-amber-400 text-xs font-bold flex items-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    Uzman Servis
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 mt-4 leading-relaxed font-normal">
                  {brand.desc}
                </p>

                <div className="mt-5 space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-0.5">Başlıca Modeller:</span>
                    <span className="text-slate-600">{brand.specialty}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center text-amber-900 font-mono text-[11px]">
                    <Cpu className="w-4 h-4 text-amber-600 mr-2 shrink-0" />
                    <span><strong>Diagnostik Araç:</strong> {brand.diagnostics}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <a 
                  href={`tel:05325550128`}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-slate-700 hover:text-amber-600 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>Teknik Danışmanlık: 0532 555 01 28</span>
                </a>

                <Link 
                  to="/ariza-bildir"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs transition"
                >
                  Servis Çağır →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
