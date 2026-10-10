import React from 'react';

import { useKit, type Kit } from './kit';

/**
 * German road signs, drawn as code.
 *
 * Every sign is the official design simplified to a 100x100 box: the right
 * shape, the right colours and a pictogram close enough to recognise at a
 * glance, which is all the theory test asks of you. The keys are the official
 * numbers from the StVO annexes ("Zeichen 205"), so a question can name the
 * sign it shows and the sign trainer can quote the number.
 *
 * Official road signs are official works (§ 5 UrhG) and free to reproduce;
 * these drawings are our own all the same, so no licence question arises.
 */

export const SIGN_RED = '#C8102E';
export const SIGN_BLUE = '#005BAC';
export const SIGN_YELLOW = '#F6B800';
export const SIGN_GREEN = '#00843D';
export const BLACK = '#1B1B1B';
export const WHITE = '#FFFFFF';
const GREY = '#8A8F96';

type Draw = (k: Kit) => React.ReactNode;

/* --------------------------------------------------------------- frames */

function dangerFrame(k: Kit, inner: React.ReactNode) {
  return (
    <>
      <k.Polygon
        points="50,7 95,86 5,86"
        fill={WHITE}
        stroke={SIGN_RED}
        strokeWidth={9}
        strokeLinejoin="round"
      />
      <k.G transform="translate(50 62) scale(0.78)">{inner}</k.G>
    </>
  );
}

function prohibitionFrame(k: Kit, inner: React.ReactNode, ringOnly = false) {
  return (
    <>
      <k.Circle cx={50} cy={50} r={43} fill={WHITE} stroke={SIGN_RED} strokeWidth={10} />
      {ringOnly ? null : <k.G transform="translate(50 50)">{inner}</k.G>}
    </>
  );
}

function blueCircle(k: Kit, inner: React.ReactNode) {
  return (
    <>
      <k.Circle cx={50} cy={50} r={46} fill={SIGN_BLUE} stroke={WHITE} strokeWidth={2.5} />
      <k.G transform="translate(50 50)">{inner}</k.G>
    </>
  );
}

function blueSquare(k: Kit, inner: React.ReactNode) {
  return (
    <>
      <k.Rect x={5} y={5} width={90} height={90} rx={8} fill={SIGN_BLUE} stroke={WHITE} strokeWidth={2} />
      <k.Rect x={9} y={9} width={82} height={82} rx={5} fill="none" stroke={WHITE} strokeWidth={2} />
      <k.G transform="translate(50 50)">{inner}</k.G>
    </>
  );
}

/** Rectangular white plate with a black edge: supplementary signs and zones. */
function plate(k: Kit, inner: React.ReactNode, h = 44) {
  const y = 50 - h / 2;
  return (
    <>
      <k.Rect x={4} y={y} width={92} height={h} rx={5} fill={WHITE} stroke={BLACK} strokeWidth={3} />
      {inner}
    </>
  );
}

/** The diagonal bars every "end of" sign carries. */
function endStripes(k: Kit, r = 40) {
  const lines = [-12, -6, 0, 6, 12];
  return (
    <k.G transform="rotate(45 50 50)">
      {lines.map((d) => (
        <k.Line key={d} x1={50 + d} y1={50 - r} x2={50 + d} y2={50 + r} stroke={BLACK} strokeWidth={2.2} />
      ))}
    </k.G>
  );
}

function redSlash(k: Kit) {
  return <k.Line x1={18} y1={18} x2={82} y2={82} stroke={SIGN_RED} strokeWidth={9} strokeLinecap="round" />;
}

function label(k: Kit, text: string, x: number, y: number, size: number, color = BLACK, weight = '800') {
  return (
    <k.Text
      x={x}
      y={y}
      fontSize={size}
      fontWeight={weight}
      fill={color}
      textAnchor="middle"
      fontFamily="Arial, Helvetica, sans-serif"
    >
      {text}
    </k.Text>
  );
}

/* ----------------------------------------------------------- pictograms */
/* Drawn around (0,0) in a box about 50 units wide. */

function person(k: Kit, c = BLACK, x = 0, y = 0, s = 1) {
  return (
    <k.G transform={`translate(${x} ${y}) scale(${s})`}>
      <k.Circle cx={2} cy={-19} r={5} fill={c} />
      <k.Path d="M1 -12 L-1 4" stroke={c} strokeWidth={7} strokeLinecap="round" fill="none" />
      <k.Path d="M-1 4 L-8 20" stroke={c} strokeWidth={5.5} strokeLinecap="round" fill="none" />
      <k.Path d="M-1 4 L6 11 L7 21" stroke={c} strokeWidth={5.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <k.Path d="M1 -9 L-7 -1" stroke={c} strokeWidth={4.5} strokeLinecap="round" fill="none" />
      <k.Path d="M1 -9 L8 -2 L10 5" stroke={c} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </k.G>
  );
}

function bicycle(k: Kit, c = BLACK, x = 0, y = 0, s = 1) {
  return (
    <k.G transform={`translate(${x} ${y}) scale(${s})`}>
      <k.Circle cx={-13} cy={6} r={9} fill="none" stroke={c} strokeWidth={3.2} />
      <k.Circle cx={13} cy={6} r={9} fill="none" stroke={c} strokeWidth={3.2} />
      <k.Path
        d="M-13 6 L-4 -7 L9 -7 L13 6 M-4 -7 L0 6 L-13 6 M0 6 L9 -7 M9 -7 L7 -13 L12 -13 M-4 -7 L-5 -11 M-9 -11 L-1 -11"
        fill="none"
        stroke={c}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </k.G>
  );
}

function cyclist(k: Kit, c = BLACK, x = 0, y = 0, s = 1) {
  return (
    <k.G transform={`translate(${x} ${y}) scale(${s})`}>
      {bicycle(k, c, 0, 8)}
      <k.Circle cx={4} cy={-20} r={4.5} fill={c} />
      <k.Path d="M2 -14 L-4 -3 L2 6 M2 -13 L10 -6" stroke={c} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </k.G>
  );
}

/** Side view, facing left. */
function carSide(k: Kit, c = BLACK, x = 0, y = 0, s = 1) {
  return (
    <k.G transform={`translate(${x} ${y}) scale(${s})`}>
      <k.Path d="M-23 6 L-23 -1 Q-22 -5 -16 -6 L-10 -7 L-4 -14 L10 -14 L17 -7 L22 -5 Q24 -3 24 2 L24 6 Z" fill={c} />
      <k.Path d="M-7 -7 L-2 -12 L3 -12 L3 -7 Z M6 -7 L6 -12 L9 -12 L13 -7 Z" fill={WHITE} />
      <k.Circle cx={-12} cy={7} r={5.5} fill={c} stroke={WHITE} strokeWidth={1.5} />
      <k.Circle cx={13} cy={7} r={5.5} fill={c} stroke={WHITE} strokeWidth={1.5} />
    </k.G>
  );
}

/** Seen from behind, as on the overtaking-ban signs. */
function carRear(k: Kit, c = BLACK, x = 0, y = 0, s = 1) {
  return (
    <k.G transform={`translate(${x} ${y}) scale(${s})`}>
      <k.Path d="M-13 9 L-13 -1 L-9 -11 L9 -11 L13 -1 L13 9 Z" fill={c} />
      <k.Path d="M-8 -2 L-6 -8 L6 -8 L8 -2 Z" fill={WHITE} />
      <k.Rect x={-13} y={9} width={6} height={5} rx={1.5} fill={c} />
      <k.Rect x={7} y={9} width={6} height={5} rx={1.5} fill={c} />
    </k.G>
  );
}

function truckSide(k: Kit, c = BLACK, x = 0, y = 0, s = 1) {
  return (
    <k.G transform={`translate(${x} ${y}) scale(${s})`}>
      <k.Rect x={-24} y={-15} width={30} height={19} fill={c} />
      <k.Path d="M8 -8 L17 -8 L22 -2 L22 4 L8 4 Z" fill={c} />
      <k.Path d="M11 -6 L16 -6 L19 -2 L11 -2 Z" fill={WHITE} />
      <k.Circle cx={-16} cy={7} r={5} fill={c} stroke={WHITE} strokeWidth={1.5} />
      <k.Circle cx={-5} cy={7} r={5} fill={c} stroke={WHITE} strokeWidth={1.5} />
      <k.Circle cx={15} cy={7} r={5} fill={c} stroke={WHITE} strokeWidth={1.5} />
    </k.G>
  );
}

function truckRear(k: Kit, c = BLACK, x = 0, y = 0, s = 1) {
  return (
    <k.G transform={`translate(${x} ${y}) scale(${s})`}>
      <k.Rect x={-13} y={-15} width={26} height={24} fill={c} />
      <k.Rect x={-13} y={9} width={6} height={5} fill={c} />
      <k.Rect x={7} y={9} width={6} height={5} fill={c} />
    </k.G>
  );
}

function motorbike(k: Kit, c = BLACK, x = 0, y = 0, s = 1) {
  return (
    <k.G transform={`translate(${x} ${y}) scale(${s})`}>
      <k.Circle cx={-14} cy={7} r={7} fill="none" stroke={c} strokeWidth={3.5} />
      <k.Circle cx={14} cy={7} r={7} fill="none" stroke={c} strokeWidth={3.5} />
      <k.Path d="M-14 7 L-6 -3 L8 -3 L14 7 M8 -3 L11 -10" fill="none" stroke={c} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
      <k.Path d="M-6 -4 Q1 -10 9 -5 L4 0 L-4 0 Z" fill={c} />
      <k.Circle cx={1} cy={-17} r={4.5} fill={c} />
      <k.Path d="M0 -12 L-3 -4 M0 -11 L9 -8" stroke={c} strokeWidth={4} strokeLinecap="round" fill="none" />
    </k.G>
  );
}

function child(k: Kit, c = BLACK, x = 0, y = 0, s = 1) {
  return (
    <k.G transform={`translate(${x} ${y}) scale(${s})`}>
      <k.Circle cx={1} cy={-12} r={4.5} fill={c} />
      <k.Path d="M0 -6 L-1 4 L-7 14 M-1 4 L5 9 L5 15 M0 -4 L-6 1 M0 -4 L7 -1" stroke={c} strokeWidth={4.2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </k.G>
  );
}

function deer(k: Kit, c = BLACK) {
  return (
    <k.G>
      <k.Path d="M-18 6 Q-14 -4 0 -4 Q10 -4 14 -10 L18 -14 L21 -11 L16 -5 Q13 2 6 6 Z" fill={c} />
      <k.Path d="M-16 4 L-24 14 M-12 6 L-16 16 M6 4 L12 14 M2 6 L4 17" stroke={c} strokeWidth={3.5} strokeLinecap="round" fill="none" />
      <k.Path d="M17 -14 L14 -22 M14 -22 L10 -24 M14 -22 L16 -27 M19 -14 L21 -22 M21 -22 L25 -24" stroke={c} strokeWidth={2.2} strokeLinecap="round" fill="none" />
      <k.Path d="M-18 6 L-21 -2" stroke={c} strokeWidth={3} strokeLinecap="round" />
    </k.G>
  );
}

function arrow(k: Kit, d: string, c = WHITE, w = 9) {
  return <k.Path d={d} fill="none" stroke={c} strokeWidth={w} strokeLinecap="butt" strokeLinejoin="miter" />;
}

function head(k: Kit, x: number, y: number, angle: number, c = WHITE, s = 1) {
  return (
    <k.Polygon
      points="0,-12 11,4 -11,4"
      fill={c}
      transform={`translate(${x} ${y}) rotate(${angle}) scale(${s})`}
    />
  );
}

function speed(k: Kit, n: string, color = BLACK) {
  return label(k, n, 50, n.length > 2 ? 62 : 64, n.length > 2 ? 34 : 42, color);
}

/** A short piece of road, for the markings. */
function roadPiece(k: Kit, inner: React.ReactNode) {
  return (
    <>
      <k.Rect x={6} y={6} width={88} height={88} rx={10} fill="#4A4F57" />
      {inner}
    </>
  );
}

/* --------------------------------------------------------------- the set */

const SPEEDS = ['10', '20', '30', '50', '60', '70', '80', '100', '120', '130'];

export const SIGN_ART: Record<string, Draw> = {
  /* danger (Anlage 1) */
  '101': (k) => dangerFrame(k, <><k.Rect x={-4} y={-22} width={8} height={24} rx={3} fill={BLACK} /><k.Circle cx={0} cy={11} r={4.6} fill={BLACK} /></>),
  '102': (k) => dangerFrame(k, <k.Path d="M-14 -16 L14 16 M14 -16 L-14 16" stroke={BLACK} strokeWidth={7} strokeLinecap="butt" />),
  '103-20': (k) => dangerFrame(k, <k.Path d="M-6 22 L-6 2 Q-6 -14 12 -18" stroke={BLACK} strokeWidth={8} fill="none" />),
  '103-10': (k) => dangerFrame(k, <k.Path d="M6 22 L6 2 Q6 -14 -12 -18" stroke={BLACK} strokeWidth={8} fill="none" />),
  '105-20': (k) => dangerFrame(k, <k.Path d="M-4 22 Q-4 6 6 2 Q14 -2 10 -12 Q6 -20 -8 -22" stroke={BLACK} strokeWidth={7} fill="none" />),
  '108': (k) =>
    dangerFrame(
      k,
      <>
        <k.Polygon points="-22,-6 22,16 -22,16" fill={BLACK} />
        {label(k, '10%', 6, -6, 13)}
      </>,
    ),
  '110': (k) =>
    dangerFrame(
      k,
      <>
        <k.Polygon points="22,-6 22,16 -22,16" fill={BLACK} />
        {label(k, '10%', -6, -6, 13)}
      </>,
    ),
  '112': (k) => dangerFrame(k, <k.Path d="M-24 14 L-24 6 Q-18 -4 -12 6 Q-6 14 0 6 Q6 -4 12 6 Q18 14 24 6 L24 14 Z" fill={BLACK} />),
  '114': (k) =>
    dangerFrame(
      k,
      <>
        {carRear(k, BLACK, 0, -12, 0.8)}
        <k.Path d="M-8 22 Q-16 14 -8 8 Q0 2 -6 -2 M8 22 Q0 14 8 8 Q16 2 10 -2" stroke={BLACK} strokeWidth={3} fill="none" />
      </>,
    ),
  '117': (k) =>
    dangerFrame(
      k,
      <>
        <k.Path d="M-18 22 L-18 -20" stroke={BLACK} strokeWidth={3.5} />
        <k.Path d="M-18 -20 L18 -14 L18 -6 L-18 -2 Z" fill={BLACK} />
        <k.Path d="M-6 -18.5 L-6 -3.5 M6 -16.5 L6 -5" stroke={WHITE} strokeWidth={3} />
      </>,
    ),
  '120': (k) =>
    dangerFrame(
      k,
      <k.Path d="M-14 22 L-14 6 L-5 -6 L-5 -22 M14 22 L14 6 L5 -6 L5 -22" stroke={BLACK} strokeWidth={6} fill="none" />,
    ),
  '123': (k) =>
    dangerFrame(
      k,
      <>
        <k.Circle cx={-6} cy={-17} r={4.5} fill={BLACK} />
        <k.Path d="M-6 -11 L0 3 L-6 12 L-8 20 M0 3 L6 12 L6 20 M-4 -8 L10 -2" stroke={BLACK} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <k.Path d="M6 -4 L20 12" stroke={BLACK} strokeWidth={2.5} />
        <k.Path d="M8 20 Q16 6 26 20 Z" fill={BLACK} />
      </>,
    ),
  '124': (k) => dangerFrame(k, <>{carRear(k, BLACK, 0, 10, 0.95)}{carRear(k, BLACK, -9, -10, 0.6)}{carRear(k, BLACK, 9, -10, 0.6)}</>),
  '125': (k) =>
    dangerFrame(
      k,
      <>
        <k.Path d="M8 22 L8 -10" stroke={BLACK} strokeWidth={6} />
        {head(k, 8, -14, 0, BLACK, 0.8)}
        <k.Path d="M-8 -22 L-8 10" stroke={BLACK} strokeWidth={6} />
        {head(k, -8, 14, 180, BLACK, 0.8)}
      </>,
    ),
  '131': (k) =>
    dangerFrame(
      k,
      <>
        <k.Rect x={-9} y={-24} width={18} height={46} rx={5} fill={BLACK} />
        <k.Circle cx={0} cy={-14} r={5.5} fill="#E30613" />
        <k.Circle cx={0} cy={-1} r={5.5} fill="#F7B500" />
        <k.Circle cx={0} cy={12} r={5.5} fill="#00A651" />
      </>,
    ),
  '133': (k) => dangerFrame(k, person(k, BLACK, 0, 0, 1)),
  '136': (k) => dangerFrame(k, <>{person(k, BLACK, -8, 0, 0.9)}{child(k, BLACK, 12, 6, 0.9)}</>),
  '138': (k) => dangerFrame(k, cyclist(k, BLACK, 0, 0, 0.9)),
  '142': (k) => dangerFrame(k, deer(k, BLACK)),
  '151': (k) =>
    dangerFrame(
      k,
      <>
        <k.Rect x={-22} y={-10} width={4} height={30} fill={BLACK} />
        <k.Rect x={18} y={-10} width={4} height={30} fill={BLACK} />
        <k.Rect x={-26} y={-6} width={52} height={6} fill={BLACK} />
        <k.Rect x={-26} y={6} width={52} height={6} fill={BLACK} />
      </>,
    ),
  '153': (k) => bake(k, 3, SIGN_RED),
  '156': (k) => bake(k, 2, SIGN_RED),
  '159': (k) => bake(k, 1, SIGN_RED),
  '201': (k) => (
    <k.G>
      {[45, -45].map((a) => (
        <k.G key={a} transform={`rotate(${a} 50 50)`}>
          <k.Rect x={8} y={42} width={84} height={16} fill={WHITE} stroke={SIGN_RED} strokeWidth={3} />
          <k.Rect x={8} y={42} width={14} height={16} fill={SIGN_RED} />
          <k.Rect x={78} y={42} width={14} height={16} fill={SIGN_RED} />
        </k.G>
      ))}
    </k.G>
  ),

  /* priority (Anlage 2 & 3) */
  '205': (k) => <k.Polygon points="6,12 94,12 50,90" fill={WHITE} stroke={SIGN_RED} strokeWidth={9} strokeLinejoin="round" />,
  '206': (k) => (
    <>
      <k.Polygon points="31,4 69,4 96,31 96,69 69,96 31,96 4,69 4,31" fill={SIGN_RED} stroke={WHITE} strokeWidth={3} />
      <k.Polygon points="33,9 67,9 91,33 91,67 67,91 33,91 9,67 9,33" fill="none" stroke={WHITE} strokeWidth={2} />
      {label(k, 'STOP', 50, 61, 27, WHITE)}
    </>
  ),
  '208': (k) =>
    prohibitionFrame(
      k,
      <>
        <k.Path d="M-10 -22 L-10 14" stroke={BLACK} strokeWidth={7} />
        {head(k, -10, 18, 180, BLACK, 0.9)}
        <k.Path d="M11 22 L11 -14" stroke={SIGN_RED} strokeWidth={7} />
        {head(k, 11, -18, 0, SIGN_RED, 0.9)}
      </>,
    ),
  '301': (k) =>
    dangerFrame(
      k,
      <>
        <k.Rect x={-5} y={-22} width={10} height={42} fill={BLACK} />
        <k.Rect x={-18} y={-6} width={36} height={5} fill={BLACK} />
      </>,
    ),
  '306': (k) => (
    <k.G transform="rotate(45 50 50)">
      <k.Rect x={19} y={19} width={62} height={62} rx={4} fill={WHITE} stroke={BLACK} strokeWidth={1.5} />
      <k.Rect x={29} y={29} width={42} height={42} fill={SIGN_YELLOW} />
    </k.G>
  ),
  '307': (k) => (
    <>
      <k.G transform="rotate(45 50 50)">
        <k.Rect x={19} y={19} width={62} height={62} rx={4} fill={WHITE} stroke={BLACK} strokeWidth={1.5} />
        <k.Rect x={29} y={29} width={42} height={42} fill="#C9C9C9" />
      </k.G>
      <k.G transform="rotate(-45 50 50)">
        {[-8, -3, 2, 7].map((d) => (
          <k.Line key={d} x1={22} y1={50 + d} x2={78} y2={50 + d} stroke={BLACK} strokeWidth={2} />
        ))}
      </k.G>
    </>
  ),
  '308': (k) =>
    blueSquare(
      k,
      <>
        <k.Path d="M10 26 L10 -14" stroke={WHITE} strokeWidth={8} />
        {head(k, 10, -18, 0, WHITE, 1)}
        <k.Path d="M-12 -24 L-12 10" stroke={SIGN_RED} strokeWidth={6} />
        {head(k, -12, 14, 180, SIGN_RED, 0.8)}
      </>,
    ),

  /* mandatory (blue circles) */
  '209': (k) => blueCircle(k, <>{arrow(k, 'M-8 30 L-8 2 Q-8 -10 6 -10')}{head(k, 10, -10, 90, WHITE, 1.1)}</>),
  '209-10': (k) => blueCircle(k, <>{arrow(k, 'M8 30 L8 2 Q8 -10 -6 -10')}{head(k, -10, -10, -90, WHITE, 1.1)}</>),
  '209-30': (k) => blueCircle(k, <>{arrow(k, 'M0 30 L0 -14')}{head(k, 0, -18, 0, WHITE, 1.2)}</>),
  '211': (k) => blueCircle(k, <>{arrow(k, 'M-10 30 L-10 -6 L10 -6')}{head(k, 14, -6, 90, WHITE, 1.1)}</>),
  '214': (k) =>
    blueCircle(
      k,
      <>
        {arrow(k, 'M-6 32 L-6 -16')}
        {head(k, -6, -20, 0, WHITE, 1)}
        {arrow(k, 'M-6 10 Q-6 0 10 0', WHITE, 8)}
        {head(k, 14, 0, 90, WHITE, 0.9)}
      </>,
    ),
  '215': (k) => blueCircle(k, roundaboutArrows(k)),
  '222': (k) => blueCircle(k, <>{arrow(k, 'M-16 -16 L10 10')}{head(k, 13, 13, 135, WHITE, 1.1)}</>),
  '237': (k) => blueCircle(k, bicycle(k, WHITE, 0, 2, 1.25)),
  '239': (k) => blueCircle(k, <>{person(k, WHITE, -8, 0, 1.05)}{child(k, WHITE, 12, 6, 0.9)}</>),
  '240': (k) => (
    <>
      <k.Circle cx={50} cy={50} r={46} fill={SIGN_BLUE} stroke={WHITE} strokeWidth={2.5} />
      {person(k, WHITE, 42, 27, 0.6)}
      {child(k, WHITE, 57, 31, 0.55)}
      <k.Line x1={10} y1={50} x2={90} y2={50} stroke={WHITE} strokeWidth={3} />
      {bicycle(k, WHITE, 50, 70, 0.85)}
    </>
  ),
  '241': (k) => (
    <>
      <k.Circle cx={50} cy={50} r={46} fill={SIGN_BLUE} stroke={WHITE} strokeWidth={2.5} />
      {bicycle(k, WHITE, 29, 52, 0.62)}
      <k.Line x1={50} y1={8} x2={50} y2={92} stroke={WHITE} strokeWidth={3} />
      {person(k, WHITE, 66, 50, 0.7)}
      {child(k, WHITE, 78, 56, 0.55)}
    </>
  ),
  '242.1': (k) =>
    plate(
      k,
      <>
        <k.Circle cx={30} cy={50} r={17} fill={SIGN_BLUE} />
        {person(k, WHITE, 26, 51, 0.45)}
        {child(k, WHITE, 36, 54, 0.4)}
        {label(k, 'Zone', 67, 57, 18)}
      </>,
      46,
    ),
  '244.1': (k) =>
    plate(
      k,
      <>
        <k.Circle cx={26} cy={50} r={16} fill={SIGN_BLUE} />
        {bicycle(k, WHITE, 26, 51, 0.5)}
        {label(k, 'Fahrrad-', 64, 47, 11)}
        {label(k, 'straße', 64, 60, 11)}
      </>,
      46,
    ),
  '245': (k) => blueSquare(k, label(k, 'BUS', 0, 10, 28, WHITE)),
  '275': (k) => blueCircle(k, label(k, '30', 0, 14, 40, WHITE)),

  /* prohibitions */
  '250': (k) => prohibitionFrame(k, null, true),
  '251': (k) => prohibitionFrame(k, carSide(k, BLACK, 0, 0, 1.15)),
  '253': (k) => prohibitionFrame(k, truckSide(k, BLACK, 0, 2, 1.05)),
  '254': (k) => prohibitionFrame(k, bicycle(k, BLACK, 0, 2, 1.15)),
  '255': (k) => prohibitionFrame(k, motorbike(k, BLACK, 0, 2, 1.1)),
  '259': (k) => prohibitionFrame(k, person(k, BLACK, 0, 0, 1.1)),
  '260': (k) => prohibitionFrame(k, <>{motorbike(k, BLACK, 0, -12, 0.75)}{carSide(k, BLACK, 0, 14, 0.8)}</>),
  '262': (k) => prohibitionFrame(k, label(k, '5,5t', 0, 9, 24)),
  '264': (k) =>
    prohibitionFrame(
      k,
      <>
        {label(k, '2m', 0, 9, 22)}
        {head(k, -26, 1, -90, BLACK, 0.6)}
        {head(k, 26, 1, 90, BLACK, 0.6)}
      </>,
    ),
  '265': (k) =>
    prohibitionFrame(
      k,
      <>
        {label(k, '3,8m', 0, 9, 21)}
        {head(k, 0, -24, 180, BLACK, 0.6)}
        {head(k, 0, 24, 0, BLACK, 0.6)}
      </>,
    ),
  '267': (k) => (
    <>
      <k.Circle cx={50} cy={50} r={46} fill={SIGN_RED} stroke={WHITE} strokeWidth={2.5} />
      <k.Rect x={18} y={42} width={64} height={16} fill={WHITE} />
    </>
  ),
  '270.1': (k) =>
    plate(
      k,
      <>
        <k.Circle cx={50} cy={40} r={15} fill={WHITE} stroke={SIGN_RED} strokeWidth={3.5} />
        {label(k, 'Umwelt', 50, 42.2, 5.6)}
        {label(k, 'ZONE', 50, 66, 14)}
      </>,
      62,
    ),
  '272': (k) =>
    prohibitionFrame(
      k,
      <>
        <k.Path d="M8 24 L8 -6 Q8 -18 -2 -18 Q-12 -18 -12 -6 L-12 6" stroke={BLACK} strokeWidth={7} fill="none" />
        {head(k, -12, 10, 180, BLACK, 0.8)}
      </>,
    ),
  ...Object.fromEntries(SPEEDS.map((n) => [`274-${n}`, (k: Kit) => <>{prohibitionFrame(k, null, true)}{speed(k, n)}</>])),
  '274.1': (k) =>
    plate(
      k,
      <>
        <k.Circle cx={50} cy={38} r={18} fill={WHITE} stroke={SIGN_RED} strokeWidth={5} />
        {label(k, '30', 50, 45, 19)}
        {label(k, 'ZONE', 50, 72, 15)}
      </>,
      74,
    ),
  '274.2': (k) =>
    plate(
      k,
      <>
        <k.Circle cx={50} cy={38} r={18} fill={WHITE} stroke={GREY} strokeWidth={5} />
        {label(k, '30', 50, 45, 19, GREY)}
        {label(k, 'ZONE', 50, 72, 15, GREY)}
        <k.Line x1={20} y1={78} x2={80} y2={18} stroke={BLACK} strokeWidth={3} />
      </>,
      74,
    ),
  '276': (k) => prohibitionFrame(k, <>{carRear(k, SIGN_RED, -12, 0, 0.95)}{carRear(k, BLACK, 12, 0, 0.95)}</>),
  '277': (k) => prohibitionFrame(k, <>{truckRear(k, SIGN_RED, -12, 0, 0.9)}{carRear(k, BLACK, 13, 1, 0.9)}</>),
  '278-60': (k) => (
    <>
      <k.Circle cx={50} cy={50} r={44} fill={WHITE} stroke={GREY} strokeWidth={4} />
      {speed(k, '60', GREY)}
      {endStripes(k, 38)}
    </>
  ),
  '280': (k) => (
    <>
      <k.Circle cx={50} cy={50} r={44} fill={WHITE} stroke={GREY} strokeWidth={4} />
      {carRear(k, GREY, 38, 50, 0.95)}
      {carRear(k, GREY, 62, 50, 0.95)}
      {endStripes(k, 38)}
    </>
  ),
  '282': (k) => (
    <>
      <k.Circle cx={50} cy={50} r={44} fill={WHITE} stroke={GREY} strokeWidth={3} />
      {endStripes(k, 40)}
    </>
  ),
  '283': (k) => (
    <>
      <k.Circle cx={50} cy={50} r={43} fill={SIGN_BLUE} stroke={SIGN_RED} strokeWidth={10} />
      <k.Path d="M24 24 L76 76 M76 24 L24 76" stroke={SIGN_RED} strokeWidth={9} />
    </>
  ),
  '286': (k) => (
    <>
      <k.Circle cx={50} cy={50} r={43} fill={SIGN_BLUE} stroke={SIGN_RED} strokeWidth={10} />
      <k.Path d="M24 24 L76 76" stroke={SIGN_RED} strokeWidth={9} />
    </>
  ),
  '290.1': (k) =>
    plate(
      k,
      <>
        <k.Circle cx={50} cy={37} r={17} fill={SIGN_BLUE} stroke={SIGN_RED} strokeWidth={4.5} />
        <k.Path d="M39 26 L61 48" stroke={SIGN_RED} strokeWidth={4.5} />
        {label(k, 'ZONE', 50, 72, 15)}
      </>,
      74,
    ),

  /* parking, info, directions */
  '220-20': (k) => (
    <>
      <k.Rect x={4} y={30} width={92} height={40} rx={4} fill={SIGN_BLUE} stroke={WHITE} strokeWidth={2} />
      <k.Polygon points="10,43 70,43 70,36 90,50 70,64 70,57 10,57" fill={WHITE} />
      {label(k, 'Einbahnstraße', 40, 53.5, 8.5)}
    </>
  ),
  '224': (k) => (
    <>
      <k.Circle cx={50} cy={50} r={44} fill={SIGN_YELLOW} stroke={SIGN_GREEN} strokeWidth={6} />
      {label(k, 'H', 50, 66, 44, SIGN_GREEN)}
    </>
  ),
  '310': (k) => (
    <>
      <k.Rect x={4} y={26} width={92} height={48} rx={5} fill={SIGN_YELLOW} stroke={BLACK} strokeWidth={3} />
      {label(k, 'Musterstadt', 50, 52, 15)}
      {label(k, 'Landkreis Beispiel', 50, 65, 7.5, BLACK, '600')}
    </>
  ),
  '311': (k) => (
    <>
      <k.Rect x={4} y={26} width={92} height={48} rx={5} fill={SIGN_YELLOW} stroke={BLACK} strokeWidth={3} />
      {label(k, 'Musterstadt', 50, 57, 15)}
      <k.Line x1={14} y1={68} x2={86} y2={32} stroke={SIGN_RED} strokeWidth={6} />
    </>
  ),
  '314': (k) => blueSquare(k, label(k, 'P', 0, 22, 62, WHITE)),
  '325.1': (k) => blueSquare(k, playStreet(k)),
  '325.2': (k) => (
    <>
      {blueSquare(k, playStreet(k))}
      {redSlash(k)}
    </>
  ),
  '330.1': (k) => blueSquare(k, motorwayGlyph(k)),
  '330.2': (k) => (
    <>
      {blueSquare(k, motorwayGlyph(k))}
      {redSlash(k)}
    </>
  ),
  '331.1': (k) => blueSquare(k, carFront(k)),
  '331.2': (k) => (
    <>
      {blueSquare(k, carFront(k))}
      {redSlash(k)}
    </>
  ),
  '350': (k) =>
    blueSquare(
      k,
      <>
        <k.Polygon points="0,-34 34,26 -34,26" fill={WHITE} />
        {[-22, -11, 0, 11].map((x) => (
          <k.Rect key={x} x={x} y={18} width={7} height={5} fill={BLACK} />
        ))}
        {person(k, BLACK, 0, 0, 0.75)}
      </>,
    ),
  '357': (k) =>
    blueSquare(
      k,
      <>
        <k.Rect x={-7} y={-16} width={14} height={46} fill={WHITE} />
        <k.Rect x={-24} y={-30} width={48} height={14} fill={SIGN_RED} />
      </>,
    ),
  '450': (k) => (
    <k.G>
      <k.Rect x={30} y={4} width={40} height={92} fill={WHITE} stroke={BLACK} strokeWidth={1.5} />
      {[24, 50, 76].map((y) => (
        <k.Polygon key={y} points={`30,${y} 70,${y - 14} 70,${y - 4} 30,${y + 10}`} fill={SIGN_BLUE} />
      ))}
    </k.G>
  ),
  '625': (k) => (
    <>
      <k.Rect x={4} y={28} width={92} height={44} fill={SIGN_RED} />
      {[22, 50, 78].map((x) => (
        <k.Polygon key={x} points={`${x - 12},34 ${x},34 ${x + 12},50 ${x},66 ${x - 12},66 ${x},50`} fill={WHITE} />
      ))}
    </>
  ),

  /* supplementary signs (Zusatzzeichen) */
  '1001-30': (k) => plate(k, label(k, 'auf 800 m', 50, 56, 16)),
  '1004-30': (k) => plate(k, label(k, 'nach 200 m', 50, 56, 15)),
  '1020-30': (k) => plate(k, label(k, 'Anlieger frei', 50, 56, 13)),
  '1022-10': (k) => plate(k, <>{bicycle(k, BLACK, 32, 52, 0.62)}{label(k, 'frei', 70, 57, 16)}</>),
  '1040-30': (k) => plate(k, label(k, '16-18 h', 50, 57, 18)),
  '1052-36': (k) => plate(k, label(k, 'bei Nässe', 50, 56, 16)),
  '1053-35': (k) => plate(k, <>{truckSide(k, BLACK, 32, 50, 0.6)}{label(k, '7,5 t', 70, 56, 14)}</>),
  '1002': (k) =>
    plate(
      k,
      <>
        <k.Path d="M50 70 L50 50 L22 36" stroke={BLACK} strokeWidth={7} fill="none" strokeLinejoin="round" />
        <k.Path d="M50 50 L50 30 M50 50 L80 50" stroke={BLACK} strokeWidth={2.5} fill="none" />
      </>,
      48,
    ),

  /* road markings (Anlage 2 & 3) */
  '293': (k) => roadPiece(k, <>{[16, 30, 44, 58, 72].map((x) => <k.Rect key={x} x={x} y={20} width={8} height={60} fill={WHITE} />)}</>),
  '294': (k) => roadPiece(k, <><k.Rect x={6} y={56} width={88} height={8} fill={WHITE} /><k.Line x1={50} y1={70} x2={50} y2={92} stroke={WHITE} strokeWidth={2} /></>),
  '295': (k) => roadPiece(k, <k.Rect x={47} y={6} width={6} height={88} fill={WHITE} />),
  '296': (k) =>
    roadPiece(
      k,
      <>
        <k.Rect x={44} y={6} width={4} height={88} fill={WHITE} />
        {[10, 34, 58, 82].map((y) => <k.Rect key={y} x={52} y={y} width={4} height={12} fill={WHITE} />)}
      </>,
    ),
  '297': (k) =>
    roadPiece(
      k,
      <>
        {arrow(k, 'M34 86 L34 40', WHITE, 6)}
        {head(k, 34, 34, 0, WHITE, 0.9)}
        {arrow(k, 'M66 86 L66 54 Q66 44 76 44', WHITE, 6)}
        {head(k, 80, 44, 90, WHITE, 0.8)}
      </>,
    ),
  '298': (k) =>
    roadPiece(
      k,
      <>
        <k.Polygon points="50,12 76,88 24,88" fill="none" stroke={WHITE} strokeWidth={3} />
        {[40, 54, 68, 82].map((y) => (
          <k.Line key={y} x1={50 - (y - 12) * 0.34} y1={y} x2={50 + (y - 12) * 0.34} y2={y - 14} stroke={WHITE} strokeWidth={3} />
        ))}
      </>,
    ),
  '299': (k) => roadPiece(k, <k.Path d="M14 30 L26 70 L38 30 L50 70 L62 30 L74 70 L86 30" stroke={WHITE} strokeWidth={4} fill="none" />),
  '340': (k) => roadPiece(k, <>{[8, 40, 72].map((y) => <k.Rect key={y} x={47} y={y} width={6} height={18} fill={WHITE} />)}</>),
};

/**
 * Three arrows chasing each other anticlockwise, the way traffic flows round a
 * German roundabout. Built from angles so each head sits on its arc's tangent.
 */
function roundaboutArrows(k: Kit) {
  const r = 21;
  const pt = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return [r * Math.cos(a), r * Math.sin(a)] as const;
  };
  return (
    <>
      {[0, 120, 240].map((start) => {
        // Anticlockwise on screen means the angle decreases (y points down).
        const from = start + 10;
        const to = start - 72;
        const [x1, y1] = pt(from);
        const [x2, y2] = pt(to);
        const a = (to * Math.PI) / 180;
        const tangent = (Math.atan2(-Math.cos(a), Math.sin(a)) * 180) / Math.PI + 90;
        return (
          <k.G key={start}>
            <k.Path d={`M${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 0 0 ${x2.toFixed(2)} ${y2.toFixed(2)}`} stroke={WHITE} strokeWidth={8} fill="none" />
            <k.Polygon points="0,-11 9,3 -9,3" fill={WHITE} transform={`translate(${x2.toFixed(2)} ${y2.toFixed(2)}) rotate(${tangent.toFixed(1)})`} />
          </k.G>
        );
      })}
    </>
  );
}

function bake(k: Kit, stripes: number, color: string) {
  const ys = stripes === 3 ? [28, 50, 72] : stripes === 2 ? [38, 62] : [50];
  return (
    <k.G>
      <k.Rect x={32} y={4} width={36} height={92} fill={WHITE} stroke={BLACK} strokeWidth={1.5} />
      {ys.map((y) => (
        <k.Polygon key={y} points={`32,${y + 6} 68,${y - 8} 68,${y + 2} 32,${y + 16}`} fill={color} />
      ))}
    </k.G>
  );
}

function playStreet(k: Kit) {
  return (
    <>
      <k.Path d="M-34 4 L-34 -16 L-24 -26 L-14 -16 L-14 4 Z" fill={WHITE} />
      {person(k, WHITE, -2, -6, 0.6)}
      {child(k, WHITE, 10, -2, 0.55)}
      <k.Circle cx={20} cy={4} r={3} fill={WHITE} />
      {carSide(k, WHITE, 18, 22, 0.55)}
      <k.Rect x={-36} y={8} width={30} height={3} fill={WHITE} />
    </>
  );
}

function motorwayGlyph(k: Kit) {
  return (
    <>
      <k.Path d="M-26 34 L-8 -6 M26 34 L8 -6" stroke={WHITE} strokeWidth={6} />
      <k.Path d="M-2 34 L-2 22 M2 34 L2 22 M-1 14 L-1 6 M1 14 L1 6" stroke={WHITE} strokeWidth={2.5} />
      <k.Rect x={-30} y={-22} width={60} height={8} fill={WHITE} />
      <k.Rect x={-26} y={-14} width={5} height={10} fill={WHITE} />
      <k.Rect x={21} y={-14} width={5} height={10} fill={WHITE} />
    </>
  );
}

function carFront(k: Kit) {
  return (
    <>
      <k.Path d="M-26 14 L-26 0 L-18 -14 L18 -14 L26 0 L26 14 Z" fill={WHITE} />
      <k.Path d="M-16 -1 L-12 -10 L12 -10 L16 -1 Z" fill={SIGN_BLUE} />
      <k.Circle cx={-17} cy={6} r={3.5} fill={SIGN_BLUE} />
      <k.Circle cx={17} cy={6} r={3.5} fill={SIGN_BLUE} />
      <k.Rect x={-26} y={14} width={9} height={8} fill={WHITE} />
      <k.Rect x={17} y={14} width={9} height={8} fill={WHITE} />
    </>
  );
}

export function hasSignArt(id: string): boolean {
  return id in SIGN_ART;
}

/**
 * One sign, at any size. `title` becomes the accessible name, so pass the sign
 * name in the reader's language.
 */
export function SignArt({ id, size = 96, title }: { id: string; size?: number; title?: string }) {
  const k = useKit();
  const draw = SIGN_ART[id];
  return (
    <k.Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={title ?? `Zeichen ${id}`}
      accessibilityLabel={title ?? `Zeichen ${id}`}
    >
      {draw ? draw(k) : <k.Rect x={10} y={10} width={80} height={80} rx={10} fill="#DDD" />}
    </k.Svg>
  );
}
