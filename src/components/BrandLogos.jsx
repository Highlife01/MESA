import React from 'react';

// Authentic, high-precision SVG brand logos for heavy construction equipment
// Explicit width/height attributes, generous viewBoxes, and preserveAspectRatio prevent clipping or collapsing
export function BrandLogo({ brandId, className = 'h-8 w-auto', style = {} }) {
  const normalizedId = (brandId || '').toLowerCase().trim();
  const commonStyle = {
    maxHeight: '100%',
    maxWidth: '100%',
    width: 'auto',
    display: 'block',
    ...style
  };

  switch (normalizedId) {
    case 'caterpillar':
    case 'cat':
      return (
        <svg 
          viewBox="0 0 160 44" 
          className={className} 
          style={commonStyle}
          preserveAspectRatio="xMidYMid meet"
          aria-label="Caterpillar CAT"
        >
          {/* CAT Black Typography with Golden Yellow Triangle in A & Heavy Yellow Stripe */}
          <g transform="translate(14, 0)">
            <text x="2" y="33" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="38" fill="#111111" letterSpacing="-1">
              C
            </text>
            <g transform="translate(36, 0)">
              <text x="0" y="33" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="38" fill="#111111" letterSpacing="-1">
                A
              </text>
              {/* Iconic CAT Yellow Triangle */}
              <polygon points="10,33 26,33 18,18" fill="#FFCD00" />
            </g>
            <text x="72" y="33" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="38" fill="#111111" letterSpacing="-1">
              T
            </text>
            <rect x="2" y="37" width="98" height="3.5" rx="1.75" fill="#FFCD00" />
          </g>
        </svg>
      );

    case 'jcb':
      return (
        <svg 
          viewBox="0 0 130 44" 
          className={className} 
          style={commonStyle}
          preserveAspectRatio="xMidYMid meet"
          aria-label="JCB"
        >
          {/* Iconic JCB Yellow Rounded Badge */}
          <rect x="5" y="4" width="120" height="36" rx="8" fill="#F8B800" stroke="#E5A800" strokeWidth="1.5" />
          <text x="65" y="31" textAnchor="middle" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="27" fill="#111111" letterSpacing="2">
            JCB
          </text>
        </svg>
      );

    case 'komatsu':
      return (
        <svg 
          viewBox="0 0 200 42" 
          className={className} 
          style={commonStyle}
          preserveAspectRatio="xMidYMid meet"
          aria-label="Komatsu"
        >
          {/* Bold Industrial Komatsu Blue */}
          <text x="100" y="30" textAnchor="middle" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="28" fill="#005BAB" letterSpacing="0.8">
            KOMATSU
          </text>
        </svg>
      );

    case 'hidromek':
      return (
        <svg 
          viewBox="0 0 220 44" 
          className={className} 
          style={commonStyle}
          preserveAspectRatio="xMidYMid meet"
          aria-label="Hidromek"
        >
          {/* HMK Red/White Emblem + Typography */}
          <g transform="translate(6, 6)">
            <rect x="0" y="0" width="32" height="32" rx="7" fill="#E30613" />
            <text x="16" y="23" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="17" fill="#FFFFFF">
              H
            </text>
          </g>
          <text x="48" y="29" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="22" fill="#1E293B" letterSpacing="0.8">
            HİDROMEK
          </text>
        </svg>
      );

    case 'volvo':
      return (
        <svg 
          viewBox="0 0 185 44" 
          className={className} 
          style={commonStyle}
          preserveAspectRatio="xMidYMid meet"
          aria-label="Volvo Construction Equipment"
        >
          {/* Volvo Iron Mark Circle & Arrow */}
          <circle cx="20" cy="22" r="14" fill="none" stroke="#64748B" strokeWidth="3" />
          <line x1="28" y1="14" x2="35" y2="7" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
          <polygon points="37,5 29,6 36,13" fill="#64748B" />
          {/* Volvo Blue Bar */}
          <rect x="46" y="9" width="130" height="26" rx="4" fill="#003057" />
          <text x="111" y="27" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="bold" fontSize="15" fill="#FFFFFF" letterSpacing="4">
            VOLVO
          </text>
        </svg>
      );

    case 'manitou':
      return (
        <svg 
          viewBox="0 0 195 44" 
          className={className} 
          style={commonStyle}
          preserveAspectRatio="xMidYMid meet"
          aria-label="Manitou"
        >
          {/* Red curved bracket and bold Manitou */}
          <path d="M6 10 Q20 4 32 10 Q24 26 16 34 Q6 24 6 10 Z" fill="#E30613" />
          <text x="44" y="29" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="22" fill="#1E293B" letterSpacing="0.8">
            MANITOU
          </text>
        </svg>
      );

    case 'hitachi':
      return (
        <svg 
          viewBox="0 0 180 42" 
          className={className} 
          style={commonStyle}
          preserveAspectRatio="xMidYMid meet"
          aria-label="Hitachi"
        >
          <text x="90" y="29" textAnchor="middle" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="26" fill="#E60012" letterSpacing="1">
            HITACHI
          </text>
        </svg>
      );

    case 'bobcat':
      return (
        <svg 
          viewBox="0 0 175 44" 
          className={className} 
          style={commonStyle}
          preserveAspectRatio="xMidYMid meet"
          aria-label="Bobcat"
        >
          {/* Bobcat Lynx Icon + Text */}
          <g transform="translate(6, 6)">
            <rect x="0" y="0" width="32" height="32" rx="7" fill="#E31837" />
            <path d="M9 22 L16 10 L23 22 Z" fill="#FFFFFF" />
            <circle cx="13" cy="17" r="1.5" fill="#E31837" />
            <circle cx="19" cy="17" r="1.5" fill="#E31837" />
          </g>
          <text x="48" y="29" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="23" fill="#1E293B" letterSpacing="0.5">
            Bobcat
          </text>
        </svg>
      );

    case 'liebherr':
      return (
        <svg 
          viewBox="0 0 190 42" 
          className={className} 
          style={commonStyle}
          preserveAspectRatio="xMidYMid meet"
          aria-label="Liebherr"
        >
          {/* Iconic Bold Liebherr font */}
          <text x="95" y="29" textAnchor="middle" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="24" fill="#1E293B" letterSpacing="1.2">
            LIEBHERR
          </text>
        </svg>
      );

    case 'merlo':
      return (
        <svg 
          viewBox="0 0 165 44" 
          className={className} 
          style={commonStyle}
          preserveAspectRatio="xMidYMid meet"
          aria-label="Merlo"
        >
          <g transform="translate(6, 6)">
            <rect x="0" y="0" width="32" height="32" rx="7" fill="#008D46" />
            <text x="16" y="23" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="17" fill="#FFFFFF">
              M
            </text>
          </g>
          <text x="48" y="29" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="22" fill="#1E293B" letterSpacing="1">
            MERLO
          </text>
        </svg>
      );

    case 'hyundai':
      return (
        <svg 
          viewBox="0 0 190 44" 
          className={className} 
          style={commonStyle}
          preserveAspectRatio="xMidYMid meet"
          aria-label="Hyundai Construction Equipment"
        >
          {/* Tilted oval H and Hyundai */}
          <ellipse cx="22" cy="22" rx="14" ry="12" fill="none" stroke="#002C5F" strokeWidth="2.8" transform="rotate(-15 22 22)" />
          <path d="M16 17 L16 27 M28 17 L28 27 M16 22 L28 22" stroke="#002C5F" strokeWidth="2.8" strokeLinecap="round" transform="rotate(-15 22 22)" />
          <text x="48" y="29" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="21" fill="#002C5F" letterSpacing="0.8">
            HYUNDAI
          </text>
        </svg>
      );

    case 'case':
      return (
        <svg 
          viewBox="0 0 145 44" 
          className={className} 
          style={commonStyle}
          preserveAspectRatio="xMidYMid meet"
          aria-label="Case Construction Equipment"
        >
          {/* Red oval with bold CASE */}
          <rect x="6" y="5" width="133" height="34" rx="17" fill="#C41230" />
          <text x="72" y="29" textAnchor="middle" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="22" fill="#FFFFFF" letterSpacing="2">
            CASE
          </text>
        </svg>
      );

    default:
      return (
        <span className="font-black font-mono text-xs tracking-wider text-slate-800 bg-slate-200/80 px-2.5 py-1 rounded border border-slate-300">
          {brandId ? brandId.toUpperCase() : 'MARKA'}
        </span>
      );
  }
}
