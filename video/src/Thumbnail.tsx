import React from 'react';
import { AbsoluteFill } from 'remotion';

import { KitProvider, domKit } from '../../src/art/kit';
import { ManoeuvreArt, type Manoeuvre } from '../../src/art/manoeuvres';
import { SceneArt } from '../../src/art/scene';
import { SignArt } from '../../src/art/signs';
import { alpha, C, FONT, GOLD } from './lib/brand';
import { question } from './lib/data';

/**
 * A lesson's YouTube thumbnail, 1280x720, in the citizenship series' look:
 * German-flag stripe, gold kicker, the German headline, the English subtitle
 * and a pill, with one of the app's own drawings where that series has its map.
 * The text and the drawing come from the script's front matter (`thumb:`);
 * scripts/thumbnails.mjs renders one per lesson.
 */
export type ThumbnailProps = {
  lesson: number;
  de: string;
  en: string;
  /** "scene:pr03", "signs:205,306", "manoeuvre:parallel" or "text:0,0 ‰". */
  art: string;
  pill: string;
};

const BLUE = '#2BB0F0';

function Art({ art }: { art: string }) {
  const [kind, value = ''] = art.split(/:(.*)/s);
  if (kind === 'scene') return <SceneArt scene={question(value).scene!} size={500} />;
  if (kind === 'manoeuvre') return <ManoeuvreArt name={value as Manoeuvre['key']} size={520} />;
  if (kind === 'signs') {
    const ids = value.split(',');
    const size = ids.length === 1 ? 400 : ids.length === 2 ? 260 : 210;
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, justifyContent: 'center', alignItems: 'center', width: 540 }}>
        {ids.map((id) => (
          <SignArt key={id} id={id} size={size} />
        ))}
      </div>
    );
  }
  // Inter ExtraBold averages about 0.6 em per character: fit the words to the art column.
  const size = Math.min(170, Math.floor(540 / (value.length * 0.6)));
  return (
    <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: size, color: GOLD, letterSpacing: -4, whiteSpace: 'nowrap' }}>{value}</div>
  );
}

export function Thumbnail({ lesson, de, en, art, pill }: ThumbnailProps) {
  // German has long single words ("Grundfahraufgaben"), which cannot wrap: size
  // the headline so its longest word fits the 600px text column.
  const longest = Math.max(...de.split(/\s+/).map((w) => w.length));
  const headline = Math.min(112, Math.floor(600 / (longest * 0.6)));
  return (
    <AbsoluteFill style={{ backgroundColor: '#131720', fontFamily: FONT }}>
      <AbsoluteFill
        style={{ background: `radial-gradient(ellipse 520px 420px at 960px 360px, ${alpha(BLUE, 0.16)}, transparent 70%)` }}
      />
      {/* The flag stripe, as on the citizenship thumbnails. */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 18, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, background: '#0B0D10' }} />
        <div style={{ flex: 1, background: '#FF4F4F' }} />
        <div style={{ flex: 1, background: '#FFC63D' }} />
      </div>
      <div style={{ position: 'absolute', right: 30, top: 0, bottom: 0, width: 560, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <KitProvider kit={domKit}>
          <Art art={art} />
        </KitProvider>
      </div>
      <div style={{ position: 'absolute', left: 70, top: 70, width: 610, display: 'flex', flexDirection: 'column', height: 580 }}>
        <div style={{ fontWeight: 800, fontSize: 30, letterSpacing: 6, color: GOLD, textTransform: 'uppercase' }}>
          Führerschein · Lektion {lesson}
        </div>
        <div style={{ fontWeight: 800, fontSize: headline, lineHeight: 1.0, color: C.text, marginTop: 34, letterSpacing: -2 }}>
          {de}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ fontWeight: 600, fontSize: 38, lineHeight: 1.2, color: '#A3AFC2', marginBottom: 26 }}>{en}</div>
        <div
          style={{
            alignSelf: 'flex-start',
            background: BLUE,
            color: '#0B0D10',
            fontWeight: 800,
            fontSize: 32,
            padding: '12px 26px',
            borderRadius: 40,
            letterSpacing: 1,
            whiteSpace: 'nowrap',
          }}
        >
          {pill}
        </div>
      </div>
    </AbsoluteFill>
  );
}
