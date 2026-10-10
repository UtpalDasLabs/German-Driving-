import React from 'react';

import { useKit, type Kit } from './kit';
import { YOU_COLOUR } from './scene';

/**
 * The basic manoeuvres of the practical test (Grundfahraufgaben), drawn from
 * above as a sequence of car positions. The app shows every position at once,
 * numbered; the videos interpolate between them so the car drives the line.
 *
 * Positions are [x, y, heading°, gear]: heading 0 = pointing up the page,
 * gear 'D' forward or 'R' reverse for the move that arrives there.
 */
export type Pose = [number, number, number, ('D' | 'R')?];

export type Manoeuvre = {
  key: 'parallel' | 'bay' | 'corner' | 'turnround' | 'emergency';
  poses: Pose[];
  /** The part of the 100x100 scene worth showing: [x, y, width, height]. */
  view: [number, number, number, number];
  scenery: (k: Kit) => React.ReactNode;
};

const ROAD = '#5D636B';
const PAVE = '#D3D7DC';
const GRASS = '#A9D18E';
const LINE = '#FFFFFF';

function parked(k: Kit, x: number, y: number, heading: number, colour = '#9AA3AE') {
  return (
    <k.G transform={`translate(${x} ${y}) rotate(${heading})`}>
      <k.Rect x={-3.6} y={-6.5} width={7.2} height={13} rx={2} fill={colour} stroke="#1F2933" strokeWidth={0.4} />
      <k.Rect x={-2.9} y={-4} width={5.8} height={2.4} rx={0.7} fill="#2A3542" />
    </k.G>
  );
}

export const MANOEUVRES: Record<Manoeuvre['key'], Manoeuvre> = {
  parallel: {
    key: 'parallel',
    // Road along the top, kerb at y = 70; the gap is between the two parked cars.
    poses: [
      [77, 53.5, 90, 'D'],
      [63, 53.5, 90, 'R'],
      [53, 58.5, 50, 'R'],
      [50, 63, 90, 'R'],
    ],
    view: [20, 40, 66, 36],
    scenery: (k) => (
      <>
        <k.Rect x={0} y={0} width={100} height={100} fill={PAVE} />
        <k.Rect x={0} y={20} width={100} height={50} fill={ROAD} />
        <k.Line x1={0} y1={34} x2={100} y2={34} stroke={LINE} strokeWidth={0.8} strokeDasharray="4 4" />
        <k.Line x1={0} y1={70} x2={100} y2={70} stroke="#9AA0A6" strokeWidth={1.2} />
        {parked(k, 30, 63, 90)}
        {parked(k, 72, 63, 90, '#E5484D')}
      </>
    ),
  },
  bay: {
    key: 'bay',
    poses: [
      [26, 32, 90, 'D'],
      [70, 32, 90, 'D'],
      [62, 46, 40, 'R'],
      [54, 62, 4, 'R'],
      [54, 72, 0, 'R'],
    ],
    view: [14, 18, 74, 74],
    scenery: (k) => (
      <>
        <k.Rect x={0} y={0} width={100} height={100} fill={ROAD} />
        {[30, 46, 62, 78].map((x) => (
          <k.Line key={x} x1={x} y1={54} x2={x} y2={88} stroke={LINE} strokeWidth={1} />
        ))}
        <k.Rect x={0} y={88} width={100} height={12} fill={PAVE} />
        {parked(k, 38, 71, 0)}
        {parked(k, 70, 71, 0, '#3DBB6E')}
      </>
    ),
  },
  corner: {
    key: 'corner',
    poses: [
      [86, 44, 90, 'D'],
      [72, 45, 90, 'R'],
      [63, 54, 45, 'R'],
      [61, 68, 8, 'R'],
      [61, 84, 0, 'R'],
    ],
    view: [34, 22, 62, 74],
    scenery: (k) => (
      <>
        <k.Rect x={0} y={0} width={100} height={100} fill={GRASS} />
        <k.Rect x={0} y={24} width={100} height={30} fill={PAVE} />
        <k.Rect x={50} y={24} width={30} height={76} fill={PAVE} />
        <k.Rect x={0} y={27} width={100} height={24} fill={ROAD} />
        <k.Rect x={53} y={27} width={24} height={73} fill={ROAD} />
        <k.Line x1={0} y1={39} x2={100} y2={39} stroke={LINE} strokeWidth={0.8} strokeDasharray="4 4" />
      </>
    ),
  },
  turnround: {
    key: 'turnround',
    poses: [
      [60, 82, 0, 'D'],
      [40, 62, -78, 'D'],
      [60, 52, -150, 'R'],
      [40, 34, -180, 'D'],
    ],
    view: [20, 22, 60, 72],
    scenery: (k) => (
      <>
        <k.Rect x={0} y={0} width={100} height={100} fill={PAVE} />
        <k.Rect x={28} y={0} width={44} height={100} fill={ROAD} />
        <k.Line x1={50} y1={0} x2={50} y2={100} stroke={LINE} strokeWidth={0.8} strokeDasharray="4 4" />
      </>
    ),
  },
  emergency: {
    key: 'emergency',
    poses: [
      [55, 88, 0, 'D'],
      [55, 60, 0, 'D'],
      [55, 36, 0, 'D'],
    ],
    view: [26, 24, 60, 74],
    scenery: (k) => (
      <>
        <k.Rect x={0} y={0} width={100} height={100} fill={GRASS} />
        <k.Rect x={37} y={0} width={26} height={100} fill={PAVE} />
        <k.Rect x={40} y={0} width={20} height={100} fill={ROAD} />
        <k.Line x1={50} y1={0} x2={50} y2={100} stroke={LINE} strokeWidth={0.8} strokeDasharray="4 4" />
        {/* braking marks from the command to the stop */}
        <k.Rect x={52.2} y={40} width={1.2} height={18} fill="#2B2F35" opacity={0.6} />
        <k.Rect x={56.6} y={40} width={1.2} height={18} fill="#2B2F35" opacity={0.6} />
        <k.Text x={62} y={62} fontSize={5} fontWeight="800" fill="#E5484D" fontFamily="Arial, Helvetica, sans-serif">
          STOPP!
        </k.Text>
        <k.Text x={62} y={90} fontSize={4.2} fontWeight="700" fill="#1F2933" fontFamily="Arial, Helvetica, sans-serif">
          30 km/h
        </k.Text>
      </>
    ),
  },
};

export function YouCar({ k, x, y, heading, opacity = 1 }: { k: Kit; x: number; y: number; heading: number; opacity?: number }) {
  return (
    <k.G transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${heading.toFixed(1)})`} opacity={opacity}>
      <k.Rect x={-3.6} y={-6.5} width={7.2} height={13} rx={2.2} fill={YOU_COLOUR} stroke="#FFFFFF" strokeWidth={0.6} />
      <k.Rect x={-2.9} y={-4} width={5.8} height={2.4} rx={0.7} fill="#2A3542" />
      <k.Rect x={-2.9} y={2.8} width={5.8} height={1.6} rx={0.6} fill="#2A3542" />
    </k.G>
  );
}

/** Every position at once, numbered, joined by the driving line. */
export function ManoeuvreArt({ name, size = 300, title }: { name: Manoeuvre['key']; size?: number; title?: string }) {
  const k = useKit();
  const m = MANOEUVRES[name];
  const line = m.poses.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');
  const [vx, vy, vw, vh] = m.view;
  return (
    <k.Svg
      width={size}
      height={(size * vh) / vw}
      viewBox={`${vx} ${vy} ${vw} ${vh}`}
      role="img"
      aria-label={title ?? name}
      accessibilityLabel={title ?? name}
    >
      {m.scenery(k)}
      <k.Path d={line} fill="none" stroke="#FFC63D" strokeWidth={1.2} strokeDasharray="2 1.5" />
      {m.poses.map(([x, y, h], i) => (
        <YouCar key={i} k={k} x={x} y={y} heading={h} opacity={0.35 + (0.65 * (i + 1)) / m.poses.length} />
      ))}
      {m.poses.map(([x, y, , gear], i) => (
        <k.G key={`n${i}`}>
          <k.Circle cx={x + 5} cy={y - 5} r={2.6} fill={gear === 'R' ? '#E5484D' : '#FFFFFF'} stroke="#1F2933" strokeWidth={0.5} />
          <k.Text
            x={x + 5}
            y={y - 3.8}
            fontSize={3.4}
            fontWeight="800"
            fill={gear === 'R' ? '#FFFFFF' : '#1F2933'}
            textAnchor="middle"
            fontFamily="Arial, Helvetica, sans-serif"
          >
            {String(i + 1)}
          </k.Text>
        </k.G>
      ))}
    </k.Svg>
  );
}
