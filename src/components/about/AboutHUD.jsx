'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { portfolioContent } from '../../data/portfolioData';
import SectorMatrix from './SectorMatrix';
import { UserCheck, Award, GraduationCap, Building2 } from 'lucide-react';

export default function AboutHUD() {
  const { lang, playHover } = useThemeAudio();
  const content = portfolioContent[lang];
  const about = content.about;

  return (
    <section id="about" className="py-24 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag & Title */}
        <div className="mb-12 font-mono">
          <div className="flex items-center gap-2 text-xs text-[var(--accent-color)] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
            <span>{about.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
            {about.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Biography & Career Highlights */}
          <div className="lg:col-span-5 space-y-6 font-mono">
            <div className="cyber-panel rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[var(--accent-color)]" />
                <span>Dias Yermek</span>
              </h3>
              <p className="text-sm text-white/90 leading-relaxed">
                {about.lead}
              </p>
              <p className="text-xs text-white/60 leading-relaxed">
                {about.story}
              </p>
            </div>

            {/* Quick Credentials Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded bg-white/5 border border-white/10 flex items-start gap-2.5">
                <GraduationCap className="w-4 h-4 text-[var(--accent-color)] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Astana IT University</div>
                  <div className="text-[11px] text-white/50">B.S. Software Engineering (2025)</div>
                </div>
              </div>

              <div className="p-3.5 rounded bg-white/5 border border-white/10 flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[var(--accent-color)] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Astana Hub / EdTech</div>
                  <div className="text-[11px] text-white/50">BeyimTech Mobile & Web Lead</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Sector Technical Competency Matrix */}
          <div className="lg:col-span-7">
            <SectorMatrix />
          </div>
        </div>
      </div>
    </section>
  );
}
