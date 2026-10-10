import { q, t } from './_q.mjs';

/** Autobahn und Kraftfahrstraße. StVO § 18, § 11 (Rettungsgasse), § 15. */
export default [
  q('mw01', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Sie fahren auf die Autobahn auf. Was ist richtig?',
    en: 'You are joining the motorway. What is correct?',
    opts: [
      t('Den Beschleunigungsstreifen nutzen und auf die Geschwindigkeit der Autobahn beschleunigen', 'Use the acceleration lane to match the motorway speed'),
      t('Der Verkehr auf der Autobahn hat Vorfahrt', 'Traffic on the motorway has priority'),
      t('Die Autobahn-Fahrer müssen mich einfädeln lassen', 'Drivers on the motorway must let me in'),
    ],
    ok: [0, 1],
    why: t(
      'Der Verkehr auf der durchgehenden Fahrbahn hat Vorfahrt (§ 18 Abs. 3 StVO). Nutzen Sie den Beschleunigungsstreifen, um eine passende Lücke mit passender Geschwindigkeit zu treffen – zu langsames Einfädeln ist gefährlich.',
      'Traffic on the main carriageway has priority (§ 18(3) StVO). Use the acceleration lane to reach a suitable gap at a suitable speed; merging too slowly is dangerous.',
    ),
    tip: null,
    scene: { road: 'motorway', actors: [{ kind: 'you', at: [62, 74], heading: 0, blinker: 'left' }, { kind: 'truck', at: [50, 46], heading: 0 }, { kind: 'car', at: [38, 70], heading: 0 }] },
  }),
  q('mw02', {
    pts: 5, sec: '1.2', basic: true,
    de: 'Auf der Autobahn bildet sich ein Stau. Wo bilden Sie die Rettungsgasse?',
    en: 'A queue is forming on the motorway. Where do you form the emergency corridor?',
    opts: [
      t('Zwischen dem linken und dem Fahrstreifen rechts daneben', 'Between the far left lane and the lane next to it'),
      t('Auf dem Seitenstreifen', 'On the hard shoulder'),
      t('In der Mitte zwischen allen Spuren gleichmäßig', 'Spread across all lanes evenly'),
    ],
    ok: [0],
    why: t(
      'Sobald der Verkehr auf Autobahnen und Außerortsstraßen mit mindestens zwei Fahrstreifen je Richtung stockt, bilden Sie eine Rettungsgasse zwischen dem äußerst linken und dem rechts daneben liegenden Fahrstreifen (§ 11 Abs. 2 StVO) – schon bevor Einsatzfahrzeuge kommen.',
      'As soon as traffic slows to walking pace on motorways and multi-lane roads outside town, form the corridor between the far left lane and the one to its right (§ 11(2) StVO) - before any emergency vehicles arrive.',
    ),
    tip: t('Ganz links nach links, alle anderen nach rechts.', 'Far left lane moves left; everyone else moves right.'),
    scene: {
      road: 'motorway',
      actors: [
        { kind: 'car', at: [24, 40], heading: 0 },
        { kind: 'car', at: [42, 40], heading: 0 },
        { kind: 'you', at: [42, 60], heading: 0 },
        { kind: 'truck', at: [53, 52], heading: 0 },
        { kind: 'car', at: [24, 62], heading: 0 },
        { kind: 'ambulance', at: [32, 88], heading: 0, siren: true },
      ],
    },
  }),
  q('mw03', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Was ist auf der Autobahn verboten?',
    en: 'What is forbidden on the motorway?',
    opts: [
      t('Wenden und Rückwärtsfahren', 'Turning round and reversing'),
      t('Halten, auch auf dem Seitenstreifen (außer im Notfall)', 'Stopping, even on the hard shoulder (except in an emergency)'),
      t('Den linken Fahrstreifen zum Überholen benutzen', 'Using the left lane to overtake'),
    ],
    ok: [0, 1],
    why: t(
      'Auf Autobahnen sind Wenden und Rückwärtsfahren verboten, auch an Ein- und Ausfahrten. Halten ist verboten, auch auf Seitenstreifen (§ 18 Abs. 7 und 8 StVO). Haben Sie die Ausfahrt verpasst, fahren Sie zur nächsten.',
      'Turning round and reversing are forbidden on motorways, slip roads included. Stopping is forbidden too, including on the hard shoulder (§ 18(7) and (8) StVO). Missed your exit? Take the next one.',
    ),
    tip: null,
    scene: null,
  }),
  q('mw04', {
    pts: 5, sec: '1.1', basic: true,
    de: 'Sie haben auf der Autobahn eine Panne. Was tun Sie?',
    en: 'You break down on the motorway. What do you do?',
    opts: [
      t('Warnblinklicht einschalten und, wenn möglich, auf den Seitenstreifen fahren', 'Switch on the hazard lights and, if possible, get onto the hard shoulder'),
      t('Warnweste anziehen und alle hinter die Schutzplanke bringen', 'Put on a hi-vis vest and get everyone behind the crash barrier'),
      t('Das Warndreieck in etwa 200 m Entfernung aufstellen', 'Set up the warning triangle about 200 m back'),
    ],
    ok: [0, 1, 2],
    why: t(
      'Erst sichern Sie sich: Warnblinker, rechts raus, Warnweste, alle Insassen auf der Beifahrerseite aussteigen lassen und hinter die Leitplanke. Dann das Warndreieck – auf der Autobahn etwa 200 m, auf Landstraßen etwa 100 m, innerorts etwa 50 m hinter dem Fahrzeug (§ 15 StVO).',
      'Make yourselves safe first: hazards on, pull right, vest on, everyone out on the passenger side and behind the barrier. Then the warning triangle: about 200 m back on a motorway, 100 m on country roads, 50 m in town (§ 15 StVO).',
    ),
    tip: t('50 – 100 – 200 m: Ort, Land, Autobahn.', '50 - 100 - 200 m: town, country, motorway.'),
    scene: null,
  }),
  q('mw05', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Sie nähern sich auf der Autobahn einem Stauende. Was tun Sie?',
    en: 'On the motorway you are approaching the tail of a queue. What do you do?',
    opts: [
      t('Rechtzeitig bremsen und das Warnblinklicht einschalten', 'Brake in good time and switch on the hazard lights'),
      t('Ausreichend Abstand zum letzten Fahrzeug lassen', 'Leave enough room to the last vehicle'),
      t('Auf den Seitenstreifen ausweichen', 'Swerve onto the hard shoulder'),
    ],
    ok: [0, 1],
    why: t(
      'Am Stauende warnen Sie den nachfolgenden Verkehr mit dem Warnblinklicht (§ 16 Abs. 2 StVO). Abstand lassen, damit Sie ausweichen können, falls hinten jemand zu spät bremst.',
      'At the tail of a queue warn the traffic behind with your hazard lights (§ 16(2) StVO). Leave a gap so you can move aside if someone behind brakes too late.',
    ),
    tip: null,
    scene: null,
  }),
  q('mw06', {
    pts: 5, sec: '2.1', basic: false,
    de: 'Das Radio meldet einen Falschfahrer („Geisterfahrer“) auf Ihrer Strecke. Was tun Sie?',
    en: 'The radio reports a wrong-way driver on your stretch of motorway. What do you do?',
    opts: [
      t('Rechts fahren und nicht überholen', 'Keep right and do not overtake'),
      t('Langsamer fahren und Abstand vergrößern', 'Slow down and increase the gap'),
      t('Auf dem linken Fahrstreifen bleiben', 'Stay in the left lane'),
    ],
    ok: [0, 1],
    why: t(
      'Ein Falschfahrer kommt meist auf dem linken Fahrstreifen entgegen, weil er sich für den rechten hält. Bleiben Sie rechts, überholen Sie nicht, fahren Sie langsamer und schalten Sie das Warnblinklicht ein, wenn er naht.',
      'A wrong-way driver usually comes at you in the left lane, thinking it is the right one. Keep right, do not overtake, slow down, and switch on your hazards if they get close.',
    ),
    tip: null,
    scene: null,
  }),
  q('mw07', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Wie viele Meter vor der Ausfahrt steht die Ankündigungsbake mit drei Streifen?',
    en: 'How many metres before the exit is the countdown marker with three stripes?',
    kind: 'number', num: 300, unit: 'm',
    why: t(
      'Die Ankündigungsbaken (Zeichen 450) stehen etwa 300, 200 und 100 m vor dem Beginn des Ausfädelungsstreifens. Wechseln Sie früh auf den rechten Fahrstreifen.',
      'The countdown markers (sign 450) stand about 300, 200 and 100 m before the start of the exit lane. Move into the right-hand lane early.',
    ),
    tip: t('Autobahn: 100 m pro Streifen. Bahnübergang: 80 m.', 'Motorway: 100 m per stripe. Level crossing: 80 m.'),
    scene: null,
    signs: ['450'],
  }),
  q('mw08', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Welchen Abstand haben die Leitpfosten am Straßenrand normalerweise?',
    en: 'How far apart are the roadside marker posts normally?',
    kind: 'number', num: 50, unit: 'm',
    why: t(
      'Leitpfosten stehen in der Regel 50 m auseinander. Daran schätzen Sie Abstand und Sichtweite: Sehen Sie im Nebel den nächsten nicht, liegt die Sicht unter 50 m – dann höchstens 50 km/h.',
      'Marker posts usually stand 50 m apart. Use them to judge gaps and visibility: if you cannot see the next one in fog, visibility is under 50 m and you may go no faster than 50 km/h.',
    ),
    tip: null,
    scene: null,
  }),
  q('mw09', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Wer darf auf dem Seitenstreifen der Autobahn fahren?',
    en: 'Who may drive on the motorway hard shoulder?',
    opts: [
      t('Niemand – außer er ist durch Zeichen freigegeben', 'Nobody - unless signs open it to traffic'),
      t('Langsame Fahrzeuge', 'Slow vehicles'),
      t('Jeder im Stau', 'Anyone stuck in a queue'),
    ],
    ok: [0],
    why: t(
      'Der Seitenstreifen ist kein Fahrstreifen. Befahren werden darf er nur, wenn er durch Verkehrszeichen ausdrücklich freigegeben ist – sonst ist er für Pannen und Rettungskräfte da.',
      'The hard shoulder is not a lane. You may only drive on it where signs expressly open it; otherwise it is for breakdowns and emergency services.',
    ),
    tip: null,
    scene: null,
  }),
  q('mw10', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Was gilt auf einer Kraftfahrstraße?',
    en: 'What applies on an expressway (Kraftfahrstraße)?',
    opts: [
      t('Nur Kraftfahrzeuge über 60 km/h bauartbedingt dürfen sie benutzen', 'Only motor vehicles built for over 60 km/h may use it'),
      t('An Einmündungen hat der Verkehr auf der Kraftfahrstraße Vorfahrt', 'At junctions, traffic on the expressway has priority'),
      t('Fußgänger dürfen am Rand gehen', 'Pedestrians may walk along the edge'),
    ],
    ok: [0, 1],
    why: t(
      'Für Kraftfahrstraßen (Zeichen 331.1) gelten weitgehend die Autobahnregeln: nur schnelle Kraftfahrzeuge, kein Halten, kein Wenden, und der Verkehr auf ihr hat an Einmündungen Vorfahrt.',
      'Expressways (sign 331.1) largely follow motorway rules: fast motor vehicles only, no stopping, no turning round, and traffic on them has priority at junctions.',
    ),
    tip: null,
    scene: null,
    signs: ['331.1'],
  }),
];
