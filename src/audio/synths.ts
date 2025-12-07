import { el, type NodeRepr_t } from '@elemaudio/core';

/**
 * Simple sine wave oscillator
 * @param frequency - Frequency in Hz
 * @param amplitude - Amplitude (0-1)
 */
export function sineOsc(frequency: number, amplitude = 0.3): NodeRepr_t {
  return el.mul(amplitude, el.cycle(frequency));
}

/**
 * Filtered noise for ambient textures
 * @param cutoff - Filter cutoff frequency
 * @param resonance - Filter resonance (0-20)
 */
export function filteredNoise(cutoff: number, resonance = 1): NodeRepr_t {
  const noise = el.noise();
  return el.lowpass(cutoff, resonance, noise);
}

/**
 * Simple envelope generator (attack-release)
 * @param gate - Trigger signal (0 or 1)
 * @param attackTime - Attack time in seconds
 * @param releaseTime - Release time in seconds
 */
export function envelope(gate: NodeRepr_t, attackTime = 0.1, releaseTime = 0.5): NodeRepr_t {
  return el.adsr(attackTime, 0, 1, releaseTime, gate);
}

/**
 * Pulsing sine tone with slow LFO modulation
 * @param baseFreq - Base frequency
 * @param lfoRate - LFO rate in Hz
 */
export function pulsingTone(baseFreq: number, lfoRate = 0.5): NodeRepr_t {
  const lfo = el.mul(0.5, el.add(1, el.cycle(lfoRate))); // 0 to 1
  return el.mul(lfo, sineOsc(baseFreq));
}
