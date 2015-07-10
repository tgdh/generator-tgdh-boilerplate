'use strict';
module.exports = {
	inline: {
		files: {
			'<%= assetsBuildFolder %>/js/inline.js': '<%= assetsBuildFolder %>/js/inline.js'
		}
	},
	head: {
		files: {
			'<%= assetsBuildFolder %>/js/head.js': '<%= assetsBuildFolder %>/js/head.js'
		}
	},
	fulljs: {
		files: {
			'<%= assetsBuildFolder %>/js/main.js': '<%= assetsBuildFolder %>/js/main.js'
		}
	}
};