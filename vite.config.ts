import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

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
  plugins: [
    react(),
    // 404.html exists only for GitHub Pages' SPA redirect hack. On Cloudflare
    // Pages it must NOT ship: its presence disables Cloudflare's automatic SPA
    // fallback and its GitHub-style path math redirect-loops at a root domain.
    process.env.CF_PAGES && {
      name: "drop-gh-pages-404",
      closeBundle() {
        fs.rmSync(path.resolve(__dirname, "dist/404.html"), { force: true });
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
