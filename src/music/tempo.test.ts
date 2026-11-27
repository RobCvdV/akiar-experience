import { describe, expect, it } from 'vitest';
import { easeBpm, MAX_BPM_PER_SECOND, SECTION_BPM, targetBpm } from './tempo';

describe('tempo', () => {
  it('climbs from the void to trance speed at the peak', () => {
    expect(SECTION_BPM.void).toBeLessThan(SECTION_BPM.dream);
    expect(SECTION_BPM.dream).toBeLessThan(SECTION_BPM.orbit);
    expect(SECTION_BPM.euphoria).toBeGreaterThanOrEqual(124);
  });

  it('keeps the song tempo for an unknown section', () => {
    expect(targetBpm('somewhere', 84)).toBe(84);
    expect(targetBpm(null, 84)).toBe(84);
    expect(targetBpm('orbit', 84)).toBe(SECTION_BPM.orbit);
  });

  it('eases towards the target, no faster than the limit', () => {
    let bpm = 100;
    for (let t = 0; t < 1000; t += 16) {
      const next = easeBpm(bpm, 126, 16);
      expect(next - bpm).toBeLessThanOrEqual((MAX_BPM_PER_SECOND * 16) / 1000 + 1e-9);
      bpm = next;
    }
    expect(bpm).toBeGreaterThan(100);
    for (let t = 0; t < 60000; t += 16) bpm = easeBpm(bpm, 126, 16);
    expect(bpm).toBe(126);
  });

  it('slows down the same way', () => {
    expect(easeBpm(126, 86, 1000)).toBeCloseTo(126 - MAX_BPM_PER_SECOND, 6);
  });
});
