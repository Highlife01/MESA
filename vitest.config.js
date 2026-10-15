import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{js,jsx}'],
    // firestore.test.js: emülatör gerektirir → `npm run test:rules`
    // operational-context.test.jsx: Firestore tabanlı (henüz uygulanmamış) bir
    // OperationalContext API'sini hedefler; context Firestore'a taşındığında yeniden etkinleştirin.
    exclude: ['tests/firestore.test.js', 'tests/operational-context.test.jsx'],
    restoreMocks: true,
    clearMocks: true,
  },
});
