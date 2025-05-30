const { resolve } = require("path");
const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
	...defaultConfig,
	output: {
		filename: "[name].js",
		chunkFilename: "[name].js?ver=[chunkhash]",
		path: resolve(process.cwd(), "../../../../build/blocks/player"),
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.(jsx?|tsx?)$/,
				use: ["ts-loader"],
				exclude: [/node_modules/],
			},
			{
				test: /\.js\.map$/,
				loader: "ignore-loader",
				enforce: "pre",
			},
		],
	},
	resolve: {
		alias: {
			...defaultConfig.resolve.alias,
			"@": resolve(__dirname, "./src/"),
			"@_types": resolve(__dirname, "../../../../types/"),
		},
		extensions: [".js", ".jsx", ".ts", ".tsx", "..."],
	},
};
