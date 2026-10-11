# Notes for Claude

## Voice (ElevenLabs)

- **Use the creator's Professional Voice Clone for everything voiced from now on:
  `Rr3HT8xllxaRdjMZxGBa`.** It is the default in `video/scripts/voice-longform.mjs`
  and `video/scripts/voice-elevenlabs.mjs`; don't switch back.
- The earlier instant clone, `vFeVIow1bgkn4mgnqNwD`, narrated the 14 long-form
  driving lessons (October 2026). That narration stays; `render-longform.mjs`
  falls back to it when a lesson has no take in the current voice. Re-voice a
  lesson only when the creator asks.
- Model: Eleven v4 (`eleven_v4`), stability 0.5, delivery tags such as
  `[curious]`, `[warm]`, `[firm]`. Calm and entertaining, never shouty: no
  `[excited]` calls to action ("comment your answer!" was rejected as too loud).
- Never spend credits without being asked. Check the cost first with
  `--dry` (long-form) or `npm run narration` (shorts).
- The clean narration belongs in the private repo
  `UtpalDasLabs/German-Citizenship-Videos` (`narration/driving-<lesson>/`), never
  in this public one.

## Language and tone

- Gender-neutral in every language; "they" for people in English.
- Lesson scripts follow the citizenship series' voice: see
  `video/longform/SERIES.md`.

## Git

- Work on the session's designated branch; open a PR only when asked.
