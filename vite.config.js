import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  base: './',
  server: {
    port: 3000,
    open: false,
    watch: {
      ignored: ['**/examples/**', '**/.git/**']
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  },
  test: {
    environment: 'happy-dom'
  }
});
