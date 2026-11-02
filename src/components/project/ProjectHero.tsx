'use client';

import Image from 'next/image';
import { motion as Motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import type { DetailUi, FeaturedProject } from './types';

/** Mobile title and actions, the showcase image and the impact metrics strip. */
export default function ProjectHero({ project, t }: { project: FeaturedProject; t: DetailUi }) {
  const { playHover, playClick } = useThemeAudio();
  const roleLabel = t.role;
  const platformLabel = t.platform;
  const yearLabel = t.year;

  return (
    <>
      {/* Mobile Static Title & Action Badges (md:hidden, wraps naturally) */}
      <div className="md:hidden space-y-4 mb-8">
        <h1 className="font-display font-black uppercase tracking-tight text-white text-2xl sm:text-3xl leading-[1.15] break-words">
          {project.title}
        </h1>

        {(project.liveUrl || (project.githubUrl && !project.isPrivate)) && (
          <div className="flex flex-wrap items-center gap-2.5 pt-1 font-mono text-xs">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-color)] text-[#040608] font-bold text-xs tracking-wider uppercase shadow-md active:scale-95 transition-transform"
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 text-white text-xs font-bold active:scale-95 transition-all"
              >
                <FaGithub className="w-3.5 h-3.5" />
                <span>{t.code}</span>
              </a>
            )}
          </div>
        )}
      </div>

      <Motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6 mb-12 sm:mb-16"
      >
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="text-[var(--accent-color)] font-bold uppercase tracking-wider">
            {project.category}
          </span>
          <span className="text-white/30">&bull;</span>
          <span className="text-white/50">{project.dossier?.entryYear || '2025'}</span>
          <span className="text-white/30">&bull;</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {project.status || 'Production'}
          </span>
        </div>

        <p className="text-base sm:text-xl text-white/70 font-sans leading-relaxed max-w-4xl">
          {project.tagline || project.description}
        </p>

        {/* Quick Specs Pill Row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-mono text-white/60">
          <div>
            <span className="text-white/55">{roleLabel}: </span>
            <span className="text-white font-medium">{project.dossier?.primaryRole || 'Lead Engineer'}</span>
          </div>
          <div>
            <span className="text-white/55">{platformLabel}: </span>
            <span className="text-white font-medium">{project.dossier?.targetPlatform || 'Mobile & Web'}</span>
          </div>
          <div>
            <span className="text-white/55">{yearLabel}: </span>
            <span className="text-white font-medium">{project.dossier?.entryYear || '2025'}</span>
          </div>
        </div>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.05 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 sm:mb-20"
      >
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#06090E] shadow-[0_20px_70px_rgba(0,0,0,0.85)]">
          {/* Minimalist Frame Top Bar */}
          <div className="px-5 py-3.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-white/55">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
            <span className="text-[11px] text-white/50 truncate max-w-xs sm:max-w-md font-mono">
              {project.title.toLowerCase().replace(/\s+/g, '-')}.app
            </span>
            <span className="text-[10px] text-white/30 hidden sm:inline">HIGH FIDELITY</span>
          </div>

          {/* Main Screenshot Display */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#020407] select-none">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className="object-cover object-top select-none pointer-events-none"
              sizes="(max-width: 1500px) 100vw, 1500px"
              style={{ userSelect: 'none', WebkitUserDrag: 'none' }}
            />
          </div>
        </div>
      </Motion.div>

      {project.walkthrough?.impact?.metrics && (
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 sm:mb-24 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-hidden"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
            {project.walkthrough.impact.metrics.map((m, idx) => {
              const isLong = (m.value || '').length > 7;
              return (
                <div
                  key={idx}
                  className={`min-w-0 flex flex-col justify-center space-y-1.5 ${
                    idx > 0 ? 'pt-5 md:pt-0 md:pl-6 lg:pl-8' : ''
                  }`}
                >
                  <span
                    title={m.value}
                    className={`block font-black text-[var(--accent-color)] font-display tracking-tight leading-tight truncate ${
                      isLong
                        ? 'text-2xl sm:text-3xl lg:text-3xl xl:text-4xl'
                        : 'text-3xl sm:text-4xl lg:text-4xl xl:text-5xl'
                    }`}
                  >
                    {m.value}
                  </span>
                  <span className="block text-xs font-mono uppercase tracking-wider text-white/50 truncate">
                    {m.label}
                  </span>
                </div>
              );
            })}
          </div>
        </Motion.div>
      )}
    </>
  );
}
