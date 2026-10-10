#!/usr/bin/env node
/**
 * Checks every exam question in a script works as a quiz moment, before any
 * voice is bought: a [countdown] paragraph; no option read out before it (the
 * options are on screen, and one read early would be ruled out by ear); and
 * the answer said right after the countdown, so the cards turn green on time.
 *
 *   npm run check:quiz -- <topic>
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { parseLongform } from './longform.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const all = JSON.parse(fs.readFileSync(path.join(here, '..', '..', 'src', 'data', 'questions.json'), 'utf8'));
const norm = (s) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N} ]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();

const topic = process.argv[2];
if (!topic) {
  console.error('usage: npm run check:quiz -- <topic>');
  process.exit(1);
}
let bad = 0;
for (const ch of parseLongform(topic).chapters)
  for (const sh of ch.shots) {
    if (sh.key !== 'question') continue;
    const q = all.find((x) => x.id === sh.questions[0]);
    const problems = [];
    if (!q) {
      console.log(`${sh.questions[0]}: no such question`);
      bad++;
      continue;
    }
    const ci = sh.paras.findIndex((p) => p.tags.includes('countdown'));
    if (ci < 0) problems.push('no [countdown] paragraph');
    else {
      const before = norm(sh.paras.slice(0, ci).map((p) => p.plain).join(' '));
      if (q.kind === 'choice') {
        // Short options ("2, 3, 1", "Ja") are too easy to match by accident.
        for (const [i, o] of q.options.entries()) {
          const n = norm(o.en);
          if (n.length > 12 && before.includes(n)) problems.push(`option ${'ABCD'[i]} said before the countdown`);
        }
      }
      const revealCue = sh.screen.some((l) => l.startsWith('@ '));
      const after = norm(sh.paras[ci].plain);
      const answer = q.kind === 'choice' ? norm(q.options[q.correct[0]].en) : norm(String(q.answerNumber));
      if (!revealCue && !after.includes(answer)) problems.push(`the answer "${answer}" is not said in the countdown paragraph`);
    }
    if (problems.length) {
      bad++;
      console.log(`${q.id} (${ch.title}): ${problems.join('; ')}`);
    }
  }
console.log(bad ? `${bad} question(s) to fix` : 'Every question is a working quiz moment.');
process.exit(bad ? 1 : 0);
