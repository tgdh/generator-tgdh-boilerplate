'use strict';
module.exports = {
	options: {
		commentStyle: 'u',
		content: {
			'site': [{
				'Version': '<%= pkg.version %>',
				'Site Url': '<%= pkg.siteURL %>',
				'Language': 'English',
				'Technology': 'Bower, Grunt, JavaScript, SASS, Umbraco'
			}]
		}
	},
	site: {
		dest: '<%= projectFolder %>/humans.txt'
	}
};