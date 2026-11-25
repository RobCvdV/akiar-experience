/**
 * Completes a song's game settings (`doc.game`) the way completeDoc completes the rest: missing
 * fields get their defaults, and parts whose cue or instrument names nothing in the song are
 * dropped (a section, a mood, a stinger…), so a conductor never asks for music the song lacks.
 * Cues and instruments are referenced by id or name, as the player resolves them.
 */
import type { GameMusic } from '../domain/gameMusic';
/** What the song holds that game settings can name */
export interface GameRefs {
    /** Section and pattern ids and names */
    cues: Set<string>;
    /** Instrument ids and names */
    instruments: Set<string>;
    linesPerBeat: number;
}
/** The completed settings, or undefined when there are none */
export declare function completeGame(raw: unknown, refs: GameRefs): GameMusic | undefined;
