import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{js,ts,jsx,tsx}'],
    coverage: {
      include: ['src/**/*.{js,ts,jsx,tsx}'], // カバレッジを取得したいファイル
      exclude: ['src/utils/**/*.{js,ts}'], // カバレッジから除外したいファイル
      reporter: ['text', 'html'], // レポート形式 (text, html, json など)
    },
  },
});
