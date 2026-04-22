import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';
import path from 'path';

const root = path.resolve(__dirname, '.');

export default defineConfig({
  plugins: [
    react(),
    electron([
      {
        entry: path.join(root, 'electron/main.ts'),
      },
      {
        entry: path.join(root, 'electron/preload.ts'),
        onstart(options) {
          options.reload();
        },
      },
    ]),
    renderer(),
  ],
  base: './',
  root: path.join(root, 'ui'),
  build: {
    outDir: path.join(root, 'dist/ui'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': root,
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
});