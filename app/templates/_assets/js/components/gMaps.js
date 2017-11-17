/*
var GMaps = (function($) {
	'use strict';

	var map,
		infoWindow,
		markerData,
		mapMarkers = [],
		$mapCanvas,
		dataSrc;

	// This function will iterate over markersData array
	// creating markers with createMarker function
	var _displayMarkers = function(){

	   // this variable sets the map bounds according to markers position
	   var bounds = new google.maps.LatLngBounds();

	   // for loop traverses markersData array calling createMarker function for each marker
	   for( var i = 0; i < markerData.length; i++ ) {
			var $this = markerData[i];

			var latlng = new google.maps.LatLng( $this.map.Latitude, $this.map.Longitude );
			_createMarker( $this, latlng );

			// marker position is added to bounds variable
			bounds.extend( latlng );
	   }

	   // Finally the bounds variable is used to set the map bounds
	   //map.setCenter( marker.getPosition() );
	   //map.fitBounds(bounds);
	   if( markerData.length === 1 ) {
		   map.setCenter( mapMarkers[0].position );
	   } else {
		   map.fitBounds(bounds);
	   }
	};

	// This function creates each marker and it sets
	// their Info Window content
	var _createMarker = function( markerData, latlng ){

		var marker = new google.maps.Marker({
			map: map,
			position: latlng,
			title: markerData.name,
			icon: {
				anchor: new google.maps.Point(16, 32),
				url: "/assets/img/marker.png"
			}
		});

	   // This event expects a click on a marker
	   // When this event is fired the Info Window content is created
	   // and the Info Window is opened.
	   google.maps.event.addListener( marker, 'click', function() {
	// use the below for custom modal
	//	   openMapModal( marker.supplierId );

	      // Creating the content to be inserted in the infowindow
	      var iwContent = '<div id="iw_container">' +
	            '<h4 class="iw_title">' + markerData.name + '</h4>' +
	         '<div class="iw_content">' + markerData.address + '<br />' +
	         markerData.phoneNumber + '</div></div>';

	      // including content to the Info Window.
	      infoWindow.setContent( iwContent );

	      // opening the Info Window in the current map and at the current marker location.
	      infoWindow.open(map, marker);

	   });

	   mapMarkers.push( marker );
	};

	// This function initializes the map
	var initCallback = function() {
		var mapOptions = {
			center: new google.maps.LatLng(51.510959,-0.21874),
			scrollwheel: false,
			zoom: 14,
			mapTypeId: 'roadmap'
		};

		var mapCanvas = document.getElementById('mapCanvas');
		map = new google.maps.Map( mapCanvas, mapOptions);

		// a new Info Window is created
		infoWindow = new google.maps.InfoWindow();

		// Event that closes the Info Window with a click on the map
		google.maps.event.addListener(map, 'click', function() {
			infoWindow.close();
		});

		jQuery.getJSON( dataSrc, function( data ) {
			// add json result to global var
			markerData = data.offices;
		})
		.done(function() {
			// Finally displayMarkers() function is called to begin the markers creation
			_displayMarkers();
		})
		.fail(function() {
			// console.log( "error" );
		});

	};

	// This function sets the data url for the JSON & async
	// loads google maps. After loading the assets it will call
	var _loadMapScript = function() {
		dataSrc = "/?altTemplate=JSONMapMarkers";

		// Asynchronously Load the map API
		var script = document.createElement('script');
		script.src = "http://maps.googleapis.com/maps/api/js?callback=window.GMaps.initCallback";
		document.body.appendChild(script);

	};

	// Check if a map canvas exists and kick things off
	var init = function() {
		$mapCanvas = $('#mapCanvas');

		if( $mapCanvas.length > 0 ) {
			_loadMapScript();
		}
	};

	return {
		init: init,
		initCallback: initCallback
	};

})(jQuery);
*/
