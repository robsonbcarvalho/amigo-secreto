'use strict';

const gulp = require('gulp'),
    	webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      host : '127.0.0.1',
      port : 3001,
      livereload : true,
      fallback : 'index.html'
    }))
})
