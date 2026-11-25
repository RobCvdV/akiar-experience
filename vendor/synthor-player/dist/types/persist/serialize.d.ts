/**
 * Song (project) serialization — pure, no I/O. Turns the in-memory Doc into a
 * versioned, JSON-safe SongFile and back, with a migration hook so older files
 * keep loading as the schema grows (e.g. when the sections/song arrangement
 * layer or sample assets land, bump CURRENT_SCHEMA_VERSION and add a case to
 * `migrate`).
 *
 * Binary sample data deliberately never lives here: samples will be stored as
 * separate content-addressed assets and referenced from the doc by id, so this
 * document stays small and cheap to rewrite on every autosave.
 */
import { type Doc } from '../domain/types';
/**
 * Bump when the on-disk shape changes; add a matching `migrate` case.
 */
export declare const CURRENT_SCHEMA_VERSION = 18;
export interface SongMeta {
    name: string;
    /** ISO-8601 timestamps. */
    createdAt: string;
    modifiedAt: string;
}
/** The serialized project file (`song.json`). */
export interface SongFile {
    schemaVersion: number;
    meta: SongMeta;
    doc: Doc;
}
/** Wrap a doc + metadata into a current-version SongFile. */
export declare function makeSongFile(doc: Doc, meta: SongMeta): SongFile;
/** Serialize to a JSON string (pretty-printed for diff-friendly storage). */
export declare function serializeSong(file: SongFile): string;
/**
 * Parse + validate + migrate a JSON string into a current-version SongFile.
 * Throws a descriptive Error on malformed input rather than returning a
 * half-valid object, so callers can surface a clear failure.
 */
export declare function deserializeSong(text: string): SongFile;
/**
 * Bring any supported past-version file up to the current schema. Unknown
 * (future) versions are rejected — we can read older files, not newer ones.
 */
export declare function migrate(raw: unknown): SongFile;
