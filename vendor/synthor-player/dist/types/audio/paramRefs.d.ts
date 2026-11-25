import { type NodeRepr_t, type ElemNode } from '@elemaudio/core';
import type WebRenderer from '@elemaudio/web-renderer';
/** Exposed for docStore / midiStore — call after AudioHost creates the registry. */
export declare function setActiveParamRefs(r: ParamRefRegistry | null): void;
/** Quick ref update from anywhere — no-op when the host isn't ready. */
export declare function updateParamRef(key: string, value: number): void;
/** Clear all refs — call on undo/redo so the next compile recreates them. */
export declare function clearParamRefs(): void;
/**
 * Registry of Elementary `createRef` nodes so slider / MIDI CC values can be
 * updated directly (no graph recompilation) after the initial render.
 */
export declare class ParamRefRegistry {
    private refs;
    private core;
    /** Values queued while refs were unmounted — flushed after render completes.
     *  Array preserves order so rapid on→off sequences aren't collapsed. */
    private pending;
    attach(core: WebRenderer): void;
    /** Return a ref node for the given key, creating one on first call.
     *  Does NOT sync the value on existing refs — the setter handles that. */
    getOrCreate(key: string, value: number): NodeRepr_t;
    /** Like getOrCreate but for any node kind (not just const).
     *  `makeApply` receives the node's setter and returns an apply function
     *  that translates a numeric slider value to the node's props.
     *  Example: filter mode 0→1→2 mapped to 'lowpass'/'highpass'/'bandpass'. */
    getOrCreateNode(key: string, kind: string, props: Record<string, unknown>, children: ElemNode[], makeApply?: (setter: (props: Record<string, unknown>) => void) => (value: number) => void): NodeRepr_t;
    /** Update a ref's value without recompiling.  If the ref isn't mounted yet
     *  the value is queued and applied via flushPending after the next render.
     *  When the ref exists, any stale pending entries for this key are removed
     *  first — otherwise flushPending could override a direct setValue call
     *  (e.g. a note-off directly setting gate=0 getting overridden by a
     *  previously-queued gate=1). */
    setValue(key: string, value: number): void;
    /** Apply all queued values in order.  Call after core.render() completes. */
    flushPending(): void;
    get pendingCount(): number;
    /** Discard all cached refs (call before structural recompile). */
    clear(): void;
    /** Set all gate and velocity refs to 0 — silences every live voice instantly. */
    panic(): void;
    get size(): number;
}
