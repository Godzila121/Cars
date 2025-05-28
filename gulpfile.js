const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

const paths = {
  styles: {

    src: [
        'css/style.css',
      'css/header.css',
      'css/main-banner.css',
      'css/why-buycar.css',
      'css/latest-cars.css',
      'css/logo-carousel.css',
      'css/testimonials.css',
      'css/footer.css',
    ],
   dest: 'dist/css/'
  },
  
};

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(concat('main.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest));
}

function watchFiles() {
  gulp.watch(paths.styles.src, styles);
}

const build = gulp.series(styles);
const dev = gulp.series(styles, watchFiles);
exports.styles = styles;
exports.watch = dev;
exports.build = build;
exports.default = build;