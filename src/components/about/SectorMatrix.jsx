'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { portfolioContent } from '../../data/portfolioData';
import { Layers, ShieldCheck, Terminal, Smartphone, Database, BrainCircuit } from 'lucide-react';

const sectorIcons = [
  <Layers key="1" className="w-4 h-4 text-[var(--accent-color)]" />,
  <Smartphone key="2" className="w-4 h-4 text-[var(--accent-color)]" />,
  <Database key="3" className="w-4 h-4 text-[var(--accent-color)]" />,
  <BrainCircuit key="4" className="w-4 h-4 text-[var(--accent-color)]" />,
];

export default function SectorMatrix() {
  const { lang, playHover } = useThemeAudio();
  const content = portfolioContent[lang];
  const sectors = content.about.sectors;

  return (
    <div className="space-y-6 font-mono">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="text-xs text-white/50">{content.about.sectorsSubtitle}</div>
        <span className="text-[11px] text-[var(--accent-color)]">[ACTIVE_MODULES: 04]</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sectors.map((sector, idx) => (
          <motion.div
            key={sector.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="cyber-panel rounded-lg p-5 border border-white/10 hover:border-[var(--accent-border)] transition-all group"
          >
            {/* Sector Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                {sectorIcons[idx % sectorIcons.length]}
                <span className="text-xs font-bold text-white group-hover:text-[var(--accent-color)] transition-colors">
                  {sector.title}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[var(--accent-color)] border border-white/5">
                {sector.code}
              </span>
            </div>

            {/* Chips with Hex indices */}
            <div className="grid grid-cols-2 gap-2">
              {sector.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  onMouseEnter={playHover}
                  className="flex items-center gap-2 p-2 rounded bg-[#040608]/80 border border-white/5 hover:border-[var(--accent-border)] transition-all cursor-default text-xs"
                >
                  <span className="text-[10px] text-[var(--accent-color)] font-semibold opacity-70">
                    {skill.hex}
                  </span>
                  <span className="text-white/80 font-medium truncate">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
