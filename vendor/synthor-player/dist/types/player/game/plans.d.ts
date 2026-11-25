/**
 * What a game's music plays for what's happening: the target cue for a mood
 * (or the song's current section in `play`), and the plans that get there:
 * the intro into play, a section entered its own way, play carrying on after
 * an interruption, fills and level-ups. Pure: `GameConductor` turns plans into
 * `SongPlayer` calls.
 */
import type { CueStep } from '../cues';
import { type GameFill, type GameMusic, type GameSection, type GameStinger } from '../../domain/gameMusic';
export interface GameMusicState {
    /** `play` (the sections) or one of `moods` */
    mood: string;
    level: number;
    /** Level progress, 0..1 */
    progress: number;
    /** The song section playing (by cue) */
    section: string;
}
/** What should be sounding: a cue and its layers, and how to enter it */
export interface MusicTarget {
    mood: string;
    cue: string;
    muted: number[];
    via?: string;
    /** A mood's hit: played at once before the cue */
    hit?: string;
    resume?: boolean;
}
export type MusicPlan = 
/** Cues to play, each after the one before sounds; `lands`: a fill that lands on more */
{
    kind: 'cues';
    steps: CueStep[];
    lands?: boolean;
}
/** Same cue: only the layers change */
 | {
    kind: 'layers';
    muted: number[];
};
/** The section by cue, or the song's first; undefined when the song has none */
export declare function sectionFor(music: GameMusic, cue: string): GameSection | undefined;
/** The target for a state; null for a mood the song has no music for */
export declare function targetFor(music: GameMusic, state: GameMusicState): MusicTarget | null;
/**
 * How to get from what sounds (null: silence) to `to`; null when nothing
 * changes. Play starts through the intro, a section is entered its own way,
 * and play coming back after a mood that `returns` (danger) carries on where
 * it would have been, so the song's progression goes on underneath.
 */
export declare function planChange(music: GameMusic, from: MusicTarget | null, to: MusicTarget): MusicPlan | null;
/** Where the music goes from one section to another */
export declare function direction(from: GameSection | undefined, to: GameSection | undefined): GameFill['goes'];
/** A fill from `fills` going that way and fitting a section of `energy`, at random among those that do */
export declare function pickFill(music: GameMusic, goes: GameFill['goes'], energy: number, random: () => number): string | undefined;
/**
 * A fill for a cascade of `reactions`, `barsSinceFill` after the last one,
 * standing in for a bar of the section; null when none fits
 */
export declare function fillPlan(music: GameMusic, sounding: MusicTarget | null, reactions: number, barsSinceFill?: number, random?: () => number): MusicPlan | null;
/**
 * A level-up: a fill on the next bar going where the music goes (else the
 * level-up's own), then `next` (a new section, from its top) or, without one,
 * the section carrying on
 */
export declare function levelUpPlan(music: GameMusic, sounding: MusicTarget | null, next?: string, random?: () => number): MusicPlan | null;
/** Every cue a fill may play */
export declare function fillCues(music: GameMusic): Set<string>;
/** Layers for a cue that just started sounding: the target's, or every track for a passing cue */
export declare function layersFor(target: MusicTarget | null, cue: unknown): number[];
/** The `nth` note (1-based) of a climbing stinger; past the top it holds the top note */
export declare function nthNote(stinger: GameStinger, nth: number): number;
/** A cascade's notes: one per reaction, a combo of `sets` runs up the scale from it (3 notes at most) */
export declare function cascadeNotes(stinger: GameStinger, reaction: number, sets?: number): number[];
