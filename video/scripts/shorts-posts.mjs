#!/usr/bin/env node
/**
 * Posting plan for the question shorts: the order they go out in, and a
 * Publer CSV so a scheduler posts them to YouTube Shorts, TikTok and
 * Instagram Reels without filling in a single form by hand.
 *
 *   node scripts/shorts-posts.mjs                      plan from tomorrow, 19:00
 *   node scripts/shorts-posts.mjs --start 2026-10-14 --time 19:00
 *   node scripts/shorts-posts.mjs --media https://example.org/shorts/
 *
 * Writes out/shorts/:
 *   order.txt               "001 pr03" per line: the file number of each short
 *   publer-all.csv          every short, one a day (needs a paid Publer plan)
 *   publer-batch-NN.csv     the same in fives (the free plan's CSV limit)
 *   captions/NNN-<id>.txt   title, caption and first comment, for posting by hand
 *
 * Columns follow Publer's own template (publer-assets.s3.amazonaws.com/site/
 * CSV Template for Publer.csv). The video URLs are <media><NNN-id>.mp4, so the
 * rendered files must be hosted there under the same names.
 */
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { QUESTIONS } from './beats.mjs';

const VIDEO = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(VIDEO, 'out', 'shorts');
const META = JSON.parse(readFileSync(join(VIDEO, '..', 'src/data/meta.json'), 'utf8'));
const TOPICS = Object.fromEntries(META.topics.map((t) => [t.key, t]));

const APP = 'https://utpaldaslabs.github.io/German-Driving-/';
const CHANNEL = 'Living in Deutschland';

const args = process.argv.slice(2);
const arg = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback);
const tomorrow = new Date(Date.now() + 864e5).toISOString().slice(0, 10);
const START = arg('--start', tomorrow);
const TIME = arg('--time', '19:00');
const MEDIA = arg('--media', 'https://github.com/UtpalDasLabs/German-Driving-/releases/download/driving-shorts/');

/** One hashtag per topic, in the words people search for. */
const TOPIC_TAG = {
  priority: '#vorfahrt', signals: '#ampel', signs: '#verkehrszeichen', basics: '#führerscheinprüfung',
  speed: '#tempolimit', overtaking: '#überholen', turning: '#abbiegen', people: '#radfahrer',
  rail: '#bahnübergang', parking: '#parken', motorway: '#autobahn', hazards: '#gefahrenbremsung',
  fitness: '#promillegrenze', vehicle: '#auto', eco: '#spritsparen', law: '#verkehrsrecht',
};
const TAGS = '#germandrivingtest #führerschein #fahrschule #drivingingermany #lifeingermany';

/**
 * The order the shorts go out in: one topic after another so no two days look
 * alike, each topic's drawn situations first (they stop the scroll best), then
 * its five-point questions.
 */
export function postingOrder() {
  const rank = (q) => (q.scene ? 0 : q.signs.length ? 1 : 2) * 10 - q.points;
  const queues = META.topics
    .map((t) => QUESTIONS.filter((q) => q.topic === t.key).sort((a, b) => rank(a) - rank(b) || a.id.localeCompare(b.id)))
    .filter((qs) => qs.length);
  const order = [];
  while (queues.some((qs) => qs.length)) for (const qs of queues) if (qs.length) order.push(qs.shift());
  return order;
}

const lastSentence = (text) => (text.match(/[^.!?]+[.!?]+/g) ?? [text]).at(-1).trim();

/** YouTube titles stay under 70 characters, the length shown in full on a phone. */
function title(q) {
  const ask = lastSentence(q.prompt.en);
  for (const t of [`${ask} | German driving test`, `${q.prompt.en} | German driving test`, ask, `German driving test: ${TOPICS[q.topic].title.en}`]) {
    if (t.length <= 70) return t;
  }
  return `German driving test: ${TOPICS[q.topic].title.en}`;
}

function caption(q) {
  const ask = q.kind === 'number' ? 'Your number?' : q.options.length > 3 ? 'A, B, C or D?' : q.options.length > 2 ? 'A, B or C?' : 'A or B?';
  return [
    `${q.prompt.en} 🤔`,
    `${ask} Leave your guess in the comments, then watch to the end for the answer.`,
    '',
    `Every question is free in the Führerschein-Trainer app, in English and 12 more exam languages: ${APP}`,
    `Full lessons in English on YouTube: ${CHANNEL}.`,
    '',
    `${TAGS} ${TOPIC_TAG[q.topic] ?? ''} #shorts`.replace(/\s+/g, ' ').trim(),
  ].join('\n');
}

const firstComment = () => `Practise all ${QUESTIONS.length} questions free, no account: ${APP}`;

const csvCell = (v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const HEADER = [
  'Date - Intl. format or prompt', 'Text', 'Link(s) - Separated by comma for FB carousels', 'Media URL(s) - Separated by comma',
  'Title - For the video, pin, PDF ..', 'Label(s) - Separated by comma', 'Alt text(s) - Separated by ||', 'Comment(s) - Separated by ||',
  'Pin board, FB album, or Google category', 'Post subtype - I.e. story, reel, PDF ..', 'CTA - For Facebook links or Google',
  'Reminder - For stories, reels, shorts, and TikToks',
];

if (import.meta.url === `file://${process.argv[1]}`) {
  const order = postingOrder();
  // Only this script's own files: rendered videos may sit beside them.
  rmSync(join(OUT, 'captions'), { recursive: true, force: true });
  mkdirSync(join(OUT, 'captions'), { recursive: true });
  for (const f of readdirSync(OUT)) if (/^publer-.*\.csv$/.test(f)) rmSync(join(OUT, f));

  const rows = order.map((q, i) => {
    const n = String(i + 1).padStart(3, '0');
    const day = new Date(`${START}T00:00:00Z`);
    day.setUTCDate(day.getUTCDate() + i);
    const date = `${day.toISOString().slice(0, 10)} ${TIME}`;
    const file = `${n}-${q.id}.mp4`;
    writeFileSync(
      join(OUT, 'captions', `${n}-${q.id}.txt`),
      `${title(q)}\n\n${caption(q)}\n\nFirst comment:\n${firstComment()}\n\nPost on: ${date}\n`,
    );
    return { n, q, cells: [date, caption(q), '', `${MEDIA}${file}`, title(q), 'driving-shorts', '', firstComment(), '', 'reel', '', ''] };
  });

  const csv = (rs) => `${[HEADER, ...rs.map((r) => r.cells)].map((r) => r.map(csvCell).join(',')).join('\n')}\n`;
  writeFileSync(join(OUT, 'order.txt'), rows.map((r) => `${r.n} ${r.q.id}`).join('\n') + '\n');
  writeFileSync(join(OUT, 'publer-all.csv'), csv(rows));
  for (let b = 0; b * 5 < rows.length; b++) {
    writeFileSync(join(OUT, `publer-batch-${String(b + 1).padStart(2, '0')}.csv`), csv(rows.slice(b * 5, b * 5 + 5)));
  }
  const longest = Math.max(...rows.map((r) => r.cells[4].length));
  console.log(`${rows.length} shorts, ${rows[0].cells[0]} to ${rows.at(-1).cells[0]}; longest title ${longest} characters. → ${OUT}`);
}
