'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { portfolioContent } from '../../data/portfolioData';
import ProjectCard from './ProjectCard';
import { FolderGit2, ExternalLink, Code2, Sparkles } from 'lucide-react';

export default function ProjectsHUD() {
  const { lang, playHover, playClick } = useThemeAudio();
  const content = portfolioContent[lang];
  const projects = content.projects;

  return (
    <section id="projects" className="py-24 relative border-t border-white/5 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs text-[var(--accent-color)] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
            <span>{projects.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans mb-3">
            {projects.title}
          </h2>
          <p className="text-xs text-white/50">{projects.subtitle}</p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.featured.map((proj, idx) => (
            <ProjectCard key={proj.id} project={proj} index={idx} />
          ))}
        </div>

        {/* System Archive & Mini Projects */}
        <div className="mt-20">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-[var(--accent-color)]" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {projects.otherTitle}
              </h3>
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
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="cyber-panel p-5 rounded-lg border border-white/10 hover:border-[var(--accent-border)] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-[10px] text-[var(--accent-color)] font-bold">
                      // {mini.id}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-[var(--accent-color)] transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2 group-hover:text-[var(--accent-color)] transition-colors">
                    {mini.title}
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed mb-4">
                    {mini.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {mini.tags.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-white/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
