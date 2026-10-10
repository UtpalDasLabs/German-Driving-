import { q, t } from './_q.mjs';

/** Abbiegen, Wenden und Rückwärtsfahren. StVO § 9. */
export default [
  q('tu01', {
    pts: 5, sec: '1.2', basic: true,
    de: 'Sie wollen rechts abbiegen. Rechts neben Ihnen fährt ein Radfahrer auf dem Radweg geradeaus. Was tun Sie?',
    en: 'You want to turn right. A cyclist is riding straight on along the cycle path to your right. What do you do?',
    opts: [
      t('Den Radfahrer durchfahren lassen', 'Let the cyclist go first'),
      t('Vor dem Abbiegen über die rechte Schulter blicken', 'Look over my right shoulder before turning'),
      t('Zügig vor dem Radfahrer abbiegen', 'Turn quickly ahead of the cyclist'),
    ],
    ok: [0, 1],
    why: t(
      'Wer abbiegt, muss Radfahrer durchfahren lassen, die in gleicher Richtung auf oder neben der Fahrbahn geradeaus fahren (§ 9 Abs. 3 StVO). Im toten Winkel sehen Sie sie nur mit dem Schulterblick.',
      'When turning you must let cyclists go first who are going straight on in the same direction, on or beside the road (§ 9(3) StVO). In the blind spot you only see them with a shoulder check.',
    ),
    tip: t('Rechts abbiegen = Schulterblick rechts. Immer.', 'Turning right = right shoulder check. Every time.'),
    scene: {
      road: 'cross',
      actors: [{ kind: 'you', arm: 's', turn: 'right', blinker: 'right' }, { kind: 'bike', at: [62, 74], heading: 0 }],
      markings: ['cycleLane'],
    },
  }),
  q('tu02', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Sie biegen ab. Fußgänger überqueren die Straße, in die Sie einbiegen. Was tun Sie?',
    en: 'You are turning. Pedestrians are crossing the road you are turning into. What do you do?',
    opts: [
      t('Warten, bis sie die Straße überquert haben', 'Wait until they have crossed'),
      t('Langsam zwischen ihnen hindurchfahren', 'Edge slowly through between them'),
      t('Hupen, damit sie sich beeilen', 'Sound the horn so they hurry'),
    ],
    ok: [0],
    why: t(
      'Auf Fußgänger muss beim Abbiegen besondere Rücksicht genommen werden; wenn nötig, muss gewartet werden (§ 9 Abs. 3 StVO).',
      'When turning you must take special care of pedestrians and wait if necessary (§ 9(3) StVO).',
    ),
    tip: null,
    scene: {
      road: 'cross',
      actors: [{ kind: 'you', arm: 's', turn: 'right', blinker: 'right' }, { kind: 'ped', at: [68, 47], heading: 0 }, { kind: 'child', at: [68, 53], heading: 0 }],
    },
  }),
  q('tu03', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Wie ordnen Sie sich zum Linksabbiegen ein?',
    en: 'How do you position yourself to turn left?',
    opts: [
      t('Auf einer Straße mit Gegenverkehr bis zur Mitte', 'On a two-way road, up to the centre line'),
      t('In einer Einbahnstraße möglichst weit links', 'In a one-way street, as far left as possible'),
      t('Immer ganz rechts', 'Always on the far right'),
    ],
    ok: [0, 1],
    why: t(
      'Wer links abbiegen will, ordnet sich rechtzeitig möglichst weit links ein: bei Gegenverkehr bis zur Mitte, in Einbahnstraßen bis zum linken Rand (§ 9 Abs. 1 StVO).',
      'To turn left you move as far left as you can in good time: up to the centre with oncoming traffic, up to the left edge in a one-way street (§ 9(1) StVO).',
    ),
    tip: null,
    scene: null,
  }),
  q('tu04', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Was gehört zum Linksabbiegen?',
    en: 'What is part of turning left?',
    opts: [
      t('Rechtzeitig blinken und einordnen', 'Signalling and positioning in good time'),
      t('Vor dem Einordnen in den Spiegel schauen', 'Checking the mirror before moving over'),
      t('Unmittelbar vor dem Abbiegen noch einmal nach hinten schauen', 'One more look behind just before turning'),
    ],
    ok: [0, 1, 2],
    why: t(
      'Beim Linksabbiegen gilt die doppelte Rückschau: vor dem Einordnen und noch einmal unmittelbar vor dem Abbiegen, denn von hinten kann jemand zum Überholen ansetzen (§ 9 Abs. 1 StVO).',
      'Turning left calls for a double look behind: before moving over and again just before turning, because someone may be about to overtake you (§ 9(1) StVO).',
    ),
    tip: t('Spiegel – Blinker – einordnen – Schulterblick – abbiegen.', 'Mirror - signal - position - shoulder check - turn.'),
    scene: null,
  }),
  q('tu05', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Sie wollen in eine Grundstückseinfahrt abbiegen. Was gilt?',
    en: 'You want to turn into a driveway. What applies?',
    opts: [
      t('Eine Gefährdung anderer muss ausgeschlossen sein', 'Any danger to others must be ruled out'),
      t('Wenn nötig, lasse ich mich einweisen', 'If necessary, I get someone to guide me'),
      t('Für mich gelten nur die Abbiegeregeln an Kreuzungen', 'Only the junction turning rules apply to me'),
    ],
    ok: [0, 1],
    why: t(
      'Beim Abbiegen in ein Grundstück, beim Wenden und beim Rückwärtsfahren muss eine Gefährdung anderer ausgeschlossen sein; wenn nötig, muss man sich einweisen lassen (§ 9 Abs. 5 StVO).',
      'Turning into a property, turning round and reversing all require that nobody is endangered; if necessary, get someone to guide you (§ 9(5) StVO).',
    ),
    tip: null,
    scene: null,
  }),
  q('tu06', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Wo ist Wenden verboten?',
    en: 'Where is turning round forbidden?',
    opts: [
      t('Auf Autobahnen und Kraftfahrstraßen', 'On motorways and expressways'),
      t('Wo Zeichen 272 steht', 'Where sign 272 stands'),
      t('In jeder Straße innerorts', 'In every street in town'),
    ],
    ok: [0, 1],
    why: t(
      'Auf Autobahnen und Kraftfahrstraßen sind Wenden und Rückwärtsfahren verboten (§ 18 Abs. 7 StVO). Zeichen 272 verbietet das Wenden ausdrücklich. Sonst ist Wenden erlaubt, wenn niemand gefährdet wird.',
      'Turning round and reversing are forbidden on motorways and expressways (§ 18(7) StVO). Sign 272 bans it expressly. Elsewhere you may turn round as long as nobody is endangered.',
    ),
    tip: null,
    scene: null,
    signs: ['272'],
  }),
  q('tu07', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Sie wollen rückwärts aus einer Parklücke fahren und sehen hinter sich wenig. Was tun Sie?',
    en: 'You want to reverse out of a parking space and can see little behind you. What do you do?',
    opts: [
      t('Langsam fahren, ständig beobachten und mich wenn nötig einweisen lassen', 'Go slowly, keep looking and get someone to guide me if needed'),
      t('Zügig zurücksetzen, damit ich niemanden lange behindere', 'Reverse quickly so I hold nobody up for long'),
      t('Mich nur auf die Rückfahrkamera verlassen', 'Rely only on the reversing camera'),
    ],
    ok: [0],
    why: t(
      'Beim Rückwärtsfahren muss eine Gefährdung anderer ausgeschlossen sein (§ 9 Abs. 5 StVO). Kameras und Sensoren helfen, ersetzen aber nicht den Blick und können Kinder oder niedrige Hindernisse übersehen.',
      'Reversing must not endanger anyone (§ 9(5) StVO). Cameras and sensors help but do not replace looking, and can miss children or low obstacles.',
    ),
    tip: null,
    scene: null,
  }),
  q('tu08', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Wie biegen Sie rechts ab?',
    en: 'How do you turn right?',
    opts: [
      t('Möglichst weit rechts einordnen', 'Keep as far right as possible'),
      t('In weitem Bogen über die Mitte der Querstraße', 'In a wide arc across the middle of the cross street'),
      t('Ohne zu blinken, wenn die Straße frei ist', 'Without signalling if the road is clear'),
    ],
    ok: [0],
    why: t(
      'Rechtsabbieger halten sich möglichst weit rechts (§ 9 Abs. 1 StVO) und biegen in engem Bogen ab. Geblinkt wird immer, auch wenn Sie niemanden sehen.',
      'Right-turners keep as far right as possible (§ 9(1) StVO) and turn in a tight arc. You always signal, even when you see nobody.',
    ),
    tip: null,
    scene: null,
  }),
  q('tu09', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Sie wollen abbiegen. Neben Ihnen fährt in gleicher Richtung eine Straßenbahn geradeaus. Wer fährt zuerst?',
    en: 'You want to turn. A tram beside you is going straight on in the same direction. Who goes first?',
    opts: [
      t('Die Straßenbahn', 'The tram'),
      t('Ich, weil ich zuerst geblinkt habe', 'I do, because I signalled first'),
      t('Wer schneller ist', 'Whoever is faster'),
    ],
    ok: [0],
    why: t(
      'Abbiegende müssen Schienenfahrzeuge durchfahren lassen, auch wenn diese in gleicher Richtung neben ihnen fahren (§ 9 Abs. 3 StVO).',
      'Turning vehicles must let rail vehicles go first, even when these are going the same way alongside them (§ 9(3) StVO).',
    ),
    tip: null,
    scene: null,
  }),
  q('tu10', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Wann blinken Sie?',
    en: 'When do you signal?',
    opts: [
      t('Rechtzeitig vor dem Abbiegen', 'In good time before turning'),
      t('Vor jedem Fahrstreifenwechsel', 'Before every lane change'),
      t('Erst, wenn ich schon abbiege', 'Only once I am already turning'),
    ],
    ok: [0, 1],
    why: t(
      'Der Blinker kündigt an, was Sie vorhaben – also vorher, nicht währenddessen. Beim Abbiegen, beim Fahrstreifenwechsel und beim Anfahren vom Fahrbahnrand.',
      'Signalling announces what you are about to do - beforehand, not during it. When turning, changing lanes and pulling away from the kerb.',
    ),
    tip: null,
    scene: null,
  }),
];
