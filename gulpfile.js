'use strict';

/* --------- plugins --------- */

var
  gulp = require('gulp'),
  less = require('gulp-less'),
  plumber = require('gulp-plumber'),
  autoprefixer = require('autoprefixer'),
  flexboxfixer = require('postcss-flexbugs-fixes'),
  postcss = require('gulp-postcss'),
  cssnano = require('cssnano'),
  rename = require('gulp-rename'),
  pug = require('gulp-pug'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat');

/* --------- paths --------- */

var
  paths = {

    style: {
      src: './deploy/css',
      location: './dev/less/style.less',
      watch: [
          './dev/less/*.less'
      ],
      entryPoint: './deploy/css/style.css',
      destination: './deploy/css'
    },

    pug: {
			pages: './dev/pug/pages/*.pug',
			watch: ['./dev/pug/blocks/**/*.pug',
							'./dev/pug/pages/**/*.pug',
							'./dev/pug/layouts/**/*.pug',
							'./dev/pug/icons/**/*.pug'],
			convertFolder: './deploy'
		},

    js: {
    	files: './dev/js/modules/*.js',
    	libs: './dev/js/libs/*.js',
    	run: './dev/js/run.js',
    	watch: ['./dev/js/**/*.js'],
    	convertFolder: './deploy/js'
    }
  };

/* --------- style --------- */

gulp.task('style', function () {
  return gulp.src(paths.style.location)
    .pipe(less())
    .pipe(gulp.dest(paths.style.destination))
    .pipe(rename('style.min.css'))
    .pipe(postcss([
    	flexboxfixer,
      autoprefixer({
        browsers: [
          'last 4 version',
          'last 4 Chrome versions',
          'last 4 Firefox versions',
          'last 4 Opera versions',
          'last 2 Edge versions'
        ]
      }),
      cssnano({
        safe: true
      })
    ]))
    .pipe(gulp.dest(paths.style.destination));
});

/* --------- pug --------- */

gulp.task('pug', function() {
	gulp.src(paths.pug.pages)
		.pipe(pug({
			pretty: '\t',
		}))
		.pipe(gulp.dest(paths.pug.convertFolder));
});

/* --------- js --------- */
gulp.task('js', function() {
  gulp.src([paths.js.libs, paths.js.files, paths.js.run])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.convertFolder));
});

/* --------- watch --------- */

gulp.task('watch', ['style', 'pug', 'js'], function () {
  gulp.watch(paths.style.watch, ['style']);
  gulp.watch(paths.js.watch, ['js']);
  gulp.watch(paths.pug.watch, ['pug']);
});

/* --------- default --------- */

gulp.task('default', ['style', 'pug', 'js', 'watch']);
