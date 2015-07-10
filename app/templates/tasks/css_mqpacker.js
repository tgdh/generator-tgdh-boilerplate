'use strict';
module.exports = {
	options: {
		map: false,
	},
	main: {
		expand: true,
		cwd: '<%= assetsBuildFolder %>/css/',
		src: 'style.css',
		dest: '<%= assetsBuildFolder %>/css/'
	}
};