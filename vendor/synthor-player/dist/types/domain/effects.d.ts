/**
 * Effect lane definitions — pure data, no dependencies.
 *
 * Each track can have zero or more effect lanes. Each lane has a type
 * (either a built-in effect or a named instrument inlet) and a per-step
 * 2-hex-digit value (00–FF, normalized 0–1).
 *
 * Built-in lane types are processed by the engine into freqMul/volMod/pan
 * modulation signals. Named instrument inlets pass the raw per-step value
 * directly into the modular synth graph via `eff` source modules.
 */
import type { Instrument } from './types';
/** Built-in lane type constants. */
export declare const BUILTIN_LANE_TYPES: readonly ['vibratoRate', 'vibratoDepth', 'tremoloRate', 'tremoloDepth', 'portamento', 'volumeSlide', 'panning', 'staccato'];
export type BuiltinLaneType = typeof BUILTIN_LANE_TYPES[number];
export interface LaneDef {
    type: BuiltinLaneType;
    label: string;
    description: string;
}
/** Registry of built-in effect lane types. */
export declare const LANE_DEFS: Record<BuiltinLaneType, LaneDef>;
/** Check whether a lane type string is a built-in type. */
export declare function isBuiltinLaneType(type: string): type is BuiltinLaneType;
/**
 * Named instrument inlets available as effect-lane types — the names of the
 * instrument's `eff` modules. Unnamed eff modules aren't addressable by a
 * lane, so they're excluded. Duplicate names are collapsed (two modules
 * sharing a name are driven by the same lane).
 */
export declare function effInletNames(inst: Instrument | undefined): string[];
/** Human-readable label for any lane type (built-in or named inlet). */
export declare function readableLaneLabel(type: string): string;
/** Format a value 0..1 as a tracker-style 2-digit hex string. */
export declare function valueHex(v: number | null): string;
/** Parse a 1–2 digit hex string (00–FF) into 0..1, or null when it isn't one. */
export declare function parseHex(s: string): number | null;
/** Linear ramp from `from` to `to` over `count` steps, snapped to whole hex bytes. */
export declare function interpolateValues(from: number, to: number, count: number): number[];
