/**
 * Domain model — pure, serializable data. No React, no Zustand, no audio.
 *
 * Everything is normalized into entity maps keyed by id so that higher-level
 * structures (sections, songs) can reference patterns/tracks by id and reuse
 * them without copying. The vertical slice only exercises instruments +
 * patterns + tracks; sections/songs and vol/eff lanes slot in later without a
 * rewrite.
 */
import type { GameMusic } from './gameMusic';
export type Id = string;
/** A single step in a track lane. */
export interface Cell {
    /** MIDI note number (60 = C4), or null for an empty step. */
    note: number | null;
    /** Per-cell volume modifier, 0..1. Null means default (full volume). */
    volume: number | null;
    /** When true, triggers note-off (release) on this row regardless of note.
     *  @deprecated Replaced by `hold`. Kept for backward compat with older save files. */
    noteOff: boolean;
    /** When true, continues holding the previous note (displayed as '|').
     *  Mutually exclusive with `note`. */
    hold?: boolean;
    /**
     * Per-effect-lane values, keyed by lane definition id.
     * 0..1 per cell, or null when no value is set on this step.
     */
    effectLanes: Record<Id, number | null>;
}
/** A user-defined effect lane on a track.
 *  `type` is either a built-in lane type (e.g. 'vibratoDepth', 'panning')
 *  or the name of a named `eff` module inlet on the assigned instrument. */
export interface EffectLaneDef {
    id: Id;
    type: string;
}
/** Default max values for per-instrument effect lane ranges. */
export declare const DEFAULT_EFFECT_SETTINGS: {
    readonly vibratoRate: 100;
    readonly vibratoDepth: 0.5;
    readonly tremoloRate: 100;
    readonly tremoloDepth: 1;
    readonly portamento: 4;
};
export type EffectSettingKey = keyof typeof DEFAULT_EFFECT_SETTINGS;
/** Per-instrument effect range overrides. Missing keys fall back to defaults. */
export type EffectSettings = Partial<Record<string, number>>;
/**
 * A modular synth instrument: a graph of `modules` wired by `connections`.
 * Compiles to an Elementary node; the tracker only needs to know it's an
 * instrument. Kept fully serializable (plain data + numbers).
 */
export type ModuleType = 'note' | 'gate' | 'volume' | 'eff' | 'midicc' | 'osc' | 'dxop' | 'filter' | 'adsr' | 'gain' | 'mix' | 'lfo' | 'tanh' | 'clip' | 'fold' | 'crush' | 'delay' | 'echo' | 'reverb' | 'sample' | 'noise' | 'wave' | 'comp' | 'conv' | 'width' | 'delayS' | 'echoS' | 'output';
/** An address into a module's inlet or outlet, by name. */
export interface Port {
    moduleId: Id;
    /** Inlet/outlet name as declared in the module registry (`moduleDefs`). */
    port: string;
}
/** One block in a modular instrument. `params` keys come from the registry. */
export interface Module {
    id: Id;
    type: ModuleType;
    params: Record<string, number>;
    /** React Flow canvas position; persisted so layouts survive save/load. */
    pos: {
        x: number;
        y: number;
    };
    /** User-assigned name for `eff` modules (the modulation inlet name).
     *  Undefined for other module types. */
    name?: string;
    /** The sample a `sample` / `wave` / `conv` module plays. */
    sampleId?: Id;
}
/** A patch cord from one module's outlet to another's inlet. */
export interface Connection {
    id: Id;
    from: Port;
    to: Port;
    /** Per-cord "impact" knob: the source is scaled by this before summing. */
    gain: number;
}
/** Library attributes an instrument or sample keeps inside a song, so saving it back to the library keeps them. */
export interface LibraryInfo {
    /** The library item this instrument came from or was saved as. */
    id?: string;
    category: string;
    tags: string[];
}
export interface ModularInstrument {
    id: Id;
    kind: 'modular';
    name: string;
    modules: Record<Id, Module>;
    connections: Record<Id, Connection>;
    /** The module whose inlet feeds the voice output (always type 'output'). */
    outputId: Id;
    /** Per-instrument effect range overrides. Missing on older save files. */
    effectSettings?: EffectSettings;
    /** Which mix channel this instrument routes to. Default "master". */
    channelId: Id;
    /** Stereo pan/balance, -1 (left) .. +1 (right), 0 = center. */
    pan: number;
    /** MIDI channel (1-16) for external MIDI routing.  undefined = follow cursor. */
    midiChannel?: number;
    /** Live (free play) polyphony. Missing = DEFAULT_LIVE_VOICES. */
    voices?: number;
    library?: LibraryInfo;
}
/** A managed sample asset — metadata only. Binary PCM data lives in storage. */
export interface SampleEntity {
    id: Id;
    /** User-facing name. */
    name: string;
    /** Content-addressed hash used as the storage filename and VFS key. */
    hash: string;
    /** Original filename for display. */
    originalName: string;
    /** Sample rate in Hz (e.g. 44100). */
    sampleRate: number;
    /** 1 = mono, 2 = stereo. */
    channels: number;
    /** Total frames per channel. */
    frames: number;
    /** Frames per cycle when the sample is a single-cycle waveform or a wavetable; may be fractional after resampling. */
    cycleLength?: number;
    library?: LibraryInfo;
}
/** A drum kit slot: an assignment at a specific MIDI note.
 *  The slot covers its own note and all higher notes up to the next slot's
 *  note (inheritance). Slots can reference either a sample or an instrument. */
export interface DrumKitSlot {
    id: Id;
    /** MIDI note where this assignment starts. */
    note: number;
    /** Sample to play (mutually exclusive with instrumentId). */
    sampleId: Id | null;
    /** Instrument to play (mutually exclusive with sampleId). */
    instrumentId: Id | null;
    /** MIDI note that plays when the first key in this slot's range is
     *  triggered. Higher keys play proportionally higher. */
    baseNote: number;
    /** Per-slot volume, 0..1. Multiplied with synth outlet. */
    volume: number;
    /** Pan, -1 (left) .. +1 (right). */
    pan: number;
}
/** A drum kit instrument: key-mapped with inheritance-based ranges.
 *  Slots are sorted by note; unassigned notes inherit from the nearest
 *  lower assigned note. */
export interface DrumKitInstrument {
    id: Id;
    kind: 'drumkit';
    name: string;
    slots: DrumKitSlot[];
    /** Lowest note in the editable key range (default 36 = C-2). */
    keyLo: number;
    /** Highest note in the editable key range (default 60 = C-4). */
    keyHi: number;
    params: {
        /** Master output gain, 0..1. */
        gain: number;
    };
    /** Which mix channel this instrument routes to. Default "master". */
    channelId: Id;
    /** Stereo pan/balance, -1 (left) .. +1 (right), 0 = center. */
    pan: number;
    /** MIDI channel (1-16) for external MIDI routing.  Defaults to 10 (drum channel). */
    midiChannel?: number;
    library?: LibraryInfo;
}
export declare const DEFAULT_LIVE_VOICES = 4;
export declare const MAX_LIVE_VOICES = 16;
/** Live voice count for free play, clamped to 1..MAX_LIVE_VOICES. */
export declare function liveVoiceCount(inst: ModularInstrument): number;
/** Find the slot that covers a given MIDI note (highest slot.note <= note).
 *  Returns null when no slot is at or below the note, meaning silence. */
export declare function getSlotForNote(kit: DrumKitInstrument, note: number): DrumKitSlot | null;
export type Instrument = ModularInstrument | DrumKitInstrument;
export interface Track {
    id: Id;
    instrumentId: Id;
    /** One cell per pattern row. Length is kept in sync with the owning pattern. */
    cells: Cell[];
    /** Effect lane definitions for this track. Added/removed by the user. */
    effectLanes: EffectLaneDef[];
}
export interface Pattern {
    id: Id;
    name: string;
    /** The pattern owns the length of all its tracks. */
    length: number;
    trackIds: Id[];
}
/** A section is a named sequence of pattern references. */
export interface Section {
    id: Id;
    name: string;
    patternIds: Id[];
}
/** Effect instance on a mix channel — reuses Module types from the modular system. */
export interface ChannelEffect {
    id: Id;
    type: ModuleType;
    params: Record<string, number>;
    /** When set, this effect only processes one stereo side; the other passes through.
     *  Used for mono effects (filter, gain, etc.) so L and R can be tuned independently.
     *  Stereo effects (reverb, delay, echo) and unset = process both channels. */
    side?: 'L' | 'R';
    /** The impulse-response sample of a `conv` effect. */
    sampleId?: Id;
}
/** A mix channel (sub or master). Always stereo. */
export interface MixChannel {
    id: Id;
    name: string;
    kind: 'sub' | 'master';
    /** Volume fader, 0..2 (1.0 = unity). */
    volume: number;
    /** Stereo balance, -1 (full left) .. +1 (full right), 0 = center. */
    pan: number;
    /** Mute this channel's output. */
    mute: boolean;
    /** Solo this channel. */
    solo: boolean;
    /** Ordered insert effects, applied left-to-right on the stereo signal. */
    effects: ChannelEffect[];
}
/** The master channel id — always present, never deletable. */
export declare const MASTER_CHANNEL_ID = "master";
export interface Entities {
    instruments: Record<Id, Instrument>;
    tracks: Record<Id, Track>;
    patterns: Record<Id, Pattern>;
    sections: Record<Id, Section>;
    samples: Record<Id, SampleEntity>;
    mixChannels: Record<Id, MixChannel>;
    /** Instruments visible in the mixer, in left-to-right strip order.
     *  Instruments that exist but aren't in this array are hidden from the
     *  mixer (e.g. sub-synths used inside drumkits). */
    mixerInstrumentOrder: Id[];
}
/** Song tempo: beats per minute, and rows per beat (4 = sixteenth-note grid). */
export interface Tempo {
    bpm: number;
    linesPerBeat: number;
}
export declare const DEFAULT_TEMPO: Tempo;
export declare const MIN_BPM = 20;
export declare const MAX_BPM = 300;
/** The full editable document. Serializable as-is to JSON. */
export interface Doc {
    entities: Entities;
    tempo: Tempo;
    /** The pattern currently open in the editor. */
    patternId: Id;
    /** Ordered sections that form the song arrangement. */
    sectionIds: Id[];
    /** How a game conducts the song; absent for a song no game plays */
    game?: GameMusic;
}
