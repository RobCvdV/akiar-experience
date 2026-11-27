import { type NodeRepr_t } from '@elemaudio/core';
import type { DrumKitSlot, Id, Instrument } from '../domain/types';
import { type StereoOut } from './modular';
/**
 * An instrument is a node factory: given the control signals a track drives
 * (frequency + gate), it returns a stereo audio pair. Modular synths can route
 * different signals to the output module's L/R inlets for true stereo.
 */
/** Sample metadata needed by the compile pipeline. */
export interface SampleMeta {
    /** VFS path; empty while the sample isn't loaded, which callers treat as missing. */
    hash: string;
    channels: number;
    /** Sample rate in Hz (e.g. 44100). */
    sampleRate: number;
    /** Total frames per channel. */
    frames: number;
    /** Frames per wavetable cycle, when known. */
    cycleLength?: number;
    /** Sum of |channel 0| — used to L1-normalize conv IRs (see mixer.ts). */
    l1?: number;
    /** VFS keys of the band-limited wave tables uploaded so far (`wavetableMipKey`),
     *  shared by every sample; the wave module plays raw cycles without them. */
    mipKeys?: ReadonlySet<string>;
}
export declare function renderInstrument(inst: Instrument, freq: NodeRepr_t | number, gate: NodeRepr_t | number, voiceKey: string, 
/** Sample metadata by sample id. */
sampleMeta?: Record<Id, SampleMeta>, 
/** Raw MIDI note (0-127) for drumkit slot mapping. */
note?: NodeRepr_t | number, 
/** sampleId → VFS hash lookup for drumkit slot resolution. */
sampleHashById?: Record<string, string>, 
/** Per-cell volume signal (0..1). Defaults to 1 (no attenuation). */
volume?: NodeRepr_t | number, 
/** Per-effect-lane seq2 signals for named instrument inlets, keyed by inlet name. */
inletSignals?: Record<string, NodeRepr_t>, 
/** MIDI CC values (0-127 → raw 0-127).  Used by `midicc` source modules. */
midiCcValues?: Record<number, number>, 
/** Param ref registry for zero-recompile value updates. */
paramRefs?: import('../audio/paramRefs').ParamRefRegistry, 
/** CC binding table — populated during compile so MIDI CC changes update refs. */
ccBindings?: import('../audio/ccBindings').CcBindings, 
/** Live rows-per-second node for tempo-synced delay/echo times. */
rowHzNode?: NodeRepr_t | number): StereoOut;
/**
 * Render a single drumkit slot as a stereo pair.
 *
 * For sample-based slots the sample is played back with pitch tracking via a
 * table + phasor, so the per-row frequency signal from the slot sequencer
 * controls pitch. For instrument-based slots the assigned instrument is
 * rendered with the slot's gate and frequency signals.
 */
export declare function renderDrumKitSlot(slot: DrumKitSlot, instruments: Record<Id, Instrument>, slotGate: NodeRepr_t | number, slotFreq: NodeRepr_t | number, voiceKey: string, sampleMeta: Record<Id, SampleMeta>, sampleHashById: Record<Id, string>, midiCcValues?: Record<number, number>, paramRefs?: import('../audio/paramRefs').ParamRefRegistry, ccBindings?: import('../audio/ccBindings').CcBindings, 
/** Named inlet signals from effect lanes, propagated to sub-instruments. */
inletSignals?: Record<string, NodeRepr_t>, 
/** Drumkit instrument id — when provided, slot volume/pan use createRef. */
kitInstId?: string, 
/** Instrument-level pan (-1..+1). Combined with slot pan via addition. */
instPan?: NodeRepr_t | number, 
/** Live rows-per-second node for tempo-synced delay/echo times. */
rowHzNode?: NodeRepr_t | number): StereoOut;
