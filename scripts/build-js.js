const gulp = require('gulp')
const uglify = require('gulp-uglify-es').default
const concat = require('gulp-concat');


return gulp.src([
        './src/js/*.js'
    ])
    
    .pipe(concat('bundle.min.js'))
    
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('./docs/static/js'))
