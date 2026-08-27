'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeAudio } from '../src/context/ThemeAudioContext';
import { soundFx } from '../src/audio/soundEffects';
import Device3DViewport from '../src/components/home/Device3DViewport';
import TelemetryHUDPod from '../src/components/home/TelemetryHUDPod';
import QuantumMatrixBackground from '../src/components/home/QuantumMatrixBackground';
import RightConstellationBackground from '../src/components/home/RightConstellationBackground';
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

// Full-height Cyber Terminal Matrix Rain Canvas
function CyberMatrixRain() {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const tokens = [
      '0', '1', '0x7F', '0xA4', '0xFF', '0x00', '0x9C', '0x1A', '0x3E', '0x88',
      'KERNEL', 'QUANTUM', 'ASTANA', 'DIAS', 'YERMEK', 'SHADER', 'NODE',
      'VRAM', 'GL2', 'PIPE', 'BUFFER', 'SYNC', 'WEBGL2', 'LATENCY',
      '14MS', '60FPS', '51.16N', '71.44E', '2026', 'OK', 'READY', '101', '010',
      '01100', '10011', '0xFE', '0x2B', 'PORTFOLIO', 'SYS_INIT', 'HEX_STREAM'
    ];

    const columnWidth = 26;
    const columns = Math.floor(width / columnWidth);
    const drops = [];
    const speeds = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -60;
      speeds[i] = 1 + Math.random() * 2.2;
    }

    const draw = () => {
      // Clear canvas completely to keep 100% transparency
      ctx.clearRect(0, 0, width, height);

      ctx.font = '10px "JetBrains Mono", ui-monospace, SFMono-Regular, monospace';

      for (let i = 0; i < drops.length; i++) {
        const x = i * columnWidth + 6;
        const headY = drops[i] * 16;

        // Render head + trailing 5 fading characters
        for (let t = 0; t < 6; t++) {
          const charY = headY - t * 16;
          if (charY > -20 && charY < height + 20) {
            const text = tokens[(Math.floor(drops[i] * 7 + t + i * 13)) % tokens.length];

            if (t === 0) {
              // Leading character (Clean bright white)
              ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
              ctx.fillText(text, x, charY);
            } else if (t === 1) {
              ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
              ctx.fillText(text, x, charY);
            } else {
              // Trailing fading green
              const alpha = Math.max(0.04, 0.28 - t * 0.05);
              ctx.fillStyle = `rgba(0, 255, 159, ${alpha})`;
              ctx.fillText(text, x, charY);
            }
          }
        }

        if (headY > height + 80 && Math.random() > 0.96) {
          drops[i] = 0;
          speeds[i] = 1 + Math.random() * 2;
        }

        drops[i] += speeds[i] * 0.35;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 select-none"
    />
  );
}

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
      {/* Fullscreen Cyber HUD Preloader Overlay (Screen-Anchored HUD + Split Glass Mosaic) */}
      <AnimatePresence>
        {!isBooted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => {
              if (progress === 100) handleEnter();
            }}
            className={`fixed inset-0 z-50 bg-[#020504]/55 backdrop-blur-md font-mono select-none overflow-hidden ${
              progress === 100 ? 'cursor-pointer' : ''
            }`}
          >
            {/* ================= BACKGROUND LAYER: SPLIT GLASS BACKDROP ================= */}
            <div className="absolute inset-0 flex pointer-events-none">
              {/* --- LEFT HALF: ASYMMETRIC GLASS MOSAIC (DIFFERENT WIDTHS & DIFFERENT HEIGHTS) --- */}
              <div className="hidden lg:flex w-1/2 h-full">
                {/* Column A (44% Width, 3 Staggered Panes: 42% / 26% / 32%) */}
                <div className="w-[44%] h-full flex flex-col border-r border-white/[0.09]">
                  <div className="h-[42%] border-b border-white/[0.09] p-5 relative">
                    <span className="text-[10px] text-white/25 font-mono tracking-widest">[0x01]</span>
                  </div>
                  <div className="h-[26%] border-b border-white/[0.09] p-5 relative">
                    <span className="text-[10px] text-white/25 font-mono tracking-widest">[0x02]</span>
                  </div>
                  <div className="h-[32%] p-5 relative">
                    <span className="text-[10px] text-white/25 font-mono tracking-widest">[0x03]</span>
                  </div>
                </div>

                {/* Column B (56% Width, 3 Staggered Panes: 28% / 44% / 28%) */}
                <div className="w-[56%] h-full flex flex-col">
                  <div className="h-[28%] border-b border-white/[0.09] p-5 relative">
                    <span className="text-[10px] text-white/25 font-mono tracking-widest">[0x04]</span>
                  </div>
                  <div className="h-[44%] border-b border-white/[0.09] p-5 relative">
                    <span className="text-[10px] text-white/25 font-mono tracking-widest">[0x05]</span>
                  </div>
                  <div className="h-[28%] p-5 relative">
                    <span className="text-[10px] text-white/25 font-mono tracking-widest">[0x06]</span>
                  </div>
                </div>
              </div>

              {/* --- RIGHT HALF: MONOLITHIC LIQUID GLASS PANE WITH FULL-HEIGHT MATRIX TERMINAL RAIN --- */}
              <div className="w-full lg:w-1/2 h-full border-l border-white/[0.09] relative overflow-hidden flex items-center justify-center">
                {/* Full-Height 60fps Transparent Terminal Matrix Rain Canvas */}
                <CyberMatrixRain />
              </div>
            </div>

            {/* ================= FOREGROUND HUD CONTROLS: SCREEN-ANCHORED ================= */}
            <div className="absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-between pointer-events-none z-10">
              {/* TOP BAR: Screen Top-Left Brand + Screen Top-Right Giant Counter */}
              <div className="flex items-start justify-between">
                {/* Strict Top-Left Brand Stamp */}
                <div className="flex items-center gap-3.5">
                  <div className="text-right">
                    <span className="block text-sm sm:text-base font-extrabold text-[var(--heading-tint)] leading-tight">
                      Dias
                    </span>
                    <span className="block text-sm sm:text-base font-extrabold text-[var(--heading-tint)] leading-tight">
                      Yermek
                    </span>
                  </div>
                  <div className="w-[1.5px] h-7 sm:h-8 bg-[var(--border-subtle)]" />
                  <div className="text-left text-xs sm:text-sm text-[var(--text-secondary)] leading-tight">
                    <span className="block">Portfolio</span>
                    <span className="block font-bold text-[var(--heading-tint)]">2026</span>
                  </div>
                </div>

                {/* Strict Top-Right Giant 100% Progress Display */}
                <div className="text-right w-[200px] sm:w-[260px] md:w-[280px]">
                  <div className="text-7xl sm:text-8xl md:text-9xl font-condensed font-black tracking-tight text-[var(--heading-tint)] leading-none select-none drop-shadow-[0_0_40px_var(--accent-glow)]">
                    {progress}%
                  </div>
                  <div className="text-[10px] sm:text-xs text-[var(--accent-color)] font-mono tracking-widest uppercase mt-1">
                    &gt; {stepText}
                  </div>
                </div>
              </div>

              {/* CENTER: Strict Dead-Center Flush Symmetrical Audio Switch (Wall-to-Wall Fill, Flat Middle) */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-[280px] xs:w-[320px] sm:w-[360px] h-12 sm:h-14 flex items-stretch rounded-2xl border-2 border-[var(--border-subtle)] bg-black/85 backdrop-blur-2xl shadow-2xl overflow-hidden p-0">
                  {/* Button 1: AUDIO: ON (Left half, rounded on outer left only) */}
                  <button
                    onClick={() => setSoundEnabled(true)}
                    onMouseEnter={playHover}
                    className={`w-1/2 h-full flex items-center justify-center font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 rounded-l-[14px] rounded-r-none ${
                      soundEnabled
                        ? 'bg-[var(--heading-tint)] text-[#020504] shadow-[0_0_25px_var(--accent-glow)]'
                        : 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--heading-tint)] hover:bg-white/5'
                    }`}
                  >
                    AUDIO: ON
                  </button>

                  {/* Button 2: SILENT MODE (Right half, rounded on outer right only) */}
                  <button
                    onClick={() => setSoundEnabled(false)}
                    onMouseEnter={playHover}
                    className={`w-1/2 h-full flex items-center justify-center font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 rounded-r-[14px] rounded-l-none ${
                      !soundEnabled
                        ? 'bg-[var(--heading-tint)] text-[#020504] shadow-[0_0_25px_var(--accent-glow)]'
                        : 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--heading-tint)] hover:bg-white/5'
                    }`}
                  >
                    SILENT MODE
                  </button>
                </div>
              </div>

              {/* BOTTOM BAR: Screen Bottom-Left Perf Tier + Screen Bottom-Right LOADED Button */}
              <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4">
                {/* Strict Bottom-Left: Performance Tier Selector (Mirrored Dimensions & Height with Right Block) */}
                <div
                  className="flex flex-col items-start gap-1.5 pointer-events-auto w-[200px] sm:w-[260px] md:w-[280px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-full flex items-center justify-between text-[10px] text-[var(--text-muted)] font-mono tracking-wider uppercase">
                    <span>PERFORMANCE_TIER</span>
                    <span className="text-[var(--accent-color)] font-bold">[{perfTier.toUpperCase()}]</span>
                  </div>

                  <div className="w-full h-12 sm:h-14 flex items-stretch rounded-xl border border-[var(--border-subtle)] bg-black/85 backdrop-blur-2xl shadow-2xl p-1 gap-1">
                    {['high', 'med', 'saver'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setPerfTier(t)}
                        onMouseEnter={playHover}
                        className={`flex-1 h-full rounded-lg font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center ${
                          perfTier === t
                            ? 'bg-[var(--heading-tint)] text-[#020504] shadow-[0_0_15px_var(--accent-glow)] font-black'
                            : 'text-[var(--text-secondary)] hover:text-[var(--heading-tint)] hover:bg-white/5'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Strict Bottom-Right: Filling LOADED Button */}
                <div
                  className="flex flex-col items-end gap-1.5 pointer-events-auto w-[200px] sm:w-[260px] md:w-[280px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-full flex items-center justify-between text-[10px] text-[var(--text-muted)] font-mono tracking-wider uppercase">
                    <span>SYSTEM_CORE</span>
                    <span>{progress === 100 ? '[READY // ENTER]' : `${progress}%`}</span>
                  </div>

                  <button
                    onClick={handleEnter}
                    disabled={progress < 100}
                    onMouseEnter={playHover}
                    className={`relative w-full h-12 sm:h-14 rounded-xl font-display font-black text-sm sm:text-base tracking-widest uppercase transition-all duration-300 overflow-hidden border ${
                      progress === 100
                        ? 'border-[var(--accent-color)] shadow-[0_0_35px_var(--card-hover-glow)] hover:shadow-[0_0_50px_var(--accent-glow)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                        : 'border-white/10 bg-black/70 cursor-not-allowed'
                    }`}
                  >
                    {/* Filling progress bar */}
                    <div
                      className={`absolute inset-y-0 left-0 transition-all duration-150 ease-out ${
                        progress === 100
                          ? 'bg-[var(--heading-tint)]'
                          : 'bg-[var(--heading-tint)]/35 border-r-2 border-[var(--accent-color)] shadow-[0_0_20px_var(--accent-glow)]'
                      }`}
                      style={{ width: `${progress}%` }}
                    />

                    {/* Button Label */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center gap-2">
                      {progress === 100 ? (
                        <span className="text-[#020504] font-black tracking-widest">LOADED</span>
                      ) : (
                        <span className="text-[var(--heading-tint)] font-bold tracking-widest text-xs sm:text-sm">
                          LOADING {progress}%
                        </span>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT SCANNER OVERLAY BLOCK (Uniformly rounded on all 4 corners) */}
      <div className="absolute left-3 sm:left-4 lg:left-5 top-3 sm:top-4 lg:top-5 bottom-3 sm:bottom-4 lg:bottom-5 right-1/2 mr-1.5 sm:mr-2.5 lg:mr-3 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 z-0 pointer-events-auto">
        {/* Quantum 3D Matrix Lattice with Gravitational Warp */}
        <QuantumMatrixBackground />

        {/* Synchronized Real Laser Scanner with CREATIVE DEVELOPER */}
        <TrueLaserScanner />

        {/* Content Layout Overlay: Top Brand & Bottom Telemetry */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-7 sm:p-9 lg:p-11 pointer-events-none">
          {/* Top-Left Brand Stamp */}
          <div className="pointer-events-auto font-mono select-none">
            <Link
              href="/"
              onClick={playClick}
              onMouseEnter={playHover}
              className="group inline-flex items-center gap-3.5 text-left"
            >
              <div className="text-right">
                <span className="block text-sm sm:text-base font-extrabold text-[var(--heading-tint)] group-hover:text-[var(--accent-color)] transition-colors leading-tight">
                  Dias
                </span>
                <span className="block text-sm sm:text-base font-extrabold text-[var(--heading-tint)] group-hover:text-[var(--accent-color)] transition-colors leading-tight">
                  Yermek
                </span>
              </div>
              <div className="w-[1.5px] h-7 sm:h-8 bg-[var(--border-subtle)] group-hover:bg-[var(--accent-color)] transition-colors" />
              <div className="text-left text-xs sm:text-sm text-[var(--text-secondary)] leading-tight">
                <span className="block">Portfolio</span>
                <span className="block font-bold text-[var(--heading-tint)]">2026</span>
              </div>
            </Link>
          </div>

          {/* Bottom Row: Wanna Say Hello? (Left) & Local Time (Right next to it) */}
          <div className="pointer-events-auto flex items-end gap-8 sm:gap-12 font-mono text-xs select-none">
            {/* Email */}
            <div>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Wanna Say Hello?</p>
              <a
                href="mailto:dias1605ermek@gmail.com"
                onClick={playClick}
                onMouseEnter={playHover}
                className="text-sm sm:text-base font-bold text-[var(--heading-tint)] hover:text-[var(--accent-color)] transition-colors block"
              >
                dias1605ermek@gmail.com
              </a>
            </div>

            {/* Local Time */}
            <div className="hidden sm:block">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Local Time</p>
              <p className="text-sm sm:text-base font-bold text-[var(--heading-tint)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-ping" />
                <span>Astana / {astanaTime || '12:00:00'} (UTC+5)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT BACKGROUND BLOCK: Symmetric rounded frame with floating constellation particle network */}
      <div className="hidden md:block absolute right-3 sm:right-4 lg:right-5 top-3 sm:top-4 lg:top-5 bottom-3 sm:bottom-4 lg:bottom-5 left-1/2 ml-1.5 sm:ml-2.5 lg:ml-3 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 z-0 pointer-events-auto bg-[#020504]/35 backdrop-blur-sm">
        {/* Constellation Particle Network (Floating interactive nodes & dynamic links) */}
        <RightConstellationBackground />
      </div>

      {/* TOP-RIGHT: Edge-to-Edge Rolling Marquee (From 50% split all the way to right edge) */}
      <div
        className="hidden md:block fixed left-1/2 right-3 sm:right-4 lg:right-6 top-5 z-30 overflow-hidden pointer-events-none select-none"
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

      {/* CENTER 3D INTERACTIVE DEVICE (Dead center of the entire screen, crossing the 50% split) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto flex items-center justify-center">
        <Device3DViewport />
      </div>

      {/* MAIN VIEWPORT: Right Half Content (Pure Clean Telemetry Typography - No Clunky Boxes) */}
      <div className="relative z-10 w-full px-8 sm:px-14 lg:px-20 grid grid-cols-1 md:grid-cols-2 items-center my-auto pointer-events-none">
        {/* Empty Left Placeholder */}
        <div className="hidden md:block" />

        {/* RIGHT HALF CONTENT: Minimalist Cyber Telemetry HUD Pod (No background box) */}
        <div className="pointer-events-auto hidden md:flex flex-col justify-center items-end text-left pr-4 sm:pr-8">
          <TelemetryHUDPod />
        </div>
      </div>
    </main>
  );
}
