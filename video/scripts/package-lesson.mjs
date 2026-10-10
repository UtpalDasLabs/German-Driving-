#!/usr/bin/env node
/**
 * Gathers one rendered lesson into an upload-ready folder, numbered by the
 * script's `lesson:` so the files sort in playlist order:
 *
 *   out/upload/01-priority/01-priority.mp4
 *                          01-priority-description.txt   (title on line 1)
 *                          01-priority-thumbnail.png
 *
 *   npm run package -- priority [--lively] [--expressive]
 *
 * Needs `render:longform` (same flags) and `thumbnails` to have run first.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { parseLongform } from './longform.mjs';

const VIDEO = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(VIDEO, 'out');
const args = process.argv.slice(2);
const topic = args.find((a) => !a.startsWith('--'));
if (!topic) {
  console.error('usage: npm run package -- <topic> [--lively] [--expressive]');
  process.exit(1);
}
const { meta } = parseLongform(topic);
if (!meta.lesson) throw new Error(`${topic}: no "lesson:" number in the front matter`);
const label = `${topic}${args.includes('--lively') ? '-lively' : ''}${args.includes('--expressive') ? '-expressive' : ''}`;
const name = `${String(meta.lesson).padStart(2, '0')}-${topic}`;

const files = [
  [`lesson-${label}.mp4`, `${name}.mp4`],
  [`lesson-${topic}-description.txt`, `${name}-description.txt`],
  [path.join('thumbnails', `${name}.png`), `${name}-thumbnail.png`],
];
const dir = path.join(OUT, 'upload', name);
fs.rmSync(dir, { recursive: true, force: true });
fs.mkdirSync(dir, { recursive: true });
for (const [from, to] of files) {
  const src = path.join(OUT, from);
  if (!fs.existsSync(src)) throw new Error(`missing ${src}`);
  fs.copyFileSync(src, path.join(dir, to));
  console.log(`  ${path.join(dir, to)}`);
}
