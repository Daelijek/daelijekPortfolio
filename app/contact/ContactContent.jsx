'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useThemeAudio } from '../../src/context/ThemeAudioContext';
import { portfolioContent } from '../../src/data/portfolioData';
import { soundFx } from '../../src/audio/soundEffects';
import { ArrowUpRight, Copy, Check, Phone } from 'lucide-react';
import { FaTelegram, FaGithub, FaLinkedin } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import confetti from 'canvas-confetti';

export default function ContactContent() {
  const { lang, playHover, playClick } = useThemeAudio();
  const content = portfolioContent[lang] || portfolioContent.en;
  const contact = content.contact;

  const [copied, setCopied] = useState(false);
  const [astanaTime, setAstanaTime] = useState('');

  // Astana real-time clock (UTC+5)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Almaty',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        setAstanaTime(timeStr);
      } catch {
        const d = new Date();
        setAstanaTime(d.toTimeString().split(' ')[0]);
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = (e) => {
    e?.preventDefault?.();
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    soundFx.playSwitch();

    try {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.5 },
        colors: ['#00FF9F', '#00F3FF', '#FFFFFF'],
      });
    } catch {
      // safe ignore
    }

    setTimeout(() => setCopied(false), 2200);
  };

  const labels = {
    en: {
      tag: '// CONTACT',
      title: 'GET IN TOUCH',
      telegramTag: 'OPEN TELEGRAM',
      emailCopy: 'COPY EMAIL',
      copied: 'COPIED TO CLIPBOARD',
      phoneCall: 'CALL',
      available: 'AVAILABLE FOR WORK',
      location: 'ASTANA, KZ',
    },
    ru: {
      tag: '// КОНТАКТЫ',
      title: 'СВЯЗАТЬСЯ СО МНОЙ',
      telegramTag: 'ОТКРЫТЬ TELEGRAM',
      emailCopy: 'СКОПИРОВАТЬ EMAIL',
      copied: 'СКОПИРОВАНО В БУФЕР',
      phoneCall: 'ПОЗВОНИТЬ',
      available: 'ОТКРЫТ К ПРЕДЛОЖЕНИЯМ',
      location: 'АСТАНА, КАЗАХСТАН',
    },
    kk: {
      tag: '// БАЙЛАНЫС',
      title: 'БАЙЛАНЫСҚА ШЫҒУ',
      telegramTag: 'TELEGRAM АШУ',
      emailCopy: 'EMAIL КӨШІРУ',
      copied: 'БУФЕРГЕ КӨШІРІЛДІ',
      phoneCall: 'ҚОҢЫРАУ ШАЛУ',
      available: 'ҰСЫНЫСТАРҒА АШЫҚ',
      location: 'АСТАНА, ҚАЗАҚСТАН',
    },
  };

  const t = labels[lang] || labels.en;

  const socialLinks = [
    {
      name: 'GitHub',
      handle: '@Daelijek',
      url: contact.github,
      icon: FaGithub,
    },
    {
      name: 'LinkedIn',
      handle: '/in/dias-yermek',
      url: contact.linkedin,
      icon: FaLinkedin,
    },
    {
      name: 'LeetCode',
      handle: '/u/Daelijek',
      url: contact.leetcode,
      icon: SiLeetcode,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 py-24 sm:py-32 selection:bg-[var(--accent-color)] selection:text-black">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl mx-auto flex flex-col items-center text-center space-y-10 sm:space-y-12"
      >
        {/* Simple, Non-pretentious Centered Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-color)] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-ping" />
            <span>{t.tag}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-condensed tracking-wider uppercase text-[var(--heading-tint)]">
            {t.title}
          </h1>
        </div>

        {/* =====================================================================
            MAIN CONTACTS (Centered, Large Typography, Zero Boxes/Cards)
           ===================================================================== */}
        <div className="w-full space-y-4">
          {/* 1. TELEGRAM (Primary & Direct) */}
          <a
            href={contact.telegram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            onMouseEnter={playHover}
            className="group flex flex-col sm:flex-row items-center justify-between py-5 sm:py-6 px-4 border-b border-[var(--border-subtle)] hover:border-[var(--accent-color)] transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <FaTelegram className="w-5 h-5 text-[var(--accent-color)] group-hover:scale-110 transition-transform" />
              <span className="text-xl sm:text-2xl md:text-3xl font-display font-bold uppercase text-[var(--heading-tint)] group-hover:text-[var(--accent-color)] transition-colors">
                TELEGRAM
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1 sm:mt-0">
              <span className="text-sm sm:text-base font-mono text-[var(--accent-color)] font-semibold">
                @daelijek_og
              </span>
              <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-color)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* 2. EMAIL (Click to Copy) */}
          <button
            onClick={handleCopyEmail}
            onMouseEnter={playHover}
            className="w-full group flex flex-col sm:flex-row items-center justify-between py-5 sm:py-6 px-4 border-b border-[var(--border-subtle)] hover:border-[var(--accent-color)] transition-all duration-300 cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[var(--accent-color)] font-bold">@</span>
              <span className="text-xl sm:text-2xl md:text-3xl font-display font-bold uppercase text-[var(--heading-tint)] group-hover:text-[var(--accent-color)] transition-colors">
                EMAIL
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1 sm:mt-0">
              <span className="text-sm sm:text-base font-mono text-[var(--text-secondary)] group-hover:text-[var(--heading-tint)] transition-colors truncate">
                {contact.email}
              </span>
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded transition-all ${
                  copied
                    ? 'bg-[var(--accent-color)] text-black font-bold shadow-[0_0_12px_var(--accent-glow)]'
                    : 'text-[var(--text-muted)] group-hover:text-[var(--accent-color)]'
                }`}
              >
                {copied ? (
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {t.copied}
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Copy className="w-3 h-3" />
                    {t.emailCopy}
                  </span>
                )}
              </span>
            </div>
          </button>

          {/* 3. PHONE / VOICE */}
          {contact.phone && (
            <a
              href={`tel:${contact.phoneRaw || '+77088350549'}`}
              onClick={playClick}
              onMouseEnter={playHover}
              className="group flex flex-col sm:flex-row items-center justify-between py-5 sm:py-6 px-4 border-b border-[var(--border-subtle)] hover:border-[var(--accent-color)] transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[var(--accent-color)] group-hover:scale-110 transition-transform" />
                <span className="text-xl sm:text-2xl md:text-3xl font-display font-bold uppercase text-[var(--heading-tint)] group-hover:text-[var(--accent-color)] transition-colors">
                  PHONE
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 sm:mt-0">
                <span className="text-sm sm:text-base font-mono text-[var(--text-secondary)] group-hover:text-[var(--heading-tint)] transition-colors">
                  {contact.phone}
                </span>
                <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-color)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          )}
        </div>

        {/* =====================================================================
            SOCIALS (Sleek Horizontal Links Centered Below)
           ===================================================================== */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 pt-2 font-mono text-xs">
          {socialLinks.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-all group"
              >
                <Icon className="w-3.5 h-3.5 text-[var(--accent-color)] group-hover:scale-110 transition-transform" />
                <span className="font-bold tracking-wider">{s.name}</span>
                <span className="text-[11px] text-[var(--text-muted)] group-hover:text-[var(--accent-color)] transition-colors">
                  {s.handle}
                </span>
              </a>
            );
          })}
        </div>

        {/* Minimalist Centered Footer Status */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-[var(--text-muted)] border-t border-[var(--border-subtle)] w-full">
          <span className="text-[var(--accent-color)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
            {t.available}
          </span>
          <span>·</span>
          <span>{t.location}</span>
          <span>·</span>
          <span className="tabular-nums font-bold text-[var(--heading-tint)]">
            {astanaTime || '14:00:00'} [UTC+5]
          </span>
        </div>
      </motion.div>
    </div>
  );
}
