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
import type { LatencyHint } from './audioOptions';
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
import { easeBpm, targetBpm } from './tempo';

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
/** How often the eased tempo is sent to the player */
const TEMPO_EVERY_MS = 150;
const IDLE_NUDGE_MS = 20000;

export class Music {
  private context: AudioContext | null = null;
  private player: SongPlayer | null = null;
  private conductor: GameConductor | null = null;
  private doc: SongFile['doc'] | null = null;
  private game: GameMusic | null = null;
  private bytes: Promise<ArrayBuffer>;
  private latencyHint: LatencyHint;
  private engagement: Engagement = initialEngagement;
  private lastTick = 0;
  private lastProgressAt = 0;
  private lastNudgeAt = 0;
  private level = 1;
  private lastSection: string | null = null;
  private lastRow: { cue: string; row: number } | null = null;
  private energy = 0;
  private bpm = 0;
  private sentBpm = 0;
  private lastTempoAt = 0;
  private muted = false;
  started = false;
  /** Why the music could not start, if it could not */
  failure: string | null = null;

  constructor(latencyHint: LatencyHint = 'interactive', url = SCORE_URL) {
    this.latencyHint = latencyHint;
    // the score loads at once; the audio waits for the listener's tap
    this.bytes = fetch(url)
      .then((r) => r.arrayBuffer())
      .then((bytes) => {
        this.doc = unpackSongBundle(bytes).file.doc;
        this.game = this.doc.game ?? null;
        return bytes;
      });
  }

  /**
   * Call straight from a tap or click handler: iOS only lets audio start
   * inside one, so the context is made and resumed before anything awaits.
   */
  start(): Promise<void> {
    if (this.started) return Promise.resolve();
    this.started = true;
    const context = makeContext(this.latencyHint);
    this.context = context;
    void context.resume();
    unlock(context);
    return this.begin(context).catch((e: unknown) => {
      this.failure = e instanceof Error ? e.message : String(e);
      throw e;
    });
  }

  private async begin(context: AudioContext): Promise<void> {
    const player = new SongPlayer({ audioContext: context });
    this.player = player;
    await player.load(await this.bytes);
    await player.start();
    if (this.muted) player.setVolume(0);
    if (!this.game) throw new Error('the score has no game settings');
    this.conductor = new GameConductor(player, this.game);
    this.conductor.setMood('play');
    this.conductor.setProgress(this.level, this.engagement.progress);
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    this.player?.setVolume(muted ? 0 : 1);
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
    const player = this.player;
    if (!player) return;
    // phrases count in sixths of a beat; the song may have finer rows
    const k = (this.doc?.tempo.linesPerBeat ?? 6) / 6;
    for (const n of phrase) {
      player.playNote(instrument, n.note, {
        at: 'row',
        delayRows: n.delayRows * k,
        rows: n.rows * k,
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
      // each peak heard makes the next one reachable again (the peak comes once per level)
      if (this.lastSection === 'euphoria') this.level = Math.min(6, this.level + 1);
      this.lastSection = snap.section;
    }
    this.followTempo(snap.section, now, dt);
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
      harmony: harmonyAt(this.doc, cue, row, this.doc.tempo.linesPerBeat * 4),
      struck,
      awake: this.engagement.progress,
    };
  }

  /** Ease the tempo towards the section's; the player retunes live, no restart */
  private followTempo(section: string | null, now: number, dt: number) {
    const player = this.player;
    if (!player || !this.doc) return;
    const songBpm = this.doc.tempo.bpm;
    if (this.bpm === 0) this.bpm = songBpm;
    this.bpm = easeBpm(this.bpm, targetBpm(section, songBpm), dt);
    if (Math.abs(this.bpm - this.sentBpm) > 0.05 && now - this.lastTempoAt > TEMPO_EVERY_MS) {
      this.lastTempoAt = now;
      this.sentBpm = this.bpm;
      player.setTempo(this.bpm);
    }
  }

  private silentTracks(out: string[], cut: string[], muted: number[] = []): Set<number> {
    const groups = this.game?.dj.groups ?? {};
    return new Set([...muted, ...[...out, ...cut].flatMap((g) => groups[g] ?? [])]);
  }

  /** What the browser made of the audio settings */
  get audio() {
    const c = this.context;
    if (!c) return { state: 'not started', sampleRate: 0, baseLatency: 0, outputLatency: 0 };
    return {
      state: c.state,
      sampleRate: c.sampleRate,
      baseLatency: c.baseLatency ?? 0,
      outputLatency: c.outputLatency ?? 0,
    };
  }

  /** For the console: `__music.snapshot()` */
  snapshot() {
    return {
      engagement: this.engagement,
      level: this.level,
      bpm: this.bpm,
      conductor: this.conductor?.snapshot() ?? null,
    };
  }

  dispose() {
    this.conductor?.dispose();
    this.player?.stop();
    void this.context?.close();
  }
}

/** An AudioContext with the hint, or without one where the browser refuses it */
function makeContext(latencyHint: LatencyHint): AudioContext {
  try {
    return new AudioContext({ latencyHint });
  } catch {
    return new AudioContext();
  }
}

/**
 * iOS: play through the silent switch like a media player, and wake the
 * output with a moment of silence while still inside the tap.
 */
function unlock(context: AudioContext) {
  const session = (navigator as Navigator & { audioSession?: { type: string } }).audioSession;
  if (session) session.type = 'playback';
  const source = context.createBufferSource();
  source.buffer = context.createBuffer(1, 1, context.sampleRate);
  source.connect(context.destination);
  source.start();
}
