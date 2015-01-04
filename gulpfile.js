var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cleanhtml = require('gulp-cleanhtml'),
    minifycss = require('gulp-minify-css'),
    htmlreplace = require('gulp-htmlreplace'),
    livereload = require('gulp-livereload');

gulp.task('serve', function () {
    connect.server({
        livereload: true,
        root: 'app'
    });
});

gulp.task('preview', function () {
    connect.server({
        root: 'dist'
    });
});

gulp.task('watch', function () {
    gulp.watch('app/styles/*.scss', ['styles']);
    gulp.watch('app/scripts/*.js', ['scripts']);
});

gulp.task('styles', function () {
    gulp.src('app/styles/main.scss')
        .pipe(sass({sourceMap: true, style: 'compact'}))
        .pipe(gulp.dest('app/styles'))
        .pipe(connect.reload());
});

gulp.task('scripts', function () {
    gulp.src('app/scripts/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(connect.reload());
});

gulp.task('build', function () {

    gulp.src('app/styles/main.scss')
        .pipe(sass({style: 'compact'}))
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/assets/css'));

    gulp.src('app/index.html')
        .pipe(htmlreplace({
            'styles': 'assets/css/main.min.css',
            'vendor': 'assets/js/vendor.min.js',
            'scripts': 'assets/js/app.min.js'
        }))
        .pipe(cleanhtml())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['styles', 'scripts', 'watch', 'serve'])
