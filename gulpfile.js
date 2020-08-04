const gulp = require("gulp");

// css
const gulpSass = require("gulp-sass")
const gulpMinifyCss = require('gulp-minify-css')
const gulpRename = require('gulp-rename')
gulp.task("sass_css",function(){
    return gulp.src('src/style/style.scss')
    .pipe(gulpSass())
    .pipe(gulp.dest('dist/css'))
    .pipe(gulpMinifyCss())
    .pipe(gulpRename('style.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(gulpConnect.reload())//自动刷新
})

// js
const gulpConcat = require("gulp-concat")
const gulpUglify = require("gulp-uglify")
gulp.task("js",function(){
    return gulp.src(['src/js/*.js'])
    .pipe(gulpConcat('index.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(gulpUglify())
    .pipe(gulpRename('index.min.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(gulpConnect.reload())//自动刷新
})

// img
gulp.task('images',function(){
    return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(gulpConnect.reload())//自动刷新
})

// index.html
gulp.task("index_html",function(){
    return gulp.src('src/index.html')
    .pipe(gulp.dest('dist/'))
    .pipe(gulpConnect.reload())//自动刷新
})

// watch
gulp.task('watch',function(cb){
    gulp.watch('src/index.html',gulp.series(["index_html"]))
    gulp.watch('src/images/**/*',gulp.series(["images"]))
    gulp.watch('src/js/*.js',gulp.series(["js"]))
    gulp.watch('src/style/style.scss',gulp.series(["sass_css"]))
    cb()
})

// connect服务器部署
const gulpConnect = require('gulp-connect')
gulp.task('server',function(){
    gulpConnect.server({
        root:'dist',
        port: 8089,
        livereload: true, //实现实时刷新（热更新）
    })
})

// 同时执行watch和server服务实现热更新
gulp.task('default',gulp.series(["watch","server"]))