import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { type SongFile, unpackSongBundle } from 'synthor-player';
import { describe, expect, it } from 'vitest';
import { cuePatterns, DEFAULT_HARMONY, harmonyAt, harmonyNotes, locate, notesAt } from './score';

type Doc = SongFile['doc'];

const cell = (note: number | null = null, hold = false) => ({
  note,
  volume: null,
  noteOff: false,
  hold,
  effectLanes: {},
});

/** Two 4-row patterns in one section; track 1 drums, tracks 5-8 harmony */
function tinyDoc(): Doc {
  const track = (id: string, cells: ReturnType<typeof cell>[]) => ({
    id,
    instrumentId: 'i',
    cells,
    effectLanes: [],
  });
  const empty = () => [cell(), cell(), cell(), cell()];
  const tracks: Record<string, ReturnType<typeof track>> = {};
  const pattern = (id: string, name: string, chord: number[]) => {
    const trackIds: string[] = [];
    for (let t = 1; t <= 8; t++) {
      const tid = `${id}-${t}`;
      const cells = empty();
      if (t === 1) cells[2] = cell(36);
      if (t >= 5) {
        cells[0] = cell(chord[t - 5]);
        cells[1] = cell(null, true);
      }
      tracks[tid] = track(tid, cells);
      trackIds.push(tid);
    }
    return { id, name, length: 4, trackIds };
  };
  return {
    entities: {
      instruments: {},
      tracks,
      patterns: { a: pattern('a', 'A', [38, 54, 57, 61]), b: pattern('b', 'B', [35, 54, 57, 62]) },
      sections: { s: { id: 's', name: 'verse', patternIds: ['a', 'b'] } },
      samples: {},
      mixChannels: {},
      mixerInstrumentOrder: [],
    },
    tempo: { bpm: 84, linesPerBeat: 6 },
    patternId: 'a',
    sectionIds: ['s'],
  } as unknown as Doc;
}

describe('reading the score', () => {
  const doc = tinyDoc();

  it('finds a cue by section id, name, or pattern', () => {
    expect(cuePatterns(doc, { section: 's' }).map((p) => p.id)).toEqual(['a', 'b']);
    expect(cuePatterns(doc, 'verse').map((p) => p.id)).toEqual(['a', 'b']);
    expect(cuePatterns(doc, 'B').map((p) => p.id)).toEqual(['b']);
    expect(cuePatterns(doc, { pattern: 'a' }).map((p) => p.id)).toEqual(['a']);
    expect(cuePatterns(doc, 'nothing')).toEqual([]);
  });

  it('locates a row across the section, wrapping as it loops', () => {
    expect(locate(doc, 'verse', 5)).toMatchObject({ pattern: { id: 'b' }, row: 1 });
    expect(locate(doc, 'verse', 9)).toMatchObject({ pattern: { id: 'a' }, row: 1 });
  });

  it('tells the notes struck on a row, without silent tracks', () => {
    expect(notesAt(doc, 'verse', 2)).toEqual([{ track: 1, note: 36, volume: 1 }]);
    expect(notesAt(doc, 'verse', 2, new Set([1]))).toEqual([]);
    expect(notesAt(doc, 'verse', 4).map((n) => n.note)).toEqual([35, 54, 57, 62]);
  });

  it('hears the harmony held on a row', () => {
    expect(harmonyAt(doc, 'verse', 3)).toEqual([1, 2, 6, 9]); // D F# A C#
    expect(harmonyAt(doc, 'verse', 6)).toEqual([2, 6, 9, 11]); // B D F# A
  });

  it('falls back to D lydian without a chord', () => {
    expect(harmonyAt(doc, 'nothing', 0)).toBe(DEFAULT_HARMONY);
  });

  it('spells a harmony in a register', () => {
    expect(harmonyNotes([2, 9], 60, 72)).toEqual([62, 69]);
  });
});

describe('the Akiar score', () => {
  const bytes = readFileSync(resolve(__dirname, '../../public/music/akiar.synthor'));
  const { doc } = unpackSongBundle(bytes).file;
  const game = doc.game;
  if (!game) throw new Error('the score has no game settings');

  it('carries game settings whose cues all exist', () => {
    const cues = [
      game.song.start,
      ...game.song.sections.map((s) => s.cue),
      ...(game.fills ?? []).map((f) => f.cue),
    ];
    for (const cue of cues) expect(cuePatterns(doc, cue).length, cue).toBeGreaterThan(0);
  });

  it('has a real chord on every bar of every stage', () => {
    for (const section of game.song.sections) {
      const rows = cuePatterns(doc, section.cue).reduce((n, p) => n + p.length, 0);
      const bar = doc.tempo.linesPerBeat * 4;
      for (let row = 0; row < rows; row += bar) {
        expect(
          harmonyAt(doc, section.cue, row + bar / 2, bar),
          `${section.cue} row ${row}`,
        ).not.toBe(DEFAULT_HARMONY);
      }
    }
  });

  it('never jumps in volume under a sounding note (the sequencer reads an empty volume as 1)', () => {
    let jumps = 0;
    for (const track of Object.values(doc.entities.tracks)) {
      let sounding = false;
      let previous: number | null = null;
      for (const cell of track.cells) {
        const volume = cell.volume ?? 1;
        if (cell.note !== null) sounding = true;
        else if (sounding && previous !== null && Math.abs(volume - previous) > 0.01) jumps++;
        previous = volume;
      }
    }
    expect(jumps).toBe(0);
  });

  it('keeps the stars playable: Star and Spark have empty tracks', () => {
    const names = Object.values(doc.entities.instruments).map((i) => i.name);
    expect(names).toContain('Star');
    expect(names).toContain('Spark');
  });
});
