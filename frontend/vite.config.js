import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Source files use JSX in .js files (CRA convention), so tell esbuild to parse them as JSX.
export default defineConfig({
  plugins: [react({ include: /\.(js|jsx)$/ })],
  // Output to build/ (CRA's location) so backend/server.js can serve it in production
  build: { outDir: 'build' },
  // Forward API calls to the Express backend during development
  server: { proxy: { '/api': 'http://localhost:5000' } },
  esbuild: { loader: 'jsx', include: /src\/.*\.js$/, exclude: [] },
  optimizeDeps: { esbuildOptions: { loader: { '.js': 'jsx' } } },
});
