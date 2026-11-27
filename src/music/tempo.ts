/**
 * The tempo follows the stage: slow in the dark, a little faster as the jazz
 * warms up, up to trance speed at the peak. The player changes tempo live
 * (no restart), so the page eases towards each stage's tempo and the music
 * speeds up and slows down gradually. Pure.
 */

/** Beats per minute per section (cue name); a section not listed keeps the song's tempo */
export const SECTION_BPM: Readonly<Record<string, number>> = {
  void: 84,
  nebula: 84,
  pulse: 86,
  drift: 90,
  constellation: 94,
  bloom: 97,
  dream: 100,
  ignite: 110,
  orbit: 118,
  lift: 122,
  surge: 125,
  euphoria: 126,
  breakdown: 122,
  afterglow: 86,
};

/** BPM per second, at most: a stage change takes a few bars to settle */
export const MAX_BPM_PER_SECOND = 2.2;

export function targetBpm(section: string | null, songBpm: number): number {
  return (section && SECTION_BPM[section]) || songBpm;
}

/** `dt` ms later: towards `target`, eased in and never faster than the limit */
export function easeBpm(current: number, target: number, dt: number): number {
  const gap = target - current;
  if (Math.abs(gap) < 0.01) return target;
  const eased = gap * Math.min(1, dt / 3000);
  const limit = (MAX_BPM_PER_SECOND * dt) / 1000;
  return current + Math.max(-limit, Math.min(limit, eased));
}
