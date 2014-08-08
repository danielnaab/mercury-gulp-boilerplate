'use strict';

var _ = require('lodash'),
    browserify = require('browserify'),
    cache = require('gulp-cache'),
    connect = require('gulp-connect'),
    es6Browserify = require('es6-browserify'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    gutil = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    jsxify = require('mercury-jsxify'),
    minifycss = require('gulp-minify-css'),
    rimraf = require('gulp-rimraf'),
    sass = require('gulp-sass'),
    size = require('gulp-size'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    watchify = require('watchify')


function scripts(watch, debug) {
    var args
    if (watch) {
        args = _.clone(watchify.args)
    }
    else {
        args = {}
    }
    args.debug = debug

    var bundler = browserify('./app/scripts/app.js', args)
        .transform(jsxify, {es6: true})
        .transform(es6Browserify)

    if (watch) {
        bundler = watchify(bundler)
    }

    bundler.transform(jsxify)

    function rebundle() {
        gutil.log('Bundling... ')

        return bundler.bundle()
            // log errors if they happen
            .on('error', function(e) {
                gutil.log('Browserify Error', e)
            })
            .pipe(source('app.js'))
            .pipe(gulpif(!debug, streamify(uglify())))
            .pipe(gulp.dest('./dist/scripts'))
            .pipe(connect.reload())
    }

    bundler.on('update', rebundle)
    return rebundle()
}


gulp.task('clean', function () {
    return gulp.src(['dist'], {read: false})
        .pipe(rimraf())
})


gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: 9000,
        livereload: true
    })
})


gulp.task('html', ['clean'], function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'))
        .pipe(size())
        .pipe(connect.reload())
})


gulp.task('images', ['clean'], function () {
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


function styles(debug) {
    return gulp.src('./app/styles/app.scss')
        .pipe(sass())
        .pipe(gulpif(!debug, minifycss()))
        .pipe(gulp.dest('./dist/styles'))
        .pipe(size())
}


gulp.task('dist', ['clean', 'html'], function() {
    styles(false)
    return scripts(false, false)
})


gulp.task('watch', ['html', 'images', 'connect'], function() {
    gulp.watch('app/*.html', ['html']);
    gulp.watch('app/styles/**/*.scss', ['styles'])
    gulp.watch('app/image/**/', ['images'])

    var debug = true
    styles(debug)
    return scripts(true, debug)
})
