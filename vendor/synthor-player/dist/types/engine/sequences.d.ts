import type { DrumKitInstrument, EffectLaneDef, Id, Track } from '../domain/types';
/**
 * Per-row control signals for one track, ready to feed into el.seq2.
 *
 * - `freqSeq`: the frequency to sound on each row. Notes are held forward
 *   across empty rows so the release tail keeps its pitch (0 before the first
 *   note).
 * - `gateSeq`: 1 while a note is active (attack/sustain), 0 on release.
 *   New notes retrigger the gate; note-off drops it; empty rows between
 *   notes sustain — giving real sustained-note behavior instead of one-row
 *   staccato gates.
 * - `volumeSeq`: per-row volume modifier (0..1), defaults to 1.
 * - `noteSeq`: raw MIDI note numbers — used by drumkit instruments for slot
 *   mapping.
 * - `effectLanes`: per-effect-lane value sequences (0..1), keyed by lane def id.
 */
export interface TrackSequences {
    freqSeq: number[];
    gateSeq: number[];
    volumeSeq: number[];
    /** Raw MIDI note numbers — used by drumkit instruments for slot mapping. */
    noteSeq: (number | null)[];
    /** Per-effect-lane value arrays (0..1), keyed by lane def id. Defaults to 0. */
    effectLanes: Record<Id, number[]>;
    /** Lane definitions from the track, passed through for signal processing. */
    laneDefs: EffectLaneDef[];
    /** Per-row staccato value (0..1). Used by the scheduler for sub-row
     *  gate timing: gate stays on for `staccato` fraction of the row.
     *  Only meaningful on the last row of a note+hold chain. */
    staccatoSeq: number[];
}
/** Hold rows ('|') before the first note or note-off; whether they sound depends on what plays before the pattern. */
export declare function leadingHoldRows(track: Track, length: number): number;
export declare function buildSequences(track: Track, length: number): TrackSequences;
/** Per-slot sequences for a drumkit track: one gate + freq per slot. */
export interface DrumKitSlotSequences {
    slotGateSeqs: Record<string, number[]>;
    slotFreqSeqs: Record<string, number[]>;
}
/**
 * Build per-slot gate and frequency sequences for a drumkit track.
 * Each note goes to one slot (nearest slot.note <= cell.note). The gate follows the regular
 * track gate — hold rows ('|') and retrigger gaps — on the slot of the
 * latest note, so an instrument slot's envelope sees the note's real length. Each slot keeps
 * its last frequency after its gate drops, so a release still sounds at pitch.
 */
export declare function buildDrumKitSlotSequences(track: Track, length: number, drumkit: DrumKitInstrument): DrumKitSlotSequences;
