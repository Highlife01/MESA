import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{js,jsx}'],
    // firestore.test.js: emülatör gerektirir → `npm run test:rules`
    exclude: ['tests/firestore.test.js'],
    restoreMocks: true,
    clearMocks: true,
  },
});
