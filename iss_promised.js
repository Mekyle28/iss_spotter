const needle = require('needle');

// get ip
const fetchMyIP = function() {
  return needle('get', "https://api.ipify.org?format=json")
    .then((response) => {
      const body = response.body;
      const ip = body.ip;
      return ip;
    });
};

const fetchCoordsByIP = function(ip) {
  return needle('get', `http://ipwho.is/${ip}`)
    .then((response) => {
      const latitude = response.body.latitude;
      const longitude = response.body.longitude;
      return { latitude, longitude };

    });
};

const fetchISSFlyOverTimes = function(coord) {
  return needle('get', `https://iss-flyover.herokuapp.com/json/?lat=${coord.latitude}&lon=${coord.longitude}`)
    .then((response) => {
      const body = response.body;
      const passOver = body.response;
      return passOver;
    });
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then((coords) => fetchISSFlyOverTimes(coords))
    .then((passOverTimes) => {
      return (passOverTimes);
    });
};

module.exports = { nextISSTimesForMyLocation };