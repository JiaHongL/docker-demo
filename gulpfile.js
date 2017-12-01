var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');

gulp.task('webserver', function () {
    gulp.src('./')
        .pipe(webserver({
            port: 1234,
            livereload: true,
            directoryListing: false,
            open: true,
            fallback: 'index.html'
        }));
});

gulp.task('sass', function () {
    return gulp.src('./style/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./style/css/'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./style/scss/*.scss', ['sass']);
});

// 預設 task
gulp.task('default', ['webserver', 'sass', 'sass:watch']);