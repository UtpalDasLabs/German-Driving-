import React from 'react';
import { Composition } from 'remotion';

import './lib/fonts';
import { FPS, HEIGHT, WIDTH } from './lib/brand';
import { load } from './lib/data';
import { motionFrames, motionOf } from './lib/motion';
import { timeline } from './lib/timeline';
import { LongForm, type LongFormProps } from './longform/LongForm';
import { QuestionShort, type QuestionShortProps } from './QuestionShort';
import { Thumbnail, type ThumbnailProps } from './Thumbnail';

const EMPTY_PLAN: LongFormProps['plan'] = {
  topic: '',
  title: '',
  questions: [],
  fps: FPS,
  total: FPS,
  shots: [],
  lively: false,
  music: null,
};

export function Root() {
  return (
    <>
      {/*
        One composition for every question: pick it with `id`. Its length comes
        from the script, so a question with four options, a tip or narration
        simply runs longer.
      */}
      <Composition
        id="QuestionShort"
        component={QuestionShort}
        width={WIDTH}
        height={HEIGHT}
        fps={FPS}
        durationInFrames={1}
        defaultProps={{ id: 'pr03', showSafeArea: false } satisfies QuestionShortProps}
        calculateMetadata={({ props }) => {
          const { q, script } = load(props.id);
          const tl = timeline(script, FPS, props.beatSeconds);
          // Leave the cars time to finish driving before the end card.
          const drive = motionFrames(motionOf(q));
          const reveal = tl.start('reveal');
          const end = tl.start('end');
          return { durationInFrames: tl.total + Math.max(0, reveal + drive - end) };
        }}
      />
      {/* A long-form lesson, 16:9. Its timed plan comes from scripts/render-longform.mjs. */}
      <Composition
        id="LongForm"
        component={LongForm}
        width={1920}
        height={1080}
        fps={FPS}
        durationInFrames={FPS}
        defaultProps={{ plan: EMPTY_PLAN } satisfies LongFormProps}
        calculateMetadata={({ props }) => ({ durationInFrames: Math.max(1, props.plan.total) })}
      />
      {/* A lesson's YouTube thumbnail; scripts/thumbnails.mjs renders one per script. */}
      <Composition
        id="Thumbnail"
        component={Thumbnail}
        width={1280}
        height={720}
        fps={FPS}
        durationInFrames={1}
        defaultProps={{ lesson: 1, de: 'Vorfahrt', en: 'Right of Way', art: 'scene:pr03', pill: '20 FRAGEN' } satisfies ThumbnailProps}
      />
    </>
  );
}
