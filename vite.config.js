import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Unieke build-id voor cache-busting (wijzigt bij elke build)
const BUILD_ID = String(Date.now())

export default defineConfig({
  // ✅ basispad voor GitHub Pages (vervang 'portfolio' als je repo anders heet)
  base: '/portfolio/',

  plugins: [
    vue(),
    vueDevTools(),

    // ✅ Injecteer no-cache meta + versie-script in index.html
    {
      name: 'html-cache-bust',
      transformIndexHtml(html) {
        return html.replace(
          '</head>',
          `
  <!-- cache-bust meta -->
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <!-- build version inject -->
  <script>
    (function () {
      var KEY = 'site_version';
      var NEW_VER = '${BUILD_ID}';
      var CUR = localStorage.getItem(KEY);
      // Forceer een éénmalige harde reload als de versie is veranderd
      if (CUR && CUR !== NEW_VER) {
        localStorage.setItem(KEY, NEW_VER);
        // probeer cache te ontwijken
        var url = new URL(location.href);
        url.searchParams.set('v', NEW_VER);
        location.replace(url.toString());
      } else if (!CUR) {
        localStorage.setItem(KEY, NEW_VER);
      }
      // Eventueel: alle service workers uitschakelen die nog cachen
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(r => r.forEach(sw => sw.unregister()));
      }
    })();
  </script>
</head>`
        )
      }
    }
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // ✅ dev: voorkom lokale caching
  server: {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    },
  },

  // ✅ build: zorg voor gehashte bestandsnamen
  build: {
    assetsDir: 'assets',
    sourcemap: false,
    manifest: true,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash][extname]`
      }
    }
  },

  // Exporteer build-id naar je app (optioneel te gebruiken)
  define: {
    'import.meta.env.VITE_BUILD_ID': JSON.stringify(BUILD_ID)
  }
})