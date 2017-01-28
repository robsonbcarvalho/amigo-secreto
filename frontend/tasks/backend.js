'use strict'

const gulp = require('gulp'),
    	nodemon = require('gulp-nodemon');

gulp.task('backend', function(cb) {
	let started = false;

  return nodemon({
		script: '../backend/bin/www'
  }).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		}
	}) 
})