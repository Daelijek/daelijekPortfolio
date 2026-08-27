'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { portfolioContent } from '../../data/portfolioData';
import { Activity, Terminal, Shield, Cpu } from 'lucide-react';

export default function TelemetryCard() {
  const { lang, playHover } = useThemeAudio();
  const content = portfolioContent[lang];
  const stats = content.system.stats;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-lg cyber-panel rounded-lg p-5 font-mono relative overflow-hidden"
    >
      {/* Top Scanline effect bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent animate-pulse" />

      {/* Header telemetry */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[var(--accent-color)]" />
          <span className="text-xs font-bold tracking-wider text-white uppercase">
            DEVELOPER_TELEMETRY // LIVE
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--accent-glow)] border border-[var(--accent-border)] text-[10px] text-[var(--accent-color)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-ping" />
          <span>{content.system.status}</span>
        </div>
      </div>

      {/* Metrics Bars */}
      <div className="space-y-4 mb-5">
        {/* Metric 1: Projects */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-white/60">{stats.projectsTitle}</span>
            <span className="text-[var(--accent-color)] font-bold">{stats.projectsCount}</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: stats.projectsProgress }}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
              className="h-full bg-[var(--accent-color)] rounded-full shadow-[0_0_10px_var(--accent-glow)]"
            />
          </div>
        </div>

        {/* Metric 2: Experience */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-white/60">{stats.experienceTitle}</span>
            <span className="text-[var(--accent-color)] font-bold">{stats.experienceCount}</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: stats.experienceProgress }}
              transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
              className="h-full bg-[var(--accent-color)] rounded-full shadow-[0_0_10px_var(--accent-glow)]"
            />
          </div>
        </div>
      </div>

      {/* Terminal Live Stream Log */}
      <div className="rounded bg-[#040608] border border-white/10 p-3 text-[11px] text-white/70 space-y-1">
        <div className="flex items-center gap-2 text-white/40 pb-1 mb-1 border-b border-white/5 text-[10px]">
          <Terminal className="w-3 h-3 text-[var(--accent-color)]" />
          <span>REALTIME_LOGS &bull; ASTANA (UTC+5)</span>
        </div>
        {stats.terminalLog.map((log, idx) => (
          <div
            key={idx}
            className="leading-relaxed hover:text-[var(--accent-color)] transition-colors"
          >
            {log}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
