/**
 * Jot-style Feedback Delay Network reverb — a port of elemaudio/srvb
 * (github.com/elemaudio/srvb, dsp/srvb.js), tuned tighter than the original:
 * shorter diffusion stages, a shorter pre-spread FDN (srvb's d4 with 8 ms
 * line base instead of 17) and shorter main-FDN lines (12 ms base). Eight
 * delay lines mixed through an orthogonal Hadamard matrix, one-pole damping
 * inside the loop, three diffusion stages and ±2.5 ms chorus on every read
 * position.
 *
 * Buffer sizes are compile-time constants computed for 44.1 kHz, matching the
 * other static delay buffers in the codebase; the resulting timing error at
 * other host rates is a few percent and inaudible for reverb.
 */
import { type NodeRepr_t } from '@elemaudio/core';
import type { StereoOut } from './modular';
type Node = NodeRepr_t | number;
/**
 * Build the FDN reverb stereo pair (wet/dry mixed via `mix`).
 * `scope` must be unique per effect instance — it keys every delay and tap.
 *
 * Param mapping (keeps the old reverb def's keys compatible):
 *   roomSize    → delay-time multiplier 1 + 3·size
 *   feedback    → decay of the FDN
 *   damping     → one-pole pole 0.25 + damping·0.6 (≈19 kHz..1.2 kHz per
 *                 traversal; srvb's fixed 0.105 is ~60 kHz — essentially off)
 *   stereoWidth → downmix width: 0 = mono wet, 1 = natural stereo (the FDN
 *                 lines decorrelate, so this works even for a mono input)
 *   mix         → dry/wet select
 */
export declare function makeFdnReverb(scope: string, roomSize: Node, feedback: Node, damping: Node, stereoWidth: Node, mix: Node, xl: Node, xr: Node): StereoOut;
export {};
