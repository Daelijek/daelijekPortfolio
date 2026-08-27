'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { soundFx } from '../../audio/soundEffects';
import { ExternalLink, Smartphone, Sparkles, ChevronRight, Layers, Wifi, Battery, Zap } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

const showcaseApps = [
  {
    id: 'finance',
    title: 'Finance AI Manager',
    category: 'React Native // Expo // FastAPI',
    tag: 'MOBILE & AI',
    status: 'PRODUCTION',
    image: '/assets/Finance.png',
    link: 'https://github.com/Daelijek/FinanceManagementApp',
    color: '#00FF9F',
    desc: 'Smart financial tracking app with AI receipt processing and analytics.',
  },
  {
    id: 'beyimtech',
    title: 'BeyimTech AI Platform',
    category: 'Flutter // Riverpod // EdTech // AI',
    tag: 'BEYIM.AI ECOSYSTEM',
    status: 'ASTANA HUB RELEASE',
    image: '/assets/beyim.png',
    link: 'https://beyim.ai',
    color: '#00F3FF',
    desc: 'Adaptive AI learning system deployed for 20+ schools with live telemetrics and analytics.',
  },
  {
    id: 'opengov',
    title: 'OpenGov.kz Platform',
    category: 'Next.js // React // GovTech',
    tag: 'WEB & MOBILE UI',
    status: 'ENTERPRISE',
    image: '/assets/openGov.png',
    link: 'https://qbs-solutions.vercel.app/',
    color: '#FFB800',
    desc: 'Modern public administration web portal with high-load data streaming.',
  },
  {
    id: 'berikweb',
    title: 'BerikWeb Portfolio',
    category: 'HTML5 // CSS3 // JS // i18n',
    tag: 'CREATIVE SAAS',
    status: 'SHIPPED',
    image: '/assets/berikWeb.png',
    link: 'https://berikzhunusbek.kz/',
    color: '#FF0055',
    desc: 'Ultra-fast multilanguage personal branding portal with 3D interactions.',
  },
];

export default function Device3DViewport() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const { playHover, playClick } = useThemeAudio();

  // Smooth 3D tilt tracking with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-22, 22]), springConfig);
  const specularX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const specularY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  // Auto-cycle apps every 5.5 seconds unless hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseApps.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const currentApp = showcaseApps[currentIndex];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[380px] sm:max-w-[420px] h-[560px] sm:h-[600px] flex items-center justify-center pointer-events-auto select-none"
      style={{ perspective: 1200 }}
    >
      {/* 3D Levitating Smartphone Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: [-7, 7, -7],
        }}
        transition={{
          y: { repeat: Infinity, duration: 6, ease: 'easeInOut' },
        }}
        className="relative w-[295px] sm:w-[325px] h-[520px] sm:h-[560px] rounded-[48px] bg-[#0c1218] p-[11px] shadow-[0_25px_65px_-15px_rgba(0,0,0,0.95),0_0_35px_var(--accent-glow)] border border-white/20 transition-shadow duration-500"
      >
        {/* Outer Titanium / Cyber Bezel Edge Accent */}
        <div className="absolute -inset-[1px] rounded-[49px] border border-[var(--accent-border)] opacity-60 pointer-events-none" />

        {/* Dynamic Specular Sheen (Reflecting angle of mouse) */}
        <motion.div
          className="absolute inset-0 rounded-[48px] pointer-events-none z-30 opacity-35 mix-blend-overlay overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${specularX}% ${specularY}%, rgba(255,255,255,0.8), transparent 60%)`,
          }}
        />

        {/* Inner Phone Screen */}
        <div className="relative w-full h-full rounded-[38px] bg-[#06080A] overflow-hidden flex flex-col justify-between border border-white/10 shadow-inner">
          {/* Top Speaker & Dynamic Notch */}
          <div className="relative z-20 w-full pt-3 px-5 flex items-center justify-between text-[9px] font-mono text-white/50 bg-gradient-to-b from-black/80 to-transparent">
            {/* Dynamic Clock */}
            <span className="font-bold text-white/70">12:00</span>

            {/* Dynamic Island Pill */}
            <div className="w-20 h-4 rounded-full bg-[#000000] border border-white/15 flex items-center justify-center gap-1.5 px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-ping" />
              <span className="text-[7.5px] text-white/60 tracking-tighter uppercase font-mono">LIVE_STREAM</span>
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5">
              <Wifi className="w-2.5 h-2.5 text-white/60" />
              <Battery className="w-3 h-3 text-white/70" />
            </div>
          </div>

          {/* Main App Showcase Screen */}
          <div className="relative flex-1 w-full overflow-hidden p-3 flex flex-col justify-between">
            {/* Screen Image with smooth fade & zoom transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentApp.id}
                initial={{ opacity: 0, scale: 1.06, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-[240px] sm:h-[260px] rounded-2xl overflow-hidden border border-white/10 bg-[#040608] shadow-lg group"
              >
                {/* Real App Screenshot Image */}
                <Image
                  src={currentApp.image}
                  alt={currentApp.title}
                  fill
                  className="object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Scanline texture */}
                <div className="absolute inset-0 scanlines-overlay opacity-30 pointer-events-none" />

                {/* Top Badge Overlay */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
                  <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[8.5px] text-[var(--accent-color)] font-mono font-bold tracking-wider">
                    {currentApp.tag}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-[8px] text-white/60 font-mono">
                    {currentApp.status}
                  </span>
                </div>

                {/* Bottom Shadow Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* App Meta & Description */}
            <div className="space-y-1.5 pt-2 px-1 font-mono">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white font-display tracking-wide uppercase line-clamp-1">
                  {currentApp.title}
                </h4>
                <a
                  href={currentApp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="flex items-center gap-1 text-[9px] text-[var(--accent-color)] hover:underline"
                >
                  <span>VIEW</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <p className="text-[9px] text-white/50 line-clamp-2 leading-relaxed">
                {currentApp.desc}
              </p>
              <div className="text-[8.5px] text-[var(--accent-color)]/80 font-bold tracking-tight">
                {currentApp.category}
              </div>
            </div>
          </div>

          {/* Bottom Dock / App Selector Pills */}
          <div className="relative z-20 w-full py-3 px-4 bg-gradient-to-t from-black/90 to-transparent border-t border-white/5 flex items-center justify-between">
            {/* Interactive Switcher Dots */}
            <div className="flex items-center gap-1.5">
              {showcaseApps.map((app, idx) => (
                <button
                  key={app.id}
                  onClick={() => {
                    soundFx.playClick();
                    setCurrentIndex(idx);
                  }}
                  onMouseEnter={playHover}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-5 bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-color)]'
                      : 'w-1.5 bg-white/25 hover:bg-white/50'
                  }`}
                  aria-label={`Show ${app.title}`}
                />
              ))}
            </div>

            {/* Quick Next Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                setCurrentIndex((prev) => (prev + 1) % showcaseApps.length);
              }}
              onMouseEnter={playHover}
              className="flex items-center gap-1 text-[9px] font-mono text-white/60 hover:text-[var(--accent-color)] transition-colors"
            >
              <span>NEXT_APP</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Floating 3D Cyber Shadow / Hologram Floor Disk */}
      <motion.div
        animate={{
          scale: [0.85, 1.05, 0.85],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-6 w-48 h-8 rounded-full pointer-events-none blur-md"
        style={{
          background: 'radial-gradient(ellipse, var(--accent-glow), transparent 70%)',
        }}
      />
    </div>
  );
}
