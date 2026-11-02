#!/usr/bin/env node
/**
 * Generates 1200x630 OpenGraph previews into public/og/:
 *   default.jpg      — portrait + name + role (site-wide)
 *   <slug>.jpg       — one per featured project (cover + title)
 *
 * Usage: npm run og:generate   (Node >= 22.6: reads the TypeScript dictionary via --experimental-strip-types)
 * Re-run whenever a project cover, title or the portrait changes.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import en from '../src/content/locales/en.ts';

const W = 1200;
const H = 630;
const OUT = 'public/og';
const BG = '#040608';
const ACCENT = '#00FF9F';
const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Naive word wrap for SVG text (no text measuring available in librsvg).
function wrap(text, maxChars) {
  const lines = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    if ((line + ' ' + word).trim().length > maxChars) {
      lines.push(line.trim());
      line = word;
    } else {
      line += ' ' + word;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

const jpeg = (img) => img.jpeg({ quality: 82, mozjpeg: true });

async function defaultImage() {
  const photoSize = 470;
  const photo = await sharp('public/assets/linkedIn_Dias_square.webp')
    .resize(photoSize, photoSize)
    .composite([
      {
        input: Buffer.from(
          `<svg width="${photoSize}" height="${photoSize}"><rect width="100%" height="100%" rx="28" ry="28"/></svg>`
        ),
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer();

  const svg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${BG}"/>
    <rect x="0" y="0" width="8" height="${H}" fill="${ACCENT}"/>
    <text x="80" y="200" font-family="${FONT}" font-size="26" letter-spacing="6" fill="${ACCENT}">PORTFOLIO</text>
    <text x="80" y="285" font-family="${FONT}" font-size="76" font-weight="700" fill="#ffffff">Dias Yermek</text>
    <text x="80" y="350" font-family="${FONT}" font-size="34" fill="#d6dde3">Middle Frontend &amp; Mobile Developer</text>
    <text x="80" y="410" font-family="${FONT}" font-size="26" fill="#8e9ca8">Next.js · React · Flutter · React Native · FastAPI</text>
    <text x="80" y="540" font-family="${FONT}" font-size="24" fill="#8e9ca8">Astana, Kazakhstan</text>
  </svg>`;

  await jpeg(
    sharp(Buffer.from(svg)).composite([{ input: photo, left: W - photoSize - 80, top: (H - photoSize) / 2 }])
  ).toFile(path.join(OUT, 'default.jpg'));
}

async function projectImage(project) {
  const cover = await sharp(path.join('public', project.image))
    .resize(W, H, { fit: 'cover', position: 'attention' })
    .toBuffer();

  const titleLines = wrap(project.title, 30);
  const titleY = H - 70 - (titleLines.length - 1) * 64;
  const overlay = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.35" stop-color="${BG}" stop-opacity="0"/>
        <stop offset="1" stop-color="${BG}" stop-opacity="0.94"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="64" y="${titleY - 70}" font-family="${FONT}" font-size="24" letter-spacing="5" fill="${ACCENT}">CASE STUDY · DIAS YERMEK</text>
    ${titleLines
      .map(
        (l, i) =>
          `<text x="64" y="${titleY + i * 64}" font-family="${FONT}" font-size="58" font-weight="700" fill="#ffffff">${esc(l)}</text>`
      )
      .join('')}
  </svg>`;

  await jpeg(sharp(cover).composite([{ input: Buffer.from(overlay) }])).toFile(path.join(OUT, `${project.slug}.jpg`));
}

await fs.mkdir(OUT, { recursive: true });
await defaultImage();
for (const project of en.projects.featured) await projectImage(project);

for (const f of await fs.readdir(OUT)) {
  const { size } = await fs.stat(path.join(OUT, f));
  console.log(`${f}  ${Math.round(size / 1024)} KB`);
}
