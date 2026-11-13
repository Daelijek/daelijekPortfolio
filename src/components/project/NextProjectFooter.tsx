'use client';

import { useState, type MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import { useLocalizedPath } from '@/i18n/I18nProvider';
import { blurProps, useMedia } from './media';
import type { DetailUi, NextProjectTeaser } from './types';
import { EASE, WindowBar, frameAddress, splitTitle } from './ui';

/** Width (px) of the cursor-following preview. */
const PREVIEW_WIDTH = 320;

/**
 * Link to the next case study: a large name with its descriptor and stack, and a framed
 * preview of its cover that follows the cursor on desktop (shown inline on phones).
 */
export default function NextProjectFooter({ nextProject, t }: { nextProject: NextProjectTeaser; t: DetailUi }) {
  const { playHover, playClick } = useThemeAudio();
  const { href } = useLocalizedPath();
  const cover = useMedia()(nextProject.image);
  const address = frameAddress(nextProject);
  const [name, descriptor] = splitTitle(nextProject.title);
  const [isHovered, setIsHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Keep the preview inside the viewport.
  const clampToViewport = (e: MouseEvent) => {
    const half = PREVIEW_WIDTH / 2;
    return { x: Math.max(half + 12, Math.min(window.innerWidth - half - 12, e.clientX)), y: e.clientY };
  };

  const framedCover = (sizes: string) => (
    <span className="flex flex-col overflow-hidden rounded-xl border border-white/15 bg-[#020407]">
      <WindowBar address={address} compact />
      <span className="relative block w-full" style={{ aspectRatio: cover ? cover.width / cover.height : 16 / 10 }}>
        <Image src={nextProject.image} alt="" fill sizes={sizes} {...blurProps(cover)} className="object-cover" />
      </span>
    </span>
  );

  return (
    <>
      <section aria-labelledby="next-case-label" className="relative mt-8 border-t border-white/10 bg-gradient-to-b from-transparent via-black/40 to-black/85">
        <Motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="w-[90%] max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-28 sm:pb-36"
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            <span aria-hidden="true" className="font-mono text-xs font-bold tracking-widest text-[var(--accent-color)]">
              [{nextProject.num}]
            </span>
            <h2 id="next-case-label" className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {t.nextCaseStudy}
            </h2>
            <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          </div>

          <Link
            href={href(`/projects/${nextProject.slug}`)}
            onClick={playClick}
            onMouseEnter={(e) => {
              playHover();
              setMouse(clampToViewport(e));
              setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={(e) => setMouse(clampToViewport(e))}
            className="group grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8 select-none"
          >
            <span className="min-w-0">
              <span className="block font-display font-bold uppercase leading-[0.95] tracking-tight text-[var(--heading-tint)] text-[clamp(2.25rem,6vw,5.25rem)] break-words transition-colors duration-300 group-hover:text-[var(--accent-color)]">
                {name}
              </span>
              {descriptor && (
                <span className="mt-3 block font-display font-semibold text-lg sm:text-2xl text-white/80">{descriptor}</span>
              )}
              <span className="mt-6 flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-md border border-[var(--card-border)] font-mono text-xs font-semibold text-[var(--accent-color)]">
                  {nextProject.category}
                </span>
                {nextProject.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.04] font-mono text-xs text-white/80">
                    {tag}
                  </span>
                ))}
              </span>
            </span>

            <span
              aria-hidden="true"
              className="hidden md:inline-flex w-20 h-20 lg:w-24 lg:h-24 items-center justify-center rounded-full border border-[var(--border-bright)] text-[var(--accent-color)] transition-all duration-500 ease-out group-hover:bg-[var(--accent-color)] group-hover:text-[#040608] group-hover:shadow-[0_0_40px_var(--accent-glow)]"
            >
              <ArrowRight className="w-8 h-8 transition-transform duration-500 group-hover:-rotate-45" />
            </span>

            {/* Phones and tablets: the preview sits inline (no cursor to follow) */}
            <span className="block md:hidden">{framedCover('90vw')}</span>
          </Link>
        </Motion.div>
      </section>

      <AnimatePresence>
        {isHovered && (
          <Motion.div
            initial={{ opacity: 0, scale: 0.85, x: mouse.x, y: mouse.y }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mouse.x,
              y: mouse.y,
              transition: { type: 'spring', damping: 28, stiffness: 320, mass: 0.35 },
            }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
            style={{ position: 'fixed', top: 0, left: 0, zIndex: 50, width: PREVIEW_WIDTH }}
            className="hidden md:block pointer-events-none select-none"
          >
            <div className="-translate-x-1/2 -translate-y-[115%] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_var(--accent-glow)] rounded-xl">
              {framedCover(`${PREVIEW_WIDTH}px`)}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
