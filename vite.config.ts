import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({ include: ["src"], exclude: ["src/**/*.stories.ts", "src/**/*.test.ts"] }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: [/^lit/],
    },
    sourcemap: true,
  },
});
