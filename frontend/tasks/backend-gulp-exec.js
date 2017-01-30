const gulp = require('gulp')
var exec = require('gulp-exec')
 
gulp.task('backend', function() {
  var options = {
    continueOnError: false, 
    pipeStdout: false, 
    customTemplatingThing: "test"  
  };
  var reportOptions = {
  	err: true,
  	stderr: true,
  	stdout: true
  }
  return gulp.src('./**/**')
    .pipe(exec('node ../backend/bin/www', options))
    .pipe(exec.reporter(reportOptions));
});