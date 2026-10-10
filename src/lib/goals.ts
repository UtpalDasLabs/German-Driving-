import type { GoalId } from './types';

/**
 * Daily XP goals. The XP numbers are small multiples of a single answer so
 * "one more question" always visibly moves the ring.
 */
export const GOALS: Record<GoalId, { xp: number; cards: number }> = {
  casual: { xp: 30, cards: 5 },
  regular: { xp: 60, cards: 10 },
  serious: { xp: 120, cards: 20 },
  intense: { xp: 240, cards: 40 },
};

export const GOAL_ORDER: GoalId[] = ['casual', 'regular', 'serious', 'intense'];

/** XP per answer. Getting it right is worth more than guessing. */
export const XP_CORRECT = 6;
export const XP_WRONG = 2;
/** Bonus for sitting a full mock exam, pass or fail - sitting it is the work. */
export const XP_EXAM = 80;

export function xpForReview(knewIt: boolean): number {
  return knewIt ? XP_CORRECT : XP_WRONG;
}
