/**
 * The learning path. Order is the order a driving school would teach it in:
 * the rules that decide who goes first, then signs, then everything that
 * comes up on a real drive, then the class B extra material.
 */
export default [
  { key: 'priority', order: 1, icon: 'git-merge', color: '#FF4B4B', title: ['Vorfahrt', 'Right of way'], blurb: ['Rechts vor links, Schilder, Abbiegen, Kreisverkehr', 'Right before left, signs, turning, roundabouts'] },
  { key: 'signals', order: 2, icon: 'stopwatch', color: '#F59E0B', title: ['Ampel & Polizei', 'Lights & police'], blurb: ['Wer wen überstimmt, Blaulicht, Grünpfeil', 'Who overrules whom, blue lights, green arrow'] },
  { key: 'signs', order: 3, icon: 'warning', color: '#2BB3F3', title: ['Verkehrszeichen', 'Road signs'], blurb: ['Gefahr, Gebot, Verbot, Markierungen', 'Warning, mandatory, prohibition, markings'] },
  { key: 'basics', order: 4, icon: 'compass', color: '#5B7CF5', title: ['Grundregeln', 'Ground rules'], blurb: ['Rechtsfahren, Spurwechsel, Reißverschluss', 'Keeping right, lane changes, zip merge'] },
  { key: 'speed', order: 5, icon: 'speedometer', color: '#A472F0', title: ['Tempo & Abstand', 'Speed & distance'], blurb: ['Limits, Anhalteweg, Faustformeln', 'Limits, stopping distance, rules of thumb'] },
  { key: 'overtaking', order: 6, icon: 'swap-horizontal', color: '#0FA3B1', title: ['Überholen', 'Overtaking'], blurb: ['Wann, wie, mit wie viel Abstand', 'When, how, with how much room'] },
  { key: 'turning', order: 7, icon: 'return-up-forward', color: '#18B98A', title: ['Abbiegen & Wenden', 'Turning & reversing'], blurb: ['Schulterblick, Einordnen, Rückwärtsfahren', 'Shoulder checks, positioning, reversing'] },
  { key: 'people', order: 8, icon: 'walk', color: '#F45D9C', title: ['Fußgänger & Radfahrer', 'Pedestrians & cyclists'], blurb: ['Kinder, Zebrastreifen, Seitenabstand', 'Children, zebra crossings, clearance'] },
  { key: 'rail', order: 9, icon: 'train', color: '#FF9F1C', title: ['Bahn & Bus', 'Trains & buses'], blurb: ['Bahnübergang, Straßenbahn, Haltestellen', 'Level crossings, trams, bus stops'] },
  { key: 'parking', order: 10, icon: 'car', color: '#4CC93F', title: ['Halten & Parken', 'Stopping & parking'], blurb: ['Wo nicht, wie lange, Parkscheibe', 'Where not, how long, parking disc'] },
  { key: 'motorway', order: 11, icon: 'trail-sign', color: '#2E7DD7', title: ['Autobahn', 'Motorway'], blurb: ['Auffahren, Rettungsgasse, Panne', 'Joining, emergency corridor, breakdowns'] },
  { key: 'hazards', order: 12, icon: 'rainy', color: '#3B82C4', title: ['Gefahren', 'Hazards'], blurb: ['Nässe, Glätte, Nacht, Wild, Ablenkung', 'Wet, ice, night, animals, distraction'] },
  { key: 'fitness', order: 13, icon: 'wine', color: '#E5484D', title: ['Alkohol & Müdigkeit', 'Alcohol & fatigue'], blurb: ['Promille, Cannabis, Medikamente', 'Alcohol limits, cannabis, medicines'] },
  { key: 'vehicle', order: 14, icon: 'construct', color: '#8E6BE8', title: ['Fahrzeug & Technik', 'Car & technology'], blurb: ['Reifen, Warnleuchten, Ladung, Anhänger', 'Tyres, warning lights, loads, trailers'] },
  { key: 'eco', order: 15, icon: 'leaf', color: '#3DBB6E', title: ['Umwelt', 'Environment'], blurb: ['Sparsam fahren, Lärm, Umweltzone', 'Economical driving, noise, low-emission zones'] },
  { key: 'law', order: 16, icon: 'document-text', color: '#64748B', title: ['Pflichten & Recht', 'Duties & the law'], blurb: ['Unfall, Probezeit, Punkte, Papiere', 'Accidents, probation, points, papers'] },
];
