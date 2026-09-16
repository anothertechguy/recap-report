import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Cloudflare builds pre-render every route (scripts/prerender.mjs), so the HTML
// already holds the page: hydrate it. GitHub Pages staging still client-renders.
const root = document.getElementById("root")!;
if (root.hasChildNodes()) hydrateRoot(root, <App />, { onRecoverableError() {} });
else createRoot(root).render(<App />);
