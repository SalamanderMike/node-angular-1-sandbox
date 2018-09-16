const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		app: './app/app.js',
		vendor: [
			'angular',
			'angular-animate',
			'angular-route'
		]
	},
	output: {
		path: path.resolve('public'),
		filename: '[name].bundle.js',
		publicPath: '/public'
	},
	resolve: {
		modules: [
			'node_modules',
			path.resolve(__dirname, 'node_modules')
			], 
		extensions: ['.js'] 
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /angular/,
					name: 'vendor',
					chunks: 'all'
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.js/,
				use: [
				{ loader: 'ng-annotate-loader' },
				{ loader: 'babel-loader',
					options: { presets: ['env'] }
				}]
			},
			{
				test: /\.scss$/,
				use: [
						'style-loader', 
						MiniCssExtractPlugin.loader,
						'css-loader', 
						'sass-loader'
				]
			},
			{
				test: /\.css$/, 
				use: [
					"css-loader"
				]
			},
			{
				test: /\.(jpg|jpeg|gif|png)$/,
				use: [
				{ 	loader: 'url-loader',
					options: {
						limit: 2000,
						outputPath: '/images/',
						name: '[name].[ext]'
					}
				}]
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '/css/style.css'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		})
	]
};
