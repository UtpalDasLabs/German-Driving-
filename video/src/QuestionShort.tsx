import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

import { KitProvider, domKit } from '../../src/art/kit';
import { SceneArt } from '../../src/art/scene';
import { SignArt } from '../../src/art/signs';
import { Countdown, OptionCard, Overline, type CardState } from './components';
import { alpha, C, CHANNEL, FONT, GOLD, SAFE } from './lib/brand';
import { load, sign } from './lib/data';
import { motionOf, posesAt } from './lib/motion';
import { formatNumber } from './lib/script.mjs';
import { timeline } from './lib/timeline';

export type QuestionShortProps = {
  id: string;
  /** Shade the areas the platforms cover with their own UI. Review aid only. */
  showSafeArea?: boolean;
  /** Measured narration length per beat; omitted for silent renders. */
  beatSeconds?: Record<string, number>;
};

const LETTERS = ['A', 'B', 'C', 'D'] as const;

const TOPIC_DE: Record<string, string> = {
  priority: 'Vorfahrt',
  signals: 'Ampel & Polizei',
  signs: 'Verkehrszeichen',
  basics: 'Grundregeln',
  speed: 'Geschwindigkeit',
  overtaking: 'Überholen',
  turning: 'Abbiegen',
  people: 'Fußgänger & Radfahrer',
  rail: 'Bahn & Bus',
  parking: 'Halten & Parken',
  motorway: 'Autobahn',
  hazards: 'Gefahrenlehre',
  fitness: 'Fahrtüchtigkeit',
  vehicle: 'Technik',
  eco: 'Umwelt',
  law: 'Recht & Pflichten',
};

/**
 * One theory question as a vertical short.
 *
 * The screen is built once and stays put: the situation at the top, the
 * question and options under it, and a panel that changes with the beat.
 * At the reveal the cars in the drawing actually drive, in the order the rules
 * give them - which is the explanation, before a word of it is said.
 */
export function QuestionShort({ id, showSafeArea = false, beatSeconds }: QuestionShortProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { q, script } = load(id);
  const tl = timeline(script, fps, beatSeconds);

  const enter = (name: string, delayFrames = 0) =>
    spring({ frame: frame - tl.start(name) - delayFrames, fps, config: { damping: 200 }, durationInFrames: 14 });
  const reached = (name: string) => frame >= tl.start(name);
  const current = tl.beats.find((b) => frame >= b.from && frame < b.from + b.frames) ?? tl.beats[tl.beats.length - 1];

  const revealed = reached('reveal');
  const explaining = reached('why');
  const moving = motionOf(q) != null;
  const poses = revealed && moving ? posesAt(q, frame - tl.start('reveal')) : undefined;

  const stateOf = (i: number): CardState => (!revealed ? 'idle' : q.correct.includes(i) ? 'correct' : 'dim');
  const longest = Math.max(0, ...q.options.map((o) => o.en.length));
  const optionSize = longest > 60 ? 32 : longest > 34 ? 36 : 42;
  const promptSize = q.prompt.en.length > 110 ? 44 : q.prompt.en.length > 70 ? 50 : 56;
  const visual = script.visual === 'scene' ? (q.options.length > 2 ? 660 : 720) : 0;

  // The hook banner sits over the drawing for the opening line, then makes room.
  const hookOut = 1 - enter('question');
  const endIn = enter('end');
  const multi = q.kind === 'choice' && q.correct.length > 1;
  const askFor = q.kind === 'number' ? 'Your number?' : q.options.length > 3 ? 'A, B, C or D?' : q.options.length > 2 ? 'A, B or C?' : 'A or B?';
  const pill = `${multi ? 'More than one? ' : ''}${askFor} Comment 👇`;

  return (
    <KitProvider kit={domKit}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(1300px 900px at 50% -10%, ${alpha(GOLD, 0.12)}, transparent 65%), ${C.bg}`,
          fontFamily: FONT,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: SAFE.top,
            bottom: SAFE.bottom,
            left: SAFE.side,
            right: SAFE.side,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          {/* header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <Img src={staticFile('icon.png')} style={{ width: 58, height: 58, borderRadius: 14 }} />
            <div style={{ flex: 1, fontWeight: 700, fontSize: 28, color: C.textMuted }}>{CHANNEL}</div>
            <div
              style={{
                padding: '10px 22px',
                borderRadius: 999,
                backgroundColor: alpha(q.points === 5 ? C.danger : GOLD, 0.16),
                color: q.points === 5 ? C.danger : GOLD,
                fontWeight: 800,
                fontSize: 28,
              }}
            >
              {TOPIC_DE[q.topic] ?? q.topic} · {q.points} Punkte
            </div>
          </div>

          {/* the situation */}
          {script.visual === 'scene' && q.scene ? (
            <div style={{ position: 'relative', alignSelf: 'center' }}>
              <div style={{ borderRadius: 32, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.45)' }}>
                <SceneArt scene={q.scene} size={visual} poses={poses} arrows={!(revealed && moving)} />
              </div>
              {current.name === 'countdown' ? (
                <>
                  <div style={{ position: 'absolute', right: -40, top: -40 }}>
                    <Panel beat="countdown" script={script} enter={enter} frame={frame - current.from} frames={current.frames} fps={fps} />
                  </div>
                  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 24, display: 'flex', justifyContent: 'center' }}>
                    <CommentPill text={pill} enter={enter('countdown')} />
                  </div>
                </>
              ) : null}
            </div>
          ) : null}
          {script.visual !== 'scene' && current.name === 'countdown' ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CommentPill text={pill} enter={enter('countdown')} />
            </div>
          ) : null}
          {script.visual === 'signs' ? (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 34 }}>
              {q.signs.map((s) => (
                <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                  <SignArt id={s} size={q.signs.length > 2 ? 230 : 300} />
                  <div style={{ fontWeight: 700, fontSize: 26, color: C.textFaint, opacity: enter('reveal') }}>
                    Zeichen {s} · {sign(s).name.de}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {/* question */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontWeight: 800, fontSize: promptSize, lineHeight: 1.2, color: C.text }}>{q.prompt.en}</div>
            <div style={{ fontWeight: 600, fontSize: 30, lineHeight: 1.3, color: C.textFaint }}>{q.prompt.de}</div>
          </div>

          {/* options, then the explanation in the same place */}
          <div style={{ position: 'relative', flex: 1 }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', gap: 14, opacity: 1 - enter('why') * 0.92 }}>
              {q.kind === 'choice' ? (
                q.options.map((o, i) => (
                  <OptionCard
                    key={i}
                    letter={LETTERS[i]}
                    main={o.en}
                    sub={o.de}
                    state={stateOf(i)}
                    enter={enter(`option${LETTERS[i]}`)}
                    fontSize={optionSize}
                  />
                ))
              ) : (
                <NumberBox value={revealed ? formatNumber(q.answerNumber ?? 0) : '?'} unit={q.unit} correct={revealed} enter={enter('number')} />
              )}
            </div>
            {explaining ? (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <Panel beat={current.name} script={script} enter={enter} />
              </div>
            ) : script.visual !== 'scene' && current.name === 'countdown' ? (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center' }}>
                <Panel beat={current.name} script={script} enter={enter} frame={frame - current.from} frames={current.frames} fps={fps} />
              </div>
            ) : null}
          </div>
        </div>

        {/* hook banner: the challenge, over the drawing, from frame one */}
        {hookOut > 0.01 ? (
          <div
            style={{
              position: 'absolute',
              bottom: SAFE.bottom + 120,
              left: SAFE.side,
              right: SAFE.side,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
              opacity: hookOut,
              transform: `scale(${interpolate(enter('hook'), [0, 1], [0.9, 1])})`,
            }}
          >
            <div
              style={{
                padding: '22px 40px',
                borderRadius: 30,
                backgroundColor: q.points === 5 ? C.danger : GOLD,
                color: q.points === 5 ? '#fff' : '#111',
                fontWeight: 900,
                fontSize: 66,
                lineHeight: 1.05,
                textAlign: 'center',
                boxShadow: '0 18px 50px rgba(0,0,0,0.5)',
              }}
            >
              {q.points === 5 ? '5-point question' : 'German driving test'}
              <div style={{ fontSize: 50, fontWeight: 800, marginTop: 6 }}>Would you pass?</div>
            </div>
          </div>
        ) : null}

        {/* closing card */}
        {endIn > 0.01 ? (
          <AbsoluteFill style={{ backgroundColor: C.bg, opacity: endIn, alignItems: 'center', justifyContent: 'center', gap: 26 }}>
            <Img src={staticFile('icon.png')} style={{ width: 200, height: 200, borderRadius: 46 }} />
            <div style={{ fontWeight: 800, fontSize: 76, color: C.text }}>Führerschein-Trainer</div>
            <div style={{ fontWeight: 600, fontSize: 42, color: C.textMuted, textAlign: 'center', lineHeight: 1.35 }}>
              Theory · practical · licence conversion
              <br />
              13 languages · free · no account
            </div>
            <div
              style={{
                marginTop: 18,
                padding: '20px 40px',
                borderRadius: 999,
                backgroundColor: C.accent,
                color: C.onAccent,
                fontWeight: 800,
                fontSize: 40,
              }}
            >
              Link in profile
            </div>
            <div style={{ marginTop: 30, fontWeight: 700, fontSize: 32, color: C.textMuted, textAlign: 'center', lineHeight: 1.4 }}>
              Full lessons on YouTube
              <br />
              <span style={{ color: C.text }}>{CHANNEL}</span>
            </div>
            <div style={{ marginTop: 10, fontWeight: 800, fontSize: 40, color: GOLD }}>Follow for more</div>
          </AbsoluteFill>
        ) : null}

        {showSafeArea ? <SafeAreaOverlay /> : null}
      </AbsoluteFill>
    </KitProvider>
  );
}

function NumberBox({ value, unit, correct, enter }: { value: string; unit: string | null; correct: boolean; enter: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 26, opacity: enter }}>
      <div
        style={{
          minWidth: 300,
          padding: '20px 40px',
          borderRadius: 28,
          border: `4px solid ${correct ? C.success : C.borderStrong}`,
          backgroundColor: correct ? C.successBg : C.surface,
          color: correct ? C.success : C.text,
          fontWeight: 800,
          fontSize: 96,
          textAlign: 'center',
        }}
      >
        {value}
      </div>
      {unit ? <div style={{ fontWeight: 800, fontSize: 72, color: C.textMuted }}>{unit}</div> : null}
    </div>
  );
}

function Panel({
  beat,
  script,
  enter,
  frame = 0,
  frames = 1,
  fps = 30,
}: {
  beat: string;
  script: ReturnType<typeof load>['script'];
  enter: (name: string, delay?: number) => number;
  frame?: number;
  frames?: number;
  fps?: number;
}) {
  if (beat === 'countdown') {
    const left = Math.max(1, Math.ceil((frames - frame) / fps));
    return <Countdown progress={Math.min(1, frame / frames)} secondsLeft={Math.min(3, left)} />;
  }
  if (beat === 'why' || beat === 'tip' || beat === 'end') {
    const why = script.beats.find((x) => x.name === 'why');
    const tip = script.beats.find((x) => x.name === 'tip');
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          padding: '26px 30px',
          borderRadius: 30,
          backgroundColor: C.surface,
          border: `3px solid ${C.border}`,
          opacity: enter('why'),
        }}
      >
        <Overline color={C.info}>Why</Overline>
        <div style={{ fontWeight: 600, fontSize: 34, lineHeight: 1.34, color: C.text }}>
          {why?.say.map((s, i) =>
            s.lang === 'de' ? (
              <span key={i} style={{ color: GOLD, fontWeight: 800 }}>
                {s.text}
              </span>
            ) : (
              <React.Fragment key={i}>{s.text}</React.Fragment>
            ),
          )}
        </div>
        {tip ? (
          <div
            style={{
              opacity: enter('tip'),
              padding: '18px 24px',
              borderRadius: 20,
              backgroundColor: alpha(GOLD, 0.14),
              color: GOLD,
              fontWeight: 800,
              fontSize: 31,
              lineHeight: 1.3,
            }}
          >
            💡 {tip.say.slice(1).map((s) => s.text).join('')}
          </div>
        ) : null}
      </div>
    );
  }
  return null;
}

/** Shades what the platforms' own interface covers. Never in a real render. */
function SafeAreaOverlay() {
  const shade = 'rgba(255, 60, 60, 0.28)';
  const label = { fontFamily: FONT, fontWeight: 800, fontSize: 28, color: '#fff', padding: 16 };
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: SAFE.top, background: shade }}>
        <div style={label}>Platform tabs and search</div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: SAFE.bottom, background: shade }}>
        <div style={label}>Caption, username, music</div>
      </div>
    </AbsoluteFill>
  );
}

/** "A, B or C? Comment 👇" during the countdown: comments are what the platforms reward. */
function CommentPill({ text, enter }: { text: string; enter: number }) {
  return (
    <div
      style={{
        padding: '18px 34px',
        borderRadius: 999,
        backgroundColor: GOLD,
        color: '#111',
        fontWeight: 900,
        fontSize: 46,
        boxShadow: '0 14px 40px rgba(0,0,0,0.5)',
        opacity: enter,
        transform: `scale(${0.9 + 0.1 * enter})`,
      }}
    >
      {text}
    </div>
  );
}
