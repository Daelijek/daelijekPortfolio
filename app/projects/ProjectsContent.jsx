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
    <div className="min-h-screen pt-24 sm:pt-32 lg:pt-36 pb-36 px-6 sm:px-10 lg:px-16 xl:px-24 max-w-[1600px] mx-auto font-sans selection:bg-[var(--accent-color)] selection:text-[#040608]">
      {/* 1. TOP SECTION HEADER */}
      <Motion.div
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
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

      {/* 2. PAGE TITLE & SUBTITLE */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 sm:mb-16 space-y-3"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display uppercase tracking-tight leading-tight">
              {projects.title || 'FEATURED PROJECTS'}
            </h1>
            <p className="text-sm sm:text-base text-white/60 max-w-2xl mt-2 leading-relaxed">
              {projects.subtitle || 'High-performance web, mobile, and AI production architectures.'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-white/40 shrink-0 pb-1">
            <span className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[var(--accent-color)] font-bold">
              {projects.featured.length} {lang === 'ru' ? 'проекта' : 'PROJECTS'}
            </span>
          </div>
        </div>
      </Motion.div>

      {/* 3. CLEAN, PREMIUM FEATURED PROJECT CARDS */}
      <div className="space-y-10 sm:space-y-12 mb-32">
        {projects.featured.map((proj, idx) => {
          const metrics = proj.walkthrough?.impact?.metrics || [];
          const slug = proj.slug || proj.id.toLowerCase();

          return (
            <Motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/projects/${slug}`}
                onClick={playClick}
                onMouseEnter={playHover}
                className="group relative block rounded-3xl bg-[#05080D]/85 border border-white/[0.08] hover:border-[var(--accent-color)]/50 backdrop-blur-2xl transition-all duration-500 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_60px_-15px_var(--card-hover-glow)] p-6 sm:p-8 lg:p-10"
              >
                {/* Subtle Ambient Radial Glow on Hover */}
                <div
                  className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
                  style={{
                    background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)',
                  }}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Narrative, Category, Title, Stack & Metrics */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    {/* Top Meta Line: Clean Index & Category Badge */}
                    <div className="flex items-center justify-between gap-4 font-mono text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-lg sm:text-xl font-black text-[var(--accent-color)] font-display">
                          {proj.num}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/80 font-medium text-[11px] sm:text-xs">
                          {proj.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[11px] text-emerald-400/90 font-medium hidden sm:inline">
                          {proj.status || 'PRODUCTION'}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2.5">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight group-hover:text-[var(--accent-color)] transition-colors leading-tight">
                        {proj.title}
                      </h2>
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans max-w-2xl">
                        {proj.tagline || proj.description}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    {proj.tags && proj.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {proj.tags.slice(0, 5).map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/80 font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Key Metrics Row (Clean, readable, no visual noise) */}
                    {metrics.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-white/[0.06]">
                        {metrics.slice(0, 3).map((m, mIdx) => (
                          <div key={mIdx} className="min-w-0 space-y-0.5">
                            <span className="block text-lg sm:text-xl font-extrabold text-[var(--accent-color)] font-display truncate">
                              {m.value}
                            </span>
                            <span className="block text-[11px] text-white/50 font-mono uppercase tracking-wider truncate">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA Button */}
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold font-mono text-[var(--accent-color)] group-hover:gap-3 transition-all duration-300">
                        <span>{viewCaseText}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Generous, High-Fidelity UI Viewport */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 group-hover:border-[var(--accent-color)]/40 bg-[#020407] shadow-2xl transition-all duration-500">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        className="object-cover object-top filter brightness-[0.92] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                        sizes="(max-width: 1024px) 100vw, 550px"
                      />
                      {/* Gentle bottom shadow gradient to elevate image depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
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
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8"
      >
        <div className="border-b border-white/[0.08] pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/[0.05] text-[var(--accent-color)]">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-wide">
              {projects.otherTitle || archiveTitle}
            </h2>
          </div>
          <span className="text-xs text-white/50 font-mono font-medium">
            {projects.otherProjects?.length || 0} {lang === 'ru' ? 'проектов' : 'REPOS'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.otherProjects.map((mini, idx) => (
            <Motion.a
              key={mini.id}
              href={mini.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-6 rounded-2xl bg-[#05080D]/70 border border-white/[0.08] hover:border-[var(--accent-color)]/40 hover:bg-[#070C14]/90 transition-all duration-300 flex flex-col justify-between space-y-5 shadow-lg hover:shadow-[0_10px_30px_var(--card-hover-glow)]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[var(--accent-color)] font-mono font-bold tracking-wider">
                    {mini.id}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-[var(--accent-color)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[var(--accent-color)] transition-colors">
                  {mini.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed line-clamp-3">
                  {mini.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                {mini.tags.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-[10.5px] text-white/60 font-mono"
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
