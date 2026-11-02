'use client';

import { useRef, useState, type MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import { useLocalizedPath } from '@/i18n/I18nProvider';
import type { DetailUi, NextProjectTeaser } from './types';

/** Link to the next case study with a cursor-following preview on desktop. */
export default function NextProjectFooter({ nextProject, t }: { nextProject: NextProjectTeaser; t: DetailUi }) {
  const { playHover, playClick } = useThemeAudio();
  const { href } = useLocalizedPath();
  const nextCaseText = t.nextCaseStudy;
  const [isNextHovered, setIsNextHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const nextSectionRef = useRef<HTMLAnchorElement>(null);

  // Keep the 300px-wide preview inside the viewport.
  const clampToViewport = (e: MouseEvent) => {
    const halfWidth = 150;
    return { x: Math.max(halfWidth + 12, Math.min(window.innerWidth - halfWidth - 12, e.clientX)), y: e.clientY };
  };
  const handleNextMouseEnter = (e: MouseEvent) => {
    playHover();
    setMousePos(clampToViewport(e));
    setIsNextHovered(true);
  };
  const handleNextMouseMove = (e: MouseEvent) => setMousePos(clampToViewport(e));

  return (
    <>
      <Motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.05 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full mt-10 mb-0"
      >
        <Link
          href={href(`/projects/${nextProject.slug}`)}
          onClick={playClick}
          onMouseEnter={handleNextMouseEnter}
          onMouseLeave={() => setIsNextHovered(false)}
          onMouseMove={handleNextMouseMove}
          ref={nextSectionRef}
          className="group relative block w-full border-t border-white/10 pt-16 sm:pt-24 pb-28 sm:pb-36 select-none bg-gradient-to-b from-transparent via-black/40 to-black/85 cursor-pointer"
        >
          <div className="w-[90%] max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
              <span className="text-xs text-white/55 font-mono tracking-widest uppercase">
                {nextCaseText}
              </span>
              <span className="text-xs text-[var(--accent-color)] font-mono font-bold">
                {nextProject.num}
              </span>
            </div>

            <div className="py-2 space-y-3">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <span className="text-2xl sm:text-4xl lg:text-5xl font-black text-[var(--accent-color)] font-display">
                  {nextProject.num}
                </span>
                <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-display uppercase tracking-tight group-hover:text-[var(--accent-color)] transition-colors">
                  {nextProject.title}
                </h3>
                <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--accent-color)] opacity-70 group-hover:opacity-100 group-hover:translate-x-3 transition-all inline-block ml-2" />
              </div>
              <p className="text-xs sm:text-sm text-white/50 font-mono">
                {nextProject.category} &bull; {nextProject.tags.join(' &bull; ')}
              </p>
            </div>

            {/* Mobile Only: Inline preview card for touch devices */}
            <div className="block md:hidden mt-6 pt-6 border-t border-white/5">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/15">
                <Image
                  src={nextProject.image}
                  alt={nextProject.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Link>
      </Motion.div>

      <AnimatePresence>
        {isNextHovered && (
          <Motion.div
            initial={{ opacity: 0, scale: 0.85, x: mousePos.x, y: mousePos.y }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePos.x,
              y: mousePos.y,
              transition: { type: 'spring', damping: 28, stiffness: 320, mass: 0.35 },
            }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
            style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 50 }}
            className="hidden md:block pointer-events-none select-none"
          >
            <div className="-translate-x-1/2 -translate-y-[115%] pointer-events-none">
              <div className="w-64 sm:w-72 aspect-[16/10] rounded-2xl overflow-hidden border border-white/20 bg-[#06090D] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_25px_var(--accent-glow)] p-1.5 relative">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
                  <Image
                    src={nextProject.image}
                    alt={nextProject.title}
                    fill
                    sizes="288px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-mono text-white px-2 py-1 bg-black/85 backdrop-blur-md rounded-lg border border-white/15">
                    <span className="font-black text-[var(--accent-color)]">{nextProject.num}</span>
                    <span className="font-bold truncate text-[10px]">{nextProject.title}</span>
                    <span className="text-[10px] text-white/50 tracking-wider">PREVIEW</span>
                  </div>
                </div>
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
