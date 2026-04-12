import { defineConfig } from 'oxlint';

export default defineConfig({
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  rules: {},
  ignorePatterns: ['dist', 'node_modules', '**/*.d.ts'],
  settings: {
    react: {
      version: '19',
    },
  },
});
