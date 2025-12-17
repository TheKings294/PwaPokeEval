import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      VitePWA({
        mode: 'development',
        registerType: "autoUpdate",
        devOptions: {
          enabled: true
        },
        manifest: {
          name: "PokéCollector+",
          short_name: "PC+",
          description: "An PWA app to collect Pokemon with the PokeApi, this is an student project, Please Nintendo, " +
              "i don't want to battle your product and license ;)",
          theme_color: "#000",
          background_color: "#000",
          display: "standalone",
          icons: [
            {
              src: "/icons/512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: "/icons/192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: "/icons/144.png",
              sizes: "144x144",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "/icons/96.png",
              sizes: "96x96",
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: "/icons/72.png",
              sizes: "72x72",
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: "./icons/48.png",
              sizes: "48x48",
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: "/icons/apple-touch-icon.png",
              sizes: "180x180",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        }
      })
  ],
})