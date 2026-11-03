import 'server-only';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from './config';

/** Route params of every page under app/[lang]. */
export interface LangParams {
  params: Promise<{ lang: string }>;
}

/** Resolves and validates the locale segment (unknown values are a 404). */
export async function resolveLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}
