const gulp = require("gulp")
const collect = require('gulp-rev-collector')

return gulp.src(["docs/static/rev-manifest.json", "docs/**/*.{html,json,css,js,ejs}"])
    .pipe(collect())
    .pipe(gulp.dest('docs'))
