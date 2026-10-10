import { q, t } from './_q.mjs';

/**
 * Gefahrenlehre (catalogue sections 1.1 and 2.1): weather, darkness, animals,
 * bends, distraction. These are the questions where reading the situation
 * matters more than knowing a paragraph number.
 */
export default [
  q('ha01', {
    pts: 4, sec: '2.1', basic: false,
    de: 'Bei starkem Regen wird die Lenkung plötzlich leicht – Aquaplaning. Was tun Sie?',
    en: 'In heavy rain the steering suddenly goes light - aquaplaning. What do you do?',
    opts: [
      t('Auskuppeln bzw. vom Gas gehen', 'Declutch or come off the accelerator'),
      t('Lenkrad gerade halten', 'Hold the steering straight'),
      t('Kräftig bremsen und gegenlenken', 'Brake hard and steer against it'),
    ],
    ok: [0, 1],
    why: t(
      'Beim Aquaplaning schwimmen die Reifen auf einem Wasserfilm und übertragen keine Kraft. Gas weg (oder auskuppeln), nicht bremsen, Lenkrad gerade halten, bis die Reifen wieder greifen – sonst bricht das Auto aus.',
      'When aquaplaning, the tyres ride on a film of water and transmit no force. Come off the power (or declutch), do not brake, and hold the wheel straight until the tyres grip again, or the car will slew.',
    ),
    tip: t('Fuß weg, Hände ruhig.', 'Foot off, hands still.'),
    scene: { road: 'straight', actors: [{ kind: 'you', at: [55, 60], heading: 0 }], conditions: ['rain'] },
  }),
  q('ha02', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Wo müssen Sie im Winter besonders mit Glätte rechnen?',
    en: 'Where should you especially expect ice in winter?',
    opts: [
      t('Auf Brücken', 'On bridges'),
      t('In Waldschneisen und schattigen Abschnitten', 'In forest sections and shaded stretches'),
      t('In beheizten Tiefgaragen', 'In heated underground car parks'),
    ],
    ok: [0, 1],
    why: t(
      'Brücken kühlen von unten und oben aus und frieren zuerst. Im Wald und im Schatten taut Glätte später – auch wenn die Straße davor trocken war.',
      'Bridges cool from above and below and freeze first. In forests and shade, ice lasts longer, even when the road before them was dry.',
    ),
    tip: null,
    scene: { road: 'curve', actors: [{ kind: 'you', at: [55, 84], heading: 0 }], conditions: ['ice'] },
  }),
  q('ha03', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Nach langer Trockenheit beginnt es zu regnen. Was ist richtig?',
    en: 'It starts to rain after a long dry spell. What is true?',
    opts: [
      t('Die Fahrbahn kann jetzt besonders glatt sein', 'The road can be especially slippery now'),
      t('Regen macht die Straße sauber und griffiger', 'Rain cleans the road and improves grip'),
      t('Nur auf Kopfsteinpflaster ändert sich etwas', 'Only cobbles are affected'),
    ],
    ok: [0],
    why: t(
      'Der erste Regen löst Staub, Gummiabrieb und Öl zu einem schmierigen Film. Erst wenn es länger regnet, wird er weggespült.',
      'The first rain turns dust, rubber and oil into a greasy film. Only longer rain washes it away.',
    ),
    tip: null,
    scene: null,
  }),
  q('ha04', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Wann dürfen Sie die Nebelschlussleuchte einschalten?',
    en: 'When may you switch on the rear fog light?',
    opts: [
      t('Wenn die Sicht durch Nebel weniger als 50 m beträgt', 'When fog cuts visibility below 50 m'),
      t('Bei jedem Regen', 'Whenever it rains'),
      t('Nachts auf der Landstraße', 'At night on country roads'),
    ],
    ok: [0],
    why: t(
      'Die Nebelschlussleuchte ist nur bei Sichtweiten unter 50 m durch Nebel erlaubt; dann gilt auch höchstens 50 km/h (§ 17 Abs. 3 StVO). Bei besserer Sicht blendet sie die Nachfolgenden.',
      'The rear fog light is only allowed when fog cuts visibility below 50 m - and then the limit is 50 km/h (§ 17(3) StVO). In better visibility it dazzles the drivers behind.',
    ),
    tip: t('Nebelschlussleuchte an = maximal 50.', 'Rear fog light on = 50 max.'),
    scene: null,
  }),
  q('ha05', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Nachts blendet Sie der Gegenverkehr. Was tun Sie?',
    en: 'At night, oncoming headlights dazzle you. What do you do?',
    opts: [
      t('Auf den rechten Fahrbahnrand schauen', 'Look at the right-hand edge of the road'),
      t('Langsamer fahren, wenn nötig anhalten', 'Slow down, stopping if necessary'),
      t('Selbst aufblenden, um mich zu wehren', 'Flash my main beam back'),
    ],
    ok: [0, 1],
    why: t(
      'Blick an den rechten Fahrbahnrand, Geschwindigkeit verringern. Nach dem Blenden sind die Augen für einige Sekunden fast blind – Sie fahren in dieser Zeit eine weite Strecke „im Dunkeln“.',
      'Look to the right edge and slow down. After dazzle your eyes are nearly blind for a few seconds, and you cover a long way in that time.',
    ),
    tip: null,
    scene: { road: 'straight', actors: [{ kind: 'you', at: [55, 78], heading: 0 }, { kind: 'car', at: [45, 30], heading: 180 }], conditions: ['night'] },
  }),
  q('ha06', {
    pts: 5, sec: '2.1', basic: false,
    de: 'Nachts steht ein Reh im Scheinwerferlicht auf der Fahrbahn. Was tun Sie?',
    en: 'At night a deer is standing in your headlights on the road. What do you do?',
    opts: [
      t('Abblenden, hupen und bremsen', 'Dip the headlights, sound the horn and brake'),
      t('Wenn ein Zusammenstoß unvermeidbar ist: Lenkrad festhalten, nicht riskant ausweichen', 'If a collision cannot be avoided: hold the wheel firmly and do not swerve dangerously'),
      t('Fernlicht anlassen, damit das Tier weggeht', 'Keep the main beam on so it moves away'),
    ],
    ok: [0, 1],
    why: t(
      'Fernlicht lähmt Wild; abblenden und hupen vertreibt es. Riskante Ausweichmanöver gegen einen Baum oder in den Gegenverkehr sind gefährlicher als der Zusammenstoß mit dem Tier.',
      'Main beam freezes wild animals; dipping and the horn drive them off. Swerving into a tree or oncoming traffic is more dangerous than hitting the animal.',
    ),
    tip: t('Abblenden, hupen, bremsen – nicht ausweichen.', 'Dip, horn, brake - don’t swerve.'),
    scene: { road: 'curve', actors: [{ kind: 'you', at: [55, 84], heading: 0 }, { kind: 'deer', at: [54, 52], heading: 90 }], conditions: ['night'] },
    signs: ['142'],
  }),
  q('ha07', {
    pts: 4, sec: '2.1', basic: false,
    de: 'Sie haben ein Reh angefahren. Was tun Sie?',
    en: 'You have hit a deer. What do you do?',
    opts: [
      t('Unfallstelle sichern', 'Secure the scene'),
      t('Die Polizei oder den Jagdpächter benachrichtigen', 'Inform the police or the hunting tenant'),
      t('Das Tier mitnehmen', 'Take the animal with me'),
    ],
    ok: [0, 1],
    why: t(
      'Warnblinklicht, Warnweste, Warndreieck – dann Polizei anrufen, die den Jagdpächter verständigt. Das Tier nicht anfassen und nicht mitnehmen: Das wäre Wilderei. Für die Versicherung brauchen Sie eine Wildunfallbescheinigung.',
      'Hazards, vest, triangle - then call the police, who will contact the hunting tenant. Do not touch or take the animal: that would be poaching. Your insurer will want a wildlife-accident certificate.',
    ),
    tip: null,
    scene: null,
  }),
  q('ha08', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Wann bremsen Sie vor einer Kurve?',
    en: 'When do you brake for a bend?',
    opts: [
      t('Vor der Kurve, solange ich geradeaus fahre', 'Before the bend, while still going straight'),
      t('Mitten in der Kurve', 'In the middle of the bend'),
      t('Am Kurvenausgang', 'At the exit of the bend'),
    ],
    ok: [0],
    why: t(
      'In der Kurve brauchen die Reifen ihre Haftung für die Seitenführung. Wer erst dort bremst, riskiert, dass das Auto über die Räder schiebt. Vorher bremsen, in der Kurve gleichmäßig fahren.',
      'In a bend the tyres need their grip to hold the line. Braking there risks the car sliding straight on. Brake first, then drive through steadily.',
    ),
    tip: t('Langsam rein, zügig raus.', 'Slow in, steady out.'),
    scene: { road: 'curve', actors: [{ kind: 'you', at: [55, 80], heading: 0 }], signs: [{ sign: '103-20', arm: 's' }] },
  }),
  q('ha09', {
    pts: 5, sec: '1.1', basic: true,
    de: 'Sie werden auf einer langen Fahrt müde. Was hilft wirklich?',
    en: 'You are getting tired on a long drive. What really helps?',
    opts: [
      t('Eine Pause machen, wenn möglich kurz schlafen', 'Take a break and, if possible, a short sleep'),
      t('Das Fenster öffnen und laute Musik hören', 'Open the window and play loud music'),
      t('Schneller fahren, um früher anzukommen', 'Drive faster to arrive sooner'),
    ],
    ok: [0],
    why: t(
      'Gegen Müdigkeit hilft nur Schlaf. Frische Luft und Musik halten höchstens Minuten wach. Sekundenschlaf bei 100 km/h heißt: drei Sekunden blind, über 80 Meter.',
      'Only sleep cures tiredness. Fresh air and music buy minutes at most. A three-second microsleep at 100 km/h is over 80 metres driven blind.',
    ),
    tip: null,
    scene: null,
  }),
  q('ha10', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Auf einer Brücke oder an einer Waldschneise erfasst Sie Seitenwind. Was tun Sie?',
    en: 'On a bridge or at a gap in the trees a crosswind hits you. What do you do?',
    opts: [
      t('Langsamer fahren und das Lenkrad fest halten', 'Slow down and hold the wheel firmly'),
      t('Beim Überholen von Lkw mit einem Windstoß rechnen', 'Expect a gust when passing lorries'),
      t('Stark gegenlenken, sobald ich etwas spüre', 'Steer hard against it as soon as I feel anything'),
    ],
    ok: [0, 1],
    why: t(
      'Seitenwind kommt böig. Wer ruhig, fest und langsamer fährt, korrigiert mit kleinen Lenkbewegungen. Hektisches Gegenlenken führt zu Schlingern. Zeichen 117 warnt vor den typischen Stellen.',
      'Crosswind comes in gusts. Driving slower with a calm, firm grip lets you correct with small inputs; jerky steering makes the car weave. Sign 117 warns of typical spots.',
    ),
    tip: null,
    scene: { road: 'straight', actors: [{ kind: 'you', at: [55, 70], heading: 0 }], conditions: ['wind'] },
    signs: ['117'],
  }),
  q('ha11', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Ein Motorrad kommt Ihnen entgegen, Sie wollen links abbiegen. Was ist schwierig?',
    en: 'A motorbike is approaching and you want to turn left. What makes this tricky?',
    opts: [
      t('Seine Geschwindigkeit ist schwer einzuschätzen', 'Its speed is hard to judge'),
      t('Es wird wegen seiner schmalen Silhouette leicht übersehen', 'It is easily overlooked because it is so narrow'),
      t('Motorräder müssen Linksabbieger vorlassen', 'Motorbikes must give way to left-turners'),
    ],
    ok: [0, 1],
    why: t(
      'Motorräder sind schmal und wirken weiter weg und langsamer, als sie sind. Viele Unfälle passieren genau so: Ein Linksabbieger übersieht ein entgegenkommendes Motorrad. Im Zweifel warten.',
      'Motorbikes are narrow and look further away and slower than they are. Many crashes happen exactly like this: a left-turner misses an oncoming motorbike. When in doubt, wait.',
    ),
    tip: null,
    scene: { road: 'cross', actors: [{ kind: 'you', arm: 's', turn: 'left', blinker: 'left' }, { kind: 'moto', arm: 'n', slot: 2, turn: 'straight' }] },
  }),
  q('ha12', {
    pts: 5, sec: '1.1', basic: true,
    de: 'Ihr Handy klingelt während der Fahrt. Was dürfen Sie?',
    en: 'Your phone rings while you are driving. What may you do?',
    opts: [
      t('Über eine Freisprecheinrichtung telefonieren, ohne das Handy in die Hand zu nehmen', 'Talk hands-free without picking the phone up'),
      t('Das Handy kurz in die Hand nehmen, wenn ich an der Ampel stehe', 'Pick it up briefly while waiting at a red light'),
      t('Eine Nachricht lesen, wenn die Straße gerade ist', 'Read a message on a straight road'),
    ],
    ok: [0],
    why: t(
      'Ein Handy darf während der Fahrt nicht aufgenommen oder gehalten werden – auch nicht an der Ampel oder bei automatisch abgeschaltetem Motor (Start-Stopp). Erlaubt ist nur die Bedienung per Sprachsteuerung oder ein kurzer Blick, wenn es fest angebracht ist (§ 23 Abs. 1a StVO).',
      'You may not pick up or hold a phone while driving, not even at a red light or when start-stop has cut the engine. Only voice control, or a brief glance at a mounted phone, is allowed (§ 23(1a) StVO).',
    ),
    tip: t('Ampel ist Fahrt. Nur Motor ganz aus ist Pause.', 'A red light still counts as driving. Only engine fully off is a break.'),
    scene: null,
  }),
  q('ha13', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Sie fahren nachts auf der Landstraße mit Fernlicht. Wann müssen Sie abblenden?',
    en: 'You are on a country road at night with main beam on. When must you dip?',
    opts: [
      t('Wenn mir jemand entgegenkommt', 'When someone comes the other way'),
      t('Wenn ich dicht hinter einem anderen Fahrzeug fahre', 'When I am close behind another vehicle'),
      t('Nur bei Gegenverkehr von Lkw', 'Only for oncoming lorries'),
    ],
    ok: [0, 1],
    why: t(
      'Abgeblendet werden muss, wenn jemand entgegenkommt, wenn Sie dicht hinter jemandem fahren und überall, wo Sie andere blenden würden (§ 17 Abs. 2 StVO). Auch Fußgänger, Radfahrer und Schiffe auf parallelen Wasserwegen.',
      'Dip when someone is coming the other way, when you are close behind another vehicle, and wherever you would dazzle others (§ 17(2) StVO) - pedestrians and cyclists included.',
    ),
    tip: null,
    scene: null,
  }),
  q('ha14', {
    pts: 4, sec: '2.1', basic: false,
    de: 'Wann brauchen Sie Winterreifen?',
    en: 'When do you need winter tyres?',
    opts: [
      t('Bei Glatteis, Schneeglätte, Schneematsch, Eis- oder Reifglätte', 'In black ice, packed snow, slush, ice or frost'),
      t('Fest vom 1. Oktober bis 31. März, egal bei welchem Wetter', 'From 1 October to 31 March, whatever the weather'),
      t('Nur auf der Autobahn', 'Only on the motorway'),
    ],
    ok: [0],
    why: t(
      'In Deutschland gilt eine situative Winterreifenpflicht: Bei winterlichen Straßenverhältnissen dürfen Sie nur mit Winter- oder Ganzjahresreifen mit Alpine-Symbol (Bergpiktogramm mit Schneeflocke) fahren. Reine M+S-Reifen reichen seit Oktober 2024 nicht mehr.',
      'Germany has a weather-based rule: in wintry conditions you may only drive on winter or all-season tyres bearing the Alpine symbol (mountain with snowflake). Plain M+S tyres stopped counting in October 2024.',
    ),
    tip: t('Von O bis O (Oktober bis Ostern) als Faustregel.', 'Rule of thumb: from October to Easter.'),
    scene: null,
  }),
  q('ha15', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Vor Ihnen hält ein Eiswagen am Straßenrand. Womit rechnen Sie?',
    en: 'An ice-cream van has stopped at the roadside ahead. What do you expect?',
    opts: [
      t('Mit Kindern, die plötzlich über die Straße laufen', 'Children suddenly running across the road'),
      t('Dass der Wagen gleich weiterfährt', 'That the van will move off shortly'),
      t('Mit nichts Besonderem', 'Nothing in particular'),
    ],
    ok: [0],
    why: t(
      'Wo es etwas gibt, das Kinder anzieht – Eiswagen, Spielplatz, Schule –, laufen sie, ohne auf den Verkehr zu achten. Langsam fahren und bremsbereit sein.',
      'Wherever something attracts children - ice-cream vans, playgrounds, schools - they run without looking. Go slowly and be ready to brake.',
    ),
    tip: null,
    scene: null,
  }),
  q('ha16', {
    pts: 4, sec: '1.1', basic: true,
    de: 'Sie folgen einem Lkw auf der Landstraße. Warum halten Sie größeren Abstand?',
    en: 'You are following a lorry on a country road. Why keep a bigger gap?',
    opts: [
      t('Damit ich an ihm vorbei nach vorne sehen kann', 'So I can see past it down the road'),
      t('Weil der Lkw-Fahrer mich hinter sich möglicherweise nicht sieht', 'Because the lorry driver may not be able to see me'),
      t('Weil Lkw nie bremsen', 'Because lorries never brake'),
    ],
    ok: [0, 1],
    why: t(
      'Dicht hinter einem Lkw sehen Sie nichts vom Verkehr davor und sind im toten Winkel seiner Spiegel. Mehr Abstand gibt Ihnen Sicht – und Zeit, falls er plötzlich bremst.',
      'Right behind a lorry you see nothing of the road ahead and sit in its mirrors’ blind spot. A bigger gap gives you a view, and time if it brakes suddenly.',
    ),
    tip: null,
    scene: null,
  }),
];
