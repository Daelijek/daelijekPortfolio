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
    <div className="min-h-screen pt-28 sm:pt-32 pb-36 px-6 sm:px-12 max-w-5xl mx-auto font-mono">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Left Column: Direct Links & Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="cyber-panel p-6 sm:p-8 rounded-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 text-xs text-[var(--text-muted)]">
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
              className="w-full flex items-center justify-between p-4 rounded-lg bg-[var(--accent-bg-subtle)] hover:bg-[var(--accent-glow)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] text-[var(--heading-tint)] text-xs font-bold tracking-wider uppercase transition-all hover:scale-[1.02] active:scale-95"
            >
              <div className="flex items-center gap-3 truncate">
                <Mail className="w-4 h-4 text-[var(--accent-color)] shrink-0" />
                <span className="truncate">{contact.email}</span>
              </div>
              {copied ? (
                <Check className="w-4 h-4 text-[var(--accent-color)] shrink-0" />
              ) : (
                <Copy className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
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
            <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)] text-xs">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                className="flex items-center justify-between p-3 rounded bg-[var(--accent-bg-subtle)] hover:bg-[var(--card-hover-glow)] text-[var(--text-secondary)] hover:text-[var(--heading-tint)] border border-[var(--border-subtle)] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FaGithub className="w-4 h-4 text-[var(--accent-color)]" />
                  <span>GitHub</span>
                </div>
                <span className="text-[11px] text-[var(--accent-color)]">@Daelijek</span>
              </a>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                className="flex items-center justify-between p-3 rounded bg-[var(--accent-bg-subtle)] hover:bg-[var(--card-hover-glow)] text-[var(--text-secondary)] hover:text-[var(--heading-tint)] border border-[var(--border-subtle)] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FaLinkedin className="w-4 h-4 text-[var(--accent-color)]" />
                  <span>LinkedIn</span>
                </div>
                <span className="text-[11px] text-[var(--accent-color)]">/in/dias-yermek</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Message Transmission */}
        <div className="lg:col-span-7">
          <div className="cyber-panel p-6 sm:p-8 rounded-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 text-xs text-[var(--text-muted)]">
              <span className="text-[var(--accent-color)] font-bold">// SECURE_TRANSMISSION</span>
              <span>[READY]</span>
            </div>

            {formSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--accent-glow)] border border-[var(--accent-border)] text-[var(--accent-color)] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[var(--heading-tint)] font-display uppercase">
                  PACKET TRANSMITTED
                </h3>
                <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto font-sans leading-relaxed">
                  Your message has been dispatched to my direct channel. Expect a prompt response.
                </p>
                <button
                  onClick={() => setFormSent(false)}
                  className="px-6 py-2 rounded bg-black/40 border border-[var(--border-subtle)] hover:border-[var(--accent-border)] text-xs text-[var(--text-secondary)] hover:text-[var(--heading-tint)] font-bold tracking-wider uppercase transition-all mt-4"
                >
                  SEND ANOTHER
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[var(--text-secondary)] text-[11px] font-bold uppercase mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                    <span>Your Identifier / Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe / Tech Lead"
                    className="w-full bg-black/50 border border-[var(--border-subtle)] focus:border-[var(--accent-border)] rounded-lg p-3 text-[var(--heading-tint)] placeholder-[var(--text-muted)] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[var(--text-secondary)] text-[11px] font-bold uppercase mb-1.5 flex items-center gap-1.5">
                    <AtSign className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                    <span>Return Channel / Email</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@company.com"
                    className="w-full bg-black/50 border border-[var(--border-subtle)] focus:border-[var(--accent-border)] rounded-lg p-3 text-[var(--heading-tint)] placeholder-[var(--text-muted)] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[var(--text-secondary)] text-[11px] font-bold uppercase mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                    <span>Transmission Content</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, role, or inquiry..."
                    className="w-full bg-black/50 border border-[var(--border-subtle)] focus:border-[var(--accent-border)] rounded-lg p-3 text-[var(--heading-tint)] placeholder-[var(--text-muted)] outline-none transition-colors resize-none"
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
