import type { Question } from '../../../src/lib/types';

export type Segment = { lang: 'en' | 'de'; text: string };

export type Beat = {
  name: string;
  seconds: number;
  say: Segment[];
  timing?: string;
  optionIndex?: number;
  correct?: number[];
  /** Delivery tag for Eleven v4 ("[curious]"); never shown, never spoken. */
  tag?: string;
  /** Shown without narration; its length comes from SILENT_SECONDS. */
  silent?: boolean;
};

export type Script = {
  visual: 'scene' | 'signs' | 'none';
  correct: number[];
  beats: Beat[];
};

export const SILENT_SECONDS: Record<string, number>;
export function parseMarked(line: string): Segment[];
export function markGerman(text: string): string;
export function shortWhy(text: string): string;
export function formatNumber(n: number): string;
export function buildScript(q: Question): Script;
