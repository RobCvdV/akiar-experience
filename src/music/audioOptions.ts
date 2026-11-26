/**
 * Audio settings from the page's URL, to tune a device without a deploy:
 * `?latency=interactive|balanced|playback|<seconds>` and `?debug`. Touch
 * devices default to `playback`: larger buffers, so a busy audio thread
 * misses fewer of them (missed buffers are heard as ticks).
 */

export type LatencyHint = AudioContextLatencyCategory | number;

export interface AudioOptions {
  latencyHint: LatencyHint;
  debug: boolean;
}

const CATEGORIES: readonly string[] = ['interactive', 'balanced', 'playback'];

export function audioOptions(search: string, coarsePointer: boolean): AudioOptions {
  const params = new URLSearchParams(search);
  const asked = params.get('latency');
  const seconds = asked !== null ? Number(asked) : Number.NaN;
  const latencyHint: LatencyHint =
    asked !== null && CATEGORIES.includes(asked)
      ? (asked as AudioContextLatencyCategory)
      : Number.isFinite(seconds) && seconds > 0 && seconds <= 1
        ? seconds
        : coarsePointer
          ? 'playback'
          : 'interactive';
  return { latencyHint, debug: params.has('debug') };
}
