/**
 * The music: the Akiar score in synthor's player, conducted from what the
 * listener does. The page reports gestures and asks, every frame, what is
 * heard: the beat, the energy, the harmony and the notes just struck.
 */
import {
  type Cue,
  GameConductor,
  type GameMusic,
  type SongFile,
  SongPlayer,
  unpackSongBundle,
} from 'synthor-player';
import {
  decay,
  type Engagement,
  type Gesture,
  gesture,
  initialEngagement,
  isIdle,
} from './engagement';
import { clickArpeggio, type PhraseNote, starTone } from './phrases';
import { DEFAULT_HARMONY, harmonyAt, notesAt, type StartedNote } from './score';

export const SCORE_URL = `${import.meta.env.BASE_URL}music/akiar.synthor`;

export interface Heard {
  playing: boolean;
  /** 0..1 within the beat / bar, as heard */
  beatPhase: number;
  barPhase: number;
  beat: number;
  /** The section's energy, 1..5, eased; 0 before the music */
  energy: number;
  section: string | null;
  harmony: number[];
  /** Notes struck since the last frame */
  struck: StartedNote[];
  /** How engaged the listener is, 0..1 */
  awake: number;
}

const SILENT: Heard = {
  playing: false,
  beatPhase: 0,
  barPhase: 0,
  beat: 0,
  energy: 0,
  section: null,
  harmony: DEFAULT_HARMONY,
  struck: [],
  awake: 0,
};

const PROGRESS_EVERY_MS = 400;
const IDLE_NUDGE_MS = 20000;

export class Music {
  private player = new SongPlayer();
  private conductor: GameConductor | null = null;
  private doc: SongFile['doc'] | null = null;
  private game: GameMusic | null = null;
  private loading: Promise<void>;
  private engagement: Engagement = initialEngagement;
  private lastTick = 0;
  private lastProgressAt = 0;
  private lastNudgeAt = 0;
  private level = 1;
  private lastSection: string | null = null;
  private lastRow: { cue: string; row: number } | null = null;
  private energy = 0;
  private muted = false;
  started = false;

  constructor(url = SCORE_URL) {
    this.loading = fetch(url)
      .then((r) => r.arrayBuffer())
      .then(async (bytes) => {
        this.doc = unpackSongBundle(bytes).file.doc;
        this.game = this.doc.game ?? null;
        await this.player.load(bytes);
      });
  }

  /** From a user gesture (autoplay policy) */
  async start(): Promise<void> {
    if (this.started) return;
    this.started = true;
    await this.loading;
    await this.player.start();
    if (!this.game) throw new Error('the score has no game settings');
    this.conductor = new GameConductor(this.player, this.game);
    this.conductor.setMood('play');
    this.conductor.setProgress(this.level, this.engagement.progress);
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    this.player.setVolume(muted ? 0 : 1);
  }

  get isMuted() {
    return this.muted;
  }

  gesture(kind: Gesture, now: number, strength = 1) {
    this.engagement = gesture(this.engagement, kind, now, strength);
    if (kind === 'click') this.conductor?.reaction(this.engagement.streak);
    else if (kind !== 'move') this.conductor?.nudge();
  }

  /** A star near the pointer steps out of the harmony; `height` 0 (bottom)..1 (top) */
  star(height: number, harmony: number[]) {
    this.play('Star', [starTone(harmony, height, Math.random)]);
  }

  /** A click's arpeggio, from its height */
  arpeggio(height: number, harmony: number[]): number {
    const phrase = clickArpeggio(harmony, height, Math.random);
    this.play('Spark', phrase);
    return phrase.length;
  }

  private play(instrument: string, phrase: PhraseNote[]) {
    if (!this.conductor || this.muted) return;
    for (const n of phrase) {
      this.player.playNote(instrument, n.note, {
        at: 'row',
        delayRows: n.delayRows,
        rows: n.rows,
        velocity: n.velocity,
      });
    }
  }

  /** Once a frame: conducts and tells what is heard */
  tick(now: number): Heard {
    const dt = this.lastTick ? Math.min(250, now - this.lastTick) : 0;
    this.lastTick = now;
    this.engagement = decay(this.engagement, now, dt);
    const conductor = this.conductor;
    if (!conductor || !this.doc || !this.game)
      return { ...SILENT, awake: this.engagement.progress };

    if (now - this.lastProgressAt > PROGRESS_EVERY_MS) {
      this.lastProgressAt = now;
      conductor.setProgress(this.level, this.engagement.progress);
    }
    // left alone, a section that has had its time moves on (towards the calm)
    if (isIdle(this.engagement, now) && now - this.lastNudgeAt > IDLE_NUDGE_MS) {
      this.lastNudgeAt = now;
      conductor.nudge();
    }

    const snap = conductor.snapshot();
    if (snap.section !== this.lastSection) {
      // each dream heard makes the next one reachable again (the peak comes once per level)
      if (this.lastSection === 'dream') this.level = Math.min(6, this.level + 1);
      this.lastSection = snap.section;
    }
    const section = this.game.song.sections.find((s) => s.cue === snap.section);
    const quietParts = (snap.visit?.out.length ?? 0) + (snap.visit?.cut.length ?? 0);
    const target = section ? section.energy - 0.25 * quietParts : 1;
    this.energy += (target - this.energy) * Math.min(1, dt / 2500);

    const pos = conductor.position();
    if (!pos)
      return {
        ...SILENT,
        energy: this.energy,
        section: snap.section,
        awake: this.engagement.progress,
      };
    const cue: Cue = pos.cue;
    const key = JSON.stringify(cue);
    const row = Math.floor(pos.row);
    const struck: StartedNote[] = [];
    const silent = this.silentTracks(snap.visit?.out ?? [], snap.visit?.cut ?? [], section?.muted);
    if (this.lastRow && this.lastRow.cue === key) {
      const gap = row - this.lastRow.row;
      if (gap > 0 && gap < 8)
        for (let r = this.lastRow.row + 1; r <= row; r++)
          struck.push(...notesAt(this.doc, cue, r, silent));
    } else {
      struck.push(...notesAt(this.doc, cue, row, silent));
    }
    this.lastRow = { cue: key, row };
    return {
      playing: true,
      beatPhase: pos.beatPhase,
      barPhase: pos.barPhase,
      beat: pos.beat,
      energy: this.energy,
      section: snap.section,
      harmony: harmonyAt(this.doc, cue, row),
      struck,
      awake: this.engagement.progress,
    };
  }

  private silentTracks(out: string[], cut: string[], muted: number[] = []): Set<number> {
    const groups = this.game?.dj.groups ?? {};
    return new Set([...muted, ...[...out, ...cut].flatMap((g) => groups[g] ?? [])]);
  }

  /** For the console: `__music.snapshot()` */
  snapshot() {
    return {
      engagement: this.engagement,
      level: this.level,
      conductor: this.conductor?.snapshot() ?? null,
    };
  }

  dispose() {
    this.conductor?.dispose();
    this.player.stop();
  }
}
