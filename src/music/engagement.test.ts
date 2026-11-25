import { describe, expect, it } from 'vitest';
import { decay, gesture, IDLE_MS, initialEngagement, isIdle, STREAK_MS } from './engagement';

describe('engagement', () => {
  it('grows with gestures, clicks most, and never past 1', () => {
    const moved = gesture(initialEngagement, 'move', 0);
    const clicked = gesture(initialEngagement, 'click', 0);
    expect(clicked.progress).toBeGreaterThan(moved.progress);
    let e = initialEngagement;
    for (let i = 0; i < 2000; i++) e = gesture(e, 'click', i * 5000);
    expect(e.progress).toBeLessThanOrEqual(1);
    expect(e.progress).toBeGreaterThan(0.9);
  });

  it('takes a while to reach the dream: dozens of clicks, not a few', () => {
    let e = initialEngagement;
    let clicks = 0;
    while (e.progress < 0.85) e = gesture(e, 'click', ++clicks * 3000);
    expect(clicks).toBeGreaterThan(40);
    expect(clicks).toBeLessThan(150);
  });

  it('counts clicks close together as a streak', () => {
    let e = gesture(initialEngagement, 'click', 0);
    e = gesture(e, 'click', STREAK_MS / 2);
    e = gesture(e, 'click', STREAK_MS);
    expect(e.streak).toBe(3);
    e = gesture(e, 'click', STREAK_MS * 3);
    expect(e.streak).toBe(1);
  });

  it('fades slowly while active and faster once idle', () => {
    const e = { ...initialEngagement, progress: 0.8, lastAt: 0 };
    const active = decay(e, 1000, 10000);
    const idle = decay(e, IDLE_MS + 1000, 10000);
    expect(active.progress).toBeLessThan(0.8);
    expect(active.progress).toBeGreaterThan(0.75);
    expect(idle.progress).toBeLessThan(active.progress);
    expect(isIdle(e, IDLE_MS + 1)).toBe(true);
  });

  it('adds up engaged time from close gestures only', () => {
    let e = gesture(initialEngagement, 'hover', 1000);
    e = gesture(e, 'hover', 2000);
    e = gesture(e, 'hover', 60000);
    expect(e.engagedMs).toBe(1000);
  });
});
