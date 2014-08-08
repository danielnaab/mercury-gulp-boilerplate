'use strict';

var _ = require('lodash')
var browserify = require('browserify')
var connect = require('gulp-connect')
var es6Browserify = require('es6-browserify')
var gulp = require('gulp')
var gutil = require('gulp-util')
var jsxify = require('mercury-jsxify')
var rimraf = require('gulp-rimraf')
var sass = require('gulp-sass')
var size = require('gulp-size')
var source = require('vinyl-source-stream')
var useref = require('gulp-useref')
var watchify = require('watchify')

var DEBUG = true


function scripts(watch) {
    var args
    if (watch) {
        args = _.clone(watchify.args)
    }
    else {
        args = {}
    }
    args.debug = DEBUG

    var bundler = browserify('./app/scripts/app.js', args)
        .transform(jsxify, {es6: true})
        .transform(es6Browserify)

    if (watch) {
        bundler = watchify(bundler)
    }

    bundler.transform(jsxify)

    function rebundle() {
        gutil.log('(watchify) rebundling... ')

        return bundler.bundle()
            // log errors if they happen
            .on('error', function(e) {
                gutil.log('Browserify Error', e)
            })
            .pipe(source('app.js'))
            .pipe(gulp.dest('./dist/scripts'))
            .pipe(connect.reload())
    }

    bundler.on('update', rebundle)
    return rebundle()
}


gulp.task('clean', function () {
    return gulp.src(['dist/**'], {read: false})
        .pipe(rimraf())
})


gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: 9000,
        livereload: true
    })
})


gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'))
        .pipe(size())
        .pipe(connect.reload())
})


gulp.task('scripts', function() {
    return scripts(false)
})


gulp.task('styles', function () {
    return gulp.src('./app/styles/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/styles'))
        .pipe(size())
        .pipe(connect.reload())
})


gulp.task('watch', ['html', 'connect'], function() {
    gulp.watch('app/styles/**/*.scss', ['styles'])

    return scripts(true)
})
