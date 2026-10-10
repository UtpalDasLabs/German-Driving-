/**
 * The timed beat list for one question, for Node scripts. Reuses the same
 * script module the video does, so stills land on the beats the video has.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildScript } from '../src/lib/script.mjs';

const VIDEO = join(dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = join(VIDEO, '..');
const json = (p) => JSON.parse(readFileSync(p, 'utf8'));

export const QUESTIONS = json(join(ROOT, 'src/data/questions.json'));

export function scriptFor(id) {
  const q = QUESTIONS.find((x) => x.id === id);
  if (!q) throw new Error(`There is no question ${id} in the bank.`);
  return buildScript(q);
}

/** Question ids from the command line: ids, topic names, or "all". */
export function resolveIds(args) {
  if (args.includes('all')) return QUESTIONS.map((q) => q.id);
  return args.flatMap((a) => (QUESTIONS.some((q) => q.topic === a) ? QUESTIONS.filter((q) => q.topic === a).map((q) => q.id) : [a]));
}

export async function load(id, fps) {
  let at = 0;
  return scriptFor(id).beats.map((b, index) => {
    const frames = Math.round(b.seconds * fps);
    const timed = { ...b, index, from: at, frames };
    at += frames;
    return timed;
  });
}
