import type { Metadata } from 'next';
import ProjectsContent from '@/components/projects/ProjectsContent';
import { getDictionary } from '@/content';
import { resolveLocale, type LangParams } from '@/i18n/params';
import { pageMetadata } from '@/lib/site';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { meta } = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: '/projects',
    title: `${meta.projects.title} // HUD Showcase`,
    description: meta.projects.description,
    keywords: ['Dias Yermek Projects', 'RoleSieve HeadHunter Analytics', 'React Native Portfolio', 'Next.js 16 Applications', 'FastAPI', 'OpenGov.kz', 'Finance Management AI', 'Mobile App Developer Kazakhstan'],
  });
}

export default async function ProjectsPage({ params }: LangParams) {
  const locale = await resolveLocale(params);
  const { projects } = await getDictionary(locale);
  return <ProjectsContent projects={projects} />;
}
