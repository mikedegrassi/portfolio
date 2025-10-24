import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  // ✅ basispad voor GitHub Pages (vervang 'portfolio' door je repo-naam)
  base: '/portfolio/',

  plugins: [
    vue(),
    vueDevTools(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // ✅ voorkomt dat browsers oude versies van index.html cachen
  server: {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  },

  // optioneel: iets schonere output
  build: {
    assetsDir: 'assets',
    sourcemap: false,
  },
})