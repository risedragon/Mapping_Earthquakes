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

// Then we add our 'graymap' tile layer to the map.
dark.addTo(map);
//  Add a marker to the map for Los Angeles, California.
let cityData = cities;
console.log(cityData[0]);

//cityData.forEach(city=>L.marker(city.location).addTo(map).bindPopup(`<h4>${city.city}</h4><hr>
//    <p>Population: ${city.population.toLocaleString()}</p>`).openPopup());

cityData.forEach(city => {
    L.circleMarker(city.location,{
        radius: city.population/200000,
        color: "white",
        fillColor: "orange",
        weight: 4
    }).addTo(map)
    .bindPopup(`<h4>${city.city}, ${city.state}</h4><hr><p>Population: ${city.population.toLocaleString()}</p>`)
});