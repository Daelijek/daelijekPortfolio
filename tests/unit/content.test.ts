import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import en from '../../src/content/locales/en';
import ru from '../../src/content/locales/ru';
import kk from '../../src/content/locales/kk';
import { getCaseStudy, getCaseStudySlugs, getDictionary } from '../../src/content';
import manifest from '../../src/content/imageManifest.json';

const locales = { en, ru, kk } as const;
const PUBLIC_DIR = path.resolve(__dirname, '../../public');

type Json = unknown;

/** Collects every leaf path, e.g. "projects.featured.0.gallery.2.image". */
function leafPaths(value: Json, prefix = ''): string[] {
  if (value === null || typeof value !== 'object') return [prefix];
  return Object.entries(value).flatMap(([k, v]) => leafPaths(v, prefix ? `${prefix}.${k}` : k));
}

function get(obj: Json, dotted: string): Json {
  return dotted.split('.').reduce<Json>((acc, k) => (acc as Record<string, Json>)?.[k], obj);
}

// Fields that must be identical in every language: assets, links, identifiers,
// and the machine-style project status ("system.status" is translated on purpose).
const LANGUAGE_NEUTRAL = /\.(image|liveUrl|githubUrl|url|slug|id|hex|galleryKind)$|^projects\.featured\.\d+\.status$/;

describe('locale dictionaries', () => {
  const enPaths = leafPaths(en);

  it.each(['ru', 'kk'] as const)('%s has exactly the same structure as en (incl. array lengths)', (lang) => {
    expect(leafPaths(locales[lang]).sort()).toEqual([...enPaths].sort());
  });

  it.each(['ru', 'kk'] as const)('%s uses the same images, links and ids as en', (lang) => {
    for (const p of enPaths.filter((x) => LANGUAGE_NEUTRAL.test(x))) {
      expect(get(locales[lang], p), p).toEqual(get(en, p));
    }
  });

  it('every case study says how its screens are framed (web window or phone)', () => {
    for (const project of en.projects.featured) expect(['web', 'phone'], project.slug).toContain(project.galleryKind);
  });

  it('has no empty strings', () => {
    for (const [lang, dict] of Object.entries(locales)) {
      for (const p of leafPaths(dict)) {
        const v = get(dict, p);
        if (typeof v === 'string') expect(v.trim(), `${lang}.${p}`).not.toBe('');
      }
    }
  });
});

describe('assets referenced by content exist', () => {
  const images = leafPaths(en)
    .filter((p) => p.endsWith('.image'))
    .map((p) => get(en, p) as string);

  it.each([...new Set(images)])('%s', (src) => {
    expect(fs.existsSync(path.join(PUBLIC_DIR, src))).toBe(true);
  });

  it('every case study has an OpenGraph preview', async () => {
    for (const slug of await getCaseStudySlugs()) {
      expect(fs.existsSync(path.join(PUBLIC_DIR, 'og', `${slug}.jpg`)), slug).toBe(true);
    }
  });
});

/** Width and height from a WebP file header (VP8, VP8L and VP8X). */
function webpSize(buf: Buffer): [number, number] {
  const chunk = buf.toString('ascii', 12, 16);
  if (chunk === 'VP8X') return [1 + buf.readUIntLE(24, 3), 1 + buf.readUIntLE(27, 3)];
  if (chunk === 'VP8 ') return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
  if (chunk === 'VP8L') {
    const bits = buf.readUInt32LE(21);
    return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1];
  }
  throw new Error(`not a WebP file (${chunk})`);
}

describe('image manifest (npm run images:manifest)', () => {
  const entries = manifest as Record<string, { width: number; height: number; blur: string }>;
  const images = [...new Set(leafPaths(en).filter((p) => p.endsWith('.image')).map((p) => get(en, p) as string))];

  it.each(images)('%s is listed with its real size and a blurred preview', (src) => {
    const entry = entries[src];
    expect(entry, 'missing: run `npm run images:manifest`').toBeDefined();
    if (src.endsWith('.webp')) {
      expect([entry.width, entry.height], 'stale size: run `npm run images:manifest`').toEqual(
        webpSize(fs.readFileSync(path.join(PUBLIC_DIR, src)))
      );
    }
    expect(entry.blur).toMatch(/^data:image\/webp;base64,/);
  });
});

describe('content loader', () => {
  it('loads each locale', async () => {
    expect((await getDictionary('ru')).nav).toEqual(ru.nav);
  });

  it('finds case studies by slug and returns null otherwise', async () => {
    expect((await getCaseStudy('kk', 'rolesieve'))?.slug).toBe('rolesieve');
    expect(await getCaseStudy('en', 'evently')).toBeNull();
  });
});
