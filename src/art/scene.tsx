import React from 'react';

import type { Actor, ActorKind, Arm, LightState, Scene } from '../lib/types';
import { useKit, type Kit } from './kit';
import { ARM_ANGLE, C, HALF, armPose, arrowPath, lightSpot, routePoints, rotate, signSpot, type Pt } from './geometry';
import { SIGN_ART } from './signs';

/**
 * Top-down traffic scenes, built from a small description instead of drawn by
 * hand: a road layout, who is where, which way they are going, and the signs
 * and lights each approach sees. That is what lets a few hundred questions each
 * have their own picture, and what lets the videos animate the same scene.
 */

const GRASS = '#A9D18E';
const GRASS_NIGHT = '#5E7D4E';
const PAVEMENT = '#D3D7DC';
const ROAD = '#5D636B';
const LINE = '#FFFFFF';

export const ACTOR_COLOURS = ['#E5484D', '#F5F5F5', '#3DBB6E', '#8E6BE8', '#F59E0B', '#2E3440'];
export const YOU_COLOUR = '#1E88E5';

export type Pose = { at: Pt; heading: number };

/* ---------------------------------------------------------------- roads */

function dashes(k: Kit, x1: number, y1: number, x2: number, y2: number, key: string) {
  return (
    <k.Line
      key={key}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={LINE}
      strokeWidth={0.9}
      strokeDasharray="4 4"
    />
  );
}

function Road({ k, scene }: { k: Kit; scene: Scene }) {
  const solid = (scene.markings ?? []).some((m) => m.startsWith('solidCentre'));
  const centre = (x1: number, y1: number, x2: number, y2: number, key: string) =>
    solid ? (
      <k.Line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke={LINE} strokeWidth={1.1} />
    ) : (
      dashes(k, x1, y1, x2, y2, key)
    );

  const lo = C - HALF;
  const hi = C + HALF;

  switch (scene.road) {
    case 'cross':
      return (
        <>
          <k.Rect x={lo - 3} y={0} width={26} height={100} fill={PAVEMENT} />
          <k.Rect x={0} y={lo - 3} width={100} height={26} fill={PAVEMENT} />
          <k.Rect x={lo} y={0} width={20} height={100} fill={ROAD} />
          <k.Rect x={0} y={lo} width={100} height={20} fill={ROAD} />
          {centre(C, 0, C, lo - 1, 'n')}
          {centre(C, hi + 1, C, 100, 's')}
          {centre(0, C, lo - 1, C, 'w')}
          {centre(hi + 1, C, 100, C, 'e')}
        </>
      );
    case 'tee':
    case 'teeNorth': {
      const north = scene.road === 'teeNorth';
      return (
        <>
          <k.Rect x={0} y={lo - 3} width={100} height={26} fill={PAVEMENT} />
          <k.Rect x={lo - 3} y={north ? 0 : lo} width={26} height={north ? hi : 100 - lo} fill={PAVEMENT} />
          <k.Rect x={0} y={lo} width={100} height={20} fill={ROAD} />
          <k.Rect x={lo} y={north ? 0 : lo} width={20} height={north ? hi : 100 - lo} fill={ROAD} />
          {centre(0, C, lo - 1, C, 'w')}
          {centre(hi + 1, C, 100, C, 'e')}
          {north ? centre(C, 0, C, lo - 1, 'n') : centre(C, hi + 1, C, 100, 's')}
          {/* The through road's kerb line continues across the mouth. */}
          {north ? null : dashes(k, lo, C, hi, C, 'mouth')}
        </>
      );
    }
    case 'straight':
    case 'oneway':
    case 'parking':
      return (
        <>
          <k.Rect x={lo - 3} y={0} width={scene.road === 'parking' ? 38 : 26} height={100} fill={PAVEMENT} />
          <k.Rect x={lo} y={0} width={20} height={100} fill={ROAD} />
          {scene.road === 'parking' ? (
            <>
              <k.Rect x={hi} y={0} width={12} height={100} fill="#6B7179" />
              {[8, 30, 52, 74, 96].map((y) => (
                <k.Line key={y} x1={hi} y1={y} x2={hi + 12} y2={y} stroke={LINE} strokeWidth={0.7} />
              ))}
            </>
          ) : null}
          {scene.road === 'oneway' ? null : centre(C, 0, C, 100, 'c')}
        </>
      );
    case 'tramline':
      return (
        <>
          <k.Rect x={25} y={0} width={50} height={100} fill={PAVEMENT} />
          <k.Rect x={28} y={0} width={44} height={100} fill={ROAD} />
          <k.Rect x={44} y={0} width={12} height={100} fill="#777D85" />
          {[45.5, 49, 51, 54.5].map((x) => (
            <k.Line key={x} x1={x} y1={0} x2={x} y2={100} stroke="#B9BEC4" strokeWidth={0.8} />
          ))}
        </>
      );
    case 'rail':
      return (
        <>
          <k.Rect x={lo - 3} y={0} width={26} height={100} fill={PAVEMENT} />
          <k.Rect x={lo} y={0} width={20} height={100} fill={ROAD} />
          <k.Rect x={0} y={43} width={100} height={14} fill="#8C7B6B" />
          {Array.from({ length: 17 }, (_, i) => (
            <k.Rect key={i} x={i * 6} y={44} width={3} height={12} fill="#6B4F3A" />
          ))}
          <k.Rect x={lo} y={43} width={20} height={14} fill={ROAD} />
          {[46, 54].map((y) => (
            <k.Line key={y} x1={0} y1={y} x2={100} y2={y} stroke="#C7CCD1" strokeWidth={1.2} />
          ))}
          {centre(C, 0, C, 41, 'n')}
          {centre(C, 59, C, 100, 's')}
        </>
      );
    case 'roundabout':
      return (
        <>
          <k.Rect x={lo - 3} y={0} width={26} height={100} fill={PAVEMENT} />
          <k.Rect x={0} y={lo - 3} width={100} height={26} fill={PAVEMENT} />
          <k.Rect x={lo} y={0} width={20} height={100} fill={ROAD} />
          <k.Rect x={0} y={lo} width={100} height={20} fill={ROAD} />
          <k.Circle cx={C} cy={C} r={30} fill={PAVEMENT} />
          <k.Circle cx={C} cy={C} r={27} fill={ROAD} />
          <k.Circle cx={C} cy={C} r={13} fill={PAVEMENT} />
          <k.Circle cx={C} cy={C} r={11} fill={GRASS} />
          {(['n', 'e', 's', 'w'] as Arm[]).map((a) => {
            const [x1, y1] = rotate([C, 79], ARM_ANGLE[a]);
            const [x2, y2] = rotate([C, 100], ARM_ANGLE[a]);
            const [gx1, gy1] = rotate([C, 77], ARM_ANGLE[a]);
            const [gx2, gy2] = rotate([hi, 77], ARM_ANGLE[a]);
            return (
              <k.G key={a}>
                {dashes(k, x1, y1, x2, y2, `c${a}`)}
                <k.Line x1={gx1} y1={gy1} x2={gx2} y2={gy2} stroke={LINE} strokeWidth={0.9} strokeDasharray="1.6 1.2" />
              </k.G>
            );
          })}
        </>
      );
    case 'motorway':
      return (
        <>
          <k.Rect x={10} y={0} width={10} height={100} fill="#7FA36C" />
          <k.Line x1={18} y1={0} x2={18} y2={100} stroke="#B8BEC5" strokeWidth={1.2} />
          <k.Path d="M20 0 L56 0 L56 100 L20 100 Z" fill={ROAD} />
          <k.Path d="M56 100 L68 100 L68 46 L56 24 Z" fill={ROAD} />
          <k.Line x1={20.8} y1={0} x2={20.8} y2={100} stroke={LINE} strokeWidth={0.9} />
          {dashes(k, 32, 0, 32, 100, 'l3')}
          {dashes(k, 44, 0, 44, 100, 'l2')}
          <k.Line x1={56} y1={0} x2={56} y2={24} stroke={LINE} strokeWidth={0.9} />
          <k.Line x1={56} y1={24} x2={56} y2={100} stroke={LINE} strokeWidth={1.6} strokeDasharray="3 1.5" />
          <k.Line x1={67.3} y1={46} x2={67.3} y2={100} stroke={LINE} strokeWidth={0.9} />
        </>
      );
    case 'curve':
      return (
        <>
          <k.Path d="M50 110 L50 70 Q50 30 90 30 L110 30" fill="none" stroke={PAVEMENT} strokeWidth={26} />
          <k.Path d="M50 110 L50 70 Q50 30 90 30 L110 30" fill="none" stroke={ROAD} strokeWidth={20} />
          <k.Path
            d="M50 110 L50 70 Q50 30 90 30 L110 30"
            fill="none"
            stroke={LINE}
            strokeWidth={solid ? 1.1 : 0.9}
            strokeDasharray={solid ? undefined : '4 4'}
          />
        </>
      );
    default:
      return null;
  }
}

function Markings({ k, scene }: { k: Kit; scene: Scene }) {
  return (
    <>
      {(scene.markings ?? []).map((m, i) => {
        const [kind, armRaw] = m.split(':') as [string, Arm | undefined];
        const arm: Arm = armRaw ?? 's';
        const deg = ARM_ANGLE[arm];
        const g = (child: React.ReactNode) => (
          <k.G key={`${m}${i}`} transform={`rotate(${deg} ${C} ${C})`}>
            {child}
          </k.G>
        );
        if (kind === 'stopLine') return g(<k.Rect x={C} y={C + HALF + 1} width={HALF} height={1.6} fill={LINE} />);
        if (kind === 'giveWayLine')
          return g(<k.Line x1={C} y1={C + HALF + 1.6} x2={C + HALF} y2={C + HALF + 1.6} stroke={LINE} strokeWidth={1.2} strokeDasharray="1.6 1.2" />);
        if (kind === 'zebra')
          return g(
            <>
              {[0, 1, 2, 3, 4, 5, 6].map((j) => (
                <k.Rect key={j} x={C - HALF + 0.6 + j * 2.8} y={C + HALF + 6} width={1.6} height={8} fill={LINE} />
              ))}
            </>,
          );
        if (kind === 'cycleLane')
          return g(<k.Rect x={C + HALF - 3} y={C + HALF} width={3} height={50} fill="#C2564B" opacity={0.85} />);
        return null;
      })}
    </>
  );
}

/* --------------------------------------------------------------- actors */

const LENGTH: Partial<Record<ActorKind, number>> = { truck: 18, bus: 22, tram: 34, ambulance: 14, tractor: 10 };

export function actorLength(kind: ActorKind): number {
  return LENGTH[kind] ?? (kind === 'bike' || kind === 'moto' ? 8 : kind === 'ped' || kind === 'child' ? 3 : 12);
}

function Body({ k, kind, colour, siren }: { k: Kit; kind: ActorKind; colour: string; siren?: boolean }) {
  const glass = '#2A3542';
  const lights = siren ? (
    <>
      <k.Rect x={-2.6} y={-0.6} width={5.2} height={1.4} rx={0.5} fill="#1D4ED8" />
      <k.Circle cx={-2.2} cy={0.1} r={1.1} fill="#60A5FA" />
      <k.Circle cx={2.2} cy={0.1} r={1.1} fill="#60A5FA" />
    </>
  ) : null;

  switch (kind) {
    case 'ped':
    case 'child': {
      const s = kind === 'child' ? 0.7 : 1;
      return (
        <k.G transform={`scale(${s})`}>
          <k.Ellipse cx={0} cy={0} rx={3} ry={1.7} fill={colour} stroke="#1F2933" strokeWidth={0.4} />
          <k.Circle cx={0} cy={0} r={1.5} fill="#F2C9A0" stroke="#1F2933" strokeWidth={0.4} />
        </k.G>
      );
    }
    case 'bike':
    case 'moto':
      return (
        <>
          <k.Rect x={-0.7} y={-4} width={1.4} height={8} rx={0.7} fill="#1F2933" />
          {kind === 'moto' ? <k.Rect x={-1.6} y={-2.5} width={3.2} height={4.4} rx={1.2} fill={colour} /> : null}
          <k.Line x1={-2.4} y1={-2.6} x2={2.4} y2={-2.6} stroke="#1F2933" strokeWidth={0.7} />
          <k.Ellipse cx={0} cy={0} rx={2.4} ry={1.5} fill={colour} stroke="#1F2933" strokeWidth={0.3} />
          <k.Circle cx={0} cy={-0.3} r={1.2} fill={kind === 'moto' ? '#1F2933' : '#F2C9A0'} />
        </>
      );
    case 'truck':
      return (
        <>
          <k.Rect x={-4.2} y={-9} width={8.4} height={5} rx={1.2} fill={colour} stroke="#1F2933" strokeWidth={0.4} />
          <k.Rect x={-3.4} y={-8.6} width={6.8} height={1.6} rx={0.5} fill={glass} />
          <k.Rect x={-4.4} y={-3.6} width={8.8} height={12.6} rx={0.6} fill="#E7E9EC" stroke="#1F2933" strokeWidth={0.4} />
        </>
      );
    case 'bus':
      return (
        <>
          <k.Rect x={-4.2} y={-11} width={8.4} height={22} rx={1.4} fill={colour} stroke="#1F2933" strokeWidth={0.4} />
          <k.Rect x={-3.4} y={-10.4} width={6.8} height={1.8} rx={0.5} fill={glass} />
          {[-6, -2, 2, 6].map((y) => (
            <k.Rect key={y} x={-2.4} y={y} width={4.8} height={2.4} rx={0.5} fill="#FFFFFF" opacity={0.5} />
          ))}
        </>
      );
    case 'tram':
      return (
        <>
          <k.Rect x={-4.6} y={-17} width={9.2} height={34} rx={2.4} fill={colour} stroke="#1F2933" strokeWidth={0.4} />
          {[-6, 5].map((y) => (
            <k.Line key={y} x1={-4.6} y1={y} x2={4.6} y2={y} stroke="#1F2933" strokeWidth={0.5} />
          ))}
          <k.Rect x={-3.6} y={-16.4} width={7.2} height={2} rx={0.8} fill={glass} />
        </>
      );
    case 'tractor':
      return (
        <>
          <k.Rect x={-4.6} y={1} width={2.4} height={5} rx={0.6} fill="#1F2933" />
          <k.Rect x={2.2} y={1} width={2.4} height={5} rx={0.6} fill="#1F2933" />
          <k.Rect x={-2.6} y={-5} width={5.2} height={10} rx={1.2} fill="#2E9E4F" />
          <k.Rect x={-2} y={0} width={4} height={3.6} rx={0.6} fill={glass} />
        </>
      );
    case 'deer':
      return (
        <>
          <k.Ellipse cx={0} cy={0.5} rx={2} ry={4} fill="#8B5A2B" />
          <k.Circle cx={0} cy={-4.2} r={1.3} fill="#8B5A2B" />
          <k.Path d="M-0.8 -5.2 L-2 -7.2 M0.8 -5.2 L2 -7.2" stroke="#5C3A1A" strokeWidth={0.5} />
        </>
      );
    case 'ball':
      return <k.Circle cx={0} cy={0} r={1.6} fill="#EF4444" stroke="#FFFFFF" strokeWidth={0.5} />;
    case 'police':
    case 'ambulance': {
      const len = kind === 'ambulance' ? 14 : 12;
      return (
        <>
          <k.Rect x={-3.6} y={-len / 2} width={7.2} height={len} rx={2} fill="#FFFFFF" stroke="#1F2933" strokeWidth={0.4} />
          <k.Rect
            x={-3.6}
            y={-len / 2 + 4.5}
            width={7.2}
            height={1.4}
            fill={kind === 'police' ? '#1E5AA8' : '#E5484D'}
          />
          <k.Rect x={-2.8} y={-len / 2 + 1.2} width={5.6} height={2.2} rx={0.6} fill={glass} />
          <k.G transform={`translate(0 ${-len / 2 + 6.5})`}>{lights ?? <k.Rect x={-2.4} y={-0.5} width={4.8} height={1} fill="#1D4ED8" />}</k.G>
        </>
      );
    }
    default:
      return (
        <>
          <k.Rect x={-3.6} y={-6} width={7.2} height={12} rx={2.2} fill={colour} stroke="#1F2933" strokeWidth={0.4} />
          <k.Rect x={-2.9} y={-3.6} width={5.8} height={2.4} rx={0.7} fill={glass} />
          <k.Rect x={-2.9} y={2.6} width={5.8} height={1.6} rx={0.6} fill={glass} />
          {siren ? <k.G transform="translate(0 0.6)">{lights}</k.G> : null}
        </>
      );
  }
}

function Blinkers({ k, side, kind }: { k: Kit; side: Actor['blinker']; kind: ActorKind }) {
  if (!side) return null;
  const len = actorLength(kind) / 2;
  const xs = side === 'left' ? [-3.4] : side === 'right' ? [3.4] : [-3.4, 3.4];
  return (
    <>
      {xs.flatMap((x) => [
        <k.Circle key={`f${x}`} cx={x} cy={-len + 0.8} r={1.1} fill="#FFB020" stroke="#FFFFFF" strokeWidth={0.3} />,
        <k.Circle key={`r${x}`} cx={x} cy={len - 0.8} r={1.1} fill="#FFB020" stroke="#FFFFFF" strokeWidth={0.3} />,
      ])}
    </>
  );
}

export function actorPose(actor: Actor, road?: Scene['road']): Pose {
  if (actor.at) return { at: actor.at, heading: actor.heading ?? 0 };
  const pose = armPose(actor.arm ?? 's', actor.slot ?? 1, actorLength(actor.kind), road === 'roundabout');
  return { at: pose.at, heading: actor.heading ?? pose.heading };
}

export function actorColour(actor: Actor, index: number): string {
  if (actor.kind === 'you') return YOU_COLOUR;
  if (actor.kind === 'bus') return '#F2B705';
  if (actor.kind === 'tram') return '#F4D03F';
  if (actor.kind === 'truck') return '#9AA3AE';
  return ACTOR_COLOURS[index % ACTOR_COLOURS.length];
}

function RouteArrow({ k, actor, colour, road }: { k: Kit; actor: Actor; colour: string; road: Scene['road'] }) {
  if (!actor.turn || actor.turn === 'stop' || !actor.arm || actor.at || road === 'roundabout') return null;
  const d = arrowPath(actor.arm, actor.turn);
  const pts = routePoints(actor.arm, actor.turn);
  // Arrow head at the shortened end of the route.
  const m = d.split(/[ML]/).filter(Boolean).map((s) => s.trim().split(' ').map(Number) as Pt);
  const end = m[m.length - 1];
  const prev = m[m.length - 2] ?? pts[0];
  const angle = (Math.atan2(end[0] - prev[0], -(end[1] - prev[1])) * 180) / Math.PI;
  return (
    <k.G opacity={0.9}>
      <k.Path d={d} fill="none" stroke="#FFFFFF" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" />
      <k.Path d={d} fill="none" stroke={colour === '#F5F5F5' ? '#94A3B8' : colour} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <k.Polygon
        points="0,-3.2 3,2 -3,2"
        fill={colour === '#F5F5F5' ? '#94A3B8' : colour}
        stroke="#FFFFFF"
        strokeWidth={0.6}
        transform={`translate(${end[0].toFixed(2)} ${end[1].toFixed(2)}) rotate(${angle.toFixed(1)})`}
      />
    </k.G>
  );
}

/* ----------------------------------------------------- signs and lights */

function SignPost({ k, sign, extra, at }: { k: Kit; sign: string; extra?: string; at: Pt }) {
  const draw = SIGN_ART[sign];
  const s = 0.12;
  const [x, y] = at;
  return (
    <k.G>
      <k.Line x1={x} y1={y - 4} x2={x} y2={y + (extra ? 10 : 7)} stroke="#6B7280" strokeWidth={0.8} />
      <k.G transform={`translate(${x - 6} ${y - 10}) scale(${s})`}>{draw ? draw(k) : null}</k.G>
      {extra && SIGN_ART[extra] ? (
        <k.G transform={`translate(${x - 6} ${y - 1.5}) scale(${s})`}>{SIGN_ART[extra](k)}</k.G>
      ) : null}
    </k.G>
  );
}

function TrafficLight({ k, state, at }: { k: Kit; state: LightState; at: Pt }) {
  const [x, y] = at;
  const on = (c: 'r' | 'a' | 'g') =>
    (c === 'r' && (state === 'red' || state === 'redAmber' || state === 'greenArrow')) ||
    (c === 'a' && (state === 'amber' || state === 'redAmber' || state === 'flashing')) ||
    (c === 'g' && state === 'green');
  return (
    <k.G>
      <k.Rect x={x - 2.4} y={y - 6.4} width={4.8} height={12.8} rx={1.2} fill="#111827" stroke="#FFFFFF" strokeWidth={0.4} />
      <k.Circle cx={x} cy={y - 3.8} r={1.5} fill={on('r') ? '#EF4444' : '#3F2A2A'} />
      <k.Circle cx={x} cy={y} r={1.5} fill={on('a') ? '#F59E0B' : '#3F3A2A'} />
      <k.Circle cx={x} cy={y + 3.8} r={1.5} fill={on('g') ? '#22C55E' : '#2A3F2E'} />
      {state === 'greenArrow' ? (
        <k.G>
          <k.Rect x={x + 3} y={y + 1.4} width={6} height={4.6} rx={0.6} fill="#111827" />
          <k.Path d={`M${x + 4} ${y + 3.7} h3`} stroke="#22C55E" strokeWidth={1} />
          <k.Polygon points={`${x + 8.2},${y + 3.7} ${x + 6.6},${y + 2.5} ${x + 6.6},${y + 4.9}`} fill="#22C55E" />
        </k.G>
      ) : null}
      {state === 'flashing' ? (
        <k.Path d={`M${x - 4.5} ${y - 1.5} l-1.5 -1 M${x - 4.5} ${y + 1.5} l-1.5 1 M${x + 4.5} ${y - 1.5} l1.5 -1 M${x + 4.5} ${y + 1.5} l1.5 1`} stroke="#F59E0B" strokeWidth={0.6} />
      ) : null}
    </k.G>
  );
}

function Officer({ k, facing, arms }: { k: Kit; facing: 'ns' | 'ew'; arms: 'side' | 'up' | 'forward' }) {
  const deg = facing === 'ns' ? 0 : 90;
  return (
    <k.G transform={`translate(${C} ${C}) rotate(${deg})`}>
      <k.Circle cx={0} cy={0} r={7} fill="#FFFFFF" opacity={0.25} />
      {arms === 'side' ? (
        <k.Line x1={-8} y1={0} x2={8} y2={0} stroke="#1E3A5F" strokeWidth={1.6} strokeLinecap="round" />
      ) : arms === 'forward' ? (
        <k.Line x1={0} y1={0} x2={0} y2={-7} stroke="#1E3A5F" strokeWidth={1.6} strokeLinecap="round" />
      ) : null}
      <k.Ellipse cx={0} cy={0} rx={3.4} ry={2} fill="#1E3A5F" />
      <k.Circle cx={0} cy={0} r={1.6} fill="#FFFFFF" stroke="#1E3A5F" strokeWidth={0.5} />
      {arms === 'up' ? <k.Circle cx={0} cy={0} r={0.9} fill="#1E3A5F" /> : null}
    </k.G>
  );
}

function PriorityBand({ k, arms }: { k: Kit; arms: Arm[] }) {
  const end = (a: Arm) => rotate([C, 100], ARM_ANGLE[a]);
  const d = arms.map((a, i) => {
    const [x, y] = end(a);
    return i === 0 ? `M${x} ${y} L${C} ${C}` : `L${x} ${y}`;
  });
  return <k.Path d={d.join(' ')} fill="none" stroke="#FFC63D" strokeWidth={16} strokeLinejoin="round" opacity={0.35} />;
}

/* ------------------------------------------------------------ conditions */

function Conditions({ k, scene, poses }: { k: Kit; scene: Scene; poses: Pose[] }) {
  const c = scene.conditions ?? [];
  return (
    <>
      {c.includes('ice') ? <k.Rect x={0} y={0} width={100} height={100} fill="#CFEFFF" opacity={0.28} /> : null}
      {c.includes('night') ? (
        <>
          <k.Rect x={0} y={0} width={100} height={100} fill="#0B1530" opacity={0.55} />
          {scene.actors.map((a, i) =>
            ['you', 'car', 'truck', 'bus', 'police', 'ambulance', 'moto', 'tractor'].includes(a.kind) ? (
              <k.Polygon
                key={i}
                points={`-3,${-actorLength(a.kind) / 2} 3,${-actorLength(a.kind) / 2} 9,${-actorLength(a.kind) / 2 - 22} -9,${-actorLength(a.kind) / 2 - 22}`}
                fill="#FFF3B0"
                opacity={0.32}
                transform={`translate(${poses[i].at[0]} ${poses[i].at[1]}) rotate(${poses[i].heading})`}
              />
            ) : null,
          )}
        </>
      ) : null}
      {c.includes('fog') ? <k.Rect x={0} y={0} width={100} height={100} fill="#F1F5F9" opacity={0.55} /> : null}
      {c.includes('rain')
        ? Array.from({ length: 38 }, (_, i) => {
            const x = (i * 37) % 100;
            const y = (i * 61) % 100;
            return <k.Line key={i} x1={x} y1={y} x2={x - 2} y2={y + 5} stroke="#DBEAFE" strokeWidth={0.5} opacity={0.8} />;
          })
        : null}
      {c.includes('snow')
        ? Array.from({ length: 46 }, (_, i) => (
            <k.Circle key={i} cx={(i * 29) % 100} cy={(i * 53) % 100} r={0.8} fill="#FFFFFF" opacity={0.9} />
          ))
        : null}
      {c.includes('wind')
        ? [20, 45, 70].map((y) => (
            <k.Path key={y} d={`M2 ${y} q10 -4 20 0 t20 0`} stroke="#FFFFFF" strokeWidth={0.8} fill="none" opacity={0.8} />
          ))
        : null}
    </>
  );
}

/* ----------------------------------------------------------------- scene */

export function SceneArt({
  scene,
  size = 300,
  poses: override,
  arrows = true,
  title,
}: {
  scene: Scene;
  size?: number;
  /** Per-actor positions, for animation. Defaults to each actor's waiting spot. */
  poses?: (Pose | null)[];
  arrows?: boolean;
  title?: string;
}) {
  const k = useKit();
  const night = (scene.conditions ?? []).includes('night');
  const poses = scene.actors.map((a, i) => override?.[i] ?? actorPose(a, scene.road));

  return (
    <k.Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={title ?? 'Traffic scene'}
      accessibilityLabel={title ?? 'Traffic scene'}
    >
      <k.Rect x={0} y={0} width={100} height={100} fill={night ? GRASS_NIGHT : GRASS} />
      <Road k={k} scene={scene} />
      {scene.priorityPath ? <PriorityBand k={k} arms={scene.priorityPath} /> : null}
      <Markings k={k} scene={scene} />

      {arrows
        ? scene.actors.map((a, i) => <RouteArrow key={`r${i}`} k={k} actor={a} colour={actorColour(a, i)} road={scene.road} />)
        : null}

      {scene.actors.map((a, i) => {
        const { at, heading } = poses[i];
        return (
          <k.G key={`a${i}`} transform={`translate(${at[0].toFixed(2)} ${at[1].toFixed(2)}) rotate(${heading.toFixed(1)})`}>
            {a.kind === 'you' ? (
              <k.Rect x={-5} y={-7.6} width={10} height={15.2} rx={3} fill="none" stroke="#FFFFFF" strokeWidth={1} strokeDasharray="1.4 1" />
            ) : null}
            <Body k={k} kind={a.kind} colour={actorColour(a, i)} siren={a.siren} />
            <Blinkers k={k} side={a.blinker} kind={a.kind} />
          </k.G>
        );
      })}

      <Conditions k={k} scene={scene} poses={poses} />

      {(scene.lights ?? []).map((l) => (
        <TrafficLight key={`l${l.arm}`} k={k} state={l.state} at={lightSpot(l.arm)} />
      ))}
      {(scene.signs ?? []).map((s, i) => (
        <SignPost key={`s${i}`} k={k} sign={s.sign} extra={s.extra} at={signSpot(s.arm)} />
      ))}
      {scene.officer ? <Officer k={k} facing={scene.officer.facing} arms={scene.officer.arms} /> : null}

      {/* Labels last, upright, so they read whatever way the vehicle points. */}
      {scene.actors.map((a, i) =>
        a.label ? (
          <k.G key={`t${i}`}>
            <k.Circle cx={poses[i].at[0]} cy={poses[i].at[1]} r={3.3} fill="#FFFFFF" stroke="#1F2933" strokeWidth={0.5} />
            <k.Text
              x={poses[i].at[0]}
              y={poses[i].at[1] + 1.7}
              fontSize={4.6}
              fontWeight="800"
              fill="#1F2933"
              textAnchor="middle"
              fontFamily="Arial, Helvetica, sans-serif"
            >
              {a.label}
            </k.Text>
          </k.G>
        ) : null,
      )}
    </k.Svg>
  );
}
