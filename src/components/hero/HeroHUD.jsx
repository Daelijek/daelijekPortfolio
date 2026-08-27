'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { portfolioContent } from '../../data/portfolioData';
import TelemetryCard from './TelemetryCard';
import { ArrowRight, MessageSquare, Code, Layers, Sparkles } from 'lucide-react';

export default function HeroHUD() {
  const { lang, playHover, playClick } = useThemeAudio();
  const content = portfolioContent[lang];

  return (
    <section id="overview" className="relative min-h-[90vh] pt-32 pb-20 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Identity & Headline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 font-mono"
          >
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-ping" />
              <span className="text-[var(--accent-color)] font-bold tracking-wider">
                {content.system.role}
              </span>
            </div>

            {/* Main Cyber Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white uppercase font-sans">
                <span className="block">{content.system.brandTitle}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-color)] via-white to-[var(--accent-color)]">
                  {content.system.heroHeadline}
                </span>
              </h1>
            </div>

            {/* Info Log Box */}
            <div className="p-4 rounded border-l-2 border-[var(--accent-color)] bg-white/[0.03] text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
              <span className="text-[var(--accent-color)] font-bold block mb-1">
                {content.system.heroInfoLog.split(']')[0]}]
              </span>
              <span>{content.system.heroInfoLog.split(']')[1]}</span>
            </div>

            {/* Quick Tech Badges */}
            <div className="flex flex-wrap gap-2 pt-2 text-xs">
              {['Next.js 15', 'Flutter & Riverpod', 'React Native (Expo)', 'FastAPI & PostgreSQL', 'OpenAI Integration'].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/70 hover:border-[var(--accent-border)] hover:text-white transition-colors"
                >
                  &gt; {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#projects"
                onClick={playClick}
                onMouseEnter={playHover}
                className="group px-6 py-3.5 rounded bg-[var(--accent-color)] text-[#06080A] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_var(--accent-glow)] transition-all flex items-center gap-2.5 hover:scale-105 active:scale-95"
              >
                <span>{content.system.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={playClick}
                onMouseEnter={playHover}
                className="px-6 py-3.5 rounded bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[var(--accent-border)] text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2.5"
              >
                <MessageSquare className="w-4 h-4 text-[var(--accent-color)]" />
                <span>{content.system.ctaSecondary}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Telemetry HUD Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <TelemetryCard />
          </div>
        </div>
      </div>
    </section>
  );
}
