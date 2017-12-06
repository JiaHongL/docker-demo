var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

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

gulp.task('uglify', function () {
    return gulp.src('./js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .on('error', function (err) {
            console.log('[Compilation Error]');
            console.log(err.fileName + (err.loc ? `( ${err.loc.line}, ${err.loc.column} ): ` : ': '));
            console.log('error Babel: ' + err.message + '\n');
            console.log(err.codeFrame);
            this.emit('end');
        })
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('min'));
});

gulp.task('watch', function () {
    gulp.watch('./style/scss/*.scss', ['sass']);
    gulp.watch('./js/*.js', ['uglify']);
});

gulp.task('default', ['webserver', 'sass', 'uglify', 'watch']);