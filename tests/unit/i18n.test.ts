import { describe, expect, it } from 'vitest';
import { isLocale, localizePath, splitLocale } from '../../src/i18n/config';

describe('localizePath', () => {
  it('keeps English unprefixed', () => {
    expect(localizePath('/', 'en')).toBe('/');
    expect(localizePath('/projects/rolesieve', 'en')).toBe('/projects/rolesieve');
  });

  it('prefixes other locales', () => {
    expect(localizePath('/', 'ru')).toBe('/ru');
    expect(localizePath('/about', 'kk')).toBe('/kk/about');
    expect(localizePath('about', 'ru')).toBe('/ru/about');
  });
});

describe('splitLocale', () => {
  it.each([
    ['/', null, '/'],
    ['/projects', null, '/projects'],
    ['/ru', 'ru', '/'],
    ['/ru/', 'ru', '/'],
    ['/kk/projects/rolesieve', 'kk', '/projects/rolesieve'],
    ['/en/about', 'en', '/about'],
    ['/russia', null, '/russia'],
  ])('%s -> %s %s', (input, locale, rest) => {
    expect(splitLocale(input)).toEqual({ locale, path: rest });
  });

  it('round-trips with localizePath', () => {
    for (const locale of ['en', 'ru', 'kk'] as const) {
      for (const p of ['/', '/about', '/projects/opengov-kz']) {
        const { path } = splitLocale(localizePath(p, locale));
        expect(path).toBe(p);
      }
    }
  });
});

describe('isLocale', () => {
  it('accepts only supported locales', () => {
    expect(isLocale('kk')).toBe(true);
    expect(isLocale('kz')).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});
