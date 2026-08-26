'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { portfolioContent } from '../../data/portfolioData';
import { Activity, Terminal, Shield, Network } from 'lucide-react';

export default function HackerStatsCard() {
  const { lang, playHover } = useThemeAudio();
  const content = portfolioContent[lang];

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={playHover}
      className="w-full max-w-[420px] cyber-panel rounded-xl p-5 sm:p-6 font-mono select-none border border-white/10 hover:border-[var(--accent-border)] transition-all shadow-2xl relative"
    >
      {/* Top Laser Scanline */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent animate-pulse" />

      {/* Cyberpunk Corner Notches */}
      <span className="absolute top-1.5 left-2 text-xs text-[var(--accent-color)] opacity-70">┌</span>
      <span className="absolute top-1.5 right-2 text-xs text-[var(--accent-color)] opacity-70">┐</span>
      <span className="absolute bottom-1.5 left-2 text-xs text-[var(--accent-color)] opacity-70">└</span>
      <span className="absolute bottom-1.5 right-2 text-xs text-[var(--accent-color)] opacity-70">┘</span>

      {/* Header Telemetry */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[var(--accent-color)] animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-white uppercase font-display">
            Developer Stats
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--accent-glow)] border border-[var(--accent-border)] text-[10px] text-[var(--accent-color)] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-ping" />
          <span>STABLE</span>
        </div>
      </div>

      {/* Segmented LED Metric Bars */}
      <div className="space-y-4 mb-5">
        {/* Metric 1: Projects */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-white/60 font-medium">PROJECTS_COMPLETED</span>
            <span className="text-[var(--accent-color)] font-bold">15+</span>
          </div>
          {/* 12-Segment LED bar */}
          <div className="flex gap-1 h-2 w-full">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 rounded-sm transition-all duration-300 ${
                  i < 11
                    ? 'bg-[var(--accent-color)] shadow-[0_0_6px_var(--accent-glow)]'
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Metric 2: Experience */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-white/60 font-medium">EXPERIENCE_YEARS</span>
            <span className="text-[var(--accent-color)] font-bold">3+</span>
          </div>
          {/* 12-Segment LED bar */}
          <div className="flex gap-1 h-2 w-full">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 rounded-sm transition-all duration-300 ${
                  i < 10
                    ? 'bg-[var(--accent-color)] shadow-[0_0_6px_var(--accent-glow)]'
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Diagnostic Terminal Stream */}
      <div className="rounded-lg bg-[#040608]/90 border border-white/10 p-3 text-[11px] text-white/80 space-y-1.5">
        <div className="flex items-center justify-between text-white/40 pb-1 mb-1 border-b border-white/5 text-[10px]">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-[var(--accent-color)]" />
            <span>TERMINAL_LOG</span>
          </div>
          <span className="text-[var(--accent-color)]">[ONLINE]</span>
        </div>

        <div className="hover:text-[var(--accent-color)] transition-colors leading-relaxed font-mono truncate">
          &gt; ACTIVE_STACK: NEXT15_FLUTTER_RN
        </div>
        <div className="hover:text-[var(--accent-color)] transition-colors leading-relaxed font-mono truncate">
          &gt; AVAILABILITY_TYPE: REMOTE / HYBRID
        </div>
        <div className="hover:text-[var(--accent-color)] transition-colors leading-relaxed font-mono truncate">
          &gt; STATUS: OPEN_FOR_OFFERS
        </div>
        <div className="hover:text-[var(--accent-color)] transition-colors leading-relaxed font-mono truncate">
          &gt; SYSTEM_PERF: [HIGH] 60 FPS @ 1.0 DPR
        </div>
      </div>

      {/* Footer Diagnostic Ping */}
      <div className="mt-3.5 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
        <span className="flex items-center gap-1">
          <Network className="w-3 h-3 text-[var(--accent-color)]" />
          <span>ASTANA (UTC+5)</span>
        </span>
        <span className="text-[var(--accent-color)] font-bold">LATENCY: 8ms</span>
      </div>
    </motion.div>
  );
}
