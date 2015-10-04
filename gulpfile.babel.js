'use strict';

import gulp from 'gulp';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import clean from 'gulp-clean';
import insert from 'gulp-insert';
import pkg from './package.json';

const dirs = {
  src: 'lib',
  dest: 'dist'
};

const paths = {
  lib: `${dirs.src}/**/*.js`,
  dist: `${dirs.dest}/**/*`
};

const year = new Date().getFullYear();

const banner = `/**
 * ${pkg.name} - ${pkg.description}
 * Version v${pkg.version} - ${pkg.homepage}
 * Copyright (c) ${year} ${pkg.author.name} - ${pkg.license} license
 */
`;

const prefs = {
  uglify: {
    output: {
      ascii_only: true,
      max_line_len: 128000
    },
    compress: {
      negate_iife: false
    }
  },
  rename: {
    suffix: '.min',
  }
};

gulp.task('clean', () => {
  return gulp.src(paths.dist, { read: false })
    .pipe(clean());
});

gulp.task('copy', ['clean'], () => {
  return gulp.src(paths.lib)
    .pipe(gulp.dest(dirs.dest));
});

gulp.task('minify', ['clean'], () => {
  return gulp.src(paths.lib)
    .pipe(uglify(prefs.uglify))
    .pipe(insert.prepend(banner))
    .pipe(rename(prefs.rename))
    .pipe(gulp.dest(dirs.dest));
});

gulp.task('default', ['clean', 'copy', 'minify']);