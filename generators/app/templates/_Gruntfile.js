module.exports = function ( grunt ) {
	/*
	 * Time taken for grunt tasks
	 */
	require( 'time-grunt' )( grunt );


	/*
	 * Load all Grunt tasks
	 */

	require( 'load-grunt-tasks' )( grunt );


	/*
	 * Define variables for tasks
	 */

	var vars = {
		pkg: grunt.file.readJSON( 'package.json' ),
		assetsFolder: 'assets',
		projectFolder: 'umbraco',
		assetsBuildFolder: 'umbraco/assets'
	};


	/*
	 * Set location to load grunt tasks form
	 */

	vars.config = {
		src: 'tasks/*.js'
	};

	var configs = require( 'load-grunt-configs' )( grunt, vars );

	grunt.initConfig( configs );


	/*
	 * Define tasks
	 */

	grunt.registerTask( 'dev', [
		'concurrent:dev1',
		'concurrent:dev2',
		'concurrent:dev3',
		'replace',
		'processhtml:dev',
		'rename',
		'todo',
		'watch'
	]);

	grunt.registerTask( 'build', [
		'cssBuild',
		'jsBuild',
		'templates',
		'images',
		'todo',
		'humans_txt'
	]);

	grunt.registerTask( 'templates', [
		'replace',
		'processhtml:dist',
		'versioning',
		'inline',
		'favicons',
		'rename',
		'copy:robots'
	]);

	grunt.registerTask( 'cssBuild', [
		'sass',
		'autoprefixer',
		'css_mqpacker',
		'stripmq',
		'pixrem',
		'cssmin'
	]);

	grunt.registerTask( 'jsBuild', [
		'modernizr',
		'jshint',
		'concat',
		'uglify'
	]);

	grunt.registerTask( 'images', [
		'svgmin:svg',
		'svg2png',
		'copy:brand',
		'copy:bitmap',
		'imageoptim'
	]);



};