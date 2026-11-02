'use client';

import { motion as Motion } from 'framer-motion';
import { CheckCircle2, UserCheck, Users } from 'lucide-react';
import type { DetailUi, FeaturedProject } from './types';

/** Challenge and solution, audience and role. */
export default function ProjectNarrative({ project, t }: { project: FeaturedProject; t: DetailUi }) {
  const challengeTitle = t.theChallenge;
  const solutionTitle = t.theSolution;
  const audienceLabel = t.targetAudience;
  const roleLabel = t.role;

  return (
    <Motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.05 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="mb-16 sm:mb-24 space-y-8"
    >
      {/* Section Introduction */}
      <div className="space-y-3">
        <span className="text-xs font-mono font-bold text-[var(--accent-color)] tracking-wider uppercase">
          // CASE_STUDY_OVERVIEW
        </span>
        <p className="text-lg sm:text-2xl text-white font-display font-bold leading-relaxed max-w-4xl">
          {project.overview?.lead || project.description}
        </p>
      </div>

      {/* Two-Column Problem vs Solution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* The Challenge Column */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#06090E]/90 border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2.5 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>{challengeTitle}</span>
          </div>
          <p className="text-sm sm:text-base text-white/75 leading-relaxed font-sans">
            {project.overview?.challenge ||
              'Managing fragmented financial workflows with slow mobile interactions and lack of automated insights.'}
          </p>
          {project.walkthrough?.concept?.highlights && (
            <ul className="space-y-2.5 pt-4 border-t border-white/[0.06] text-xs sm:text-sm text-white/70 font-sans">
              {project.walkthrough.concept.highlights.map((h, hIdx) => (
                <li key={hIdx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 mt-1.5 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* The Solution Column */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#06090E]/90 border border-[var(--accent-color)]/30 space-y-4 relative overflow-hidden">
          <div className="flex items-center gap-2.5 text-[var(--accent-color)] font-mono text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-color)]" />
            <span>{solutionTitle}</span>
          </div>
          <p className="text-sm sm:text-base text-white/85 leading-relaxed font-sans">
            {project.overview?.solution ||
              'Engineered a high-performance React Native & FastAPI system with local encryption, modular API, and AI advisory.'}
          </p>
          {project.walkthrough?.architecture?.highlights && (
            <ul className="space-y-2.5 pt-4 border-t border-white/[0.06] text-xs sm:text-sm text-white/80 font-sans">
              {project.walkthrough.architecture.highlights.map((h, hIdx) => (
                <li key={hIdx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-color)] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Scope & Audience Context */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3.5">
          <Users className="w-4 h-4 text-[var(--accent-color)] shrink-0 mt-1" />
          <div className="space-y-1">
            <span className="block text-xs font-mono font-bold text-white/50 uppercase tracking-wider">
              {audienceLabel}
            </span>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
              {project.overview?.targetAudience || 'Modern users seeking organized finance'}
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3.5">
          <UserCheck className="w-4 h-4 text-[var(--accent-color)] shrink-0 mt-1" />
          <div className="space-y-1">
            <span className="block text-xs font-mono font-bold text-white/50 uppercase tracking-wider">
              {roleLabel}
            </span>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
              {project.overview?.myRole || project.dossier?.primaryRole || 'Lead Frontend & Mobile Engineer'}
            </p>
          </div>
        </div>
      </div>
    </Motion.section>
  );
}
