/**
 * Packing of playback data for the txSeq native node (src/native/TxSeq.h).
 *
 * The node reads one Float32Array shared resource laid out as:
 *   [0] = version (1), [1] = totalRows, [2] = numSlots
 *   per slot s: [3+3s] signalCount, [4+3s] drumGateCount, [5+3s] signalOffset
 *   headerSize = 3 + 3*numSlots
 *   data: row r, slot s, signal c →
 *     headerSize + r * totalSignals + signalOffset[s] + c
 * The node's output channel for slot s signal c is s * MAX_SLOT_SIGNALS + c.
 */
import type { PlaybackData } from './playbackData';
import { MAX_SLOT_SIGNALS } from '../engine/voiceSlotLayout';
export declare const TXSEQ_VERSION = 1;
export { MAX_SLOT_SIGNALS };
/** Output channel index for one signal of one slot. */
export declare function slotChannel(slotIndex: number, signalIndex: number): number;
/** Serialize a full playback pass into the node's upload format. */
export declare function buildTxSeqData(data: PlaybackData): Float32Array;
