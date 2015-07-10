'use strict';
module.exports = {
	brand: {
		files: [
			{
				expand: true,
				cwd: '<%= assetsFolder %>/img/',
				src: [ '*' ],
				dest: '<%= assetsBuildFolder %>/img'
			}
		]
	},
	bitmap: {
		files: [
			{
				expand: true,
				cwd: '<%= assetsFolder %>/img/bitmap/',
				src: [ '*' ],
				dest: '<%= assetsBuildFolder %>/img/bitmap'
			}
		]
	},
	robots: {
		files: [
			{
				src: '<%= assetsFolder %>/robots.txt',
				dest: '<%= projectFolder %>/robots.txt'
			}
		]
	}
};