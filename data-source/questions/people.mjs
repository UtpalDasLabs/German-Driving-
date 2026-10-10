import { q, t } from './_q.mjs';

/**
 * Fußgänger, Radfahrer, Kinder und ältere Menschen - the road users the law
 * protects most, because they are hurt worst. StVO §§ 2, 3(2a), 25, 26.
 */
export default [
  q('pe01', {
    pts: 5, sec: '1.2', basic: true,
    de: 'Ein Fußgänger wartet am Fußgängerüberweg. Was tun Sie?',
    en: 'A pedestrian is waiting at a zebra crossing. What do you do?',
    opts: [
      t('Anhalten und ihn über die Straße gehen lassen', 'Stop and let them cross'),
      t('Weiterfahren, er hat ja noch nicht angefangen zu gehen', 'Carry on - they have not started crossing yet'),
      t('Hupen, damit er weiß, dass ich komme', 'Sound the horn so they know I am coming'),
    ],
    ok: [0],
    why: t(
      'An Fußgängerüberwegen müssen Sie Fußgängern und Rollstuhlfahrern, die erkennbar hinüber wollen, das Überqueren ermöglichen. Dazu nur mit mäßiger Geschwindigkeit heranfahren und wenn nötig warten (§ 26 Abs. 1 StVO).',
      'At zebra crossings you must let pedestrians and wheelchair users who clearly want to cross do so. Approach at moderate speed and wait if necessary (§ 26(1) StVO).',
    ),
    tip: t('Wer am Zebrastreifen wartet, hat schon Vorrang.', 'Waiting at a zebra already gives them priority.'),
    scene: {
      road: 'straight',
      actors: [{ kind: 'you', at: [55, 84], heading: 0 }, { kind: 'ped', at: [64, 66], heading: 270 }],
      markings: ['zebra'],
      signs: [{ sign: '350', arm: 's' }],
    },
    signs: ['350'],
  }),
  q('pe02', {
    pts: 5, sec: '1.1', basic: true,
    de: 'Am Straßenrand stehen Kinder. Wie verhalten Sie sich?',
    en: 'There are children at the roadside. How do you behave?',
    opts: [
      t('Langsamer fahren und bremsbereit sein', 'Slow down and be ready to brake'),
      t('Damit rechnen, dass ein Kind plötzlich auf die Straße läuft', 'Expect a child to run into the road suddenly'),
      t('Hupen und mit gleicher Geschwindigkeit weiterfahren', 'Sound the horn and keep my speed'),
    ],
    ok: [0, 1],
    why: t(
      'Gegenüber Kindern, hilfsbedürftigen und älteren Menschen müssen Sie sich durch weniger Geschwindigkeit und Bremsbereitschaft so verhalten, dass eine Gefährdung ausgeschlossen ist (§ 3 Abs. 2a StVO). Kinder schätzen Geschwindigkeit und Entfernung noch nicht richtig ein.',
      'Near children, older people and anyone who needs help you must slow down and be ready to brake so that they cannot come to harm (§ 3(2a) StVO). Children cannot yet judge speed and distance.',
    ),
    tip: null,
    scene: { road: 'straight', actors: [{ kind: 'you', at: [55, 80], heading: 0 }, { kind: 'child', at: [64, 45] }, { kind: 'child', at: [66, 50] }] },
  }),
  q('pe03', {
    pts: 5, sec: '1.1', basic: true,
    de: 'Zwischen den geparkten Autos rollt ein Ball auf die Straße. Womit rechnen Sie?',
    en: 'A ball rolls into the road between parked cars. What do you expect?',
    opts: [
      t('Dass gleich ein Kind hinterherläuft', 'That a child will run out after it'),
      t('Mit nichts Besonderem', 'Nothing in particular'),
      t('Dass der Ball das Auto beschädigt', 'That the ball might damage the car'),
    ],
    ok: [0],
    why: t(
      'Ein Kind, das einem Ball nachläuft, achtet nur auf den Ball. Bremsen Sie sofort und rechnen Sie damit, dass es zwischen den Autos hervorkommt.',
      'A child chasing a ball sees only the ball. Brake at once and expect them to dart out from between the cars.',
    ),
    tip: t('Ball = Kind.', 'Ball = child.'),
    scene: {
      road: 'parking',
      actors: [{ kind: 'you', at: [55, 76], heading: 0 }, { kind: 'car', at: [66, 41], heading: 0 }, { kind: 'car', at: [66, 63], heading: 0 }, { kind: 'ball', at: [58, 50] }, { kind: 'child', at: [70, 52] }],
    },
  }),
  q('pe04', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Ein Fußgänger mit weißem Stock will die Straße überqueren. Was bedeutet das?',
    en: 'A pedestrian with a white cane wants to cross the road. What does that mean?',
    opts: [
      t('Er ist blind oder stark sehbehindert', 'They are blind or severely visually impaired'),
      t('Ich muss besonders vorsichtig sein und wenn nötig anhalten', 'I must be especially careful and stop if necessary'),
      t('Er sieht mich und wartet', 'They can see me and will wait'),
    ],
    ok: [0, 1],
    why: t(
      'Ein weißer Stock, ein Blindenführhund im weißen Geschirr oder gelbe Armbinden mit drei schwarzen Punkten kennzeichnen blinde Menschen. Sie können Sie nicht sehen – halten Sie, wenn nötig, an.',
      'A white cane, a guide dog in a white harness or a yellow armband with three black dots marks a blind person. They cannot see you, so stop if necessary.',
    ),
    tip: null,
    scene: null,
  }),
  q('pe05', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Ein älterer Fußgänger geht langsam über die Straße, Ihre Ampel wird grün. Was tun Sie?',
    en: 'An older pedestrian is crossing slowly as your light turns green. What do you do?',
    opts: [
      t('Warten, bis er die Straße verlassen hat', 'Wait until they have left the road'),
      t('Langsam an ihm vorbeifahren', 'Drive slowly past them'),
      t('Hupen, damit er schneller geht', 'Sound the horn to hurry them'),
    ],
    ok: [0],
    why: t(
      'Grün heißt nicht, dass Sie jemanden gefährden dürfen. Ältere Menschen brauchen oft länger und können sich erschrecken. Lassen Sie ihn in Ruhe zu Ende gehen.',
      'Green does not entitle you to endanger anyone. Older people often need longer and can be startled. Let them finish crossing in peace.',
    ),
    tip: null,
    scene: null,
  }),
  q('pe06', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Bis zu welchem Alter müssen Kinder mit dem Fahrrad auf dem Gehweg fahren?',
    en: 'Up to what age must children ride their bicycles on the pavement?',
    kind: 'number', num: 8, unit: null,
    why: t(
      'Kinder bis zum vollendeten 8. Lebensjahr müssen Gehwege benutzen, bis zum vollendeten 10. dürfen sie es (§ 2 Abs. 5 StVO). Rechnen Sie an Ausfahrten und Kreuzungen mit Kindern, die plötzlich vom Gehweg auf die Fahrbahn fahren.',
      'Children up to their 8th birthday must ride on the pavement, and up to their 10th may (§ 2(5) StVO). At driveways and junctions, expect children to ride off the pavement into the road.',
    ),
    tip: null,
    scene: null,
  }),
  q('pe07', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Vor Ihnen fährt ein Radfahrer auf ein parkendes Auto zu. Womit rechnen Sie?',
    en: 'A cyclist ahead is approaching a parked car. What do you expect?',
    opts: [
      t('Dass er nach links ausweicht, vielleicht ohne Handzeichen', 'That they will swerve left, perhaps without signalling'),
      t('Dass er anhält und wartet', 'That they will stop and wait'),
      t('Dass er auf den Gehweg fährt', 'That they will ride onto the pavement'),
    ],
    ok: [0],
    why: t(
      'Radfahrer müssen Hindernissen ausweichen und schauen dabei nicht immer zurück. Halten Sie Abstand und überholen Sie erst, wenn klar ist, was er tut.',
      'Cyclists have to steer round obstacles and do not always look back first. Keep your distance and overtake only once it is clear what they will do.',
    ),
    tip: null,
    scene: { road: 'parking', actors: [{ kind: 'you', at: [55, 84], heading: 0 }, { kind: 'bike', at: [57, 58], heading: 0 }, { kind: 'car', at: [62, 38], heading: 0 }] },
  }),
  q('pe08', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Dürfen Radfahrer nebeneinander fahren?',
    en: 'May cyclists ride side by side?',
    opts: [
      t('Ja, wenn dadurch der Verkehr nicht behindert wird', 'Yes, as long as they do not hold up traffic'),
      t('Nein, nie', 'No, never'),
      t('Nur in Gruppen ab 16 Personen', 'Only in groups of 16 or more'),
    ],
    ok: [0],
    why: t(
      'Radfahrer dürfen nebeneinander fahren, wenn sie den Verkehr nicht behindern (§ 2 Abs. 4 StVO). In einer Fahrradstraße und als geschlossener Verband ab 16 Radfahrern auch dann, wenn es langsamer geht.',
      'Cyclists may ride two abreast if they do not hold up traffic (§ 2(4) StVO). On a cycle street, and in a group of 16 or more, they may do so even when it slows others down.',
    ),
    tip: null,
    scene: null,
  }),
  q('pe09', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Nachts sind Fußgänger in dunkler Kleidung schwer zu sehen. Was ist richtig?',
    en: 'At night, pedestrians in dark clothes are hard to see. What is true?',
    opts: [
      t('Mit Abblendlicht sehe ich sie oft erst sehr spät', 'With dipped headlights I often see them very late'),
      t('Ich passe meine Geschwindigkeit der Reichweite meines Lichts an', 'I match my speed to the reach of my lights'),
      t('Mit Tagfahrlicht sehe ich nachts genug', 'Daytime running lights are enough at night'),
    ],
    ok: [0, 1],
    why: t(
      'Mit Abblendlicht sehen Sie einen dunkel gekleideten Fußgänger oft erst auf etwa 25 bis 30 m – bei 50 km/h ist das weniger als der Anhalteweg. Tagfahrlicht beleuchtet die Straße nicht und schaltet hinten nichts ein.',
      'On dipped beam you often see a pedestrian in dark clothes only 25 to 30 m away - less than your stopping distance at 50 km/h. Daytime running lights do not light the road and leave the rear unlit.',
    ),
    tip: null,
    scene: { road: 'straight', actors: [{ kind: 'you', at: [55, 80], heading: 0 }, { kind: 'ped', at: [58, 46], heading: 270 }], conditions: ['night'] },
  }),
  q('pe10', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Wo und wie dürfen E-Scooter (Elektrokleinstfahrzeuge) fahren?',
    en: 'Where and how may e-scooters be ridden?',
    opts: [
      t('Auf Radwegen, und wo keiner ist, auf der Fahrbahn', 'On cycle paths, and on the road where there is none'),
      t('Nur mit einer Person', 'With one person only'),
      t('Auf dem Gehweg', 'On the pavement'),
    ],
    ok: [0, 1],
    why: t(
      'E-Scooter müssen Radwege benutzen, sonst die Fahrbahn; Gehwege sind tabu. Sie dürfen nur von einer Person ab 14 Jahren gefahren werden (eKFV). Beim Abbiegen gelten sie wie Radfahrer.',
      'E-scooters must use cycle paths, otherwise the road; pavements are off limits. They may only be ridden by one person aged 14 or over (eKFV). When you turn, treat them like cyclists.',
    ),
    tip: null,
    scene: null,
  }),
  q('pe11', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Am Fahrbahnrand hält ein Schulbus. Kinder steigen aus. Was tun Sie?',
    en: 'A school bus has stopped at the roadside and children are getting off. What do you do?',
    opts: [
      t('Langsam und mit großem Abstand vorbeifahren, bremsbereit', 'Pass slowly, with plenty of room, ready to brake'),
      t('Damit rechnen, dass Kinder vor oder hinter dem Bus über die Straße laufen', 'Expect children to run across in front of or behind the bus'),
      t('Zügig vorbeifahren, damit die Kinder sicher aussteigen können', 'Pass quickly so the children can get off safely'),
    ],
    ok: [0, 1],
    why: t(
      'Kinder laufen oft direkt vor oder hinter dem Bus auf die Straße, um zum Elternhaus oder zu Freunden zu kommen. Hat der Bus das Warnblinklicht an, gilt sogar Schrittgeschwindigkeit (§ 20 Abs. 4 StVO).',
      'Children often run across directly in front of or behind the bus. If its hazard lights are on, you must even slow to walking pace (§ 20(4) StVO).',
    ),
    tip: null,
    scene: { road: 'straight', actors: [{ kind: 'you', at: [55, 84], heading: 0 }, { kind: 'bus', at: [56, 46], heading: 0 }, { kind: 'child', at: [64, 38] }, { kind: 'child', at: [50, 30] }] },
  }),
  q('pe12', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Ein Fußgänger überquert die Straße außerhalb eines Überwegs. Was tun Sie?',
    en: 'A pedestrian is crossing the road away from any crossing. What do you do?',
    opts: [
      t('Bremsen und ihn gehen lassen, auch wenn er eigentlich warten müsste', 'Brake and let them cross, even if they should really have waited'),
      t('Weiterfahren, er hat keinen Vorrang', 'Carry on - they have no priority'),
      t('Dicht hinter ihm vorbeifahren', 'Pass close behind them'),
    ],
    ok: [0],
    why: t(
      'Fußgänger müssen Fahrzeuge zwar beachten (§ 25 StVO), aber § 1 StVO verlangt ständige Vorsicht: Niemand darf gefährdet werden. Ein Fehler des anderen gibt Ihnen kein Recht, ihn anzufahren.',
      'Pedestrians must look out for vehicles (§ 25 StVO), but § 1 StVO demands constant care: nobody may be endangered. Someone else’s mistake never gives you the right to hit them.',
    ),
    tip: null,
    scene: null,
  }),
];
