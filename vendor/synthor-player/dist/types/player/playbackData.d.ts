/**
 * Pure functions to convert a Doc + arrangement into per-slot data structures
 * consumed by the scheduler AudioWorklet.  No audio imports, no DOM, no React —
 * unit-testable with vitest.
 *
 * Voice slots are pre-allocated per instrument.  Tracks from different patterns
 * that never play simultaneously share the same slot.  The graph is compiled once
 * with all slots; the scheduler routes track data to the correct slot at the
 * correct time.
 */
import type { Doc, Id } from '../domain/types';
import type { InstrumentSlotLayout } from '../engine/voiceSlotLayout';
import type { ArrangementItem } from '../engine/arrangement';
/** Per-slot row data sent to the scheduler worklet.
 *
 *  Each slot has a fixed set of control channels (see REGULAR_CH / DRUMKIT_CH).
 *  `signals[i]` is the per-row value array for channel `offset + i`.
 *  The scheduler outputs `signals[i][row]` on output channel `offset + i`. */
export interface VoiceSlotData {
    instId: Id;
    slotIndex: number;
    /** Per-channel signal arrays.  Layout matches InstrumentSlotLayout:
     *  Regular: [gate, freq, vol, portamento, volumeSlide, panning,
     *            vibratoRate, vibratoDepth, tremoloRate, tremoloDepth,
     *            staccato, ...namedInlets]
     *  Drumkit: [drumGate0, ..., drumGateN-1, vol, portamento, volumeSlide,
     *            panning, vibratoRate, vibratoDepth, tremoloRate, tremoloDepth,
     *            staccato, ...namedInlets] */
    signals: number[][];
    /** Number of drum gate channels (0 for regular instrument slots). */
    drumGateCount: number;
}
/** Complete playback data for the scheduler. */
export interface PlaybackData {
    slots: VoiceSlotData[];
    totalRows: number;
    /** Arrangement items for section/song mode (pattern windows). */
    arrangement: ArrangementItem[];
    /** Global row of row 0 when this is a loop slice; the node's rows are relative to it. */
    rowOffset?: number;
}
/** Rows start..end (inclusive, global) of `data`, so the sequencer loops just them. Null when the range
 *  doesn't fit. */
export declare function slicePlaybackData(data: PlaybackData, start: number, end: number): PlaybackData | null;
/** One row of a slot at rest: gates off, every effect channel neutral. */
export declare function neutralSlotValues(layout: InstrumentSlotLayout): number[];
/** Map one pattern's tracks to their compiled voice slots, using the exact
 *  assignment rule buildPlaybackData applies (per-instrument counter; slots
 *  beyond the layout's slotCount are skipped but still counted). Tracks with
 *  missing entities or instruments are omitted. */
export declare function mapPatternTracksToSlots(doc: Doc, patternId: Id, layoutByInst?: Map<Id, InstrumentSlotLayout>): Map<Id, number>;
/** Build the playback data for the given doc and arrangement. */
export declare function buildPlaybackData(doc: Doc, arrangement: readonly ArrangementItem[], ensureSlotInstId?: Id | null): PlaybackData;
