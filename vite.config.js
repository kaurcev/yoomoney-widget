import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: './dev',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: '../dist-dev',
    emptyOutDir: true
  }
});