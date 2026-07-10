import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // Cloudflare Pages (which sets CF_PAGES=1) serves the site at the domain
  // root (therecapreport.com); GitHub Pages serves it under /recap-report/.
  base: process.env.CF_PAGES ? "/" : "/recap-report/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
