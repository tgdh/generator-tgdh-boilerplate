'use strict';
module.exports = {
	critical: {
		src: ['<%= assetsBuildFolder %>/css/critical.min.css'],
		overwrite: true,
		replacements: [{
			from: '@',
			to: '@@'
		}]
	}
};