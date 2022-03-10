const path = require("path");
const { defineConfig } = require("vite");
const packageName = require("./package.json").name;

module.exports = defineConfig({
  build: {
    minify: true,
    outDir: "dist/lib",
    sourcemap: false,
    lib: {
      name: packageName,
      entry: path.resolve(__dirname, "src/lib/index.ts"),
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {},
  },
});
