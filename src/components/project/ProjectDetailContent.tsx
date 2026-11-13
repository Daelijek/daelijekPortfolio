'use client';

import { useCallback, useState, type CSSProperties } from 'react';
import { useReducedMotion } from 'framer-motion';
import GalleryLightbox from './GalleryLightbox';
import { MediaProvider } from './media';
import NextProjectFooter from './NextProjectFooter';
import ProjectArchitecture from './ProjectArchitecture';
import ProjectCapabilities from './ProjectCapabilities';
import ProjectHeader from './ProjectHeader';
import ProjectHero from './ProjectHero';
import ProjectNarrative from './ProjectNarrative';
import ScreenDeck from './ScreenDeck';
import SectionRail, { jumpToSection } from './SectionRail';
import type { MediaMap } from '@/content/media';
import type { CaseSection, DetailUi, FeaturedProject, GalleryItem, LightboxState, NextProjectTeaser } from './types';
import { frameAddress, splitTitle } from './ui';

interface ProjectDetailContentProps {
  /** The case study being shown (resolved on the server). */
  project: FeaturedProject;
  /** Summary of the following case study for the footer teaser. */
  nextProject: NextProjectTeaser;
  ui: DetailUi;
  /** Real sizes and blurred previews of the images on this page. */
  media: MediaMap;
}

/**
 * Case-study page. Reading order: overview (pitch, spec sheet, cover, key numbers) ->
 * challenge & solution -> screens -> capabilities -> architecture -> next case study.
 */
export default function ProjectDetailContent({ project, nextProject, ui: t, media }: ProjectDetailContentProps) {
  const reducedMotion = useReducedMotion();
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  // Screen the deck jumps to after the lightbox closes (`n` makes repeated values distinct).
  const [deckSync, setDeckSync] = useState<{ index: number; n: number } | null>(null);

  const [name, descriptor] = splitTitle(project.title);
  const gallery: GalleryItem[] = project.gallery ?? [];
  const hasFeatures = (project.walkthrough?.features?.length ?? 0) > 0;
  // "Challenge & Solution" only when there is a challenge, a solution or a role to show.
  const hasStory = Boolean(project.overview?.challenge || project.overview?.solution || project.overview?.myRole);
  // Phone mockups for mobile apps, window frames for web projects (set per project in the content).
  const isMobileGallery = project.galleryKind === 'phone';
  const address = frameAddress(project);

  // Sections present on this page, numbered in reading order (drives headings and the rail).
  const sections: CaseSection[] = [
    { id: 'overview', label: t.navOverview },
    ...(hasStory ? [{ id: 'story', label: t.navStory }] : []),
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
      source: 'cover',
    });
  const navigateLightbox = useCallback((index: number) => setLightbox((state) => state && { ...state, index }), []);
  const closeLightbox = useCallback(() => {
    // The deck follows the lightbox: it shows the screen the visitor stopped on.
    if (lightbox?.source === 'gallery') setDeckSync((sync) => ({ index: lightbox.index, n: (sync?.n ?? 0) + 1 }));
    setLightbox(null);
  }, [lightbox]);

  return (
    <MediaProvider media={media}>
    <div
      className="case-study min-h-screen text-white font-sans selection:bg-[var(--accent-color)] selection:text-[#040608] pb-0 overflow-x-clip"
      style={{ '--case-name-len': name.length } as CSSProperties}
    >
      <ProjectHeader project={project} name={name} sections={sections} t={t} />
      <SectionRail sections={sections} label={t.caseSections} />

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

        {hasStory && <ProjectNarrative project={project} t={t} index={indexOf('story')} />}

        <ScreenDeck
          items={gallery}
          t={t}
          index={indexOf('screens')}
          isMobileGallery={isMobileGallery}
          address={address}
          isPaused={lightbox !== null}
          syncTo={deckSync}
          onOpen={(index) => setLightbox({ items: gallery, index, phone: isMobileGallery, source: 'gallery' })}
        />

        <ProjectCapabilities project={project} t={t} index={indexOf('features')} />
        <ProjectArchitecture project={project} t={t} index={indexOf('stack')} />
      </main>

      <NextProjectFooter nextProject={nextProject} t={t} />

      <GalleryLightbox state={lightbox} t={t} address={address} onNavigate={navigateLightbox} onClose={closeLightbox} />
    </div>
    </MediaProvider>
  );
}
