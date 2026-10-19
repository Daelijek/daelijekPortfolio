'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion as Motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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
  UserCheck,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

/**
 * Infinite Interactive Gallery Ribbon
 * - Infinite seamless auto-scrolling with GPU translate3d compositing
 * - Physically smoothed deceleration on hover and smooth acceleration on resume
 * - Nudge arrows with smooth velocity interpolation
 * - No horizontal scrollbar / line (overflow: hidden)
 * - Complete drag & selection prevention across images, cards, and text
 * - Click-to-preview lightbox modal
 */
function InfiniteGalleryRibbon({ items, lang, playClick, playHover, onOpenModal, isModalOpen }) {
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  isHoveredRef.current = isHovered || isModalOpen;

  const tapeRef = useRef(null);
  const set1Ref = useRef(null);
  const offsetRef = useRef(0);
  const currentSpeedRef = useRef(0.65); // base slow speed in px/frame (~39px/s)
  const nudgeDeltaRef = useRef(0);
  const setWidthRef = useRef(0);
  const rafIdRef = useRef(null);

  // Ensure base set has at least 6 items for ultra-smooth seamless looping on wide displays
  const normalizedItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    let list = items;
    while (list.length < 6) {
      list = [...list, ...items];
    }
    return list;
  }, [items]);

  useEffect(() => {
    const baseSpeed = 0.65;
    let lastTime = performance.now();

    const measureWidth = () => {
      if (set1Ref.current && tapeRef.current) {
        const rect = set1Ref.current.getBoundingClientRect();
        const style = window.getComputedStyle(tapeRef.current);
        const gap = parseFloat(style.columnGap || style.gap || '24') || 24;
        if (rect.width > 0) {
          setWidthRef.current = rect.width + gap;
        }
      }
    };

    measureWidth();
    const timer = setTimeout(measureWidth, 150);
    const ro = new ResizeObserver(() => measureWidth());
    if (set1Ref.current) ro.observe(set1Ref.current);

    const animate = (time) => {
      const dt = Math.min((time - lastTime) / (1000 / 60), 3);
      lastTime = time;

      // When hovered or modal is open: target speed is 0; otherwise baseSpeed
      const targetSpeed = isHoveredRef.current ? 0 : baseSpeed;

      // Smooth momentum lerp:
      // Hover stop: 0.07 gives a silky-smooth ~400ms deceleration curve
      // Resume: 0.045 gives a gentle smooth acceleration
      const lerpFactor = isHoveredRef.current ? 0.07 : 0.045;
      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * (lerpFactor * dt);

      if (isHoveredRef.current && Math.abs(currentSpeedRef.current) < 0.005) {
        currentSpeedRef.current = 0;
      }

      // Handle manual arrow nudge with smooth easing
      if (Math.abs(nudgeDeltaRef.current) > 0.2) {
        const nudgeStep = nudgeDeltaRef.current * (0.08 * dt);
        offsetRef.current += nudgeStep;
        nudgeDeltaRef.current -= nudgeStep;
      }

      // Increment continuous position
      offsetRef.current += currentSpeedRef.current * dt;

      // Seamless infinite modulo loop
      const setW = setWidthRef.current;
      if (setW > 0) {
        if (offsetRef.current >= setW) {
          offsetRef.current = offsetRef.current % setW;
        } else if (offsetRef.current < 0) {
          offsetRef.current = (offsetRef.current % setW) + setW;
        }
      }

      if (tapeRef.current) {
        tapeRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      clearTimeout(timer);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      ro.disconnect();
    };
  }, []);

  const handleNudge = (direction) => {
    playClick?.();
    const amount = direction === 'left' ? -320 : 320;
    nudgeDeltaRef.current += amount;
  };

  const renderCard = (item, keyIndex) => (
    <div
      key={keyIndex}
      onClick={() => {
        playClick?.();
        onOpenModal?.(item);
      }}
      onMouseEnter={playHover}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitUserDrag: 'none' }}
      className="w-[230px] sm:w-[260px] md:w-[280px] shrink-0 group/card cursor-pointer select-none"
    >
      {/* Device Mockup Shell */}
      <div className="relative rounded-[2.2rem] p-2.5 bg-[#090D14] border border-white/10 group-hover/card:border-[var(--accent-color)]/60 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.7)] group-hover/card:shadow-[0_20px_50px_var(--card-hover-glow)] group-hover/card:-translate-y-2 select-none">
        {/* Top Dynamic Island / Bezel */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black/80 rounded-full z-20 pointer-events-none border border-white/5 select-none" />

        {/* Screen Image Frame */}
        <div className="relative aspect-[9/19.5] w-full rounded-[1.7rem] overflow-hidden bg-black select-none">
          <Image
            src={item.image}
            alt={item.title}
            fill
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="object-cover object-top group-hover/card:scale-105 transition-transform duration-500 pointer-events-none select-none"
            sizes="(max-width: 640px) 230px, 280px"
            style={{ userSelect: 'none', WebkitUserDrag: 'none' }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover/card:opacity-100 pointer-events-none select-none">
            <span className="px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-medium flex items-center gap-1.5 shadow-lg select-none">
              <Maximize2 className="w-3.5 h-3.5 text-[var(--accent-color)]" />
              <span>{lang === 'ru' ? 'Открыть' : 'Preview'}</span>
            </span>
          </div>
        </div>

        {/* Card Caption Info */}
        <div className="p-3 pt-3.5 space-y-1 select-none">
          <span className="text-[10px] font-mono font-bold text-[var(--accent-color)] tracking-wider block uppercase select-none">
            {item.tag || `SCREEN`}
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-white font-display group-hover/card:text-[var(--accent-color)] transition-colors truncate select-none">
            {item.title}
          </h3>
          <p className="text-[11px] text-white/50 font-sans line-clamp-1 select-none">
            {item.subtitle}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 select-none" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-5 select-none">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-color)]" />
            <span className="text-xs font-mono font-bold text-[var(--accent-color)] uppercase tracking-wider">
              // INTERFACE_GALLERY_TAPE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-tight">
            {lang === 'ru'
              ? 'Лента интерфейса приложения'
              : lang === 'kk'
              ? 'Қосымшаның интерфейс лентасы'
              : 'Interactive Mobile Ribbon'}
          </h2>
          <p className="text-xs sm:text-sm text-white/60 font-sans max-w-xl">
            {lang === 'ru'
              ? 'Бесконечная интерактивная лента: наведите для плавной остановки или нажмите для детального просмотра.'
              : lang === 'kk'
              ? 'Шексіз интерактивті лента: бірқалыпты тоқтату үшін меңзерді апарыңыз немесе толық көру үшін басыңыз.'
              : 'Infinite interactive tape: hover to smoothly pause or click any card to inspect UI details.'}
          </p>
        </div>

        {/* Nudge Arrow Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => handleNudge('left')}
            onMouseEnter={playHover}
            className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/25 text-white/70 hover:text-white transition-all active:scale-95"
            aria-label="Previous screen"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleNudge('right')}
            onMouseEnter={playHover}
            className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/25 text-white/70 hover:text-white transition-all active:scale-95"
            aria-label="Next screen"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Infinite Ribbon Track with Gradient Fade Masks & ZERO Scrollbar Line */}
      <div
        className="relative overflow-hidden py-3 select-none"
        onMouseEnter={() => {
          setIsHovered(true);
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          isHoveredRef.current = false;
        }}
        onTouchStart={() => {
          setIsHovered(true);
          isHoveredRef.current = true;
        }}
        onTouchEnd={() => {
          setIsHovered(false);
          isHoveredRef.current = false;
        }}
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        {/* Left & Right Subtle Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-[#040608] via-[#040608]/85 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-[#040608] via-[#040608]/85 to-transparent z-10" />

        {/* Continuous Moving Tape Container */}
        <div
          ref={tapeRef}
          className="flex gap-5 sm:gap-6 will-change-transform select-none"
          style={{ width: 'max-content' }}
        >
          {/* Set 1 (measured for seamless modulo width) */}
          <div ref={set1Ref} className="flex gap-5 sm:gap-6 shrink-0">
            {normalizedItems.map((item, idx) => renderCard(item, `set1-${idx}-${item.id || idx}`))}
          </div>

          {/* Set 2 (seamless continuation) */}
          <div className="flex gap-5 sm:gap-6 shrink-0" aria-hidden="true">
            {normalizedItems.map((item, idx) => renderCard(item, `set2-${idx}-${item.id || idx}`))}
          </div>

          {/* Set 3 (buffer for ultra-wide displays) */}
          <div className="flex gap-5 sm:gap-6 shrink-0" aria-hidden="true">
            {normalizedItems.map((item, idx) => renderCard(item, `set3-${idx}-${item.id || idx}`))}
          </div>
        </div>
      </div>
    </div>
  );
}

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
        liveUrl: null,
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

  // Gallery Modal Lightbox State
  const [activeModalScreen, setActiveModalScreen] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModalScreen(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const updateNextMouseCoords = (e) => {
    const halfWidth = 150;
    const clampedX = typeof window !== 'undefined'
      ? Math.max(halfWidth + 12, Math.min(window.innerWidth - halfWidth - 12, e.clientX))
      : e.clientX;
    return {
      x: clampedX,
      y: e.clientY,
    };
  };

  const handleNextMouseEnter = (e) => {
    playHover?.();
    const coords = updateNextMouseCoords(e);
    setMousePos(coords);
    setIsNextHovered(true);
  };

  const handleNextMouseMove = (e) => {
    const coords = updateNextMouseCoords(e);
    setMousePos(coords);
  };

  // Scroll-driven sticky header & animated shrinking project title
  const { scrollY } = useScroll();
  const backBtnRef = useRef(null);
  const [backWidth, setBackWidth] = useState(140);

  useEffect(() => {
    const measureBackWidth = () => {
      if (backBtnRef.current) {
        const w = backBtnRef.current.offsetWidth;
        setBackWidth(w > 0 ? w + 16 : 140);
      }
    };
    measureBackWidth();
    window.addEventListener('resize', measureBackWidth);
    return () => window.removeEventListener('resize', measureBackWidth);
  }, []);

  // Continuous real-time scroll transforms:
  // Title moves from below back button into top navbar row and scales down to compact size
  const titleScale = useTransform(scrollY, [0, 110], [1, 0.38]);
  const titleY = useTransform(scrollY, [0, 110], [58, 0]);
  const titleX = useTransform(scrollY, [0, 110], [-backWidth, 0]);

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
    <div className="min-h-screen text-white font-sans selection:bg-[var(--accent-color)] selection:text-[#040608] pb-0">
      {/* ========================================================================= */}
      {/* UNIFIED STICKY SCROLL-ANIMATED HEADER (100% Transparent, No Container Box) */}
      {/* ========================================================================= */}
      <Motion.header
        className="sticky top-0 z-40 w-full bg-transparent border-none shadow-none pointer-events-none select-none"
      >
        <div className="w-[90%] max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 pointer-events-auto">
          <div className="h-16 sm:h-20 flex items-center justify-between gap-4">
            {/* Left: Back button + Animated Shrinking Title Target */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <Link
                ref={backBtnRef}
                href="/projects"
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white/80 hover:text-white text-xs font-bold transition-all backdrop-blur-sm"
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{lang === 'ru' ? 'Код' : 'Code'}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </Motion.header>

      {/* ========================================================================= */}
      {/* 1. HERO CONTENT CONTAINER (Spacious flow directly below sticky header)    */}
      {/* ========================================================================= */}
      <div className="w-[90%] max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-20">
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
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
          viewport={{ once: false, amount: 0.15 }}
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

        {/* ========================================================================= */}
        {/* 4. KEY IMPACT METRICS STRIP (Horizontal Flow, Clean & Spacious)           */}
        {/* ========================================================================= */}
        {project.walkthrough?.impact?.metrics && (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
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
        {/* HORIZONTAL INTERFACE SCREEN REEL / RIBBON                                  */}
        {/* ========================================================================= */}
        {project.gallery && project.gallery.length > 0 && (
          <Motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 sm:mb-24 space-y-6"
          >
            <InfiniteGalleryRibbon
              items={project.gallery}
              lang={lang}
              playClick={playClick}
              playHover={playHover}
              onOpenModal={setActiveModalScreen}
              isModalOpen={Boolean(activeModalScreen)}
            />
          </Motion.section>
        )}

        {/* ========================================================================= */}
        {/* 5. THE NARRATIVE: CHALLENGE & SOLUTION (2 Clear, Readable Columns)        */}
        {/* ========================================================================= */}
        <Motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
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
          viewport={{ once: false, amount: 0.15 }}
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
                    {project.slug === 'finance-management-app'
                      ? 'JWT & bcrypt • Session Auth • OAuth2'
                      : 'AES-256 • TLS 1.3 • Production Ready'}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <Zap className="w-4 h-4 text-[var(--accent-color)] shrink-0" />
                  <span className="text-xs text-white/80 font-mono">
                    {project.slug === 'finance-management-app'
                      ? 'FastAPI Async • <50ms P99 Latency'
                      : 'Sub-100ms API Latency'}
                  </span>
                </div>
              </div>
            </div>

            {/* Design System Palette & Metadata (4 cols) */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#06090E]/90 border border-white/[0.08] flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider block">
                  {lang === 'ru' ? 'Цветовая палитра интерфейса' : lang === 'kk' ? 'Интерфейс түс палитрасы' : 'Interface Palette'}
                </span>
                <p className="text-xs text-white/60 font-sans leading-relaxed">
                  {project.slug === 'finance-management-app'
                    ? (lang === 'ru'
                        ? 'Фирменные токены интерфейса: бренд-синий (#2563EB), небесный акцент (#3B82F6), доходный изумруд (#10B981) и расходный красный (#EF4444).'
                        : lang === 'kk'
                        ? 'Интерфейстің фирмалық токендері: бренд-көк (#2563EB), аспан акценті (#3B82F6), кіріс изумруды (#10B981) және шығыс қызылы (#EF4444).'
                        : 'Production UI color tokens: primary blue (#2563EB), sky accent (#3B82F6), income emerald (#10B981), and expense crimson (#EF4444).')
                    : (lang === 'ru'
                        ? `${project.title}: официальные цветовые токены дизайн-системы интерфейса.`
                        : lang === 'kk'
                        ? `${project.title}: интерфейстің ресми дизайн токендері мен түс гаммасы.`
                        : `${project.title}: official design tokens utilized across the interface.`)}
                </p>
              </div>

              {project.dossier?.colorPalette && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  {project.dossier.colorPalette.map((c, idx) => (
                    <div
                      key={idx}
                      className="group flex flex-col items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.06] transition-all min-w-0"
                      title={`${c.name}: ${c.hex}`}
                    >
                      <div
                        className="w-full h-10 rounded-lg border border-white/20 shadow-md group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div className="w-full text-center min-w-0">
                        <span className="block text-[11px] text-white font-mono font-semibold truncate tracking-tight">
                          {c.hex}
                        </span>
                        <span className="block text-[10px] text-white/50 truncate tracking-tight mt-0.5" title={c.name}>
                          {c.name}
                        </span>
                      </div>
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
            viewport={{ once: false, amount: 0.15 }}
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
        className="w-full mt-10 mb-0"
      >
        <Link
          href={`/projects/${nextProject.slug || nextProject.id.toLowerCase()}`}
          onClick={playClick}
          onMouseEnter={handleNextMouseEnter}
          onMouseLeave={() => setIsNextHovered(false)}
          onMouseMove={handleNextMouseMove}
          ref={nextSectionRef}
          className="group relative block w-full border-t border-white/10 pt-16 sm:pt-24 pb-28 sm:pb-36 px-6 sm:px-10 lg:px-16 xl:px-24 select-none bg-gradient-to-b from-transparent via-black/40 to-black/85 cursor-pointer"
        >
          <div className="w-[90%] max-w-[1920px] mx-auto">
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

      {/* Floating Cursor Thumbnail Preview for Next Project Footer (Fixed viewport coordinates, zero scroll overflow) */}
      <AnimatePresence>
        {isNextHovered && (
          <Motion.div
            initial={{ opacity: 0, scale: 0.85, x: mousePos.x, y: mousePos.y }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePos.x,
              y: mousePos.y,
              transition: { type: 'spring', damping: 28, stiffness: 320, mass: 0.35 },
            }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
            style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 50 }}
            className="hidden md:block pointer-events-none select-none"
          >
            <div className="-translate-x-1/2 -translate-y-[115%] pointer-events-none">
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
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Zoom Modal for Ribbon Screens */}
      <AnimatePresence>
        {activeModalScreen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl"
            onClick={() => setActiveModalScreen(null)}
          >
            <Motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-[#080C12] border border-white/15 rounded-[2.5rem] p-3 sm:p-4 shadow-[0_25px_80px_rgba(0,0,0,0.9)] flex flex-col space-y-3"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalScreen(null)}
                className="absolute -top-3 -right-3 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all hover:scale-110 active:scale-95"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* High-res Screen */}
              <div className="relative aspect-[9/19.5] w-full rounded-[1.8rem] overflow-hidden bg-black shadow-inner select-none">
                <Image
                  src={activeModalScreen.image}
                  alt={activeModalScreen.title}
                  fill
                  priority
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  className="object-cover object-top select-none pointer-events-none"
                  sizes="400px"
                  style={{ userSelect: 'none', WebkitUserDrag: 'none' }}
                />
              </div>

              {/* Caption */}
              <div className="px-2 pt-1 pb-2 text-center space-y-1">
                <span className="text-[10px] font-mono font-bold text-[var(--accent-color)] tracking-wider uppercase">
                  {activeModalScreen.tag}
                </span>
                <h4 className="text-base font-bold text-white font-display">
                  {activeModalScreen.title}
                </h4>
                <p className="text-xs text-white/60 font-sans">
                  {activeModalScreen.subtitle}
                </p>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
