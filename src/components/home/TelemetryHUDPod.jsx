'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { ArrowUpRight, Activity, Terminal, ShieldCheck, Cpu } from 'lucide-react';

export default function TelemetryHUDPod() {
  const { playHover, playClick } = useThemeAudio();
  const [pulsePhase, setPulsePhase] = useState(0);

  // Smooth oscilloscope wave effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm space-y-6 font-mono select-none pointer-events-auto">
      {/* 1. Header Telemetry Status */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-[var(--accent-color)] animate-pulse" />
          <span className="text-[11px] font-bold text-white/50 tracking-widest uppercase">
            SYS_TELEMETRY // 01
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[var(--accent-border)] bg-[var(--accent-glow)] text-[10px] font-bold text-[var(--accent-color)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-ping" />
          <span>OPEN_FOR_WORK</span>
        </div>
      </div>

      {/* 2. Big Punchy Metrics in Denominary Font */}
      <div className="grid grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="space-y-0.5">
          <div className="text-3xl sm:text-4xl font-black text-white font-condensed tracking-tight">
            15<span className="text-[var(--accent-color)]">+</span>
          </div>
          <p className="text-[10px] font-bold text-white/80 uppercase leading-tight">
            PROJECTS
          </p>
          <p className="text-[8.5px] text-white/40 leading-tight">
            Mobile & Web
          </p>
        </div>

        {/* Metric 2 */}
        <div className="space-y-0.5">
          <div className="text-3xl sm:text-4xl font-black text-white font-condensed tracking-tight">
            3<span className="text-[var(--accent-color)]">+</span>
          </div>
          <p className="text-[10px] font-bold text-white/80 uppercase leading-tight">
            YEARS EXP
          </p>
          <p className="text-[8.5px] text-white/40 leading-tight">
            Production Dev
          </p>
        </div>

        {/* Metric 3 */}
        <div className="space-y-0.5">
          <div className="text-3xl sm:text-4xl font-black text-white font-condensed tracking-tight">
            1.5M<span className="text-[var(--accent-color)]">+</span>
          </div>
          <p className="text-[10px] font-bold text-white/80 uppercase leading-tight">
            USERS
          </p>
          <p className="text-[8.5px] text-white/40 leading-tight">
            TrustMe Scale
          </p>
        </div>
      </div>

      {/* 3. Live Animated Oscilloscope / Activity Wave */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-[9px] text-white/40 uppercase">
          <span>REALTIME_PROCESSING</span>
          <span className="text-[var(--accent-color)] font-bold">60 FPS // LOW_LATENCY</span>
        </div>
        <div className="h-7 w-full overflow-hidden flex items-center border-y border-white/5 relative">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 300 28">
            <defs>
              <linearGradient id="waveGlow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0.2" />
                <stop offset="50%" stopColor="var(--accent-color)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--accent-color)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d={`M 0 14 
                Q 25 ${14 + Math.sin(pulsePhase * 0.1) * 8}, 50 14 
                T 100 ${14 + Math.cos(pulsePhase * 0.15) * 9} 
                T 150 14 
                T 200 ${14 + Math.sin(pulsePhase * 0.12) * 10} 
                T 250 14 
                T 300 ${14 + Math.cos(pulsePhase * 0.1) * 7}`}
              fill="none"
              stroke="url(#waveGlow)"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>

      {/* 4. Core Specialization Stack Tags (Clean inline tags) */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[9.5px] text-white/40 uppercase tracking-wider block">
          CORE_ENGINEERING_STACK
        </span>
        <div className="flex flex-wrap gap-x-3.5 gap-y-1 text-xs font-mono text-[var(--accent-color)]">
          <span>&bull; Flutter</span>
          <span>&bull; React Native</span>
          <span>&bull; Next.js 15</span>
          <span>&bull; FastAPI</span>
          <span>&bull; PostgreSQL</span>
        </div>
      </div>

      {/* 5. Live System Stream Diagnostics */}
      <div className="pt-2 border-t border-white/10 text-[9.5px] text-white/50 space-y-1 font-mono">
        <div className="hover:text-[var(--accent-color)] transition-colors">&gt; ARCHITECTURE: REACT19_NEXT15_RIVERPOD</div>
        <div className="hover:text-[var(--accent-color)] transition-colors">&gt; STATUS_CODE: 200_OK // STANDBY</div>
        <div className="hover:text-[var(--accent-color)] transition-colors">&gt; TELEMETRY_HOST: ASTANA_HUB_KZ</div>
      </div>
    </div>
  );
}
