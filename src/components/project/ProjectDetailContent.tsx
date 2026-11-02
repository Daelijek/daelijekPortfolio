'use client';

import { useMemo, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import GalleryLightbox from './GalleryLightbox';
import GalleryRibbon from './GalleryRibbon';
import NextProjectFooter from './NextProjectFooter';
import ProjectArchitecture from './ProjectArchitecture';
import ProjectCapabilities from './ProjectCapabilities';
import ProjectHeader from './ProjectHeader';
import ProjectHero from './ProjectHero';
import ProjectNarrative from './ProjectNarrative';
import type { DetailUi, FeaturedProject, GalleryItem, NextProjectTeaser } from './types';

interface ProjectDetailContentProps {
  /** The case study being shown (resolved on the server). */
  project: FeaturedProject;
  /** Summary of the following case study for the footer teaser. */
  nextProject: NextProjectTeaser;
  ui: DetailUi;
}

export default function ProjectDetailContent({ project, nextProject, ui: t }: ProjectDetailContentProps) {
  const { playHover, playClick } = useThemeAudio();
  const [activeModalScreen, setActiveModalScreen] = useState<GalleryItem | null>(null);

  // Phone mockups for mobile apps, browser windows for web projects.
  const isMobileProject = useMemo(() => {
    if (project.slug === 'finance-management-app') return true;
    const platform = (project.dossier?.targetPlatform || '').toLowerCase();
    const category = (project.category || '').toLowerCase();
    return (platform.includes('ios') || platform.includes('android') || category.includes('mobile')) && !category.includes('web') && !platform.includes('web');
  }, [project]);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-[var(--accent-color)] selection:text-[#040608] pb-0 overflow-x-clip">
      <ProjectHeader project={project} t={t} />

      <div className="w-[90%] max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 pt-28 sm:pt-32 md:pt-16">
        <ProjectHero project={project} t={t} />

        {project.gallery && project.gallery.length > 0 && (
          <Motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 sm:mb-24 space-y-6"
          >
            <GalleryRibbon
              items={project.gallery}
              t={t}
              playClick={playClick}
              playHover={playHover}
              onOpenModal={setActiveModalScreen}
              isModalOpen={Boolean(activeModalScreen)}
              isMobileGallery={isMobileProject}
            />
          </Motion.section>
        )}

        <ProjectNarrative project={project} t={t} />
        <ProjectArchitecture project={project} t={t} />
        <ProjectCapabilities project={project} t={t} />
      </div>

      <NextProjectFooter nextProject={nextProject} t={t} />

      <GalleryLightbox screen={activeModalScreen} onClose={() => setActiveModalScreen(null)} isMobileProject={isMobileProject} />
    </div>
  );
}
