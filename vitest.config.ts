import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',     // Node pour ton backend / RPG
    globals: true,           // pour pouvoir utiliser describe/test/expect sans import
    coverage: {
      reporter: ['text', 'lcov'], // coverage optionnel
    },
  },
});
