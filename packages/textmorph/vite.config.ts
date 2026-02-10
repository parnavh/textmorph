import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { viteStaticCopy } from "vite-plugin-static-copy";
import postcss from "postcss";
import cssnano from "cssnano";

export default defineConfig({
  plugins: [
    dts(),
    viteStaticCopy({
      targets: [
        {
          src: "src/**/*.css",
          dest: "styles",
          transform: async (contents) => {
            const result = await postcss([cssnano()]).process(
              contents.toString(),
            );
            return result.css;
          },
        },
        {
          src: "src/**/*.svelte",
          dest: "svelte",
          transform: async (contents) => {
            return contents
              .toString()
              .replace(/from\s+['"]@\/core['"]/g, `from 'textmorph'`);
          },
        },
      ],
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [],
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
