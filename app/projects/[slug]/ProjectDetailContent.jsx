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
  Monitor,
  Smartphone,
  Layers,
  Cpu,
  Zap
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
  const [activeDeviceView, setActiveDeviceView] = useState('desktop'); // 'desktop' | 'mobile'

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
      {/* 1. STICKY TOP HUD CONTROLS (Compact, responsive, zero collision)         */}
      {/* ========================================================================= */}
      <div className="sticky top-4 sm:top-6 z-40 px-4 sm:px-8 max-w-7xl mx-auto pointer-events-none mb-4 sm:mb-6">
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
            <span className="hidden sm:inline text-white/70 text-xs font-mono truncate max-w-[150px] lg:max-w-[260px]">
              {project.title}
            </span>

            <span className="px-2 py-0.5 rounded bg-[var(--accent-bg-subtle)] border border-[var(--accent-border)] text-[10px] text-[var(--accent-color)] font-bold">
              {project.num}
            </span>
          </div>

          {/* Dynamic Scroll Progress HUD */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-[280px] lg:max-w-[340px] px-2">
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
      </div>

      {/* ========================================================================= */}
      {/* 2. PROJECT HERO & IMPACT METRICS                                          */}
      {/* ========================================================================= */}
      <section className="pt-6 sm:pt-10 pb-10 sm:pb-14 px-6 sm:px-12 max-w-7xl mx-auto space-y-8 sm:space-y-10">
        <div className="space-y-4 sm:space-y-5">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-mono">
            <span className="px-2.5 py-1 rounded bg-[var(--accent-bg-subtle)] border border-[var(--accent-border)] text-[var(--accent-color)] font-bold">
              // {project.category}
            </span>
            <span className="text-white/40">
              [ENTRY_ID: {project.id}]
            </span>
            <span className="text-white/40">
              [YEAR: {project.dossier?.entryYear || '2025'}]
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {project.status || 'DEPLOYED'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--heading-tint)] font-display tracking-tight leading-tight">
            {project.title}
          </h1>

          {project.tagline && (
            <p className="text-base sm:text-xl text-[var(--accent-color)] font-mono leading-relaxed max-w-4xl">
              &gt; {project.tagline}
            </p>
          )}
        </div>

        {/* Quick Metrics Bar (Spacious 4-column cards with room to breathe) */}
        {project.walkthrough?.impact?.metrics && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
            {project.walkthrough.impact.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#06090D]/80 border border-white/10 hover:border-[var(--accent-border)] transition-colors text-center space-y-1.5 shadow-lg"
              >
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--accent-color)] font-display leading-tight">
                  {m.value}
                </span>
                <span className="block text-[10px] sm:text-xs text-white/50 font-mono tracking-widest uppercase">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 3. HERO PRODUCT SHOWCASE VIEWPORT (Clean, honest, beautiful artwork)       */}
      {/* ========================================================================= */}
      <section className="py-6 sm:py-10 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="cyber-panel rounded-3xl overflow-hidden border border-white/15 bg-[#020406] shadow-2xl relative">
          {/* Top Preview Header - Clean, professional, no fake buttons */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-black/60 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-bold font-mono tracking-wider uppercase text-white/90">
                PRODUCT_SHOWCASE // PRODUCTION_BUILD
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-white/50 font-mono hidden sm:inline">
                {project.dossier?.targetPlatform || 'Web & Mobile'}
              </span>
              <span className="text-[10px] sm:text-xs px-2.5 py-1 rounded bg-[var(--accent-bg-subtle)] border border-[var(--accent-border)] text-[var(--accent-color)] font-bold font-mono">
                [VERIFIED_STABLE]
              </span>
            </div>
          </div>

          {/* Main Visual Display */}
          <div className="relative min-h-[340px] sm:min-h-[500px] lg:min-h-[560px] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#030608] via-[#050B10] to-[#020406] p-4 sm:p-8 lg:p-12">
            <div className="relative w-full max-w-5xl">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_60px_rgba(0,0,0,0.85)] group">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top filter brightness-[0.95] group-hover:brightness-100 transition-all duration-700"
                  priority
                />

                {/* Subtle scanline texture */}
                <div className="absolute inset-0 scanlines-overlay opacity-20 pointer-events-none" />

                {/* Cyber Corner brackets */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[var(--accent-color)] pointer-events-none" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[var(--accent-color)] pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[var(--accent-color)] pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[var(--accent-color)] pointer-events-none" />

                {/* On-screen HUD Telemetry readout badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 text-xs font-mono">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-pulse" />
                    <span className="text-white/90 font-bold">{project.title}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] sm:text-xs text-white/50">
                    <span className="hidden sm:inline">ARCHITECTURE: PRODUCTION</span>
                    <span className="text-[var(--accent-color)] font-bold">[ONLINE]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SYSTEM DOSSIER & SPECIFICATIONS BENTO GRID (Generous spacing, NO truncate) */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Mission & Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="cyber-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 bg-[#04070A]/85 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h2 className="text-xs font-bold text-white/50 tracking-widest uppercase font-mono">
                  [ 01 // MISSION STATEMENT & ARCHITECTURE ]
                </h2>
                <span className="text-[10px] text-[var(--accent-color)] font-mono font-bold">OVERVIEW</span>
              </div>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-sans">
                {project.overview?.lead || project.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                  <span className="text-[10px] text-[var(--accent-color)] font-mono uppercase tracking-wider block font-bold">
                    {lang === 'ru' ? '// ЦЕЛЕВАЯ АУДИТОРИЯ' : '// TARGET_AUDIENCE'}
                  </span>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                    {project.overview?.targetAudience || 'Modern users & enterprise clients'}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                  <span className="text-[10px] text-[var(--accent-color)] font-mono uppercase tracking-wider block font-bold">
                    {lang === 'ru' ? '// РОЛЬ ДИАСА' : '// DIAS_ROLE'}
                  </span>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                    {project.dossier?.primaryRole || 'Lead Frontend & Mobile Engineer'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: System Dossier Specifications (5 cols - fully visible) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="cyber-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-subtle)] bg-[#040608]/90 backdrop-blur-xl shadow-2xl space-y-6">
              {/* Dossier Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-[var(--accent-color)]" />
                  <span className="text-xs font-bold text-white tracking-widest uppercase font-mono">
                    SYSTEM_DOSSIER // SPEC
                  </span>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded bg-[var(--accent-bg-subtle)] text-[var(--accent-color)] font-bold font-mono">
                  {project.dossier?.status || 'VERIFIED'}
                </span>
              </div>

              {/* Dossier Specs List - Completely readable, wrap properly without clipping */}
              <ul className="space-y-4 text-xs font-mono">
                <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/5 pb-3">
                  <span className="text-white/40 tracking-wider">[ PROJECT_TYPE ]</span>
                  <span className="sm:text-right text-white font-bold">
                    {project.dossier?.projectType || project.category}
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/5 pb-3">
                  <span className="text-white/40 tracking-wider">[ ENTRY_YEAR ]</span>
                  <span className="sm:text-right text-[var(--accent-color)] font-bold">
                    {project.dossier?.entryYear || '2025'}
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/5 pb-3">
                  <span className="text-white/40 tracking-wider">[ TARGET_PLATFORM ]</span>
                  <span className="sm:text-right text-white font-bold">
                    {project.dossier?.targetPlatform || 'Web & Mobile'}
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/5 pb-3">
                  <span className="text-white/40 tracking-wider">[ PRIMARY_ROLE ]</span>
                  <span className="sm:text-right text-white font-bold">
                    {project.dossier?.primaryRole || 'Lead Engineer'}
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
                  <span className="text-white/40 tracking-wider">[ ACCESS_TYPE ]</span>
                  <span className="sm:text-right font-bold">
                    {project.isPrivate ? (
                      <span className="text-amber-400">PROPRIETARY / PRIVATE</span>
                    ) : (
                      <span className="text-[var(--accent-color)]">OPEN_SOURCE</span>
                    )}
                  </span>
                </li>
              </ul>

              {/* Deployed Technologies */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <span className="text-[10px] text-white/40 tracking-widest uppercase font-mono block">
                  DEPLOYED_TECHNOLOGIES
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
                    PROJECT_COLOR_PALETTE
                  </span>
                  <div className="grid grid-cols-4 gap-2">
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
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CASE STUDY DEEP DIVE (Chapters: Concept, Architecture, Features)       */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-18 px-6 sm:px-12 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display uppercase tracking-wide">
              {lang === 'ru' ? 'АРХИТЕКТУРНЫЙ КЕЙС-СТАДИ' : 'ENGINEERING CASE STUDY'}
            </h2>
            <p className="text-xs text-white/50 font-mono mt-1">
              [ CHAPTER_BREAKDOWN // IN-DEPTH TECHNICAL REPORT ]
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
                  ? lang === 'ru' ? '01 КОНЦЕПЦИЯ' : '01 CONCEPT'
                  : tab === 'architecture'
                  ? lang === 'ru' ? '02 АРХИТЕКТУРА' : '02 ARCHITECTURE'
                  : lang === 'ru' ? '03 ФИЧИ' : '03 FEATURES'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'concept' && (
            <Motion.div
              key="concept"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs text-[var(--accent-color)] font-mono tracking-widest uppercase">
                  // 01 // THE_CONCEPT_&_CHALLENGE
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  {project.walkthrough?.concept?.title || 'Core Product Vision'}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-sans">
                  {project.walkthrough?.concept?.desc || project.description}
                </p>

                {project.overview?.challenge && (
                  <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                    <span className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider block">
                      [ THE_PRIMARY_CHALLENGE ]
                    </span>
                    <p className="text-sm text-white/80 leading-relaxed font-sans">
                      {project.overview.challenge}
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs text-white/40 font-mono tracking-widest uppercase block">
                  [ KEY_MILESTONES ]
                </span>
                {(project.walkthrough?.concept?.highlights || [
                  'High accessibility standards',
                  'Frictionless responsive UX',
                  'Instant state reactivity'
                ]).map((h, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[var(--accent-border)] transition-colors"
                  >
                    <span className="text-[var(--accent-color)] font-bold text-sm">0{idx + 1}.</span>
                    <span className="text-sm text-white/85 font-sans leading-snug">{h}</span>
                  </div>
                ))}
              </div>
            </Motion.div>
          )}

          {activeTab === 'architecture' && (
            <Motion.div
              key="architecture"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs text-[var(--accent-color)] font-mono tracking-widest uppercase">
                  // 02 // ARCHITECTURE_&_EXECUTION
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  {project.walkthrough?.architecture?.title || 'System Implementation'}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-sans">
                  {project.walkthrough?.architecture?.desc || project.overview?.solution}
                </p>

                {project.overview?.solution && (
                  <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                    <span className="text-xs font-bold text-[var(--accent-color)] font-mono uppercase tracking-wider block">
                      [ APPLIED_SOLUTION ]
                    </span>
                    <p className="text-sm text-white/80 leading-relaxed font-sans">
                      {project.overview.solution}
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs text-white/40 font-mono tracking-widest uppercase block">
                  [ ARCHITECTURAL_PILLARS ]
                </span>
                {(project.walkthrough?.architecture?.highlights || [
                  'Decoupled domain architecture',
                  'Optimized network payloads',
                  'Continuous testing coverage'
                ]).map((h, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[var(--accent-border)] transition-colors"
                  >
                    <Layers className="w-4 h-4 text-[var(--accent-color)] shrink-0 mt-0.5" />
                    <span className="text-sm text-white/85 font-sans leading-snug">{h}</span>
                  </div>
                ))}
              </div>
            </Motion.div>
          )}

          {activeTab === 'features' && (
            <Motion.div
              key="features"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {(project.walkthrough?.features || [
                { num: '01', title: 'Real-Time Sync', desc: 'Instantaneous data propagation across clients.', metric: 'Sub-50ms' },
                { num: '02', title: 'Adaptive Interface', desc: 'Responsive UX tailored for every viewport.', metric: 'Universal' },
                { num: '03', title: 'Hardened Security', desc: 'Token encryption and strict authorization guards.', metric: 'Zero-Trust' }
              ]).map((f, idx) => (
                <div
                  key={idx}
                  className="cyber-panel p-6 rounded-2xl border border-white/10 hover:border-[var(--accent-border)] transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-2xl font-black text-[var(--accent-color)] font-display">
                        {f.num}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-white/60 font-mono">
                        {f.metric}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white font-display">{f.title}</h4>
                    <p className="text-xs text-white/70 font-sans leading-relaxed">{f.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-[10px] text-[var(--accent-color)] font-mono">
                    <Zap className="w-3 h-3" />
                    <span>PRODUCTION_OPTIMIZED</span>
                  </div>
                </div>
              ))}
            </Motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ========================================================================= */}
      {/* 6. RESPONSIVE MULTI-DEVICE VIEWPORTS (Desktop Frame vs Mobile Frame)      */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-18 px-6 sm:px-12 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-sans uppercase">
              {lang === 'ru' ? 'Адаптивная верстка и мультивидовая витрина' : 'Responsive Multi-Device Layouts'}
            </h2>
            <p className="text-xs text-white/40 font-mono mt-0.5">
              [ CROSS-DEVICE COMPATIBILITY VIEWPORT INSPECTOR ]
            </p>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              onClick={() => {
                playClick();
                setActiveDeviceView('desktop');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                activeDeviceView === 'desktop'
                  ? 'bg-[var(--accent-color)] text-[#040608]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>DESKTOP (16:9)</span>
            </button>
            <button
              onClick={() => {
                playClick();
                setActiveDeviceView('mobile');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                activeDeviceView === 'mobile'
                  ? 'bg-[var(--accent-color)] text-[#040608]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>MOBILE (9:19.5)</span>
            </button>
          </div>
        </div>

        {/* Viewport Display Area */}
        <div className="flex justify-center items-center py-6">
          {activeDeviceView === 'desktop' ? (
            /* Desktop Browser Mockup Frame */
            <div className="w-full max-w-5xl rounded-2xl overflow-hidden border border-white/20 bg-[#0A0D10] shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
              {/* Browser chrome top bar */}
              <div className="h-10 px-4 bg-[#12161B] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="px-6 py-1 rounded-md bg-black/50 border border-white/10 text-[11px] text-white/50 font-mono truncate max-w-xs sm:max-w-md">
                  https://daelijek-portfolio.vercel.app/projects/{project.slug}
                </div>
                <div className="text-[10px] text-white/30 font-mono">1920 x 1080</div>
              </div>

              {/* Viewport image */}
              <div className="relative w-full aspect-[16/10] bg-[#020406]">
                <Image
                  src={project.image}
                  alt={`${project.title} Desktop View`}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          ) : (
            /* Mobile Device Mockup Frame */
            <div className="w-[300px] sm:w-[340px] rounded-[44px] p-3.5 bg-[#1A1F26] border-2 border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative">
              {/* Phone Speaker / Dynamic Island notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-20 flex items-center justify-end px-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0E1318] border border-white/10" />
              </div>

              {/* Screen container */}
              <div className="relative w-full aspect-[9/19.5] rounded-[34px] overflow-hidden bg-black border border-white/10">
                <Image
                  src={project.image}
                  alt={`${project.title} Mobile View`}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FULL-WIDTH NEXT PROJECT FOOTER WITH FLOATING CURSOR PREVIEW            */}
      {/* ========================================================================= */}
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
        className="group relative block w-full border-t border-white/15 pt-20 pb-36 px-6 sm:px-12 lg:px-16 overflow-hidden select-none bg-gradient-to-b from-transparent via-black/40 to-black/80 cursor-pointer"
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
              <div className="w-64 sm:w-72 aspect-[16/10] rounded-2xl overflow-hidden border-2 border-white/20 bg-[#06090D] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_25px_var(--accent-glow)] p-1.5 relative">
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

        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <span className="text-xs text-white/40 font-mono tracking-widest uppercase">
              [ UP_NEXT // CONTINUOUS_BROWSE ]
            </span>
            <span className="text-xs text-[var(--accent-color)] font-mono font-bold">
              // {nextProject.num}
            </span>
          </div>

          <div className="py-4 space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--accent-color)] font-display">
                [{nextProject.num}]
              </span>
              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display uppercase tracking-tight group-hover:text-[var(--accent-color)] transition-colors">
                {nextProject.title}
              </h3>
              <ArrowRight className="w-7 h-7 sm:w-10 sm:h-10 text-[var(--accent-color)] opacity-70 group-hover:opacity-100 group-hover:translate-x-3 transition-all inline-block ml-2" />
            </div>
            <p className="text-xs sm:text-sm text-white/50 font-mono">
              // {nextProject.category} · {nextProject.tags.join(' · ')}
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
    </div>
  );
}
