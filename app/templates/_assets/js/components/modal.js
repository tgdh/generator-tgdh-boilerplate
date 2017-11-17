/*
var Modal = (function ($) {
	'use strict';

	var _defaultOptions = {
		removalDelay: 500, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function() {
				this.st.mainClass = 'mfp-zoom-in';
			},
		},
		overflowY: 'scroll',
		midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	};

	var _galleryOptions = {
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			verticalFit: true,
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
		},
		midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	};

	var _init = function( $trigger ) {

		$trigger.each(function() {
			var $this = $(this),
				type = $this.data("modal-type") ? $this.data("modal-type") : "default",
				ajaxSettings = {
					template: $this.data("template") ? $this.data("template") : null,
					id: $this.data("id") ? $this.data("id") : 0
				},
				options,
				isAjax = type === "ajax" && ajaxSettings.template !== null && ajaxSettings.id !== 0,
				isGallery = type === "gallery" ? true : false;


			if( isAjax ) {

				options = {
					removalDelay: 500, //delay removal by X to allow out-animation
					items: {
                        src: "?altTemplate=" + ajaxSettings.template + "&id=" + ajaxSettings.id,
                    },
					type: "ajax",
					ajax: {
                        tError: 'The content could not be loaded. <a href="/">Return to homepage.</a>'
                    },
					callbacks: {
						beforeOpen: function(){
	                        this.st.mainClass = "mfp-zoom-in";
						}
					}
				};
			} else if( isGallery ) {
				options = _galleryOptions;
			} else {
				options = _defaultOptions;
			}

			$this.magnificPopup( options );

	    });

	};

	return {
		init: _init
	};

})(jQuery);
*/
