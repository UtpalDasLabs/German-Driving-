/**
 * The script for one short: an ordered list of beats, each saying what the
 * viewer sees and what the narrator says.
 *
 * This is the single source of truth for both halves of a video. The Remotion
 * template lays out its timeline from it; the narration builder writes the
 * voice script from the same list, so picture and sound cannot drift apart.
 *
 * Plain JavaScript with no imports, so it runs unchanged in the Remotion
 * bundle and in the Node scripts that build narration. Callers pass the data.
 *
 * Narration is English - the language most of the channel's viewers sit the
 * theory test in. Every span of German is tagged `de` so the voice switches to
 * native pronunciation for exactly those words: sign names, "rechts vor links",
 * the app's name.
 */

const LETTERS = ['A', 'B', 'C', 'D'];

/** Seconds per beat when there is no narration to time it by. */
export const SILENT_SECONDS = {
  hook: 2.6,
  question: 4.5,
  option: 2.6,
  number: 2.4,
  countdown: 3.0,
  reveal: 3.4,
  why: 6.0,
  tip: 3.2,
  end: 3.2,
};

const en = (text) => ({ lang: 'en', text });
const de = (text) => ({ lang: 'de', text });

/**
 * Splits an English line with [[German]] spans into tagged segments, so a
 * hand-written line can quote German without an English accent.
 */
export function parseMarked(line) {
  const out = [];
  const re = /\[\[(.+?)\]\]/g;
  let last = 0;
  for (const m of line.matchAll(re)) {
    if (m.index > last) out.push(en(line.slice(last, m.index)));
    out.push(de(m[1]));
    last = m.index + m[0].length;
  }
  if (last < line.length) out.push(en(line.slice(last)));
  return out;
}

/**
 * German terms the explanations use in English text. Marking them here means
 * the voice says "rechts vor links" like a German, not like a tourist.
 */
const GERMAN_TERMS = ['rechts vor links', 'Schulterblick', 'Rettungsgasse', 'Probezeit', 'Grünpfeil', 'Reißverschluss'];

export function markGerman(text) {
  let out = text;
  for (const term of GERMAN_TERMS) out = out.replace(new RegExp(`(?<!\\[\\[)${term}(?!\\]\\])`, 'g'), `[[${term}]]`);
  return out;
}

/** The explanation, cut to what fits a short: whole sentences, about 260 characters. */
export function shortWhy(text) {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text];
  let out = '';
  for (const s of sentences) {
    if (out && (out + s).length > 260) break;
    out += s;
  }
  return out.trim();
}

/** "1.6" is read "one point six"; the screen shows the German "1,6". */
export function formatNumber(n) {
  return String(n).replace('.', ',');
}

const join = (items) => (items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`);

/**
 * @param q  one question from src/data/questions.json
 */
export function buildScript(q) {
  const beats = [];
  const beat = (name, say, extra = {}) =>
    beats.push({ name, seconds: SILENT_SECONDS[extra.timing ?? name], say, ...extra });
  const visual = q.scene ? 'scene' : q.signs.length ? 'signs' : 'none';

  // Short-form viewers decide in the first second: the situation is on screen
  // from frame one, and the opening line is the challenge, not a title.
  beat(
    'hook',
    [en(q.points === 5 ? 'Five-point question. Get two of these wrong, and you fail the German driving test.' : 'German driving test. Would you get this one right?')],
    { tag: '[curious]' },
  );
  beat('question', [en(q.prompt.en)]);

  if (q.kind === 'choice') {
    q.options.forEach((o, i) => {
      beat(`option${LETTERS[i]}`, [en(`${LETTERS[i]}: ${o.en}`)], { timing: 'option', optionIndex: i });
    });
  } else {
    beat('number', [en('Type in the number.')]);
  }

  // Comments before the reveal are what the platforms reward most.
  beat(
    'countdown',
    [en(q.kind === 'choice' && q.correct.length > 1 ? 'Careful, more than one can be right. Comment your answer!' : 'Comment your answer!')],
    { tag: '[excited]' },
  );

  let reveal;
  if (q.kind === 'number') {
    reveal = [en(`The answer is ${q.answerNumber}${q.unit ? ` ${q.unit === 'km/h' ? 'kilometres an hour' : q.unit === 'm' ? 'metres' : q.unit === 'mm' ? 'millimetres' : q.unit === 'cm' ? 'centimetres' : q.unit === '‰' ? 'per mille' : q.unit}` : ''}.`)];
  } else if (q.correct.length === 1) {
    reveal = [en(`The answer is ${LETTERS[q.correct[0]]}.`)];
  } else {
    reveal = [en(`${join(q.correct.map((i) => LETTERS[i]))} are all right. In the exam you must tick every one of them.`)];
  }
  beat('reveal', reveal, { correct: q.correct });

  beat('why', parseMarked(markGerman(shortWhy(q.why.en))));
  if (q.tip) beat('tip', [en('Remember: '), ...parseMarked(markGerman(q.tip.en))]);

  beat(
    'end',
    [en('Follow for more. Every question is free in the '), de('Führerschein'), en(' Trainer app. The link is in my profile.')],
    { tag: '[warm]' },
  );

  return { visual, correct: q.correct, beats };
}
