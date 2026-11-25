import { type NodeRepr_t } from '@elemaudio/core';
import type { Doc, Id, SampleEntity, Instrument } from '../domain/types';
import { type SampleMeta } from './instruments';
import type { StereoOut } from './modular';
import type { ArrangementItem } from './arrangement';
/** The length of a sample's audio as decoded into the VFS. */
export interface DecodedSize {
    frames: number;
    sampleRate: number;
}
/**
 * Sample metadata by sample id. A sample not yet in the VFS gets an empty hash (treated as missing).
 * `decoded` wins over the entity's frames and rate: those come from the machine that imported the
 * sample, and decoding resamples to this machine's rate.
 */
export declare function buildSampleMeta(samples: Record<Id, SampleEntity>, vfsLoaded?: Set<string>, l1Sums?: Record<string, number>, decoded?: Record<string, DecodedSize>): Record<Id, SampleMeta>;
/** Get the default gain for an instrument, regardless of kind. */
export declare function getInstGain(inst: Instrument): number;
/** Everything the compiler needs from the transport, as plain data. */
export interface RenderContext {
    rowHz: number;
    playing: number;
    startRow: number;
    playEpoch: number;
    vfsLoadedHashes?: Set<string>;
    /** L1 sums (Σ|ch0|) per sample hash, for conv IR normalization. */
    l1Sums?: Record<string, number>;
    /** Decoded length per sample hash (see `buildSampleMeta`). */
    decodedSizes?: Record<string, DecodedSize>;
    midiCcValues?: Record<number, number>;
    paramRefs?: import('../audio/paramRefs').ParamRefRegistry;
    ccBindings?: import('../audio/ccBindings').CcBindings;
    arrangement?: ArrangementItem[];
    /** The keyed txSeq ref node (created once by the host); falls back to a
     *  fresh node for pure compile tests. */
    txSeq?: NodeRepr_t;
    /** Instruments that get live (free play) voices. Undefined = all. */
    liveVoiceInstIds?: Id[];
    /** Instrument guaranteed a tracker slot (live notes via txSeq). */
    ensureSlotInstId?: Id | null;
}
/**
 * Compile the full document into a stereo pair.  No React, no Zustand, no
 * AudioContext — pure, unit-testable, and reusable for offline bounce.
 */
export declare function compileGraph(doc: Doc, ctx: RenderContext): StereoOut;
