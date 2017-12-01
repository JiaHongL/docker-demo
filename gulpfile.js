var gulp = require('gulp');
var webserver = require('gulp-webserver');
var compass   = require('gulp-compass');

// I.webserver
gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      port:1234,
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    }));
});

// II.Sass編譯
gulp.task('compass',function(){
    return gulp.src('./style/scss/*.scss')
        .pipe(compass({
            sourcemap: true,
            time: true,
      css: './style/css/',
      sass: './style/scss/',
      style: 'compact' //nested, expanded, compact, compressed
        }))
        .pipe(gulp.dest('./style/css/'));
})

// III.監聽.scss檔案異動
gulp.task('watch',function(){
    gulp.watch('./style/scss/*.scss',['compass']);
});

// 預設 task
gulp.task('default',['webserver','compass','watch']);
