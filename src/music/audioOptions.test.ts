import { describe, expect, it } from 'vitest';
import { audioOptions } from './audioOptions';

describe('audio options', () => {
  it('give touch devices larger buffers by default', () => {
    expect(audioOptions('', true).latencyHint).toBe('playback');
    expect(audioOptions('', false).latencyHint).toBe('interactive');
  });

  it('take a latency from the URL: a category or seconds', () => {
    expect(audioOptions('?latency=balanced', true).latencyHint).toBe('balanced');
    expect(audioOptions('?latency=0.12', false).latencyHint).toBe(0.12);
  });

  it('ignore a latency that makes no sense', () => {
    expect(audioOptions('?latency=fast', false).latencyHint).toBe('interactive');
    expect(audioOptions('?latency=5', true).latencyHint).toBe('playback');
  });

  it('turn the debug readout on with ?debug', () => {
    expect(audioOptions('?debug', false).debug).toBe(true);
    expect(audioOptions('?latency=playback&debug', false).debug).toBe(true);
    expect(audioOptions('', false).debug).toBe(false);
  });
});
