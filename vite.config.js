import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

const virtualIndexHtml = () => ({
  name: "source-html-from-main-jsx",
  transformIndexHtml: {
    order: "pre", // Tells Vite to run this before other processes
    async handler(a) {
      const { INDEX_HTML } = await import("./main.jsx");
      return INDEX_HTML;
    },
  },

  configureServer: async (server) => {
    // Inject preambles into the HTML
    const { INDEX_HTML } = await import("./main.jsx");

    const finalHTML = await server.transformIndexHtml("index.html", INDEX_HTML);

    // Serve the transformed HTML
    server.middlewares.use((req, res, next) => {
      if (req.url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.end(finalHTML);
      } else {
        next();
      }
    });
  },
  buildStart: async () => {
    const { INDEX_HTML } = await import("./main.jsx");
    fs.writeFileSync("./index.html", INDEX_HTML);
  },
  buildEnd: async () => {
    fs.unlinkSync("./index.html");
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  server: {},
  base: "./",
  plugins: [virtualIndexHtml(), react()],
  build: {
    rollupOptions: {
      input: {
        main: "./main.jsx",
        app: "./index.html",
      },
    },
  },
});
