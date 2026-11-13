'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type WheelEvent,
} from 'react';
import Image from 'next/image';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play } from 'lucide-react';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import type { DetailUi, GalleryItem } from './types';
import { blurProps, useMedia } from './media';
import { Reveal, SECTION, SectionHeading, WindowBar, type FrameAddress } from './ui';

/** Time each screen stays centred while the deck plays by itself. */
const AUTOPLAY_INTERVAL_MS = 5000;
/** Pointer travel (px) after which a press counts as a drag instead of a click. */
const DRAG_THRESHOLD = 6;

const pad = (n: number) => String(n).padStart(2, '0');

const subscribeToNothing = () => () => {};

const getSlides = (track: HTMLElement) => Array.from(track.querySelectorAll<HTMLElement>('[data-deck-slide]'));

/** Index of the slide whose centre is closest to the centre of the track at `scrollLeft`. */
function nearestSlide(track: HTMLElement, scrollLeft: number) {
  const centre = scrollLeft + track.clientWidth / 2;
  let best = 0;
  let bestDistance = Infinity;
  getSlides(track).forEach((slide, i) => {
    const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - centre);
    if (distance < bestDistance) {
      best = i;
      bestDistance = distance;
    }
  });
  return best;
}

interface ScreenDeckProps {
  items: GalleryItem[];
  t: DetailUi;
  /** Section number shown in the heading ("03"). */
  index: string;
  /** Portrait phone screenshots (device frames) instead of wide web captures. */
  isMobileGallery: boolean;
  /** Address in the window bar of web screens. */
  address: FrameAddress;
  /** True while the lightbox is open: autoplay waits. */
  isPaused: boolean;
  /** Screen to jump to after the lightbox closes (the deck follows the lightbox). */
  syncTo?: { index: number; n: number } | null;
  onOpen: (index: number) => void;
}

/**
 * Screen deck: a full-bleed, centre-focused carousel of the project's screens.
 *  - native horizontal scrolling with scroll-snap (touch swipe, trackpad, shift+wheel)
 *  - mouse drag with a flick, arrow keys, prev/next buttons and a clickable timeline
 *  - one caption for the centred screen instead of a label on every card
 *  - plays by itself until the visitor touches it (never with prefers-reduced-motion)
 *  - click the centred screen (or press Enter on any) to open it full-screen
 */
export default function ScreenDeck({ items, t, index, isMobileGallery, address, isPaused, syncTo, onOpen }: ScreenDeckProps) {
  const { playHover, playClick } = useThemeAudio();
  const reducedMotion = useReducedMotion();
  const mediaOf = useMedia();

  const deckRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, moved: false, startX: 0, startLeft: 0, lastX: 0, lastTime: 0, velocity: 0 });
  const snapTimer = useRef<number | undefined>(undefined);

  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [inView, setInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // The motion preference is unknown on the server: decide about autoplay on the client only,
  // so the server HTML and the first client render agree.
  const isClient = useSyncExternalStore(subscribeToNothing, () => true, () => false);

  const count = items.length;
  const canAutoplay = isClient && count > 1 && !reducedMotion;
  const isPlaying = canAutoplay && autoplay && inView && !isHovered && !isDragging && !isPaused;

  const scrollToIndex = useCallback(
    (i: number) => {
      const track = trackRef.current;
      const slide = track ? getSlides(track)[i] : undefined;
      if (!track || !slide) return;
      track.scrollTo({
        left: slide.offsetLeft + slide.offsetWidth / 2 - track.clientWidth / 2,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    },
    [reducedMotion]
  );

  // The centred slide is the active one (updated at most once per frame while scrolling).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setActive(nearestSlide(track, track.scrollLeft));
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
      window.clearTimeout(snapTimer.current);
    };
  }, []);

  // After the lightbox closes, jump (instantly: the dialog still covers the deck) to the screen
  // the visitor stopped on, and move keyboard focus there if it was inside the deck.
  useEffect(() => {
    const track = trackRef.current;
    const slide = syncTo && track ? getSlides(track)[syncTo.index] : undefined;
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft + slide.offsetWidth / 2 - track.clientWidth / 2, behavior: 'auto' });
    if (track.contains(document.activeElement)) slide.focus({ preventScroll: true });
  }, [syncTo]);

  // Autoplay only runs while the deck is actually on screen.
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.55 });
    observer.observe(deck);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setTimeout(() => scrollToIndex((active + 1) % count), AUTOPLAY_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [isPlaying, active, count, scrollToIndex]);

  /** Any deliberate interaction hands control to the visitor for good. */
  const takeControl = () => setAutoplay(false);

  const go = (direction: 1 | -1) => {
    takeControl();
    playClick();
    scrollToIndex(Math.min(count - 1, Math.max(0, active + direction)));
  };

  // ---- Mouse drag (touch and trackpads scroll natively) ----
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || !trackRef.current) return;
    drag.current = {
      down: true,
      moved: false,
      startX: e.clientX,
      startLeft: trackRef.current.scrollLeft,
      lastX: e.clientX,
      lastTime: e.timeStamp,
      velocity: 0,
    };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    const track = trackRef.current;
    if (!state.down || !track) return;
    const dx = e.clientX - state.startX;

    if (!state.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      state.moved = true;
      takeControl();
      setIsDragging(true);
      window.clearTimeout(snapTimer.current);
      track.style.scrollSnapType = 'none'; // free movement while dragging
      track.setPointerCapture(e.pointerId);
    }

    track.scrollLeft = state.startLeft - dx;
    const dt = e.timeStamp - state.lastTime;
    if (dt > 0) state.velocity = (e.clientX - state.lastX) / dt;
    state.lastX = e.clientX;
    state.lastTime = e.timeStamp;
  };

  const onPointerEnd = (e: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    const track = trackRef.current;
    if (!state.down || !track) return;
    state.down = false;
    if (!state.moved) return;

    if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
    setIsDragging(false);
    // A flick carries the deck further: settle on the slide nearest to the projected position.
    scrollToIndex(nearestSlide(track, track.scrollLeft - state.velocity * 220));
    snapTimer.current = window.setTimeout(() => {
      track.style.scrollSnapType = '';
    }, 700);
  };

  /** Swallows the click that ends a drag, so dragging never opens a preview. */
  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (!drag.current.moved) return;
    drag.current.moved = false;
    e.preventDefault();
    e.stopPropagation();
  };

  // Horizontal trackpad gestures belong to the deck; keep them away from the page's smooth scroller.
  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.stopPropagation();
    takeControl();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    go(e.key === 'ArrowRight' ? 1 : -1);
  };

  const onSlideClick = (e: MouseEvent<HTMLButtonElement>, i: number) => {
    takeControl();
    // Keyboard activation (detail 0) always opens; a mouse click on a side slide centres it first.
    if (i === active || e.detail === 0) {
      playClick();
      onOpen(i);
    } else {
      scrollToIndex(i);
    }
  };

  if (count === 0) return null;
  const current = items[Math.min(active, count - 1)];
  const cardWidth = isMobileGallery ? 'min(60vw, 250px)' : 'min(86vw, 1000px)';

  return (
    <section id="screens" className={SECTION}>
      <Reveal>
        <SectionHeading
          index={index}
          title={t.screensTitle}
          aside={<span className="hidden md:inline">{t.screensHint}</span>}
        />
      </Reveal>

      <Reveal>
        <div
          ref={deckRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onKeyDown={onKeyDown}
        >
          {/* Full-bleed track */}
          <div className="relative mx-[calc(50%_-_50vw)]">
            <div
              ref={trackRef}
              role="group"
              aria-roledescription="carousel"
              aria-label={t.screensTitle}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerEnd}
              onPointerCancel={onPointerEnd}
              onClickCapture={onClickCapture}
              onWheel={onWheel}
              style={{ '--deck-card-w': cardWidth } as CSSProperties}
              className={`relative flex items-center gap-5 sm:gap-8 overflow-x-auto overscroll-x-contain no-scrollbar snap-x snap-mandatory py-6 sm:py-8 px-[calc(50vw_-_var(--deck-card-w)_/_2)] select-none ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
            >
              {items.map((item, i) => {
                const isActive = i === active;
                const isFullPage = item.image.includes('all-landing-page');
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-deck-slide=""
                    data-active={isActive}
                    aria-label={`${pad(i + 1)} · ${item.title} — ${t.preview}`}
                    onClick={(e) => onSlideClick(e, i)}
                    onFocus={(e) => {
                      // Keyboard focus brings its slide to the centre.
                      if (e.currentTarget.matches(':focus-visible')) scrollToIndex(i);
                    }}
                    onMouseEnter={playHover}
                    className="group/slide relative shrink-0 snap-center w-[var(--deck-card-w)] rounded-[2rem] text-left transition-[opacity,transform] duration-500 ease-out data-[active=false]:opacity-35 data-[active=false]:scale-[0.93] data-[active=false]:hover:opacity-70"
                  >
                    {isMobileGallery ? (
                      <span className="relative block rounded-[2.2rem] p-2 bg-[#090D14] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-[border-color,box-shadow] duration-500 group-data-[active=true]/slide:border-[var(--card-hover-border)] group-data-[active=true]/slide:shadow-[0_30px_80px_rgba(0,0,0,0.8),0_0_45px_var(--card-hover-glow)]">
                        <span aria-hidden="true" className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black/80 rounded-full z-10 border border-white/5" />
                        <span className="relative block aspect-[9/19.5] w-full rounded-[1.75rem] overflow-hidden bg-black">
                          <Image
                            src={item.image}
                            alt=""
                            {...blurProps(mediaOf(item.image))}
                            fill
                            draggable={false}
                            sizes="(max-width: 420px) 60vw, 250px"
                            className="object-cover object-top pointer-events-none"
                          />
                        </span>
                      </span>
                    ) : (
                      <span className="flex flex-col w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#03060B] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-[border-color,box-shadow] duration-500 group-data-[active=true]/slide:border-[var(--card-hover-border)] group-data-[active=true]/slide:shadow-[0_30px_80px_rgba(0,0,0,0.8),0_0_45px_var(--card-hover-glow)]">
                      <WindowBar address={address} compact />
                      <span className="relative block aspect-[2/1] w-full">
                        <Image
                          src={item.image}
                          alt=""
                          {...blurProps(mediaOf(item.image))}
                          fill
                          draggable={false}
                          sizes="(max-width: 1160px) 86vw, 1000px"
                          className={`pointer-events-none ${isFullPage ? 'object-cover object-top' : 'object-contain'}`}
                        />
                        {isFullPage && (
                          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 font-mono text-[10px] font-bold uppercase text-white/80">
                            {t.fullPage}
                          </span>
                        )}
                      </span>
                      </span>
                    )}

                    {/* Expand hint on the centred slide */}
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-data-[active=true]/slide:group-hover/slide:opacity-100 group-focus-visible/slide:opacity-100">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 font-mono text-xs font-medium text-white shadow-lg">
                        <Maximize2 aria-hidden="true" className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                        {t.preview}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Edge fades (theme background, so they work in every colour theme) */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-[7vw] bg-gradient-to-r from-[var(--bg-primary)] to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-[7vw] bg-gradient-to-l from-[var(--bg-primary)] to-transparent" />
          </div>

          {/* Caption + controls for the centred screen */}
          <div className="mt-2 sm:mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div className="min-w-0 md:min-h-[6.25rem]" aria-live={isPlaying ? 'off' : 'polite'}>
              <div className="flex items-center gap-3 font-mono">
                <span className="text-sm font-bold tabular-nums text-[var(--accent-color)]">{pad(active + 1)}</span>
                <span className="text-xs tabular-nums text-white/60">/ {pad(count)}</span>
                <span className="px-2 py-0.5 rounded-md border border-[var(--card-border)] text-[11px] font-semibold uppercase tracking-wider text-[var(--accent-color)] truncate">
                  {current.tag}
                </span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <Motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  <h3 className="mt-2.5 font-display font-bold text-lg sm:text-xl text-white leading-snug">{current.title}</h3>
                  <p className="mt-1 text-sm text-white/60 leading-relaxed max-w-[72ch]">{current.subtitle}</p>
                </Motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {canAutoplay && (
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setAutoplay((on) => !on);
                  }}
                  onMouseEnter={playHover}
                  aria-label={autoplay ? t.pauseAutoplay : t.startAutoplay}
                  className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-white/10 hover:border-white/30 bg-white/[0.04] hover:bg-white/[0.1] text-white/70 hover:text-white transition-colors"
                >
                  {autoplay ? <Pause aria-hidden="true" className="w-4 h-4" /> : <Play aria-hidden="true" className="w-4 h-4" />}
                </button>
              )}
              <button
                type="button"
                onClick={() => go(-1)}
                onMouseEnter={playHover}
                disabled={active === 0}
                aria-label={t.previousScreen}
                className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-white/10 hover:border-white/30 bg-white/[0.04] hover:bg-white/[0.1] text-white/70 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft aria-hidden="true" className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                onMouseEnter={playHover}
                disabled={active === count - 1}
                aria-label={t.nextScreen}
                className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-white/10 hover:border-white/30 bg-white/[0.04] hover:bg-white/[0.1] text-white/70 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronRight aria-hidden="true" className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  takeControl();
                  playClick();
                  onOpen(active);
                }}
                onMouseEnter={playHover}
                className="h-11 px-4 inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] hover:border-[var(--card-hover-border)] bg-white/[0.04] hover:bg-white/[0.1] font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent-color)] transition-colors"
              >
                <Maximize2 aria-hidden="true" className="w-3.5 h-3.5" />
                {t.preview}
              </button>
            </div>
          </div>

          {/* Timeline: one segment per screen; the active one doubles as the autoplay timer */}
          {count > 1 && (
            <div className="mt-5 flex gap-1.5">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  tabIndex={-1}
                  onClick={() => {
                    takeControl();
                    playClick();
                    scrollToIndex(i);
                  }}
                  aria-label={t.goToScreen.replace('{n}', String(i + 1))}
                  className="group/seg relative h-6 flex-1"
                >
                  <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full overflow-hidden bg-white/[0.12] group-hover/seg:bg-white/30 transition-colors">
                    {i === active && (
                      <span
                        key={isPlaying ? 'timer' : 'static'}
                        className={`block h-full rounded-full bg-[var(--accent-color)] ${isPlaying ? 'deck-progress-fill' : ''}`}
                        style={{ '--deck-interval': `${AUTOPLAY_INTERVAL_MS}ms` } as CSSProperties}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
