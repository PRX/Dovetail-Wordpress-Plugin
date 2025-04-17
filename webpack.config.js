const defaults = require("@wordpress/scripts/config/webpack.config");
const path = require("path");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");

// The plugin configuration overrides.
const plugins = [
  new RemoveEmptyScriptsPlugin({
    stage: RemoveEmptyScriptsPlugin.STAGE_AFTER_PROCESS_PLUGINS,
  }),
];

module.exports = {
  ...defaults,
  entry: {
    ...defaults.entry,
    metaboxPodcastEpisode: path.resolve(
      process.cwd(),
      "packages/metabox/podcast-episode/build",
      "index.js",
    ),
  },
  // module: {
  //   ...defaults.module,
  //   rules: [
  //     ...defaults.module.rules,
  //     // {
  //     //   test: /\.(?:js|jsx|mjs|cjs)$/,
  //     //   exclude: /node_modules/,
  //     //   use: {
  //     //     loader: "babel-loader",
  //     //   },
  //     // },
  //     {
  //       test: /\.(jsx?|tsx?)$/,
  //       use: ["ts-loader"],
  //       exclude: /node_modules/,
  //     },
  //     {
  //       test: /\.css$/i,
  //       exclude: /node_modules/,
  //       use: [
  //         // Creates `style` nodes from JS strings
  //         "style-loader",
  //         // Translates CSS into CommonJS
  //         "css-loader",
  //         // Run PostCSS on CSS
  //         "postcss-loader",
  //       ],
  //     },
  //     {
  //       test: /\.s[ac]ss$/i,
  //       exclude: /node_modules/,
  //       use: [
  //         // Creates `style` nodes from JS strings
  //         "style-loader",
  //         // Translates CSS into CommonJS
  //         "css-loader",
  //         // Compiles Sass to CSS
  //         "sass-loader",
  //         // Run PostCSS on CSS
  //         "postcss-loader",
  //       ],
  //     },
  //   ],
  // },
  plugins: [
    ...defaults.plugins.filter(
      (plugin) =>
        !plugins.some((p) => p.constructor.name === plugin.constructor.name),
    ),
    ...plugins,
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};
