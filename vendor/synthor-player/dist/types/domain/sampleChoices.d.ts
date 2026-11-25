import type { Id, ModuleType, SampleEntity } from './types';
type CycleSample = {
    frames: number;
    cycleLength?: number;
};
/**
 * Whether a sample is one waveform cycle: its declared cycle length covers it, or, undeclared,
 * it is no longer than a cycle can be. Short one-shots past that limit stay one-shots.
 */
export declare function fitsWaveform(sample: CycleSample): boolean;
/** A single cycle or a wavetable: its length is resolution, so the note sets its pitch. */
export declare function holdsCycles(sample: CycleSample): boolean;
/** Whether the wave module can play a sample: a single cycle, or a wavetable of whole frames. */
export declare function fitsWavetable(sample: CycleSample): boolean;
/** Frames per cycle for the wave module's `cycle` choice (index into CYCLE_SIZE_CHOICES). */
export declare function cycleLength(sample: CycleSample, choice: number): number;
/** How many whole cycles (wavetable frames) a sample holds at `size` frames each. */
export declare function wavetableFrameCount(frames: number, size: number): number;
/** Samples sorted by name, as the pickers list them. */
export declare function sortSamples(samples: Record<Id, SampleEntity>): SampleEntity[];
/** The samples a module of this type can pick from, in picker order. */
export declare function sampleChoices(moduleType: ModuleType, sortedSamples: SampleEntity[]): SampleEntity[];
/** The sample a newly added module starts with: the first choice, if any. */
export declare function defaultSampleId(moduleType: ModuleType, samples: Record<Id, SampleEntity>): Id | undefined;
/**
 * How a key previews a sample: a single cycle loops at the note's frequency (while the key is
 * held), anything longer plays once, pitched relative to C-4.
 */
export declare function samplePreviewPlan(sample: CycleSample & {
    sampleRate: number;
}, midi: number): {
    rate: number;
    loop: boolean;
};
/** How the wave module can use a sample, for the sample editor's info line. */
export declare function waveUse(sample: CycleSample): string;
export {};
