import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const localServerConfig = {
  host: "127.0.0.1",
  port: 5173,
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
