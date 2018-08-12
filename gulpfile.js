const gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger'),
    browserSync = require("browser-sync"),
    babel = require('gulp-babel'),
    concat = require("gulp-concat"),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-clean-css'),
    connect = require('gulp-connect')
reload = browserSync.reload;

gulp.task('connect', function() {
    connect.server({
        root: 'build',
        livereload: true
    });
});

const path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/**/*.js', //В стилях и скриптах нам понадобятся только main файлы
        style: 'src/**/*.css',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/**/*.js',
        style: 'src/**/*.css',
        img: 'src/img/**/*.*',
    },
    clean: './build'
};

const config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Gugaev"
};

gulp.task('html:build', function() {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(connect.reload());
});

gulp.task('js:build', function() {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('main.js')) //Прогоним через rigger //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(connect.reload());
});

gulp.task('style:build', function() {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sourcemaps.init())
        .pipe(concat('main.css')) //То же самое что и с js
        .pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(connect.reload());
});

gulp.task('image:build', function() {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(connect.reload());
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'image:build'
]);

gulp.task('watch', function() {
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
});

gulp.task('clean', function(cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'connect', 'watch']);