'use strict';

var _ = require('lodash'),
    browserify = require('browserify'),
    cache = require('gulp-cache'),
    connect = require('gulp-connect'),
    es6Browserify = require('es6-browserify'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    jsxify = require('mercury-jsxify'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    rimraf = require('gulp-rimraf'),
    sass = require('gulp-sass'),
    size = require('gulp-size'),
    source = require('vinyl-source-stream'),
    useref = require('gulp-useref'),
    watchify = require('watchify')

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


gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe(size())
        .pipe(connect.reload());
});


gulp.task('scripts', function() {
    return scripts(false)
})


gulp.task('styles', function () {
    return gulp.src('./app/styles/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/styles'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/styles'))
        .pipe(size())
        .pipe(connect.reload())
})


gulp.task('watch', ['html', 'styles', 'connect'], function() {
    gulp.watch('app/styles/**/*.scss', ['styles'])
    gulp.watch('app/image/**/', ['images'])

    return scripts(true)
})
