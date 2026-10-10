/**
 * The driving lessons' own scenes. Most of a lesson is built from four:
 *
 *   question   an exam question: the situation, the options, a countdown and
 *              the reveal - with the cars driving in the order the rules give
 *   traffic    a situation on its own, from a question's drawing, optionally
 *              driving (`> pr03 | move @ cue`)
 *   sign       signs, large, with their German names (`> 205 | 206`)
 *   manoeuvre  a practical-test manoeuvre, driven (`> parallel`)
 *
 * plus the generic text scenes in generic.tsx. Every picture comes from the
 * app's own drawing code, so the lessons and the app can never disagree.
 */
import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

import { KitProvider, domKit } from '../../../src/art/kit';
import { MANOEUVRES, YouCar, type Manoeuvre } from '../../../src/art/manoeuvres';
import { SceneArt } from '../../../src/art/scene';
import { SignArt } from '../../../src/art/signs';
import { OptionCard, type CardState } from '../components';
import { alpha, C, FONT, GOLD, SERIES } from '../lib/brand';
import { question, sign } from '../lib/data';
import { motionOf, motionFrames, posesAt } from '../lib/motion';
import { formatNumber } from '../lib/script.mjs';
import { End, Fact, List, Outro, Quote, Stat, Term, Words } from './generic';
import { rise, SERIF } from './look';
import { charFrame, findCue, screenLines, useShot, type Shot } from './plan';

const LETTERS = ['A', 'B', 'C', 'D'] as const;

export const norm = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^\p{L}\p{N} ]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();

/** Frame where `text` (normalised) is first spoken in a paragraph from index `from` on. */
function spokenAt(shot: Shot, text: string, fps: number, fromPara = 0): number | null {
  const needle = norm(text);
  if (!needle) return null;
  for (const p of shot.paras.slice(fromPara)) {
    const hay = p.tts.toLowerCase();
    const at = hay.indexOf(text.toLowerCase());
    if (at >= 0) return charFrame(p, at, fps);
    // Fall back to the normalised text, for answers read with different punctuation.
    const i = norm(p.tts).indexOf(needle);
    if (i >= 0) return charFrame(p, Math.round((i / Math.max(1, norm(p.tts).length)) * p.tts.length), fps);
  }
  return null;
}

/**
 * When the answer lands. The narrator never reads the options aloud before the
 * countdown (npm run check:quiz enforces it); the countdown paragraph opens
 * with the answer, so the cards turn green on that word. A `> @ phrase` line
 * under the scene names a different moment.
 */
export function questionTiming(shot: Shot, fps: number) {
  const id = shot.questions[0];
  if (id == null) throw new Error(`A question shot needs a {Q<id>} anchor: ${shot.scene}`);
  const q = question(id);
  const ci = shot.paras.findIndex((p) => p.countdown);
  const revealCue = shot.screen.find((l) => l.startsWith('@ '));
  const cued = revealCue ? findCue(shot, revealCue.slice(2).trim(), fps) : null;
  const firstRight =
    q.kind === 'choice'
      ? Math.min(...q.correct.map((i) => spokenAt(shot, q.options[i].en, fps, Math.max(0, ci)) ?? Infinity))
      : spokenAt(shot, String(q.answerNumber), fps, Math.max(0, ci)) ?? Infinity;
  const countdownStart = ci >= 0 ? shot.paras[ci].from : Math.round(shot.frames * 0.55);
  const answerAt = cued ?? (Number.isFinite(firstRight) ? firstRight : countdownStart + 4);
  const ruledOut =
    q.kind === 'choice'
      ? q.options
          .map((o, i) => (q.correct.includes(i) ? null : spokenAt(shot, o.en, fps)))
          .filter((f): f is number => f != null && f < answerAt)
      : [];
  return { id, q, answerAt, ruledOut, countdownStart: ci >= 0 ? countdownStart : null };
}

/** Three, two, one: a ring that empties while the viewer guesses. */
function GuessRing({ from, frames }: { from: number; frames: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame - from;
  if (t < 0 || t > frames) return null;
  const left = Math.max(1, Math.ceil((frames - t) / fps));
  const o = Math.min(
    interpolate(t, [0, 6], [0, 1], { extrapolateRight: 'clamp' }),
    interpolate(t, [frames - 6, frames], [1, 0], { extrapolateLeft: 'clamp' }),
  );
  const r = 64;
  const progress = 1 - t / frames;
  return (
    <div style={{ position: 'absolute', right: 96, top: 70, opacity: o, display: 'flex', alignItems: 'center', gap: 24 }}>
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 28, letterSpacing: 3, color: GOLD }}>YOUR ANSWER?</div>
      <div style={{ position: 'relative', width: 2 * r + 20, height: 2 * r + 20 }}>
        <svg width={2 * r + 20} height={2 * r + 20} style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
          <circle cx={r + 10} cy={r + 10} r={r} fill="none" stroke={C.track} strokeWidth={12} />
          <circle
            cx={r + 10}
            cy={r + 10}
            r={r}
            fill="none"
            stroke={GOLD}
            strokeWidth={12}
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * r}
            strokeDashoffset={2 * Math.PI * r * (1 - progress)}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 800, fontSize: 64, color: C.text }}>
          {left}
        </div>
      </div>
    </div>
  );
}

/** An exam question, 16:9: the situation on the left, the question on the right. */
function Question() {
  const shot = useShot();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { q, answerAt, countdownStart } = questionTiming(shot, fps);
  const revealed = frame >= answerAt;
  const moving = motionOf(q) != null;
  const poses = revealed && moving ? posesAt(q, frame - answerAt) : undefined;
  const hasVisual = !!q.scene || q.signs.length > 0;
  const longest = Math.max(0, ...q.options.map((o) => o.en.length));
  const optSize = longest > 60 ? 30 : longest > 34 ? 34 : 40;
  const state = (i: number): CardState => (!revealed ? 'idle' : q.correct.includes(i) ? 'correct' : 'dim');

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, flexDirection: 'row', alignItems: 'center', padding: '80px 96px', gap: 72 }}>
      {hasVisual ? (
        <div style={{ width: 780, display: 'flex', justifyContent: 'center', opacity: rise(frame, 0) }}>
          {q.scene ? (
            <div style={{ borderRadius: 36, overflow: 'hidden', boxShadow: '0 24px 70px rgba(0,0,0,0.45)' }}>
              <SceneArt scene={q.scene} size={780} poses={poses} arrows={!(revealed && moving)} />
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
              {q.signs.map((s) => (
                <SignArt key={s} id={s} size={q.signs.length > 2 ? 250 : 340} />
              ))}
            </div>
          )}
        </div>
      ) : null}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 24, letterSpacing: 3, color: GOLD, opacity: rise(frame, 0) }}>
          EXAM QUESTION · {q.points} POINTS
        </div>
        <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: q.prompt.en.length > 110 ? 44 : 52, lineHeight: 1.15, color: C.text, opacity: rise(frame, 2) }}>
          {q.prompt.en}
        </div>
        <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 30, lineHeight: 1.3, color: C.textMuted, opacity: rise(frame, 6) }}>{q.prompt.de}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 14 }}>
          {q.kind === 'choice' ? (
            q.options.map((o, i) => (
              <OptionCard key={i} letter={LETTERS[i]} main={o.en} sub={o.de} state={state(i)} enter={rise(frame, 10 + i * 5)} fontSize={optSize} />
            ))
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, opacity: rise(frame, 10) }}>
              <div
                style={{
                  minWidth: 260,
                  padding: '18px 40px',
                  borderRadius: 26,
                  border: `4px solid ${revealed ? C.success : C.borderStrong}`,
                  backgroundColor: revealed ? C.successBg : C.surface,
                  color: revealed ? C.success : C.text,
                  fontFamily: FONT,
                  fontWeight: 800,
                  fontSize: 84,
                  textAlign: 'center',
                }}
              >
                {revealed ? formatNumber(q.answerNumber ?? 0) : '?'}
              </div>
              {q.unit ? <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 60, color: C.textMuted }}>{q.unit}</div> : null}
            </div>
          )}
        </div>
      </div>
      {countdownStart != null ? <GuessRing from={countdownStart - 3 * fps} frames={3 * fps} /> : null}
    </AbsoluteFill>
  );
}

/** A situation on its own: `> <question id> | move @ cue`. */
function Traffic() {
  const shot = useShot();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [{ fields, at }] = screenLines(shot, fps);
  const q = question(fields[0]);
  if (!q.scene) throw new Error(`Question ${q.id} has no scene to show`);
  const move = fields.includes('move');
  const start = move ? at : Infinity;
  const poses = frame >= start ? posesAt(q, frame - start) : undefined;
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ borderRadius: 40, overflow: 'hidden', opacity: rise(frame, 0, 14), boxShadow: '0 24px 70px rgba(0,0,0,0.45)' }}>
        <SceneArt scene={q.scene} size={920} poses={poses} arrows={frame < start} />
      </div>
    </AbsoluteFill>
  );
}

/** Signs, large, each with its German and English name: `> 205 | 206 @ cue`. */
function Signs() {
  const shot = useShot();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lines = screenLines(shot, fps);
  const items = lines.flatMap((l) => l.fields.map((id) => ({ id, at: l.at })));
  const size = items.length > 3 ? 300 : items.length > 1 ? 380 : 520;
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: 80, alignItems: 'flex-start' }}>
        {items.map(({ id, at }, i) => {
          const o = rise(frame, at + i * 6, 14);
          const s = sign(id);
          return (
            <div key={id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, opacity: o, transform: `translateY(${(1 - o) * 30}px)`, maxWidth: size + 80 }}>
              <SignArt id={id} size={size} />
              <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 24, letterSpacing: 3, color: GOLD }}>ZEICHEN {id}</div>
              <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 48, color: C.text, textAlign: 'center' }}>{s.name.de}</div>
              <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 32, color: C.textMuted, textAlign: 'center' }}>{s.name.en}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

/** A practical-test manoeuvre, driven from position to position: `> parallel`. */
function ManoeuvreScene() {
  const shot = useShot();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const name = (shot.screen[0]?.split(' | ')[0].trim() ?? 'parallel') as Manoeuvre['key'];
  const m = MANOEUVRES[name];
  if (!m) throw new Error(`No manoeuvre "${name}"`);
  const [vx, vy, vw, vh] = m.view;
  const steps = m.poses.length - 1;
  const span = Math.max(1, shot.frames - fps * 2);
  const t = Math.max(0, Math.min(1, (frame - fps) / span)) * steps;
  const k = Math.min(steps - 1, Math.floor(t));
  const f = t - k;
  const [x0, y0, h0] = m.poses[k];
  const [x1, y1, h1, gear] = m.poses[k + 1];
  const e = f < 0.5 ? 2 * f * f : 1 - (-2 * f + 2) ** 2 / 2;
  const width = 1500;
  const height = Math.min(900, (width * vh) / vw);
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', borderRadius: 36, overflow: 'hidden', boxShadow: '0 24px 70px rgba(0,0,0,0.45)' }}>
        <KitProvider kit={domKit}>
          <svg width={(height * vw) / vh} height={height} viewBox={`${vx} ${vy} ${vw} ${vh}`}>
            {m.scenery(domKit)}
            <path d={m.poses.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ')} fill="none" stroke={GOLD} strokeWidth={0.8} strokeDasharray="2 1.5" opacity={0.7} />
            <YouCar k={domKit} x={x0 + (x1 - x0) * e} y={y0 + (y1 - y0) * e} heading={h0 + (h1 - h0) * e} />
          </svg>
        </KitProvider>
        <div
          style={{
            position: 'absolute',
            right: 26,
            top: 22,
            padding: '8px 22px',
            borderRadius: 999,
            backgroundColor: gear === 'R' ? alpha(C.danger, 0.9) : alpha(C.surface, 0.9),
            color: gear === 'R' ? '#fff' : C.text,
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 30,
          }}
        >
          {gear === 'R' ? 'R · rückwärts' : 'D · vorwärts'}
        </div>
      </div>
    </AbsoluteFill>
  );
}

/** Lesson title card. `> subtitle` under the scene. */
function Title({ title }: { title: string }) {
  const shot = useShot();
  const frame = useCurrentFrame();
  const sub = shot.screen[0] ?? '';
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center', gap: 34 }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 40%, ${alpha(GOLD, 0.12)} 0%, ${alpha(GOLD, 0)} 60%)` }} />
      <Img src={staticFile('icon.png')} style={{ width: 170, height: 170, borderRadius: 40, opacity: rise(frame, 0, 14) }} />
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 30, letterSpacing: 6, color: GOLD, opacity: rise(frame, 4) }}>{SERIES.toUpperCase()}</div>
      <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 96, color: C.text, textAlign: 'center', maxWidth: 1600, lineHeight: 1.08, opacity: rise(frame, 8, 18) }}>
        {title.split(' — ')[0]}
      </div>
      {sub ? <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 56, color: C.textMuted, opacity: rise(frame, 16, 18) }}>{sub}</div> : null}
    </AbsoluteFill>
  );
}

/** Scenes that put their own German on screen: no caption on top. */
export const SHOWS_GERMAN = new Set(['outro', 'sign']);

/** German already on screen in a shot, so the caption does not repeat it. */
export function shownGerman(questions: string[], screen: string[], key: string | null): string[] {
  const out: string[] = [];
  for (const id of questions) {
    const q = question(id);
    out.push(norm(q.prompt.de), ...q.options.map((o) => norm(o.de)));
  }
  if (key === 'term') out.push(...screen.map((l) => norm(l.split(' | ')[0])));
  return out;
}

export function shotFor(key: string | null, topic: string, title: string, questions: string[]): React.ReactNode | null {
  void topic;
  void questions;
  const scenes: Record<string, () => React.ReactNode> = {
    title: () => <Title title={title} />,
    question: () => <Question />,
    traffic: () => <Traffic />,
    sign: () => <Signs />,
    manoeuvre: () => <ManoeuvreScene />,
    term: () => <Term />,
    list: () => <List />,
    stat: () => <Stat />,
    fact: () => <Fact />,
    quote: () => <Quote />,
    words: () => <Words />,
    outro: () => <Outro />,
    end: () => <End />,
  };
  return key && scenes[key] ? <KitProvider kit={domKit}>{scenes[key]()}</KitProvider> : null;
}

export { motionFrames };
