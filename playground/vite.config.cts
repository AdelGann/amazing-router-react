import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import { amazingRouterPlugin } from "@amazing-router/core";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), amazingRouterPlugin()] as PluginOption[],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router'],
  },
});
