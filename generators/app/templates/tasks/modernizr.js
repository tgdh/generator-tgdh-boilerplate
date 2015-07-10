'use strict';
module.exports = {
	dist: {
        'devFile' : '<%= assetsFolder %>/_components/modernizr/modernizr.js',
        'outputFile' : '<%= assetsBuildFolder %>/js/lib/modernizr.js',
        'extra' : {
            'printshiv' : false,
            'shiv' : true,
            'load' : false,
            'mq' : false,
            'cssclasses' : true
        },
        extensibility : {
            'addtest' : false,
            'prefixed' : false,
            'teststyles' : false,
            'testprops' : false,
            'testallprops' : false,
            'hasevents' : false,
            'prefixes' : false,
            'domprefixes' : false,
            'cssclassprefix' : ''
        },
        'uglify' : false,
        'tests' : [],
        'parseFiles' : true,
        'files' : {
        	'src' : ['<%= assetsFolder %>/js/**/*.js','<%= assetsFolder %>/sass/**/*.scss']
        },
        'matchCommunityTests' : false,
        'customTests' : []
    }
};