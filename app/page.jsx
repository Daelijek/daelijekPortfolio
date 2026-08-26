'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeAudio } from '../src/context/ThemeAudioContext';
import { soundFx } from '../src/audio/soundEffects';
import Device3DViewport from '../src/components/home/Device3DViewport';
import QuantumMatrixBackground from '../src/components/home/QuantumMatrixBackground';
import TrueLaserScanner from '../src/components/home/TrueLaserScanner';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';

const marqueeItems = [
  { label: 'RENDERING', value: 'NEXT.JS 15 / REACT 19' },
  { label: 'MOBILE_CORE', value: 'FLUTTER & RIVERPOD' },
  { label: 'CROSS_PLATFORM', value: 'REACT NATIVE (EXPO)' },
  { label: 'CORE_ID', value: 'FRONTEND & MOBILE' },
  { label: 'BACKEND', value: 'FASTAPI & POSTGRESQL' },
  { label: 'AVAILABILITY', value: 'OPEN' },
  { label: 'SCALE', value: 'TRUSTME (1.5M+ USERS)' },
  { label: 'EDTECH', value: 'BEYIMTECH (20+ SCHOOLS)' },
  { label: 'BASE', value: 'ASTANA (UTC+5)' },
];

export default function HomePage() {
  const { soundEnabled, setSoundEnabled, perfTier, setPerfTier, playHover, playClick } = useThemeAudio();
  const [isBooted, setIsBooted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState('INITIALIZING_ENGINE');
  const [astanaTime, setAstanaTime] = useState('');

  // Live Astana clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Almaty',
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
      };
      setAstanaTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Boot sequence
  useEffect(() => {
    try {
      if (sessionStorage.getItem('daelijek_booted') === 'true') {
        setIsBooted(true);
        return;
      }
    } catch {}

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 9) + 4;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setStepText('SYSTEM_READY');
        clearInterval(interval);
      } else {
        setProgress(current);
        if (current > 35 && current <= 75) setStepText('MOUNTING_SHADERS');
        else if (current > 75) setStepText('CALIBRATING_HUD');
      }
    }, 35);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    soundFx.playBootChime();
    setIsBooted(true);
    try {
      sessionStorage.setItem('daelijek_booted', 'true');
    } catch {}
  };

  return (
    <main className="relative h-screen w-screen bg-[#020406] text-white font-mono select-none overflow-hidden flex flex-col justify-between">
      {/* Fullscreen Grid Preloader Overlay */}
      <AnimatePresence>
        {!isBooted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#040608] p-6 sm:p-12"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs text-white/50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-ping" />
                <span className="font-bold text-white tracking-widest uppercase">DIAS_YERMEK // ENGINE BOOT</span>
              </div>
              <span className="text-[var(--accent-color)]">[ASTANA &bull; UTC+5]</span>
            </div>

            <div className="my-auto flex flex-col items-center justify-center text-center max-w-lg mx-auto w-full">
              {progress < 100 ? (
                <div className="space-y-4">
                  <div className="text-7xl sm:text-8xl font-black text-white tracking-tighter">
                    <span className="text-glow">{progress}</span>
                    <span className="text-3xl text-[var(--accent-color)]">%</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-[var(--accent-color)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
                    <span>&gt; {stepText}</span>
                  </div>
                  <div className="w-64 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
                    <div
                      className="h-full bg-[var(--accent-color)] transition-all duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                  <button
                    onClick={handleEnter}
                    onMouseEnter={playHover}
                    className="group relative px-8 py-4 bg-transparent border border-[var(--accent-color)] text-white hover:bg-[var(--accent-color)] hover:text-[#040608] rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_var(--accent-glow)] flex items-center gap-4"
                  >
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] group-hover:bg-[#040608] animate-pulse" />
                    <span>CLICK TO ENTER PORTFOLIO</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[11px] text-white/40 tracking-wider">SYSTEM STATUS: 100% READY</p>
                </motion.div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-4 gap-3 text-xs text-white/50">
              <div className="flex items-center gap-2">
                <span>AUDIO ENGINE:</span>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  onMouseEnter={playHover}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[var(--accent-color)] font-bold flex items-center gap-1.5"
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{soundEnabled ? 'ON' : 'OFF'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span>PERF TIER:</span>
                <div className="flex rounded border border-white/10 p-0.5 bg-white/5">
                  {['high', 'med', 'saver'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setPerfTier(t)}
                      onMouseEnter={playHover}
                      className={`px-2 py-0.5 text-[10px] uppercase rounded font-bold ${
                        perfTier === t ? 'bg-[var(--accent-color)] text-[#040608]' : 'text-white/40 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT SCANNER OVERLAY BLOCK (Uniformly rounded on all 4 corners) */}
      <div className="absolute left-3 sm:left-4 lg:left-5 top-3 sm:top-4 lg:top-5 bottom-3 sm:bottom-4 lg:bottom-5 right-1/2 mr-1.5 sm:mr-2.5 lg:mr-3 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 z-0">
        {/* Quantum 3D Matrix Lattice with Gravitational Warp */}
        <QuantumMatrixBackground />
        {/* Synchronized Real Laser Scanner with Pixel-Locked Light Intersection */}
        <TrueLaserScanner />
      </div>

      {/* TOP ROW: Brand (Left) & Marquee Ticker (Right) */}
      <div className="relative z-30 w-full pt-6 px-8 sm:px-12 flex items-center justify-between pointer-events-auto">
        {/* Top-Left Brand */}
        <Link href="/" className="group flex items-center gap-3 text-left">
          <div className="text-right">
            <span className="block text-xs font-bold text-white group-hover:text-[var(--accent-color)] transition-colors leading-tight">
              Dias
            </span>
            <span className="block text-xs font-bold text-white group-hover:text-[var(--accent-color)] transition-colors leading-tight">
              Yermek
            </span>
          </div>
          <div className="w-[1px] h-6 bg-white/20" />
          <div className="text-left text-[10px] text-white/40 leading-tight">
            <span className="block">Portfolio</span>
            <span className="block font-bold text-white/70">2026</span>
          </div>
        </Link>

        {/* Top-Right: Edge-to-Edge Rolling Marquee (Theme reactive) */}
        <div
          className="hidden md:block absolute left-1/2 right-3 sm:right-4 lg:right-5 top-5 overflow-hidden pointer-events-auto select-none"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 50px, black calc(100% - 50px), transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50px, black calc(100% - 50px), transparent 100%)',
          }}
        >
          <div className="animate-marquee flex items-center gap-8 py-2">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 shrink-0">
                <span className="px-2 py-0.5 rounded border border-[var(--accent-border)] bg-[var(--accent-glow)] text-[10px] text-[var(--accent-color)] tracking-wider font-mono uppercase transition-colors">
                  {item.label}
                </span>
                <span className="text-xl sm:text-2xl font-normal text-[var(--accent-color)] tracking-wider uppercase font-condensed transition-colors">
                  {item.value}
                </span>
                <span className="text-white/20 text-lg ml-2 font-mono">|</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CENTER 3D INTERACTIVE DEVICE (Dead center of the entire screen, crossing the 50% split) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto flex items-center justify-center">
        <Device3DViewport />
      </div>

      {/* MAIN VIEWPORT: Right Half Content (Developer Stats & Telemetry Stream) */}
      <div className="relative z-10 w-full px-8 sm:px-14 lg:px-20 grid grid-cols-1 md:grid-cols-2 items-center my-auto pointer-events-none">
        {/* Empty Left Placeholder */}
        <div className="hidden md:block" />

        {/* RIGHT HALF CONTENT (Developer Stats aligned to the right) */}
        <div className="pointer-events-auto hidden md:flex flex-col justify-center items-end text-right font-mono text-xs space-y-6">
          <div className="w-full max-w-xs space-y-5 text-left">
            {/* Header */}
            <div>
              <p className="text-[10px] text-white/40 tracking-wider uppercase">DEVELOPER STATS</p>
              <div className="flex items-center gap-1.5 text-[11px] text-[var(--accent-color)] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-ping" />
                <span>STABLE // OPEN_FOR_WORK</span>
              </div>
            </div>

            {/* Metric 1 */}
            <div>
              <div className="flex justify-between text-[11px] text-white/70 mb-1">
                <span>PROJECTS_COMPLETED</span>
                <span className="text-white font-bold">15+</span>
              </div>
              <div className="w-full h-[1.5px] bg-white/10 rounded-full overflow-hidden">
                <div className="w-[92%] h-full bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-color)]" />
              </div>
            </div>

            {/* Metric 2 */}
            <div>
              <div className="flex justify-between text-[11px] text-white/70 mb-1">
                <span>EXPERIENCE_YEARS</span>
                <span className="text-white font-bold">3+ YRS</span>
              </div>
              <div className="w-full h-[1.5px] bg-white/10 rounded-full overflow-hidden">
                <div className="w-[88%] h-full bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-color)]" />
              </div>
            </div>

            {/* Specialization Tags */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[9px] text-white/40 uppercase block">CORE DOMAINS</span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-[var(--accent-border)] text-[9px] text-[var(--accent-color)]">
                  Flutter
                </span>
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-[var(--accent-border)] text-[9px] text-[var(--accent-color)]">
                  React Native
                </span>
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-[var(--accent-border)] text-[9px] text-[var(--accent-color)]">
                  Next.js 15
                </span>
              </div>
            </div>

            {/* Terminal Diagnostic Stream */}
            <div className="pt-2 border-t border-white/10 text-[10px] text-white/50 space-y-1 font-mono">
              <div className="hover:text-[var(--accent-color)] transition-colors">&gt; ACTIVE_STACK: NEXT15_FLUTTER_RN</div>
              <div className="hover:text-[var(--accent-color)] transition-colors">&gt; BEYIMTECH: APP STORE RELEASE</div>
              <div className="hover:text-[var(--accent-color)] transition-colors">&gt; TRUSTME: 1.5M+ ACTIVE USERS</div>
              <div className="hover:text-[var(--accent-color)] transition-colors">&gt; SYSTEM_PERF: [HIGH] 60 FPS @ 1.0 DPR</div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: Contact / Time (Left) & Controls (Right) */}
      <div className="relative z-30 w-full pb-6 px-8 sm:px-12 flex items-center justify-between text-xs font-mono pointer-events-auto">
        {/* Bottom-Left: Email & Local Time */}
        <div className="flex items-center gap-8 text-[11px]">
          <div>
            <p className="text-[9px] text-white/40 uppercase">Wanna Say Hello?</p>
            <a
              href="mailto:yermek.dias2004@gmail.com"
              className="text-white hover:text-[var(--accent-color)] transition-colors font-bold"
            >
              yermek.dias2004@gmail.com
            </a>
          </div>

          <div className="hidden sm:block">
            <p className="text-[9px] text-white/40 uppercase">Local Time</p>
            <p className="text-white font-bold">
              Astana {astanaTime || '22:15 p.m.'}
            </p>
          </div>
        </div>

        {/* Bottom-Right: Audio wave + Home Tag */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#080C10] border border-white/10 text-[11px] font-bold text-white">
            <span className="text-[var(--accent-color)]">~^~</span>
            <span>[1] HOME</span>
          </div>
        </div>
      </div>
    </main>
  );
}
