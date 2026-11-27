import WebRenderer from '@elemaudio/web-renderer';
import type { StereoOut } from '../engine/modular';
import { ParamRefRegistry } from './paramRefs';
import { CcBindings } from './ccBindings';
import { VoicePool } from '../engine/voicePool';
import { LiveNotes, type LiveNoteContext } from './liveNotes';
import type { DrumKitInstrument } from '../domain/types';
/** How long a freshly created AudioContext needs before its output stream
 *  can be trusted to pass transients cleanly. Measured: a click followed by
 *  ~1s of idle plays perfectly from row 0; anything less eats the first
 *  few rows on the first play. */
export declare const OUTPUT_WARMUP_MS = 1500;
export interface AudioHostOptions {
    /** Song + routing state live notes resolve against. */
    liveContext: () => LiveNoteContext;
    /** Share an existing context (e.g. a game engine's) instead of creating one on start(). */
    audioContext?: AudioContext;
    /** Where the output goes; defaults to the context's destination. */
    destination?: AudioNode;
}
/**
 * Owns the AudioContext + Elementary WebRenderer and pushes compiled graphs to
 * the AudioWorklet. Stateless beyond the audio plumbing: it just renders
 * whatever node it's handed. The store/engine decide *what* to play.
 */
export declare class AudioHost {
    private ctx;
    /** The Elementary renderer — public so useEngine can createRef the txSeq
     *  node and subscribe to its events. */
    core: WebRenderer | null;
    private analysers;
    private ready;
    private starting;
    private ctxStartTime;
    private renderBusy;
    private pendingGraph;
    /** Resolves when the current render queue fully drains — awaited before the
     *  txSeq play command so rows never advance against a dead graph. */
    private settlePromise;
    private settleResolve;
    /** Registry of createRef-backed param nodes for zero-recompile value updates. */
    readonly paramRefs: ParamRefRegistry;
    /** CC# → ref-key mapping so MIDI knob turns update the right refs directly. */
    readonly ccBindings: CcBindings;
    /** Called when start() creates a fresh AudioContext (not a resume).
     *  useEngine wires this to schedule a compile so voice-pool refs exist
     *  before the first MIDI note-on. */
    onReady: (() => void) | null;
    /** Called when a VoicePool is first created — triggers recompile so
     *  voice slots appear in the graph for the new instrument. */
    onVoicePoolCreated: (() => void) | null;
    /** Set by App.tsx before changing doc.patternId during section/song playback.
     *  Tells useEngine to skip the next doc-store-triggered recompile — the
     *  pattern change is purely for UI (which pattern the tracker shows) and the
     *  audio graph already spans the full arrangement. */
    skipNextRecompile: boolean;
    /** Decoded AudioBuffers for sample preview, keyed by content hash. */
    private samplePreviewBuffers;
    /** Active preview sources, so a panic/unmount can cut them short. */
    private previewSources;
    private heldPreviews;
    /** Fixed voice pools per instrument (lazily created). */
    readonly voicePools: Map<string, VoicePool>;
    /** Router for keyboard / MIDI / pip notes. */
    readonly live: LiveNotes;
    private readonly externalCtx;
    private readonly destination;
    constructor(options: AudioHostOptions);
    /** Prop setter of the keyed txSeq ref — set by useEngine once the host is ready. */
    txSeqSetter: ((props: Record<string, unknown>) => Promise<unknown>) | null;
    /** Get (or create) a voice pool for an instrument.
     *  The pool updates per-voice refs directly — no graph recompile needed.
     *  Pass `kit` for drumkit instruments to enable per-slot note routing.
     *  Safe to call from any path (MIDI, keyboard, engine) — `setKit` is a
     *  no-op on already-configured pools, so callers can pass kit late without
     *  worrying about creation order. */
    voicePool(instId: string, maxVoices?: number, kit?: DrumKitInstrument): VoicePool;
    /** Kill all sounding voices across every instrument — both VoicePool-managed
     *  and the all-instrument live voice slots from compileLiveVoices. */
    panic(): void;
    /** Send a live-note command to the txSeq node (no-op before the first render). */
    sendTxSeqLive(cmd: Record<string, unknown>): void;
    /** Set txSeq props without a render; dropped while the node isn't mounted. */
    setTxSeqProps(props: Record<string, unknown>): void;
    /**
     * One-shot sample preview straight through Web Audio — no Elementary graph.
     * Decodes on first use and caches the AudioBuffer per hash. `playbackRate`
     * 1 = natural rate; pitch with samplePlaybackRate(note).
     */
    playSamplePreview(hash: string, bytes: ArrayBuffer, playbackRate?: number, loopKey?: string): Promise<void>;
    /** `playSamplePreview` for in-memory PCM, e.g. a sample being tuned in the editor. */
    playPcmNote(data: Float32Array<ArrayBuffer>[], sampleRate: number, playbackRate?: number, loopKey?: string): Promise<void>;
    /** Swaps the audio of every held loop (keeping its pitch), with a short crossfade. */
    replaceHeldPreviews(data: Float32Array<ArrayBuffer>[], sampleRate: number): void;
    private playPreviewBuffer;
    /** Releases the looping preview started with `loopKey`. */
    stopSamplePreview(loopKey: string): void;
    /** Cut all in-flight sample previews. */
    stopSamplePreviews(): void;
    /**
     * Play raw in-memory PCM via plain Web Audio — no Elementary, no VFS, no
     * decode (the editor already holds decoded channels). Builds an AudioBuffer
     * in the host context; tracked in previewSources so stopSamplePreviews() cuts
     * it. `offsetSeconds` starts playback mid-buffer (clamped to its duration);
     * `loop` (seconds) repeats that span until stopped.
     */
    playPcmPreview(data: Float32Array<ArrayBuffer> | Float32Array<ArrayBuffer>[], sampleRate: number, offsetSeconds?: number, loop?: {
        start: number;
        end: number;
    }): Promise<void>;
    /**
     * Swaps the audio of the playing PCM preview, carrying on from the same position with a
     * short crossfade, so an edit being tuned is heard while it plays. No-op when none plays.
     */
    replacePcmPreview(data: Float32Array<ArrayBuffer>[], sampleRate: number): void;
    private pcmPreview;
    private pcmBuffer;
    private startPcmPreview;
    /** Precise AudioContext time captured at the moment the txSeq clock
     *  actually started for the current playback session. Set by useEngine. */
    playStartTime: number;
    /** Pattern row at which the current playback session started. */
    playStartRow: number;
    get currentTime(): number;
    /** The audio time reaching the speakers at `perfNow` (a `performance.now()` time) —
     *  what visuals in time with the music should follow, not the render clock. */
    outputTime(perfNow?: number): number;
    /** Milliseconds the output stream has been flowing — fresh contexts need
     *  a settling window before the first sound lands cleanly. */
    get outputAgeMs(): number;
    get isReady(): boolean;
    /** RMS of the current output block, 0..~1. Useful as a master meter. */
    getLevels(): [number, number];
    /** Raw time-domain waveform from the analyser (for oscilloscope display). */
    getWaveforms(): [Float32Array, Float32Array];
    /** Must be called from a user gesture (browser autoplay policy).
     *  Safe to call multiple times — subsequent calls return the existing promise. */
    start(): Promise<void>;
    /** Render a stereo pair to the output.  Drops frames when busy to avoid
     *  overwhelming Elementary with concurrent render() calls (which crashes
     *  the WASM worklet with Aborted()). Returns a promise that resolves once
     *  this graph — and anything queued behind it — has landed. */
    render(stereo: StereoOut): Promise<void>;
    /**
     * Update Elementary's Virtual File System with new / changed sample data.
     * Keys are content hashes; values are mono Float32Array or stereo [L, R].
     */
    updateVfs(vfs: Record<string, Float32Array | Float32Array[]>): Promise<void>;
    /** Names of the shared resources in the VFS right now (pruning drops some). */
    listVfs(): Promise<Set<string>>;
    /** Drop shared resources no node references (superseded txSeq uploads). */
    pruneVfs(): Promise<void>;
}
