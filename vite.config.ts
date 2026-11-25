import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  // the synthor player (Elementary + the sequencer wasm) is one ~700 kB module
  build: { chunkSizeWarningLimit: 1000 },
});
