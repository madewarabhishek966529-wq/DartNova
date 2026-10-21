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
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('src/registry')) {
            return 'catalog-registry';
          }
        }
      }
    }
  },
  test: {
    environment: 'happy-dom'
  }
});
