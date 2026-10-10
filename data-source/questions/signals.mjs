import { q, t } from './_q.mjs';

/**
 * Ampeln, Polizei und Einsatzfahrzeuge: who overrules whom. StVO §§ 36-38.
 */
export default [
  q('sg01', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Der Polizeibeamte steht Ihnen zugewandt und streckt beide Arme seitlich aus. Was bedeutet das für Sie?',
    en: 'The police officer is facing you with both arms stretched out to the sides. What does this mean for you?',
    opts: [
      t('Halt vor der Kreuzung – wie Rot', 'Stop before the junction - like a red light'),
      t('Freie Fahrt – wie Grün', 'Go - like a green light'),
      t('Kreuzung zügig räumen', 'Clear the junction quickly'),
    ],
    ok: [0],
    why: t(
      'Arme quer zu Ihrer Fahrtrichtung bedeuten „Halt“ für den Verkehr von vorn und von hinten. Der Querverkehr – in Richtung der Arme – hat frei (§ 36 Abs. 2 StVO).',
      'Arms held across your direction of travel mean "stop" for traffic in front of and behind the officer. Traffic moving along the line of the arms may go (§ 36(2) StVO).',
    ),
    tip: t('Brust oder Rücken zu dir = Rot. Arm zeigt auf dich = Grün.', 'Chest or back to you = red. Arm pointing at you = green.'),
    scene: { road: 'cross', actors: [{ kind: 'you', arm: 's', turn: 'straight' }], officer: { facing: 'ns', arms: 'side' } },
  }),
  q('sg02', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Sie kommen von links auf den Polizeibeamten zu. Seine Arme zeigen in Ihre Richtung. Was bedeutet das für Sie?',
    en: 'You are approaching the officer from the side. The officer’s arms point along your direction. What does this mean for you?',
    opts: [
      t('Ich darf fahren – wie Grün', 'I may go - like a green light'),
      t('Halt – wie Rot', 'Stop - like a red light'),
      t('Ich muss warten, bis er winkt', 'I must wait until he waves'),
    ],
    ok: [0],
    why: t(
      'Der Beamte steht seitlich zu Ihnen, die Arme zeigen in Ihre Fahrtrichtung: Ihr Verkehr ist freigegeben. Wer abbiegt, beachtet trotzdem die Abbiegeregeln.',
      'The officer stands side-on to you and his arms point along your direction: your traffic is released. If you turn, the turning rules still apply.',
    ),
    tip: null,
    scene: { road: 'cross', actors: [{ kind: 'you', arm: 'w', turn: 'straight' }], officer: { facing: 'ns', arms: 'side' } },
  }),
  q('sg03', {
    pts: 4, sec: '1.3', basic: true,
    de: 'Ein Polizeibeamter hebt einen Arm senkrecht nach oben. Was bedeutet das?',
    en: 'A police officer raises one arm straight up. What does that mean?',
    opts: [
      t('Wer vor der Kreuzung ist, wartet auf das nächste Zeichen', 'Anyone before the junction waits for the next signal'),
      t('Wer schon in der Kreuzung ist, räumt sie', 'Anyone already in the junction clears it'),
      t('Alle dürfen fahren', 'Everyone may go'),
    ],
    ok: [0, 1],
    why: t(
      'Ein erhobener Arm entspricht Gelb: „Achtung, gleich wechselt die Freigabe.“ Vor der Kreuzung warten, in der Kreuzung räumen (§ 36 Abs. 2 Nr. 2 StVO).',
      'A raised arm is the equivalent of amber: "attention, the signal is about to change". Wait if you are before the junction, clear it if you are in it (§ 36(2) no. 2 StVO).',
    ),
    tip: null,
    scene: null,
  }),
  q('sg04', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Die Ampel zeigt Grün. Ein Polizeibeamter gibt Ihnen das Zeichen zum Anhalten. Was tun Sie?',
    en: 'The light is green. A police officer signals you to stop. What do you do?',
    opts: [
      t('Anhalten – die Polizei geht vor', 'Stop - the police take precedence'),
      t('Weiterfahren – Grün geht vor', 'Carry on - the green light takes precedence'),
      t('Hupen und langsam weiterfahren', 'Sound the horn and carry on slowly'),
    ],
    ok: [0],
    why: t(
      'Zeichen und Weisungen von Polizeibeamten gehen allen anderen Anordnungen und Regeln vor, auch Ampeln (§ 36 Abs. 1 StVO).',
      'Signals and instructions from police officers override everything else, traffic lights included (§ 36(1) StVO).',
    ),
    tip: null,
    scene: { road: 'cross', actors: [{ kind: 'you', arm: 's', turn: 'straight' }], lights: [{ arm: 's', state: 'green' }], officer: { facing: 'ns', arms: 'side' } },
  }),
  q('sg05', {
    pts: 4, sec: '1.3', basic: true,
    de: 'Was gilt in welcher Rangfolge?',
    en: 'Which order of precedence is correct?',
    opts: [
      t('Polizei, Ampel, Verkehrszeichen, allgemeine Regeln', 'Police, traffic lights, signs, general rules'),
      t('Ampel, Polizei, Verkehrszeichen, allgemeine Regeln', 'Traffic lights, police, signs, general rules'),
      t('Verkehrszeichen, Ampel, Polizei, allgemeine Regeln', 'Signs, traffic lights, police, general rules'),
    ],
    ok: [0],
    why: t(
      'Polizei geht allem vor (§ 36), Ampeln gehen den Vorfahrtschildern und -regeln vor (§ 37), Schilder gehen „rechts vor links“ vor.',
      'Police override everything (§ 36), lights override priority signs and rules (§ 37), and signs override "right before left".',
    ),
    tip: t('Mensch, Licht, Schild, Regel.', 'Person, light, sign, rule.'),
    scene: null,
  }),
  q('sg06', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Ihre Ampel zeigt Rot, daneben ist ein grüner Pfeil auf einem Schild. Sie wollen rechts abbiegen. Was gilt?',
    en: 'Your light is red, with a green arrow sign next to it. You want to turn right. What applies?',
    opts: [
      t('Ich muss zuerst an der Haltlinie anhalten', 'I must first stop at the stop line'),
      t('Danach darf ich abbiegen, wenn ich niemanden behindere oder gefährde', 'Then I may turn if I do not obstruct or endanger anyone'),
      t('Ich darf ohne anzuhalten abbiegen', 'I may turn without stopping'),
    ],
    ok: [0, 1],
    why: t(
      'Der Grünpfeil (Zeichen 720) erlaubt das Rechtsabbiegen bei Rot nur nach einem Halt an der Haltlinie – und nur, wenn niemand behindert oder gefährdet wird, besonders Fußgänger und Radfahrer mit Grün (§ 37 Abs. 2 StVO).',
      'The green arrow sign (720) allows a right turn on red only after a full stop at the stop line, and only without obstructing or endangering anyone, especially pedestrians and cyclists who have green (§ 37(2) StVO).',
    ),
    tip: t('Grünpfeil = Stoppschild mit Abbiege-Erlaubnis.', 'Green arrow = a stop sign that lets you turn.'),
    scene: {
      road: 'cross',
      actors: [{ kind: 'you', arm: 's', turn: 'right', blinker: 'right' }, { kind: 'ped', at: [66, 41], heading: 0 }],
      lights: [{ arm: 's', state: 'greenArrow' }],
      markings: ['stopLine'],
    },
  }),
  q('sg07', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Die Ampel springt auf Gelb. Was tun Sie?',
    en: 'The light changes to amber. What do you do?',
    opts: [
      t('Anhalten, wenn das noch gefahrlos möglich ist', 'Stop, if I can still do so safely'),
      t('Beschleunigen, um noch durchzukommen', 'Speed up to get through'),
      t('Immer sofort voll bremsen', 'Always brake as hard as possible at once'),
    ],
    ok: [0],
    why: t(
      'Gelb ordnet an: vor der Kreuzung auf das nächste Zeichen warten. Wer so nah ist, dass ein sicheres Anhalten nicht mehr möglich ist, fährt weiter – Gas geben gehört nicht dazu.',
      'Amber means: wait before the junction for the next signal. If you are too close to stop safely, you carry on - but speeding up is never part of it.',
    ),
    tip: null,
    scene: { road: 'cross', actors: [{ kind: 'you', arm: 's', turn: 'straight' }], lights: [{ arm: 's', state: 'amber' }] },
  }),
  q('sg08', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Ihre Ampel zeigt Rot und Gelb zugleich. Was bedeutet das?',
    en: 'Your light shows red and amber together. What does that mean?',
    opts: [
      t('Gleich kommt Grün – ich warte noch', 'Green is coming - I still wait'),
      t('Ich darf schon losfahren', 'I may already go'),
      t('Die Ampel ist defekt', 'The light is broken'),
    ],
    ok: [0],
    why: t(
      'Rot und Gelb zusammen heißt: „Achtung, gleich Grün.“ Bis Grün kommt, bleiben Sie stehen.',
      'Red and amber together mean "attention, green is next". You stay where you are until it turns green.',
    ),
    tip: null,
    scene: { road: 'cross', actors: [{ kind: 'you', arm: 's', turn: 'straight' }], lights: [{ arm: 's', state: 'redAmber' }] },
  }),
  q('sg09', {
    pts: 4, sec: '1.3', basic: true,
    de: 'Die Ampel ist ausgefallen. Was gilt jetzt?',
    en: 'The traffic lights are out of order. What applies now?',
    opts: [
      t('Die Vorfahrtschilder an der Kreuzung', 'The priority signs at the junction'),
      t('Wenn keine Schilder da sind: rechts vor links', 'If there are no signs: right before left'),
      t('Wer zuerst kommt, fährt zuerst', 'First come, first served'),
    ],
    ok: [0, 1],
    why: t(
      'Ist die Ampel aus oder blinkt nur Gelb, gelten die Verkehrszeichen. Gibt es keine, gilt „rechts vor links“.',
      'If the lights are off or only flashing amber, the signs apply. If there are none, "right before left" applies.',
    ),
    tip: null,
    scene: {
      road: 'cross',
      actors: [{ kind: 'you', arm: 's', turn: 'straight' }, { kind: 'car', arm: 'e', turn: 'straight' }],
      lights: [{ arm: 's', state: 'off' }],
      signs: [{ sign: '205', arm: 's' }],
    },
  }),
  q('sg10', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Was bedeutet ein gelbes Blinklicht an einer Ampel?',
    en: 'What does a single flashing amber light at a junction mean?',
    opts: [
      t('Vorsicht – es gelten die Verkehrszeichen', 'Caution - the road signs apply'),
      t('Freie Fahrt für alle', 'Everyone may go'),
      t('Anhalten wie bei Rot', 'Stop as for red'),
    ],
    ok: [0],
    why: t(
      'Gelbes Blinklicht warnt (§ 37 Abs. 2 Nr. 5 StVO). Es regelt nichts – die Vorfahrt ergibt sich aus den Schildern.',
      'A flashing amber light is a warning (§ 37(2) no. 5 StVO). It decides nothing; priority comes from the signs.',
    ),
    tip: null,
    scene: { road: 'cross', actors: [{ kind: 'you', arm: 's', turn: 'straight' }], lights: [{ arm: 's', state: 'flashing' }], signs: [{ sign: '306', arm: 's' }] },
  }),
  q('sg11', {
    pts: 5, sec: '1.2', basic: true,
    de: 'Hinter Ihnen nähert sich ein Rettungswagen mit Blaulicht und Martinshorn. Was tun Sie?',
    en: 'An ambulance with blue lights and siren is coming up behind you. What do you do?',
    opts: [
      t('Sofort freie Bahn schaffen', 'Make way immediately'),
      t('Weiterfahren, bis eine Parkbucht kommt', 'Keep going until there is a lay-by'),
      t('Stark bremsen und auf meiner Spur stehen bleiben', 'Brake hard and stop in my lane'),
    ],
    ok: [0],
    why: t(
      'Blaulicht zusammen mit Einsatzhorn ordnet an: Alle übrigen Verkehrsteilnehmer haben sofort freie Bahn zu schaffen (§ 38 Abs. 1 StVO). Mitten auf der Spur stehen zu bleiben hilft nicht.',
      'Blue lights together with the siren mean that everyone else must make way immediately (§ 38(1) StVO). Stopping in the middle of your lane does not help.',
    ),
    tip: null,
    scene: {
      road: 'straight',
      actors: [{ kind: 'you', at: [55, 42], heading: 0 }, { kind: 'ambulance', at: [55, 80], heading: 0, siren: true }, { kind: 'car', at: [45, 20], heading: 180 }],
    },
  }),
  q('sg12', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Ein Polizeifahrzeug steht mit Blaulicht, aber ohne Martinshorn am Straßenrand. Was bedeutet das?',
    en: 'A police car is standing at the roadside with blue lights on but no siren. What does that mean?',
    opts: [
      t('Es warnt vor einer Gefahr, z. B. einer Unfallstelle', 'It warns of a hazard, such as an accident'),
      t('Ich muss sofort anhalten', 'I must stop immediately'),
      t('Ich muss freie Bahn schaffen', 'I must make way'),
    ],
    ok: [0],
    why: t(
      'Blaues Blinklicht allein dient der Warnung an Unfall- oder Einsatzstellen (§ 38 Abs. 2 StVO). Fahren Sie langsam und vorsichtig vorbei.',
      'A blue light on its own is a warning at an accident or incident scene (§ 38(2) StVO). Pass slowly and carefully.',
    ),
    tip: t('Blau + Horn = Platz machen. Blau allein = aufpassen.', 'Blue + siren = make way. Blue alone = take care.'),
    scene: null,
  }),
  q('sg13', {
    pts: 4, sec: '1.2', basic: true,
    de: 'Ihre Ampel zeigt Grün, aber hinter der Kreuzung staut sich der Verkehr. Was tun Sie?',
    en: 'Your light is green, but traffic is queuing beyond the junction. What do you do?',
    opts: [
      t('Vor der Kreuzung warten', 'Wait before the junction'),
      t('In die Kreuzung einfahren, weil ich Grün habe', 'Drive into the junction because I have green'),
      t('Langsam in die Kreuzung rollen', 'Roll slowly into the junction'),
    ],
    ok: [0],
    why: t(
      'Wer in der Kreuzung warten müsste, darf trotz Grün nicht einfahren (§ 11 Abs. 1 StVO). Sonst blockieren Sie den Querverkehr, wenn dessen Ampel umschaltet.',
      'If you would have to stop inside the junction, you must not enter it, even on green (§ 11(1) StVO). Otherwise you block the cross traffic when its light changes.',
    ),
    tip: null,
    scene: {
      road: 'cross',
      actors: [{ kind: 'you', arm: 's', turn: 'straight' }, { kind: 'car', at: [55, 30], heading: 0 }, { kind: 'truck', at: [55, 10], heading: 0 }],
      lights: [{ arm: 's', state: 'green' }],
    },
  }),
  q('sg14', {
    pts: 5, sec: '1.3', basic: true,
    de: 'Sie haben Grün und wollen links abbiegen. Was beachten Sie?',
    en: 'You have green and want to turn left. What do you need to watch for?',
    opts: [
      t('Den entgegenkommenden Verkehr durchfahren lassen', 'Let oncoming traffic go first'),
      t('Fußgänger, die die Straße überqueren, in die ich abbiege', 'Pedestrians crossing the road I am turning into'),
      t('Nichts – Grün heißt, ich habe Vorrang', 'Nothing - green means I have priority'),
    ],
    ok: [0, 1],
    why: t(
      'Grün hebt die Abbiegeregeln nicht auf: Gegenverkehr durchlassen und auf Fußgänger besondere Rücksicht nehmen (§ 9 Abs. 3 StVO). Nur ein grüner Pfeil in der Ampel zeigt ein gesichertes Abbiegen an.',
      'Green does not switch off the turning rules: let oncoming traffic through and take special care of pedestrians (§ 9(3) StVO). Only a green arrow inside the light itself shows a protected turn.',
    ),
    tip: null,
    scene: {
      road: 'cross',
      actors: [
        { kind: 'you', arm: 's', turn: 'left', blinker: 'left' },
        { kind: 'car', arm: 'n', turn: 'straight' },
        { kind: 'ped', at: [34, 38], heading: 0 },
      ],
      lights: [{ arm: 's', state: 'green' }, { arm: 'n', state: 'green' }],
    },
  }),
  q('sg15', {
    pts: 3, sec: '1.2', basic: true,
    de: 'Ein Müllwagen steht mit gelbem Blinklicht auf der Fahrbahn. Was bedeutet das Licht?',
    en: 'A refuse lorry is standing on the road with a flashing amber light. What does the light mean?',
    opts: [
      t('Es warnt vor einer Gefahr', 'It warns of a hazard'),
      t('Ich muss freie Bahn schaffen', 'I must make way'),
      t('Das Fahrzeug hat Vorfahrt', 'The vehicle has priority'),
    ],
    ok: [0],
    why: t(
      'Gelbes Blinklicht an Fahrzeugen warnt vor Gefahren (§ 38 Abs. 3 StVO) – hier vor Menschen, die plötzlich hinter dem Wagen hervortreten. Langsam und mit Abstand vorbeifahren.',
      'An amber flashing light on a vehicle warns of danger (§ 38(3) StVO) - here, of workers stepping out from behind it. Pass slowly and with room to spare.',
    ),
    tip: null,
    scene: null,
  }),
];
