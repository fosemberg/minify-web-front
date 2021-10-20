const path = require('path');

const { src, dest, parallel, series } = require('gulp');
const minifyHtml = require('gulp-htmlmin');
const minifyHtmlInline = require('gulp-minify-inline');
const minifyCss = require('gulp-clean-css');
const minifyJs = require('gulp-minify');

const pathToData = path.join('data');
const pathToBuild = path.join('build');

const pathToFiles = path.join(`${pathToData}${path.sep}**${path.sep}*`);
const pathToHtml = path.join(`${pathToFiles}.html`);
const pathToCss = path.join(`${pathToFiles}.css`);
const pathToJs = path.join(`${pathToFiles}.js`);

const compressHtml = () => src(pathToHtml)
  .pipe(minifyHtml({ collapseWhitespace: true }))
  .pipe(minifyHtmlInline())
  .pipe(dest(pathToBuild));

const compressCss = () => src(pathToCss)
  .pipe(minifyCss())
  .pipe(dest(pathToBuild));

const compressJs = () => src(pathToJs)
  .pipe(minifyJs({
    ext: {
      min: '.js'
    },
    noSource: true
  }))
  .pipe(dest(pathToBuild));

const copyFiles = () => src(pathToFiles)
  .pipe(dest(pathToBuild));

exports.default = series(
  copyFiles,
  parallel(compressHtml, compressCss, compressJs)
);
