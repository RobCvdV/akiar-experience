# The music

The page plays `public/music/akiar.synthor`, a synthor song with game
settings (`doc.game`), through synthor's headless `SongPlayer`, and hands it
to synthor's `GameConductor`. The conductor picks the stage by energy, a DJ
fades parts in and out within a stage, fills mark the moves. The page only
reports what the listener does.

## The score

84 BPM, **6 rows per beat** (24 per bar): eighths swing on the triplet grid
(rows 0 and 4 of a beat). D is home: lydian and dorian colours, maj9 / #11 /
sus chords, and two chromatic turns (Fmaj7#11, Cmaj7#11) on the way to the
dream.

| Stage (section) | Energy | What plays |
|---|---|---|
| `void` | 1.2 | A D-lydian drone, then G lydian; far bells at random. Where it starts and where it rests |
| `nebula` | 1.9 | Pads move through Dmaj9 – Bm11 – Gmaj13#11 – A7sus; a soft held bass |
| `pulse` | 2.6 | A heartbeat kick, tuned ticks, long Rhodes chords, the first ride |
| `drift` | 3.3 | The groove: swung ride, brushes, feathered kick, a walking bass, Rhodes comping (Em9 – A13 – Dmaj9 – Gmaj13#11) |
| `constellation` | 4.0 | Eight bars of prog B (Gmaj9 – F#m9 – Em11 – Fmaj7#11 – Dmaj9 – Bm9 – Cmaj7#11 – A13sus♭9), the glass arpeggio in shifting rhythms |
| `bloom` | 4.3 | Transition into the dream: a rising, speeding arpeggio, swelling brushes |
| `dream` | 5.0 | Prog B with everything and the dream lead's melody |
| `afterglow` | 1.7 | After the peak: pads, echoes of the melody, bells |

Fills (one bar, played in the mix they break into): `fill-swing` (a brush
roll, for busy stages), `fill-shimmer` (falling bells, for quiet ones), `rise`
(going up), `fall` (going down).

### Tracks (the same in every pattern)

1 Kick · 2 Brush · 3 Ride · 4 Tick · 5 Bass · 6–9 Nebula (pads) · 10–12 Rhodes
· 13 Glass (arp) · 14 Dream (lead) · 15 Shimmer (bells) · 16–17 Star · 18–20
Spark. Star and Spark are empty: the page plays them live (a star's tone, a
click's arpeggio), so they need their tracks to have voices. The DJ's groups
(`dj.groups`) name these track numbers.

### The contract

The page reads the harmony from the score itself: the last note of tracks
5–12 (bass, pads, Rhodes) at the heard row, held notes included. Fewer than
three pitch classes falls back to D lydian. So an edited score keeps working
as long as tracks 5–12 carry the harmony, the instruments `Star` and `Spark`
exist with tracks, and the game settings' cues name sections or patterns that
exist (`src/music/score.test.ts` checks the shipped score).

### Volumes: no jumps under a sounding note

Synthor's sequencer reads a row without a volume as **1** and multiplies the
voice by it unsmoothed. A note at volume 0.4 followed by hold rows jumped to
full volume one row in, and its release did too: a soft tick on every quiet
note. The generator writes each note's volume on the rows after it until the
next note (`carryVolumes` in `scripts/score/build.ts`); the rows before a
pattern's first note take its last note's. **Editing in synthor, do the same:
a volume on a note's hold rows and on the empty rows after it.** A test checks
the shipped score. What remains is the change on a new note's own row, under
the previous note's tail; only smoothing the volume in synthor's engine
removes that.

## How the page conducts it

- **Engagement** (`engagement.ts`) is the conductor's progress: every gesture
  adds a little (moving the least, nearing a star more, a click most),
  less the higher it is. It fades very slowly while you play, faster after
  12 s of stillness. Reaching the dream takes a few minutes of play.
- **Clicks** are the conductor's reactions: clicks less than 1.8 s apart are a
  streak and heat the energy up; a streak of 4+ plays a fill.
- **Peak**: from 85 % engagement the music heads for `bloom` and the dream,
  once per level; every dream heard raises the level, so it can come again.
  After a peak the conductor rests: `afterglow`, then building again.
- **Left alone**, the page nudges the conductor every 20 s, so a stage that has
  had its time moves on towards the calm.

## What the sky hears

Every frame `Music.tick` reads the heard position: beat and bar phase (the
stars sway, the sky swells), the stage's energy (how much gas, waves and
dance), the harmony (the gas's hue: pitch classes along the circle of fifths,
teal → violet → magenta) and the notes struck since the last frame, minus
the parts the DJ has faded or cut: the kick pulses the stars, brushes, ride and
bass make the gas breathe, ticks, arp, lead and bells light stars of their
pitch class.

## CPU: what a phone can carry

Every voice slot and channel effect runs all the time, sounding or not; an
audio thread that misses its buffers is heard as ticks. Measured with
synthor's offline renderer (relative numbers; the Zwap score is ≈ 98 %):

| | before | now |
|---|---|---|
| Whole score | 123 % | 62 % |
| Nebula (4 pad voices) | 49 % | 10 % |

- Modules cost about the same each, so the count matters, times the voices.
- **An `osc` saw, square or pulse costs ~4× a sine or triangle** once the
  sequencer drives its frequency (band-limiting per sample). For a saw under
  a lowpass, use a `dxop` with its saw waveform (`waveform: 1`).
- A reverb is the dearest effect (≈ 8 %): the song has **one**, on the
  `Space` sub channel (echo, then hall) that every voice wanting space plays
  through. Drums and bass stay dry; the master only compresses. No reverb or
  echo inside an instrument: every voice would pay for it. (`width`'s Haas
  delay per voice is cheap enough.)
- The page asks for larger audio buffers on touch devices
  (`latencyHint: 'playback'`). Try others on a device with
  `?latency=interactive|balanced|playback|<seconds>`; `?debug` shows what the
  browser chose, the frame rate, the section and the energy.

## Changing it

- **By ear**: open `akiar.synthor` in synthor and edit it there (its Game
  screen simulates the conducting). Keep the contract above.
- **In code**: `scripts/score/` (instruments, harmony, patterns, game
  settings), then `npm run score`. It needs synthor checked out next to this
  repo (`../synthor`): it builds with synthor's patch builder and checks the
  song through synthor's loader. A rebuild overwrites edits made in synthor.
- **A new player build**: in synthor, `npm run build:player`, copy
  `packages/synthor-player/{dist,README.md,package.json}` into
  `vendor/synthor-player/` (without the source map), write the synthor commit
  to `SYNTHOR_COMMIT`.
- **Headless checks**: Playwright's Chromium with
  `--autoplay-policy=no-user-gesture-required`; click once to start the audio.
  Its audio clock runs faster than real time: judge bars, not seconds.
