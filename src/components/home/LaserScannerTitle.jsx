'use client';

import React from 'react';
import Link from 'next/link';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { portfolioContent } from '../../data/portfolioData';
import { ArrowRight, Terminal, MessageSquare } from 'lucide-react';

export default function LaserScannerTitle() {
  const { lang, playHover, playClick } = useThemeAudio();
  const content = portfolioContent[lang];

  return (
    <div className="relative space-y-6 font-mono text-left select-none w-full max-w-2xl">
      {/* System Status Tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
        <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-ping" />
        <span className="text-[var(--accent-color)] font-bold tracking-wider uppercase text-[11px]">
          DIAS YERMEK // PRODUCTION ENGINEER
        </span>
      </div>

      {/* Laser Scanner Title Viewport */}
      <div className="relative overflow-hidden py-2">
        {/* Animated Laser Scanning Beam */}
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent shadow-[0_0_20px_var(--accent-color)] laser-scanner-line z-20 pointer-events-none" />

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tighter uppercase font-display leading-[0.95] text-white">
          <span className="block hover:text-[var(--accent-color)] transition-colors duration-300">
            FRONTEND &amp;
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] via-white to-[var(--accent-color)] text-glow-strong">
            MOBILE DEVELOPER
          </span>
        </h1>
      </div>

      {/* Underline Info Log Tag */}
      <div className="space-y-2 max-w-xl">
        <div className="w-full h-[1px] bg-gradient-to-r from-[var(--accent-color)] via-white/20 to-transparent" />
        <div className="pt-1.5">
          <div className="text-[11px] font-extrabold text-[var(--accent-color)] tracking-widest mb-1 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>[ INFO_LOG ]</span>
          </div>
          <p className="text-xs sm:text-sm text-white/80 uppercase tracking-wide leading-relaxed font-mono">
            ARCHITECTING PRODUCTION-GRADE MOBILE &amp; WEB SYSTEMS WITH NEXT.JS 15, FLUTTER &amp; AI INTEGRATIONS.
          </p>
        </div>
      </div>

      {/* Verified Achievement Badges */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/70">
          &gt; BeyimTech (Astana Hub)
        </span>
        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/70">
          &gt; TrustMe (1.5M+ Users)
        </span>
        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/70">
          &gt; Astana IT University (2025)
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Link
          href="/projects"
          onClick={playClick}
          onMouseEnter={playHover}
          className="group px-6 sm:px-7 py-3.5 rounded-lg bg-[var(--accent-color)] text-[#040608] font-black text-xs tracking-widest uppercase hover:shadow-[0_0_30px_var(--accent-glow)] transition-all flex items-center gap-3 hover:scale-105 active:scale-95"
        >
          <span>EXPLORE PROJECTS</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/contact"
          onClick={playClick}
          onMouseEnter={playHover}
          className="px-6 sm:px-7 py-3.5 rounded-lg bg-[#080C10]/90 hover:bg-white/10 border border-white/15 hover:border-[var(--accent-border)] text-white font-bold text-xs tracking-widest uppercase transition-all flex items-center gap-2.5"
        >
          <MessageSquare className="w-4 h-4 text-[var(--accent-color)]" />
          <span>INITIALIZE CONTACT</span>
        </Link>
      </div>
    </div>
  );
}
