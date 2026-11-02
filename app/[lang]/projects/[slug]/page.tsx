import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectDetailContent from '@/components/project/ProjectDetailContent';
import { getCaseStudy, getCaseStudySlugs, getDictionary } from '@/content';
import { resolveLocale } from '@/i18n/params';
import { pageMetadata, projectOgImage } from '@/lib/site';

interface CaseStudyParams {
  params: Promise<{ lang: string; slug: string }>;
}

// Only featured projects have case studies; archive repositories link to GitHub directly.
// Legacy aliases (e.g. /projects/role-sieve) are permanent redirects in next.config.mjs.
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getCaseStudySlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
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

  const index = projects.featured.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects.featured[index];

  // Only the teaser fields of the next case study are sent to the client, not the whole list.
  const next = projects.featured[(index + 1) % projects.featured.length];
  const nextProject = {
    num: next.num,
    slug: next.slug,
    title: next.title,
    category: next.category,
    tags: next.tags,
    image: next.image,
  };

  return <ProjectDetailContent project={project} nextProject={nextProject} ui={projects.detailUi} />;
}
