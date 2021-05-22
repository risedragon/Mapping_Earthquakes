//We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
   maxZoom: 18,
   accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });
// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
  };

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

let overlays = {
  Earthquakes: earthquakes
};
// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});
L.control.layers(baseMaps,overlays).addTo(map);


// Then we add our 'graymap' tile layer to the map.
//  Add a marker to the map for Los Angeles, California.
// Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// L.geoJSON(sanFranAirport
//     ,{
//     pointToLayer: function(feature, latlng){
//         console.log(latlng)
//         return L.marker(latlng)
//         .bindPopup(`<h2>${feature.properties.name}</h2><hr><p>${feature.properties.city}, ${feature.properties.country}</p>`)
//     }
// }
// ).addTo(map);

// L.geoJson(sanFranAirport, {
//     onEachFeature: function(feature, layer) {
//         console.log(layer);
//         layer.bindPopup(`<h2>${feature.properties.name}</h2><hr><p>${feature.properties.city}, ${feature.properties.country}</p>`);
//      }
// }).addTo(map);

// let ariportData = "majorAirports.json";
// d3.json(ariportData).then(data=>{
//     L.geoJSON(data,{
//         onEachFeature: function(feature,layer){
//             console.log(feature)
//             layer.bindPopup(`<h2>${feature.properties.name}</h2><hr><p>${feature.properties.city}, ${feature.properties.country}</p>`)
//         }
//     }).addTo(map)
// });

// let torontoData = "torontoRoutes.json";
// d3.json(torontoData).then(data=>{
//     console.log(data);
//     L.geoJSON(data,{
//         style: myStyle,
//         onEachFeature: function(feature, layer){
//             layer.bindPopup(`<h3>Airline: ${feature.properties.airline}</h3><hr>
//             <h3>Destination: ${feature.properties.dst}</h3>`)
//         }
//     }).addTo(map)
// })

// Create a style for the lines.
// let myStyle = {
//     color: "#ffffa1",
//     fillColor: "purple",
//     weight: 2
//     }

// }
// torontoHoods = "torontoNeighborhoods.json";
// d3.json(torontoHoods).then(data=>{
//     L.geoJSON(data,{
//         style: myStyle,
//         onEachFeature: (feature, layer)=>{
//             console.log(feature);
//             layer.bindPopup(`Neighborhood: ${feature.properties.AREA_NAME}`)
//         }

//     }).addTo(map)
// })
// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  L.geoJSON(data,{
      pointToLayer: function(feature,latlng){
          return L.circleMarker(latlng)
      },
      style: styleInfo,
      onEachFeature: function(feature, layer){
        layer.bindPopup(`<b>Magnitude: ${feature.properties.mag}<br>Location: ${feature.properties.place}</b>`)
      }
  }).addTo(earthquakes);
});

earthquakes.addTo(map);


function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: getColor(feature.properties.mag),
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  };

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  };

function getColor(magnitude) {
  return `rgb(255,${204-magnitude*20},${153-magnitude*20})`
}