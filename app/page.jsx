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

  // Real Asset & Engine Preloading Sequence
  useEffect(() => {
    if (isBooted) return;

    try {
      if (sessionStorage.getItem('daelijek_booted') === 'true') {
        setIsBooted(true);
        return;
      }
    } catch {}

    let isMounted = true;
    let targetProgress = 0;
    let renderedProgress = 0;

    // Smooth progress interpolation ticker for silky 60fps counter
    const progressTicker = setInterval(() => {
      if (!isMounted) return;
      if (renderedProgress < targetProgress) {
        renderedProgress += Math.max(1, Math.ceil((targetProgress - renderedProgress) * 0.18));
        if (renderedProgress > 100) renderedProgress = 100;
        setProgress(renderedProgress);
      }
    }, 20);

    const runPreload = async () => {
      // Step 1: Initialize Core & DOM
      setStepText('INITIALIZING_CORE_SYSTEMS');
      targetProgress = 25;
      await new Promise((r) => setTimeout(r, 140));

      // Step 2: Font Synchronization (document.fonts.ready)
      setStepText('SYNCHRONIZING_TYPOGRAPHY');
      if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
        try {
          await document.fonts.ready;
        } catch {}
      }
      targetProgress = 50;
      await new Promise((r) => setTimeout(r, 140));

      // Step 3: Critical Asset & Texture Preload in Parallel
      setStepText('CACHING_TEXTURES_AND_ASSETS');
      const criticalImages = [
        '/assets/linkedIn_Dias_square.png',
        '/assets/Finance.png',
        '/assets/beyim.png',
        '/assets/openGov.png',
        '/assets/berikWeb.png',
        '/images/logo.png',
      ];

      let loadedCount = 0;
      const loadPromises = criticalImages.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loadedCount++;
            if (isMounted) {
              targetProgress = Math.min(85, 50 + Math.floor((loadedCount / criticalImages.length) * 35));
            }
            resolve();
          };
          img.onerror = () => {
            loadedCount++;
            resolve();
          };
        });
      });

      // Max timeout safeguard 2.0s for slow networks
      await Promise.race([
        Promise.all(loadPromises),
        new Promise((r) => setTimeout(r, 2000)),
      ]);

      // Step 4: WebGL & HUD Calibration
      if (isMounted) {
        setStepText('CALIBRATING_WEBGL_SHADERS');
        targetProgress = 95;
        await new Promise((r) => setTimeout(r, 160));
      }

      // Step 5: Ready
      if (isMounted) {
        targetProgress = 100;
        const checkReady = setInterval(() => {
          if (renderedProgress >= 100) {
            clearInterval(checkReady);
            if (isMounted) {
              setStepText('SYSTEM_READY // ALL_CHANNELS_ONLINE');
            }
          }
        }, 25);
      }
    };

    runPreload();

    return () => {
      isMounted = false;
      clearInterval(progressTicker);
    };
  }, [isBooted]);

  const handleEnter = () => {
    soundFx.playBootChime();
    setIsBooted(true);
    try {
      sessionStorage.setItem('daelijek_booted', 'true');
    } catch {}
  };

  const triggerBoot = () => {
    try {
      sessionStorage.removeItem('daelijek_booted');
    } catch {}
    setProgress(0);
    setIsBooted(false);
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
            <div className="absolute inset-0 p-4 xs:p-6 sm:p-10 lg:p-12 flex flex-col justify-between pointer-events-none z-10">
              {/* TOP BAR: Screen Top-Left Brand + Screen Top-Right Giant Counter */}
              <div className="flex items-start justify-between">
                {/* Strict Top-Left Brand Stamp */}
                <div className="flex items-center gap-2.5 sm:gap-3.5">
                  <div className="text-right">
                    <span className="block text-xs xs:text-sm sm:text-base font-extrabold text-[var(--heading-tint)] leading-tight">
                      Dias
                    </span>
                    <span className="block text-xs xs:text-sm sm:text-base font-extrabold text-[var(--heading-tint)] leading-tight">
                      Yermek
                    </span>
                  </div>
                  <div className="w-[1.5px] h-6 sm:h-8 bg-[var(--border-subtle)]" />
                  <div className="text-left text-[11px] xs:text-xs sm:text-sm text-[var(--text-secondary)] leading-tight">
                    <span className="block">Portfolio</span>
                    <span className="block font-bold text-[var(--heading-tint)]">2026</span>
                  </div>
                </div>

                {/* Strict Top-Right Giant 100% Progress Display */}
                <div className="text-right w-[140px] xs:w-[170px] sm:w-[260px] md:w-[280px]">
                  <div suppressHydrationWarning className="text-5xl xs:text-6xl sm:text-8xl md:text-9xl font-condensed font-black tracking-tight text-[var(--heading-tint)] leading-none select-none drop-shadow-[0_0_40px_var(--accent-glow)]">
                    {progress}%
                  </div>
                  <div suppressHydrationWarning className="text-[9px] xs:text-[10px] sm:text-xs text-[var(--accent-color)] font-mono tracking-widest uppercase mt-1 truncate">
                    &gt; {stepText}
                  </div>
                </div>
              </div>

              {/* CENTER: Strict Dead-Center Flush Symmetrical Audio Switch (Wall-to-Wall Fill, Flat Middle) */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto w-full max-w-[260px] xs:max-w-[300px] sm:max-w-[360px] px-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-full h-11 xs:h-12 sm:h-14 flex items-stretch rounded-2xl border-2 border-[var(--border-subtle)] bg-black/85 backdrop-blur-2xl shadow-2xl overflow-hidden p-0">
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
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                {/* Strict Bottom-Left: Performance Tier Selector (Mirrored Dimensions & Height with Right Block) */}
                <div
                  className="flex flex-col items-start gap-1 xs:gap-1.5 pointer-events-auto w-full sm:w-[240px] md:w-[280px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-full flex items-center justify-between text-[9px] xs:text-[10px] text-[var(--text-muted)] font-mono tracking-wider uppercase">
                    <span>PERFORMANCE_TIER</span>
                    <span className="text-[var(--accent-color)] font-bold">[{perfTier.toUpperCase()}]</span>
                  </div>

                  <div className="w-full h-11 xs:h-12 sm:h-14 flex items-stretch rounded-xl border border-[var(--border-subtle)] bg-black/85 backdrop-blur-2xl shadow-2xl p-1 gap-1">
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
                  className="flex flex-col items-stretch sm:items-end gap-1 xs:gap-1.5 pointer-events-auto w-full sm:w-[240px] md:w-[280px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-full flex items-center justify-between text-[9px] xs:text-[10px] text-[var(--text-muted)] font-mono tracking-wider uppercase">
                    <span>SYSTEM_CORE</span>
                    <span suppressHydrationWarning>{progress === 100 ? '[READY // ENTER]' : `${progress}%`}</span>
                  </div>

                  <button
                    onClick={handleEnter}
                    disabled={progress < 100}
                    suppressHydrationWarning
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
                    <div className="relative z-10 w-full h-full flex items-center justify-center gap-2" suppressHydrationWarning>
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
      <div className="absolute left-2 xs:left-3 sm:left-4 lg:left-5 top-2 xs:top-3 sm:top-4 lg:top-5 bottom-2 xs:bottom-3 sm:bottom-4 lg:bottom-5 right-2 xs:right-3 sm:right-4 lg:right-5 md:max-xl:landscape:right-[48%] md:max-xl:landscape:mr-2 xl:right-1/2 xl:mr-3 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 z-0 pointer-events-auto">
        {/* Subtle Vertical Split Divider Line (Desktop XL only) */}
        <div className="hidden xl:block absolute inset-y-0 left-1/2 w-[1px] bg-white/[0.06] pointer-events-none z-10" />

        {/* Quantum 3D Matrix Lattice with Gravitational Warp */}
        <QuantumMatrixBackground />

        {/* Synchronized Real Laser Scanner with CREATIVE DEVELOPER */}
        <TrueLaserScanner />

        {/* Content Layout Overlay: Top Brand & Bottom Telemetry */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 xs:p-6 sm:p-8 lg:p-11 pointer-events-none">
          {/* Top Header Row: Screen Top-Left Brand + Mobile/Tablet Top-Right Status Badge */}
          <div className="w-full flex items-start justify-between">
            {/* Top-Left Brand Stamp */}
            <div className="pointer-events-auto font-mono select-none">
              <Link
                href="/"
                onClick={playClick}
                onMouseEnter={playHover}
                className="group inline-flex items-center gap-2.5 xs:gap-3.5 text-left"
              >
                <div className="text-right">
                  <span className="block text-xs xs:text-sm sm:text-base font-extrabold text-[var(--heading-tint)] group-hover:text-[var(--accent-color)] transition-colors leading-tight">
                    Dias
                  </span>
                  <span className="block text-xs xs:text-sm sm:text-base font-extrabold text-[var(--heading-tint)] group-hover:text-[var(--accent-color)] transition-colors leading-tight">
                    Yermek
                  </span>
                </div>
                <div className="w-[1.5px] h-6 xs:h-7 sm:h-8 bg-[var(--border-subtle)] group-hover:bg-[var(--accent-color)] transition-colors" />
                <div className="text-left text-[11px] xs:text-xs sm:text-sm text-[var(--text-secondary)] leading-tight">
                  <span className="block">Portfolio</span>
                  <span className="block font-bold text-[var(--heading-tint)]">2026</span>
                </div>
              </Link>
            </div>

            {/* Top-Right Availability Status Pill on Mobile & Tablet Portrait */}
            <div className="md:max-xl:landscape:hidden xl:hidden pointer-events-auto flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[10px] sm:text-xs font-mono shadow-lg">
              <span className="text-white/40 tracking-wider text-[9px] sm:text-[10px] uppercase">AVAILABILITY</span>
              <span className="w-[1px] h-3 bg-white/20" />
              <span className="text-[var(--accent-color)] font-bold tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-ping" />
                OPEN
              </span>
            </div>
          </div>

          {/* Bottom Row: Wanna Say Hello? (Left) & Local Time (Right next to it) */}
          <div className="pointer-events-auto hidden md:max-xl:landscape:flex xl:flex items-end gap-6 sm:gap-8 lg:gap-12 font-mono text-xs select-none">
            {/* Email */}
            <div>
              <p className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Wanna Say Hello?</p>
              <a
                href="mailto:dias1605ermek@gmail.com"
                onClick={playClick}
                onMouseEnter={playHover}
                className="text-xs sm:text-sm lg:text-base font-bold text-[var(--heading-tint)] hover:text-[var(--accent-color)] transition-colors block truncate max-w-[190px] sm:max-w-none"
              >
                dias1605ermek@gmail.com
              </a>
            </div>

            {/* Local Time */}
            <div className="hidden sm:block">
              <p className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Local Time</p>
              <p className="text-xs sm:text-sm lg:text-base font-bold text-[var(--heading-tint)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-ping" />
                <span suppressHydrationWarning>Astana / {astanaTime || '12:00:00'} (UTC+5)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TOP-RIGHT Availability Status Pill for Tablet Landscape */}
      <div className="hidden md:max-xl:landscape:flex xl:hidden fixed top-4 sm:top-5 right-4 sm:right-6 z-30 pointer-events-auto items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-xs font-mono shadow-lg">
        <span className="text-white/40 tracking-wider text-[10px] uppercase">AVAILABILITY</span>
        <span className="w-[1px] h-3 bg-white/20" />
        <span className="text-[var(--accent-color)] font-bold tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-ping" />
          OPEN
        </span>
      </div>

      {/* RIGHT BACKGROUND: Seamless borderless constellation particle network (Tablet landscape & Desktop) */}
      <div className="hidden md:max-xl:landscape:block xl:block absolute right-0 top-0 bottom-0 left-[52%] xl:left-1/2 z-0 pointer-events-auto overflow-hidden">
        {/* Constellation Particle Network (Floating interactive nodes & dynamic links) */}
        <RightConstellationBackground />
      </div>

      {/* TOP-RIGHT: Edge-to-Edge Rolling Marquee (Desktop XL only) */}
      <div
        className="hidden xl:block fixed left-1/2 right-3 sm:right-4 lg:right-6 top-5 z-30 overflow-hidden pointer-events-none select-none"
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

      {/* 3D INTERACTIVE DEVICE (Responsive positioning across mobile, tablet portrait, tablet landscape, and desktop) */}
      <div className="absolute pointer-events-auto flex items-center justify-center origin-center transition-all duration-300 z-10
        left-1/2 top-[38%] xs:top-[40%] -translate-x-1/2 -translate-y-1/2 scale-[0.80] xs:scale-[0.85] sm:scale-[0.90]
        md:portrait:left-1/2 md:portrait:top-[31%] md:portrait:-translate-x-1/2 md:portrait:-translate-y-1/2 md:portrait:scale-[0.78]
        md:max-xl:landscape:left-[75%] md:max-xl:landscape:top-1/2 md:max-xl:landscape:-translate-x-1/2 md:max-xl:landscape:-translate-y-1/2 md:max-xl:landscape:scale-[0.82] lg:max-xl:landscape:scale-[0.88]
        xl:left-1/2 xl:top-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2 xl:scale-[0.88] 2xl:scale-100"
      >
        <Device3DViewport />
      </div>

      {/* MAIN VIEWPORT: Right Half Content (Desktop XL only) */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-20 grid grid-cols-1 xl:grid-cols-2 items-center my-auto pointer-events-none">
        {/* Empty Left Placeholder */}
        <div className="hidden xl:block" />

        {/* RIGHT HALF CONTENT: Minimalist Cyber Telemetry HUD Pod (Desktop XL only) */}
        <div className="pointer-events-auto hidden xl:flex flex-col justify-center items-end text-left pr-4 sm:pr-8 xl:pr-12 2xl:pr-16">
          <TelemetryHUDPod />
        </div>
      </div>
    </main>
  );
}
