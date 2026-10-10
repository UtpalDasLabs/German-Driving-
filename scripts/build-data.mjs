#!/usr/bin/env node
/**
 * Compiles the authored material in data-source/ into the JSON the app (and
 * the video workspace) import from src/data/.
 *
 * The source is terse - German and English side by side as [de, en] pairs -
 * so a question reads as one block. This script turns it into the typed shapes
 * in src/lib/types.ts, merges in the other eleven languages from
 * data-source/i18n/<lang>.json, and fails the build on anything malformed:
 * a duplicate id, an answer index out of range, a sign with no drawing, a
 * translation whose option count does not match. Run it with `npm run data`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import TOPICS from '../data-source/topics.mjs';
import SIGNS from '../data-source/signs.mjs';
import PRACTICAL from '../data-source/practical.mjs';
import CONVERSION from '../data-source/conversion.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'data-source');
const OUT = path.join(ROOT, 'src', 'data');

const LANGS = ['de', 'en', 'tr', 'ar', 'ru', 'pl', 'ro', 'hr', 'el', 'it', 'es', 'pt', 'fr'];
const OTHER = LANGS.filter((l) => l !== 'de' && l !== 'en');
const SECTIONS = ['1.1', '1.2', '1.3', '1.4', '1.5', '2.1', '2.2', '2.4', '2.5', '2.6', '2.7'];
const ACTORS = ['you', 'car', 'truck', 'bus', 'tram', 'bike', 'moto', 'ped', 'child', 'police', 'ambulance', 'tractor', 'deer', 'ball'];
const ROADS = ['cross', 'tee', 'teeNorth', 'straight', 'oneway', 'roundabout', 'motorway', 'curve', 'rail', 'tramline', 'parking'];
const ARMS = ['n', 'e', 's', 'w'];

const problems = [];
const check = (ok, msg) => {
  if (!ok) problems.push(msg);
};
const pair = (v, where) => {
  check(Array.isArray(v) && v.length === 2 && v.every((s) => typeof s === 'string' && s.trim()), `${where}: expected [de, en]`);
  return { de: v?.[0] ?? '', en: v?.[1] ?? '' };
};

/* ------------------------------------------------- signs that can be drawn */

const artSource = fs.readFileSync(path.join(ROOT, 'src/art/signs.tsx'), 'utf8');
const drawable = new Set([...artSource.matchAll(/^\s+'([0-9][0-9.\-]*)':/gm)].map((m) => m[1]));
const speeds = artSource.match(/const SPEEDS = \[([^\]]+)\]/)?.[1].match(/'(\d+)'/g) ?? [];
for (const s of speeds) drawable.add(`274-${s.replace(/'/g, '')}`);

/* --------------------------------------------------------- translations */

const i18n = {};
for (const lang of OTHER) {
  const file = path.join(SRC, 'i18n', `${lang}.json`);
  i18n[lang] = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
}

/** Adds the other languages' strings to a {de, en} object, by path. */
function localise(base, getter) {
  const out = { ...base };
  for (const lang of OTHER) {
    const v = getter(i18n[lang]);
    if (typeof v === 'string' && v.trim()) out[lang] = v;
  }
  return out;
}

/* ---------------------------------------------------------------- signs */

const signIds = new Set();
const signs = SIGNS.map((s) => {
  check(!signIds.has(s.id), `sign ${s.id}: listed twice`);
  signIds.add(s.id);
  check(drawable.has(s.id), `sign ${s.id}: no drawing in src/art/signs.tsx`);
  return {
    id: s.id,
    category: s.category,
    name: localise(pair(s.name, `sign ${s.id} name`), (t) => t?.signs?.[s.id]?.name),
    meaning: localise(pair(s.meaning, `sign ${s.id} meaning`), (t) => t?.signs?.[s.id]?.meaning),
  };
});
for (const id of drawable) check(signIds.has(id), `sign ${id}: drawn but has no name in data-source/signs.mjs`);

/* --------------------------------------------------------------- topics */

const topicKeys = new Set(TOPICS.map((t) => t.key));
const topics = TOPICS.map((t) => ({
  key: t.key,
  order: t.order,
  icon: t.icon,
  color: t.color,
  title: localise(pair(t.title, `topic ${t.key}`), (x) => x?.topics?.[t.key]?.title),
  blurb: localise(pair(t.blurb, `topic ${t.key} blurb`), (x) => x?.topics?.[t.key]?.blurb),
}));

/* ------------------------------------------------------------ questions */

function checkScene(scene, where) {
  if (scene == null) return;
  check(ROADS.includes(scene.road), `${where}: unknown road "${scene.road}"`);
  check(Array.isArray(scene.actors), `${where}: scene needs actors`);
  scene.actors?.forEach((a, i) => {
    check(ACTORS.includes(a.kind), `${where}: actor ${i} has unknown kind "${a.kind}"`);
    check(a.at || ARMS.includes(a.arm), `${where}: actor ${i} needs an arm or a position`);
  });
  check((scene.actors ?? []).filter((a) => a.kind === 'you').length <= 1, `${where}: more than one "you"`);
  for (const s of scene.signs ?? []) {
    check(signIds.has(s.sign), `${where}: scene sign ${s.sign} unknown`);
    if (s.extra) check(signIds.has(s.extra), `${where}: scene extra sign ${s.extra} unknown`);
  }
}

const files = fs
  .readdirSync(path.join(SRC, 'questions'))
  .filter((f) => f.endsWith('.mjs') && !f.startsWith('_'))
  .sort();

const questions = [];
const seen = new Set();

for (const file of files) {
  const topic = file.replace('.mjs', '');
  check(topicKeys.has(topic), `${file}: no topic "${topic}" in topics.mjs`);
  const mod = await import(pathToFileURL(path.join(SRC, 'questions', file)).href);

  for (const raw of mod.default) {
    const id = raw.id;
    const where = `${file} ${id}`;
    check(/^[a-z]{2}\d{2}$/.test(id), `${where}: id should look like "pr01"`);
    check(!seen.has(id), `${where}: duplicate id`);
    seen.add(id);

    const kind = raw.kind ?? 'choice';
    check([2, 3, 4, 5].includes(raw.pts), `${where}: points must be 2-5`);
    check(SECTIONS.includes(raw.sec), `${where}: unknown section "${raw.sec}"`);
    check(typeof raw.basic === 'boolean', `${where}: basic must be true or false`);
    check(raw.basic === raw.sec.startsWith('1.'), `${where}: Grundstoff questions are section 1.x, class B 2.x`);

    const tr = (lang) => i18n[lang]?.questions?.[id];
    const prompt = localise(pair([raw.de, raw.en], `${where} prompt`), (t) => t?.questions?.[id]?.prompt);
    const why = localise(pair(raw.why, `${where} why`), (t) => t?.questions?.[id]?.why);
    const tip = raw.tip ? localise(pair(raw.tip, `${where} tip`), (t) => t?.questions?.[id]?.tip) : null;

    let options = [];
    let correct = [];
    if (kind === 'choice') {
      check(Array.isArray(raw.opts) && raw.opts.length >= 2 && raw.opts.length <= 4, `${where}: needs 2-4 options`);
      options = (raw.opts ?? []).map((o, i) =>
        localise(pair(o, `${where} option ${i}`), (t) => t?.questions?.[id]?.options?.[i]),
      );
      correct = raw.ok ?? [];
      check(correct.length >= 1, `${where}: no correct option`);
      check(correct.every((i) => Number.isInteger(i) && i >= 0 && i < options.length), `${where}: answer index out of range`);
      check(new Set(correct).size === correct.length, `${where}: answer listed twice`);
      for (const lang of OTHER) {
        const o = tr(lang)?.options;
        if (o) check(o.length === options.length, `${where}: ${lang} has ${o.length} options, expected ${options.length}`);
      }
    } else {
      check(kind === 'number', `${where}: kind must be choice or number`);
      check(typeof raw.num === 'number', `${where}: number question needs num`);
      check(raw.opts == null && raw.ok == null, `${where}: number question cannot have options`);
    }

    checkScene(raw.scene, where);
    for (const s of raw.signs ?? []) check(signIds.has(s), `${where}: sign ${s} unknown`);

    questions.push({
      id,
      topic,
      section: raw.sec,
      basic: raw.basic,
      points: raw.pts,
      kind,
      prompt,
      options,
      correct,
      answerNumber: kind === 'number' ? raw.num : null,
      unit: kind === 'number' ? raw.unit || null : null,
      why,
      tip,
      scene: raw.scene ?? null,
      signs: raw.signs ?? [],
      officialRef: raw.officialRef ?? null,
      official: raw.official === true,
    });
  }
}

for (const lang of OTHER) {
  for (const id of Object.keys(i18n[lang]?.questions ?? {})) check(seen.has(id), `i18n/${lang}.json: unknown question ${id}`);
}

/* ------------------------------------------------- guides (practical, conversion) */

const practical = PRACTICAL.map((g) => {
  const list = (field) =>
    g[field].map((v, i) => localise(pair(v, `practical ${g.key} ${field} ${i}`), (x) => x?.practical?.[g.key]?.[field]?.[i]));
  return {
    key: g.key,
    icon: g.icon,
    diagram: g.diagram,
    title: localise(pair(g.title, `practical ${g.key}`), (x) => x?.practical?.[g.key]?.title),
    body: list('body'),
    checklist: list('checklist'),
    pitfalls: list('pitfalls'),
    phrases: list('phrases'),
  };
});

const conversion = CONVERSION.map((c) => ({
  key: c.key,
  title: localise(pair(c.title, `conversion ${c.key}`), (x) => x?.conversion?.[c.key]?.title),
  body: c.body.map((v, i) => localise(pair(v, `conversion ${c.key} body ${i}`), (x) => x?.conversion?.[c.key]?.body?.[i])),
}));

/* ----------------------------------------------------------------- meta */

const byTopic = Object.fromEntries(TOPICS.map((t) => [t.key, questions.filter((q) => q.topic === t.key).length]));
for (const [k, n] of Object.entries(byTopic)) check(n > 0, `topic ${k} has no questions`);

const basic = questions.filter((q) => q.basic).length;
const classB = questions.length - basic;
// The mock exam draws 20 Grundstoff and 10 class B questions, never repeating one.
check(basic >= 20, `only ${basic} Grundstoff questions; the mock exam needs 20`);
check(classB >= 10, `only ${classB} class B questions; the mock exam needs 10`);

/** Share of a language's question text that is its own, not the English fallback. */
function coverage(lang) {
  if (lang === 'de' || lang === 'en') return 1;
  let have = 0;
  let total = 0;
  for (const q of questions) {
    const fields = [q.prompt, q.why, ...q.options, ...(q.tip ? [q.tip] : [])];
    total += fields.length;
    have += fields.filter((f) => typeof f[lang] === 'string').length;
  }
  return total ? Math.round((have / total) * 1000) / 1000 : 0;
}

const meta = {
  topics,
  counts: { questions: questions.length, basic, classB, signs: signs.length, byTopic },
  coverage: Object.fromEntries(LANGS.map((l) => [l, coverage(l)])),
  catalogue: { validFrom: '2025-04-01', officialQuestionsB: 1169 },
};

/* ---------------------------------------------------------------- write */

if (problems.length) {
  console.error(`\n${problems.length} problem(s) in the study data:\n`);
  for (const p of problems) console.error('  - ' + p);
  console.error('');
  process.exit(1);
}

fs.mkdirSync(OUT, { recursive: true });
const write = (name, data) => fs.writeFileSync(path.join(OUT, name), JSON.stringify(data, null, 1) + '\n');
write('questions.json', questions);
write('signs.json', signs);
write('practical.json', practical);
write('conversion.json', conversion);
write('meta.json', meta);

console.log(
  `Wrote ${questions.length} questions (${basic} Grundstoff, ${classB} class B), ${signs.length} signs, ` +
    `${practical.length} practical sections, ${conversion.length} conversion steps.`,
);
const partial = LANGS.filter((l) => meta.coverage[l] < 1).map((l) => `${l} ${Math.round(meta.coverage[l] * 100)}%`);
if (partial.length) console.log(`Translated question text: ${partial.join(', ')} (missing text falls back to English).`);
