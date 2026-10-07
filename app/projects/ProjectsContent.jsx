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

  return (
    <div className="min-h-screen pt-24 sm:pt-32 lg:pt-36 pb-36 px-6 sm:px-10 lg:px-16 xl:px-24 max-w-[1720px] mx-auto font-mono selection:bg-[var(--accent-color)] selection:text-[#040608]">
      {/* 1. TOP SYSTEM HEADER BAR */}
      <Motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-8 sm:mb-12"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-ping" />
          <span className="text-xs font-bold text-[var(--accent-color)] tracking-widest uppercase">
            {projects.tag || '// SECTOR_02 · PORTFOLIO SHOWCASE'}
          </span>
        </div>
        <div className="text-xs text-[var(--text-muted)] hidden sm:flex items-center gap-2">
          <span>PORTFOLIO // 2026</span>
          <span className="text-[var(--accent-color)]">&bull;</span>
          <span>DIAS YERMEK</span>
        </div>
      </Motion.div>

      {/* 2. PAGE TITLE & INTRO */}
      <Motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 sm:mb-14 space-y-3"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[var(--heading-tint)] font-display uppercase tracking-wide leading-tight">
              {projects.title || 'FEATURED PRODUCTION BUILDS'}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans max-w-2xl mt-1.5 leading-relaxed">
              {projects.subtitle || 'Engineered with precision for web, mobile, and AI architectures.'}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-muted)] shrink-0 pb-1">
            <span className="px-3 py-1 rounded bg-black/40 border border-[var(--border-subtle)] text-[var(--accent-color)] font-bold">
              [INDEX_COUNT: {projects.featured.length.toString().padStart(2, '0')}]
            </span>
          </div>
        </div>
      </Motion.div>

      {/* 3. MINIMALIST HYBRID PROJECT CARDS */}
      <div className="space-y-8 sm:space-y-10 mb-28">
        {projects.featured.map((proj, idx) => {
          const metrics = proj.walkthrough?.impact?.metrics || [];
          const slug = proj.slug || proj.id.toLowerCase();

          return (
            <Motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/projects/${slug}`}
                onClick={playClick}
                onMouseEnter={playHover}
                className="relative block rounded-3xl bg-[#04070B]/90 border border-white/10 hover:border-[var(--accent-border)] backdrop-blur-xl transition-all duration-500 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_50px_var(--card-hover-glow)] hover:-translate-y-1.5 group cursor-pointer"
              >
                {/* 4 Precision Blueprint Corner Crosshairs (+) */}
                <div className="absolute top-3 left-3 font-mono text-[11px] text-[var(--accent-color)] opacity-35 group-hover:opacity-100 group-hover:scale-125 transition-all pointer-events-none select-none z-20">
                  +
                </div>
                <div className="absolute top-3 right-3 font-mono text-[11px] text-[var(--accent-color)] opacity-35 group-hover:opacity-100 group-hover:scale-125 transition-all pointer-events-none select-none z-20">
                  +
                </div>
                <div className="absolute bottom-3 left-3 font-mono text-[11px] text-[var(--accent-color)] opacity-35 group-hover:opacity-100 group-hover:scale-125 transition-all pointer-events-none select-none z-20">
                  +
                </div>
                <div className="absolute bottom-3 right-3 font-mono text-[11px] text-[var(--accent-color)] opacity-35 group-hover:opacity-100 group-hover:scale-125 transition-all pointer-events-none select-none z-20">
                  +
                </div>

                {/* CARD TOP TELEMETRY RIBBON */}
                <div className="relative z-10 px-6 sm:px-8 py-3.5 border-b border-white/10 bg-black/40 flex flex-wrap items-center justify-between gap-3 text-[11px]">
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-xl sm:text-2xl font-black text-[var(--accent-color)] font-display tracking-tight leading-none">
                      {proj.num}
                    </span>
                    <span className="text-[var(--accent-color)] font-bold tracking-wider">
                      // SPECIMEN_{proj.id}
                    </span>
                    <span className="text-white/30 hidden sm:inline">&bull;</span>
                    <span className="text-white/60 font-mono tracking-wide hidden sm:inline">
                      [{proj.category}]
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-mono">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{proj.status || 'DEPLOYED'}</span>
                    </span>
                    <span className="text-[11px] text-[var(--accent-color)] font-bold flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <span>{lang === 'ru' ? 'ОТКРЫТЬ КЕЙС' : lang === 'kk' ? 'КЕЙСТІ АШУ' : 'OPEN DOSSIER'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* CARD MAIN CONTENT: Balanced 2-Column Grid */}
                <div className="relative z-10 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                  {/* Left Column: Title, Tagline & Telemetry Meters */}
                  <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between space-y-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--heading-tint)] font-display tracking-tight group-hover:text-[var(--accent-color)] transition-colors leading-tight">
                        {proj.title}
                      </h2>
                      {proj.tagline && (
                        <p className="text-xs sm:text-sm text-[var(--accent-color)] font-mono mt-1.5 tracking-wide flex items-center gap-1.5 leading-relaxed">
                          <span>&gt;</span>
                          <span>{proj.tagline}</span>
                        </p>
                      )}
                    </div>

                    {/* Telemetry Metric Meters (Compact, high-density impact metrics) */}
                    {metrics.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                        {metrics.slice(0, 4).map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="p-2 sm:p-2.5 rounded-xl bg-black/50 border border-white/5 group-hover:border-[var(--accent-border)]/40 transition-all text-center space-y-0.5 shadow-inner"
                          >
                            <span className="block text-sm sm:text-base font-black text-[var(--accent-color)] font-display leading-tight group-hover:scale-105 transition-transform">
                              {m.value}
                            </span>
                            <span className="block text-[9px] text-white/50 font-mono tracking-wider uppercase truncate">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Compact Cinema Viewport (Height matches left text block!) */}
                  <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[150px] sm:h-[165px] rounded-2xl overflow-hidden border border-white/15 group-hover:border-[var(--accent-border)] bg-[#020305] shadow-xl group/viewport transition-colors">
                      {/* Top Viewport HUD Bar */}
                      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between p-2.5 bg-gradient-to-b from-black/90 to-transparent text-[9.5px] text-white/60 font-mono pointer-events-none">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
                          <span>VIEWPORT // 60 FPS</span>
                        </span>
                        <span className="text-[var(--accent-color)] font-bold">[1920x1080]</span>
                      </div>

                      {/* Screenshot with Smooth Zoom */}
                      <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out">
                        <Image
                          src={proj.image}
                          alt={proj.title}
                          fill
                          className="object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity"
                          sizes="(max-width: 1024px) 100vw, 380px"
                        />
                      </div>

                      {/* Floating Hover Label */}
                      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none bg-black/30 backdrop-blur-[1.5px]">
                        <div className="px-3.5 py-1.5 rounded-lg bg-black/85 border border-[var(--accent-border)] text-[var(--accent-color)] font-bold text-[10.5px] tracking-wider uppercase flex items-center gap-1.5 shadow-[0_0_20px_var(--accent-glow)] transform translate-y-1 group-hover:translate-y-0 transition-transform">
                          <span>{lang === 'ru' ? 'СМОТРЕТЬ КЕЙС' : lang === 'kk' ? 'КЕЙСТІ КӨРУ' : 'VIEW CASE'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Motion.div>
          );
        })}
      </div>

      {/* 4. SYSTEM ARCHIVE & SECONDARY PROJECTS */}
      <Motion.section
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8"
      >
        <div className="border-b border-white/10 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[var(--accent-bg-subtle)] text-[var(--accent-color)]">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-sans uppercase tracking-wide">
                {projects.otherTitle || 'System Archive & Secondary Projects'}
              </h2>
            </div>
          </div>
          <span className="text-xs text-[var(--accent-color)] font-mono font-bold">
            [INDEX_COUNT: {projects.otherProjects?.length?.toString().padStart(2, '0') || '06'}]
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-5">
          {projects.otherProjects.map((mini, idx) => (
            <Motion.a
              key={mini.id}
              href={mini.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="relative cyber-panel p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-[var(--accent-border)] transition-all group flex flex-col justify-between space-y-4 hover:shadow-[0_0_30px_var(--card-hover-glow)] hover:-translate-y-1"
            >
              {/* Corner Blueprint Crosshairs (+) */}
              <div className="absolute top-2.5 left-2.5 font-mono text-[9px] text-[var(--accent-color)] opacity-30 group-hover:opacity-100 transition-opacity select-none pointer-events-none">
                +
              </div>
              <div className="absolute top-2.5 right-2.5 font-mono text-[9px] text-[var(--accent-color)] opacity-30 group-hover:opacity-100 transition-opacity select-none pointer-events-none">
                +
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-3 border-b border-white/5 pb-2.5">
                  <span className="text-[10px] text-[var(--accent-color)] font-mono font-bold">
                    // SPECIMEN_{mini.id}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-[var(--accent-color)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="text-base font-bold text-white font-sans mb-2 group-hover:text-[var(--accent-color)] transition-colors">
                  {mini.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-sans mb-4">
                  {mini.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                {mini.tags.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded bg-black/60 border border-white/5 text-[10px] text-white/50 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Motion.a>
          ))}
        </div>
      </Motion.section>
    </div>
  );
}
