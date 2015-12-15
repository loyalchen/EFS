module.exports = {
	entry: {
<<<<<<< HEAD
		tutorial:"./dev/component/tutorial.js"
=======
		siCargo:"./dev/flux/siCargo/index.js",
		test:"./dev/flux/test/index.js",
		uTest:"./dev/test/siCargoTableTest.js"
>>>>>>> d2ba88d3e3084d97ac5819fc1264d64a6a9894e9
	},
	output: {
		path: __dirname + "/public/built/js/",
		filename: '[name].js'
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