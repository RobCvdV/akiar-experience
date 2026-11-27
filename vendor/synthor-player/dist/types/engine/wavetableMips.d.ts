import type { Doc, Id } from '../domain/types';
import type { SampleMeta } from './instruments';
/**
 * Band-limited tables for the native `wtosc` node, built from a sample's cycles
 * (the wave module). Each frame (one cycle) is analysed with an FFT and
 * resynthesized once per octave, so the node can play whichever levels stay
 * below Nyquist at the current pitch. Level L holds up to 512 >> L harmonics,
 * except level 0, which shares level 1's 256 (its extra octave only exists
 * below ~43 Hz). A table holds 4 samples per cycle of its top harmonic (at
 * least 64), and levels with the same content — a short cycle has few
 * harmonics to begin with — share one table.
 *
 * Layout — the contract with `src/native/WtOsc.h` `viewOf(data, length)`:
 * `[2 (version), frames, MIP_LEVELS, size per level…, offset per level…,
 * frame stride]`, then the frames, each `stride` floats holding its tables at
 * the offsets; every table ends in a guard sample (a copy of its first).
 */
export declare const MIP_LEVELS = 10;
export interface MipLayout {
    /** Harmonics kept per level. */
    harmonics: number[];
    /** Samples per level's table (without the guard). */
    sizes: number[];
    /** Offset of each level's table within a frame; shared tables share one. */
    offsets: number[];
    /** Floats per frame. */
    stride: number;
}
/** Which tables a cycle of `size` frames gets, and where they sit in a frame. */
export declare function mipLayout(size: number): MipLayout;
/** The VFS key of one channel's tables for a sample cut into `size`-frame cycles. */
export declare function wavetableMipKey(hash: string, size: number, channel: number): string;
/** Floats in the table set of `frames` frames of `size`-frame cycles (the upload's length). */
export declare function wavetableMipLength(frames: number, size: number): number;
/**
 * Tables for one channel, cut into cycles of `size` frames (fractional sizes
 * are fine: a resampled sample's cycles don't land on whole frames). DC is
 * kept, so the levels sound like the raw cycle, minus what would alias.
 */
export declare function buildWavetableMips(channel: Float32Array, size: number): Float32Array;
/** One sample cut at one cycle size: the table sets (one per channel) to upload. */
export interface WavetableMipRequest {
    hash: string;
    size: number;
    /** Keys by channel. */
    keys: string[];
}
/** The tables the doc's wave modules can play: one request per (sample, cycle size). */
export declare function wavetableMipRequests(doc: Doc, sampleMeta: Record<Id, SampleMeta>): WavetableMipRequest[];
