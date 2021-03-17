const gulp = require("gulp")
const rev = require('gulp-rev')


return gulp.src([
    './docs/static/css/*.css',
    './docs/static/js/*.js'
    ])
    .pipe(rev())
    .pipe(gulp.dest('docs/static/css'))
    .pipe(rev.manifest({ path: 'rev-manifest.json' }))
    .pipe(gulp.dest('docs/static'))

