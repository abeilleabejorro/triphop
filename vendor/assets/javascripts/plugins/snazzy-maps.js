// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
	// Basic options for a simple Google Map
	// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions

	// Set your own position
	var myLatlng = new google.maps.LatLng(40.6700, -73.9400);

	var mapOptions = {
		// How zoomed in you want the map to start at (always required)
		zoom: 13,

		// Control buttons for changing type of map was turned off
		mapTypeControl: false,

		// Stop zoom map when you are scrolling down/up
		scrollwheel: false,

		navigationControl: false,

		scaleControl: false,

		draggable: true,

		// The latitude and longitude to center the map (always required)
		center: myLatlng, // New York

		// How you would like to style the map. 
		// This is where you would paste any style found on Snazzy Maps.
		styles: [{
			featureType: "administrative",
			stylers: [{
				visibility: "off"
                    }]
                }, {
			featureType: "poi",
			stylers: [{
				visibility: "simplified"
                    }]
                }, {
			featureType: "road",
			stylers: [{
				visibility: "simplified"
                    }]
                }, {
			featureType: "water",
			stylers: [{
				visibility: "simplified"
                    }]
                }, {
			featureType: "transit",
			stylers: [{
				visibility: "simplified"
                    }]  
                }, {
			featureType: "landscape",
			stylers: [{
				visibility: "simplified"
                    }]
                }, {
			featureType: "road.highway",
			stylers: [{
				visibility: "off" 
                    }]
                }, {
			featureType: "road.local",
			stylers: [{
				visibility: "on"
                    }]
                }, {
			featureType: "road.highway",
			elementType: "geometry",
			stylers: [{
				visibility: "on"
                    }]
                }, {
			featureType: "road.arterial",
			stylers: [{
				visibility: "off"
                    }]
                }, {
			featureType: "water",
			stylers: [{
				color: "#5f94ff"
                    }, {
				lightness: 26
                    }, {
				gamma: 5.86
                    }]
                }, {}, {
			featureType: "road.highway",
			stylers: [{
				weight: 0.6
                    }, {
				saturation: -85
                    }, {
				lightness: 61
                    }]
                }, {
			featureType: "road"
                }, {}, {
			featureType: "landscape",
			stylers: [{
				hue: "#0066ff"
                    }, {
				saturation: 74
                    }, {
				lightness: 100
                    }]
                }]
	};

	// Get the HTML DOM element that will contain your map
	var mapElement = document.getElementById('map');

	// Create the Google Map using out element and options defined above
	var map = new google.maps.Map(mapElement, mapOptions);

	//-- Primary marker --//
	var contentString = '885 3rd Ave<br>NY 10022';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		icon: 'assets/img/map-marker.png'
	});

	infowindow.open(map, marker);
	google.maps.event.addListener(marker, "click", function () {
		infowindow.open(map, marker);
	});
}