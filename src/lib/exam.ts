import type { Question } from './types';
import { mulberry32, questions, shuffle } from './study';

/**
 * The theory test for class B (first licence): 30 questions, 20 from the
 * Grundstoff and 10 from the class B Zusatzstoff. Each wrong answer costs the
 * question's 2-5 error points. You pass with at most 10 error points - unless
 * two of the wrong answers were 5-point questions, which fails you even at
 * exactly 10 (Prüfungsrichtlinie, Anlage 7 FeV).
 */
export const EXAM = {
  basic: 20,
  classB: 10,
  maxErrorPoints: 10,
  maxFivePointMisses: 1,
} as const;

export type Answer = { picked: number[]; number: string };

export const emptyAnswer = (): Answer => ({ picked: [], number: '' });

export function isAnswered(q: Question, a: Answer | undefined): boolean {
  if (!a) return false;
  return q.kind === 'number' ? a.number.trim() !== '' : a.picked.length > 0;
}

/** Parses "1,6" as well as "1.6": German keyboards type a comma. */
export function parseNumber(input: string): number | null {
  const cleaned = input.trim().replace(/\s/g, '').replace(',', '.');
  if (!/^-?\d+(\.\d+)?$/.test(cleaned)) return null;
  return Number(cleaned);
}

/** All correct options ticked and no wrong one - partial credit does not exist. */
export function isCorrect(q: Question, a: Answer | undefined): boolean {
  if (!a) return false;
  if (q.kind === 'number') {
    const n = parseNumber(a.number);
    return n != null && q.answerNumber != null && Math.abs(n - q.answerNumber) < 1e-9;
  }
  const picked = [...a.picked].sort();
  const right = [...q.correct].sort();
  return picked.length === right.length && picked.every((v, i) => v === right[i]);
}

/**
 * Draws a mock exam. Points are balanced the way the real paper is: it mixes
 * cheap and expensive questions rather than drawing at random, so a mock is
 * never accidentally all 2-pointers. Within each part, five-point questions
 * are capped so the total stays close to the official 110.
 */
export function buildExam(seed = Date.now()): Question[] {
  const rng = mulberry32(seed);
  const draw = (pool: Question[], n: number) => {
    const byPoints = (p: number) => shuffle(pool.filter((q) => q.points === p), Math.floor(rng() * 1e9));
    const fives = byPoints(5);
    const rest = shuffle(pool.filter((q) => q.points !== 5), Math.floor(rng() * 1e9));
    const wantFives = Math.min(fives.length, Math.round(n * 0.3));
    return [...fives.slice(0, wantFives), ...rest.slice(0, n - wantFives)];
  };
  const basic = draw(questions.filter((q) => q.basic), EXAM.basic);
  const classB = draw(questions.filter((q) => !q.basic), EXAM.classB);
  // The real test is not sorted by topic; neither is this one.
  return [...shuffle(basic, Math.floor(rng() * 1e9)), ...shuffle(classB, Math.floor(rng() * 1e9))];
}

export type ExamScore = {
  errorPoints: number;
  fivePointMisses: number;
  correct: number;
  total: number;
  maxPoints: number;
  passed: boolean;
  missed: string[];
};

export function scoreExam(paper: Question[], answers: Record<string, Answer>): ExamScore {
  let errorPoints = 0;
  let fivePointMisses = 0;
  let correct = 0;
  const missed: string[] = [];
  for (const q of paper) {
    if (isCorrect(q, answers[q.id])) {
      correct += 1;
    } else {
      errorPoints += q.points;
      if (q.points === 5) fivePointMisses += 1;
      missed.push(q.id);
    }
  }
  return {
    errorPoints,
    fivePointMisses,
    correct,
    total: paper.length,
    maxPoints: paper.reduce((s, q) => s + q.points, 0),
    passed: errorPoints <= EXAM.maxErrorPoints && fivePointMisses <= EXAM.maxFivePointMisses,
    missed,
  };
}
