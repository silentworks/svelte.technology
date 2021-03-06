const config = require('sapper/webpack/config.js');
const webpack = require('webpack');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

module.exports = {
	entry: config.client.entry(),
	output: Object.assign(config.client.output(), {
		globalObject: 'this'
	}),
	resolve: {
		extensions: ['.js', '.json', '.html']
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						hydratable: true,
						hotReload: true,
						dev
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	mode,
	plugins: [
		dev && new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.browser': true,
			'process.env.NODE_ENV': JSON.stringify(mode)
		})
	].filter(Boolean),
	devtool: dev ? 'inline-source-map' : false
};