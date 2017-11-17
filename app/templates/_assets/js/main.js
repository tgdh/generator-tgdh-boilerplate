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
//		$window.ToggleClass.init();
//		$('select').selectric();
//		scrollTo($('a[href^="#"]:not(".js-no-scroll")'));
//		$('.js-tabs').tabs();

		$window.Carousel.init( $('.js-carousel') );
//		$window.Modal.init( $('.js-modal') );
//		$window.Accordion.init();
//		$window.GMaps.init();
//		$window.ValidateForms.init( $('.js-form') );

	//		MQ.init(breakpoints);
	}

	if (!Modernizr.svg) {
		$('img[src*="svg"]').attr('src', function() {
			return $(this).attr('src').replace('.svg', '.png');
		});
	}

})(jQuery);
