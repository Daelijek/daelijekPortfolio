'use client';

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { startAnimationLoop } from '@/lib/animationLoop';
import type { DetailUi, GalleryItem } from './types';

interface GalleryRibbonProps {
  items: GalleryItem[];
  t: DetailUi;
  playClick?: () => void;
  playHover?: () => void;
  onOpenModal?: (item: GalleryItem) => void;
  isModalOpen: boolean;
  isMobileGallery?: boolean;
}

/**
 * Infinite Interactive Gallery Ribbon
 * - Infinite seamless auto-scrolling with GPU translate3d compositing
 * - Physically smoothed deceleration on hover and smooth acceleration on resume
 * - Nudge arrows with smooth velocity interpolation
 * - No horizontal scrollbar / line (overflow: hidden)
 * - Complete drag & selection prevention across images, cards, and text
 * - Click-to-preview lightbox modal
 */
export default function GalleryRibbon({
  items,
  t,
  playClick,
  playHover,
  onOpenModal,
  isModalOpen,
  isMobileGallery = true,
}: GalleryRibbonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  // Sync the rAF-readable flag after commit (writing refs during render breaks React purity rules)
  useEffect(() => {
    isHoveredRef.current = isHovered || isModalOpen;
  }, [isHovered, isModalOpen]);

  const tapeRef = useRef<HTMLDivElement>(null);
  const set1Ref = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const currentSpeedRef = useRef(0.65); // base slow speed in px/frame (~39px/s)
  const nudgeDeltaRef = useRef(0);
  const setWidthRef = useRef(0);
  const reducedMotion = useReducedMotion();

  // Ensure base set has at least 6 items for ultra-smooth seamless looping on wide displays
  const normalizedItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    let list = items;
    while (list.length < 6) {
      list = [...list, ...items];
    }
    return list;
  }, [items]);

  useEffect(() => {
    // Reduced motion: no auto-scroll; the arrows still move the ribbon.
    const baseSpeed = reducedMotion ? 0 : 0.65;
    if (reducedMotion) currentSpeedRef.current = 0;

    const measureWidth = () => {
      if (set1Ref.current && tapeRef.current) {
        const rect = set1Ref.current.getBoundingClientRect();
        const style = window.getComputedStyle(tapeRef.current);
        const gap = parseFloat(style.columnGap || style.gap || '24') || 24;
        if (rect.width > 0) {
          setWidthRef.current = rect.width + gap;
        }
      }
    };

    measureWidth();
    const timer = setTimeout(measureWidth, 150);
    const ro = new ResizeObserver(() => measureWidth());
    if (set1Ref.current) ro.observe(set1Ref.current);

    // dt: elapsed time in 60 fps frames (provided by the shared loop driver)
    const animate = (frameDt: number) => {
      const dt = Math.min(frameDt, 3);

      // When hovered or modal is open: target speed is 0; otherwise baseSpeed
      const targetSpeed = isHoveredRef.current ? 0 : baseSpeed;

      // Smooth momentum lerp:
      // Hover stop: 0.07 gives a silky-smooth ~400ms deceleration curve
      // Resume: 0.045 gives a gentle smooth acceleration
      const lerpFactor = isHoveredRef.current ? 0.07 : 0.045;
      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * (lerpFactor * dt);

      if (isHoveredRef.current && Math.abs(currentSpeedRef.current) < 0.005) {
        currentSpeedRef.current = 0;
      }

      // Handle manual arrow nudge with smooth easing
      if (Math.abs(nudgeDeltaRef.current) > 0.2) {
        const nudgeStep = nudgeDeltaRef.current * (0.08 * dt);
        offsetRef.current += nudgeStep;
        nudgeDeltaRef.current -= nudgeStep;
      }

      // Increment continuous position
      offsetRef.current += currentSpeedRef.current * dt;

      // Seamless infinite modulo loop
      const setW = setWidthRef.current;
      if (setW > 0) {
        if (offsetRef.current >= setW) {
          offsetRef.current = offsetRef.current % setW;
        } else if (offsetRef.current < 0) {
          offsetRef.current = (offsetRef.current % setW) + setW;
        }
      }

      if (tapeRef.current) {
        tapeRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }
    };

    // Paused while the ribbon is off-screen or the tab is hidden.
    const stopLoop = startAnimationLoop(animate, { element: tapeRef.current?.parentElement });

    return () => {
      clearTimeout(timer);
      stopLoop();
      ro.disconnect();
    };
  }, [reducedMotion]);

  const handleNudge = (direction: 'left' | 'right') => {
    playClick?.();
    const amount = direction === 'left' ? (isMobileGallery ? -320 : -480) : (isMobileGallery ? 320 : 480);
    nudgeDeltaRef.current += amount;
  };

  const renderCard = (item: GalleryItem, keyIndex: string) => {
    const isFullPage = Boolean(item.image?.includes('all-landing-page'));
    // Only the first set is reachable by keyboard; sets 2-3 are aria-hidden visual clones
    // that make the ribbon loop seamlessly.
    const isClone = !String(keyIndex).startsWith('set1');
    const openPreview = () => {
      playClick?.();
      onOpenModal?.(item);
    };
    const cardA11yProps = {
      role: 'button',
      tabIndex: isClone ? -1 : 0,
      // No aria-label: the visible caption (tag, title, "Preview") is the accessible name.
      onKeyDown: (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPreview();
        }
      },
    };

    if (isMobileGallery) {
      return (
        <div
          key={keyIndex}
          onClick={openPreview}
          {...cardA11yProps}
          onMouseEnter={playHover}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitUserDrag: 'none' }}
          className="w-[230px] sm:w-[260px] md:w-[280px] shrink-0 group/card cursor-pointer select-none"
        >
          {/* Device Mockup Shell */}
          <div className="relative rounded-[2.2rem] p-2.5 bg-[#090D14] border border-white/10 group-hover/card:border-[var(--accent-color)]/60 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.7)] group-hover/card:shadow-[0_20px_50px_var(--card-hover-glow)] group-hover/card:-translate-y-2 select-none">
            {/* Top Dynamic Island / Bezel */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black/80 rounded-full z-20 pointer-events-none border border-white/5 select-none" />

            {/* Screen Image Frame */}
            <div className="relative aspect-[9/19.5] w-full rounded-[1.7rem] overflow-hidden bg-black select-none">
              <Image
                src={item.image}
                alt={item.title}
                fill
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                className="object-cover object-top group-hover/card:scale-105 transition-transform duration-500 pointer-events-none select-none"
                sizes="(max-width: 640px) 230px, 280px"
                style={{ userSelect: 'none', WebkitUserDrag: 'none' }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover/card:opacity-100 pointer-events-none select-none">
                <span className="px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-medium flex items-center gap-1.5 shadow-lg select-none">
                  <Maximize2 className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                  <span>{t.preview}</span>
                </span>
              </div>
            </div>

            {/* Card Caption Info */}
            <div className="p-3 pt-3.5 space-y-1 select-none">
              <span className="text-[10px] font-mono font-bold text-[var(--accent-color)] tracking-wider block uppercase select-none">
                {item.tag || `SCREEN`}
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-white font-display group-hover/card:text-[var(--accent-color)] transition-colors truncate select-none">
                {item.title}
              </h3>
              <p className="text-[11px] text-white/50 font-sans line-clamp-1 select-none">
                {item.subtitle}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Web / Desktop Platform Mockup Frame (Handles varying section sizes cleanly)
    return (
      <div
        key={keyIndex}
        onClick={openPreview}
        {...cardA11yProps}
        onMouseEnter={playHover}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitUserDrag: 'none' }}
        className="w-[340px] sm:w-[420px] md:w-[480px] shrink-0 group/card cursor-pointer select-none"
      >
        <div className="relative rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 bg-[#070B12]/95 border border-white/10 group-hover/card:border-[var(--accent-color)]/50 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.7)] group-hover/card:shadow-[0_20px_50px_var(--card-hover-glow)] group-hover/card:-translate-y-2 select-none flex flex-col justify-between">
          {/* Minimal Browser Header Bar */}
          <div className="flex items-center justify-between pb-2.5 px-1 border-b border-white/[0.06] mb-2.5 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[10px] font-mono text-white/55 tracking-wider truncate max-w-[180px]">
              app // {item.tag?.toLowerCase()}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-[var(--accent-color)] border border-white/5 font-semibold">
              WEB HUD
            </span>
          </div>

          {/* Screen Image Frame: perfectly framed for web sections */}
          <div className="relative h-[200px] sm:h-[235px] md:h-[255px] w-full rounded-xl overflow-hidden bg-[#03060B] border border-white/[0.06] select-none flex items-center justify-center">
            <Image
              src={item.image}
              alt={item.title}
              fill
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className={`${
                isFullPage
                  ? 'object-cover object-top'
                  : 'object-contain object-center p-1.5'
              } group-hover/card:scale-[1.02] transition-transform duration-500 pointer-events-none select-none`}
              sizes="(max-width: 640px) 340px, 480px"
              style={{ userSelect: 'none', WebkitUserDrag: 'none' }}
            />
            {isFullPage && (
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/80 font-bold uppercase pointer-events-none">
                {t.fullPage}
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover/card:opacity-100 pointer-events-none select-none">
              <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-medium flex items-center gap-1.5 shadow-lg select-none">
                <Maximize2 className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                <span>{t.preview}</span>
              </span>
            </div>
          </div>

          {/* Card Caption Info */}
          <div className="p-2 pt-3 space-y-1 select-none">
            <span className="text-[10px] font-mono font-bold text-[var(--accent-color)] tracking-wider block uppercase select-none">
              {item.tag || `MODULE`}
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-white font-display group-hover/card:text-[var(--accent-color)] transition-colors truncate select-none">
              {item.title}
            </h3>
            <p className="text-[11px] text-white/50 font-sans line-clamp-1 select-none">
              {item.subtitle}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 select-none" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-5 select-none">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-color)]" />
            <span className="text-xs font-mono font-bold text-[var(--accent-color)] uppercase tracking-wider">
              // INTERFACE_GALLERY_TAPE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-tight">
            {isMobileGallery
              ? t.interactiveMobileRibbon
              : t.platformInterfacesModules}
          </h2>
          <p className="text-xs sm:text-sm text-white/60 font-sans max-w-xl">
            {t.infiniteInteractiveTapeHover}
          </p>
        </div>

        {/* Nudge Arrow Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => handleNudge('left')}
            onMouseEnter={playHover}
            className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/25 text-white/70 hover:text-white transition-all active:scale-95"
            aria-label="Previous screen"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleNudge('right')}
            onMouseEnter={playHover}
            className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/25 text-white/70 hover:text-white transition-all active:scale-95"
            aria-label="Next screen"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Infinite Ribbon Track with Gradient Fade Masks & ZERO Scrollbar Line */}
      <div
        className="relative overflow-hidden py-3 select-none"
        onMouseEnter={() => {
          setIsHovered(true);
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          isHoveredRef.current = false;
        }}
        onTouchStart={() => {
          setIsHovered(true);
          isHoveredRef.current = true;
        }}
        onTouchEnd={() => {
          setIsHovered(false);
          isHoveredRef.current = false;
        }}
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        {/* Left & Right Subtle Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-[#040608] via-[#040608]/85 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-[#040608] via-[#040608]/85 to-transparent z-10" />

        {/* Continuous Moving Tape Container */}
        <div
          ref={tapeRef}
          className="flex gap-5 sm:gap-6 will-change-transform select-none"
          style={{ width: 'max-content' }}
        >
          {/* Set 1 (measured for seamless modulo width) */}
          <div ref={set1Ref} className="flex gap-5 sm:gap-6 shrink-0">
            {normalizedItems.map((item: GalleryItem, idx: number) => renderCard(item, `set1-${idx}-${item.id || idx}`))}
          </div>

          {/* Set 2 (seamless continuation) */}
          <div className="flex gap-5 sm:gap-6 shrink-0" aria-hidden="true">
            {normalizedItems.map((item: GalleryItem, idx: number) => renderCard(item, `set2-${idx}-${item.id || idx}`))}
          </div>

          {/* Set 3 (buffer for ultra-wide displays) */}
          <div className="flex gap-5 sm:gap-6 shrink-0" aria-hidden="true">
            {normalizedItems.map((item: GalleryItem, idx: number) => renderCard(item, `set3-${idx}-${item.id || idx}`))}
          </div>
        </div>
      </div>
    </div>
  );
}
