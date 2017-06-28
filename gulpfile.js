'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync').create()

var path = {
	HTML:'*.html',
};

gulp.task("html",function(){
	return gulp.src(path.HTML)
	.pipe(browserSync.stream());
});

gulp.task("serve",function(){
	gulp.start('html');	
	browserSync.init({
		server:{
			//baseDir: './'
		}
	});
	gulp.watch(path.HTML).on('change', browserSync.reload);
});
gulp.task('default',['serve']);