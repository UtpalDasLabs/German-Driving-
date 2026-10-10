import { q, t } from './_q.mjs';

/** Überholen, Vorbeifahren und Begegnen. StVO §§ 5, 6 and 7. */
export default [
  q('ov01', {
    pts: 5, sec: '1.2', basic: true,
    de: 'Wann ist Überholen verboten?',
    en: 'When is overtaking forbidden?',
    opts: [
      t('Bei unklarer Verkehrslage', 'When the traffic situation is unclear'),
      t('Wenn ich nicht wesentlich schneller bin als der zu Überholende', 'When I am not much faster than the vehicle I want to pass'),
      t('Wenn der Gegenverkehr weit entfernt ist', 'When oncoming traffic is far away'),
    ],
    ok: [0, 1],
    why: t(
      'Überholen darf nur, wer übersehen kann, dass der Gegenverkehr nicht behindert wird, und wer mit wesentlich höherer Geschwindigkeit überholt. Bei unklarer Verkehrslage ist Überholen verboten (§ 5 Abs. 2 und 3 StVO).',
      'You may only overtake if you can see that oncoming traffic will not be hindered and you are much faster than the vehicle being passed. With an unclear traffic situation, overtaking is forbidden (§ 5(2) and (3) StVO).',
    ),
    tip: t('Im Zweifel nie.', 'When in doubt, don’t.'),
    scene: null,
  }),
  q('ov02', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Welchen Seitenabstand müssen Sie beim Überholen eines Radfahrers außerorts mindestens einhalten?',
    en: 'What is the minimum side clearance when overtaking a cyclist outside town?',
    kind: 'number', num: 2, unit: 'm',
    why: t(
      'Beim Überholen von Fußgängern, Radfahrern und E-Scooter-Fahrern gelten innerorts mindestens 1,5 m, außerorts mindestens 2 m Seitenabstand (§ 5 Abs. 4 StVO). Passt das nicht, wird nicht überholt.',
      'When overtaking pedestrians, cyclists and e-scooter riders the minimum clearance is 1.5 m in town and 2 m outside (§ 5(4) StVO). If it does not fit, you do not overtake.',
    ),
    tip: t('Innerorts 1,5 – außerorts 2.', 'Town 1.5 - country 2.'),
    scene: { road: 'straight', actors: [{ kind: 'you', at: [52, 70], heading: 0 }, { kind: 'bike', at: [58, 42], heading: 0 }] },
  }),
  q('ov03', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Sie werden überholt. Was dürfen Sie nicht tun?',
    en: 'You are being overtaken. What must you not do?',
    opts: [
      t('Schneller werden', 'Speed up'),
      t('Weiter rechts fahren', 'Keep further right'),
      t('Gleichmäßig weiterfahren', 'Carry on at a steady speed'),
    ],
    ok: [0],
    why: t(
      'Wer überholt wird, darf seine Geschwindigkeit nicht erhöhen (§ 5 Abs. 6 StVO). Wenn nötig, sollten Sie sogar langsamer werden und rechts bleiben.',
      'If you are being overtaken you must not speed up (§ 5(6) StVO). If necessary, slow down and keep right.',
    ),
    tip: null,
    scene: null,
  }),
  q('ov04', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Das Fahrzeug vor Ihnen blinkt links und hat sich zur Mitte eingeordnet. Wie überholen Sie?',
    en: 'The vehicle in front is signalling left and has moved towards the centre. How do you pass it?',
    opts: [
      t('Rechts', 'On the right'),
      t('Links', 'On the left'),
      t('Gar nicht – ich muss immer dahinter warten', 'Not at all - I always have to wait behind it'),
    ],
    ok: [0],
    why: t(
      'Wer sich zum Linksabbiegen eingeordnet und das angekündigt hat, wird rechts überholt (§ 5 Abs. 7 StVO) – wenn rechts genug Platz ist.',
      'A vehicle that has signalled and positioned itself to turn left is passed on the right (§ 5(7) StVO), if there is enough room.',
    ),
    tip: null,
    scene: { road: 'cross', actors: [{ kind: 'car', arm: 's', turn: 'left', blinker: 'left', at: [51, 66], heading: 0 }, { kind: 'you', at: [56, 86], heading: 0 }] },
  }),
  q('ov05', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Wo ist Überholen verboten?',
    en: 'Where is overtaking forbidden?',
    opts: [
      t('Vor und an Fußgängerüberwegen', 'Approaching and on zebra crossings'),
      t('Ab den Warnzeichen vor einem Bahnübergang bis über die Gleise', 'From the warning signs before a level crossing until past the tracks'),
      t('Auf jeder Brücke', 'On every bridge'),
    ],
    ok: [0, 1],
    why: t(
      'An Fußgängerüberwegen darf nicht überholt werden (§ 26 Abs. 3 StVO). Kraftfahrzeuge dürfen ab Zeichen 151 oder 156 bis einschließlich des Bahnübergangs keine Kraftfahrzeuge überholen (§ 19 Abs. 1 StVO). Für Brücken gibt es keine allgemeine Regel.',
      'You may not overtake at zebra crossings (§ 26(3) StVO). From sign 151 or 156 until you are over a level crossing, motor vehicles may not overtake other motor vehicles (§ 19(1) StVO). Bridges have no general rule.',
    ),
    tip: null,
    scene: null,
  }),
  q('ov06', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Was müssen Sie beim Überholen tun?',
    en: 'What must you do when overtaking?',
    opts: [
      t('Vor dem Ausscheren links blinken und den Schulterblick machen', 'Signal left and look over your shoulder before pulling out'),
      t('Beim Wiedereinordnen rechts blinken', 'Signal right when pulling back in'),
      t('Den Überholten beim Wiedereinordnen nicht behindern', 'Not cut up the vehicle you passed when pulling back in'),
    ],
    ok: [0, 1, 2],
    why: t(
      'Ausscheren und Wiedereinordnen sind Fahrstreifenwechsel: rechtzeitig blinken, Spiegel und Schulterblick (§ 5 Abs. 4a StVO). Eingeordnet wird erst, wenn der Überholte nicht behindert wird.',
      'Pulling out and back in are lane changes: signal in good time, check the mirror and over your shoulder (§ 5(4a) StVO). Pull back in only once you will not get in the way of the vehicle you passed.',
    ),
    tip: null,
    scene: null,
  }),
  q('ov07', {
    pts: 4, sec: '2.2', basic: false,
    de: 'Auf der Autobahn fährt die linke Spur langsam (Stau). Dürfen Sie rechts schneller fahren?',
    en: 'On the motorway the left lane is moving slowly in a queue. May you go faster on the right?',
    opts: [
      t('Ja, mit höchstens 20 km/h mehr und äußerster Vorsicht, wenn links höchstens 60 km/h gefahren wird', 'Yes, at most 20 km/h faster and with great care, if the left lane is doing 60 km/h or less'),
      t('Ja, beliebig schneller', 'Yes, as much faster as I like'),
      t('Nein, nie', 'No, never'),
    ],
    ok: [0],
    why: t(
      'Stehen links Fahrzeuge oder fahren sie langsam, darf rechts mit geringfügig höherer Geschwindigkeit und äußerster Vorsicht vorbeigefahren werden (§ 7 Abs. 2a StVO). Gerichte setzen das bei höchstens 20 km/h Unterschied an, wenn links nicht schneller als 60 km/h gefahren wird.',
      'If vehicles on the left are stopped or moving slowly, you may pass on the right only slightly faster and with great care (§ 7(2a) StVO). Courts set this at no more than 20 km/h faster, with the left lane at 60 km/h or less.',
    ),
    tip: null,
    scene: null,
  }),
  q('ov08', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Auf Ihrer Fahrbahnseite steht ein Hindernis, der Gegenverkehr kommt. Wer muss warten?',
    en: 'There is an obstruction on your side of the road and traffic is coming the other way. Who has to wait?',
    opts: [
      t('Ich', 'I do'),
      t('Der Gegenverkehr', 'The oncoming traffic'),
      t('Wer zuerst da ist', 'Whoever gets there first'),
    ],
    ok: [0],
    why: t(
      'Wer an einem Hindernis auf seiner Seite vorbeifahren will, muss entgegenkommende Fahrzeuge durchfahren lassen (§ 6 StVO). Beim Ausscheren blinken.',
      'Whoever has the obstruction on their side must let oncoming vehicles through (§ 6 StVO). Signal when you pull out round it.',
    ),
    tip: t('Wessen Seite blockiert ist, der wartet.', 'Whoever’s side is blocked waits.'),
    scene: {
      road: 'straight',
      actors: [{ kind: 'you', at: [55, 82], heading: 0 }, { kind: 'truck', at: [55, 50], heading: 0, blinker: 'hazard' }, { kind: 'car', at: [45, 22], heading: 180 }],
    },
  }),
  q('ov09', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Wie überholen Sie eine Straßenbahn auf einer Straße mit Gegenverkehr?',
    en: 'How do you overtake a tram on a two-way street?',
    opts: [
      t('Rechts', 'On the right'),
      t('Links', 'On the left'),
      t('Auf beiden Seiten', 'On either side'),
    ],
    ok: [0],
    why: t(
      'Schienenfahrzeuge werden rechts überholt. Links nur in Einbahnstraßen oder wenn die Schienen zu weit rechts liegen (§ 5 Abs. 7 StVO).',
      'Rail vehicles are overtaken on the right. On the left only in one-way streets or where the tracks lie too far to the right (§ 5(7) StVO).',
    ),
    tip: null,
    scene: { road: 'tramline', actors: [{ kind: 'you', at: [64, 82], heading: 0 }, { kind: 'tram', at: [52, 48], heading: 0 }] },
  }),
  q('ov10', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Worauf müssen Sie sich beim Überholen eines Lkw auf der Landstraße einstellen?',
    en: 'What must you be ready for when overtaking a lorry on a country road?',
    opts: [
      t('Der Überholweg ist sehr lang', 'The overtaking distance is very long'),
      t('Beim Vorbeifahren kann mich Seitenwind treffen', 'Crosswind may hit me as I come out from behind it'),
      t('Der Lkw blockiert die Sicht auf den Gegenverkehr', 'The lorry blocks my view of oncoming traffic'),
    ],
    ok: [0, 1, 2],
    why: t(
      'Ein Lkw ist lang und oft kaum langsamer: Der Überholweg kann mehrere hundert Meter betragen. Hinter ihm sehen Sie den Gegenverkehr schlecht, und wenn Sie aus seinem Windschatten kommen, kann Seitenwind Sie versetzen.',
      'A lorry is long and often barely slower than you, so overtaking can take several hundred metres. Behind it you see little of the oncoming traffic, and coming out of its slipstream, crosswind can push you sideways.',
    ),
    tip: null,
    scene: null,
  }),
  q('ov11', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Wann dürfen Sie innerorts rechts an anderen Fahrzeugen vorbeifahren?',
    en: 'When may you pass other vehicles on the right in town?',
    opts: [
      t('Auf Straßen mit mehreren markierten Fahrstreifen in eine Richtung', 'On roads with several marked lanes in one direction'),
      t('Immer, wenn rechts Platz ist', 'Whenever there is room on the right'),
      t('Nie', 'Never'),
    ],
    ok: [0],
    why: t(
      'Innerorts dürfen Kraftfahrzeuge bis 3,5 t auf Fahrbahnen mit mehreren markierten Fahrstreifen für eine Richtung den Fahrstreifen frei wählen und dabei auch rechts schneller fahren (§ 7 Abs. 3 StVO).',
      'In town, motor vehicles up to 3.5 t may choose any lane on roads with several marked lanes in one direction, and may then also go faster on the right (§ 7(3) StVO).',
    ),
    tip: null,
    scene: null,
  }),
  q('ov12', {
    pts: 5, sec: '1.2', basic: true,
    de: 'Sie fahren hinter einem Radfahrer, Gegenverkehr kommt, der Platz für 1,5 m Abstand fehlt. Was tun Sie?',
    en: 'You are behind a cyclist, there is oncoming traffic and no room for 1.5 m clearance. What do you do?',
    opts: [
      t('Hinter dem Radfahrer bleiben, bis ich mit genug Abstand überholen kann', 'Stay behind the cyclist until I can pass with enough room'),
      t('Knapp überholen, der Radfahrer kann ausweichen', 'Pass tightly - the cyclist can move over'),
      t('Hupen, damit er Platz macht', 'Sound the horn so the cyclist makes room'),
    ],
    ok: [0],
    why: t(
      'Der Mindestabstand ist Pflicht, nicht Empfehlung. Reicht der Platz nicht, wird nicht überholt. Hupen ist nur zur Warnung vor Gefahr erlaubt.',
      'The minimum clearance is the law, not advice. If there is no room, you do not overtake. The horn is only for warning of danger.',
    ),
    tip: null,
    scene: { road: 'straight', actors: [{ kind: 'you', at: [55, 78], heading: 0 }, { kind: 'bike', at: [57, 54], heading: 0 }, { kind: 'car', at: [45, 28], heading: 180 }] },
  }),
];
