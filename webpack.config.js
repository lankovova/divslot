const path = require('path');

/*global __dirname:true*/
const config = {
	devtool: 'source-map',
	entry: ['babel-polyfill', './src/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.js']
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: [/node_modules/],
				use: 'babel-loader'
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, './dist'),
		compress: true,
		port: 8080
	}
};

module.exports = config;
