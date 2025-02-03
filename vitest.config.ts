/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    passWithNoTests: true,
    coverage: {
      provider: 'istanbul',
      excludeAfterRemap: true,
      exclude: [
        '**/*.tsx',
        'coverage',
        '.next',
        '.vercel',
        '.github',
        'node_modules',
        'next.config.js',
        'postcss.config.js',
        'tailwind.config.js',
      ],
    },
  },
});
