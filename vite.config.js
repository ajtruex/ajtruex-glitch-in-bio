import { resolve } from "path";
import { defineConfig } from "vite";
import dns from 'dns'
// Slightly modified from https://github.com/alexlafroscia/vite-plugin-handlebars
import handlebars from "@glitchdotcom/vite-plugin-handlebars";
dns.setDefaultResultOrder('verbatim')
// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  return {
    plugins: [
      handlebars({
        partialDirectory: resolve(__dirname, "layout"),
        settingsFile: 'settings.json',
        helpers: {
          hostasclass: value => new URL(value).hostname.replace(/\./g, "_")
        },
        reloadOnPartialChange: true
      })
    ],
    build: {
      cssCodeSplit: false,
      outDir: "build"
    },
    optimizeDeps: {
      exclude: ['./settings.json']
    },
    server: {
      https: true
    }
  };
});
