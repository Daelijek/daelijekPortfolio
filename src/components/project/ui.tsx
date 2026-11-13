'use client';

import type { MouseEvent, ReactNode } from 'react';
import { motion as Motion } from 'framer-motion';
import { Globe, Lock } from 'lucide-react';

/** Shared easing of the case-study page (fast start, long settle). */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Spacing of a page section; the scroll margin keeps a jumped-to heading clear of the docked header. */
export const SECTION = 'scroll-mt-40 mb-20 sm:mb-32';

/** Card surface shared by every panel on the page. `hud-card` adds the pointer spotlight. */
export const CARD = 'hud-card rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[var(--card-bg)]';

/** Small monospace label used above values and lists. */
export const LABEL = 'font-mono text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[var(--text-muted)]';

/** Fades a block in once, the first time it enters the viewport (never replays on scroll-back). */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.65, ease: EASE, delay }}
      className={className}
    >
      {children}
    </Motion.div>
  );
}

/** Numbered section title: `[02] TITLE ────────  aside`. */
export function SectionHeading({ index, title, aside }: { index: string; title: string; aside?: ReactNode }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
      <span aria-hidden="true" className="font-mono text-xs font-bold tracking-widest text-[var(--accent-color)] shrink-0">
        [{index}]
      </span>
      <h2 className="font-display text-base sm:text-xl font-bold uppercase tracking-wide text-[var(--heading-tint)]">
        {title}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 min-w-6 bg-gradient-to-r from-white/20 to-transparent" />
      {aside && <span className="font-mono text-xs text-[var(--text-muted)] shrink-0">{aside}</span>}
    </div>
  );
}

/** Four accent corner brackets drawn over the edges of a `relative` parent. */
export function HudCorners() {
  const base = 'pointer-events-none absolute z-10 w-3.5 h-3.5 border-[var(--accent-border)]';
  return (
    <>
      <span aria-hidden="true" className={`${base} -top-px -left-px border-t border-l rounded-tl-md`} />
      <span aria-hidden="true" className={`${base} -top-px -right-px border-t border-r rounded-tr-md`} />
      <span aria-hidden="true" className={`${base} -bottom-px -left-px border-b border-l rounded-bl-md`} />
      <span aria-hidden="true" className={`${base} -bottom-px -right-px border-b border-r rounded-br-md`} />
    </>
  );
}

/** Address shown in the bar of a screenshot frame. */
export interface FrameAddress {
  text: string;
  /** A real, deployed host (lock icon) rather than a preview label (globe icon). */
  secure: boolean;
}

/** The live host when the project is deployed, otherwise an honest `preview://slug` label. */
export function frameAddress(project: { liveUrl?: string | null; slug: string }): FrameAddress {
  if (project.liveUrl) {
    try {
      return { text: new URL(project.liveUrl).host, secure: true };
    } catch {
      // Malformed URL in the content: fall back to the preview label.
    }
  }
  return { text: `preview://${project.slug}`, secure: false };
}

/** Height (px) of the regular WindowBar from `sm` up; the lightbox sizes its frame with it. */
export const WINDOW_BAR_HEIGHT = 40;

/**
 * Window chrome above a screenshot. It marks the image as a picture *of* the product,
 * so a full-width capture never reads as part of this page.
 * Rendered with spans only, so it can live inside a <button>.
 */
export function WindowBar({ address, compact = false, aside }: { address: FrameAddress; compact?: boolean; aside?: ReactNode }) {
  const dot = `${compact ? 'w-2 h-2' : 'w-2.5 h-2.5'} rounded-full bg-white/20`;
  return (
    <span
      className={`relative flex shrink-0 items-center border-b border-white/[0.07] bg-[#0A0F16] ${
        compact ? 'h-8 px-3' : 'h-9 sm:h-10 px-3 sm:px-4'
      }`}
    >
      <span aria-hidden="true" className="flex gap-1.5">
        <span className={dot} />
        <span className={dot} />
        <span className={dot} />
      </span>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex max-w-[calc(100%-7rem)] items-center gap-1.5 h-6 px-2.5 rounded-md border border-white/[0.07] bg-black/40 font-mono text-[11px] text-white/55">
        {address.secure ? (
          <Lock aria-hidden="true" className="w-3 h-3 shrink-0 text-[var(--accent-color)]" />
        ) : (
          <Globe aria-hidden="true" className="w-3 h-3 shrink-0" />
        )}
        <span className="truncate">{address.text}</span>
      </span>
      {aside && <span className="ml-auto flex items-center">{aside}</span>}
    </span>
  );
}

/** onMouseMove handler for `.hud-card`: moves the radial highlight under the pointer. */
export function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

/** "FinTrack — Personal Finance Management" -> ["FinTrack", "Personal Finance Management"]. */
export function splitTitle(title: string): [name: string, descriptor: string] {
  const [name, ...rest] = title.split(' — ');
  return [name.trim(), rest.join(' — ').trim()];
}

/** Machine-style labels from the content ("API_LATENCY") shown as readable text ("API LATENCY"). */
export const humanize = (value: string) => value.replace(/_/g, ' ');
