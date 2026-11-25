/**
 * How the page conducts the score (synthor's `GameMusic`, saved as `doc.game`).
 * The page's "progress" is how engaged the listener is; clicks are reactions
 * that heat it up. Energy picks the stage; the void is where it rests.
 */
import type { GameMusic } from '../../../synthor/src/domain/gameMusic';
import { BAR, T } from './patterns';

const toys = {
  kick: [T.kick],
  brush: [T.brush],
  ride: [T.ride],
  tick: [T.tick],
  bass: [T.bass],
  pad: [...T.pad],
  keys: [...T.keys],
  arp: [T.arp],
  lead: [T.lead],
  shimmer: [T.shimmer],
};

export const GAME: GameMusic = {
  bar: BAR,
  song: {
    start: 'void',
    peak: { cue: 'bloom', from: 0.85 },
    sections: [
      { cue: 'void', energy: 1.2, bars: 8, toys: ['shimmer', 'pad'], next: ['nebula', 'pulse'] },
      {
        cue: 'nebula',
        energy: 1.9,
        bars: 8,
        toys: ['shimmer', 'bass', 'tick'],
        next: ['void', 'pulse', 'drift'],
      },
      {
        cue: 'pulse',
        energy: 2.6,
        bars: 8,
        toys: ['kick', 'tick', 'keys', 'ride', 'shimmer'],
        next: ['nebula', 'drift', 'afterglow'],
      },
      {
        cue: 'drift',
        energy: 3.3,
        bars: 8,
        toys: ['kick', 'brush', 'ride', 'keys', 'arp', 'tick'],
        next: ['pulse', 'constellation', 'bloom', 'afterglow'],
      },
      {
        cue: 'constellation',
        energy: 4,
        bars: 8,
        toys: ['brush', 'ride', 'keys', 'arp', 'tick', 'shimmer'],
        next: ['drift', 'bloom', 'afterglow'],
      },
      { cue: 'bloom', energy: 4.3, bars: 4, transition: true, next: ['dream'] },
      {
        cue: 'dream',
        energy: 5,
        bars: 8,
        toys: ['brush', 'ride', 'keys', 'arp', 'lead', 'tick'],
        next: ['afterglow', 'constellation', 'drift'],
      },
      {
        cue: 'afterglow',
        energy: 1.7,
        bars: 4,
        toys: ['lead', 'ride', 'shimmer'],
        next: ['void', 'nebula', 'pulse', 'drift'],
      },
    ],
  },
  dj: { groups: toys, phraseBars: 4, fadeBars: 2, stays: [1, 1, 2] },
  moods: {},
  fill: { cue: 'fill-swing', minCascade: 4, minBarsApart: 8, minEnergy: 3 },
  levelUp: { cue: 'rise' },
  fills: [
    { cue: 'fill-swing', goes: 'level', minEnergy: 3 },
    { cue: 'fill-shimmer', goes: 'level', maxEnergy: 3 },
    { cue: 'rise', goes: 'up' },
    { cue: 'fall', goes: 'down' },
  ],
  drops: { hush: [T.kick, T.brush, T.ride, T.tick, T.bass] },
  stops: { tracks: [T.kick, T.brush, T.bass], everyBars: 4, chance: 0.25, minEnergy: 3 },
  stingers: {},
};
