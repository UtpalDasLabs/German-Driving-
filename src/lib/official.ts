/**
 * Official sources the app points to. This app is independent: it is not
 * affiliated with TÜV, DEKRA, the TÜV|DEKRA arge tp 21, the Federal Ministry
 * of Transport or any licensing authority.
 */
export const OFFICIAL = {
  /** The road traffic regulations, the law every question rests on. */
  stvo: 'https://www.gesetze-im-internet.de/stvo_2013/',
  /** Driving licence regulation: tests, probation, foreign licences. */
  fev: 'https://www.gesetze-im-internet.de/fev_2010/',
  /** Annex 11: countries whose licences convert with fewer or no tests. */
  anlage11: 'https://www.gesetze-im-internet.de/fev_2010/anlage_11.html',
  /** Annex 7: how the theory and practical tests are run. */
  anlage7: 'https://www.gesetze-im-internet.de/fev_2010/anlage_7.html',
  /** The points register in Flensburg. */
  points: 'https://www.kba.de/DE/Themen/ZentraleRegister/FAER/faer_node.html',
  /** TÜV | DEKRA arge tp 21, publisher of the official question catalogue. */
  argeTp21: 'https://www.tuev-dekra.de/',
} as const;

export const LINKS: { key: keyof typeof OFFICIAL; label: { de: string; en: string } }[] = [
  { key: 'stvo', label: { de: 'Straßenverkehrs-Ordnung (StVO)', en: 'Road Traffic Regulations (StVO)' } },
  { key: 'fev', label: { de: 'Fahrerlaubnis-Verordnung (FeV)', en: 'Driving Licence Regulation (FeV)' } },
  { key: 'anlage7', label: { de: 'FeV Anlage 7: die Prüfungen', en: 'FeV Annex 7: the tests' } },
  { key: 'argeTp21', label: { de: 'TÜV | DEKRA arge tp 21', en: 'TÜV | DEKRA arge tp 21' } },
  { key: 'points', label: { de: 'Fahreignungsregister (KBA)', en: 'Driving points register (KBA)' } },
];
