'use strict';
var IsModern = (function () {
	var $window = window,
		$html = document.querySelector('html');


	var isModern = function() {
		return ( 'querySelector' in document && 'localStorage' in $window && 'addEventListener' in $window );
	};

	var _enhanceStyles = function() {

		if( isModern ){
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
