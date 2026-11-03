export const THEMES = ['acid', 'cyan', 'amber', 'crimson', 'obsidian'] as const;
export type Theme = (typeof THEMES)[number];

export const isTheme = (value: unknown): value is Theme =>
  typeof value === 'string' && (THEMES as readonly string[]).includes(value);
