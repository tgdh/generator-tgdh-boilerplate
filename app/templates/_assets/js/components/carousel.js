
var Carousel = (function ($) {
	'use strict';

	var _init = function( $carousel ) {

		$carousel.each(function() {
			var $this = $(this),
				count = $this.children().length,
				settings = {
					items: $this.data("items") ? $this.data("items") : 1,
					loop: $this.data("loop") ? $this.data("loop") : false,
					nav: $this.data("nav") ? $this.data("nav") : false,
					dots: $this.data("dots") ? $this.data("dots") : false,
					center: $this.data("center") ? $this.data("center") : false,
					centerPadding: $this.data("center-padding") ? $this.data("center-padding") : "0px",
					autoHeight: $this.data("auto-height") ? $this.data("auto-height") : false,
					autoWidth: $this.data("auto-width") ? $this.data("auto-width") : false,
					autoPlay: $this.data("auto-play") ? $this.data("auto-play") : false,
					fade: $this.data("fade") ? $this.data("fade") : false,
					padded: $this.data("padded") ? $this.data("padded") : false,
					speed: $this.data("speed") ? $this.data("speed") : 4000
				};

			if( count > 1 ) {

				$this.slick({
				    slidesToShow: settings.items,
				    infinite: settings.loop,
				    arrows: settings.nav,
					adaptiveHeight: settings.autoHeight,
					variableWidth: settings.autoWidth,
				    autoplay: settings.autoPlay,
					autoplaySpeed: settings.speed,
					centerMode: settings.center,
					centerPadding: settings.centerPadding,
					dots: settings.dots,
					dotsClass: 'c-carousel__dots',
					prevArrow: "<button class='c-carousel__nav c-carousel__nav--prev'><i class='ico-arrow-left'></i><span class='u-hide-text'>Prev</span></button>",
                	nextArrow: "<button class='c-carousel__nav c-carousel__nav--next'><span class='u-hide-text'>Next</span><i class='ico-arrow-right'></i></button>",
				    fade: settings.fade
				});

			}

	    });

	};

	return {
		init: _init
	};

})(jQuery);
