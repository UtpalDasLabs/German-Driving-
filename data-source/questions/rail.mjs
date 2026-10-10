import { q, t } from './_q.mjs';

/** Bahnübergänge, Straßenbahnen und Busse an Haltestellen. StVO §§ 19, 20. */
export default [
  q('ra01', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Wann müssen Sie vor diesem Bahnübergang warten?',
    en: 'When must you wait at this level crossing?',
    opts: [
      t('Wenn sich ein Zug nähert', 'When a train is approaching'),
      t('Wenn rotes Blinklicht leuchtet oder sich die Schranken senken', 'When red lights are flashing or the barriers are coming down'),
      t('Nur wenn die Schranken ganz geschlossen sind', 'Only when the barriers are fully down'),
    ],
    ok: [0, 1],
    why: t(
      'Schienenfahrzeuge haben am Bahnübergang Vorrang (§ 19 Abs. 1 StVO). Sie müssen warten, wenn sich ein Zug nähert, rotes Licht oder Blinklicht gezeigt wird, die Schranken sich senken oder geschlossen sind oder ein Bahnbediensteter Halt gebietet (§ 19 Abs. 2 StVO).',
      'Trains have priority at level crossings (§ 19(1) StVO). You must wait when a train is coming, when red or flashing lights show, when the barriers are coming down or are down, or when a railway worker signals you to stop (§ 19(2) StVO).',
    ),
    tip: t('Senkende Schranke = schon zu.', 'A barrier coming down is already closed.'),
    scene: { road: 'rail', actors: [{ kind: 'you', at: [55, 80], heading: 0 }], signs: [{ sign: '201', arm: 's' }] },
    signs: ['201'],
  }),
  q('ra02', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Hinter dem Bahnübergang staut sich der Verkehr. Was tun Sie?',
    en: 'Traffic is queuing just beyond the level crossing. What do you do?',
    opts: [
      t('Vor dem Bahnübergang warten', 'Wait before the level crossing'),
      t('Auf die Gleise fahren und dort warten', 'Drive onto the tracks and wait there'),
      t('Hupen, damit die anderen aufrücken', 'Sound the horn so the others move up'),
    ],
    ok: [0],
    why: t(
      'Fahren Sie nur auf den Bahnübergang, wenn Sie ihn ohne Halt zügig überqueren können (§ 19 Abs. 1 StVO). Wer auf den Gleisen im Stau steht, kann nicht mehr ausweichen.',
      'Only drive onto a level crossing if you can get right across without stopping (§ 19(1) StVO). Stuck on the tracks in a queue, you cannot escape.',
    ),
    tip: null,
    scene: { road: 'rail', actors: [{ kind: 'you', at: [55, 76], heading: 0 }, { kind: 'car', at: [55, 32], heading: 0 }, { kind: 'truck', at: [55, 12], heading: 0 }] },
  }),
  q('ra03', {
    pts: 5, sec: '1.1', basic: true,
    de: 'Ihr Auto bleibt auf dem Bahnübergang liegen. Was tun Sie?',
    en: 'Your car breaks down on a level crossing. What do you do?',
    opts: [
      t('Alle Insassen sofort aussteigen und den Gefahrenbereich verlassen lassen', 'Get everyone out at once and away from the danger zone'),
      t('Den Notruf oder die Nummer am Bahnübergang anrufen', 'Call the emergency number or the number shown at the crossing'),
      t('Im Auto sitzen bleiben und den Motor neu starten', 'Stay in the car and keep trying to restart it'),
    ],
    ok: [0, 1],
    why: t(
      'Ein Zug kann nicht ausweichen und braucht oft über einen Kilometer zum Bremsen. Menschen gehen vor: raus, weg von den Gleisen, dann die Bahn über den Notruf warnen.',
      'A train cannot swerve and often needs over a kilometre to stop. People come first: out, away from the tracks, then warn the railway through the emergency number.',
    ),
    tip: null,
    scene: null,
  }),
  q('ra04', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Ein Linienbus nähert sich mit eingeschaltetem Warnblinklicht einer Haltestelle. Was gilt?',
    en: 'A bus is approaching a stop with its hazard lights on. What applies?',
    opts: [
      t('Ich darf ihn nicht überholen', 'I must not overtake it'),
      t('Ich darf ihn zügig überholen, bevor er hält', 'I may overtake quickly before it stops'),
      t('Ich muss sofort anhalten', 'I must stop at once'),
    ],
    ok: [0],
    why: t(
      'Linienbusse und gekennzeichnete Schulbusse, die sich mit Warnblinklicht einer Haltestelle nähern, dürfen nicht überholt werden (§ 20 Abs. 3 StVO).',
      'Buses and marked school buses approaching a stop with hazard lights on must not be overtaken (§ 20(3) StVO).',
    ),
    tip: null,
    scene: { road: 'straight', actors: [{ kind: 'you', at: [55, 84], heading: 0 }, { kind: 'bus', at: [55, 52], heading: 0, blinker: 'hazard' }], signs: [{ sign: '224', arm: 's' }] },
  }),
  q('ra05', {
    pts: 5, sec: '1.2', basic: true,
    de: 'Ein Linienbus steht mit Warnblinklicht an der Haltestelle. Wie dürfen Sie vorbeifahren?',
    en: 'A bus is at its stop with hazard lights on. How may you pass it?',
    opts: [
      t('Nur mit Schrittgeschwindigkeit', 'Only at walking pace'),
      t('So, dass Fahrgäste nicht gefährdet werden – wenn nötig warte ich', 'Without endangering passengers - waiting if necessary'),
      t('Mit 30 km/h', 'At 30 km/h'),
    ],
    ok: [0, 1],
    why: t(
      'An Linien- und Schulbussen, die mit Warnblinklicht an Haltestellen halten, darf nur mit Schrittgeschwindigkeit und mit einem Abstand vorbeigefahren werden, der Fahrgäste nicht gefährdet. Das gilt auch für den Gegenverkehr auf derselben Fahrbahn (§ 20 Abs. 4 StVO).',
      'Past buses and school buses standing at a stop with hazard lights on you may only go at walking pace and with enough room not to endanger passengers. This also applies to oncoming traffic on the same carriageway (§ 20(4) StVO).',
    ),
    tip: t('Bus blinkt an der Haltestelle = Schritttempo, auch im Gegenverkehr.', 'Bus flashing at a stop = walking pace, even coming the other way.'),
    scene: { road: 'straight', actors: [{ kind: 'you', at: [45, 20], heading: 180 }, { kind: 'bus', at: [56, 52], heading: 0, blinker: 'hazard' }, { kind: 'child', at: [64, 44] }] },
  }),
  q('ra06', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Ein Bus will von der Haltestelle abfahren und blinkt links. Was tun Sie?',
    en: 'A bus is signalling left to pull away from its stop. What do you do?',
    opts: [
      t('Ihn abfahren lassen, wenn nötig warte ich', 'Let it pull out, waiting if necessary'),
      t('Schnell vorbeifahren', 'Hurry past'),
      t('Hupen', 'Sound the horn'),
    ],
    ok: [0],
    why: t(
      'Linienbussen und Schulbussen ist das Abfahren von gekennzeichneten Haltestellen zu ermöglichen; wenn nötig, müssen andere Fahrzeuge warten (§ 20 Abs. 5 StVO).',
      'Buses and school buses must be allowed to pull away from marked stops; other vehicles have to wait if necessary (§ 20(5) StVO).',
    ),
    tip: null,
    scene: { road: 'straight', actors: [{ kind: 'you', at: [55, 84], heading: 0 }, { kind: 'bus', at: [57, 50], heading: 0, blinker: 'left' }] },
  }),
  q('ra07', {
    pts: 5, sec: '1.2', basic: true,
    de: 'Eine Straßenbahn hält an einer Haltestelle ohne Insel. Fahrgäste steigen aus. Was tun Sie?',
    en: 'A tram has stopped at a stop with no island and passengers are getting off. What do you do?',
    opts: [
      t('Rechts nur mit Schrittgeschwindigkeit vorbeifahren und Fahrgäste nicht behindern', 'Pass on the right at walking pace without hindering passengers'),
      t('Wenn nötig, warten', 'Wait if necessary'),
      t('Zügig links vorbeifahren', 'Pass quickly on the left'),
    ],
    ok: [0, 1],
    why: t(
      'Steigen Fahrgäste ein oder aus, darf rechts nur mit Schrittgeschwindigkeit und mit Abstand vorbeigefahren werden; Fahrgäste dürfen nicht behindert werden, wenn nötig wird gewartet (§ 20 Abs. 2 StVO).',
      'While passengers get on or off, you may only pass on the right at walking pace and with room to spare; passengers must not be hindered, and you wait if necessary (§ 20(2) StVO).',
    ),
    tip: null,
    scene: { road: 'tramline', actors: [{ kind: 'you', at: [64, 84], heading: 0 }, { kind: 'tram', at: [50, 44], heading: 0 }, { kind: 'ped', at: [60, 44], heading: 90 }, { kind: 'ped', at: [64, 50], heading: 90 }] },
  }),
  q('ra08', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Sie nähern sich einem Bahnübergang mit Andreaskreuz. Wie fahren Sie heran?',
    en: 'You are approaching a level crossing marked with a St Andrew’s cross. How do you approach?',
    opts: [
      t('Mit mäßiger Geschwindigkeit', 'At a moderate speed'),
      t('Möglichst schnell, um rasch über die Gleise zu kommen', 'As fast as possible, to get across quickly'),
      t('Ich überhole noch schnell den Lkw vor mir', 'I quickly overtake the lorry ahead'),
    ],
    ok: [0],
    why: t(
      'An Bahnübergänge wird mit mäßiger Geschwindigkeit herangefahren (§ 19 Abs. 1 StVO), damit Sie halten können, wenn sich ein Zug nähert. Ab Zeichen 151 oder 156 dürfen Kraftfahrzeuge nicht überholt werden.',
      'You approach level crossings at moderate speed (§ 19(1) StVO) so you can stop if a train comes. From sign 151 or 156, motor vehicles may not be overtaken.',
    ),
    tip: null,
    scene: null,
    signs: ['151', '201'],
  }),
];
