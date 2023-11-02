/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-bsdd-search/',
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.tsx'),
      name: 'BsddSearch',
      fileName: 'react-bsdd-search',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'bootstrap'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          bootstrap: 'bootstrap',
        },
      },
    },
  },
  plugins: [react()],
  preview: {
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  define: {
    // Catch for 'Uncaught ReferenceError: process is not defined'
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
  },
});
