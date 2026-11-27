import { type NodeRepr_t } from '@elemaudio/core';
/** The native `wtosc` node's built-in shapes, in its `WtShape` order
 *  (src/native/WtOsc.h). Append only: songs store the index. */
export declare const WAVETABLE_SHAPES: readonly ['sine', 'saw', 'square', 'triangle', 'pulse 25%', 'pulse 12%', 'half sine', 'abs sine', 'organ', 'trapezoid', 'sync saw', 'stairs', 'soft saw', 'hollow', 'shark fin', 'double saw'];
export type WavetableShape = (typeof WAVETABLE_SHAPES)[number];
export declare function wavetableShapeIndex(name: WavetableShape): number;
/** Band-limited (mipmapped) wavetable oscillator. `freq` in Hz — negative runs
 *  backwards; `phase` is an optional offset in cycles (phase modulation);
 *  a rising edge on `reset` restarts the cycle (as `el.syncphasor`). A reset of
 *  a constant never fires, so a zero stands in for an unused one. */
export declare function wtosc(shape: number, freq: NodeRepr_t, { bandlimit, ...opts }?: WtoscOptions & {
    bandlimit?: boolean;
}): NodeRepr_t;
/** `wtosc` playing uploaded tables (`engine/wavetableMips`) from the VFS at `path`;
 *  `position` (0..1) morphs across their frames. */
export declare function wtoscTable(path: string, freq: NodeRepr_t, { position, ...opts }?: WtoscOptions & {
    position?: NodeRepr_t;
}): NodeRepr_t;
interface WtoscOptions {
    phase?: NodeRepr_t;
    reset?: NodeRepr_t;
    key?: string;
}
export {};
