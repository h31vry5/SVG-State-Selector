
var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var babel = require("gulp-babel");
var img = require('gulp-imagemin');
var clean = require('del');
var browserSync = require('browser-sync').create();
var jeditor = require("gulp-json-editor");

gulp.task('scss', async function () {
  return gulp.src('./src/scss/main.scss')
    .pipe(sass.sync({
      includePaths: ['node_modules']
    }).on('error', sass.logError))
    .pipe(gulp.dest('./public_html/dist/styles'))
    .pipe(browserSync.stream());
});

gulp.task('js', function () {
  return gulp.src("./src/js/*.js")
    .pipe(babel())
    .pipe(gulp.dest("./public_html/dist/js"));
});

gulp.task('img', function() {
  return gulp.src('./src/imgs/*')
  .pipe(gulp.dest('./public_html/dist/imgs'))
})

gulp.task('json', function() {
  return gulp.src('./src/data/*.json')
  .pipe(gulp.dest('./public_html/dist/data'))
})

gulp.task('modules', function() {
  sources = [
    './node_modules/external-svg-loader/dist/svg-loader.min.js'
  ]
  
  return gulp.src( sources )
  .pipe(gulp.dest('./public_html/dist/modules/'));
});


gulp.task('clean', function(){
  return clean('./public_html/dist/**', {force:true});
});

gulp.task('watch', async function () {
    gulp.watch('./src/sass/**/*.scss', gulp.series('scss'));
    gulp.watch('./src/js/**/*.js', gulp.series('js'));
    gulp.watch('./src/images/*', gulp.series('img'));
    gulp.watch('./src/images/*', gulp.series('json'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
      server: {
        baseDir: "./public_html"
      }
    });

    gulp.watch("*").on('change', browserSync.reload);
});

gulp.task('default', gulp.series('clean', 'scss', 'js', 'json', 'modules', 'img', 'watch', 'browser-sync'));

gulp.task('build', gulp.series('clean', 'scss', 'js', 'json', 'modules', 'img'));