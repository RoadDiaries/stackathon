import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
const mapboxgl = require("mapbox-gl");

mapboxgl.accessToken =
  "pk.eyJ1Ijoicm95LXRlc3NsZXIiLCJhIjoiY2s1dHQ3Y2c1MTJqZjNtbWo5Nnd0YWF3NSJ9.GZhaMsa2mwV8erxqIkvd2Q";

export const map = new mapboxgl.Map({
  container: "map",
  center: [-74.009, 40.705], // FullStack NY coordinates; alternatively, use [-87.6354, 41.8885] for Chicago
  zoom: 1, // starting zoom
  style: "mapbox://styles/mapbox/light-v10"
  // mapbox has lots of different map styles available.
});
map.on("mousemove", function(e) {
  document.getElementById("info").innerHTML =
    // e.point is the x, y coordinates of the mousemove event relative
    // to the top-left corner of the map
    JSON.stringify(e.point) +
    "<br />" +
    // e.lngLat is the longitude, latitude geographical position of the event
    JSON.stringify(e.lngLat.wrap());
});

// const markerDomEl = document.createElement("div");
// markerDomEl.style.width = "32px";
// markerDomEl.style.height = "39px";
// markerDomEl.style.backgroundImage = "url(http://i.imgur.com/WbMOfMl.png)";
// new mapboxgl.Marker(markerDomEl).setLngLat([-74.009, 40.705]).addTo(map);
// var layerList = document.getElementById("menu");
// var inputs = layerList.getElementsByTagName("input");
// export function addMarker(coordinates) {
//   const markerDomEl = document.createElement("div");
//   markerDomEl.style.width = "32px";
//   markerDomEl.style.height = "39px";
//   markerDomEl.style.backgroundImage = "url(http://i.imgur.com/WbMOfMl.png)";
//   return new mapboxgl.Marker(markerDomEl)
//     .setLngLat([coordinates[0], coordinates[1]])
//     .addTo(map);
// }
// function switchLayer(layer) {
//   var layerId = layer.target.id;
//   map.setStyle("mapbox://styles/mapbox/" + layerId);
// }

// for (var i = 0; i < inputs.length; i++) {
//   inputs[i].onclick = switchLayer;
// }

// function startSearch() {
//   const searchElement = document.getElementById("city-search");
//   console.log("this is a search element", searchElement);
//   const autocomplete = new google.maps.places.Autocomplete(searchElement);
// }
