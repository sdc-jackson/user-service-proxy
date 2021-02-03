const path = require('path');

module.exports = {
	entry: './client/src/index.jsx',
	output: {
		path: path.resolve(__dirname, 'client', 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				include: path.resolve(__dirname, 'client', 'src'),
				loader: 'babel-loader'

			},
			{
				test: /\.(css)/,
				use: [
					{loader: "style-loader"},
					{loader: "css-loader"}
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options: {
					outputPath: 'fonts/'
				}
			}
		]
	}
}