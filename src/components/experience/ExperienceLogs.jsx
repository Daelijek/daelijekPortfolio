'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { portfolioContent } from '../../data/portfolioData';
import { Terminal, Shield, CheckCircle2, ChevronRight } from 'lucide-react';

export default function ExperienceLogs() {
  const { lang, playHover } = useThemeAudio();
  const content = portfolioContent[lang];
  const experience = content.experience;

  return (
    <section id="experience" className="py-24 relative border-t border-white/5 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs text-[var(--accent-color)] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
            <span>{experience.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans mb-3">
            {experience.title}
          </h2>
          <p className="text-xs text-white/50">{experience.subtitle}</p>
        </div>

        {/* Timeline Terminal Logs */}
        <div className="space-y-6">
          {experience.logs.map((log, idx) => (
            <motion.div
              key={log.code}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={playHover}
              className="cyber-panel rounded-lg p-6 border border-white/10 hover:border-[var(--accent-border)] transition-all group"
            >
              {/* Log Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-4 gap-2">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-[var(--accent-glow)] border border-[var(--accent-border)] text-xs text-[var(--accent-color)] font-bold">
                    {log.code}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white font-sans group-hover:text-[var(--accent-color)] transition-colors">
                      {log.company}
                    </h3>
                    <div className="text-xs text-white/50">{log.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="px-2 py-0.5 rounded bg-white/5 text-white/60">
                    {log.badge}
                  </span>
                  <span className="text-[var(--accent-color)] font-semibold">
                    {log.period}
                  </span>
                </div>
              </div>

              {/* Log Action Bullet Points */}
              <ul className="space-y-2.5">
                {log.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-white/75 leading-relaxed">
                    <ChevronRight className="w-4 h-4 text-[var(--accent-color)] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
