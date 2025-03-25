const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "podcast-episode-metabox.js",
    path: path.resolve(__dirname, "../../../scripts"),
  },
  module: {
    rules: [
      // {
      //   test: /\.(?:js|jsx|mjs|cjs)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader",
      //   },
      // },
      {
        test: /\.(jsx?|tsx?)$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Run PostCSS on CSS
          "postcss-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
          // Run PostCSS on CSS
          "postcss-loader",
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@_types": path.resolve(__dirname, "../../../types/")
    },
    extensions: ["", ".js", ".jsx", ".ts", ".tsx"],
  },
};
