import rawMeta from '@/data/meta.json';
import rawQuestions from '@/data/questions.json';
import rawSigns from '@/data/signs.json';
import rawPractical from '@/data/practical.json';
import rawConversion from '@/data/conversion.json';

import type {
  CardProgress,
  ConversionStep,
  GuideSection,
  Meta,
  Question,
  SignCategory,
  SignInfo,
  Topic,
  TopicKey,
} from './types';
import { isDue, mastery } from './srs';
import type { StringKey } from '@/i18n';

export const meta = rawMeta as unknown as Meta;
export const questions = rawQuestions as unknown as Question[];
export const signs = rawSigns as unknown as SignInfo[];
export const practical = rawPractical as unknown as GuideSection[];
export const conversion = rawConversion as unknown as ConversionStep[];
export const topics: Topic[] = [...meta.topics].sort((a, b) => a.order - b.order);

const questionById = new Map(questions.map((q) => [q.id, q]));
const signById = new Map(signs.map((s) => [s.id, s]));
const topicByKey = new Map(topics.map((t) => [t.key, t]));

export const getQuestion = (id: string) => questionById.get(id);
export const getSign = (id: string) => signById.get(id);
export const getTopic = (key: string) => topicByKey.get(key as TopicKey);

/** Signs are reviewed on their own schedule, under a prefixed id. */
export const signCardId = (id: string) => `sign:${id}`;

export const questionIds = questions.map((q) => q.id);
export const signCardIds = signs.map((s) => signCardId(s.id));

/** Interface label for each sign category. */
export const CATEGORY_LABEL: Record<SignCategory, StringKey> = {
  danger: 'catDanger',
  priority: 'catPriority',
  mandatory: 'catMandatory',
  prohibition: 'catProhibition',
  parking: 'catParking',
  info: 'catInfo',
  extra: 'catExtra',
  marking: 'catMarking',
};

/** Sign trainer order: the categories a learner meets first come first. */
export const SIGN_CATEGORIES: SignCategory[] = [
  'priority',
  'danger',
  'prohibition',
  'mandatory',
  'parking',
  'info',
  'extra',
  'marking',
];

export type Filter = {
  topic?: TopicKey | 'all';
  /** Only questions due for review (or never seen). */
  due?: boolean;
  /** Only questions answered wrong more often than right. */
  tricky?: boolean;
  /** An explicit list, e.g. the mistakes from a mock exam. */
  ids?: string[];
};

export function filterQuestions(cards: Record<string, CardProgress>, f: Filter, now = Date.now()): Question[] {
  const pool = f.ids ? f.ids.map(getQuestion).filter((q): q is Question => !!q) : questions;
  return pool.filter((q) => {
    if (f.topic && f.topic !== 'all' && q.topic !== f.topic) return false;
    const card = cards[q.id];
    if (f.due && !isDue(card, now)) return false;
    if (f.tricky) {
      if (!card || card.seen === 0) return false;
      if (card.correct / card.seen > 0.6) return false;
    }
    return true;
  });
}

/** Weak items first, with enough randomness that a session never feels like a loop. */
export function orderForStudy<T extends { id: string }>(
  items: T[],
  cards: Record<string, CardProgress>,
  key: (item: T) => string = (item) => item.id,
  seed = Date.now(),
): T[] {
  const rng = mulberry32(seed);
  return [...items]
    .map((item) => ({ item, w: (1 - mastery(cards[key(item)])) * 2 + rng() }))
    .sort((a, b) => b.w - a.w)
    .map((x) => x.item);
}

export function shuffle<T>(items: T[], seed = Date.now()): T[] {
  const rng = mulberry32(seed);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Small deterministic PRNG so a given session can be replayed. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Question ids grouped by topic, for the progress screens. */
export function topicGroups(): { id: string; key: string }[] {
  return questions.map((q) => ({ id: q.id, key: q.topic }));
}
