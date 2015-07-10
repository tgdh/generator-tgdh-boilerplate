'use strict';
module.exports = {
	options: {
		browsers: [ 'last 3 version' ]
	},
	multiple_files: {
		expand: true,
		flatten: true,
		src: '<%= assetsBuildFolder %>/css/style.css',
		dest: '<%= assetsBuildFolder %>/css'
	}
};