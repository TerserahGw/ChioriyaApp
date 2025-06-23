import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: path.resolve(__dirname, './index.html')
    }
  },
  preview: {
    port: process.env.PORT || 5173,
    strictPort: true,
    host: true
  }
});
