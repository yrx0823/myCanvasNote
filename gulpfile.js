'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var clearfix = require('postcss-clearfix');//清除浮动 clear：fix
var crip = require('postcss-crip');//css缩写
var postcssCenter = require('postcss-center');//居中top:center,left:center
var sass = require('gulp-sass');//scss
var autoprefixer = require('autoprefixer');//css自动补全
var px2rem = require('postcss-px2rem');

var path = {
	HTML:'*.html',
	SCSS:'scss/*.scss',
	CSS:'css',
	JS:'js/*.js'
};
gulp.task('sass', function () {
	var processors = [
		clearfix,
		crip,
		postcssCenter,
		px2rem({remUnit:75}),
		autoprefixer, 
	];
	return gulp.src(path.SCSS)
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(postcss(processors)) 
	.pipe(gulp.dest(path.CSS))	
	.pipe(browserSync.stream());
});
gulp.task("js",function(){
	return gulp.src(path.JS)
	.pipe(browserSync.stream());
});
gulp.task("html",function(){
	return gulp.src(path.HTML)
	.pipe(browserSync.stream());
});

gulp.task("serve",function(){
	gulp.start('sass','js','html');	
	browserSync.init({
		server:{
			//baseDir: './'
		}
	});
	gulp.watch(path.SCSS,['sass']);
	gulp.watch(path.JS,['js']);
	gulp.watch(path.HTML).on('change', browserSync.reload);
});
gulp.task('default',['serve']);