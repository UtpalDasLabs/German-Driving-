import { q, t } from './_q.mjs';

/**
 * Fahrtüchtigkeit: alcohol, cannabis, medicines, tiredness and eyesight.
 * StVG §§ 24a, 24c; StGB §§ 315c, 316. Cannabis limits as amended in 2024.
 */
export default [
  q('fi01', {
    pts: 5, sec: '2.2', basic: false,
    de: 'Wie viel Alkohol dürfen Sie in der Probezeit oder unter 21 Jahren im Blut haben, wenn Sie fahren?',
    en: 'How much alcohol may you have in your blood when driving during your probation period or under 21?',
    kind: 'number', num: 0, unit: '‰',
    why: t(
      'In der Probezeit und vor dem 21. Geburtstag gilt ein absolutes Alkoholverbot (§ 24c StVG): 0,0 Promille, auch kein „kleines Bier“. Ein Verstoß ist ein schwerer Probezeit-Verstoß mit Aufbauseminar und Verlängerung der Probezeit.',
      'During probation and before your 21st birthday there is an absolute alcohol ban (§ 24c StVG): 0.0 per mille, not even one small beer. Breaking it is a serious probation offence with a course and a longer probation period.',
    ),
    tip: t('Neu am Steuer: null Komma null.', 'New driver: zero point zero.'),
    scene: null,
  }),
  q('fi02', {
    pts: 5, sec: '2.2', basic: false,
    de: 'Ab welcher Blutalkoholkonzentration begehen Sie eine Ordnungswidrigkeit – auch ohne Ausfallerscheinungen?',
    en: 'From what blood alcohol level do you commit an offence, even with no signs of impairment?',
    opts: [t('0,5 ‰', '0.5 ‰'), t('0,8 ‰', '0.8 ‰'), t('1,1 ‰', '1.1 ‰')],
    ok: [0],
    why: t(
      'Ab 0,5 ‰ ist es eine Ordnungswidrigkeit (Bußgeld, Punkte, Fahrverbot). Schon ab 0,3 ‰ ist es eine Straftat, wenn Fahrfehler oder Ausfallerscheinungen dazukommen. Ab 1,1 ‰ gilt man als absolut fahruntüchtig – immer eine Straftat.',
      'From 0.5 ‰ it is an administrative offence (fine, points, driving ban). From 0.3 ‰ it is already a crime if driving errors or impairment show. From 1.1 ‰ you are deemed absolutely unfit to drive - always a crime.',
    ),
    tip: t('0,3 mit Fehler – 0,5 immer – 1,1 Straftat.', '0.3 with errors - 0.5 always - 1.1 crime.'),
    scene: null,
  }),
  q('fi03', {
    pts: 4, sec: '2.2', basic: false,
    de: 'Wie schnell baut der Körper Alkohol ungefähr ab?',
    en: 'Roughly how fast does the body break down alcohol?',
    opts: [
      t('Etwa 0,1 Promille pro Stunde', 'About 0.1 per mille per hour'),
      t('Schneller mit starkem Kaffee', 'Faster with strong coffee'),
      t('Schneller mit kalter Dusche und frischer Luft', 'Faster with a cold shower and fresh air'),
    ],
    ok: [0],
    why: t(
      'Die Leber baut etwa 0,1 ‰ pro Stunde ab, mehr nicht. Kaffee, Duschen oder Bewegung ändern daran nichts. Nach einer langen Nacht können Sie am Morgen noch Restalkohol haben.',
      'The liver clears about 0.1 ‰ an hour, no faster. Coffee, showers or exercise change nothing. After a big night you can still be over the limit the next morning.',
    ),
    tip: null,
    scene: null,
  }),
  q('fi04', {
    pts: 5, sec: '2.2', basic: false,
    de: 'Was gilt seit 2024 für Cannabis am Steuer?',
    en: 'What has applied to cannabis and driving since 2024?',
    opts: [
      t('Ab 3,5 ng/ml THC im Blutserum ist es eine Ordnungswidrigkeit', 'From 3.5 ng/ml THC in blood serum it is an offence'),
      t('In der Probezeit und unter 21 Jahren ist jedes THC verboten', 'During probation and under 21, any THC is forbidden'),
      t('Cannabis zusammen mit Alkohol ist erlaubt, wenn beides unter dem Grenzwert liegt', 'Cannabis with alcohol is fine if both are under the limit'),
    ],
    ok: [0, 1],
    why: t(
      'Seit August 2024 liegt der THC-Grenzwert bei 3,5 ng/ml Blutserum (§ 24a StVG). Fahranfänger in der Probezeit und unter 21-Jährige dürfen gar nicht unter Cannabiseinfluss fahren. Wer Cannabis und Alkohol mischt, für den gilt 0,0 ‰.',
      'Since August 2024 the THC limit is 3.5 ng/ml in blood serum (§ 24a StVG). Drivers on probation and under 21 may not drive under the influence of cannabis at all. Anyone combining cannabis and alcohol must be at 0.0 ‰.',
    ),
    tip: null,
    scene: null,
  }),
  q('fi05', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Sie nehmen ein Medikament. Was tun Sie, bevor Sie fahren?',
    en: 'You are taking medication. What do you do before driving?',
    opts: [
      t('Den Beipackzettel lesen und im Zweifel den Arzt oder die Apotheke fragen', 'Read the leaflet and, when in doubt, ask a doctor or pharmacist'),
      t('Nichts – rezeptfreie Mittel sind immer unbedenklich', 'Nothing - over-the-counter medicines are always fine'),
      t('Mit etwas Alkohol die Wirkung abschwächen', 'Take a little alcohol to dampen the effect'),
    ],
    ok: [0],
    why: t(
      'Viele Medikamente – auch rezeptfreie gegen Erkältung oder Allergie – machen müde oder verlangsamen die Reaktion. Mit Alkohol verstärkt sich die Wirkung oft erheblich.',
      'Many medicines, including over-the-counter cold and allergy remedies, cause drowsiness or slow your reactions. With alcohol, the effect is often much stronger.',
    ),
    tip: null,
    scene: null,
  }),
  q('fi06', {
    pts: 3, sec: '2.2', basic: false,
    de: 'In Ihrem Führerschein steht die Schlüsselzahl 01 (Sehhilfe). Was bedeutet das?',
    en: 'Your licence carries code 01 (vision correction). What does that mean?',
    opts: [
      t('Ich muss beim Fahren eine Brille oder Kontaktlinsen tragen', 'I must wear glasses or contact lenses when driving'),
      t('Ich darf nur tagsüber fahren', 'I may only drive in daylight'),
      t('Ich muss eine Ersatzbrille immer dabeihaben', 'I must always carry spare glasses'),
    ],
    ok: [0],
    why: t(
      'Eine Auflage zur Sehhilfe gilt bei jeder Fahrt. Ohne Brille oder Kontaktlinsen zu fahren gilt als Fahren ohne die Auflage – mit Bußgeld, und im Schadensfall drohen Probleme mit der Versicherung.',
      'A vision-correction condition applies on every journey. Driving without glasses or contacts breaches the condition - a fine, and trouble with your insurer after an accident.',
    ),
    tip: null,
    scene: null,
  }),
  q('fi07', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Woran erkennen Sie, dass Sie zu müde zum Fahren sind?',
    en: 'How do you notice that you are too tired to drive?',
    opts: [
      t('Häufiges Gähnen und schwere Augenlider', 'Frequent yawning and heavy eyelids'),
      t('Ich kann mich an die letzten Kilometer nicht erinnern', 'I cannot remember the last few kilometres'),
      t('Ich bin besonders aufmerksam', 'I feel especially alert'),
    ],
    ok: [0, 1],
    why: t(
      'Gähnen, brennende Augen, Frösteln, Gedächtnislücken, ein Abkommen von der Spur – das sind Warnzeichen. Spätestens dann gehört eine Pause her.',
      'Yawning, burning eyes, shivering, gaps in memory, drifting in the lane - these are warning signs. At the latest then, stop for a break.',
    ),
    tip: null,
    scene: null,
  }),
  q('fi08', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Sie sind nach einem Streit sehr wütend. Wie wirkt sich das auf das Fahren aus?',
    en: 'You are very angry after an argument. How does that affect your driving?',
    opts: [
      t('Ich fahre leicht riskanter und aggressiver', 'I tend to drive more riskily and aggressively'),
      t('Ich nehme Gefahren schlechter wahr', 'I notice hazards less well'),
      t('Gar nicht', 'Not at all'),
    ],
    ok: [0, 1],
    why: t(
      'Starke Gefühle – Ärger, Trauer, Freude – lenken ab und verleiten zu Risiken. Erst durchatmen, dann losfahren.',
      'Strong emotions - anger, grief, even joy - distract you and tempt you into risks. Calm down first, then set off.',
    ),
    tip: null,
    scene: null,
  }),
];
