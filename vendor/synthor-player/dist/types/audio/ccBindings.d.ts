import type { ParamRefRegistry } from './paramRefs';
/**
 * Maps MIDI CC numbers to param-ref keys so CC knob turns update the right
 * refs directly — no graph recompile needed.
 *
 * CC values are rAF-coalesced: incoming events are buffered, and only the
 * latest value per CC number is flushed once per animation frame.  This
 * prevents the audio worklet message queue from backing up when a MIDI
 * controller sends dozens of CC events per frame.
 *
 * Populated during compile (effect1/effect2/midicc modules call `register`).
 * Cleared before each structural recompile so stale bindings don't accumulate.
 */
export declare class CcBindings {
    private map;
    private pending;
    private frame;
    private refs;
    /** Called once per rAF per CC number after flush, for store updates. */
    onFlush?: (cc: number, raw: number) => void;
    /** Must be called after the host creates the paramRefs registry. */
    attach(refs: ParamRefRegistry): void;
    /** Record that `refKey` should be updated when CC `cc` changes.
     *  cc=0 means "no CC assigned" — silently skipped. */
    register(cc: number, refKey: string): void;
    /** Buffer a CC value (raw 0-127).  Flushed once per animation frame so the
     *  audio worklet only gets the latest value, not every intermediate event. */
    queue(cc: number, raw: number): void;
    /** Discard all registrations — call before each structural recompile. */
    clear(): void;
    private flushPending;
}
