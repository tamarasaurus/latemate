'use strict';

var gulp = require('gulp');
var express = require('express');
var routes = require('./routes');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var stylus = require('gulp-stylus');
var prefix = require('gulp-autoprefixer');

var app = express();


// serve
gulp.task('serve', function() {
	app.use(express.static(__dirname + '/public'));
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	routes(app);
	app.listen(3000);
});


// stylus
gulp.task('stylus', function() {
	gulp.src('./src/css/**/*.styl')
		.pipe(stylus())
		.pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
		.pipe(gulp.dest('./public/css'));

});

//browserify
gulp.task('browserify', function() {
	gulp.src('./src/js/*.js')
		.pipe(browserify())
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['browserify', 'stylus', 'serve']);