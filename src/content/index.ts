import 'server-only';
import { DEFAULT_LOCALE, type Locale } from '../i18n/config';
import type { Dictionary, FeaturedProject } from './types';

// Each locale is a separate module, so a page only loads the dictionary it renders.
const loaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  en: () => import('./locales/en'),
  ru: () => import('./locales/ru'),
  kk: () => import('./locales/kk'),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (await loaders[locale]()).default;
}

/** Case-study slugs (identical in every locale; checked by tests). */
export async function getCaseStudySlugs(): Promise<string[]> {
  const en = await getDictionary(DEFAULT_LOCALE);
  return en.projects.featured.map((project) => project.slug);
}

export async function getCaseStudy(locale: Locale, slug: string): Promise<FeaturedProject | null> {
  const dict = await getDictionary(locale);
  return dict.projects.featured.find((project) => project.slug === slug) ?? null;
}
