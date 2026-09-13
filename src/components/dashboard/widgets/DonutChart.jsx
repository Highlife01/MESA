import React from 'react';

export function DonutChart({ segments, size = 110, strokeWidth = 14 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  let cumulativePercent = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />
      {segments.map((seg, i) => {
        const pct = seg.value / total;
        const offset = circumference * (1 - pct);
        const rotation = cumulativePercent * 360 - 90;
        cumulativePercent += pct;
        return (
          <circle
            key={i}
            cx={size/2}
            cy={size/2}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(${rotation} ${size/2} ${size/2})`}
            style={{ transition: 'stroke-dashoffset 0.8s ease' }}
          />
        );
      })}
      <text x={size/2} y={size/2 - 4} textAnchor="middle" className="fill-slate-900 text-lg font-black">{total}</text>
      <text x={size/2} y={size/2 + 12} textAnchor="middle" className="fill-slate-500 text-[9px] font-bold">TOPLAM</text>
    </svg>
  );
}
