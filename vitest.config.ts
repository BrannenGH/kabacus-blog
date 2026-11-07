import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // The real module throws outside React Server Components.
      "server-only": fileURLToPath(new URL("./tests/unit/server-only.ts", import.meta.url)),
      "next/image": fileURLToPath(new URL("./tests/unit/next-image.tsx", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    setupFiles: ["tests/unit/setup.ts"],
    css: { modules: { classNameStrategy: "non-scoped" } },
  },
});
