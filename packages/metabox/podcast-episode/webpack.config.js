const { resolve } = require( 'path' );

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "podcast-episode-metabox.js",
    path: resolve( process.cwd(), "../../../build/admin/metabox"),
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
      "@": resolve(__dirname, "./src/"),
      "@_types": resolve(__dirname, "../../../types/")
    },
    extensions: ["", ".js", ".jsx", ".ts", ".tsx"],
  },
};
