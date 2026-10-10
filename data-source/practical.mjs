/**
 * The practical exam (praktische Fahrerlaubnisprüfung, class B).
 *
 * Since 1 January 2021 Germany uses the "optimised practical driving test"
 * (OPFEP): the examiner assesses five competence areas across a set of
 * driving tasks and records them in an electronic report (ePB). Class B runs
 * 55 minutes in total, at least 30 of them pure driving time (FeV Anlage 7).
 *
 * Kept to what is stable and verifiable. Where practice varies between test
 * centres - exactly which manoeuvres you get, how the feedback is given - the
 * text says so rather than pretending there is one answer.
 *
 * Entries are [de, en] pairs.
 */
const p = (de, en) => [de, en];

export default [
  {
    key: 'overview',
    icon: 'map',
    diagram: null,
    title: p('So läuft die Prüfung ab', 'How the test works'),
    body: [
      p(
        'Die Prüfung dauert insgesamt 55 Minuten, davon mindestens 30 Minuten reine Fahrzeit. Sie fahren das Fahrschulauto, Ihr Fahrlehrer sitzt neben Ihnen, der Prüfer (TÜV oder DEKRA) sitzt hinten.',
        'The test lasts 55 minutes in total, at least 30 of them actual driving. You drive the driving school car with your instructor beside you; the examiner (from TÜV or DEKRA) sits in the back.',
      ),
      p(
        'Zuerst prüft der Prüfer Ihren Ausweis. Dann folgen die Fahrtvorbereitung und Abfahrtkontrolle, die Fahrt durch Stadt, über Land und meist auf Autobahn oder Kraftfahrstraße, und die Grundfahraufgaben.',
        'First the examiner checks your ID. Then come the preparation and vehicle checks, the drive through town, on country roads and usually on a motorway or expressway, and the set manoeuvres.',
      ),
      p(
        'Am Ende bekommen Sie sofort das Ergebnis und eine Rückmeldung zu jedem der fünf Kompetenzbereiche. Haben Sie bestanden, erhalten Sie Ihren Führerschein oder eine vorläufige Bescheinigung direkt nach der Prüfung.',
        'At the end you get the result straight away, with feedback on each of the five competence areas. If you pass, you receive your licence - or a provisional certificate - right after the test.',
      ),
      p(
        'Die praktische Prüfung muss innerhalb von 12 Monaten nach der bestandenen Theorieprüfung abgelegt werden. Nicht bestanden? Eine Wiederholung ist in der Regel frühestens nach zwei Wochen möglich.',
        'The practical test must be taken within 12 months of passing the theory test. Failed? You can usually retake it after two weeks at the earliest.',
      ),
    ],
    checklist: [
      p('Personalausweis oder Reisepass dabei', 'ID card or passport with me'),
      p('Brille oder Kontaktlinsen, falls im Führerschein vorgeschrieben', 'Glasses or contacts, if my licence requires them'),
      p('Bequeme, flache Schuhe', 'Comfortable, flat shoes'),
      p('Ausgeschlafen und 0,0 Promille', 'Well rested and 0.0 alcohol'),
      p('15 Minuten vor dem Termin bei der Fahrschule', 'At the driving school 15 minutes early'),
    ],
    pitfalls: [
      p('Ohne gültiges Ausweisdokument findet die Prüfung nicht statt – und die Gebühr ist meist trotzdem weg.', 'Without valid ID the test does not go ahead - and the fee is usually lost anyway.'),
    ],
    phrases: [],
  },
  {
    key: 'checks',
    icon: 'build',
    diagram: null,
    title: p('Fahrtvorbereitung und Abfahrtkontrolle', 'Preparation and vehicle checks'),
    body: [
      p(
        'Vor der Fahrt stellen Sie Sitz, Lenkrad, Spiegel und Kopfstütze ein und legen den Gurt an. Der Prüfer bittet Sie meist, einige Punkte am Fahrzeug zu zeigen oder zu erklären.',
        'Before driving off you adjust the seat, steering wheel, mirrors and head restraint and fasten your belt. The examiner will usually ask you to show or explain a few things on the car.',
      ),
      p(
        'Typisch sind: Beleuchtung einschalten und prüfen, Reifen (Profil, Beschädigungen, wo steht der Luftdruck), Flüssigkeitsstände (Motoröl, Kühlmittel, Scheibenwaschwasser, Bremsflüssigkeit), Hupe, Warnleuchten im Display.',
        'Typical items: switch on and check the lights; the tyres (tread, damage, where the pressures are listed); fluid levels (engine oil, coolant, screen wash, brake fluid); the horn; the warning lamps on the dashboard.',
      ),
    ],
    checklist: [
      p('Sitz so, dass das Kupplungs- bzw. Bremspedal ganz durchgetreten werden kann', 'Seat set so the clutch or brake pedal goes fully down'),
      p('Innen- und Außenspiegel eingestellt', 'Interior and door mirrors adjusted'),
      p('Kopfstütze: Oberkante etwa auf Scheitelhöhe', 'Head restraint: top edge at about the top of my head'),
      p('Abblendlicht, Fernlicht, Blinker, Warnblinker, Nebelschlussleuchte zeigen können', 'Can show dipped and main beam, indicators, hazards, rear fog light'),
      p('Ölmessstab finden und Ölstand ablesen können', 'Can find the dipstick and read the oil level'),
      p('Wissen, wo der vorgeschriebene Reifendruck steht', 'Know where the correct tyre pressures are listed'),
    ],
    pitfalls: [
      p('Losfahren, ohne die Spiegel einzustellen oder sich anzuschnallen.', 'Setting off without adjusting the mirrors or fastening the belt.'),
    ],
    phrases: [],
  },
  {
    key: 'parallel',
    icon: 'car',
    diagram: 'parallel',
    title: p('Rückwärts einparken (längs)', 'Reverse parallel parking'),
    body: [
      p(
        'Sie parken rückwärts in eine Lücke am rechten Fahrbahnrand zwischen zwei Fahrzeugen. Die Lücke sollte mindestens etwa anderthalb Autolängen lang sein.',
        'You reverse into a space at the right-hand kerb between two vehicles. The space should be at least about one and a half car lengths.',
      ),
      p(
        'Halten Sie etwa 50 cm seitlich neben dem vorderen Auto, Heck auf Höhe von dessen Heck. Langsam zurück, bis Ihre Hinterachse auf Höhe von dessen Heck ist, dann voll rechts einschlagen. Wenn das Auto etwa 45° steht, geradeaus zurück, dann voll links einschlagen, bis Sie parallel stehen.',
        'Stop about 50 cm beside the car in front, your rear level with its rear. Reverse slowly until your rear axle is level with its back bumper, then steer full right. At about 45°, straighten up and reverse, then steer full left until you are parallel.',
      ),
    ],
    checklist: [
      p('Rechts blinken, bevor ich anhalte', 'Signal right before stopping'),
      p('Rundumblick, bevor ich zurücksetze', 'All-round check before reversing'),
      p('Ständig nach hinten und zur Seite schauen, nicht nur in den Spiegel', 'Keep looking behind and to the side, not only in the mirror'),
      p('Am Ende höchstens etwa 30 cm vom Bordstein, Räder gerade', 'Finish no more than about 30 cm from the kerb, wheels straight'),
    ],
    pitfalls: [
      p('Mit dem Hinterrad auf den Bordstein fahren.', 'Mounting the kerb with the rear wheel.'),
      p('Den Verkehr nicht beobachten, während die Front ausschwenkt.', 'Not watching traffic while the front swings out.'),
      p('Zu viele Korrekturzüge.', 'Too many corrections.'),
    ],
    phrases: [],
  },
  {
    key: 'bay',
    icon: 'grid',
    diagram: 'bay',
    title: p('Einparken quer oder schräg', 'Bay parking (straight or angled)'),
    body: [
      p(
        'Sie parken vorwärts oder rückwärts in eine Parkbucht quer oder schräg zur Fahrbahn, z. B. auf einem Parkplatz. Das Auto soll mittig und gerade stehen, ohne die Linien zu überfahren.',
        'You park forwards or backwards in a bay at right angles or diagonally to the road, for instance in a car park. The car should end up centred and straight, without crossing the lines.',
      ),
      p(
        'Rückwärts ist meist leichter, weil die Vorderräder lenken: Fahren Sie an der Lücke vorbei, schlagen Sie ein, wenn Ihr Heck etwa an der zweiten Linie vorbei ist, und richten Sie das Auto an den Linien aus.',
        'Reversing in is usually easier, because the front wheels do the steering: drive past the space, steer in once your rear is about past the far line, and line the car up with the markings.',
      ),
    ],
    checklist: [
      p('Blinken, bevor ich in die Lücke fahre', 'Signal before turning into the space'),
      p('Auf Fußgänger auf dem Parkplatz achten', 'Watch for pedestrians in the car park'),
      p('Mittig zwischen den Linien, Räder gerade', 'Centred between the lines, wheels straight'),
    ],
    pitfalls: [p('Ein Nachbarfahrzeug fast berühren, ohne zu stoppen.', 'Almost touching a neighbouring car without stopping.')],
    phrases: [],
  },
  {
    key: 'corner',
    icon: 'return-down-back',
    diagram: 'corner',
    title: p('Rückwärts um eine Ecke', 'Reversing round a corner'),
    body: [
      p(
        'Sie fahren rückwärts nach rechts in eine Einmündung, Kreuzung oder Einfahrt und folgen dabei dem Bordstein in gleichmäßigem Abstand.',
        'You reverse to the right into a side road, junction or entrance, following the kerb at an even distance.',
      ),
      p(
        'Fahren Sie an der Einmündung vorbei und halten Sie nahe am Bordstein. Langsam zurück; wenn der Bordstein im rechten Spiegel abknickt, rechts einlenken. Nach der Ecke geradeaus zurück, bis der Prüfer stoppt.',
        'Drive past the opening and stop close to the kerb. Reverse slowly; when you see the kerb curve away in the right mirror, start steering right. After the corner, straighten and reverse until the examiner stops you.',
      ),
    ],
    checklist: [
      p('Vor und während des Zurücksetzens rundum beobachten', 'Look all round before and while reversing'),
      p('Fußgänger an der Ecke durchlassen', 'Let pedestrians at the corner go first'),
      p('Gleichmäßiger Abstand zum Bordstein', 'Even distance from the kerb'),
    ],
    pitfalls: [p('Die Front schwenkt in den Gegenverkehr aus, ohne dass ich es bemerke.', 'The front swings out into oncoming traffic without my noticing.')],
    phrases: [],
  },
  {
    key: 'turnround',
    icon: 'repeat',
    diagram: 'turnround',
    title: p('Umkehren', 'Turning round'),
    body: [
      p(
        'Sie wenden das Auto auf einer Straße in die Gegenrichtung, durch Vorwärts- und Rückwärtsfahren. Der Bordstein darf dabei nicht berührt werden.',
        'You turn the car to face the other way on a road, using forward and reverse. You must not touch the kerbs.',
      ),
    ],
    checklist: [
      p('Nur, wo es erlaubt und übersichtlich ist', 'Only where it is allowed and you can see well'),
      p('Vor jedem Zug in beide Richtungen schauen', 'Look both ways before each move'),
      p('Langsam fahren, schnell lenken', 'Move slowly, steer quickly'),
    ],
    pitfalls: [p('Den Verkehr behindern, statt ihn vorbeizulassen.', 'Holding traffic up instead of letting it pass.')],
    phrases: [],
  },
  {
    key: 'emergency',
    icon: 'hand-left',
    diagram: 'emergency',
    title: p('Gefahrbremsung', 'Emergency stop'),
    body: [
      p(
        'Aus etwa 30 km/h bremsen Sie auf Kommando des Prüfers so stark wie möglich bis zum Stillstand. Das Fahrzeug soll dabei in der Spur bleiben.',
        'From about 30 km/h you brake as hard as possible to a standstill when the examiner gives the signal. The car should stay straight.',
      ),
      p(
        'Mit ABS: Bremse und Kupplung voll durchtreten und halten. Das Rattern im Pedal ist normal. Vorher prüft der Prüfer, dass niemand hinter Ihnen fährt.',
        'With ABS: press brake and clutch fully down and hold them. The juddering in the pedal is normal. The examiner checks beforehand that nobody is behind you.',
      ),
    ],
    checklist: [
      p('Erst auf das Kommando reagieren, nicht vorher', 'React on the command, not before'),
      p('Voll durchtreten, nicht zögerlich steigern', 'Press fully, not gradually'),
      p('Danach Warnblinker oder Spiegelblick, bevor ich weiterfahre', 'Afterwards, hazards or a mirror check before moving on'),
    ],
    pitfalls: [p('Zu zaghaft bremsen.', 'Braking too gently.')],
    phrases: [],
  },
  {
    key: 'competences',
    icon: 'eye',
    diagram: null,
    title: p('Die fünf Kompetenzbereiche', 'The five competence areas'),
    body: [
      p(
        'Der Prüfer bewertet nicht einzelne „Fehler“ für sich, sondern wie Sie in fünf Bereichen fahren – über die ganze Prüfung hinweg und in Situationen wie Kreuzungen, Kreisverkehren, Fahrstreifenwechseln, Autobahnauffahrten, Kurven und Fußgängerüberwegen.',
        'The examiner does not just tally individual "mistakes" but judges how you drive in five areas - across the whole test and in situations such as junctions, roundabouts, lane changes, motorway slip roads, bends and zebra crossings.',
      ),
    ],
    checklist: [
      p('Verkehrsbeobachtung: Spiegel, Schulterblick, vorausschauen', 'Observation: mirrors, shoulder checks, looking ahead'),
      p('Fahrzeugpositionierung: richtige Spur, Abstand nach vorne und zur Seite', 'Positioning: the right lane, distance ahead and to the side'),
      p('Geschwindigkeitsanpassung: Tempo passend zu Limit, Sicht und Situation', 'Speed: matched to the limit, the view and the situation'),
      p('Kommunikation: rechtzeitig blinken, Blickkontakt, klare Absichten', 'Communication: signal in time, eye contact, clear intentions'),
      p('Fahrzeugbedienung und umweltbewusstes Fahren: Schalten, Lenken, sanftes Bremsen', 'Vehicle control and eco driving: gear changes, steering, smooth braking'),
    ],
    pitfalls: [],
    phrases: [],
  },
  {
    key: 'fail',
    icon: 'close-circle',
    diagram: null,
    title: p('Woran Prüflinge am häufigsten scheitern', 'What people most often fail for'),
    body: [
      p(
        'Kleine Unsicherheiten führen nicht zum Nichtbestehen. Eine Prüfung ist nicht bestanden bei einem erheblichen Fehler – etwa wenn jemand gefährdet wird – oder wenn sich viele kleinere Fehler wiederholen.',
        'Small slips do not fail you. You fail for a serious mistake - for example when someone is put in danger - or when smaller mistakes keep repeating.',
      ),
    ],
    checklist: [],
    pitfalls: [
      p('Vorfahrt missachtet, besonders „rechts vor links“ in Tempo-30-Zonen', 'Ignoring right of way, especially "right before left" in 30 zones'),
      p('Kein Schulterblick beim Abbiegen, Anfahren oder Spurwechsel', 'No shoulder check when turning, pulling away or changing lanes'),
      p('Am Stoppschild nicht vollständig angehalten', 'Not coming to a full stop at a STOP sign'),
      p('Fußgänger am Zebrastreifen nicht durchgelassen', 'Not letting pedestrians cross at a zebra'),
      p('Deutlich zu schnell, z. B. in einer 30-Zone', 'Clearly speeding, for example in a 30 zone'),
      p('Rote Ampel überfahren', 'Running a red light'),
      p('Der Fahrlehrer muss eingreifen (Doppelbremse oder Lenkrad)', 'The instructor has to intervene (dual brake or steering)'),
    ],
    phrases: [],
  },
  {
    key: 'phrases',
    icon: 'chatbubbles',
    diagram: null,
    title: p('Was der Prüfer sagt', 'What the examiner says'),
    body: [
      p(
        'Die praktische Prüfung findet auf Deutsch statt. Der Prüfer gibt die Richtung rechtzeitig an. Haben Sie etwas nicht verstanden, fragen Sie nach – das ist kein Fehler.',
        'The practical test is in German. The examiner gives directions in good time. If you do not understand, ask - that is not a mistake.',
      ),
    ],
    checklist: [],
    pitfalls: [],
    phrases: [
      p('An der nächsten Kreuzung bitte rechts abbiegen.', 'At the next junction, please turn right.'),
      p('Bitte biegen Sie links ab.', 'Please turn left.'),
      p('Fahren Sie bitte geradeaus weiter.', 'Please carry straight on.'),
      p('Folgen Sie bitte dem Straßenverlauf.', 'Please follow the road.'),
      p('Folgen Sie der Beschilderung Richtung Autobahn.', 'Follow the signs for the motorway.'),
      p('Im Kreisverkehr bitte die zweite Ausfahrt nehmen.', 'At the roundabout, please take the second exit.'),
      p('Halten Sie bitte hier rechts am Fahrbahnrand an.', 'Please pull over here on the right.'),
      p('Parken Sie bitte hinter dem blauen Auto rückwärts ein.', 'Please reverse park behind the blue car.'),
      p('Bitte wenden Sie hier.', 'Please turn round here.'),
      p('Wenn ich „Stopp“ sage, machen Sie bitte eine Gefahrbremsung.', 'When I say "Stopp", please do an emergency stop.'),
      p('Fahren Sie bitte wieder an, wenn es die Verkehrslage erlaubt.', 'Please move off again when traffic allows.'),
      p('Die Prüfung ist beendet. Sie haben bestanden.', 'The test is over. You have passed.'),
    ],
  },
];
