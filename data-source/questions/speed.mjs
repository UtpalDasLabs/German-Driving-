import { q, t } from './_q.mjs';

/**
 * Geschwindigkeit, Abstand und Anhalteweg. The stopping-distance rules of
 * thumb taught in every German driving school:
 *
 *   Reaktionsweg     = (v / 10) × 3          metres, for one second of reaction
 *   Bremsweg         = (v / 10) × (v / 10)   normal braking
 *   Gefahrbremsung   = Bremsweg / 2          emergency braking
 *   Anhalteweg       = Reaktionsweg + Bremsweg
 */

const rule = t(
  'Faustformeln: Reaktionsweg = (Geschwindigkeit ÷ 10) × 3. Bremsweg = (Geschwindigkeit ÷ 10) × (Geschwindigkeit ÷ 10). Bei einer Gefahrbremsung halbiert sich der Bremsweg. Anhalteweg = Reaktionsweg + Bremsweg.',
  'Rules of thumb: reaction distance = (speed ÷ 10) × 3. Braking distance = (speed ÷ 10) × (speed ÷ 10). In an emergency stop the braking distance halves. Stopping distance = reaction distance + braking distance.',
);

const withRule = (de, en) => t(`${de} ${rule[0]}`, `${en} ${rule[1]}`);

export default [
  q('sp01', {
    pts: 3, sec: '2.2', basic: false,
    de: 'Wie schnell darf ein Pkw außerhalb geschlossener Ortschaften höchstens fahren, wenn keine Schilder etwas anderes anordnen (keine Autobahn)?',
    en: 'What is the speed limit for a car outside built-up areas when no signs say otherwise (not on a motorway)?',
    kind: 'number', num: 100, unit: 'km/h',
    why: t(
      'Außerorts gilt für Pkw 100 km/h (§ 3 Abs. 3 StVO). Auf Autobahnen und Kraftfahrstraßen mit getrennten Fahrbahnen gibt es für Pkw kein allgemeines Limit, aber eine Richtgeschwindigkeit von 130 km/h.',
      'Outside built-up areas the limit for cars is 100 km/h (§ 3(3) StVO). Motorways have no general limit for cars but a recommended maximum of 130 km/h.',
    ),
    tip: t('Ort 50, Land 100, Autobahn empfohlen 130.', 'Town 50, country 100, motorway 130 recommended.'),
    scene: null,
  }),
  q('sp02', {
    pts: 3, sec: '2.2', basic: false,
    de: 'Was gilt auf der Autobahn, wenn kein Tempolimit angezeigt ist?',
    en: 'What applies on the motorway when no speed limit is shown?',
    opts: [
      t('Empfohlen sind höchstens 130 km/h', 'A maximum of 130 km/h is recommended'),
      t('130 km/h sind vorgeschrieben', '130 km/h is the legal limit'),
      t('Es gibt nichts zu beachten', 'There is nothing to bear in mind'),
    ],
    ok: [0],
    why: t(
      'Die Richtgeschwindigkeit von 130 km/h ist eine Empfehlung, kein Limit. Wer schneller fährt und in einen Unfall verwickelt wird, kann aber eine Mitschuld bekommen, auch wenn ihn sonst keine Schuld trifft.',
      'The 130 km/h is a recommendation, not a limit. But if you go faster and are involved in an accident, you can be held partly liable even if you were otherwise not at fault.',
    ),
    tip: null,
    scene: null,
  }),
  q('sp03', {
    pts: 3, sec: '2.2', basic: false,
    de: 'Wie schnell darf ein Pkw mit Anhänger außerorts und auf der Autobahn höchstens fahren (ohne besondere Zulassung)?',
    en: 'What is the top speed for a car towing a trailer outside towns and on the motorway (without special approval)?',
    kind: 'number', num: 80, unit: 'km/h',
    why: t(
      'Mit Anhänger gelten für Pkw außerorts und auf der Autobahn 80 km/h. Mit der „Tempo-100-Zulassung“ des Gespanns sind auf Autobahnen und Kraftfahrstraßen 100 km/h erlaubt.',
      'With a trailer, cars are limited to 80 km/h outside towns and on motorways. With a "Tempo 100" approval for the combination, 100 km/h is allowed on motorways and expressways.',
    ),
    tip: null,
    scene: null,
  }),
  q('sp04', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Nebel, Schnee oder Regen begrenzen die Sicht auf weniger als 50 m. Wie schnell dürfen Sie höchstens fahren?',
    en: 'Fog, snow or rain cut visibility to under 50 m. What is the most you may drive at?',
    kind: 'number', num: 50, unit: 'km/h',
    why: t(
      'Bei Sichtweiten unter 50 m durch Nebel, Schneefall oder Regen dürfen Sie nicht schneller als 50 km/h fahren, wenn nicht eine geringere Geschwindigkeit geboten ist (§ 3 Abs. 1 StVO). Die Leitpfosten stehen 50 m auseinander – daran können Sie die Sicht schätzen.',
      'With visibility under 50 m because of fog, snow or rain you may not exceed 50 km/h, and often must go slower (§ 3(1) StVO). The roadside marker posts stand 50 m apart, which helps you judge the distance.',
    ),
    tip: t('Sehe ich den nächsten Leitpfosten nicht: unter 50 km/h.', 'Cannot see the next marker post? Under 50 km/h.'),
    scene: { road: 'straight', actors: [{ kind: 'you', at: [55, 75], heading: 0 }, { kind: 'car', at: [55, 25], heading: 0 }], conditions: ['fog'] },
  }),
  q('sp05', {
    pts: 3, sec: '2.2', basic: false,
    de: 'Wie schnell dürfen Sie mit Schneeketten höchstens fahren?',
    en: 'What is the top speed with snow chains fitted?',
    kind: 'number', num: 50, unit: 'km/h',
    why: t(
      'Mit Schneeketten gilt höchstens 50 km/h, auch wo sonst mehr erlaubt wäre. Ketten nur auf geschlossener Schneedecke benutzen.',
      'With snow chains the limit is 50 km/h, even where more would otherwise be allowed. Use chains only on a continuous layer of snow.',
    ),
    tip: null,
    scene: null,
  }),
  q('sp06', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Wie schnell dürfen Sie fahren, wenn Sie nicht weit sehen können?',
    en: 'How fast may you drive when you cannot see far ahead?',
    opts: [
      t('So, dass ich innerhalb der Strecke anhalten kann, die ich übersehe', 'So that I can stop within the distance I can see'),
      t('Auf sehr schmalen Straßen so, dass ich innerhalb der Hälfte dieser Strecke anhalten kann', 'On very narrow roads, so that I can stop within half that distance'),
      t('So schnell, wie das Schild erlaubt', 'As fast as the sign allows'),
    ],
    ok: [0, 1],
    why: t(
      'Fahren auf Sicht (§ 3 Abs. 1 StVO): Sie müssen innerhalb der übersehbaren Strecke anhalten können. Ist die Straße so schmal, dass der Gegenverkehr gefährdet wäre, innerhalb der halben Strecke – denn er braucht ja auch Platz zum Bremsen.',
      'Driving within your sight (§ 3(1) StVO): you must be able to stop within the distance you can see. On a road so narrow that oncoming traffic would be at risk, within half of it - because the other driver needs room to stop too.',
    ),
    tip: null,
    scene: { road: 'curve', actors: [{ kind: 'you', at: [55, 82], heading: 0 }], conditions: ['night'] },
  }),
  q('sp07', {
    pts: 3, sec: '2.2', basic: false,
    de: 'Wie lang ist nach der Faustformel der Reaktionsweg bei 50 km/h?',
    en: 'By the rule of thumb, how long is the reaction distance at 50 km/h?',
    kind: 'number', num: 15, unit: 'm',
    why: withRule('50 ÷ 10 = 5, mal 3 = 15 m.', '50 ÷ 10 = 5, times 3 = 15 m.'),
    tip: null,
    scene: null,
  }),
  q('sp08', {
    pts: 3, sec: '2.2', basic: false,
    de: 'Wie lang ist nach der Faustformel der normale Bremsweg bei 50 km/h?',
    en: 'By the rule of thumb, how long is the normal braking distance at 50 km/h?',
    kind: 'number', num: 25, unit: 'm',
    why: withRule('50 ÷ 10 = 5, mal 5 = 25 m.', '50 ÷ 10 = 5, times 5 = 25 m.'),
    tip: null,
    scene: null,
  }),
  q('sp09', {
    pts: 4, sec: '2.2', basic: false,
    de: 'Wie lang ist nach der Faustformel der Anhalteweg bei 100 km/h (normale Bremsung)?',
    en: 'By the rule of thumb, how long is the stopping distance at 100 km/h (normal braking)?',
    kind: 'number', num: 130, unit: 'm',
    why: withRule('Reaktionsweg 10 × 3 = 30 m, Bremsweg 10 × 10 = 100 m, zusammen 130 m.', 'Reaction 10 × 3 = 30 m, braking 10 × 10 = 100 m, 130 m in total.'),
    tip: null,
    scene: null,
  }),
  q('sp10', {
    pts: 4, sec: '2.2', basic: false,
    de: 'Wie lang ist nach der Faustformel der Bremsweg bei einer Gefahrbremsung aus 100 km/h?',
    en: 'By the rule of thumb, how long is the braking distance in an emergency stop from 100 km/h?',
    kind: 'number', num: 50, unit: 'm',
    why: withRule('Normaler Bremsweg 10 × 10 = 100 m, bei Gefahrbremsung die Hälfte: 50 m.', 'Normal braking 10 × 10 = 100 m; an emergency stop halves it: 50 m.'),
    tip: null,
    scene: null,
  }),
  q('sp11', {
    pts: 4, sec: '2.2', basic: false,
    de: 'Wie lang ist nach der Faustformel der Anhalteweg bei 70 km/h (normale Bremsung)?',
    en: 'By the rule of thumb, how long is the stopping distance at 70 km/h (normal braking)?',
    kind: 'number', num: 70, unit: 'm',
    why: withRule('Reaktionsweg 7 × 3 = 21 m, Bremsweg 7 × 7 = 49 m, zusammen 70 m.', 'Reaction 7 × 3 = 21 m, braking 7 × 7 = 49 m, 70 m in total.'),
    tip: null,
    scene: null,
  }),
  q('sp12', {
    pts: 4, sec: '2.2', basic: false,
    de: 'Sie fahren doppelt so schnell. Was passiert mit Reaktionsweg und Bremsweg?',
    en: 'You drive twice as fast. What happens to the reaction and braking distances?',
    opts: [
      t('Der Reaktionsweg verdoppelt sich', 'The reaction distance doubles'),
      t('Der Bremsweg vervierfacht sich', 'The braking distance quadruples'),
      t('Der Bremsweg verdoppelt sich', 'The braking distance doubles'),
    ],
    ok: [0, 1],
    why: t(
      'Der Reaktionsweg wächst im gleichen Verhältnis wie die Geschwindigkeit, der Bremsweg mit ihrem Quadrat: doppelt so schnell heißt vierfacher Bremsweg.',
      'Reaction distance grows in step with speed; braking distance grows with its square. Twice as fast means four times the braking distance.',
    ),
    tip: t('Doppelt so schnell, viermal so lang bremsen.', 'Twice the speed, four times the braking.'),
    scene: null,
  }),
  q('sp13', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Sie fahren außerorts 80 km/h. Welchen Abstand in Metern sollten Sie zum Vorausfahrenden mindestens halten (Faustformel „halber Tacho“)?',
    en: 'You are driving at 80 km/h outside town. What gap in metres should you keep to the car in front, at least (rule of thumb "half the speedometer")?',
    kind: 'number', num: 40, unit: 'm',
    why: t(
      'Außerorts gilt als Faustformel „halber Tacho“: die Hälfte der Geschwindigkeit in Metern, also 40 m bei 80 km/h – das sind knapp zwei Sekunden. Weniger als drei Zehntel davon gilt als gefährlicher Abstand und wird geahndet.',
      'The outside-town rule is "half the speedometer": half your speed, in metres - 40 m at 80 km/h, just under two seconds. Less than three tenths of that counts as dangerous tailgating and is fined.',
    ),
    tip: t('Zwei Sekunden zählen: „einundzwanzig, zweiundzwanzig“.', 'Count two seconds: "twenty-one, twenty-two".'),
    scene: null,
  }),
  q('sp14', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Wodurch wird der Anhalteweg länger?',
    en: 'What makes the stopping distance longer?',
    opts: [
      t('Müdigkeit, weil die Reaktion später kommt', 'Tiredness, because the reaction comes later'),
      t('Nasse oder glatte Fahrbahn', 'A wet or slippery road'),
      t('Neue Reifen mit viel Profil', 'New tyres with deep tread'),
    ],
    ok: [0, 1],
    why: t(
      'Der Anhalteweg besteht aus Reaktionsweg und Bremsweg. Müdigkeit, Ablenkung, Alkohol verlängern den ersten; Nässe, Laub, Schnee, abgefahrene Reifen und Beladung den zweiten.',
      'Stopping distance is reaction plus braking. Tiredness, distraction and alcohol stretch the first; wet, leaves, snow, worn tyres and a heavy load stretch the second.',
    ),
    tip: null,
    scene: null,
  }),
  q('sp15', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Wann müssen Sie langsamer fahren, als erlaubt ist?',
    en: 'When must you drive slower than the limit allows?',
    opts: [
      t('Bei Nebel, Regen oder Glätte', 'In fog, rain or on slippery roads'),
      t('Wenn Kinder am Straßenrand sind', 'When there are children at the roadside'),
      t('Wenn hinter mir jemand drängelt', 'When someone is tailgating me'),
    ],
    ok: [0, 1],
    why: t(
      'Das Tempolimit ist eine Obergrenze. Die Geschwindigkeit muss den Straßen-, Verkehrs-, Sicht- und Wetterverhältnissen angepasst sein (§ 3 Abs. 1 StVO) – und Kindern, älteren und hilfsbedürftigen Menschen gegenüber besonders vorsichtig.',
      'The limit is a ceiling. Your speed must suit the road, traffic, visibility and weather (§ 3(1) StVO), with extra care near children, older people and anyone who needs help.',
    ),
    tip: null,
    scene: null,
  }),
  q('sp16', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Dürfen Sie ohne Grund sehr langsam fahren?',
    en: 'May you drive very slowly for no reason?',
    opts: [
      t('Nein, nicht so langsam, dass der Verkehrsfluss behindert wird', 'No, not so slowly that you hold up the flow of traffic'),
      t('Ja, langsam ist immer sicher', 'Yes, slow is always safe'),
      t('Ja, aber nur auf der Autobahn', 'Yes, but only on the motorway'),
    ],
    ok: [0],
    why: t(
      'Ohne triftigen Grund dürfen Kraftfahrzeuge nicht so langsam fahren, dass sie den Verkehrsfluss behindern (§ 3 Abs. 2 StVO). Unnötig langsames Fahren verleitet andere zu riskantem Überholen.',
      'Without good reason, motor vehicles may not go so slowly that they hold up traffic (§ 3(2) StVO). Needlessly slow driving tempts others into risky overtaking.',
    ),
    tip: null,
    scene: null,
  }),
  q('sp17', {
    pts: 4, sec: '2.2', basic: false,
    de: 'Wie lang ist nach der Faustformel der Bremsweg bei einer Gefahrbremsung aus 80 km/h?',
    en: 'By the rule of thumb, how long is the braking distance in an emergency stop from 80 km/h?',
    kind: 'number', num: 32, unit: 'm',
    why: withRule('Normaler Bremsweg 8 × 8 = 64 m, die Hälfte davon sind 32 m.', 'Normal braking 8 × 8 = 64 m; half of that is 32 m.'),
    tip: null,
    scene: null,
  }),
  q('sp18', {
    pts: 3, sec: '2.2', basic: false,
    de: 'Wie lang ist nach der Faustformel der Reaktionsweg bei 100 km/h?',
    en: 'By the rule of thumb, how long is the reaction distance at 100 km/h?',
    kind: 'number', num: 30, unit: 'm',
    why: withRule('100 ÷ 10 = 10, mal 3 = 30 m – in der einen Sekunde, bevor Sie überhaupt bremsen.', '100 ÷ 10 = 10, times 3 = 30 m - in the one second before you even touch the brake.'),
    tip: null,
    scene: null,
  }),
  q('sp19', {
    pts: 3, sec: '2.2', basic: false,
    de: 'Wie lang ist nach der Faustformel der normale Bremsweg bei 30 km/h?',
    en: 'By the rule of thumb, how long is the normal braking distance at 30 km/h?',
    kind: 'number', num: 9, unit: 'm',
    why: withRule('30 ÷ 10 = 3, mal 3 = 9 m. Aus 50 km/h sind es schon 25 m – der Grund für Tempo 30 vor Schulen.', '30 ÷ 10 = 3, times 3 = 9 m. From 50 km/h it is already 25 m - which is why there is 30 outside schools.'),
    tip: null,
    scene: null,
  }),
  q('sp20', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Innerorts fahren Sie 50 km/h. Welcher Abstand zum Vorausfahrenden ist mindestens angemessen?',
    en: 'You are driving at 50 km/h in town. What is the minimum sensible gap to the car in front?',
    opts: [
      t('Etwa die Strecke, die ich in einer Sekunde fahre (rund 15 m)', 'About the distance I cover in one second (around 15 m)'),
      t('Eine Wagenlänge', 'One car length'),
      t('So nah, dass niemand einschert', 'Close enough that nobody cuts in'),
    ],
    ok: [0],
    why: t(
      'Der Abstand muss so groß sein, dass Sie auch bei plötzlichem Bremsen des Vordermanns noch halten können (§ 4 Abs. 1 StVO). Innerorts gilt als Untergrenze die Strecke einer Sekunde, außerorts „halber Tacho“.',
      'The gap must let you stop even if the car ahead brakes suddenly (§ 4(1) StVO). In town the minimum is the distance of one second; outside town, "half the speedometer".',
    ),
    tip: null,
    scene: null,
  }),
];
