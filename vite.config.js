const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    minify: true,
    outDir: "dist",
    sourcemap: false,
    lib: {
      name: "khan-table",
      entry: path.resolve(__dirname, "src/lib/index.ts"),
      fileName: (format) => `khan-table.${format}.js`,
    },
    rollupOptions: {},
  },
});
