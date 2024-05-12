const needle = require('needle');
// const { isIP } = require('net');



const fetchMyIP = function(callback) {
  needle.get("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    const ip = body.ip;
    callback(null, ip);
  });
};

const ip = "148.170.180.88";


const fetchCoordsByIP = function(ip, callback) {
  needle.get(`http://ipwho.is/${ip}`, (error, response, body) => {

    if (error !== null) {
      console.log("error: ", error);
      callback(error, null);
      return;
    }
    if (!body.success) {
      const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(Error(message), null);
      return;
    }
    const lat = body.latitude;
    const long = body.longitude;
    const coord = {
      latitude: lat,
      longitude: long
    };
    callback(null, coord);
    return;
  });
};



// * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
// * Input:
// *   - An object with keys `latitude` and `longitude`
// *   - A callback (to pass back an error or the array of resulting data)
// * Returns (via Callback):
// *   - An error, if any (nullable)
// *   - The fly over times as an array of objects (null if error). Example:
// *     [ { risetime: 134564234, duration: 600 }, ... ]
// */
// const obj =  { latitude: 42.7729381, longitude: -80.9828842};

const fetchISSFlyOverTimes = function(coord, callback) {
  needle.get(`https://iss-flyover.herokuapp.com/json/?lat=${coord.latitude}&lon=${coord.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const message = `Status code: ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(message), null);
      return;
    }
    const data = body.response;
    callback(null, data);
    return;
  });
};

//const la = "hey";
// const la = 42.7729381;
// const lo = -80.9828842;
// fetchISSFlyOverTimes(obj, (x) => console.log("error or data", x));


module.exports = { fetchISSFlyOverTimes };
// module.exports = { fetchCoordsByIP };
// module.exports = { fetchMyIP };
