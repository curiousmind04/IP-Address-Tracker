const button = document.querySelector("button");
const form = document.querySelector("form");
const ip = document.querySelector(".ip");
const recevedLocation = document.querySelector(".location");
const timezone = document.querySelector(".timezone");
const isp = document.querySelector(".isp");
const input = document.querySelector("input");

//map

let lat = 0;
let lng = 0;

// const map = L.map("map").setView([51.505, -0.09], 13);

let map = L.map("map", {
  center: [lat, lng],
  zoom: 16,
  zoomControl: false,
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

let myIcon = L.icon({
  iconUrl: "images/icon-location.svg",
});

let marker = L.marker([lat, lng - 0.0005], {
  icon: myIcon,
}).addTo(map);

//logic

input.addEventListener("focus", () => {
  input.value = "";
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formInput = input.value;

  let url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_7gTryzKoWlXH6wtYoMmOfk8LvtjjE&domain=${formInput}`;

  if (formInput.includes(":")) {
    url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_7gTryzKoWlXH6wtYoMmOfk8LvtjjE&ipAddress=${formInput}`;
  }

  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    console.log("Invalid");
    return;
  }

  console.log(data);

  input.value = data.ip;

  ip.innerHTML = data.ip;
  recevedLocation.innerHTML = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
  timezone.innerHTML = data.location.timezone;
  isp.innerHTML = data.isp;

  lat = data.location.lat;
  lng = data.location.lng;

  map.setView([lat, lng]);

  marker.setLatLng([lat, lng - 0.0005]);
});

button.click();

// 52.66.144.183
// 2345:0425:2CA1:0000:0000:0567:5673:23b5
