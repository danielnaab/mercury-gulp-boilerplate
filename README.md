# mercury-gulp-boilerplate
This is a starter project for [mercury][1] using [gulp.js][2], [browserify][3],
[es6-browserify][4], [mercury-jsxify][5], and [sass][6]. I worked on this as a
learning exercise, so would appreciate any suggestions or pull requests.

Note that the `gulpfile.js` will handle compilation, but it does not currently
produce a proper minimized distributable.

## Install
```shell
npm install
```

This will install all dependencies into a local `node_modules` directory. Then,
use the `watch` task to start a local dev server on port 9000:
```shell
gulp watch
```

## Features
This gulp project includes the following features:

- browserify bundling
- live reload
- jsx compilation
- es6 support (limited)
- sass/scss compilation

## Opinions/Assumptions
- I tried to build a class-based component system. In this boilerplate, there
is no distinction between controllers and views - the view is simply a `render`
method on the component class.


[1]: https://github.com/Raynos/mercury
[2]: http://gulpjs.com/
[3]: http://browserify.org/
[4]: https://github.com/reissbaker/es6-browserify
[5]: https://github.com/Raynos/mercury-jsxify
[6]: http://sass-lang.com/
