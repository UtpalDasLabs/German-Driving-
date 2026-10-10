import type { Arm, Turn } from '../lib/types';

/**
 * Geometry for the top-down traffic scenes, kept free of any drawing code so
 * the app (still pictures) and the videos (actors driving their routes) place
 * everything identically.
 *
 * The scene is a 100x100 box with north at the top. Roads are 20 wide - two
 * 10-wide lanes - and the junction box spans 40..60 on both axes. Traffic keeps
 * right. Everything is defined for the south arm (coming from below, heading
 * north) and rotated into place for the other three.
 */

export const C = 50;
export const HALF = 10;
export const LANE = 10;

/** Clockwise rotation, in degrees, that carries the south arm onto each arm. */
export const ARM_ANGLE: Record<Arm, number> = { s: 0, w: 90, n: 180, e: 270 };

export type Pt = [number, number];

export function rotate([x, y]: Pt, deg: number, about: Pt = [C, C]): Pt {
  const r = (deg * Math.PI) / 180;
  const dx = x - about[0];
  const dy = y - about[1];
  return [about[0] + dx * Math.cos(r) - dy * Math.sin(r), about[1] + dx * Math.sin(r) + dy * Math.cos(r)];
}

/**
 * Where a vehicle waits on an arm. Slot 1 has its front bumper at the junction;
 * each further slot is one car length plus a gap back.
 */
export function armPose(arm: Arm, slot = 1, length = 12, roundabout = false): { at: Pt; heading: number } {
  // A roundabout's ring reaches further out than a plain junction box.
  const frontY = roundabout ? C + 30 : C + HALF + 2;
  const y = frontY + length / 2 + (slot - 1) * (length + 3);
  return { at: rotate([C + LANE / 2, y], ARM_ANGLE[arm]), heading: ARM_ANGLE[arm] };
}

/** Exit arm for a turn made from the given arm. */
export function exitArm(arm: Arm, turn: Turn): Arm {
  const order: Arm[] = ['s', 'w', 'n', 'e'];
  const i = order.indexOf(arm);
  if (turn === 'straight') return order[(i + 2) % 4];
  // Turning right from the south arm leaves by the east arm.
  if (turn === 'right') return order[(i + 3) % 4];
  if (turn === 'left') return order[(i + 1) % 4];
  return arm;
}

/**
 * The path a vehicle drives from its waiting position through the junction and
 * out, as a list of points dense enough to animate along. Returned in scene
 * coordinates, already rotated for the arm.
 */
export function routePoints(arm: Arm, turn: Turn, start: Pt | null = null): Pt[] {
  const sx = C + LANE / 2;
  const pts: Pt[] = [];
  const from: Pt = start ? rotate(start, -ARM_ANGLE[arm]) : [sx, 80];
  const entry: Pt = [sx, C + HALF];
  pts.push(from, entry);

  if (turn === 'straight') {
    pts.push([sx, -20]);
  } else if (turn === 'right') {
    // Quarter circle hugging the corner, out on the east arm's lane.
    const cx = C + HALF;
    const cy = C + HALF;
    const r = HALF - LANE / 2;
    for (let i = 1; i <= 8; i += 1) {
      const a = Math.PI + (i / 8) * (Math.PI / 2);
      pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    pts.push([120, C + LANE / 2]);
  } else if (turn === 'left') {
    // Wide arc past the centre, out on the west arm heading west.
    const cx = C - HALF;
    const cy = C + HALF;
    const r = HALF + LANE / 2;
    for (let i = 1; i <= 12; i += 1) {
      const a = -(i / 12) * (Math.PI / 2);
      pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    pts.push([-20, C - LANE / 2]);
  } else if (turn === 'uturn') {
    const cx = C;
    const cy = C + HALF;
    for (let i = 1; i <= 10; i += 1) {
      const a = (i / 10) * Math.PI;
      pts.push([cx + (LANE / 2) * Math.cos(-a), cy + (LANE / 2) * Math.sin(-a) * 1.4]);
    }
    pts.push([C - LANE / 2, 120]);
  }
  return pts.map((p) => rotate(p, ARM_ANGLE[arm]));
}

/** Total length of a polyline. */
export function polyLength(pts: Pt[]): number {
  let d = 0;
  for (let i = 1; i < pts.length; i += 1) d += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  return d;
}

/**
 * Position and heading at fraction `t` (0-1) of the way along a polyline.
 * Heading is in degrees with 0 = north, matching the scene convention.
 */
export function along(pts: Pt[], t: number): { at: Pt; heading: number } {
  const total = polyLength(pts);
  let target = Math.max(0, Math.min(1, t)) * total;
  for (let i = 1; i < pts.length; i += 1) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const seg = Math.hypot(x1 - x0, y1 - y0);
    if (target <= seg || i === pts.length - 1) {
      const f = seg === 0 ? 0 : Math.min(1, target / seg);
      const heading = (Math.atan2(x1 - x0, -(y1 - y0)) * 180) / Math.PI;
      return { at: [x0 + (x1 - x0) * f, y0 + (y1 - y0) * f], heading };
    }
    target -= seg;
  }
  return { at: pts[pts.length - 1], heading: 0 };
}

/** The route arrow drawn on a still: from the vehicle front, a little way out. */
export function arrowPath(arm: Arm, turn: Turn): string {
  const pts = routePoints(arm, turn);
  // Drop the first point (the vehicle centre) and shorten the exit leg.
  const body = pts.slice(1);
  const last = body[body.length - 1];
  const prev = body[body.length - 2];
  const dx = last[0] - prev[0];
  const dy = last[1] - prev[1];
  const len = Math.hypot(dx, dy) || 1;
  const keep = turn === 'straight' ? 34 : 16;
  body[body.length - 1] = [prev[0] + (dx / len) * keep, prev[1] + (dy / len) * keep];
  return body.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ');
}

/** Where a sign stands for traffic on an arm: on the verge, to the driver's right. */
export function signSpot(arm: Arm): Pt {
  return rotate([C + HALF + 9, C + HALF + 12], ARM_ANGLE[arm]);
}

/** Where a traffic light stands for an arm. */
export function lightSpot(arm: Arm): Pt {
  return rotate([C + HALF + 4, C + HALF + 4], ARM_ANGLE[arm]);
}
