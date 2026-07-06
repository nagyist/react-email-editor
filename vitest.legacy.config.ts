import { defineConfig } from 'vitest/config';

// Smoke tests for the oldest supported React versions (16.8 / 17), run via
// `npm run test:legacy` with react/react-dom of that vintage installed.
// Kept separate from vitest.config.ts because the main suite depends on
// @testing-library/react, which requires React 18+. No coverage here — the
// thresholds are enforced by the main suite.
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['test/legacy/**/*.test.{ts,tsx}'],
  },
});
