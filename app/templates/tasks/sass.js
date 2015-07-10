'use strict';
module.exports = {
	dist: {
		options: {
			style: 'expanded',
			sourcemap: true
		},
		files: {
			'<%= assetsBuildFolder %>/css/style.css': '<%= assetsFolder %>/sass/style.scss',
			'<%= assetsBuildFolder %>/css/ie.css': '<%= assetsFolder %>/sass/ie.scss'
		}
	}
};