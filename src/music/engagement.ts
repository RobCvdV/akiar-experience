/**
 * How engaged the listener is, as the conductor's "progress" (0..1). Every
 * touch of the sky adds a little, clicks most; it fades slowly, and faster
 * once the listener has let go for a while. Clicks close together are a
 * streak: the conductor hears them as a cascade's reactions and heats up.
 * Pure: time is passed in (ms).
 */

export type Gesture = 'move' | 'hover' | 'click' | 'scroll';

export interface Engagement {
  progress: number;
  /** When the listener last did something (ms) */
  lastAt: number;
  /** Clicks in the current streak */
  streak: number;
  lastClickAt: number;
  /** Time actively engaged (ms), for the level */
  engagedMs: number;
}

export const initialEngagement: Engagement = {
  progress: 0,
  lastAt: Number.NEGATIVE_INFINITY,
  streak: 0,
  lastClickAt: Number.NEGATIVE_INFINITY,
  engagedMs: 0,
};

const GAIN: Record<Gesture, number> = { move: 0.00005, hover: 0.003, click: 0.018, scroll: 0.0005 };
/** Clicks closer than this make a streak */
export const STREAK_MS = 1800;
/** Idle longer than this and the music starts to let go */
export const IDLE_MS = 12000;
const HALF_LIFE_ACTIVE_S = 400;
const HALF_LIFE_IDLE_S = 50;
/** Gaps shorter than this count as engaged time */
const ENGAGED_GAP_MS = 4000;

/** `strength` scales the gain (a fast scroll, a long move) */
export function gesture(e: Engagement, kind: Gesture, now: number, strength = 1): Engagement {
  const gap = now - e.lastAt;
  const engagedMs = e.engagedMs + (gap > 0 && gap < ENGAGED_GAP_MS ? gap : 0);
  // the closer to the top, the more it takes
  const room = 1 - 0.55 * e.progress;
  const progress = Math.min(1, e.progress + GAIN[kind] * Math.min(strength, 3) * room);
  if (kind !== 'click') return { ...e, progress, lastAt: now, engagedMs };
  const streak = now - e.lastClickAt < STREAK_MS ? e.streak + 1 : 1;
  return { ...e, progress, lastAt: now, engagedMs, streak, lastClickAt: now };
}

/** `dt` ms later */
export function decay(e: Engagement, now: number, dt: number): Engagement {
  const idle = now - e.lastAt > IDLE_MS;
  const halfLife = idle ? HALF_LIFE_IDLE_S : HALF_LIFE_ACTIVE_S;
  const progress = e.progress * 0.5 ** (dt / 1000 / halfLife);
  return { ...e, progress: progress < 0.002 ? 0 : progress };
}

export function isIdle(e: Engagement, now: number): boolean {
  return now - e.lastAt > IDLE_MS;
}
