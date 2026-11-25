import { describe, expect, it } from 'vitest';
import {
  axisAngle,
  easeHue,
  harmonyHue,
  makeStars,
  multiply,
  nearest,
  pcHue,
  project,
  rotate,
} from './space';

const close = (a: number[], b: number[]) => {
  a.forEach((v, i) => {
    expect(v).toBeCloseTo(b[i], 6);
  });
};

describe('space', () => {
  it('turns a point about an axis', () => {
    close(rotate(axisAngle([0, 1, 0], Math.PI / 2), [0, 0, 1]), [1, 0, 0]);
    const twice = multiply(axisAngle([0, 0, 1], Math.PI / 4), axisAngle([0, 0, 1], Math.PI / 4));
    close(rotate(twice, [1, 0, 0]), [0, 1, 0]);
  });

  it('projects what is in front, hides what is behind', () => {
    expect(project([0, 0, 2], 100, 50, 200)).toMatchObject({
      x: 100,
      y: 50,
      scale: 0.5,
      visible: true,
    });
    expect(project([1, 1, 1], 100, 50, 200)).toMatchObject({ x: 300, y: -150 });
    expect(project([0, 0, -1], 100, 50, 200).visible).toBe(false);
  });

  it('finds the nearest visible star within reach', () => {
    const pts = [
      { x: 0, y: 0, scale: 1, visible: true },
      { x: 10, y: 0, scale: 1, visible: true },
      { x: 4, y: 0, scale: 1, visible: false },
    ];
    expect(nearest(pts, 6, 0, 20)).toBe(1);
    expect(nearest(pts, 50, 50, 20)).toBe(-1);
  });

  it('makes mostly dim stars on a shell around the viewer', () => {
    let s = 1;
    const random = () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
    const stars = makeStars(400, random);
    for (const star of stars) {
      const d = Math.hypot(...star.pos);
      expect(d).toBeGreaterThanOrEqual(0.99);
      expect(d).toBeLessThanOrEqual(2.41);
    }
    const dim = stars.filter((x) => x.glow < 0.15).length;
    expect(dim / stars.length).toBeGreaterThan(0.7);
  });

  it('colours pitch classes from teal to magenta, D first', () => {
    expect(pcHue(2)).toBe(185);
    for (let pc = 0; pc < 12; pc++) {
      expect(pcHue(pc)).toBeGreaterThanOrEqual(185);
      expect(pcHue(pc)).toBeLessThanOrEqual(325);
    }
    const h = harmonyHue([2, 9]);
    expect(h).toBeGreaterThan(185);
    expect(h).toBeLessThan(215);
  });

  it('eases hue the short way round', () => {
    expect(easeHue(350, 10, 0.5)).toBeCloseTo(0, 6);
    expect(easeHue(10, 350, 0.5)).toBeCloseTo(0, 6);
  });
});
