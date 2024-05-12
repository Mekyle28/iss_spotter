const needle = require('needle');
// get ip
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


// get latitude and longitude based on ip
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



// get space station fly over info based on lat and lon
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


// callback hell
const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coord) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coord, (error, data) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, data);
      });

    });
  });

};



module.exports = { nextISSTimesForMyLocation };







