import { type NodeRepr_t } from '@elemaudio/core';
import type { Id, ModularInstrument } from '../domain/types';
import type { SampleMeta } from './instruments';
type Node = NodeRepr_t | number;
export interface StereoOut {
    left: NodeRepr_t;
    right: NodeRepr_t;
}
/**
 * Custom ADSR envelope generator.
 *
 * Elementary's built-in `el.adsr()` uses `counter(gate)` to time the attack
 * phase.  `counter` only counts from a rising edge, so a constant gate (like
 * the preview keyboard's `el.const({value:1})`) never triggers it — the ADSR
 * stays stuck in attack forever and you never hear decay or sustain.
 *
 * This version uses `el.accum` instead, which counts every sample the gate
 * is high and resets to zero when it's low — no rising edge required.
 *
 * Time parameters are the time constant τ of the one-pole smoother:
 *   • ~63 % of target reached in τ seconds
 *   • ~95 % of target reached in 3τ seconds
 */
export declare function makeAdsr(attack: Node, decay: Node, sustain: Node, release: Node, gate: Node): NodeRepr_t;
/** Maximum delay/echo buffer: 16 ticks at 20 BPM, 4 rows/beat, 48 kHz. */
export declare const TICK_DELAY_SIZE = 576000;
/** Haas pseudo-side delay for the width effect: ~13 ms at 44.1 kHz. */
export declare const HAAS_DELAY_SAMPLES = 573;
/** Buffer for the Haas delay line. */
export declare const HAAS_DELAY_SIZE = 2048;
/**
 * Delay time in samples from a tick (row) count. Both ticks and rowHz can be
 * live refs, so slider and tempo changes retune the delay without a graph
 * recompile: samples = ticks * sampleRate / rowHz.
 */
export declare function tickTimeSamps(ticks: NodeRepr_t | number, rowHzNode: NodeRepr_t | number): NodeRepr_t;
/**
 * Compile a modular instrument's block graph into a stereo pair. Modules are
 * mono throughout — only the `output` module's L/R inlets create true stereo
 * separation. When the right channel is unconnected it falls back to the left
 * (mono duplicate), so existing mono patches keep working unchanged.
 *
 * Evaluation is a memoised depth-first walk from the `output` module: each
 * module's inlets are the sum of every incoming cord's source scaled by that
 * cord's `gain`. The track's control signals enter through the `note` (freq,
 * Hz) and `gate` source modules.
 *
 * Pure: no React, no Zustand, no AudioContext. v1 assumes an acyclic graph; a
 * back-edge (cycle) is broken by returning silence for the re-entered module.
 */
export declare function compileModular(inst: ModularInstrument, freq: Node, gate: Node, keyPrefix?: string, 
/** Sample metadata by sample id (`Module.sampleId`). */
sampleMeta?: Record<Id, SampleMeta>, 
/** Per-cell volume signal (0..1), available to the `volume` source module. */
vol?: Node, 
/** Per-effect-lane seq2 signals for named instrument inlets, keyed by
 *  inlet name. `eff` modules look up their signal by their `name` param. */
inletSignals?: Record<string, NodeRepr_t>, 
/** MIDI CC values (0-127 → raw 0-127).  Used by `midicc` source modules. */
midiCcValues?: Record<number, number>, 
/** Param ref registry — uses createRef so values update without recompile. */
paramRefs?: import('../audio/paramRefs').ParamRefRegistry, 
/** CC binding table — populated during graph build so MIDI CC changes
 *  can update the right refs without a recompile. */
ccBindings?: import('../audio/ccBindings').CcBindings, 
/** Live rows-per-second node (a 'transport:rowHz' ref) for tempo-synced
 *  delay/echo times. Defaults to 8 (120 BPM, 4 rows/beat). */
rowHzNode?: NodeRepr_t | number): StereoOut;
export {};
