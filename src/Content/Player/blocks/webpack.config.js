const path = require("path");
const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
	...defaultConfig,
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
			"@": path.resolve(__dirname, "./src/"),
			"@_types": path.resolve(__dirname, "../../../../types/"),
		},
		extensions: [".js", ".jsx", ".ts", ".tsx", "..."],
	},
};
