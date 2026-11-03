// Locale routing: English lives at the root (/, /projects/...), other locales are
// prefixed (/ru/..., /kk/...). The proxy rewrites unprefixed URLs to /en internally.

export const LOCALES = ['en', 'ru', 'kk'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** Cookie that remembers a locale the visitor picked explicitly. */
export const LOCALE_COOKIE = 'NEXT_LOCALE';

/** BCP 47 tags for <html lang>, hreflang and OpenGraph. */
export const HTML_LANG: Record<Locale, string> = { en: 'en', ru: 'ru', kk: 'kk' };
export const OG_LOCALE: Record<Locale, string> = { en: 'en_US', ru: 'ru_RU', kk: 'kk_KZ' };

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/** Public URL path of `path` (locale-free, starting with "/") in `locale`. */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

/** Splits a public pathname into its locale prefix (if any) and the locale-free path. */
export function splitLocale(pathname: string): { locale: Locale | null; path: string } {
  const [, first, ...rest] = pathname.split('/');
  if (isLocale(first)) {
    const path = `/${rest.join('/')}`;
    return { locale: first, path: path === '/' ? '/' : path.replace(/\/$/, '') };
  }
  return { locale: null, path: pathname || '/' };
}
