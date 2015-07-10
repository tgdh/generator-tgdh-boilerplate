'use strict';
module.exports = {
	options: {
		html: '<%= projectFolder %>/Views/Master.html',
		HTMLPrefix: '/assets/img/brand-icons/'
	},
	icons: {
		src: '<%= assetsFolder %>/img/brand-icons/favicon.png',
		dest: '<%= assetsBuildFolder %>/img/brand-icons'
	},
};