const gulp = require('gulp')
const ejs = require("gulp-ejs")
const rename = require('gulp-rename')
 
return gulp.src("./docs/views/pages/*.ejs")
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest("./docs/static"))