var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');

gulp.task('webserver', function () {
    gulp.src('./')
        .pipe(webserver({
            port: 3000,
            livereload: true,
            directoryListing: false,
            host: '0.0.0.0',
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

gulp.task('default', ['webserver', 'sass', 'sass:watch']);