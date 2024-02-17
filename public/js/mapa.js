// Compile & run = OK
// private myClusterGroup = L.markerClusterGroup();

// const start = Date.now();
// navigator.geolocation.getCurrentPosition(function (position) {
//   let { latitude } = position.coords;
//   let { longitude } = position.coords;
//   const map = L.map("map").setView([latitude, longitude], 13);
//   mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
//   L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution:
//       'Vytvořte si vlastní pin! Přejděte na <a href="/my-profile">Můj profil -> Editovat profil -> O mně</a>',
//     maxZoom: 18,
//   })
//     .L.canvasIconLayer({})
//     .addTo(map);

//   const marker = L.marker([58.5578, 29.0087], { icon: icon });
//   map.addMarker(marker);
// });

const map = L.map("map", { preferCanvas: true }).setView([51.505, -0.09], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

var markers = L.markerClusterGroup();
markers.addLayer(L.marker(getRandomLatLng(map)));
// ... Add more layers ...
map.addLayer(markers);
