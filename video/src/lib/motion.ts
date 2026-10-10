import { along, routePoints, type Pt } from '../../../src/art/geometry';
import { actorPose, type Pose } from '../../../src/art/scene';
import type { Question } from '../../../src/lib/types';

/** Frames one vehicle takes to drive its route out of the picture. */
export const DRIVE = 54;
/** Frames before the next group may set off: once the one before has cleared the middle. */
export const GAP = 34;

/**
 * Who drives when. Questions carry their own `motion`; an "in which order"
 * question whose answer reads "2, 3, 1" also gives it away, by label.
 */
export function motionOf(q: Question): number[][] | null {
  if (q.motion) return q.motion;
  if (!q.scene || q.kind !== 'choice' || q.correct.length !== 1) return null;
  const order = q.options[q.correct[0]].en.match(/^[1-9](, [1-9])+$/)?.[0];
  if (!order) return null;
  return order.split(', ').map((l) => {
    const i = q.scene!.actors.findIndex((a) => a.label === l);
    return i >= 0 ? [i] : [];
  });
}

/** Total frames the whole sequence of moves takes. */
export function motionFrames(groups: number[][] | null): number {
  if (!groups?.length) return 0;
  return (groups.length - 1) * GAP + DRIVE;
}

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/**
 * Every actor's pose `frame` frames after the moves begin: waiting at the
 * line until its group's turn, then driving its route with a gentle pull-away.
 */
export function posesAt(q: Question, frame: number): (Pose | null)[] {
  const scene = q.scene;
  const groups = motionOf(q);
  if (!scene || !groups) return [];
  return scene.actors.map((a, i) => {
    const g = groups.findIndex((grp) => grp.includes(i));
    if (g < 0 || !a.arm || !a.turn || a.turn === 'stop') return null;
    const start = actorPose(a, scene.road);
    const t = (frame - g * GAP) / DRIVE;
    if (t <= 0) return null;
    const route: Pt[] = routePoints(a.arm, a.turn, start.at);
    return along(route, easeInOut(Math.min(1, t)));
  });
}
