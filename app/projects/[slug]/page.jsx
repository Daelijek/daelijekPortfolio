'use client';

import React, { useState, useEffect, useMemo } from 'react';
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

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug;
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
  const [previewPlaying, setPreviewPlaying] = useState(true);

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
      {/* 1. STICKY TOP HUD CONTROLS (Breadcrumbs, Scroll Progress, Actions)        */}
      {/* ========================================================================= */}
      <div className="sticky top-20 sm:top-24 z-40 px-4 sm:px-8 max-w-7xl mx-auto pointer-events-none">
        <div className="pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-[#040608]/85 backdrop-blur-xl border border-white/10 shadow-2xl">
          {/* Breadcrumbs & Back Button */}
          <div className="flex items-center gap-3 text-xs w-full md:w-auto justify-between md:justify-start">
            <Link
              href="/projects"
              onClick={playClick}
              onMouseEnter={playHover}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-[var(--accent-color)] transition-all group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold tracking-wider uppercase text-[11px]">
                {lang === 'ru' ? 'ПРОЕКТЫ' : 'PROJECTS'}
              </span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 text-white/30 text-[11px]">
              <span>/</span>
              <span className="text-white/60 truncate max-w-[140px] sm:max-w-[200px]">
                {project.title}
              </span>
            </div>

            <span className="px-2 py-0.5 rounded bg-[var(--accent-bg-subtle)] border border-[var(--accent-border)] text-[10px] text-[var(--accent-color)] font-bold">
              {project.num}
            </span>
          </div>

          {/* Dynamic Scroll Progress HUD */}
          <div className="flex items-center gap-3 w-full md:w-[320px] px-2">
            <span className="text-[11px] text-white/40 font-mono tracking-widest w-6 text-right">
              {String(scrollProgress).padStart(2, '0')}
            </span>
            <div className="relative flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              {/* Markers at 25%, 50%, 75% */}
              <div className="absolute left-[25%] top-0 bottom-0 w-[1px] bg-white/20 z-10" />
              <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-white/20 z-10" />
              <div className="absolute left-[75%] top-0 bottom-0 w-[1px] bg-white/20 z-10" />
              {/* Progress fill */}
              <div
                className="h-full bg-[var(--accent-color)] shadow-[0_0_12px_var(--accent-glow)] transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <span className="text-[11px] text-[var(--accent-color)] font-mono font-bold tracking-widest w-7">
              100
            </span>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--accent-color)] text-[#040608] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_var(--accent-glow)] transition-all hover:scale-105 active:scale-95"
              >
                <span>{lang === 'ru' ? 'ДЕМО' : 'LIVE SITE'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.isPrivate ? (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-[10px] text-white/50 font-mono tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
                <span>{lang === 'ru' ? 'ПРИВАТНЫЙ РЕПО' : 'PRIVATE'}</span>
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
      {/* 2. PROJECT HERO & SYSTEM DOSSIER SPECIFICATION                            */}
      {/* ========================================================================= */}
      <section className="pt-16 pb-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Project Overview & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-[var(--accent-bg-subtle)] border border-[var(--accent-border)] text-xs text-[var(--accent-color)] font-bold">
                // {project.category}
              </span>
              <span className="text-xs text-white/40 font-mono">
                [ENTRY_ID: {project.id}]
              </span>
              <span className="text-xs text-white/40 font-mono">
                [YEAR: {project.dossier?.entryYear || '2025'}]
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--heading-tint)] font-display tracking-tight leading-none">
              {project.title}
            </h1>

            {project.tagline && (
              <p className="text-sm sm:text-base text-[var(--accent-color)] font-mono leading-relaxed">
                &gt; {project.tagline}
              </p>
            )}

            <div className="cyber-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-5 bg-[#06080B]/70 backdrop-blur-md">
              <h2 className="text-xs text-white/40 tracking-widest uppercase font-mono border-b border-white/10 pb-2">
                [ MISSION_STATEMENT // PROJECT_OVERVIEW ]
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-sans">
                {project.overview?.lead || project.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5 text-xs font-sans">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] text-[var(--accent-color)] font-mono uppercase tracking-wider block">
                    {lang === 'ru' ? '// ДЛЯ КОГО' : '// TARGET_AUDIENCE'}
                  </span>
                  <p className="text-white/80 leading-snug">
                    {project.overview?.targetAudience || 'Modern users & enterprise clients'}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] text-[var(--accent-color)] font-mono uppercase tracking-wider block">
                    {lang === 'ru' ? '// РОЛЬ ДИАСА' : '// DIAS_ROLE'}
                  </span>
                  <p className="text-white/80 leading-snug">
                    {project.dossier?.primaryRole || 'Lead Frontend & Mobile Engineer'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            {project.walkthrough?.impact?.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {project.walkthrough.impact.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-black/40 border border-white/10 text-center space-y-1"
                  >
                    <span className="block text-xl sm:text-2xl font-black text-[var(--accent-color)] font-display leading-tight">
                      {m.value}
                    </span>
                    <span className="block text-[9px] sm:text-[10px] text-white/40 font-mono tracking-widest uppercase">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: System Dossier HUD Pod */}
          <div className="lg:col-span-5">
            <div className="cyber-panel p-6 sm:p-7 rounded-2xl border border-[var(--border-subtle)] bg-[#040608]/90 backdrop-blur-xl shadow-2xl space-y-6">
              {/* Dossier Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[var(--accent-color)]" />
                  <span className="text-xs font-bold text-white tracking-widest uppercase font-mono">
                    SYSTEM_DOSSIER // SPEC
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--accent-bg-subtle)] text-[var(--accent-color)] font-bold">
                  {project.dossier?.status || 'VERIFIED'}
                </span>
              </div>

              {/* Dossier Specs List */}
              <ul className="space-y-3.5 text-xs font-mono">
                <li className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-white/40">[ PROJECT_TYPE ]</span>
                  <span className="text-right text-white/90 font-bold max-w-[200px] truncate">
                    {project.dossier?.projectType || project.category}
                  </span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-white/40">[ ENTRY_YEAR ]</span>
                  <span className="text-right text-[var(--accent-color)] font-bold">
                    {project.dossier?.entryYear || '2025'}
                  </span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-white/40">[ TARGET_PLATFORM ]</span>
                  <span className="text-right text-white/90 font-bold max-w-[200px] truncate">
                    {project.dossier?.targetPlatform || 'Web & Mobile'}
                  </span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-white/40">[ PRIMARY_ROLE ]</span>
                  <span className="text-right text-white/90 font-bold max-w-[200px] truncate">
                    {project.dossier?.primaryRole || 'Lead Engineer'}
                  </span>
                </li>
                <li className="flex items-center justify-between pb-1">
                  <span className="text-white/40">[ ACCESS_TYPE ]</span>
                  <span className="text-right font-bold text-white/90">
                    {project.isPrivate ? (
                      <span className="text-amber-400">PROPRIETARY / PRIVATE</span>
                    ) : (
                      <span className="text-[var(--accent-color)]">OPEN_SOURCE</span>
                    )}
                  </span>
                </li>
              </ul>

              {/* Deployed Technologies */}
              <div className="space-y-2.5 pt-2 border-t border-white/10">
                <span className="text-[10px] text-white/40 tracking-widest uppercase font-mono block">
                  DEPLOYED_TECHNOLOGIES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white/80 font-mono hover:border-[var(--accent-border)] hover:text-[var(--accent-color)] transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Color Palette Swatches */}
              {project.dossier?.colorPalette && (
                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  <span className="text-[10px] text-white/40 tracking-widest uppercase font-mono block">
                    PROJECT_COLOR_PALETTE
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {project.dossier.colorPalette.map((c, idx) => (
                      <div
                        key={idx}
                        className="group flex flex-col items-center gap-1.5 p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all"
                      >
                        <div
                          className="w-full h-7 rounded-md border border-white/10 shadow-sm group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-[9px] text-white/50 font-mono truncate w-full text-center">
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
      {/* 3. DYNAMIC PRODUCT SHOWCASE PREVIEW (Interactive Product Promo Reel)      */}
      {/* ========================================================================= */}
      <section className="py-12 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="cyber-panel rounded-3xl overflow-hidden border border-white/15 bg-[#020406] shadow-2xl relative">
          {/* Top Preview Control Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-black/60 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold font-mono tracking-wider uppercase text-white/90">
                PRODUCT_SHOWCASE // REEL_VIEWPORT
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/40 font-mono hidden sm:inline">
                [60 FPS @ HARDWARE_ACCEL]
              </span>
              <button
                onClick={() => setPreviewPlaying(!previewPlaying)}
                className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-[var(--accent-color)] font-bold tracking-wider uppercase transition-colors"
              >
                {previewPlaying ? 'PAUSE' : 'PLAY'}
              </button>
            </div>
          </div>

          {/* Main Visual Display */}
          <div className="relative min-h-[380px] sm:min-h-[520px] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#030608] via-[#050B10] to-[#020406]">
            {/* Background Laser Scanline Sweep */}
            <div
              className={`absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-color)]/[0.06] to-transparent pointer-events-none ${
                previewPlaying ? 'animate-scan' : ''
              }`}
            />

            {/* Static Image with High-Tech Presentation Frame */}
            <div className="relative w-full max-w-4xl p-6 sm:p-10 flex flex-col items-center justify-center">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.8)] group">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top filter brightness-[0.92] group-hover:brightness-100 transition-all duration-700"
                  priority
                />

                {/* Scanlines layer */}
                <div className="absolute inset-0 scanlines-overlay opacity-30 pointer-events-none" />

                {/* Cyber Corner brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[var(--accent-color)] pointer-events-none" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[var(--accent-color)] pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[var(--accent-color)] pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[var(--accent-color)] pointer-events-none" />

                {/* On-screen HUD Telemetry readout badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-pulse" />
                    <span className="text-white/80 font-bold">{project.title}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-white/50">
                    <span className="hidden sm:inline">DPR: 2.0</span>
                    <span className="text-[var(--accent-color)] font-bold">[ONLINE]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CASE STUDY DEEP DIVE (PAGE_INDEX Chapters: Concept, Architecture, Features) */}
      {/* ========================================================================= */}
      <section className="py-16 px-6 sm:px-12 max-w-7xl mx-auto space-y-12">
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
      {/* 5. RESPONSIVE MULTI-DEVICE VIEWPORTS (Desktop Frame vs Mobile Frame)      */}
      {/* ========================================================================= */}
      <section className="py-16 px-6 sm:px-12 max-w-7xl mx-auto space-y-8">
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
                  https://daelijek.dev/projects/{project.slug}
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
      {/* 6. NEXT PROJECT INTERACTIVE TEASER CARD                                   */}
      {/* ========================================================================= */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <span className="text-xs text-white/40 font-mono tracking-widest uppercase">
            [ UP_NEXT // CONTINUOUS_BROWSE ]
          </span>
          <span className="text-xs text-[var(--accent-color)] font-mono">
            // {nextProject.num}
          </span>
        </div>

        <Link
          href={`/projects/${nextProject.slug || nextProject.id.toLowerCase()}`}
          onClick={playClick}
          onMouseEnter={playHover}
          className="cyber-panel block p-8 sm:p-12 rounded-3xl border border-white/10 hover:border-[var(--accent-border)] bg-gradient-to-r from-black/80 via-[#060A0E] to-black/80 transition-all group overflow-hidden relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-3 text-xs">
                <span className="text-2xl font-black text-[var(--accent-color)] font-display">
                  {nextProject.num}
                </span>
                <span className="text-white/40 font-mono">// {nextProject.category}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-display group-hover:text-[var(--accent-color)] transition-colors">
                {nextProject.title}
              </h3>

              <p className="text-sm text-white/60 font-sans max-w-2xl leading-relaxed">
                {nextProject.description}
              </p>

              <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent-color)] pt-2">
                <span>{lang === 'ru' ? 'ПЕРЕЙТИ К ПРОЕКТУ' : 'EXPLORE NEXT CASE STUDY'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>

            <div className="lg:col-span-4 relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10">
              <Image
                src={nextProject.image}
                alt={nextProject.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
