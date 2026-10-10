import { q, t } from './_q.mjs';

/** Grundregeln und Straßenbenutzung. StVO §§ 2, 7, 11, 16. */
export default [
  q('ba01', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Auf welcher Seite der Fahrbahn fahren Sie?',
    en: 'Which side of the road do you drive on?',
    opts: [
      t('Möglichst weit rechts', 'As far right as reasonably possible'),
      t('In der Mitte, damit ich Abstand zum Rand habe', 'In the middle, to keep away from the edge'),
      t('Wo es gerade am bequemsten ist', 'Wherever is most comfortable'),
    ],
    ok: [0],
    why: t(
      'Es gilt das Rechtsfahrgebot: möglichst weit rechts fahren, nicht nur bei Gegenverkehr und beim Überholtwerden, sondern auch auf freier Strecke und an Kuppen (§ 2 Abs. 2 StVO).',
      'Germany has a keep-right rule: as far right as is reasonable - not only for oncoming traffic or when being overtaken, but on an empty road and over crests too (§ 2(2) StVO).',
    ),
    tip: null,
    scene: null,
  }),
  q('ba02', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Ein Fahrstreifen endet. Wie wechseln Sie die Spur?',
    en: 'A lane is ending. How do you change lanes?',
    opts: [
      t('Im Reißverschlussverfahren unmittelbar vor der Engstelle', 'Zip-merge, just before the narrowing'),
      t('So früh wie möglich, auch wenn die Spur noch lange weitergeht', 'As early as possible, even if the lane carries on for a long way'),
      t('Wer auf der durchgehenden Spur fährt, muss niemanden hereinlassen', 'Drivers in the continuing lane need not let anyone in'),
    ],
    ok: [0],
    why: t(
      'Endet ein Fahrstreifen oder ist er blockiert, wird abwechselnd eingefädelt – je ein Fahrzeug, unmittelbar vor Beginn der Verengung (§ 7 Abs. 4 StVO). Die durchgehende Spur muss das ermöglichen.',
      'Where a lane ends or is blocked, traffic merges alternately, one car at a time, right at the start of the narrowing (§ 7(4) StVO). The continuing lane must let that happen.',
    ),
    tip: t('Bis zum Ende fahren, dann einer nach dem anderen.', 'Drive to the end, then one by one.'),
    scene: {
      road: 'motorway',
      actors: [
        { kind: 'you', at: [50, 78], heading: 0, blinker: 'left' },
        { kind: 'car', at: [38, 66], heading: 0 },
        { kind: 'car', at: [38, 86], heading: 0 },
        { kind: 'truck', at: [50, 40], heading: 0, blinker: 'hazard' },
      ],
    },
  }),
  q('ba03', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Was müssen Sie vor einem Fahrstreifenwechsel tun?',
    en: 'What must you do before changing lanes?',
    opts: [
      t('In den Spiegel und über die Schulter schauen', 'Check the mirror and over your shoulder'),
      t('Rechtzeitig blinken', 'Signal in good time'),
      t('Kurz hupen', 'Give a short toot'),
    ],
    ok: [0, 1],
    why: t(
      'Ein Fahrstreifenwechsel ist nur erlaubt, wenn eine Gefährdung anderer ausgeschlossen ist; er ist rechtzeitig und deutlich anzukündigen (§ 7 Abs. 5 StVO). Im toten Winkel hilft nur der Schulterblick.',
      'A lane change is only allowed if nobody can be endangered, and must be signalled clearly and in good time (§ 7(5) StVO). Only a shoulder check covers the blind spot.',
    ),
    tip: null,
    scene: null,
  }),
  q('ba04', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Wann dürfen Sie hupen?',
    en: 'When may you use the horn?',
    opts: [
      t('Um andere vor einer Gefahr zu warnen', 'To warn others of danger'),
      t('Außerorts, um ein Überholen anzukündigen', 'Outside town, to announce that you are overtaking'),
      t('Um einen Bekannten zu grüßen', 'To greet a friend'),
    ],
    ok: [0, 1],
    why: t(
      'Schall- und Leuchtzeichen darf nur geben, wer außerorts überholen will oder wer sich oder andere gefährdet sieht (§ 16 Abs. 1 StVO). Grüßen, Drängeln oder Ärger zeigen gehören nicht dazu.',
      'Horn and headlight flashes are only for announcing an overtake outside town, or when you or others are in danger (§ 16(1) StVO). Greeting, hurrying people along or venting do not count.',
    ),
    tip: null,
    scene: null,
  }),
  q('ba05', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Wann dürfen Sie das Warnblinklicht einschalten?',
    en: 'When may you switch on the hazard lights?',
    opts: [
      t('Wenn ich liegen geblieben bin oder abgeschleppt werde', 'When I have broken down or am being towed'),
      t('Wenn ich andere vor einer Gefahr warne, z. B. am Stauende', 'To warn others of danger, for example at the tail of a queue'),
      t('Wenn ich kurz in der zweiten Reihe parke', 'When I double-park briefly'),
    ],
    ok: [0, 1],
    why: t(
      'Warnblinklicht ist für Pannen, Abschleppen, Schulbusse an Haltestellen und zur Warnung vor Gefahren wie einem Stauende (§ 16 Abs. 2 StVO). Ein Freibrief zum Falschparken ist es nicht.',
      'Hazard lights are for breakdowns, towing, school buses at stops and warning of dangers such as a queue ahead (§ 16(2) StVO). They are no licence to park illegally.',
    ),
    tip: null,
    scene: null,
  }),
  q('ba06', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Dürfen Sie innerorts auf einer Straße mit zwei markierten Fahrstreifen in Ihre Richtung den Fahrstreifen frei wählen?',
    en: 'In town, on a road with two marked lanes in your direction, may you choose either lane?',
    opts: [
      t('Ja, mit einem Pkw', 'Yes, in a car'),
      t('Nein, ich muss immer rechts fahren', 'No, I must always keep right'),
      t('Nur zum Überholen', 'Only to overtake'),
    ],
    ok: [0],
    why: t(
      'Innerorts dürfen Kraftfahrzeuge bis 3,5 t auf Fahrbahnen mit mehreren markierten Fahrstreifen in eine Richtung den Fahrstreifen frei wählen (§ 7 Abs. 3 StVO). Unnötiges Hin- und Herwechseln bleibt verboten.',
      'In town, motor vehicles up to 3.5 t may freely choose their lane on roads with several marked lanes in one direction (§ 7(3) StVO). Weaving between lanes is still forbidden.',
    ),
    tip: null,
    scene: null,
  }),
  q('ba07', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Was ist mit unklarer Verkehrslage gemeint?',
    en: 'What is meant by an unclear traffic situation?',
    opts: [
      t('Ich kann nicht sicher einschätzen, was andere als Nächstes tun', 'I cannot reliably tell what others will do next'),
      t('Es ist Nacht', 'It is night-time'),
      t('Die Straße ist breit', 'The road is wide'),
    ],
    ok: [0],
    why: t(
      'Unklar ist eine Lage, wenn Sie nicht sicher beurteilen können, wie sich andere verhalten – z. B. ein Fahrzeug blinkt links, ordnet sich aber nicht ein. Dann ist Überholen verboten und Bremsbereitschaft gefragt.',
      'A situation is unclear when you cannot reliably judge what others will do - say, a car signals left but does not move over. Then overtaking is forbidden and you should be ready to brake.',
    ),
    tip: null,
    scene: null,
  }),
  q('ba08', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Was gehört zu einer vorausschauenden Fahrweise?',
    en: 'What is part of driving with anticipation?',
    opts: [
      t('Weit nach vorne schauen, nicht nur auf das Auto direkt vor mir', 'Looking far ahead, not just at the car in front'),
      t('Regelmäßig in die Spiegel schauen', 'Checking the mirrors regularly'),
      t('Möglichst dicht auffahren, um schneller zu reagieren', 'Driving as close as possible to react faster'),
    ],
    ok: [0, 1],
    why: t(
      'Wer weit vorausschaut und weiß, was hinter ihm passiert, erkennt Gefahren früh und kann sanft reagieren. Dichtes Auffahren nimmt Ihnen genau diese Zeit.',
      'Looking far ahead and knowing what is behind you lets you spot hazards early and react smoothly. Tailgating takes that time away.',
    ),
    tip: null,
    scene: null,
  }),
];
