'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useThemeAudio } from '../../src/context/ThemeAudioContext';
import { portfolioContent } from '../../src/data/portfolioData';
import { soundFx } from '../../src/audio/soundEffects';
import { Mail, Send, Copy, Check, ExternalLink, MessageCircle, Terminal, User, AtSign, MessageSquare } from 'lucide-react';
import { FaTelegram, FaGithub, FaLinkedin } from 'react-icons/fa6';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const { lang, playHover, playClick } = useThemeAudio();
  const content = portfolioContent[lang];
  const contact = content.contact;
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    soundFx.playSwitch();
    
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#00FF9F', '#00F3FF', '#FFFFFF']
      });
    } catch {}

    setTimeout(() => setCopied(false), 3000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    soundFx.playBootChime();
    setFormSent(true);
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00FF9F', '#00F3FF', '#FFFFFF']
      });
    } catch {}
  };

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 sm:px-12 max-w-5xl mx-auto font-mono">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-white/50 mb-4" aria-label="Breadcrumb">
        <Link href="/" onClick={playClick} onMouseEnter={playHover} className="hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[var(--accent-color)] font-bold">Contact</span>
      </nav>

      {/* Page Title */}
      <div className="mb-12">
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase font-sans mb-3 tracking-tight">
          Get In Touch
        </h1>
        <p className="text-xs text-white/50">Direct communication pipeline for ventures, contracts & full-time roles</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Left Column: Direct Links & Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="cyber-panel p-6 sm:p-8 rounded-xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs text-white/50">
              <span className="text-[var(--accent-color)] font-bold">// QUICK_CHANNELS</span>
              <span>[ENCRYPTED]</span>
            </div>

            {/* Telegram Direct */}
            <a
              href={contact.telegram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="flex items-center justify-between p-4 rounded-lg bg-[var(--accent-color)] text-[#06080A] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_var(--accent-glow)] transition-all hover:scale-[1.02] active:scale-95 group"
            >
              <div className="flex items-center gap-3">
                <FaTelegram className="w-4 h-4" />
                <span>OPEN TELEGRAM STREAM</span>
              </div>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Copy Email */}
            <button
              onClick={handleCopyEmail}
              onMouseEnter={playHover}
              className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[var(--accent-border)] text-white text-xs font-bold tracking-wider uppercase transition-all hover:scale-[1.02] active:scale-95"
            >
              <div className="flex items-center gap-3 truncate">
                <Mail className="w-4 h-4 text-[var(--accent-color)] shrink-0" />
                <span className="truncate">{contact.email}</span>
              </div>
              {copied ? (
                <Check className="w-4 h-4 text-[var(--accent-color)] shrink-0" />
              ) : (
                <Copy className="w-4 h-4 text-white/40 shrink-0" />
              )}
            </button>

            {copied && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-xs text-[var(--accent-color)] font-bold"
              >
                &gt;&gt; EMAIL COPIED TO CLIPBOARD
              </motion.div>
            )}

            {/* Social Grid */}
            <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                className="flex items-center justify-between p-3 rounded bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FaGithub className="w-4 h-4 text-white/50" />
                  <span>GitHub</span>
                </div>
                <span className="text-[11px] text-[var(--accent-color)]">@Daelijek</span>
              </a>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                className="flex items-center justify-between p-3 rounded bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FaLinkedin className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </div>
                <span className="text-[11px] text-[var(--accent-color)]">Dias Yermek</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Message Transmission Form */}
        <div className="lg:col-span-7">
          <div className="cyber-panel p-6 sm:p-8 rounded-xl border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6 text-xs text-white/50">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[var(--accent-color)]" />
                <span className="text-white font-bold uppercase">TRANSMIT MESSAGE // SECURE FORM</span>
              </div>
              <span className="text-[var(--accent-color)]">PORT: 443</span>
            </div>

            {formSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--accent-glow)] border border-[var(--accent-border)] flex items-center justify-center mx-auto text-[var(--accent-color)]">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-sans">TRANSMISSION RECEIVED</h3>
                <p className="text-xs text-white/60 max-w-sm mx-auto font-sans leading-relaxed">
                  Thank you for reaching out! I will review your message and reply within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-white/60 mb-1.5 font-bold uppercase text-[11px]">
                    [01] YOUR NAME / SENDER ID
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name..."
                    className="w-full bg-[#040608] border border-white/10 focus:border-[var(--accent-border)] rounded-lg p-3 text-white placeholder-white/20 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/60 mb-1.5 font-bold uppercase text-[11px]">
                    [02] YOUR EMAIL / RETURN ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full bg-[#040608] border border-white/10 focus:border-[var(--accent-border)] rounded-lg p-3 text-white placeholder-white/20 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/60 mb-1.5 font-bold uppercase text-[11px]">
                    [03] MESSAGE PACKET
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, role, or inquiry..."
                    className="w-full bg-[#040608] border border-white/10 focus:border-[var(--accent-border)] rounded-lg p-3 text-white placeholder-white/20 outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={playHover}
                  className="w-full py-3.5 rounded-lg bg-[var(--accent-color)] text-[#06080A] font-bold text-xs tracking-widest uppercase hover:shadow-[0_0_25px_var(--accent-glow)] transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT PACKET</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
