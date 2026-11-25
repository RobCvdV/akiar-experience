# Akiar Experience

A night sky that becomes music when you touch it. At first there is almost
nothing: a few stars breathing in the dark, a drone with far-away bells. A
star you come near lights up and sings a tone of the harmony; a click plays a
short arpeggio that fades; scrolling or swiping turns the sky about a random
axis. The more you play, the further the music grows: a heartbeat, tuned
ticks, swung brushes and a walking bass, a glass arpeggio, a dreamy lead — and
the sky follows, stars swaying on the beat, gas clouds and waves of colour in
the harmony's hues. Leave it alone and it settles back into the dark.

The music is a [synthor](https://github.com/RobCvdV/synthor) song played by
synthor's headless player and conducted by its `GameConductor`, like Zwap's
music. See [`docs/MUSIC.md`](docs/MUSIC.md) for the score and how the page
conducts it.

## Commands

```bash
npm run dev        # dev server (http://localhost:5173); window.__music in the console
npm test           # vitest: score reading, engagement, phrases, sky geometry
npm run typecheck  # tsc -b
npm run build      # typecheck + production build into dist/
npm run score      # rebuild public/music/akiar.synthor (needs ../synthor checked out)
npm run check      # biome lint + format check
```

## Layout

| Path | What it does |
|---|---|
| `src/Experience.tsx` | The canvas, input (pointer, touch, wheel, keys) and the frame loop |
| `src/music/Music.ts` | Loads the score, starts it on the first gesture, conducts it, tells each frame what is heard |
| `src/music/engagement.ts` | Pure: gestures → the conductor's progress (0..1), click streaks, slow fading |
| `src/music/score.ts` | Pure: a cue's row → pattern row, the notes struck there, the harmony sounding |
| `src/music/phrases.ts` | Pure: a star's tone and a click's arpeggio in the harmony of the moment |
| `src/visuals/space.ts` | Pure: stars, quaternion rotation, projection, pitch-class colours |
| `src/visuals/Sky.ts` | Draws the gas, waves, stars and ripples from each frame's state |
| `scripts/score/` | Writes the synthor score: instruments, harmony, patterns, game settings |
| `vendor/synthor-player/` | The synthor player build (`SYNTHOR_COMMIT` names its synthor commit) |

Interaction: hover or touch near a star (a tone), click or tap (an arpeggio),
scroll, swipe or arrow keys (turn the sky), space or enter (an arpeggio
somewhere). The button bottom right mutes. Reduced-motion preferences calm the
movement down.
