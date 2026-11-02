'use client';

import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import { useAstanaClock } from '@/hooks/useAstanaClock';
import { useI18n, useLocalizedPath } from '@/i18n/I18nProvider';
import AvailabilityPill from './AvailabilityPill';
import BootScreen from './BootScreen';
import HomeMarquee from './HomeMarquee';
import QuantumMatrixBackground from './QuantumMatrixBackground';
import RightConstellationBackground from './RightConstellationBackground';
import TelemetryHUDPod from './TelemetryHUDPod';
import TrueLaserScanner from './TrueLaserScanner';
import { useBootSequence } from './useBootSequence';

export default function HomeContent() {
  const { playHover, playClick } = useThemeAudio();
  const { common: content } = useI18n();
  const { href } = useLocalizedPath();
  const astanaTime = useAstanaClock();
  const boot = useBootSequence(content.system.preloader);

  return (
    <main className="relative h-screen w-screen bg-[#020406] text-white font-mono select-none overflow-hidden flex flex-col justify-between">
      <AnimatePresence>
        {!boot.isBooted && <BootScreen progress={boot.progress} stepText={boot.stepText} onEnter={boot.enter} />}
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
                href={href('/')}
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

            {/* Top-Right availability pill on mobile & tablet portrait */}
            <AvailabilityPill className="md:max-xl:landscape:hidden xl:hidden flex px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs" />
          </div>

          {/* Bottom Row: Wanna Say Hello? (Left) & Local Time (Right next to it) - Desktop only */}
          <div className="pointer-events-auto hidden xl:flex items-end gap-6 sm:gap-8 lg:gap-12 font-mono text-xs select-none">
            {/* Email */}
            <div>
              <p className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider mb-0.5">{content.system.wannaSayHello}</p>
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
              <p className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider mb-0.5">{content.system.localTime}</p>
              <p className="text-xs sm:text-sm lg:text-base font-bold text-[var(--heading-tint)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-ping" />
                <span suppressHydrationWarning>{content.system.astanaCity} / {astanaTime || '12:00'} (UTC+5)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top-right availability pill for tablet landscape */}
      <AvailabilityPill className="hidden md:max-xl:landscape:flex xl:hidden fixed top-4 sm:top-5 right-4 sm:right-6 z-30 px-3 py-1.5 text-xs" />

      {/* RIGHT BACKGROUND: constellation particle network (tablet landscape & desktop) */}
      <div className="hidden md:max-xl:landscape:block xl:block absolute right-0 top-0 bottom-0 left-[52%] xl:left-1/2 z-0 pointer-events-auto overflow-hidden">
        <RightConstellationBackground />
      </div>

      {/* TOP-RIGHT: edge-to-edge rolling marquee (desktop XL only) */}
      <HomeMarquee items={content.system.marquee} />

      {/* MAIN VIEWPORT: right half content (desktop XL only) */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-20 grid grid-cols-1 xl:grid-cols-2 items-center my-auto pointer-events-none">
        <div className="hidden xl:block" />
        <div className="pointer-events-auto hidden xl:flex flex-col justify-center items-end text-left pr-4 sm:pr-8 xl:pr-12 2xl:pr-16">
          <TelemetryHUDPod />
        </div>
      </div>
    </main>
  );
}
