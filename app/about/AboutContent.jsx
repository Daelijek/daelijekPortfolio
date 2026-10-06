'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll } from 'framer-motion';
import { useThemeAudio } from '../../src/context/ThemeAudioContext';
import { portfolioContent } from '../../src/data/portfolioData';
import { soundFx } from '../../src/audio/soundEffects';
import {
  GraduationCap,
  Building2,
  Code2,
  FileDown,
  ArrowRight,
  Smartphone,
  Globe,
  Server,
  Bot,
  Zap,
  ShieldCheck,
  ChevronRight,
  Terminal,
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';

export default function AboutContent() {
  const { lang, playHover, playClick, playDownload } = useThemeAudio();
  const content = portfolioContent[lang] || portfolioContent.en;
  const about = content.about;
  const exp = about.experience;
  const [activeSkillCategory, setActiveSkillCategory] = useState('all');
  const [cvDownloaded, setCvDownloaded] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  // Global Page Scroll Progress for Left Identity Pod
  const { scrollYProgress: pageScrollProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Dedicated Timeline Section Scroll Progress
  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 70%'],
  });

  useEffect(() => {
    const unsubscribe = pageScrollProgress.on('change', (latest) => {
      setScrollPercent(Math.min(100, Math.max(0, Math.round(latest * 100))));
    });
    return () => unsubscribe();
  }, [pageScrollProgress]);

  const handleDownloadCv = () => {
    if (playDownload) playDownload();
    else soundFx.playDownload();
    setCvDownloaded(true);
    setTimeout(() => setCvDownloaded(false), 2600);
  };

  // Three Key Highlights (100% pixel-aligned & uniform layout)
  const highlightCards = [
    {
      id: 'edu',
      tag: lang === 'kk' ? 'БІЛІМ' : lang === 'ru' ? 'ОБРАЗОВАНИЕ' : 'EDUCATION',
      Icon: GraduationCap,
      title: 'Astana IT University',
      subtitle: 'B.S. Software Engineering (2025)',
    },
    {
      id: 'current',
      tag: lang === 'kk' ? 'АҒЫМДАҒЫ' : lang === 'ru' ? 'ТЕКУЩАЯ' : 'CURRENT ROLE',
      Icon: Building2,
      title: 'BeyimTech · Astana Hub',
      subtitle: 'Middle Frontend & Mobile Lead',
    },
    {
      id: 'scale',
      tag: lang === 'kk' ? 'АУҚЫМ' : lang === 'ru' ? 'МАСШТАБ' : 'KEY SCALE',
      Icon: Code2,
      title: 'TrustMe Blockchain SaaS',
      subtitle: lang === 'kk' ? '1.5M+ Белсенді Қолданушы' : lang === 'ru' ? '1.5M+ Активных Пользователей' : '1.5M+ Production Users',
    },
  ];

  // Re-architectured Interactive Competency Domains (Clean, readable & categorized)
  const skillDomains = [
    {
      id: 'mobile',
      category: 'mobile',
      icon: Smartphone,
      title: lang === 'kk' ? 'Мобильді әзірлеу' : lang === 'ru' ? 'Мобильная разработка' : 'Mobile Architecture',
      desc: lang === 'kk' ? 'Flutter & React Native, офлайн-синхрондау, күрделі күйлер және дүкендерге шығару' : lang === 'ru' ? 'Кросс-платформенные приложения на Flutter и React Native, сложный стейт и релизы в сторы' : 'Production mobile apps on Flutter & React Native with offline sync, complex state & store releases',
      skills: [
        'Flutter & Dart',
        'Riverpod',
        'React Native',
        'Expo Framework',
        'App Store Review',
        'Google Play CI/CD',
        'Firebase Remote Config',
      ],
      metric: 'iOS & Android',
    },
    {
      id: 'web',
      category: 'web',
      icon: Globe,
      title: lang === 'kk' ? 'Web & Frontend' : lang === 'ru' ? 'Веб и фронтенд архитектура' : 'Modern Web & Frontend',
      desc: lang === 'kk' ? 'Жоғары өнімді Next.js 15, серверлік рендеринг, дизайн-жүйелер және интерфейс жылдамдығы' : lang === 'ru' ? 'Высокоскоростной Next.js 15, SSR/SSG, масштабируемые дизайн-системы и плавная графика' : 'High-speed Next.js 15, SSR/SSG pipelines, modular design systems & fluid animations',
      skills: [
        'Next.js 15 (App Router)',
        'React 19',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'Turbopack',
        'Core Web Vitals',
      ],
      metric: '60 FPS / SSR',
    },
    {
      id: 'backend',
      category: 'backend',
      icon: Server,
      title: lang === 'kk' ? 'Бэкенд және дерекқор' : lang === 'ru' ? 'Бэкенд, базы данных и облако' : 'Backend & Cloud Services',
      desc: lang === 'kk' ? 'Жылдам API интерфейстері, реляциялық деректер қоры және контейнерленген сервистер' : lang === 'ru' ? 'Быстрые микросервисы на FastAPI, реляционные базы данных и контейнеризация' : 'High-throughput APIs with FastAPI, relational database modeling & containerized deployments',
      skills: [
        'FastAPI (Python)',
        'PostgreSQL',
        'Supabase',
        'Node.js & Express',
        'Docker',
        'REST & GraphQL',
        'JWT & Auth Flow',
      ],
      metric: 'FastAPI & SQL',
    },
    {
      id: 'ai',
      category: 'ai',
      icon: Bot,
      title: lang === 'kk' ? 'ЖИ және креативті UI' : lang === 'ru' ? 'ИИ и прикладные технологии' : 'AI Systems & Applied Tech',
      desc: lang === 'kk' ? 'OpenAI интеграциясы, адаптивті чат-боттар, бай мәтіндік редакторлар және аудио синтез' : lang === 'ru' ? 'Интеграция языковых моделей OpenAI, чат-боты, редакторы Lexical и Web Audio синтез' : 'OpenAI model integrations, streaming AI chat agents, rich Lexical editors & Web Audio',
      skills: [
        'OpenAI API',
        'Real-time AI Chatbots',
        'Lexical Markdown',
        'Web Audio API',
        'Canvas 2D / HUD',
        'Prompt Pipelines',
      ],
      metric: 'Applied AI',
    },
  ];

  const filteredDomains =
    activeSkillCategory === 'all'
      ? skillDomains
      : skillDomains.filter((d) => d.category === activeSkillCategory);

  // Core Engineering Principles
  const principles = [
    {
      icon: Zap,
      num: '01',
      title: lang === 'kk' ? 'Жылдамдық пен 60 FPS' : lang === 'ru' ? 'Плавность 60 FPS и скорость' : 'Zero-Lag & 60 FPS Fluidity',
      desc: lang === 'kk' ? 'Пайдаланушы интерфейсі кідіріссіз жұмыс істеуі тиіс. Жеңіл бандлдар мен сезімтал анимацияларға басымдық беремін.' : lang === 'ru' ? 'Интерфейс обязан откликаться мгновенно. Приоритет легковесным бандлам, плавному скроллу и тактильной микроанимации.' : 'Interfaces must respond instantly. Prioritizing lean bundles, silky scroll ergonomics, and tactile micro-animations.',
    },
    {
      icon: ShieldCheck,
      num: '02',
      title: lang === 'kk' ? 'Толық өнім жауапкершілігі' : lang === 'ru' ? 'Сквозная разработка под ключ' : 'End-to-End Product Ownership',
      desc: lang === 'kk' ? 'Figma макетінен бастап архитектураға, App Store тексеруіне және өндірістік қолдауға дейін толық бақылау.' : lang === 'ru' ? 'От первых экранов в Figma до архитектуры, прохождения ревью в App Store / Google Play и продакшн-мониторинга.' : 'From initial Figma specs and database schemas to store approval (App Store/Google Play) and real telemetry.',
    },
    {
      icon: Terminal,
      num: '03',
      title: lang === 'kk' ? 'Сенімді және таза код' : lang === 'ru' ? 'Надежная и масштабируемая база' : 'Resilient & Clean Architecture',
      desc: lang === 'kk' ? 'Қатаң типизация, болжамды күй басқару және қателерді қауіпсіз ұстау өнімнің ұзақ өмір сүруін қамтамасыз етеді.' : lang === 'ru' ? 'Строгая типизация TypeScript, прозрачное управление стейтом и отказоустойчивая обработка сетевых ошибок.' : 'Strict TypeScript typing, modular state machines, and graceful offline fallback handling built for production scale.',
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen pt-24 sm:pt-32 lg:pt-36 pb-32 px-6 sm:px-10 lg:px-16 xl:px-24 max-w-[1720px] mx-auto font-mono selection:bg-[var(--accent-color)] selection:text-[#040608]"
    >
      {/* Top Header System Tag */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-8 sm:mb-12">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-ping" />
          <span className="text-xs font-bold text-[var(--accent-color)] tracking-widest uppercase">
            {about.tag || '// SECTOR_00 · BIOGRAPHY & TELEMETRY'}
          </span>
        </div>
        <div className="text-xs text-[var(--text-muted)] hidden sm:flex items-center gap-2">
          <span>PORTFOLIO // 2026</span>
          <span className="text-[var(--accent-color)]">&bull;</span>
          <span>DIAS YERMEK</span>
        </div>
      </div>

      {/* Main Two-Column Master Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
        {/* ========================================================= */}
        {/* LEFT COLUMN: DEDICATED STICKY PROFILE POD (PHOTO ONLY)    */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 xl:col-span-4 lg:sticky lg:top-28 space-y-4">
          <div className="cyber-panel p-4 sm:p-5 rounded-2xl relative overflow-hidden group shadow-[0_0_40px_var(--card-hover-glow)]">
            {/* Ambient Corner Decors */}
            <div className="absolute top-2 left-2 text-[9px] text-[var(--accent-color)] font-mono opacity-60">
              [SYS_ID // 0x01]
            </div>
            <div className="absolute top-2 right-2 flex items-center gap-1.5 text-[9px] text-[var(--text-muted)] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ONLINE</span>
            </div>

            {/* Photo Container with Kinetic Scanner & Hue Shift */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden mt-3 border border-[var(--border-bright)] bg-black/60 shadow-inner">
              <img
                src="/assets/linkedIn_Dias_square.png"
                alt="Dias Yermek"
                className="w-full h-full object-cover grayscale brightness-95 contrast-105 group-hover:scale-[1.03] group-hover:grayscale-0 transition-all duration-700"
              />

              {/* Theme Hue Overlay */}
              <div className="absolute inset-0 bg-[var(--accent-color)] opacity-[0.06] mix-blend-color pointer-events-none" />

              {/* Laser Scanline Micro-Animation */}
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent opacity-75 shadow-[0_0_12px_var(--accent-color)] pointer-events-none animate-[scanline_4s_ease-in-out_infinite]" />

              {/* Bottom Photo Stamp Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-between text-xs pointer-events-none">
                <div>
                  <span className="text-[11px] font-bold text-white block leading-tight">DIAS YERMEK</span>
                  <span className="text-[9.5px] text-[var(--accent-color)] font-mono block">Astana, KZ · UTC+5</span>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded bg-black/70 border border-white/20 text-white/70 font-mono">
                  {scrollPercent}% SCROLL
                </span>
              </div>
            </div>

            {/* Scroll Telemetry Progress Bar */}
            <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] font-mono">
                <span>SCROLL_DEPTH</span>
                <span className="text-[var(--accent-color)] font-bold">{scrollPercent}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-black/50 border border-[var(--border-subtle)] overflow-hidden">
                <div
                  style={{ width: `${scrollPercent}%` }}
                  className="h-full bg-[var(--accent-color)] shadow-[0_0_10px_var(--accent-glow)] transition-[width] duration-150"
                />
              </div>
            </div>

            {/* Identity Specs List */}
            <div className="mt-3.5 space-y-2 text-[11px] font-mono">
              <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)]">STATUS</span>
                <span className="text-emerald-400 font-bold">OPEN FOR OFFERS</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)]">EXPERIENCE</span>
                <span className="text-[var(--heading-tint)] font-bold">3+ YEARS PROD</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)]">DEGREE</span>
                <span className="text-[var(--heading-tint)] font-bold">B.S. SOFTWARE ENG</span>
              </div>
            </div>

            {/* Action Buttons: Quick CV Download & Social Links */}
            <div className="mt-4 space-y-2">
              <a
                href="/dias_yermek_cv.pdf"
                download="Dias_Yermek_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDownloadCv}
                onMouseEnter={playHover}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[var(--accent-color)] text-[#020504] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_var(--accent-glow)] transition-all active:scale-95 group"
              >
                <FileDown className="w-4 h-4" />
                <span>{cvDownloaded ? content.nav.cvDownloaded : content.nav.downloadCv}</span>
              </a>

              {/* Social Channels Pill Row with Authentic Brand Colors on Hover */}
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {/* Telegram: #229ED9 */}
                <a
                  href={content.contact.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  title="Telegram"
                  className="flex items-center justify-center p-2.5 rounded-lg bg-[var(--accent-bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[#229ED9] hover:border-[#229ED9] hover:bg-[#229ED9]/10 hover:shadow-[0_0_15px_rgba(34,158,217,0.35)] transition-all"
                >
                  <FaTelegram className="w-4 h-4" />
                </a>

                {/* GitHub: #FFFFFF */}
                <a
                  href={content.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  title="GitHub"
                  className="flex items-center justify-center p-2.5 rounded-lg bg-[var(--accent-bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-white hover:border-white/80 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all"
                >
                  <FaGithub className="w-4 h-4" />
                </a>

                {/* LinkedIn: #0A66C2 */}
                <a
                  href={content.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  title="LinkedIn"
                  className="flex items-center justify-center p-2.5 rounded-lg bg-[var(--accent-bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 hover:shadow-[0_0_15px_rgba(10,102,194,0.35)] transition-all"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>

                {/* LeetCode: #FFA116 */}
                <a
                  href={content.contact.leetcode || 'https://leetcode.com/u/Daelijek/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  title="LeetCode"
                  className="flex items-center justify-center p-2.5 rounded-lg bg-[var(--accent-bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[#FFA116] hover:border-[#FFA116] hover:bg-[#FFA116]/10 hover:shadow-[0_0_15px_rgba(255,161,22,0.35)] transition-all"
                >
                  <SiLeetcode className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: MAIN CONTENT STREAM                         */}
        {/* ========================================================= */}
        <div className="lg:col-span-8 xl:col-span-8 space-y-16 sm:space-y-20">
          {/* 1. NARRATIVE BIOGRAPHY & MISSION */}
          <section className="space-y-6">
            <div className="space-y-3">
              <span className="text-xs text-[var(--accent-color)] font-bold tracking-widest uppercase">
                // {content.system.role} &bull; {content.system.location}
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[var(--heading-tint)] font-display uppercase tracking-wide leading-tight">
                {about.title}
              </h1>
            </div>

            <p className="text-sm sm:text-base text-[var(--heading-tint)] font-sans font-medium leading-relaxed">
              {about.lead}
            </p>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
              {about.story}
            </p>

            {/* 2. THE THREE HIGHLIGHT CARDS (100% UNIFORM ALIGNMENT & SIZING) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4">
              {highlightCards.map((card) => {
                const CardIcon = card.Icon;
                return (
                  <div
                    key={card.id}
                    onMouseEnter={playHover}
                    className="cyber-panel p-4 sm:p-5 rounded-xl flex flex-col justify-between h-[126px] hover:border-[var(--accent-border)] transition-all group"
                  >
                    {/* Top Row: Icon + Cyber Badge */}
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-[var(--accent-bg-subtle)] border border-[var(--border-subtle)] text-[var(--accent-color)] group-hover:scale-105 transition-transform">
                        <CardIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-mono text-[var(--accent-color)] tracking-wider px-2 py-0.5 rounded bg-black/40 border border-[var(--border-subtle)]">
                        {card.tag}
                      </span>
                    </div>

                    {/* Bottom Info: Guaranteed strictly identical text baseline across all 3 cards */}
                    <div className="space-y-0.5 mt-auto">
                      <div className="text-xs sm:text-[13px] font-bold text-[var(--heading-tint)] font-mono leading-tight truncate">
                        {card.title}
                      </div>
                      <div className="text-[10.5px] sm:text-[11px] text-[var(--text-muted)] font-mono leading-snug truncate">
                        {card.subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 3. INTERACTIVE TECHNICAL COMPETENCY MATRIX */}
          <section className="space-y-6">
            <div className="border-b border-[var(--border-subtle)] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--heading-tint)] font-display uppercase tracking-wide">
                  {about.sectorsTitle || 'COMPETENCY MATRIX'}
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  {about.sectorsSubtitle || 'Categorized technical capabilities & tooling'}
                </p>
              </div>

              {/* Interactive Category Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'all', label: lang === 'kk' ? 'БАРЛЫҒЫ' : lang === 'ru' ? 'ВСЕ' : 'ALL' },
                  { id: 'mobile', label: 'MOBILE' },
                  { id: 'web', label: 'WEB' },
                  { id: 'backend', label: 'BACKEND' },
                  { id: 'ai', label: 'AI & DATA' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      playClick();
                      setActiveSkillCategory(tab.id);
                    }}
                    onMouseEnter={playHover}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider uppercase transition-all ${
                      activeSkillCategory === tab.id
                        ? 'bg-[var(--accent-color)] text-[#020504] shadow-[0_0_15px_var(--accent-glow)]'
                        : 'bg-black/40 text-[var(--text-muted)] hover:text-white border border-[var(--border-subtle)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Competency Domain Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredDomains.map((domain) => {
                const DomainIcon = domain.icon;
                return (
                  <div
                    key={domain.id}
                    onMouseEnter={playHover}
                    className="cyber-panel p-5 rounded-xl flex flex-col justify-between space-y-4 hover:border-[var(--accent-border)] transition-all group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-md bg-[var(--accent-bg-subtle)] text-[var(--accent-color)]">
                            <DomainIcon className="w-4 h-4" />
                          </div>
                          <h3 className="text-xs sm:text-sm font-bold text-[var(--heading-tint)] font-mono">
                            {domain.title}
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono text-[var(--accent-color)] tracking-wider px-2 py-0.5 rounded bg-black/50 border border-[var(--border-subtle)]">
                          {domain.metric}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] font-sans leading-relaxed">
                        {domain.desc}
                      </p>
                    </div>

                    {/* Skill Tags Grid */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {domain.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-1 rounded bg-black/60 border border-[var(--border-subtle)] text-[10.5px] text-[var(--text-primary)] hover:border-[var(--accent-border)] hover:text-[var(--accent-color)] transition-colors cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 4. CAREER TELEMETRY TIMELINE (PERFECTLY ALIGNED & SCROLL-DRIVEN) */}
          <section className="space-y-8" ref={timelineRef}>
            <div className="border-b border-[var(--border-subtle)] pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--heading-tint)] font-display uppercase tracking-wide">
                  {exp.title}
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{exp.subtitle}</p>
              </div>
              <span className="text-xs text-[var(--accent-color)] font-bold font-mono">
                [TRACK: {exp.logs.length.toString().padStart(2, '0')}]
              </span>
            </div>

            {/* Geometric Kinetic Timeline Container */}
            <div className="relative">
              {/* 1. Inactive Background Guide Rail (Exact axial alignment with nodes) */}
              <div className="absolute left-[15px] sm:left-[19px] top-6 bottom-8 w-[2px] bg-white/10 rounded-full pointer-events-none" />

              {/* 2. Scroll-Driven Glowing Neon Active Line */}
              <motion.div
                style={{ scaleY: timelineScrollProgress, originY: 0 }}
                className="absolute left-[15px] sm:left-[19px] top-6 bottom-8 w-[2px] bg-gradient-to-b from-[var(--accent-color)] via-emerald-400 to-[var(--accent-color)] rounded-full shadow-[0_0_12px_var(--accent-color)] origin-top pointer-events-none"
              />

              {/* 3. Timeline Items with Guaranteed Sub-Pixel Symmetry */}
              <div className="space-y-6 sm:space-y-8">
                {exp.logs.map((log, idx) => (
                  <div key={log.code || idx} className="relative flex items-start gap-4 sm:gap-6 group">
                    {/* Center Timeline Node (w-8 sm:w-10 perfectly aligns on left: 15px sm:19px) */}
                    <div className="relative z-10 shrink-0 w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center mt-3">
                      <div className="w-4 sm:w-4.5 h-4 sm:h-4.5 rounded-full bg-[#020504] border-2 border-[var(--accent-color)] shadow-[0_0_10px_var(--accent-glow)] group-hover:scale-125 group-hover:border-white transition-all flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] group-hover:bg-white transition-colors" />
                      </div>
                    </div>

                    {/* Content Cyber Panel */}
                    <div className="flex-1 min-w-0 cyber-panel p-5 sm:p-7 rounded-2xl space-y-3.5 group-hover:border-[var(--accent-border)] transition-all shadow-md">
                      {/* Header: Company, Role & Period */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border-subtle)] pb-3.5 gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <h3 className="text-base sm:text-lg font-bold text-[var(--heading-tint)] font-display tracking-wide">
                              {log.company}
                            </h3>
                            {log.badge && (
                              <span className="px-2.5 py-0.5 rounded text-[10px] bg-[var(--accent-bg-subtle)] border border-[var(--border-subtle)] text-[var(--accent-color)] font-mono font-bold tracking-wider">
                                {log.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[var(--text-secondary)] font-mono font-medium">
                            {log.role}
                          </div>
                        </div>

                        <div className="text-[11px] font-mono text-[var(--accent-color)] font-bold shrink-0 px-2.5 py-1 rounded bg-black/40 border border-[var(--border-subtle)]">
                          {log.period}
                        </div>
                      </div>

                      {/* Bullet Points with Markers */}
                      <ul className="space-y-2 pt-1 font-sans">
                        {log.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed">
                            <ChevronRight className="w-3.5 h-3.5 text-[var(--accent-color)] shrink-0 mt-1" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. ENGINEERING MINDSET & PRINCIPLES */}
          <section className="space-y-6">
            <div className="border-b border-[var(--border-subtle)] pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--heading-tint)] font-display uppercase tracking-wide">
                {lang === 'kk' ? 'ИНЖЕНЕРЛІК ҰСТАНЫМДАР' : lang === 'ru' ? 'ПРИНЦИПЫ И ИНЖЕНЕРНЫЙ ПОДХОД' : 'ENGINEERING PRINCIPLES & MINDSET'}
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                {lang === 'kk' ? 'Өнімдерді қалай жобалаймын және құрастырамын' : lang === 'ru' ? 'Как я подхожу к созданию надежных продуктов' : 'Core standards guiding technical execution'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {principles.map((p) => {
                const PrincipleIcon = p.icon;
                return (
                  <div
                    key={p.num}
                    onMouseEnter={playHover}
                    className="cyber-panel p-5 rounded-xl flex flex-col justify-between space-y-4 hover:border-[var(--accent-border)] transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-[var(--accent-bg-subtle)] border border-[var(--border-subtle)] text-[var(--accent-color)]">
                        <PrincipleIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-[var(--accent-color)]">
                        [{p.num}]
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-xs sm:text-sm font-bold text-[var(--heading-tint)] font-mono leading-tight">
                        {p.title}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] font-sans leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 6. CALL TO ACTION BAR */}
          <section className="cyber-panel p-8 sm:p-10 rounded-2xl text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--heading-tint)] font-display uppercase tracking-wider">
                {content.system.ctaSecondary}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-lg mx-auto font-sans leading-relaxed">
                {content.system.heroInfoLog}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Link
                href="/contact"
                onClick={playClick}
                onMouseEnter={playHover}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[var(--accent-color)] text-[#06080A] font-bold text-xs tracking-widest uppercase hover:shadow-[0_0_30px_var(--accent-glow)] transition-all hover:scale-105 active:scale-95"
              >
                <span>{content.system.ctaSecondary}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="/dias_yermek_cv.pdf"
                download="Dias_Yermek_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDownloadCv}
                onMouseEnter={playHover}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-black/60 border border-[var(--border-bright)] hover:border-[var(--accent-border)] text-[var(--heading-tint)] font-bold text-xs tracking-wider uppercase transition-all"
              >
                <FileDown className="w-4 h-4 text-[var(--accent-color)]" />
                <span>{cvDownloaded ? content.nav.cvDownloaded : content.nav.downloadCv}</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
