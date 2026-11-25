import { AudioHost } from '../audio/host';
import { type Cue, type CueInfo, type CueStep, type CueTiming } from '../player/cues';
import type { SongFile } from '../persist/serialize';
import { type MusicalTime } from '../player/songClock';
import { type Id } from '../domain/types';
import type { GameMusic } from '../domain/gameMusic';
export type { CueStep, CueTiming };
export interface NoteTiming {
    /** Heard on the next row / beat / bar (default 'now'), plus `delayRows` more rows. */
    at?: 'now' | 'row' | 'beat' | 'bar';
    delayRows?: number;
    /** Held for this many rows (default 1). */
    rows?: number;
    velocity?: number;
}
export interface SongPlayerOptions {
    /** Share an existing context (e.g. the game engine's) instead of creating one. */
    audioContext?: AudioContext;
    /** Where the music goes; defaults to the context's destination. */
    destination?: AudioNode;
    /** Output gain, 0..1+. */
    volume?: number;
    /** For bars in `position()`; default 4. */
    beatsPerBar?: number;
}
/** Where the music is, as heard: the cue, its (fractional) row, beats and bars. */
export interface MusicPosition extends MusicalTime {
    cue: Cue;
    rowsPerSecond: number;
}
export interface RowEvent {
    /** The cue sounding at this row. */
    cue: Cue;
    /** Row within that cue. */
    row: number;
}
/**
 * Plays synthor songs without the editor: no React, no stores, no storage.
 * Load a `.synthor` file, start() it from a user gesture, then play cues
 * (sections / patterns) and steer them live — track layers, instrument
 * levels, tempo and stinger notes — all without recompiling the graph.
 */
export declare class SongPlayer {
    readonly host: AudioHost;
    private doc;
    private samples;
    private prepared;
    private dataCache;
    private setTxSeq;
    private txSeqNode;
    private session;
    private uploadRev;
    private uploads;
    private playing;
    /** Bumped by every play/stop, so a play still warming up can tell it was superseded. */
    private request;
    /** The sounding cue; its data starts at its row `offset` when it carries on mid-way. */
    private current;
    private transition;
    /** The sounding cue's timeline: rows into the song and its row when it started, its wraps since. */
    private played;
    /** Where each cue was left (its row, and rows into the song), for `resume`. */
    private left;
    /** A switch asked for just before the loop wraps, planned once it has. */
    private deferred;
    /** Steps of `queue()` still to come; the head is asked for once the step before sounds. */
    private steps;
    private noteTimers;
    private lastRow;
    private bpm;
    private linesPerBeat;
    private beatsPerBar;
    private clock;
    /** The cue (and its length) the latest row event belongs to. */
    private clockCue;
    private volume;
    private muted;
    private levels;
    /** Track # levels (0..1) for fades; 1 when absent */
    private trackLevels;
    private fades;
    private fadeTimer;
    private rowListeners;
    private cueListeners;
    constructor(options?: SongPlayerOptions);
    /** Load a `.synthor` zip, `.synthor.json` text bytes, or an already parsed song, at the song's
     *  tempo. Stops playback. */
    load(source: ArrayBuffer | Uint8Array | SongFile): Promise<void>;
    /** Start audio. Call from a user gesture (autoplay policy); safe to call again. */
    start(): Promise<void>;
    /** Play `cue` from its top (default: the whole song, or the open pattern without sections). */
    play(cue?: Cue): Promise<void>;
    private restart;
    /**
     * Move to `cue`; while stopped this is play(cue). See CueTiming. A cue asked
     * for during a hand-over replaces the one not yet sounding, or follows the
     * one taking over. Drops what is left of a `queue()`.
     */
    cue(cue: Cue, timing?: CueTiming): Promise<void>;
    /**
     * Play cues one after another: each step is asked for once the step before
     * starts sounding, so its timing counts from that cue's top — e.g. a fill
     * then the stage back: `[{ cue: 'fill', timing: { every: 16 } }, { cue: 'stage', timing: 'end' }]`.
     */
    queue(steps: CueStep[]): Promise<void>;
    private switchTo;
    /** A hand-over's cue sounds: it is the current cue from here. */
    private settleOn;
    private dropDeferred;
    /** Stop the sequence; release tails ring out. */
    stop(): void;
    /** Mute / unmute a Track # (1-based, the same position in every pattern) — for layering. */
    setTrackMuted(trackNumber: number, muted: boolean): void;
    /** Replace the muted Track #s. */
    setMutedTracks(trackNumbers: Iterable<number>): void;
    /**
     * A Track #'s level (0..1, in every pattern), faded over `fadeSeconds` — to
     * build a part up or down by layers. A muted track stays silent.
     */
    setTrackLevel(trackNumber: number, level: number, fadeSeconds?: number): void;
    /** A Track #'s level now (mid-fade too). */
    trackLevel(trackNumber: number): number;
    private stepFades;
    /** Scale an instrument (by name or id) against its own gain: 0 silences it, 1 is as mixed. */
    setInstrumentLevel(instrument: string, level: number): void;
    setVolume(volume: number): void;
    /** Change the tempo live (e.g. speeding up with the game); the next load resets it to the song's. */
    setTempo(bpm: number, linesPerBeat?: number): void;
    /**
     * Where the music is as heard at `perfNow` (a `performance.now()` time) — read it every
     * frame for animations in time with the music. Null while stopped or before the first row.
     */
    position(perfNow?: number): MusicPosition | null;
    /** Seconds, as heard, until the next row / beat / bar starts — to land an animation on it. */
    timeUntil(unit: 'row' | 'beat' | 'bar', perfNow?: number): number | null;
    /** Play a note on a song instrument over the music (stingers). The instrument needs a track in the song. */
    noteOn(instrument: string, note: number, velocity?: number): void;
    /**
     * A stinger note in time with the music: heard on the next row / beat / bar
     * (sent ahead by the output latency) and released after `rows`. Played at
     * once while stopped. Pending notes are dropped by stop().
     */
    playNote(instrument: string, note: number, timing?: NoteTiming): void;
    noteOff(instrument: string, note: number): void;
    /** Every voice silent, the sequence stopped. */
    panic(): void;
    /** Called with the cue and its row as playback advances. Returns an unsubscribe. */
    onRow(listener: (e: RowEvent) => void): () => void;
    /** Called when a cue starts sounding (after its hand-over, not when requested). */
    onCue(listener: (cue: Cue) => void): () => void;
    get cues(): CueInfo[];
    /** The loaded song's game settings, if it has them (for a `GameConductor`) */
    get game(): GameMusic | null;
    get instruments(): {
        id: Id;
        name: string;
    }[];
    get isPlaying(): boolean;
    get currentCue(): Cue | null;
    private get rowsPerSec();
    private later;
    private requireDoc;
    private findInstrument;
    private dataFor;
    /** Decode the song's samples and render its graph — once per loaded song, after start(). */
    private prepare;
    private compile;
    /** The tracks' gains: mutes and levels (`only`: just these Track #s). */
    private applyMutes;
    /** Upload data and send play/update — in order, and dropped once a newer session started. */
    private upload;
    private attachTxSeq;
    /** Advance a running hand-over and report the row in cue terms. */
    private onNodeRow;
    /** A switch held back at the loop's end goes ahead once the loop has wrapped. */
    private runDeferred;
    private emitRow;
    private emitCue;
}
