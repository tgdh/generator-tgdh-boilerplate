var ToggleClass = (function ($) {
	'use strict';
	var $html = $('html');

	// toggle class helper
	var _toggleClass = function(el, className) {
		if (el.hasClass(className + '-open')) {
			el.removeClass(className + '-open');
		} else {
			el.addClass(className + '-open');
		}
	};

	var _init = function() {
		var $trigger = $('[data-toggle]');

		$trigger.on("click", function() {
			var className = $(this).data("toggle");
			_toggleClass($html, className);
		});
	};

	return {
		init: _init
	};

})(jQuery);
