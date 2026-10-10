# Videos

Two formats for the driving series on the channel, both rendered with
[Remotion](https://www.remotion.dev/) from the app's own data and drawings:

- **Long-form lessons** (16:9), one per topic, written as scripts in
  `longform/` and narrated with the creator's cloned voice. The plan is in
  [`longform/SERIES.md`](longform/SERIES.md).
- **Shorts** (9:16), one per practice question, generated entirely from
  `../src/data/questions.json`.

Nothing is drawn by hand per video. Traffic scenes, signs and manoeuvres come
from `../src/art/` - the same code the app renders with react-native-svg,
rendered here through plain DOM SVG (`src/art/kit.tsx` swaps the primitives).

## Commands

Run these from `video/`.

```sh
npm install

npm run render -- pr03 sg06            # shorts for some questions
npm run render -- priority             # every question of a topic
npm run render -- pr03 --stills        # one PNG per beat, to review a layout
npm run render -- pr03 --safe          # shade what the platforms' UI covers
npm run narration -- pr03              # the voice script for a short, no requests
npm run voice -- pr03                  # narrate a short with ElevenLabs (cached per beat)

npm run check:quiz -- priority         # every question works as a quiz moment
npm run coverage                       # which questions the lessons explain
npm run render:longform -- priority --silent --stills   # one still per shot
npm run voice:longform -- priority --expressive --dry   # voice cost, in characters
npm run voice:longform -- priority --expressive         # narrate (cached per paragraph)
npm run render:longform -- priority --lively --expressive  # the finished lesson
npm run studio                         # preview and scrub in the browser
npm run typecheck
```

Output goes to `out/` (git-ignored).

## How the cars know who goes first

A question's `motion` (in `../data-source/questions/*.mjs`) lists the actors
in the order they drive, in groups that move together: `[[1], [2], [0]]` is
"car 1, then car 2, then you". An "in which order" question needs none: its
correct answer ("2, 3, 1") already says it. `src/lib/motion.ts` drives each
vehicle along its route from `../src/art/geometry.ts`, the same geometry that
draws the arrows in the app, so the animation can only follow the arrow.

## Voice

The creator's ElevenLabs clone (`vFeVIow1bgkn4mgnqNwD`), as in the citizenship
series, on Eleven v4 with `--expressive`. The key comes from
`ELEVENLABS_API_KEY` only. Audio is cached by voice, model, settings and exact
text, so editing one sentence re-voices one paragraph. Keep the clean
narration out of any public repository: copy it to the private videos
repository, as for the citizenship lessons.

Every video discloses the AI voice in its end card and description.
