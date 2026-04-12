import { defineConfig } from "oxlint";

export default defineConfig({
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  rules: {
    "react-hooks/exhaustive-deps": "warn",
    "react-refresh/only-export-components": "warn",
  },
  ignorePatterns: ["dist", "node_modules", "**/*.d.ts"],
  settings: {
    react: {
      version: "19",
    },
  },
});
