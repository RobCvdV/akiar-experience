/**
 * Draws the sky on a canvas: a nebula and waves of coloured gas (on a small
 * canvas, scaled up soft), the stars, and the ripples of clicks. Everything
 * it shows follows `SkyFrame`: what the listener does and what is heard.
 */
import type { StartedNote } from '../music/score';
import {
  axisAngle,
  easeHue,
  harmonyHue,
  IDENTITY,
  makeStars,
  multiply,
  nearest,
  normalize,
  type Projected,
  pcHue,
  project,
  type Quat,
  randomAxis,
  rotate,
  type Star,
  type Vec3,
} from './space';

export interface SkyFrame {
  now: number;
  /** 1..5 once the music plays, 0 before */
  energy: number;
  beatPhase: number;
  barPhase: number;
  playing: boolean;
  harmony: number[];
  struck: StartedNote[];
  /** How much of the sky the listener has woken, 0..1 */
  awake: number;
  reducedMotion: boolean;
}

interface Ripple {
  x: number;
  y: number;
  born: number;
  hue: number;
  strength: number;
}

interface Cloud {
  x: number;
  y: number;
  r: number;
  hueShift: number;
  speed: number;
  phase: number;
}

const STAR_COUNT = 520;
const SPRITE = 64;
const HUE_SPRITES = 24;
/** Strokes per wave: more makes softer edges */
const WAVE_LAYERS = 9;

export class Sky {
  private ctx: CanvasRenderingContext2D;
  private gas = document.createElement('canvas');
  private gasCtx: CanvasRenderingContext2D;
  private sprites: HTMLCanvasElement[] = [];
  private stars: Star[] = makeStars(STAR_COUNT, Math.random);
  /** Extra light per star: hover, notes, clicks */
  private flare = new Float32Array(STAR_COUNT);
  private projected: Projected[] = [];
  private orientation: Quat = IDENTITY;
  private spinAxis: Vec3 = randomAxis(Math.random);
  private spin = 0;
  private spinDir = 1;
  private drift: Vec3 = randomAxis(Math.random);
  private offset = { x: 0, y: 0, vx: 0, vy: 0 };
  private ripples: Ripple[] = [];
  private clouds: Cloud[] = [];
  private hue = 250;
  private breath = 0;
  private hit = 0;
  private dpr = 1;
  private lastNow = 0;

  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    const gasCtx = this.gas.getContext('2d');
    if (!ctx || !gasCtx) throw new Error('no 2d canvas');
    this.ctx = ctx;
    this.gasCtx = gasCtx;
    for (let i = 0; i < HUE_SPRITES; i++) this.sprites.push(starSprite((i * 360) / HUE_SPRITES));
    for (let i = 0; i < 7; i++) {
      this.clouds.push({
        x: Math.random(),
        y: Math.random(),
        r: 0.25 + Math.random() * 0.35,
        hueShift: (Math.random() - 0.5) * 60,
        speed: 0.00003 + Math.random() * 0.00005,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  resize(width: number, height: number, dpr: number) {
    this.dpr = dpr;
    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(height * dpr);
    this.gas.width = Math.max(32, Math.round(width / 2));
    this.gas.height = Math.max(32, Math.round(height / 2));
  }

  /** Scroll or swipe: turn the sky about a random axis, in a random direction, and slide it */
  turn(amount: number, fresh: boolean) {
    if (fresh) {
      this.spinAxis = randomAxis(Math.random);
      this.spinDir = Math.random() < 0.5 ? -1 : 1;
      this.spin *= 0.3;
      const a = Math.random() * Math.PI * 2;
      this.drift = [Math.cos(a), Math.sin(a), 0];
    }
    const a = Math.min(Math.abs(amount), 400);
    this.spin = clamp(this.spin + this.spinDir * a * 0.00004, -0.004, 0.004);
    this.offset.vx += this.drift[0] * a * 0.004;
    this.offset.vy += this.drift[1] * a * 0.004;
  }

  /** The star under (x, y) in css px, or -1 */
  starAt(x: number, y: number, radius = 46): number {
    return nearest(this.projected, x * this.dpr, y * this.dpr, radius * this.dpr);
  }

  /** 0 (bottom) .. 1 (top) */
  heightOf(star: number): number {
    const p = this.projected[star];
    return p ? 1 - clamp(p.y / this.canvas.height, 0, 1) : 0.5;
  }

  light(star: number, amount: number) {
    if (star >= 0) this.flare[star] = Math.max(this.flare[star], amount);
  }

  /** A click: a ripple, and the stars around it flare */
  burst(x: number, y: number, harmony: number[]) {
    const px = x * this.dpr;
    const py = y * this.dpr;
    this.ripples.push({ x: px, y: py, born: this.lastNow, hue: harmonyHue(harmony), strength: 1 });
    const reach = 160 * this.dpr;
    this.projected.forEach((p, i) => {
      if (!p.visible) return;
      const d = Math.hypot(p.x - px, p.y - py);
      if (d < reach) this.light(i, 0.9 * (1 - d / reach));
    });
  }

  draw(f: SkyFrame) {
    const dt = this.lastNow ? Math.min(64, f.now - this.lastNow) : 16;
    this.lastNow = f.now;
    const ctx = this.ctx;
    const canvas = this.canvas;
    const W = canvas.width;
    const H = canvas.height;
    const motion = f.reducedMotion ? 0.25 : 1;
    const groove = clamp((f.energy - 2.2) / 2.8, 0, 1);
    // the trance stages (energy past the dream): brighter, faster, more colour
    const trance = clamp((f.energy - 3.3) / 1.5, 0, 1);
    const beatEnv = f.playing ? (1 - f.beatPhase) ** 4 : 0;

    this.react(f);
    this.hue = easeHue(this.hue, harmonyHue(f.harmony), Math.min(1, dt / 1800));
    this.breath *= 0.94 ** (dt / 16);
    this.hit *= 0.88 ** (dt / 16);

    // the sky turns: a slow drift that grows with the groove, plus what the listener spun
    this.spin *= 0.985 ** (dt / 16);
    const idleSpin = 0.000012 + groove * 0.00005 + trance * 0.00008;
    const turnBy = (this.spin + idleSpin) * dt * motion;
    this.orientation = normalize(multiply(axisAngle(this.spinAxis, turnBy), this.orientation));
    this.offset.x += this.offset.vx * dt * motion;
    this.offset.y += this.offset.vy * dt * motion;
    this.offset.vx *= 0.96 ** (dt / 16);
    this.offset.vy *= 0.96 ** (dt / 16);
    // and slides back home slowly
    this.offset.x *= 0.995 ** (dt / 16);
    this.offset.y *= 0.995 ** (dt / 16);

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#020309';
    ctx.fillRect(0, 0, W, H);

    this.drawGas(f, groove, trance);
    ctx.globalCompositeOperation = 'lighter';
    ctx.imageSmoothingEnabled = true;
    ctx.globalAlpha = 1;
    ctx.drawImage(this.gas, 0, 0, W, H);

    // stars
    const focal = Math.min(W, H) * 0.9;
    const cx = W / 2 + this.offset.x * this.dpr;
    const cy = H / 2 + this.offset.y * this.dpr;
    const t = f.now / 1000;
    const wake = 0.55 + 1.1 * f.awake + 0.12 * Math.max(0, f.energy - 1) + 0.6 * trance;
    const dance = groove * motion;
    this.projected = this.stars.map((s, i) => {
      let v = rotate(this.orientation, s.pos);
      if (dance > 0) {
        // each star sways on the beat, in its own phase; bars swell the sky
        const sway = Math.sin(f.beatPhase * Math.PI * 2 + s.phase) * 0.018 * dance;
        const swell =
          1 + Math.sin(f.barPhase * Math.PI * 2) * 0.01 * dance + beatEnv * 0.008 * dance;
        v = [
          v[0] * swell + sway,
          v[1] * swell + Math.cos(f.beatPhase * Math.PI * 2 + s.phase) * 0.012 * dance,
          v[2],
        ];
      }
      const p = project(v, cx, cy, focal);
      this.flare[i] *= 0.955 ** (dt / 16);
      return p;
    });

    for (let i = 0; i < this.stars.length; i++) {
      const p = this.projected[i];
      if (!p.visible || p.x < -40 || p.y < -40 || p.x > W + 40 || p.y > H + 40) continue;
      const s = this.stars[i];
      const twinkle = 0.65 + 0.35 * Math.sin(t * s.twinkleRate * Math.PI * 2 + s.twinklePhase);
      const flare = this.flare[i];
      const pulse = 1 + beatEnv * 0.35 * groove + this.hit * 0.3;
      const alpha = clamp(s.glow * wake * twinkle * (1 + this.breath * 0.6) + flare, 0, 1);
      if (alpha < 0.01) continue;
      const size = (s.size * p.scale * pulse * (1 + flare * 1.8) + 0.5) * this.dpr * 11;
      const hue = flare > 0.05 ? pcHue(s.pc) : this.hue + s.tint;
      ctx.globalAlpha = alpha;
      ctx.drawImage(this.sprite(hue), p.x - size / 2, p.y - size / 2, size, size);
    }

    // ripples
    this.ripples = this.ripples.filter((r) => f.now - r.born < 1800);
    for (const r of this.ripples) {
      const age = (f.now - r.born) / 1800;
      ctx.globalAlpha = (1 - age) ** 2 * 0.35;
      ctx.strokeStyle = `hsl(${r.hue}, 80%, 75%)`;
      ctx.lineWidth = (0.5 + 2 * (1 - age)) * this.dpr;
      ctx.beginPath();
      ctx.arc(r.x, r.y, (12 + age * 220) * this.dpr, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  /** Notes heard light the sky: melodic notes their stars, drums the whole field */
  private react(f: SkyFrame) {
    for (const n of f.struck) {
      if (n.track === 1) this.hit = Math.max(this.hit, n.volume);
      else if (n.track === 2 || n.track === 3) this.breath = Math.max(this.breath, n.volume * 0.4);
      else if (n.track === 5) this.breath = Math.max(this.breath, n.volume * 0.7);
      else if (n.track >= 13 || n.track === 4)
        this.lightPitch(n.note % 12, 0.35 + n.volume * 0.5, n.track === 14 ? 3 : 1);
    }
  }

  /** Light `count` visible stars of a pitch class */
  private lightPitch(pc: number, amount: number, count: number) {
    const W = this.canvas.width;
    const H = this.canvas.height;
    for (let tries = 0, lit = 0; tries < 40 && lit < count; tries++) {
      const i = Math.floor(Math.random() * this.stars.length);
      const p = this.projected[i];
      if (this.stars[i].pc !== pc || !p?.visible || p.x < 0 || p.y < 0 || p.x > W || p.y > H)
        continue;
      this.light(i, amount);
      lit++;
    }
  }

  private drawGas(f: SkyFrame, groove: number, trance: number) {
    const g = this.gasCtx;
    const w = this.gas.width;
    const h = this.gas.height;
    g.globalCompositeOperation = 'source-over';
    g.clearRect(0, 0, w, h);
    g.globalCompositeOperation = 'lighter';

    const glow = clamp((f.energy - 1.3) / 3.7, 0, 1);
    const faint = 0.015 + 0.035 * f.awake;
    // in the trance every kick makes the gas flash
    const level = faint + glow * 0.13 + this.breath * 0.06 * glow + this.hit * 0.07 * trance;
    const t = f.now;
    for (const c of this.clouds) {
      const x = (c.x + Math.sin(t * c.speed + c.phase) * 0.15 + this.offset.x * 0.0004) * w;
      const y = (c.y + Math.cos(t * c.speed * 0.8 + c.phase) * 0.12 + this.offset.y * 0.0004) * h;
      const r = c.r * Math.max(w, h) * (1 + 0.08 * Math.sin(f.barPhase * Math.PI * 2) * groove);
      const grad = g.createRadialGradient(x, y, 0, x, y, r);
      const hue = this.hue + c.hueShift * (1 + trance * 1.5);
      if (level < 0.004) continue;
      grad.addColorStop(0, `hsla(${hue}, 70%, 55%, ${level})`);
      grad.addColorStop(0.5, `hsla(${hue + 25}, 70%, 40%, ${level * 0.45})`);
      grad.addColorStop(1, `hsla(${hue + 40}, 70%, 30%, 0)`);
      g.fillStyle = grad;
      g.fillRect(0, 0, w, h);
    }

    // waves of light move through the gas once there is a groove
    if (groove > 0.05) {
      g.lineCap = 'round';
      for (let k = 0; k < 3; k++) {
        const hue = this.hue + (35 + 45 * trance) * (k - 1);
        const path = new Path2D();
        for (let x = -4; x <= w + 4; x += 3) {
          const phase = t * (0.0003 + k * 0.0001) * (1 + 2.5 * trance) + (x / w) * (3 + k);
          const y =
            h * (0.3 + 0.2 * k) +
            Math.sin(phase + f.barPhase * Math.PI * 2) * h * 0.12 +
            Math.sin(phase * 0.37 + k) * h * 0.08;
          if (x === -4) path.moveTo(x, y);
          else path.lineTo(x, y);
        }
        // soft edges: many layers, each a little narrower and brighter, so no edge shows
        const alpha =
          Math.min(0.06, 0.022 * groove + 0.03 * trance) *
          (1 + this.breath + this.hit * trance) *
          0.45;
        for (let layer = 0; layer < WAVE_LAYERS; layer++) {
          const f = layer / (WAVE_LAYERS - 1);
          g.strokeStyle = `hsla(${hue}, 80%, ${45 + 30 * f}%, ${alpha})`;
          g.lineWidth = h * (0.22 - 0.2 * f ** 0.8) * (1 + 0.3 * k);
          g.stroke(path);
        }
      }
    }
  }

  private sprite(hue: number): HTMLCanvasElement {
    return this.sprites[spriteIndex(hue)] ?? this.sprites[0];
  }
}

function spriteIndex(hue: number): number {
  return Math.round((((hue % 360) + 360) % 360) / (360 / HUE_SPRITES)) % HUE_SPRITES;
}

/** A soft star: a white core in a coloured halo */
function starSprite(hue: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = SPRITE;
  c.height = SPRITE;
  const g = c.getContext('2d');
  if (!g) return c;
  const m = SPRITE / 2;
  const grad = g.createRadialGradient(m, m, 0, m, m, m);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.08, 'rgba(255,255,255,0.9)');
  grad.addColorStop(0.2, `hsla(${hue}, 90%, 75%, 0.45)`);
  grad.addColorStop(0.5, `hsla(${hue}, 90%, 60%, 0.1)`);
  grad.addColorStop(1, `hsla(${hue}, 90%, 50%, 0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, SPRITE, SPRITE);
  return c;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}
