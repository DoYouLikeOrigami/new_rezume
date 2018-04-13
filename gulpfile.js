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
      src: './joint/static/css',
      location: './joint/dev/less/style.less',
      watch: [
          './joint/dev/less/*.less',
          './joint/dev/less/_*/*.less',
          './joint/dev/less/_*/**/*.less',
      ],
      entryPoint: './joint/static/css/style.css',
      destination: './joint/static/css'
    },

    pug: {
			pages: './joint/dev/pug/pages/*.pug',
			watch: ['./joint/dev/pug/blocks/**/*.pug',
							'./joint/dev/pug/pages/**/*.pug',
							'./joint/dev/pug/layouts/**/*.pug',
							'./joint/dev/pug/icons/**/*.pug',
							'./joint/dev/pug/mixins.pug'],
			convertFolder: './joint/templates'
		},

    js: {
    	files: './joint/dev/js/modules/*.js',
    	libs: './joint/dev/js/libs/*.js',
    	run: './joint/dev/js/run.js',
    	watch: ['./joint/dev/js/**/*.js'],
    	convertFolder: './joint/static/js'
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
