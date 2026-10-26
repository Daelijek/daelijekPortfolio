'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
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
  Check,
  Award,
  Languages,
  Phone,
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';

export default function AboutContent() {
  const { lang, playHover, playClick, playDownload } = useThemeAudio();
  const content = portfolioContent[lang] || portfolioContent.en;
  const about = content.about;
  const exp = about.experience;
  const [selectedCategories, setSelectedCategories] = useState(['mobile', 'web', 'backend', 'ai']);
  const [cvDownloaded, setCvDownloaded] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  // Global Page Scroll Progress for Left Identity Pod
  const { scrollYProgress: pageScrollProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Dedicated Timeline Section Scroll Progress: Pin progress strictly to the center (50%) of viewport
  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
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

  // Toggle skill category filter with multi-select support
  const handleToggleCategory = (catId) => {
    playClick();
    if (catId === 'all') {
      setSelectedCategories(['mobile', 'web', 'backend', 'ai']);
      return;
    }

    // If all are currently active and user clicks one: isolate that one
    if (selectedCategories.length === 4) {
      setSelectedCategories([catId]);
      return;
    }

    // Toggle logic
    if (selectedCategories.includes(catId)) {
      if (selectedCategories.length === 1) {
        // If it's the last one, reset to all
        setSelectedCategories(['mobile', 'web', 'backend', 'ai']);
      } else {
        setSelectedCategories(selectedCategories.filter((c) => c !== catId));
      }
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
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

  // Re-architectured Interactive Competency Domains with deliverables
  const skillDomains = [
    {
      id: 'mobile',
      category: 'mobile',
      icon: Smartphone,
      title: lang === 'kk' ? 'Мобильді әзірлеу' : lang === 'ru' ? 'Мобильная разработка' : 'Mobile Architecture',
      desc: lang === 'kk' ? 'Flutter & React Native, офлайн-синхрондау, күрделі күйлер және дүкендерге шығару.' : lang === 'ru' ? 'Кросс-платформенные приложения на Flutter и React Native, сложный стейт и релизы в App Store и Google Play.' : 'Production mobile apps on Flutter & React Native with offline sync, complex state management & store deployments.',
      skills: [
        'Flutter & Dart',
        'Riverpod',
        'React Native',
        'Expo Framework',
        'App Store Deploy',
        'Google Play CI/CD',
        'Firebase Remote Config',
      ],
      metric: 'iOS & Android',
      deliverables: [
        lang === 'kk' ? 'BeyimTech AI қосымшасы (Astana Hub релизі, 20+ мектеп)' : lang === 'ru' ? 'BeyimTech AI мобильное приложение (релиз Astana Hub, 20+ школ)' : 'BeyimTech AI Platform (Production Astana Hub release, 20+ schools)',
        lang === 'kk' ? 'Stolovka FoodTech (Flutter, электронды тапсырыстар, Firebase)' : lang === 'ru' ? 'Stolovka FoodTech сервис (Flutter, электронное меню, Firebase)' : 'Stolovka FoodTech Service (Flutter, cart engine & live orders)',
        lang === 'kk' ? 'Finance AI Manager (React Native, Expo, түбіртектерді тану)' : lang === 'ru' ? 'Finance AI Manager (React Native, Expo, распознавание чеков)' : 'Finance AI Manager (React Native & Expo cross-platform client)',
      ],
    },
    {
      id: 'web',
      category: 'web',
      icon: Globe,
      title: lang === 'kk' ? 'Web & Frontend' : lang === 'ru' ? 'Веб и фронтенд архитектура' : 'Modern Web & Frontend',
      desc: lang === 'kk' ? 'Жоғары өнімді Next.js 15, серверлік рендеринг, дизайн-жүйелер және интерфейс жылдамдығы.' : lang === 'ru' ? 'Высокоскоростной Next.js 15, SSR/SSG, масштабируемые дизайн-системы и плавная графика 60 FPS.' : 'High-speed Next.js 15, SSR/SSG pipelines, modular design systems & fluid animations.',
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
      deliverables: [
        lang === 'kk' ? 'OpenGov.kz мемлекеттік порталы (Next.js, 3 тілдегі толық локализация)' : lang === 'ru' ? 'OpenGov.kz портал госинициатив (Next.js, полная трехъязычная локализация)' : 'OpenGov.kz National Platform (Next.js SSR & WCAG compliant UI)',
        lang === 'kk' ? 'TrustMe платформасы (1.5M+ қолданушыға арналған смарт-келісімшарттар)' : lang === 'ru' ? 'TrustMe платформа (смарт-контрактный UI для 1.5M+ пользователей)' : 'TrustMe Contract Portal (Reusable UI library for 1.5M+ active users)',
        lang === 'kk' ? 'BerikWeb 4K сандық галереясы (High-DPI, 3D өзара әрекеттер)' : lang === 'ru' ? 'BerikWeb 4K галерея (High-DPI арт-витрина, кинетическая верстка)' : 'Berik Zhunusbek Gallery (Kinetic typography & 4K media showcase)',
      ],
    },
    {
      id: 'backend',
      category: 'backend',
      icon: Server,
      title: lang === 'kk' ? 'Бэкенд және дерекқор' : lang === 'ru' ? 'Бэкенд, базы данных и облако' : 'Backend & Cloud Services',
      desc: lang === 'kk' ? 'Жылдам API интерфейстері, реляциялық деректер қоры және контейнерленген сервистер.' : lang === 'ru' ? 'Быстрые микросервисы на FastAPI, реляционные базы данных и контейнеризация Docker.' : 'High-throughput APIs with FastAPI, relational database modeling & containerized deployments.',
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
      deliverables: [
        lang === 'kk' ? 'FastAPI асинхронды REST эндпоинттары және PostgreSQL үлгілері' : lang === 'ru' ? 'Асинхронные REST эндпоинты на FastAPI и оптимизированные схемы PostgreSQL' : 'Async REST APIs with FastAPI, Pydantic & PostgreSQL schemas',
        lang === 'kk' ? 'Supabase нақты уақыттағы синхрондау және қауіпсіз рұқсаттар' : lang === 'ru' ? 'Supabase Real-time синхронизация и строгие политики доступа' : 'Supabase integration with Row-Level Security and JWT auth',
        lang === 'kk' ? 'Docker контейнерлері және бұлтты сервистердегі микроқызметтер' : lang === 'ru' ? 'Docker контейнеризация и оркестрация независимых микросервисов' : 'Containerized Docker microservices and cloud deployment flows',
      ],
    },
    {
      id: 'ai',
      category: 'ai',
      icon: Bot,
      title: lang === 'kk' ? 'ЖИ және креативті UI' : lang === 'ru' ? 'ИИ и прикладные технологии' : 'AI Systems & Applied Tech',
      desc: lang === 'kk' ? 'OpenAI интеграциясы, адаптивті чат-боттар, бай мәтіндік редакторлар және аудио синтез.' : lang === 'ru' ? 'Интеграция языковых моделей OpenAI, чат-боты, редакторы Lexical и Web Audio синтез.' : 'OpenAI model integrations, streaming AI chat agents, rich Lexical editors & Web Audio synthesizer.',
      skills: [
        'OpenAI API',
        'Real-time AI Chatbots',
        'Lexical Markdown',
        'Web Audio API',
        'Canvas 2D / HUD',
        'Prompt Pipelines',
      ],
      metric: 'Applied AI',
      deliverables: [
        lang === 'kk' ? 'Оқушыларға арналған BeyimTech AI чат-боттары мен интерактивті көмекшілері' : lang === 'ru' ? 'Чат-боты BeyimTech с контекстным обучением и стримингом ответов' : 'Adaptive educational AI chatbots with streaming responses',
        lang === 'kk' ? 'Lexical бай markdown редакторы (формулалар мен кестелер қолдауы)' : lang === 'ru' ? 'Кастомный редактор Lexical с поддержкой markdown, формул и тегов' : 'Lexical markdown WYSIWYG editor for interactive curriculum',
        lang === 'kk' ? 'Сайттағы процедуралық Web Audio синтезаторы (сыртқы файлдарсыз)' : lang === 'ru' ? 'Процедурный аудио-синтезатор Web Audio API (звук без внешних файлов)' : 'Procedural Web Audio synthesizer engine (zero external audio files)',
      ],
    },
  ];

  const filteredDomains = skillDomains.filter((d) => selectedCategories.includes(d.id));

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
      className="min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-36 px-5 sm:px-8 lg:px-14 xl:px-20 max-w-[1720px] mx-auto font-mono selection:bg-[var(--accent-color)] selection:text-[#040608] overflow-x-clip"
    >
      {/* 1. TOP HEADER SYSTEM TELEMETRY TAG */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.05 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-10 sm:mb-14"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-ping" />
          <span className="text-xs font-bold text-[var(--accent-color)] tracking-widest uppercase">
            {about.tag || '// SECTOR_00 · BIOGRAPHY & TELEMETRY'}
          </span>
        </div>
        <div className="text-xs text-white/40 hidden sm:flex items-center gap-2">
          <span>PORTFOLIO // 2026</span>
          <span className="text-[var(--accent-color)]">&bull;</span>
          <span>DIAS YERMEK</span>
        </div>
      </motion.div>

      {/* 2. MAIN TWO-COLUMN MASTER LAYOUT */}
      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14 xl:gap-20">
        {/* ========================================================= */}
        {/* LEFT COLUMN: PURE EDITORIAL PROFILE DOSSIER (ZERO BOXES)   */}
        {/* ========================================================= */}
        <div className="w-full lg:w-[320px] xl:w-[340px] shrink-0 lg:sticky lg:top-28 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Minimalist Photo Container with Architectural Vignette */}
            <div className="relative w-full aspect-[4/4.3] max-h-[340px] rounded-2xl overflow-hidden border border-white/10 bg-[#04070C] shadow-2xl group">
              <img
                src="/assets/linkedIn_Dias_square.png"
                alt="Dias Yermek"
                className="w-full h-full object-cover grayscale brightness-95 contrast-105 group-hover:scale-[1.03] group-hover:grayscale-0 transition-all duration-700"
              />

              {/* Theme Hue Tint */}
              <div className="absolute inset-0 bg-[var(--accent-color)] opacity-[0.05] mix-blend-color pointer-events-none" />

              {/* Photo Telemetry Overlays */}
              <div className="absolute top-3 left-3 text-[9px] font-mono text-white/60 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                [SYS_ID // 0x01]
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE</span>
              </div>

              {/* Bottom Photo Stamp Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex items-end justify-between text-xs pointer-events-none">
                <div>
                  <span className="text-xs font-bold text-white block leading-tight tracking-wider">
                    DIAS YERMEK
                  </span>
                  <span className="text-[10px] text-[var(--accent-color)] font-mono block">
                    Astana, KZ · UTC+5
                  </span>
                </div>
                <span className="text-[9.5px] px-2 py-0.5 rounded bg-black/80 border border-white/20 text-white/80 font-mono">
                  {scrollPercent}% SCROLL
                </span>
              </div>
            </div>

            {/* Scroll Telemetry Hairline Progress */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[10.5px] text-white/40 font-mono">
                <span>SCROLL_TELEMETRY</span>
                <span className="text-[var(--accent-color)] font-bold">{scrollPercent}%</span>
              </div>
              <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  style={{ width: `${scrollPercent}%` }}
                  className="h-full bg-[var(--accent-color)] shadow-[0_0_10px_var(--accent-glow)] transition-[width] duration-150"
                />
              </div>
            </div>

            {/* Typographic Technical Specification (Clean Horizontal Hairlines, No Boxes) */}
            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08] text-xs font-mono">
              <div className="flex items-center justify-between py-2.5">
                <span className="text-white/40 tracking-wider">STATUS</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  OPEN FOR OFFERS
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-white/40 tracking-wider">EXPERIENCE</span>
                <span className="text-white font-bold">3+ YEARS PROD</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-white/40 tracking-wider">DEGREE</span>
                <span className="text-white font-bold">B.S. SOFTWARE ENG</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-white/40 tracking-wider">PHONE</span>
                <a
                  href={`tel:${content.contact?.phoneRaw || '+77088350549'}`}
                  className="text-[var(--accent-color)] font-bold hover:underline"
                >
                  {content.contact?.phone || '+7 708 835 0549'}
                </a>
              </div>
            </div>

            {/* Actions: Clean CV Download & Brand Social Icons */}
            <div className="space-y-3 pt-1">
              <a
                href="/api/cv"
                download="Dias_Yermek_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDownloadCv}
                onMouseEnter={playHover}
                className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[var(--accent-color)] text-[#020504] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_var(--accent-glow)] transition-all active:scale-95 group"
              >
                <FileDown className="w-4 h-4" />
                <span>{cvDownloaded ? content.nav.cvDownloaded : content.nav.downloadCv}</span>
              </a>

              {/* Social Channels Pill Row with Authentic Brand Colors */}
              <div className="grid grid-cols-4 gap-2">
                <a
                  href={content.contact.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  title="Telegram"
                  className="flex items-center justify-center p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 hover:text-[#229ED9] hover:border-[#229ED9] hover:bg-[#229ED9]/10 hover:shadow-[0_0_15px_rgba(34,158,217,0.35)] transition-all"
                >
                  <FaTelegram className="w-4 h-4" />
                </a>

                <a
                  href={content.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  title="GitHub"
                  className="flex items-center justify-center p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 hover:text-white hover:border-white/80 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all"
                >
                  <FaGithub className="w-4 h-4" />
                </a>

                <a
                  href={content.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  title="LinkedIn"
                  className="flex items-center justify-center p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 hover:shadow-[0_0_15px_rgba(10,102,194,0.35)] transition-all"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>

                <a
                  href={content.contact.leetcode || 'https://leetcode.com/u/Daelijek/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  title="LeetCode"
                  className="flex items-center justify-center p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 hover:text-[#FFA116] hover:border-[#FFA116] hover:bg-[#FFA116]/10 hover:shadow-[0_0_15px_rgba(255,161,22,0.35)] transition-all"
                >
                  <SiLeetcode className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: EXPANSIVE EDITORIAL STREAM (ZERO BOX CARDS)  */}
        {/* ========================================================= */}
        <div className="flex-1 min-w-0 space-y-20 sm:space-y-24">
          {/* 1. NARRATIVE BIOGRAPHY & MISSION */}
          <section className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <span className="text-xs text-[var(--accent-color)] font-bold tracking-widest uppercase">
                // {content.system.role} &bull; {content.system.location}
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display uppercase tracking-tight leading-tight break-words">
                {about.title}
              </h1>

              <p className="text-base sm:text-lg text-white font-sans font-medium leading-relaxed pt-1">
                {about.lead}
              </p>

              <p className="text-sm sm:text-base text-white/60 font-sans leading-relaxed max-w-4xl">
                {about.story}
              </p>
            </motion.div>

            {/* 2. THE THREE HIGHLIGHTS AS AN EDITORIAL STAT STREAM (NO BOXES) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] border-y border-white/[0.08] py-6 sm:py-8 my-6"
            >
              {highlightCards.map((card, idx) => {
                const CardIcon = card.Icon;
                return (
                  <div
                    key={card.id}
                    onMouseEnter={playHover}
                    className={`space-y-3 group ${
                      idx === 0 ? 'sm:pr-6 lg:pr-8' : idx === 1 ? 'py-5 sm:py-0 sm:px-6 lg:px-8' : 'pt-5 sm:pt-0 sm:pl-6 lg:pl-8'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[var(--accent-color)]">
                        <CardIcon className="w-4 h-4" />
                        <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-white/50">
                          {card.tag}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[var(--accent-color)] font-bold">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-base sm:text-lg font-bold text-white font-mono group-hover:text-[var(--accent-color)] transition-colors leading-tight">
                        {card.title}
                      </div>
                      <div className="text-xs text-white/50 font-sans leading-relaxed">
                        {card.subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </section>

          {/* 3. INTERACTIVE TECHNICAL COMPETENCY MATRIX (EDITORIAL LEDGER) */}
          <section className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-white/[0.08] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
            >
              <div>
                <span className="text-xs font-mono font-bold text-[var(--accent-color)] tracking-wider uppercase block mb-1">
                  // TECHNICAL_CAPABILITIES
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight">
                  {about.sectorsTitle || 'COMPETENCY MATRIX'}
                </h2>
                <p className="text-xs sm:text-sm text-white/50 mt-1 font-sans">
                  {about.sectorsSubtitle || 'Categorized technical capabilities & tooling'}
                </p>
              </div>

              {/* Multi-Select Category Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap self-start sm:self-auto">
                <button
                  onClick={() => handleToggleCategory('all')}
                  onMouseEnter={playHover}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                    selectedCategories.length === 4
                      ? 'bg-[var(--accent-color)] text-[#020504] shadow-[0_0_15px_var(--accent-glow)]'
                      : 'bg-white/[0.04] text-white/60 hover:text-white border border-white/10'
                  }`}
                >
                  <span>{lang === 'kk' ? 'БАРЛЫҒЫ' : lang === 'ru' ? 'ВСЕ' : 'ALL'}</span>
                  {selectedCategories.length === 4 && <Check className="w-3 h-3" />}
                </button>

                {[
                  { id: 'mobile', label: 'MOBILE' },
                  { id: 'web', label: 'WEB' },
                  { id: 'backend', label: 'BACKEND' },
                  { id: 'ai', label: 'AI & DATA' },
                ].map((tab) => {
                  const isSelected = selectedCategories.includes(tab.id);
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleToggleCategory(tab.id)}
                      onMouseEnter={playHover}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/40 shadow-[0_0_12px_var(--accent-glow)]'
                          : 'bg-white/[0.04] text-white/50 hover:text-white border border-white/10'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[var(--accent-color)]' : 'bg-white/30'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* HIGH-END ARCHITECTURAL CARDS GRID WITH FLUID LAYOUT & EXIT ANIMATIONS */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6">
              <AnimatePresence>
                {filteredDomains.map((domain, idx) => {
                  const DomainIcon = domain.icon;
                  return (
                    <motion.div
                      layout="position"
                      key={domain.id}
                      initial={{ opacity: 0, scale: 0.94, y: 16 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        scale: 0.92,
                        y: -8,
                        transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                      }}
                      transition={{
                        layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.25 },
                        scale: { duration: 0.25 },
                        y: { duration: 0.25 },
                      }}
                      onMouseEnter={playHover}
                      className="relative rounded-2xl p-6 sm:p-7 bg-[#0b0f14]/80 border border-white/[0.08] hover:border-[var(--accent-color)]/50 transition-colors duration-300 group flex flex-col justify-between hover:shadow-[0_0_35px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden"
                    >
                      {/* Subtle Ambient Radial Highlight on Hover */}
                      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--accent-color)]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[var(--accent-color)]/15 transition-all duration-500" />

                      <div className="relative z-10 space-y-5">
                        {/* Top Row: Icon, Index & Metric Badge */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/20 shadow-[0_0_15px_var(--accent-glow)]">
                              <DomainIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-[10px] font-mono text-[var(--accent-color)] font-bold tracking-wider uppercase block">
                                0{idx + 1} // DOMAIN
                              </span>
                              <h3 className="text-base sm:text-lg font-bold text-white font-mono group-hover:text-[var(--accent-color)] transition-colors">
                                {domain.title}
                              </h3>
                            </div>
                          </div>

                          <span className="shrink-0 text-[10px] font-mono text-[var(--accent-color)] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 font-bold">
                            {domain.metric}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed">
                          {domain.desc}
                        </p>

                        {/* Technology Stack Chips */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-wider block">
                            // TECH_STACK
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {domain.skills.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/80 font-mono group-hover:border-white/20 transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Deliverables / Production Proof at bottom of card */}
                      <div className="relative z-10 pt-4 mt-5 border-t border-white/[0.06] space-y-2">
                        <span className="text-[10px] font-mono font-bold text-[var(--accent-color)] uppercase tracking-wider block">
                          // KEY_DELIVERABLES
                        </span>
                        <ul className="space-y-1.5 text-xs text-white/70 font-sans">
                          {domain.deliverables.map((item, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2 leading-relaxed">
                              <span className="text-[var(--accent-color)] font-mono shrink-0 font-bold">&bull;</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </section>

          {/* 4. CAREER TELEMETRY TIMELINE (SCREEN-CENTERED DYNAMIC SCROLL, NO CARDS) */}
          <section ref={timelineRef} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-white/[0.08] pb-4 flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-mono font-bold text-[var(--accent-color)] tracking-wider uppercase block mb-1">
                  // CAREER_PATH
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight">
                  {exp.title}
                </h2>
                <p className="text-xs text-white/50 mt-1 font-sans">{exp.subtitle}</p>
              </div>
              <span className="text-xs text-[var(--accent-color)] font-bold font-mono">
                [TRACK: {exp.logs.length.toString().padStart(2, '0')}]
              </span>
            </motion.div>

            {/* Kinetic Timeline: Line anchored to center of screen */}
            <div className="relative">
              {/* Inactive Background Rail */}
              <div className="absolute left-[15px] sm:left-[19px] top-6 bottom-8 w-[2px] bg-white/10 rounded-full pointer-events-none" />

              {/* Scroll-Driven Glowing Neon Active Line */}
              <motion.div
                style={{ scaleY: timelineScrollProgress, originY: 0 }}
                className="absolute left-[15px] sm:left-[19px] top-6 bottom-8 w-[2px] bg-gradient-to-b from-[var(--accent-color)] via-emerald-400 to-[var(--accent-color)] rounded-full shadow-[0_0_15px_var(--accent-color)] origin-top pointer-events-none"
              />

              {/* Timeline Items (Clean Editorial Lines, No Card Boxes) */}
              <div className="space-y-8 sm:space-y-12">
                {exp.logs.map((log, idx) => (
                  <motion.div
                    key={log.code || idx}
                    initial={{ opacity: 0, y: 20, x: -8 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: false, amount: 0.05 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex items-start gap-4 sm:gap-6 group"
                  >
                    {/* Center Timeline Node */}
                    <div className="relative z-10 shrink-0 w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center mt-2">
                      <div className="w-4 sm:w-4.5 h-4 sm:h-4.5 rounded-full bg-[#020504] border-2 border-[var(--accent-color)] shadow-[0_0_10px_var(--accent-glow)] group-hover:scale-125 group-hover:border-white transition-all flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] group-hover:bg-white transition-colors" />
                      </div>
                    </div>

                    {/* Content Block (Clean Border Bottom, Open Canvas) */}
                    <div className="flex-1 min-w-0 pb-6 sm:pb-8 border-b border-white/[0.08] space-y-3.5">
                      {/* Header: Company, Role & Period */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-lg sm:text-2xl font-black text-white font-display tracking-tight group-hover:text-[var(--accent-color)] transition-colors">
                              {log.company}
                            </h3>
                            {log.badge && (
                              <span className="px-2.5 py-0.5 rounded text-[10px] bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 text-[var(--accent-color)] font-mono font-bold tracking-wider">
                                {log.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-xs sm:text-sm text-white/70 font-mono">
                            {log.role}
                          </div>
                        </div>

                        <div className="text-xs font-mono text-[var(--accent-color)] font-bold shrink-0">
                          {log.period}
                        </div>
                      </div>

                      {/* Bullet Points with Markers */}
                      <ul className="space-y-2 pt-1 font-sans">
                        {log.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/70 leading-relaxed">
                            <span className="text-[var(--accent-color)] font-mono mt-0.5">&bull;</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. VERIFIED CREDENTIALS: CERTIFICATIONS & SPOKEN LANGUAGES (TWO TYPOGRAPHIC COLUMNS) */}
          {about.credentials && (
            <section className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.05 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-white/[0.08] pb-4 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[var(--accent-color)] tracking-wider uppercase block mb-1">
                    // CREDENTIALS_VERIFIED
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight">
                    {about.credentials.title}
                  </h2>
                  <p className="text-xs text-white/50 mt-1 font-sans">
                    {about.credentials.subtitle}
                  </p>
                </div>
                <span className="text-xs text-[var(--accent-color)] font-mono font-bold">
                  [ACCREDITED]
                </span>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Certifications Card Pod */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.05 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl p-6 sm:p-7 bg-[#0b0f14]/80 border border-white/[0.08] hover:border-[var(--accent-color)]/40 transition-all duration-300 backdrop-blur-md space-y-5 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="absolute -top-24 -right-24 w-44 h-44 bg-[var(--accent-color)]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[var(--accent-color)]/10 transition-all" />

                  <div className="relative z-10 space-y-5">
                    {/* Card Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/20">
                          <Award className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-white uppercase tracking-wider text-sm font-mono">
                          {about.credentials.certTitle || 'CERTIFICATIONS'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[var(--accent-color)] px-2.5 py-0.5 rounded-full bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30">
                        {about.credentials.certifications.length} VERIFIED
                      </span>
                    </div>

                    {/* Sub-cards */}
                    <div className="space-y-3">
                      {about.credentials.certifications.map((cert, cIdx) => (
                        <div
                          key={cIdx}
                          onMouseEnter={playHover}
                          className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[var(--accent-color)]/30 hover:bg-white/[0.05] transition-all space-y-2 group/sub"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="text-xs sm:text-sm font-bold text-white font-mono group-hover/sub:text-[var(--accent-color)] transition-colors">
                              {cert.title}
                            </h4>
                            <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/30 shrink-0 font-bold">
                              {cert.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-white/50 font-mono">
                            <span>{cert.issuer}</span>
                            <span className="text-[10px] text-[var(--accent-color)] font-bold">{cert.badge}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/40">
                    <span>// CISCO & AWS VERIFICATION</span>
                    <span className="text-emerald-400 flex items-center gap-1 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      AUTHENTICATED
                    </span>
                  </div>
                </motion.div>

                {/* Spoken Languages Card Pod */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.05 }}
                  transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl p-6 sm:p-7 bg-[#0b0f14]/80 border border-white/[0.08] hover:border-[var(--accent-color)]/40 transition-all duration-300 backdrop-blur-md space-y-5 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="absolute -top-24 -right-24 w-44 h-44 bg-[var(--accent-color)]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[var(--accent-color)]/10 transition-all" />

                  <div className="relative z-10 space-y-5">
                    {/* Card Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/20">
                          <Languages className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-white uppercase tracking-wider text-sm font-mono">
                          {about.credentials.langTitle || 'LANGUAGES'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[var(--accent-color)] px-2.5 py-0.5 rounded-full bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30">
                        3 PROFICIENCIES
                      </span>
                    </div>

                    {/* Sub-cards */}
                    <div className="space-y-3">
                      {about.credentials.languages.map((langItem, lIdx) => (
                        <div
                          key={lIdx}
                          onMouseEnter={playHover}
                          className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[var(--accent-color)]/30 hover:bg-white/[0.05] transition-all space-y-1.5 group/sub"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs sm:text-sm font-bold text-white font-mono group-hover/sub:text-[var(--accent-color)] transition-colors flex items-center gap-2">
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/70 font-mono">
                                {langItem.name === 'English' ? 'EN' : langItem.name === 'Kazakh' ? 'KZ' : 'RU'}
                              </span>
                              {langItem.name}
                            </span>
                            <span className="text-xs font-mono font-bold text-[var(--accent-color)]">
                              {langItem.level}
                            </span>
                          </div>
                          <p className="text-xs text-white/50 font-sans leading-relaxed">
                            {langItem.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/40">
                    <span>// MULTILINGUAL WORKFLOW</span>
                    <span className="text-white/60">TRILINGUAL FLUENCY</span>
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* 6. ENGINEERING MINDSET & PRINCIPLES (BRUTALIST NUMBERED MANIFESTO) */}
          <section className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-white/[0.08] pb-4"
            >
              <span className="text-xs font-mono font-bold text-[var(--accent-color)] tracking-wider uppercase block mb-1">
                // CORE_STANDARDS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight">
                {lang === 'kk' ? 'ИНЖЕНЕРЛІК ҰСТАНЫМДАР' : lang === 'ru' ? 'ПРИНЦИПЫ И ИНЖЕНЕРНЫЙ ПОДХОД' : 'ENGINEERING PRINCIPLES & MINDSET'}
              </h2>
              <p className="text-xs sm:text-sm text-white/50 mt-1 font-sans">
                {lang === 'kk' ? 'Өнімдерді қалай жобалаймын және құрастырамын' : lang === 'ru' ? 'Как я подхожу к созданию надежных продуктов' : 'Core standards guiding technical execution'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] border-y border-white/[0.08] py-8">
              {principles.map((p, idx) => {
                const PrincipleIcon = p.icon;
                return (
                  <motion.div
                    key={p.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.05 }}
                    transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={playHover}
                    className={`space-y-4 group ${
                      idx === 0 ? 'md:pr-8' : idx === 1 ? 'py-6 md:py-0 md:px-8' : 'pt-6 md:pt-0 md:pl-8'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black font-display text-[var(--accent-color)]">
                        {p.num}
                      </span>
                      <div className="p-2 rounded-lg bg-[var(--accent-color)]/10 text-[var(--accent-color)]">
                        <PrincipleIcon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm sm:text-base font-bold text-white font-mono group-hover:text-[var(--accent-color)] transition-colors leading-tight">
                        {p.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/55 font-sans leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* 7. CALL TO ACTION FINALE (OPEN CANVAS, ZERO CONTAINER BOX) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/[0.08] pt-14 sm:pt-20 text-center space-y-6"
          >
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-[var(--accent-color)] tracking-widest uppercase block">
                // TRANSMISSION_DISPATCH
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-display uppercase tracking-tight max-w-2xl mx-auto leading-tight">
                {content.system.ctaSecondary}
              </h2>
              <p className="text-xs sm:text-sm text-white/60 max-w-lg mx-auto font-sans leading-relaxed">
                {content.system.heroInfoLog}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                onClick={playClick}
                onMouseEnter={playHover}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[var(--accent-color)] text-[#06080A] font-bold text-xs tracking-widest uppercase hover:shadow-[0_0_35px_var(--accent-glow)] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
              >
                <span>{content.system.ctaSecondary}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <a
                href="/api/cv"
                download="Dias_Yermek_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDownloadCv}
                onMouseEnter={playHover}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white/[0.04] border border-white/15 hover:border-[var(--accent-color)]/60 text-white font-bold text-xs tracking-wider uppercase transition-all cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-[var(--accent-color)]" />
                <span>{cvDownloaded ? content.nav.cvDownloaded : content.nav.downloadCv}</span>
              </a>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
