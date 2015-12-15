var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var rename = require("gulp-rename");

gulp.task('default',function(){
	gulp.src('./node_modules/bootstrap/dist/css/*.min.css')
		.pipe(gulp.dest('./public/css'));

	gulp.src('./dev/css/*.css')
		.pipe(minifyCss())
		.pipe(rename(function(path){
			path.basename += '.min';
		}))
		.pipe(gulp.dest('./public/built/css'));
	gulp.src('./node_modules/bootstrap/dist/fonts/*')
		.pipe(gulp.dest('./public/fonts'));
	gulp.src('./node_modules/bootstrap/dist/js/*.min.js')
		.pipe(gulp.dest('./public/js'));

	gulp.src('./public/built/js/uTest.js')
		.pipe(gulp.dest('./test'));
});


var watcher = gulp.watch(['./dev/css/*.css','./public/built/js/uTest.js'],['default']);
watcher.on('change',function(event){
	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});