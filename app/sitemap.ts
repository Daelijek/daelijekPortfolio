import type { MetadataRoute } from 'next';
import { getCaseStudySlugs } from '@/content';
import { LOCALES, localizePath } from '@/i18n/config';
import { absoluteUrl } from '@/lib/site';

type Entry = MetadataRoute.Sitemap[number];

// Every page in every locale, each listing its translations (hreflang) so search
// engines treat /about, /ru/about and /kk/about as one page in three languages.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const pages: { path: string; changeFrequency: Entry['changeFrequency']; priority: number }[] = [
    { path: '/', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/projects', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
    ...(await getCaseStudySlugs()).map((slug) => ({
      path: `/projects/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ];

  return pages.flatMap(({ path, changeFrequency, priority }) => {
    const languages = Object.fromEntries(LOCALES.map((l) => [l, absoluteUrl(localizePath(path, l))]));
    return LOCALES.map((locale) => ({
      url: absoluteUrl(localizePath(path, locale)),
      lastModified,
      changeFrequency,
      // Translations rank slightly below the English original.
      priority: locale === 'en' ? priority : Math.round(priority * 90) / 100,
      alternates: { languages },
    }));
  });
}
