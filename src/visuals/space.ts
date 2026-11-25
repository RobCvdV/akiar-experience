/**
 * The sky's geometry and colour, pure: stars on a shell around the viewer,
 * rotations as quaternions, perspective projection, and the hue a harmony
 * gives (pitch classes on the circle of fifths).
 */

export type Vec3 = [number, number, number];
export type Quat = [number, number, number, number]; // w, x, y, z

export interface Star {
  pos: Vec3;
  /** Base size in px at depth 1 */
  size: number;
  /** Base brightness, mostly very dim */
  glow: number;
  twinkleRate: number;
  twinklePhase: number;
  /** The pitch class it lights up for */
  pc: number;
  /** A small hue offset of its own */
  tint: number;
  /** Phase of its dance */
  phase: number;
}

export function makeStars(count: number, random: () => number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    // uniform on a sphere, at a depth between 1 and 2.4
    const u = random() * 2 - 1;
    const t = random() * Math.PI * 2;
    const r = Math.sqrt(1 - u * u);
    const d = 1 + random() ** 0.7 * 1.4;
    // most barely there, a few clearly lit
    const bright = random() ** 3.2;
    const beacon = random() < 0.045;
    stars.push({
      pos: [r * Math.cos(t) * d, u * d, r * Math.sin(t) * d],
      size: 0.6 + bright * 2.2 + (beacon ? 1 : 0),
      glow: beacon ? 0.5 + bright * 0.3 : 0.04 + bright * 0.3,
      twinkleRate: 0.15 + random() * 0.7,
      twinklePhase: random() * Math.PI * 2,
      pc: Math.floor(random() * 12),
      tint: (random() - 0.5) * 40,
      phase: random() * Math.PI * 2,
    });
  }
  return stars;
}

export const IDENTITY: Quat = [1, 0, 0, 0];

export function axisAngle(axis: Vec3, angle: number): Quat {
  const len = Math.hypot(...axis) || 1;
  const s = Math.sin(angle / 2) / len;
  return [Math.cos(angle / 2), axis[0] * s, axis[1] * s, axis[2] * s];
}

export function multiply(a: Quat, b: Quat): Quat {
  const [aw, ax, ay, az] = a;
  const [bw, bx, by, bz] = b;
  return [
    aw * bw - ax * bx - ay * by - az * bz,
    aw * bx + ax * bw + ay * bz - az * by,
    aw * by - ax * bz + ay * bw + az * bx,
    aw * bz + ax * by - ay * bx + az * bw,
  ];
}

export function normalize(q: Quat): Quat {
  const len = Math.hypot(...q) || 1;
  return [q[0] / len, q[1] / len, q[2] / len, q[3] / len];
}

export function rotate(q: Quat, v: Vec3): Vec3 {
  const [w, x, y, z] = q;
  // v + 2w(q×v) + 2q×(q×v)
  const cx = y * v[2] - z * v[1];
  const cy = z * v[0] - x * v[2];
  const cz = x * v[1] - y * v[0];
  return [
    v[0] + 2 * (w * cx + y * cz - z * cy),
    v[1] + 2 * (w * cy + z * cx - x * cz),
    v[2] + 2 * (w * cz + x * cy - y * cx),
  ];
}

export function randomAxis(random: () => number): Vec3 {
  const u = random() * 2 - 1;
  const t = random() * Math.PI * 2;
  const r = Math.sqrt(1 - u * u);
  return [r * Math.cos(t), u, r * Math.sin(t)];
}

export interface Projected {
  x: number;
  y: number;
  /** Scale with depth: 1 at depth 1 */
  scale: number;
  visible: boolean;
}

/** The viewer sits at the centre looking down +z; `focal` in px */
export function project(v: Vec3, cx: number, cy: number, focal: number): Projected {
  const z = v[2];
  if (z < 0.15) return { x: 0, y: 0, scale: 0, visible: false };
  return { x: cx + (v[0] / z) * focal, y: cy - (v[1] / z) * focal, scale: 1 / z, visible: true };
}

/** The nearest projected point to (x, y) within `radius`, or -1 */
export function nearest(
  points: readonly Projected[],
  x: number,
  y: number,
  radius: number,
): number {
  let best = -1;
  let bestD = radius * radius;
  points.forEach((p, i) => {
    if (!p.visible) return;
    const d = (p.x - x) ** 2 + (p.y - y) ** 2;
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  });
  return best;
}

/** A pitch class's hue, along the circle of fifths from D: teal, blue, violet up to magenta */
export function pcHue(pc: number): number {
  const steps = ((((pc - 2) * 7) % 12) + 12) % 12;
  return 185 + (steps / 11) * 140;
}

/** The harmony's hue: the circular mean of its pitch classes' hues */
export function harmonyHue(pcs: readonly number[]): number {
  if (pcs.length === 0) return 230;
  let x = 0;
  let y = 0;
  for (const pc of pcs) {
    const a = (pcHue(pc) * Math.PI) / 180;
    x += Math.cos(a);
    y += Math.sin(a);
  }
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

/** Ease `from` towards `to` on the hue circle, by `t` (0..1) */
export function easeHue(from: number, to: number, t: number): number {
  const d = ((to - from + 540) % 360) - 180;
  return (from + d * t + 360) % 360;
}
