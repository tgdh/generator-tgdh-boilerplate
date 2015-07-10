( function() {
	'use strict';

	function IsModern() {
		return ( 'querySelector' in document && 'localStorage' in window && 'addEventListener' in window );
	}

	window.IsModern = IsModern;
})();