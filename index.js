// Fetch our IP Address
// Fetch the geo coordinates (Latitude & Longitude) for our IP
// Fetch the next ISS flyovers for our geo coordinates

// const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');

const ip = "148.170.180.88";

fetchCoordsByIP(ip, (error, coord) => {
  if (error !== null) {
    console.log("error", error);
    return;
  }
  console.log("yay it worked! coordinates:", coord);
});




// fetchMyIP((error, ip) => {
//   if (error !== null) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP: ", ip);
// });