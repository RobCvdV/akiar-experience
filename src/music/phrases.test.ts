import { describe, expect, it } from 'vitest';
import { clickArpeggio, starTone } from './phrases';

const D_MAJ9 = [2, 6, 9, 1, 4];
const seq = (...xs: number[]) => {
  let i = 0;
  return () => xs[i++ % xs.length];
};

describe('star tones', () => {
  it('pick a tone of the harmony, higher for a higher star', () => {
    const low = starTone(D_MAJ9, 0, seq(0.5));
    const high = starTone(D_MAJ9, 1, seq(0.5));
    expect(D_MAJ9).toContain(low.note % 12);
    expect(D_MAJ9).toContain(high.note % 12);
    expect(high.note).toBeGreaterThan(low.note + 12);
  });
});

describe('click arpeggios', () => {
  it('run through the harmony, fading, a row or two apart', () => {
    for (const r of [0.1, 0.5, 0.9]) {
      const phrase = clickArpeggio(D_MAJ9, 0.5, seq(r, 0.3, 0.7));
      expect(phrase.length).toBeGreaterThanOrEqual(4);
      expect(phrase.length).toBeLessThanOrEqual(6);
      phrase.forEach((n, i) => {
        expect(D_MAJ9).toContain(n.note % 12);
        if (i > 0) {
          expect(n.velocity).toBeLessThan(phrase[i - 1].velocity);
          expect(n.delayRows - phrase[i - 1].delayRows).toBeGreaterThanOrEqual(1);
          expect(n.delayRows - phrase[i - 1].delayRows).toBeLessThanOrEqual(2);
        }
      });
    }
  });

  it('mostly climbs', () => {
    const phrase = clickArpeggio(D_MAJ9, 0.3, seq(0.9, 0.5, 0.5));
    expect(phrase[phrase.length - 1].note).toBeGreaterThan(phrase[0].note);
  });
});
