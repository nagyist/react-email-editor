import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // The demo imports the library source from ../src, which resolves react
    // from the root node_modules — dedupe so only one copy is bundled.
    dedupe: ['react', 'react-dom', 'styled-components'],
  },
  server: {
    port: 3000,
  },
});
