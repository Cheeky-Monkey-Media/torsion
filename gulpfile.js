/*
 * require plugins
 */
var 
  gulp          = require('gulp'),
  autoprefixer  = require('gulp-autoprefixer'),
  browserSync   = require('browser-sync').create(),
  sass          = require('gulp-sass'),
  sassGlob      = require('gulp-sass-glob'),
  debug         = require('gulp-debug'),
  modernizr     = require('gulp-modernizr'),
  shell         = require('gulp-shell'),
  sourcemaps    = require('gulp-sourcemaps'),
  prompt        = require('gulp-prompt');


/*
 * setup variables
 */
var
  src           = 'pattern-lab/source/',
  theme         = '',
  scss          = 'pattern-lab/source/_patterns/**/*.scss',
  twig          = 'pattern-lab/source/_patterns/**/*.twig',
  cssOutput     = 'pattern-lab/public/css',
  cms           = '',
  themePath     = '',
  projectName   = '';

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
          require('node-normalize-scss').includePaths,
          'bower_components/sassline/assets/sass',
          'bower_components/offcanvasmenueffects',
          'node_modules/susy/sass',
          'node_modules/breakpoint-sass/stylesheets'
        ]
      }).on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('pattern-lab/source/css'))
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


/**
 * get user input and store in global variables
 */
gulp.task('getUserInput', function () {
  return gulp.src('', {read: false})
  .pipe(prompt.prompt([{
    type: 'input',
    name: 'projectname',
    message: 'Your project name:',
    default: 'torsion',
  },{
    type: 'list',
    name: 'cms',
    message: 'Which CMS are you building for?',
    choices: [{
      name: 'Drupal 8',
      value: 'drupal8',
      checked: true
    }, {
      name: 'Drupal 7',
      value: 'drupal7',
      checked: false
    }, {
      name: 'Wordpress',
      value: 'wordpress',
      checked: false
    }]
  },{
    type: 'input',
    name: 'themepath',
    message: 'Theme path from root [no trailing slash]:',
    default: '../themes/custom'
  }], function(res) {
    cms = res.cms;
    projectName = res.projectname;
    themePath = res.themepath;
  }))
});


/*
 * initialize torsion using yeoman scaffolding
 * @dependency: getUserInput (function)
 */
gulp.task('initializeTorsion', ['getUserInput'], function() {
  return gulp.src('', {read: false})
  .pipe(shell(
    [
      'yo torsion --cms "' + cms + '" --projectname "' + projectName + '" --themepath "' + themePath + '"'
    ],{
      interactive: true
    }
  ));
});


// Generates modernizr.
gulp.task('modernizr', function() {
  gulp.src('./js/*.js')
      .pipe(modernizr())
      .pipe(gulp.dest("pattern-lab/source/js"))
});

gulp.task('init',['initializeTorsion']);
gulp.task('default',['patternlab', 'watch']);
