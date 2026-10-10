/**
 * Authoring helper for the question bank.
 *
 * Each topic file is a list of `q(id, spec)` calls. The spec is deliberately
 * terse - German and English side by side, options as [de, en] pairs - so a
 * question reads as one block and the two languages cannot drift apart. The
 * build turns it into the full Question shape and fails loudly on anything
 * malformed (see scripts/build-data.mjs).
 *
 *   q('pr01', {
 *     pts: 5, sec: '1.3', basic: true,
 *     de: 'Wer darf zuerst fahren?', en: 'Who may go first?',
 *     opts: [['Ich', 'Me'], ['Der Pkw', 'The car']], ok: [1],
 *     why: ['…', '…'], tip: ['…', '…'],
 *     scene: { road: 'cross', actors: [...] }, signs: ['205'],
 *   })
 *
 * Number questions use `num` (and `unit`) instead of `opts`/`ok`.
 */
export function q(id, spec) {
  return { id, ...spec };
}

/** Shorthand for a bilingual pair. */
export const t = (de, en) => [de, en];
