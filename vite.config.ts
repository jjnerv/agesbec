import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      reportsDirectory: './coverage',

      exclude: [
        'dist/**',
        "**/*.scss",
        '**/*.d.ts',
        'coverage/**',
        'src/test/**',
        'src/main.jsx',
        'src/shared/**',
        'src/features/**',
        "src/pages/**/schemas/**",
      ],

      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    }
  }
} as UserConfig & { test: Record<string, unknown> });