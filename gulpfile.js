const gulp = require("gulp");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");

gulp.task("sass", function () {
    return gulp.src("./styles/styles.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./css/"));
});