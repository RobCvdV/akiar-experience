/**
 * How much a game's music should give, and which section comes next.
 * The level's progress lifts it slowly, cascades heat it up for a while, a
 * level-up or a chorus that just ended lets it rest, and a little randomness
 * keeps it from playing the same way twice. None of it is strict: the song
 * leans towards the target, its grammar decides what may follow what.
 * Pure: `GameConductor` ticks it every bar and asks at each section's end.
 */
import type { GameSection } from '../../domain/gameMusic';
export type Energy = {
    /** Recent excitement from play (cascades), 0..; fades bar by bar */
    heat: number;
    /** Calm after a peak (a level-up, a chorus), 0..1; fades bar by bar */
    rest: number;
};
export type EnergyEvent = {
    kind: 'reaction';
    nr: number;
} | {
    kind: 'levelUp';
}
/** A section this energetic or more just ended */
 | {
    kind: 'peakEnded';
};
export declare const settled: Energy;
/** Sections at least this energetic are peaks: a rest follows them */
export declare const PEAK_ENERGY = 4;
export declare function afterBar(energy: Energy): Energy;
export declare function onEvent(energy: Energy, event: EnergyEvent): Energy;
/**
 * The energy (1..5) to lean towards: the level's progress (and a little the
 * level) lift it, heat from play pushes it up, rest pulls it down; `noise`
 * (about ±0.3) keeps it alive.
 */
export declare function targetEnergy(energy: Energy, progress: number, level: number, noise: number): number;
/** The energies a section covers: its parts out (the DJ), up to all in */
export declare function energyRange(section: GameSection): [number, number];
/**
 * The section to play after `current`: `prefer` when its grammar allows it
 * (heading for the peak), else one it allows whose energy range is nearest
 * the target; not one heard just now; a tiny random tie-break (`random`
 * returns 0..1).
 */
export declare function chooseSection(sections: GameSection[], current: GameSection, target: number, recent: string[], random: () => number, prefer?: string): GameSection;
/** A stop on the last beat of this bar: at a phrase's end, now and then, when there's energy to stop */
export declare function stopDue(stops: {
    everyBars: number;
    chance: number;
    minEnergy: number;
} | undefined, barInSection: number, energy: number, random: () => number): boolean;
