'use strict';
module.exports = {
	all: {
		files: [{
			cwd: '<%= assetsBuildFolder %>/img/svg',
			src: [ '*.svg' ],
			dest: '<%= assetsBuildFolder %>/img/png'
		}]
	}
};