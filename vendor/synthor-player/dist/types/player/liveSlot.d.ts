/**
 * Live notes through the txSeq node: the signal vector a slot plays for a
 * held key, and which of an instrument's slots takes it. Pure.
 */
import type { Doc, Id, Instrument } from '../domain/types';
import { type InstrumentSlotLayout } from '../engine/voiceSlotLayout';
/** Payload of a txSeq `live` command (slot = global slot index). */
export interface LiveSlotValues {
    gates: number;
    values: number[];
}
/** Slot values for a live note, or null when a drum kit has no sound for it. */
export declare function liveSlotValues(layout: InstrumentSlotLayout, inst: Instrument, note: number, velocity: number, gateOn: boolean): LiveSlotValues | null;
/**
 * Pick the slot (0..slotCount-1) for a new live note: the preferred slot if
 * given, else the next free one after `lastSlot` (so release tails ring on),
 * else steal the longest-held. `held` is in note-on order.
 */
export declare function chooseLiveSlot(slotCount: number, held: readonly number[], lastSlot: number, preferred?: number): number;
/** Graph options for live play: free play gives only the current instrument
 *  its own voices; otherwise it gets a guaranteed tracker slot instead. */
export declare function liveGraphOptions(freePlay: boolean, currentInstId: Id | null): {
    liveVoiceInstIds: Id[];
    ensureSlotInstId: Id | null;
};
/** The tracker slot of `trackId` in the current pattern, if it plays `instId`. */
export declare function trackLiveSlot(doc: Doc, trackId: Id | undefined, instId: Id): number | undefined;
