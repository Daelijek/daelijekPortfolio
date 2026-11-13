'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FileDown } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import { useThemeAudio } from '@/context/ThemeAudioContext';
import { useI18n } from '@/i18n/I18nProvider';

/** Left column: photo, scroll telemetry, key facts, CV download and social links. */
export default function ProfileSidebar({ scrollPercent }: { scrollPercent: number }) {
  const { playHover, playDownload } = useThemeAudio();
  const { common: content } = useI18n();
  const [cvDownloaded, setCvDownloaded] = useState(false);

  const handleDownloadCv = () => {
    playDownload();
    setCvDownloaded(true);
    setTimeout(() => setCvDownloaded(false), 2600);
  };

  return (
    <div className="w-full lg:w-[320px] xl:w-[340px] shrink-0 lg:sticky lg:top-28 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6"
      >
        {/* Minimalist Photo Container with Architectural Vignette */}
        <div className="relative w-full aspect-[4/4.3] max-h-[340px] rounded-2xl overflow-hidden border border-white/10 bg-[#04070C] shadow-2xl group">
          <Image
            src="/assets/linkedIn_Dias_square.webp"
            alt="Dias Yermek"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 340px"
            className="object-cover grayscale brightness-95 contrast-105 group-hover:scale-[1.03] group-hover:grayscale-0 transition-all duration-700"
          />

          {/* Theme Hue Tint */}
          <div className="absolute inset-0 bg-[var(--accent-color)] opacity-[0.05] mix-blend-color pointer-events-none" />

          {/* Photo Telemetry Overlays */}
          <div className="absolute top-3 left-3 text-[10px] font-mono text-white/60 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
            [SYS_ID // 0x01]
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ONLINE</span>
          </div>

          {/* Bottom Photo Stamp Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex items-end justify-between text-xs pointer-events-none">
            <div>
              <span className="text-xs font-bold text-white block leading-tight tracking-wider">
                DIAS YERMEK
              </span>
              <span className="text-[10px] text-[var(--accent-color)] font-mono block">
                Astana, KZ · UTC+5
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-black/80 border border-white/20 text-white/80 font-mono">
              {scrollPercent}% SCROLL
            </span>
          </div>
        </div>

        {/* Scroll Telemetry Hairline Progress */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[10.5px] text-white/55 font-mono">
            <span>SCROLL_TELEMETRY</span>
            <span className="text-[var(--accent-color)] font-bold">{scrollPercent}%</span>
          </div>
          <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              style={{ width: `${scrollPercent}%` }}
              className="h-full bg-[var(--accent-color)] shadow-[0_0_10px_var(--accent-glow)] transition-[width] duration-150"
            />
          </div>
        </div>

        {/* Typographic Technical Specification (Clean Horizontal Hairlines, No Boxes) */}
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08] text-xs font-mono">
          <div className="flex items-center justify-between py-2.5">
            <span className="text-white/55 tracking-wider">STATUS</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              OPEN FOR OFFERS
            </span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-white/55 tracking-wider">EXPERIENCE</span>
            <span className="text-white font-bold">3+ YEARS PROD</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-white/55 tracking-wider">DEGREE</span>
            <span className="text-white font-bold">B.S. SOFTWARE ENG</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-white/55 tracking-wider">PHONE</span>
            <a
              href={`tel:${content.contact?.phoneRaw || '+77088350549'}`}
              className="text-[var(--accent-color)] font-bold hover:underline"
            >
              {content.contact?.phone || '+7 708 835 0549'}
            </a>
          </div>
        </div>

        {/* Actions: Clean CV Download & Brand Social Icons */}
        <div className="space-y-3 pt-1">
          <a
            href="/api/cv"
            download="Dias_Yermek_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDownloadCv}
            onMouseEnter={playHover}
            className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[var(--accent-color)] text-[#020504] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_var(--accent-glow)] transition-all active:scale-95 group"
          >
            <FileDown className="w-4 h-4" />
            <span>{cvDownloaded ? content.nav.cvDownloaded : content.nav.downloadCv}</span>
          </a>

          {/* Social Channels Pill Row with Authentic Brand Colors */}
          <div className="grid grid-cols-4 gap-2">
            <a
              href={content.contact.telegram}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              title="Telegram"
              aria-label="Telegram"
              className="flex items-center justify-center p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 hover:text-[#229ED9] hover:border-[#229ED9] hover:bg-[#229ED9]/10 hover:shadow-[0_0_15px_rgba(34,158,217,0.35)] transition-all"
            >
              <FaTelegram aria-hidden="true" className="w-4 h-4" />
            </a>

            <a
              href={content.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              title="GitHub"
              aria-label="GitHub"
              className="flex items-center justify-center p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 hover:text-white hover:border-white/80 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all"
            >
              <FaGithub aria-hidden="true" className="w-4 h-4" />
            </a>

            <a
              href={content.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              title="LinkedIn"
              aria-label="LinkedIn"
              className="flex items-center justify-center p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 hover:shadow-[0_0_15px_rgba(10,102,194,0.35)] transition-all"
            >
              <FaLinkedin aria-hidden="true" className="w-4 h-4" />
            </a>

            <a
              href={content.contact.leetcode || 'https://leetcode.com/u/Daelijek/'}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              title="LeetCode"
              aria-label="LeetCode"
              className="flex items-center justify-center p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 hover:text-[#FFA116] hover:border-[#FFA116] hover:bg-[#FFA116]/10 hover:shadow-[0_0_15px_rgba(255,161,22,0.35)] transition-all"
            >
              <SiLeetcode aria-hidden="true" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
