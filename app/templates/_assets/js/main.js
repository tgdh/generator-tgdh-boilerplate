(function($){
	'use strict';
	var $window = window,
		$html	= $('html');

	var enhanceEdgeCaseBrowsers = function() {

		if( !Modernizr.classlist ) {
			$html.removeClass('no-enhance').addClass('enhance');
		}

	};

/* ===========================================================
		# breakpoints
=========================================================== */
/*
	var breakpoints = [{
		context: ['small-max', 'small', 'medium'],
		call_for_each_context: false,
		match: function() {
			//console.log('small');
			mobileNavigation( $('.js-nav') );
		},
		unmatch: function() {
			// unbind and scripts if possible
			location.reload();
		}
	}, {
		context: ['large', 'x-large', 'xx-large'],
		call_for_each_context: false,
		match: function() {
			//console.log('medium - xxl');
			compactHeader();
		},
		unmatch: function() {
			// unbind and scripts if possible
			location.reload();
		}
	}];

*/

/* ===========================================================

	# Init

=========================================================== */

	if( $window.IsModern ){

		enhanceEdgeCaseBrowsers();
		$('.js-tabs').tabs();

		//MQ.init(breakpoints);
	}

})(jQuery);
