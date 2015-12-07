module.exports = {
	entry: "./dev/pageJs/siCargo.js",
	output: {
		path: __dirname + "/built/javascript/",
		filename: 'siCargo.js'
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: "style!css"
		}, {
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_comonents)/,
			loader: "babel",
			query: {
				presets: ["es2015", "react"]
			}
		}, {
			test: /\.js$/,
			exclude: /(node_modules|bower_comonents)/,
			loader: "babel",
			query: {
				presets: ["es2015", "react"]
			}
		}]
	}
}