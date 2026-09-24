import React from 'react';
import { Link } from '../router/Router';
import { BrandLogo } from './BrandLogos';
import { ArrowUpRight, Cpu, Wrench } from 'lucide-react';
import './SiteChrome.css';

const ROW_1_BRANDS = [
  {
    id: 'caterpillar',
    name: 'Caterpillar (CAT)',
    origin: 'ABD',
    flag: '🇺🇸',
    category: 'Ekskavatör & Dozer',
    diag: 'CAT ET & SIS2',
    highlight: 'Ağır Hizmet Uzmanlığı'
  },
  {
    id: 'komatsu',
    name: 'Komatsu',
    origin: 'Japonya',
    flag: '🇯🇵',
    category: 'CLSS Hidrolik & Ekskavatör',
    diag: 'Komtrax & K-Detect',
    highlight: 'Japon Hidrolik Hassasiyeti'
  },
  {
    id: 'volvo',
    name: 'Volvo CE',
    origin: 'İsveç',
    flag: '🇸🇪',
    category: 'Ekskavatör & Belden Kırma',
    diag: 'PTT & VCADS Pro',
    highlight: 'İskandinav Güvenlik & Güç'
  },
  {
    id: 'bobcat',
    name: 'Bobcat',
    origin: 'ABD / Çekya',
    flag: '🇺🇸',
    category: 'Skid-Steer & Mini Ekskavatör',
    diag: 'Service Analyzer',
    highlight: 'Kompakt Güç Uzmanı'
  },
  {
    id: 'merlo',
    name: 'Merlo',
    origin: 'İtalya',
    flag: '🇮🇹',
    category: 'Teleskopik Yükleyici & Roto',
    diag: 'Merlo CDC Diagnostic',
    highlight: 'İtalyan Mühendisliği'
  },
  {
    id: 'case',
    name: 'Case CE',
    origin: 'ABD',
    flag: '🇺🇸',
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
    flag: '🇬🇧',
    category: 'Kazıcı Yükleyici & Telehandler',
    diag: 'ServiceMaster 4',
    highlight: 'Bekoloder Lideri'
  },
  {
    id: 'hidromek',
    name: 'Hidromek',
    origin: 'Türkiye',
    flag: '🇹🇷',
    category: 'Alpha/Supra Bekoloder & Ekskavatör',
    diag: 'H-Diag & Opera',
    highlight: 'Yerli Güç & HMK Servisi'
  },
  {
    id: 'manitou',
    name: 'Manitou',
    origin: 'Fransa',
    flag: '🇫🇷',
    category: 'Teleskopik Yükleyici & Forklift',
    diag: 'Easy Manager & LMI',
    highlight: 'Telehandler Referansı'
  },
  {
    id: 'hitachi',
    name: 'Hitachi',
    origin: 'Japonya',
    flag: '🇯🇵',
    category: 'Zaxis Paletli & Lastikli Ekskavatör',
    diag: 'ZX Service Tool / MPDr',
    highlight: 'Zaxis Güvenilirliği'
  },
  {
    id: 'liebherr',
    name: 'Liebherr',
    origin: 'Almanya',
    flag: '🇩🇪',
    category: 'Maden Makinaları & Litronic Loder',
    diag: 'Sculi & LiDAT',
    highlight: 'Alman Ağır Sanayi Standardı'
  },
  {
    id: 'hyundai',
    name: 'Hyundai CE',
    origin: 'G. Kore',
    flag: '🇰🇷',
    category: 'Robex Ekskavatör & HL Loder',
    diag: 'Hi-Mate Diagnostic',
    highlight: 'Yüksek Hidrolik Verim'
  }
];

function BrandCard({ brand }) {
  return (
    <Link
      to={`/markalar?brand=${brand.id}`}
      className="group relative flex-shrink-0 w-80 mx-3 p-4 rounded-2xl bg-white/95 border border-slate-200/90 hover:border-red-500/80 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(220,38,38,0.12)] hover:-translate-y-1 flex flex-col justify-between"
    >
      {/* Top row: Origin badge & Service action */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100/90 text-slate-700 border border-slate-200/80 group-hover:border-slate-300 transition-colors">
          <span className="text-xs leading-none">{brand.flag}</span>
          <span>{brand.origin}</span>
        </span>
        <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1 group-hover:text-red-600 transition-colors px-2 py-0.5 rounded-md bg-slate-50 group-hover:bg-red-50 border border-slate-200/60 group-hover:border-red-200">
          <span>Servis İncele</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      </div>

      {/* Brand Logo Stage - Unclipped, generous width, premium backdrop */}
      <div className="h-16 w-full flex items-center justify-center px-4 py-2 bg-gradient-to-b from-slate-50/90 via-white to-slate-50/70 rounded-xl border border-slate-200/70 group-hover:border-slate-300 group-hover:from-white group-hover:to-slate-50 transition-all my-2 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
        <BrandLogo 
          brandId={brand.id} 
          className="h-9 sm:h-10 w-auto max-w-[210px] shrink-0 object-contain transition-transform duration-300 group-hover:scale-105" 
        />
      </div>

      {/* Details footer */}
      <div className="mt-2 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-900 group-hover:text-red-600 transition-colors tracking-tight">
            {brand.name}
          </span>
          <span className="text-[10px] text-red-600 font-semibold px-2 py-0.5 rounded-full bg-red-50 border border-red-100 truncate max-w-[130px] text-right">
            {brand.highlight}
          </span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <Cpu className="w-3 h-3 text-slate-400" />
            <span className="truncate max-w-[150px] font-medium text-slate-600">{brand.diag}</span>
          </span>
          <span className="text-slate-400 font-sans font-medium text-[10px]">Orijinal Teşhis</span>
        </div>
      </div>
    </Link>
  );
}

export default function BrandMarquee() {
  // Quadruplicated arrays (4x) for mathematically seamless, infinite continuous loop across all resolutions
  const row1List = [...ROW_1_BRANDS, ...ROW_1_BRANDS, ...ROW_1_BRANDS, ...ROW_1_BRANDS];
  const row2List = [...ROW_2_BRANDS, ...ROW_2_BRANDS, ...ROW_2_BRANDS, ...ROW_2_BRANDS];

  return (
    <div className="relative w-full py-6 overflow-hidden">
      {/* Edge gradient fade masks for smooth floating entrance and exit */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-28 sm:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 sm:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />

      {/* Row 1: Right-to-Left */}
      <div className="marquee-container mb-5">
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
