/**
 * Builds the Akiar score: `public/music/akiar.synthor`, a synthor song with
 * its game settings. The page reads its harmony from the song itself (the
 * pads and bass sounding at the heard row), so edits in synthor carry over.
 *
 *   npm run score         (needs synthor checked out next to this repo)
 *
 * The song opens in synthor's editor like any other: tune it there and keep
 * the edited file, or change these scripts and rebuild.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { strToU8, zipSync } from 'fflate';
import { cueNamed } from '../../../synthor/src/domain/gameMusic';
import {
  DEFAULT_EFFECT_SETTINGS,
  type Cell,
  type ChannelEffect,
  type Doc,
  type MixChannel,
  type ModuleType,
  type Pattern,
  type Section,
  type Track,
} from '../../../synthor/src/domain/types';
import { defaultParams } from '../../../synthor/src/domain/moduleDefs';
import {
  deserializeSong,
  makeSongFile,
  serializeSong,
} from '../../../synthor/src/persist/serialize';
import { GAME } from './game';
import { buildInstrument, INSTRUMENT_NAMES, type InstrumentName } from './instruments';
import { ROWS_PER_BEAT, SECTIONS, T, TRACK_COUNT, writePatterns } from './patterns';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');

const BPM = 84;

/** Which instrument plays each track number */
const TRACK_INSTRUMENT: Record<number, InstrumentName> = {
  [T.kick]: 'Kick',
  [T.brush]: 'Brush',
  [T.ride]: 'Ride',
  [T.tick]: 'Tick',
  [T.bass]: 'Bass',
  ...Object.fromEntries(T.pad.map((t) => [t, 'Nebula'])),
  ...Object.fromEntries(T.keys.map((t) => [t, 'Rhodes'])),
  [T.arp]: 'Glass',
  [T.lead]: 'Dream',
  [T.shimmer]: 'Shimmer',
  ...Object.fromEntries(T.star.map((t) => [t, 'Star'])),
  ...Object.fromEntries(T.spark.map((t) => [t, 'Spark'])),
};

const effect = (id: string, type: ModuleType, params: Record<string, number>): ChannelEffect => ({
  id,
  type,
  params: { ...defaultParams(type), ...params },
});

const channel = (
  id: string,
  name: string,
  volume: number,
  effects: ChannelEffect[],
): MixChannel => ({
  id,
  name,
  kind: id === 'master' ? 'master' : 'sub',
  volume,
  pan: 0,
  mute: false,
  solo: false,
  effects,
});

const CHANNELS: MixChannel[] = [
  // notes play at their written volumes (see carryVolumes): the master makes up the level
  channel('master', 'Master', 1.7, [
    effect('chef_master_comp', 'comp', {
      mode: 1,
      threshold: -16,
      ratio: 2.5,
      attack: 12,
      release: 220,
      knee: 8,
      makeup: 2,
    }),
  ]),
  // One reverb for the whole song, on one sub channel: reverbs are the dearest
  // thing in the mix and phones feel every one. Drums and bass stay dry.
  channel('chan_drums', 'Drums', 1.2, []),
  channel('chan_space', 'Space', 1, [
    effect('chef_space_echo', 'echoS', { time: 9, feedback: 0.4, mix: 0.22, pingpong: 0.75 }),
    effect('chef_space_hall', 'reverb', {
      roomSize: 0.92,
      feedback: 0.62,
      damping: 0.5,
      stereoWidth: 1,
      mix: 0.4,
    }),
  ]),
];

const CHANNEL_OF: Record<InstrumentName, string> = {
  Kick: 'chan_drums',
  Brush: 'chan_drums',
  Ride: 'chan_drums',
  Tick: 'chan_space',
  Bass: 'master',
  Nebula: 'chan_space',
  Rhodes: 'chan_space',
  Glass: 'chan_space',
  Dream: 'chan_space',
  Shimmer: 'chan_space',
  Star: 'chan_space',
  Spark: 'chan_space',
};

/**
 * The sequencer reads a row's volume as 1 when the cell has none and
 * multiplies the voice by it unsmoothed: a soft note jumped to full volume on
 * its hold rows and through its release, a tick on every note. So each note's
 * volume is written on the rows after it until the next note, and the rows
 * before a pattern's first note take its last note's (the pattern loops).
 */
export function carryVolumes(cells: Cell[]): void {
  const last = [...cells].reverse().find((c) => c.note !== null);
  let volume = last?.volume ?? null;
  for (const cell of cells) {
    if (cell.note !== null) volume = cell.volume;
    else if (cell.volume === null) cell.volume = volume;
  }
}

function emptyCell(): Cell {
  return { note: null, volume: null, noteOff: false, hold: false, effectLanes: {} };
}

export function buildDoc(): Doc {
  const instruments = Object.fromEntries(
    INSTRUMENT_NAMES.map((name) => {
      const inst = buildInstrument(name);
      inst.channelId = CHANNEL_OF[name];
      inst.effectSettings = { ...DEFAULT_EFFECT_SETTINGS };
      return [inst.id, inst];
    }),
  );
  const instId = (name: InstrumentName) => `akiar-${name.toLowerCase()}`;

  const tracks: Record<string, Track> = {};
  const patterns: Record<string, Pattern> = {};
  const patternIdByName: Record<string, string> = {};

  for (const spec of writePatterns()) {
    const slug = spec.name.replace(/\s+/g, '-');
    const pid = `pat_${slug}`;
    const length = spec.bars * ROWS_PER_BEAT * 4;
    const trackIds: string[] = [];
    for (let t = 1; t <= TRACK_COUNT; t++) {
      const cells = Array.from({ length }, emptyCell);
      for (const n of spec.notes.get(t) ?? []) {
        cells[n.row] = { ...emptyCell(), note: n.note, volume: Math.round(n.vol * 100) / 100 };
        for (let r = 1; r < n.rows; r++) cells[n.row + r] = { ...emptyCell(), hold: true };
      }
      carryVolumes(cells);
      const tid = `trk_${slug}_${t}`;
      tracks[tid] = { id: tid, instrumentId: instId(TRACK_INSTRUMENT[t]), cells, effectLanes: [] };
      trackIds.push(tid);
    }
    patterns[pid] = { id: pid, name: spec.name, length, trackIds };
    patternIdByName[spec.name] = pid;
  }

  const sections: Record<string, Section> = {};
  for (const [name, pats] of Object.entries(SECTIONS)) {
    const id = `sec_${name}`;
    sections[id] = { id, name, patternIds: pats.map((p) => patternIdByName[p]) };
  }

  const doc: Doc = {
    entities: {
      instruments,
      tracks,
      patterns,
      sections,
      samples: {},
      mixChannels: Object.fromEntries(CHANNELS.map((c) => [c.id, c])),
      mixerInstrumentOrder: INSTRUMENT_NAMES.map(instId),
    },
    tempo: { bpm: BPM, linesPerBeat: ROWS_PER_BEAT },
    patternId: patternIdByName['void A'],
    sectionIds: Object.keys(SECTIONS).map((n) => `sec_${n}`),
    game: GAME,
  };

  return doc;
}

function check(doc: Doc) {
  const cues = [
    GAME.song.start,
    ...GAME.song.sections.map((s) => s.cue),
    ...(GAME.fills ?? []).map((f) => f.cue),
    GAME.levelUp?.cue,
    GAME.fill?.cue,
  ];
  for (const cue of cues)
    if (cue && !cueNamed(doc, cue))
      throw new Error(`cue "${cue}" is in the game settings but not in the song`);
  // a round trip through synthor's loader must keep everything
  const file = makeSongFile(doc, {
    name: 'Akiar',
    createdAt: '2026-11-25T12:00:00.000Z',
    modifiedAt: '2026-11-25T12:00:00.000Z',
  });
  const loaded = deserializeSong(serializeSong(file));
  const sizes = (d: Doc) =>
    Object.values(d.entities)
      .map((e) => (Array.isArray(e) ? e.length : Object.keys(e).length))
      .join(',');
  if (sizes(loaded.doc) !== sizes(doc))
    throw new Error(`the loader changed the song: ${sizes(doc)} → ${sizes(loaded.doc)}`);
  if (!loaded.doc.game || loaded.doc.game.song.sections.length !== GAME.song.sections.length)
    throw new Error('the loader dropped the game settings');
  return file;
}

function main() {
  const doc = buildDoc();
  const file = check(doc);
  const song = serializeSong(file);
  const out = resolve(root, 'public/music/akiar.synthor');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(
    out,
    zipSync({ 'song.json': strToU8(song) }, { level: 9, mtime: new Date('2026-11-25T12:00:00Z') }),
  );
  const notes = Object.values(doc.entities.tracks).reduce(
    (n, t) => n + t.cells.filter((c) => c.note !== null).length,
    0,
  );
  console.log(
    `akiar.synthor: ${Object.keys(doc.entities.patterns).length} patterns, ${Object.keys(doc.entities.sections).length} sections, ${notes} notes, ${BPM} BPM`,
  );
}

main();
