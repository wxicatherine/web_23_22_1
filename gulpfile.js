// Імпортуємо всі необхідні модулі
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// Таск для HTML
gulp.task('html', () => {
    return gulp.src('./app/**/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

// Таск для SCSS
gulp.task('scss', () => {
    return gulp.src('./app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

// Таск для JS
gulp.task('js', () => {
    return gulp.src('./app/js/**/*.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
});

// Таск для зображень
gulp.task('images', () => {
    return gulp.src('./app/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/imgs'))
        .pipe(browserSync.stream());
});

// Таск для запуску сервера і спостереження за файлами
gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './dist'  // Запуск сервера із папки dist
        }
    });

    // Слідкувати за змінами у файлах і запускати відповідні таски
    gulp.watch('./app/**/*.html', gulp.series('html'));
    gulp.watch('./app/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('./app/js/**/*.js', gulp.series('js'));
    gulp.watch('./app/img/**/*', gulp.series('images'));
});

// Таск за замовчуванням (виконується при запуску gulp)
gulp.task('default', gulp.series('html', 'scss', 'js', 'images', 'serve'));