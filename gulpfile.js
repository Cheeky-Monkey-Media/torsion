/*
 * include gulp
 */
var gulp    = require('gulp');
var $       = require('gulp-load-plugins')();


/*
 * include plugins
 */
var runseq  = require('run-sequence');
var argv    = require('yargs').argv;
var jshint  = require('gulp-jshint');
var sass    = require('gulp-sass');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var rename  = require('gulp-rename');
var svgmin  = require('gulp-svgmin');
var imgmin  = require('gulp-imagemin');
var replace = require('gulp-replace');


/*
 * sass source paths
 */
var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];


/*
 * foundation JS paths [enable what you need]
 */
var foundationJSPaths = [
  'bower_components/what-input/what-input.js',
  'bower_components/foundation-sites/js/foundation.core.js',
  'bower_components/foundation-sites/js/foundation.util.*.js',
  // Paths to individual JS components defined below
  //'bower_components/foundation-sites/js/foundation.abide.js',
  //'bower_components/foundation-sites/js/foundation.accordion.js',
  //'bower_components/foundation-sites/js/foundation.accordionMenu.js',
  'bower_components/foundation-sites/js/foundation.drilldown.js',
  'bower_components/foundation-sites/js/foundation.dropdown.js',
  'bower_components/foundation-sites/js/foundation.dropdownMenu.js',
  //'bower_components/foundation-sites/js/foundation.equalizer.js',
  //'bower_components/foundation-sites/js/foundation.interchange.js',
  //'bower_components/foundation-sites/js/foundation.magellan.js',
  'bower_components/foundation-sites/js/foundation.offcanvas.js',
  //'bower_components/foundation-sites/js/foundation.orbit.js',
  //'bower_components/foundation-sites/js/foundation.responsiveMenu.js',
  //'bower_components/foundation-sites/js/foundation.responsiveToggle.js',
  //'bower_components/foundation-sites/js/foundation.reveal.js',
  //'bower_components/foundation-sites/js/foundation.slider.js',
  //'bower_components/foundation-sites/js/foundation.sticky.js',
  //'bower_components/foundation-sites/js/foundation.tabs.js',
  //'bower_components/foundation-sites/js/foundation.toggler.js',
  //'bower_components/foundation-sites/js/foundation.tooltip.js',
];


/*
 * theme path
 */
var themepath = '../themes/custom/cmm_torsion/';


/*
 * base paths
 */
var basePaths = {
  css: themepath + 'css',
  css_dist: themepath + 'css/dist',
  css_src: themepath + 'css/src/**/*.scss',
  css_vendor: themepath + 'css/vendor',
  scss_vendor: themepath + 'css/src/vendor',

  js: themepath + 'js',
  js_dist: themepath + 'js/dist',
  js_src: themepath + 'js/src/**/*.js',
  js_vendor: themepath + 'js/vendor',

  img_vendor: themepath + 'img/vendor',
  svg_src: themepath + 'img/**/*.svg',
  svg: themepath + 'img'
}


// projects asset paths
var projectAssets = {
  js: [
    'bower_components/intentionjs/intention.js',
    'bower_components/underscore/underscore-min.js',
    'bower_components/underscore/underscore-min.map',
    'bower_components/viewportsize/viewportSize-min.js',
  ],
  scss: [
  ],
  css: [
  ],
  img: [
  ]
};


/*
 * templates task
 *   if there are any css or js files that have paths, we may need to change them
 *   so they point to the right location since, we're moving them from bower install to our theme folder
 */
gulp.task('templates', function(){
//  gulp.src(['bower_components/fancybox-scss/source/jquery.fancybox.scss'])
//    .pipe(replace("$fancybox-img-path : '' !default;", "$fancybox-img-path : '/themes/custom/ebsi/images/vendor/' !default;"))
//    .pipe(gulp.dest(basePaths.scss_vendor));
});


/*
 * copy vendor JS to theme
 */
gulp.task('copyJS', function() {
  return gulp.src(projectAssets.js)
    .pipe(gulp.dest(basePaths.js_vendor));
});


/*
 * copy vendor SCSS to theme
 */
gulp.task('copySCSS', function() {
  return gulp.src(projectAssets.scss)
    .pipe(gulp.dest(basePaths.scss_vendor));
});


/*
 * copy vendor CSS to theme
 */
gulp.task('copyCSS', function() {
  return gulp.src(projectAssets.css)
    .pipe(gulp.dest(basePaths.css_vendor));
});


/*
 * copy vendor images to theme
 */
gulp.task('copyIMG', function() {
  return gulp.src(projectAssets.img)
    .pipe(gulp.dest(basePaths.img_vendor));
});


/*
 * JS linting, for clean JS code
 */
gulp.task('lint', function() {
  return gulp.src(basePaths.js_src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


/*
 * compile the sass for our development (local) environment (line comments, nested)
 */
gulp.task('dev:styles', function() {
  return gulp.src(basePaths.css_src)
  .pipe(
    $.sass({
      sourceComments: 'map',
      sourceMap: 'sass',
      sourceMap: basePaths.css,
      outputStyle: 'nested',
      includePaths: sassPaths
    })
    .on('error', $.sass.logError)
  )
  .pipe(gulp.dest(basePaths.css_dist));
});


/*
 * compile the sass for our the production environment (no comments, compressed)
 */
gulp.task('build:styles', function() {
  return gulp.src(basePaths.css_src)
  .pipe(
    $.sass({
      outputStyle: 'compressed',
      includePaths: sassPaths
    })
    .on('error', $.sass.logError)
  )
  .pipe(gulp.dest(basePaths.css_dist));
});


/*
 * foundation requires an app.js file to be created
 * which is what all the include JS files are compiled to
 */
gulp.task('build:scripts:foundation', function() {
  var uglify = $.uglify()
  .on('error', function (e) {
    console.log(e);
  });
  return gulp.src(foundationJSPaths)
  .pipe($.concat('app.js'))
  .pipe(uglify)
  .pipe(gulp.dest(basePaths.js_dist))
});
gulp.task('dev:scripts:foundation', function() {
  return gulp.src(foundationJSPaths)
  .pipe($.sourcemaps.init())
  .pipe($.concat('app.js'))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(basePaths.js_dist))
});


/*
 * compile custom component scripts
 */
gulp.task('build:scripts:components', function() {
  var uglify = $.uglify()
  .on('error', function (e) {
    console.log(e);
  });
  return gulp.src(basePaths.js_src)
  .pipe(uglify)
  .pipe(gulp.dest(basePaths.js_dist));
});
gulp.task('dev:scripts:components', function() {
  return gulp.src(basePaths.js_src)
  .pipe(gulp.dest(basePaths.js_dist));
});


/*
 * optimize svg files
 */
gulp.task('svgmin', function () {
  return gulp.src(basePaths.svg_src)
  .pipe(svgmin())
  .pipe(gulp.dest(basePaths.svg));
});


/*
 * watch tasks
 */
gulp.task('watch', function() {
  gulp.watch(basePaths.js_src, ['lint', 'dev:scripts:components']);
  gulp.watch(basePaths.css_src, ['dev:styles']);
  gulp.watch(basePaths.svg_src, ['svgmin']);
});


/*
 * [gulp dev] this is used for local environments only
 */
gulp.task('dev', function(done) {
  runseq('templates', 'copyJS', 'copySCSS', 'copyCSS', 'copyIMG', 'lint', 'dev:scripts:foundation', 'dev:scripts:components', 'dev:styles', 'svgmin', 'watch', function() {
    done();
    console.log('D8 Compilation and setup for DEVELOPMENT complete. Now watching...');
  });
});


/*
 * [gulp build] use this for any environment OTHER than local, use this before committing to the code repository
 */
gulp.task('build', function(done) {
  runseq('templates', 'copyJS', 'copySCSS', 'copyCSS', 'copyIMG', 'lint', 'build:scripts:foundation', 'build:scripts:components', 'build:styles', 'svgmin', function() {
    done();
    console.log('D8 Compilation and setup for PRODUCTION complete.');
  });
});

