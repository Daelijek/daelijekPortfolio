'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useDialogFocus } from '@/hooks/useDialogFocus';
import type { GalleryItem } from './types';

/** Full-size preview of a gallery screen (modal dialog with focus trap; Escape closes). */
export default function GalleryLightbox({ screen: activeModalScreen, onClose, isMobileProject }: { screen: GalleryItem | null; onClose: () => void; isMobileProject: boolean }) {
  const lightboxRef = useRef<HTMLDivElement>(null);
  const trapLightboxFocus = useDialogFocus(Boolean(activeModalScreen), lightboxRef);

  useEffect(() => {
    if (!activeModalScreen) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeModalScreen, onClose]);

  return (
    <AnimatePresence>
      {activeModalScreen && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/92 backdrop-blur-2xl"
          onClick={() => onClose()}
        >
          <Motion.div
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-label={activeModalScreen.title}
            onKeyDown={trapLightboxFocus}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative ${
              isMobileProject
                ? 'max-w-md sm:max-w-lg w-[90%]'
                : 'w-[90%] max-w-[1920px]'
            } max-h-[94vh] rounded-3xl p-3.5 sm:p-5 lg:p-6 bg-[#070B12]/98 border border-white/15 shadow-[0_30px_100px_rgba(0,0,0,0.95)] flex flex-col space-y-3.5`}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => onClose()}
              className="absolute -top-3 -right-3 z-30 p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-white/20 border border-white/25 text-white transition-all hover:scale-110 active:scale-95 shadow-xl backdrop-blur-md"
              aria-label="Close preview"
            >
              <X aria-hidden="true" className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Desktop window top bar if not mobile */}
            {!isMobileProject && (
              <div className="flex items-center justify-between pb-2.5 px-2 border-b border-white/[0.08] select-none text-xs font-mono text-white/50">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2 truncate max-w-[280px] sm:max-w-xl text-white/80">
                  <span className="font-bold text-white truncate">{activeModalScreen.title}</span>
                  <span className="text-white/30 hidden sm:inline">&bull;</span>
                  <span className="text-xs text-white/50 hidden sm:inline truncate">{activeModalScreen.subtitle}</span>
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[var(--accent-color)] font-bold px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 shrink-0">
                  {activeModalScreen.tag}
                </span>
              </div>
            )}

            {/* High-res Screen */}
            {isMobileProject ? (
              <div className="relative aspect-[9/19.5] w-full max-h-[72vh] rounded-[2rem] overflow-hidden bg-black shadow-inner select-none mx-auto">
                <Image
                  src={activeModalScreen.image}
                  alt={activeModalScreen.title}
                  fill
                  priority
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  className="object-cover object-top select-none pointer-events-none"
                  sizes="500px"
                  style={{ userSelect: 'none', WebkitUserDrag: 'none' }}
                />
              </div>
            ) : activeModalScreen.image?.includes('all-landing-page') ? (
              <div className="relative w-full h-[72vh] sm:h-[76vh] md:h-[80vh] overflow-y-auto rounded-2xl bg-[#03060B] border border-white/10 select-none custom-scrollbar">
                <Image
                  src={activeModalScreen.image}
                  alt={activeModalScreen.title}
                  width={1440}
                  height={8450}
                  sizes="(max-width: 1920px) 90vw, 1440px"
                  priority
                  className="w-full h-auto block select-none pointer-events-auto"
                />
              </div>
            ) : (
              <div className="relative w-full h-[68vh] sm:h-[75vh] md:h-[80vh] rounded-2xl overflow-hidden bg-[#03060B] flex items-center justify-center border border-white/10 select-none shadow-inner">
                <Image
                  src={activeModalScreen.image}
                  alt={activeModalScreen.title}
                  fill
                  priority
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  className="object-contain object-center select-none"
                  sizes="(max-width: 1920px) 90vw, 1920px"
                />
              </div>
            )}

            {/* Caption */}
            <div className="px-2 pt-1 pb-1 flex items-center justify-between text-xs font-mono text-white/50 select-none">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/60">HIGH_RES_PREVIEW // 100% SCALE</span>
              </div>
              <span className="text-[11px] text-white/55 hidden sm:inline">
                ESC or click outside to dismiss
              </span>
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
