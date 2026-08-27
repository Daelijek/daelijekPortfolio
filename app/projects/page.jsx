'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useThemeAudio } from '../../src/context/ThemeAudioContext';
import { portfolioContent } from '../../src/data/portfolioData';
import { ExternalLink, ArrowRight, FolderGit2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

export default function ProjectsPage() {
  const { lang, playHover, playClick } = useThemeAudio();
  const content = portfolioContent[lang];
  const projects = content.projects;

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-36 px-6 sm:px-12 max-w-7xl mx-auto font-mono">
      {/* Featured Projects Flow Rail */}
      <div className="space-y-16 mb-24">
        {projects.featured.map((proj, idx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="cyber-panel rounded-2xl overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition-all group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Column: Metadata & Narrative */}
              <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-3 text-xs mb-3">
                    <span className="text-2xl font-black text-[var(--accent-color)] font-display">{proj.num}</span>
                    <span className="text-[11px] text-[var(--text-muted)] font-mono">// {proj.category}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--heading-tint)] font-display group-hover:text-[var(--accent-color)] transition-colors mb-4">
                    {proj.title}
                  </h2>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans mb-6">
                    {proj.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded bg-[var(--accent-bg-subtle)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-6 border-t border-[var(--border-subtle)]">
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      onMouseEnter={playHover}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--accent-color)] text-[#06080A] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_var(--accent-glow)] transition-all hover:scale-105 active:scale-95"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>LIVE DEMO</span>
                    </a>
                  )}

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      onMouseEnter={playHover}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-black/40 border border-[var(--border-subtle)] hover:border-[var(--accent-border)] text-[var(--text-secondary)] hover:text-[var(--heading-tint)] font-bold text-xs tracking-wider uppercase transition-all"
                    >
                      <FaGithub className="w-4 h-4" />
                      <span>SOURCE CODE</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Media Viewport Frame with HUD */}
              <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[420px] bg-[#040608] overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10">
                {/* Top HUD bar */}
                <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent text-[10px] text-white/60">
                  <span>PROJECT_ID: // {proj.id}</span>
                  <span className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[var(--accent-color)] font-bold">
                    {proj.status}
                  </span>
                </div>

                {/* Scanline overlay */}
                <div className="absolute inset-0 z-10 scanlines-overlay opacity-30 group-hover:opacity-10 transition-opacity" />

                {/* Project Image */}
                <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Bottom HUD bar */}
                <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-t from-black/80 to-transparent text-[10px] text-white/60">
                  <span>SYSTEM_READY</span>
                  <span className="text-[var(--accent-color)]">[DATA_STREAM]</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* System Archive & Experiments */}
      <section>
        <div className="border-b border-white/10 pb-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-[var(--accent-color)]" />
            <h2 className="text-xl font-bold text-white font-sans uppercase">
              System Archive & Secondary Projects
            </h2>
          </div>
          <span className="text-xs text-white/40">[INDEX_COUNT: 06]</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.otherProjects.map((mini, idx) => (
            <motion.a
              key={mini.id}
              href={mini.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="cyber-panel p-6 rounded-xl border border-white/10 hover:border-[var(--accent-border)] transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-[10px] text-[var(--accent-color)] font-bold">
                    // {mini.id}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-[var(--accent-color)] transition-colors" />
                </div>
                <h3 className="text-base font-bold text-white font-sans mb-2 group-hover:text-[var(--accent-color)] transition-colors">
                  {mini.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-sans mb-4">
                  {mini.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                {mini.tags.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-white/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </div>
  );
}
