/* (function(window, google){
	var options = {
		center:{
			lat: 43.0731,
			lng: -89.4012
		},
		zoom: 12,
		disableDefaultUI: true,
		minZoom: 11
	},
	element = document.getElementById('mapid'),
	
	map = new google.maps.Map(element, options);
}(window, google)); */

var map;
var ApartIcon = new L.Icon({
	iconSize: [50, 50],
	popupAnchor:  [0, -24],
	iconUrl: "img/Apartment_Icon.png"
});
var HospitalIcon = new L.Icon({
	iconSize: [70, 70],
	popupAnchor:  [0, -24],
	iconUrl: "img/Hospital_Icon.png"
});
var FitnessIcon = new L.Icon({
	iconSize: [70, 70],
	popupAnchor:  [0, -24],
	iconUrl: "img/Fitness_Icon.png"
});
var MarketIcon = new L.Icon({
	iconSize: [70, 70],
	popupAnchor:  [0, -24],
	iconUrl: "img/Market_Icon.png"
});


function createMap(){
	
	map = L.map('mapid').setView([43.0731, -89.4012], 13);

	//add tile layer...replace project id and accessToken with your own
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		minZoom: 11,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1Ijoic2hpeXVxaSIsImEiOiJjanM1NThxN3cwYzZwM3ludG9wN2tqeWJ6In0.nVpI0SflJABVxjyDIaGbEg'
	}).addTo(map);
	
	var promises = [];
	promises.push($.getJSON("data/fulldata.geojson"));
	promises.push($.getJSON("data/Metro_route/Metro_Transit_Bus_Routes.geojson"));
	promises.push($.getJSON("data/Metro_stops/Metro_Transit_Bus_Stops.geojson"));
	promises.push($.getJSON("data/extradata.geojson"));
	Promise.all(promises).then(callback);



};

function callback(data){
	apartment = data[0];
	route = data[1];
	stop = data[2];
	extra = data[3];
	var apartLayer = L.geoJson(apartment, {
				pointToLayer: function (feature, latlng) {
					return L.marker(latlng, {icon: ApartIcon});
				},
                onEachFeature:function(feature, layer){
					var photoImg = '<img src=' + feature.properties.tile_url + ' height="150px" width="150px"/>';
					var panelContent = "<p><b>Name:</b> " + feature.properties.prop_display_name +"<p><b>min price:</b> " + feature.properties.min_price + "<p><b>max price:</b> " + feature.properties.max_price + "<p><b>bed range:</b> " + feature.properties.beds_range + "<p><b>Phone #:</b> " + feature.properties.phone_number + "<p><b>Photo:</b> " + "<p><b>" + photoImg;
					layer.bindPopup(feature.properties.prop_display_name);
					layer.on({
					mouseover: function(){
						this.openPopup();
					},
					mouseout: function(){
						this.closePopup();
					},
					click: function(){
						$("#panel").html(panelContent);
					}
					}).addTo(map)
				},

				filter: function(feature, layer){
					return feature.properties;
				},
	});

	var bustopwithin100 = L.geoJson(apartment, {
				filter: function(feature, layer){
					return feature.properties.bustop_within_100 === 'yes';
				},
				pointToLayer: function (feature, latlng) {
					return L.marker(latlng, {icon: ApartIcon});
				},
                onEachFeature:function(feature, layer){
					var photoImg = '<img src=' + feature.properties.tile_url + ' height="150px" width="150px"/>';
					var panelContent = "<p><b>Name:</b> " + feature.properties.prop_display_name +"<p><b>min price:</b> " + feature.properties.min_price + "<p><b>max price:</b> " + feature.properties.max_price + "<p><b>bed range:</b> " + feature.properties.beds_range + "<p><b>Phone #:</b> " + feature.properties.phone_number;
					layer.bindPopup(feature.properties.prop_display_name);
					layer.on({
					mouseover: function(){
						this.openPopup();
					},
					mouseout: function(){
						this.closePopup();
					},
					click: function(){
						$("#panel").html(panelContent);
					}
					}).addTo(map)
				},
	});
	var insidecampus = L.geoJson(apartment, {
				filter: function(feature, layer){
					return feature.properties.inside_campus === 'yes';
				},
				pointToLayer: function (feature, latlng) {
					return L.marker(latlng, {icon: ApartIcon});
				},
                onEachFeature:function(feature, layer){
					var photoImg = '<img src=' + feature.properties.tile_url + ' height="150px" width="150px"/>';
					var panelContent = "<p><b>Name:</b> " + feature.properties.prop_display_name +"<p><b>min price:</b> " + feature.properties.min_price + "<p><b>max price:</b> " + feature.properties.max_price + "<p><b>bed range:</b> " + feature.properties.beds_range + "<p><b>Phone #:</b> " + feature.properties.phone_number;
					layer.bindPopup(feature.properties.prop_display_name);
					layer.on({
					mouseover: function(){
						this.openPopup();
					},
					mouseout: function(){
						this.closePopup();
					},
					click: function(){
						$("#panel").html(panelContent);
					}
					}).addTo(map)
				},
	});
	var fitnesswithin200m = L.geoJson(apartment, {
				filter: function(feature, layer){
					return feature.properties.fitness_within_200m === 'yes';
				},
				pointToLayer: function (feature, latlng) {
					return L.marker(latlng, {icon: ApartIcon});
				},
                onEachFeature:function(feature, layer){
					var photoImg = '<img src=' + feature.properties.tile_url + ' height="150px" width="150px"/>';
					var panelContent = "<p><b>Name:</b> " + feature.properties.prop_display_name +"<p><b>min price:</b> " + feature.properties.min_price + "<p><b>max price:</b> " + feature.properties.max_price + "<p><b>bed range:</b> " + feature.properties.beds_range + "<p><b>Phone #:</b> " + feature.properties.phone_number;
					layer.bindPopup(feature.properties.prop_display_name);
					layer.on({
					mouseover: function(){
						this.openPopup();
					},
					mouseout: function(){
						this.closePopup();
					},
					click: function(){
						$("#panel").html(panelContent);
					}
					}).addTo(map)
				},
	});
	var fitnesswithin500m = L.geoJson(apartment, {
				filter: function(feature, layer){
					return feature.properties.fitness_within_500m === 'yes';
				},
				
				pointToLayer: function (feature, latlng) {
					return L.marker(latlng, {icon: ApartIcon});
				},
                onEachFeature:function(feature, layer){
					var photoImg = '<img src=' + feature.properties.tile_url + ' height="150px" width="150px"/>';
					var panelContent = "<p><b>Name:</b> " + feature.properties.prop_display_name +"<p><b>min price:</b> " + feature.properties.min_price + "<p><b>max price:</b> " + feature.properties.max_price + "<p><b>bed range:</b> " + feature.properties.beds_range + "<p><b>Phone #:</b> " + feature.properties.phone_number;
					layer.bindPopup(feature.properties.prop_display_name);
					layer.on({
					mouseover: function(){
						this.openPopup();
					},
					mouseout: function(){
						this.closePopup();
					},
					click: function(){
						$("#panel").html(panelContent);
					}
					}).addTo(map)
				},
	});
	var fitnesswithin1000m = L.geoJson(apartment, {
				filter: function(feature, layer){
					return feature.properties.fitness_within_1000m === 'yes';
				},
				pointToLayer: function (feature, latlng) {
					return L.marker(latlng, {icon: ApartIcon});
				},
                onEachFeature:function(feature, layer){
					var photoImg = '<img src=' + feature.properties.tile_url + ' height="150px" width="150px"/>';
					var panelContent = "<p><b>Name:</b> " + feature.properties.prop_display_name +"<p><b>min price:</b> " + feature.properties.min_price + "<p><b>max price:</b> " + feature.properties.max_price + "<p><b>bed range:</b> " + feature.properties.beds_range + "<p><b>Phone #:</b> " + feature.properties.phone_number;
					layer.bindPopup(feature.properties.prop_display_name);
					layer.on({
					mouseover: function(){
						this.openPopup();
					},
					mouseout: function(){
						this.closePopup();
					},
					click: function(){
						$("#panel").html(panelContent);
					}
					}).addTo(map)
				},
	});
	var marketwithin200m = L.geoJson(apartment, {
				filter: function(feature, layer){
					return feature.properties.market_within_200m === 'yes';
				},
				pointToLayer: function (feature, latlng) {
					return L.marker(latlng, {icon: ApartIcon});
				},
                onEachFeature:function(feature, layer){
					var photoImg = '<img src=' + feature.properties.tile_url + ' height="150px" width="150px"/>';
					var panelContent = "<p><b>Name:</b> " + feature.properties.prop_display_name +"<p><b>min price:</b> " + feature.properties.min_price + "<p><b>max price:</b> " + feature.properties.max_price + "<p><b>bed range:</b> " + feature.properties.beds_range + "<p><b>Phone #:</b> " + feature.properties.phone_number;
					layer.bindPopup(feature.properties.prop_display_name);
					layer.on({
					mouseover: function(){
						this.openPopup();
					},
					mouseout: function(){
						this.closePopup();
					},
					click: function(){
						$("#panel").html(panelContent);
					}
					}).addTo(map)
				},
	});
	var marketwithin500m = L.geoJson(apartment, {
				filter: function(feature, layer){
					return feature.properties.market_within_500m === 'yes';
				},
				pointToLayer: function (feature, latlng) {
					return L.marker(latlng, {icon: ApartIcon});
				},
                onEachFeature:function(feature, layer){
					var photoImg = '<img src=' + feature.properties.tile_url + ' height="150px" width="150px"/>';
					var panelContent = "<p><b>Name:</b> " + feature.properties.prop_display_name +"<p><b>min price:</b> " + feature.properties.min_price + "<p><b>max price:</b> " + feature.properties.max_price + "<p><b>bed range:</b> " + feature.properties.beds_range + "<p><b>Phone #:</b> " + feature.properties.phone_number;
					layer.bindPopup(feature.properties.prop_display_name);
					layer.on({
					mouseover: function(){
						this.openPopup();
					},
					mouseout: function(){
						this.closePopup();
					},
					click: function(){
						$("#panel").html(panelContent);
					}
					}).addTo(map)
				},
	});
	var marketwithin1000m = L.geoJson(apartment, {
				filter: function(feature, layer){
					return feature.properties.market_within_1000m === 'yes';
				},
				pointToLayer: function (feature, latlng) {
					return L.marker(latlng, {icon: ApartIcon});
				},
                onEachFeature:function(feature, layer){
					var photoImg = '<img src=' + feature.properties.tile_url + ' height="150px" width="150px"/>';
					var panelContent = "<p><b>Name:</b> " + feature.properties.prop_display_name +"<p><b>min price:</b> " + feature.properties.min_price + "<p><b>max price:</b> " + feature.properties.max_price + "<p><b>bed range:</b> " + feature.properties.beds_range + "<p><b>Phone #:</b> " + feature.properties.phone_number;
					layer.bindPopup(feature.properties.prop_display_name);
					layer.on({
					mouseover: function(){
						this.openPopup();
					},
					mouseout: function(){
						this.closePopup();
					},
					click: function(){
						$("#panel").html(panelContent);
					}
					}).addTo(map)
				},
	});
	var withinunvCen1km = L.geoJson(apartment, {
				filter: function(feature, layer){
					return feature.properties.within_unvCen_1km === 'yes';
				},
				pointToLayer: function (feature, latlng) {
					return L.marker(latlng, {icon: ApartIcon});
				},
                onEachFeature:function(feature, layer){
					var photoImg = '<img src=' + feature.properties.tile_url + ' height="150px" width="150px"/>';
					var panelContent = "<p><b>Name:</b> " + feature.properties.prop_display_name +"<p><b>min price:</b> " + feature.properties.min_price + "<p><b>max price:</b> " + feature.properties.max_price + "<p><b>bed range:</b> " + feature.properties.beds_range + "<p><b>Phone #:</b> " + feature.properties.phone_number;
					layer.bindPopup(feature.properties.prop_display_name);
					layer.on({
					mouseover: function(){
						this.openPopup();
					},
					mouseout: function(){
						this.closePopup();
					},
					click: function(){
						$("#panel").html(panelContent);
					}
					}).addTo(map)
				},
	});
	var withinunvCen2km = L.geoJson(apartment, {
				filter: function(feature, layer){
					return feature.properties.within_unvCen_2km === 'yes';
				},
				pointToLayer: function (feature, latlng) {
					return L.marker(latlng, {icon: ApartIcon});
				},
                onEachFeature:function(feature, layer){
					var photoImg = '<img src=' + feature.properties.tile_url + ' height="150px" width="150px"/>';
					var panelContent = "<p><b>Name:</b> " + feature.properties.prop_display_name +"<p><b>min price:</b> " + feature.properties.min_price + "<p><b>max price:</b> " + feature.properties.max_price + "<p><b>bed range:</b> " + feature.properties.beds_range + "<p><b>Phone #:</b> " + feature.properties.phone_number;
					layer.bindPopup(feature.properties.prop_display_name);
					layer.on({
					mouseover: function(){
						this.openPopup();
					},
					mouseout: function(){
						this.closePopup();
					},
					click: function(){
						$("#panel").html(panelContent);
					}
					}).addTo(map)
				},
	});	
	var withinunvCen3km = L.geoJson(apartment, {
				filter: function(feature, layer){
					return feature.properties.within_unvCen_3km === 'yes';
				},
				pointToLayer: function (feature, latlng) {
					return L.marker(latlng, {icon: ApartIcon});
				},
                onEachFeature:function(feature, layer){
					var photoImg = '<img src=' + feature.properties.tile_url + ' height="150px" width="150px"/>';
					var panelContent = "<p><b>Name:</b> " + feature.properties.prop_display_name +"<p><b>min price:</b> " + feature.properties.min_price + "<p><b>max price:</b> " + feature.properties.max_price + "<p><b>bed range:</b> " + feature.properties.beds_range + "<p><b>Phone #:</b> " + feature.properties.phone_number;
					layer.bindPopup(feature.properties.prop_display_name);
					layer.on({
					mouseover: function(){
						this.openPopup();
					},
					mouseout: function(){
						this.closePopup();
					},
					click: function(){
						$("#panel").html(panelContent);
					}
					}).addTo(map)
				},
	});	
	var BusRouteLayer = L.geoJson(route, {
                onEachFeature:function(feature, layer){
					layer.bindPopup('Bus Route: ' + feature.properties.route_short_name.toString());
					layer.on({
					mouseover: function(){
						this.openPopup();
					},
					mouseout: function(){
						this.closePopup();
					}
					})
				}
    });
	
	var BusStopLayer = L.geoJson(stop, {
                onEachFeature:function(feature, layer){
					layer.bindPopup('Bus Route: ' + feature.properties.Route.toString());
					layer.on({
					mouseover: function(){
						this.openPopup();
					},
					mouseout: function(){
						this.closePopup();
					}
					})
				},
				
				pointToLayer: function(feature, latlng) {
					return new L.CircleMarker(latlng, {
					  radius: 2,
					  color: "red",
					  weight: 1
					});
				},				
	});

	var HospitalLayer = L.geoJson(extra, {
				pointToLayer: function (feature, latlng) {
					return L.marker(latlng, {icon: HospitalIcon});
				},
                onEachFeature:function(feature, layer){
					layer.bindPopup(feature.properties.Name);
					layer.on({
					mouseover: function(){
						this.openPopup();
					},
					mouseout: function(){
						this.closePopup();
					}
					})
				},

				filter: function(feature, layer){
					return (feature.properties.Category === "Hospital");
				},
	});

	var MarketLayer = L.geoJson(extra, {
				pointToLayer: function (feature, latlng) {
					return L.marker(latlng, {icon: MarketIcon});
				},
                onEachFeature:function(feature, layer){
					layer.bindPopup(feature.properties.Name);
					layer.on({
					mouseover: function(){
						this.openPopup();
					},
					mouseout: function(){
						this.closePopup();
					}
					})
				},

				filter: function(feature, layer){
					return (feature.properties.Category === "Supermarket" || feature.properties.Category === "Grocery store");
				},
	});

	var FitnesslLayer = L.geoJson(extra, {
				pointToLayer: function (feature, latlng) {
					return L.marker(latlng, {icon: FitnessIcon});
				},
                onEachFeature:function(feature, layer){
					layer.bindPopup(feature.properties.Name);
					layer.on({
					mouseover: function(){
						this.openPopup();
					},
					mouseout: function(){
						this.closePopup();
					}
					})
				},

				filter: function(feature, layer){
					return (feature.properties.Category === "Fitness");
				},
	});

	var baseMaps = {
		"All Apartments": apartLayer,
		"Apartments within 100m from bus stop": bustopwithin100,
		"Apartments inside Campus zone": insidecampus,
		"Apartments within 200m from a fitness center": fitnesswithin200m,
		"Apartments within 500m from a fitness center": fitnesswithin500m,
		"Apartments within 1000m from a fitness center": fitnesswithin1000m,
		"Apartments within 200m from a Supermarket or Grocery store": marketwithin200m,
		"Apartments within 500m from a Supermarket or Grocery store": marketwithin500m,
		"Apartments within 1000m from a Supermarket or Grocery store": marketwithin1000m,
		"Apartments within 1000m from University center": withinunvCen1km,
		"Apartments within 2000m from University center": withinunvCen2km,
		"Apartments within 3000m from University center": withinunvCen3km		
	};
	
	var overlayMaps = {
		"Route": BusRouteLayer,
		"Bus Stop": BusStopLayer,
		"Hospital": HospitalLayer,
		"Market": MarketLayer,
		"Fitness": FitnesslLayer
	
	};
	
	L.control.layers(baseMaps, overlayMaps).addTo(map);
	createSearchOperator(map, apartment);
	
/* 	//create a L.markerClusterGroup layer
	var markers = L.markerClusterGroup();
	//add geojson to marker cluster layer
	markers.addLayer(apartLayer);
	//add marker cluster layer to map
	map.addLayer(markers);
	markerCluster(map); */
};

		
function markerCluster(map){
	var markers = L.markerClusterGroup({
		maxClusterRadius: 120,
		iconCreatefunction: function(cluster){
			var markers = cluster.getAllChildMarkers();
			var n = 0;
			for (var i = 0; i < markers.length; i++){
				n += markers[i].number;
			}
			return L.divIcon({ html: n, className: 'mycluster', iconSize: L.point(40, 40) });
		},
		spiderfyOnMaxZoom: false, showCoverageOnHover: false, zoomToBoundsOnClick: false
	});
};

//function to create search operator
function createSearchOperator(map, featCollection){
	//create search layer
	var featuresLayer = new L.LayerGroup({
		style: function(feature) {
			return {color: feature.properties.color }
		},
	});

	map.eachLayer(function(layer){
		featuresLayer.addLayer(layer);
	});
	map.addLayer(featuresLayer);

	//create search control
	var searchControl = new L.Control.Search({
		layer: featuresLayer,
		propertyName: "prop_display_name",
		marker: false,
		zoom: 17,
	});
	
	searchControl.on('search:locationfound', function(e) {
		e.layer.openPopup();
	}).on('search_collapsed', function(e) {
        featuresLayer.resetStyle(layer);
    });
	
	map.addControl( searchControl ); 
};




$(document).ready(createMap);