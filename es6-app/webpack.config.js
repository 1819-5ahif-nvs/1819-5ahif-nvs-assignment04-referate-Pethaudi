const path = require('path');

module.exports = {
	entry: "./src/main.js",
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname + "/src", "dist")
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["css-loader"]
			},
			{
				test: /\.html$/,
				use: ["html-loader"]
			}
		]
	}
}