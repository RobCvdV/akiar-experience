# The music

The page plays `public/music/akiar.synthor`, a synthor song with game
settings (`doc.game`), through synthor's headless `SongPlayer`, and hands it
to synthor's `GameConductor`. The conductor picks the stage by energy, a DJ
fades parts in and out within a stage, fills mark the moves. The page only
reports what the listener does.

## The score

**12 rows per beat** (48 per bar), so both kinds of time fit: swung triplet
eighths for the jazz (rows 0 and 8 of a beat; those parts are written in
sixths of a beat and doubled) and straight sixteenths for the trance (3 rows).
The song saves 84 BPM; **the page sets the tempo per stage** and eases there
(`src/music/tempo.ts`, at most 2.2 BPM a second): 84 in the dark, up to 100
in the dream, 110–126 through the trance, back down after.

Two worlds, one arc. The jazz has D at home: lydian and dorian colours, maj9 /
#11 / sus chords, two chromatic turns (Fmaj7#11, Cmaj7#11). The trance is
plain: B-minor triads, the pads moving by step (Bm – G – D – A, Em – G – D – A,
G – D – A – Bm).

| Stage (section) | Energy | BPM | What plays |
|---|---|---|---|
| `void` | 1.0 | 84 | A D-lydian drone, then G lydian; far bells at random. Where it starts and where it rests |
| `nebula` | 1.4 | 84 | Pads move through Dmaj9 – Bm11 – Gmaj13#11 – A7sus; a soft held bass |
| `pulse` | 1.8 | 86 | A heartbeat kick, tuned ticks, long Rhodes chords, the first ride |
| `drift` | 2.3 | 90 | The groove: swung ride, brushes, feathered kick, a walking bass, Rhodes comping (Em9 – A13 – Dmaj9 – Gmaj13#11) |
| `constellation` | 2.7 | 94 | Prog B (Gmaj9 – F#m9 – Em11 – Fmaj7#11 – Dmaj9 – Bm9 – Cmaj7#11 – A13sus♭9), the glass arpeggio in shifting rhythms |
| `bloom` | 2.9 | 97 | Transition into the dream: a rising, speeding arpeggio, swelling brushes |
| `dream` | 3.1 | 100 | Prog B with everything and the dream lead's melody |
| `ignite` | 3.4 | 110 | Transition into the trance: the kick comes in four to the floor, Seq's sixteenths open up |
| `orbit` | 3.8 | 118 | Kick, offbeat hats and bass, Seq's rolling sixteenths, pads |
| `lift` | 4.3 | 122 | Plus claps, the Glass in three against four, Rhodes stabs, a calling lead |
| `surge` | 4.6 | 125 | Transition into the peak: a clap roll, Seq sweeping open, the kick drops for the last bar |
| `euphoria` | 5.0 | 126 | Everything and the anthem lead (an octave up the second time) |
| `breakdown` | 2.6 | 122 | No kick: pads, a dim Seq, the Glass, the lead high; then the surge again |
| `afterglow` | 1.5 | 86 | After a peak: pads, echoes of the melody, bells |

The peak (`song.peak`) is `surge`: from 85 % engagement the music heads
there, through the trance stages. Fills (one bar, played in the mix they
break into): `fill-swing` (a brush roll, for busy stages), `fill-shimmer`
(falling bells, for quiet ones), `rise` (going up), `fall` (going down).

### Tracks (the same in every pattern)

1 Kick · 2 Brush (claps in the trance) · 3 Ride (hats in the trance) · 4 Tick
(**Seq** in the trance stages) · 5 Bass · 6–9 Nebula (pads) · 10–12 Rhodes ·
13 Glass (arp) · 14 Dream (lead) · 15 Shimmer (bells) · 16–17 Star · 18–20
Spark. Star and Spark are empty: the page plays them live (a star's tone, a
click's arpeggio), so they need their tracks to have voices. The DJ's groups
(`dj.groups`) name these track numbers. The Kick punches harder the louder the
note (the volume deepens its pitch drop); Seq's filter opens with the note's
volume, so volume ramps are heard as filter sweeps.

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
| Whole score (before the trance) | 123 % | 62 % |
| Nebula (4 pad voices) | 49 % | 10 % |

- The player is built from synthor's oscillator work (`077554f`, branch
  `claude/hopeful-brahmagupta-qha6z6`, not yet on main; it needs that
  branch's own `vendor/elementary-js`, whose wasm has the native `wtosc`
  oscillator). Rebuild from main once it is merged.
- The trance stages add one voice (Seq): relative to Zwap's score the song
  costs about as much as before.
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
