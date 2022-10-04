if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      let { latitude } = position.coords;
      let { longitude } = position.coords;
      const map = L.map("map").setView([latitude, longitude], 13);
      mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; " + mapLink + " Contributors",
        maxZoom: 18,
      }).addTo(map);

      $.get("/users-list-map-data", (usersData) => {
        for (let i = 0; i < usersData.length; i++) {
          L.marker([
            usersData[i].locationLatitude,
            usersData[i].locationLongitude,
          ])
            .addTo(map)
            .bindPopup(
              `<a href='/user-profile/${usersData[i]._id}'>${usersData[i].name}</a>`
            )
            .openPopup();
        }
        const start = Date.now();
        console.log(start);
      });
    },
    function () {
      // alert("Nemůžeme získat vaši pozici :-(");
      // console.log(latitude, longitude);
      latitude = 49.195061;
      longitude = 16.606836;
      const map = L.map("map").setView([latitude, longitude], 13);
      mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; " + mapLink + " Contributors",
        maxZoom: 18,
      }).addTo(map);

      $.get("/users-list-map-data", (usersData) => {
        for (let i = 0; i < usersData.length; i++) {
          L.marker([
            usersData[i].locationLatitude,
            usersData[i].locationLongitude,
          ])
            .addTo(map)
            .bindPopup(
              `<a href='/user-profile/${usersData[i]._id}'>${usersData[i].name}</a>`
            )
            .openPopup();
        }
        const start = Date.now();
        console.log(start);
      });
    }
  );
