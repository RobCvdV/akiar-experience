import { useEffect, useRef, useState } from 'react';
import { audioOptions } from './music/audioOptions';
import { Music } from './music/Music';
import { Sky } from './visuals/Sky';

/** A star sings again only after this */
const STAR_COOLDOWN_MS = 2600;
/** At most one star tone this often */
const TONE_GAP_MS = 220;
/** A scroll this long after the last one is a new gesture: a new axis */
const NEW_TURN_MS = 450;
/** A touch that moves less than this is a tap */
const TAP_PX = 12;

export function Experience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [started, setStarted] = useState(false);
  const [hint, setHint] = useState(false);
  const [muted, setMuted] = useState(false);
  const musicRef = useRef<Music | null>(null);
  const debugRef = useRef<HTMLPreElement>(null);
  const [options] = useState(() =>
    audioOptions(window.location.search, window.matchMedia('(pointer: coarse)').matches),
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const music = new Music(options.latencyHint);
    musicRef.current = music;
    const sky = new Sky(canvas);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sung = new Map<number, number>();
    let lastTone = 0;
    let lastTurn = 0;
    let harmony: number[] = [];
    let hovered = -1;
    let frame = 0;
    let touched = false;
    const touches = new Map<number, { x: number; y: number; moved: number }>();

    const resize = () =>
      sky.resize(window.innerWidth, window.innerHeight, Math.min(2, window.devicePixelRatio || 1));
    resize();

    const begin = () => {
      if (touched) return;
      touched = true;
      setHint(false);
      setStarted(true);
      music.start().catch((e) => console.error('music', e));
    };

    const near = (x: number, y: number) => {
      const now = performance.now();
      music.gesture('move', now);
      const star = sky.starAt(x, y);
      if (star < 0) {
        hovered = -1;
        return;
      }
      sky.light(star, star === hovered ? 0.5 : 0.75);
      if (star !== hovered) music.gesture('hover', now);
      hovered = star;
      const last = sung.get(star) ?? Number.NEGATIVE_INFINITY;
      if (now - last > STAR_COOLDOWN_MS && now - lastTone > TONE_GAP_MS) {
        sung.set(star, now);
        lastTone = now;
        sky.light(star, 1);
        music.star(sky.heightOf(star), harmony);
      }
    };

    const click = (x: number, y: number) => {
      begin();
      music.gesture('click', performance.now());
      sky.burst(x, y, harmony);
      music.arpeggio(1 - y / window.innerHeight, harmony);
    };

    const turn = (amount: number) => {
      const now = performance.now();
      sky.turn(amount, now - lastTurn > NEW_TURN_MS);
      lastTurn = now;
      music.gesture('scroll', now, Math.min(3, Math.abs(amount) / 60));
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        const t = touches.get(e.pointerId);
        if (t) {
          const d = Math.hypot(e.clientX - t.x, e.clientY - t.y);
          t.moved += d;
          if (t.moved > TAP_PX) turn(d * 2);
          t.x = e.clientX;
          t.y = e.clientY;
        }
      }
      near(e.clientX, e.clientY);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        begin();
        touches.set(e.pointerId, { x: e.clientX, y: e.clientY, moved: 0 });
        near(e.clientX, e.clientY);
        return;
      }
      if (e.button === 0) click(e.clientX, e.clientY);
    };
    const onPointerUp = (e: PointerEvent) => {
      const t = touches.get(e.pointerId);
      touches.delete(e.pointerId);
      if (t && t.moved <= TAP_PX) click(e.clientX, e.clientY);
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      turn(Math.hypot(e.deltaX, e.deltaY) * (e.deltaMode === 1 ? 30 : 1));
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        click(
          window.innerWidth * (0.2 + Math.random() * 0.6),
          window.innerHeight * (0.2 + Math.random() * 0.6),
        );
      } else if (e.key.startsWith('Arrow')) {
        e.preventDefault();
        turn(120);
      }
    };

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', resize);
    const hintTimer = window.setTimeout(() => !touched && setHint(true), 3500);

    // ?debug: what the device makes of it, twice a second
    let frames = 0;
    let readoutAt = 0;
    const readout = (now: number, energy: number, section: string | null) => {
      frames++;
      const el = debugRef.current;
      if (!el || now - readoutAt < 500) return;
      const a = music.audio;
      const fps = Math.round((frames * 1000) / (now - readoutAt));
      el.textContent = [
        `audio ${a.state} ${a.sampleRate} Hz, hint ${options.latencyHint}`,
        `buffer ${(a.baseLatency * 1000).toFixed(1)} ms, output ${(a.outputLatency * 1000).toFixed(1)} ms`,
        `${fps} fps, ${section ?? '-'} ${energy.toFixed(2)}`,
      ].join('\n');
      frames = 0;
      readoutAt = now;
    };

    const loop = (now: number) => {
      const heard = music.tick(now);
      harmony = heard.harmony;
      sky.draw({ ...heard, now, reducedMotion: reduced.matches });
      if (options.debug) readout(now, heard.energy, heard.section);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    if (import.meta.env.DEV || options.debug) Object.assign(window, { __music: music });

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(hintTimer);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', resize);
      music.dispose();
    };
  }, [options]);

  const toggleMute = () => {
    const music = musicRef.current;
    if (!music) return;
    music.setMuted(!music.isMuted);
    setMuted(music.isMuted);
  };

  return (
    <main className="experience">
      <canvas
        ref={canvasRef}
        className="sky"
        aria-label="Een sterrenhemel die op je reageert met muziek"
      />
      {options.debug && <pre ref={debugRef} className="debug" />}
      <p className={`hint ${hint ? 'show' : ''}`} aria-hidden={!hint}>
        raak de sterren aan
      </p>
      {started && (
        <button
          type="button"
          className="mute"
          onClick={toggleMute}
          aria-label={muted ? 'Geluid aan' : 'Geluid uit'}
        >
          {muted ? '○' : '◉'}
        </button>
      )}
    </main>
  );
}
