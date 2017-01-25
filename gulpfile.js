/**
 * require plugins
 */
var 
  $             = require('gulp-load-plugins')(),
  gulp          = require('gulp'),
  autoprefixer  = require('gulp-autoprefixer'),
  browserSync   = require('browser-sync').create(),
  sass          = require('gulp-sass'),
  sassGlob      = require('gulp-sass-glob'),
  debug         = require('gulp-debug'),
  modernizr     = require('gulp-modernizr'),
  shell         = require('gulp-shell'),
  sourcemaps    = require('gulp-sourcemaps'),
  prompt        = require('gulp-prompt'),
  fs            = require('fs'),
  gutil         = require('gulp-util');


/**
 * setup variables
 */
var
  src           = 'pattern-lab/source/',
  theme         = '',
  scss          = 'pattern-lab/source/_patterns/**/*.scss',
  twig          = 'pattern-lab/source/_patterns/**/*.{twig, md}',
  templates     = 'pattern-lab/source/_patterns/**/*.twig',
  cssOutput     = 'pattern-lab/source/css',
  sassIncludes  = [
    'bower_components/foundation-sites/scss',
    'bower_components/motion-ui/src'
  ];
  cms           = '',
  themePath     = '../themes/custom/',
  projectName   = 'torsion';



/**
 * watch for changes
 */
gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch(scss, ['sass', ['patternlab']]);
  gulp.watch(twig, ['patternlab', 'copyTWIGComponentFiles']);
});


/**
 * copy JS components and build the dependecies library
 * @TODO
 */
gulp.task('buildJSDependencies', function() {
      
});


/**
 * copy TWIG components
 */
gulp.task('copyTWIGComponentFiles', function() {
  var
    torsion               = '';
    template_destination  = '';

  if (fs.existsSync('./torsion.json')) {
    torsion               = require('./torsion.json'),
    template_destination  = torsion.themepath + torsion.projectname + '/patterns';
  }
  else {
    template_destination  = themePath + projectName + '/patterns';
  }

  return gulp.src(templates)
  .pipe(gulp.dest(template_destination));
});


/**
 * compile sass
 */
gulp.task('sass', function() {
  var
    torsion          = '';
    css_destination  = '';

  if (fs.existsSync('./torsion.json')) {
    torsion         = require('./torsion.json'),
    css_destination = torsion.themepath + torsion.projectname + '/css';
  }
  else {
    css_destination = themePath + projectName + '/css';
  }


  return gulp.src(scss)
  .pipe(sourcemaps.init())
  .pipe(sassGlob())
  .pipe(
    $.sass({
      outputStyle: 'nested',
      includePaths: sassIncludes
    })
  .on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(cssOutput))
  .pipe(gulp.dest(css_destination))
  .pipe(browserSync.reload({
    stream: true
  }))
});


/**
 * browser sync options
 */
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'pattern-lab/public'
    }
  })
});


/**
 * generates pattern lab twig files
 */
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
 * copy pattern lab patterns folder to theme
 */
gulp.task('copyPatterns', function() {
  copydir.sync('pattern-lab/source/_patterns', themePath + projectName + '/_patterns');
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


/**
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
  ))
});


/**
 * generates modernizr
 */
gulp.task('modernizr', function() {
  gulp.src('./js/*.js')
  .pipe(modernizr())
  .pipe(gulp.dest("pattern-lab/source/js"))
});


/**
 * register tasks
 */
gulp.task('init',['initializeTorsion']);
gulp.task('default',['patternlab', 'watch']);
