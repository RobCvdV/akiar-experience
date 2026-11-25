/** Note <-> frequency/name helpers. Pure. */
/** Equal-tempered frequency for a MIDI note. A4 (69) = 440 Hz. */
export declare function midiToFreq(midi: number): number;
/**
 * Playback rate that pitches a sample to `midi`. MIDI 60 (C-4) = 1, i.e. the
 * sample's natural rate — the same base-note convention as the engine's
 * `sample` module.
 */
export declare function samplePlaybackRate(midi: number): number;
/** Human-readable note name, e.g. 60 -> "C-4". */
export declare function midiToName(midi: number): string;
/** A note name as MIDI: "C-4", "C4", "C#4", "Db4" (60 = C-4), case aside; null when it isn't one */
export declare function nameToMidi(name: string): number | null;
/** Nearest MIDI note and the remaining offset in cents (−50..50) for a frequency. */
export declare function freqToNote(freq: number): {
    midi: number;
    cents: number;
};
/** Rows advanced per second, derived from tempo. */
export declare function rowHz(bpm: number, linesPerBeat: number): number;
