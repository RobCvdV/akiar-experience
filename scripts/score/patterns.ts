/**
 * The patterns, stage by stage. Six rows per beat, so the eighths swing on
 * triplets (rows 0 and 4 of a beat); 24 rows per bar. A seeded random keeps
 * the drums loose (ghosts, skipped hits, pickups) but the same on every build.
 */
import {
  AFTERGLOW,
  BLOOM,
  type Chord,
  coloursIn,
  D_LYDIAN,
  G_LYDIAN,
  PROG_A,
  PROG_B,
  PROG_C,
} from './harmony';

export const ROWS_PER_BEAT = 6;
export const BAR = ROWS_PER_BEAT * 4;

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
  ) {}

  get bars() {
    return this.chords.length;
  }

  get rows() {
    return this.bars * BAR;
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

  spec(): PatternSpec {
    for (const list of this.notes.values()) {
      list.sort((a, b) => a.row - b.row);
      for (let i = 0; i < list.length - 1; i++) {
        list[i].rows = Math.max(1, Math.min(list[i].rows, list[i + 1].row - list[i].row));
      }
    }
    return { name: this.name, bars: this.bars, notes: this.notes, chords: this.chords };
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
        if (last) last.rows += barsPerChord * BAR;
        return;
      }
      w.put(T.pad[v], bar * BAR, note, barsPerChord * BAR - 1, w.human(vol, 0.08));
    });
  }
}

/** Far bells: a few colour tones high up, off the grid's strong rows */
function shimmer(w: Writer, perBar: number, vol: number, lo = 74, hi = 93) {
  for (let bar = 0; bar < w.bars; bar++) {
    const tones = coloursIn(w.chords[bar], lo, hi);
    let count = Math.floor(perBar) + (w.chance(perBar % 1) ? 1 : 0);
    while (count-- > 0) {
      const row = bar * BAR + w.pick([1, 3, 5, 8, 9, 13, 15, 17, 20, 21]);
      w.put(T.shimmer, row, w.pick(tones), 10 + Math.floor(w.rnd() * 24), w.human(vol, 0.4));
    }
  }
}

/** The bass: held roots (`style` long), a heartbeat (pulse) or a loose walk */
function bass(w: Writer, style: 'long' | 'pulse' | 'walk', vol: number) {
  for (let bar = 0; bar < w.bars; bar++) {
    const c = w.chords[bar];
    const next = w.chords[(bar + 1) % w.bars];
    const at = bar * BAR;
    if (style === 'long') {
      w.put(T.bass, at, c.bass, BAR - 2, w.human(vol));
    } else if (style === 'pulse') {
      w.put(T.bass, at, c.bass, 14, w.human(vol));
      w.put(T.bass, at + 16, w.chance(0.5) ? c.bass + 7 : c.bass + 12, 6, w.human(vol * 0.75));
    } else {
      const tones = coloursIn(c, c.bass, c.bass + 12);
      const approach = next.bass + (w.chance(0.5) ? -1 : 1);
      const walk = [c.bass, w.pick(tones), w.pick(tones), approach];
      walk.forEach((note, beat) => {
        w.put(T.bass, at + beat * ROWS_PER_BEAT, note, 5, w.human(beat === 0 ? vol : vol * 0.8));
        // now and then a swung pickup into the next beat
        if (beat < 3 && w.chance(0.18))
          w.put(T.bass, at + beat * ROWS_PER_BEAT + 4, w.pick(tones), 2, vol * 0.55);
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
      const nextAt = hits[i + 1] ?? BAR;
      const len = style === 'long' ? BAR - 4 : Math.max(3, nextAt - offset - 1);
      // a hit on the bar's last eighth anticipates the next chord
      const chordAt = offset >= 22 ? w.chords[(bar + 1) % w.bars] : c;
      const notes = offset >= 22 ? [chordAt.pad[1], chordAt.pad[2], chordAt.pad[3]] : shell;
      notes.forEach((note, k) =>
        w.put(T.keys[k], bar * BAR + offset, note + 12, len, w.human(vol)),
      );
    });
  }
}

/** The ride: ding, ding-da ding, ding-da — loose, with skips and extra skips */
function ride(w: Writer, vol: number, busy: number) {
  for (let bar = 0; bar < w.bars; bar++) {
    const at = bar * BAR;
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
    const at = bar * BAR;
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
    const at = bar * BAR;
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
    for (let r = 0; r < BAR; r += 2) {
      const onBeat = r % 6 === 0;
      if (w.chance(density * (onBeat ? 0.6 : 1)))
        w.put(T.tick, bar * BAR + r, w.pick(tones), 1, w.human(vol, 0.5));
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
          bar * BAR + beat * 6 + r,
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
    for (let r = 0; r < BAR; r += step) {
      w.put(
        T.arp,
        bar * BAR + r,
        tones[k % tones.length] + 12 * Math.floor(k / tones.length),
        step,
        vol * (0.5 + 0.5 * ((bar * BAR + r) / w.rows)),
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
      w.put(T.lead, bar * BAR + r, note, rows, w.human(r === 0 ? vol : vol * 0.85));
      // a grace from a neighbouring colour, now and then
      if (ornament > 0 && rows >= 8 && w.chance(ornament)) {
        const near = tones.filter((n) => Math.abs(n - note) <= 4 && n !== note);
        if (near.length) w.put(T.lead, bar * BAR + r + rows - 2, w.pick(near), 2, vol * 0.6);
      }
    }
  }
}

/** Afterglow's lead: a few long notes, echoes of the melody */
function echoes(w: Writer, vol: number) {
  for (let bar = 0; bar < w.bars; bar += 2) {
    const tones = coloursIn(w.chords[bar], 69, 81);
    w.put(T.lead, bar * BAR + 4, w.pick(tones), 14, vol);
    w.put(T.lead, bar * BAR + 28, w.pick(tones), 16, vol * 0.8);
  }
}

// ── Stages ───────────────────────────────────────────────────────────────

type Stage = (w: Writer) => void;

const STAGES: Record<string, { chords: Chord[]; seed: number; write: Stage }> = {
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
      for (let r = 0; r < BAR; r += 2) w.put(T.brush, r, 50, 1, 0.1 + r / 40);
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
    const w = new Writer(name, stage.chords, mulberry32(stage.seed));
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
  afterglow: ['afterglow'],
};
