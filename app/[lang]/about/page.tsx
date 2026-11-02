import type { Metadata } from 'next';
import AboutContent from '@/components/about/AboutContent';
import { getDictionary } from '@/content';
import { resolveLocale, type LangParams } from '@/i18n/params';
import { pageMetadata } from '@/lib/site';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { meta } = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: '/about',
    title: `${meta.about.title} // Competency Matrix`,
    description: meta.about.description,
    keywords: ['Dias Yermek', 'Software Engineer Astana', 'Frontend Architecture', 'Flutter Developer', 'React Native', 'Next.js 16', 'Astana IT University', 'BeyimTech', 'TrustMe'],
  });
}

export default async function AboutPage({ params }: LangParams) {
  const locale = await resolveLocale(params);
  const { about } = await getDictionary(locale);
  return <AboutContent about={about} />;
}
