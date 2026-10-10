import React from 'react';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

import { useTheme } from '@/theme/ThemeProvider';

/**
 * Little pictures of the browser chrome you are being told to tap.
 *
 * "Tap the Share button" is a useless instruction if you do not already know
 * which of five identical grey glyphs the Share button is - and the people who
 * most need to install the app are exactly the people who do not. So each step
 * draws the relevant bar or menu and puts a blue ring around the one thing to
 * press.
 *
 * Everything is drawn from theme tokens rather than fixed greys, so the
 * mockups stay legible in dark mode instead of becoming a black rectangle on a
 * black card. They are deliberately vague about everything except the target:
 * no real logos, no pretend page content, nothing that dates when a browser
 * restyles itself.
 */

type Parts = {
  /** Card background - the "screen" the mockup draws. */
  bg: string;
  /** Neutral filler standing in for text, icons and page content. */
  fill: string;
  /** Outline of the mockup card itself. */
  edge: string;
  /** The highlight colour: rings and outlines around the thing to press. */
  tint: string;
};

const W = 320;
const H = 150;

/** The frame every scene sits inside. */
function Frame({ p, children }: { p: Parts; children: React.ReactNode }) {
  return (
    <G>
      <Rect x={14} y={8} width={292} height={134} rx={14} fill={p.bg} stroke={p.edge} strokeWidth={2} />
      {children}
    </G>
  );
}

/** A blue ring around whatever must be tapped. */
function Ring({ x, y, r, p }: { x: number; y: number; r: number; p: Parts }) {
  return <Circle cx={x} cy={y} r={r} fill="none" stroke={p.tint} strokeWidth={3} />;
}

/** The iOS share glyph: a box with an arrow leaving the top. */
function ShareGlyph({ x, y, p, color }: { x: number; y: number; p: Parts; color?: string }) {
  const c = color ?? p.tint;
  return (
    <G stroke={c} strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d={`M${x - 8} ${y + 1} v${11} h16 v-11`} />
      <Path d={`M${x} ${y + 6} v-16`} />
      <Path d={`M${x - 5} ${y - 11} l5 -5 l5 5`} />
    </G>
  );
}

/** The install glyph Chromium uses: a screen with an arrow coming down into it. */
function InstallGlyph({ x, y, p, color }: { x: number; y: number; p: Parts; color?: string }) {
  const c = color ?? p.tint;
  return (
    <G stroke={c} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Rect x={x - 9} y={y - 9} width={18} height={18} rx={4} />
      <Path d={`M${x} ${y - 4} v8`} />
      <Path d={`M${x - 4} ${y + 1} l4 4 l4 -4`} />
    </G>
  );
}

/** A plus-in-a-box, the icon beside "Add to Home Screen". */
function PlusBox({ x, y, p }: { x: number; y: number; p: Parts }) {
  return (
    <G stroke={p.tint} strokeWidth={2.4} fill="none" strokeLinecap="round">
      <Rect x={x - 9} y={y - 9} width={18} height={18} rx={4} />
      <Path d={`M${x} ${y - 4.5} v9 M${x - 4.5} ${y} h9`} />
    </G>
  );
}

/** Stand-in for a line of text. */
function Line({ x, y, w, p, h = 7 }: { x: number; y: number; w: number; p: Parts; h?: number }) {
  return <Rect x={x} y={y} width={w} height={h} rx={h / 2} fill={p.fill} />;
}

/** The app's own mark, small: a dark bubble so it reads as "your app". */
function AppMark({ x, y, p }: { x: number; y: number; p: Parts }) {
  return (
    <G>
      <Rect x={x - 13} y={y - 13} width={26} height={26} rx={7} fill="#1B2029" />
      <Rect x={x - 7} y={y - 6} width={5} height={12} rx={1.5} fill="#FFFFFF" />
      <Rect x={x + 1} y={y - 6} width={5} height={12} rx={1.5} fill="#FFC63D" />
      <Rect x={x - 13} y={y - 13} width={26} height={26} rx={7} fill="none" stroke={p.edge} strokeWidth={1.5} />
    </G>
  );
}

const scenes: Record<string, (p: Parts) => React.ReactElement> = {
  /* ------------------------------------------------------------------ iOS */

  // Safari's bottom toolbar, with the Share button ringed.
  iosShare: (p) => (
    <Frame p={p}>
      <Rect x={38} y={24} width={244} height={22} rx={11} fill={p.fill} />
      <Line x={38} y={60} w={186} p={p} />
      <Line x={38} y={76} w={214} p={p} />
      {/* toolbar */}
      <Path d={`M30 100 h274`} stroke={p.edge} strokeWidth={1.5} />
      <G stroke={p.fill} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M64 114 l-8 8 l8 8" />
        <Path d="M104 114 l8 8 l-8 8" />
      </G>
      <ShareGlyph x={160} y={121} p={p} />
      <Ring x={160} y={122} r={21} p={p} />
      <Rect x={206} y={112} width={20} height={20} rx={4} fill="none" stroke={p.fill} strokeWidth={3} />
      <G fill="none" stroke={p.fill} strokeWidth={3}>
        <Rect x={252} y={110} width={17} height={17} rx={4} />
        <Rect x={258} y={117} width={17} height={17} rx={4} />
      </G>
    </Frame>
  ),

  // The share sheet, scrolled to "Add to Home Screen".
  iosAddToHome: (p) => (
    <Frame p={p}>
      <AppMark x={48} y={34} p={p} />
      <Line x={70} y={30} w={120} p={p} />
      <Path d="M32 56 h256" stroke={p.edge} strokeWidth={1.5} />
      <Line x={38} y={68} w={110} p={p} />
      <Rect x={258} y={63} width={18} height={18} rx={4} fill={p.fill} />
      <Line x={38} y={92} w={132} p={p} />
      <Rect x={258} y={87} width={18} height={18} rx={4} fill={p.fill} />
      {/* the row to tap */}
      <Rect x={30} y={110} width={260} height={26} rx={8} fill="none" stroke={p.tint} strokeWidth={3} />
      <Rect x={40} y={119} width={190} height={8} rx={4} fill={p.tint} />
      <PlusBox x={266} y={123} p={p} />
    </Frame>
  ),

  // The confirmation sheet, with Add in the top right.
  iosConfirm: (p) => (
    <Frame p={p}>
      <Line x={38} y={30} w={44} p={p} />
      <Line x={140} y={30} w={60} p={p} />
      <Ring x={266} y={34} r={19} p={p} />
      <Rect x={256} y={31} width={20} height={6} rx={3} fill={p.tint} />
      <AppMark x={54} y={84} p={p} />
      <Line x={82} y={74} w={116} p={p} />
      <Rect x={82} y={90} width={150} height={16} rx={6} fill={p.fill} opacity={0.5} />
      <Line x={38} y={120} w={200} p={p} />
    </Frame>
  ),

  /* -------------------------------------------------------------- Android */

  // Chrome's overflow menu button, top right.
  androidMenu: (p) => (
    <Frame p={p}>
      <Rect x={38} y={24} width={16} height={24} rx={4} fill="none" stroke={p.fill} strokeWidth={2.5} />
      <Line x={64} y={32} w={150} p={p} />
      <G fill={p.tint}>
        <Circle cx={266} cy={26} r={3} />
        <Circle cx={266} cy={36} r={3} />
        <Circle cx={266} cy={46} r={3} />
      </G>
      <Ring x={266} y={36} r={20} p={p} />
      <Rect x={38} y={66} width={200} height={26} rx={6} fill={p.fill} opacity={0.6} />
      <Line x={38} y={106} w={180} p={p} />
      <Line x={38} y={122} w={214} p={p} />
    </Frame>
  ),

  // The open menu, with "Install app" ringed.
  androidInstall: (p) => (
    <Frame p={p}>
      <Rect x={30} y={30} width={70} height={22} rx={6} fill={p.fill} opacity={0.5} />
      <Line x={30} y={70} w={62} p={p} />
      <Line x={30} y={86} w={48} p={p} />
      {/* menu panel */}
      <Rect x={118} y={20} width={176} height={112} rx={10} fill={p.bg} stroke={p.edge} strokeWidth={2} />
      <Line x={134} y={34} w={124} p={p} />
      <Line x={134} y={52} w={104} p={p} />
      <Rect x={126} y={64} width={160} height={26} rx={7} fill="none" stroke={p.tint} strokeWidth={3} />
      <InstallGlyph x={146} y={77} p={p} />
      <Rect x={164} y={73} width={110} height={8} rx={4} fill={p.tint} />
      <Line x={134} y={102} w={124} p={p} />
      <Line x={134} y={118} w={92} p={p} />
    </Frame>
  ),

  // The install confirmation dialog.
  androidConfirm: (p) => (
    <Frame p={p}>
      <AppMark x={52} y={44} p={p} />
      <Line x={80} y={34} w={124} p={p} />
      <Line x={80} y={50} w={92} p={p} />
      <Line x={38} y={86} w={216} p={p} />
      <Ring x={254} y={112} r={20} p={p} />
      <Rect x={244} y={109} width={20} height={6} rx={3} fill={p.tint} />
    </Frame>
  ),

  /* -------------------------------------------------------------- desktop */

  // The install icon that appears at the end of the address bar.
  desktopAddressBar: (p) => (
    <Frame p={p}>
      <G fill={p.fill}>
        <Circle cx={40} cy={30} r={5} />
        <Circle cx={56} cy={30} r={5} />
        <Circle cx={72} cy={30} r={5} />
      </G>
      <Rect x={92} y={20} width={140} height={20} rx={10} fill={p.fill} />
      <InstallGlyph x={264} y={30} p={p} />
      <Ring x={264} y={30} r={20} p={p} />
      <Path d="M22 56 h276" stroke={p.edge} strokeWidth={1.5} />
      <Rect x={38} y={70} width={78} height={56} rx={8} fill={p.fill} opacity={0.6} />
      <Line x={132} y={76} w={150} p={p} />
      <Line x={132} y={94} w={126} p={p} />
      <Line x={132} y={112} w={150} p={p} />
    </Frame>
  ),

  // The same thing from the browser menu, for when the icon is hidden.
  desktopMenu: (p) => (
    <Frame p={p}>
      <Rect x={38} y={20} width={168} height={20} rx={10} fill={p.fill} />
      <G fill={p.fill}>
        <Circle cx={272} cy={22} r={3} />
        <Circle cx={272} cy={31} r={3} />
        <Circle cx={272} cy={40} r={3} />
      </G>
      <Path d="M22 56 h276" stroke={p.edge} strokeWidth={1.5} />
      {/* dropdown */}
      <Rect x={140} y={60} width={152} height={74} rx={10} fill={p.bg} stroke={p.edge} strokeWidth={2} />
      <Line x={154} y={72} w={104} p={p} />
      <Rect x={148} y={86} width={136} height={24} rx={7} fill="none" stroke={p.tint} strokeWidth={3} />
      <InstallGlyph x={166} y={98} p={p} />
      <Rect x={184} y={94} width={88} height={8} rx={4} fill={p.tint} />
      <Line x={154} y={120} w={84} p={p} />
      <Rect x={38} y={74} width={74} height={52} rx={8} fill={p.fill} opacity={0.6} />
    </Frame>
  ),
};

export type InstallScene = keyof typeof scenes;

export function InstallMockup({ name }: { name: string }) {
  const { colors } = useTheme();
  const scene = scenes[name];
  if (!scene) return null;

  const parts: Parts = {
    bg: colors.surface,
    fill: colors.track,
    edge: colors.border,
    tint: colors.info,
  };

  return (
    <Svg width="100%" height={150} viewBox={`0 0 ${W} ${H}`} accessibilityRole="image">
      {scene(parts)}
    </Svg>
  );
}
