// Fetch our IP Address
// Fetch the geo coordinates (Latitude & Longitude) for our IP
// Fetch the next ISS flyovers for our geo coordinates

// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');


const printPassTimes = function(passTimes) {

}

// index.js

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log("let see what we got", passTimes);
  for (const obj of passTimes) {
    console.log(`Next pass at ${new Date(obj.risetime)} 19:26:12 GMT-0700 (Pacific Daylight Time) for ${obj.duration} seconds!`);
  }
});

// const { fetchISSFlyOverTimes } = require('./iss');

// const obj = { latitude: 42.7729381, longitude: -80.9828842 };

// fetchISSFlyOverTimes(obj, (error, data) => {
//   if (error) {
//     console.log("error", error);
//     return;
//   }
//   console.log("yay it worked! we got the rise time and duration:", data);
// });




// const ip = "148.170.180.88";

// fetchCoordsByIP(ip, (error, coord) => {
//   if (error !== null) {
//     console.log("error", error);
//     return;
//   }
//   console.log("yay it worked! coordinates:", coord);
// });




// fetchMyIP((error, ip) => {
//   if (error !== null) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP: ", ip);
// });