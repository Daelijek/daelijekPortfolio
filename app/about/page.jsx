'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useThemeAudio } from '../../src/context/ThemeAudioContext';
import { portfolioContent } from '../../src/data/portfolioData';
import { ChevronRight, ArrowRight, Layers, GraduationCap, Building2, Code2, Sparkles, Terminal } from 'lucide-react';

const fullTechSectors = [
  {
    code: 'Sector_01',
    title: 'Core & Web Frameworks',
    skills: [
      { hex: '0x00', name: 'TypeScript' },
      { hex: '0x01', name: 'React 19' },
      { hex: '0x02', name: 'Next.js 15 (App Router)' },
      { hex: '0x03', name: 'Vue.js / Nuxt' },
      { hex: '0x04', name: 'Tailwind CSS' },
      { hex: '0x05', name: 'HTML5 / CSS3' }
    ]
  },
  {
    code: 'Sector_02',
    title: 'Mobile & Cross-Platform',
    skills: [
      { hex: '0x06', name: 'Flutter & Dart' },
      { hex: '0x07', name: 'React Native' },
      { hex: '0x08', name: 'Expo Framework' },
      { hex: '0x09', name: 'Riverpod State Mgmt' },
      { hex: '0x0A', name: 'App Store Deploy' },
      { hex: '0x0B', name: 'Google Play CI/CD' }
    ]
  },
  {
    code: 'Sector_03',
    title: 'Backend, Cloud & DB',
    skills: [
      { hex: '0x0C', name: 'FastAPI (Python)' },
      { hex: '0x0D', name: 'PostgreSQL' },
      { hex: '0x0E', name: 'Supabase' },
      { hex: '0x0F', name: 'Node.js & Express' },
      { hex: '0x10', name: 'Docker & Containers' },
      { hex: '0x11', name: 'REST & GraphQL' }
    ]
  },
  {
    code: 'Sector_04',
    title: 'AI Systems & Intelligence',
    skills: [
      { hex: '0x12', name: 'OpenAI API Integration' },
      { hex: '0x13', name: 'Lexical Markdown Editors' },
      { hex: '0x14', name: 'Real-time AI Chatbots' },
      { hex: '0x15', name: 'Prompt Engineering' },
      { hex: '0x16', name: 'Telemetry Systems' },
      { hex: '0x17', name: 'Data Visualizations' }
    ]
  },
  {
    code: 'Sector_05',
    title: 'Blockchain & Enterprise',
    skills: [
      { hex: '0x18', name: 'TrustMe (1.5M+ Users)' },
      { hex: '0x19', name: 'Smart Contract UI' },
      { hex: '0x1A', name: 'Digital Signatures (SMS)' },
      { hex: '0x1B', name: 'OpenGov.kz Platform' }
    ]
  },
  {
    code: 'Sector_06',
    title: 'Immersive & Motion UI',
    skills: [
      { hex: '0x1C', name: 'Framer Motion' },
      { hex: '0x1D', name: 'Web Audio API Synth' },
      { hex: '0x1E', name: 'Canvas 2D / Particles' },
      { hex: '0x1F', name: 'Three.js / WebGL' }
    ]
  },
  {
    code: 'Sector_07',
    title: 'Architecture & Tooling',
    skills: [
      { hex: '0x20', name: 'Git & GitHub' },
      { hex: '0x21', name: 'Vite & Webpack' },
      { hex: '0x22', name: 'Vercel Deployment' },
      { hex: '0x23', name: 'Figma to Code' }
    ]
  },
  {
    code: 'Sector_08',
    title: 'State & Real-Time Sync',
    skills: [
      { hex: '0x24', name: 'RTK Query / Redux' },
      { hex: '0x25', name: 'Firebase Remote Config' },
      { hex: '0x26', name: 'Firebase App Distribution' },
      { hex: '0x27', name: 'i18n Localization' }
    ]
  }
];

export default function AboutPage() {
  const { lang, playHover, playClick } = useThemeAudio();
  const content = portfolioContent[lang];
  const exp = content.experience;

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-36 px-6 sm:px-12 max-w-7xl mx-auto font-mono">
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
              <span className="text-[var(--text-secondary)] text-[11px] mt-0.5 block">Software Engineer &bull; Astana</span>
            </div>
          </div>
        </div>

        {/* Right: Narrative & Highlights (Matched height & bottom-aligned badges) */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <p className="text-xs text-[var(--accent-color)] font-bold tracking-widest uppercase">
              // MIDDLE FRONTEND & MOBILE DEVELOPER &bull; ASTANA, KZ
            </p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[var(--heading-tint)] font-display uppercase tracking-wide leading-tight">
              Creative Frontend & Mobile Developer
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-sans pt-1">
              With a Bachelor’s in Software Engineering from <b className="text-[var(--heading-tint)]">Astana IT University (2025)</b>, my journey spans building high-performance web applications and production-ready mobile apps. From leading mobile recovery and App Store releases at <b className="text-[var(--heading-tint)]">BeyimTech</b> (EdTech, Astana Hub) to building smart contract interfaces at <b className="text-[var(--heading-tint)]">TrustMe</b> for over 1.5 million users and delivering the <b className="text-[var(--heading-tint)]">OpenGov.kz</b> frontend, I bridge visual excellence with rock-solid engineering.
            </p>
          </div>

          {/* Highlight Badges (Aligned with bottom line of avatar) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 mt-auto">
            <div className="cyber-panel p-5 rounded-xl flex flex-col justify-between gap-3">
              <GraduationCap className="w-5 h-5 text-[var(--accent-color)] shrink-0" />
              <div>
                <div className="text-xs font-bold text-[var(--heading-tint)]">Astana IT University</div>
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5">B.S. Software Eng. (2025)</div>
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

      {/* 8-Sector Technical Competency Matrix */}
      <section className="mb-24 sm:mb-28">
        <div className="border-b border-[var(--border-subtle)] pb-4 mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--heading-tint)] font-display uppercase tracking-wide">
              Technical Competency Matrix
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">Structured across 8 specialized engineering sectors</p>
          </div>
          <span className="text-xs text-[var(--accent-color)] font-bold font-mono">[SECTORS: 08]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {fullTechSectors.map((sector, idx) => (
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
              Career History & Logs
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">Verified enterprise & startup accomplishments</p>
          </div>
          <span className="text-xs text-[var(--accent-color)] font-bold font-mono">[LOGS: 05]</span>
        </div>

        <div className="space-y-5">
          {exp.logs.map((log, idx) => (
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
          Ready to build something legendary?
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto font-sans leading-relaxed">
          Open for full-time frontend and mobile roles, high-impact contract engineering, and architectural consultations.
        </p>
        <Link
          href="/contact"
          onClick={playClick}
          onMouseEnter={playHover}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[var(--accent-color)] text-[#06080A] font-bold text-xs tracking-widest uppercase hover:shadow-[0_0_30px_var(--accent-glow)] transition-all hover:scale-105 active:scale-95"
        >
          <span>INITIATE CONTACT</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
