import { mastery } from './srs';
import type { CardProgress } from './types';

export type GroupStat = {
  key: string;
  total: number;
  seen: number;
  mastered: number;
  /** Average box position across the group, 0-1. */
  progress: number;
};

/** Box 4 and 5 count as "mastered" - the item is on a long interval. */
export const MASTERED_BOX = 4;

/**
 * Rolls a set of item ids up by whatever key the caller groups them under -
 * a topic or a sign category.
 */
export function groupStats(
  items: { id: string; key: string }[],
  cards: Record<string, CardProgress>,
  order?: string[],
): GroupStat[] {
  const buckets = new Map<string, string[]>();
  for (const item of items) {
    const list = buckets.get(item.key) ?? [];
    list.push(item.id);
    buckets.set(item.key, list);
  }

  const stats = [...buckets.entries()].map(([key, ids]) => {
    let seen = 0;
    let mastered = 0;
    let sum = 0;
    for (const id of ids) {
      const card = cards[id];
      if (card && card.seen > 0) seen += 1;
      if ((card?.box ?? 0) >= MASTERED_BOX) mastered += 1;
      sum += mastery(card);
    }
    return { key, total: ids.length, seen, mastered, progress: sum / ids.length };
  });

  if (!order) return stats;
  const rank = new Map(order.map((k, i) => [k, i]));
  return stats.sort((a, b) => (rank.get(a.key) ?? 999) - (rank.get(b.key) ?? 999));
}

export function overallProgress(ids: string[], cards: Record<string, CardProgress>): number {
  if (ids.length === 0) return 0;
  return ids.reduce((sum, id) => sum + mastery(cards[id]), 0) / ids.length;
}

export function masteredCount(ids: string[], cards: Record<string, CardProgress>): number {
  return ids.filter((id) => (cards[id]?.box ?? 0) >= MASTERED_BOX).length;
}

/** Percentage score, rounded the way a certificate reports it. */
export function percent(correct: number, total: number): number {
  return total === 0 ? 0 : Math.round((correct / total) * 100);
}
