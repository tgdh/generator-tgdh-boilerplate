'use strict';
module.exports = {
	options: {
		grepFiles: [
			'<%= projectFolder %>/Views/Master.html',
		]
	},
	js: {
		src: [
			'<%= assetsBuildFolder %>/js/main.js'
		]
	},
	css: {
		src: [
			'<%= assetsBuildFolder %>/css/style.min.css'
		]
	}
};