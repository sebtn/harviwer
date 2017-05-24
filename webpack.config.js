let path = require('path')
let webpack = require('webpack')

module.exports = {
	entry: {
		path: ['./src/app.jsx']
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename:'index.js'
	},
	devServer: {
		inline: true,
		contentBase: './public',
		port: 3000
	},	
	module: {
		loaders: 
		[	
			{
				test: /\.js|jsx?$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.(scss|css)$/,
				loader: 'style-loader!css-loader!sass-loader'
			},
			{
				test: /\.(jpg|png|jpeg|svg|ttf|woff|woff2|eot)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader'
			},
			{
				test: /\.(json)$/,
				exclude: /(node_modules)/,
				loader: 'json-loader'
			}		
		]
	}
}