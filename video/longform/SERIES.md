# The driving series

The German driving test, as a playlist on the same channel as the citizenship
lessons. Fourteen long-form lessons, 16:9, in the same documentary tone and
the same cloned voice, plus one vertical short per practice question.

Every picture is drawn by the app's own code (`src/art/` in the app): the
traffic scenes, the road signs and the manoeuvres. A correction to a question
reaches the app, the shorts and the lessons together.

## Lessons

Theory lessons follow the app's topics and explain every practice question
once (`npm run coverage` checks it). The practical-test and conversion lessons
carry no exam questions.

| # | Lesson | Questions | Script |
|---|--------|-----------|--------|
| 1 | Right of Way | 20 | `priority.md` (draft 1) |
| 2 | Lights, Police & Blue Lights | 15 | `signals.md` |
| 3 | Road Signs, part 1: warning & priority | 16 | `signs-1.md` |
| 4 | Road Signs, part 2: bans, orders & markings | 16 | `signs-2.md` |
| 5 | Ground Rules & Overtaking | 20 | `rules.md` (basics + overtaking) |
| 6 | Speed & Stopping Distances | 20 | `speed.md` |
| 7 | Turning, Reversing & Parking | 22 | `turning.md` (turning + parking) |
| 8 | Pedestrians, Cyclists, Trains & Buses | 20 | `people.md` (people + rail) |
| 9 | Motorway & Hazards | 26 | `motorway.md` (motorway + hazards) |
| 10 | Alcohol, Fatigue & the Law | 20 | `law.md` (fitness + law) |
| 11 | Your Car & the Environment | 25 | `car.md` (vehicle + eco) |
| 12 | The Practical Test, Step by Step | – | `practical-test.md` |
| 13 | The Five Manoeuvres | – | `manoeuvres.md` |
| 14 | Converting a Foreign Licence | – | `conversion.md` |

Upload them interleaved with the citizenship lessons, or as their own
"Führerschein" playlist; the descriptions say which app to download.

## Shorts

`npm run render -- <id|topic|all>` renders one 9:16 short per practice
question: the drawn situation, the question in English with the German under
it, a countdown, and at the reveal the cars drive in the order the rules give
them. 220 questions, so 220 shorts; right of way first.

## Tone

The same as the citizenship series (see that repository's SERIES.md): a
documentary storyteller, `[dramatic]` on every paragraph for Eleven v4, no
hype lines, no punchline paragraphs.

- Read the question in English. Do not read the options: they are on screen,
  and a read-out option is ruled out by ear before the countdown.
- Every question ends in a `[countdown]` paragraph that opens with the answer
  as it is written on the card (`npm run check:quiz -- <topic>` enforces it).
- German appears where it helps on the road and on test day: sign names, the
  three-word rules ("rechts vor links"), what the examiner says. Mark it
  `[[like this]]` so it is spoken in German and captioned.
- These are the app's own practice questions, not the official catalogue's.
  Never say "this is an official question"; say "a question like this".

## Making one lesson

1. **Write** `longform/<topic>.md` (format at the top of `priority.md`). List
   every question in the front matter and give each a `{Q<id>}` anchor on a
   `question` scene.
2. `npm run coverage` and `npm run check:quiz -- <topic>`.
3. `npm run render:longform -- <topic> --silent --stills`: one still per shot,
   before paying for the voice.
4. `npm run voice:longform -- <topic> --expressive --dry` for the cost, then
   without `--dry`. Copy the new takes to the private repository straight
   away (`narration/driving-<topic>/`).
5. `npm run render:longform -- <topic> --lively --expressive`: the video and
   its YouTube description.

## Voice budget

About 400 characters per question explained: Right of Way is 8,253
characters for 20 questions. The whole theory series is roughly 75,000;
a short is about 500. Eleven v4 bills one credit per character.

## Every upload

- Title from the script's front matter; description from the render.
- The AI-voice disclosure stays in the end card and the description.
- Nothing implying official status: no TÜV or DEKRA branding, no "official
  questions", and the "not affiliated" line stays in the description.
