/**
 * The song position between txSeq row events, for visuals in time with the music.
 * Rows advance at a known rate on the audio clock, but events arrive a few ms
 * late and only name the whole row. So the moments the row *changes* pin down
 * where row boundaries fall: each change bounds the true phase from below, and
 * the highest recent bound is the estimate. Pure.
 */
export interface SongClock {
    /** Rows per second. */
    rate: number;
    /** position(t) = rate * t + anchor, in the numbering of the latest event's row. */
    anchor: number | null;
    /** Phases (row − rate · t) of recent row changes, newest last. */
    samples: number[];
    lastRow: number | null;
}
export declare function createClock(rate: number): SongClock;
/** A txSeq row event: `row` as numbered by the event, seen at audio time `t` (s). */
export declare function observeRow(clock: SongClock, row: number, t: number): SongClock;
/** The (unwrapped) row at audio time `t`, or null before the first event. */
export declare function clockRow(clock: SongClock, t: number): number | null;
/** A tempo change at audio time `t`: the position carries on, the phase samples restart. */
export declare function setClockRate(clock: SongClock, rate: number, t: number): SongClock;
export interface MusicalTime {
    row: number;
    /** Beats since the cue's top (fractional). */
    beat: number;
    beatPhase: number;
    /** Beat within the bar, 0-based. */
    beatInBar: number;
    bar: number;
    barPhase: number;
}
/** Beats and bars at a (fractional) row within a cue. */
export declare function musicalTime(row: number, linesPerBeat: number, beatsPerBar: number): MusicalTime;
/**
 * Seconds to wait before sending a note so it is heard on the next grid
 * point: `until` (s, as heard) to the next one, `latency` (s) from sending to
 * hearing, `period` (s) between grid points. A point closer than the latency
 * is missed, so the note goes to the first one still reachable.
 */
export declare function sendDelay(until: number, latency: number, period: number): number;
