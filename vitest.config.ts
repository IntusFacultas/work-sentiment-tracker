/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    passWithNoTests: true,
    coverage: {
      provider: 'istanbul',
      excludeAfterRemap: true,
      exclude: [
        'node_modules',
        'next.config.js',
        'postcss.config.js',
        'tailwind.config.js',
      ],
    },
  },
});
