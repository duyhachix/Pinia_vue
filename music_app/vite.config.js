import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        // swSrc: 'src/sw.js',
      },
      manifest: {
        name: 'Vite Music App',
        short_name: 'Vite Music App',
        theme_color: '#ff5e3a',
        icons: [
          {
            src: 'assests/img/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      // caching 
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
