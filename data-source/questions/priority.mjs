import { q, t } from './_q.mjs';

/**
 * Vorfahrt und Vorrang (catalogue section 1.3). Every one of these is a
 * five-point question in spirit: get two of them wrong and the test is lost,
 * whatever else you scored. Rules quoted are StVO §§ 8, 9, 9a and 10.
 */
export default [
  q('pr01', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Sie wollen geradeaus fahren. An der Kreuzung stehen keine Verkehrszeichen. Wer hat Vorfahrt?',
    en: 'You want to go straight on. There are no signs at this junction. Who has right of way?',
    opts: [
      t('Der Pkw von rechts', 'The car from the right'),
      t('Ich, weil ich geradeaus fahre', 'I do, because I am going straight on'),
      t('Wer zuerst an der Kreuzung ist', 'Whoever reaches the junction first'),
    ],
    ok: [0],
    why: t(
      'Ohne Verkehrszeichen und Ampeln gilt „rechts vor links“ (§ 8 Abs. 1 StVO). Der Pkw kommt von Ihrer rechten Seite, also lassen Sie ihn durchfahren – egal, ob Sie geradeaus fahren oder abbiegen.',
      'With no signs or lights, the rule is "right before left" (rechts vor links, § 8(1) StVO). The car is coming from your right, so you let it go first - whether you are going straight on or turning.',
    ),
    tip: t('Rechts vor links: Wer von rechts kommt, fährt zuerst.', 'Rechts vor links: whoever comes from your right goes first.'),
    scene: { road: 'cross', actors: [{ kind: 'you', arm: 's', turn: 'straight' }, { kind: 'car', arm: 'e', turn: 'straight' }] },
  }),
  q('pr02', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Sie wollen geradeaus fahren. Keine Verkehrszeichen. Müssen Sie den Pkw durchfahren lassen?',
    en: 'You want to go straight on. No signs. Do you have to let the car go first?',
    opts: [
      t('Nein – er kommt von links und muss mich durchfahren lassen', 'No - it comes from the left and has to let me go'),
      t('Ja – er ist näher an der Kreuzung', 'Yes - it is closer to the junction'),
      t('Ja – an Kreuzungen ohne Schilder muss ich immer anhalten', 'Yes - at junctions without signs I always have to stop'),
    ],
    ok: [0],
    why: t(
      'Der Pkw kommt von Ihrer linken Seite. Nach „rechts vor links“ müssen Sie ihn nicht vorlassen – er muss warten. Vorsichtig fahren müssen Sie trotzdem, denn Sie wissen nicht, ob er Sie gesehen hat.',
      'The car is on your left. Under "right before left" it has to wait for you, not the other way round. Drive carefully all the same: you cannot be sure it has seen you.',
    ),
    tip: null,
    scene: { road: 'cross', actors: [{ kind: 'you', arm: 's', turn: 'straight' }, { kind: 'car', arm: 'w', turn: 'straight' }] },
  }),
  q('pr03', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Keine Verkehrszeichen, alle fahren geradeaus. In welcher Reihenfolge fahren die Fahrzeuge?',
    en: 'No signs, everyone is going straight on. In what order do the vehicles go?',
    opts: [t('B, C, A', 'B, C, A'), t('A, B, C', 'A, B, C'), t('C, A, B', 'C, A, B')],
    ok: [0],
    why: t(
      'Für B ist rechts frei, also fährt B zuerst. Der Radfahrer C muss nur B (von seiner Rechten) abwarten. Sie (A) haben C rechts von sich und fahren deshalb zuletzt.',
      'B has nobody on its right, so B goes first. The cyclist C only has to wait for B, who is on its right. You (A) have C on your right, so you go last.',
    ),
    tip: t('Bei mehreren Fahrzeugen: Suche zuerst das, das rechts frei hat.', 'With several vehicles: first find the one whose right-hand side is clear.'),
    scene: {
      road: 'cross',
      actors: [
        { kind: 'you', arm: 's', turn: 'straight', label: 'A' },
        { kind: 'car', arm: 'n', turn: 'straight', label: 'B' },
        { kind: 'bike', arm: 'e', turn: 'straight', label: 'C' },
      ],
    },
  }),
  q('pr04', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Sie wollen links abbiegen, der Gegenverkehr will geradeaus fahren. Wer fährt zuerst?',
    en: 'You want to turn left; the oncoming car wants to go straight on. Who goes first?',
    opts: [
      t('Der entgegenkommende Pkw', 'The oncoming car'),
      t('Ich, weil ich zuerst geblinkt habe', 'I do, because I signalled first'),
      t('Wir fahren gleichzeitig', 'We go at the same time'),
    ],
    ok: [0],
    why: t(
      'Wer links abbiegt, muss entgegenkommende Fahrzeuge durchfahren lassen (§ 9 Abs. 3 StVO). Das gilt an jeder Kreuzung, auch auf der Vorfahrtstraße.',
      'If you turn left, you must let oncoming traffic go first (§ 9(3) StVO). This applies at every junction, even on a priority road.',
    ),
    tip: t('Linksabbieger warten auf den Gegenverkehr.', 'Left-turners wait for oncoming traffic.'),
    scene: {
      road: 'cross',
      actors: [{ kind: 'you', arm: 's', turn: 'left', blinker: 'left' }, { kind: 'car', arm: 'n', turn: 'straight' }],
    },
  }),
  q('pr05', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Sie und der Gegenverkehr wollen beide links abbiegen. Wie biegen Sie ab?',
    en: 'You and the oncoming car both want to turn left. How do you turn?',
    opts: [
      t('Voreinander – jeder biegt vor dem anderen ab', 'In front of each other - each turns ahead of the other'),
      t('Umeinander herum – hinter dem anderen vorbei', 'Around each other - passing behind the other'),
      t('Wer zuerst geblinkt hat, darf zuerst fahren', 'Whoever signalled first goes first'),
    ],
    ok: [0],
    why: t(
      'Linksabbieger aus entgegengesetzten Richtungen biegen voreinander ab (§ 9 Abs. 4 StVO) – es sei denn, die Verkehrslage oder die Gestaltung der Kreuzung verlangt etwas anderes.',
      'Two left-turners facing each other turn in front of each other (§ 9(4) StVO), unless the traffic or the layout of the junction makes that impossible.',
    ),
    tip: null,
    scene: {
      road: 'cross',
      actors: [{ kind: 'you', arm: 's', turn: 'left', blinker: 'left' }, { kind: 'car', arm: 'n', turn: 'left', blinker: 'left' }],
    },
  }),
  q('pr06', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Sie wollen links abbiegen. Wen müssen Sie durchfahren lassen?',
    en: 'You want to turn left. Whom must you let go first?',
    opts: [
      t('Den Pkw von links', 'The car from the left'),
      t('Den Pkw von rechts', 'The car from the right'),
      t('Niemanden, weil ich blinke', 'Nobody, because I am signalling'),
    ],
    ok: [0, 1],
    why: t(
      'Zeichen 205 „Vorfahrt gewähren“ gilt für Ihre Straße. Wer auf der Vorfahrtstraße fährt, hat Vorfahrt – von links und von rechts. Beim Linksabbiegen kreuzen Sie beide Fahrstreifen.',
      'Sign 205 "give way" applies to your road. Everyone on the main road has priority, from the left and from the right. Turning left, you cross both lanes.',
    ),
    tip: null,
    scene: {
      road: 'tee',
      actors: [
        { kind: 'you', arm: 's', turn: 'left', blinker: 'left' },
        { kind: 'car', arm: 'w', turn: 'straight' },
        { kind: 'car', arm: 'e', turn: 'straight' },
      ],
      signs: [{ sign: '205', arm: 's' }],
      markings: ['giveWayLine'],
    },
    signs: ['205'],
  }),
  q('pr07', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Was müssen Sie an diesem Zeichen tun?',
    en: 'What must you do at this sign?',
    opts: [
      t('An der Haltlinie anhalten, auch wenn die Straße frei ist', 'Stop at the stop line, even if the road is clear'),
      t('Vorfahrt gewähren', 'Give way'),
      t('Nur anhalten, wenn ein Fahrzeug kommt', 'Only stop if a vehicle is coming'),
    ],
    ok: [0, 1],
    why: t(
      'Zeichen 206 „Halt. Vorfahrt gewähren.“ verlangt einen vollständigen Halt – die Räder stehen still – an der Haltlinie, oder wo keine ist, dort, wo die Straße einzusehen ist. Danach gewähren Sie Vorfahrt.',
      'Sign 206 "Stop. Give way." requires a full stop - wheels not turning - at the stop line, or where there is none, where you can see the road. Then you give way.',
    ),
    tip: t('STOP heißt: Räder stehen still. Rollen reicht nicht.', 'STOP means the wheels stand still. Rolling through is not enough.'),
    scene: {
      road: 'tee',
      actors: [{ kind: 'you', arm: 's', turn: 'right', blinker: 'right' }],
      signs: [{ sign: '206', arm: 's' }],
      markings: ['stopLine'],
    },
    signs: ['206'],
  }),
  q('pr08', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Sie fahren geradeaus. Wer hat Vorfahrt?',
    en: 'You are going straight on. Who has right of way?',
    opts: [
      t('Ich', 'I do'),
      t('Der Pkw von rechts', 'The car from the right'),
      t('Wer zuerst da ist', 'Whoever gets there first'),
    ],
    ok: [0],
    why: t(
      'Sie fahren auf einer Vorfahrtstraße (Zeichen 306), die Seitenstraße hat Zeichen 205. Damit gilt „rechts vor links“ hier nicht – der Pkw muss warten.',
      'You are on a priority road (sign 306); the side road has sign 205. "Right before left" does not apply here - the car has to wait.',
    ),
    tip: null,
    scene: {
      road: 'cross',
      actors: [{ kind: 'you', arm: 's', turn: 'straight' }, { kind: 'car', arm: 'e', turn: 'straight' }],
      signs: [{ sign: '306', arm: 's' }, { sign: '205', arm: 'e' }],
      markings: ['giveWayLine:e', 'giveWayLine:w'],
    },
    signs: ['306'],
  }),
  q('pr09', {
    pts: 4, sec: '1.3', basic: true,
    de: 'Wie weit reicht die Vorfahrt, die dieses Zeichen gibt?',
    en: 'How far does the priority given by this sign reach?',
    opts: [
      t('Nur bis zur nächsten Kreuzung oder Einmündung', 'Only to the next junction'),
      t('Bis zum Ende der Ortschaft', 'Until the end of the town'),
      t('Bis zum Zeichen „Ende der Vorfahrtstraße“', 'Until the "end of priority road" sign'),
    ],
    ok: [0],
    why: t(
      'Zeichen 301 gibt Vorfahrt nur an der nächsten Kreuzung oder Einmündung. Für eine ganze Strecke gilt nur die Vorfahrtstraße (Zeichen 306).',
      'Sign 301 gives you priority at the next junction only. Priority along a whole stretch comes only from the priority road sign (306).',
    ),
    tip: t('301 = einmal. 306 = dauerhaft.', '301 = once. 306 = all the way.'),
    scene: null,
    signs: ['301'],
  }),
  q('pr10', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Sie folgen der abknickenden Vorfahrtstraße nach links. Was müssen Sie tun?',
    en: 'You are following the priority road as it bends to the left. What must you do?',
    opts: [
      t('Links blinken', 'Signal left'),
      t('Auf Fußgänger achten, die die Straße überqueren', 'Watch out for pedestrians crossing the road'),
      t('Nicht blinken, weil ich auf der Vorfahrtstraße bleibe', 'Not signal, because I stay on the priority road'),
    ],
    ok: [0, 1],
    why: t(
      'Wer der abknickenden Vorfahrt folgt, muss das rechtzeitig mit dem Blinker anzeigen und auf Fußgänger besondere Rücksicht nehmen; wenn nötig, warten (Zusatzzeichen 1002 zu Zeichen 306).',
      'If you follow a bending priority road you must signal in good time and take special care of pedestrians, waiting if necessary (supplementary sign 1002 under sign 306).',
    ),
    tip: t('Der Blinker folgt der Kurve, nicht dem Schild.', 'Your indicator follows the bend, not the sign.'),
    scene: {
      road: 'cross',
      priorityPath: ['s', 'w'],
      actors: [{ kind: 'you', arm: 's', turn: 'left', blinker: 'left' }, { kind: 'ped', at: [30, 37], heading: 0 }],
      signs: [{ sign: '306', arm: 's', extra: '1002' }],
    },
    signs: ['306', '1002'],
  }),
  q('pr11', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Die Vorfahrtstraße knickt ab (gelb markiert). Sie wollen geradeaus fahren. Wen lassen Sie durchfahren?',
    en: 'The priority road bends (shown in yellow). You want to go straight on. Whom do you let go first?',
    opts: [
      t('Den Pkw A', 'Car A'),
      t('Niemanden – ich fahre ja geradeaus', 'Nobody - I am going straight on'),
      t('Nur Fahrzeuge von rechts', 'Only vehicles from the right'),
    ],
    ok: [0],
    why: t(
      'Sie stehen an der Seitenstraße (Zeichen 205). Pkw A fährt auf der Vorfahrtstraße und biegt mit ihr ab – sein Weg kreuzt Ihren. Geradeaus fahren gibt Ihnen keine Vorfahrt.',
      'You are on the side road (sign 205). Car A is on the priority road and follows its bend, crossing your path. Going straight on gives you no priority.',
    ),
    tip: null,
    scene: {
      road: 'cross',
      priorityPath: ['w', 'n'],
      actors: [
        { kind: 'you', arm: 's', turn: 'straight' },
        { kind: 'car', arm: 'w', turn: 'left', blinker: 'left', label: 'A' },
      ],
      signs: [{ sign: '205', arm: 's', extra: '1002' }],
      markings: ['giveWayLine'],
    },
    signs: ['205'],
  }),
  q('pr12', {
    pts: 4, sec: '1.3', basic: true,
    de: 'Sie fahren aus einer Grundstücksausfahrt auf die Straße. Was gilt?',
    en: 'You are pulling out of a driveway onto the road. What applies?',
    opts: [
      t('Ich muss den Verkehr auf der Straße durchfahren lassen', 'I must let traffic on the road go first'),
      t('Eine Gefährdung anderer muss ausgeschlossen sein', 'Any danger to others must be ruled out'),
      t('„Rechts vor links“ gilt auch hier', '"Right before left" applies here too'),
    ],
    ok: [0, 1],
    why: t(
      'Wer aus einem Grundstück, einem verkehrsberuhigten Bereich oder vom Fahrbahnrand losfährt, muss sich so verhalten, dass eine Gefährdung anderer ausgeschlossen ist – notfalls mit Einweiser (§ 10 StVO). „Rechts vor links“ gilt dabei nicht.',
      'Anyone leaving a property, a traffic-calmed area or the kerb must make sure nobody is endangered - with someone guiding them if needed (§ 10 StVO). "Right before left" does not help you here.',
    ),
    tip: null,
    scene: null,
  }),
  q('pr13', {
    pts: 4, sec: '1.3', basic: true,
    de: 'Sie kommen aus einem Feldweg auf eine Straße ohne Verkehrszeichen. Ein Pkw kommt von links. Wer hat Vorfahrt?',
    en: 'You come out of a farm track onto a road with no signs. A car is coming from the left. Who has right of way?',
    opts: [
      t('Der Pkw', 'The car'),
      t('Ich – ich komme von rechts', 'I do - I am coming from its right'),
      t('Wer langsamer fährt', 'Whoever is slower'),
    ],
    ok: [0],
    why: t(
      'Wer aus einem Feld- oder Waldweg kommt, hat keine Vorfahrt (§ 8 Abs. 1 StVO) – auch nicht gegenüber Verkehr von links.',
      'Coming out of a farm or forest track you never have right of way (§ 8(1) StVO), not even over traffic from the left.',
    ),
    tip: null,
    scene: {
      road: 'tee',
      actors: [{ kind: 'you', arm: 's', turn: 'right', blinker: 'right' }, { kind: 'car', arm: 'w', turn: 'straight' }],
    },
  }),
  q('pr14', {
    pts: 4, sec: '1.3', basic: true,
    de: 'Was gilt in diesem Kreisverkehr?',
    en: 'What applies at this roundabout?',
    opts: [
      t('Fahrzeuge im Kreisverkehr haben Vorfahrt', 'Vehicles already on the roundabout have right of way'),
      t('Beim Einfahren nicht blinken', 'Do not signal when entering'),
      t('Beim Ausfahren rechts blinken', 'Signal right when leaving'),
    ],
    ok: [0, 1, 2],
    why: t(
      'Steht Zeichen 215 unter Zeichen 205, hat der Verkehr auf der Kreisfahrbahn Vorfahrt. Blinken beim Einfahren ist verboten, beim Ausfahren Pflicht. Halten im Kreisverkehr ist verboten (§ 9a StVO).',
      'With sign 215 under sign 205, traffic on the roundabout has priority. Signalling on the way in is not allowed; signalling on the way out is required. Stopping on the roundabout is forbidden (§ 9a StVO).',
    ),
    tip: t('Rein ohne Blinker, raus mit Blinker.', 'In without indicating, out with it.'),
    scene: {
      road: 'roundabout',
      actors: [{ kind: 'you', arm: 's' }, { kind: 'car', at: [27, 56], heading: 170 }],
      signs: [{ sign: '215', arm: 's', extra: '205' }],
    },
    signs: ['215', '205'],
  }),
  q('pr15', {
    pts: 5, sec: '1.3', basic: true,
    de: 'An diesem Kreisel stehen keine Verkehrszeichen. Wer hat Vorfahrt?',
    en: 'There are no signs at this circle. Who has right of way?',
    opts: [
      t('Ich – der Pkw im Kreisel kommt von links', 'I do - the car on the circle is coming from my left'),
      t('Der Pkw im Kreisel', 'The car on the circle'),
      t('Wer zuerst blinkt', 'Whoever signals first'),
    ],
    ok: [0],
    why: t(
      'Ohne Zeichen 215 ist es kein Kreisverkehr im Sinne von § 9a StVO, sondern eine normale Kreuzung. Dann gilt „rechts vor links“ – der Verkehr im Kreisel muss Sie hineinlassen.',
      'Without sign 215 this is not a roundabout in the sense of § 9a StVO but an ordinary junction. "Right before left" applies, so the traffic on the circle has to let you in.',
    ),
    tip: t('Kein blaues Kreisverkehr-Schild = rechts vor links.', 'No blue roundabout sign = right before left.'),
    scene: { road: 'roundabout', actors: [{ kind: 'you', arm: 's' }, { kind: 'car', at: [27, 56], heading: 170 }] },
  }),
  q('pr16', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Sie fahren auf der durchgehenden Straße geradeaus. Es gibt keine Verkehrszeichen. Wer hat Vorfahrt?',
    en: 'You are going straight on along the through road. There are no signs. Who has right of way?',
    opts: [
      t('Der Pkw aus der Einmündung rechts', 'The car coming out of the side road on the right'),
      t('Ich – ich bin auf der durchgehenden Straße', 'I do - I am on the through road'),
      t('Wer schneller ist', 'Whoever is faster'),
    ],
    ok: [0],
    why: t(
      'Eine durchgehende Straße ist ohne Zeichen keine Vorfahrtstraße. An Einmündungen gilt dann ebenfalls „rechts vor links“ – der Pkw kommt von Ihrer rechten Seite.',
      'A road that carries straight on is not a priority road without a sign. "Right before left" applies at T-junctions too, and the car is on your right.',
    ),
    tip: t('Breiter oder durchgehend heißt nicht Vorfahrt.', 'Wider or straighter does not mean priority.'),
    scene: {
      road: 'tee',
      actors: [{ kind: 'you', arm: 'w', turn: 'straight' }, { kind: 'car', arm: 's', turn: 'left', blinker: 'left' }],
    },
  }),
  q('pr17', {
    pts: 5, sec: '1.3', basic: true,
    de: 'In welcher Reihenfolge fahren die Fahrzeuge?',
    en: 'In what order do the vehicles go?',
    opts: [t('C, A, B', 'C, A, B'), t('A, B, C', 'A, B, C'), t('C, B, A', 'C, B, A')],
    ok: [0],
    why: t(
      'C fährt auf der Vorfahrtstraße und darf zuerst. A und B stehen sich an den Seitenstraßen gegenüber; B biegt links ab und muss den geradeaus fahrenden Gegenverkehr A durchlassen.',
      'C is on the priority road and goes first. A and B face each other on the side roads; B is turning left and has to let A, coming the other way and going straight, go first.',
    ),
    tip: null,
    scene: {
      road: 'cross',
      actors: [
        { kind: 'you', arm: 's', turn: 'straight', label: 'A' },
        { kind: 'car', arm: 'n', turn: 'left', blinker: 'left', label: 'B' },
        { kind: 'truck', arm: 'e', turn: 'straight', label: 'C' },
      ],
      signs: [{ sign: '205', arm: 's' }, { sign: '205', arm: 'n' }, { sign: '306', arm: 'e' }],
      markings: ['giveWayLine', 'giveWayLine:n'],
    },
  }),
  q('pr18', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Sie fahren auf der Vorfahrtstraße und wollen links abbiegen. Wer muss warten?',
    en: 'You are on the priority road and want to turn left. Who has to wait?',
    opts: [
      t('Ich', 'I do'),
      t('Der entgegenkommende Pkw', 'The oncoming car'),
      t('Niemand, wir sind beide auf der Vorfahrtstraße', 'Nobody, we are both on the priority road'),
    ],
    ok: [0],
    why: t(
      'Die Vorfahrtstraße regelt nur das Verhältnis zu den Seitenstraßen. Untereinander gelten die Abbiegeregeln: Wer links abbiegt, lässt den Gegenverkehr durch (§ 9 Abs. 3 StVO).',
      'A priority road only settles who goes first relative to the side roads. Between vehicles on it, the turning rules apply: a left-turner lets oncoming traffic through (§ 9(3) StVO).',
    ),
    tip: null,
    scene: {
      road: 'cross',
      actors: [{ kind: 'you', arm: 's', turn: 'left', blinker: 'left' }, { kind: 'car', arm: 'n', turn: 'straight' }],
      signs: [{ sign: '306', arm: 's' }, { sign: '306', arm: 'n' }],
    },
  }),
  q('pr19', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Sie wollen rechts abbiegen. Was beachten Sie bei diesem Zeichen?',
    en: 'You want to turn right. What does this sign mean for you?',
    opts: [
      t('Ich muss dem Verkehr von links Vorfahrt gewähren', 'I must give way to traffic from the left'),
      t('Ich habe Vorfahrt, weil ich rechts abbiege', 'I have priority because I am turning right'),
      t('Ich darf ohne zu schauen einfahren', 'I may pull out without looking'),
    ],
    ok: [0],
    why: t(
      'Zeichen 205 bedeutet: Vorfahrt gewähren. Beim Rechtsabbiegen fahren Sie in den Fahrstreifen ein, auf dem der Verkehr von links kommt – den müssen Sie durchlassen.',
      'Sign 205 means give way. Turning right, you join the lane that traffic from your left is driving in, so you must let it pass.',
    ),
    tip: null,
    scene: {
      road: 'tee',
      actors: [{ kind: 'you', arm: 's', turn: 'right', blinker: 'right' }, { kind: 'moto', arm: 'w', turn: 'straight' }],
      signs: [{ sign: '205', arm: 's' }],
      markings: ['giveWayLine'],
    },
    signs: ['205'],
  }),
  q('pr20', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Keine Verkehrszeichen. Sie wollen links abbiegen. In welcher Reihenfolge wird gefahren?',
    en: 'No signs. You want to turn left. In what order do the vehicles go?',
    opts: [t('B, A', 'B, A'), t('A, B', 'A, B'), t('Gleichzeitig', 'At the same time')],
    ok: [0],
    why: t(
      'B kommt von rechts und hat nach „rechts vor links“ Vorfahrt. Dass Sie abbiegen und nicht geradeaus fahren, ändert daran nichts: B fährt geradeaus und kreuzt Ihren Weg.',
      'B is coming from your right and has priority under "right before left". It makes no difference that you are turning rather than going straight on: B crosses your path.',
    ),
    tip: null,
    scene: {
      road: 'cross',
      actors: [
        { kind: 'you', arm: 's', turn: 'left', blinker: 'left', label: 'A' },
        { kind: 'car', arm: 'e', turn: 'straight', label: 'B' },
      ],
    },
  }),
];
