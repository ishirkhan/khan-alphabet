module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: "3.x",
        targets: { node: "current" },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: ["transform-class-properties"],
};
