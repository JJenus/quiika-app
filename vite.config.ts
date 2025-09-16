// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    hmr: true, // Ensure Hot Module Replacement is enabled
    watch: {
      usePolling: process.env.CI ? true : false, // Use polling in CI or specific environments
    },
  },
  build: {
    sourcemap: true, // Generate sourcemaps for better error tracing
  },
});