'use strict';
module.exports = {
	all: {
		options: {
			jpegMini: false,
			imageAlpha: false,
			quitAfter: false
		},
		src: [
			'<%= assetsBuildFolder %>/img/brand-icons/*.{png,gif,jpg}',
			'<%= assetsBuildFolder %>/img/bitmap/*.{png,gif,jpg}',
			'<%= assetsBuildFolder %>/img/svg/*.png',
			'<%= assetsBuildFolder %>/img/icons/png/*.png'
		]
	}
};