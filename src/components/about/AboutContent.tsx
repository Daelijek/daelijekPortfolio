'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import type { Dictionary } from '@/content/types';
import AboutCta from './AboutCta';
import AboutIntro from './AboutIntro';
import CompetencyMatrix from './CompetencyMatrix';
import Credentials from './Credentials';
import ExperienceTimeline from './ExperienceTimeline';
import Principles from './Principles';
import ProfileSidebar from './ProfileSidebar';

export default function AboutContent({ about }: { about: Dictionary['about'] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Page scroll progress shown in the profile sidebar.
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  useEffect(
    () => scrollYProgress.on('change', (latest) => setScrollPercent(Math.min(100, Math.max(0, Math.round(latest * 100))))),
    [scrollYProgress]
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-36 px-5 sm:px-8 lg:px-14 xl:px-20 max-w-[1720px] mx-auto font-mono selection:bg-[var(--accent-color)] selection:text-[#040608] overflow-x-clip"
    >
      {/* 1. TOP HEADER SYSTEM TELEMETRY TAG */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.05 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-10 sm:mb-14"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-ping" />
          <span className="text-xs font-bold text-[var(--accent-color)] tracking-widest uppercase">
            {about.tag || '// SECTOR_00 · BIOGRAPHY & TELEMETRY'}
          </span>
        </div>
        <div className="text-xs text-white/55 hidden sm:flex items-center gap-2">
          <span>PORTFOLIO // 2026</span>
          <span className="text-[var(--accent-color)]">&bull;</span>
          <span>DIAS YERMEK</span>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14 xl:gap-20">
        <ProfileSidebar scrollPercent={scrollPercent} />

        <div className="flex-1 min-w-0 space-y-20 sm:space-y-24">
          <AboutIntro about={about} />
          <CompetencyMatrix about={about} />
          <ExperienceTimeline experience={about.experience} />
          <Credentials about={about} />
          <Principles about={about} />
          <AboutCta />
        </div>
      </div>
    </div>
  );
}
