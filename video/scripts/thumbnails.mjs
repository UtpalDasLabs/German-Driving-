#!/usr/bin/env node
/**
 * One YouTube thumbnail per lesson (1280x720 PNG), from the `lesson:` and
 * `thumb:` lines of each script's front matter:
 *
 *   thumb: ["Vorfahrt", "Right of Way", "scene:pr03"]
 *           German headline, English subtitle, drawing
 *
 * The drawing is "scene:<question id>", "signs:<id>,<id>", "manoeuvre:<key>"
 * or "text:<big words>". The pill says how many questions the lesson explains.
 *
 *   npm run thumbnails                  every lesson
 *   npm run thumbnails -- priority law  just these
 *
 * Output: out/thumbnails/<NN>-<topic>.png
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';

import { parseLongform } from './longform.mjs';

const VIDEO = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(VIDEO, 'out', 'thumbnails');
const LONGFORM = path.join(VIDEO, 'longform');

const asked = process.argv.slice(2);
const topics = (asked.length ? asked : fs.readdirSync(LONGFORM).filter((f) => f.endsWith('.md') && f !== 'SERIES.md').map((f) => f.slice(0, -3)))
  .map((t) => ({ topic: t, meta: parseLongform(t).meta }))
  .filter(({ topic, meta }) => {
    if (meta.lesson && Array.isArray(meta.thumb)) return true;
    console.warn(`${topic}: no lesson/thumb in the front matter, skipped`);
    return false;
  })
  .sort((a, b) => Number(a.meta.lesson) - Number(b.meta.lesson));

export const thumbnailName = (meta, topic) => `${String(meta.lesson).padStart(2, '0')}-${topic}.png`;

fs.mkdirSync(OUT, { recursive: true });
const PREINSTALLED = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const browserExecutable = process.env.REMOTION_BROWSER ?? (fs.existsSync(PREINSTALLED) ? PREINSTALLED : null);
const serveUrl = await bundle({ entryPoint: path.join(VIDEO, 'src/index.ts') });

for (const { topic, meta } of topics) {
  const [de, en, art] = meta.thumb;
  const n = meta.questions?.length ?? 0;
  const pill = n ? `${n} FRAGEN` : topic === 'conversion' ? 'AUSLANDSFÜHRERSCHEIN' : 'PRAKTISCHE PRÜFUNG';
  const inputProps = { lesson: Number(meta.lesson), de, en, art, pill };
  const composition = await selectComposition({ serveUrl, id: 'Thumbnail', inputProps, browserExecutable });
  const output = path.join(OUT, thumbnailName(meta, topic));
  await renderStill({ composition, serveUrl, frame: 0, output, inputProps, browserExecutable });
  console.log(`  ${output}`);
}
