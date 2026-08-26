'use client';

import React from 'react';

const marqueeItems = [
  { label: 'ENGINEERING', value: 'NEXT.JS 15 / REACT 19' },
  { label: 'MOBILE_CORE', value: 'FLUTTER & RIVERPOD' },
  { label: 'CROSS_PLATFORM', value: 'REACT NATIVE (EXPO)' },
  { label: 'CORE_ID', value: 'DIAS YERMEK' },
  { label: 'BACKEND', value: 'FASTAPI & POSTGRESQL' },
  { label: 'AVAILABILITY', value: 'OPEN FOR OFFERS' },
  { label: 'SCALE', value: 'TRUSTME (1.5M+ USERS)' },
  { label: 'EDTECH', value: 'BEYIMTECH (20+ SCHOOLS)' },
  { label: 'BASE', value: 'ASTANA, KZ (UTC+5)' },
  { label: 'AI_SYSTEMS', value: 'OPENAI & TELEMETRY' },
];

export default function SkillsMarquee() {
  return (
    <div className="w-full overflow-hidden border-y border-white/10 bg-[#06080A]/85 backdrop-blur-md py-2.5 font-mono select-none relative z-20">
      {/* Subtle edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#040608] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#040608] to-transparent z-10 pointer-events-none" />

      {/* Infinite track */}
      <div className="animate-marquee flex items-center gap-6 text-xs">
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 shrink-0">
            {/* Tag badge */}
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-white/50 tracking-wider font-semibold">
              {item.label}
            </span>
            {/* Value text */}
            <span className="text-xs font-extrabold text-[var(--accent-color)] tracking-wide font-display">
              {item.value}
            </span>
            {/* Divider */}
            <span className="text-white/20 ml-4 font-light">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
