/**
 * The thirteen languages the German theory test can be sat in: German plus the
 * twelve official foreign-language versions. The app studies in the same
 * language you will sit the test in.
 */
export type Lang =
  | 'de'
  | 'en'
  | 'tr'
  | 'ar'
  | 'ru'
  | 'pl'
  | 'ro'
  | 'hr'
  | 'el'
  | 'it'
  | 'es'
  | 'pt'
  | 'fr';

/**
 * Text in every language. German and English are always present - German is
 * the source, English the fallback - and the rest are filled in by the
 * translation files. A missing language falls back to English, never to blank.
 */
export type L = { de: string; en: string } & Partial<Record<Lang, string>>;

/**
 * Sections of the official catalogue, so a question written here can later be
 * matched to (or replaced by) the official one. "Grundstoff" applies to every
 * licence class; "Zusatzstoff" is the class B extra material.
 */
export type SectionKey =
  | '1.1' // Gefahrenlehre
  | '1.2' // Verhalten im Straßenverkehr
  | '1.3' // Vorfahrt, Vorrang
  | '1.4' // Verkehrszeichen
  | '1.5' // Umweltschutz
  | '2.1' // Gefahrenlehre (Zusatzstoff B)
  | '2.2' // Verhalten im Straßenverkehr (Zusatzstoff B)
  | '2.4' // Verkehrszeichen (Zusatzstoff B)
  | '2.5' // Umweltschutz (Zusatzstoff B)
  | '2.6' // Vorschriften über den Betrieb der Fahrzeuge
  | '2.7'; // Technik

export type TopicKey =
  | 'basics'
  | 'priority'
  | 'signals'
  | 'signs'
  | 'speed'
  | 'overtaking'
  | 'turning'
  | 'parking'
  | 'people'
  | 'rail'
  | 'motorway'
  | 'hazards'
  | 'fitness'
  | 'vehicle'
  | 'eco'
  | 'law';

export type Topic = {
  key: TopicKey;
  title: L;
  /** One line under the title. */
  blurb: L;
  icon: string;
  color: string;
  /** Where this sits on the learning path. */
  order: number;
};

/* ------------------------------------------------------------- scenes */

/** Compass arms of a junction, as seen from above with north at the top. */
export type Arm = 'n' | 'e' | 's' | 'w';
export type Turn = 'straight' | 'left' | 'right' | 'uturn' | 'stop';

export type ActorKind =
  | 'you'
  | 'car'
  | 'truck'
  | 'bus'
  | 'tram'
  | 'bike'
  | 'moto'
  | 'ped'
  | 'child'
  | 'police'
  | 'ambulance'
  | 'tractor'
  | 'deer'
  | 'ball';

export type Actor = {
  kind: ActorKind;
  /** Which approach the actor is on, entering the junction. */
  arm?: Arm;
  /** 1 = at the line, 2 = one car length back, 3 = further back. */
  slot?: number;
  /** Free position in the 0-100 scene box, for anything not on an arm. */
  at?: [number, number];
  /** Heading in degrees, 0 = north (up). Derived from the arm when omitted. */
  heading?: number;
  /** Where the actor is going, drawn as an arrow. */
  turn?: Turn;
  blinker?: 'left' | 'right' | 'hazard';
  /** Number or letter shown on the roof, used by "in which order" questions. */
  label?: string;
  /** Blue lights / siren on. */
  siren?: boolean;
  /** Lane, counted from the right edge, for multi-lane roads. */
  lane?: number;
};

export type LightState = 'red' | 'amber' | 'redAmber' | 'green' | 'off' | 'flashing' | 'greenArrow';

export type RoadKind =
  | 'cross'
  | 'tee' // through road east-west, side road from the south
  | 'teeNorth' // through road east-west, side road from the north
  | 'straight' // one road north-south, two-way
  | 'oneway' // north-south, one direction
  | 'roundabout'
  | 'motorway'
  | 'curve'
  | 'rail' // north-south road crossing an east-west railway
  | 'tramline' // north-south road with tram tracks in the middle
  | 'parking';

export type MarkingKind = 'zebra' | 'stopLine' | 'giveWayLine' | 'solidCentre' | 'cycleLane';

/** A marking, optionally on one arm: "zebra" (south arm) or "stopLine:e". */
export type Marking = MarkingKind | `${MarkingKind}:${Arm}`;

export type Scene = {
  road: RoadKind;
  actors: Actor[];
  /** Signs placed on an approach, seen by the traffic on that arm. */
  signs?: { sign: string; arm: Arm; extra?: string }[];
  lights?: { arm: Arm; state: LightState }[];
  /** A police officer standing in the junction, facing the given arm. */
  officer?: { facing: 'ns' | 'ew'; arms: 'side' | 'up' | 'forward' };
  markings?: Marking[];
  /** Arms where the priority road runs, for bending priority (Z 306 + 1002). */
  priorityPath?: Arm[];
  conditions?: ('rain' | 'snow' | 'fog' | 'night' | 'ice' | 'wind')[];
};

/* ---------------------------------------------------------- questions */

export type Question = {
  id: string;
  topic: TopicKey;
  section: SectionKey;
  /** Grundstoff (every class) or Zusatzstoff for class B. */
  basic: boolean;
  /** Error points if answered wrong, as in the real exam: 2 to 5. */
  points: 2 | 3 | 4 | 5;
  kind: 'choice' | 'number';
  prompt: L;
  /** Two to four options for `choice`; empty for `number`. */
  options: L[];
  /** Indices of every correct option. All of them must be ticked. */
  correct: number[];
  /** For `number` questions: the exact value expected. */
  answerNumber: number | null;
  /** Unit after the input box, e.g. "m" or "km/h". */
  unit: string | null;
  /** Why the right answer is right, in plain words. */
  why: L;
  /** A one-line hook to remember it by, if there is a good one. */
  tip: L | null;
  /** What the card shows: a drawn traffic scene, signs, or neither. */
  scene: Scene | null;
  signs: string[];
  /**
   * Official catalogue number this question covers (e.g. "1.3.01-010"),
   * filled in when the official texts are imported. Null for our own questions.
   */
  officialRef: string | null;
  /** True when the text is the official catalogue wording. */
  official: boolean;
};

/* -------------------------------------------------------------- signs */

export type SignCategory =
  | 'danger'
  | 'priority'
  | 'mandatory'
  | 'prohibition'
  | 'parking'
  | 'info'
  | 'extra'
  | 'marking';

export type SignInfo = {
  /** Official number in the StVO annexes, e.g. "205" or "274.1". */
  id: string;
  category: SignCategory;
  name: L;
  /** What it means for you, in one or two sentences. */
  meaning: L;
};

/* ----------------------------------------------------- practical exam */

export type GuideSection = {
  key: string;
  title: L;
  icon: string;
  /** Short paragraphs. */
  body: L[];
  /** Ticked off one by one on the day. */
  checklist: L[];
  /** The mistakes examiners actually fail people for. */
  pitfalls: L[];
  /** Diagram key for the animated manoeuvre drawing, if any. */
  diagram: string | null;
  /**
   * Phrases the examiner uses: `de` is what you will hear, the other
   * languages are what it means.
   */
  phrases: L[];
};

export type ConversionStep = {
  key: string;
  title: L;
  body: L[];
};

/* ------------------------------------------------------------- meta */

export type Meta = {
  topics: Topic[];
  counts: {
    questions: number;
    basic: number;
    classB: number;
    signs: number;
    byTopic: Record<TopicKey, number>;
  };
  /** Per language: share of question text that is translated (0-1). */
  coverage: Record<Lang, number>;
  catalogue: {
    /** Version of the official catalogue the exam rules follow. */
    validFrom: string;
    officialQuestionsB: number;
  };
};

/* ---------------------------------------------------------- settings */

export type Appearance = 'system' | 'light' | 'dark';
export type GoalId = 'casual' | 'regular' | 'serious' | 'intense';

export type Settings = {
  /** The language you study and will sit the test in. */
  language: Lang;
  /**
   * Show the German original under a translated question. Off by default for
   * German itself; on for everyone else, because road signs and the examiner
   * on the practical test are German whatever language the theory was in.
   */
  showGerman: boolean;
  appearance: Appearance;
  haptics: boolean;
  goal: GoalId;
  /** ISO yyyy-mm-dd of the theory test, or null if not booked. */
  examDate: string | null;
  onboarded: boolean;
};

/** Leitner-box state for one question or sign. Box 0 new, 5 mastered. */
export type CardProgress = {
  box: number;
  seen: number;
  correct: number;
  last: number;
  due: number;
};

export type ExamResult = {
  at: number;
  errorPoints: number;
  /** How many 5-point questions were answered wrong. */
  fivePointMisses: number;
  passed: boolean;
  correct: number;
  total: number;
  /** Seconds used. */
  duration: number;
  /** Ids answered wrong, so they can be studied straight away. */
  missed: string[];
};

export type Progress = {
  cards: Record<string, CardProgress>;
  exams: ExamResult[];
  /** Practical-exam checklist items ticked, by `section:index`. */
  checks: Record<string, boolean>;
  lastStudyDay: string | null;
  streak: number;
  bestStreak: number;
  xp: number;
  xpToday: number;
  xpDay: string | null;
  goalDays: string[];
};
