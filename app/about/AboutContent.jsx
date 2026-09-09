'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useThemeAudio } from '../../src/context/ThemeAudioContext';
import { portfolioContent } from '../../src/data/portfolioData';
import { ChevronRight, ArrowRight, GraduationCap, Building2, Code2, FileDown, FileText, CheckCircle2 } from 'lucide-react';

export default function AboutContent() {
  const { lang, playHover, playClick, playDownload } = useThemeAudio();
  const [downloaded, setDownloaded] = useState(false);
  const content = portfolioContent[lang] || portfolioContent.en;
  const about = content.about;
  const exp = about.experience;
  const sectors = about.sectors;

  const handleDownloadCv = () => {
    if (playDownload) playDownload();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2600);
  };

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

      {/* Cyber Dossier & Resume Download Card (Optimized for HR & Technical Leads) */}
      <section className="mb-24 sm:mb-28">
        <div className="cyber-panel p-6 sm:p-8 rounded-2xl border-2 border-[var(--accent-color)]/40 bg-[var(--accent-bg-subtle)] relative overflow-hidden group shadow-[0_0_35px_var(--card-hover-glow)]">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-[var(--accent-color)] opacity-[0.07] blur-3xl pointer-events-none rounded-full group-hover:opacity-[0.14] transition-opacity duration-700" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            {/* Left: Icon & Meta Details */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[var(--accent-color)] text-[#020504] flex items-center justify-center shrink-0 shadow-lg shadow-[0_0_25px_var(--accent-glow)] group-hover:scale-105 transition-transform duration-300">
                <FileText className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-base sm:text-xl font-black font-display text-[var(--heading-tint)] uppercase tracking-wider">
                    {about.downloadDossier}
                  </h3>
                  <span className="text-[10px] font-mono text-[var(--accent-color)] font-bold px-2 py-0.5 rounded bg-black/50 border border-[var(--accent-border)]">
                    VERIFIED · 2026
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans">
                  {about.dossierSize}
                </p>
                <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)] font-mono pt-0.5">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> ATS-FRIENDLY
                  </span>
                  <span>&bull;</span>
                  <span>1-PAGE EXECUTIVE SUMMARY</span>
                  <span>&bull;</span>
                  <span>DIRECT CONTACT CHANNELS</span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              <a
                href="/dias_yermek_cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="px-4 py-3 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent-border)] bg-black/40 hover:bg-white/5 text-[var(--text-secondary)] hover:text-[var(--heading-tint)] text-xs font-mono font-bold tracking-wider uppercase transition-all text-center"
              >
                OPEN PREVIEW
              </a>

              <a
                href="/dias_yermek_cv.pdf"
                download="Dias_Yermek_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDownloadCv}
                onMouseEnter={playHover}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[var(--accent-color)] hover:bg-white text-[#020504] font-black text-xs font-mono tracking-widest uppercase hover:shadow-[0_0_30px_var(--accent-glow)] transition-all hover:scale-105 active:scale-95 text-center shadow-lg"
              >
                <FileDown className="w-4 h-4 animate-bounce" />
                <span>{downloaded ? content.nav.cvDownloaded : 'DOWNLOAD DOSSIER'}</span>
              </a>
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
