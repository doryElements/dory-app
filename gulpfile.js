const del = require('del');
const  gzip = require('gulp-gzip');

const gulp = require('gulp');
const polymerBuildUtils = require('gulp-polymer-build-utils');
const runSequence = require('run-sequence');
const yargs = require('yargs');

const argv = polymerBuildUtils.addYargs(yargs).help().argv;

gulp.task('clean', ['build:clean', 'dist:clean' ]);
gulp.task('dist:clean', () => del(['dist' ]));
gulp.task('build:clean', () => del(['build' ]));

gulp.task('dist:prepare', ['dist:clean'], () => {
    const config = require('./polymer.json');
    console.log(config);
    return polymerBuildUtils.polymerBuild(config)
        .pipe(gulp.dest('dist'));
});
gulp.task('default', cb => {
    return runSequence('dist:prepare', 'inline-references', cb);
});
gulp.task('dist:test', function() {
    return polymerBuildUtils.runWct(argv);
});

gulp.task('gzip', function () {
    return gulp.src(['build/**/*'])
        .pipe(gzip())
        .pipe(gulp.dest('dist/gzip'));
});
