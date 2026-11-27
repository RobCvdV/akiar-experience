import { type WavetableMipRequest } from '../engine/wavetableMips';
/** The slice of `AudioHost` this needs (a fake in tests). */
export interface WavetableVfsHost {
    listVfs(): Promise<Set<string>>;
    updateVfs(vfs: Record<string, Float32Array>): Promise<void>;
}
export interface WavetableVfs {
    /** Table keys in the VFS for the wanted requests — pass to the compile. */
    keys(): ReadonlySet<string>;
    /** Bumps whenever `keys()` changes or a table already reported had to be
     *  built again — a graph compiled before then may be playing silence. */
    revision(): number;
    /** The decoded audio to build tables from (see `decodeSamplesToVfs`). */
    setPcm(pcm: ReadonlyMap<string, Float32Array[]>): void;
    /** The tables the doc's wave modules can use; builds what's missing in the background. */
    want(requests: WavetableMipRequest[]): void;
    /** The VFS may have lost tables (a prune): check it again. */
    invalidate(): void;
    /** Wants `requests` and resolves once their tables are in (or can't be built). */
    ensure(requests: WavetableMipRequest[]): Promise<void>;
}
/**
 * Keeps the band-limited wave tables the doc needs in the VFS. It reconciles
 * against what the VFS actually holds, so tables a prune dropped are built
 * again. `onChange` fires when `keys()` changes — recompile then.
 */
export declare function createWavetableVfs(host: WavetableVfsHost, onChange: () => void): WavetableVfs;
