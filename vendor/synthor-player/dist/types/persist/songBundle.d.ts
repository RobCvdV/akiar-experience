/**
 * Reading a `.synthor` container (or plain song JSON) into memory — pure, no
 * storage. The app writes the samples to its library; the headless player
 * decodes them straight into the VFS.
 */
import { type SongFile } from './serialize';
export interface SongBundle {
    file: SongFile;
    /** Encoded sample files by content hash (empty for a JSON-only song). */
    samples: Map<string, ArrayBuffer>;
}
/** Parse a `.synthor` zip or `.synthor.json` song. Throws on malformed input. */
export declare function unpackSongBundle(data: ArrayBuffer | Uint8Array): SongBundle;
