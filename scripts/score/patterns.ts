/**
 * The patterns, stage by stage. The song runs at 12 rows per beat, so both
 * straight sixteenths (3 rows, the trance stages) and swung triplet eighths
 * (rows 0 and 8 of a beat, the jazz stages) fit. The jazz parts are written
 * in sixths of a beat (`JAZZ`: 24 to a bar) and doubled on the way out; the
 * trance parts in rows (`TRANCE`: 48 to a bar). A seeded random keeps the
 * drums loose (ghosts, skipped hits, pickups) but the same on every build.
 */
import {
  AFTERGLOW,
  BLOOM,
  BREAKDOWN,
  EUPHORIA,
  IGNITE,
  SURGE,
  TRANCE_A,
  TRANCE_B,
  type Chord,
  coloursIn,
  D_LYDIAN,
  G_LYDIAN,
  PROG_A,
  PROG_B,
  PROG_C,
} from './harmony';
import type { InstrumentName } from './instruments';

export const ROWS_PER_BEAT = 12;
/** Rows in a bar of the song */
export const BAR = ROWS_PER_BEAT * 4;

/** How a pattern's parts count: units per bar, and rows per unit */
interface Grid {
  bar: number;
  scale: number;
}
const JAZZ: Grid = { bar: 24, scale: 2 };
const TRANCE: Grid = { bar: 48, scale: 1 };

/** Track numbers (1-based) — the same in every pattern */
export const T = {
  kick: 1,
  brush: 2,
  ride: 3,
  tick: 4,
  bass: 5,
  pad: [6, 7, 8, 9],
  keys: [10, 11, 12],
  arp: 13,
  lead: 14,
  shimmer: 15,
  star: [16, 17],
  spark: [18, 19, 20],
} as const;
export const TRACK_COUNT = 20;

export interface NoteEvent {
  row: number;
  note: number;
  rows: number;
  vol: number;
}

export interface PatternSpec {
  name: string;
  bars: number;
  /** Per track number (1-based) */
  notes: Map<number, NoteEvent[]>;
  /** The chord of each bar, for the page's harmony */
  chords: Chord[];
  /** Track numbers that play another instrument than usual in this pattern */
  instruments: Partial<Record<number, InstrumentName>>;
}

type Random = () => number;

export function mulberry32(seed: number): Random {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

class Writer {
  readonly notes = new Map<number, NoteEvent[]>();
  constructor(
    readonly name: string,
    readonly chords: Chord[],
    readonly rnd: Random,
    readonly grid: Grid = JAZZ,
    readonly instruments: Partial<Record<number, InstrumentName>> = {},
  ) {}

  /** Units in a bar */
  get bar() {
    return this.grid.bar;
  }

  get bars() {
    return this.chords.length;
  }

  /** Units in the pattern */
  get rows() {
    return this.bars * this.bar;
  }

  /** A note on `track`, clipped to the pattern (and to the next note on that track) */
  put(track: number, row: number, note: number, rows: number, vol: number) {
    if (row < 0 || row >= this.rows) return;
    const list = this.notes.get(track) ?? [];
    list.push({ row, note, rows: Math.max(1, Math.min(rows, this.rows - row)), vol: clamp(vol) });
    this.notes.set(track, list);
  }

  pick<X>(xs: readonly X[]): X {
    return xs[Math.floor(this.rnd() * xs.length)];
  }

  chance(p: number) {
    return this.rnd() < p;
  }

  /** Slightly loose dynamics */
  human(vol: number, spread = 0.12) {
    return vol * (1 - spread / 2 + this.rnd() * spread);
  }

  /** The notes in song rows */
  spec(): PatternSpec {
    const k = this.grid.scale;
    const notes = new Map<number, NoteEvent[]>();
    for (const [track, list] of this.notes) {
      list.sort((a, b) => a.row - b.row);
      for (let i = 0; i < list.length - 1; i++) {
        list[i].rows = Math.max(1, Math.min(list[i].rows, list[i + 1].row - list[i].row));
      }
      notes.set(track, list.map((n) => ({ ...n, row: n.row * k, rows: n.rows * k })));
    }
    return { name: this.name, bars: this.bars, notes, chords: this.chords, instruments: this.instruments };
  }
}

const clamp = (v: number) => Math.max(0.05, Math.min(1, v));

// ── Parts ────────────────────────────────────────────────────────────────

/** Pads: every voice held over the bar; a voice that stays on its note keeps ringing */
function pads(w: Writer, vol: number, barsPerChord = 1) {
  for (let bar = 0; bar < w.bars; bar += barsPerChord) {
    const c = w.chords[bar];
    c.pad.forEach((note, v) => {
      const prev = bar > 0 ? w.chords[bar - barsPerChord]?.pad[v] : undefined;
      if (prev === note) {
        // extend the previous note instead of re-striking it
        const list = w.notes.get(T.pad[v]);
        const last = list?.[list.length - 1];
        if (last) last.rows += barsPerChord * w.bar;
        return;
      }
      w.put(T.pad[v], bar * w.bar, note, barsPerChord * w.bar - 1, w.human(vol, 0.08));
    });
  }
}

/** Far bells: a few colour tones high up, off the grid's strong rows */
function shimmer(w: Writer, perBar: number, vol: number, lo = 74, hi = 93) {
  for (let bar = 0; bar < w.bars; bar++) {
    const tones = coloursIn(w.chords[bar], lo, hi);
    let count = Math.floor(perBar) + (w.chance(perBar % 1) ? 1 : 0);
    while (count-- > 0) {
      const row = bar * w.bar + w.pick([1, 3, 5, 8, 9, 13, 15, 17, 20, 21]);
      w.put(T.shimmer, row, w.pick(tones), 10 + Math.floor(w.rnd() * 24), w.human(vol, 0.4));
    }
  }
}

/** The bass: held roots (`style` long), a heartbeat (pulse) or a loose walk */
function bass(w: Writer, style: 'long' | 'pulse' | 'walk', vol: number) {
  for (let bar = 0; bar < w.bars; bar++) {
    const c = w.chords[bar];
    const next = w.chords[(bar + 1) % w.bars];
    const at = bar * w.bar;
    if (style === 'long') {
      w.put(T.bass, at, c.bass, w.bar - 2, w.human(vol));
    } else if (style === 'pulse') {
      w.put(T.bass, at, c.bass, 14, w.human(vol));
      w.put(T.bass, at + 16, w.chance(0.5) ? c.bass + 7 : c.bass + 12, 6, w.human(vol * 0.75));
    } else {
      const tones = coloursIn(c, c.bass, c.bass + 12);
      const approach = next.bass + (w.chance(0.5) ? -1 : 1);
      const walk = [c.bass, w.pick(tones), w.pick(tones), approach];
      walk.forEach((note, beat) => {
        w.put(T.bass, at + beat * (w.bar / 4), note, 5, w.human(beat === 0 ? vol : vol * 0.8));
        // now and then a swung pickup into the next beat
        if (beat < 3 && w.chance(0.18))
          w.put(T.bass, at + beat * (w.bar / 4) + 4, w.pick(tones), 2, vol * 0.55);
      });
    }
  }
}

/** Rhodes shells (third, seventh, a tension) on a comping rhythm */
function keys(w: Writer, style: 'long' | 'charleston' | 'float', vol: number) {
  const rhythms: Record<typeof style, number[][]> = {
    long: [[0]],
    charleston: [
      [0, 10],
      [0, 16],
      [4, 16],
      [0, 10, 22],
    ],
    float: [
      [4, 16],
      [0, 10, 22],
      [10, 16],
      [4, 22],
      [0, 14],
    ],
  };
  for (let bar = 0; bar < w.bars; bar++) {
    const c = w.chords[bar];
    const shell = [c.pad[1], c.pad[2], c.pad[3]];
    const hits = w.pick(rhythms[style]);
    hits.forEach((offset, i) => {
      const nextAt = hits[i + 1] ?? w.bar;
      const len = style === 'long' ? w.bar - 4 : Math.max(3, nextAt - offset - 1);
      // a hit on the bar's last eighth anticipates the next chord
      const chordAt = offset >= 22 ? w.chords[(bar + 1) % w.bars] : c;
      const notes = offset >= 22 ? [chordAt.pad[1], chordAt.pad[2], chordAt.pad[3]] : shell;
      notes.forEach((note, k) =>
        w.put(T.keys[k], bar * w.bar + offset, note + 12, len, w.human(vol)),
      );
    });
  }
}

/** The ride: ding, ding-da ding, ding-da — loose, with skips and extra skips */
function ride(w: Writer, vol: number, busy: number) {
  for (let bar = 0; bar < w.bars; bar++) {
    const at = bar * w.bar;
    const base = [0, 6, 10, 12, 18, 22];
    for (const r of base) {
      const strong = r % 6 === 0;
      if (!strong && !w.chance(0.55 + busy * 0.4)) continue;
      w.put(T.ride, at + r, 86, 2, w.human(strong ? vol : vol * 0.65, 0.25));
    }
    if (w.chance(busy * 0.35)) w.put(T.ride, at + w.pick([2, 8, 14, 20]), 86, 1, vol * 0.4);
  }
}

/** Brushes on two and four, with ghosted triplets */
function brush(w: Writer, vol: number, ghosts: number) {
  for (let bar = 0; bar < w.bars; bar++) {
    const at = bar * w.bar;
    w.put(T.brush, at + 6, 50, 3, w.human(vol));
    w.put(T.brush, at + 18, 50, 3, w.human(vol));
    for (const r of [2, 4, 8, 10, 14, 16, 20, 22]) {
      if (w.chance(ghosts)) w.put(T.brush, at + r, 50, 1, w.human(vol * 0.32, 0.3));
    }
  }
}

/** A soft kick: a heartbeat, or feathered fours with a push */
function kick(w: Writer, style: 'heart' | 'feather', vol: number) {
  for (let bar = 0; bar < w.bars; bar++) {
    const at = bar * w.bar;
    if (style === 'heart') {
      w.put(T.kick, at, 36, 2, w.human(vol));
      w.put(T.kick, at + 4, 36, 2, w.human(vol * 0.55));
      if (w.chance(0.5)) w.put(T.kick, at + 12, 36, 2, w.human(vol * 0.7));
    } else {
      for (let beat = 0; beat < 4; beat++)
        w.put(T.kick, at + beat * 6, 36, 2, w.human(beat === 0 ? vol : vol * 0.45));
      if (w.chance(0.4)) w.put(T.kick, at + w.pick([10, 16, 22]), 36, 2, vol * 0.75);
    }
  }
}

/** Tuned ticks on chord tones, scattered over the triplet grid */
function ticks(w: Writer, density: number, vol: number) {
  for (let bar = 0; bar < w.bars; bar++) {
    const tones = coloursIn(w.chords[bar], 74, 88);
    for (let r = 0; r < w.bar; r += 2) {
      const onBeat = r % 6 === 0;
      if (w.chance(density * (onBeat ? 0.6 : 1)))
        w.put(T.tick, bar * w.bar + r, w.pick(tones), 1, w.human(vol, 0.5));
    }
  }
}

/** The glass arpeggio: rhythm cells (triplet runs, swung pairs, rests) over the chord */
function arp(w: Writer, density: number, vol: number, lo = 62, hi = 86) {
  const cells = [
    [0, 2, 4], // triplet run
    [0, 4], // swung pair
    [0], // a single
    [2, 4], // pushed
    [], // breathe
    [0, 2, 4],
  ];
  for (let bar = 0; bar < w.bars; bar++) {
    const tones = coloursIn(w.chords[bar], lo, hi);
    let i = Math.floor(w.rnd() * tones.length * 0.4);
    let dir = 1;
    for (let beat = 0; beat < 4; beat++) {
      if (!w.chance(density)) continue;
      for (const r of w.pick(cells)) {
        w.put(
          T.arp,
          bar * w.bar + beat * 6 + r,
          tones[i],
          2,
          w.human(r === 0 ? vol : vol * 0.78, 0.2),
        );
        i += dir * (w.chance(0.2) ? 2 : 1);
        if (i >= tones.length - 1 || i <= 0) dir = -dir;
        i = Math.max(0, Math.min(tones.length - 1, i));
      }
    }
  }
}

/** A rising arpeggio that speeds up: into the dream */
function riser(w: Writer, vol: number) {
  for (let bar = 0; bar < w.bars; bar++) {
    const tones = coloursIn(w.chords[bar], 60 + bar * 4, 84 + bar * 3);
    const step = bar < w.bars / 2 ? 4 : 2;
    let k = 0;
    for (let r = 0; r < w.bar; r += step) {
      w.put(
        T.arp,
        bar * w.bar + r,
        tones[k % tones.length] + 12 * Math.floor(k / tones.length),
        step,
        vol * (0.5 + 0.5 * ((bar * w.bar + r) / w.rows)),
      );
      k++;
    }
  }
}

/** The dream's melody over prog B, [row in bar, note, rows] per bar */
const MELODY: [number, number, number][][] = [
  [
    [0, 74, 10],
    [10, 73, 2],
    [12, 71, 10],
  ],
  [
    [4, 68, 8],
    [12, 69, 4],
    [16, 73, 7],
  ],
  [
    [0, 74, 12],
    [14, 69, 4],
    [18, 71, 5],
  ],
  [
    [0, 71, 16],
    [18, 72, 5],
  ],
  [
    [0, 76, 10],
    [10, 78, 2],
    [12, 81, 11],
  ],
  [
    [0, 73, 6],
    [6, 74, 4],
    [10, 78, 13],
  ],
  [
    [0, 78, 8],
    [10, 76, 4],
    [16, 71, 7],
  ],
  [
    [0, 70, 8],
    [10, 69, 4],
    [16, 66, 7],
  ],
];

function melody(w: Writer, fromBar: number, vol: number, ornament: number) {
  for (let bar = 0; bar < w.bars; bar++) {
    const phrase = MELODY[(fromBar + bar) % MELODY.length];
    const tones = coloursIn(w.chords[bar], 64, 86);
    for (const [r, note, rows] of phrase) {
      w.put(T.lead, bar * w.bar + r, note, rows, w.human(r === 0 ? vol : vol * 0.85));
      // a grace from a neighbouring colour, now and then
      if (ornament > 0 && rows >= 8 && w.chance(ornament)) {
        const near = tones.filter((n) => Math.abs(n - note) <= 4 && n !== note);
        if (near.length) w.put(T.lead, bar * w.bar + r + rows - 2, w.pick(near), 2, vol * 0.6);
      }
    }
  }
}

/** Afterglow's lead: a few long notes, echoes of the melody */
function echoes(w: Writer, vol: number) {
  for (let bar = 0; bar < w.bars; bar += 2) {
    const tones = coloursIn(w.chords[bar], 69, 81);
    w.put(T.lead, bar * w.bar + 4, w.pick(tones), 14, vol);
    w.put(T.lead, bar * w.bar + 28, w.pick(tones), 16, vol * 0.8);
  }
}

// ── Trance parts (on the row grid: 12 a beat, 3 a sixteenth) ───────────────

/** Four on the floor, from bar `from`; `fadeIn` bars to come up to `vol` */
function fourFloor(w: Writer, vol: number, from = 0, fadeIn = 0) {
  for (let bar = from; bar < w.bars; bar++) {
    const lift = fadeIn > 0 ? Math.min(1, (bar - from + 1) / fadeIn) : 1;
    for (let beat = 0; beat < 4; beat++) w.put(T.kick, bar * 48 + beat * 12, 36, 4, w.human(vol * lift, 0.06));
  }
}

/** Claps on two and four, a ghost before the four now and then */
function claps(w: Writer, vol: number) {
  for (let bar = 0; bar < w.bars; bar++) {
    w.put(T.brush, bar * 48 + 12, 50, 4, w.human(vol, 0.06));
    w.put(T.brush, bar * 48 + 36, 50, 4, w.human(vol, 0.06));
    if (w.chance(0.4)) w.put(T.brush, bar * 48 + 33, 50, 2, vol * 0.35);
  }
}

/** Open hats on the offbeats; with `sixteenths`, quiet closed ones between */
function hats(w: Writer, vol: number, sixteenths = 0) {
  for (let bar = 0; bar < w.bars; bar++) {
    for (let r = 0; r < 48; r += 3) {
      if (r % 12 === 6) w.put(T.ride, bar * 48 + r, 86, 4, w.human(vol, 0.08));
      else if (sixteenths > 0 && r % 12 !== 0 && w.chance(0.85)) w.put(T.ride, bar * 48 + r, 86, 1, w.human(vol * sixteenths, 0.3));
    }
  }
}

/** The offbeat bass; `bounce` adds sixteenth pickups */
function offbeatBass(w: Writer, vol: number, bounce = 0) {
  for (let bar = 0; bar < w.bars; bar++) {
    const root = w.chords[bar].bass + 12;
    for (let beat = 0; beat < 4; beat++) {
      w.put(T.bass, bar * 48 + beat * 12 + 6, root, 5, w.human(vol, 0.06));
      if (w.chance(bounce)) w.put(T.bass, bar * 48 + beat * 12 + 9, root + (w.chance(0.3) ? 12 : 0), 2, vol * 0.7);
    }
  }
}

/** Sixteenths through the chord, an accent shape over the bar; volume opens Seq's filter */
const SEQ_STEPS = [0, 2, 1, 3, 0, 2, 4, 3, 0, 2, 1, 3, 4, 2, 3, 1];
const SEQ_ACCENT = [1, 0.55, 0.7, 0.55, 0.9, 0.55, 0.75, 0.6, 1, 0.55, 0.7, 0.55, 0.85, 0.6, 0.8, 0.65];
function seq(w: Writer, vol: number, ramp: [number, number] = [1, 1], lo = 59) {
  for (let bar = 0; bar < w.bars; bar++) {
    const tones = coloursIn(w.chords[bar], lo, lo + 20).filter((n) => w.chords[bar].pad.some((p) => p % 12 === n % 12));
    for (let step = 0; step < 16; step++) {
      const at = (bar * 16 + step) / (w.bars * 16);
      const level = vol * (ramp[0] + (ramp[1] - ramp[0]) * at) * SEQ_ACCENT[step];
      w.put(T.tick, bar * 48 + step * 3, tones[SEQ_STEPS[step] % tones.length], 2, level);
    }
  }
}

/** Three notes cycling on sixteenths: three against four, the arp of the Glass */
function crossArp(w: Writer, vol: number, lo = 71) {
  let k = 0;
  for (let bar = 0; bar < w.bars; bar++) {
    const tones = coloursIn(w.chords[bar], lo, lo + 14).slice(0, 3);
    for (let r = 0; r < 48; r += 3) {
      w.put(T.arp, bar * 48 + r, tones[k % 3], 2, (k % 3 === 0 ? vol : vol * 0.7) * (0.9 + 0.1 * Math.sin(k)));
      k++;
    }
  }
}

/** Chord stabs on the Rhodes, syncopated */
function stabs(w: Writer, vol: number) {
  const rhythms = [[6, 30, 39], [6, 18, 42], [9, 30], [6, 27, 42]];
  for (let bar = 0; bar < w.bars; bar++) {
    const c = w.chords[bar];
    for (const r of w.pick(rhythms)) [c.pad[1], c.pad[2], c.pad[3]].forEach((n, k) => w.put(T.keys[k], bar * 48 + r, n + 12, 4, w.human(vol)));
  }
}

/** A build: claps from eighths to sixteenths to triplet sixteenths, swelling */
function roll(w: Writer, vol: number) {
  for (let bar = 0; bar < w.bars; bar++) {
    const step = bar < w.bars / 2 ? 6 : bar < w.bars - 1 ? 3 : 2;
    for (let r = 0; r < 48; r += step) w.put(T.brush, bar * 48 + r, 50, 1, vol * (0.25 + 0.75 * ((bar * 48 + r) / w.rows)));
  }
}

/** Melodies in rows: [row in bar, note, rows] per bar */
const ANTHEM: [number, number, number][][] = [
  [[0, 71, 12], [12, 74, 12], [24, 79, 24]],
  [[0, 78, 24], [24, 76, 12], [36, 74, 12]],
  [[0, 76, 18], [18, 73, 6], [24, 69, 24]],
  [[0, 74, 30], [30, 73, 6], [36, 71, 12]],
];
const CALL: [number, number, number][][] = [
  [[0, 71, 36]],
  [[0, 74, 24], [24, 71, 24]],
  [[0, 78, 36]],
  [[0, 76, 24], [24, 73, 18]],
];

function line(w: Writer, phrases: [number, number, number][][], vol: number, octave = 0) {
  for (let bar = 0; bar < w.bars; bar++) {
    for (const [r, note, rows] of phrases[bar % phrases.length]) w.put(T.lead, bar * 48 + r, note + octave, rows, w.human(vol, 0.06));
  }
}

// ── Stages ───────────────────────────────────────────────────────────────

type Stage = (w: Writer) => void;

interface StageDef {
  chords: Chord[];
  seed: number;
  write: Stage;
  grid?: Grid;
  instruments?: Partial<Record<number, InstrumentName>>;
}

/** The trance stages play their sixteenths on Seq instead of the jazz's Tick */
const TRANCE_KIT = { grid: TRANCE, instruments: { [T.tick]: 'Seq' as const } };

const STAGES: Record<string, StageDef> = {
  'void A': {
    chords: [D_LYDIAN, D_LYDIAN, D_LYDIAN, D_LYDIAN],
    seed: 11,
    write: (w) => {
      pads(w, 0.32, 4);
      shimmer(w, 0.7, 0.45);
    },
  },
  'void B': {
    chords: [G_LYDIAN, G_LYDIAN, G_LYDIAN, G_LYDIAN],
    seed: 12,
    write: (w) => {
      pads(w, 0.3, 4);
      shimmer(w, 0.8, 0.45);
    },
  },
  'nebula A': {
    chords: PROG_A,
    seed: 21,
    write: (w) => {
      pads(w, 0.42);
      bass(w, 'long', 0.35);
      shimmer(w, 1, 0.45);
    },
  },
  'nebula B': {
    chords: PROG_A,
    seed: 22,
    write: (w) => {
      pads(w, 0.42);
      bass(w, 'long', 0.4);
      shimmer(w, 1.3, 0.5);
      ticks(w, 0.06, 0.35);
    },
  },
  'pulse A': {
    chords: PROG_A,
    seed: 31,
    write: (w) => {
      pads(w, 0.4);
      bass(w, 'pulse', 0.55);
      kick(w, 'heart', 0.55);
      ticks(w, 0.18, 0.4);
      keys(w, 'long', 0.35);
      shimmer(w, 0.6, 0.4);
    },
  },
  'pulse B': {
    chords: PROG_A,
    seed: 32,
    write: (w) => {
      pads(w, 0.4);
      bass(w, 'pulse', 0.6);
      kick(w, 'heart', 0.6);
      ticks(w, 0.24, 0.42);
      keys(w, 'long', 0.38);
      ride(w, 0.3, 0);
      shimmer(w, 0.6, 0.4);
    },
  },
  'drift A': {
    chords: PROG_C,
    seed: 41,
    write: (w) => {
      pads(w, 0.34);
      bass(w, 'walk', 0.62);
      kick(w, 'feather', 0.5);
      brush(w, 0.5, 0.25);
      ride(w, 0.55, 0.3);
      keys(w, 'charleston', 0.45);
      ticks(w, 0.1, 0.35);
      arp(w, 0.25, 0.4);
    },
  },
  'drift B': {
    chords: PROG_C,
    seed: 42,
    write: (w) => {
      pads(w, 0.34);
      bass(w, 'walk', 0.62);
      kick(w, 'feather', 0.52);
      brush(w, 0.52, 0.35);
      ride(w, 0.58, 0.45);
      keys(w, 'charleston', 0.47);
      ticks(w, 0.12, 0.35);
      arp(w, 0.35, 0.42);
    },
  },
  'constellation A': {
    chords: PROG_B.slice(0, 4),
    seed: 51,
    write: (w) => {
      pads(w, 0.36);
      bass(w, 'walk', 0.65);
      kick(w, 'feather', 0.55);
      brush(w, 0.55, 0.4);
      ride(w, 0.6, 0.55);
      keys(w, 'float', 0.45);
      arp(w, 0.65, 0.5);
      ticks(w, 0.14, 0.35);
      shimmer(w, 0.5, 0.35);
    },
  },
  'constellation B': {
    chords: PROG_B.slice(4),
    seed: 52,
    write: (w) => {
      pads(w, 0.36);
      bass(w, 'walk', 0.65);
      kick(w, 'feather', 0.55);
      brush(w, 0.55, 0.45);
      ride(w, 0.6, 0.6);
      keys(w, 'float', 0.45);
      arp(w, 0.7, 0.5);
      ticks(w, 0.16, 0.35);
      shimmer(w, 0.5, 0.35);
    },
  },
  bloom: {
    chords: BLOOM,
    seed: 61,
    write: (w) => {
      pads(w, 0.45, 2);
      bass(w, 'long', 0.6);
      riser(w, 0.55);
      ride(w, 0.5, 0.8);
      // the brushes swell into the dream
      for (let r = 0; r < w.rows; r += r < w.rows / 2 ? 4 : 2)
        w.put(T.brush, r, 50, 1, 0.15 + 0.5 * (r / w.rows));
      kick(w, 'heart', 0.5);
      shimmer(w, 1, 0.4);
    },
  },
  'dream A': {
    chords: PROG_B.slice(0, 4),
    seed: 71,
    write: (w) => {
      pads(w, 0.4);
      bass(w, 'walk', 0.68);
      kick(w, 'feather', 0.6);
      brush(w, 0.6, 0.5);
      ride(w, 0.62, 0.7);
      keys(w, 'float', 0.42);
      arp(w, 0.55, 0.42, 74, 93);
      melody(w, 0, 0.62, 0.2);
      ticks(w, 0.12, 0.3);
    },
  },
  'dream B': {
    chords: PROG_B.slice(4),
    seed: 72,
    write: (w) => {
      pads(w, 0.4);
      bass(w, 'walk', 0.68);
      kick(w, 'feather', 0.6);
      brush(w, 0.6, 0.55);
      ride(w, 0.62, 0.75);
      keys(w, 'float', 0.42);
      arp(w, 0.6, 0.42, 74, 93);
      melody(w, 4, 0.62, 0.3);
      ticks(w, 0.14, 0.3);
    },
  },
  afterglow: {
    chords: AFTERGLOW,
    seed: 81,
    write: (w) => {
      pads(w, 0.4);
      bass(w, 'long', 0.4);
      echoes(w, 0.5);
      ride(w, 0.25, 0);
      shimmer(w, 1.2, 0.45);
    },
  },
  // ── Trance ──
  ignite: {
    chords: IGNITE,
    seed: 101,
    ...TRANCE_KIT,
    write: (w) => {
      pads(w, 0.38, 2);
      fourFloor(w, 0.85, 1, 3);
      hats(w, 0.35);
      seq(w, 0.7, [0.25, 0.9]);
      for (let bar = 2; bar < w.bars; bar++) w.put(T.bass, bar * 48 + 6, w.chords[bar].bass + 12, 5, 0.5);
    },
  },
  'orbit A': {
    chords: TRANCE_A,
    seed: 111,
    ...TRANCE_KIT,
    write: (w) => {
      pads(w, 0.34);
      fourFloor(w, 0.9);
      hats(w, 0.45);
      offbeatBass(w, 0.6);
      seq(w, 0.75, [0.55, 0.8]);
      shimmer(w, 0.4, 0.35);
    },
  },
  'orbit B': {
    chords: TRANCE_A,
    seed: 112,
    ...TRANCE_KIT,
    write: (w) => {
      pads(w, 0.34);
      fourFloor(w, 0.9);
      hats(w, 0.45, 0.25);
      offbeatBass(w, 0.62, 0.15);
      seq(w, 0.75, [0.8, 1]);
      crossArp(w, 0.3);
    },
  },
  'lift A': {
    chords: TRANCE_A,
    seed: 121,
    ...TRANCE_KIT,
    write: (w) => {
      pads(w, 0.36);
      fourFloor(w, 0.92);
      claps(w, 0.7);
      hats(w, 0.5, 0.3);
      offbeatBass(w, 0.65, 0.25);
      seq(w, 0.8);
      crossArp(w, 0.42);
      stabs(w, 0.35);
      line(w, CALL, 0.45);
    },
  },
  'lift B': {
    chords: TRANCE_B,
    seed: 122,
    ...TRANCE_KIT,
    write: (w) => {
      pads(w, 0.36);
      fourFloor(w, 0.92);
      claps(w, 0.7);
      hats(w, 0.5, 0.3);
      offbeatBass(w, 0.65, 0.25);
      seq(w, 0.8);
      crossArp(w, 0.42);
      stabs(w, 0.35);
      line(w, CALL, 0.45);
    },
  },
  surge: {
    chords: SURGE,
    seed: 131,
    ...TRANCE_KIT,
    write: (w) => {
      pads(w, 0.4);
      // the kick drops out for the last bar: the peak lands on its return
      for (let bar = 0; bar < w.bars - 1; bar++) for (let beat = 0; beat < 4; beat++) w.put(T.kick, bar * 48 + beat * 12, 36, 4, 0.9);
      roll(w, 0.8);
      hats(w, 0.45, 0.35);
      seq(w, 0.85, [0.4, 1.15]);
      crossArp(w, 0.4);
      for (let bar = 0; bar < w.bars - 1; bar++) for (let beat = 0; beat < 4; beat++) w.put(T.bass, bar * 48 + beat * 12 + 6, w.chords[bar].bass + 12, 5, 0.6);
    },
  },
  'euphoria A': {
    chords: EUPHORIA,
    seed: 141,
    ...TRANCE_KIT,
    write: (w) => {
      pads(w, 0.4);
      fourFloor(w, 0.95);
      claps(w, 0.75);
      hats(w, 0.55, 0.35);
      offbeatBass(w, 0.7, 0.3);
      seq(w, 0.85);
      crossArp(w, 0.45);
      stabs(w, 0.38);
      line(w, ANTHEM, 0.6);
      shimmer(w, 0.5, 0.35, 86, 98);
    },
  },
  'euphoria B': {
    chords: EUPHORIA,
    seed: 142,
    ...TRANCE_KIT,
    write: (w) => {
      pads(w, 0.4);
      fourFloor(w, 0.95);
      claps(w, 0.75);
      hats(w, 0.55, 0.4);
      offbeatBass(w, 0.7, 0.35);
      seq(w, 0.9);
      crossArp(w, 0.48, 78);
      stabs(w, 0.4);
      line(w, ANTHEM, 0.62, 12);
    },
  },
  breakdown: {
    chords: BREAKDOWN,
    seed: 151,
    ...TRANCE_KIT,
    write: (w) => {
      pads(w, 0.45, 2);
      seq(w, 0.5, [0.35, 0.75]);
      crossArp(w, 0.3);
      line(w, CALL, 0.4, 12);
      shimmer(w, 0.8, 0.4);
      hats(w, 0.25);
    },
  },
  // ── Fills (one bar; the conductor plays them in the mix they break into) ──
  'fill-swing': {
    chords: [D_LYDIAN],
    seed: 91,
    write: (w) => {
      for (const r of [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22])
        w.put(T.brush, r, 50, 1, 0.25 + r / 40);
      w.put(T.kick, 0, 36, 2, 0.6);
      w.put(T.kick, 16, 36, 2, 0.5);
      w.put(T.ride, 0, 86, 2, 0.6);
      w.put(T.ride, 12, 86, 2, 0.5);
      for (const r of [4, 10, 16, 22]) w.put(T.tick, r, w.pick([74, 76, 78, 81, 83]), 1, 0.4);
    },
  },
  'fill-shimmer': {
    chords: [D_LYDIAN],
    seed: 92,
    write: (w) => {
      [93, 90, 88, 86, 85, 81, 78, 76].forEach((n, i) =>
        w.put(T.shimmer, i * 3, n, 6, 0.5 - i * 0.03),
      );
    },
  },
  rise: {
    chords: [D_LYDIAN],
    seed: 93,
    write: (w) => {
      [62, 64, 66, 68, 69, 71, 73, 74, 76, 78, 80, 81].forEach((n, i) =>
        w.put(T.arp, i * 2, n, 2, 0.35 + i * 0.04),
      );
      for (let r = 0; r < w.bar; r += 2) w.put(T.brush, r, 50, 1, 0.1 + r / 40);
    },
  },
  fall: {
    chords: [D_LYDIAN],
    seed: 94,
    write: (w) => {
      [86, 83, 81, 78, 76, 73, 69, 66].forEach((n, i) => w.put(T.shimmer, i * 3, n, 8, 0.45));
      w.put(T.kick, 0, 36, 2, 0.6);
      w.put(T.bass, 0, 38, 20, 0.5);
    },
  },
};

export function writePatterns(): PatternSpec[] {
  return Object.entries(STAGES).map(([name, stage]) => {
    const w = new Writer(name, stage.chords, mulberry32(stage.seed), stage.grid, stage.instruments);
    stage.write(w);
    return w.spec();
  });
}

/** Sections, in arrangement order: each a sequence of pattern names */
export const SECTIONS: Record<string, string[]> = {
  void: ['void A', 'void B'],
  nebula: ['nebula A', 'nebula B'],
  pulse: ['pulse A', 'pulse B'],
  drift: ['drift A', 'drift B'],
  constellation: ['constellation A', 'constellation B'],
  bloom: ['bloom'],
  dream: ['dream A', 'dream B'],
  ignite: ['ignite'],
  orbit: ['orbit A', 'orbit B'],
  lift: ['lift A', 'lift B'],
  surge: ['surge'],
  euphoria: ['euphoria A', 'euphoria B'],
  breakdown: ['breakdown'],
  afterglow: ['afterglow'],
};
