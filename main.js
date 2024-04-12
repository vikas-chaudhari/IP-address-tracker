/* create the map */
var map;

function create_map(lat, lng, country, region) {
  // Check if the map already exists
  if (!map) {
    // If the map doesn't exist, create a new one
    map = L.map("map").setView([lat, lng], 14);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 20,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
  } else {
    // If the map exists, just update its view
    map.setView([lat, lng], 14);
  }

  // Remove the existing marker (if any) and add a new one
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`${region}, ${country}`)
    .openPopup();
}

function fetchData() {
  let button = document.querySelector("#btn");
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const value = document.querySelector("#search").value;
    console.log(value);
    getData(value);
  });
}

async function getData(data) {
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_OgjPtG23DHJTGBC1CV5aQdQcwa38U&ipAddress=${data}`;
  let request = await fetch(url);
  let response = await request.json();
  console.log(response);

  let lat = response.location.lat;
  let lng = response.location.lng;
  let country = response.location.country;
  let region = response.location.region;
  console.log(
    "lat = ",
    lat,
    "\nlng = ",
    lng,
    "\ncountry = ",
    country,
    "\nregion= ",
    region
  );
  printInfo(
    response.ip,
    response.location.city,
    response.location.timezone,
    response.isp
  );
  create_map(lat, lng, country, region);
}

function printInfo(ip, location, timezone, isp) {
  info = document.querySelector("#location_data");
  info.innerHTML = `
  <li class="w-10" id="1">${ip}</li>
  <li class="w-10" id="2">${location}</li>
  <li class="w-10" id="3">${timezone}</li>
  <li class="w-10" id="4">${isp}</li>
  `;
}
