'use strict';
module.exports = {
	css: {
		files: [
			'<%= assetsFolder %>/sass/**/**/*.scss'
		],
		tasks: [
			'sass:dist',
			'autoprefixer',
			'css_mqpacker',
			'stripmq',
			'pixrem',
			'cssmin'
		]
	},
	js: {
		files: [
			'<%= assetsFolder %>/js/**/*.js'
		],
		tasks: [
			'jshint',
			'concat',
			'uglify'
		]
	},
	todo: {
		files: [
			'<%= assetsFolder %>/js/**/*.js',
			'<%= assetsFolder %>/sass/**/*.scss'
		],
		tasks: [ 'todo' ]
	},
};