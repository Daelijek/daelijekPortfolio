'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type SyntheticEvent,
  type TouchEvent,
} from 'react';
import Image from 'next/image';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useDialogFocus } from '@/hooks/useDialogFocus';
import { blurProps, useMedia } from './media';
import type { DetailUi, LightboxState } from './types';
import { WINDOW_BAR_HEIGHT, WindowBar, type FrameAddress } from './ui';

const pad = (n: number) => String(n).padStart(2, '0');
const clamp = (value: number) => Math.min(100, Math.max(0, value));

/** Horizontal travel (px) that counts as a swipe to the next / previous screen. */
const SWIPE_DISTANCE = 50;
/** Two taps closer than this (ms) are a double tap. */
const DOUBLE_TAP_MS = 300;
/** Aspect ratio assumed for a web screen whose size is unknown (not in the manifest). */
const DEFAULT_RATIO = 16 / 9;
/** Magnification of the zoomed view. */
const ZOOM = 2.5;

const isFullPageCapture = (src: string) => src.includes('all-landing-page');
const sizesFor = (phone: boolean) => (phone ? '(max-width: 640px) 90vw, 480px' : '(max-width: 1920px) 96vw, 1920px');

interface GalleryLightboxProps {
  /** `null` while closed. */
  state: LightboxState | null;
  t: DetailUi;
  /** Address in the window bar of web screens. */
  address: FrameAddress;
  onNavigate: (index: number) => void;
  onClose: () => void;
}

/** Shown inside a frame until its image has loaded; `subtle` when a blurred preview is visible. */
function LoadingVeil({ subtle }: { subtle: boolean }) {
  return subtle ? (
    <span className="pointer-events-none absolute top-3 right-3 z-10 inline-flex p-1.5 rounded-full bg-black/60 backdrop-blur-sm">
      <Loader2 aria-hidden="true" className="w-4 h-4 text-white/70 animate-spin" />
    </span>
  ) : (
    <span className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white/[0.02] animate-pulse">
      <Loader2 aria-hidden="true" className="w-6 h-6 text-white/40 animate-spin" />
    </span>
  );
}

/**
 * Full-screen viewer for a screen (modal dialog with a focus trap).
 *  - every screen sits on a dotted stage inside a window or device frame sized to its real
 *    proportions, so it reads as a screenshot rather than as part of the page
 *  - web screens zoom: click (double-tap on touch) to magnify at that point, move to pan
 *  - arrows, swipes, the thumbnail strip or ← → move between screens; Escape un-zooms, then closes
 */
export default function GalleryLightbox({ state, t, address, onNavigate, onClose }: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const lastTap = useRef({ time: 0, x: 0, y: 0 });
  const pointerType = useRef<string>('mouse');
  const isOpen = state !== null;
  // Focus starts on Close (the least surprising control), not on the first button in the bar.
  const trapFocus = useDialogFocus(isOpen, dialogRef, { initialFocusRef: closeRef });
  const mediaOf = useMedia();

  // Stage size, plus the proportions and load state of every screen seen so far (keyed by src).
  const [stageEl, setStageEl] = useState<HTMLDivElement | null>(null);
  const [stage, setStage] = useState({ width: 0, height: 0 });
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState<Record<string, true>>({});

  const count = state?.items.length ?? 0;
  const index = state?.index ?? 0;
  const screen = state?.items[index];
  const canZoom = Boolean(state && screen && !state.phone && !isFullPageCapture(screen.image));

  // Zoom origin in % of the image (null = not zoomed). Reset whenever the screen changes.
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const screenKey = state ? `${state.source}:${index}` : '';
  const [zoomedScreen, setZoomedScreen] = useState(screenKey);
  if (zoomedScreen !== screenKey) {
    setZoomedScreen(screenKey);
    setZoom(null);
  }

  const goTo = useCallback((next: number) => onNavigate(next), [onNavigate]);
  const step = useCallback(
    (direction: 1 | -1) => {
      if (count > 1) goTo((index + direction + count) % count);
    },
    [count, index, goTo]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoom) setZoom(null);
        else onClose();
      } else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose, step, zoom]);

  // The page behind must not scroll while the dialog is open.
  useEffect(() => {
    if (!isOpen) return;
    window.__lenis?.stop();
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = overflow;
      window.__lenis?.start();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!stageEl) return;
    const observer = new ResizeObserver(([entry]) =>
      setStage({ width: entry.contentRect.width, height: entry.contentRect.height })
    );
    observer.observe(stageEl);
    return () => observer.disconnect();
  }, [stageEl]);

  // Keep the current thumbnail in view.
  useEffect(() => {
    if (!isOpen) return;
    stripRef.current
      ?.querySelector<HTMLElement>('[aria-current="true"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [isOpen, index]);

  const onImageLoad = (src: string) => (e: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth > 0 && naturalHeight > 0) setRatios((all) => ({ ...all, [src]: naturalWidth / naturalHeight }));
    setLoaded((all) => ({ ...all, [src]: true }));
  };

  // ---- Zoom ----
  const originFrom = (el: HTMLElement, clientX: number, clientY: number) => {
    const rect = el.getBoundingClientRect();
    return { x: clamp(((clientX - rect.left) / rect.width) * 100), y: clamp(((clientY - rect.top) / rect.height) * 100) };
  };
  const onZoomClick = (e: MouseEvent<HTMLElement>) => {
    if (pointerType.current === 'touch') return; // touch zooms with a double tap
    // Read the event now: React clears `currentTarget` before a state updater would run.
    const origin = originFrom(e.currentTarget, e.clientX, e.clientY);
    setZoom((current) => (current ? null : origin));
  };
  const onZoomPan = (e: MouseEvent<HTMLElement>) => {
    if (zoom) setZoom(originFrom(e.currentTarget, e.clientX, e.clientY));
  };
  const onZoomTouchMove = (e: TouchEvent<HTMLElement>) => {
    if (!zoom || e.touches.length !== 1) return;
    setZoom(originFrom(e.currentTarget, e.touches[0].clientX, e.touches[0].clientY));
  };
  const onZoomTouchEnd = (e: TouchEvent<HTMLElement>) => {
    const touch = e.changedTouches[0];
    const previous = lastTap.current;
    const isDoubleTap =
      e.timeStamp - previous.time < DOUBLE_TAP_MS && Math.hypot(touch.clientX - previous.x, touch.clientY - previous.y) < 30;
    lastTap.current = isDoubleTap ? { time: 0, x: 0, y: 0 } : { time: e.timeStamp, x: touch.clientX, y: touch.clientY };
    if (!isDoubleTap) return;
    const origin = originFrom(e.currentTarget, touch.clientX, touch.clientY);
    setZoom((current) => (current ? null : origin));
  };
  const toggleZoomButton = () => setZoom((current) => (current ? null : { x: 50, y: 50 }));

  // ---- Swipe between screens (not while zoomed: then one finger pans) ----
  const onTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || zoom) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
  };

  const renderScreen = () => {
    if (!state || !screen) return null;
    const src = screen.image;
    const meta = mediaOf(src);
    const isLoaded = Boolean(loaded[src]);
    // With a blurred preview the image is visible from the start; without one it fades in.
    const imageFade = meta ? 'select-none' : `select-none transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`;
    const veil = !isLoaded && <LoadingVeil subtle={Boolean(meta)} />;

    // Phone: device frame as tall as the stage allows.
    if (state.phone) {
      return (
        <span className="relative block h-full max-w-full aspect-[9/19.5] rounded-[2.2rem] p-2 bg-[#090D14] border border-white/15 shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
          <span className="relative block h-full w-full rounded-[1.75rem] overflow-hidden bg-black">
            {veil}
            <Image
              src={src}
              alt={screen.title}
              fill
              loading="eager"
              draggable={false}
              sizes={sizesFor(true)}
              onLoad={onImageLoad(src)}
              {...blurProps(meta)}
              className={`object-cover object-top ${imageFade}`}
            />
          </span>
        </span>
      );
    }

    // Full-page capture: a window whose body scrolls (inside the dialog, not the page).
    if (isFullPageCapture(src)) {
      return (
        <span className="flex h-full w-full max-w-[1200px] flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-white/15 bg-[#020407] shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
          <WindowBar address={address} />
          <span data-lenis-prevent="" tabIndex={0} className="relative block min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {veil}
            <Image
              src={src}
              alt={screen.title}
              width={meta?.width ?? 1440}
              height={meta?.height ?? 8450}
              loading="eager"
              draggable={false}
              sizes="(max-width: 1240px) 96vw, 1200px"
              onLoad={onImageLoad(src)}
              {...blurProps(meta)}
              className={`block w-full h-auto ${imageFade}`}
            />
          </span>
        </span>
      );
    }

    // Web screen: a window frame sized to the screen's real proportions; click to zoom.
    const ratio = meta ? meta.width / meta.height : (ratios[src] ?? DEFAULT_RATIO);
    const width = Math.max(0, Math.min(stage.width, (stage.height - WINDOW_BAR_HEIGHT) * ratio));
    return (
      <span
        style={{ width }}
        className="flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-white/15 bg-[#020407] shadow-[0_30px_100px_rgba(0,0,0,0.9)]"
      >
        <WindowBar address={address} />
        <span
          data-zoomed={zoom ? 'true' : 'false'}
          onPointerDown={(e: PointerEvent) => {
            pointerType.current = e.pointerType;
          }}
          onClick={onZoomClick}
          onMouseMove={onZoomPan}
          onTouchMove={onZoomTouchMove}
          onTouchEnd={onZoomTouchEnd}
          className={`relative block w-full overflow-hidden ${zoom ? 'cursor-zoom-out touch-none' : 'cursor-zoom-in'}`}
          style={{ aspectRatio: ratio }}
        >
          {veil}
          <span
            className="absolute inset-0 block transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: zoom ? `scale(${ZOOM})` : 'none',
              transformOrigin: zoom ? `${zoom.x}% ${zoom.y}%` : '50% 50%',
            }}
          >
            <Image
              src={src}
              alt={screen.title}
              fill
              loading="eager"
              draggable={false}
              // Zoomed: ask for a larger rendition so the magnified view stays sharp.
              sizes={zoom ? '(max-width: 1920px) 240vw, 4600px' : sizesFor(false)}
              onLoad={onImageLoad(src)}
              {...blurProps(meta)}
              className={`object-cover ${imageFade}`}
            />
          </span>
        </span>
      </span>
    );
  };

  // Neighbouring screens are fetched in the background, so stepping through is instant.
  const neighbours =
    state && count > 1
      ? [...new Set([state.items[(index + 1) % count], state.items[(index - 1 + count) % count]])].filter(
          (item) => item && !loaded[item.image] && !isFullPageCapture(item.image)
        )
      : [];

  // "← → navigate · click to zoom · Esc close": the zoom part only where zoom exists.
  const hint = canZoom ? t.lightboxHint : t.lightboxHint.split(' · ').filter((_, i) => i !== 1).join(' · ');

  const roundButton =
    'w-11 h-11 inline-flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/20 border border-white/20 text-white transition-colors';

  return (
    <AnimatePresence>
      {state && screen && (
        <Motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={screen.title}
          onKeyDown={trapFocus}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex flex-col bg-[#030507]/[0.97] backdrop-blur-xl"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between gap-4 px-4 sm:px-8 py-3 sm:py-4 border-b border-white/[0.08] bg-black/40">
            <div className="flex items-center gap-3 min-w-0 font-mono">
              {count > 1 && (
                <span className="shrink-0 text-xs tabular-nums text-white/60">
                  <span className="text-sm font-bold text-[var(--accent-color)]">{pad(index + 1)}</span> / {pad(count)}
                </span>
              )}
              <span className="font-display font-bold text-sm sm:text-base text-white truncate">{screen.title}</span>
              <span className="hidden sm:inline shrink-0 px-2 py-0.5 rounded-md border border-[var(--card-border)] text-[11px] font-semibold uppercase tracking-wider text-[var(--accent-color)]">
                {screen.tag}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {canZoom && (
                <button
                  type="button"
                  onClick={toggleZoomButton}
                  aria-label={zoom ? t.zoomOut : t.zoomIn}
                  aria-pressed={Boolean(zoom)}
                  className={roundButton}
                >
                  {zoom ? <ZoomOut aria-hidden="true" className="w-5 h-5" /> : <ZoomIn aria-hidden="true" className="w-5 h-5" />}
                </button>
              )}
              <button ref={closeRef} type="button" onClick={onClose} aria-label="Close preview" className={roundButton}>
                <X aria-hidden="true" className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stage (clicking the empty area around the screen closes the viewer) */}
          <div
            className="hud-dots relative flex-1 min-h-0 flex"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              ref={setStageEl}
              className="flex-1 min-w-0 flex items-center justify-center px-3 sm:px-24 py-4 sm:py-6"
              onClick={(e) => e.target === e.currentTarget && onClose()}
            >
              <AnimatePresence mode="wait" initial={false}>
                <Motion.div
                  key={screen.image}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-full w-full items-center justify-center pointer-events-none [&>*]:pointer-events-auto"
                >
                  {renderScreen()}
                </Motion.div>
              </AnimatePresence>
            </div>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous screen"
                  className="hidden sm:inline-flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-black/70 hover:bg-white/15 border border-white/20 text-white backdrop-blur-md transition-colors"
                >
                  <ChevronLeft aria-hidden="true" className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next screen"
                  className="hidden sm:inline-flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-black/70 hover:bg-white/15 border border-white/20 text-white backdrop-blur-md transition-colors"
                >
                  <ChevronRight aria-hidden="true" className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Background prefetch of the neighbouring screens */}
            <div aria-hidden="true" className="hidden">
              {neighbours.map((item) => (
                <Image key={item.image} src={item.image} alt="" width={1920} height={1080} loading="eager" sizes={sizesFor(state.phone)} />
              ))}
            </div>
          </div>

          {/* Thumbnail strip (tablet and desktop) */}
          {count > 1 && (
            <div className="hidden sm:flex justify-center border-t border-white/[0.08] bg-black/30 px-4 py-3">
              <div ref={stripRef} data-lenis-prevent="" className="flex max-w-full gap-2 overflow-x-auto no-scrollbar p-0.5">
                {state.items.map((item, i) => {
                  const isCurrent = i === index;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={t.goToScreen.replace('{n}', String(i + 1))}
                      aria-current={isCurrent ? 'true' : undefined}
                      className={`relative shrink-0 overflow-hidden rounded-md border transition-[opacity,border-color] duration-200 ${
                        state.phone ? 'h-16 w-[30px]' : 'h-11 w-20'
                      } ${isCurrent ? 'border-[var(--accent-color)] opacity-100' : 'border-white/15 opacity-50 hover:opacity-85'}`}
                    >
                      <Image src={item.image} alt="" fill sizes="80px" {...blurProps(mediaOf(item.image))} className="object-cover object-top" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Caption */}
          <div className="flex items-center justify-between gap-6 px-4 sm:px-8 py-3 sm:py-4 border-t border-white/[0.08] bg-black/40">
            <p className="text-sm text-white/70 leading-snug line-clamp-2">{screen.subtitle}</p>
            <p className="hidden md:block shrink-0 font-mono text-[11px] uppercase tracking-wider text-white/55">
              {hint}
            </p>
            {/* Phones: arrows live here, off the screenshot (swiping works too) */}
            {count > 1 && (
              <div className="sm:hidden flex shrink-0 gap-2">
                <button type="button" onClick={() => step(-1)} aria-label="Previous screen" className={roundButton}>
                  <ChevronLeft aria-hidden="true" className="w-5 h-5" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next screen" className={roundButton}>
                  <ChevronRight aria-hidden="true" className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
