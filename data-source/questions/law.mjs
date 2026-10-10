import { q, t } from './_q.mjs';

/**
 * Pflichten, Unfall, Dokumente, Probezeit und Punkte. Figures for fines and
 * points follow the Bußgeldkatalog in force in 2026; they change more often
 * than the rules, so the questions ask about the principle wherever possible.
 */
export default [
  q('la01', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Was verlangt die Grundregel des § 1 StVO?',
    en: 'What does the basic rule in § 1 StVO demand?',
    opts: [
      t('Ständige Vorsicht und gegenseitige Rücksicht', 'Constant care and mutual consideration'),
      t('Niemand darf geschädigt, gefährdet oder mehr als unvermeidbar behindert oder belästigt werden', 'Nobody may be harmed, endangered, or obstructed or inconvenienced more than is unavoidable'),
      t('Wer Vorfahrt hat, darf sie durchsetzen', 'Whoever has priority may insist on it'),
    ],
    ok: [0, 1],
    why: t(
      '§ 1 StVO steht über allen anderen Regeln: ständige Vorsicht und gegenseitige Rücksicht. Vorfahrt ist ein Recht, das man nicht erzwingen darf, wenn der andere es erkennbar missachtet.',
      '§ 1 StVO sits above every other rule: constant care and mutual consideration. Priority is a right you may not force when the other driver is plainly ignoring it.',
    ),
    tip: t('Recht haben heißt nicht, es durchsetzen.', 'Being in the right does not mean forcing it.'),
    scene: null,
  }),
  q('la02', {
    pts: 5, sec: '1.2', basic: true,
    de: 'Sie kommen an einen Unfall mit Verletzten. Was tun Sie zuerst?',
    en: 'You come across an accident with injured people. What do you do first?',
    opts: [
      t('Die Unfallstelle sichern', 'Secure the scene'),
      t('Den Notruf 112 wählen und Erste Hilfe leisten', 'Call 112 and give first aid'),
      t('Weiterfahren, es halten sicher schon andere', 'Drive on - someone else will surely stop'),
    ],
    ok: [0, 1],
    why: t(
      'Warnblinklicht, Warnweste, Warndreieck: Erst sichern, damit niemand Zweites verunglückt. Dann 112 und Erste Hilfe. Wer nicht hilft, obwohl es zumutbar ist, macht sich strafbar (§ 323c StGB).',
      'Hazards, vest, triangle: secure the scene first so nobody else crashes. Then 112 and first aid. Failing to help when you reasonably could is a crime (§ 323c StGB).',
    ),
    tip: t('Sichern – Notruf – Helfen.', 'Secure - call - help.'),
    scene: null,
  }),
  q('la03', {
    pts: 5, sec: '1.2', basic: true,
    de: 'Sie haben beim Ausparken ein anderes Auto beschädigt. Der Besitzer ist nicht da. Was tun Sie?',
    en: 'You have damaged another car while pulling out of a space. The owner is not there. What do you do?',
    opts: [
      t('Eine angemessene Zeit warten und, wenn niemand kommt, die Polizei verständigen', 'Wait a reasonable time and, if nobody comes, inform the police'),
      t('Einen Zettel mit meiner Nummer an die Scheibe klemmen und wegfahren', 'Leave a note with my number under the wiper and drive off'),
      t('Wegfahren, der Schaden ist klein', 'Drive off - the damage is minor'),
    ],
    ok: [0],
    why: t(
      'Wer sich vom Unfallort entfernt, ohne die Feststellungen zu ermöglichen, begeht eine Straftat (§ 142 StGB, „Unfallflucht“). Ein Zettel reicht nicht. Warten Sie angemessen und melden Sie den Unfall dann unverzüglich der Polizei.',
      'Leaving the scene without enabling the facts to be recorded is a crime (§ 142 StGB, hit-and-run). A note is not enough. Wait a reasonable time, then report it to the police without delay.',
    ),
    tip: t('Zettel ist keine Meldung.', 'A note is not a report.'),
    scene: null,
  }),
  q('la04', {
    pts: 3, sec: '2.6', basic: false,
    de: 'Welche Dokumente müssen Sie beim Fahren dabeihaben?',
    en: 'Which documents must you carry when driving?',
    opts: [
      t('Den Führerschein', 'My driving licence'),
      t('Die Zulassungsbescheinigung Teil I (Fahrzeugschein)', 'The registration certificate part I (Fahrzeugschein)'),
      t('Den Kaufvertrag des Autos', 'The car’s purchase contract'),
    ],
    ok: [0, 1],
    why: t(
      'Führerschein und Zulassungsbescheinigung Teil I müssen Sie mitführen und auf Verlangen aushändigen. Die Zulassungsbescheinigung Teil II (Fahrzeugbrief) gehört nicht ins Auto.',
      'You must carry your licence and the registration certificate part I and hand them over on request. Part II (the title document) does not belong in the car.',
    ),
    tip: null,
    scene: null,
  }),
  q('la05', {
    pts: 4, sec: '2.2', basic: false,
    de: 'Wie viele Jahre dauert die Probezeit für Fahranfänger normalerweise?',
    en: 'How many years does the probation period for new drivers normally last?',
    kind: 'number', num: 2, unit: null,
    why: t(
      'Die Probezeit dauert zwei Jahre ab Erteilung der ersten Fahrerlaubnis. Nach einem schwerwiegenden (A-)Verstoß oder zwei weniger schwerwiegenden (B-)Verstößen müssen Sie ein Aufbauseminar besuchen, und die Probezeit verlängert sich auf vier Jahre (§ 2a StVG).',
      'Probation lasts two years from your first licence. After one serious (A) offence or two less serious (B) offences you must attend a remedial course and probation is extended to four years (§ 2a StVG).',
    ),
    tip: null,
    scene: null,
  }),
  q('la06', {
    pts: 4, sec: '2.2', basic: false,
    de: 'Welcher Verstoß ist in der Probezeit schwerwiegend (A-Verstoß)?',
    en: 'Which offence counts as serious (category A) during probation?',
    opts: [
      t('Mehr als 20 km/h zu schnell', 'More than 20 km/h over the limit'),
      t('Überfahren einer roten Ampel', 'Running a red light'),
      t('Fahren ohne Warnweste im Auto', 'Driving without a hi-vis vest in the car'),
    ],
    ok: [0, 1],
    why: t(
      'A-Verstöße sind u. a. Geschwindigkeitsüberschreitungen ab 21 km/h, Rotlichtverstöße, Vorfahrtsverletzungen, gefährliches Überholen, Alkohol oder Cannabis am Steuer. Schon einer führt zum Aufbauseminar.',
      'Category A includes speeding by 21 km/h or more, red-light offences, right-of-way violations, dangerous overtaking, alcohol or cannabis at the wheel. A single one means a remedial course.',
    ),
    tip: null,
    scene: null,
  }),
  q('la07', {
    pts: 3, sec: '2.2', basic: false,
    de: 'Bei wie vielen Punkten im Fahreignungsregister wird die Fahrerlaubnis entzogen?',
    en: 'At how many points in the driving register is your licence withdrawn?',
    kind: 'number', num: 8, unit: null,
    why: t(
      'Das Fahreignungsregister in Flensburg arbeitet mit einem Stufensystem: 4-5 Punkte Ermahnung, 6-7 Punkte Verwarnung, ab 8 Punkten wird die Fahrerlaubnis entzogen.',
      'The driving register in Flensburg works in steps: 4-5 points a reminder, 6-7 a warning, and at 8 points your licence is withdrawn.',
    ),
    tip: null,
    scene: null,
  }),
  q('la08', {
    pts: 4, sec: '2.2', basic: false,
    de: 'Was droht, wenn Sie eine Ampel überfahren, die schon länger als eine Sekunde Rot zeigt?',
    en: 'What do you face for running a light that has been red for more than one second?',
    opts: [
      t('Ein Fahrverbot von einem Monat', 'A one-month driving ban'),
      t('Zwei Punkte im Fahreignungsregister', 'Two points in the driving register'),
      t('Nur eine Verwarnung', 'Only a caution'),
    ],
    ok: [0, 1],
    why: t(
      'Der „qualifizierte Rotlichtverstoß“ (über 1 Sekunde Rot) kostet nach Bußgeldkatalog 200 €, 2 Punkte und einen Monat Fahrverbot – in der Probezeit zusätzlich Aufbauseminar und Verlängerung.',
      'A "qualified" red-light offence (red for over a second) costs €200, 2 points and a one-month ban under the fines catalogue - plus a course and extension if you are on probation.',
    ),
    tip: null,
    scene: null,
  }),
  q('la09', {
    pts: 3, sec: '2.6', basic: false,
    de: 'Wer ist dafür verantwortlich, dass das Fahrzeug verkehrssicher ist, wenn Sie losfahren?',
    en: 'Who is responsible for the vehicle being roadworthy when you set off?',
    opts: [
      t('Ich als Fahrer', 'I am, as the driver'),
      t('Nur der Halter', 'Only the registered keeper'),
      t('Die Werkstatt', 'The garage'),
    ],
    ok: [0],
    why: t(
      'Wer ein Fahrzeug führt, ist dafür verantwortlich, dass es, die Ladung und die Besetzung vorschriftsmäßig sind und die Verkehrssicherheit nicht leidet (§ 23 Abs. 1 StVO). Der Halter haftet zusätzlich.',
      'The driver is responsible for the vehicle, its load and its occupants being in order and roadworthy (§ 23(1) StVO). The keeper is liable as well.',
    ),
    tip: null,
    scene: null,
  }),
  q('la10', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Wer muss im Auto angeschnallt sein?',
    en: 'Who has to wear a seat belt in the car?',
    opts: [
      t('Alle Insassen auf Sitzen mit Gurt', 'Everyone in a seat that has a belt'),
      t('Nur Fahrer und Beifahrer', 'Only the driver and front passenger'),
      t('Nur auf der Autobahn', 'Only on the motorway'),
    ],
    ok: [0],
    why: t(
      'Vorgeschriebene Sicherheitsgurte müssen während der Fahrt angelegt sein – vorne und hinten (§ 21a StVO). Als Fahrer sind Sie auch dafür verantwortlich, dass Kinder richtig gesichert sind.',
      'Seat belts must be worn while driving, front and back (§ 21a StVO). As the driver you are also responsible for children being properly restrained.',
    ),
    tip: null,
    scene: null,
  }),
  q('la11', {
    pts: 4, sec: '2.2', basic: false,
    de: 'Welche Voraussetzungen muss eine Begleitperson beim begleiteten Fahren ab 17 erfüllen?',
    en: 'What must an accompanying adult have for supervised driving from 17?',
    opts: [
      t('Mindestens 30 Jahre alt sein', 'Be at least 30 years old'),
      t('Seit mindestens 5 Jahren die Klasse B haben', 'Have held a class B licence for at least 5 years'),
      t('Höchstens einen Punkt im Fahreignungsregister haben', 'Have no more than one point in the driving register'),
    ],
    ok: [0, 1, 2],
    why: t(
      'Begleitpersonen müssen mindestens 30 Jahre alt sein, seit mindestens 5 Jahren die Klasse B besitzen, höchstens einen Punkt haben und namentlich in der Prüfungsbescheinigung eingetragen sein. Für sie gilt 0,5 ‰ und das Cannabis-Limit.',
      'Companions must be at least 30, have held class B for at least 5 years, have at most one point and be named on the certificate. The 0.5 ‰ alcohol and cannabis limits apply to them.',
    ),
    tip: null,
    scene: null,
  }),
  q('la12', {
    pts: 3, sec: '2.6', basic: false,
    de: 'Welche Versicherung ist für jedes zugelassene Auto Pflicht?',
    en: 'Which insurance is compulsory for every registered car?',
    opts: [
      t('Die Kfz-Haftpflichtversicherung', 'Third-party liability insurance'),
      t('Die Vollkaskoversicherung', 'Fully comprehensive insurance'),
      t('Eine Insassen-Unfallversicherung', 'Personal accident cover for passengers'),
    ],
    ok: [0],
    why: t(
      'Pflicht ist nur die Kfz-Haftpflicht: Sie zahlt Schäden, die Sie anderen zufügen. Teil- und Vollkasko decken Schäden am eigenen Auto und sind freiwillig.',
      'Only third-party liability is compulsory: it pays for damage you cause to others. Partial and comprehensive cover for your own car are optional.',
    ),
    tip: null,
    scene: null,
  }),
];
