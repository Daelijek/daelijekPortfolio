'use client';

import Link from 'next/link';
import { useI18n, useLocalizedPath } from '@/i18n/I18nProvider';

export default function NotFound() {
  const { common } = useI18n();
  const { href } = useLocalizedPath();
  const t = common.meta.notFound;

  return (
    <main className="relative z-10 min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center font-mono">
      <p className="text-xs tracking-[0.3em] text-[var(--accent-color)]">ERROR // 404</p>
      <h1 className="text-4xl sm:text-6xl font-black uppercase font-display text-white">{t.title}</h1>
      <p className="max-w-md text-sm text-[var(--text-secondary)]">{t.text}</p>
      <Link
        href={href('/')}
        className="mt-2 rounded-xl border border-[var(--accent-color)] px-5 py-3 text-sm font-bold uppercase tracking-widest text-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-black transition-colors"
      >
        {t.back}
      </Link>
    </main>
  );
}
