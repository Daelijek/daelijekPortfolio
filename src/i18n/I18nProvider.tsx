'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { CommonDictionary } from '@/content/types';
import { track } from '@/lib/analytics';
import { LOCALE_COOKIE, isLocale, localizePath, splitLocale, type Locale } from './config';

interface I18nContextValue {
  locale: Locale;
  common: CommonDictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const ONE_YEAR = 60 * 60 * 24 * 365;

function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
}

/**
 * Provides the current locale (from the URL) and the strings shared by the layout.
 * Page-specific strings are passed to each page's client component as props, so the
 * browser only ever receives the active locale.
 */
export function I18nProvider({
  locale,
  common,
  children,
}: {
  locale: Locale;
  common: CommonDictionary;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // One-time migration: the language used to live in localStorage. Honour that earlier
  // explicit choice once by turning it into the cookie the proxy reads.
  useEffect(() => {
    try {
      const legacy = localStorage.getItem('daelijek_lang');
      if (legacy === null) return;
      localStorage.removeItem('daelijek_lang');
      const normalized = legacy === 'kz' ? 'kk' : legacy;
      const hasCookie = document.cookie.split('; ').some((c) => c.startsWith(`${LOCALE_COOKIE}=`));
      if (hasCookie || !isLocale(normalized) || normalized === locale) return;
      rememberLocale(normalized);
      router.replace(localizePath(splitLocale(pathname).path, normalized));
    } catch {
      // Storage unavailable: nothing to migrate
    }
  }, [locale, pathname, router]);

  const value = useMemo(() => ({ locale, common }), [locale, common]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside <I18nProvider>');
  return value;
}

/** Current path without the locale prefix, plus a helper that localizes internal links. */
export function useLocalizedPath() {
  const { locale } = useI18n();
  const pathname = usePathname();
  const path = splitLocale(pathname || '/').path;
  const href = useCallback((target: string) => localizePath(target, locale), [locale]);
  return { locale, path, href };
}

/** Switches language: remembers the choice and navigates to the same page in that locale. */
export function useSwitchLocale() {
  const router = useRouter();
  const { locale, path } = useLocalizedPath();
  return useCallback(
    (next: Locale) => {
      if (next === locale) return;
      rememberLocale(next);
      track('Language Changed', { lang: next });
      router.push(localizePath(path, next), { scroll: false });
    },
    [locale, path, router]
  );
}

