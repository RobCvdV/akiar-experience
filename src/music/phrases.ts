/**
 * What the stars play, in the harmony of the moment. Height picks the
 * register: a star near the top sings high. Pure: randomness is passed in.
 */
import { harmonyNotes } from './score';

export interface PhraseNote {
  note: number;
  /** Rows after the first note */
  delayRows: number;
  rows: number;
  velocity: number;
}

/** 0 at the bottom of the sky, 1 at the top → a register around it */
function register(height: number, span: number): [number, number] {
  const centre = 64 + Math.round(Math.max(0, Math.min(1, height)) * 26);
  return [centre - span, centre + span];
}

/** One tone of the harmony that steps out when the pointer nears a star */
export function starTone(pcs: readonly number[], height: number, random: () => number): PhraseNote {
  const [lo, hi] = register(height, 5);
  const notes = harmonyNotes(pcs, lo, hi);
  const note = notes.length ? notes[Math.floor(random() * notes.length)] : 69;
  return {
    note,
    delayRows: 0,
    rows: 8 + Math.floor(random() * 10),
    velocity: 70 + Math.floor(random() * 35),
  };
}

/** Gaps (rows) between an arpeggio's notes: swung, sometimes rushing, sometimes waiting */
const RHYTHMS = [
  [1, 1, 1, 1, 1],
  [2, 1, 1, 2, 1],
  [1, 1, 2, 2, 2],
  [2, 2, 1, 1, 1],
  [1, 2, 1, 2, 1],
];

/** A short arpeggio through the harmony from where the click was, fading fast */
export function clickArpeggio(
  pcs: readonly number[],
  height: number,
  random: () => number,
): PhraseNote[] {
  const [lo] = register(height, 6);
  const notes = harmonyNotes(pcs, lo, lo + 26);
  if (notes.length === 0) return [];
  const count = 4 + Math.floor(random() * 3);
  const gaps = RHYTHMS[Math.floor(random() * RHYTHMS.length)];
  // mostly up; now and then it turns back at the top
  const turn = random() < 0.35 ? Math.max(2, count - 2) : count;
  const out: PhraseNote[] = [];
  let i = Math.floor(random() * Math.min(2, notes.length));
  let delay = 0;
  for (let k = 0; k < count; k++) {
    out.push({
      note: notes[Math.min(i, notes.length - 1)],
      delayRows: delay,
      rows: 2,
      velocity: Math.round(118 * 0.8 ** k),
    });
    i += k < turn ? 1 + (random() < 0.25 ? 1 : 0) : -1;
    i = Math.max(0, i);
    delay += gaps[k % gaps.length];
  }
  return out;
}
