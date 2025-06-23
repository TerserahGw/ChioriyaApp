import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html'
    }
  },
  server: {
    proxy: {
      '/api': {
        target: import.meta.env.VITE_API_URL | 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
