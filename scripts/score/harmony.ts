/**
 * The score's harmony: D at the centre, lydian and dorian colours, maj9 / #11 /
 * sus chords, and two chromatic turns (Fmaj7#11, Cmaj7#11) that give the
 * dream its lift. Every chord carries a smooth four-voice pad voicing, a bass
 * root and the tones melodies may pick from.
 */

export interface Chord {
  name: string;
  bass: number;
  /** Four pad voices, low to high, voice-led from the chord before */
  pad: [number, number, number, number];
  /** Pitch classes that sound good over it (chord tones and tensions) */
  colours: number[];
}

const pc = (...notes: number[]) => [...new Set(notes.map((n) => ((n % 12) + 12) % 12))];

const chord = (name: string, bass: number, pad: Chord['pad'], extra: number[] = []): Chord => ({
  name,
  bass,
  pad,
  colours: pc(bass, ...pad, ...extra),
});

// D E F# G# A B C#: D lydian; the drone of the void
export const D_LYDIAN = chord('Dmaj9#11', 38, [50, 57, 64, 68], [54, 61, 59]);
export const G_LYDIAN = chord('Gmaj13#11', 43, [55, 59, 61, 66], [57, 64]);

/** Prog A — nebula, pulse */
export const PROG_A: Chord[] = [
  chord('Dmaj9', 38, [54, 57, 61, 64], [59, 68]),
  chord('Bm11', 35, [54, 57, 62, 64], [61, 59]),
  chord('Gmaj13#11', 43, [54, 59, 61, 64], [57, 62]),
  chord('A7sus9', 33, [55, 59, 62, 64], [57, 66]),
];

/** Prog C — drift: a ii–V that lands softly */
export const PROG_C: Chord[] = [
  chord('Em9', 40, [55, 59, 62, 66], [57, 64]),
  chord('A13', 45, [55, 59, 61, 66], [57, 64]),
  chord('Dmaj9', 38, [54, 57, 61, 64], [59, 68]),
  chord('Gmaj13#11', 43, [54, 59, 61, 64], [57, 62]),
];

/** Prog B — constellation, dream: eight bars with the chromatic turns */
export const PROG_B: Chord[] = [
  chord('Gmaj9', 43, [54, 57, 59, 62], [55, 61, 64]),
  chord('F#m9', 42, [52, 56, 57, 61], [54, 59]),
  chord('Em11', 40, [55, 57, 62, 66], [52, 59]),
  chord('Fmaj7#11', 41, [57, 59, 60, 64], [53, 55]),
  chord('Dmaj9', 38, [54, 57, 61, 64], [59, 68]),
  chord('Bm9', 35, [54, 57, 61, 62], [59, 64]),
  chord('Cmaj7#11', 36, [55, 59, 64, 66], [60, 62]),
  chord('A13sus(b9)', 33, [55, 58, 62, 66], [57, 64]),
];

/** The way into the dream: the last two chords of prog B, two bars each */
export const BLOOM: Chord[] = [PROG_B[6], PROG_B[6], PROG_B[7], PROG_B[7]];

export const AFTERGLOW: Chord[] = [PROG_A[0], PROG_A[0], PROG_A[1], PROG_A[2]];

/** The colours of a chord as notes between `lo` and `hi` */
export function coloursIn(c: Chord, lo: number, hi: number): number[] {
  const out: number[] = [];
  for (let n = lo; n <= hi; n++) if (c.colours.includes(n % 12)) out.push(n);
  return out;
}

// ── The trance stages: plain triads around B minor, the pads moving by step ──

export const T_BM = chord('Bm', 35, [54, 59, 62, 66], [61]);
export const T_G = chord('G', 43, [55, 59, 62, 67], [57]);
export const T_D = chord('D', 38, [54, 57, 62, 66], [64]);
export const T_A = chord('A', 45, [52, 57, 61, 64], [59]);
export const T_EM = chord('Em', 40, [52, 55, 59, 64], [54]);

/** orbit, lift A: i – VI – III – VII */
export const TRANCE_A: Chord[] = [T_BM, T_G, T_D, T_A];
/** lift B: iv – VI – III – VII */
export const TRANCE_B: Chord[] = [T_EM, T_G, T_D, T_A];
/** euphoria: lifted, landing on the minor */
export const EUPHORIA: Chord[] = [T_G, T_D, T_A, T_BM];
/** ignite: out of the dream's A13 into B minor */
export const IGNITE: Chord[] = [T_G, T_G, T_A, T_A];
/** surge: the build, held on the dominant */
export const SURGE: Chord[] = [T_EM, T_G, T_A, T_A];
/** breakdown: two bars a chord */
export const BREAKDOWN: Chord[] = [T_BM, T_BM, T_G, T_G, T_D, T_D, T_A, T_A];
