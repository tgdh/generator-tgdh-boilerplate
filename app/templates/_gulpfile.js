'use strict';

var paths = {
    assetsFolder: '_assets',
    templates: '_templates',
    siteFolder: 'testSite',
    assetsBuildFolder: 'testSite/assets'
}

/* ===========================================================
	# Scripts
=========================================================== */

var headScripts = [
    paths.assetsFolder + '/js/lib/modernizr.js',
    paths.assetsFolder + '/js/utils/is-modern.js',
    paths.assetsFolder + '/_components/picturefill/dist/picturefill.js',
    paths.assetsFolder + '/js/lib/lazysizes.config.js',
    paths.assetsFolder + '/_components/lazysizes/lazysizes.js',
    paths.assetsFolder + '/_components/lazysizes/plugins/unveilhooks/ls.unveilhooks.js'
];

var mainScripts = [
    paths.assetsFolder + '/js/components/jquery.tabs.js',
    paths.assetsFolder + '/js/main.js'
];

/* ===========================================================
	# vars
=========================================================== */

var gulp = require('gulp'),
    merge = require('merge-stream'),
    del = require('del'),
    postcss = require('gulp-postcss'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*'],
        replaceString: /\bgulp[\-.]/
    });

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

var isProduction = false;

var AUTOPREFIXER_BROWSERS = [
    'last 2 versions',
    '> 1%',
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

/* ===========================================================
	# Tasks
=========================================================== */

// CSS
gulp.task( 'css', function() {
    return gulp.src( paths.assetsFolder + '/sass/*.scss' )
        .pipe( $.newer('.tmp/styles') )
        .pipe( $.sourcemaps.init() )
        .pipe( $.sass({
            precision: 10
        }).on('error', $.sass.logError))
        .pipe( $.autoprefixer( AUTOPREFIXER_BROWSERS ) )
        .pipe( gulp.dest('.tmp/styles') )
        .pipe( $.if( isProduction, $.combineMq({ beautify: false }) ) )
        .pipe( $.if( isProduction, $.cssnano() ) )
//        .pipe( $.size({ title: '[CSS]' }) )
        .pipe( $.sourcemaps.write( './' ) )
        .pipe( $.if( isProduction, cachebust.resources() ) )
        .pipe( gulp.dest( paths.assetsBuildFolder + '/css' ) );
//        .pipe( $.notify({ message: 'CSS: <%= file.relative %>' }) );
});

// JS
gulp.task('js', function() {
    var head = gulp.src( headScripts )
        .pipe( $.newer('.tmp/scripts') )
        .pipe( gulp.dest('.tmp/scripts') )
        .pipe( $.concat('head.js') )
        .pipe( $.if( isProduction, $.uglify({preserveComments: 'some'}) ) )
//        .pipe( $.size({title: '[Head JS]'}) )
        .pipe( $.if( isProduction, cachebust.resources() ) )
        .pipe( gulp.dest( paths.assetsBuildFolder + '/js') );
//        .pipe( $.notify({ message: 'JS: <%= file.relative %>' }) );

    var main = gulp.src( mainScripts )
//        .pipe( $.newer('.tmp/scripts') )
        .pipe( $.sourcemaps.init() )
        .pipe( $.sourcemaps.write() )
        .pipe( $.jshint('.jshintrc') )
        .pipe( $.jshint.reporter('default') )
//        .pipe( gulp.dest('.tmp/scripts') )
        .pipe( $.concat('main.js') )
        .pipe( $.if( isProduction, $.uglify({preserveComments: 'some'}) ) )
//        .pipe( $.size({title: '[Main JS]'}) )
        .pipe( $.sourcemaps.write('.') )
        .pipe( $.if( isProduction, cachebust.resources() ) )
        .pipe( gulp.dest( paths.assetsBuildFolder + '/js' ) );
//        .pipe( $.notify({ message: 'JS: <%= file.relative %>' }) );

    return merge( head, main );
});

// modernizr
gulp.task('modernizr', function(){
    return gulp.src([
        '!' + paths.assetsFolder + '/js/lib/modernizr.js',
        paths.assetsFolder + '/js/**/*.js',
        paths.assetsFolder + '/sass/**/*.scss'
    ])
    .pipe( $.modernizr({
        'options': ['setClasses']
    }) )
    .pipe( gulp.dest( paths.assetsFolder + '/js/lib') );
});

// IE
gulp.task( 'ie', function() {
    return gulp.src( '.tmp/styles/ie.css' )
        .pipe(
            postcss([
                require('postcss-unmq')({
                    type: 'screen',
                    width: '62.5em'
                })
            ])
        )
        .pipe( $.pixrem({
            rootValue: '62.5%',
            replace: true
        }) )
        .pipe( gulp.dest( paths.assetsBuildFolder + '/css/' ) );
//        .pipe( $.notify({ message: 'CSS: <%= file.relative %>' }) );
});

// Optimize images
gulp.task('images', function() {
    return gulp.src( paths.assetsFolder + '/img/**/*')
        .pipe( $.cache( $.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe( gulp.dest( paths.assetsBuildFolder + '/img') )
        .pipe( $.size({title: 'images'}) )
//        .pipe( $.notify({ message: 'images task complete' }) );
});

// Copy fonts
gulp.task('copyfonts', function() {
    gulp.src( paths.assetsFolder + '/fonts/**/*')
    .pipe( $.newer('.tmp/fonts') )
    .pipe( gulp.dest('.tmp/fonts') )
    .pipe( gulp.dest( paths.assetsBuildFolder + '/fonts') );
});

// Clear the image cache to force reoptims
gulp.task('clearCache', function (done) {
  return $.cache.clearAll(done);
});

// Clean directories
gulp.task('clean', function() {
    return del([
        '.tmp',
        paths.assetsBuildFolder + '/css',
        paths.assetsBuildFolder + '/js',
        paths.assetsBuildFolder + '/img',
        paths.assetsBuildFolder + '/fonts'
    ]);
});

// Watch task
gulp.task( 'watch', function() {
    gulp.watch( paths.assetsFolder + '/sass/**/*.scss', [ 'css' ] );
    gulp.watch( paths.assetsFolder + '/js/**/*.js', [ 'js' ] );
    gulp.watch( paths.assetsFolder + '/images/**/*', ['images'] );
} );


// Copy master template with correct asset references
gulp.task('refAssets', ['css','js'], function() {
    return gulp.src( paths.templates + '/Master.cshtml')
        .pipe( $.if( isProduction, cachebust.references() ) )
        .pipe( gulp.dest( paths.siteFolder + '/Views' ) );
});

// gulp dev
gulp.task('dev', ['clean','modernizr'], function() {
    isProduction = false;
    gulp.start('refAssets', 'images', 'watch', 'copyfonts');
});

// gulp build
gulp.task('build', ['clean', 'modernizr'], function() {
    isProduction = true;
    gulp.start('refAssets', 'images', 'copyfonts');
});
