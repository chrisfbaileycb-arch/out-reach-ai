import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Source files use JSX in .js files (CRA convention), so tell esbuild to parse them as JSX.
export default defineConfig({
  plugins: [react({ include: /\.(js|jsx)$/ })],
  esbuild: { loader: 'jsx', include: /src\/.*\.js$/, exclude: [] },
  optimizeDeps: { esbuildOptions: { loader: { '.js': 'jsx' } } },
});
