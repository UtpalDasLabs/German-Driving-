/**
 * Design tokens.
 *
 * The app should feel like a game you want to open, not a form you have to
 * fill in, so the system is built on saturated colour, chunky rounded shapes
 * and heavy type. Buttons carry a solid bottom edge that compresses when
 * pressed - the single detail that makes the whole UI feel tactile.
 *
 * The accent is road-sign blue - the colour of every sign that tells you what
 * you may do - with the warning red and priority yellow of the signs beside
 * it, pushed to friendlier values so sixteen topics can sit side by side.
 */

export const palette = {
  gold: '#FFC63D',
  goldDeep: '#E8A600',
  red: '#FF4B4B',
  redDeep: '#D93025',
  green: '#4CC93F',
  greenDeep: '#3AA32F',
  blue: '#2BB3F3',
  blueDeep: '#1892CC',
  purple: '#A472F0',
  ink: '#14181F',
} as const;

type Scheme = {
  bg: string;
  bgElevated: string;
  surface: string;
  surfaceAlt: string;
  /** Flat fill behind an inactive control. */
  track: string;
  border: string;
  borderStrong: string;
  text: string;
  textMuted: string;
  textFaint: string;
  accent: string;
  accentEdge: string;
  onAccent: string;
  success: string;
  successEdge: string;
  successBg: string;
  danger: string;
  dangerEdge: string;
  dangerBg: string;
  info: string;
  infoBg: string;
  streak: string;
  xp: string;
  shadow: string;
  overlay: string;
};

export const light: Scheme = {
  bg: '#FFFFFF',
  bgElevated: '#F7F9FC',
  surface: '#FFFFFF',
  surfaceAlt: '#F1F4F9',
  track: '#E5E9F0',
  border: '#E2E7EF',
  borderStrong: '#C8D0DD',
  text: '#14181F',
  textMuted: '#5C6675',
  textFaint: '#8C97A8',
  accent: '#1E88E5',
  accentEdge: '#1565C0',
  onAccent: '#FFFFFF',
  success: '#2FB344',
  successEdge: '#23913A',
  successBg: '#E6F7E9',
  danger: '#FF4B4B',
  dangerEdge: '#D93025',
  dangerBg: '#FFECEB',
  info: '#2BB3F3',
  infoBg: '#E6F5FE',
  streak: '#FF9600',
  xp: '#FFC63D',
  shadow: 'rgba(20, 24, 31, 0.10)',
  overlay: 'rgba(20, 24, 31, 0.55)',
};

export const dark: Scheme = {
  bg: '#131720',
  bgElevated: '#1A2030',
  surface: '#1D2433',
  surfaceAlt: '#252D3F',
  track: '#2E384D',
  border: '#2B3447',
  borderStrong: '#3D4A63',
  text: '#F3F6FB',
  textMuted: '#A3AFC2',
  textFaint: '#74829A',
  accent: '#3B9BEF',
  accentEdge: '#1E6FB8',
  onAccent: '#FFFFFF',
  success: '#4CC93F',
  successEdge: '#2F8827',
  successBg: '#14301A',
  danger: '#FF6B5B',
  dangerEdge: '#C3392C',
  dangerBg: '#3A1A16',
  info: '#2BB3F3',
  infoBg: '#10293A',
  streak: '#FFA726',
  xp: '#FFC63D',
  shadow: 'rgba(0, 0, 0, 0.55)',
  overlay: 'rgba(0, 0, 0, 0.7)',
};

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30,
  pill: 999,
} as const;

/**
 * Depth of the solid bottom edge under pressable surfaces. The button moves
 * down by exactly this much when pressed, so the edge disappears instead of
 * the whole control jumping.
 */
export const edge = { sm: 3, md: 4, lg: 5 } as const;

export const type = {
  display: { fontSize: 34, lineHeight: 40, fontWeight: '800' },
  title: { fontSize: 26, lineHeight: 32, fontWeight: '800' },
  heading: { fontSize: 20, lineHeight: 27, fontWeight: '800' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '600' },
  bodyStrong: { fontSize: 16, lineHeight: 24, fontWeight: '800' },
  /** Long-form reading and listening texts, where 24pt lines are too tight. */
  prose: { fontSize: 16, lineHeight: 27, fontWeight: '500' },
  small: { fontSize: 14, lineHeight: 21, fontWeight: '600' },
  caption: { fontSize: 12, lineHeight: 17, fontWeight: '700' },
  overline: { fontSize: 11, lineHeight: 14, fontWeight: '800', letterSpacing: 1 },
} as const;

export type Theme = {
  colors: Scheme;
  dark: boolean;
  space: typeof space;
  radius: typeof radius;
  edge: typeof edge;
  type: typeof type;
  palette: typeof palette;
};
