'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion as Motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import { useLocalizedPath } from '@/i18n/I18nProvider';
import type { DetailUi, FeaturedProject } from './types';

/** Mobile "back" button and the desktop sticky header whose title shrinks into the bar on scroll. */
export default function ProjectHeader({ project, t }: { project: FeaturedProject; t: DetailUi }) {
  const { playHover, playClick } = useThemeAudio();
  const { href } = useLocalizedPath();
  const backText = t.allProjects;
  const mobileBackText = t.projects;

  const { scrollY } = useScroll();
  const backBtnRef = useRef<HTMLAnchorElement>(null);
  const [backWidth, setBackWidth] = useState(140);

  useEffect(() => {
    const measure = () => {
      const w = backBtnRef.current?.offsetWidth ?? 0;
      setBackWidth(w > 0 ? w + 16 : 140);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // The title moves from below the back button into the bar and scales down.
  const titleScale = useTransform(scrollY, [0, 110], [1, 0.38]);
  const titleY = useTransform(scrollY, [0, 110], [58, 0]);
  const titleX = useTransform(scrollY, [0, 110], [-backWidth, 0]);

  return (
    <>
      <div className="md:hidden fixed top-8 right-6 z-40 select-none">
        <Link
          href={href('/projects')}
          onClick={playClick}
          onMouseEnter={playHover}
          className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#080d14]/85 hover:bg-[#101722] border border-white/20 text-white backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] active:scale-95 transition-all group"
        >
          <div className="w-5 h-5 rounded-md bg-white text-black flex items-center justify-center shrink-0 group-hover:-translate-x-0.5 transition-transform">
            <ArrowLeft className="w-3.5 h-3.5 text-black stroke-[2.5]" />
          </div>
          <span className="font-mono font-bold text-xs uppercase tracking-wider text-white">
            {mobileBackText}
          </span>
        </Link>
      </div>

      <Motion.header
        className="hidden md:block sticky top-0 z-40 w-full bg-transparent border-none shadow-none pointer-events-none select-none"
      >
        <div className="w-[90%] max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 pointer-events-auto">
          <div className="h-16 sm:h-20 flex items-center justify-between gap-4">
            {/* Left: Back button + Animated Shrinking Title Target */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <Link
                ref={backBtnRef}
                href={href('/projects')}
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/25 text-white/80 hover:text-white transition-all group shrink-0 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono font-semibold uppercase tracking-wider text-xs hidden sm:inline">
                  {backText}
                </span>
              </Link>

              {/* Title: starts as large hero title below back button, shrinks & docks on scroll */}
              <Motion.div
                style={{
                  x: titleX,
                  y: titleY,
                  scale: titleScale,
                  transformOrigin: '0% 50%',
                }}
                className="shrink min-w-0 will-change-transform pointer-events-auto"
              >
                <h1 className="font-display font-black uppercase tracking-tight text-white text-[clamp(1.5rem,3.2vw,3.5rem)] whitespace-nowrap drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] max-w-full">
                  {project.title}
                </h1>
              </Motion.div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 font-mono text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/25 font-bold text-[11px] hidden sm:inline">
                {project.num}
              </span>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-color)] text-[#040608] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_var(--accent-glow)] transition-all hover:scale-105 active:scale-95 shadow-md"
                >
                  <span>{t.live}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && !project.isPrivate && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white/80 hover:text-white text-xs font-bold transition-all backdrop-blur-sm"
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.code}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </Motion.header>
    </>
  );
}
