import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
  build: {
    minify: false,

    lib: {
      entry: 'src/main.ts',
      fileName: 'cli',
      formats: ['es'],
    },

    rollupOptions: {
      output: {
        banner: '#!/usr/bin/env node',
      },
      external: [
        'fs',
        'path',
        'os',
        'ast-types',
        '@babel/parser',
        'source-map',
        'assert',
        'tslib',
        'fs/promises',
        'process',
        ...Object.keys(pkg.dependencies),
      ],
    },
  },
});
