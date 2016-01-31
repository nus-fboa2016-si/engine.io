const gulp = require('gulp');
const mocha = require('gulp-mocha');
const babel = require("gulp-babel");
const help = require("gulp-task-listing");
const eslint = require("gulp-eslint");

const TESTS = 'test/*.js';
const REPORTER = 'dot';

gulp.task("help", help);

gulp.task("default", ["test", "lint", "builds"]);

gulp.task("lint", function () {
    return gulp.src(["**/*.js", "!node_modules/**"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('test', function(){
    return gulp.src(TESTS, {read: false})
    .pipe(mocha({
      timeout: 2000,
      reporter: REPORTER,
      bail: true,
      globals: [
          '___eio',
          'document'
      ]
    }))
    .once('error', function(){
      process.exit(1);
    })
    .once('end', function(){
      process.exit();
    });
});

// By default, individual js files are transformed by babel and exported to /dist
gulp.task("build", function(){
    return gulp.src(["lib/*.js","lib/transports/*.js"], { base: 'lib' })
        .pipe(babel({ "presets": ["es2015"] }))
        .pipe(gulp.dest("dist"));
});
