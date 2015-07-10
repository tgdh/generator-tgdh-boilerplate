'use strict';
module.exports = {
	options: {
		jshintrc: '.jshintrc',
		ignores: [
			'<%= assetsFolder %>/js/enhance.js',
			'<%= assetsFolder %>/js/modernizr.js'
		]
	},
	all: {
		files: {
			src: [
				'Gruntfile.js',
				'<%= assetsFolder %>/js/**/*.js'
			]
		}
	}
};