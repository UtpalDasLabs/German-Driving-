import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

import { useTheme } from '@/theme/ThemeProvider';

export type MascotMood = 'idle' | 'happy' | 'celebrate' | 'sad' | 'thinking' | 'sleeping';

const BODY = '#1E88E5';
const BODY_DARK = '#1565C0';
const GLASS = '#D9EEFF';
const EYE = '#1B2430';
const LAMP = '#FFE38A';
const TYRE = '#26303B';

/**
 * Flitzi - a small car, seen from the front, whose windscreen is its face.
 *
 * Posed by mood rather than redrawn, so it stays the same car throughout:
 * only the eyes, brows, mouth (the grille) and headlights change.
 */
export function Mascot({ mood = 'idle', size = 120 }: { mood?: MascotMood; size?: number }) {
  const { colors } = useTheme();
  const asleep = mood === 'sleeping';
  const pupilX = mood === 'thinking' ? 3 : 0;
  const pupilY = mood === 'sad' ? 3 : mood === 'thinking' ? -2 : 0;
  const bounce = mood === 'celebrate' ? -6 : 0;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      accessibilityRole="image"
      accessibilityLabel={`Flitzi the car, looking ${mood}`}
    >
      <Ellipse cx="80" cy="146" rx="52" ry="6" fill={colors.text} opacity={0.1} />

      <G transform={`translate(0 ${bounce})`}>
        {/* tyres */}
        <Rect x="30" y="112" width="24" height="26" rx="6" fill={TYRE} />
        <Rect x="106" y="112" width="24" height="26" rx="6" fill={TYRE} />

        {/* cabin and body */}
        <Path d="M42 76 L54 42 Q58 32 70 32 L90 32 Q102 32 106 42 L118 76 Z" fill={BODY} />
        <Rect x="20" y="70" width="120" height="52" rx="20" fill={BODY} />
        <Rect x="24" y="110" width="112" height="12" rx="6" fill={BODY_DARK} />

        {/* mirrors */}
        <Rect x="12" y="64" width="14" height="10" rx="4" fill={BODY_DARK} />
        <Rect x="134" y="64" width="14" height="10" rx="4" fill={BODY_DARK} />

        {/* windscreen = face */}
        <Path d="M50 72 L60 46 Q63 40 70 40 L90 40 Q97 40 100 46 L110 72 Z" fill={GLASS} />

        {asleep ? (
          <>
            <Path d="M62 58 Q69 64 76 58" fill="none" stroke={EYE} strokeWidth={4} strokeLinecap="round" />
            <Path d="M84 58 Q91 64 98 58" fill="none" stroke={EYE} strokeWidth={4} strokeLinecap="round" />
          </>
        ) : (
          <>
            <Circle cx="69" cy="57" r="9" fill="#FFFFFF" />
            <Circle cx="91" cy="57" r="9" fill="#FFFFFF" />
            <Circle cx={69 + pupilX} cy={57 + pupilY} r="4.6" fill={EYE} />
            <Circle cx={91 + pupilX} cy={57 + pupilY} r="4.6" fill={EYE} />
            <Circle cx={71 + pupilX} cy={55 + pupilY} r="1.6" fill="#FFFFFF" />
            <Circle cx={93 + pupilX} cy={55 + pupilY} r="1.6" fill="#FFFFFF" />
          </>
        )}

        {/* brows: inner ends raised reads as worried */}
        {mood === 'sad' ? (
          <>
            <Path d="M60 46 L76 42" stroke={EYE} strokeWidth={3.5} strokeLinecap="round" />
            <Path d="M100 46 L84 42" stroke={EYE} strokeWidth={3.5} strokeLinecap="round" />
          </>
        ) : mood === 'thinking' ? (
          <Path d="M84 43 L100 45" stroke={EYE} strokeWidth={3.5} strokeLinecap="round" />
        ) : null}

        {/* headlights: brighter when happy */}
        {[40, 120].map((x) => (
          <G key={x}>
            <Circle cx={x} cy="88" r="10" fill={mood === 'sad' || asleep ? '#BFD2E6' : LAMP} />
            <Circle cx={x} cy="88" r="5" fill="#FFFFFF" opacity={mood === 'sad' || asleep ? 0.4 : 0.9} />
          </G>
        ))}

        {/* grille = mouth */}
        {mood === 'happy' || mood === 'celebrate' ? (
          <Path
            d={mood === 'celebrate' ? 'M62 92 Q80 116 98 92 Z' : 'M62 94 Q80 110 98 94'}
            fill={mood === 'celebrate' ? EYE : 'none'}
            stroke={EYE}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : mood === 'sad' ? (
          <Path d="M64 104 Q80 92 96 104" fill="none" stroke={EYE} strokeWidth={4} strokeLinecap="round" />
        ) : (
          <Rect x="64" y="96" width="32" height="6" rx="3" fill={EYE} />
        )}
      </G>

      {mood === 'celebrate' ? (
        <G>
          <Path d="M16 30 L20 40 L30 44 L20 48 L16 58 L12 48 L2 44 L12 40 Z" fill="#FFC63D" />
          <Circle cx="146" cy="26" r="5" fill="#FF4B4B" />
          <Circle cx="138" cy="48" r="4" fill="#4CC93F" />
          <Circle cx="24" cy="76" r="3.5" fill="#A472F0" />
        </G>
      ) : null}
      {asleep ? (
        <Path
          d="M118 18 h14 l-14 16 h14"
          fill="none"
          stroke={colors.textFaint}
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}
      {mood === 'thinking' ? (
        <G>
          <Circle cx="126" cy="26" r="4" fill={colors.textFaint} />
          <Circle cx="138" cy="14" r="6" fill={colors.textFaint} />
        </G>
      ) : null}
    </Svg>
  );
}

/** Mascot plus a speech bubble - the app's voice for tips and encouragement. */
export function MascotSays({
  mood = 'idle',
  children,
  size = 88,
}: {
  mood?: MascotMood;
  children: React.ReactNode;
  size?: number;
}) {
  const { colors, radius, space } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
      <Mascot mood={mood} size={size} />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.surface,
          borderWidth: 2,
          borderColor: colors.border,
          borderRadius: radius.lg,
          padding: space.md,
        }}
      >
        {children}
      </View>
    </View>
  );
}
