'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion as Motion } from 'framer-motion';
import { useThemeAudio } from '../../src/context/ThemeAudioContext';
import { portfolioContent } from '../../src/data/portfolioData';
import { ExternalLink, ArrowRight, FolderGit2 } from 'lucide-react';

export default function ProjectsContent() {
  const { lang, playHover, playClick } = useThemeAudio();
  const content = portfolioContent[lang] || portfolioContent.en;
  const projects = content.projects;

  const viewCaseText = lang === 'ru' ? 'Смотреть кейс' : lang === 'kk' ? 'Кейсті ашу' : 'Explore Case Study';
  const archiveTitle = lang === 'ru' ? 'Архив проектов и утилиты' : lang === 'kk' ? 'Жобалар архиві және утилиталар' : 'System Archive & Tools';

  return (
    <div className="min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-36 px-5 sm:px-10 lg:px-16 xl:px-24 max-w-[1680px] mx-auto font-sans selection:bg-[var(--accent-color)] selection:text-[#040608] overflow-x-clip">
      {/* 1. TOP SYSTEM TELEMETRY HEADER */}
      <Motion.div
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.05 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-8 sm:mb-12 font-mono"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-color)]" />
          <span className="text-xs font-bold text-[var(--accent-color)] tracking-wider uppercase">
            {projects.tag || '// PORTFOLIO SHOWCASE'}
          </span>
        </div>
        <div className="text-xs text-white/40 hidden sm:flex items-center gap-2">
          <span>PORTFOLIO 2026</span>
          <span>&bull;</span>
          <span>DIAS YERMEK</span>
        </div>
      </Motion.div>

      {/* 2. PAGE TITLE & HERO SPECS */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 sm:mb-16 space-y-4"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            {/* Mobile inline breadcrumbs */}
            <div className="sm:hidden text-[10px] font-mono text-white/40 tracking-widest uppercase mb-1 flex items-center gap-1.5">
              <Link href="/" onClick={playClick} className="hover:text-white transition-colors">HOME</Link>
              <span>/</span>
              <span className="text-[var(--accent-color)] font-bold">PROJECTS</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white font-display uppercase tracking-tight leading-[1.05] break-words">
              {projects.title || 'FEATURED PROJECTS'}
            </h1>
            <p className="text-sm sm:text-base text-white/60 max-w-2xl mt-2 leading-relaxed font-sans">
              {projects.subtitle || 'High-performance web, mobile, and AI production architectures.'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-white/40 shrink-0 pb-1">
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[var(--accent-color)] font-bold tracking-wider">
              {projects.featured.length.toString().padStart(2, '0')} // PRODUCTION_BUILDS
            </span>
          </div>
        </div>
      </Motion.div>

      {/* 3. SWISS EDITORIAL INDEX (CONTINUOUS MONUMENTAL ROWS, ZERO BOXED CARDS) */}
      <div className="divide-y divide-white/[0.08] border-y border-white/[0.08] mb-32">
        {projects.featured.map((proj, idx) => {
          const metrics = proj.walkthrough?.impact?.metrics || [];
          const slug = proj.slug || proj.id.toLowerCase();

          return (
            <Motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ duration: 0.55, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/projects/${slug}`}
                onClick={playClick}
                onMouseEnter={playHover}
                className="group block py-10 sm:py-14 lg:py-16 hover:bg-white/[0.015] -mx-4 sm:-mx-8 px-4 sm:px-8 rounded-2xl transition-all duration-300 relative"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  {/* Left Column: Index, Narrative, Stack, Metrics & CTA */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    {/* Top Meta Track: Large Index & Category Spec */}
                    <div className="flex items-center justify-between gap-4 font-mono text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl sm:text-3xl font-black text-[var(--accent-color)] font-display tracking-tight">
                          {proj.num} //
                        </span>
                        <span className="text-xs font-mono font-bold tracking-widest text-white/60 uppercase">
                          {proj.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[11px] text-emerald-400 font-mono font-bold">
                          {proj.status || 'PRODUCTION'}
                        </span>
                      </div>
                    </div>

                    {/* Massive Editorial Title & Narrative */}
                    <div className="space-y-3">
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight group-hover:text-[var(--accent-color)] transition-colors leading-[1.1] break-words">
                        {proj.title}
                      </h2>
                      <p className="text-sm sm:text-base text-white/65 leading-relaxed font-sans max-w-2xl">
                        {proj.tagline || proj.description}
                      </p>
                    </div>

                    {/* Technology Stack Pills */}
                    {proj.tags && proj.tags.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-wider block">
                          // STACK_ARCHITECTURE
                        </span>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {proj.tags.slice(0, 7).map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-xs text-white/80 font-mono group-hover:border-white/20 transition-colors"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key Telemetry Impact Strip */}
                    {metrics.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.08]">
                        {metrics.slice(0, 3).map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className={`min-w-0 space-y-0.5 ${
                              mIdx === 2 ? 'col-span-2 sm:col-span-1' : ''
                            }`}
                          >
                            <span className="block text-xl sm:text-2xl font-black text-[var(--accent-color)] font-display truncate">
                              {m.value}
                            </span>
                            <span className="block text-[10px] sm:text-[11px] text-white/40 font-mono uppercase tracking-wider truncate">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Cue with Expanding Arrow */}
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold font-mono tracking-widest uppercase text-white group-hover:text-[var(--accent-color)] group-hover:gap-4 transition-all duration-300">
                        <span>{viewCaseText}</span>
                        <ArrowRight className="w-4 h-4 text-[var(--accent-color)] group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Floating Cinematic Viewport */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/10 group-hover:border-[var(--accent-color)]/50 bg-[#03060A] shadow-2xl transition-all duration-500">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        className="object-cover object-top filter brightness-[0.92] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                        sizes="(max-width: 1024px) 100vw, 580px"
                      />
                      {/* Subtle HUD Vignette Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 pointer-events-none" />
                      
                      {/* Floating HUD Tags */}
                      <div className="absolute top-3 right-3 text-[9px] font-mono text-white/60 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                        [SYS_BUILD // 0x0{idx + 1}]
                      </div>
                      <div className="absolute bottom-3 left-3 text-[9px] font-mono text-[var(--accent-color)] bg-black/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                        // 60FPS_FLUID
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Motion.div>
          );
        })}
      </div>

      {/* 4. TECHNICAL SYSTEM ARCHIVE (ENGINEERING TECH LEDGER TABLE, ZERO CARDS) */}
      <Motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6"
      >
        {/* Ledger Header */}
        <div className="border-b border-white/[0.08] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-bold text-[var(--accent-color)] tracking-wider uppercase block mb-1">
              // REPOSITORIES_INDEX
            </span>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[var(--accent-color)]/10 text-[var(--accent-color)]">
                <FolderGit2 className="w-4 h-4" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight">
                {projects.otherTitle || archiveTitle}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/50 mt-1 font-sans">
              {projects.otherSubtitle || 'Open-source tools, algorithms & system utilities'}
            </p>
          </div>

          <span className="text-xs text-[var(--accent-color)] font-mono font-bold">
            [{projects.otherProjects?.length || 0} REPOSITORIES]
          </span>
        </div>

        {/* Ledger Table Header (Desktop) */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 pb-2 border-b border-white/[0.06] text-[11px] font-mono text-white/40 uppercase tracking-wider">
          <div className="md:col-span-2">// IDENTIFIER</div>
          <div className="md:col-span-5">SYSTEM & ARCHITECTURE</div>
          <div className="md:col-span-3">CORE_STACK</div>
          <div className="md:col-span-2 text-right">REPOSITORY</div>
        </div>

        {/* Ledger Rows */}
        <div className="divide-y divide-white/[0.06] border-b border-white/[0.08]">
          {projects.otherProjects.map((mini, idx) => (
            <Motion.a
              key={mini.id}
              href={mini.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="py-5 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-xl hover:bg-white/[0.02] transition-colors group block"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center">
                {/* ID Column */}
                <div className="md:col-span-2 flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[var(--accent-color)]">
                    {mini.id}
                  </span>
                </div>

                {/* Title & Description Column */}
                <div className="md:col-span-5 space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white font-mono group-hover:text-[var(--accent-color)] transition-colors">
                    {mini.title}
                  </h3>
                  <p className="text-xs text-white/55 font-sans leading-relaxed line-clamp-2">
                    {mini.desc}
                  </p>
                </div>

                {/* Stack Column */}
                <div className="md:col-span-3">
                  <div className="flex flex-wrap gap-1.5">
                    {mini.tags.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] text-white/70 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action / Link Column */}
                <div className="md:col-span-2 flex items-center justify-start md:justify-end gap-1.5 text-xs font-mono text-white/60 group-hover:text-[var(--accent-color)] transition-colors">
                  <span className="font-bold tracking-wider">[SOURCE]</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Motion.a>
          ))}
        </div>
      </Motion.section>
    </div>
  );
}
