/**
 * Pure functions to compute voice-slot layouts for tracker playback.
 *
 * Each instrument gets a fixed number of voice slots — enough for the maximum
 * number of tracks using that instrument in any single pattern.  Slots are
 * indexed in layout order (see slotGlobalIndex): the txSeq upload packs slot
 * data in the same order and the graph reads slot s signal c from txSeq
 * output channel s*MAX_SLOT_SIGNALS+c.  No recompile for notes, effects,
 * pattern switches, or play-mode changes.
 */
import type { Doc, Id } from '../domain/types';
/** Output channels reserved per slot on the txSeq native node
 *  (src/native/TxSeq.h).  Channel for slot s signal c = s * MAX + c. */
export declare const MAX_SLOT_SIGNALS = 32;
/** Drumkit: N drum-gate channels + N drum-freq channels, plus extra effect
 *  channels.  channelsPerSlot = 2*drumSounds + DRUMKIT_EXTRA_CHANNELS. */
/** Extra channels beyond the drum-gate+freq blocks: vol + 9 other effect
 *  channels (portamento, volumeSlide, panning, vibratoRate, vibratoDepth,
 *   tremoloRate, tremoloDepth, staccato). */
export declare const DRUMKIT_EXTRA_CHANNELS = 10;
/** Fixed channel indices within a regular slot. */
export declare const REGULAR_CH: {
    readonly gate: 0;
    readonly freq: 1;
    readonly vol: 2;
    readonly portamento: 3;
    readonly volumeSlide: 4;
    readonly panning: 5;
    readonly vibratoRate: 6;
    readonly vibratoDepth: 7;
    readonly tremoloRate: 8;
    readonly tremoloDepth: 9;
    readonly staccato: 10;
};
/** Fixed channel indices for effect lanes within a drumkit slot (relative to
 *  the end of the drum-gate+freq blocks).  Gates at 0..N-1, freqs at N..2N-1. */
export declare const DRUMKIT_CH: {
    readonly vol: 0;
    readonly portamento: 1;
    readonly volumeSlide: 2;
    readonly panning: 3;
    readonly vibratoRate: 4;
    readonly vibratoDepth: 5;
    readonly tremoloRate: 6;
    readonly tremoloDepth: 7;
    readonly staccato: 8;
};
/** Per-instrument slot layout returned by computeSlotLayouts. */
export interface InstrumentSlotLayout {
    instId: Id;
    slotCount: number;
    /** Signals consumed by one slot of this instrument. */
    channelsPerSlot: number;
    /** Named inlet names in channel order (alphabetical for determinism). */
    namedInletIds: Id[];
    isDrumkit: boolean;
    /** Number of drum sounds (only meaningful for drumkits). */
    drumSounds?: number;
}
/**
 * Compute slot layouts for all voice slots across all instruments, in
 * deterministic order (by instrument id, then slot index).
 * `ensureSlotInstId` gets at least one slot even without tracks, so live
 * notes can play through the sequencer.
 */
export declare function computeSlotLayouts(doc: Doc, ensureSlotInstId?: Id | null): InstrumentSlotLayout[];
/** Global slot ordinal (0-based across all instruments, in layout order).
 *  This is the slot's index into the txSeq upload and its output-channel base
 *  (channel = globalIndex * MAX_SLOT_SIGNALS + signalIndex). */
export declare function slotGlobalIndex(layouts: InstrumentSlotLayout[], instId: Id, slotIndex: number): number;
