import { type NodeRepr_t } from '@elemaudio/core';
/**
 * @param ratePerSample normalized advance per sample (1/frames = natural
 *  pitch); may be signal-rate for live pitch changes.
 * @param frames file length in frames — sets the running window.
 * @param minRate slowest rate the window must cover (frames/minRate + 128
 *  samples), so the sample always plays to completion.
 */
export declare function makeSampleOneShot(key: string, hash: string, channels: number, gate: NodeRepr_t | number, ratePerSample: NodeRepr_t | number, frames: number, minRate: number): NodeRepr_t[];
/** Free-running loop: a phasor sweeping the normalized index at the rate
 *  that makes one full cycle equal the file's duration at `rate` speed. */
export declare function makeSampleLoop(key: string, hash: string, channels: number, rate: NodeRepr_t | number, frames: number, sampleRate: number): NodeRepr_t[];
