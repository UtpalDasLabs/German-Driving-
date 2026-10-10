import { q, t } from './_q.mjs';

/** Umweltschutz (catalogue sections 1.5 and 2.5): fuel, noise and emissions. */
export default [
  q('ec01', {
    pts: 3, sec: '1.5', basic: true,
    de: 'Wie fahren Sie besonders sparsam?',
    en: 'How do you drive most economically?',
    opts: [
      t('Früh hochschalten und niedertourig fahren', 'Change up early and keep revs low'),
      t('Vorausschauend fahren und unnötiges Bremsen vermeiden', 'Anticipate and avoid needless braking'),
      t('In niedrigen Gängen mit hoher Drehzahl', 'In low gears at high revs'),
    ],
    ok: [0, 1],
    why: t(
      'Wer früh hochschaltet (beim Benziner etwa bei 2.000 bis 2.500 Umdrehungen) und vorausschauend rollen lässt, spart viel Kraftstoff. Jedes unnötige Bremsen vernichtet Energie, die vorher Kraftstoff gekostet hat.',
      'Changing up early (around 2,000-2,500 rpm in a petrol car) and coasting with foresight saves a lot of fuel. Every unnecessary stop wastes energy you paid for in fuel.',
    ),
    tip: null,
    scene: null,
  }),
  q('ec02', {
    pts: 3, sec: '1.5', basic: true,
    de: 'Sie rollen mit eingelegtem Gang auf eine rote Ampel zu. Was passiert?',
    en: 'You coast towards a red light with a gear engaged. What happens?',
    opts: [
      t('Die Kraftstoffzufuhr wird unterbrochen (Schubabschaltung)', 'The fuel supply is cut off (overrun fuel cut-off)'),
      t('Der Motor braucht mehr Kraftstoff als im Leerlauf', 'The engine uses more fuel than at idle'),
      t('Der Motor geht aus', 'The engine stalls'),
    ],
    ok: [0],
    why: t(
      'Rollen mit eingelegtem Gang ohne Gas: Moderne Motoren schalten dann die Einspritzung ab und verbrauchen nichts. Im Leerlauf dagegen läuft der Motor mit Kraftstoff weiter.',
      'Coasting in gear with your foot off: modern engines then cut injection and use no fuel. In neutral the engine keeps burning fuel to idle.',
    ),
    tip: null,
    scene: null,
  }),
  q('ec03', {
    pts: 3, sec: '1.5', basic: true,
    de: 'Was ist verboten, um unnötigen Lärm und Abgase zu vermeiden?',
    en: 'What is forbidden, to avoid unnecessary noise and exhaust?',
    opts: [
      t('Den Motor im Stand warmlaufen lassen', 'Warming the engine up while stationary'),
      t('Unnötiges Hin- und Herfahren innerorts', 'Pointlessly driving up and down in town'),
      t('Den Motor an der Ampel laufen lassen', 'Keeping the engine running at a red light'),
    ],
    ok: [0, 1],
    why: t(
      'Unnötiger Lärm und vermeidbare Abgase sind verboten; dazu gehört das Warmlaufenlassen im Stand und unnützes Hin- und Herfahren in Ortschaften (§ 30 Abs. 1 StVO). An der Ampel darf der Motor laufen – bei längerem Warten lohnt sich das Abschalten.',
      'Unnecessary noise and avoidable fumes are forbidden, including warming up while stationary and pointless driving around in town (§ 30(1) StVO). At a red light the engine may run, though for longer waits it pays to switch off.',
    ),
    tip: null,
    scene: null,
  }),
  q('ec04', {
    pts: 3, sec: '1.5', basic: true,
    de: 'Sie warten länger an einer geschlossenen Bahnschranke. Was tun Sie?',
    en: 'You face a long wait at a closed level-crossing barrier. What do you do?',
    opts: [
      t('Den Motor abstellen', 'Switch off the engine'),
      t('Den Motor laufen lassen, damit er warm bleibt', 'Keep it running so it stays warm'),
      t('Gas geben, damit die Batterie lädt', 'Rev it to charge the battery'),
    ],
    ok: [0],
    why: t(
      'Bei längerem Warten an Bahnschranken, im Stau oder vor Baustellenampeln spart Abschalten Kraftstoff und verringert Lärm und Abgase.',
      'For longer waits at barriers, in queues or at roadworks lights, switching off saves fuel and cuts noise and fumes.',
    ),
    tip: null,
    scene: null,
  }),
  q('ec05', {
    pts: 3, sec: '2.5', basic: false,
    de: 'Was erhöht den Kraftstoffverbrauch?',
    en: 'What increases fuel consumption?',
    opts: [
      t('Ein unbenutzter Dachgepäckträger', 'An empty roof rack'),
      t('Zu niedriger Reifendruck', 'Tyres under-inflated'),
      t('Die Klimaanlage', 'The air conditioning'),
    ],
    ok: [0, 1, 2],
    why: t(
      'Dachaufbauten erhöhen den Luftwiderstand, niedriger Reifendruck den Rollwiderstand, und die Klimaanlage braucht Motorleistung. Abbauen, Druck prüfen, Klima nur bei Bedarf.',
      'Roof equipment adds drag, low pressure adds rolling resistance and air conditioning takes engine power. Take it off, check pressures, and use the AC only when needed.',
    ),
    tip: null,
    scene: null,
  }),
  q('ec06', {
    pts: 3, sec: '2.5', basic: false,
    de: 'Warum steigt der Verbrauch bei hohem Tempo stark an?',
    en: 'Why does fuel consumption climb steeply at high speed?',
    opts: [
      t('Der Luftwiderstand wächst mit dem Quadrat der Geschwindigkeit', 'Air resistance grows with the square of speed'),
      t('Weil der Motor im höchsten Gang ineffizient ist', 'Because the engine is inefficient in top gear'),
      t('Das stimmt nicht – schnell fahren spart Zeit und Kraftstoff', 'It does not - driving fast saves both time and fuel'),
    ],
    ok: [0],
    why: t(
      'Doppelte Geschwindigkeit heißt vierfacher Luftwiderstand. Wer auf der Autobahn statt 160 km/h nur 120 km/h fährt, spart oft ein Drittel Kraftstoff und verliert auf 100 km nur etwa zwölf Minuten.',
      'Twice the speed means four times the air resistance. Doing 120 instead of 160 km/h on the motorway often saves a third of the fuel and costs only about twelve minutes per 100 km.',
    ),
    tip: null,
    scene: null,
  }),
  q('ec07', {
    pts: 3, sec: '1.5', basic: true,
    de: 'Wo entsorgen Sie Altöl?',
    en: 'Where do you dispose of used engine oil?',
    opts: [
      t('Bei einer Annahmestelle, z. B. dort, wo ich Öl gekauft habe', 'At a collection point, such as where I bought the oil'),
      t('Im Hausmüll in einer verschlossenen Flasche', 'In household rubbish in a sealed bottle'),
      t('Im Gully', 'Down the drain'),
    ],
    ok: [0],
    why: t(
      'Ein Liter Altöl kann eine Million Liter Trinkwasser verunreinigen. Händler, die Motoröl verkaufen, müssen die gleiche Menge Altöl kostenlos zurücknehmen.',
      'One litre of used oil can contaminate a million litres of drinking water. Shops that sell engine oil must take back the same amount of used oil free of charge.',
    ),
    tip: null,
    scene: null,
  }),
  q('ec08', {
    pts: 3, sec: '1.4', basic: true,
    de: 'Wer darf in eine Umweltzone einfahren?',
    en: 'Who may drive into a low-emission zone?',
    opts: [
      t('Fahrzeuge mit der vorgeschriebenen Feinstaubplakette', 'Vehicles with the required emissions sticker'),
      t('Alle Fahrzeuge, wenn sie langsam fahren', 'Any vehicle driving slowly'),
      t('Nur Elektroautos', 'Electric cars only'),
    ],
    ok: [0],
    why: t(
      'In Umweltzonen (Zeichen 270.1) dürfen nur Fahrzeuge mit der passenden Plakette fahren – heute fast überall die grüne. Ohne Plakette drohen Bußgelder.',
      'Only vehicles with the right sticker may enter a low-emission zone (sign 270.1) - nearly everywhere today that means the green one. Without it you can be fined.',
    ),
    tip: null,
    scene: null,
    signs: ['270.1'],
  }),
  q('ec09', {
    pts: 2, sec: '1.5', basic: true,
    de: 'Welche Fahrten belasten Motor und Umwelt besonders?',
    en: 'Which journeys are hardest on the engine and the environment?',
    opts: [
      t('Kurzstrecken mit kaltem Motor', 'Short trips with a cold engine'),
      t('Lange, gleichmäßige Fahrten', 'Long, steady drives'),
      t('Fahrten mit Tempomat', 'Drives on cruise control'),
    ],
    ok: [0],
    why: t(
      'Ein kalter Motor verbraucht deutlich mehr und verschleißt stärker, und der Katalysator arbeitet noch nicht richtig. Für kurze Wege sind Fuß, Rad oder Bus oft besser.',
      'A cold engine uses much more fuel and wears faster, and the catalytic converter has not warmed up. For short trips, walking, cycling or the bus are often better.',
    ),
    tip: null,
    scene: null,
  }),
];
