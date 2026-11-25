import type { ParamRefRegistry } from '../audio/paramRefs';
import type { DrumKitInstrument } from '../domain/types';
/**
 * Fixed-size voice pool for an instrument.  Manages voice allocation (which
 * MIDI note → which slot) and updates per-voice createRef nodes directly —
 * no graph recompile needed, no snapshot(), no onChange callback.
 *
 * In drumkit mode (kit provided), MIDI notes are routed to the correct
 * drumkit slot via getSlotForNote. Each slot gets 1 sub-voice.
 */
export declare class VoicePool {
    private refs;
    private instId;
    readonly size: number;
    private noteMap;
    private freeStack;
    private releaseTimers;
    /** Set via setKit() for drumkit instruments. */
    private kit?;
    constructor(refs: ParamRefRegistry, instId: string, size?: number);
    /** True when this pool routes to drumkit slots instead of generic voices. */
    get isDrumKit(): boolean;
    /** Number of drumkit slots (0 when not in drumkit mode). */
    get slotCount(): number;
    /** Configure this pool for drumkit mode. No-op if already configured.
     *  Safe to call after construction — call before any note events. */
    setKit(kit: DrumKitInstrument): void;
    /** Snapshot of currently held notes → slot indices. Used by UI voice counter. */
    getActiveNotes(): Map<number, number>;
    /** Number of currently active (gated) voices. */
    get activeCount(): number;
    /** Called when a voice is stolen (pool exhausted). */
    onVoiceSteal: ((instId: string, note: number) => void) | null;
    /** Start a note. Returns the slot index used. */
    noteOn(note: number, velocity?: number): number;
    /** End a note — gate drops to 0, release tail rings, slot frees after timeout. */
    noteOff(note: number): void;
    /** Kill every sounding voice immediately — all gates to 0, all slots freed. */
    panic(): void;
    private drumNoteOn;
    private drumNoteOff;
    /** Allocate a slot for `note`, reusing an existing mapping or stealing
     *  from a releasing/oldest-active slot when the pool is exhausted. */
    private allocate;
    /** Pick the best slot to steal: releasing slots first (gate already 0),
     *  then the oldest active slot (slot 0).  Also clears the old note mapping. */
    private stealSlot;
    private clearReleaseTimer;
}
