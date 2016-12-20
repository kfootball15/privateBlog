var gulp = require('gulp'),
  compass = require('gulp-compass'),
  watch = require('gulp-watch'),
  handlebars = require('gulp-ember-handlebars'),
  uglify = require('gulp-uglify'),
  plumber = require('gulp-plumber'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat');

// Ember/Gulp Tutorial: https://www.sitepoint.com/improving-ember-js-workflow-using-gulp-js/

// gulp.task('default', ['css', 'templates', 'scripts', 'watch'])

// gulp.task('production', ['css', 'templates', 'scripts']);

gulp.task('default', ['templates'])

gulp.task('production', ['templates', 'scripts']);

// gulp.task('css', function() {
//   return gulp.src('app/styles/*.scss')
//     .pipe(compass({ sass: 'scss' }))
//     .pipe(concat('main.min.css'))
//     .pipe(gulp.dest('public/css'));
// });

gulp.task('templates', function() {
  gulp.src(['./app/templates/**/*.hbs'])
    .pipe(handlebars({
      outputType: 'browser',
      namespace: 'Ember.TEMPLATES'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('scripts', function() {
  var scriptSrc = [
    // './vendor/jquery-1.10.2.js',
    // './vendor/jquery-ui.custom.min.js',
    // './vendor/moment.min.js',
    './handlebars/runtime.js',
    // './vendor/ember-1.3.2.js',
    // './vendor/ember-data.js',
    // './vendor/local-storage-adapter.js',
    // './helpers.js',
    // './main.js',
    // './templates.js',
    // './components.js',
    './app/models/*.js',
    './app/controllers/*.js',
    './app/router.js',
    // './views/*.js',
    // './fixtures.js',
    './app/routes/*.js'
  ];

  return gulp.src(scriptSrc)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    // .pipe(uglify({ mangle: false }))
    // .pipe(babel({
    //     presets: ['es2015']
    // }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/js'));
});


// gulp.task('watch', function() {
//   //watches SCSS files for changes
//   // gulp.watch('app/styles/*.scss', ['css']);

//   //watches handlebars files for changes
//   gulp.watch('./app/templates/**/*.hbs', ['templates']);

//   //watches JavaScript files for changes
//   gulp.watch('./app/**/*.js', ['scripts']);
// });

