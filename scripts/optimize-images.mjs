#!/usr/bin/env node
/**
 * Converts source images to WebP next to the original, capping the width.
 *
 * Usage:
 *   node scripts/optimize-images.mjs <file...> [--max-width=1920] [--quality=78] [--replace]
 *
 * --replace  deletes the source file after a successful conversion when the
 *            source is not already .webp (a .webp source is overwritten in place).
 *
 * Next.js image optimization resizes per device at request time; this script only
 * keeps the *source* files small (repository size, Vercel source-image limits,
 * and direct downloads such as OpenGraph previews).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? Number(hit.split('=')[1]) : fallback;
};
const maxWidth = opt('max-width', 1920);
const quality = opt('quality', 78);
const replace = args.includes('--replace');
const files = args.filter((a) => !a.startsWith('--'));

if (files.length === 0) {
  console.error('No input files. See the usage note at the top of this script.');
  process.exit(1);
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

for (const file of files) {
  const { name, dir, ext } = path.parse(file);
  const target = path.join(dir, `${name}.webp`);
  const before = (await fs.stat(file)).size;

  const input = await fs.readFile(file); // read fully so overwriting a .webp in place is safe
  const meta = await sharp(input).metadata();
  const output = await sharp(input)
    .resize({ width: Math.min(maxWidth, meta.width), withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer();

  // Never make an existing WebP bigger.
  if (ext.toLowerCase() === '.webp' && output.length >= before) {
    console.log(`skip  ${file} (already optimal, ${kb(before)})`);
    continue;
  }

  await fs.writeFile(target, output);
  if (replace && ext.toLowerCase() !== '.webp') await fs.unlink(file);

  const after = await sharp(output).metadata();
  console.log(
    `ok    ${file} -> ${target}  ${meta.width}x${meta.height} -> ${after.width}x${after.height}  ${kb(before)} -> ${kb(output.length)}`
  );
}
