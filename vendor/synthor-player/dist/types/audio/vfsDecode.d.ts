import type { SampleEntity } from '../domain/types';
import type { DecodedSize } from '../engine/compile';
import type { AudioHost } from './host';
/**
 * Decode sample files into Elementary's VFS so they're playable. `read`
 * supplies each sample's encoded bytes by content hash — from storage in the
 * app, from a song bundle in the headless player.
 *
 * Returns the hashes that were successfully loaded into VFS, plus each
 * sample's L1 sum (Σ|channel 0|) — the compiler uses it to normalize
 * convolution IRs so a conv effect can never amplify beyond the dry peak —
 * and each sample's decoded length, which can differ from the entity's.
 * Sample entities whose stored files are missing or unparseable are NOT
 * in this set — the caller should prune them from the doc.
 */
export declare function decodeSamplesToVfs(host: AudioHost, samples: SampleEntity[], read: (hash: string) => Promise<ArrayBuffer | null | undefined>): Promise<{
    loaded: Set<string>;
    l1Sums: Record<string, number>;
    decodedSizes: Record<string, DecodedSize>;
}>;
