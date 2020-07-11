var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglifyes'),
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    browserSync = require("browser-sync"),
    concat = require('gulp-concat'),
    reload = browserSync.reload;

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        media: 'build/media/',
        root: 'build/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: [

            'node_modules/jquery/dist/jquery.min.js',
            //'node_modules/slick-carousel/slick/slick.min.js',
            // 'node_modules/object-fit-images/dist/ofi.min.js',
            'node_modules/svg4everybody/dist/svg4everybody.legacy.min.js',
            'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
            //'node_modules/wowjs/dist/wow.min.js',
            //'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',

            //'node_modules/jquery-mask-plugin/dist/jquery.mask.min.js',
            //'node_modules/parsleyjs/dist/parsley.min.js',
            //'node_modules/js-parallax/dist/parallax.min.js',

            'src/js/main.js',
        ],
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        media: 'src/media/**/*.*',
        root: 'src/root/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        root: 'src/root/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};
var config = {
    server: {
        baseDir: "./build"
    },
    // tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};
gulp.task('html:build', function () {
    return gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});
gulp.task('js:build', function () {
    return gulp.src(path.src.js) //Найдем наш main файл
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())//Сожмем наш js

        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});
gulp.task('style:build', function () {
    return gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sass()) //Скомпилируем
        .pipe(concat('styles.min.css'))
        .pipe(prefixer({
            overrideBrowserslist: ['last 10 versions'],
            cascade: false
        })) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});
gulp.task('image:build', function () {
    return gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: false},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});
gulp.task('fonts:build', function (done) {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
    done();
});
gulp.task('media:build', function (done) {
    gulp.src(path.src.media)
        .pipe(gulp.dest(path.build.media))
    done();
});
gulp.task('root:build', function (done) {
    gulp.src(path.src.root)
        .pipe(gulp.dest(path.build.root))
    done();
});
gulp.task('build', gulp.series([
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'media:build',
    'root:build',
    'image:build'
]));
gulp.task('watch', function () {
    watch([path.watch.html], gulp.series('html:build') );
    watch([path.watch.style],gulp.series('style:build') );
    watch([path.watch.js], gulp.series('js:build'));
    watch([path.watch.root], gulp.series('root:build'));
    watch([path.watch.img],  gulp.series('image:build'));
    watch([path.watch.fonts], gulp.series('fonts:build'));
});
gulp.task('webserver', function () {
    browserSync(config);
});
gulp.task('default', gulp.parallel(['build', 'webserver', 'watch']));
