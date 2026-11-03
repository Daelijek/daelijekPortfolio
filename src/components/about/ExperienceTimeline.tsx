'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import type { Dictionary } from '@/content/types';

/** Career timeline whose progress line follows the centre of the viewport. */
export default function ExperienceTimeline({ experience: exp }: { experience: Dictionary['about']['experience'] }) {
  const timelineRef = useRef<HTMLElement>(null);
  // Progress is pinned to the centre (50%) of the viewport.
  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  return (
    <section ref={timelineRef} className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.05 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="border-b border-white/[0.08] pb-4 flex items-center justify-between"
      >
        <div>
          <span className="text-xs font-mono font-bold text-[var(--accent-color)] tracking-wider uppercase block mb-1">
            // CAREER_PATH
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight">
            {exp.title}
          </h2>
          <p className="text-xs text-white/50 mt-1 font-sans">{exp.subtitle}</p>
        </div>
        <span className="text-xs text-[var(--accent-color)] font-bold font-mono">
          [TRACK: {exp.logs.length.toString().padStart(2, '0')}]
        </span>
      </motion.div>

      {/* Kinetic Timeline: Line anchored to center of screen */}
      <div className="relative">
        {/* Inactive Background Rail */}
        <div className="absolute left-[15px] sm:left-[19px] top-6 bottom-8 w-[2px] bg-white/10 rounded-full pointer-events-none" />

        {/* Scroll-Driven Glowing Neon Active Line */}
        <motion.div
          style={{ scaleY: timelineScrollProgress, originY: 0 }}
          className="absolute left-[15px] sm:left-[19px] top-6 bottom-8 w-[2px] bg-gradient-to-b from-[var(--accent-color)] via-emerald-400 to-[var(--accent-color)] rounded-full shadow-[0_0_15px_var(--accent-color)] origin-top pointer-events-none"
        />

        {/* Timeline Items (Clean Editorial Lines, No Card Boxes) */}
        <div className="space-y-8 sm:space-y-12">
          {exp.logs.map((log, idx) => (
            <motion.div
              key={log.code || idx}
              initial={{ opacity: 0, y: 20, x: -8 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: false, amount: 0.05 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-start gap-4 sm:gap-6 group"
            >
              {/* Center Timeline Node */}
              <div className="relative z-10 shrink-0 w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center mt-2">
                <div className="w-4 sm:w-4.5 h-4 sm:h-4.5 rounded-full bg-[#020504] border-2 border-[var(--accent-color)] shadow-[0_0_10px_var(--accent-glow)] group-hover:scale-125 group-hover:border-white transition-all flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] group-hover:bg-white transition-colors" />
                </div>
              </div>

              {/* Content Block (Clean Border Bottom, Open Canvas) */}
              <div className="flex-1 min-w-0 pb-6 sm:pb-8 border-b border-white/[0.08] space-y-3.5">
                {/* Header: Company, Role & Period */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg sm:text-2xl font-black text-white font-display tracking-tight group-hover:text-[var(--accent-color)] transition-colors">
                        {log.company}
                      </h3>
                      {log.badge && (
                        <span className="px-2.5 py-0.5 rounded text-[10px] bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 text-[var(--accent-color)] font-mono font-bold tracking-wider">
                          {log.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-white/70 font-mono">
                      {log.role}
                    </div>
                  </div>

                  <div className="text-xs font-mono text-[var(--accent-color)] font-bold shrink-0">
                    {log.period}
                  </div>
                </div>

                {/* Bullet Points with Markers */}
                <ul className="space-y-2 pt-1 font-sans">
                  {log.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/70 leading-relaxed">
                      <span className="text-[var(--accent-color)] font-mono mt-0.5">&bull;</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
