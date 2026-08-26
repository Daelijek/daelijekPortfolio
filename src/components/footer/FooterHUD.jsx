'use client';

import React from 'react';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { portfolioContent } from '../../data/portfolioData';

export default function FooterHUD() {
  const { lang } = useThemeAudio();
  const content = portfolioContent[lang];

  return (
    <footer className="border-t border-white/10 bg-[#040608] py-8 font-mono text-xs text-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
          <span>{content.footer.rights}</span>
        </div>
        <div className="text-[11px] text-white/40">
          {content.footer.engine} &bull; {content.footer.year}
        </div>
      </div>
    </footer>
  );
}
