import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "musafirflight",
      filename: "remoteEntry.js",
      remotes: {
        musafir: "http://localhost:4174/assets/remoteEntry.js",
      },
      exposes: {
        "./UserDetail": "./src/pages/user-details/UserDetail",
      },
      shared: [
        "react",
        "react-dom",
      ],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  preview: {
    host: "localhost",
    port: 5002,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});