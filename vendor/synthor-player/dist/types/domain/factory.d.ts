import type { Cell, ChannelEffect, Connection, Doc, DrumKitInstrument, Instrument, MixChannel, Module, ModularInstrument, ModuleType, SampleEntity, Section, Track } from './types';
/**
 * Collision-free id, safe across save/load. A session-local counter would
 * restart at 0 when a saved doc is reloaded and collide with the loaded ids,
 * so we use a UUID (prefixed only for human readability in the JSON).
 */
export declare function makeId(prefix: string): string;
export declare function emptyCells(length: number): Cell[];
/** Fit a cell list to a target length: truncate if longer, pad empty if shorter. */
export declare function fitCells(cells: Cell[], length: number): Cell[];
/** A fresh master channel. */
export declare function createMasterChannel(): MixChannel;
/** A new sub-channel. */
export declare function createMixChannel(name: string): MixChannel;
/** A new channel effect instance. Mono effects should be created per-side (L+R). */
export declare function createChannelEffect(type: ModuleType, side?: 'L' | 'R'): ChannelEffect;
/** A fresh empty drum kit with a default key range of C-2 to C-4. */
export declare function newDrumKitInstrument(name: string): DrumKitInstrument;
/** A new sample entity (metadata only — binary data is stored in storage). */
export declare function newSampleEntity(name: string, hash: string, originalName: string, sampleRate: number, channels: number, frames: number): SampleEntity;
/**
 * First free auto-name for a new `eff` inlet: "Eff In 01", "Eff In 02", …
 * Scans the names already in use so numbering stays sequential and unique —
 * the tracker matches lanes to inlets by name, so duplicates would collide.
 */
export declare function nextEffName(taken: Iterable<string>): string;
/**
 * A fresh modular instrument seeded with a classic subtractive voice so it makes
 * sound the moment a track points at it: Note→Osc→Filter→Gain and
 * Gate→ADSR→(Gain mod), Gain→Output.
 */
export declare function newModularInstrument(name: string): ModularInstrument;
/** A synth with only the fixed sources and the output, unwired. */
export declare function newEmptyModularInstrument(name: string): ModularInstrument;
/**
 * Deep-clone an instrument with fresh ids. For modular instruments every module
 * and connection gets a new id and all `Port.moduleId` references (and
 * `outputId`) are remapped, so the copy is fully independent of the original.
 */
export declare function cloneInstrument(inst: Instrument, name: string): Instrument;
/** Four `dxop` operators wired per one of the 8 algorithms, in a column with
 *  op 4 on top. Carriers sum through a mix, then a gate→adsr→gain chain to the
 *  instrument's output — without the envelope the always-on operators would
 *  drone continuously, so the preset gates itself like the seeded patch does. */
export declare function buildDxAlgorithm(alg: number, outputId: string, gateId: string, origin: {
    x: number;
    y: number;
}): {
    modules: Module[];
    connections: Connection[];
};
/** A fresh empty track bound to an instrument. */
export declare function newTrack(instrumentId: string, length: number): Track;
/** A fresh section with a given name and no pattern references. */
export declare function newSection(name: string): Section;
/**
 * A minimal starter document: one 32-row pattern with a synth arpeggio and an
 * empty drum kit, so playback makes sound the moment you hit play. This is the
 * INITIAL state before any saved song loads; once a song loads, `loadDoc`
 * replaces this entirely.
 */
export declare function createDefaultDoc(): Doc;
