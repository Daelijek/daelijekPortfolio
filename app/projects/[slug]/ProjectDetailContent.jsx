'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useThemeAudio } from '../../../src/context/ThemeAudioContext';
import { portfolioContent } from '../../../src/data/portfolioData';
import {
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Layers,
  Cpu
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

export default function ProjectDetailContent({ slug: propSlug }) {
  const params = useParams();
  const slug = propSlug || params?.slug;
  const { lang, playHover, playClick } = useThemeAudio();
  const content = portfolioContent[lang] || portfolioContent.en;
  const projectsData = content.projects;

  // Find project by slug
  const project = useMemo(() => {
    const featuredMatch = projectsData.featured.find((p) => p.slug === slug || p.id.toLowerCase() === slug);
    if (featuredMatch) return featuredMatch;

    const otherMatch = projectsData.otherProjects.find((p) => p.slug === slug || p.id.toLowerCase() === slug);
    if (otherMatch) {
      // Create fallback dossier structure for secondary projects
      return {
        num: otherMatch.id,
        id: otherMatch.id,
        slug: otherMatch.slug || otherMatch.id.toLowerCase(),
        title: otherMatch.title,
        tagline: otherMatch.desc,
        category: 'Archive Experiment / Utility',
        isPrivate: false,
        description: otherMatch.desc,
        tags: otherMatch.tags,
        image: '/assets/Finance.png',
        liveUrl: otherMatch.url,
        githubUrl: otherMatch.url,
        status: 'ARCHIVE_SPECIMEN',
        dossier: {
          projectType: 'System Utility & Experiment',
          entryYear: '2023 - 2024',
          targetPlatform: 'Terminal / Web / Desktop',
          primaryRole: 'Software Engineer',
          technologies: {
            core: otherMatch.tags,
            backend: ['REST API', 'Data Pipeline'],
            aiCloud: ['Containerized'],
            tools: ['Git', 'CLI']
          },
          colorPalette: [
            { name: 'Cyber Neon', hex: '#00FF9F' },
            { name: 'Dark Void', hex: '#060A10' },
            { name: 'Slate Gray', hex: '#8E9CA8' }
          ],
          status: 'ARCHIVE_DEPLOYED'
        },
        overview: {
          lead: otherMatch.desc,
          targetAudience: 'Engineers, researchers, and system administrators seeking automated workflow utilities.',
          challenge: 'Streamlining repetitive processes with low-latency and lightweight execution overhead.',
          solution: 'Engineered a resilient standalone codebase adhering to clean code principles and distributed computing.',
          myRole: 'Architected and built the full application lifecycle, documentation, and repository pipeline.'
        },
        walkthrough: {
          concept: {
            title: 'Concept & Implementation',
            desc: otherMatch.desc,
            highlights: ['Minimal runtime footprint', 'Zero external heavy dependencies', 'Direct hardware/network telemetry']
          },
          architecture: {
            title: 'Architectural Pipeline',
            desc: 'Streamlined logic designed for fast execution, deterministic outputs, and modular extensions.',
            highlights: ['Clean decoupled module design', 'Structured error handling', 'High-throughput data parsing']
          },
          features: [
            { num: '01', title: 'Modular Design', desc: 'Plug-and-play architecture for rapid integration into larger workflows.', metric: 'Sub-10ms' },
            { num: '02', title: 'Telemetry Readout', desc: 'Direct status logs and real-time execution feedback.', metric: '100% Stable' }
          ],
          impact: {
            metrics: [
              { label: 'EXECUTION', value: '<10MS' },
              { label: 'STABILITY', value: '100%' },
              { label: 'MEMORY', value: '<25MB' },
              { label: 'UPTIME', value: '99.9%' }
            ]
          }
        }
      };
    }

    // Default fallback to first featured project
    return projectsData.featured[0];
  }, [slug, projectsData]);

  // Determine Next Project for bottom navigation
  const nextProject = useMemo(() => {
    const all = projectsData.featured;
    const currentIndex = all.findIndex((p) => p.slug === project.slug);
    if (currentIndex === -1 || currentIndex === all.length - 1) {
      return all[0];
    }
    return all[currentIndex + 1];
  }, [project, projectsData]);

  // Scroll Progress Tracker
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('concept');

  // Cursor Following Preview for Next Project Footer
  const [isNextHovered, setIsNextHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const nextSectionRef = useRef(null);

  const handleNextMouseMove = (e) => {
    if (!nextSectionRef.current) return;
    const rect = nextSectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        setScrollProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      const progress = Math.min(100, Math.max(0, Math.round((currentScroll / totalScroll) * 100)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-white font-mono selection:bg-[var(--accent-color)] selection:text-[#040608]">
      {/* ========================================================================= */}
      {/* 1. STICKY TOP HUD CONTROLS (Aligned with content section margins)          */}
      {/* ========================================================================= */}
      <Motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-4 sm:top-6 z-40 px-6 sm:px-10 lg:px-16 xl:px-24 max-w-[1720px] mx-auto pointer-events-none mb-4 sm:mb-6"
      >
        <div className="pointer-events-auto flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-2xl bg-[#040608]/92 backdrop-blur-2xl border border-white/10 shadow-2xl">
          {/* Breadcrumbs & Back Button */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs shrink-0">
            <Link
              href="/projects"
              onClick={playClick}
              onMouseEnter={playHover}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-[var(--accent-color)] transition-all group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold tracking-wider uppercase text-[10px] sm:text-[11px]">
                {lang === 'ru' ? 'ПРОЕКТЫ' : 'PROJECTS'}
              </span>
            </Link>

            <span className="hidden sm:inline text-white/30 text-xs">/</span>
            <span className="hidden sm:inline text-white/70 text-xs font-mono truncate max-w-[150px] lg:max-w-[320px]">
              {project.title}
            </span>

            <span className="px-2 py-0.5 rounded bg-[var(--accent-bg-subtle)] border border-[var(--accent-border)] text-[10px] text-[var(--accent-color)] font-bold">
              {project.num}
            </span>
          </div>

          {/* Dynamic Scroll Progress HUD */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-[280px] lg:max-w-[400px] px-2">
            <span className="text-[10px] sm:text-[11px] text-white/40 font-mono tracking-widest w-6 text-right">
              {String(scrollProgress).padStart(2, '0')}
            </span>
            <div className="relative flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="absolute left-[25%] top-0 bottom-0 w-[1px] bg-white/20 z-10" />
              <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-white/20 z-10" />
              <div className="absolute left-[75%] top-0 bottom-0 w-[1px] bg-white/20 z-10" />
              <div
                className="h-full bg-[var(--accent-color)] shadow-[0_0_12px_var(--accent-glow)] transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <span className="text-[10px] sm:text-[11px] text-[var(--accent-color)] font-mono font-bold tracking-widest w-7">
              100
            </span>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-color)] text-[#040608] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_var(--accent-glow)] transition-all hover:scale-105 active:scale-95"
              >
                <span>{lang === 'ru' ? 'ДЕМО' : 'LIVE SITE'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.isPrivate ? (
              <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-[10px] text-white/50 font-mono tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
                <span className="hidden xs:inline">{lang === 'ru' ? 'ПРИВАТНЫЙ' : 'PRIVATE'}</span>
              </span>
            ) : project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white font-bold text-xs tracking-wider uppercase transition-all"
              >
                <FaGithub className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === 'ru' ? 'КОД' : 'CODE'}</span>
              </a>
            ) : null}
          </div>
        </div>
      </Motion.div>

      {/* ========================================================================= */}
      {/* 2. PROJECT HERO & IMPACT METRICS (Full-Width, Proportional Typography)    */}
      {/* ========================================================================= */}
      <Motion.section
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="pt-6 sm:pt-10 pb-10 sm:pb-14 px-6 sm:px-10 lg:px-16 xl:px-24 max-w-[1720px] mx-auto space-y-8 sm:space-y-10"
      >
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/90 font-medium">
              {project.category}
            </span>
            <span className="text-white/40 text-xs">
              {project.dossier?.entryYear || '2025'}
            </span>
            <span className="text-emerald-400 font-medium flex items-center gap-1.5 ml-auto sm:ml-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {project.status || 'DEPLOYED'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-tight">
            {project.title}
          </h1>

          {project.tagline && (
            <p className="text-base sm:text-lg lg:text-xl text-white/70 font-sans leading-relaxed max-w-4xl mt-2">
              {project.tagline}
            </p>
          )}
        </div>

        {/* Quick Metrics Bar (Wide 4-column cards with refined typography and staggered reveal) */}
        {project.walkthrough?.impact?.metrics && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 pt-2">
            {project.walkthrough.impact.metrics.map((m, idx) => (
              <Motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.06 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 sm:p-6 rounded-2xl bg-[#06090D]/80 border border-white/[0.08] hover:border-[var(--accent-color)]/40 transition-colors text-center space-y-1 shadow-lg"
              >
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--accent-color)] font-display leading-tight">
                  {m.value}
                </span>
                <span className="block text-[11px] sm:text-xs text-white/50 font-mono tracking-widest uppercase">
                  {m.label}
                </span>
              </Motion.div>
            ))}
          </div>
        )}
      </Motion.section>

      {/* ========================================================================= */}
      {/* 3. HERO PRODUCT SHOWCASE VIEWPORT (Wide, cinema-scale artwork)             */}
      {/* ========================================================================= */}
      <Motion.section
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="py-4 sm:py-8 px-6 sm:px-10 lg:px-16 xl:px-24 max-w-[1720px] mx-auto"
      >
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#03060A]/80 backdrop-blur-xl shadow-2xl p-3 sm:p-5 lg:p-7">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      </Motion.section>

      {/* ========================================================================= */}
      {/* 4. SYSTEM DOSSIER & SPECIFICATIONS BENTO GRID (Equal Height & Cohesion)    */}
      {/* ========================================================================= */}
      <Motion.section
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="py-12 sm:py-16 px-6 sm:px-10 lg:px-16 xl:px-24 max-w-[1720px] mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Mission & Narrative (7 cols) - Stretches to equal height */}
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col h-full"
          >
            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl border border-white/[0.08] flex flex-col justify-between h-full bg-[#04070A]/85 backdrop-blur-md shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <h2 className="text-xs font-bold text-[var(--accent-color)] tracking-wider uppercase font-mono">
                    {lang === 'ru' ? 'Обзор проекта' : lang === 'kk' ? 'Жоба шолуы' : 'Project Overview'}
                  </h2>
                </div>

                <p className="text-base sm:text-lg leading-relaxed text-white/80 font-sans">
                  {project.overview?.lead || project.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-6 mt-6 border-t border-white/[0.06]">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <span className="text-xs text-[var(--accent-color)] font-mono uppercase tracking-wider block font-bold">
                    {lang === 'ru' ? 'Целевая аудитория' : lang === 'kk' ? 'Мақсатты аудитория' : 'Target Audience'}
                  </span>
                  <p className="text-sm text-white/80 leading-relaxed font-sans">
                    {project.overview?.targetAudience || 'Modern users & enterprise clients'}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <span className="text-xs text-[var(--accent-color)] font-mono uppercase tracking-wider block font-bold">
                    {lang === 'ru' ? 'Зона ответственности' : lang === 'kk' ? 'Жауапкершілік саласы' : 'Role & Scope'}
                  </span>
                  <p className="text-sm text-white/80 leading-relaxed font-sans">
                    {project.overview?.myRole || project.dossier?.primaryRole || 'Lead Frontend & Mobile Engineer'}
                  </p>
                </div>
              </div>
            </div>
          </Motion.div>

          {/* Right Column: System Dossier Specifications (5 cols - Equal height match) */}
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col h-full"
          >
            <div className="cyber-panel p-6 sm:p-8 lg:p-10 rounded-3xl border border-white/[0.08] bg-[#040608]/90 backdrop-blur-xl shadow-2xl flex flex-col justify-between h-full space-y-6">
              {/* Dossier Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-[var(--accent-color)]" />
                  <span className="text-xs font-bold text-white tracking-wider uppercase font-mono">
                    {lang === 'ru' ? 'Спецификация' : lang === 'kk' ? 'Спецификация' : 'Technical Dossier'}
                  </span>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded bg-[var(--accent-bg-subtle)] text-[var(--accent-color)] font-bold font-mono">
                  {project.dossier?.status || 'VERIFIED'}
                </span>
              </div>

              {/* Dossier Specs List - Completely readable, wrap properly without clipping */}
              <ul className="space-y-4 text-xs font-mono">
                <li className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 border-b border-white/5 pb-3">
                  <span className="text-white/40 tracking-wider shrink-0 whitespace-nowrap">
                    {lang === 'ru' ? 'Тип проекта' : lang === 'kk' ? 'Жоба түрі' : 'Project Type'}
                  </span>
                  <span className="sm:text-right text-white font-bold leading-relaxed">
                    {project.dossier?.projectType || project.category}
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 border-b border-white/5 pb-3">
                  <span className="text-white/40 tracking-wider shrink-0 whitespace-nowrap">
                    {lang === 'ru' ? 'Год реализации' : lang === 'kk' ? 'Жыл' : 'Timeline'}
                  </span>
                  <span className="sm:text-right text-[var(--accent-color)] font-bold">
                    {project.dossier?.entryYear || '2025'}
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 border-b border-white/5 pb-3">
                  <span className="text-white/40 tracking-wider shrink-0 whitespace-nowrap">
                    {lang === 'ru' ? 'Платформа' : lang === 'kk' ? 'Платформа' : 'Platform'}
                  </span>
                  <span className="sm:text-right text-white font-bold leading-relaxed">
                    {project.dossier?.targetPlatform || 'Web & Mobile'}
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 border-b border-white/5 pb-3">
                  <span className="text-white/40 tracking-wider shrink-0 whitespace-nowrap">
                    {lang === 'ru' ? 'Роль' : lang === 'kk' ? 'Рөлі' : 'Role'}
                  </span>
                  <span className="sm:text-right text-white font-bold leading-relaxed">
                    {project.dossier?.primaryRole || 'Lead Engineer'}
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 pb-1">
                  <span className="text-white/40 tracking-wider shrink-0 whitespace-nowrap">
                    {lang === 'ru' ? 'Доступ' : lang === 'kk' ? 'Қолжетімділік' : 'Access'}
                  </span>
                  <span className="sm:text-right font-bold">
                    {project.isPrivate ? (
                      <span className="text-amber-400 font-sans text-xs">
                        {lang === 'ru' ? 'Закрытый / Корпоративный' : lang === 'kk' ? 'Жабық / Корпоративтік' : 'Proprietary / Private'}
                      </span>
                    ) : (
                      <span className="text-[var(--accent-color)] font-sans text-xs">
                        {lang === 'ru' ? 'Открытый исходный код' : lang === 'kk' ? 'Ашық бастапқы код' : 'Open Source'}
                      </span>
                    )}
                  </span>
                </li>
              </ul>

              {/* Deployed Technologies */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <span className="text-[10px] text-white/40 tracking-widest uppercase font-mono block">
                  {lang === 'ru' ? 'Стек технологий' : lang === 'kk' ? 'Технологиялық стек' : 'Technologies'}
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white/90 font-mono hover:border-[var(--accent-border)] hover:text-[var(--accent-color)] transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Color Palette Swatches */}
              {project.dossier?.colorPalette && (
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <span className="text-[10px] text-white/40 tracking-widest uppercase font-mono block">
                    {lang === 'ru' ? 'Цветовая палитра' : lang === 'kk' ? 'Түс палитрасы' : 'Color Palette'}
                  </span>
                  <div className="grid grid-cols-4 gap-2.5">
                    {project.dossier.colorPalette.map((c, idx) => (
                      <div
                        key={idx}
                        className="group flex flex-col items-center gap-1.5 p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all"
                      >
                        <div
                          className="w-full h-8 rounded-lg border border-white/10 shadow-sm group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-[10px] text-white/50 font-mono truncate w-full text-center">
                          {c.hex}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Motion.div>
        </div>
      </Motion.section>

      {/* ========================================================================= */}
      {/* 5. CASE STUDY DEEP DIVE (Chapters: Concept, Architecture, Features)       */}
      {/* ========================================================================= */}
      <Motion.section
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="py-14 sm:py-18 px-6 sm:px-10 lg:px-16 xl:px-24 max-w-[1720px] mx-auto space-y-8 sm:space-y-10"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-wide">
              {lang === 'ru' ? 'Архитектурный кейс-стади' : lang === 'kk' ? 'Архитектуралық кейс-стади' : 'Engineering Case Study'}
            </h2>
            <p className="text-xs text-white/50 font-mono mt-1">
              {lang === 'ru'
                ? 'Детальный разбор архитектурных и инженерных решений'
                : lang === 'kk'
                ? 'Сәулет және инженерлік шешімдердің толық талдауы'
                : 'In-depth breakdown of architectural and engineering decisions'}
            </p>
          </div>

          {/* Tab Index Navigation */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 font-mono text-xs">
            {['concept', 'architecture', 'features'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  playClick();
                  setActiveTab(tab);
                }}
                onMouseEnter={playHover}
                className={`px-3.5 py-1.5 rounded-lg font-bold tracking-wider uppercase transition-all ${
                  activeTab === tab
                    ? 'bg-[var(--accent-color)] text-[#040608] shadow-[0_0_15px_var(--accent-glow)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab === 'concept'
                  ? lang === 'ru' ? '01 Концепция' : lang === 'kk' ? '01 Концепция' : '01 Concept'
                  : tab === 'architecture'
                  ? lang === 'ru' ? '02 Архитектура' : lang === 'kk' ? '02 Архитектура' : '02 Architecture'
                  : lang === 'ru' ? '03 Возможности' : lang === 'kk' ? '03 Мүмкіндіктер' : '03 Features'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="relative w-full rounded-3xl border border-white/[0.08] bg-[#04070B]/90 backdrop-blur-xl shadow-2xl p-6 sm:p-8 lg:p-10 flex flex-col justify-start">
          <AnimatePresence mode="wait">
            {activeTab === 'concept' && (
              <Motion.div
                key="concept"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="w-full flex flex-col"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                  {/* Left Column: Narrative & Primary Challenge */}
                  <div className="lg:col-span-7 flex flex-col space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-display tracking-tight leading-tight">
                        {project.walkthrough?.concept?.title || 'Core Product Vision'}
                      </h3>
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans">
                        {project.walkthrough?.concept?.desc || project.description}
                      </p>
                    </div>

                    {/* Integrated Problem Space Pod */}
                    {project.overview?.challenge && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                        <span className="text-xs font-bold text-[var(--accent-color)] font-mono uppercase tracking-wider block">
                          {lang === 'ru' ? 'Основной вызов' : 'The Challenge'}
                        </span>
                        <p className="text-sm text-white/80 leading-relaxed font-sans">
                          {project.overview.challenge}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Key Milestones */}
                  <div className="lg:col-span-5 flex flex-col space-y-3">
                    <span className="text-xs text-white/50 font-mono tracking-wider uppercase font-bold">
                      {lang === 'ru' ? 'Ключевые ориентиры' : 'Key Highlights'}
                    </span>

                    <div className="flex flex-col space-y-2.5">
                      {(project.walkthrough?.concept?.highlights || [
                        'High accessibility standards',
                        'Frictionless responsive UX',
                        'Instant state reactivity'
                      ]).map((h, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[var(--accent-color)]/30 transition-all group"
                        >
                          <span className="px-2 py-0.5 rounded bg-[var(--accent-color)]/10 text-[var(--accent-color)] font-mono font-bold text-xs shrink-0 mt-0.5">
                            0{idx + 1}
                          </span>
                          <span className="text-xs sm:text-sm text-white/85 font-sans leading-relaxed group-hover:text-white transition-colors">
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Motion.div>
            )}

            {activeTab === 'architecture' && (
              <Motion.div
                key="architecture"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="w-full flex flex-col"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                  {/* Left Column: Architecture & Execution */}
                  <div className="lg:col-span-7 flex flex-col space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-display tracking-tight leading-tight">
                        {project.walkthrough?.architecture?.title || 'System Implementation'}
                      </h3>
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans">
                        {project.walkthrough?.architecture?.desc || project.overview?.solution}
                      </p>
                    </div>

                    {/* Applied Solution Callout */}
                    {project.overview?.solution && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                        <span className="text-xs font-bold text-[var(--accent-color)] font-mono uppercase tracking-wider block">
                          {lang === 'ru' ? 'Инженерное решение' : 'Applied Solution'}
                        </span>
                        <p className="text-sm text-white/80 leading-relaxed font-sans">
                          {project.overview.solution}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Architectural Pillars */}
                  <div className="lg:col-span-5 flex flex-col space-y-3">
                    <span className="text-xs text-white/50 font-mono tracking-wider uppercase font-bold">
                      {lang === 'ru' ? 'Архитектурные опоры' : 'Architectural Pillars'}
                    </span>

                    <div className="flex flex-col space-y-2.5">
                      {(project.walkthrough?.architecture?.highlights || [
                        'Decoupled domain architecture',
                        'Optimized network payloads',
                        'Continuous testing coverage'
                      ]).map((h, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[var(--accent-color)]/30 transition-all group"
                        >
                          <div className="p-1 rounded-md bg-[var(--accent-color)]/10 text-[var(--accent-color)] shrink-0 mt-0.5">
                            <Layers className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs sm:text-sm text-white/85 font-sans leading-relaxed group-hover:text-white transition-colors">
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Motion.div>
            )}

            {activeTab === 'features' && (
              <Motion.div
                key="features"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="w-full flex flex-col"
              >
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
                  {(project.walkthrough?.features || [
                    { num: '01', title: 'Real-Time Sync', desc: 'Instantaneous data propagation across clients.', metric: 'Sub-50ms' },
                    { num: '02', title: 'Adaptive Interface', desc: 'Responsive UX tailored for every viewport.', metric: 'Universal' },
                    { num: '03', title: 'Hardened Security', desc: 'Token encryption and strict authorization guards.', metric: 'Zero-Trust' }
                  ]).map((f, idx) => (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[var(--accent-color)]/40 transition-all flex flex-col justify-between space-y-4 group shadow-md"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-xl sm:text-2xl font-black text-[var(--accent-color)] font-display">
                            {f.num}
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] text-white/70 font-mono font-bold">
                            {f.metric}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-white font-display group-hover:text-[var(--accent-color)] transition-colors">
                          {f.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </Motion.section>

      {/* ========================================================================= */}
      {/* 6. FULL-WIDTH NEXT PROJECT FOOTER WITH FLOATING CURSOR PREVIEW            */}
      {/* ========================================================================= */}
      <Motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full mt-16 sm:mt-24"
      >
        <Link
          href={`/projects/${nextProject.slug || nextProject.id.toLowerCase()}`}
          onClick={playClick}
          onMouseEnter={() => {
            playHover();
            setIsNextHovered(true);
          }}
          onMouseLeave={() => setIsNextHovered(false)}
          onMouseMove={handleNextMouseMove}
          ref={nextSectionRef}
          className="group relative block w-full border-t border-white/10 pt-16 sm:pt-20 pb-28 sm:pb-36 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden select-none bg-gradient-to-b from-transparent via-black/40 to-black/80 cursor-pointer"
        >
          {/* Floating Cursor Thumbnail Preview (Positioned directly above cursor with smooth spring) */}
          <AnimatePresence>
            {isNextHovered && (
              <Motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: mousePos.x,
                  y: mousePos.y - 24,
                  transition: { type: 'spring', damping: 26, stiffness: 260, mass: 0.4 },
                }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
                style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 35 }}
                className="hidden md:block -translate-x-1/2 -translate-y-full pointer-events-none select-none"
              >
                <div className="w-64 sm:w-72 aspect-[16/10] rounded-2xl overflow-hidden border border-white/20 bg-[#06090D] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_25px_var(--accent-glow)] p-1.5 relative">
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
                    <Image
                      src={nextProject.image}
                      alt={nextProject.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-mono text-white px-2 py-1 bg-black/85 backdrop-blur-md rounded-lg border border-white/15">
                      <span className="font-black text-[var(--accent-color)]">{nextProject.num}</span>
                      <span className="font-bold truncate text-[10px]">{nextProject.title}</span>
                      <span className="text-[9px] text-white/50 tracking-wider">PREVIEW</span>
                    </div>
                  </div>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>

          <div className="w-full max-w-[1720px] mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
              <span className="text-xs text-white/40 font-mono tracking-widest uppercase">
                {lang === 'ru' ? 'Следующий кейс' : lang === 'kk' ? 'Келесі жоба' : 'Next Case Study'}
              </span>
              <span className="text-xs text-[var(--accent-color)] font-mono font-bold">
                {nextProject.num}
              </span>
            </div>

            <div className="py-4 space-y-3">
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

            {/* Mobile Only: Inline preview card for touch devices without cursor hover */}
            <div className="block md:hidden mt-6 pt-6 border-t border-white/5">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/15">
                <Image
                  src={nextProject.image}
                  alt={nextProject.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Link>
      </Motion.div>
    </div>
  );
}

