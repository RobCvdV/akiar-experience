/**
 * Reading the score as it plays: which pattern row a cue's row is, which
 * notes start there, and the harmony sounding at it. Pure: the page calls it
 * with the song the player loaded and the row the listener hears.
 */
import type { Cue, SongFile } from 'synthor-player';

type Doc = SongFile['doc'];
type Pattern = Doc['entities']['patterns'][string];

/** Track numbers (1-based) whose notes make the harmony: bass, pads, Rhodes */
export const HARMONY_TRACKS = [5, 6, 7, 8, 9, 10, 11, 12];

/** D lydian: the harmony before (or without) the music */
export const DEFAULT_HARMONY = [2, 4, 6, 8, 9, 11, 1];

export interface StartedNote {
  /** Track number, 1-based */
  track: number;
  note: number;
  /** 0..1 */
  volume: number;
}

/** The patterns a cue plays, in order: a section's, or a single pattern */
export function cuePatterns(doc: Doc, cue: Cue): Pattern[] {
  const { sections, patterns } = doc.entities;
  const ofSection = (id: string) =>
    (sections[id]?.patternIds ?? []).map((p) => patterns[p]).filter(Boolean);
  if (typeof cue === 'string') {
    if (sections[cue]) return ofSection(cue);
    if (patterns[cue]) return [patterns[cue]];
    const section = doc.sectionIds.find((id) => sections[id]?.name === cue);
    if (section) return ofSection(section);
    const pattern = Object.values(patterns).find((p) => p.name === cue);
    return pattern ? [pattern] : [];
  }
  if ('section' in cue) return ofSection(cue.section);
  if ('pattern' in cue) return patterns[cue.pattern] ? [patterns[cue.pattern]] : [];
  return doc.sectionIds.flatMap(ofSection);
}

/** The pattern and its row at `row` of the cue (wrapping, as the cue loops) */
export function locate(doc: Doc, cue: Cue, row: number): { pattern: Pattern; row: number } | null {
  const pats = cuePatterns(doc, cue);
  const total = pats.reduce((n, p) => n + p.length, 0);
  if (total === 0) return null;
  let r = ((Math.floor(row) % total) + total) % total;
  for (const pattern of pats) {
    if (r < pattern.length) return { pattern, row: r };
    r -= pattern.length;
  }
  return null;
}

/** Notes struck on the cue's `row`, skipping `silent` track numbers */
export function notesAt(
  doc: Doc,
  cue: Cue,
  row: number,
  silent: ReadonlySet<number> = new Set(),
): StartedNote[] {
  const at = locate(doc, cue, row);
  if (!at) return [];
  const out: StartedNote[] = [];
  at.pattern.trackIds.forEach((id, i) => {
    if (silent.has(i + 1)) return;
    const cell = doc.entities.tracks[id]?.cells[at.row];
    if (cell && cell.note !== null)
      out.push({ track: i + 1, note: cell.note, volume: cell.volume ?? 1 });
  });
  return out;
}

/**
 * The pitch classes sounding at the cue's `row`: the last note of each
 * harmony track within the past bar (`lookback` rows). Fewer than three
 * means no real chord: then the default harmony.
 */
export function harmonyAt(doc: Doc, cue: Cue, row: number, lookback = 24): number[] {
  const at = locate(doc, cue, row);
  if (!at) return DEFAULT_HARMONY;
  const pcs = new Set<number>();
  for (const t of HARMONY_TRACKS) {
    const id = at.pattern.trackIds[t - 1];
    const cells = id ? doc.entities.tracks[id]?.cells : undefined;
    if (!cells) continue;
    // a held note counts however long ago it was struck; a released one for `lookback` rows
    for (let r = at.row, quiet = 0; r >= 0 && quiet <= lookback; r--) {
      const c = cells[r];
      if (c?.note !== null && c?.note !== undefined) {
        pcs.add(c.note % 12);
        break;
      }
      if (!c?.hold) quiet++;
    }
  }
  return pcs.size >= 3 ? [...pcs].sort((a, b) => a - b) : DEFAULT_HARMONY;
}

/** The harmony's notes between `lo` and `hi` */
export function harmonyNotes(pcs: readonly number[], lo: number, hi: number): number[] {
  const out: number[] = [];
  for (let n = lo; n <= hi; n++) if (pcs.includes(n % 12)) out.push(n);
  return out;
}
