/**
 * The module registry — pure data describing every module type in one place.
 * No `el`, no React: both the engine (input gathering, param lookup) and the
 * React Flow editor (handles + sliders) read this. Adding a new module type is
 * a new entry here plus one compile case in `engine/modular.ts`.
 */
import type { ModuleType } from './types';
/** A tweakable knob on a module. `enumLabels` marks a discrete selector. */
export interface ParamDef {
    key: string;
    label: string;
    min: number;
    max: number;
    default: number;
    step: number;
    /** When set, the param is a discrete choice; index into these labels. */
    enumLabels?: string[];
    /** When true, an integer scale factor is shown as +/- buttons next to the
     *  slider value. The scale value is stored in a companion param with the
     *  suffix `Scale` (e.g. `modDepthScale` augments `modDepth`). */
    showScale?: boolean;
    /** Read when the graph is compiled, so changing it must recompile (no live ref). */
    structural?: boolean;
}
/** Palette category shown in the editor's Add palette. Singleton types
 *  (note/gate/volume/midicc/output) never appear there, so they have none. */
export type ModuleGroup = 'sources' | 'generators' | 'shaping' | 'distortion' | 'time';
export interface ModuleDef {
    type: ModuleType;
    label: string;
    /** Named inlets (left side). Sources (note/gate) have none. */
    inlets: string[];
    /** Named outlets (right side). The output sink has none. */
    outlets: string[];
    params: ParamDef[];
    /** Sources and the output sink are singletons the user can't add/delete. */
    singleton?: boolean;
    /** Palette group. Required for every non-singleton type. */
    group?: ModuleGroup;
    /** Label of the sample picker, for modules that reference a sample (`Module.sampleId`). */
    samplePicker?: string;
}
/** Waveform selector values for the oscillator. */
export declare const WAVEFORMS: readonly ['saw', 'square', 'triangle', 'sine', 'pulse'];
/** DX operator waveforms — sine first so old patches (no waveform param → 0) stay sine. */
export declare const DX_WAVEFORMS: readonly ['sine', 'saw', 'square', 'triangle', 'pulse'];
/** LFO waveform selector — all shapes, ordered so old sine/triangle patches
 *  keep their index (0=sine, 1=triangle, then the rest). */
export declare const LFO_WAVEFORMS: readonly ['sine', 'triangle', 'saw', 'square', 'pulse'];
/** Filter mode selector values. */
export declare const FILTER_MODES: readonly ['lowpass', 'highpass', 'bandpass'];
/** Mix combine modes. */
export declare const MIX_MODES: readonly ['add', 'multiply'];
/** Longest sample taken for one waveform cycle when it doesn't declare its cycle length. */
export declare const MAX_CYCLE_FRAMES = 4096;
/** Wave module cycle sizes: auto (whole sample when it is a single cycle, else 2048-frame wavetable frames), the whole sample, or frames of a fixed size. */
export declare const CYCLE_SIZE_CHOICES: readonly ['auto', 'whole', '256', '512', '1024', '2048', '4096'];
/** Longest wavetable: 256 frames of 4096. Wavetables are whole multiples of 256 frames. */
export declare const WAVETABLE_MAX_FRAMES: number;
export declare const WAVETABLE_GRAIN = 256;
/** The params whose values the graph is compiled from, as a stable key (empty when none). */
export declare function structuralParamsKey(type: ModuleType, params: Record<string, number>): string;
export declare const MODULE_DEFS: Record<ModuleType, ModuleDef>;
/** Module types that are valid as channel effects (signal processors, not sources/sinks). */
export declare const EFFECT_MODULE_TYPES: ModuleType[];
/** Check whether a module type can be used as a channel effect. */
export declare function isEffectModule(type: ModuleType): boolean;
export declare function isStereoEffect(type: ModuleType): boolean;
/** Default param map for a freshly created module of the given type. */
export declare function defaultParams(type: ModuleType): Record<string, number>;
