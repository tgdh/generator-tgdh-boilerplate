/*

//https://github.com/frend/frend.co/blob/gh-pages/_components/accordion/accordion.js
// converted to use jquery
var Accordion = (function ($) {
	'use strict';
	var $html = $('html');

	var selector = '.js-accordion',
		headerSelector = '.js-accordion__header',
		headerIdPrefix = 'accordion-header',
		panelSelector = '.js-accordion__panel',
		panelIdPrefix = 'accordion-panel',
		firstPanelsOpenByDefault = true,
		multiselectable = true,
		readyClass = 'c-accordion--is-ready',
		transitionLength = 300;

	// set accordion element NodeLists
	var accordionContainers = $( selector );

	// A11Y
	var _addA11y = function( accordionContainer ) {
		// get accordion elements
		var accordionHeaders = $( headerSelector );
		var accordionPanels = $( panelSelector );

		// add relevant roles and properties
		accordionContainer.attr('role', 'tablist');
		accordionContainer.attr('aria-multiselectable', multiselectable);

		accordionHeaders.each( function() {
			var $this = $(this);
			var currentId = $this.attr('id');

			$this.attr('role', 'tab');
			$this.attr('aria-controls', currentId.replace( headerIdPrefix, panelIdPrefix ) );
			// make headers focusable, this is preferred over wrapping contents in native button element
			$this.attr('tabindex', 0);
		});


		accordionPanels.each( function() {
			var $this = $(this);
			var currentId = $this.attr('id');
			$this.attr('role', 'tabpanel');
			$this.attr('aria-labelledby', currentId.replace( panelIdPrefix, headerIdPrefix ) );
			// make tabpanel focusable
			$this.attr('tabindex', 0);
		});
	};

	var _removeA11y = function(accordionContainer) {
		// get accordion elements
		var accordionHeaders = $(headerSelector, accordionContainer);
		var accordionPanels = $(panelSelector, accordionContainer);

		// remove roles and properties
		accordionContainer.removeAttr('role');
		accordionContainer.removeAttr('aria-multiselectable');

		accordionHeaders.each( function(accordionHeader) {
			var $this = $(this);
			$this.removeAttr('role');
			$this.removeAttr('aria-controls');
			$this.removeAttr('aria-selected');
			$this.removeAttr('aria-expanded');
			// remove headers focusablility
			$this.removeAttr('tabindex');
		});

		accordionPanels.each( function(accordionPanel) {
			var $this = $(this);
			$this.removeAttr('role');
			$this.removeAttr('aria-labelledby');
			$this.removeAttr('aria-hidden');
			// remove tabpanel focusablibility
			$this.removeAttr('tabindex');
		});
	};

	//	UTILS
	var _getPanelHeight = function(panel) {
		//	set auto height and read offsetHeight

		panel.css('height', 'auto');
		var height = panel.outerHeight();
		//	remove style
		panel.css('height', '');
		return height;
	};

	var _setPanelHeight = function(panel) {
		//	get panel height
		var panelHeight = _getPanelHeight(panel);
		//	recalc style and layout
//		panel.getBoundingClientRect();

		panel.offset();
		//	set height on panel, reset to 'auto' on transition complete
		panel.css('height', panelHeight);
//		panel.style.height = panelHeight + 'px';
		setTimeout( function(){
			panel.css({
				transition: 'none',
				height: 'auto'
			});
			//	recalc style and layout
//			panel.getBoundingClientRect();
			panel.offset();
			panel.css('transition', '');
		}, transitionLength);
	};

	var _unsetPanelHeight = function(panel) {
		//	get panel height
		var panelHeight = _getPanelHeight(panel);
		//	set panel height from 'auto' to px
		panel.css('height',panelHeight);
//		panel.style.height = panelHeight + 'px';
		//	recalc style and layout
		panel.offset();
//		panel.getBoundingClientRect();
		//	reset height
		panel.css('height',0);
	};

	// ACTIONS
	var _hideAllPanels = function(accordionContainer) {
		// get accordion elements
		var siblingHeaders = $(headerSelector, accordionContainer);
		var siblingPanels = $(panelSelector, accordionContainer);

		// set inactives
		siblingHeaders.each( function(header) {
			var $this = $(this);
			$this.attr('tabindex', -1);
			$this.attr('aria-selected', 'false');
			$this.attr('aria-expanded', 'false');
		});
		siblingPanels.each( function(panel) {
			var $this = $(this);
			if ($this.attr('aria-hidden') === 'false') _unsetPanelHeight(panel);
			//	toggle aria-hidden
			$this.attr('aria-hidden', 'true');
		});
	};

	var _hidePanel = function(target) {
		//	get panel
		var activePanel = $( '#' + target.attr('aria-controls') );
		target.attr('aria-selected', 'false');
		target.attr('aria-expanded', 'false');
		//	toggle aria-hidden
		_unsetPanelHeight(activePanel);
		activePanel.attr('aria-hidden', 'true');
	};

	var _showPanel = function(target) {
		//	get panel
		var activePanel = $( '#' + target.attr('aria-controls') );

		//	set attributes on header
		target.attr('tabindex', 0);
		target.attr('aria-selected', 'true');
		target.attr('aria-expanded', 'true');
		//	toggle aria-hidden and set height on panel
		_setPanelHeight( activePanel );
		activePanel.attr('aria-hidden', 'false');
		setTimeout(function(){
			_bindAccordionEvents( target.parent() );
		},transitionLength );
	};

	var _togglePanel = function (target) {
		// get context of accordion container and its children

		var thisContainer = target.parent();

		// close target panel if already active
		if ( target.attr('aria-selected') === 'true' ) {
			_hidePanel(target);
			return;
		}
		// if not multiselectable hide all, then show target
		if (!multiselectable) _hideAllPanels(thisContainer);

		_showPanel(target);
		if (transitionLength > 0) _unbindAccordionEvents(thisContainer);
	};

	var _giveHeaderFocus = function( headerSet, i ) {
		// remove focusability from inactives
		headerSet.each( function(header) {
			$(this).attr('tabindex', -1);
		});
		// set active focus
		$( headerSet[i] ).attr('tabindex', 0);
		$( headerSet[i] ).focus();
	};

	//	EVENTS
	var _eventHeaderClick = function(e) {
		_togglePanel( $(this) );
	};

	var _eventHeaderKeydown = function (e) {

		// collect header targets, and their prev/next
		var currentHeader = $(e.currentTarget);
		var isModifierKey = e.metaKey || e.altKey;
		// get context of accordion container and its children
		var thisContainer = currentHeader.parent();
		var theseHeaders = $(headerSelector, thisContainer);
//		var currentHeaderIndex = [].indexOf.call(theseHeaders, currentHeader);
		var currentHeaderIndex = theseHeaders.index( currentHeader );

		// don't catch key events when ⌘ or Alt modifier is present
		if (isModifierKey) return;

		// catch enter/space, left/right and up/down arrow key events
		// if new panel show it, if next/prev move focus
		switch (e.keyCode) {
			case 13:
			case 32:
				_togglePanel(currentHeader);
				e.preventDefault();
				break;
			case 37:
			case 38: {
				var previousHeaderIndex = (currentHeaderIndex === 0) ? theseHeaders.length - 1 : currentHeaderIndex - 1;
				_giveHeaderFocus(theseHeaders, previousHeaderIndex);
				e.preventDefault();
				break;
			}
			case 39:
			case 40: {
				var nextHeaderIndex = (currentHeaderIndex < theseHeaders.length - 1) ? currentHeaderIndex + 1 : 0;
				_giveHeaderFocus(theseHeaders, nextHeaderIndex);
				e.preventDefault();
				break;
			}
			default:
				break;
		}
	};

	//	BIND EVENTS
	var _bindAccordionEvents = function( accordionContainer ) {
		var accordionHeaders = $(headerSelector, accordionContainer);
		// bind all accordion header click and keydown events
		accordionHeaders.each( function(accordionHeader) {
			var $this = $(this);
			$this.on('click', _eventHeaderClick);
			$this.on('keydown', _eventHeaderKeydown);
		});
	};

	//	UNBIND EVENTS
	var _unbindAccordionEvents = function( accordionContainer ) {
		var accordionHeaders = $(headerSelector, accordionContainer);
		// unbind all accordion header click and keydown events
		accordionHeaders.each( function(accordionHeader) {
			var $this = $(this);
			$this.off('click', _eventHeaderClick);
			$this.off('keydown', _eventHeaderKeydown);
		});
	};

	// DESTROY
	var destroy = function() {
		accordionContainers.each( function(accordionContainer) {
			var $this = $(this);
			_removeA11y( $this );
			_unbindAccordionEvents( $this );
			$this.removeClass( readyClass );
		});
	};

	// INIT
	var init = function() {
		if ( accordionContainers.length ) {
			accordionContainers.each( function(accordionContainer) {
				var $this = $(this);

				_addA11y( $this );
				_bindAccordionEvents( $this );
				_hideAllPanels( $this );
				// set all first accordion panels active on init if required (default behaviour)
				// otherwise make sure first accordion header for each is focusable
				if (firstPanelsOpenByDefault) {
					_togglePanel( $this.find( headerSelector ).first() );
				} else {
					$this.find( headerSelector.first() ).attr('tabindex', 0);
				}
				// set ready style hook
				$this.addClass( readyClass );
			});
		}
	};



	return {
		init: init,
		destroy: destroy
	};

})(jQuery);
*/
