let map = L.map("mapid",{
    center: [40.7, -94.5],
    zoom: 4
});
//We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
   maxZoom: 18,
   accessToken: API_KEY
});
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
       maxZoom: 18,
       accessToken: API_KEY
    });
let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
//  Add a marker to the map for Los Angeles, California.
let cityData = cities;
console.log(cityData[0]);

// Coordinates for each point to be used in the line.
let line = [
    [33.9416, -118.4085],
    [37.6213, -122.3790]
  ];

let lines = [
[33.9416, -118.4085],
[37.6213, -122.3790],
[40.7899, -111.9791],
[47.4502, -122.3088]
];

let airlines = [
    [37.6216, -122.3802],
    [30.1964, -97.6659],
    [43.678524, -79.629129],
    [40.642948, -73.779373]
]

// Create a polyline using the line coordinates and make the line red.
L.polyline(airlines, {
    color: "blue",
    weight: 2,
    className: "dashLines",
    opcity: 0.5
  })
  .addTo(map);