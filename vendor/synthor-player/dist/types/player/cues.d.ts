/**
 * Cues for embedded playback (games): naming the part of a song to play, the
 * track mutes that layer it, and the seamless hand-over from one looping part
 * to the next on the txSeq node. Pure — the headless SongPlayer drives these.
 */
import type { Doc, Id } from '../domain/types';
import { type ArrangementItem } from '../engine/arrangement';
import { type PlaybackData } from './playbackData';
/** A section or pattern by name or id (sections win a name clash), or the whole song. */
export type Cue = string | {
    section: string;
} | {
    pattern: string;
} | {
    song: true;
};
export interface CueInfo {
    kind: 'section' | 'pattern';
    id: Id;
    name: string;
    rows: number;
}
/**
 * When a cue takes over a playing one:
 *   'now'  — restart on the new cue's top immediately.
 *   'sync' — swap at once, keeping the row position (layered variations of equal length).
 *   'end'  — when the current loop finishes.
 *   { every: n } — on the next n-row boundary (n = rows per bar for bar-quantized changes).
 * Boundaries count from the top of the cue sounding when the switch lands, so
 * a cue asked for mid hand-over follows the cue that is taking over.
 */
export type CueTiming = 'now' | 'sync' | 'end' | {
    every: number;
};
/** One step of `queue()`: a cue and when it takes over from the step before. */
export interface CueStep {
    cue: Cue;
    timing?: CueTiming;
    /**
     * Carry on where the cue would be had it kept playing since it was left
     * (e.g. a stage after a fill or a detour), instead of from its top.
     */
    resume?: boolean;
}
/** Every section, then every pattern, as playable cues. */
export declare function listCues(doc: Doc): CueInfo[];
/** The arrangement a cue plays, or null when it names nothing playable. */
export declare function resolveCue(doc: Doc, cue: Cue): ArrangementItem[] | null;
/**
 * Slot mute ref values for muted Track #s (1-based), across every pattern.
 * `winningPatternId` is applied last so it wins any slot shared between patterns.
 */
export declare function trackMuteValues(doc: Doc, isMuted: (trackNumber: number) => boolean, winningPatternId?: Id): [key: string, value: number][];
/**
 * Slot gain values (the smoothed mute refs, 0..1) for Track #s (1-based)
 * across every pattern; `only` limits them to those Track #s.
 */
export declare function trackLevelValues(doc: Doc, levelOf: (trackNumber: number) => number, winningPatternId?: Id, only?: ReadonlySet<number>): [key: string, value: number][];
/** `a` then `b`; both built from the same doc, so their slots line up. */
export declare function concatPlaybackData(a: PlaybackData, b: PlaybackData): PlaybackData;
/** `data` repeated (and cut) to exactly `rows` rows. */
export declare function tilePlaybackData(data: PlaybackData, rows: number): PlaybackData;
/**
 * `data` starting at its row `start` (and wrapping round to it), so a cue can
 * carry on mid-way instead of from its top.
 */
export declare function rotatePlaybackData(data: PlaybackData, start: number): PlaybackData;
/**
 * Where a cue left at its row `row`, `rowsSince` rows ago, would be now had
 * it kept playing — the row to carry on from.
 */
export declare function resumeRow(row: number, rowsSince: number, length: number): number;
/** Rows played since a cue started sounding at its row `startRow`, now at (unwrapped) `row` after `loops` wraps. */
export declare function rowsPlayed(startRow: number, loops: number, row: number, length: number): number;
/**
 * The first row ≥ `row + margin` on a `quantum` grid, capped at `total` (the
 * loop end). A cue switch lands there, so the upload has `margin` rows to arrive.
 */
export declare function nextBoundary(row: number, total: number, quantum: number, margin: number): number;
/**
 * Uploads that move a playing loop from `from` to `to` at row `at` without a
 * restart. txSeq keeps its row across `update`s and reads data modulo its
 * length, so the hand-over is staged:
 *   bridge — `from` up to `at`, then `to`: playback runs into `to` at `at`.
 *   settle — sent once inside `to`: `to` before `at` as well, so the wrap
 *            at the end lands on `to`'s top instead of `from`'s.
 *   target — sent after that wrap: plain `to`, looping (rows < `at` read
 *            `to` modulo its length either way).
 */
export interface CueTransition {
    at: number;
    bridge: PlaybackData;
    settle: PlaybackData;
    target: PlaybackData;
    /** Where `from`'s own rows start in the node's rows, and its length — for reporting its rows. */
    fromStart: number;
    fromLength: number;
    /** `to`'s cue row at its first row (`to` is rotated to start there; 0 from its top). */
    toOffset: number;
}
/**
 * `from` is the data on the node (a plain cue, or a running hand-over's data);
 * `fromView` says which rows of it the sounding cue occupies.
 */
export declare function planTransition(from: PlaybackData, to: PlaybackData, at: number, fromView?: {
    start: number;
    length: number;
}, toOffset?: number): CueTransition;
/** What the node plays: its data, and where the sounding cue's rows sit in it. */
export interface NodeView {
    data: PlaybackData;
    /** Node row of the sounding cue's row 0 (cue row = (row − start) mod length). */
    start: number;
    length: number;
    /** Latest node row a new switch may land on. */
    limit: number;
}
/** A running hand-over as the player tracks it. */
export interface RunningTransition extends CueTransition {
    stage: TransitionStage;
}
/**
 * The node's view at node row `row`, with `steady` the plain cue's data when
 * no hand-over runs (rotated to start at its cue row `offset`). Before `at` the
 * old cue sounds and a new switch may not land later than `at`; from `at` on
 * the hand-over's target does. Once the settle data wraps, its rows before
 * `at` hold the target tiled from its first row, so a switch lands before `at`.
 */
export declare function nodeView(steady: PlaybackData, running: RunningTransition | null, row: number, offset?: number): NodeView;
/**
 * A plain loop about to wrap: an upload sent now may land before or after the
 * wrap, so no switch can be placed safely — plan it once the wrap is seen.
 * (Loops too short to ever be clear of their wrap are planned regardless.)
 */
export declare function mustWaitForWrap(steady: PlaybackData, running: RunningTransition | null, row: number, margin: number): boolean;
/**
 * Node row where a switch on the sounding cue's `quantum`-row grid lands,
 * `margin` rows ahead at least. The grid restarts at the cue's top, and its
 * end counts as a grid line; past it the switch lands in the next loop.
 */
export declare function switchRow(view: NodeView, row: number, quantum: number, margin: number): number;
export type TransitionStage = 'bridge' | 'settle';
export interface TransitionStep {
    /** Upload due now — the hand-over moved on: `settle` data, or the final `target`. */
    send: 'settle' | 'target' | null;
    /** Which cue the row belongs to, and the row within it. */
    sounding: 'from' | 'to';
    row: number;
}
/**
 * One txSeq row report during a hand-over. `landed`: the current stage's
 * upload has reached the node, so rows describe its data. Settle goes out once
 * a row ≥ `at` shows playback inside `to`; target once a row < `at` shows the
 * wrap onto `to`'s top.
 */
export declare function stepTransition(plan: CueTransition, stage: TransitionStage, landed: boolean, row: number): TransitionStep;
