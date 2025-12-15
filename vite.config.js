import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    // Remova ou comente esta linha:
    // VitePWA({})
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
