import { type GameMusic } from '../domain/gameMusic';
import type { CueStep } from '../player/cues';
import { type Energy } from '../player/game/energy';
import { type DjMove, type DjVisit } from '../player/game/dj';
import type { Cue } from '../player/cues';
import type { MusicPosition, NoteTiming, RowEvent } from './SongPlayer';
/** What the conductor needs of a player — a `SongPlayer` (a fake in tests). */
export interface ConductedPlayer {
    queue(steps: CueStep[]): Promise<void>;
    stop(): void;
    setMutedTracks(trackNumbers: Iterable<number>): void;
    setTrackLevel(trackNumber: number, level: number, fadeSeconds?: number): void;
    trackLevel(trackNumber: number): number;
    playNote(instrument: string, note: number, timing?: NoteTiming): void;
    position(perfNow?: number): MusicPosition | null;
    timeUntil(unit: 'row' | 'beat' | 'bar', perfNow?: number): number | null;
    onRow(listener: (e: RowEvent) => void): () => void;
    onCue(listener: (cue: Cue) => void): () => void;
}
export interface GameConductorOptions {
    /** 0..1; `Math.random` by default. Never a game's seeded random: drawing from it would change its boards. */
    random?: () => number;
    /** Where the conductor reports what it does (sections, DJ moves) */
    log?: (...args: unknown[]) => void;
}
/** What the conductor is doing, for a readout */
export interface ConductorSnapshot {
    mood: string;
    section: string;
    sounding: string | null;
    visit: DjVisit | null;
    due: boolean;
    nudged: boolean;
    energy: Energy;
    /** The energy the music leans towards now */
    target: number;
    level: number;
    progress: number;
    lastMove: DjMove | null;
}
/**
 * Conducts a song for a game from the song's game settings (`GameMusic`):
 * the game sets the mood and the level's progress and reports what the
 * player does; the conductor picks the sections by energy, lets a DJ play
 * with each one for a good while (moving on when the player does something,
 * or at once on a level-up), and plays fills, drops and stingers.
 */
export declare class GameConductor {
    private player;
    private music;
    private state;
    private visit;
    /** The player did something since the visit fell due: time to move on */
    private nudged;
    private recentSections;
    private energy;
    /** The section's own nudge to the energy, drawn when it was chosen */
    private sectionNoise;
    /** The latest row, so a repeated row event doesn't count a bar twice */
    private lastRow;
    private lastMove;
    /** What is playing (or handing over to); null when silent */
    private sounding;
    /** The cue heard now, for its layers */
    private heard;
    /** Tracks cut until a timer brings them back */
    private dropped;
    /** The muted tracks heard last, without the drop */
    private layers;
    /** While a fill plays: the mutes of the mix it broke into (its levels stay too) */
    private heldLayers;
    /** The fill playing lands on more (it doesn't go down) */
    private landing;
    /** The level the song last headed for its peak in: once per level */
    private peakedLevel;
    private lastFillAt;
    private enabled;
    private timers;
    private dropTimer;
    private unsubscribe;
    private random;
    private log;
    constructor(player: ConductedPlayer, music: GameMusic, options?: GameConductorOptions);
    /** Stop listening to the player and drop pending timers. */
    dispose(): void;
    /**
     * `play` (the song's sections) or one of the song's moods. Play entered
     * from a mood that doesn't return starts the song over from its first
     * section, through the intro.
     */
    setMood(mood: string): void;
    /** The level and how far along it is (0..1) */
    setProgress(level: number, progress: number): void;
    /** Silent while off (a game's music setting); on again it picks up the mood */
    setEnabled(enabled: boolean): void;
    /** A reaction in a cascade (1-based within the turn), collecting `sets` sets */
    reaction(nr: number, sets?: number): void;
    /** The `index`-th key (0-based) of a run (collected keys) */
    key(index: number): void;
    /** A new level: its stinger and a fill into a new section, where the music takes a breath */
    levelUp(level: number): void;
    /** Play a stinger by name (an unlock, an achievement…) */
    stinger(name: string): void;
    /** The player did something that counts: a due section moves on at the next bar */
    nudge(): void;
    /**
     * Cut a drop's tracks until the next bar, or the one after when the next
     * is less than `minBars` away: they come back on the downbeat
     */
    drop(name: string, minBars?: number): void;
    /** The music is playing and answers the game: effects it covers can stay quiet */
    get conducting(): boolean;
    get mood(): string;
    /** Where the music is as heard now, or null when none plays */
    position(): MusicPosition | null;
    snapshot(): ConductorSnapshot;
    /** A new run of play starts the song from its first section, settled */
    private startSong;
    /** Near a level's end, until the song has headed for its peak in this level */
    private get headingForPeak();
    private get liveEnergy();
    private get barSeconds();
    /**
     * Every bar, a beat before it ends: the energy settles a little and the
     * visit counts the bar. A due section moves on once the player has done
     * something (a transition at once); otherwise at each phrase's end the DJ
     * makes its move for the next phrase, and now and then the phrase's last
     * beat stops.
     */
    private onRow;
    private onCue;
    private isFill;
    /** A fill landed on the section: unless it went down, a part comes back (hard, on the downbeat) */
    private land;
    /** On to the next section: the one nearest the energy that may follow */
    private moveOn;
    /** Every track the DJ plays with */
    private get djTracks();
    /**
     * The visit's parts on the next bar: fading over `dj.fadeBars`, a cut (and
     * its return, `before` was the visit's last phrase) hard on the downbeat.
     * Without `before` they're set at once: a section starting, or anything
     * else (a mood, a fill, the intro) playing with every part in.
     */
    private playVisit;
    private dropUntilBar;
    private update;
    private run;
    /** The heard cue's mutes, with the drop on top */
    private applyMutes;
    private playStinger;
    private later;
    private clear;
}
