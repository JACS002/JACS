import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // directorio de salida por defecto
  },
  server: {
    port: 5173
  }
});
