/**
 * The score's instruments, written with synthor's patch builder. Soft and
 * round: a heartbeat kick, brushes, a swung ride, tuned ticks, a warm bass,
 * a nebula pad, a Rhodes, a glass arp, a dreamy lead, and the bells the stars
 * play. Effects live on the mix channels (see `mix.ts`).
 */
import {
  buildPatch,
  type ModuleRef,
  type PatchBuilder,
} from '../../../synthor/src/domain/presets/patchBuilder';
import type { ModularInstrument } from '../../../synthor/src/domain/types';

/** A DX operator's saw (its waveforms start with sine) */
const DX_SAW = 1;
const TRIANGLE = 2;
const SINE = 3;
const LOWPASS = 0;
const HIGHPASS = 1;
const BANDPASS = 2;

function env(
  b: PatchBuilder,
  attack: number,
  decay: number,
  sustain: number,
  release: number,
): ModuleRef {
  const e = b.add('adsr', { attack, decay, sustain, release });
  b.wire(b.gate, e, 'gate');
  return e;
}

function vca(b: PatchBuilder, src: ModuleRef, envelope: ModuleRef, level = 1): ModuleRef {
  const g = b.add('gain', { level });
  b.wire(src, g, 'in');
  b.wire(envelope, g, 'mod');
  return g;
}

function osc(b: PatchBuilder, params: Record<string, number>): ModuleRef {
  const o = b.add('osc', params);
  b.wire(b.note, o, 'freq');
  return o;
}

function mix(b: PatchBuilder, ...sources: ModuleRef[]): ModuleRef {
  const m = b.add('mix');
  sources.forEach((s, i) => b.wire(s, m, 'abcd'[i]));
  return m;
}

function mono(b: PatchBuilder, src: ModuleRef): void {
  b.wire(src, b.output, 'inL');
}

function widen(b: PatchBuilder, src: ModuleRef, width: number): void {
  const w = b.add('width', { width });
  b.wire(src, w, 'in');
  b.wire(src, w, 'inR');
  b.wire(w.port('outL'), b.output, 'inL');
  b.wire(w.port('outR'), b.output, 'inR');
}

export type InstrumentName =
  | 'Kick'
  | 'Brush'
  | 'Ride'
  | 'Tick'
  | 'Bass'
  | 'Nebula'
  | 'Rhodes'
  | 'Glass'
  | 'Dream'
  | 'Shimmer'
  | 'Star'
  | 'Spark'
  | 'Seq';

type Spec = { voices: number; level: number; pan?: number; body: (b: PatchBuilder) => void };

const SPECS: Record<InstrumentName, Spec> = {
  // A soft heartbeat: a sine that barely drops in pitch, no click.
  Kick: {
    voices: 2,
    level: 0.85,
    body: (b) => {
      // the pitch drop grows with the note's volume: soft kicks stay round, loud ones punch
      const body = osc(b, { waveform: SINE, fmDepth: 3.2 });
      b.wire(vca(b, env(b, 0.001, 0.09, 0, 0.02), b.volume), body, 'fm');
      const round = b.add('tanh', { drive: 1.4, level: 0.9 });
      b.wire(vca(b, body, env(b, 0.002, 0.45, 0, 0.12)), round, 'in');
      const f = b.add('filter', { mode: LOWPASS, cutoff: 900, q: 0.6 });
      b.wire(round, f, 'in');
      mono(b, f);
    },
  },
  // Brushes: pink noise swept through a band, a slow swish with a faint tone.
  Brush: {
    voices: 2,
    level: 2,
    pan: -0.12,
    body: (b) => {
      const n = b.add('noise', { mode: 1 });
      const band = b.add('filter', { mode: BANDPASS, cutoff: 2600, q: 0.6, modDepth: 0.5 });
      b.wire(n, band, 'in');
      b.wire(env(b, 0.001, 0.12, 0, 0.1), band, 'cutoffMod');
      const tone = vca(
        b,
        b.add('dxop', { freqMode: 1, fixedHz: 210 }),
        env(b, 0.001, 0.07, 0, 0.04),
        0.25,
      );
      widen(b, mix(b, vca(b, band, env(b, 0.006, 0.26, 0.05, 0.2), 1.2), tone), 1.3);
    },
  },
  // A ride with a bell in it: metallic FM over bright noise, a long fade.
  Ride: {
    voices: 3,
    level: 1.1,
    pan: 0.25,
    body: (b) => {
      const mod = b.add('dxop', { freqMode: 1, fixedHz: 1847, level: 1.6 });
      const bell = b.add('dxop', { freqMode: 1, fixedHz: 4210 });
      b.wire(mod, bell, 'mod');
      const hp = b.add('filter', { mode: HIGHPASS, cutoff: 6500, q: 0.8 });
      b.wire(b.add('noise'), hp, 'in');
      const metal = b.add('filter', { mode: HIGHPASS, cutoff: 3000, q: 0.7 });
      b.wire(mix(b, vca(b, bell, env(b, 0.001, 0.5, 0, 0.4), 0.18), hp), metal, 'in');
      mono(b, vca(b, metal, env(b, 0.001, 0.32, 0, 0.3), 0.5));
    },
  },
  // Tuned ticks: a woodblock-like ping that follows the note.
  Tick: {
    voices: 3,
    level: 0.7,
    pan: 0.35,
    body: (b) => {
      const carrier = b.add('dxop', { ratio: 1 });
      b.wire(b.note, carrier, 'freq');
      const mod = b.add('dxop', { ratio: 2.76 });
      b.wire(b.note, mod, 'freq');
      b.wire(vca(b, mod, env(b, 0.001, 0.03, 0, 0.02), 1.2), carrier, 'mod');
      const hp = b.add('filter', { mode: HIGHPASS, cutoff: 500, q: 0.7 });
      b.wire(vca(b, carrier, env(b, 0.001, 0.09, 0, 0.06)), hp, 'in');
      mono(b, hp);
    },
  },
  // A round, plucked bass between an upright and a sub.
  Bass: {
    voices: 1,
    level: 0.8,
    body: (b) => {
      const sine = osc(b, { waveform: SINE });
      const tri = osc(b, { waveform: TRIANGLE, gain: 0.5 });
      const f = b.add('filter', {
        mode: LOWPASS,
        cutoff: 260,
        q: 1.1,
        modDepth: 1,
        modDepthScale: 5,
      });
      b.wire(mix(b, sine, tri), f, 'in');
      b.wire(env(b, 0.003, 0.18, 0.1, 0.1), f, 'cutoffMod');
      const warm = b.add('tanh', { drive: 1.3, level: 0.9 });
      b.wire(f, warm, 'in');
      mono(b, vca(b, warm, env(b, 0.006, 0.9, 0.45, 0.25)));
    },
  },
  // The nebula: detuned saws and a soft octave sine, breathing slowly.
  // Two detuned saws, one per side, each through its own lowpass: wide and
  // warm. The saws are DX operators: an oscillator's band-limited saw costs
  // four times as much once the sequencer drives it, too much for phones.
  Nebula: {
    voices: 8,
    level: 1.13,
    body: (b) => {
      const amp = env(b, 1.6, 1.4, 0.8, 2.8);
      const side = (cents: number) => {
        const f = b.add('filter', { mode: LOWPASS, cutoff: 820, q: 1.6 });
        b.wire(b.add('dxop', { ratio: 2 ** (cents / 1200), waveform: DX_SAW, level: 0.6 }), f, 'in');
        return vca(b, f, amp);
      };
      b.wire(side(-9), b.output, 'inL');
      b.wire(side(11), b.output, 'inR');
    },
  },
  Rhodes: {
    voices: 8,
    level: 0.78,
    body: (b) => {
      const carrier = b.add('dxop', { ratio: 1 });
      const tine = vca(b, b.add('dxop', { ratio: 14 }), env(b, 0.001, 0.06, 0, 0.05), 0.9);
      const body = vca(b, b.add('dxop', { ratio: 1 }), env(b, 0.001, 1.4, 0.15, 0.3), 0.9);
      b.wire(tine, carrier, 'mod');
      b.wire(body, carrier, 'mod');
      widen(b, vca(b, carrier, env(b, 0.002, 2, 0.3, 0.6), 0.85), 1.5);
    },
  },
  // Glass: a bell-pluck for the arpeggio.
  Glass: {
    voices: 6,
    level: 0.5,
    body: (b) => {
      const carrier = b.add('dxop', { ratio: 1 });
      const mod = b.add('dxop', { ratio: 3 });
      b.wire(vca(b, mod, env(b, 0.001, 0.35, 0.05, 0.3), 1.1), carrier, 'mod');
      const air = osc(b, { waveform: TRIANGLE, detune: 12, gain: 0.25 });
      const f = b.add('filter', { mode: LOWPASS, cutoff: 5200, q: 0.7 });
      b.wire(mix(b, carrier, air), f, 'in');
      widen(b, vca(b, f, env(b, 0.002, 0.7, 0.1, 0.5)), 1.6);
    },
  },
  // The dream lead: a sine and a breathy triangle, a late vibrato.
  Dream: {
    voices: 2,
    level: 0.55,
    body: (b) => {
      const vib = b.add('lfo', { rate: 5.2, amount: 0.004 });
      const s = osc(b, { waveform: SINE });
      const t = osc(b, { waveform: TRIANGLE, detune: 12, gain: 0.22 });
      b.wire(vib, s, 'fm');
      b.wire(vib, t, 'fm');
      widen(b, vca(b, mix(b, s, t), env(b, 0.07, 0.6, 0.75, 0.9)), 1.2);
    },
  },
  // The trance sixteenths: a DX saw through a resonant lowpass that a short
  // envelope plucks open, and the note's volume opens further: accents and
  // volume ramps are heard as filter sweeps.
  Seq: {
    voices: 2,
    level: 0.5,
    pan: -0.15,
    body: (b) => {
      const saw = b.add('dxop', { waveform: DX_SAW });
      const f = b.add('filter', { mode: LOWPASS, cutoff: 380, q: 5, modDepth: 1, modDepthScale: 12 });
      b.wire(saw, f, 'in');
      b.wire(env(b, 0.001, 0.14, 0, 0.08), f, 'cutoffMod', 0.6);
      b.wire(b.volume, f, 'cutoffMod', 0.5);
      widen(b, vca(b, f, env(b, 0.002, 0.2, 0.15, 0.1)), 1.4);
    },
  },
  // Far-away bells in the dark: the soundscape's mysterious tones.
  Shimmer: {
    voices: 6,
    level: 0.37,
    body: (b) => {
      const carrier = b.add('dxop', { ratio: 1 });
      const mod = b.add('dxop', { ratio: 3.5 });
      const shimmer = b.add('dxop', { ratio: 2.003, level: 0.35 });
      const index = vca(b, mod, env(b, 0.2, 2, 0.2, 2), 0.9);
      b.wire(index, carrier, 'mod');
      b.wire(index, shimmer, 'mod', 0.4);
      widen(b, vca(b, mix(b, carrier, shimmer), env(b, 0.35, 2, 0.25, 2.6)), 1.8);
    },
  },
  // A star under the pointer: a soft glassy tone that blooms.
  Star: {
    voices: 4,
    level: 0.25,
    body: (b) => {
      const carrier = b.add('dxop', { ratio: 1 });
      const mod = b.add('dxop', { ratio: 2 });
      b.wire(vca(b, mod, env(b, 0.08, 0.8, 0.2, 1), 0.7), carrier, 'mod');
      widen(b, vca(b, carrier, env(b, 0.06, 1.1, 0.35, 1.6)), 1.7);
    },
  },
  // A click's arpeggio: a bright, short pluck that the echo carries away.
  Spark: {
    voices: 6,
    level: 0.29,
    body: (b) => {
      const carrier = b.add('dxop', { ratio: 1 });
      const mod = b.add('dxop', { ratio: 4 });
      b.wire(vca(b, mod, env(b, 0.001, 0.18, 0, 0.15), 1.3), carrier, 'mod');
      widen(b, vca(b, carrier, env(b, 0.001, 0.5, 0, 0.45)), 1.6);
    },
  },
};

export const INSTRUMENT_NAMES = Object.keys(SPECS) as InstrumentName[];

export function buildInstrument(name: InstrumentName): ModularInstrument {
  const spec = SPECS[name];
  const inst = buildPatch(
    `akiar-${name.toLowerCase()}`,
    name,
    { voices: spec.voices, level: spec.level },
    spec.body,
  );
  inst.pan = spec.pan ?? 0;
  return inst;
}
