'use client';

import { useCallback, useState, type CSSProperties } from 'react';
import { useReducedMotion } from 'framer-motion';
import GalleryLightbox from './GalleryLightbox';
import NextProjectFooter from './NextProjectFooter';
import ProjectArchitecture from './ProjectArchitecture';
import ProjectCapabilities from './ProjectCapabilities';
import ProjectHeader from './ProjectHeader';
import ProjectHero from './ProjectHero';
import ProjectNarrative from './ProjectNarrative';
import ScreenDeck from './ScreenDeck';
import SectionRail, { jumpToSection } from './SectionRail';
import type { CaseSection, DetailUi, FeaturedProject, GalleryItem, LightboxState, NextProjectTeaser } from './types';
import { frameAddress, splitTitle } from './ui';

interface ProjectDetailContentProps {
  /** The case study being shown (resolved on the server). */
  project: FeaturedProject;
  /** Summary of the following case study for the footer teaser. */
  nextProject: NextProjectTeaser;
  ui: DetailUi;
}

/** Phone mockups for mobile apps, wide frames for web projects. */
function isMobileApp(project: FeaturedProject) {
  const platform = (project.dossier?.targetPlatform || '').toLowerCase();
  const category = (project.category || '').toLowerCase();
  const mentionsMobile = platform.includes('ios') || platform.includes('android') || category.includes('mobile');
  return mentionsMobile && !category.includes('web') && !platform.includes('web');
}

/**
 * Case-study page. Reading order: overview (pitch, spec sheet, cover, key numbers) ->
 * challenge & solution -> screens -> capabilities -> architecture -> next case study.
 */
export default function ProjectDetailContent({ project, nextProject, ui: t }: ProjectDetailContentProps) {
  const reducedMotion = useReducedMotion();
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const [name, descriptor] = splitTitle(project.title);
  const gallery: GalleryItem[] = project.gallery ?? [];
  const hasFeatures = (project.walkthrough?.features?.length ?? 0) > 0;
  const isMobileGallery = isMobileApp(project);
  const address = frameAddress(project);

  // Sections present on this page, numbered in reading order (drives headings and the rail).
  const sections: CaseSection[] = [
    { id: 'overview', label: t.navOverview },
    { id: 'story', label: t.navStory },
    ...(gallery.length > 0 ? [{ id: 'screens', label: t.navScreens }] : []),
    ...(hasFeatures ? [{ id: 'features', label: t.navFeatures }] : []),
    { id: 'stack', label: t.navStack },
  ].map((section, i) => ({ ...section, index: String(i + 1).padStart(2, '0') }));
  const indexOf = (id: string) => sections.find((section) => section.id === id)?.index ?? '';

  const openCover = () =>
    setLightbox({
      items: [{ id: '00', title: project.title, subtitle: project.tagline || project.description, tag: project.category, image: project.image }],
      index: 0,
      phone: false,
    });
  const navigateLightbox = useCallback((index: number) => setLightbox((state) => state && { ...state, index }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <div
      className="case-study min-h-screen text-white font-sans selection:bg-[var(--accent-color)] selection:text-[#040608] pb-0 overflow-x-clip"
      style={{ '--case-name-len': name.length } as CSSProperties}
    >
      <ProjectHeader project={project} name={name} t={t} />
      <SectionRail sections={sections} />

      {/* Desktop top padding reserves the line occupied by the hero title (see ProjectHeader). */}
      <main className="w-[90%] max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 pt-28 sm:pt-32 md:pt-[calc(var(--case-title-size)_+_1.75rem)]">
        <ProjectHero
          project={project}
          name={name}
          descriptor={descriptor}
          t={t}
          screensCount={gallery.length}
          onOpenCover={openCover}
          onViewScreens={() => jumpToSection('screens', Boolean(reducedMotion))}
        />

        <ProjectNarrative project={project} t={t} index={indexOf('story')} />

        <ScreenDeck
          items={gallery}
          t={t}
          index={indexOf('screens')}
          isMobileGallery={isMobileGallery}
          address={address}
          isPaused={lightbox !== null}
          onOpen={(index) => setLightbox({ items: gallery, index, phone: isMobileGallery })}
        />

        <ProjectCapabilities project={project} t={t} index={indexOf('features')} />
        <ProjectArchitecture project={project} t={t} index={indexOf('stack')} />
      </main>

      <NextProjectFooter nextProject={nextProject} t={t} />

      <GalleryLightbox state={lightbox} t={t} address={address} onNavigate={navigateLightbox} onClose={closeLightbox} />
    </div>
  );
}
