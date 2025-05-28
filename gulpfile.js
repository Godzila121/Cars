// gulpfile.js

// 1. Підключення модулів (CommonJS синтаксис, стандартний для Node.js)
const gulp = require('gulp'); // Основний модуль Gulp
const concat = require('gulp-concat'); // Плагін для об'єднання файлів
const cleanCSS = require('gulp-clean-css'); // Плагін для мініфікації CSS

// 2. Визначення шляхів (конфігурація)
const paths = {
  styles: {
    // Джерельні CSS файли. Порядок важливий!
    // Файли будуть об'єднані саме в такому порядку.
    // Зазвичай reset.css або normalize.css йдуть першими, потім загальні стилі, потім стилі компонентів.
    src: [
      'css/reset.css',    // Скидання стилів браузера
      'css/header.css',   // Стилі для шапки
      'css/main-banner.css', // Стилі для головного банера
      'css/why-buycar.css',  // Стилі для секції "Чому купувати у нас"
      'css/latest-cars.css', // Стилі для секції "Останні авто"
      'css/logo-carousel.css',// Стилі для каруселі логотипів
      'css/testimonials.css',// Стилі для відгуків
      'css/footer.css',   // Стилі для підвалу
      // Якщо у вас є інші специфічні файли, додайте їх сюди:
      // 'css/typography.css',
      // 'css/buttons.css',
      // 'css/forms.css',
    ],
    // Папка призначення для оброблених файлів.
    // Gulp автоматично створить цю структуру папок, якщо вона відсутня.
    dest: 'dist/css/'
  },
  // Пізніше тут можна додати шляхи для JavaScript, зображень тощо.
  // scripts: {
  //   src: 'js/**/*.js', // Всі .js файли в папці js та її підпапках
  //   dest: 'dist/js/'
  // },
  // images: {
  //   src: 'images/**/*.{jpg,jpeg,png,gif,svg}',
  //   dest: 'dist/images/'
  // }
};

// 3. Визначення Gulp-завдання (task) для обробки CSS
// Функція 'styles' - це наше завдання. Ім'я функції стає іменем завдання.
function styles() {
  // gulp.src() - вказує Gulp, які файли взяти (джерело)
  // paths.styles.src - масив шляхів до ваших CSS файлів
  return gulp.src(paths.styles.src)
    // .pipe() - "труба", передає потік файлів до наступного плагіна/операції
    .pipe(concat('main.min.css')) // Об'єднує всі файли з потоку в один файл 'main.min.css'
    .pipe(cleanCSS()) // Мініфікує CSS у файлі 'main.min.css'
    // gulp.dest() - вказує Gulp, куди зберегти оброблений файл (призначення)
    .pipe(gulp.dest(paths.styles.dest));
}

// 4. Визначення завдання для відстеження змін (watch)
function watchFiles() {
  // gulp.watch() - слідкує за змінами у файлах, вказаних першим аргументом.
  // Другий аргумент - завдання або масив завдань, які потрібно виконати при зміні.
  gulp.watch(paths.styles.src, styles); // При будь-якій зміні в CSS-файлах, запустити завдання 'styles'
  // Пізніше можна додати відстеження для HTML, JS тощо.
  // gulp.watch('*.html', browserSync.reload); // Приклад для BrowserSync
}

// 5. Створення складних/послідовних завдань (необов'язково для початку, але корисно)
// gulp.series() - виконує завдання послідовно
// gulp.parallel() - виконує завдання паралельно

const build = gulp.series(styles); // Завдання 'build' просто запускає 'styles'
                                    // Пізніше сюди можна додати обробку JS, зображень: gulp.series(styles, scripts, images)

// Завдання 'watch' (яке можна запустити як `gulp watch`):
// Спочатку виконує 'styles' один раз, а потім запускає 'watchFiles' для відстеження.
const dev = gulp.series(styles, watchFiles);
// Можна назвати його просто 'watch', тоді gulp watch

// 6. Експорт завдань, щоб Gulp CLI міг їх бачити та запускати
exports.styles = styles;     // Дозволяє запустити `gulp styles`
exports.watch = dev;       // Дозволяє запустити `gulp watch` (або `gulp dev`)
exports.build = build;
exports.default = build;