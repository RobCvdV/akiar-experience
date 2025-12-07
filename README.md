# Akiar Experience

Interactive audiovisual experience built with React, TypeScript, Elementary Audio, and Framer Motion.

## Tech Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite** - Fast dev server and build tool
- **Biome** - All-in-one linting and formatting (20x faster than ESLint + Prettier)
- **Framer Motion** - SVG animations with mouse tracking
- **Elementary Audio** - Procedural audio synthesis

## Features

### Visual
- SVG-based animated line forms with neon glow effects
- Mouse position, velocity, and proximity tracking
- Reactive animations based on mouse movement
- Customizable glow filters and effects

### Audio
- Web Audio API integration via Elementary Audio
- Procedural sound synthesis (sine oscillators, filtered noise, envelopes)
- Interactive audio triggers (hover, click)
- Pulsing tones and ambient soundscapes

## Project Structure

```
src/
├── components/       # React components
│   └── LineCanvas.tsx   # Main interactive canvas
├── audio/            # Elementary audio setup
│   ├── audioContext.ts  # Web audio initialization
│   └── synths.ts        # Audio synthesis functions
├── hooks/            # Custom React hooks
│   ├── useAudio.ts         # Audio control hook
│   └── useMouseTracking.ts # Mouse tracking hook
├── types/            # TypeScript type definitions
├── App.tsx           # Root component
└── main.tsx          # Entry point
```

## Scripts

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run Biome linter
npm run format    # Format code with Biome
npm run check     # Lint + format check
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start dev server**
   ```bash
   npm run dev
   ```

3. **Open browser**
   - Navigate to `http://localhost:5173`
   - **Hover** over the cyan line to trigger a short tone
   - **Click** the line to toggle a pulsing ambient tone
   - Move your mouse to see speed-reactive visualizations

## Development

- Code is automatically formatted on save (if using Biome extension)
- TypeScript strict mode is enabled
- All code follows Biome's recommended rules
- Import organization is enforced

## Next Steps

Expand on this foundation:
- Add more complex line shapes (bezier curves, polylines)
- Create scriptable animation sequences
- Build procedural music patterns
- Add randomized variations
- Implement proximity-based sound modulation
- Create multiple interactive scenes

## License

MIT
