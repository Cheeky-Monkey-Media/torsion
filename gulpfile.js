var gulp          = require('gulp');
var autoprefixer  = require('gulp-autoprefixer');
var browserSync   = require('browser-sync').create();
var sass          = require('gulp-sass');
var sassGlob      = require('gulp-sass-glob');
var debug         = require('gulp-debug');
var modernizr     = require('gulp-modernizr');
var shell         = require('gulp-shell');
var sourcemaps    = require('gulp-sourcemaps');


var src = 'pattern-lab/source/',
    theme = '',
    scss = 'pattern-lab/source/_patterns/**/*.scss',
    twig = 'pattern-lab/source/_patterns/**/*.{twig, md}',
    cssOutput =  'pattern-lab/source/css'
    ;

// Watch for changes.
gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch(scss, ['sass', ['patternlab']]);
  gulp.watch(twig, ['patternlab']);
});

// Compile Sass.
gulp.task('sass', function() {
  return gulp.src(scss)
      .pipe(sourcemaps.init())
      .pipe(sassGlob())
      .pipe(sass({
        includePaths: [
          // @TODO. Can't get the includes paths to work'
        ]
      }).on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(cssOutput))
      .pipe(browserSync.reload({
        stream: true
      }))
});

// Browser Sync Options.
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'pattern-lab/public'
    }
  })
});

// Generates Pattern Lab Twig files.
gulp.task('patternlab', function () {
  return gulp.src('', {read: false})
      .pipe(shell([
        'php pattern-lab/core/console --generate'
      ]))
      .pipe(browserSync.reload({
        stream: true
      }))
});

// Generates modernizr.
gulp.task('modernizr', function() {
  gulp.src('./js/*.js')
      .pipe(modernizr())
      .pipe(gulp.dest("pattern-lab/source/js"))
});

gulp.task('default',['patternlab', 'watch']);
