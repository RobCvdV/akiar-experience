/**
 * Mixer engine — channel-level effect processing and routing.
 *
 * Pure functions: no React, no Zustand, no AudioContext. Takes Elementary
 * nodes in, returns Elementary nodes out. Reuses effect compilation patterns
 * from `engine/modular.ts` but adapted for stereo channel processing.
 */
import { type NodeRepr_t } from '@elemaudio/core';
import type { ChannelEffect, Id } from '../domain/types';
import { type StereoOut } from './modular';
import type { ParamRefRegistry } from '../audio/paramRefs';
import type { SampleMeta } from './instruments';
/** Apply an ordered list of channel effects to a stereo signal pair.
 *  Each effect's params use createRef so slider changes are instant. */
export declare function compileChannelEffects(effects: ChannelEffect[], input: StereoOut, channelId: string, paramRefs?: ParamRefRegistry, 
/** Live rows-per-second node for tempo-synced delay/echo times. */
rowHzNode?: NodeRepr_t | number, 
/** Sample metadata for conv (IR) effects, by sample id. */
sampleMeta?: Record<Id, SampleMeta>): StereoOut;
/** Apply stereo pan/balance using a param ref so pan changes don't recompile the graph.
 *  panRef should be a ref or const node in range -1..+1 (0 = center).
 *  Constant-power law: angle = (pan + 1) * π/4, left = cos(angle) * √2, right = sin(angle) * √2. */
export declare function applyPan(input: StereoOut, panNode: NodeRepr_t): StereoOut;
/** Create a param ref for channel or instrument pan. */
export declare function panRef(key: string, value: number, paramRefs?: ParamRefRegistry): NodeRepr_t;
/** Apply channel volume (0..2, 1 = unity) and pan to a stereo pair.
 *  Both volume and pan use param refs so fader moves are instant. */
export declare function applyChannelMix(input: StereoOut, volume: number, pan: number, channelId: string, paramRefs?: ParamRefRegistry): StereoOut;
