/**
 * Arrangement builder — flattens a song's section/pattern structure into a
 * single ordered list of pattern windows for the compile step. Pure function:
 * no React, no Zustand, no audio.
 */
import type { Doc, Id } from '../domain/types';
export interface ArrangementItem {
    patternId: Id;
    /** Global row offset within the flattened arrangement. */
    startRow: number;
    /** The section step this item plays; absent in pattern mode. */
    sectionId?: Id;
    step?: number;
}
/** One step of a section: a pattern reference by position, so repeats stay distinct. */
export interface StepRef {
    sectionId: Id;
    step: number;
}
/**
 * The section step showing the current pattern: `hint` when it still points at it, else the
 * pattern's position in the hinted section, else its first use in any section. Null when no
 * section uses the pattern.
 */
export declare function resolveStep(doc: Doc, hint: StepRef | null): StepRef | null;
/**
 * Build the flattened arrangement for the given play mode.
 * Returns an empty array only when no playable content exists (no patterns at all).
 */
export declare function buildArrangement(doc: Doc, playMode: 'pattern' | 'section' | 'song', current?: StepRef | null): ArrangementItem[];
/** Every step of the given sections, with cumulative offsets. Skips stale pattern references. */
export declare function flattenSteps(doc: Doc, sectionIds: Id[]): ArrangementItem[];
/** Total rows of an arrangement. */
export declare function arrangementLength(doc: Doc, arrangement: readonly ArrangementItem[]): number;
/** Index of the item playing global row `row` (wrapped to the arrangement), or -1. */
export declare function itemIndexAt(doc: Doc, arrangement: readonly ArrangementItem[], row: number): number;
/** Global row to start playing `localRow` of the current step (or the current pattern's first use). */
export declare function startRowFor(doc: Doc, arrangement: readonly ArrangementItem[], current: StepRef | null, localRow: number): number;
/** The song steps right before and after the current step, for showing context at pattern edges. */
export declare function neighbourSteps(doc: Doc, current: StepRef | null): {
    prev: ArrangementItem | null;
    next: ArrangementItem | null;
};
