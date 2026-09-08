'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useThemeAudio } from '../../src/context/ThemeAudioContext';
import { portfolioContent } from '../../src/data/portfolioData';
import { ChevronRight, ArrowRight, GraduationCap, Building2, Code2 } from 'lucide-react';

export default function AboutContent() {
  const { lang, playHover, playClick } = useThemeAudio();
  const content = portfolioContent[lang] || portfolioContent.en;
  const about = content.about;
  const exp = about.experience;
  const sectors = about.sectors;

  return (
    <div className="min-h-screen pt-44 sm:pt-56 lg:pt-60 pb-36 px-6 sm:px-12 max-w-7xl mx-auto font-mono">
      {/* Biography Introduction with Avatar */}
      <section className="mb-24 sm:mb-28 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 lg:items-stretch">
        {/* Left: Avatar Frame (Matched height) */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="relative group w-full h-full min-h-[340px] rounded-2xl overflow-hidden border border-[var(--border-bright)] bg-[var(--card-bg)] shadow-[0_0_35px_var(--card-hover-glow)] transition-all">
            <img
              src="/assets/linkedIn_Dias_square.png"
              alt="Dias Yermek"
              className="w-full h-full object-cover grayscale brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle Theme Hue Overlay */}
            <div className="absolute inset-0 bg-[var(--accent-color)] opacity-[0.06] mix-blend-color pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020504] via-transparent to-transparent opacity-85 pointer-events-none" />

            <div className="absolute bottom-5 left-5 right-5 text-xs font-mono">
              <span className="text-[10px] text-[var(--accent-color)] font-bold block tracking-wider">// DIAS_YERMEK</span>
              <span className="text-[var(--text-secondary)] text-[11px] mt-0.5 block">
                {content.system.role} &bull; {content.system.location}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Narrative & Highlights */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <p className="text-xs text-[var(--accent-color)] font-bold tracking-widest uppercase">
              // {content.system.role} &bull; {content.system.location}
            </p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[var(--heading-tint)] font-display uppercase tracking-wide leading-tight">
              {about.title}
            </h2>
            <p className="text-sm sm:text-base text-[var(--heading-tint)] leading-relaxed font-sans font-medium pt-1">
              {about.lead}
            </p>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
              {about.story}
            </p>
          </div>

          {/* Highlight Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 mt-auto">
            <div className="cyber-panel p-5 rounded-xl flex flex-col justify-between gap-3">
              <GraduationCap className="w-5 h-5 text-[var(--accent-color)] shrink-0" />
              <div>
                <div className="text-xs font-bold text-[var(--heading-tint)]">Astana IT University</div>
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5">B.S. Software Engineering (2025)</div>
              </div>
            </div>

            <div className="cyber-panel p-5 rounded-xl flex flex-col justify-between gap-3">
              <Building2 className="w-5 h-5 text-[var(--accent-color)] shrink-0" />
              <div>
                <div className="text-xs font-bold text-[var(--heading-tint)]">BeyimTech &bull; Astana Hub</div>
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5">Middle Frontend & Mobile Lead</div>
              </div>
            </div>

            <div className="cyber-panel p-5 rounded-xl flex flex-col justify-between gap-3">
              <Code2 className="w-5 h-5 text-[var(--accent-color)] shrink-0" />
              <div>
                <div className="text-xs font-bold text-[var(--heading-tint)]">TrustMe SaaS</div>
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5">1.5M+ Active Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Competency Matrix */}
      <section className="mb-24 sm:mb-28">
        <div className="border-b border-[var(--border-subtle)] pb-4 mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--heading-tint)] font-display uppercase tracking-wide">
              {about.sectorsTitle}
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">{about.sectorsSubtitle}</p>
          </div>
          <span className="text-xs text-[var(--accent-color)] font-bold font-mono">[SECTORS: {sectors.length.toString().padStart(2, '0')}]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {sectors.map((sector, idx) => (
            <motion.div
              key={sector.code}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="cyber-panel p-5 rounded-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] border-b border-[var(--border-subtle)] pb-3 mb-3">
                  <span className="text-[var(--accent-color)] font-bold">{sector.code}</span>
                  <span className="text-[var(--text-secondary)] font-semibold">{sector.title}</span>
                </div>

                <div className="space-y-2">
                  {sector.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      onMouseEnter={playHover}
                      className="flex items-center justify-between p-2 rounded bg-black/40 border border-[var(--border-subtle)] text-xs hover:border-[var(--accent-border)] transition-all cursor-default"
                    >
                      <span className="text-[10px] text-[var(--accent-color)] font-bold opacity-80">{skill.hex}</span>
                      <span className="text-[var(--text-primary)] font-medium truncate ml-2">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="mb-24 sm:mb-28">
        <div className="border-b border-[var(--border-subtle)] pb-4 mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--heading-tint)] font-display uppercase tracking-wide">
              {exp.title}
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">{exp.subtitle}</p>
          </div>
          <span className="text-xs text-[var(--accent-color)] font-bold font-mono">[LOGS: {exp.logs.length.toString().padStart(2, '0')}]</span>
        </div>

        <div className="space-y-5">
          {exp.logs.map((log) => (
            <div
              key={log.code}
              onMouseEnter={playHover}
              className="cyber-panel p-6 sm:p-7 rounded-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-4 gap-2">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded bg-[var(--accent-glow)] border border-[var(--accent-border)] text-xs text-[var(--accent-color)] font-bold font-mono">
                    {log.code}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--heading-tint)] font-display">{log.company}</h3>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">{log.role}</div>
                  </div>
                </div>
                <div className="text-xs text-[var(--accent-color)] font-bold font-mono">
                  {log.period}
                </div>
              </div>

              <ul className="space-y-2.5">
                {log.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                    <ChevronRight className="w-4 h-4 text-[var(--accent-color)] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="cyber-panel p-8 sm:p-12 rounded-2xl text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-black text-[var(--heading-tint)] font-display uppercase tracking-wider">
          {content.system.ctaSecondary}
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto font-sans leading-relaxed">
          {content.system.heroInfoLog}
        </p>
        <Link
          href="/contact"
          onClick={playClick}
          onMouseEnter={playHover}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[var(--accent-color)] text-[#06080A] font-bold text-xs tracking-widest uppercase hover:shadow-[0_0_30px_var(--accent-glow)] transition-all hover:scale-105 active:scale-95"
        >
          <span>{content.system.ctaSecondary}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
