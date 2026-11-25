# Akiar Experience

Interactive night sky + synthor music. React + TypeScript + Vite, canvas 2D,
synthor's headless player (`vendor/synthor-player`). Overview in `README.md`,
the score and the conducting in `docs/MUSIC.md` (keep it in sync).

- `npm test`, `npm run typecheck`, `npm run check` — all clean before done.
- Logic that can be pure lives in `src/music/*.ts` / `src/visuals/space.ts`
  with a colocated `*.test.ts`; `Music` and `Sky` are the only classes
  (lifecycle: audio, canvas).
- The score is generated: `npm run score` (needs `../synthor`). Don't hand-edit
  `public/music/akiar.synthor` except through synthor's editor.
- Visual and musical randomness uses `Math.random`; the score generator uses
  its seeded random so rebuilds are identical.
