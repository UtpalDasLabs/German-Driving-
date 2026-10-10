#!/usr/bin/env node
/**
 * How much of the question bank does the series explain, and is any question
 * explained twice?
 *
 *   npm run coverage
 *
 * Reads every lesson script in longform/ and reports, per topic, how many
 * questions have a {Q<id>} anchor. Fails if a question is anchored twice,
 * anchored to something that is not a question card, or anchored in a script
 * that does not list it in its front matter.
 */
import fs from 'node:fs';
import path from 'node:path';

import { LONGFORM_DIR, parseLongform } from './longform.mjs';

const root = path.resolve(LONGFORM_DIR, '..', '..');
const questions = JSON.parse(fs.readFileSync(path.join(root, 'src/data/questions.json'), 'utf8'));
const meta = JSON.parse(fs.readFileSync(path.join(root, 'src/data/meta.json'), 'utf8'));

const where = new Map();
const problems = [];
const episodes = fs
  .readdirSync(LONGFORM_DIR)
  .filter((f) => f.endsWith('.md') && fs.readFileSync(path.join(LONGFORM_DIR, f), 'utf8').startsWith('---'))
  .map((f) => f.replace(/\.md$/, ''));

for (const topic of episodes) {
  const script = parseLongform(topic);
  const anchored = [];
  for (const c of script.chapters) {
    for (const s of c.shots) {
      if (s.questions.length && s.key !== 'question') problems.push(`${topic}: {Q${s.questions}} sits on a "${s.key ?? 'storyboard'}" scene, not a question card`);
      for (const id of s.questions) {
        if (!questions.some((q) => q.id === id)) problems.push(`${topic}: ${id} is not a question in the bank`);
        if (where.has(id)) problems.push(`${id} is explained twice: ${where.get(id)} and ${topic}`);
        where.set(id, topic);
        anchored.push(id);
      }
    }
  }
  const listed = script.meta.questions ?? [];
  for (const id of anchored) if (!listed.includes(id)) problems.push(`${topic}: ${id} is anchored but not in the front matter`);
  for (const id of listed) if (!anchored.includes(id)) problems.push(`${topic}: ${id} is in the front matter but never anchored`);
}

let done = 0;
for (const t of meta.topics) {
  const ids = questions.filter((q) => q.topic === t.key).map((q) => q.id);
  const covered = ids.filter((id) => where.has(id));
  done += covered.length;
  const eps = [...new Set(covered.map((id) => where.get(id)))];
  const bar = covered.length === ids.length ? 'done' : covered.length ? 'partial' : '';
  console.log(`${t.title.en.padEnd(26)} ${String(covered.length).padStart(3)}/${String(ids.length).padEnd(3)} ${bar.padEnd(8)} ${eps.join(', ')}`);
}
console.log(`\n${done} of ${questions.length} questions explained in ${episodes.length} lesson script(s).`);
if (problems.length) {
  console.error(`\n${problems.join('\n')}`);
  process.exit(1);
}
