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
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });
// Create a base layer that holds both maps.
let baseMaps = {
    Light: light,
    Dark: dark
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [44, -80],
    zoom: 2,
    layers: [light]
});
L.control.layers(baseMaps).addTo(map);


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

let torontoData = "torontoRoutes.json";
d3.json(torontoData).then(data=>{
    console.log(data);
    L.geoJSON(data,{
        style: myStyle,
        onEachFeature: function(feature, layer){
            layer.bindPopup(`<h3>Airline: ${feature.properties.airline}</h3><hr>
            <h3>Destination: ${feature.properties.dst}</h3>`)
        }
    }).addTo(map)
})

// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 2
}


