var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var Server = require('karma').Server;
var sourcemaps =  require('gulp-sourcemaps');
var tsc = require('gulp-typescript');

var tsProject = tsc.createProject('tsconfig.json');

gulp.task('default', ['test', 'minify']);


var config = {

}

/**
 * Compile TypeScript
 */
gulp.task('compile-ts', function () {
    var sourceTsFiles = [
        'src/**/*.ts',      //path to typescript files
        'typings/**/*.ts'   //reference to library .d.ts files
    ];

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc(tsProject));

    return tsResult.js
                    .pipe(sourcemaps.write('.'))
                    .pipe(gulp.dest('src'));
});

gulp.task('minify', function() {
    gulp.src(['src/core/*.js', 'src/externals/*.js', 'src/components/**/*Directive.js'])
        .pipe(concat('fabricui-directives.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));

    gulp.src(['src/core/*.js', 'src/externals/*.js', 'src/components/**/*Directive.js'])
        .pipe(concat('fabricui-directives.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['compile-ts', 'minify'], function() {
    gulp.watch('src/components/**/*.ts' , ['compile-ts', 'minify', 'test']);
});

gulp.task('watch-atom', ['minify'], function() {
    gulp.watch('src/components/**/*.js' , ['minify', 'test']);
});


gulp.task('test', function (done) {
    new Server({
        configFile: __dirname  + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('tdd', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});
