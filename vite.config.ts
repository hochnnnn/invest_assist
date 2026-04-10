import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { readDevApiPort } from "./backend/devPort";

const apiPort = readDevApiPort();

const localServerConfig = {
  host: "127.0.0.1",
  port: 5173,
  proxy: {
    "/api": {
      target: `http://127.0.0.1:${apiPort}`,
      changeOrigin: true,
    },
  },
};

export default defineConfig({
  plugins: [react()],
  server: localServerConfig,
  preview: {
    host: "127.0.0.1",
    port: 4173,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
});
