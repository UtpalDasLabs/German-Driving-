import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { clearAll, loadJSON, saveJSON } from '@/lib/storage';
import { XP_EXAM, xpForReview } from '@/lib/goals';
import { nextStreak, review, todayKey } from '@/lib/srs';
import type { CardProgress, ExamResult, Progress } from '@/lib/types';

const DEFAULTS: Progress = {
  cards: {},
  exams: [],
  checks: {},
  lastStudyDay: null,
  streak: 0,
  bestStreak: 0,
  xp: 0,
  xpToday: 0,
  xpDay: null,
  goalDays: [],
};

type Ctx = {
  progress: Progress;
  ready: boolean;
  card: (id: string) => CardProgress | undefined;
  /** `goalXp` lets the caller pass the user's current daily target. */
  grade: (id: string, knewIt: boolean, goalXp?: number) => void;
  /** Grades a whole batch in one write - used when a mock exam is handed in. */
  gradeMany: (results: { id: string; knewIt: boolean }[], goalXp?: number) => void;
  recordExam: (result: ExamResult, goalXp?: number) => void;
  toggleCheck: (key: string) => void;
  reset: () => void;
  restore: (next: Progress) => void;
};

const ProgressContext = createContext<Ctx>({
  progress: DEFAULTS,
  ready: false,
  card: () => undefined,
  grade: () => {},
  gradeMany: () => {},
  recordExam: () => {},
  toggleCheck: () => {},
  reset: () => {},
  restore: () => {},
});

/** Applies the day roll-over, streak and goal bookkeeping for an XP gain. */
function awardXp(prev: Progress, gained: number, goalXp: number): Progress {
  const today = todayKey();
  const streak = nextStreak(prev.lastStudyDay, prev.streak);
  const xpToday = (prev.xpDay === today ? prev.xpToday : 0) + gained;
  const metGoal = xpToday >= goalXp;
  const goalDays =
    metGoal && !prev.goalDays.includes(today) ? [today, ...prev.goalDays].slice(0, 400) : prev.goalDays;
  return {
    ...prev,
    lastStudyDay: today,
    streak,
    bestStreak: Math.max(prev.bestStreak, streak),
    xp: prev.xp + gained,
    xpToday,
    xpDay: today,
    goalDays,
  };
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Progress>(DEFAULTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadJSON('progress', DEFAULTS).then((p) => {
      setProgress(p);
      setReady(true);
    });
  }, []);

  const commit = useCallback((mutate: (prev: Progress) => Progress) => {
    setProgress((prev) => {
      const next = mutate(prev);
      void saveJSON('progress', next);
      return next;
    });
  }, []);

  const grade = useCallback(
    (id: string, knewIt: boolean, goalXp = 60) => {
      commit((prev) => ({
        ...awardXp(prev, xpForReview(knewIt), goalXp),
        cards: { ...prev.cards, [id]: review(prev.cards[id], knewIt) },
      }));
    },
    [commit],
  );

  const gradeMany = useCallback(
    (results: { id: string; knewIt: boolean }[], goalXp = 60) => {
      if (results.length === 0) return;
      commit((prev) => {
        const cards = { ...prev.cards };
        let gained = 0;
        for (const r of results) {
          cards[r.id] = review(prev.cards[r.id], r.knewIt);
          gained += xpForReview(r.knewIt);
        }
        return { ...awardXp(prev, gained, goalXp), cards };
      });
    },
    [commit],
  );

  const recordExam = useCallback(
    (result: ExamResult, goalXp = 60) => {
      commit((prev) => ({ ...awardXp(prev, XP_EXAM, goalXp), exams: [result, ...prev.exams].slice(0, 30) }));
    },
    [commit],
  );

  /** Ticking a practical checklist item is not study; it never touches XP. */
  const toggleCheck = useCallback(
    (key: string) => {
      commit((prev) => ({ ...prev, checks: { ...prev.checks, [key]: !prev.checks[key] } }));
    },
    [commit],
  );

  const reset = useCallback(() => {
    setProgress(DEFAULTS);
    void clearAll();
  }, []);

  const restore = useCallback((next: Progress) => {
    setProgress({ ...DEFAULTS, ...next });
    void saveJSON('progress', { ...DEFAULTS, ...next });
  }, []);

  const cardFn = useCallback((id: string) => progress.cards[id], [progress.cards]);

  const value = useMemo(
    () => ({ progress, ready, card: cardFn, grade, gradeMany, recordExam, toggleCheck, reset, restore }),
    [progress, ready, cardFn, grade, gradeMany, recordExam, toggleCheck, reset, restore],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  return useContext(ProgressContext);
}
