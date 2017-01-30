'use strict'

const gulp = require('gulp')
const exec = require('child_process').exec
 
gulp.task('backend', function (cb) {
  exec('node ../backend/bin/www', function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  });
})