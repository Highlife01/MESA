import React from 'react';
import { Link } from '../router/Router';
import { BrandLogo } from './BrandLogos';
import { ArrowUpRight, ShieldCheck, Cpu } from 'lucide-react';

const ROW_1_BRANDS = [
  {
    id: 'caterpillar',
    name: 'Caterpillar (CAT)',
    origin: 'ABD',
    category: 'Ekskavatör & Dozer',
    diag: 'CAT ET & SIS2',
    highlight: 'Ağır Hizmet Uzmanlığı'
  },
  {
    id: 'komatsu',
    name: 'Komatsu',
    origin: 'Japonya',
    category: 'CLSS Hidrolik & Ekskavatör',
    diag: 'Komtrax & K-Detect',
    highlight: 'Japon Hidrolik Hassasiyeti'
  },
  {
    id: 'volvo',
    name: 'Volvo CE',
    origin: 'İsveç',
    category: 'Ekskavatör & Belden Kırma',
    diag: 'PTT & VCADS Pro',
    highlight: 'İskandinav Güvenlik & Güç'
  },
  {
    id: 'bobcat',
    name: 'Bobcat',
    origin: 'ABD / Çekya',
    category: 'Skid-Steer & Mini Ekskavatör',
    diag: 'Service Analyzer',
    highlight: 'Kompakt Güç Uzmanı'
  },
  {
    id: 'merlo',
    name: 'Merlo',
    origin: 'İtalya',
    category: 'Teleskopik Yükleyici & Roto',
    diag: 'Merlo CDC Diagnostic',
    highlight: 'İtalyan Mühendisliği'
  },
  {
    id: 'case',
    name: 'Case CE',
    origin: 'ABD',
    category: 'Kazıcı Yükleyici & Dozer',
    diag: 'EST Electronic Service',
    highlight: 'Ağır Saha Dayanıklılığı'
  }
];

const ROW_2_BRANDS = [
  {
    id: 'jcb',
    name: 'JCB',
    origin: 'İngiltere',
    category: 'Kazıcı Yükleyici & Telehandler',
    diag: 'ServiceMaster 4',
    highlight: 'Bekoloder Lideri'
  },
  {
    id: 'hidromek',
    name: 'Hidromek',
    origin: 'Türkiye',
    category: 'Alpha/Supra Bekoloder & Ekskavatör',
    diag: 'H-Diag & Opera',
    highlight: 'Yerli Güç & HMK Servisi'
  },
  {
    id: 'manitou',
    name: 'Manitou',
    origin: 'Fransa',
    category: 'Teleskopik Yükleyici & Forklift',
    diag: 'Easy Manager & LMI',
    highlight: 'Telehandler Referansı'
  },
  {
    id: 'hitachi',
    name: 'Hitachi',
    origin: 'Japonya',
    category: 'Zaxis Paletli & Lastikli Ekskavatör',
    diag: 'ZX Service Tool / MPDr',
    highlight: 'Zaxis Güvenilirliği'
  },
  {
    id: 'liebherr',
    name: 'Liebherr',
    origin: 'Almanya',
    category: 'Maden Makinaları & Litronic Loder',
    diag: 'Sculi & LiDAT',
    highlight: 'Alman Ağır Sanayi Standardı'
  },
  {
    id: 'hyundai',
    name: 'Hyundai CE',
    origin: 'G. Kore',
    category: 'Robex Ekskavatör & HL Loder',
    diag: 'Hi-Mate Diagnostic',
    highlight: 'Yüksek Hidrolik Verim'
  }
];

function BrandCard({ brand }) {
  return (
    <Link
      to={`/markalar?brand=${brand.id}`}
      className="group relative flex-shrink-0 w-72 mx-2.5 p-4 rounded-xl bg-white border border-slate-200/90 hover:border-red-500 transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between"
    >
      {/* Top row: Origin badge & icon link */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          {brand.origin}
        </span>
        <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 group-hover:text-red-600 transition-colors">
          <span>Servis İncele</span>
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      </div>

      {/* Brand Logo Container */}
      <div className="h-14 w-full flex items-center justify-center py-1 px-3 bg-slate-50/90 rounded-lg border border-slate-200/60 group-hover:border-slate-300 transition-colors my-1 overflow-hidden">
        <BrandLogo 
          brandId={brand.id} 
          className="h-8 w-auto max-w-[170px] shrink-0 object-contain transition-transform duration-300 group-hover:scale-105" 
        />
      </div>

      {/* Details footer */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold text-slate-900 group-hover:text-red-600 transition-colors">
            {brand.name}
          </span>
          <span className="text-[10px] text-red-600 font-semibold truncate max-w-[120px] text-right">
            {brand.highlight}
          </span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-slate-400" />
            <span className="truncate max-w-[140px]">{brand.diag}</span>
          </span>
          <span className="text-slate-400 font-sans font-medium">Yetkin Destek</span>
        </div>
      </div>
    </Link>
  );
}

export default function BrandMarquee() {
  // Duplicated arrays for seamless continuous infinite marquee loop
  const row1List = [...ROW_1_BRANDS, ...ROW_1_BRANDS];
  const row2List = [...ROW_2_BRANDS, ...ROW_2_BRANDS];

  return (
    <div className="relative w-full py-4 overflow-hidden">
      {/* Edge gradient fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />

      {/* Row 1: Right-to-Left */}
      <div className="marquee-container mb-4">
        <div className="marquee-track-rtl">
          {row1List.map((brand, idx) => (
            <BrandCard key={`r1-${brand.id}-${idx}`} brand={brand} />
          ))}
        </div>
      </div>

      {/* Row 2: Left-to-Right */}
      <div className="marquee-container">
        <div className="marquee-track-ltr">
          {row2List.map((brand, idx) => (
            <BrandCard key={`r2-${brand.id}-${idx}`} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
}
