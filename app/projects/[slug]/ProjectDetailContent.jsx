'use client';

import React, { useMemo, useRef, useState } from 'react';
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
  ShieldCheck,
  Cpu,
  Zap,
  Sparkles,
  CheckCircle2,
  Layers,
  Users,
  UserCheck
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
    const featuredMatch = projectsData.featured.find(
      (p) => p.slug === slug || p.id.toLowerCase() === slug
    );
    if (featuredMatch) return featuredMatch;

    const otherMatch = projectsData.otherProjects.find(
      (p) => p.slug === slug || p.id.toLowerCase() === slug
    );
    if (otherMatch) {
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
        status: 'ARCHIVE_DEPLOYED',
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
          status: 'DEPLOYED'
        },
        overview: {
          lead: otherMatch.desc,
          targetAudience: 'Engineers & Developers',
          challenge: 'Repetitive workflows with high execution overhead.',
          solution: 'Lightweight standalone architecture with minimal dependencies.',
          myRole: 'Full application development and deployment'
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

    return projectsData.featured[0];
  }, [slug, projectsData]);

  // Determine Next Project for footer
  const nextProject = useMemo(() => {
    const all = projectsData.featured;
    const currentIndex = all.findIndex((p) => p.slug === project.slug);
    if (currentIndex === -1 || currentIndex === all.length - 1) {
      return all[0];
    }
    return all[currentIndex + 1];
  }, [project, projectsData]);

  // Floating Cursor Preview for Next Project Footer
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

  const backText = lang === 'ru' ? 'Все проекты' : lang === 'kk' ? 'Барлық жобалар' : 'All Projects';
  const roleLabel = lang === 'ru' ? 'Роль' : lang === 'kk' ? 'Рөлі' : 'Role';
  const platformLabel = lang === 'ru' ? 'Платформа' : lang === 'kk' ? 'Платформа' : 'Platform';
  const yearLabel = lang === 'ru' ? 'Год' : lang === 'kk' ? 'Жыл' : 'Year';
  const challengeTitle = lang === 'ru' ? 'Проблема и контекст' : lang === 'kk' ? 'Мәселе және контекст' : 'The Challenge';
  const solutionTitle = lang === 'ru' ? 'Инженерное решение' : lang === 'kk' ? 'Инженерлік шешім' : 'The Solution';
  const audienceLabel = lang === 'ru' ? 'Целевая аудитория' : lang === 'kk' ? 'Мақсатты аудитория' : 'Target Audience';
  const archTitle = lang === 'ru' ? 'Архитектура и технологический стек' : lang === 'kk' ? 'Сәулет және технологиялық стек' : 'Architecture & Tech Stack';
  const featuresTitle = lang === 'ru' ? 'Ключевые возможности' : lang === 'kk' ? 'Негізгі мүмкіндіктер' : 'Core Capabilities';
  const nextCaseText = lang === 'ru' ? 'Следующий кейс' : lang === 'kk' ? 'Келесі жоба' : 'Next Case Study';

  return (
    <div className="min-h-screen text-white font-sans selection:bg-[var(--accent-color)] selection:text-[#040608] pb-32">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & BREADCRUMB (Proper breathing room from fixed nav)          */}
      {/* ========================================================================= */}
      <div className="pt-28 sm:pt-36 lg:pt-40 px-6 sm:px-10 lg:px-16 xl:px-24 max-w-[1500px] mx-auto">
        <Motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-10 sm:mb-14 font-mono text-xs"
        >
          {/* Back button link */}
          <Link
            href="/projects"
            onClick={playClick}
            onMouseEnter={playHover}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/70 hover:text-white transition-all group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold uppercase tracking-wider text-[11px] sm:text-xs">
              {backText}
            </span>
          </Link>

          {/* Right Meta & Actions */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/50 hidden sm:inline">
              {project.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:inline" />
            <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/25 font-bold text-[11px]">
              {project.num}
            </span>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-color)] text-[#040608] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_var(--accent-glow)] transition-all hover:scale-105 active:scale-95"
              >
                <span>{lang === 'ru' ? 'Демо' : 'Live'}</span>
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-bold transition-all"
              >
                <FaGithub className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === 'ru' ? 'Код' : 'Code'}</span>
              </a>
            )}
          </div>
        </Motion.div>

        {/* ========================================================================= */}
        {/* 2. PROJECT HERO (Clean Editorial Typography, No Cluttered Boxes)          */}
        {/* ========================================================================= */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 max-w-4xl mb-12 sm:mb-16"
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

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-tight uppercase">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-white/70 font-sans leading-relaxed">
            {project.tagline || project.description}
          </p>

          {/* Quick Specs Pill Row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-mono text-white/60">
            <div>
              <span className="text-white/40">{roleLabel}: </span>
              <span className="text-white font-medium">{project.dossier?.primaryRole || 'Lead Engineer'}</span>
            </div>
            <div>
              <span className="text-white/40">{platformLabel}: </span>
              <span className="text-white font-medium">{project.dossier?.targetPlatform || 'Mobile & Web'}</span>
            </div>
            <div>
              <span className="text-white/40">{yearLabel}: </span>
              <span className="text-white font-medium">{project.dossier?.entryYear || '2025'}</span>
            </div>
          </div>
        </Motion.div>

        {/* ========================================================================= */}
        {/* 3. SHOWCASE VIEWPORT (Clean, Elegant Browser Frame)                       */}
        {/* ========================================================================= */}
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 sm:mb-20"
        >
          <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#06090E] shadow-[0_20px_70px_rgba(0,0,0,0.85)]">
            {/* Minimalist Frame Top Bar */}
            <div className="px-5 py-3.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-white/40">
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
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#020407]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1500px) 100vw, 1500px"
              />
            </div>
          </div>
        </Motion.div>

        {/* ========================================================================= */}
        {/* 4. KEY IMPACT METRICS STRIP (Horizontal Flow, Clean & Spacious)           */}
        {/* ========================================================================= */}
        {project.walkthrough?.impact?.metrics && (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
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

        {/* ========================================================================= */}
        {/* 5. THE NARRATIVE: CHALLENGE & SOLUTION (2 Clear, Readable Columns)        */}
        {/* ========================================================================= */}
        <Motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 sm:mb-24 space-y-8"
        >
          {/* Section Introduction */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-[var(--accent-color)] tracking-wider uppercase">
              // CASE_STUDY_OVERVIEW
            </span>
            <p className="text-lg sm:text-2xl text-white font-display font-bold leading-relaxed max-w-4xl">
              {project.overview?.lead || project.description}
            </p>
          </div>

          {/* Two-Column Problem vs Solution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* The Challenge Column */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#06090E]/90 border border-white/[0.08] space-y-4">
              <div className="flex items-center gap-2.5 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{challengeTitle}</span>
              </div>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed font-sans">
                {project.overview?.challenge ||
                  'Managing fragmented financial workflows with slow mobile interactions and lack of automated insights.'}
              </p>
              {project.walkthrough?.concept?.highlights && (
                <ul className="space-y-2.5 pt-4 border-t border-white/[0.06] text-xs sm:text-sm text-white/70 font-sans">
                  {project.walkthrough.concept.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* The Solution Column */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#06090E]/90 border border-[var(--accent-color)]/30 space-y-4 relative overflow-hidden">
              <div className="flex items-center gap-2.5 text-[var(--accent-color)] font-mono text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-color)]" />
                <span>{solutionTitle}</span>
              </div>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed font-sans">
                {project.overview?.solution ||
                  'Engineered a high-performance React Native & FastAPI system with local encryption, modular API, and AI advisory.'}
              </p>
              {project.walkthrough?.architecture?.highlights && (
                <ul className="space-y-2.5 pt-4 border-t border-white/[0.06] text-xs sm:text-sm text-white/80 font-sans">
                  {project.walkthrough.architecture.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-color)] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Scope & Audience Context */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3.5">
              <Users className="w-4 h-4 text-[var(--accent-color)] shrink-0 mt-1" />
              <div className="space-y-1">
                <span className="block text-xs font-mono font-bold text-white/50 uppercase tracking-wider">
                  {audienceLabel}
                </span>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                  {project.overview?.targetAudience || 'Modern users seeking organized finance'}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3.5">
              <UserCheck className="w-4 h-4 text-[var(--accent-color)] shrink-0 mt-1" />
              <div className="space-y-1">
                <span className="block text-xs font-mono font-bold text-white/50 uppercase tracking-wider">
                  {roleLabel}
                </span>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                  {project.overview?.myRole || project.dossier?.primaryRole || 'Lead Frontend & Mobile Engineer'}
                </p>
              </div>
            </div>
          </div>
        </Motion.section>

        {/* ========================================================================= */}
        {/* 6. ARCHITECTURE & TECH STACK (Structured, Transparent Presentation)        */}
        {/* ========================================================================= */}
        <Motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 sm:mb-24 space-y-6"
        >
          <div className="border-b border-white/[0.08] pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Cpu className="w-4 h-4 text-[var(--accent-color)]" />
              <h2 className="text-lg sm:text-xl font-bold text-white font-display uppercase tracking-wide">
                {archTitle}
              </h2>
            </div>
            <span className="text-xs text-white/40 font-mono hidden sm:inline">
              PRODUCTION STACK
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Tech Tags & Categorized Stack (8 cols) */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#06090E]/90 border border-white/[0.08] space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-mono font-bold text-[var(--accent-color)] uppercase tracking-wider">
                  {lang === 'ru' ? 'Технологический стек' : 'Technologies & Libraries'}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed">
                  {project.walkthrough?.architecture?.desc ||
                    'Architected for high throughput, local offline resilience, and enterprise grade security.'}
                </p>
              </div>

              {/* All Tech Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white/85 font-mono hover:border-[var(--accent-color)]/50 hover:text-white transition-all"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Security & Reliability Callouts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-white/80 font-mono">
                    AES-256 &bull; TLS 1.3 &bull; GDPR Ready
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <Zap className="w-4 h-4 text-[var(--accent-color)] shrink-0" />
                  <span className="text-xs text-white/80 font-mono">
                    Sub-100ms API Latency
                  </span>
                </div>
              </div>
            </div>

            {/* Design System Palette & Metadata (4 cols) */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#06090E]/90 border border-white/[0.08] flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider block">
                  {lang === 'ru' ? 'Цветовая палитра интерфейса' : 'Interface Palette'}
                </span>
                <p className="text-xs text-white/60 font-sans">
                  {lang === 'ru'
                    ? 'Гармоничная темная тема с акцентными сигналами для быстрого считывания финансовой аналитики.'
                    : 'Tailored dark theme with high contrast visual cues for dense data visualization.'}
                </p>
              </div>

              {project.dossier?.colorPalette && (
                <div className="grid grid-cols-4 gap-2 pt-2">
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
              )}
            </div>
          </div>
        </Motion.section>

        {/* ========================================================================= */}
        {/* 7. CORE CAPABILITIES (3 High-Impact Feature Cards, Visible at Once)        */}
        {/* ========================================================================= */}
        {project.walkthrough?.features && (
          <Motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 sm:mb-28 space-y-8"
          >
            <div className="border-b border-white/[0.08] pb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[var(--accent-color)]" />
                <h2 className="text-lg sm:text-xl font-bold text-white font-display uppercase tracking-wide">
                  {featuresTitle}
                </h2>
              </div>
              <span className="text-xs text-white/40 font-mono">
                {project.walkthrough.features.length} MODULES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
              {project.walkthrough.features.map((f, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-3xl bg-[#06090E]/90 border border-white/[0.08] hover:border-[var(--accent-color)]/40 transition-all duration-300 flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl sm:text-2xl font-black text-[var(--accent-color)] font-display">
                        {f.num}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-white/60 font-mono font-medium">
                        {f.metric}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-display group-hover:text-[var(--accent-color)] transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                      {f.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-white/40">
                    <Layers className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                    <span>PRODUCTION VERIFIED</span>
                  </div>
                </div>
              ))}
            </div>
          </Motion.section>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 8. NEXT PROJECT FOOTER (Generous, Beautiful Continuous Browse)            */}
      {/* ========================================================================= */}
      <Motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full mt-10"
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
          className="group relative block w-full border-t border-white/10 pt-16 sm:pt-24 pb-28 sm:pb-36 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden select-none bg-gradient-to-b from-transparent via-black/40 to-black/85 cursor-pointer"
        >
          {/* Floating Cursor Thumbnail Preview */}
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

          <div className="w-full max-w-[1500px] mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
              <span className="text-xs text-white/40 font-mono tracking-widest uppercase">
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
