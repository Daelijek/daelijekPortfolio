#!/usr/bin/env node
/**
 * Writes src/content/imageManifest.json: the real size and a tiny blurred preview of every
 * image under public/assets.
 *
 * Usage:
 *   npm run images:manifest
 *
 * Run it after adding or replacing an image. The case-study template uses the manifest to
 * reserve the exact space for each image (no layout shift) and to show the blurred preview
 * while the full image loads. A unit test fails when the manifest is out of date.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const ASSETS_DIR = path.join(PUBLIC_DIR, 'assets');
const OUTPUT = path.join(ROOT, 'src', 'content', 'imageManifest.json');
const IMAGE = /\.(webp|png|jpe?g|avif)$/i;
/** Width of the blurred preview; the browser scales it up behind a blur filter. */
const BLUR_WIDTH = 24;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : IMAGE.test(entry.name) ? [full] : [];
    })
  );
  return files.flat();
}

const files = (await walk(ASSETS_DIR)).sort();
const manifest = {};

for (const file of files) {
  const src = `/${path.relative(PUBLIC_DIR, file).split(path.sep).join('/')}`;
  const image = sharp(file);
  const { width, height } = await image.metadata();
  const preview = await image
    .resize({ width: BLUR_WIDTH, height: Math.max(1, Math.round((BLUR_WIDTH * height) / width)), fit: 'fill' })
    .webp({ quality: 40 })
    .toBuffer();
  manifest[src] = { width, height, blur: `data:image/webp;base64,${preview.toString('base64')}` };
}

await fs.writeFile(OUTPUT, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`ok    ${files.length} images -> ${path.relative(ROOT, OUTPUT)}`);
