import type { CommonDictionary } from '@/content/types';

export interface NavItem {
  href: string;
  index: string;
  label: string;
}

/** Top-level routes (locale-free paths) in menu order. */
export function getNavItems(nav: CommonDictionary['nav']): NavItem[] {
  return [
    { href: '/', index: '1', label: nav.home },
    { href: '/about', index: '2', label: nav.about },
    { href: '/projects', index: '3', label: nav.projects },
    { href: '/contact', index: '4', label: nav.contact },
  ];
}

export const SOCIAL_LINKS = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/dias-yermek/', dot: 'bg-[#0A66C2]', hover: 'hover:text-[#0A66C2] hover:bg-[#0A66C2]/10', beam: 'nav-border-beam-ray-linkedin' },
  { name: 'Github', href: 'https://github.com/Daelijek', dot: 'bg-white', hover: 'hover:text-white hover:bg-white/10', beam: 'nav-border-beam-ray-github' },
  { name: 'LeetCode', href: 'https://leetcode.com/u/Daelijek/', dot: 'bg-[#FFA116]', hover: 'hover:text-[#FFA116] hover:bg-[#FFA116]/10', beam: 'nav-border-beam-ray-leetcode' },
  { name: 'Telegram', href: 'https://t.me/daelijek_og', dot: 'bg-[#229ED9]', hover: 'hover:text-[#229ED9] hover:bg-[#229ED9]/10', beam: 'nav-border-beam-ray-telegram' },
] as const;
