'use strict';
module.exports = {
	main: {
		expand: true,
		cwd: '<%= assetsBuildFolder %>/css/',
		src: 'style.css',
		dest: '<%= assetsBuildFolder %>/css/',
		ext: '.min.css'
	},
	ie: {
		expand: true,
		cwd: '<%= assetsBuildFolder %>/css/',
		src: 'ie.css',
		dest: '<%= assetsBuildFolder %>/css/',
		ext: '.min.css'
	},
	critical: {
		expand: true,
		cwd: '<%= assetsBuildFolder %>/css/',
		src: 'critical.css',
		dest: '<%= assetsBuildFolder %>/css/',
		ext: '.min.css'
	}
};