import type { Doc, Id } from '../domain/types';
import type { AudioHost } from './host';
/** What live notes are routed against: the app reads its stores, a headless player its own song. */
export interface LiveNoteContext {
    doc: Doc;
    freePlay: boolean;
    selectedInstrumentId: Id | null;
}
/**
 * Routes live notes (keyboard, MIDI, tracker pips): the current instrument
 * plays its own voices in free play; everything else plays through the
 * instrument's tracker slots on the txSeq node, so it costs no extra DSP.
 */
export declare class LiveNotes {
    private host;
    private context;
    private held;
    /** Global slot → key of the note that owns it. */
    private slotOwner;
    private lastSlot;
    private layoutCache;
    constructor(host: AudioHost, context: () => LiveNoteContext);
    /** `preferredSlot` is the instrument-local tracker slot to use (the cursor track's). */
    noteOn(instId: Id, note: number, velocity?: number, preferredSlot?: number): void;
    noteOff(instId: Id, note: number): void;
    /** Forget all live notes; the host zeroes the voices and clears txSeq overrides. */
    reset(): void;
    private release;
    private layouts;
}
