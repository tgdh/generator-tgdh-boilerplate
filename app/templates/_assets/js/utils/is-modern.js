'use strict';
var IsModern = (function () {
	var $window = window;

	var isModern = function() {
		return ( 'querySelector' in document && 'localStorage' in $window && 'addEventListener' in $window );
	};

	var _enhanceStyles = function() {
		var $html;

		if( isModern ){
			$html = document.querySelector('html');

			if( Modernizr.classlist && $html.classList.contains('no-enhance') ) {
				$html.classList.remove('no-enhance');
				$html.classList.add('enhance');
			}

		}

	};

	if( isModern() ) {
		_enhanceStyles();
	}

  return {
    isModern: isModern
  };

})();
