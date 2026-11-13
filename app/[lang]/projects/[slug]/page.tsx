import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectDetailContent from '@/components/project/ProjectDetailContent';
import { getCaseStudy, getCaseStudySlugs, getDictionary } from '@/content';
import { CASE_FIXTURES } from '@/content/fixtures';
import { mediaFor } from '@/content/media';
import { resolveLocale } from '@/i18n/params';
import { pageMetadata, projectOgImage } from '@/lib/site';

interface CaseStudyParams {
  params: Promise<{ lang: string; slug: string }>;
}

// Only featured projects have case studies; archive repositories link to GitHub directly.
// Legacy aliases (e.g. /projects/role-sieve) are permanent redirects in next.config.mjs.
export const dynamicParams = false;

export async function generateStaticParams() {
  // Edge-case fixtures exist only in CASE_FIXTURES=1 builds (template tests), see src/content/fixtures.ts.
  const slugs = [...(await getCaseStudySlugs()), ...CASE_FIXTURES.map((fixture) => fixture.slug)];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  if (CASE_FIXTURES.some((fixture) => fixture.slug === slug)) {
    return { title: `Template fixture: ${slug} // Dias Yermek`, robots: { index: false, follow: false } };
  }
  const project = await getCaseStudy(locale, slug);
  if (!project) return {};
  const { meta } = await getDictionary(locale);

  return pageMetadata({
    locale,
    path: `/projects/${project.slug}`,
    title: `${project.title} | ${meta.caseStudy} // Dias Yermek`,
    description: project.tagline || project.description,
    image: projectOgImage(project.slug, project.title),
    type: 'article',
    keywords: [project.title, ...project.tags, 'Dias Yermek', 'Case Study'],
  });
}

export default async function CaseStudyPage({ params }: CaseStudyParams) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const { projects } = await getDictionary(locale);

  const caseStudies = [...projects.featured, ...CASE_FIXTURES];
  const index = caseStudies.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = caseStudies[index];

  // Only the teaser fields of the next case study are sent to the client, not the whole list.
  const next = caseStudies[(index + 1) % caseStudies.length];
  const nextProject = {
    num: next.num,
    slug: next.slug,
    title: next.title,
    category: next.category,
    tags: next.tags,
    image: next.image,
    liveUrl: next.liveUrl,
  };

  // Sizes and blurred previews of the images this page shows (cover, screens, next cover).
  const media = mediaFor([project.image, ...(project.gallery ?? []).map((item) => item.image), next.image]);

  return <ProjectDetailContent project={project} nextProject={nextProject} ui={projects.detailUi} media={media} />;
}
