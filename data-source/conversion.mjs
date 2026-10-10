/**
 * Converting a foreign licence (Umschreibung), for newcomers who already
 * drive. Rules: FeV §§ 28-31 and Anlage 11 (the list of states whose
 * licences convert with fewer or no tests; last amended August 2026, when
 * Ukraine and Montenegro were added).
 *
 * The country list itself is not reproduced: it is long, it changes, and it
 * differs by licence class. The app links to the official text and says,
 * clearly, to confirm with the local licensing office.
 */
const p = (de, en) => [de, en];

export default [
  {
    key: 'eu',
    title: p('Führerschein aus der EU oder dem EWR', 'A licence from the EU or EEA'),
    body: [
      p(
        'Ein gültiger Führerschein aus einem EU- oder EWR-Staat (EU plus Island, Liechtenstein, Norwegen) gilt in Deutschland weiter. Umschreiben müssen Sie ihn nicht.',
        'A valid licence from an EU or EEA country (the EU plus Iceland, Liechtenstein and Norway) stays valid in Germany. You do not need to convert it.',
      ),
      p(
        'Befristete Führerscheine verlängern Sie nach dem Umzug bei der deutschen Fahrerlaubnisbehörde.',
        'If your licence has an expiry date, you renew it at the German licensing office once you live here.',
      ),
    ],
  },
  {
    key: 'six-months',
    title: p('Alle anderen: sechs Monate', 'Everyone else: six months'),
    body: [
      p(
        'Mit einem Führerschein aus einem anderen Staat dürfen Sie ab dem Tag, an dem Sie Ihren Wohnsitz in Deutschland anmelden, noch sechs Monate fahren. Wer nur vorübergehend bleibt, kann eine Verlängerung um bis zu sechs Monate beantragen.',
        'With a licence from any other country you may drive for six months from the day you take up residence in Germany. If you are only staying temporarily, you can apply for up to six more months.',
      ),
      p(
        'Danach brauchen Sie einen deutschen Führerschein. Wer nach Ablauf der Frist mit dem ausländischen Führerschein fährt, fährt ohne Fahrerlaubnis – das ist eine Straftat.',
        'After that you need a German licence. Driving on the foreign one after the deadline counts as driving without a licence, which is a criminal offence.',
      ),
      p(
        'Ist Ihr Führerschein nicht auf Deutsch und entspricht keinem internationalen Muster, brauchen Sie während der sechs Monate eine Übersetzung oder einen internationalen Führerschein.',
        'If your licence is not in German and does not follow an international model, you need a translation or an International Driving Permit during those six months.',
      ),
    ],
  },
  {
    key: 'which-case',
    title: p('Welche Prüfungen Sie brauchen', 'Which tests you need'),
    body: [
      p(
        'Das hängt davon ab, ob Ihr Ausstellerstaat in Anlage 11 der Fahrerlaubnis-Verordnung steht – und für welche Klasse. Es gibt drei Fälle:',
        'It depends on whether your issuing country is listed in Annex 11 of the Driving Licence Regulation, and for which class. There are three cases:',
      ),
      p(
        '1. Ihr Staat steht für Klasse B ohne Prüfung in der Liste (zum Beispiel Japan, die Schweiz, das Vereinigte Königreich und seit August 2026 die Ukraine): Sie beantragen die Umschreibung, Prüfungen entfallen.',
        '1. Your country is listed for class B with no tests (for example Japan, Switzerland, the United Kingdom and, since August 2026, Ukraine): you apply and the tests are waived.',
      ),
      p(
        '2. Ihr Staat steht mit „nur theoretische Prüfung“ in der Liste: Sie legen die Theorieprüfung ab, die Fahrprüfung entfällt.',
        '2. Your country is listed as "theory test only": you take the theory test and the practical test is waived.',
      ),
      p(
        '3. Ihr Staat steht nicht in der Liste (das betrifft viele Länder, darunter auch einige US-Bundesstaaten und kanadische Provinzen, die einzeln aufgeführt sind): Sie legen Theorie- und Fahrprüfung ab. Fahrstunden sind dann nicht vorgeschrieben – die Prüfung machen Sie aber im Auto einer Fahrschule.',
        '3. Your country is not listed (true of many countries, and of some US states and Canadian provinces, which are listed individually): you take both the theory and the practical test. Lessons are not compulsory, but you take the test in a driving school car.',
      ),
      p(
        'Die Liste ändert sich. Prüfen Sie den aktuellen Text der Anlage 11 und fragen Sie Ihre Fahrerlaubnisbehörde, bevor Sie etwas buchen.',
        'The list changes. Check the current text of Annex 11 and ask your local licensing office before you book anything.',
      ),
    ],
  },
  {
    key: 'documents',
    title: p('Antrag und Unterlagen', 'Applying and what to bring'),
    body: [
      p(
        'Den Antrag stellen Sie bei der Fahrerlaubnisbehörde (Führerscheinstelle) Ihres Wohnorts, möglichst früh – die Bearbeitung dauert oft Wochen.',
        'You apply at the licensing office (Führerscheinstelle) where you live, as early as you can; processing often takes weeks.',
      ),
      p(
        'Üblich sind: Ihr ausländischer Führerschein im Original, eine Übersetzung (z. B. von ADAC oder einem vereidigten Übersetzer), Pass oder Ausweis, Meldebescheinigung, ein biometrisches Passfoto, ein Sehtest und meist ein Nachweis über einen Erste-Hilfe-Kurs. Welche Unterlagen genau nötig sind, sagt Ihnen die Behörde.',
        'Usually: your original foreign licence, a translation (e.g. from ADAC or a sworn translator), passport or ID, registration certificate (Meldebescheinigung), a biometric photo, an eye test and usually a first-aid course certificate. The office tells you exactly what it needs.',
      ),
      p(
        'Mit dem deutschen Führerschein geben Sie den ausländischen ab.',
        'When you receive the German licence, you hand in the foreign one.',
      ),
    ],
  },
  {
    key: 'tests',
    title: p('Wenn Sie Prüfungen ablegen müssen', 'If you have to take the tests'),
    body: [
      p(
        'Melden Sie sich bei einer Fahrschule an; sie meldet Sie zur Prüfung beim TÜV oder bei der DEKRA an. Die Theorieprüfung können Sie in Deutsch oder in einer von zwölf weiteren Sprachen ablegen – dieselben Sprachen wie in dieser App.',
        'Sign up with a driving school; it registers you for the test with TÜV or DEKRA. You can sit the theory test in German or one of twelve other languages - the same languages as this app.',
      ),
      p(
        'Auch erfahrene Fahrer sollten ein paar Fahrstunden nehmen: Die Prüfung achtet auf Dinge, die anderswo anders laufen – „rechts vor links“, der Schulterblick bei jedem Abbiegen, Tempo-30-Zonen und das genaue Halten am Stoppschild.',
        'Even experienced drivers should take a few lessons: the test looks for things that work differently elsewhere - "right before left", a shoulder check on every turn, 30 zones and a full stop at every STOP sign.',
      ),
    ],
  },
  {
    key: 'costs',
    title: p('Was es ungefähr kostet', 'What it roughly costs'),
    body: [
      p(
        'Die Gebühren unterscheiden sich je nach Stadt und Fahrschule. Als grobe Orientierung: Behördengebühr etwa 40 bis 50 €, Übersetzung 30 bis 60 €, Theorieprüfung beim TÜV oder der DEKRA etwa 25 €, Fahrprüfung etwa 130 €, dazu die Kosten der Fahrschule für Anmeldung, Fahrstunden und das Auto zur Prüfung.',
        'Fees vary by city and driving school. As a rough guide: office fee around €40-50, translation €30-60, theory test at TÜV or DEKRA about €25, practical test about €130, plus the driving school’s costs for registration, lessons and the car on test day.',
      ),
    ],
  },
];
