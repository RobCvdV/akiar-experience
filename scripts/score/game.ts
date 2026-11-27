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
    // the peak is the trance: from 85 % the music heads for the surge into euphoria
    peak: { cue: 'surge', from: 0.85 },
    sections: [
      // jazz: from the dark to the dream
      { cue: 'void', energy: 1, bars: 8, toys: ['shimmer', 'pad'], next: ['nebula', 'pulse'] },
      { cue: 'nebula', energy: 1.4, bars: 8, toys: ['shimmer', 'bass', 'tick'], next: ['void', 'pulse', 'drift'] },
      { cue: 'pulse', energy: 1.8, bars: 8, toys: ['kick', 'tick', 'keys', 'ride', 'shimmer'], next: ['nebula', 'drift', 'afterglow'] },
      { cue: 'drift', energy: 2.3, bars: 8, toys: ['kick', 'brush', 'ride', 'keys', 'arp', 'tick'], next: ['pulse', 'constellation', 'bloom', 'afterglow'] },
      { cue: 'constellation', energy: 2.7, bars: 8, toys: ['brush', 'ride', 'keys', 'arp', 'tick', 'shimmer'], next: ['drift', 'bloom', 'afterglow'] },
      { cue: 'bloom', energy: 2.9, bars: 4, transition: true, next: ['dream'] },
      { cue: 'dream', energy: 3.1, bars: 8, toys: ['brush', 'ride', 'keys', 'arp', 'lead', 'tick'], next: ['ignite', 'constellation', 'afterglow'] },
      // trance: the kick comes in four to the floor and the tempo climbs
      { cue: 'ignite', energy: 3.4, bars: 4, transition: true, next: ['orbit'] },
      { cue: 'orbit', energy: 3.8, bars: 8, toys: ['ride', 'bass', 'tick', 'arp', 'shimmer'], next: ['lift', 'breakdown', 'surge'] },
      { cue: 'lift', energy: 4.3, bars: 8, toys: ['brush', 'ride', 'tick', 'arp', 'keys', 'lead'], next: ['surge', 'breakdown', 'orbit'] },
      { cue: 'surge', energy: 4.6, bars: 4, transition: true, next: ['euphoria'] },
      { cue: 'euphoria', energy: 5, bars: 8, toys: ['brush', 'ride', 'arp', 'keys', 'lead', 'shimmer'], next: ['breakdown', 'lift', 'afterglow'] },
      { cue: 'breakdown', energy: 2.6, bars: 8, toys: ['tick', 'arp', 'lead', 'shimmer'], next: ['surge', 'lift', 'orbit', 'afterglow'] },
      { cue: 'afterglow', energy: 1.5, bars: 4, toys: ['lead', 'ride', 'shimmer'], next: ['void', 'nebula', 'pulse', 'drift'] },
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
