'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileDown } from 'lucide-react';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import { useI18n, useLocalizedPath } from '@/i18n/I18nProvider';

/** Closing call to action: contact link and CV download. */
export default function AboutCta() {
  const { playHover, playClick, playDownload } = useThemeAudio();
  const { common: content } = useI18n();
  const { href } = useLocalizedPath();
  const [cvDownloaded, setCvDownloaded] = useState(false);

  const handleDownloadCv = () => {
    playDownload();
    setCvDownloaded(true);
    setTimeout(() => setCvDownloaded(false), 2600);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.05 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-white/[0.08] pt-14 sm:pt-20 text-center space-y-6"
    >
      <div className="space-y-3">
        <span className="text-xs font-mono font-bold text-[var(--accent-color)] tracking-widest uppercase block">
          // TRANSMISSION_DISPATCH
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-display uppercase tracking-tight max-w-2xl mx-auto leading-tight">
          {content.system.ctaSecondary}
        </h2>
        <p className="text-xs sm:text-sm text-white/60 max-w-lg mx-auto font-sans leading-relaxed">
          {content.system.heroInfoLog}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          href={href('/contact')}
          onClick={playClick}
          onMouseEnter={playHover}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[var(--accent-color)] text-[#06080A] font-bold text-xs tracking-widest uppercase hover:shadow-[0_0_35px_var(--accent-glow)] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
        >
          <span>{content.system.ctaSecondary}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </Link>

        <a
          href="/api/cv"
          download="Dias_Yermek_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDownloadCv}
          onMouseEnter={playHover}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white/[0.04] border border-white/15 hover:border-[var(--accent-color)]/60 text-white font-bold text-xs tracking-wider uppercase transition-all cursor-pointer"
        >
          <FileDown className="w-4 h-4 text-[var(--accent-color)]" />
          <span>{cvDownloaded ? content.nav.cvDownloaded : content.nav.downloadCv}</span>
        </a>
      </div>
    </motion.section>
  );
}
