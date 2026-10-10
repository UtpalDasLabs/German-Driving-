import type { Question } from '../../../src/lib/types';
import questionsJson from '../../../src/data/questions.json';
import signsJson from '../../../src/data/signs.json';
import { buildScript, type Script } from './script.mjs';

export const QUESTIONS = questionsJson as unknown as Question[];
export type SignRow = { id: string; category: string; name: { de: string; en: string }; meaning: { de: string; en: string } };
export const SIGNS = signsJson as unknown as SignRow[];

export type Loaded = { q: Question; script: Script };

export function question(id: string): Question {
  const q = QUESTIONS.find((x) => x.id === id);
  if (!q) throw new Error(`There is no question ${id} in the bank.`);
  return q;
}

export function load(id: string): Loaded {
  const q = question(id);
  return { q, script: buildScript(q) };
}

export function sign(id: string): SignRow {
  const s = SIGNS.find((x) => x.id === id);
  if (!s) throw new Error(`There is no sign ${id}.`);
  return s;
}
