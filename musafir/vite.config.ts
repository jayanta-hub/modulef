import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import pkg from './package.json';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "musafir",
      remotes: {
        musafirflight: "http://localhost:5002/assets/remoteEntry.js",
      },
      exposes: {
        "./store": "./src/pages/store/store.ts",
      },
      shared: {
        react: { requiredVersion: pkg.dependencies['react'] },
        'react-dom': { requiredVersion: pkg.dependencies['react-dom'] },
        'react-redux': { requiredVersion: pkg.dependencies['react-redux'] },
        'redux': { requiredVersion: pkg.dependencies['redux'] },
        'redux-persist': { requiredVersion: pkg.dependencies['redux-persist'] },
        '@mui/icons-material': { requiredVersion: pkg.dependencies['@mui/icons-material'] },
        '@mui/material': { requiredVersion: pkg.dependencies['@mui/material'] },
        '@mui/system': { requiredVersion: (pkg.dependencies as { [key: string]: string })['@mui/system']},
        '@mui/styled-engine': { requiredVersion: (pkg.dependencies as { [key: string]: string })['@mui/styled-engine'] },
      },
    }),
  ],
  optimizeDeps: {
    include: [
      "@emotion/react",
      "@emotion/styled",
      "@mui/material",
      "@mui/system",
      "@mui/styled-engine"
    ],
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});