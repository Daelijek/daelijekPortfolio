'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { ExternalLink, Eye, Terminal } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import Image from 'next/image';

export default function ProjectCard({ project, index }) {
  const { playHover, playClick } = useThemeAudio();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="cyber-panel rounded-xl overflow-hidden border border-white/10 hover:border-[var(--accent-border)] transition-all group font-mono flex flex-col justify-between"
    >
      {/* Top HUD Media Viewport Frame */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#040608] border-b border-white/10">
        {/* Top HUD Telemetry bar */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-3 bg-gradient-to-b from-black/80 to-transparent text-[10px] text-white/60">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent-color)] font-bold">[{project.num}]</span>
            <span className="tracking-wider">PROJECT_ID: // {project.id}</span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] text-[var(--accent-color)]">
            {project.status}
          </span>
        </div>

        {/* Scanline overlay */}
        <div className="absolute inset-0 z-10 scanlines-overlay opacity-40 group-hover:opacity-20 transition-opacity" />

        {/* Media Image */}
        <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Bottom HUD bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between p-3 bg-gradient-to-t from-black/80 to-transparent text-[10px] text-white/60">
          <span>SYSTEM_READY</span>
          <span className="text-[var(--accent-color)]">[DATA_STREAM]</span>
        </div>
      </div>

      {/* Content & Metadata */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <div className="text-xs text-[var(--accent-color)] font-semibold">
            {project.category}
          </div>
          <h3 className="text-xl font-bold text-white font-sans group-hover:text-[var(--accent-color)] transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-white/70 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-white/60 group-hover:border-white/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-3 pt-2 border-t border-white/10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="flex items-center gap-2 px-4 py-2 rounded bg-[var(--accent-color)] text-[#06080A] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_15px_var(--accent-glow)] transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LIVE DEMO</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="flex items-center gap-2 px-3.5 py-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white hover:text-[var(--accent-color)] transition-colors"
              >
                <FaGithub className="w-3.5 h-3.5" />
                <span>SOURCE</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
