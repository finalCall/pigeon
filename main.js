var map = L.map('mapid').setView([28.619608,77.227002], 15);
var src = document.querySelector("#src");
var des = document.querySelector("#des");
var deliver = document.querySelector("#deliver");
var curr = 0;

//------------------- Adding Map Component -----------------------

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1Ijoibm1ua2hyMjUwOSIsImEiOiJjazE5aGs2MGMwOXdkM2Rxd3BoYXNqMHQ1In0.gU2raRP-7GZ1VUxTHEeUsw'
}).addTo(map);


//------------------ Marker Icons -----------------

var sourceIcon = L.icon({
	iconUrl: 'green.svg',
	//shadowUrl: 'leaf-shadow.png',

	iconSize:     [45, 105], // size of the icon
	shadowSize:   [50, 64], // size of the shadow
	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var destinationIcon = L.icon({
	iconUrl: 'red.svg',
	//shadowUrl: 'leaf-shadow.png',

	iconSize:     [45, 105], // size of the icon
	shadowSize:   [50, 64], // size of the shadow
	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var droneIcon = L.icon({
	iconUrl: 'drone-svgrepo-com.svg',
	//shadowUrl: 'leaf-shadow.png',

	iconSize:     [45, 105], // size of the icon
	shadowSize:   [50, 64], // size of the shadow
	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var droneHouseIcon = L.icon({
	iconUrl: 'warehouse-svgrepo-com.svg',
	//shadowUrl: 'leaf-shadow.png',

	iconSize:     [60, 120], // size of the icon
	shadowSize:   [50, 64], // size of the shadow
	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


//scale
//L.control.scale().addTo(map);

//---------------------- WareHouse Locations ----------------

var wareHouse1Lat = 28.628520, wareHouse1Long = 77.206917; //sacred heart
var wareHouse2Lat = 28.613096, wareHouse2Long = 77.213689; // rajpath
var wareHouse3Lat = 28.614550, wareHouse3Long = 77.242574; // bhairon marg
var wareHouse4Lat = 28.624712, wareHouse4Long = 77.239307; // rajpath

//--------------------------- Markers -------------------------

L.marker([wareHouse1Lat,wareHouse1Long], {icon: droneHouseIcon}).addTo(map); // cp
L.marker([wareHouse2Lat,wareHouse2Long], {icon: droneHouseIcon}).addTo(map); // 
L.marker([wareHouse3Lat,wareHouse3Long], {icon: droneHouseIcon}).addTo(map); // 
L.marker([wareHouse4Lat,wareHouse4Long], {icon: droneHouseIcon}).addTo(map); // 

//---------------------- Distance Calculation ------------------

function getDistance(origin, destination) {
    // return distance in meters
    var lon1 = toRadian(origin[1]),
        lat1 = toRadian(origin[0]),
        lon2 = toRadian(destination[1]),
        lat2 = toRadian(destination[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS * 1000;
}

function toRadian(degree) {
    return degree*Math.PI/180;
}

//var distance = getDistance([drone1Lat, drone1Long], [drone2Lat, drone2Long]);

//-------------------------- Drone Movement --------------------------------

function moveDrone(){

    var myMovingMarker = L.Marker.movingMarker([[sourceLat, sourceLong], [destinationLat, destinationLong]],
        [4000],{icon: droneIcon}).addTo(map);
    
    myMovingMarker.start();
}

var sourceLat,sourceLong, destinationLat, destinationLong;

// ------------------------ Input : latlong Value ---------------------------
function getValues(e){
    if(curr == 0){ // for source
        sourceLat = Number((e.latlng.lat).toFixed(4));
        sourceLong = Number((e.latlng.lng).toFixed(4));

        L.marker([sourceLat,sourceLong], {icon: sourceIcon}).addTo(map); // 
    }
    else{ // for destination
        destinationLat = Number((e.latlng.lat).toFixed(4));
        destinationLong = Number((e.latlng.lng).toFixed(4));

        L.marker([destinationLat,destinationLong], {icon: destinationIcon}).addTo(map); // 
    }

}

//------------------ Toggle Source/Destination ------------------------

function changeValueToDes(){
    curr = 1;
}

function changeValueToSrc(){
    curr = 0;
}

//----------------------- Event Listners -----------------------------

map.on('click', getValues);
src.addEventListener('click',changeValueToSrc);
des.addEventListener('click',changeValueToDes);
deliver.addEventListener('click',moveDrone);
//console.log(distance);
