module.exports = {
	entry: "./dev/flux/siCargo/index.js",
	output: {
		path: __dirname + "/public/built/",
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