/**
 * A DJ for a game's music: plays with a section the way a DJ would. A visit lasts a few
 * times the section's length; phrase by phrase the DJ fades a part in or
 * out, swaps one for another (the chords out, the arp up), cuts the drums
 * for a phrase and slams them back, or lets it ride. The energy the game asks
 * for only leans it fuller or sparser. When the visit's time is up the
 * section is due, but it plays on until the player does something; a
 * level-up moves on at once. Pure: `GameConductor` plays the moves.
 */
import type { DjRules, GameSection } from '../../domain/gameMusic';
export type { DjRules };
export type DjVisit = {
    section: string;
    /** Bars played in this visit */
    bars: number;
    /** Bars it stays before it's due to move on */
    stay: number;
    /** Parts faded out */
    out: string[];
    /** Parts cut for one phrase: they come back hard on the next */
    cut: string[];
    /** The part moved last, so the next move tends to pick another */
    last?: string;
};
export type DjMove = {
    kind: 'hold';
} | {
    kind: 'in';
    part: string;
} | {
    kind: 'out';
    part: string;
} | {
    kind: 'swap';
    out: string;
    in: string;
} | {
    kind: 'cut';
    part: string;
};
/** The share of a section's parts (0..1) that suits the energy */
export declare function fullness(section: GameSection, energy: number): number;
/**
 * A new visit: how long it stays, and which parts start out (fewer the more
 * energy there is, never all of them; none when it lands after a build-up,
 * `full`)
 */
export declare function startVisit(section: GameSection, rules: DjRules, energy: number, random: () => number, full?: boolean): DjVisit;
/** The time is up: the section moves on at the player's next move that counts */
export declare function isDue(visit: DjVisit): boolean;
/**
 * The DJ's move for the next phrase: in when there's less than the energy
 * asks for, out (or a drum cut) when there's more, a swap now and then; but
 * mostly it lets the groove ride a while
 */
export declare function nextMove(visit: DjVisit, section: GameSection, energy: number, random: () => number): DjMove;
/** The visit after a move: a cut part is back for the phrase after its own */
export declare function applyMove(visit: DjVisit, move: DjMove): DjVisit;
/**
 * A fill lands: the build-up pays off with more. A cut part slams back, else a
 * faded one comes in; with everything in, the section just carries on
 */
export declare function landingMove(visit: DjVisit, random: () => number): DjMove;
/** Every track's level (0 or 1) in a visit: the parts out or cut are silent */
export declare function visitLevels(visit: DjVisit, rules: DjRules): Map<number, number>;
