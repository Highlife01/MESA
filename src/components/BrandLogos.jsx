import React from 'react';

// Authentic, high-precision SVG brand logos for heavy construction equipment
export function BrandLogo({ brandId, className = 'h-7 w-auto' }) {
  switch (brandId) {
    case 'caterpillar':
    case 'cat':
      return (
        <svg viewBox="0 0 140 46" className={className} fill="currentColor" aria-label="Caterpillar CAT">
          {/* CAT Black Typography with Golden Yellow Triangle in A */}
          <text x="2" y="36" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="42" fill="#111111" letterSpacing="-1">
            C
          </text>
          {/* Letter A with Triangle */}
          <g transform="translate(38, 0)">
            <text x="0" y="36" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="42" fill="#111111" letterSpacing="-1">
              A
            </text>
            {/* Iconic CAT Yellow Triangle */}
            <polygon points="12,36 28,36 20,20" fill="#FFCD00" />
          </g>
          <text x="76" y="36" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="42" fill="#111111" letterSpacing="-1">
            T
          </text>
        </svg>
      );

    case 'jcb':
      return (
        <svg viewBox="0 0 120 46" className={className} aria-label="JCB">
          {/* Iconic JCB Yellow Rounded Badge */}
          <rect x="2" y="4" width="116" height="38" rx="8" fill="#F8B800" stroke="#E5A800" strokeWidth="2" />
          <text x="60" y="33" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="28" fill="#111111" letterSpacing="2">
            JCB
          </text>
        </svg>
      );

    case 'komatsu':
      return (
        <svg viewBox="0 0 170 38" className={className} aria-label="Komatsu">
          {/* Bold Industrial Komatsu Blue */}
          <text x="0" y="30" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="30" fill="#005BAB" letterSpacing="0.5">
            KOMATSU
          </text>
        </svg>
      );

    case 'hidromek':
      return (
        <svg viewBox="0 0 180 40" className={className} aria-label="Hidromek">
          {/* HMK Red/White Emblem + Typography */}
          <g transform="translate(0, 4)">
            <rect x="0" y="0" width="32" height="32" rx="6" fill="#E30613" />
            <text x="16" y="23" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="16" fill="#FFFFFF">
              H
            </text>
          </g>
          <text x="40" y="28" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="24" fill="#1E293B" letterSpacing="1">
            HİDROMEK
          </text>
        </svg>
      );

    case 'volvo':
      return (
        <svg viewBox="0 0 150 44" className={className} aria-label="Volvo Construction Equipment">
          {/* Volvo Iron Mark Circle & Arrow */}
          <circle cx="20" cy="22" r="15" fill="none" stroke="#64748B" strokeWidth="3.5" />
          <line x1="28" y1="14" x2="35" y2="7" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
          <polygon points="37,5 29,6 36,13" fill="#64748B" />
          {/* Volvo Blue Bar */}
          <rect x="44" y="9" width="102" height="26" rx="4" fill="#003057" />
          <text x="95" y="27" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="bold" fontSize="16" fill="#FFFFFF" letterSpacing="4">
            VOLVO
          </text>
        </svg>
      );

    case 'manitou':
      return (
        <svg viewBox="0 0 160 38" className={className} aria-label="Manitou">
          {/* Red curved bracket and bold Manitou */}
          <path d="M4 8 Q18 2 32 8 Q24 24 16 32 Q4 22 4 8" fill="#E30613" />
          <text x="40" y="28" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="24" fill="#1E293B" letterSpacing="1">
            MANITOU
          </text>
        </svg>
      );

    case 'hitachi':
      return (
        <svg viewBox="0 0 160 38" className={className} aria-label="Hitachi">
          <text x="0" y="27" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="25" fill="#E60012" letterSpacing="0.5">
            HITACHI
          </text>
        </svg>
      );

    case 'bobcat':
      return (
        <svg viewBox="0 0 150 42" className={className} aria-label="Bobcat">
          {/* Bobcat Lynx Icon + Text */}
          <g transform="translate(0, 3)">
            <rect x="0" y="0" width="36" height="34" rx="8" fill="#E31837" />
            <path d="M10 24 L18 10 L26 24 Z" fill="#FFFFFF" />
            <circle cx="15" cy="18" r="1.5" fill="#E31837" />
            <circle cx="21" cy="18" r="1.5" fill="#E31837" />
          </g>
          <text x="44" y="28" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="23" fill="#1E293B" letterSpacing="0.5">
            Bobcat
          </text>
        </svg>
      );

    case 'liebherr':
      return (
        <svg viewBox="0 0 160 36" className={className} aria-label="Liebherr">
          {/* Iconic Bold Liebherr font */}
          <text x="0" y="26" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="24" fill="#1E293B" letterSpacing="1.5">
            LIEBHERR
          </text>
        </svg>
      );

    case 'merlo':
      return (
        <svg viewBox="0 0 140 38" className={className} aria-label="Merlo">
          <g transform="translate(0, 5)">
            <rect x="0" y="0" width="28" height="28" rx="6" fill="#008D46" />
            <text x="14" y="20" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="16" fill="#FFFFFF">
              M
            </text>
          </g>
          <text x="36" y="27" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="22" fill="#1E293B" letterSpacing="1">
            MERLO
          </text>
        </svg>
      );

    case 'hyundai':
      return (
        <svg viewBox="0 0 160 38" className={className} aria-label="Hyundai Construction Equipment">
          {/* Tilted oval H and Hyundai */}
          <ellipse cx="18" cy="19" rx="14" ry="12" fill="none" stroke="#002C5F" strokeWidth="3" transform="rotate(-15 18 19)" />
          <path d="M12 14 L12 24 M24 14 L24 24 M12 19 L24 19" stroke="#002C5F" strokeWidth="3" strokeLinecap="round" transform="rotate(-15 18 19)" />
          <text x="40" y="27" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="21" fill="#002C5F" letterSpacing="0.5">
            HYUNDAI
          </text>
        </svg>
      );

    case 'case':
      return (
        <svg viewBox="0 0 130 38" className={className} aria-label="Case Construction Equipment">
          {/* Red oval with bold CASE */}
          <rect x="0" y="3" width="124" height="32" rx="16" fill="#C41230" />
          <text x="62" y="25" textAnchor="middle" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="20" fill="#FFFFFF" letterSpacing="1.5">
            CASE
          </text>
        </svg>
      );

    default:
      return (
        <span className="font-black font-mono text-sm tracking-wider text-white">
          {brandId.toUpperCase()}
        </span>
      );
  }
}
