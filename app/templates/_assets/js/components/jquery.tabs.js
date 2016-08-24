// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "tabs",
			defaults = {
				contentClass: 'c-tabs__content'
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = $(element);
			// jQuery has an extend method which merges the contents of two or
			// more objects, storing the result in the first object. The first object
			// is generally empty as we don't want to alter the default options for
			// future instances of the plugin
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
			init: function () {
				this._activeTab		= ( this.getUrlHash() !== "" ? $('#' + this.getUrlHash() ).index() : 0 );
				this.$nav 			= this.element.find('nav');
				this.$navList		= this.$nav.find('ul');
				this.$navItems		= this.$navList.find('li');
				this.$navLinks		= this.$navItems.find('a');
				this.$content 		= this.element.find('.c-tabs__content');
				this.$contentTabs	= this.$content.children();
				this._tabLength		= this.$navItems.length;
				this._resizeTimer	= 0;

				this.element.addClass('js-tabs--loaded');

				// Place initialization logic here
				// You already have access to the DOM element and
				// the options via the instance, e.g. this.element
				// and this.settings
				// you can add more functions like the one below and
				// call them like the example bellow
//				this.setTabIndexes();
				this.setEventHandlers();
				// @todo get hash fragment or first
				this.setActiveTab( this._activeTab );
				this.resizeHandler();
				this.addNav();

			},
			getUrlHash: function() {
//				return document.URL.substr(document.URL.indexOf('#')+1);
				return location.hash.match(/^#?(.*)$/)[1];
			},
			setEventHandlers: function() {
				var $self = this;

				$self.$navList.find('li').on('click', function( e ){
					var $this = $(this);

					if( !$this.hasClass('is-active') ) {
						$self.setActiveTab( $this.index() );
						$self.setActiveHash( $this.find('a').attr('href') );
					}
					e.preventDefault();
				});
			},
			setActiveHash: function( urlHash ) {
				if( Modernizr.history ) {
					history.pushState( null, null, urlHash );
				}
				/*
				else {
					location.hash = urlHash;
				}
				*/
			},
			setTabIndexes: function() {
				for( var i = 0; i < this._tabLength; i++ ) {
					this.$navItems.eq( i ).attr('data-index', i);
					this.$contentTabs.eq( i ).attr('data-index', i);
				}
			},
			setActiveTab: function( i ) {
				this._activeTab = i;

				var $activeNavItem 		= this.$navList.children('li').eq( this._activeTab ),
					$activeContentTab 	= this.$content.children('section').eq( this._activeTab );

				this.$navList.find('.is-active').removeClass('is-active');
				this.$content.find('.is-active').removeClass('is-active');

				$activeNavItem.addClass('is-active');
				$activeContentTab.addClass('is-active');

				this.animateContentHeight( $activeContentTab );
			},
			addNav: function() {
				var delta = 40,
					$self = this,
					$prevButton = $('<button>', {
						'class': 'c-tabs__page c-tabs__page--prev js-tabs-page-prev',
						'text': 'prev'
					}),
					$nextButton = $('<button>', {
						'class': 'c-tabs__page c-tabs__page--next js-tabs-page-next',
						'text': 'next'
					});

				this.$nav.prepend( $prevButton );
				this.$nav.append( $nextButton );

				this.$navList.on('scroll', function() {
					$self.updateScrollIndicator( $prevButton, $nextButton );
				} );
				this.updateScrollIndicator( $prevButton, $nextButton );

				$nextButton.on('click', function() {
					$self.scrollMenuBar( delta );
				});

				$nextButton.on('tap', function() {
					$self.scrollMenuBar( delta );
				});
				$prevButton.on('click', function() {
					$self.scrollMenuBar( -delta );
				});
				$prevButton.on('tap', function() {
					$self.scrollMenuBar( -delta );
				});
			},
			updateScrollIndicator: function( $leftScroll, $rightScroll) {
				var $self = this,
					$menuBar = $self.$navList.get(0);

				$leftScroll.removeClass('is-disabled');
				$rightScroll.removeClass('is-disabled');
				
				if( $menuBar.scrollLeft <= 0 ) {
					$leftScroll.addClass('is-disabled');
				}

				// 5px tolerance because browsers!
				if( $menuBar.scrollLeft + $self.$navList.innerWidth() + 5 >= $menuBar.scrollWidth ) {
					$rightScroll.addClass('is-disabled');
				}
			},
			scrollMenuBar: function( delta ) {
				var $menuBar = this.$navList.get(0);
				$menuBar.scrollLeft += delta;
			},
			animateContentHeight: function( el ) {
				this.$content.css({
					'height': el.innerHeight()
				});
			},
			resizeHandler: function() {
				var $activeContentTab = this.$content.children('section').eq( this._activeTab ),
					$self = this;

				// On resize, run the function and reset the timeout
				// 250 is the delay in milliseconds. Change as you see fit.
				$(window).resize(function() {
					clearTimeout( this._resizeTimer );
					this._resizeTimer = setTimeout( $self.animateContentHeight( $activeContentTab ), 250 );
				});
			}
				
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
			return this.each(function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
						$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
				}
			});
		};

})( jQuery, window, document );