'use client';

import { useRef, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import { useDialogFocus } from '@/hooks/useDialogFocus';
import { useI18n } from '@/i18n/I18nProvider';
import type { PerfTier } from '@/lib/animationLoop';
import CyberMatrixRain from './CyberMatrixRain';

const PERF_TIERS: PerfTier[] = ['high', 'med', 'saver'];

// Clicks on the controls must not count as "click anywhere to enter".
const stopPropagation = (e: MouseEvent) => e.stopPropagation();

interface BootScreenProps {
  progress: number;
  stepText: string;
  onEnter: () => void;
}

/**
 * Once-per-session boot screen: sound on/off, performance tier and the "loaded" button.
 * Behaves as a modal dialog (focus starts on the container, Tab stays inside).
 * Must be rendered inside <AnimatePresence> for the exit animation.
 */
export default function BootScreen({ progress, stepText, onEnter }: BootScreenProps) {
  const { soundEnabled, setSoundEnabled, perfTier, setPerfTier, playHover } = useThemeAudio();
  const { common: content } = useI18n();
  const gateRef = useRef<HTMLDivElement>(null);
  const trapFocus = useDialogFocus(true, gateRef, { initialFocusRef: gateRef });

  return (
        <motion.div
          id="hud-preloader"
          ref={gateRef}
          role="dialog"
          aria-modal="true"
          aria-label="Dias Yermek portfolio — choose sound and performance, then enter"
          onKeyDown={trapFocus}
          tabIndex={-1}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => {
            if (progress === 100) onEnter();
          }}
          className={`fixed inset-0 z-50 outline-none bg-[#020504]/55 backdrop-blur-md font-mono select-none overflow-hidden ${progress === 100 ? 'cursor-pointer' : ''
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
                <div suppressHydrationWarning className="text-[10px] xs:text-[10px] sm:text-xs text-[var(--accent-color)] font-mono tracking-widest uppercase mt-1 truncate">
                  &gt; {stepText}
                </div>
              </div>
            </div>

            {/* CENTER: Strict Dead-Center Flush Symmetrical Audio Switch (Wall-to-Wall Fill, Flat Middle) */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto w-full max-w-[260px] xs:max-w-[300px] sm:max-w-[360px] px-2"
              onClick={stopPropagation}
            >
              <div className="w-full h-11 xs:h-12 sm:h-14 flex items-stretch rounded-2xl border-2 border-[var(--border-subtle)] bg-black/85 backdrop-blur-2xl shadow-2xl overflow-hidden p-0">
                {/* Button 1: AUDIO: ON (Left half, rounded on outer left only) */}
                <button
                  onClick={() => setSoundEnabled(true)}
                  onMouseEnter={playHover}
                  className={`w-1/2 h-full flex items-center justify-center font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 rounded-l-[14px] rounded-r-none ${soundEnabled
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
                  className={`w-1/2 h-full flex items-center justify-center font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 rounded-r-[14px] rounded-l-none ${!soundEnabled
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
                onClick={stopPropagation}
              >
                <div className="w-full flex items-center justify-between text-[10px] xs:text-[10px] text-[var(--text-muted)] font-mono tracking-wider uppercase">
                  <span>PERFORMANCE_TIER</span>
                  <span className="text-[var(--accent-color)] font-bold">[{perfTier.toUpperCase()}]</span>
                </div>

                <div className="w-full h-11 xs:h-12 sm:h-14 flex items-stretch rounded-xl border border-[var(--border-subtle)] bg-black/85 backdrop-blur-2xl shadow-2xl p-1 gap-1">
                  {PERF_TIERS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setPerfTier(t)}
                      onMouseEnter={playHover}
                      className={`flex-1 h-full rounded-lg font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center ${perfTier === t
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
                onClick={stopPropagation}
              >
                <div className="w-full flex items-center justify-between text-[10px] xs:text-[10px] text-[var(--text-muted)] font-mono tracking-wider uppercase">
                  <span>SYSTEM_CORE</span>
                  <span suppressHydrationWarning>{progress === 100 ? '[READY // ENTER]' : `${progress}%`}</span>
                </div>

                <button
                  onClick={onEnter}
                  disabled={progress < 100}
                  suppressHydrationWarning
                  onMouseEnter={playHover}
                  className={`relative w-full h-12 sm:h-14 rounded-xl font-display font-black text-sm sm:text-base tracking-widest uppercase transition-all duration-300 overflow-hidden border ${progress === 100
                      ? 'border-[var(--accent-color)] shadow-[0_0_35px_var(--card-hover-glow)] hover:shadow-[0_0_50px_var(--accent-glow)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                      : 'border-white/10 bg-black/70 cursor-not-allowed'
                    }`}
                >
                  {/* Filling progress bar */}
                  <div
                    className={`absolute inset-y-0 left-0 transition-all duration-150 ease-out ${progress === 100
                        ? 'bg-[var(--heading-tint)]'
                        : 'bg-[var(--heading-tint)]/35 border-r-2 border-[var(--accent-color)] shadow-[0_0_20px_var(--accent-glow)]'
                      }`}
                    style={{ width: `${progress}%` }}
                  />

                  {/* Button Label */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center gap-2" suppressHydrationWarning>
                    {progress === 100 ? (
                      <span className="text-[#020504] font-black tracking-widest">{content.system.preloader.loaded}</span>
                    ) : (
                      <span className="text-[var(--heading-tint)] font-bold tracking-widest text-xs sm:text-sm">
                        {content.system.preloader.loading} {progress}%
                      </span>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
  );
}
