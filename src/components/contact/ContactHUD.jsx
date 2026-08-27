'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeAudio } from '../../context/ThemeAudioContext';
import { portfolioContent } from '../../data/portfolioData';
import { soundFx } from '../../audio/soundEffects';
import { Mail, Send, Copy, Check, ExternalLink, MessageCircle } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa6';
import confetti from 'canvas-confetti';

export default function ContactHUD() {
  const { lang, playHover, playClick } = useThemeAudio();
  const content = portfolioContent[lang];
  const contact = content.contact;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    soundFx.playSwitch();
    
    // Trigger subtle cyber confetti
    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#00FF9F', '#00F3FF', '#FFFFFF']
      });
    } catch {}

    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="py-24 relative border-t border-white/5 font-mono">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs text-[var(--accent-color)] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
            <span>{contact.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans mb-4">
            {contact.title}
          </h2>
          <p className="text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
            {contact.lead}
          </p>
        </div>

        {/* Contact Terminal Card */}
        <div className="cyber-panel rounded-xl p-8 border border-white/10 text-left space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs text-white/50">
            <span>&gt; COMMUNICATION_STREAM: READY</span>
            <span className="text-[var(--accent-color)]">[ENCRYPTED]</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Action 1: Telegram Direct */}
            <a
              href={contact.telegram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="flex items-center justify-between p-4 rounded-lg bg-[var(--accent-color)] text-[#06080A] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_var(--accent-glow)] transition-all hover:scale-[1.02] active:scale-95 group"
            >
              <div className="flex items-center gap-3">
                <Send className="w-4 h-4" />
                <span>{contact.sendTelegram}</span>
              </div>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Action 2: Copy Email */}
            <button
              onClick={handleCopyEmail}
              onMouseEnter={playHover}
              className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[var(--accent-border)] text-white text-xs font-bold tracking-wider uppercase transition-all hover:scale-[1.02] active:scale-95"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[var(--accent-color)]" />
                <span className="truncate">{contact.email}</span>
              </div>
              {copied ? (
                <Check className="w-4 h-4 text-[var(--accent-color)]" />
              ) : (
                <Copy className="w-4 h-4 text-white/50" />
              )}
            </button>
          </div>

          {copied && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-xs text-[var(--accent-color)] pt-2 font-bold"
            >
              &gt;&gt; {contact.copied}
            </motion.div>
          )}

          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-white/10 text-xs">
            <a
              href={contact.telegram}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-[var(--accent-color)] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Telegram: @daelijek</span>
            </a>

            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-[var(--accent-color)] transition-colors"
            >
              <FaGithub className="w-3.5 h-3.5" />
              <span>GitHub: @Daelijek</span>
            </a>

            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-[var(--accent-color)] transition-colors"
            >
              <FaLinkedin className="w-3.5 h-3.5" />
              <span>LinkedIn: Dias Yermek</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
