import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'

import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3001,
  },
  base: '/popula',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    deps: {
      inline: ['vuetify'],
    },
    setupFiles: './lib/vitest/setup.js',
    root: fileURLToPath(new URL('./', import.meta.url)),
    exclude: [...configDefaults.exclude, './e2e/**/*'],
  },
})
