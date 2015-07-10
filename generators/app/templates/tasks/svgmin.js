'use strict';
module.exports = {
	options: {
		plugins: [
			{ removeViewBox: false },
			{ removeUselessStrokeAndFill: true },
			{ removeEmptyAttrs: true }
		]
	},
	svg: {
		files: [{
			expand: true,
			cwd: '<%= assetsFolder %>/img/svg',
			src: '*.svg',
			dest: '<%= assetsBuildFolder %>/img/svg',
			ext: '.svg'
		}]
	}
};